# Hierber Brennerei — Projektregeln für Claude Code

## 1. Projekt und Sprache

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
| `datenbank/` | PostgreSQL-Schema `brennerei`: `001_schema.sql`, `002_rechnung.sql`, `900_test.sql` |
| `rechnungsprogramm/` | FastAPI: `app/`, `tests/`, `pytest.ini` |
| `website/prototyp/` | Klick-Prototyp „Obstwiese“: `obstwiese.html` |
| `vorlagen/` | Excel-Erfassungsvorlage und Erzeugerskript |
| `docs/` | `MASTERPLAN.md`, offene Fragen F-01 bis F-24, `ETIKETTEN.md` |
| `site/` | Website-Quellen: `lib/*.mjs`, `data/*.js`, `assets/` |
| `build.mjs` | Baut `site/` nach `dist/` |
| `dist/` | Eingechecktes Build-Ergebnis; zugehörige Änderungen mitcommitten |
| `tools/` | Prüfwerkzeuge, Bild- und Prompt-Skripte |
| `assets/fonts/` | Lokale Schriften: Cormorant Garamond, Inter |
| `index.html`, `keller-v2.html`, `js/`, `css/`, `v2/`, `vendor/` | Ältere 3D-Fassung mit Three.js und GSAP; unangetastet lassen |
| `Fotos/`, `Fertige Etiquetten/`, `fotos-*/` | Bildmaterial |

Inhalts- und Bildnotizen:
`TODO-INHALTE.md`, `BILDERLISTE.md`, `FOTO-INVENTAR.md`,
`FOTO-PLATZHALTER.md`, `FLUESSIGKEIT-MESSUNG.md`,
`CHATGPT-STAPEL.md`, `PROMPTS-*.md`.

Dateien gezielt nach Aufgabenbezug lesen, nicht sämtliche Notizen ungefragt laden.
Aktuelle Dateien und tatsächlich ausgeführte Prüfungen haben Vorrang vor
historischen technischen Angaben in dieser Anleitung. Abweichungen von
Freigabe-, Sicherheits- oder Fachregeln nicht eigenmächtig übernehmen,
sondern als offene Entscheidung melden.

## 3. Orchestrator und Rollen

Die Hauptsession ist der **Chef**.

| Rolle | Modell | Verantwortung |
|---|---|---|
| Chef | Opus | Auftrag klären, planen, delegieren, Diffs prüfen, Freigaben einholen, Git- und Live-Schritte ausführen |
| `coder` | Sonnet | Abgegrenzte Umsetzung im Repository und Prüfnachweis |
| `helfer` | Haiku | Suchen, Lesen, Zusammenfassen; ausdrücklich beauftragte redaktionelle Dokumentations- und Formatierungsänderungen |

Agentendefinitionen:
- `.claude/agents/coder.md`
- `.claude/agents/helfer.md`

### Grenzen

- Nur der Chef darf committen, Branches verändern, pushen oder live schreiben.
- `coder`: keine Commits, Pushes, Live-Zugriffe oder Auftragserweiterungen.
- `helfer`: keine Logikänderungen, Commits, Pushes oder Live-Zugriffe.
- Abgrenzbare Code- und Logikänderungen an `coder` delegieren.
- Recherche sowie ausdrücklich beauftragte, rein redaktionelle
  Dokumentations- und Formatierungsänderungen an `helfer` delegieren.
- Kleine, nicht sinnvoll abgrenzbare Änderungen darf der Chef selbst umsetzen.
- Keine parallelen Schreibaufträge für dieselben Dateien.
- Jeder Agent erhält Ziel, erlaubte Dateien, Grenzen, erlaubte Prüfungen
  und Erfolgskriterien.
- Agenten liefern eine Zusammenfassung, den Diff beziehungsweise eine eindeutige
  Referenz darauf, Prüfbefehle mit Ergebnissen sowie offene Punkte.
- Agenten dürfen nur die im Auftrag freigegebenen lokalen Prüfungen ausführen.
- Datenbankprüfungen sind ausschließlich gegen die vom Chef zuvor bestätigte
  Wegwerf-Datenbank erlaubt. Produktionszugriffe bleiben verboten.
- Agenten dürfen Datenbankziele nicht eigenmächtig ändern.
- Ist ein Agent oder Modell nicht verfügbar, offenlegen. Nicht behaupten,
  delegiert zu haben; abweichendes Vorgehen vor der Umsetzung abstimmen.

## 4. Ablauf und Freigaben

### Vor der Umsetzung

1. Auftrag knapp präzisieren: Ziel, Kontext, Grenzen, Erfolgskriterien.
   Bei Spracheingaben die entscheidende Interpretation offenlegen.
2. Plan zeigen:

   `# | Schritt | Wer | Live? | Risiko`

3. Offene Entscheidungen mit Empfehlung nennen.
4. Auf **OK** warten. Vorher keine Dateien anlegen oder verändern,
   keine Builds, Installationen, Tests mit Schreibwirkungen oder Live-Aktionen.
   Gezieltes Lesen zur Planung ist erlaubt.

Unklare Aufträge mit `.claude/skills/trainiere-prompt/` schärfen.
Klare Aufträge nicht unnötig umformulieren oder mehrfach bestätigen lassen.

### Nach der Freigabe

1. Innerhalb des genehmigten Plans delegieren und umsetzen.
2. Chef liest jeden Diff und prüft die Nachweise.
3. Passende Prüfungen ausführen; Fehler vor dem Abschluss behandeln.
4. Git- und Live-Schritte nur gemäß ihrer eigenen Freigabe ausführen.
5. Abschluss getrennt nach:
   - **Verifiziert:** Änderung, Prüfung und tatsächliches Ergebnis.
   - **Nicht verifiziert:** fehlende Prüfung und konkreter Grund.

Eine Freigabe gilt nur für die ausdrücklich genannten Schritte.
Neue Risiken, zusätzliche Dateien außerhalb des vereinbarten Umfangs oder
wesentliche Planänderungen erneut abstimmen.
Ein allgemeines „OK“ zur lokalen Umsetzung erlaubt keinen Push, Merge
oder Live-Zugriff. Explizit aufgeführte externe Aktionen benötigen eine
entsprechend eindeutige Freigabe; Merge benötigt immer eine eigene Anweisung.

### Ausnahmen

Reine Fragen, Smalltalk und ausdrücklich rein lesende Analysen direkt beantworten.
Keine Prompt-, Plan- oder OK-Schleife, solange nichts verändert wird.

### Planstand

Jede Antwort des Chefs während eines laufenden Änderungsauftrags endet mit
einer Zeile je Planschritt:

```text
📋 Planstand
✅ Schritt erledigt
▶️ Schritt läuft (Chef/coder/helfer)
⬜ Schritt offen
```

Agenten verwenden ihr eigenes Rückmeldeformat.

## 5. Live-Systeme und Git

### Live-Zugriffe

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

### Git-Freigaben

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

```bash
jq . .claude/settings.json
sh .claude/hooks/ablauf-erinnerung.sh </dev/null | jq .
```

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

Bei einem Fehler abbrechen; nachfolgende Skripte nicht ungeprüft ausführen.

### Website

Abhängigkeiten bei Bedarf aus dem vorhandenen Lockfile installieren:

```bash
npm ci
```

Build und Basisprüfungen:

```bash
node build.mjs
npm run pruefe
```

`npm run build` ist die Alternative zu `node build.mjs`, nicht ein zweiter Build.
`npm run pruefe` umfasst `pruefe_daten` und `pruefe_links`.

Weitere vorhandene Prüfungen nach Änderungsumfang:

```bash
node tools/pruefe_daten.mjs
node tools/pruefe_links.mjs
node tools/pruefe_notizen.mjs
node tools/pruefe_kontrast.mjs
node tools/pruefe_browser.mjs
```

- Daten: Preise, Alkoholgehalte und Größen gegen `site/data/produkte.js`.
- Links: interne Verweise, Bilder und CSS-`url()`.
- Notizen: TODOs und KI-Marker im sichtbaren Text.
- Kontrast: Farbpaare aus `site/assets/css/main.css`.
- Browser: Konsole, Tastatur, Merkliste und Filter; laufende Vorschau erforderlich.

Vorschau, Lighthouse und Screenshots:

```bash
npm run serve
sh tools/lighthouse.sh http://localhost:8770/ /tmp/lh.json
node tools/screenshots.mjs <zielordner>
```

Die Vorschau in einem getrennten Prozess starten und ihre Erreichbarkeit prüfen,
bevor Lighthouse, Screenshots oder Browserprüfungen ausgeführt werden.
`<zielordner>` vor Ausführung durch einen konkreten freigegebenen Pfad ersetzen.
`npm run serve` startet laut Projektkonfiguration:

```bash
python3 -m http.server 8770 -d dist
```

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
  Abhängigkeiten vorher prüfen; niemals ungeprüft gegen Produktion ausführen.
- Belege: Entwurf ohne Nummer; lückenlose Nummer erst beim Festschreiben.
- Festgeschriebene Belege unveränderlich; Korrektur nur per Gutschrift.
- Reverse Charge gemäß bestehender Projektregel zu Art. 196:
  keine ausgewiesene Steuer, auch nicht im Journal.
- `variante.grundeinheit`: `ml`, `g` oder `Stück`.
  Nicht alle Produkte sind Flüssigkeiten, beispielsweise Apfelchips.
- Verbindungsadresse beim Verbinden lesen, nicht beim Modulimport.
- Tests: session-scoped Stammdaten, Rollback je Test,
  Savepoints über `with con.transaction():`.
- Losnummer beginnt mit der Fassnummer, beispielsweise `F017-260920`.
  Übergabe als Chargencode an LabelForge gemäß `docs/ETIKETTEN.md`.

Fachliche oder steuerliche Regeln nicht eigenmächtig neu interpretieren.
Unklarheiten als offene Entscheidung melden.

## 9. Hooks und Skills

### Prompt-Schärfung

`.claude/skills/trainiere-prompt/SKILL.md`:
- Unklare Aufträge vor der Delegation präzisieren.
- Verbesserten Prompt, Plan und offene Entscheidungen zeigen.
- Selbst keine Umsetzung oder Live-Aktion ausführen.

### Erinnerungs-Hook

`.claude/hooks/ablauf-erinnerung.sh`, eingetragen in
`.claude/settings.json` unter `hooks.UserPromptSubmit`.

Der Hook erinnert bei Nutzereingaben an den Arbeitsablauf.
Er ersetzt weder Freigaben noch technische Zugriffsbeschränkungen.

Nur auf ausdrücklichen Auftrag deaktivieren:
- `UserPromptSubmit`-Eintrag aus `.claude/settings.json` entfernen; oder
- lokal in `.claude/settings.local.json` `"disableAllHooks": true` setzen.
  Achtung: Diese Einstellung deaktiviert alle Hooks.

Nach Änderungen an Agenten, Skills oder Hooks eine neue Session als
konservative Projektregel verwenden. Hauptmodell auf Opus stellen (`/model`).

### TypeSafe

Bei Features mit semantischen Entscheidungen, beispielsweise Routing,
Ranking, Extraktion, Verifikation oder Klassifikation, den Skill
`typesafe:typesafe-ai` laden und seine Anweisungen befolgen.

Auch prüfen, ob ein LLM-Prompt mit anschließendem Parsing durch eine
strukturierte Entscheidung ersetzt werden sollte.

Aktuelle Dokumentation:
https://docs.typesafe.ai/llms.txt

- Keine TypeSafe-Integration für rein deterministische Aufgaben erzwingen.
- Keine neuen API-Aufrufe, Abhängigkeiten, Kosten oder Datenübertragungen
  ohne Aufnahme in den freigegebenen Plan.
- Keine Betriebs-, Kunden- oder Rechnungsdaten ungefragt extern übertragen.
- Ist der Skill oder die Dokumentation nicht erreichbar, offenlegen;
  keine Schnittstellen oder Fähigkeiten erfinden.
- Skill-Anweisungen heben die Freigabe- und Sicherheitsregeln dieses Projekts
  nicht auf. Konflikte vor der Umsetzung melden.

## 10. Fotos übernehmen

Neue Bilder: kleingeschriebene Dateinamen, PNG.

| Ordner | Inhalt | Dateiname | Sollformat |
|---|---|---|---|
| `fotos-flaschen/` | Flaschen mit Etikett | `<sorten-id>-<größe>.png`, der Name trägt IMMER die Größe (Hauptbild = `<sorten-id>-0-5l.png`; ohne Größe ist ein Namensfehler); Hierberol nur `hierberol-0-7l.png`; Holzkisten `holzkiste-6x0-1l.png` usw. (Querformat 1448 × 1086, nur Prompts) | 1024 × 1536 |
| `fotos-ki/` | Serviervorschläge | `<sorten-id>-<n>.png`; `n = 1` ist Hauptbild | 1448 × 1086 |
| `fotos-basis/` | Leere Basisflaschen für Prompt-Anhang 1, nicht für die Website | Form `form-größe.png`; Formen: `rund`, `schlank`, `karaffe`; außerdem `rund-40ml.png` | etwa 1312 × 1199 |
| `fotos-kisten/` | Leeres Kistenfoto der Holzkiste (Grundlage der Live-Vorschau auf `/brand/holzkiste-4x0-2l/`) | `holzkiste-leer.png`; nicht von der Namensprüfung erfasst | 1024 × 1536 (Hochformat) |

Bekannte Ausnahmen (in `tools/fotos_uebernehmen.mjs` hinterlegt, nicht gemeldet): in `fotos-basis/` die Namen `apotheker-0-1l.png`, `rund-schwarz-0-5l.png` und `rund-streifen-0-7l.png`; `fotos-flaschen/kraider-batti-0-5l.png` darf 1148 × 1371 haben. Alles andere bleibt streng.

Flaschengrößen:
`0-1l`, `0-2l`, `0-5l`, `0-7l`, `1-0l`, `1-5l`.

Hauptbild:
- `<id>.png` entspricht 0,5 L.
- `<id>-0-5l.png` ist gleichwertiger Ersatz.
- Existieren beide, hat `<id>.png` Vorrang.

### Übernahmebefehl

```bash
node tools/fotos_uebernehmen.mjs
```

Alternativen, nicht zusätzlich ausführen:

```bash
node tools/fotos_uebernehmen.mjs --ohne-build
node tools/fotos_uebernehmen.mjs --browser
```

Dokumentiertes Verhalten; bei Abweichungen das Skript prüfen und diese melden:
- Namen und Formate prüfen; keine Bilder verschieben oder löschen.
- Fünf Generatoren in fester Reihenfolge ausführen.
- Standardlauf: Build sowie Daten-, Link-, Notiz- und Kontrastprüfungen.
- `--ohne-build`: ohne Build und Prüfskripte; kein vollständiger Prüfnachweis.
- `--browser`: zusätzlich Browserprüfung mit eigenem Server auf Port 8770;
  Beendigung über dessen PID.
- Zusammenfassung auf stdout und in `FOTO-STAND.md`:
  Sorte × Größe sowie Serviervorschläge je Sorte.
- Idempotenter Ablauf; Exit-Code ungleich 0 bei Fehlern.

Keine Generatoren oder Builds doppelt starten, wenn der Übernahmebefehl
sie bereits erfolgreich ausgeführt hat. Abschluss und Exit-Code abwarten.
Ein längerer Lauf darf in einem kontrollierten lokalen Prozess laufen;
vor Prüfung, Commit oder Abschluss dessen tatsächliches Ende abwarten.

### Ablauf bei „Fotos sind gepusht“

1. Prompt, Plan und Freigaben einschließlich Git-Schritten und PR klären.
2. Arbeitsverzeichnis und vorhandene Nutzeränderungen prüfen.
3. Freigegebenes `git fetch` ausführen.
4. Remote und Foto-Branch eindeutig bestimmen.
   `git fetch` allein übernimmt Fotos nicht ins Arbeitsverzeichnis.
5. Arbeitsbranch vom nach `git fetch` geprüften Remote-main-Stand anlegen.
   Bereits dort enthaltene Fotos nicht erneut übernehmen.
6. Falls weitere Foto-Commits übernommen werden müssen, ihren vollständigen
   Inhalt prüfen. Enthalten sie Änderungen außerhalb des Auftrags, deren
   Übernahme gesondert abstimmen. Keine ungeprüfte Übernahme vollständiger
   Commits und kein Überschreiben fremder Änderungen.
7. Auf dem Arbeitsbranch ausführen:

   ```bash
   node tools/fotos_uebernehmen.mjs --browser
   ```

8. Auffälligkeiten, `FOTO-STAND.md`, vollständigen Diff, Prüfungen und
   Exit-Code kontrollieren. Zusätzlich `git diff --check` ausführen.
9. Nur auftragsbezogene Änderungen einschließlich zugehöriger
   `dist/`-Ergebnisse committen, sofern dieser Schritt freigegeben ist.
10. Push und Pull Request nur mit ausdrücklicher Freigabe.
11. **Merge ausschließlich auf ausdrückliche Anweisung des Nutzers.**

### Darstellung auf Sortenseiten

- Kopf und Karte: Hauptbild, sonst `<id>-0-5l.png`.
- Bei Größenwahl: passendes Größenbild.
- Fehlt es: Hauptbild, andernfalls vorhandene Vektor-Flasche.
- Keine vorhandene Rückfalllogik oder Größeninformation entfernen.
