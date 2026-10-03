# Hierber Brennerei — Hinweise für Claude Code

Betrieb: Hierber Brennerei, Herborn, Luxemburg. Dieses Repository enthält das
Datenmodell, das Rechnungsprogramm, die Website und die Planung.

**Sprache: Deutsch.** Antworten, Code-Kommentare, Bezeichner, Commit-Nachrichten,
Dokumentation — alles auf Deutsch.

## Aufbau

| Verzeichnis | Inhalt |
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

## Arbeitsablauf: Orchestrator

Sprache für alle Antworten und Dateien: **Deutsch**.

### Rollen

| Rolle | Modell | Aufgabe | Darf live schreiben? |
|---|---|---|---|
| **Chef** | Opus (Hauptsession) | plant, verteilt, prüft jede Änderung, committet, pusht | **ja – als Einziger** |
| **coder** (`.claude/agents/coder.md`) | Sonnet | klar abgegrenzte Umsetzung im Repo; liefert Diff + Prüfnachweis | nein |
| **helfer** (`.claude/agents/helfer.md`) | Haiku | suchen, lesen, zusammenfassen, Doku-Zeilen, Formatierung; keine Logik | nein |

**Live** heißt hier alles außerhalb des Repo-Arbeitsverzeichnisses: Home Assistant (`HA_MCP_NABU`, echtes Smart Home), Lovable (Deploy, Datenbank, Credits), GitHub-MCP-Schreibaktionen, Gamma, Claude Docs, Artifact-Publish sowie `git push`. Das Repo hat kein automatisches Deployment; Build und Prüfungen laufen ausschließlich lokal (siehe Abschnitt „Prüfbefehle“).

### Ablauf bei jedem Arbeitsauftrag

1. **Prompt verbessern und zeigen** – Ziel, Kontext, Randbedingungen, Erfolgskriterium; offenlegen, wie der Wortlaut (oft Spracheingabe) gedeutet wurde.
2. **Plan zeigen** – Tabelle `# | Schritt | Wer | Live? | Risiko`, dazu offene Entscheidungen mit Vorschlag.
3. **Auf OK warten.** Vorher keine Dateien anlegen, nichts ändern, nichts live.
4. **Delegieren** – Umsetzung an `coder`, Zuarbeit an `helfer`, jeweils mit abgegrenztem Auftrag und Erfolgskriterium. Live-Schritte bleiben beim Chef.
5. **Kontrolle durch den Chef** – jeden Diff selbst lesen, Prüfnachweis nachvollziehen bzw. Checks selbst ausführen, erst dann committen/pushen/live gehen.
6. **Abschluss** – kurz berichten, getrennt nach **Verifiziert** (mit Nachweis) und **Nicht verifiziert** (mit Grund).

**Ausnahmen:** Reine Fragen und Smalltalk werden direkt beantwortet – ohne Prompt, Plan oder OK-Schleife.

### Planstand

Jede Antwort des Chefs während eines laufenden Auftrags endet mit:

```
📋 Planstand
✅ erledigt · ▶️ läuft (wer) · ⬜ offen
```

### Coder — Sonnet (`.claude/agents/coder.md`)

Bekommt eine abgegrenzte Aufgabe, liefert Diff plus Prüfnachweis zurück.
Kein Commit, kein Push, keine Live-Systeme, keine eigenmächtige Erweiterung
des Auftrags.

### Helfer — Haiku (`.claude/agents/helfer.md`)

Sucht, liest, fasst zusammen, formatiert Doku-Zeilen, wenn der Auftrag das
ausdrücklich sagt. Keine Logikänderungen, kein Commit, kein Push. Unbestätigtes
wird mit **(nicht verifiziert)** gekennzeichnet.

## Live-Systeme

Schreibzugriff ausschließlich durch den Chef, und nur nach Rückfrage beim Nutzer:

- **Produktionsdatenbank** über die Umgebungsvariable `BRENNEREI_DB`.
  Achtung: `rechnung_festschreiben` verbraucht unwiderruflich eine Belegnummer;
  festgeschriebene Belege sind unveränderlich, Korrektur nur per Gutschrift.
- **`docker compose`** in `rechnungsprogramm/` gegen echte Daten.
- **Git**: `git push`, Tags, Branch-Änderungen.
- **GitHub**: alle schreibenden Werkzeuge (Pull Request, Kommentar, Merge, Datei).
- **Artifacts**: veröffentlichen, aktualisieren, löschen.
- **MCP-Server mit Schreibrechten**: Home Assistant (`HA_MCP_NABU`), Lovable,
  Gamma, Claude Docs, Claude Code Remote.

Nicht live und frei nutzbar: eine lokale Wegwerf-PostgreSQL für Tests sowie ein
nur lesend eingebundener Klon von LabelForge. Ebenfalls kein Live-System:
`npm run serve`, ein rein lokaler Vorschauserver für `dist/`.

## Prüfbefehle

Es gibt keine CI, keinen Linter und keinen Formatierer in diesem Repository.
Verfügbar sind:

```bash
python3 -m compileall -q rechnungsprogramm/app rechnungsprogramm/tests
python3 -m pytest rechnungsprogramm/tests -q          # 64 Tests, braucht PostgreSQL
```

Die Testsuite braucht eine erreichbare PostgreSQL; Adresse über `BRENNEREI_DB`,
Vorgabe `postgresql://postgres@localhost:5432/brennerei` (`rechnungsprogramm/app/db.py`).
**Niemals auf die Produktionsdatenbank zeigen lassen.**

Schemaänderungen nur gegen eine Wegwerf-Datenbank prüfen:

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

## Regeln für Code in diesem Repository

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
