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
