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
