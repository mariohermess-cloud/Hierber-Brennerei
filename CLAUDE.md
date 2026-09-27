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
