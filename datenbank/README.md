# Datenbank – zentrales Datenmodell (PostgreSQL 16)

Die Datenbank ist die einzige Wahrheit für Produkte, Preise, Fässer, Chargen,
Abfüllungen, Lager und Verkaufskanäle. ERP (Odoo), Etiketten-App und
Website-Sync greifen alle hierauf zu.

## Dateien

| Datei | Zweck |
|---|---|
| `001_schema.sql` | Komplettes Schema: Tabellen, Regeln, Funktionen, Sichten, Rollen, Stammdaten. Mehrfach ausführbar. |
| `900_test.sql` | Funktionstest mit Beispieldaten. Rollt alles zurück. Nur auf Testdatenbank ausführen. |

## Einrichten

```bash
createdb -U postgres brennerei
psql -U postgres -d brennerei -f datenbank/001_schema.sql
# Passwörter der drei Rollen sofort setzen:
psql -U postgres -d brennerei -c "ALTER ROLE brennerei_app PASSWORD '…'; ALTER ROLE brennerei_etikett PASSWORD '…'; ALTER ROLE brennerei_lesen PASSWORD '…';"
```

Test auf einer separaten Datenbank:

```bash
createdb -U postgres brennerei_test
psql -U postgres -d brennerei_test -f datenbank/001_schema.sql -f datenbank/900_test.sql
```

## Aufbau

```
obstart ──┐                         maische_charge ── brennprotokoll ──┐
produkttyp┼─ produkt ─── variante ─── preisliste                       │
mwst_satz ┘     │           │                                          │
                │           ├── abfuellung ── lagerbewegung            │
                │           │       │                                  │
                │           └── etikettendruck                         │
                │                                                      │
                └── fass_aktiv ── fass ── fass_befuellung ─────────────┘
                                   │
                              lagerort

verkaufsbeleg ── verkaufsposition        benutzer        audit_log
```

**Produkt** ist die Sorte (Apfelbrand), **Variante** die verkaufbare Flasche
(Apfelbrand 500 ml, mit EAN und MwSt). Preise stehen ausschließlich in
**preisliste** mit Gültigkeitszeitraum, damit jede Preisänderung nachvollziehbar
bleibt. **Fass** ist der physische Behälter, **fass_aktiv** die Historie, welches
Fass wann für welches Produkt abgefüllt wurde. **Abfuellung** erzeugt die
Losnummer und bucht den Lagerzugang. **Brennprotokoll** ist das Brennbuch für
den Zoll.

## Regeln, die die Datenbank selbst durchsetzt

- Pro Produkt ist zu jedem Zeitpunkt genau ein Fass aktiv. Ein Fass ist nur für ein Produkt aktiv.
- Preise dürfen sich je Variante und Kanal zeitlich nicht überlappen.
- Leere oder gesperrte Fässer können nicht aktiviert werden. Ein Fass mit anderem Inhalt auch nicht.
- Füllstand kann nicht größer als Fassvolumen und nie negativ werden.
- EAN muss 8 oder 13 Ziffern haben.
- Jede Änderung an Produkt, Variante, Preis, Fass, Abfüllung, Lager und Brennprotokoll landet im Audit-Log.

## Funktionen (die App ruft nur diese auf)

| Funktion | Was sie tut |
|---|---|
| `fass_wechseln(produkt_id, fass_id, benutzer_id, bemerkung)` | Schließt das alte aktive Fass, aktiviert das neue, setzt Fassstatus. |
| `abfuellung_buchen(variante_id, anzahl, benutzer_id, datum, lagerort, alkohol_vol, bemerkung)` | Erzeugt Losnummer, reduziert Füllstand, bucht Lagerzugang. Alles in einer Transaktion. |
| `lager_abgang(variante_id, menge, grund, lagerort, benutzer_id, beleg_ref, losnummer)` | Abgang für Verkauf, Bruch, Probe usw. |
| `preis_aktuell(variante_id, kanal, datum)` | Gültiger Nettopreis, Kanalpreis vor Standardpreis. |
| `losnummer_basis(fassnummer, datum)` | Losnummer-Schema `F017-251202`. |

## Sichten für die einzelnen Systeme

| Sicht | Für wen |
|---|---|
| `v_etikett` | Etiketten-App: alle Felder inkl. aktiver Fassnummer und Losnummer-Vorschau. |
| `v_produkt_aktives_fass` | Etiketten-App: Anzeige und Fasswechsel. |
| `v_woo_sync` | Website-Sync: Produkt, Texte in 4 Sprachen, Preise, Bestand, Baum-Symbol. |
| `v_preis_aktuell` | Kasse und Shop: netto, brutto, Grundpreis je Liter. |
| `v_lagerbestand`, `v_lagerbestand_gesamt` | Lager, Mindestbestand-Warnung. |
| `v_fassbestand` | Fasslager mit Liter reinem Alkohol je Fass. |
| `v_alkoholbilanz_monat` | Zoll: erzeugt, abgefüllt, abgegangen in Liter reinem Alkohol. |
| `v_rueckverfolgung` | Losnummer bis zur Maische zurück. |
| `v_umsatz_monat_kanal` | Steuer und Controlling. |

## Rollen

| Rolle | Rechte |
|---|---|
| `brennerei_app` | Vollzugriff für Odoo-Sync und Büro. |
| `brennerei_etikett` | Lesen plus Fasswechsel, Abfüllung, Etikettendruck. |
| `brennerei_lesen` | Nur lesen, für Berichte und Steuerberater. |

## Bewusst nicht in dieser Datenbank

Kunden mit Namen und Adressen, Rechnungen und Zahlungen liegen in Odoo.
Hier werden nur Belegsummen und Referenzen gespiegelt, damit Umsatzberichte
je Kanal möglich sind, ohne Personendaten doppelt zu halten.
