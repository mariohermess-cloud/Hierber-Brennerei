"""Brücke zur Etiketten-App LabelForge.

LabelForge erzeugt Serien aus Tabellenzeilen: jede Zeile ein Etikett, jede
Spalte eine Variable im Layout. Dieses Modul liefert genau solche Zeilen aus
der Brennerei-Datenbank, mit den Spaltennamen, die die Hierber-Vorlagen
erwarten. Dadurch braucht die Etiketten-App keine Änderung und keinen Zugang
zur Datenbank.

Die Zuordnung folgt DEFAULT_FIELDS aus label_styles.py der Etiketten-App:

    product_name  Produktname        category   Kategorie
    origin        Herkunft           volume     Füllmenge
    abv           Alkoholgehalt      producer   Erzeuger
    address       Adresse            street     Straße und Ort
    phone         Telefon            website    Webseite
    batch         Chargencode        subtitle   Zweitname

Der Chargencode trägt unsere Losnummer, und die beginnt mit der Fassnummer
(F017-260920). Damit steht die aktuelle Fassnummer ohne Umweg auf dem Etikett.
Zusätzlich liegen `fass`, `los` und weitere Felder als eigene Spalten bei, für
Vorlagen mit Platzhaltern der Form {{fass}}.
"""
from __future__ import annotations

import csv
import io
from decimal import Decimal

from .db import alle, eine

# Spalten, die LabelForge direkt als Variablen kennt, in Anzeigereihenfolge
VARIABLEN = [
    "product_name", "subtitle", "category", "origin", "volume", "abv",
    "producer", "address", "street", "phone", "website", "web", "batch",
]
# Zusätzliche Spalten für Platzhalter {{...}} und für die Serienverwaltung
ZUSATZ = [
    "fass", "los", "abgefuellt_am", "zutaten", "allergene", "ean", "sku",
    "preis", "grundpreis", "dateiname", "copies",
]
SPALTEN = VARIABLEN + ZUSATZ


def _zahl(wert) -> str:
    """40,0 wird zu 40 und 0,50 zu 0,5, ohne Exponentialform."""
    d = Decimal(wert)
    d = d.quantize(Decimal(1)) if d == d.to_integral_value() else d.normalize()
    return f"{d}".replace(".", ",")


def _komma(wert) -> str:
    return f"{wert}".replace(".", ",")


def _menge(fuellmenge: int, einheit: str) -> str:
    """500 ml wird zu 0,5 l, alles andere bleibt in seiner Einheit."""
    if einheit == "ml" and fuellmenge >= 1000 and fuellmenge % 1000 == 0:
        return f"{fuellmenge // 1000} l"
    if einheit == "ml" and fuellmenge >= 100:
        return _zahl(Decimal(fuellmenge) / 1000) + " l"
    return f"{fuellmenge} {einheit}"


def _vol(alkohol) -> str:
    if alkohol is None:
        return ""
    return _zahl(alkohol) + "% vol."


def zeilen(con, variante_skus: list[str] | None = None, kopien: int = 0,
           nur_mit_fass: bool = False) -> list[dict[str, str]]:
    """Eine Zeile je Flaschengröße, fertig für den Serienimport.

    `kopien` schreibt die Spalte `copies`, mit der LabelForge eine Zeile
    entsprechend oft druckt. 0 lässt die Spalte leer.
    """
    firma = eine(con, "SELECT * FROM firma WHERE id = 1") or {}
    daten = alle(con, """
        SELECT v.sku, v.fuellmenge_ml, v.grundeinheit, v.ean,
               p.name_de AS produkt, p.alkohol_vol, p.zutaten, p.allergene,
               o.name_de AS obstart, t.name_de AS typ,
               f.fassnummer,
               (SELECT a.losnummer FROM abfuellung a
                 WHERE a.variante_id = v.id ORDER BY a.abgefuellt_am DESC, a.id DESC LIMIT 1) AS losnummer,
               (SELECT a.abgefuellt_am FROM abfuellung a
                 WHERE a.variante_id = v.id ORDER BY a.abgefuellt_am DESC, a.id DESC LIMIT 1) AS abgefuellt_am,
               pa.preis_brutto, pa.grundpreis_brutto_je_l, pa.grundpreis_einheit
        FROM variante v
        JOIN produkt p ON p.id = v.produkt_id
        JOIN obstart o ON o.id = p.obstart_id
        JOIN produkttyp t ON t.id = p.produkttyp_id
        LEFT JOIN fass_aktiv fa ON fa.produkt_id = p.id AND fa.aktiv_bis IS NULL
        LEFT JOIN fass f ON f.id = fa.fass_id
        LEFT JOIN v_preis_aktuell pa ON pa.variante_id = v.id
        WHERE v.aktiv AND p.aktiv
          AND (%s::text[] IS NULL OR v.sku = ANY(%s::text[]))
        ORDER BY o.reihenfolge, p.name_de, v.fuellmenge_ml""",
        variante_skus, variante_skus)

    ort = f'{firma.get("plz", "")} {firma.get("ort", "")}'.strip()
    strasse = f'{firma.get("strasse", "")}   {ort}'.strip()
    telefon = f'Tél: {firma["telefon"]}' if firma.get("telefon") else ""
    adresse = " · ".join(x for x in [firma.get("strasse"), ort, telefon] if x)

    ergebnis: list[dict[str, str]] = []
    for z in daten:
        if nur_mit_fass and not z["fassnummer"]:
            continue
        los = z["losnummer"] or ""
        grund = ""
        if z["grundpreis_brutto_je_l"] is not None:
            grund = f'{_komma(z["grundpreis_brutto_je_l"])} {z["grundpreis_einheit"] or ""}'.strip()
        ergebnis.append({
            "product_name": z["produkt"],
            "subtitle": "",
            "category": z["typ"],
            "origin": "Produit luxembourgeois",
            "volume": _menge(z["fuellmenge_ml"], z["grundeinheit"]),
            "abv": _vol(z["alkohol_vol"]),
            "producer": firma.get("name", ""),
            "address": adresse,
            "street": strasse,
            "phone": telefon,
            "website": firma.get("web", ""),
            "web": firma.get("web", ""),          # die Vorlagen kennen beide Schreibweisen
            "batch": los,                          # enthält die Fassnummer
            "fass": z["fassnummer"] or "",
            "los": los,
            "abgefuellt_am": z["abgefuellt_am"].strftime("%d.%m.%Y") if z["abgefuellt_am"] else "",
            "zutaten": z["zutaten"] or "",
            "allergene": z["allergene"] or "",
            "ean": z["ean"] or "",
            "sku": z["sku"],
            "preis": _komma(z["preis_brutto"]) + " €" if z["preis_brutto"] is not None else "",
            "grundpreis": grund,
            "dateiname": z["sku"] + (f"-{los}" if los else ""),
            "copies": str(kopien) if kopien else "",
        })
    return ergebnis


def als_csv(reihen: list[dict[str, str]]) -> bytes:
    """Semikolon-getrennt mit BOM: so liest es LabelForge und auch Excel."""
    puffer = io.StringIO()
    schreiber = csv.DictWriter(puffer, fieldnames=SPALTEN, delimiter=";",
                               extrasaction="ignore", lineterminator="\r\n")
    schreiber.writeheader()
    schreiber.writerows(reihen)
    return puffer.getvalue().encode("utf-8-sig")
