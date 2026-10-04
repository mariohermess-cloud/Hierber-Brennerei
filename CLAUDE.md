# Hierber Brennerei — Hinweise für Claude Code

Betrieb: Hierber Brennerei, Herborn, Luxemburg. Dieses Repository enthält das
Datenmodell, das Rechnungsprogramm, den Website-Prototyp und die Planung.

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

## Arbeitsablauf: Orchestrator

Drei Rollen. Die Hauptsession ist der Chef.

### Chef — Opus (Hauptsession)

Plant, delegiert, prüft, committet, pusht. **Nur der Chef darf auf Live- und
Produktivsysteme schreiben.** Der Chef schreibt nicht selbst jede Zeile Code: was
sich abgrenzen lässt, geht an den Coder; was nur Suchen und Lesen ist, an den Helfer.

Ablauf: Auftrag verstehen → bei Unklarheit mit der Fähigkeit `trainiere-prompt`
schärfen → Plan mit Schritten, Rolle und Risiko → delegieren → Ergebnis samt
Prüfnachweis prüfen → selbst committen und pushen.

Jede Antwort während eines laufenden Auftrags endet mit:
# CLAUDE.md

## Arbeitsablauf: Orchestrator

Sprache für alle Antworten und Dateien: **Deutsch**.

### Rollen

| Rolle | Modell | Aufgabe | Darf live schreiben? |
|---|---|---|---|
| **Chef** | Opus (Hauptsession) | plant, verteilt, prüft jede Änderung, committet, pusht | **ja – als Einziger** |
| **coder** (`.claude/agents/coder.md`) | Sonnet | klar abgegrenzte Umsetzung im Repo; liefert Diff + Prüfnachweis | nein |
| **helfer** (`.claude/agents/helfer.md`) | Haiku | suchen, lesen, zusammenfassen, Doku-Zeilen, Formatierung; keine Logik | nein |

**Live** heißt hier alles außerhalb des Repo-Arbeitsverzeichnisses: Home Assistant (`HA_MCP_NABU`, echtes Smart Home), Lovable (Deploy, Datenbank, Credits), GitHub-MCP-Schreibaktionen, Gamma, Claude Docs, Artifact-Publish sowie `git push`. Das Repo selbst hat derzeit weder Deployment noch Build-, Test- oder Lint-Konfiguration.

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
nur lesend eingebundener Klon von LabelForge.

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

Erfinde keine anderen Prüfbefehle (kein `npm test`, kein `ruff`, kein `make`).

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

- `.claude/hooks/ablauf-erinnerung.sh` — spielt bei jeder Nutzereingabe eine
  Kurzfassung dieses Ablaufs ein (`UserPromptSubmit`, konfiguriert in
  `.claude/settings.json`).
- `.claude/skills/trainiere-prompt/SKILL.md` — schärft unklare Aufträge, bevor sie
  an Coder oder Helfer gehen.
(Je Planschritt eine Zeile mit dem passenden Symbol. Gilt nicht für die Rückmeldungen von `coder`/`helfer`; die haben ihr eigenes festes Format.)

### Hilfsmittel

- **„trainiere Prompt“** (`.claude/skills/trainiere-prompt/`): zeigt nur verbesserten Prompt, Plan und offene Entscheidungen – führt nichts aus.
- **Erinnerungs-Hook**: `.claude/hooks/ablauf-erinnerung.sh` blendet bei jeder Eingabe einen Merksatz ein (eingetragen in `.claude/settings.json` unter `hooks.UserPromptSubmit`).
  **Abschalten:** den `UserPromptSubmit`-Eintrag aus `.claude/settings.json` entfernen, oder nur für dich lokal in `.claude/settings.local.json` `"disableAllHooks": true` setzen (schaltet alle Hooks ab).
- Hook, Agenten und Skill werden beim Sessionstart geladen – nach Änderungen eine neue Session starten. Hauptmodell der Session auf **Opus** stellen (`/model`).

## TypeSafe
Use the `typesafe:typesafe-ai` skill when working on this project. Whenever a feature
needs semantic judgment (routing, ranking, extraction, verification, classification),
or an LLM prompt-and-parse step could become a structured decision, load the skill
and follow it, including reading the live docs at https://docs.typesafe.ai/llms.txt.

## Fotos übernehmen

Der Nutzer legt neue Bilder in drei Ordnern ab (Namensregeln, alles klein geschrieben, PNG):

| Ordner | Inhalt | Name | Format |
|---|---|---|---|
| `fotos-flaschen/` | Flaschenbilder mit Etikett | `<sorten-id>.png` (Hauptbild, = 0,5 L) oder `<sorten-id>-<größe>.png`, Größe `0-1l`, `0-2l`, `0-5l`, `0-7l`, `1-0l`, `1-5l`; `<id>-0-5l.png` gilt wie `<id>.png`, existieren beide, gilt `<id>.png` | 1024 × 1536 |
| `fotos-ki/` | Serviervorschläge | `<sorten-id>-<n>.png` (n = 1 Hauptbild) | 1448 × 1086 |
| `fotos-basis/` | leere Basisflaschen (Anhang 1 der Prompts, nicht auf der Seite) | `<rund\|schlank\|karaffe>-<größe>.png`, `rund-40ml.png` | etwa 1312 × 1199 |

Befehl (ein Befehl, idempotent, Exit-Code ≠ 0 bei Fehlern):

```bash
node tools/fotos_uebernehmen.mjs              # Namen und Format prüfen, Generatoren, Build, Prüfskripte, FOTO-STAND.md
node tools/fotos_uebernehmen.mjs --ohne-build # ohne Build und Prüfskripte
node tools/fotos_uebernehmen.mjs --browser    # zusätzlich pruefe_browser.mjs (eigener Server auf Port 8770, per PID beendet)
```

Er meldet Dateien gegen die Namensregeln und abweichende Bildformate (verschiebt oder löscht nichts), lässt die fünf Generatoren in fester Reihenfolge laufen, baut mit `node build.mjs`, führt `pruefe_daten`, `pruefe_links`, `pruefe_notizen`, `pruefe_kontrast` aus und schreibt die Zusammenfassung nach stdout und `FOTO-STAND.md` (Tabelle Sorte × Größe, Serviervorschläge je Sorte). Der Build dauert bis etwa 6 Minuten; im Hintergrund laufen lassen.

**Ablauf des Chefs bei „Fotos sind gepusht“:**

1. `git fetch`, danach den Befehl `node tools/fotos_uebernehmen.mjs --browser` ausführen.
2. Branch von `main` anlegen (die hochgeladenen Fotos und die Ergebnisse des Befehls dorthin übernehmen).
3. Ergebnis prüfen: Auffälligkeiten (Namen, Formate), `FOTO-STAND.md`, Diff, Ausgabe der Prüfskripte.
4. Pull Request öffnen. **Merge nur auf ausdrückliche Anweisung des Nutzers.**

Auf der Sortenseite gilt: Hauptbild (`<id>.png`, sonst `<id>-0-5l.png`) im Kopf und auf der Karte, beim Wählen einer Größe das Bild dieser Größe, sonst das Hauptbild bzw. die Vektor-Flasche.
