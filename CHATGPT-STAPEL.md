# CHATGPT-STAPEL: Bilder automatisch erzeugen lassen

Erzeugt mit `node tools/chatgpt_stapel.mjs` (nach `node tools/foto_prompts_weitere.mjs`). Nicht von Hand ändern. Hier steht, wie ChatGPT den Stapel der KI-Bilder abarbeitet, statt dass jedes Bild einzeln von Hand angefordert wird.

**Stand:** 119 Bilder im Stapel: 92 weitere Serviervorschläge (9 schon vorhanden, 83 offen) und 27 Ersatzbilder für fehlerhafte Erstbilder (26 offen, 1 „ersetzt, bitte prüfen“). Zu erzeugen sind also **109 Bilder**.

## Ehrlich vorab

- **Wie verlässlich die Automatik läuft, hängt von der ChatGPT-Version und dem Tarif ab.** Ich kann das von hier aus nicht testen. Typische Grenzen: wie viele Dateien man pro Nachricht oder Chat anhängen darf, wie viele Bilder pro Zeitraum erzeugt werden dürfen (danach „bitte später wieder“), und dass ein Chat bei sehr vielen Bildern langsam wird oder den Faden verliert. Die konkreten Zahlen ändern sich; bitte in der Hilfe von ChatGPT nachlesen.
- **Darum in Blöcken arbeiten:** nicht alle 109 auf einmal, sondern Blöcke zu je 10 Bildern (`tools/chatgpt-stapel-block-01.csv`, `-02.csv` …). Bei einem eigenen Limit lieber den Block verkleinern (5 Bilder) als abbrechen lassen.
- Ein Block mit 10 Bildern braucht bis zu 20 Bilddateien plus die CSV. Passt das nicht in einen Chat, den Block halbieren (die ersten 5 Zeilen der CSV in eine neue Datei kopieren, Kopfzeile behalten).
- **Das Ergebnis muss immer von einem Menschen angesehen werden:** KI verfälscht gern Schrift. Etikett Wort für Wort mit dem Etikett aus `Fertige Etiquetten/` vergleichen, Flasche vollständig im Bild, nur Rezeptzutaten (Prüflisten stehen in `PROMPTS-FOTOS-WEITERE.md` und `PROMPTS-FOTOS-ERSATZ.md`).
- Auch die eigene Etikettenprüfung von ChatGPT (Schritt d) ist nur eine Hilfe, keine Garantie.

## In 6 Schritten

1. **Block wählen.** Beginne mit `tools/chatgpt-stapel-block-01.csv` (die wichtigsten Bilder zuerst, nämlich je Sorte die Karte `-2`). Alle offenen Bilder zusammen stehen in `tools/chatgpt-stapel.csv`, alle inklusive schon vorhandener in `tools/chatgpt-stapel-alle.csv`.
2. **Neuen Chat öffnen** (ChatGPT mit Bildgenerierung, ein neuer Chat pro Block).
3. **Dateien hochladen:** die Block-CSV und die Bilder, die darin in den Spalten `anhang1` und `anhang2` stehen. Welche das sind, listet der Abschnitt „Dateien je Block“ unten. Die Bilder sind kleine Etiketten und Flaschenfotos aus dem Repo (`Fertige Etiquetten/`, `Fotos/`, `fotos/`); der Pfad in der CSV sagt, wo sie liegen.
4. **Hauptprompt einfügen** (Kasten unten) und absenden. ChatGPT erzeugt nun Bild für Bild und hält nach 5 Bildern an.
5. **Prüfen und speichern:** jedes Bild ansehen (siehe „Ehrlich vorab“), dann als PNG genau unter dem Namen aus `dateiname_ergebnis` im Ordner `fotos-ki/` im Repo speichern. Bei Ersatzbildern (`gruppe = ersatz`, Name endet auf `-1.png`) wird die vorhandene Datei überschrieben, bei Bedarf vorher eine Kopie ziehen.
6. **Weitermachen:** auf die Rückfrage nach 5 Bildern „ja“ antworten, nach dem Block den nächsten Block in einem neuen Chat. Zum Schluss `node tools/foto_prompts_weitere.mjs && node tools/chatgpt_stapel.mjs` laufen lassen: der Status (offen/vorhanden) und die CSV-Dateien aktualisieren sich aus den Dateien in `fotos-ki/`; `node build.mjs` baut die Bilder an die richtige Karte.

## Hauptprompt (einmal pro Chat einfügen)

```
Du arbeitest einen Stapel von Bildaufträgen ab. Angehängt sind (1) eine CSV-Datei (Trennzeichen Semikolon, UTF-8, erste Zeile ist der Kopf: nr;dateiname_ergebnis;anhang1;anhang2;prompt;gruppe;status) und (2) die Bilddateien, die in den Spalten anhang1 und anhang2 genannt sind. Von den Pfaden zählt nur der Dateiname hinter dem letzten Schrägstrich.

Gehe die Zeilen der CSV der Reihe nach durch, immer nur eine Zeile auf einmal. Für jede Zeile gilt:
(a) Verwende die zwei Bilder anhang1 und anhang2 als Vorlagen. anhang1 liefert nur Flaschenform und Verschluss; das Etikett auf diesem Foto nicht übernehmen. anhang2 ist das flache Etikett, das unverändert (kein Buchstabe anders, nichts neu geschrieben) um die halbe Flasche gelegt wird.
(b) Führe den Text aus der Spalte prompt wortgetreu als Bildauftrag aus. Nichts hinzuerfinden: keine zusätzlichen Zutaten, Kräuter, Früchte oder Texte.
(c) Liefere das Ergebnis als PNG im Querformat 4:3 (zum Beispiel 1448 x 1086 Pixel) und nenne es genau so, wie es in der Spalte dateiname_ergebnis steht (nur der Dateiname, zum Beispiel gin-2.png).
(d) Prüfe danach Etikett und Adresszeile im Ergebnis gegen anhang2 (Sortenname, Alkoholgehalt, Grafik, Adresszeile "2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu"), außerdem, ob Hals und Verschluss der Flasche vollständig im Bild sind. Bei einer Abweichung bessere genau einmal nach (neues Bild mit dem Hinweis, das Etikett exakt aus anhang2 zu übernehmen). Weicht es danach immer noch ab, liefere das beste Bild und schreibe dazu "Etikett weicht ab" mit der Stelle. Versuche es nicht ein drittes Mal.
(e) Nutze pro Bild nur einen neuen Schritt im Gespräch und übernimm nichts aus den vorherigen Bildern (keine Garnituren, keine Flaschenform, keinen Stil von der vorigen Zeile), damit der Stil nicht kippt. Jede Zeile steht für sich.
(f) Halte nach jeweils 5 fertigen Bildern an, nenne kurz, welche Dateien fertig sind (Dateiname und "Etikett OK" oder "Etikett weicht ab"), und frage, ob du fortfahren sollst. Mache erst nach meiner Antwort weiter.

Zeilen, bei denen status nicht "offen" ist, überspringst du. Wenn eine Bilddatei fehlt oder du an ein Limit stößt, höre auf und sage genau, bei welcher nr du stehst. Am Ende gibst du eine Tabelle mit nr, dateiname_ergebnis und dem Ergebnis (OK, nachgebessert, Etikett weicht ab, nicht erzeugt) aus.
```

## Dateien

| Datei | Inhalt |
|---|---|
| `tools/chatgpt-stapel.csv` | alle 109 offenen Bilder |
| `tools/chatgpt-stapel-alle.csv` | alle 119 Bilder mit Status |
| `tools/chatgpt-stapel.json` | dieselben Daten wie die CSV, alle 119 mit Status |
| `tools/chatgpt-stapel-block-NN.csv` | die offenen Bilder in Blöcken zu 10 |
| `tools/chatgpt_stapel_api.py` | optional: Stapel über die OpenAI-Bild-API (**ungetestet**, siehe unten) |

Spalten der CSV: `nr` (laufende Nummer), `dateiname_ergebnis` (Zielname in `fotos-ki/`), `anhang1` (Flaschenvorlage), `anhang2` (flaches Etikett), `prompt` (ein Absatz ohne Zeilenumbrüche), `gruppe` (`weitere` oder `ersatz`), `status` (`offen`, `vorhanden` oder `ersetzt, bitte prüfen`). Semikolon als Trennzeichen, alle Felder in Anführungszeichen. Beim Öffnen in Excel „Daten, aus Text/CSV“ mit UTF-8 wählen, sonst stimmen die Umlaute nicht.

## Blöcke

| Block | Datei | nr | Bilder | Dateien zum Hochladen |
|---|---|---|---|---|
| 01 | `tools/chatgpt-stapel-block-01.csv` | 2–11 | 10 | 16 |
| 02 | `tools/chatgpt-stapel-block-02.csv` | 12–21 | 10 | 18 |
| 03 | `tools/chatgpt-stapel-block-03.csv` | 22–34 | 10 | 16 |
| 04 | `tools/chatgpt-stapel-block-04.csv` | 35–44 | 10 | 20 |
| 05 | `tools/chatgpt-stapel-block-05.csv` | 45–55 | 10 | 17 |
| 06 | `tools/chatgpt-stapel-block-06.csv` | 56–67 | 10 | 16 |
| 07 | `tools/chatgpt-stapel-block-07.csv` | 68–77 | 10 | 18 |
| 08 | `tools/chatgpt-stapel-block-08.csv` | 78–89 | 10 | 18 |
| 09 | `tools/chatgpt-stapel-block-09.csv` | 90–99 | 10 | 16 |
| 10 | `tools/chatgpt-stapel-block-10.csv` | 100–109 | 10 | 20 |
| 11 | `tools/chatgpt-stapel-block-11.csv` | 110–119 | 9 | 16 |

### Dateien je Block

**Block 01** (16 Dateien): `fotos/flaschen-wodka.webp`, `Fertige Etiquetten/Branntwein Wodka-01.png`, `Fertige Etiquetten/Branntwein Hierber Rum nei-01.png`, `Fertige Etiquetten/Branntwein Hierber Rum orange nei-01.png`, `Fertige Etiquetten/Branntwein Whisky 0,5L nei 4-01.png`, `Fotos/flasche-kirsch.jpg`, `Fertige Etiquetten/Brandwein Kirsch-01.png`, `Fotos/flasche-framboise.jpg`, `Fertige Etiquetten/Brandwein Framboise-01.png`, `Fotos/flasche-quetsch.jpg`, `Fertige Etiquetten/Brandwein Quetsch-01.png`, `Fotos/flasche-poire-williams.jpg`, `Fertige Etiquetten/Brandwein Williams-01.png`, `Fotos/flasche-mirabelle.jpg`, `Fertige Etiquetten/Brandwein Mirabelle-01.png`, `Fertige Etiquetten/Branntwein Hierber Fruucht-01.png`

**Block 02** (18 Dateien): `fotos/flaschenreihe-theke.jpg`, `Fertige Etiquetten/Branntwein Vieux marc-01.png`, `Fotos/flasche-vieille-prune.jpg`, `Fertige Etiquetten/Brandwein Vieille prune-01.png`, `Fotos/flasche-vieille-pomme.jpg`, `Fertige Etiquetten/Brandwein Vieille pomme-01.png`, `Fotos/flasche-hunnegdrepp.jpg`, `Fertige Etiquetten/Brandwein Hunnegdrepp-01.png`, `fotos/flaschen-wodka.webp`, `Fertige Etiquetten/Branntwein Whisky 0,5L Hunneg-01.png`, `Fotos/flasche-kraeiderdrepp.jpg`, `Fertige Etiquetten/Brandwein Kraider-01.png`, `Fotos/flasche-kirsch.jpg`, `Fertige Etiquetten/Brandwein Kürbisdrepp-01.png`, `Fertige Etiquetten/Branntwein Grain-01.png`, `Fertige Etiquetten/Brandwein Hondsaarsch-01.png`, `Fotos/flasche-kiwibeeren.jpg`, `Fertige Etiquetten/Branntwein Kiwi-01.png`

**Block 03** (16 Dateien): `Fotos/flasche-poire.jpg`, `Fertige Etiquetten/Brandwein Poire-01.png`, `Fotos/flasche-neelchesbiren.jpg`, `Fertige Etiquetten/Brandwein Nelchensbiren-01.png`, `Fotos/flasche-kirsch.jpg`, `Fertige Etiquetten/Brandwein Vogelbeere-01.png`, `Fotos/flasche-schleiwen.jpg`, `Fertige Etiquetten/Branntwein Schleiwen-01.png`, `Fotos/flasche-vizdrepp.jpg`, `Fertige Etiquetten/Vizdrepp 0,5l_Zeichenfläche 1.png`, `fotos/flaschen-wodka.webp`, `Fertige Etiquetten/Branntwein Sambuca_Zeichenfläche 1.png`, `Fertige Etiquetten/Branntwein Wodka-01.png`, `Fertige Etiquetten/Branntwein Hierber Rum nei-01.png`, `Fertige Etiquetten/Branntwein Hierber Rum orange nei-01.png`, `Fertige Etiquetten/Branntwein Whisky 0,5L nei 4-01.png`

**Block 04** (20 Dateien): `Fotos/flasche-kirsch.jpg`, `Fertige Etiquetten/Brandwein Kirsch-01.png`, `Fotos/flasche-framboise.jpg`, `Fertige Etiquetten/Brandwein Framboise-01.png`, `Fotos/flasche-quetsch.jpg`, `Fertige Etiquetten/Brandwein Quetsch-01.png`, `Fotos/flasche-poire-williams.jpg`, `Fertige Etiquetten/Brandwein Williams-01.png`, `Fotos/flasche-mirabelle.jpg`, `Fertige Etiquetten/Brandwein Mirabelle-01.png`, `fotos/flaschen-wodka.webp`, `Fertige Etiquetten/Branntwein Hierber Fruucht-01.png`, `fotos/flaschenreihe-theke.jpg`, `Fertige Etiquetten/Branntwein Vieux marc-01.png`, `Fotos/flasche-vieille-prune.jpg`, `Fertige Etiquetten/Brandwein Vieille prune-01.png`, `Fotos/flasche-vieille-pomme.jpg`, `Fertige Etiquetten/Brandwein Vieille pomme-01.png`, `Fotos/flasche-hunnegdrepp.jpg`, `Fertige Etiquetten/Brandwein Hunnegdrepp-01.png`

**Block 05** (17 Dateien): `fotos/flaschen-wodka.webp`, `Fertige Etiquetten/Branntwein Whisky 0,5L Hunneg-01.png`, `Fotos/flasche-kraeiderdrepp.jpg`, `Fertige Etiquetten/Brandwein Kraider-01.png`, `Fotos/flasche-kirsch.jpg`, `Fertige Etiquetten/Brandwein Kürbisdrepp-01.png`, `Fertige Etiquetten/Branntwein Grain-01.png`, `Fertige Etiquetten/Brandwein Hondsaarsch-01.png`, `Fotos/flasche-kiwibeeren.jpg`, `Fertige Etiquetten/Branntwein Kiwi-01.png`, `Fotos/flasche-poire.jpg`, `Fertige Etiquetten/Brandwein Poire-01.png`, `Fotos/flasche-neelchesbiren.jpg`, `Fertige Etiquetten/Brandwein Nelchensbiren-01.png`, `Fertige Etiquetten/Brandwein Vogelbeere-01.png`, `Fotos/flasche-schleiwen.jpg`, `Fertige Etiquetten/Branntwein Schleiwen-01.png`

**Block 06** (16 Dateien): `Fotos/flasche-vizdrepp.jpg`, `Fertige Etiquetten/Vizdrepp 0,5l_Zeichenfläche 1.png`, `fotos/flaschen-wodka.webp`, `Fertige Etiquetten/Branntwein Sambuca_Zeichenfläche 1.png`, `Fertige Etiquetten/Branntwein Wodka-01.png`, `Fertige Etiquetten/Branntwein Hierber Rum nei-01.png`, `Fertige Etiquetten/Branntwein Hierber Rum orange nei-01.png`, `Fertige Etiquetten/Branntwein Whisky 0,5L nei 4-01.png`, `Fotos/flasche-kirsch.jpg`, `Fertige Etiquetten/Brandwein Kirsch-01.png`, `Fotos/flasche-framboise.jpg`, `Fertige Etiquetten/Brandwein Framboise-01.png`, `Fotos/flasche-quetsch.jpg`, `Fertige Etiquetten/Brandwein Quetsch-01.png`, `Fotos/flasche-poire-williams.jpg`, `Fertige Etiquetten/Brandwein Williams-01.png`

**Block 07** (18 Dateien): `Fotos/flasche-mirabelle.jpg`, `Fertige Etiquetten/Brandwein Mirabelle-01.png`, `fotos/flaschen-wodka.webp`, `Fertige Etiquetten/Branntwein Hierber Fruucht-01.png`, `fotos/flaschenreihe-theke.jpg`, `Fertige Etiquetten/Branntwein Vieux marc-01.png`, `Fotos/flasche-vieille-prune.jpg`, `Fertige Etiquetten/Brandwein Vieille prune-01.png`, `Fotos/flasche-vieille-pomme.jpg`, `Fertige Etiquetten/Brandwein Vieille pomme-01.png`, `Fotos/flasche-hunnegdrepp.jpg`, `Fertige Etiquetten/Brandwein Hunnegdrepp-01.png`, `Fertige Etiquetten/Branntwein Whisky 0,5L Hunneg-01.png`, `Fotos/flasche-kraeiderdrepp.jpg`, `Fertige Etiquetten/Brandwein Kraider-01.png`, `Fotos/flasche-kirsch.jpg`, `Fertige Etiquetten/Brandwein Kürbisdrepp-01.png`, `Fertige Etiquetten/Brandwein Hondsaarsch-01.png`

**Block 08** (18 Dateien): `Fotos/flasche-kiwibeeren.jpg`, `Fertige Etiquetten/Branntwein Kiwi-01.png`, `Fotos/flasche-poire.jpg`, `Fertige Etiquetten/Brandwein Poire-01.png`, `Fotos/flasche-neelchesbiren.jpg`, `Fertige Etiquetten/Brandwein Nelchensbiren-01.png`, `Fotos/flasche-kirsch.jpg`, `Fertige Etiquetten/Brandwein Vogelbeere-01.png`, `Fotos/flasche-schleiwen.jpg`, `Fertige Etiquetten/Branntwein Schleiwen-01.png`, `Fotos/flasche-vizdrepp.jpg`, `Fertige Etiquetten/Vizdrepp 0,5l_Zeichenfläche 1.png`, `fotos/flaschen-wodka.webp`, `Fertige Etiquetten/Branntwein Sambuca_Zeichenfläche 1.png`, `Fertige Etiquetten/Branntwein Whisky 0,5L nei 4-01.png`, `Fertige Etiquetten/Brandwein Kirsch-01.png`, `Fotos/flasche-quetsch.jpg`, `Fertige Etiquetten/Brandwein Quetsch-01.png`

**Block 09** (16 Dateien): `Fotos/flasche-mirabelle.jpg`, `Fertige Etiquetten/Brandwein Mirabelle-01.png`, `Fotos/flasche-hunnegdrepp.jpg`, `Fertige Etiquetten/Brandwein Hunnegdrepp-01.png`, `Fotos/flasche-vizdrepp.jpg`, `Fertige Etiquetten/Vizdrepp 0,5l_Zeichenfläche 1.png`, `fotos/flaschen-wodka.webp`, `Fertige Etiquetten/Branntwein Hierber Gin - Nei 1-01.png`, `Fertige Etiquetten/Branntwein Wodka-01.png`, `Fertige Etiquetten/Branntwein Hierber Rum nei-01.png`, `Fertige Etiquetten/Branntwein Hierber Rum orange nei-01.png`, `Fertige Etiquetten/Branntwein Whisky 0,5L nei 4-01.png`, `Fotos/flasche-kirsch.jpg`, `Fertige Etiquetten/Brandwein Kirsch-01.png`, `Fotos/flasche-framboise.jpg`, `Fertige Etiquetten/Brandwein Framboise-01.png`

**Block 10** (20 Dateien): `Fotos/flasche-quetsch.jpg`, `Fertige Etiquetten/Brandwein Quetsch-01.png`, `Fotos/flasche-poire-williams.jpg`, `Fertige Etiquetten/Brandwein Williams-01.png`, `Fotos/flasche-mirabelle.jpg`, `Fertige Etiquetten/Brandwein Mirabelle-01.png`, `fotos/flaschenreihe-theke.jpg`, `Fertige Etiquetten/Branntwein Vieux marc-01.png`, `Fotos/flasche-vieille-prune.jpg`, `Fertige Etiquetten/Brandwein Vieille prune-01.png`, `Fotos/flasche-vieille-pomme.jpg`, `Fertige Etiquetten/Brandwein Vieille pomme-01.png`, `Fotos/flasche-hunnegdrepp.jpg`, `Fertige Etiquetten/Brandwein Hunnegdrepp-01.png`, `fotos/flaschen-wodka.webp`, `Fertige Etiquetten/Branntwein Whisky 0,5L Hunneg-01.png`, `Fotos/flasche-kraeiderdrepp.jpg`, `Fertige Etiquetten/Brandwein Kraider-01.png`, `Fotos/flasche-kirsch.jpg`, `Fertige Etiquetten/Brandwein Kürbisdrepp-01.png`

**Block 11** (16 Dateien): `Fotos/flasche-kirsch.jpg`, `Fertige Etiquetten/Brandwein Hondsaarsch-01.png`, `Fotos/flasche-kiwibeeren.jpg`, `Fertige Etiquetten/Branntwein Kiwi-01.png`, `Fotos/flasche-poire.jpg`, `Fertige Etiquetten/Brandwein Poire-01.png`, `Fotos/flasche-neelchesbiren.jpg`, `Fertige Etiquetten/Brandwein Nelchensbiren-01.png`, `Fertige Etiquetten/Brandwein Vogelbeere-01.png`, `Fotos/flasche-schleiwen.jpg`, `Fertige Etiquetten/Branntwein Schleiwen-01.png`, `Fotos/flasche-vizdrepp.jpg`, `Fertige Etiquetten/Vizdrepp 0,5l_Zeichenfläche 1.png`, `fotos/flaschen-wodka.webp`, `Fertige Etiquetten/Branntwein Sambuca_Zeichenfläche 1.png`, `Fertige Etiquetten/Branntwein Limoncello-01.png`

## Optional: Automatik über die OpenAI-Bild-API (ungetestet)

`tools/chatgpt_stapel_api.py` liest dieselbe CSV und erzeugt die Bilder ohne Chat über die Bildbearbeitung der OpenAI-API mit mehreren Eingabebildern. **Das Skript ist ungetestet:** Es konnte hier weder gegen die API laufen (kein Zugang, kein Schlüssel) noch gegen die aktuelle Dokumentation geprüft werden. Modellname, Endpunkt, Bildgröße und Qualität stehen als Konstanten am Anfang und müssen gegen die aktuelle OpenAI-Dokumentation geprüft werden. Die API kostet Geld und ist von einem ChatGPT-Abo getrennt abgerechnet.

- Schlüssel in der Umgebung setzen (nicht ins Repo schreiben): `export OPENAI_API_KEY=...`
- Erst trocken: `python3 tools/chatgpt_stapel_api.py --trocken` (listet, was getan würde, prüft die Anhänge, ruft nichts auf)
- Test mit einem Bild: `python3 tools/chatgpt_stapel_api.py --max 1`
- Ganzer Stapel: `python3 tools/chatgpt_stapel_api.py` (Pause zwischen den Aufrufen, Wiederaufnahme: vorhandene Ergebnisdateien in `fotos-ki/` werden übersprungen)
- Ersatzbilder überschreiben vorhandene Dateien nur mit `--ueberschreiben` (die alte Datei wandert vorher nach `fotos-ki/_vorher/`).
- Die API liefert feste Bildgrößen; ob 4:3 dabei ist, ist zu prüfen. Das Skript speichert, was die API liefert; ein Zuschnitt auf 4:3 ist nur mit `--zuschnitt-4zu3` und installiertem Pillow möglich und schneidet bei 3:2-Bildern die Ränder ab (Flasche am Rand prüfen).
- Die Etikettenprüfung (Schritt d) macht das Skript nicht; jedes Bild muss von Hand geprüft werden.
