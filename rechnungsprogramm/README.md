# Rechnungsprogramm

Rechnungen, Gutschriften, Zahlungen und Steuerberichte für die Hierber Brennerei.
Es arbeitet direkt auf der zentralen Datenbank, nutzt also dieselben Produkte,
Preise, Fässer und Lagerbestände wie Etiketten-App und Website.

## Was es kann

- **Kunden** mit Anschrift, MwSt-Nummer, eigener Preisliste und eigenem Zahlungsziel
- **Rechnungen** aus Artikeln der Preisliste oder als freie Position (Führung, Versand)
- **Festschreiben**: fortlaufende Nummer, Lagerabgang, Umsatzspiegel, danach unveränderlich
- **Gutschriften** ganz oder teilweise, mit Rückbuchung ins Lager
- **Zahlungen** erfassen, offene Posten und Mahnliste
- **PDF** mit allen Pflichtangaben, **E-Rechnung** als UBL-XML für Peppol
- **Berichte**: MwSt je Satz, Umsatz nach Kanal und Artikel, Alkoholbilanz, Journal als CSV

## Regeln, die das Programm nicht umgehen kann

Sie stecken in der Datenbank, nicht in der Oberfläche. Auch ein direkter Zugriff
mit psql kann sie nicht aushebeln.

| Regel | Wirkung |
|---|---|
| Entwurf hat keine Nummer | Nummern entstehen erst beim Festschreiben, daher ohne Lücken |
| Festgeschrieben ist unveränderlich | Änderung und Löschung werden abgewiesen, Korrektur nur per Gutschrift |
| Positionen folgen dem Beleg | Nach dem Festschreiben keine Änderung mehr möglich |
| Nummern je Jahr fortlaufend | R2026-0001, R2026-0002, im neuen Jahr wieder ab 0001 |
| Storno nur ohne Zahlung | Sobald Geld geflossen ist, geht nur noch eine Gutschrift |
| Alles im Audit-Log | Jede Änderung mit altem und neuem Stand |

## Einrichten auf dem NAS

```bash
cp .env.beispiel .env        # Passwort eintragen
docker compose up -d --build
```

Beim ersten Start spielt PostgreSQL die Dateien aus `../datenbank` ein.
Danach sind die Absenderdaten zu ergänzen:

```sql
UPDATE brennerei.firma
   SET mwst_nr = 'LU…', iban = 'LU…', bic = '…', bank = 'Spuerkeess',
       betriebsnummer = '…'
 WHERE id = 1;
```

Die Oberfläche liegt dann auf `http://<nas>:8080`. Der Port ist bewusst nur auf
127.0.0.1 veröffentlicht: nach außen sollte der Reverse Proxy des NAS mit HTTPS
und Anmeldung davor liegen.

## Ohne Docker

```bash
pip install -r requirements.txt
export BRENNEREI_DB="postgresql://benutzer:passwort@server:5432/brennerei"
uvicorn rechnungsprogramm.app.web:app --port 8000
```

## Tests

```bash
export BRENNEREI_TEST_DB="postgresql://postgres@localhost:5432/postgres"
python -m pytest rechnungsprogramm/tests
```

Die Tests legen eine eigene Datenbank `brennerei_test` an, spielen beide
Schemadateien ein und prüfen Nummernvergabe, Unveränderlichkeit, Steuerlogik,
Gutschriften, Lagerbuchung, Zahlungen, Berichte, PDF und XML.

## Aufbau

| Datei | Zweck |
|---|---|
| `app/db.py` | Verbindung, Suchpfad, kleine Abfragehelfer |
| `app/logik.py` | Geschäftsvorgänge, ruft die Datenbankfunktionen auf |
| `app/pdf.py` | Rechnungs-PDF |
| `app/ubl.py` | E-Rechnung UBL 2.1 für Peppol |
| `app/berichte.py` | Auswertungen und CSV-Export |
| `app/web.py` | Weboberfläche |
| `vorlagen/` | HTML-Vorlagen |
| `tests/` | Testsuite |

## Was bewusst nicht drin ist

- **Buchhaltung.** Kontenplan, Buchungssätze und Jahresabschluss bleiben bei der
  Fiduciaire. Das Programm liefert ihr das Journal als CSV.
- **Anmeldung.** Im Heimnetz reicht der Reverse Proxy des NAS. Sobald der Zugriff
  von außen möglich sein soll, gehört eine echte Benutzerverwaltung davor.
- **Mahnungen als Brief.** Die Mahnliste zeigt, wer überfällig ist. Den Text
  schreibt weiterhin ein Mensch.

## Schnittstelle für die Etiketten-App

Unter `/api` liegt eine JSON-Schnittstelle, damit die Etiketten-App (LabelForge)
nicht selbst in die Datenbank greifen muss. Sie kennt keine Tabellen, nur diese
Aufrufe. Alle Regeln bleiben in der Datenbank.

| Aufruf | Zweck |
|---|---|
| `GET /api/produkte` | Alle Produkte mit aktivem Fass und ihren Flaschengrößen |
| `GET /api/etikett/{variante_sku}` | Alle Angaben fürs Etikett: Name, % vol, Füllmenge, Zutaten, Allergene, aktive Fassnummer, Losnummer-Vorschau, Preis, Grundpreis |
| `GET /api/faesser` | Fässer, filterbar nach Produkt und Status |
| `GET /api/losnummer/{variante_sku}` | Losnummer der jüngsten Abfüllung |
| `POST /api/fass/wechseln` | Aktives Fass setzen. Prüft Status und Inhalt |
| `POST /api/abfuellung` | Abfüllung buchen, liefert die Losnummer, senkt den Füllstand, bucht Lagerzugang |
| `POST /api/etikettendruck` | Druckauftrag protokollieren: Anzahl, Vorlage, Drucker, Person |

Beispiel:

```bash
curl http://nas:8080/api/etikett/APF-BRD-001-500
```

```json
{
  "variante_sku": "APF-BRD-001-500",
  "name_de": "Apfelbrand",
  "alkohol_vol": 40.0,
  "fuellmenge_ml": 500,
  "aktive_fassnummer": "F-017",
  "losnummer_vorschau": "F017-260920",
  "preis_brutto": 21.65
}
```

**Schutz:** Ist `BRENNEREI_API_TOKEN` gesetzt, muss jede Anfrage
`Authorization: Bearer <token>` mitschicken. Ohne Token ist die Schnittstelle
offen, was nur im abgeschotteten Heimnetz vertretbar ist.

**Fehler:** 404 wenn es die Variante nicht gibt, 400 bei falschem Benutzerkürzel,
409 wenn die Datenbank ablehnt, etwa weil kein Fass aktiv ist oder das gewählte
Fass leer ist. Die Meldung steht im Klartext in `detail`.
