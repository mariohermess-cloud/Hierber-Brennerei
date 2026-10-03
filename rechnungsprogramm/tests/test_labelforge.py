"""Tests der Brücke zur Etiketten-App LabelForge."""
from __future__ import annotations

import csv
import io
from decimal import Decimal as D

import pytest
from fastapi.testclient import TestClient

from rechnungsprogramm.app import labelforge


@pytest.fixture()
def klient(datenbank, stamm, con):
    from rechnungsprogramm.app.web import app
    con.commit()
    return TestClient(app)


@pytest.fixture()
def abgefuellt(con, stamm):
    """Ein aktives Fass F-017 und eine Abfüllung, damit eine Losnummer existiert."""
    con.execute("""
        UPDATE firma SET mwst_nr='LU12345678', telefon='727 602',
                         web='www.hierber-brennerei.lu' WHERE id = 1""")
    f = con.execute("""
        INSERT INTO fass (fassnummer, produkt_id, material, volumen_l, fuellstand_l, alkohol_vol)
        VALUES ('F-017', (SELECT produkt_id FROM variante WHERE id = %s), 'edelstahl', 300, 300, 41.5)
        ON CONFLICT (fassnummer) DO UPDATE SET fuellstand_l = 300 RETURNING id""",
        (stamm["v500"],)).fetchone()
    con.execute("SELECT fass_wechseln((SELECT produkt_id FROM variante WHERE id = %s), %s, %s::smallint)",
                (stamm["v500"], f["id"], stamm["benutzer"]))
    con.execute("SELECT abfuellung_buchen(%s, 60, %s::smallint, '2026-09-20')",
                (stamm["v500"], stamm["benutzer"]))
    con.commit()
    yield
    con.execute("DELETE FROM lagerbewegung WHERE grund = 'abfuellung'")
    con.execute("DELETE FROM abfuellung")
    con.execute("DELETE FROM fass_aktiv")
    con.execute("DELETE FROM fass WHERE fassnummer = 'F-017'")
    con.commit()


def test_spalten_heissen_wie_die_variablen_der_vorlage(klient):
    """Die Namen stammen aus DEFAULT_FIELDS der Etiketten-App."""
    spalten = klient.get("/api/labelforge/spalten").json()
    for name in ["product_name", "category", "origin", "volume", "abv",
                 "producer", "address", "street", "phone", "website", "batch"]:
        assert name in spalten["variablen"], name
    assert "fass" in spalten["zusatzspalten"]
    assert "los" in spalten["zusatzspalten"]


def test_chargencode_traegt_die_losnummer_mit_der_fassnummer(klient, abgefuellt):
    zeile = [z for z in klient.get("/api/labelforge/zeilen").json()["zeilen"]
             if z["sku"] == "APF-BRD-001-500"][0]
    assert zeile["batch"] == "F017-260920"
    assert zeile["fass"] == "F-017"
    assert zeile["los"] == zeile["batch"]
    assert zeile["abgefuellt_am"] == "20.09.2026"


def test_fuellmenge_und_alkohol_in_druckform(klient, abgefuellt):
    zeilen = {z["sku"]: z for z in klient.get("/api/labelforge/zeilen").json()["zeilen"]}
    assert zeilen["APF-BRD-001-500"]["volume"] == "0,5 l"
    assert zeilen["APF-BRD-001-200"]["volume"] == "0,2 l"
    assert zeilen["APF-BRD-001-500"]["abv"] == "40% vol."
    assert zeilen["APF-CHP-001-080"]["volume"] == "80 g"     # Chips zählen in Gramm
    assert zeilen["APF-CHP-001-080"]["abv"] == ""            # kein Alkohol


def test_erzeugerangaben_kommen_aus_der_firma(klient, abgefuellt):
    zeile = klient.get("/api/labelforge/zeilen").json()["zeilen"][0]
    assert zeile["producer"] == "Hierber Brennerei"
    assert "Millewee" in zeile["street"]
    assert "Herborn" in zeile["street"]
    assert zeile["phone"] == "Tél: 727 602"
    assert zeile["website"] == zeile["web"] == "www.hierber-brennerei.lu"


def test_auswahl_einzelner_varianten(klient, abgefuellt):
    antwort = klient.get("/api/labelforge/zeilen?sku=APF-BRD-001-500")
    assert antwort.json()["anzahl"] == 1
    assert antwort.json()["zeilen"][0]["sku"] == "APF-BRD-001-500"


def test_nur_mit_fass_laesst_produkte_ohne_aktives_fass_weg(klient, abgefuellt):
    alle_zeilen = klient.get("/api/labelforge/zeilen").json()["anzahl"]
    mit_fass = klient.get("/api/labelforge/zeilen?nur_mit_fass=true").json()
    assert mit_fass["anzahl"] < alle_zeilen
    assert all(z["fass"] for z in mit_fass["zeilen"])


def test_kopien_steuern_die_druckmenge(klient, abgefuellt):
    zeile = klient.get("/api/labelforge/zeilen?sku=APF-BRD-001-500&kopien=250").json()["zeilen"][0]
    assert zeile["copies"] == "250"


def test_csv_hat_kopfzeile_semikolon_und_bom(klient, abgefuellt):
    antwort = klient.get("/api/labelforge/serie.csv?sku=APF-BRD-001-500&kopien=60")
    assert antwort.status_code == 200
    roh = antwort.content
    assert roh.startswith(b"\xef\xbb\xbf")        # BOM, damit Excel richtig öffnet
    text = roh.decode("utf-8-sig")
    leser = csv.DictReader(io.StringIO(text), delimiter=";")
    zeilen = list(leser)
    assert leser.fieldnames[:3] == ["product_name", "subtitle", "category"]
    assert len(zeilen) == 1
    assert zeilen[0]["batch"] == "F017-260920"
    assert zeilen[0]["copies"] == "60"
    assert zeilen[0]["dateiname"] == "APF-BRD-001-500-F017-260920"


def test_csv_ohne_treffer_gibt_404(klient):
    assert klient.get("/api/labelforge/serie.csv?sku=GIBTSNICHT").status_code == 404


def test_zeile_ohne_abfuellung_bleibt_beim_chargencode_leer(klient, abgefuellt):
    zeile = [z for z in klient.get("/api/labelforge/zeilen").json()["zeilen"]
             if z["sku"] == "APF-CHP-001-080"][0]
    assert zeile["batch"] == "" and zeile["los"] == ""
    assert zeile["product_name"] == "Apfelchips"


def test_mengenformatierung_direkt():
    assert labelforge._menge(500, "ml") == "0,5 l"
    assert labelforge._menge(1000, "ml") == "1 l"
    assert labelforge._menge(2000, "ml") == "2 l"
    assert labelforge._menge(50, "ml") == "50 ml"
    assert labelforge._menge(80, "g") == "80 g"
    assert labelforge._vol(D("40.0")) == "40% vol."
    assert labelforge._vol(D("43.5")) == "43,5% vol."
    assert labelforge._vol(None) == ""
