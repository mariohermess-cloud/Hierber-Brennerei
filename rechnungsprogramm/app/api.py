"""JSON-Schnittstelle für die Etiketten-App (LabelForge).

Die App muss nichts über die Datenbank wissen. Sie fragt hier nach, welches Fass
gerade aktiv ist, welche Angaben aufs Etikett gehören, und meldet zurück, was
abgefüllt und gedruckt wurde. Alle Regeln bleiben in der Datenbank.

Schutz: Ist BRENNEREI_API_TOKEN gesetzt, muss jede Anfrage den Kopf
`Authorization: Bearer <token>` mitschicken. Ohne gesetztes Token ist die
Schnittstelle offen, was nur im abgeschotteten Heimnetz vertretbar ist.
"""
from __future__ import annotations

import os
import secrets
from datetime import date
from decimal import Decimal

import psycopg
from fastapi import APIRouter, Header, HTTPException, Query
from fastapi.responses import Response
from pydantic import BaseModel, Field

from . import labelforge, logik
from .db import alle, eine, verbindung

TOKEN = os.environ.get("BRENNEREI_API_TOKEN", "")
api = APIRouter(prefix="/api", tags=["Etiketten"])


def _pruefe(authorization: str | None) -> None:
    if not TOKEN:
        return
    erwartet = f"Bearer {TOKEN}"
    if not authorization or not secrets.compare_digest(authorization, erwartet):
        raise HTTPException(401, "Ungültiges oder fehlendes Token.")


# ----------------------------------------------------------------- Modelle
class FassWechsel(BaseModel):
    produkt_sku: str = Field(..., description="Artikelnummer des Produkts, z. B. APF-BRD-001")
    fassnummer: str = Field(..., description="Nummer des neuen Fasses, genau wie auf dem Fass")
    benutzer: str | None = Field(None, description="Kürzel der Person, die wechselt")
    bemerkung: str | None = None


class Abfuellung(BaseModel):
    variante_sku: str = Field(..., description="Artikelnummer der Flaschengröße, z. B. APF-BRD-001-500")
    anzahl_flaschen: int = Field(..., gt=0)
    datum: date | None = None
    alkohol_vol: Decimal | None = Field(None, description="Trinkstärke, sonst aus dem Produkt")
    lagerort: str = "FLASCHENLAGER"
    benutzer: str | None = None
    bemerkung: str | None = None


class Druck(BaseModel):
    variante_sku: str
    anzahl: int = Field(..., gt=0)
    losnummer: str | None = Field(None, description="Leer lassen, dann wird die letzte Abfüllung genommen")
    vorlage: str | None = None
    drucker: str | None = None
    benutzer: str | None = None


def _benutzer_id(con, kuerzel: str | None) -> int | None:
    if not kuerzel:
        return None
    zeile = eine(con, "SELECT id FROM benutzer WHERE kuerzel = %s AND aktiv", kuerzel)
    if not zeile:
        raise HTTPException(400, f"Unbekanntes Benutzerkürzel „{kuerzel}“.")
    return zeile["id"]


def _variante(con, sku: str) -> dict:
    zeile = eine(con, "SELECT id, produkt_id FROM variante WHERE sku = %s AND aktiv", sku)
    if not zeile:
        raise HTTPException(404, f"Variante „{sku}“ gibt es nicht.")
    return zeile


# ----------------------------------------------------------------- Lesen
@api.get("/produkte", summary="Produkte mit aktivem Fass")
def produkte(authorization: str | None = Header(None)):
    _pruefe(authorization)
    with verbindung() as con:
        return {"produkte": alle(con, """
            SELECT p.sku, p.name_de AS name, p.alkohol_vol,
                   o.name_de AS obstart, t.name_de AS typ,
                   f.fassnummer AS aktives_fass, f.fuellstand_l, fa.aktiv_seit,
                   (SELECT json_agg(json_build_object(
                        'sku', v.sku, 'menge', v.fuellmenge_ml, 'einheit', v.grundeinheit, 'ean', v.ean)
                        ORDER BY v.fuellmenge_ml)
                      FROM variante v WHERE v.produkt_id = p.id AND v.aktiv) AS varianten
            FROM produkt p
            JOIN obstart o ON o.id = p.obstart_id
            JOIN produkttyp t ON t.id = p.produkttyp_id
            LEFT JOIN fass_aktiv fa ON fa.produkt_id = p.id AND fa.aktiv_bis IS NULL
            LEFT JOIN fass f ON f.id = fa.fass_id
            WHERE p.aktiv ORDER BY o.reihenfolge, p.name_de""")}


@api.get("/etikett/{variante_sku}", summary="Alle Angaben für ein Etikett")
def etikett(variante_sku: str, authorization: str | None = Header(None)):
    _pruefe(authorization)
    with verbindung() as con:
        zeile = eine(con, """
            SELECT e.*, f.firma_name, f.ort AS firma_ort, f.land AS firma_land
            FROM v_etikett e
            CROSS JOIN (SELECT name AS firma_name, ort, land FROM firma WHERE id = 1) f
            WHERE e.variante_sku = %s""", variante_sku)
        if not zeile:
            raise HTTPException(404, f"Für „{variante_sku}“ gibt es keine Etikettendaten.")
        if not zeile["aktive_fassnummer"]:
            zeile["warnung"] = "Für dieses Produkt ist kein Fass aktiv. Bitte zuerst ein Fass setzen."
        return zeile


@api.get("/faesser", summary="Fässer, gefiltert nach Produkt und Status")
def faesser(produkt_sku: str | None = None, status: str | None = None,
            authorization: str | None = Header(None)):
    _pruefe(authorization)
    with verbindung() as con:
        return {"faesser": alle(con, """
            SELECT * FROM v_fassbestand
            WHERE (%s::text IS NULL OR produkt_sku = %s::text)
              AND (%s::text IS NULL OR status = %s::fass_status)
            ORDER BY fassnummer""", produkt_sku, produkt_sku, status, status)}


@api.get("/losnummer/{variante_sku}", summary="Losnummer der jüngsten Abfüllung")
def losnummer(variante_sku: str, authorization: str | None = Header(None)):
    _pruefe(authorization)
    with verbindung() as con:
        v = _variante(con, variante_sku)
        zeile = eine(con, """
            SELECT a.losnummer, a.abgefuellt_am, a.anzahl_flaschen, f.fassnummer
            FROM abfuellung a JOIN fass f ON f.id = a.fass_id
            WHERE a.variante_id = %s ORDER BY a.abgefuellt_am DESC, a.id DESC LIMIT 1""", v["id"])
        if not zeile:
            raise HTTPException(404, "Für diese Variante wurde noch nichts abgefüllt.")
        return zeile


# ----------------------------------------------------------------- Schreiben
@api.post("/fass/wechseln", summary="Aktives Fass für ein Produkt setzen")
def fass_wechseln(daten: FassWechsel, authorization: str | None = Header(None)):
    _pruefe(authorization)
    with verbindung() as con:
        produkt = eine(con, "SELECT id FROM produkt WHERE sku = %s", daten.produkt_sku)
        if not produkt:
            raise HTTPException(404, f"Produkt „{daten.produkt_sku}“ gibt es nicht.")
        fass = eine(con, "SELECT id FROM fass WHERE fassnummer = %s", daten.fassnummer)
        if not fass:
            raise HTTPException(404, f"Fass „{daten.fassnummer}“ gibt es nicht.")
        benutzer = _benutzer_id(con, daten.benutzer)   # eigener Fehler, kein Konflikt
        try:
            eine(con, "SELECT fass_wechseln(%s, %s, %s::smallint, %s::text)",
                 produkt["id"], fass["id"], benutzer, daten.bemerkung)
            con.commit()
        except psycopg.Error as e:
            con.rollback()
            raise HTTPException(409, str(e).split("\n")[0].removeprefix("FEHLER:  ")) from e
        return eine(con, """
            SELECT sku, produkt, fassnummer, fuellstand_l, aktiv_seit
            FROM v_produkt_aktives_fass WHERE produkt_id = %s""", produkt["id"])


@api.post("/abfuellung", summary="Abfüllung buchen und Losnummer erhalten")
def abfuellung(daten: Abfuellung, authorization: str | None = Header(None)):
    _pruefe(authorization)
    with verbindung() as con:
        v = _variante(con, daten.variante_sku)
        benutzer = _benutzer_id(con, daten.benutzer)
        try:
            zeile = eine(con, """
                SELECT * FROM abfuellung_buchen(%s, %s, %s::smallint,
                                                COALESCE(%s::date, CURRENT_DATE),
                                                %s::text, %s::numeric, %s::text)""",
                v["id"], daten.anzahl_flaschen, benutzer,
                daten.datum, daten.lagerort, daten.alkohol_vol, daten.bemerkung)
            con.commit()
        except psycopg.Error as e:
            con.rollback()
            raise HTTPException(409, str(e).split("\n")[0].removeprefix("FEHLER:  ")) from e
        return zeile


@api.post("/etikettendruck", summary="Druckauftrag protokollieren")
def etikettendruck(daten: Druck, authorization: str | None = Header(None)):
    _pruefe(authorization)
    with verbindung() as con:
        v = _variante(con, daten.variante_sku)
        letzte = eine(con, """
            SELECT a.id, a.losnummer, a.fass_id FROM abfuellung a
            WHERE a.variante_id = %s AND (%s::text IS NULL OR a.losnummer = %s::text)
            ORDER BY a.abgefuellt_am DESC, a.id DESC LIMIT 1""",
            v["id"], daten.losnummer, daten.losnummer)
        aktiv = eine(con, """
            SELECT fass_id FROM fass_aktiv WHERE produkt_id = %s AND aktiv_bis IS NULL""", v["produkt_id"])
        zeile = eine(con, """
            INSERT INTO etikettendruck (abfuellung_id, variante_id, fass_id, losnummer, anzahl,
                                        vorlage, drucker, benutzer_id)
            VALUES (%s, %s, %s, %s::text, %s, %s::text, %s::text, %s::smallint) RETURNING *""",
            letzte["id"] if letzte else None, v["id"],
            (letzte or {}).get("fass_id") or (aktiv or {}).get("fass_id"),
            daten.losnummer or (letzte or {}).get("losnummer"),
            daten.anzahl, daten.vorlage, daten.drucker, _benutzer_id(con, daten.benutzer))
        con.commit()
        return zeile


# ----------------------------------------------------------------- LabelForge
@api.get("/labelforge/spalten", summary="Welche Spalte füllt welche Variable im Etikett")
def labelforge_spalten(authorization: str | None = Header(None)):
    _pruefe(authorization)
    return {
        "variablen": labelforge.VARIABLEN,
        "zusatzspalten": labelforge.ZUSATZ,
        "hinweis": ("Die Spalten unter „variablen“ heißen genauso wie die Variablen der "
                    "Hierber-Vorlagen und werden beim Serienimport automatisch zugeordnet. "
                    "Die Zusatzspalten erreicht man im Layout über Platzhalter wie {{fass}}. "
                    "Der Chargencode trägt die Losnummer, die mit der Fassnummer beginnt."),
    }


@api.get("/labelforge/zeilen", summary="Etikettendaten als JSON-Zeilen")
def labelforge_zeilen(sku: list[str] | None = Query(None, description="Leer lassen für alle Varianten"),
                      kopien: int = Query(0, ge=0, le=500, description="Wert für die Spalte copies"),
                      nur_mit_fass: bool = False,
                      authorization: str | None = Header(None)):
    _pruefe(authorization)
    with verbindung() as con:
        reihen = labelforge.zeilen(con, sku, kopien, nur_mit_fass)
    return {"spalten": labelforge.SPALTEN, "zeilen": reihen, "anzahl": len(reihen)}


@api.get("/labelforge/serie.csv", summary="Etikettendaten als CSV für den Serienimport")
def labelforge_csv(sku: list[str] | None = Query(None),
                   kopien: int = Query(0, ge=0, le=500),
                   nur_mit_fass: bool = False,
                   authorization: str | None = Header(None)):
    _pruefe(authorization)
    with verbindung() as con:
        reihen = labelforge.zeilen(con, sku, kopien, nur_mit_fass)
    if not reihen:
        raise HTTPException(404, "Keine passenden Varianten gefunden.")
    return Response(labelforge.als_csv(reihen), media_type="text/csv; charset=utf-8",
                    headers={"Content-Disposition": 'attachment; filename="etiketten-serie.csv"'})
