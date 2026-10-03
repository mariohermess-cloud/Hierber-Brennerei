"""Geschäftsvorgänge. Jede Funktion ruft die Datenbankfunktion auf, die die Regeln kennt."""
from __future__ import annotations

from datetime import date
from decimal import Decimal

import psycopg

from .db import alle, eine


class Fehler(Exception):
    """Fachlicher Fehler, der dem Benutzer angezeigt werden darf."""


def _melden(fn):
    """Datenbankfehler in lesbare Meldungen übersetzen."""
    def huelle(*args, **kwargs):
        try:
            return fn(*args, **kwargs)
        except psycopg.errors.RaiseException as e:
            raise Fehler(str(e).split("\n")[0]) from e
        except psycopg.errors.UniqueViolation as e:
            raise Fehler("Dieser Eintrag existiert bereits.") from e
    return huelle


# ---------------------------------------------------------------- Kunden
@_melden
def kunde_anlegen(con, *, name, typ="privat", strasse=None, plz=None, ort=None,
                  land="LU", mwst_nr=None, email=None, telefon=None,
                  zahlungsziel_tage=None, preis_kanal="*", zusatz=None, notiz=None) -> dict:
    return eine(con, """
        INSERT INTO kunde (nummer, typ, name, zusatz, strasse, plz, ort, land, mwst_nr,
                           email, telefon, zahlungsziel_tage, preis_kanal, notiz)
        VALUES (kunde_nummer(), %s, %s, %s, %s, %s, %s, %s, NULLIF(%s,''), NULLIF(%s,''),
                NULLIF(%s,''), %s, %s, NULLIF(%s,''))
        RETURNING *""",
        typ, name, zusatz, strasse, plz, ort, land, mwst_nr, email, telefon,
        zahlungsziel_tage, preis_kanal, notiz)


def kunden(con, suche: str | None = None) -> list[dict]:
    if suche:
        return alle(con, """
            SELECT * FROM kunde
            WHERE aktiv AND (name ILIKE %s OR nummer ILIKE %s OR COALESCE(ort,'') ILIKE %s)
            ORDER BY name LIMIT 100""", f"%{suche}%", f"%{suche}%", f"%{suche}%")
    return alle(con, "SELECT * FROM kunde WHERE aktiv ORDER BY name LIMIT 200")


def kunde(con, kunde_id: int) -> dict | None:
    return eine(con, "SELECT * FROM kunde WHERE id = %s", kunde_id)


# ---------------------------------------------------------------- Belege
@_melden
def rechnung_anlegen(con, kunde_id: int, kanal: str = "hofladen",
                     datum: date | None = None, kopftext: str | None = None) -> dict:
    return eine(con, "SELECT * FROM rechnung_anlegen(%s, %s::verkaufskanal, COALESCE(%s, CURRENT_DATE), %s)",
                kunde_id, kanal, datum, kopftext)


@_melden
def position_hinzufuegen(con, rechnung_id: int, variante_id: int, menge: Decimal,
                         einzelpreis=None, rabatt=0, bezeichnung=None, losnummer=None) -> dict:
    return eine(con, "SELECT * FROM position_hinzufuegen(%s, %s, %s, %s, %s, %s, %s)",
                rechnung_id, variante_id, menge, einzelpreis, rabatt, bezeichnung, losnummer)


@_melden
def position_frei(con, rechnung_id: int, bezeichnung: str, menge: Decimal,
                  einzelpreis: Decimal, mwst_satz: Decimal = Decimal("0.17"),
                  einheit: str = "Stück") -> dict:
    return eine(con, "SELECT * FROM position_frei_hinzufuegen(%s, %s, %s, %s, %s, %s)",
                rechnung_id, bezeichnung, menge, einzelpreis, mwst_satz, einheit)


@_melden
def position_loeschen(con, position_id: int) -> None:
    zeile = eine(con, "SELECT rechnung_id FROM rechnungsposition WHERE id = %s", position_id)
    if not zeile:
        raise Fehler("Position nicht gefunden.")
    eine(con, "DELETE FROM rechnungsposition WHERE id = %s RETURNING id", position_id)
    eine(con, "SELECT rechnung_summen_neu(%s)", zeile["rechnung_id"])


@_melden
def festschreiben(con, rechnung_id: int, benutzer_id: int | None = None) -> dict:
    return eine(con, "SELECT * FROM rechnung_festschreiben(%s, %s::smallint)", rechnung_id, benutzer_id)


@_melden
def gutschrift(con, rechnung_id: int, grund: str | None = None) -> dict:
    return eine(con, "SELECT * FROM gutschrift_erzeugen(%s, %s)", rechnung_id, grund)


@_melden
def stornieren(con, rechnung_id: int, grund: str) -> dict:
    """Nur zulässig, solange keine Zahlung und keine Gutschrift vorliegt."""
    offen = eine(con, """SELECT count(*) AS n FROM zahlung WHERE rechnung_id = %s""", rechnung_id)
    if offen["n"]:
        raise Fehler("Zu diesem Beleg sind Zahlungen erfasst. Bitte eine Gutschrift erstellen.")
    return eine(con, """
        UPDATE rechnung SET status = 'storniert', storniert_am = now(), storno_grund = %s
        WHERE id = %s RETURNING *""", grund, rechnung_id)


def beleg(con, rechnung_id: int) -> dict | None:
    return eine(con, "SELECT * FROM v_beleg WHERE id = %s", rechnung_id)


def belege(con, status: str | None = None, limit: int = 100) -> list[dict]:
    if status:
        return alle(con, "SELECT * FROM v_beleg WHERE status = %s::belegstatus ORDER BY datum DESC, id DESC LIMIT %s",
                    status, limit)
    return alle(con, "SELECT * FROM v_beleg ORDER BY datum DESC, id DESC LIMIT %s", limit)


def positionen(con, rechnung_id: int) -> list[dict]:
    return alle(con, """
        SELECT p.*, round(p.netto * p.mwst_satz, 2) AS mwst_betrag
        FROM rechnungsposition p WHERE p.rechnung_id = %s ORDER BY p.pos""", rechnung_id)


def mwst_aufteilung(con, rechnung_id: int) -> list[dict]:
    return alle(con, "SELECT * FROM v_rechnung_mwst WHERE rechnung_id = %s ORDER BY mwst_satz", rechnung_id)


def rechnung_voll(con, rechnung_id: int) -> dict | None:
    """Alles, was PDF und Anzeige brauchen."""
    kopf = eine(con, """
        SELECT r.*, k.name AS kunde_name, k.nummer AS kunde_nummer, k.email AS kunde_email,
               k.land AS kunde_land
        FROM rechnung r JOIN kunde k ON k.id = r.kunde_id WHERE r.id = %s""", rechnung_id)
    if not kopf:
        return None
    kopf["positionen"] = positionen(con, rechnung_id)
    kopf["mwst_aufteilung"] = mwst_aufteilung(con, rechnung_id)
    kopf["firma"] = eine(con, "SELECT * FROM firma WHERE id = 1")
    if kopf["bezieht_auf_id"]:
        kopf["bezieht_auf"] = eine(con, "SELECT nummer FROM rechnung WHERE id = %s", kopf["bezieht_auf_id"])
    return kopf


# ---------------------------------------------------------------- Zahlungen
@_melden
def zahlung_erfassen(con, rechnung_id: int, betrag: Decimal, art: str = "ueberweisung",
                     datum: date | None = None, referenz: str | None = None,
                     benutzer_id: int | None = None) -> dict:
    kopf = eine(con, "SELECT status, art FROM rechnung WHERE id = %s", rechnung_id)
    if not kopf:
        raise Fehler("Beleg nicht gefunden.")
    if kopf["status"] != "festgeschrieben":
        raise Fehler("Zahlungen können nur zu festgeschriebenen Belegen erfasst werden.")
    return eine(con, """
        INSERT INTO zahlung (rechnung_id, datum, betrag, art, referenz, erfasst_von)
        VALUES (%s, COALESCE(%s, CURRENT_DATE), %s, %s::zahlungsart, NULLIF(%s,''), %s::smallint)
        RETURNING *""", rechnung_id, datum, betrag, art, referenz, benutzer_id)


def zahlungen(con, rechnung_id: int) -> list[dict]:
    return alle(con, "SELECT * FROM zahlung WHERE rechnung_id = %s ORDER BY datum, id", rechnung_id)


def offener_betrag(con, rechnung_id: int) -> Decimal:
    zeile = eine(con, "SELECT offen FROM v_offene_posten WHERE id = %s", rechnung_id)
    return zeile["offen"] if zeile else Decimal("0.00")


# ---------------------------------------------------------------- Artikel
def artikel(con, suche: str | None = None) -> list[dict]:
    if suche:
        return alle(con, """
            SELECT * FROM v_preis_aktuell
            WHERE aktiv AND (produkt ILIKE %s OR sku ILIKE %s) ORDER BY produkt, fuellmenge_ml LIMIT 60""",
            f"%{suche}%", f"%{suche}%")
    return alle(con, "SELECT * FROM v_preis_aktuell WHERE aktiv ORDER BY produkt, fuellmenge_ml LIMIT 200")
