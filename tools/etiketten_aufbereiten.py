#!/usr/bin/env python3
"""Etiketten für die Keller-Ansicht (keller-v2.html) aufbereiten.

Ein Befehl (im Repo-Hauptordner):

    python3 tools/etiketten_aufbereiten.py

Was passiert
  * Liest v2/data/etiketten.json (Zuordnung Datei -> Sorte, Variante, Flaschentyp, Flüssigkeitsfarbe).
  * Flache Etiketten ("art": "flach") werden nur verkleinert (Hochformat: max. 1024 px Höhe,
    Querformat: max. 1024 px Breite) und als WebP nach assets/labels/<ausgabe> geschrieben.
  * Fotos ohne flaches Etikett ("art": "foto-rund", z. B. Rum) werden ausgeschnitten und
    zylinder-entzerrt (Etikett auf Rechteck), Glanzlichter und Randabdunklung abgeschwächt.
  * Einträge mit "verwendet": false (Dubletten, Referenzfotos, Fallbacks) werden nicht geschrieben.
  * Bilder im Quellordner, die in der JSON keinen Eintrag haben, werden gemeldet
    (Exit-Code 2, alle anderen Bilder werden trotzdem verarbeitet).
  * Berechnete Werte (Maße, Seitenverhältnis, Grundfarbe, Dateigröße) werden in die JSON zurückgeschrieben.

Neue Etiketten ergänzen: Datei in "Fertige Etiquetten/" legen, in v2/data/etiketten.json einen
Eintrag mit "datei", "sorte", "variante", "flaschentyp", "art", "verwendet" und "ausgabe" anlegen
(Vorlage: ein vorhandener Eintrag), Skript erneut starten. Die Website liest dieselbe JSON.

Voraussetzung: Python 3, `pip install pillow numpy`.
Optionen: --nur <sorte>  nur diese Sorte, --pruefen  nichts schreiben, nur melden.
"""
import argparse
import json
import math
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

Image.MAX_IMAGE_PIXELS = None  # einzelne Etiketten sind sehr groß (z. B. 4567x8432)

REPO = Path(__file__).resolve().parent.parent
ENDUNGEN = {".png", ".jpg", ".jpeg", ".webp", ".tif", ".tiff"}
ZIEL_KB = (60, 150)  # angestrebter Größenbereich je WebP
QUALITAETEN = (90, 84, 78, 72, 66, 60, 54)
MAX_KANTE = 1024


def lade(pfad: Path) -> Image.Image:
    im = Image.open(pfad)
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        weiss = Image.new("RGBA", im.size, (255, 255, 255, 255))
        weiss.alpha_composite(im)
        im = weiss
    return im.convert("RGB")


def weissrand_abschneiden(im: Image.Image, max_anteil: float = 0.015) -> Image.Image:
    """Reinweißen Außenrand (Scan-/Exportrest) bis max. 1,5 % je Seite entfernen."""
    a = np.asarray(im)
    h, w, _ = a.shape
    hell = (a > 249).all(axis=2)
    lim_x, lim_y = int(w * max_anteil), int(h * max_anteil)

    def schritt(zeile_hell, limit):
        n = 0
        while n < limit and zeile_hell(n):
            n += 1
        return n

    l = schritt(lambda i: hell[:, i].mean() > 0.985, lim_x)
    r = schritt(lambda i: hell[:, w - 1 - i].mean() > 0.985, lim_x)
    o = schritt(lambda i: hell[i, :].mean() > 0.985, lim_y)
    u = schritt(lambda i: hell[h - 1 - i, :].mean() > 0.985, lim_y)
    if l or r or o or u:
        return im.crop((l, o, w - r, h - u))
    return im


def verkleinern(im: Image.Image) -> Image.Image:
    w, h = im.size
    if w >= h:  # Querformat: max. 1024 px Breite
        ziel = (MAX_KANTE, round(h * MAX_KANTE / w)) if w > MAX_KANTE else (w, h)
    else:  # Hochformat: max. 1024 px Höhe
        ziel = (round(w * MAX_KANTE / h), MAX_KANTE) if h > MAX_KANTE else (w, h)
    if ziel != (w, h):
        # in zwei Schritten (Box, dann Lanczos) - stabil auch bei sehr großen Quellen
        while im.size[0] > ziel[0] * 2 and im.size[1] > ziel[1] * 2:
            im = im.resize((im.size[0] // 2, im.size[1] // 2), Image.BOX)
        im = im.resize(ziel, Image.LANCZOS)
    return im


def als_webp(im: Image.Image, ziel: Path) -> int:
    """Speichert als WebP; senkt die Qualität, bis die Datei im Zielbereich liegt."""
    beste = None
    for q in QUALITAETEN:
        im.save(ziel, "WEBP", quality=q, method=6)
        kb = ziel.stat().st_size / 1024
        beste = kb
        if kb <= ZIEL_KB[1]:
            break
    return round(beste)


def grundfarbe(im: Image.Image) -> str:
    kl = im.resize((32, 32), Image.BOX)
    m = np.asarray(kl).reshape(-1, 3).mean(axis=0)
    return "#%02x%02x%02x" % tuple(int(round(v)) for v in m)


# ---------- Foto -> Etikett (nur für Sorten ohne flaches Etikett) ----------

def foto_zu_etikett(im: Image.Image, s: dict) -> Image.Image:
    """Etikett aus dem Flaschenfoto: Zylinder-Entzerrung (x = R*sin(phi)), Bogenkorrektur der
    Unterkante, Glanzlichter und Randabdunklung abschwächen."""
    a = np.asarray(im).astype(np.float32)
    x0, x1 = s["x0"], s["x1"]
    cx, R = (x0 + x1) / 2.0, float(s["radius"])
    phi_max = math.radians(s.get("max_grad", 64))
    oben = float(s["oben"])
    unten_m, unten_r = float(s["unten_mitte"]), float(s["unten_rand"])
    halb = (x1 - x0) / 2.0
    b_out = int(round(2 * R * phi_max))
    hoehe = int(round(unten_m - oben))
    u = (np.arange(b_out) + 0.5) / b_out * 2 - 1  # -1..1
    phi = u * phi_max
    src_x = cx + R * np.sin(phi)
    # Unterkante: Parabel zwischen Mitte und Rand des Etiketts
    rel = np.clip((src_x - cx) / halb, -1, 1)
    unten = unten_m - (unten_m - unten_r) * rel**2
    v = (np.arange(hoehe) + 0.5) / hoehe
    src_y = oben + v[:, None] * (unten[None, :] - oben)
    # bilineare Abtastung
    xi = np.clip(src_x, 0, a.shape[1] - 2)
    x_lo = np.floor(xi).astype(int)
    fx = (xi - x_lo)[None, :, None]
    yi = np.clip(src_y, 0, a.shape[0] - 2)
    y_lo = np.floor(yi).astype(int)
    fy = (yi - y_lo)[:, :, None]
    xl = np.broadcast_to(x_lo[None, :], y_lo.shape)
    p00 = a[y_lo, xl]
    p01 = a[y_lo, xl + 1]
    p10 = a[y_lo + 1, xl]
    p11 = a[y_lo + 1, xl + 1]
    out = (p00 * (1 - fx) + p01 * fx) * (1 - fy) + (p10 * (1 - fx) + p11 * fx) * fy
    img = Image.fromarray(np.clip(out, 0, 255).astype(np.uint8))

    # Randabdunklung ausgleichen: Spaltenhelligkeit relativ zur Mitte (nur aufhellen, max. x1,5)
    arr = np.asarray(img).astype(np.float32)
    lum = arr.mean(axis=2)
    spalte = np.median(lum, axis=0)
    mitte = np.median(spalte[b_out // 3: 2 * b_out // 3])
    glatt = np.convolve(spalte, np.ones(41) / 41, mode="same")
    faktor = np.clip(mitte / np.maximum(glatt, 1), 1.0, 1.5)
    faktor = np.convolve(faktor, np.ones(31) / 31, mode="same")
    arr *= faktor[None, :, None]

    # Glanzlichter: helle, entsättigte Spitzen gegenüber dem lokalen Mittel zurücknehmen
    lum = arr.mean(axis=2)
    lokal = np.asarray(Image.fromarray(np.clip(lum, 0, 255).astype(np.uint8)).filter(
        ImageFilter.GaussianBlur(max(6, hoehe // 60)))).astype(np.float32)
    sat = arr.max(axis=2) - arr.min(axis=2)
    ueber = np.clip(lum - lokal - 14, 0, None)
    maske = np.clip(ueber / 40.0, 0, 1) * np.clip(1 - sat / 90.0, 0, 1)
    maske = np.asarray(Image.fromarray((maske * 255).astype(np.uint8)).filter(
        ImageFilter.GaussianBlur(2))).astype(np.float32) / 255.0
    ziel = np.minimum(lum, lokal + 14)[..., None] / np.maximum(lum[..., None], 1)
    arr = arr * (1 - maske[..., None]) + arr * ziel * maske[..., None]
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))


# ---------- Hauptprogramm ----------

def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--quelle", default=str(REPO / "Fertige Etiquetten"), help="Ordner mit den Etiketten/Fotos")
    ap.add_argument("--ziel", default=str(REPO / "assets" / "labels"), help="Ausgabeordner (WebP)")
    ap.add_argument("--zuordnung", default=str(REPO / "v2" / "data" / "etiketten.json"), help="Zuordnungsdatei")
    ap.add_argument("--nur", help="nur diese Sorte verarbeiten (z. B. gin)")
    ap.add_argument("--pruefen", action="store_true", help="nichts schreiben, nur Zuordnung prüfen")
    args = ap.parse_args()

    quelle, ziel, zpfad = Path(args.quelle), Path(args.ziel), Path(args.zuordnung)
    if not zpfad.exists():
        print(f"FEHLER: Zuordnungsdatei fehlt: {zpfad}")
        return 1
    daten = json.loads(zpfad.read_text(encoding="utf-8"))
    eintraege = daten["etiketten"]
    if not args.pruefen:
        ziel.mkdir(parents=True, exist_ok=True)

    bekannt = {e["datei"] for e in eintraege}
    vorhanden = sorted(p.name for p in quelle.iterdir() if p.suffix.lower() in ENDUNGEN)
    ohne = [n for n in vorhanden if n not in bekannt]
    fehlend = [e["datei"] for e in eintraege if e["datei"] not in vorhanden]

    ok = fertig = 0
    for e in eintraege:
        if args.nur and e["sorte"] != args.nur:
            continue
        if not e.get("verwendet", True):
            print(f"  übersprungen ({e.get('rolle', 'nicht verwendet')}): {e['datei']}")
            continue
        if e["datei"] in fehlend:
            print(f"  FEHLT im Ordner: {e['datei']}")
            continue
        art = e.get("art", "flach")
        pfad = quelle / e["datei"]
        try:
            im = lade(pfad)
            if art == "foto-rund":
                if "schnitt" not in e:
                    print(f"  KEIN SCHNITT definiert für Foto: {e['datei']}")
                    continue
                im = foto_zu_etikett(im, e["schnitt"])
            else:
                im = weissrand_abschneiden(im)
            im = verkleinern(im)
            e["breite"], e["hoehe"] = im.size
            e["seitenverhaeltnis"] = round(im.size[0] / im.size[1], 4)
            e["grundfarbe"] = grundfarbe(im)
            if not args.pruefen:
                kb = als_webp(im, ziel / e["ausgabe"])
                e["kb"] = kb
                hinweis = "" if ZIEL_KB[0] * 0.5 <= kb <= ZIEL_KB[1] else "  (außerhalb 60-150 KB)"
                print(f"  ok  {e['datei']} -> {e['ausgabe']}  {im.size[0]}x{im.size[1]}  {kb} KB{hinweis}")
            else:
                print(f"  ok  {e['datei']} -> {e['ausgabe']}  {im.size[0]}x{im.size[1]} (nur Prüfung)")
            fertig += 1
        except Exception as ex:  # ein defektes Bild soll den Rest nicht stoppen
            print(f"  FEHLER bei {e['datei']}: {ex}")
            ok = 1

    if not args.pruefen and not args.nur:
        zpfad.write_text(json.dumps(daten, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"\n{fertig} Etikett(en) verarbeitet.")
    if fehlend:
        print("In der Zuordnung, aber nicht im Ordner:")
        for n in fehlend:
            print(f"  - {n}")
    if ohne:
        print("OHNE ZUORDNUNG (bitte in v2/data/etiketten.json eintragen):")
        for n in ohne:
            print(f"  - {n}")
        return 2
    return ok


if __name__ == "__main__":
    sys.exit(main())
