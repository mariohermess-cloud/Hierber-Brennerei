---
name: trainiere-prompt
description: Zeigt zu einem Arbeitsauftrag den verbesserten Prompt, die offengelegte Deutung des diktierten Wortlauts, eine Plan-Tabelle und offene Entscheidungen, ohne etwas auszuführen. Auslösen, wenn der Nutzer „trainiere Prompt“ (auch „trainier den Prompt“, „Prompt trainieren“) schreibt oder spricht.
intended-models: opus, fable, sonnet (nicht auf Haiku geprüft)
description: Macht aus einem grob formulierten Wunsch einen präzisen Arbeitsauftrag für die Brennerei-Projekte. Nutze diese Fähigkeit, wenn der Auftrag unklar, sehr groß oder mehrdeutig ist, wenn der Nutzer nach einem besseren Prompt fragt, oder bevor eine Aufgabe an Coder oder Helfer übergeben wird.
---

# Auftrag schärfen

Ziel: aus einem umgangssprachlichen Wunsch einen Auftrag machen, den der Coder
(Sonnet) oder der Helfer (Haiku) ohne Rückfragen und ohne Fehldeutung erledigen kann.

Sprache: Deutsch.

## Vorgehen

### 1. Verstehen, nicht raten
Lies den Wunsch und benenne in einem Satz das eigentliche Ziel — das gewünschte
Ergebnis, nicht den genannten Lösungsweg. Beispiel: „Die Fassnummer soll aufs
Etikett" heißt eigentlich: „Beim Etikettendruck soll die zum Druckzeitpunkt aktive
Fassnummer erscheinen, ohne dass jemand sie abtippt."

### 2. Lücken finden
Prüfe den Wunsch gegen diese Liste und notiere, was fehlt:

- **Ergebnis**: Woran erkennen wir, dass es fertig ist?
- **Umfang**: Welche Dateien und Bereiche sind betroffen, welche ausdrücklich nicht?
- **Daten**: Welche Tabellen, Spalten, Felder? Woher kommen die Werte?
- **Sonderfälle**: leere Werte, Storno, Reverse Charge, mehrere Einheiten (ml, g, Stück).
- **Rechtliches**: Belege bleiben unveränderlich; Nummernkreise lückenlos;
  Korrektur nur per Gutschrift. Berührt die Änderung das?
- **Prüfung**: Mit welchem der Befehle aus `.claude/agents/coder.md` wird es belegt?
- **Live**: Ist ein Live-System betroffen? Dann macht das ausschließlich der Chef.

### 3. Fragen stellen
Stelle nur die Fragen, deren Antwort die Arbeit wirklich verändert — höchstens
drei, jeweils mit einem Vorschlag, den der Nutzer mit „ja" bestätigen kann.
Alles Übrige entscheidest du selbst und schreibst es als Annahme auf.

### 4. Zuschneiden
Ordne die Aufgabe einer Rolle zu:

| Art der Aufgabe | Rolle |
|---|---|
| Suchen, lesen, zusammenfassen, Übersicht, Doku-Zeile | Helfer (Haiku) |
| Abgegrenzte Code- oder SQL-Änderung mit Test | Coder (Sonnet) |
| Plan, Architektur, Prüfung, Commit, Push, Live-System | Chef (Opus) |

Ist die Aufgabe zu groß für einen Durchgang, zerlege sie in Schritte, die einzeln
prüfbar sind, und nenne die Reihenfolge und die Abhängigkeiten.

### 5. Auftrag ausgeben

```
## Ziel
Ein Satz.

## Nicht Teil des Auftrags
- ...

## Betroffene Dateien
- pfad/datei — was darin

## Vorgehen
1. ...

## Annahmen
- ... (falls falsch, bitte widersprechen)

## Fertig, wenn
- ...
- Prüfbefehl <Befehl> läuft durch

## Rolle
Helfer | Coder | Chef — Begründung in einem Halbsatz.
```

## Faustregeln

- Ein Auftrag, ein Ergebnis. Zwei Ziele in einem Auftrag ergeben zwei Aufträge.
- Nenne immer auch, was **nicht** geändert werden soll — das verhindert Wildwuchs.
- Schreibe Bedingungen nachprüfbar: nicht „soll schnell sein", sondern
  „die Testsuite läuft unverändert durch".
- Keine erfundenen Werkzeuge. Nur die Prüfbefehle aus `.claude/agents/coder.md`.
- Im Zweifel kleiner schneiden.
description: Verbessert einen Arbeitsauftrag und zeigt Plan und offene Entscheidungen, ohne etwas auszuführen. Auslösen, wenn der Nutzer „trainiere Prompt“ (auch „trainier den Prompt“, „Prompt trainieren“) schreibt oder spricht.
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
