---
name: trainiere-prompt
description: Zeigt zu einem Arbeitsauftrag den verbesserten Prompt, die offengelegte Deutung des diktierten Wortlauts, eine Plan-Tabelle und offene Entscheidungen, ohne etwas auszuführen. Auslösen, wenn der Nutzer „trainiere Prompt“ (auch „trainier den Prompt“, „Prompt trainieren“) schreibt oder spricht.
intended-models: opus, fable, sonnet (nicht auf Haiku geprüft)
---

# trainiere Prompt

Dieser Skill **zeigt nur, er führt nichts aus**: keine Datei anlegen oder ändern, keine Agenten starten, nichts committen, keine Live-Tools. Lesen im Repo ist erlaubt, soweit der Plan es braucht (vor allem die `CLAUDE.md` des Projekts, auch verschachtelte).

Auftrag ist der Text nach „trainiere Prompt“, sonst der letzte Arbeitsauftrag. Der Nutzer diktiert oft per Spracheingabe: Rechne mit Erkennungsfehlern, fehlender Zeichensetzung und falsch geschriebenen Fachbegriffen. Lege offen, wie du solche Stellen gedeutet hast, statt sie still zu korrigieren.

Reihenfolge, Überschriften und Tabellenspalten der Ausgabe sind fest, der Inhalt ist deine Einschätzung. Antworte auf Deutsch.

## Ausgabe

### 1. Verbesserter Prompt

- **Ziel:** was am Ende anders sein soll, in einem Satz.
- **Kontext:** betroffene Dateien, Systeme, Datenquellen (nur Belegtes).
- **Randbedingungen:** Regeln aus der `CLAUDE.md`, was erhalten bleiben muss, was live ist.
- **Erfolgskriterium:** woran man prüfbar erkennt, dass es fertig ist.
- **So habe ich deinen Wortlaut gelesen:** jede umgedeutete, korrigierte oder ergänzte Stelle in der Form „‚<Originalwort>‘ → verstanden als <…>“.

### 2. Plan

| # | Schritt | Wer | Live? | Risiko |
|---|---|---|---|---|
| 1 | … | Opus / Agent aus `.claude/agents/` | ja / nein | gering / mittel / hoch: kurzer Grund |

„Live? ja“ gilt für alles, was außerhalb des Repos schreibt (Push/PR, SharePoint, Home Assistant, Lovable, Veröffentlichen). Solche Schritte führt immer Opus aus.

### 3. Offene Entscheidungen

Nummeriert, je Punkt die Frage und **dein Vorschlag** mit einem Satz Begründung. Gibt es keine: „keine“.

### 4. Abschlusszeile

Mit OK starte ich, oder schreib, was ich ändern soll.

## Vor der Ausgabe prüfen

Erst korrigieren, dann ausgeben:

- Jede umgedeutete oder ergänzte Stelle steht unter „So habe ich deinen Wortlaut gelesen“.
- Jeder Schritt mit „Live? ja“ hat „Opus“ als Wer.
- Das Erfolgskriterium lässt sich an etwas Messbarem prüfen.
