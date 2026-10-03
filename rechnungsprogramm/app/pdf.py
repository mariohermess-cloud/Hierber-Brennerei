"""Rechnungs-PDF nach den Pflichtangaben für Luxemburg."""
from __future__ import annotations

import io
from decimal import Decimal

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas

TINTE = colors.HexColor("#1f2a20")
GRAU = colors.HexColor("#576055")
LINIE = colors.HexColor("#c9c9bd")
TANNE = colors.HexColor("#3b5a34")


def euro(wert) -> str:
    wert = Decimal(wert or 0).quantize(Decimal("0.01"))
    ganz, _, rest = f"{abs(wert):.2f}".partition(".")
    gruppen = []
    while len(ganz) > 3:
        gruppen.insert(0, ganz[-3:])
        ganz = ganz[:-3]
    gruppen.insert(0, ganz)
    text = ".".join(gruppen) + "," + rest
    return ("-" if wert < 0 else "") + text


def prozent(satz) -> str:
    return f"{Decimal(satz) * 100:.0f} %".replace(".", ",")


def _datum(d) -> str:
    return d.strftime("%d.%m.%Y") if d else ""


def erzeugen(beleg: dict) -> bytes:
    """Gibt das fertige PDF als Bytes zurück."""
    puffer = io.BytesIO()
    c = canvas.Canvas(puffer, pagesize=A4)
    breite, hoehe = A4
    links, rechts = 22 * mm, breite - 22 * mm
    f = beleg["firma"]
    ist_gutschrift = beleg["art"] == "gutschrift"

    def seitenkopf():
        c.setFillColor(TANNE)
        c.setFont("Helvetica-Bold", 16)
        c.drawString(links, hoehe - 26 * mm, f["name"])
        c.setFillColor(GRAU)
        c.setFont("Helvetica", 8.5)
        zeilen = [
            f'{f["strasse"]} · {f["plz"]} {f["ort"]} · {f["land"]}',
            " · ".join(x for x in [f.get("telefon"), f.get("email"), f.get("web")] if x),
        ]
        if f.get("mwst_nr"):
            zeilen.append(f'MwSt-Nr. {f["mwst_nr"]}')
        y = hoehe - 32 * mm
        for z in zeilen:
            c.drawString(links, y, z)
            y -= 4.2 * mm
        c.setStrokeColor(LINIE)
        c.setLineWidth(0.6)
        c.line(links, y - 1 * mm, rechts, y - 1 * mm)

    seitenkopf()

    # Anschrift
    c.setFillColor(TINTE)
    c.setFont("Helvetica", 10)
    y = hoehe - 58 * mm
    for zeile in (beleg.get("anschrift") or beleg["kunde_name"]).split("\n"):
        c.drawString(links, y, zeile)
        y -= 5 * mm

    # Titel und Kopfdaten
    c.setFont("Helvetica-Bold", 15)
    titel = "Gutschrift" if ist_gutschrift else "Rechnung"
    c.drawString(links, hoehe - 86 * mm, f'{titel} {beleg["nummer"] or "(Entwurf)"}')

    c.setFont("Helvetica", 9)
    felder = [
        ("Datum", _datum(beleg["datum"])),
        ("Leistungsdatum", _datum(beleg.get("leistungsdatum"))),
        ("Kundennummer", beleg["kunde_nummer"]),
    ]
    if not ist_gutschrift:
        felder.append(("Fällig am", _datum(beleg.get("faellig_am"))))
    if beleg.get("bezieht_auf"):
        felder.append(("Zu Rechnung", beleg["bezieht_auf"]["nummer"]))
    if beleg.get("kunde_mwst_nr"):
        felder.append(("MwSt-Nr. Kunde", beleg["kunde_mwst_nr"]))
    y = hoehe - 86 * mm
    for name, wert in felder:
        c.setFillColor(GRAU)
        c.drawRightString(rechts - 32 * mm, y, name)
        c.setFillColor(TINTE)
        c.drawRightString(rechts, y, str(wert or ""))
        y -= 4.6 * mm
    unterkante_kopf = y

    if beleg.get("kopftext"):
        c.setFillColor(TINTE)
        c.setFont("Helvetica", 9.5)
        c.drawString(links, hoehe - 96 * mm, beleg["kopftext"][:110])

    # Positionstabelle
    spalten = [links, links + 12 * mm, rechts - 62 * mm, rechts - 44 * mm, rechts - 24 * mm, rechts]
    # Tabelle beginnt unter dem längeren der beiden Blöcke links und rechts
    y = min(hoehe - 106 * mm, unterkante_kopf - 6 * mm)
    c.setFillColor(GRAU)
    c.setFont("Helvetica-Bold", 8)
    for x, text, aus in [
        (spalten[0], "Pos", "l"), (spalten[1], "Bezeichnung", "l"),
        (spalten[3], "Menge", "r"), (spalten[4], "Einzel netto", "r"), (spalten[5], "Netto", "r"),
    ]:
        (c.drawString if aus == "l" else c.drawRightString)(x, y, text)
    c.drawRightString(spalten[3] - 20 * mm, y, "MwSt")
    y -= 2 * mm
    c.setStrokeColor(LINIE)
    c.line(links, y, rechts, y)
    y -= 5 * mm

    c.setFont("Helvetica", 9)
    for p in beleg["positionen"]:
        if y < 60 * mm:
            c.showPage()
            seitenkopf()
            y = hoehe - 60 * mm
            c.setFont("Helvetica", 9)
        c.setFillColor(TINTE)
        c.drawString(spalten[0], y, str(p["pos"]))
        c.drawString(spalten[1], y, p["bezeichnung"][:52])
        c.drawRightString(spalten[3] - 20 * mm, y,
                          "0 %" if beleg["reverse_charge"] else prozent(p["mwst_satz"]))
        menge = Decimal(p["menge"]).normalize()
        c.drawRightString(spalten[3], y, f'{menge:f} {p["einheit"]}'.replace(".", ","))
        c.drawRightString(spalten[4], y, euro(p["einzelpreis_netto"]))
        c.drawRightString(spalten[5], y, euro(p["netto"]))
        unter = []
        if p.get("losnummer"):
            unter.append(f'Los {p["losnummer"]}')
        if p.get("rabatt_prozent") and Decimal(p["rabatt_prozent"]) > 0:
            unter.append(f'Rabatt {prozent(Decimal(p["rabatt_prozent"]) / 100)}')
        if p.get("zusatz"):
            unter.append(p["zusatz"])
        if unter:
            y -= 4 * mm
            c.setFillColor(GRAU)
            c.setFont("Helvetica", 7.6)
            c.drawString(spalten[1], y, " · ".join(unter)[:80])
            c.setFont("Helvetica", 9)
        y -= 6 * mm

    # Summen
    c.setStrokeColor(LINIE)
    c.line(rechts - 74 * mm, y, rechts, y)
    y -= 6 * mm
    c.setFont("Helvetica", 9)
    c.setFillColor(TINTE)
    c.drawRightString(rechts - 24 * mm, y, "Summe netto")
    c.drawRightString(rechts, y, euro(beleg["netto"]))
    y -= 5 * mm

    if beleg["reverse_charge"]:
        c.setFillColor(GRAU)
        c.drawRightString(rechts - 24 * mm, y, "MwSt")
        c.drawRightString(rechts, y, "0,00")
        y -= 5 * mm
    else:
        for zeile in beleg["mwst_aufteilung"]:
            c.setFillColor(GRAU)
            c.drawRightString(rechts - 24 * mm, y,
                              f'MwSt {prozent(zeile["mwst_satz"])} auf {euro(zeile["netto"])}')
            c.drawRightString(rechts, y, euro(zeile["mwst"]))
            y -= 5 * mm

    c.setStrokeColor(TINTE)
    c.setLineWidth(0.9)
    c.line(rechts - 74 * mm, y + 1 * mm, rechts, y + 1 * mm)
    y -= 5 * mm
    c.setFont("Helvetica-Bold", 11)
    c.setFillColor(TINTE)
    c.drawRightString(rechts - 32 * mm, y, "Gutschriftsbetrag" if ist_gutschrift else "Rechnungsbetrag")
    c.drawRightString(rechts, y, f'{euro(beleg["brutto"])} {beleg["waehrung"]}')
    y -= 10 * mm

    # Hinweise
    c.setFont("Helvetica", 8.6)
    c.setFillColor(GRAU)
    hinweise = []
    if beleg["reverse_charge"]:
        hinweise.append("Steuerschuldnerschaft des Leistungsempfängers · Autoliquidation · "
                        "Reverse charge (Art. 196 MwSt-Richtlinie 2006/112/EG).")
    if not ist_gutschrift:
        ziel = beleg.get("faellig_am")
        hinweise.append(f"Zahlbar ohne Abzug bis {_datum(ziel)}." if ziel else "Zahlbar sofort ohne Abzug.")
        if f.get("iban"):
            hinweise.append(f'Bankverbindung: {f.get("bank") or ""} · IBAN {f["iban"]}'
                            + (f' · BIC {f["bic"]}' if f.get("bic") else ""))
            hinweise.append(f'Bitte {beleg["nummer"] or ""} als Verwendungszweck angeben.')
    else:
        hinweise.append("Der Betrag wird Ihrem Konto gutgeschrieben.")
    if beleg.get("fusstext"):
        hinweise.append(beleg["fusstext"])
    if f.get("fusszeile"):
        hinweise.append(f["fusszeile"])
    for h in hinweise:
        if y < 24 * mm:
            break
        c.drawString(links, y, h[:120])
        y -= 4.4 * mm

    # Fußzeile
    c.setFont("Helvetica", 7.4)
    c.setFillColor(GRAU)
    fuss = " · ".join(x for x in [
        f["name"], f'{f["strasse"]}, {f["plz"]} {f["ort"]}',
        f'MwSt-Nr. {f["mwst_nr"]}' if f.get("mwst_nr") else None,
        f'IBAN {f["iban"]}' if f.get("iban") else None,
    ] if x)
    c.drawCentredString(breite / 2, 14 * mm, fuss[:150])

    c.showPage()
    c.save()
    return puffer.getvalue()
