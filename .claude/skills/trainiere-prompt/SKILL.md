---
name: trainiere-prompt
description: Verbessert einen Arbeitsauftrag und zeigt Plan und offene Entscheidungen, ohne etwas auszuführen. Auslösen, wenn der Nutzer „trainiere Prompt“ (auch „trainier den Prompt“, „Prompt trainieren“) schreibt oder spricht.
---

# trainiere Prompt

Dieser Skill **zeigt nur, er führt nichts aus**: keine Datei anlegen oder ändern, keine Agenten starten, nichts committen, keine Live-Tools. Lesen im Repo ist erlaubt, damit Prompt und Plan zum Ist-Zustand passen.

Nimm den Auftrag des Nutzers (den Text nach „trainiere Prompt“ oder, falls leer, den letzten Arbeitsauftrag) und gib auf Deutsch genau diese vier Teile aus:

## (1) Verbesserter Prompt

- **Ziel:** was am Ende anders sein soll, in einem Satz.
- **Kontext:** relevante Dateien, Systeme, Vorwissen aus dem Repo.
- **Randbedingungen:** was nicht passieren darf, was erhalten bleiben muss, Live-Systeme.
- **Erfolgskriterium:** woran man prüfbar erkennt, dass es fertig ist.
- **So habe ich deinen Wortlaut gelesen:** Der Nutzer diktiert oft per Spracheingabe. Nenne jedes Wort bzw. jede Stelle, die du umgedeutet, korrigiert oder ergänzt hast („‚Hohm Assistent‘ → Home Assistant“, „‚das Ding‘ → vermutlich `X`“).

## (2) Plan

| # | Schritt | Wer | Live? | Risiko |
|---|---|---|---|---|
| 1 | … | Opus / coder / helfer | ja/nein | gering/mittel/hoch + kurzer Grund |

- **Wer:** Opus = Chef (Planung, Kontrolle, Commit/Push, alles Live), `coder` = abgegrenzte Umsetzung im Repo, `helfer` = Suchen/Lesen/Zusammenfassen/Doku.
- **Live? = ja** nur bei Schritten des Chefs.

## (3) Offene Entscheidungen

Nummerierte Liste; zu jeder Frage **dein Vorschlag** mit kurzer Begründung. Wenn es keine gibt: „keine“.

## (4) Abschlusszeile

Mit OK starte ich, oder schreib, was ich ändern soll.
