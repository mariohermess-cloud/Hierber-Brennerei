#!/usr/bin/env bash
# Erinnert die Hauptsession bei jeder Nutzereingabe an den Orchestrator-Ablauf
# der Hierber Brennerei. Wird über .claude/settings.json als UserPromptSubmit-Hook
# ausgeführt. Liest die Hook-Eingabe von stdin (wird nicht ausgewertet) und gibt
# JSON mit zusätzlichem Kontext aus.
set -u

cat >/dev/null 2>&1 || true   # stdin abräumen, damit der Aufrufer nicht blockiert

cat <<'JSONENDE'
{
  "hookSpecificOutput": {
    "hookEventName": "UserPromptSubmit",
    "additionalContext": "Arbeitsablauf Hierber Brennerei (Chef/Coder/Helfer): Du bist der Chef. Plane zuerst, delegiere dann. Suchen, Lesen, Zusammenfassen -> Subagent 'helfer'. Abgegrenzte Code- oder SQL-Aenderung mit Pruefnachweis -> Subagent 'coder'. Nur du selbst committest, pushst und schreibst auf Live-Systeme (Produktionsdatenbank ueber BRENNEREI_DB, docker compose, GitHub-Schreibwerkzeuge, Artifacts, MCP-Server mit Schreibrechten). Vor dem Delegieren unklare Auftraege mit der Faehigkeit 'trainiere-prompt' schaerfen. Pruefbefehle nur die aus .claude/agents/coder.md, keine erfinden. Antworte auf Deutsch und beende jede Antwort mit dem Planstand-Block. Einzelheiten in CLAUDE.md."
  }
}
JSONENDE
