"""Tests der JSON-Schnittstelle für die Etiketten-App."""
from __future__ import annotations

from datetime import date
from decimal import Decimal as D

import pytest
from fastapi.testclient import TestClient


@pytest.fixture()
def klient(datenbank, stamm, con):
    from rechnungsprogramm.app.web import app
    con.commit()   # Stammdaten sichtbar machen, die App nutzt eigene Verbindungen
    return TestClient(app)


@pytest.fixture()
def fass(con, stamm):
    """Ein befülltes Fass, das für den Apfelbrand aktiv ist."""
    f = con.execute("""
        INSERT INTO fass (fassnummer, produkt_id, material, volumen_l, fuellstand_l, alkohol_vol, befuellt_am)
        VALUES ('F-017', (SELECT produkt_id FROM variante WHERE id = %s), 'edelstahl', 300, 300, 41.5, CURRENT_DATE)
        ON CONFLICT (fassnummer) DO UPDATE SET fuellstand_l = 300 RETURNING id""", (stamm["v500"],)).fetchone()
    con.execute("""
        INSERT INTO fass (fassnummer, produkt_id, material, volumen_l, fuellstand_l, alkohol_vol)
        VALUES ('F-018', (SELECT produkt_id FROM variante WHERE id = %s), 'eiche', 225, 225, 41.0)
        ON CONFLICT (fassnummer) DO NOTHING""", (stamm["v500"],))
    con.execute("SELECT fass_wechseln((SELECT produkt_id FROM variante WHERE id = %s), %s, %s::smallint)",
                (stamm["v500"], f["id"], stamm["benutzer"]))
    con.commit()
    yield f
    con.execute("DELETE FROM etikettendruck")
    con.execute("DELETE FROM lagerbewegung WHERE grund = 'abfuellung'")
    con.execute("DELETE FROM abfuellung")
    con.execute("DELETE FROM fass_aktiv")
    con.execute("DELETE FROM fass WHERE fassnummer IN ('F-017','F-018')")
    con.commit()


def test_produkte_zeigen_aktives_fass(klient, fass):
    antwort = klient.get("/api/produkte")
    assert antwort.status_code == 200
    apfel = [p for p in antwort.json()["produkte"] if p["sku"] == "APF-BRD-001"][0]
    assert apfel["aktives_fass"] == "F-017"
    assert {v["sku"] for v in apfel["varianten"]} == {"APF-BRD-001-500", "APF-BRD-001-200"}


def test_etikett_liefert_fassnummer_und_pflichtangaben(klient, fass):
    e = klient.get("/api/etikett/APF-BRD-001-500").json()
    assert e["aktive_fassnummer"] == "F-017"
    assert e["alkohol_vol"] == 40.0
    assert e["fuellmenge_ml"] == 500
    assert e["losnummer_vorschau"].startswith("F017-")
    assert e["firma_name"] == "Hierber Brennerei"
    assert e["preis_brutto"] == 21.65


def test_etikett_unbekannt_gibt_404(klient, fass):
    assert klient.get("/api/etikett/GIBTSNICHT").status_code == 404


def test_fasswechsel_ueber_die_schnittstelle(klient, fass):
    antwort = klient.post("/api/fass/wechseln", json={
        "produkt_sku": "APF-BRD-001", "fassnummer": "F-018", "benutzer": "MH"})
    assert antwort.status_code == 200
    assert antwort.json()["fassnummer"] == "F-018"
    assert klient.get("/api/etikett/APF-BRD-001-500").json()["aktive_fassnummer"] == "F-018"


def test_fasswechsel_auf_leeres_fass_wird_abgelehnt(klient, fass, con):
    con.execute("UPDATE fass SET status = 'leer', fuellstand_l = 0 WHERE fassnummer = 'F-018'")
    con.commit()
    antwort = klient.post("/api/fass/wechseln", json={
        "produkt_sku": "APF-BRD-001", "fassnummer": "F-018"})
    assert antwort.status_code == 409
    assert "leer" in antwort.json()["detail"]


def test_unbekanntes_benutzerkuerzel_wird_abgelehnt(klient, fass):
    antwort = klient.post("/api/fass/wechseln", json={
        "produkt_sku": "APF-BRD-001", "fassnummer": "F-018", "benutzer": "XX"})
    assert antwort.status_code == 400


def test_abfuellung_liefert_losnummer_und_senkt_fuellstand(klient, fass):
    antwort = klient.post("/api/abfuellung", json={
        "variante_sku": "APF-BRD-001-500", "anzahl_flaschen": 60, "benutzer": "MH"})
    assert antwort.status_code == 200
    daten = antwort.json()
    assert daten["losnummer"].startswith("F017-")
    assert daten["anzahl_flaschen"] == 60
    assert float(daten["liter_abgefuellt"]) == 30.0
    rest = [f for f in klient.get("/api/faesser?produkt_sku=APF-BRD-001").json()["faesser"]
            if f["fassnummer"] == "F-017"][0]
    assert float(rest["fuellstand_l"]) == 270.0


def test_zwei_abfuellungen_am_selben_tag_bekommen_verschiedene_lose(klient, fass):
    a = klient.post("/api/abfuellung", json={"variante_sku": "APF-BRD-001-500", "anzahl_flaschen": 10}).json()
    b = klient.post("/api/abfuellung", json={"variante_sku": "APF-BRD-001-200", "anzahl_flaschen": 10}).json()
    assert a["losnummer"] != b["losnummer"]


def test_abfuellung_ohne_aktives_fass_wird_abgelehnt(klient, fass, con):
    con.execute("UPDATE fass_aktiv SET aktiv_bis = now() WHERE aktiv_bis IS NULL")
    con.commit()
    antwort = klient.post("/api/abfuellung", json={
        "variante_sku": "APF-BRD-001-500", "anzahl_flaschen": 5})
    assert antwort.status_code == 409
    assert "Kein aktives Fass" in antwort.json()["detail"]


def test_druck_wird_protokolliert(klient, fass):
    los = klient.post("/api/abfuellung", json={
        "variante_sku": "APF-BRD-001-500", "anzahl_flaschen": 20}).json()["losnummer"]
    antwort = klient.post("/api/etikettendruck", json={
        "variante_sku": "APF-BRD-001-500", "anzahl": 20, "vorlage": "500ml-vorne",
        "drucker": "Brother QL-820", "benutzer": "MH"})
    assert antwort.status_code == 200
    assert antwort.json()["losnummer"] == los
    assert antwort.json()["anzahl"] == 20


def test_losnummer_abfragen(klient, fass):
    klient.post("/api/abfuellung", json={"variante_sku": "APF-BRD-001-500", "anzahl_flaschen": 12})
    antwort = klient.get("/api/losnummer/APF-BRD-001-500")
    assert antwort.status_code == 200
    assert antwort.json()["fassnummer"] == "F-017"


def test_token_schuetzt_die_schnittstelle(monkeypatch, datenbank, stamm, con):
    con.commit()
    monkeypatch.setattr("rechnungsprogramm.app.api.TOKEN", "geheim")
    from rechnungsprogramm.app.web import app
    k = TestClient(app)
    assert k.get("/api/produkte").status_code == 401
    assert k.get("/api/produkte", headers={"Authorization": "Bearer falsch"}).status_code == 401
    assert k.get("/api/produkte", headers={"Authorization": "Bearer geheim"}).status_code == 200
