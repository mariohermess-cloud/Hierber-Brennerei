#!/usr/bin/env python3
"""OPTIONAL und UNGETESTET: den Bildstapel über die OpenAI-Bild-API erzeugen.

*** UNGETESTET ***
Dieses Skript wurde nur auf Syntax geprüft (python3 -m py_compile). Es konnte weder gegen die
OpenAI-API laufen (kein Internet zu OpenAI, kein Schlüssel) noch gegen die aktuelle Dokumentation
abgeglichen werden. Die Konstanten unten (Endpunkt, Modell, Größe, Qualität, Name der Felder)
sind Annahmen und MÜSSEN vom Nutzer gegen die aktuelle OpenAI-Dokumentation geprüft werden.
Die API wird getrennt von einem ChatGPT-Abo abgerechnet und kostet pro Bild Geld.

Was es tut
  * liest tools/chatgpt-stapel.csv (Semikolon, UTF-8; Spalten nr;dateiname_ergebnis;anhang1;anhang2;prompt;gruppe;status)
  * schickt je Zeile die beiden Anhänge (Flaschenform + Etikett) und den Prompt als Bildbearbeitung an die API
  * speichert das Ergebnis unter dem Pfad aus dateiname_ergebnis (fotos-ki/… oder fotos-flaschen/…; Gruppen flasche und groessen = Hochformat, neue Flasche mit Etikett)
  * Wiederaufnahme: vorhandene Ergebnisdateien werden übersprungen (Ausnahme: --ueberschreiben)
  * Rate-Begrenzung: feste Pause zwischen den Aufrufen, Wiederholung mit Wartezeit bei 429/5xx

Aufruf (im Repo-Hauptordner)
  export OPENAI_API_KEY=...            # nie ins Repo schreiben
  python3 tools/chatgpt_stapel_api.py --trocken        # nur anzeigen und Anhänge prüfen, kein Aufruf
  python3 tools/chatgpt_stapel_api.py --max 1          # ein Testbild
  python3 tools/chatgpt_stapel_api.py                  # alles Offene
Optionen: --csv <Datei>, --gruppe ersatz|flasche|groessen|weitere, --ab <nr>, --max <n>, --pause <Sekunden>,
          --ueberschreiben (Ersatzbilder: alte Datei geht vorher nach <Zielordner>/_vorher/),
          --zuschnitt-4zu3 (benötigt Pillow; schneidet auf 4:3 zu, schneidet bei 3:2 die Ränder ab)
Voraussetzung: Python 3 und das Paket "requests" (pip install requests).
Die Etikettenprüfung macht das Skript NICHT: jedes Bild von Hand mit dem Etikett vergleichen.
"""
import argparse
import base64
import csv
import io
import mimetypes
import os
import shutil
import sys
import time
from pathlib import Path

# ---------------------------------------------------------------------------
# KONSTANTEN: vom Nutzer gegen die aktuelle OpenAI-Dokumentation zu prüfen (Annahmen, nicht verifiziert)
# ---------------------------------------------------------------------------
API_URL = "https://api.openai.com/v1/images/edits"   # Bildbearbeitung mit Eingabebildern (Annahme)
MODEL = "gpt-image-1"                                 # Modellname (Annahme, prüfen)
SIZE = "1536x1024"                                    # Serviervorschläge (Querformat); erlaubte Größen prüfen, 4:3 ist evtl. nicht dabei (3:2 hier)
SIZE_FLASCHE = "1024x1536"                            # Gruppen flasche und groessen (Hochformat; 3:4 ist evtl. nicht dabei, hier 2:3, Annahme, prüfen)
QUALITY = "high"                                      # Qualitätsstufe (Annahme, prüfen)
IMAGE_FIELD = "image[]"                               # Feldname für mehrere Eingabebilder (Annahme, prüfen)
RESULT_KEY = "b64_json"                               # Ergebnis als Base64 in data[0] (Annahme, prüfen)
PAUSE_SEKUNDEN = 20.0                                 # Pause zwischen zwei Bildern (Rate-Begrenzung)
VERSUCHE = 4                                          # Wiederholungen bei 429/5xx/Netzwerkfehler
TIMEOUT = 300                                         # Sekunden je Aufruf
# ---------------------------------------------------------------------------

REPO = Path(__file__).resolve().parent.parent
# Zielordner steht im Pfad der Spalte dateiname_ergebnis: fotos-ki/ (Serviervorschläge, Ersatz) oder fotos-flaschen/ (Gruppen flasche, groessen)


def lies_csv(pfad: Path):
    with pfad.open(encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f, delimiter=";"))


def rufe_api(requests, key: str, zeile: dict) -> bytes:
    """Ein Bild erzeugen. Gibt die PNG-Bytes zurück oder wirft RuntimeError."""
    dateien = []
    for feld in ("anhang1", "anhang2"):
        p = REPO / zeile[feld]
        mime = mimetypes.guess_type(p.name)[0] or "application/octet-stream"
        dateien.append((IMAGE_FIELD, (p.name, p.read_bytes(), mime)))
    daten = {"model": MODEL, "prompt": zeile["prompt"], "size": SIZE_FLASCHE if zeile["gruppe"] in ("flasche", "groessen") else SIZE, "quality": QUALITY, "n": "1"}
    letzte = ""
    for versuch in range(1, VERSUCHE + 1):
        try:
            r = requests.post(API_URL, headers={"Authorization": f"Bearer {key}"}, data=daten, files=dateien, timeout=TIMEOUT)
        except requests.RequestException as ex:
            letzte = f"Netzwerkfehler: {ex}"
        else:
            if r.status_code == 200:
                try:
                    return base64.b64decode(r.json()["data"][0][RESULT_KEY])
                except (KeyError, IndexError, ValueError) as ex:
                    raise RuntimeError(f"Antwort ohne Bild ({ex}): {r.text[:300]}")
            letzte = f"HTTP {r.status_code}: {r.text[:300]}"
            if r.status_code not in (429, 500, 502, 503, 504):
                raise RuntimeError(letzte)  # Fehler der Anfrage selbst: nicht wiederholen
        warte = min(120, 10 * 2 ** (versuch - 1))
        print(f"    Versuch {versuch}/{VERSUCHE} fehlgeschlagen ({letzte}); warte {warte} s", flush=True)
        time.sleep(warte)
    raise RuntimeError(letzte)


def zuschnitt_4zu3(png: bytes) -> bytes:
    from PIL import Image  # nur mit --zuschnitt-4zu3 nötig
    im = Image.open(io.BytesIO(png)).convert("RGB")
    w, h = im.size
    nb = round(h * 4 / 3)
    if nb < w:
        l = (w - nb) // 2
        im = im.crop((l, 0, l + nb, h))
    out = io.BytesIO()
    im.save(out, "PNG")
    return out.getvalue()


def main() -> int:
    ap = argparse.ArgumentParser(description="UNGETESTET: Bildstapel über die OpenAI-Bild-API erzeugen")
    ap.add_argument("--csv", default=str(REPO / "tools" / "chatgpt-stapel.csv"))
    ap.add_argument("--gruppe", choices=["ersatz", "flasche", "groessen", "weitere"])
    ap.add_argument("--ab", type=int, default=0, help="erst ab dieser nr")
    ap.add_argument("--max", type=int, default=0, help="höchstens so viele Bilder erzeugen")
    ap.add_argument("--pause", type=float, default=PAUSE_SEKUNDEN)
    ap.add_argument("--trocken", action="store_true", help="nichts aufrufen, nur anzeigen und Anhänge prüfen")
    ap.add_argument("--ueberschreiben", action="store_true", help="vorhandene Dateien ersetzen (alte nach <Zielordner>/_vorher/)")
    ap.add_argument("--zuschnitt-4zu3", action="store_true", help="Ergebnis auf 4:3 zuschneiden (Pillow)")
    a = ap.parse_args()

    zeilen = [z for z in lies_csv(Path(a.csv)) if z["status"] == "offen" or a.ueberschreiben]
    if a.gruppe:
        zeilen = [z for z in zeilen if z["gruppe"] == a.gruppe]
    zeilen = [z for z in zeilen if int(z["nr"]) >= a.ab]

    fehlende = [z[f] for z in zeilen for f in ("anhang1", "anhang2") if not (REPO / z[f]).exists()]
    if fehlende:
        print("FEHLER: Anhangdateien fehlen:\n  " + "\n  ".join(sorted(set(fehlende))))
        return 1

    key = os.environ.get("OPENAI_API_KEY", "")
    requests = None
    if not a.trocken:
        if not key:
            print("FEHLER: OPENAI_API_KEY ist nicht gesetzt.")
            return 1
        try:
            import requests  # type: ignore
        except ImportError:
            print("FEHLER: Paket 'requests' fehlt (pip install requests).")
            return 1

    getan = fehler = 0
    for z in zeilen:
        ziel = REPO / z["dateiname_ergebnis"]
        if ziel.exists() and not a.ueberschreiben:
            print(f"[{z['nr']}] übersprungen (vorhanden): {ziel.name}")
            continue
        if a.max and getan >= a.max:
            break
        print(f"[{z['nr']}] {ziel.name}  <- {Path(z['anhang1']).name} + {Path(z['anhang2']).name}", flush=True)
        if a.trocken:
            getan += 1
            continue
        try:
            png = rufe_api(requests, key, z)
            if a.zuschnitt_4zu3:
                png = zuschnitt_4zu3(png)
            ziel.parent.mkdir(exist_ok=True)
            if ziel.exists():
                vorher = ziel.parent / "_vorher"
                vorher.mkdir(exist_ok=True)
                shutil.copy2(ziel, vorher / ziel.name)
            ziel.write_bytes(png)
            getan += 1
            print(f"    gespeichert: {ziel.relative_to(REPO)}", flush=True)
        except RuntimeError as ex:
            fehler += 1
            print(f"    FEHLER: {ex}", flush=True)
        time.sleep(a.pause)
    print(f"\nFertig: {getan} {'geplant' if a.trocken else 'erzeugt'}, {fehler} Fehler. Bitte jedes Bild von Hand prüfen (Etikett, Adresse, Flasche vollständig).")
    return 1 if fehler else 0


if __name__ == "__main__":
    sys.exit(main())
