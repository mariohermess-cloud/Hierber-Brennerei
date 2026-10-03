"""Tests für das Rechnungsprogramm."""
from __future__ import annotations

from datetime import date, timedelta
from decimal import Decimal

import psycopg
import pytest

from rechnungsprogramm.app import berichte, logik, pdf, ubl

D = Decimal


def kunde_privat(con, name="Anna Muller"):
    return logik.kunde_anlegen(con, name=name, typ="privat", strasse="1, Haaptstrooss",
                               plz="L-6600", ort="Wasserbillig", land="LU")


def kunde_handel(con):
    return logik.kunde_anlegen(con, name="Restaurant Am Duerf", typ="geschaeft",
                               strasse="5, Duerfstrooss", plz="L-6700", ort="Grevenmacher",
                               land="LU", mwst_nr="LU87654321", preis_kanal="handel",
                               zahlungsziel_tage=14)


def kunde_ausland(con):
    return logik.kunde_anlegen(con, name="Weinhaus Trier GmbH", typ="geschaeft",
                               strasse="7, Moselstraße", plz="54290", ort="Trier",
                               land="DE", mwst_nr="DE123456789")


# ------------------------------------------------------------------ Kunden
def test_kundennummer_laeuft_hoch(con, stamm):
    a = kunde_privat(con, "Erste Kundin")
    b = kunde_privat(con, "Zweiter Kunde")
    assert a["nummer"].startswith("K-")
    assert int(b["nummer"][2:]) == int(a["nummer"][2:]) + 1


# ------------------------------------------------------------------ Preise
def test_preis_kommt_aus_der_preisliste(con, stamm):
    k = kunde_privat(con)
    r = logik.rechnung_anlegen(con, k["id"])
    p = logik.position_hinzufuegen(con, r["id"], stamm["v500"], D("2"))
    assert p["einzelpreis_netto"] == D("18.5000")
    assert p["netto"] == D("37.00")


def test_handelskunde_bekommt_handelspreis(con, stamm):
    k = kunde_handel(con)
    r = logik.rechnung_anlegen(con, k["id"], "handel")
    p = logik.position_hinzufuegen(con, r["id"], stamm["v500"], D("6"))
    assert p["einzelpreis_netto"] == D("14.8000")


def test_zahlungsziel_vom_kunden(con, stamm):
    k = kunde_handel(con)          # 14 Tage
    r = logik.rechnung_anlegen(con, k["id"], "handel", date(2026, 3, 1))
    assert r["faellig_am"] == date(2026, 3, 15)


# ------------------------------------------------------------------ Steuer
def test_zwei_steuersaetze_werden_je_satz_gerundet(con, stamm):
    k = kunde_privat(con)
    r = logik.rechnung_anlegen(con, k["id"])
    logik.position_hinzufuegen(con, r["id"], stamm["v500"], D("3"))    # 55,50 zu 17 %
    logik.position_hinzufuegen(con, r["id"], stamm["vchips"], D("4"))  # 14,00 zu 3 %
    kopf = logik.rechnung_voll(con, r["id"])
    saetze = {z["mwst_satz"]: z for z in kopf["mwst_aufteilung"]}
    assert saetze[D("0.1700")]["netto"] == D("55.50")
    assert saetze[D("0.1700")]["mwst"] == D("9.44")     # 55,50 x 0,17 = 9,435 -> 9,44
    assert saetze[D("0.0300")]["netto"] == D("14.00")
    assert saetze[D("0.0300")]["mwst"] == D("0.42")
    assert kopf["netto"] == D("69.50")
    assert kopf["mwst"] == D("9.86")
    assert kopf["brutto"] == D("79.36")


def test_rabatt_senkt_die_position(con, stamm):
    k = kunde_privat(con)
    r = logik.rechnung_anlegen(con, k["id"])
    p = logik.position_hinzufuegen(con, r["id"], stamm["v500"], D("10"), rabatt=D("10"))
    assert p["netto"] == D("166.50")   # 185,00 minus 10 %


def test_auslandskunde_ohne_steuer(con, stamm):
    k = kunde_ausland(con)
    r = logik.rechnung_anlegen(con, k["id"], "handel")
    assert r["reverse_charge"] is True
    logik.position_hinzufuegen(con, r["id"], stamm["v500"], D("12"))
    kopf = logik.rechnung_voll(con, r["id"])
    assert kopf["netto"] == D("222.00")
    assert kopf["mwst"] == D("0.00")
    assert kopf["brutto"] == D("222.00")


def test_inlandsfirma_bleibt_steuerpflichtig(con, stamm):
    k = kunde_handel(con)
    r = logik.rechnung_anlegen(con, k["id"], "handel")
    assert r["reverse_charge"] is False


# ------------------------------------------------------------------ Festschreiben
def test_nummern_sind_fortlaufend_und_lueckenlos(con, stamm):
    k = kunde_privat(con)
    nummern = []
    for _ in range(3):
        r = logik.rechnung_anlegen(con, k["id"], datum=date(2026, 5, 4))
        logik.position_hinzufuegen(con, r["id"], stamm["v500"], D("1"))
        nummern.append(logik.festschreiben(con, r["id"], stamm["benutzer"])["nummer"])
    assert nummern == ["R2026-0001", "R2026-0002", "R2026-0003"]


def test_jahreswechsel_beginnt_neu(con, stamm):
    k = kunde_privat(con)
    for jahr, erwartet in [(2026, "R2026-0001"), (2027, "R2027-0001")]:
        r = logik.rechnung_anlegen(con, k["id"], datum=date(jahr, 2, 2))
        logik.position_hinzufuegen(con, r["id"], stamm["v500"], D("1"))
        assert logik.festschreiben(con, r["id"])["nummer"] == erwartet


def test_entwurf_hat_keine_nummer(con, stamm):
    k = kunde_privat(con)
    r = logik.rechnung_anlegen(con, k["id"])
    assert r["nummer"] is None and r["status"] == "entwurf"


def test_leerer_beleg_kann_nicht_festgeschrieben_werden(con, stamm):
    k = kunde_privat(con)
    r = logik.rechnung_anlegen(con, k["id"])
    with pytest.raises(logik.Fehler, match="ohne Positionen"):
        logik.festschreiben(con, r["id"])


def test_zweimal_festschreiben_geht_nicht(con, stamm):
    k = kunde_privat(con)
    r = logik.rechnung_anlegen(con, k["id"])
    logik.position_hinzufuegen(con, r["id"], stamm["v500"], D("1"))
    logik.festschreiben(con, r["id"])
    with pytest.raises(logik.Fehler, match="bereits festgeschrieben"):
        logik.festschreiben(con, r["id"])


# ------------------------------------------------------------------ Unveränderlichkeit
def test_festgeschriebener_beleg_ist_unveraenderlich(con, stamm):
    k = kunde_privat(con)
    r = logik.rechnung_anlegen(con, k["id"])
    logik.position_hinzufuegen(con, r["id"], stamm["v500"], D("1"))
    fest = logik.festschreiben(con, r["id"])
    # Sicherungspunkte, damit der festgeschriebene Beleg nach dem Fehler noch da ist
    with pytest.raises(psycopg.errors.RaiseException, match="unveränderlich"):
        with con.transaction():
            con.execute("UPDATE rechnung SET netto = 1 WHERE id = %s", (fest["id"],))
    with pytest.raises(psycopg.errors.RaiseException, match="nicht gelöscht"):
        with con.transaction():
            con.execute("DELETE FROM rechnung WHERE id = %s", (fest["id"],))
    assert logik.beleg(con, fest["id"])["status"] == "festgeschrieben"


def test_positionen_festgeschriebener_belege_sind_gesperrt(con, stamm):
    k = kunde_privat(con)
    r = logik.rechnung_anlegen(con, k["id"])
    logik.position_hinzufuegen(con, r["id"], stamm["v500"], D("1"))
    logik.festschreiben(con, r["id"])
    with pytest.raises(logik.Fehler, match="nicht mehr geändert"):
        logik.position_hinzufuegen(con, r["id"], stamm["v200"], D("1"))


def test_entwurf_darf_bearbeitet_werden(con, stamm):
    k = kunde_privat(con)
    r = logik.rechnung_anlegen(con, k["id"])
    p = logik.position_hinzufuegen(con, r["id"], stamm["v500"], D("2"))
    logik.position_loeschen(con, p["id"])
    assert logik.rechnung_voll(con, r["id"])["netto"] == D("0.00")


# ------------------------------------------------------------------ Lager
def test_festschreiben_bucht_lagerabgang(con, stamm):
    k = kunde_privat(con)
    con.execute("""INSERT INTO lagerbewegung (variante_id, lagerort_id, menge, grund, benutzer_id)
                   VALUES (%s, (SELECT id FROM lagerort WHERE code='HOFLADEN'), 50, 'abfuellung', %s)""",
                (stamm["v500"], stamm["benutzer"]))
    r = logik.rechnung_anlegen(con, k["id"], "hofladen")
    logik.position_hinzufuegen(con, r["id"], stamm["v500"], D("6"))
    fest = logik.festschreiben(con, r["id"], stamm["benutzer"])
    bestand = con.execute("""SELECT COALESCE(SUM(menge),0) AS n FROM lagerbewegung
                             WHERE variante_id = %s""", (stamm["v500"],)).fetchone()
    assert bestand["n"] == 44
    bewegung = con.execute("""SELECT grund, menge FROM lagerbewegung
                              WHERE beleg_ref = %s""", (fest["nummer"],)).fetchone()
    assert bewegung["grund"] == "verkauf_hofladen" and bewegung["menge"] == -6


def test_freie_position_bucht_kein_lager(con, stamm):
    k = kunde_privat(con)
    r = logik.rechnung_anlegen(con, k["id"], "fuehrung")
    logik.position_frei(con, r["id"], "Führung mit Verkostung, 8 Personen", D("8"), D("15.00"), D("0.17"), "Person")
    fest = logik.festschreiben(con, r["id"])
    anzahl = con.execute("SELECT count(*) AS n FROM lagerbewegung WHERE beleg_ref = %s",
                         (fest["nummer"],)).fetchone()
    assert anzahl["n"] == 0
    assert logik.rechnung_voll(con, r["id"])["netto"] == D("120.00")


def test_umsatzspiegel_wird_geschrieben(con, stamm):
    k = kunde_privat(con)
    r = logik.rechnung_anlegen(con, k["id"], "web")
    logik.position_hinzufuegen(con, r["id"], stamm["v500"], D("2"))
    fest = logik.festschreiben(con, r["id"])
    beleg = con.execute("SELECT * FROM verkaufsbeleg WHERE extern_ref = %s", (fest["nummer"],)).fetchone()
    assert beleg["kanal"] == "web" and beleg["netto_summe"] == D("37.00")


# ------------------------------------------------------------------ Gutschrift
def test_gutschrift_dreht_betrag_und_lager(con, stamm):
    k = kunde_privat(con)
    r = logik.rechnung_anlegen(con, k["id"], "hofladen")
    logik.position_hinzufuegen(con, r["id"], stamm["v500"], D("4"))
    fest = logik.festschreiben(con, r["id"], stamm["benutzer"])

    g = logik.gutschrift(con, fest["id"], "Bruch bei der Lieferung")
    assert g["art"] == "gutschrift" and g["status"] == "entwurf"
    gfest = logik.festschreiben(con, g["id"], stamm["benutzer"])
    assert gfest["nummer"].startswith("G")
    assert gfest["brutto"] == fest["brutto"]

    zugang = con.execute("""SELECT grund, menge FROM lagerbewegung WHERE beleg_ref = %s""",
                         (gfest["nummer"],)).fetchone()
    assert zugang["grund"] == "retoure" and zugang["menge"] == 4
    assert logik.offener_betrag(con, fest["id"]) == D("0.00")


def test_teilgutschrift_moeglich(con, stamm):
    k = kunde_privat(con)
    r = logik.rechnung_anlegen(con, k["id"])
    logik.position_hinzufuegen(con, r["id"], stamm["v500"], D("10"))
    fest = logik.festschreiben(con, r["id"])
    g = logik.gutschrift(con, fest["id"])
    pos = logik.positionen(con, g["id"])[0]
    con.execute("UPDATE rechnungsposition SET menge = 2 WHERE id = %s", (pos["id"],))
    con.execute("SELECT rechnung_summen_neu(%s)", (g["id"],))
    gfest = logik.festschreiben(con, g["id"])
    assert gfest["netto"] == D("37.00")
    assert logik.offener_betrag(con, fest["id"]) == D("173.16")   # 216,45 minus 43,29


def test_gutschrift_nur_zu_festgeschriebener_rechnung(con, stamm):
    k = kunde_privat(con)
    r = logik.rechnung_anlegen(con, k["id"])
    logik.position_hinzufuegen(con, r["id"], stamm["v500"], D("1"))
    with pytest.raises(logik.Fehler, match="festgeschriebenen Rechnung"):
        logik.gutschrift(con, r["id"])


# ------------------------------------------------------------------ Zahlungen
def test_teilzahlung_und_ausgleich(con, stamm):
    k = kunde_privat(con)
    r = logik.rechnung_anlegen(con, k["id"])
    logik.position_hinzufuegen(con, r["id"], stamm["v500"], D("4"))
    fest = logik.festschreiben(con, r["id"])
    assert fest["brutto"] == D("86.58")

    logik.zahlung_erfassen(con, fest["id"], D("50.00"), "ueberweisung")
    assert logik.offener_betrag(con, fest["id"]) == D("36.58")
    logik.zahlung_erfassen(con, fest["id"], D("36.58"), "bar")
    assert logik.offener_betrag(con, fest["id"]) == D("0.00")
    assert not [o for o in berichte.offene_posten(con) if o["id"] == fest["id"]]


def test_zahlung_nur_auf_festgeschriebene_belege(con, stamm):
    k = kunde_privat(con)
    r = logik.rechnung_anlegen(con, k["id"])
    with pytest.raises(logik.Fehler, match="festgeschriebenen"):
        logik.zahlung_erfassen(con, r["id"], D("10.00"))


def test_ueberfaellige_rechnung_erscheint_in_mahnliste(con, stamm):
    k = kunde_privat(con)
    alt = date.today() - timedelta(days=60)
    r = logik.rechnung_anlegen(con, k["id"], datum=alt)
    logik.position_hinzufuegen(con, r["id"], stamm["v500"], D("1"))
    fest = logik.festschreiben(con, r["id"])
    mahnung = [m for m in berichte.mahnliste(con, 14) if m["id"] == fest["id"]]
    assert mahnung and mahnung[0]["tage_ueberfaellig"] >= 29


# ------------------------------------------------------------------ Stornierung
def test_storno_ohne_zahlung_moeglich(con, stamm):
    k = kunde_privat(con)
    r = logik.rechnung_anlegen(con, k["id"])
    logik.position_hinzufuegen(con, r["id"], stamm["v500"], D("1"))
    fest = logik.festschreiben(con, r["id"])
    storno = logik.stornieren(con, fest["id"], "Doppelt erfasst")
    assert storno["status"] == "storniert" and storno["nummer"] == fest["nummer"]


def test_storno_mit_zahlung_verweigert(con, stamm):
    k = kunde_privat(con)
    r = logik.rechnung_anlegen(con, k["id"])
    logik.position_hinzufuegen(con, r["id"], stamm["v500"], D("1"))
    fest = logik.festschreiben(con, r["id"])
    logik.zahlung_erfassen(con, fest["id"], D("5.00"))
    with pytest.raises(logik.Fehler, match="Gutschrift"):
        logik.stornieren(con, fest["id"], "zu spät")


# ------------------------------------------------------------------ Berichte
def test_mwst_meldung_zieht_gutschrift_ab(con, stamm):
    k = kunde_privat(con)
    tag = date(2026, 6, 15)
    r = logik.rechnung_anlegen(con, k["id"], datum=tag)
    logik.position_hinzufuegen(con, r["id"], stamm["v500"], D("10"))   # 185,00 netto
    fest = logik.festschreiben(con, r["id"])
    g = logik.gutschrift(con, fest["id"])
    pos = logik.positionen(con, g["id"])[0]
    con.execute("UPDATE rechnungsposition SET menge = 2 WHERE id = %s", (pos["id"],))
    con.execute("SELECT rechnung_summen_neu(%s)", (g["id"],))
    con.execute("UPDATE rechnung SET datum = %s WHERE id = %s", (tag, g["id"]))
    logik.festschreiben(con, g["id"])

    m = berichte.mwst_meldung(con, date(2026, 6, 1), date(2026, 6, 30))
    assert m["netto_gesamt"] == D("148.00")        # 185,00 minus 37,00
    assert m["mwst_gesamt"] == D("25.16")          # 31,45 minus 6,29


def test_reverse_charge_erscheint_getrennt(con, stamm):
    k = kunde_ausland(con)
    r = logik.rechnung_anlegen(con, k["id"], "handel", date(2026, 7, 3))
    logik.position_hinzufuegen(con, r["id"], stamm["v500"], D("20"))
    logik.festschreiben(con, r["id"])
    m = berichte.mwst_meldung(con, date(2026, 7, 1), date(2026, 7, 31))
    assert m["mwst_gesamt"] == D("0.00")
    assert m["innergemeinschaftlich"][0]["land"] == "DE"
    assert m["innergemeinschaftlich"][0]["netto"] == D("370.00")


def test_journal_csv_hat_kopfzeile_und_werte(con, stamm):
    k = kunde_privat(con)
    r = logik.rechnung_anlegen(con, k["id"], datum=date(2026, 8, 1))
    logik.position_hinzufuegen(con, r["id"], stamm["v500"], D("2"))
    fest = logik.festschreiben(con, r["id"])
    csv_text = berichte.journal_csv(con, date(2026, 8, 1), date(2026, 8, 31))
    zeilen = csv_text.strip().split("\r\n")
    assert zeilen[0].startswith("Belegnummer;Art;Datum")
    assert fest["nummer"] in zeilen[1]
    assert "37,00" in zeilen[1]


def test_journal_weist_bei_reverse_charge_keine_steuer_aus(con, stamm):
    k = kunde_ausland(con)
    r = logik.rechnung_anlegen(con, k["id"], "handel", date(2026, 10, 5))
    logik.position_hinzufuegen(con, r["id"], stamm["v500"], D("10"))
    fest = logik.festschreiben(con, r["id"])
    zeile = [z for z in berichte.journal(con, date(2026, 10, 1), date(2026, 10, 31))
             if z["nummer"] == fest["nummer"]][0]
    assert zeile["netto"] == D("185.00")
    assert zeile["mwst"] == D("0.00")
    assert zeile["brutto"] == D("185.00") == fest["brutto"]


def test_umsatz_nach_kanal(con, stamm):
    k = kunde_privat(con)
    for kanal, menge in [("hofladen", D("2")), ("web", D("3")), ("web", D("1"))]:
        r = logik.rechnung_anlegen(con, k["id"], kanal, date(2026, 9, 9))
        logik.position_hinzufuegen(con, r["id"], stamm["v500"], menge)
        logik.festschreiben(con, r["id"])
    zeilen = {z["kanal"]: z for z in berichte.umsatz_kanal(con, date(2026, 9, 1), date(2026, 9, 30))}
    assert zeilen["web"]["netto"] == D("74.00")
    assert zeilen["hofladen"]["rechnungen"] == 1


def test_funktionen_arbeiten_ohne_suchpfad(con, stamm):
    """Die Datenbankfunktionen und Trigger dürfen nicht vom search_path des Aufrufers abhängen.

    Wichtig, weil psql, Backup-Skripte oder die Fiduciaire mit einem anderen Pfad zugreifen.
    """
    k = kunde_privat(con, "Ohne Suchpfad")
    con.execute("SET LOCAL search_path TO public")
    r = con.execute("SELECT * FROM brennerei.rechnung_anlegen(%s)", (k["id"],)).fetchone()
    con.execute("SELECT brennerei.position_hinzufuegen(%s, %s, 2)", (r["id"], stamm["v500"]))
    fest = con.execute("SELECT * FROM brennerei.rechnung_festschreiben(%s)", (r["id"],)).fetchone()
    assert fest["nummer"] and fest["netto"] == D("37.00")
    # auch der Schutztrigger muss ohne Suchpfad greifen
    with pytest.raises(psycopg.errors.RaiseException, match="unveränderlich"):
        with con.transaction():
            con.execute("UPDATE brennerei.rechnung SET netto = 1 WHERE id = %s", (fest["id"],))


def test_alkoholgehalt_ohne_nachkomma_null(con, stamm):
    k = kunde_privat(con)
    r = logik.rechnung_anlegen(con, k["id"])
    p = logik.position_hinzufuegen(con, r["id"], stamm["v500"], D("1"))
    assert p["bezeichnung"] == "Apfelbrand, 500 ml · 40 % vol"
    assert p["einheit"] == "Flasche"


def test_chips_werden_in_gramm_abgerechnet(con, stamm):
    """Nicht alles ist flüssig: Chips und Honig zählen in Gramm, nicht in Millilitern."""
    k = kunde_privat(con)
    r = logik.rechnung_anlegen(con, k["id"])
    p = logik.position_hinzufuegen(con, r["id"], stamm["vchips"], D("3"))
    assert p["bezeichnung"] == "Apfelchips, 80 g"
    assert p["einheit"] == "Packung"
    preis = con.execute("""SELECT grundpreis_brutto_je_l, grundpreis_einheit
                           FROM v_preis_aktuell WHERE variante_id = %s""", (stamm["vchips"],)).fetchone()
    assert preis["grundpreis_einheit"] == "€/kg"


# ------------------------------------------------------------------ Ausgabe
def test_pdf_wird_erzeugt(con, stamm):
    k = kunde_privat(con)
    r = logik.rechnung_anlegen(con, k["id"])
    logik.position_hinzufuegen(con, r["id"], stamm["v500"], D("3"))
    logik.position_hinzufuegen(con, r["id"], stamm["vchips"], D("2"))
    fest = logik.festschreiben(con, r["id"])
    daten = pdf.erzeugen(logik.rechnung_voll(con, fest["id"]))
    assert daten.startswith(b"%PDF-") and daten.rstrip().endswith(b"%%EOF")
    assert len(daten) > 1500


def test_pdf_auch_fuer_entwurf(con, stamm):
    k = kunde_privat(con)
    r = logik.rechnung_anlegen(con, k["id"])
    logik.position_hinzufuegen(con, r["id"], stamm["v500"], D("1"))
    assert pdf.erzeugen(logik.rechnung_voll(con, r["id"])).startswith(b"%PDF-")


def test_euro_formatiert_deutsch():
    assert pdf.euro(D("1234.5")) == "1.234,50"
    assert pdf.euro(D("-43.29")) == "-43,29"
    assert pdf.euro(0) == "0,00"


def test_ubl_enthaelt_pflichtfelder(con, stamm):
    k = kunde_handel(con)
    r = logik.rechnung_anlegen(con, k["id"], "handel")
    logik.position_hinzufuegen(con, r["id"], stamm["v500"], D("6"))
    fest = logik.festschreiben(con, r["id"])
    xml = ubl.erzeugen(logik.rechnung_voll(con, fest["id"])).decode()
    assert "<cbc:ID>" + fest["nummer"] + "</cbc:ID>" in xml
    assert "<cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>" in xml
    assert "LU12345678" in xml and "LU87654321" in xml
    assert '<cbc:PayableAmount currencyID="EUR">' in xml
    assert "<cbc:Percent>17.00</cbc:Percent>" in xml


def test_ubl_markiert_reverse_charge(con, stamm):
    k = kunde_ausland(con)
    r = logik.rechnung_anlegen(con, k["id"], "handel")
    logik.position_hinzufuegen(con, r["id"], stamm["v500"], D("10"))
    fest = logik.festschreiben(con, r["id"])
    xml = ubl.erzeugen(logik.rechnung_voll(con, fest["id"])).decode()
    assert "<cbc:ID>AE</cbc:ID>" in xml and "VATEX-EU-AE" in xml


def test_ubl_gutschrift_nutzt_eigenen_typ(con, stamm):
    k = kunde_privat(con)
    r = logik.rechnung_anlegen(con, k["id"])
    logik.position_hinzufuegen(con, r["id"], stamm["v500"], D("1"))
    fest = logik.festschreiben(con, r["id"])
    g = logik.festschreiben(con, logik.gutschrift(con, fest["id"])["id"])
    xml = ubl.erzeugen(logik.rechnung_voll(con, g["id"])).decode()
    assert xml.startswith("<?xml") and "<CreditNote" in xml
    assert "<cbc:CreditNoteTypeCode>381</cbc:CreditNoteTypeCode>" in xml
    assert fest["nummer"] in xml
