"""Testdatenbank: frisches Schema, Stammdaten einmal je Lauf, Belege je Test zurückgerollt."""
from __future__ import annotations

import os
import subprocess
from pathlib import Path

import psycopg
import pytest
from psycopg.rows import dict_row

WURZEL = Path(__file__).resolve().parents[2]
BASIS = os.environ.get("BRENNEREI_TEST_DB",
                       "postgresql://postgres@/postgres?host=/home/user/pg&port=5433")
TESTDB = "brennerei_test"
SUCHPFAD = "-c search_path=brennerei,public"


def _url(datenbank: str) -> str:
    return BASIS.replace("/postgres?", f"/{datenbank}?")


@pytest.fixture(scope="session")
def datenbank():
    """Legt die Testdatenbank neu an und spielt beide Schemadateien ein."""
    with psycopg.connect(BASIS, autocommit=True) as con:
        con.execute(f"DROP DATABASE IF EXISTS {TESTDB} WITH (FORCE)")
        con.execute(f"CREATE DATABASE {TESTDB}")
    ziel = _url(TESTDB)
    for datei in ["001_schema.sql", "002_rechnung.sql"]:
        ergebnis = subprocess.run(
            ["psql", ziel, "-q", "-v", "ON_ERROR_STOP=1", "-f", str(WURZEL / "datenbank" / datei)],
            capture_output=True, text=True)
        assert ergebnis.returncode == 0, ergebnis.stderr
    os.environ["BRENNEREI_DB"] = ziel
    return ziel


@pytest.fixture(scope="session")
def stamm(datenbank):
    """Firma, Benutzer, zwei Produkte mit Varianten und Preisen. Einmal je Testlauf."""
    with psycopg.connect(datenbank, row_factory=dict_row, options=SUCHPFAD) as con:
        con.execute("""
            UPDATE firma SET mwst_nr = 'LU12345678', iban = 'LU28 0019 4006 4475 0000',
                             bic = 'BCEELULL', bank = 'Spuerkeess' WHERE id = 1""")
        b = con.execute("""INSERT INTO benutzer (kuerzel, name, rolle)
                           VALUES ('MH','Mario','inhaber') RETURNING id""").fetchone()
        p = con.execute("""
            INSERT INTO produkt (sku, name_de, obstart_id, produkttyp_id, alkohol_vol, online_sichtbar)
            VALUES ('APF-BRD-001','Apfelbrand',
                    (SELECT id FROM obstart WHERE code='APF'),(SELECT id FROM produkttyp WHERE code='BRD'),
                    40.0, true) RETURNING id""").fetchone()
        chips = con.execute("""
            INSERT INTO produkt (sku, name_de, obstart_id, produkttyp_id, online_sichtbar)
            VALUES ('APF-CHP-001','Apfelchips',
                    (SELECT id FROM obstart WHERE code='APF'),(SELECT id FROM produkttyp WHERE code='CHP'), true)
            RETURNING id""").fetchone()
        varianten = {}
        for schluessel, produkt_id, ml, sku, satz, preis in [
            ("v500", p["id"], 500, "APF-BRD-001-500", "NORMAL", "18.50"),
            ("v200", p["id"], 200, "APF-BRD-001-200", "NORMAL", "9.50"),
            ("vchips", chips["id"], 80, "APF-CHP-001-080", "STARK_ERM", "3.50"),
        ]:
            einheit = "g" if "CHP" in sku else "ml"
            v = con.execute("""
                INSERT INTO variante (produkt_id, fuellmenge_ml, grundeinheit, sku, mwst_satz_id, online_verkauf)
                VALUES (%s, %s, %s, %s, (SELECT id FROM mwst_satz WHERE code = %s), true)
                RETURNING id""", (produkt_id, ml, einheit, sku, satz)).fetchone()
            con.execute("""INSERT INTO preisliste (variante_id, preis_netto, gueltig_ab)
                           VALUES (%s, %s, '2020-01-01')""", (v["id"], preis))
            varianten[schluessel] = v["id"]
        con.execute("""INSERT INTO preisliste (variante_id, kanal, preis_netto, gueltig_ab)
                       VALUES (%s, 'handel', 14.80, '2020-01-01')""", (varianten["v500"],))
        con.commit()
        return {"benutzer": b["id"], **varianten}


@pytest.fixture()
def con(datenbank, stamm):
    """Eigene Verbindung je Test. Alles, was der Test schreibt, wird zurückgerollt."""
    with psycopg.connect(datenbank, row_factory=dict_row, options=SUCHPFAD) as c:
        yield c
        c.rollback()
