"""Auswertungen für Steuer, Buchhaltung und Betrieb."""
from __future__ import annotations

import csv
import io
from datetime import date

from .db import alle


def mwst_meldung(con, von: date, bis: date) -> dict:
    """Bemessungsgrundlage und Steuer je Satz für einen Zeitraum."""
    zeilen = alle(con, """
        SELECT m.mwst_satz,
               SUM(m.netto * CASE WHEN r.art = 'gutschrift' THEN -1 ELSE 1 END) AS netto,
               SUM(CASE WHEN r.reverse_charge THEN 0 ELSE m.mwst END
                   * CASE WHEN r.art = 'gutschrift' THEN -1 ELSE 1 END)         AS mwst
        FROM rechnung r JOIN v_rechnung_mwst m ON m.rechnung_id = r.id
        WHERE r.status = 'festgeschrieben' AND r.datum BETWEEN %s AND %s
        GROUP BY m.mwst_satz ORDER BY m.mwst_satz DESC""", von, bis)
    innergemeinschaftlich = alle(con, """
        SELECT k.land, k.mwst_nr, k.name,
               SUM(r.netto * CASE WHEN r.art = 'gutschrift' THEN -1 ELSE 1 END) AS netto
        FROM rechnung r JOIN kunde k ON k.id = r.kunde_id
        WHERE r.status = 'festgeschrieben' AND r.reverse_charge AND r.datum BETWEEN %s AND %s
        GROUP BY k.land, k.mwst_nr, k.name ORDER BY netto DESC""", von, bis)
    return {
        "von": von, "bis": bis, "zeilen": zeilen,
        "netto_gesamt": sum((z["netto"] or 0) for z in zeilen),
        "mwst_gesamt": sum((z["mwst"] or 0) for z in zeilen),
        "innergemeinschaftlich": innergemeinschaftlich,
    }


def umsatz_kanal(con, von: date, bis: date) -> list[dict]:
    return alle(con, """
        SELECT r.kanal,
               count(*) FILTER (WHERE r.art = 'rechnung')                        AS rechnungen,
               SUM(r.netto  * CASE WHEN r.art = 'gutschrift' THEN -1 ELSE 1 END) AS netto,
               SUM(r.brutto * CASE WHEN r.art = 'gutschrift' THEN -1 ELSE 1 END) AS brutto
        FROM rechnung r
        WHERE r.status = 'festgeschrieben' AND r.datum BETWEEN %s AND %s
        GROUP BY r.kanal ORDER BY netto DESC NULLS LAST""", von, bis)


def umsatz_produkt(con, von: date, bis: date, limit: int = 50) -> list[dict]:
    return alle(con, """
        SELECT pr.name_de AS produkt, v.fuellmenge_ml,
               SUM(p.menge * CASE WHEN r.art = 'gutschrift' THEN -1 ELSE 1 END) AS menge,
               SUM(p.netto * CASE WHEN r.art = 'gutschrift' THEN -1 ELSE 1 END) AS netto
        FROM rechnungsposition p
        JOIN rechnung r ON r.id = p.rechnung_id
        JOIN variante v ON v.id = p.variante_id
        JOIN produkt pr ON pr.id = v.produkt_id
        WHERE r.status = 'festgeschrieben' AND r.datum BETWEEN %s AND %s
        GROUP BY pr.name_de, v.fuellmenge_ml ORDER BY netto DESC NULLS LAST LIMIT %s""", von, bis, limit)


def offene_posten(con) -> list[dict]:
    return alle(con, "SELECT * FROM v_offene_posten ORDER BY faellig_am")


def mahnliste(con, tage: int = 14) -> list[dict]:
    return alle(con, """
        SELECT * FROM v_offene_posten WHERE tage_ueberfaellig >= %s ORDER BY tage_ueberfaellig DESC""", tage)


def journal(con, von: date, bis: date) -> list[dict]:
    return alle(con, """
        SELECT * FROM v_journal WHERE datum BETWEEN %s AND %s ORDER BY datum, nummer""", von, bis)


def journal_csv(con, von: date, bis: date) -> str:
    """Export für die Fiduciaire: eine Zeile je Beleg und Steuersatz."""
    zeilen = journal(con, von, bis)
    puffer = io.StringIO()
    schreiber = csv.writer(puffer, delimiter=";")
    schreiber.writerow(["Belegnummer", "Art", "Datum", "Leistungsdatum", "Kundennummer", "Kunde",
                        "Land", "MwSt-Nr", "Steuersatz", "Netto", "MwSt", "Brutto",
                        "Reverse Charge", "Kanal"])
    for z in zeilen:
        schreiber.writerow([
            z["nummer"], z["art"], z["datum"], z["leistungsdatum"] or "",
            z["kunde_nummer"], z["kunde"], z["land"], z["mwst_nr"] or "",
            f'{z["mwst_satz"]:.4f}'.replace(".", ","),
            f'{z["netto"]:.2f}'.replace(".", ","),
            f'{z["mwst"]:.2f}'.replace(".", ","),
            f'{z["brutto"]:.2f}'.replace(".", ","),
            "ja" if z["reverse_charge"] else "nein", z["kanal"],
        ])
    return puffer.getvalue()


def alkoholbilanz(con, von: date, bis: date) -> list[dict]:
    """Liter reiner Alkohol je Monat: erzeugt, abgefüllt, abgegangen."""
    return alle(con, """
        SELECT * FROM v_alkoholbilanz_monat WHERE monat BETWEEN date_trunc('month', %s::date)
        AND date_trunc('month', %s::date) ORDER BY monat""", von, bis)
