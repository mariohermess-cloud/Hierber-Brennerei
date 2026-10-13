# Hierber Brennerei — Projektregeln für Claude Code

Betrieb: Hierber Brennerei, Herborn, Luxemburg. Dieses Repository enthält das
Datenmodell, das Rechnungsprogramm, die Website und die Planung.

Hierber Brennerei, Herborn, Luxemburg. Dieses Repository enthält Datenmodell,
Rechnungsprogramm, Website, Vorlagen und Planung.

- Antworten, neue Kommentare, Dokumentation und Commit-Nachrichten auf Deutsch.
- Neue eigene Bezeichner auf Deutsch, soweit technisch sinnvoll.
- Bestehende Bezeichner, Dateinamen, API-Felder und Bibliotheksnamen erhalten.
- Website-Inhalte bleiben zweisprachig: Deutsch und Französisch.
- Nur den freigegebenen Auftrag umsetzen. Keine ungefragten Erweiterungen,
  Umbenennungen, Abhängigkeiten oder Architekturwechsel.
- Vor Änderungen relevante Dateien lesen und vorhandene Konventionen prüfen.
- Unbekanntes ausdrücklich als **nicht verifiziert** kennzeichnen.
- Keine Geheimnisse, Zugangsdaten oder vollständigen tatsächlichen
  Datenbankadressen ausgeben, in Dateien schreiben oder committen.

## 2. Repository

| Pfad | Inhalt / Regel |
|---|---|
| `datenbank/` | PostgreSQL-Schema `brennerei` (`001_schema.sql`, `002_rechnung.sql`, `900_test.sql`) |
| `rechnungsprogramm/` | FastAPI-Anwendung (`app/`), Tests (`tests/`), `pytest.ini` |
| `website/prototyp/` | Klick-Prototyp „Obstwiese" (`obstwiese.html`) |
| `vorlagen/` | Excel-Erfassungsvorlage und ihr Erzeugerskript |
| `docs/` | `MASTERPLAN.md` (Gesamtplan, offene Fragen F-01 bis F-24), `ETIKETTEN.md` |
| `site/` | Quelltext der Website: `lib/*.mjs` (Seitenbau), `data/*.js` (Produkt- und Textdaten), `assets/` (CSS, JS, Favicon) |
| `build.mjs` | baut `site/` nach `dist/`; Aufruf `node build.mjs` oder `npm run build`; Laufzeit rund 6 Minuten |
| `dist/` | **eingechecktes** Build-Ergebnis, 66 Seiten, wird mitcommittet |
| `tools/` | Prüfwerkzeuge und Bild-/Prompt-Skripte |
| `assets/fonts/` | lokal eingebundene Schriften (Cormorant Garamond, Inter) |
| `index.html`, `keller-v2.html`, `js/`, `css/`, `v2/`, `vendor/` | ältere 3D-Fassung mit Three.js und GSAP, bleibt unangetastet |
| `Fotos/`, `Fertige Etiquetten/`, `fotos-*/` | Bildmaterial |
| `TODO-INHALTE.md`, `BILDERLISTE.md`, `FOTO-INVENTAR.md`, `FOTO-PLATZHALTER.md`, `FLUESSIGKEIT-MESSUNG.md`, `CHATGPT-STAPEL.md`, `PROMPTS-*.md` | Arbeitsnotizen zu Inhalten und Bildern |

Live sind schreibende Aktionen außerhalb des lokalen Repository-Arbeitsbereichs,
ausgenommen ausdrücklich bestätigte lokale Test- und Vorschauumgebungen
sowie die unten beschriebenen lokalen technischen Schreibwirkungen.

Nur der Chef darf sie nach ausdrücklicher Nutzerfreigabe ausführen:

- Produktionsdatenbank über `BRENNEREI_DB`.
- `docker compose` in `rechnungsprogramm/`, wenn echte Daten betroffen sind
  oder die Zielumgebung nicht eindeutig als Testumgebung bestätigt ist.
- Schreibende GitHub-MCP-Aktionen: Pull Request, Kommentar, Merge, Dateiänderung.
- Artifacts veröffentlichen, aktualisieren oder löschen.
- Schreibzugriffe über Home Assistant (`HA_MCP_NABU`), Lovable,
  Gamma, Claude Docs und Claude Code Remote.
- Aktionen mit externen Kosten, Credits oder Veröffentlichungswirkung.

**Achtung:** `rechnung_festschreiben` verbraucht unwiderruflich eine Belegnummer.
Festgeschriebene Belege sind unveränderlich; Korrektur nur per Gutschrift.

**Live** heißt hier alles außerhalb des Repo-Arbeitsverzeichnisses: Home Assistant (`HA_MCP_NABU`, echtes Smart Home), Lovable (Deploy, Datenbank, Credits), GitHub-MCP-Schreibaktionen, Gamma, Claude Docs, Artifact-Publish sowie `git push`. Das Repo hat kein automatisches Deployment; Build und Prüfungen laufen ausschließlich lokal (siehe Abschnitt „Prüfbefehle“).

Git-Aktionen gesondert betrachten:

- `git fetch`: lesender Remote-Zugriff, verändert lokale Git-Metadaten;
  nur als freigegebener Planschritt.
- Lokale Branch-Erstellung, Branch-Wechsel und Commit:
  nur durch den Chef und im freigegebenen Plan.
- Push, Tags und Änderungen an Remote-Branches:
  ausdrückliche Freigabe erforderlich.
- Pull Request öffnen: ausdrückliche Freigabe erforderlich.
- Merge: immer eigene ausdrückliche Anweisung des Nutzers.

Keine fremden Änderungen überschreiben, zurücksetzen oder ungefragt mitcommitten.
Keine destruktiven Git-Aktionen oder Force-Pushes ohne separate Freigabe.

### Lokale Ausnahmen

Keine Live-Systeme:
- Eindeutig identifizierte lokale Wegwerf-PostgreSQL für Tests.
- Nur lesend eingebundener LabelForge-Klon.
- `npm run serve` als lokale Vorschau für `dist/`.

Lokale technische Schreibwirkungen freigegebener Builds, Installationen und
Prüfungen, beispielsweise temporäre Dateien, Werkzeug-Caches und Prüfberichte,
gelten nicht als Live-Zugriff. Dies erlaubt keine Änderungen an fremden
Projekten, persönlichen Dateien oder externen Systemen.
Installationen bleiben freigabepflichtige Planschritte; neue Abhängigkeiten
benötigen eine ausdrückliche Freigabe.

Das Repository hat laut Projektstand kein automatisches Deployment.
Builds und Prüfungen erfolgen lokal. Bei geänderter Konfiguration neu prüfen.

## 6. Prüfungen

Vorhandene Prüfbefehle verwenden und ihre Existenz vor Ausführung prüfen.
Keine Skripte, Werkzeuge oder Prüfergebnisse erfinden.
Neue Tests innerhalb der bestehenden Testsuite dürfen Bestandteil des
freigegebenen Umsetzungsplans sein.
Neue Prüfwerkzeuge oder Abhängigkeiten benötigen eine eigene Freigabe.

Laut Projektstand gibt es keine CI, keinen Linter und keinen Formatierer.
`npm test`, `ruff` und `make` sind nicht eingerichtet.

### Allgemein

Nach Änderungen:

```bash
git diff --check
```

Bei Änderungen an `.claude/` zusätzlich, soweit die Dateien vorhanden sind:

Nicht live und frei nutzbar: eine lokale Wegwerf-PostgreSQL für Tests sowie ein
nur lesend eingebundener Klon von LabelForge. Ebenfalls kein Live-System:
`npm run serve`, ein rein lokaler Vorschauserver für `dist/`.

Beim Hook beide Exit-Codes kontrollieren. Gültiges JSON allein beweist nicht,
dass das Hook-Skript erfolgreich ausgeführt wurde. Falls die verwendete Shell
die einzelnen Pipeline-Exit-Codes nicht verfügbar macht, Hook-Ausgabe und
Exit-Code getrennt erfassen und die Ausgabe anschließend mit `jq` prüfen.
Fehlende Dateien oder Werkzeuge ausdrücklich melden.

### Rechnungsprogramm

```bash
python3 -m compileall -q rechnungsprogramm/app rechnungsprogramm/tests
python3 -m pytest rechnungsprogramm/tests -q
```

Die Tests benötigen PostgreSQL. Die Verbindungsadresse kommt aus `BRENNEREI_DB`;
die dokumentierte Vorgabe in `rechnungsprogramm/app/db.py` ist:

```text
postgresql://postgres@localhost:5432/brennerei
```

Diese Adresse ist eine dokumentierte Vorgabe, keine bestätigte Testfreigabe.
**Vor jedem Datenbanktest das tatsächliche Ziel als Wegwerf-Datenbank bestätigen.**
Weder eine lokale Adresse noch der Datenbankname allein beweisen dies.
Bei unklarem Ziel keine Verbindung herstellen und keine SQL-Skripte ausführen.
Die bestätigte Testadresse nur im vorgesehenen Testprozess verwenden;
Produktionskonfiguration nicht überschreiben.

Schemaänderungen ausschließlich gegen die bestätigte Wegwerf-Datenbank prüfen:

```bash
psql "$BRENNEREI_DB" -v ON_ERROR_STOP=1 -f datenbank/001_schema.sql
psql "$BRENNEREI_DB" -v ON_ERROR_STOP=1 -f datenbank/002_rechnung.sql
psql "$BRENNEREI_DB" -v ON_ERROR_STOP=1 -f datenbank/900_test.sql
```

### Website

Abhängigkeiten einmalig installieren, dann bauen und prüfen:

```bash
npm ci                      # einmalig, Abhängigkeiten
node build.mjs              # oder: npm run build   (rund 6 Minuten)
npm run pruefe              # = pruefe_daten + pruefe_links

node tools/pruefe_daten.mjs      # Preise, Alkohol, Größen gegen site/data/produkte.js
node tools/pruefe_links.mjs      # tote interne Verweise, Bilder, CSS-url()
node tools/pruefe_notizen.mjs    # interne Notizen (TODO, KI-Marker) im sichtbaren Text
node tools/pruefe_kontrast.mjs   # WCAG-Kontraste aus site/assets/css/main.css
node tools/pruefe_browser.mjs    # Konsole, Tastatur, Merkliste, Filter (braucht laufenden Server)
```

Der Browser-Test und Lighthouse brauchen eine laufende Vorschau:

```bash
npm run serve    # python3 -m http.server 8770 -d dist
sh tools/lighthouse.sh http://localhost:8770/ /tmp/lh.json
node tools/screenshots.mjs <zielordner>
```

Letzter Lauf: `pruefe_daten` 66 Seiten / 404 Preisangaben grün, `pruefe_links`
6214 Verweise grün, `pruefe_notizen` grün, `pruefe_kontrast` 15 Farbpaare grün,
`pruefe_browser` 112 Prüfungen grün; `node build.mjs` erzeugt `dist/` unverändert
(reproduzierbar).

Erfinde keine anderen Prüfbefehle. Es gibt `npm run build`, `npm run serve` und
`npm run pruefe`; `npm test`, `ruff` und `make` gibt es nicht.

## Regeln für die Website

- `site/data/produkte.js` ist eine **Kopie** von `v2/data/produkte.js` und wird
  nicht von Hand geändert.
- Nach Änderungen an `site/` muss `node build.mjs` laufen und `dist/`
  **mitcommittet** werden.
- Die Seite ist zweisprachig, Deutsch und Französisch (`site/lib/i18n.mjs`);
  Französisch enthält nur bestätigte Texte, Entwürfe bekommen dort einen
  Platzhalter.
- Inhalte, die der Brenner noch nicht bestätigt hat, tragen
  `data-todo="bestaetigen"`; fehlende Bilder `data-todo="foto"`; fehlende
  Übersetzungen `data-todo="uebersetzung"`. Diese Marker dürfen nicht entfernt
  werden, solange die Bestätigung fehlt.
- **Keine Produktangaben erfinden.** Alkoholgehalt, Preise, Telefonnummer, RCS-
  und TVA-Nummer, Adresse und Öffnungszeiten stammen ausschließlich vom Betrieb.
  Offene Punkte stehen in `TODO-INHALTE.md`.

Nur selbst gestartete Prozesse beenden. Keine fremden Prozesse auf Port 8770 stoppen.

### Nachweise

Historischer Referenzstand, kein aktueller Prüfnachweis:
- Python: 64 Tests.
- Website: 66 Seiten, 404 Preisangaben, 6214 Verweise.
- Kontrast: 15 Farbpaare.
- Browser: 112 Prüfungen.
- Build erzeugte damals `dist/` unverändert.

Aktuelle Zahlen ausschließlich aus dem tatsächlichen Lauf berichten.
Ein gestarteter oder noch laufender Build ist kein erfolgreicher Build.
Exit-Code, Ausgabe und resultierenden Diff prüfen.
Fehlende Datenbank, Werkzeuge oder Browserumgebung als **nicht verifiziert** melden.

## 7. Website-Regeln

- `site/` ist die Quelle; generierte Dateien in `dist/` nicht von Hand ändern.
- Nach Änderungen an `site/` bauen und zugehörige `dist/`-Änderungen mitcommitten.
- Mehrere zusammengehörige Änderungen vor einem vollständigen Build bündeln.
- `site/data/produkte.js` ist eine Kopie von `v2/data/produkte.js`;
  nicht von Hand ändern.
- Änderungen an Produktdaten benötigen einen geklärten, freigegebenen
  Pflege-/Synchronisationsweg. Nicht eigenmächtig die geschützte 3D-Fassung ändern.
- Deutsch und Französisch über `site/lib/i18n.mjs`.
- Französische Texte nur bestätigt übernehmen; Entwürfe erhalten Platzhalter.
- Unbestätigte Inhalte: `data-todo="bestaetigen"`.
- Fehlende Bilder: `data-todo="foto"`.
- Fehlende Übersetzungen: `data-todo="uebersetzung"`.
- Marker erst entfernen, wenn die zugehörige Bestätigung oder Ergänzung vorliegt.
- `data-todo`-Attribute sind interne Statusmarker und bleiben bis zur Klärung erhalten.
- Sichtbare Platzhalter dürfen keine internen TODOs, KI-Hinweise oder
  unbestätigten Produktbehauptungen enthalten.
- Bei fehlender Übersetzung einen neutralen Platzhalter verwenden,
  der mit den vorhandenen Prüfregeln vereinbar ist.
- Prüfregeln nicht abschwächen, nur um einen Platzhalter durchzulassen.
- Keine Produkt- oder Betriebsangaben erfinden: Alkoholgehalt, Preise,
  Telefonnummer, RCS-/TVA-Nummer, Adresse und Öffnungszeiten ausschließlich
  aus bestätigten Angaben des Betriebs.
- Offene Inhalte in `TODO-INHALTE.md` berücksichtigen.
- Bestehende Funktionen, Informationen, Sprachfassungen und Bedienbarkeit erhalten.

## 8. Datenmodell und Rechnungsprogramm

Bestehende fachliche Invarianten erhalten:

- Jede SQL-Funktion trägt `SET search_path = brennerei, public`.
- Sichten vor dem Neuanlegen mit `DROP VIEW IF EXISTS ... CASCADE` entfernen.
- Belege: Entwurf ohne Nummer, lückenlose Nummer erst beim Festschreiben,
  danach unveränderlich; Korrektur nur per Gutschrift.
- Reverse Charge (Art. 196 MwSt-Richtlinie) weist keine Steuer aus — auch nicht
  im Journal.
- Mengen: `variante.grundeinheit` ist `ml`, `g` oder `Stück`. Nicht alles ist
  Flüssigkeit (z. B. Apfelchips).
- Die Verbindungsadresse wird beim Verbinden gelesen, nicht beim Import.
- Tests: session-scoped Stammdaten, Rollback je Test, Savepoints über
  `with con.transaction():`.
- Losnummer beginnt mit der Fassnummer (Beispiel `F017-260920`) und geht als
  Chargencode an LabelForge (siehe `docs/ETIKETTEN.md`).

## Hooks und Fähigkeiten

- **`.claude/skills/trainiere-prompt/`** — schärft unklare Aufträge, bevor sie an
  Coder oder Helfer gehen; zeigt nur verbesserten Prompt, Plan und offene
  Entscheidungen und führt selbst nichts aus.
- **Erinnerungs-Hook**: `.claude/hooks/ablauf-erinnerung.sh` blendet bei jeder Eingabe einen Merksatz ein (eingetragen in `.claude/settings.json` unter `hooks.UserPromptSubmit`).
  **Abschalten:** den `UserPromptSubmit`-Eintrag aus `.claude/settings.json` entfernen, oder nur für dich lokal in `.claude/settings.local.json` `"disableAllHooks": true` setzen (schaltet alle Hooks ab).
- Hook, Agenten und Skill werden beim Sessionstart geladen – nach Änderungen eine neue Session starten. Hauptmodell der Session auf **Opus** stellen (`/model`).

## TypeSafe
Use the `typesafe:typesafe-ai` skill when working on this project. Whenever a feature
needs semantic judgment (routing, ranking, extraction, verification, classification),
or an LLM prompt-and-parse step could become a structured decision, load the skill
and follow it, including reading the live docs at https://docs.typesafe.ai/llms.txt.
