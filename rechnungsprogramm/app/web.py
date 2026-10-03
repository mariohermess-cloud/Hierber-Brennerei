"""Weboberfläche des Rechnungsprogramms (FastAPI, serverseitig gerendert)."""
from __future__ import annotations

import os
from datetime import date, timedelta
from decimal import Decimal, InvalidOperation
from pathlib import Path

from fastapi import FastAPI, Form, Request
from fastapi.responses import HTMLResponse, RedirectResponse, Response
from fastapi.templating import Jinja2Templates

from . import berichte, logik, pdf, ubl
from .api import api
from .db import verbindung

BASIS = Path(__file__).resolve().parent.parent
vorlagen = Jinja2Templates(directory=str(BASIS / "vorlagen"))
app = FastAPI(title="Hierber Brennerei – Rechnungen und Etiketten")
app.include_router(api)

BENUTZER_ID = int(os.environ.get("BRENNEREI_BENUTZER", "0")) or None


def _zahl(text: str | None, standard="0") -> Decimal:
    try:
        return Decimal(str(text or standard).replace(",", ".").strip())
    except InvalidOperation:
        raise logik.Fehler(f"„{text}“ ist keine gültige Zahl.")


def _datum(text: str | None) -> date | None:
    return date.fromisoformat(text) if text else None


vorlagen.env.filters["euro"] = pdf.euro
vorlagen.env.filters["prozent"] = pdf.prozent
vorlagen.env.filters["datum"] = lambda d: d.strftime("%d.%m.%Y") if d else ""


def _menge(wert) -> str:
    """8 statt 8.000, 2,5 statt 2.500."""
    zahl = Decimal(wert or 0).normalize()
    if zahl == zahl.to_integral_value():
        zahl = zahl.quantize(Decimal(1))
    return f"{zahl}".replace(".", ",")


vorlagen.env.filters["menge"] = _menge


def seite(request: Request, name: str, **daten) -> HTMLResponse:
    daten.setdefault("meldung", request.query_params.get("meldung"))
    daten.setdefault("fehler", request.query_params.get("fehler"))
    return vorlagen.TemplateResponse(request, name, daten)


def zurueck(pfad: str, meldung: str | None = None, fehler: str | None = None) -> RedirectResponse:
    from urllib.parse import quote
    if meldung:
        pfad += ("&" if "?" in pfad else "?") + "meldung=" + quote(meldung)
    if fehler:
        pfad += ("&" if "?" in pfad else "?") + "fehler=" + quote(fehler)
    return RedirectResponse(pfad, status_code=303)


# ------------------------------------------------------------------ Start
@app.get("/", response_class=HTMLResponse)
def start(request: Request):
    with verbindung() as con:
        heute = date.today()
        monat_start = heute.replace(day=1)
        return seite(request, "start.html",
                     entwuerfe=logik.belege(con, "entwurf", 20),
                     letzte=logik.belege(con, "festgeschrieben", 10),
                     offen=berichte.offene_posten(con)[:10],
                     mahnungen=berichte.mahnliste(con),
                     monat=berichte.mwst_meldung(con, monat_start, heute))


# ------------------------------------------------------------------ Kunden
@app.get("/kunden", response_class=HTMLResponse)
def kundenliste(request: Request, suche: str | None = None):
    with verbindung() as con:
        return seite(request, "kunden.html", kunden=logik.kunden(con, suche), suche=suche or "")


@app.post("/kunden")
def kunde_neu(name: str = Form(...), typ: str = Form("privat"), strasse: str = Form(""),
              plz: str = Form(""), ort: str = Form(""), land: str = Form("LU"),
              mwst_nr: str = Form(""), email: str = Form(""), telefon: str = Form(""),
              preis_kanal: str = Form("*"), zahlungsziel_tage: str = Form("")):
    with verbindung() as con:
        try:
            k = logik.kunde_anlegen(con, name=name, typ=typ, strasse=strasse or None,
                                    plz=plz or None, ort=ort or None, land=land.upper()[:2],
                                    mwst_nr=mwst_nr, email=email, telefon=telefon,
                                    preis_kanal=preis_kanal,
                                    zahlungsziel_tage=int(zahlungsziel_tage) if zahlungsziel_tage else None)
            con.commit()
            return zurueck("/kunden", f'Kunde {k["nummer"]} angelegt.')
        except logik.Fehler as e:
            con.rollback()
            return zurueck("/kunden", fehler=str(e))


# ------------------------------------------------------------------ Belege
@app.get("/belege", response_class=HTMLResponse)
def belegliste(request: Request, status: str | None = None):
    with verbindung() as con:
        return seite(request, "belege.html", belege=logik.belege(con, status), status=status or "")


@app.post("/belege")
def beleg_neu(kunde_id: int = Form(...), kanal: str = Form("hofladen"),
              datum: str = Form(""), kopftext: str = Form("")):
    with verbindung() as con:
        try:
            r = logik.rechnung_anlegen(con, kunde_id, kanal, _datum(datum), kopftext or None)
            con.commit()
            return zurueck(f'/belege/{r["id"]}', "Entwurf angelegt.")
        except logik.Fehler as e:
            con.rollback()
            return zurueck("/belege", fehler=str(e))


@app.get("/belege/neu", response_class=HTMLResponse)
def beleg_formular(request: Request):
    with verbindung() as con:
        return seite(request, "beleg_neu.html", kunden=logik.kunden(con), heute=date.today())


@app.get("/belege/{rechnung_id}", response_class=HTMLResponse)
def beleg_ansicht(request: Request, rechnung_id: int):
    with verbindung() as con:
        b = logik.rechnung_voll(con, rechnung_id)
        if not b:
            return seite(request, "fehlt.html", was="Beleg")
        return seite(request, "beleg.html", b=b,
                     artikel=logik.artikel(con),
                     zahlungen=logik.zahlungen(con, rechnung_id),
                     offen=logik.offener_betrag(con, rechnung_id))


@app.post("/belege/{rechnung_id}/position")
def position_neu(rechnung_id: int, variante_id: str = Form(""), menge: str = Form("1"),
                 einzelpreis: str = Form(""), rabatt: str = Form("0"),
                 bezeichnung: str = Form(""), mwst_satz: str = Form("0.17"),
                 einheit: str = Form("Stück")):
    with verbindung() as con:
        try:
            if variante_id:
                logik.position_hinzufuegen(con, rechnung_id, int(variante_id), _zahl(menge, "1"),
                                           _zahl(einzelpreis) if einzelpreis else None,
                                           _zahl(rabatt), bezeichnung or None)
            else:
                if not bezeichnung:
                    raise logik.Fehler("Bitte eine Bezeichnung angeben.")
                logik.position_frei(con, rechnung_id, bezeichnung, _zahl(menge, "1"),
                                    _zahl(einzelpreis), _zahl(mwst_satz, "0.17"), einheit)
            con.commit()
            return zurueck(f"/belege/{rechnung_id}")
        except logik.Fehler as e:
            con.rollback()
            return zurueck(f"/belege/{rechnung_id}", fehler=str(e))


@app.post("/belege/{rechnung_id}/position/{position_id}/loeschen")
def position_weg(rechnung_id: int, position_id: int):
    with verbindung() as con:
        try:
            logik.position_loeschen(con, position_id)
            con.commit()
            return zurueck(f"/belege/{rechnung_id}")
        except logik.Fehler as e:
            con.rollback()
            return zurueck(f"/belege/{rechnung_id}", fehler=str(e))


@app.post("/belege/{rechnung_id}/festschreiben")
def beleg_festschreiben(rechnung_id: int):
    with verbindung() as con:
        try:
            r = logik.festschreiben(con, rechnung_id, BENUTZER_ID)
            con.commit()
            return zurueck(f"/belege/{rechnung_id}", f'Festgeschrieben als {r["nummer"]}.')
        except logik.Fehler as e:
            con.rollback()
            return zurueck(f"/belege/{rechnung_id}", fehler=str(e))


@app.post("/belege/{rechnung_id}/gutschrift")
def beleg_gutschrift(rechnung_id: int, grund: str = Form("")):
    with verbindung() as con:
        try:
            g = logik.gutschrift(con, rechnung_id, grund or None)
            con.commit()
            return zurueck(f'/belege/{g["id"]}', "Gutschrift als Entwurf angelegt. Mengen bei Bedarf kürzen.")
        except logik.Fehler as e:
            con.rollback()
            return zurueck(f"/belege/{rechnung_id}", fehler=str(e))


@app.post("/belege/{rechnung_id}/stornieren")
def beleg_stornieren(rechnung_id: int, grund: str = Form("")):
    with verbindung() as con:
        try:
            logik.stornieren(con, rechnung_id, grund or "ohne Angabe")
            con.commit()
            return zurueck(f"/belege/{rechnung_id}", "Beleg storniert.")
        except logik.Fehler as e:
            con.rollback()
            return zurueck(f"/belege/{rechnung_id}", fehler=str(e))


@app.post("/belege/{rechnung_id}/zahlung")
def zahlung_neu(rechnung_id: int, betrag: str = Form(...), art: str = Form("ueberweisung"),
                datum: str = Form(""), referenz: str = Form("")):
    with verbindung() as con:
        try:
            logik.zahlung_erfassen(con, rechnung_id, _zahl(betrag), art, _datum(datum), referenz, BENUTZER_ID)
            con.commit()
            return zurueck(f"/belege/{rechnung_id}", "Zahlung erfasst.")
        except logik.Fehler as e:
            con.rollback()
            return zurueck(f"/belege/{rechnung_id}", fehler=str(e))


@app.get("/belege/{rechnung_id}/pdf")
def beleg_pdf(rechnung_id: int):
    with verbindung() as con:
        b = logik.rechnung_voll(con, rechnung_id)
        if not b:
            return Response("Beleg nicht gefunden", status_code=404)
        name = (b["nummer"] or f'entwurf-{rechnung_id}') + ".pdf"
        return Response(pdf.erzeugen(b), media_type="application/pdf",
                        headers={"Content-Disposition": f'inline; filename="{name}"'})


@app.get("/belege/{rechnung_id}/ubl")
def beleg_ubl(rechnung_id: int):
    with verbindung() as con:
        b = logik.rechnung_voll(con, rechnung_id)
        if not b:
            return Response("Beleg nicht gefunden", status_code=404)
        if b["status"] != "festgeschrieben":
            return Response("E-Rechnungen gibt es nur für festgeschriebene Belege.", status_code=400)
        return Response(ubl.erzeugen(b), media_type="application/xml",
                        headers={"Content-Disposition": f'attachment; filename="{b["nummer"]}.xml"'})


# ------------------------------------------------------------------ Berichte
@app.get("/berichte", response_class=HTMLResponse)
def berichte_seite(request: Request, von: str | None = None, bis: str | None = None):
    heute = date.today()
    v = _datum(von) or heute.replace(month=1, day=1)
    b = _datum(bis) or heute
    with verbindung() as con:
        return seite(request, "berichte.html", von=v, bis=b,
                     mwst=berichte.mwst_meldung(con, v, b),
                     kanal=berichte.umsatz_kanal(con, v, b),
                     produkte=berichte.umsatz_produkt(con, v, b, 20),
                     offen=berichte.offene_posten(con),
                     alkohol=berichte.alkoholbilanz(con, v, b))


@app.get("/berichte/journal.csv")
def journal_csv(von: str | None = None, bis: str | None = None):
    heute = date.today()
    v = _datum(von) or heute.replace(month=1, day=1)
    b = _datum(bis) or heute
    with verbindung() as con:
        inhalt = berichte.journal_csv(con, v, b)
    return Response(inhalt.encode("utf-8-sig"), media_type="text/csv",
                    headers={"Content-Disposition": f'attachment; filename="journal-{v}-bis-{b}.csv"'})


@app.get("/gesund")
def gesund():
    with verbindung() as con:
        with con.cursor() as cur:
            cur.execute("SELECT 1 AS ok")
            cur.fetchone()
    return {"status": "ok"}
