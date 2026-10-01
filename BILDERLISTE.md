# Bilderliste: was noch fehlt

Erzeugt mit `node tools/foto_prompts_weitere.mjs`. Nicht von Hand ändern; den Status (Spalte rechts) trägt man in einer Kopie ein oder hakt auf Papier ab.

## Kurzanleitung

- **92 weitere Bilder** fehlen, **29** sind schon da (je Sorte `-1`, siehe unten).
- Ablauf je Bild: Prompt aus `PROMPTS-FOTOS-WEITERE.md` kopieren, die beiden Anhänge aus der Tabelle anhängen (neuer Chat, ChatGPT Bildgenerierung), Ergebnis prüfen, als PNG 4:3 (1448×1086 px) unter dem **Dateinamen aus der Tabelle** in `fotos-ki/` speichern.
- **Reihenfolge nach Wichtigkeit:** je Sorte zuerst die Datei mit `-2` (alle 29 Sorten), danach alle `-3`, dann `-4`, `-5`. Stückzahl je Nummer: `-2`: 29, `-3`: 29, `-4`: 28, `-5`: 6. In der Tabelle nach der Endung des Dateinamens suchen.
- Optional vorher die 27 fehlerhaften Erstbilder ersetzen: `PROMPTS-FOTOS-ERSATZ.md`.
- Bilder, die nicht per KI gehen (Maische, Abfüllen, Karte, Rum-Orange-Etikett): letzter Abschnitt.

**Benennungsregel:** `fotos-ki/<sorten-id>-<n>.png`. `-1` ist das vorhandene Hauptbild der Sorte. Die weiteren Karten der Sortenseite werden in Kartenreihenfolge ab 2 nummeriert, ohne die Karte des Hauptbilds.
Beispiel Wodka: Karten 1 bis 4, `wodka-1.png` zeigt Karte 2 (Wodka-Tonic). Karte 1 (Wodka eiskalt) wird `wodka-2.png`, Karte 3 (Moscow Mule) `wodka-3.png`, Karte 4 (Wodka zu Räucherlachs) `wodka-4.png`.

## Tabelle der 92 fehlenden Bilder

Anhang 1 = Flaschenvorlage, Anhang 2 = Etikett (Dateien liegen im Repo, Pfade ab Repo-Wurzel). Status leer = offen.

| Nr | Sorte | Karte auf der Sortenseite (Titel) | Typ | Dateiname | Anhang 1 | Anhang 2 | Status |
|---|---|---|---|---|---|---|---|
| 1 | Hierber Gin | 2. Gin Fizz | Cocktail | `fotos-ki/gin-2.png` | `fotos/flaschen-wodka.webp` | `Fertige Etiquetten/Branntwein Hierber Gin - Nei 1-01.png` |  |
| 2 | Hierber Gin | 3. Dry Martini | Cocktail | `fotos-ki/gin-3.png` | `fotos/flaschen-wodka.webp` | `Fertige Etiquetten/Branntwein Hierber Gin - Nei 1-01.png` |  |
| 3 | Hierber Gin | 4. Zitronensorbet mit Gin | In der Küche / Dessert | `fotos-ki/gin-4.png` | `fotos/flaschen-wodka.webp` | `Fertige Etiquetten/Branntwein Hierber Gin - Nei 1-01.png` |  |
| 4 | Hierber Wodka | 1. Wodka eiskalt | Pur | `fotos-ki/wodka-2.png` | `fotos/flaschen-wodka.webp` | `Fertige Etiquetten/Branntwein Wodka-01.png` |  |
| 5 | Hierber Wodka | 3. Moscow Mule | Cocktail | `fotos-ki/wodka-3.png` | `fotos/flaschen-wodka.webp` | `Fertige Etiquetten/Branntwein Wodka-01.png` |  |
| 6 | Hierber Wodka | 4. Wodka zu Räucherlachs und Schwarzbrot | Zum Essen | `fotos-ki/wodka-4.png` | `fotos/flaschen-wodka.webp` | `Fertige Etiquetten/Branntwein Wodka-01.png` |  |
| 7 | Hierber Rum | 1. Rum pur, bei Zimmertemperatur | Pur | `fotos-ki/rum-2.png` | `fotos/flaschen-rum-02-05.webp` | entfällt |  |
| 8 | Hierber Rum | 3. Daiquiri | Cocktail | `fotos-ki/rum-3.png` | `fotos/flaschen-rum-02-05.webp` | entfällt |  |
| 9 | Hierber Rum | 4. Gebratene Bananen mit Rum | In der Küche / Dessert | `fotos-ki/rum-4.png` | `fotos/flaschen-rum-02-05.webp` | entfällt |  |
| 10 | Hierber Rum Orange | 1. Rum Orange auf einem großen Eiswürfel | Auf Eis / Longdrink | `fotos-ki/rum-orange-2.png` | `fotos/flaschen-rum-02-05.webp` | entfällt |  |
| 11 | Hierber Rum Orange | 3. Rum Orange-Sour | Cocktail | `fotos-ki/rum-orange-3.png` | `fotos/flaschen-rum-02-05.webp` | entfällt |  |
| 12 | Hierber Rum Orange | 4. Orangenfilets mit Rum Orange | In der Küche / Dessert | `fotos-ki/rum-orange-4.png` | `fotos/flaschen-rum-02-05.webp` | entfällt |  |
| 13 | Hierber Whisky | 1. Whisky pur, mit einem Spritzer Wasser | Pur | `fotos-ki/whisky-2.png` | `fotos/flaschen-wodka.webp` | `Fertige Etiquetten/Branntwein Whisky 0,5L nei 4-01.png` |  |
| 14 | Hierber Whisky | 2. Whisky-Highball | Auf Eis / Longdrink | `fotos-ki/whisky-3.png` | `fotos/flaschen-wodka.webp` | `Fertige Etiquetten/Branntwein Whisky 0,5L nei 4-01.png` |  |
| 15 | Hierber Whisky | 4. Whisky zu Comté | Zum Essen | `fotos-ki/whisky-4.png` | `fotos/flaschen-wodka.webp` | `Fertige Etiquetten/Branntwein Whisky 0,5L nei 4-01.png` |  |
| 16 | Hierber Whisky | 5. Pfeffersteak mit Whisky-Sauce | In der Küche / Dessert | `fotos-ki/whisky-5.png` | `fotos/flaschen-wodka.webp` | `Fertige Etiquetten/Branntwein Whisky 0,5L nei 4-01.png` |  |
| 17 | Kirsch | 1. Kirsch pur, gut gekühlt | Pur | `fotos-ki/kirsch-2.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Kirsch-01.png` |  |
| 18 | Kirsch | 2. Kirsch-Tonic mit Zitronenschale | Auf Eis / Longdrink | `fotos-ki/kirsch-3.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Kirsch-01.png` |  |
| 19 | Kirsch | 4. Geschmorte Kirschen mit Kirsch | In der Küche / Dessert | `fotos-ki/kirsch-4.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Kirsch-01.png` |  |
| 20 | Kirsch | 5. Kirsch zu dunkler Schokolade | Zum Essen | `fotos-ki/kirsch-5.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Kirsch-01.png` |  |
| 21 | Framboise | 1. Framboise pur, gut gekühlt | Pur | `fotos-ki/framboise-2.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Framboise-01.png` |  |
| 22 | Framboise | 2. Framboise-Tonic mit Minze | Auf Eis / Longdrink | `fotos-ki/framboise-3.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Framboise-01.png` |  |
| 23 | Framboise | 4. Panna cotta mit Himbeeren und Framboise | In der Küche / Dessert | `fotos-ki/framboise-4.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Framboise-01.png` |  |
| 24 | Quetsch | 1. Quetsch pur, gut gekühlt | Pur | `fotos-ki/quetsch-2.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Quetsch-01.png` |  |
| 25 | Quetsch | 3. Quetsch-Tonic mit Zimtstange | Auf Eis / Longdrink | `fotos-ki/quetsch-3.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Quetsch-01.png` |  |
| 26 | Quetsch | 4. Flambierte Zwetschgen mit Quetsch | In der Küche / Dessert | `fotos-ki/quetsch-4.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Quetsch-01.png` |  |
| 27 | Quetsch | 5. Quetsch zu kräftigem Bergkäse | Zum Essen | `fotos-ki/quetsch-5.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Quetsch-01.png` |  |
| 28 | Poire Williams | 1. Poire Williams pur, gut gekühlt | Pur | `fotos-ki/poire-williams-2.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Williams-01.png` |  |
| 29 | Poire Williams | 3. Pochierte Birnen mit Poire Williams | In der Küche / Dessert | `fotos-ki/poire-williams-3.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Williams-01.png` |  |
| 30 | Poire Williams | 4. Poire Williams zu mildem Blauschimmelkäse | Zum Essen | `fotos-ki/poire-williams-4.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Williams-01.png` |  |
| 31 | Mirabelle | 1. Mirabelle pur, gut gekühlt | Pur | `fotos-ki/mirabelle-2.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Mirabelle-01.png` |  |
| 32 | Mirabelle | 3. Mirabelle-Spritz mit Crémant | Cocktail | `fotos-ki/mirabelle-3.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Mirabelle-01.png` |  |
| 33 | Mirabelle | 4. Geschmorte Mirabellen mit Mirabelle | In der Küche / Dessert | `fotos-ki/mirabelle-4.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Mirabelle-01.png` |  |
| 34 | Mirabelle | 5. Mirabelle zu mildem Weichkäse | Zum Essen | `fotos-ki/mirabelle-5.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Mirabelle-01.png` |  |
| 35 | Hierber aale Fruucht | 1. Hierber aale Fruucht pur, bei Zimmertemperatur | Pur | `fotos-ki/hierber-fruucht-2.png` | `fotos/flaschen-wodka.webp` | `Fertige Etiquetten/Branntwein Hierber Fruucht-01.png` |  |
| 36 | Hierber aale Fruucht | 3. Hierber aale Fruucht über Vanilleeis | In der Küche / Dessert | `fotos-ki/hierber-fruucht-3.png` | `fotos/flaschen-wodka.webp` | `Fertige Etiquetten/Branntwein Hierber Fruucht-01.png` |  |
| 37 | Hierber aale Fruucht | 4. Hierber aale Fruucht zu kräftigem, reifem Käse | Zum Essen | `fotos-ki/hierber-fruucht-4.png` | `fotos/flaschen-wodka.webp` | `Fertige Etiquetten/Branntwein Hierber Fruucht-01.png` |  |
| 38 | Vieux Marc | 1. Vieux Marc pur, bei Zimmertemperatur | Pur | `fotos-ki/vieux-marc-2.png` | `fotos/flaschenreihe-theke.jpg` | `Fertige Etiquetten/Branntwein Vieux marc-01.png` |  |
| 39 | Vieux Marc | 3. Vieux Marc zu kräftigem Käse | Zum Essen | `fotos-ki/vieux-marc-3.png` | `fotos/flaschenreihe-theke.jpg` | `Fertige Etiquetten/Branntwein Vieux marc-01.png` |  |
| 40 | Vieux Marc | 4. Vieux Marc zu dunkler Schokolade | Zum Essen | `fotos-ki/vieux-marc-4.png` | `fotos/flaschenreihe-theke.jpg` | `Fertige Etiquetten/Branntwein Vieux marc-01.png` |  |
| 41 | Vieille Prune | 1. Vieille Prune pur, bei Zimmertemperatur | Pur | `fotos-ki/vieille-prune-2.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Vieille prune-01.png` |  |
| 42 | Vieille Prune | 3. Vieille Prune über Vanilleeis | In der Küche / Dessert | `fotos-ki/vieille-prune-3.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Vieille prune-01.png` |  |
| 43 | Vieille Prune | 4. Vieille Prune zu kräftigem Bergkäse | Zum Essen | `fotos-ki/vieille-prune-4.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Vieille prune-01.png` |  |
| 44 | Vieille Pomme | 1. Vieille Pomme pur, bei Zimmertemperatur | Pur | `fotos-ki/vieille-pomme-2.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Vieille pomme-01.png` |  |
| 45 | Vieille Pomme | 3. Apfeltarte mit Vieille Pomme | In der Küche / Dessert | `fotos-ki/vieille-pomme-3.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Vieille pomme-01.png` |  |
| 46 | Vieille Pomme | 4. Vieille Pomme zu gereiftem Comté | Zum Essen | `fotos-ki/vieille-pomme-4.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Vieille pomme-01.png` |  |
| 47 | Hunnegdrëpp | 1. Heißer Hunnegdrëpp mit Tee und Zitrone | Auf Eis / Longdrink | `fotos-ki/hunnegdrepp-2.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Hunnegdrepp-01.png` |  |
| 48 | Hunnegdrëpp | 2. Hunnegdrëpp pur, gut gekühlt | Pur | `fotos-ki/hunnegdrepp-3.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Hunnegdrepp-01.png` |  |
| 49 | Hunnegdrëpp | 4. Joghurt mit Honig und Hunnegdrëpp | In der Küche / Dessert | `fotos-ki/hunnegdrepp-4.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Hunnegdrepp-01.png` |  |
| 50 | Hunnegdrëpp | 5. Hunnegdrëpp zu Ziegenkäse | Zum Essen | `fotos-ki/hunnegdrepp-5.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Hunnegdrepp-01.png` |  |
| 51 | Hierber Hunneg Whisky | 1. Hunneg Whisky auf einem großen Eiswürfel | Auf Eis / Longdrink | `fotos-ki/hunneg-whisky-2.png` | `fotos/flaschen-wodka.webp` | `Fertige Etiquetten/Branntwein Whisky 0,5L Hunneg-01.png` |  |
| 52 | Hierber Hunneg Whisky | 2. Heißer Hunneg Whisky mit Zitrone und Zimt | Auf Eis / Longdrink | `fotos-ki/hunneg-whisky-3.png` | `fotos/flaschen-wodka.webp` | `Fertige Etiquetten/Branntwein Whisky 0,5L Hunneg-01.png` |  |
| 53 | Hierber Hunneg Whisky | 4. Hunneg Whisky zu Comté | Zum Essen | `fotos-ki/hunneg-whisky-4.png` | `fotos/flaschen-wodka.webp` | `Fertige Etiquetten/Branntwein Whisky 0,5L Hunneg-01.png` |  |
| 54 | Kräiderdrëpp | 1. Kräiderdrëpp pur, gut gekühlt | Pur | `fotos-ki/kraeiderdrepp-2.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Kraider-01.png` |  |
| 55 | Kräiderdrëpp | 3. Kräiderdrëpp mit Ginger Beer | Auf Eis / Longdrink | `fotos-ki/kraeiderdrepp-3.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Kraider-01.png` |  |
| 56 | Kräiderdrëpp | 4. Kräiderdrëpp nach einem deftigen Essen | Zum Essen | `fotos-ki/kraeiderdrepp-4.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Kraider-01.png` |  |
| 57 | Kürbisdrëpp | 1. Kürbisdrëpp pur, gut gekühlt | Pur | `fotos-ki/kuerbisdrepp-2.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Kürbisdrepp-01.png` |  |
| 58 | Kürbisdrëpp | 2. Kürbisdrëpp mit Ginger Beer | Auf Eis / Longdrink | `fotos-ki/kuerbisdrepp-3.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Kürbisdrepp-01.png` |  |
| 59 | Kürbisdrëpp | 4. Kürbisdrëpp zu kräftigem Hartkäse | Zum Essen | `fotos-ki/kuerbisdrepp-4.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Kürbisdrepp-01.png` |  |
| 60 | Grain | 1. Grain eiskalt | Pur | `fotos-ki/grain-2.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Branntwein Grain-01.png` |  |
| 61 | Grain | 3. Grain zu Brotzeit mit Schinken | Zum Essen | `fotos-ki/grain-3.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Branntwein Grain-01.png` |  |
| 62 | Hondsaarsch | 1. Hondsaarsch pur, gut gekühlt | Pur | `fotos-ki/hondsaarsch-2.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Hondsaarsch-01.png` |  |
| 63 | Hondsaarsch | 3. Hondsaarsch über Vanilleeis | In der Küche / Dessert | `fotos-ki/hondsaarsch-3.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Hondsaarsch-01.png` |  |
| 64 | Hondsaarsch | 4. Hondsaarsch zu kräftigem Käse | Zum Essen | `fotos-ki/hondsaarsch-4.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Hondsaarsch-01.png` |  |
| 65 | Kiwibeeren | 1. Kiwibeeren pur, gut gekühlt | Pur | `fotos-ki/kiwibeeren-2.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Branntwein Kiwi-01.png` |  |
| 66 | Kiwibeeren | 2. Kiwibeeren-Tonic mit Limettenscheibe | Auf Eis / Longdrink | `fotos-ki/kiwibeeren-3.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Branntwein Kiwi-01.png` |  |
| 67 | Kiwibeeren | 4. Joghurt mit Honig und Kiwibeeren | In der Küche / Dessert | `fotos-ki/kiwibeeren-4.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Branntwein Kiwi-01.png` |  |
| 68 | Poire | 1. Poire pur, gut gekühlt | Pur | `fotos-ki/poire-2.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Poire-01.png` |  |
| 69 | Poire | 3. Poire über Vanilleeis | In der Küche / Dessert | `fotos-ki/poire-3.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Poire-01.png` |  |
| 70 | Poire | 4. Poire zu mildem Blauschimmelkäse | Zum Essen | `fotos-ki/poire-4.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Poire-01.png` |  |
| 71 | Neelchesbiren | 1. Neelchesbiren pur, gut gekühlt | Pur | `fotos-ki/neelchesbiren-2.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Nelchensbiren-01.png` |  |
| 72 | Neelchesbiren | 3. Neelchesbiren über Vanilleeis | In der Küche / Dessert | `fotos-ki/neelchesbiren-3.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Nelchensbiren-01.png` |  |
| 73 | Neelchesbiren | 4. Neelchesbiren zu mildem Käse | Zum Essen | `fotos-ki/neelchesbiren-4.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Nelchensbiren-01.png` |  |
| 74 | Lënschouren | 1. Lënschouren pur, gut gekühlt | Pur | `fotos-ki/lenschouren-2.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Lenschouren-01.png` |  |
| 75 | Lënschouren | 2. Lënschouren-Tonic mit Zitronenschale | Auf Eis / Longdrink | `fotos-ki/lenschouren-3.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Lenschouren-01.png` |  |
| 76 | Lënschouren | 4. Lënschouren zu mildem Käse | Zum Essen | `fotos-ki/lenschouren-4.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Lenschouren-01.png` |  |
| 77 | Vullekiischt | 1. Vullekiischt pur, gut gekühlt | Pur | `fotos-ki/vullekiischt-2.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Vogelbeere-01.png` |  |
| 78 | Vullekiischt | 3. Vullekiischt zu Wildpastete | Zum Essen | `fotos-ki/vullekiischt-3.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Vogelbeere-01.png` |  |
| 79 | Vullekiischt | 4. Vullekiischt über Vanilleeis | In der Küche / Dessert | `fotos-ki/vullekiischt-4.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Brandwein Vogelbeere-01.png` |  |
| 80 | Schléiwen | 1. Schléiwen pur, gut gekühlt | Pur | `fotos-ki/schleiwen-2.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Branntwein Schleiwen-01.png` |  |
| 81 | Schléiwen | 3. Wildsauce mit Schléiwen | In der Küche / Dessert | `fotos-ki/schleiwen-3.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Branntwein Schleiwen-01.png` |  |
| 82 | Schléiwen | 4. Schléiwen zu kräftigem Bergkäse | Zum Essen | `fotos-ki/schleiwen-4.png` | `fotos/flasche-hunnegdrepp.png` | `Fertige Etiquetten/Branntwein Schleiwen-01.png` |  |
| 83 | Vizdrëpp | 1. Vizdrëpp pur, bei Zimmertemperatur | Pur | `fotos-ki/vizdrepp-2.png` | `Fotos/_DSC3054.jpg` | `Fertige Etiquetten/Vizdrepp 0,5l_Zeichenfläche 1.png` |  |
| 84 | Vizdrëpp | 3. Apfelsorbet mit Vizdrëpp | In der Küche / Dessert | `fotos-ki/vizdrepp-3.png` | `Fotos/_DSC3054.jpg` | `Fertige Etiquetten/Vizdrepp 0,5l_Zeichenfläche 1.png` |  |
| 85 | Vizdrëpp | 4. Flambierte Äpfel mit Vizdrëpp | In der Küche / Dessert | `fotos-ki/vizdrepp-4.png` | `Fotos/_DSC3054.jpg` | `Fertige Etiquetten/Vizdrepp 0,5l_Zeichenfläche 1.png` |  |
| 86 | Vizdrëpp | 5. Vizdrëpp zu Weichkäse | Zum Essen | `fotos-ki/vizdrepp-5.png` | `Fotos/_DSC3054.jpg` | `Fertige Etiquetten/Vizdrepp 0,5l_Zeichenfläche 1.png` |  |
| 87 | Hierber Sambuca | 2. Sambuca auf einem großen Eiswürfel | Auf Eis / Longdrink | `fotos-ki/sambuca-2.png` | `fotos/flaschen-sambuca.webp` | entfällt |  |
| 88 | Hierber Sambuca | 3. Espresso mit Sambuca | Zum Essen | `fotos-ki/sambuca-3.png` | `fotos/flaschen-sambuca.webp` | entfällt |  |
| 89 | Hierber Sambuca | 4. Sambuca über Vanilleeis | In der Küche / Dessert | `fotos-ki/sambuca-4.png` | `fotos/flaschen-sambuca.webp` | entfällt |  |
| 90 | Hierber Limoncello | 1. Limoncello eiskalt | Pur | `fotos-ki/limoncello-2.png` | `fotos/flaschen-limoncello.webp` | entfällt |  |
| 91 | Hierber Limoncello | 3. Limoncello-Tonic mit Minze | Auf Eis / Longdrink | `fotos-ki/limoncello-3.png` | `fotos/flaschen-limoncello.webp` | entfällt |  |
| 92 | Hierber Limoncello | 4. Zitronensorbet mit Limoncello | In der Küche / Dessert | `fotos-ki/limoncello-4.png` | `fotos/flaschen-limoncello.webp` | entfällt |  |

## Bereits vorhanden (29)

Fehler laut `TODO-INHALTE.md` Abschnitt 6; bei „ja“ gibt es einen Ersatz-Prompt in `PROMPTS-FOTOS-ERSATZ.md`.

| Sorte | Dateiname | Vorschlag (Karte) | Bild hat Fehler laut TODO-INHALTE.md Abschnitt 6? |
|---|---|---|---|
| Hierber Gin | `fotos-ki/gin-1.png` | 1. Gin-Tonic mit Apfel und Rosmarin | ja: Adresszeile verfälscht („L. Hallinger L-6831 Herborn, Tél. 72 7602“), Etikettenmuster weicht ab. |
| Hierber Wodka | `fotos-ki/wodka-1.png` | 2. Wodka-Tonic mit Gurkenscheiben | ja: Etikett am unteren Rand angeschnitten („www.hierber-brennere…“), Adresse verfälscht („Z. Millewee L-6665 hoıxn“). |
| Hierber Rum | `fotos-ki/rum-1.png` | 2. Rum und Ginger mit Limette | ja: Etikett nur aus Foto abgeleitet: „1-6665“ statt „L-6665“, braunes Halsband fehlt, Etikett heller als im Foto. |
| Hierber Rum Orange | `fotos-ki/rum-orange-1.png` | 2. Rum Orange-Highball | ja: Erfundenes Etikett (Orange/Creme mit Orangenscheibe), Orangenblätter und -hälften auf dem Tisch stehen nicht im Rezept. |
| Hierber Whisky | `fotos-ki/whisky-1.png` | 3. Old Fashioned | ja: Adresse links abgeschnitten („Millewee“ ohne „2,“), Fass im Hintergrund. |
| Kirsch | `fotos-ki/kirsch-1.png` | 3. Kirsch-Sour | ja: Flaschenhals/Kappe am oberen Bildrand abgeschnitten. |
| Framboise | `fotos-ki/framboise-1.png` | 3. Framboise-Spritz mit Crémant | ja: Minze im Glas, nicht im Rezept; Flaschenhals/Kappe am oberen Bildrand abgeschnitten. |
| Quetsch | `fotos-ki/quetsch-1.png` | 2. Quetsch-Sour | ja: Flaschenhals/Kappe am oberen Bildrand abgeschnitten. |
| Poire Williams | `fotos-ki/poire-williams-1.png` | 2. Poire Williams Fizz | ja: Flaschenhals/Kappe am oberen Bildrand abgeschnitten. |
| Mirabelle | `fotos-ki/mirabelle-1.png` | 2. Mirabelle-Tonic mit Thymian | ja: Mirabellenspalten im Glas, nicht im Rezept; Flaschenhals/Kappe abgeschnitten. |
| Hierber aale Fruucht | `fotos-ki/hierber-fruucht-1.png` | 2. Hierber aale Fruucht auf einem großen Eiswürfel | nein |
| Vieux Marc | `fotos-ki/vieux-marc-1.png` | 2. Espresso mit Vieux Marc | ja: Karaffe aus durchsichtigem Bernsteinglas statt sehr dunklem Glas; zusätzliches Glas Vieux Marc. |
| Vieille Prune | `fotos-ki/vieille-prune-1.png` | 2. Vieille Prune auf einem großen Eiswürfel | ja: Getränk blasser als die gemessene Füllung; Flaschenhals/Kappe abgeschnitten. |
| Vieille Pomme | `fotos-ki/vieille-pomme-1.png` | 2. Vieille Pomme mit Ginger Beer | ja: Flaschenhals/Kappe am oberen Bildrand abgeschnitten. |
| Hunnegdrëpp | `fotos-ki/hunnegdrepp-1.png` | 3. Hunnegdrëpp-Sour | ja: Flaschenhals/Kappe am oberen Bildrand abgeschnitten. |
| Hierber Hunneg Whisky | `fotos-ki/hunneg-whisky-1.png` | 3. Hunneg Whisky-Highball | ja: Kräuterzweige im Hintergrund und Orangenstücke auf dem Tisch stehen nicht im Rezept. |
| Kräiderdrëpp | `fotos-ki/kraeiderdrepp-1.png` | 2. Kräiderdrëpp-Tonic mit Gurkenscheiben | ja: Minze und Rosmarin im Glas, nicht im Rezept. |
| Kürbisdrëpp | `fotos-ki/kuerbisdrepp-1.png` | 3. Kürbissuppe mit einem Schuss Kürbisdrëpp | ja: Gericht statt Getränk im Fokus; Thymian und Pfeffer auf der Suppe nicht im Rezept; Flaschenhals/Kappe am oberen Bildrand abgeschnitten. |
| Grain | `fotos-ki/grain-1.png` | 2. Grain mit Apfelsaft auf Eis | nein |
| Hondsaarsch | `fotos-ki/hondsaarsch-1.png` | 2. Hondsaarsch-Tonic mit Orangenschale | ja: Flaschenhals/Kappe am oberen Bildrand abgeschnitten. |
| Kiwibeeren | `fotos-ki/kiwibeeren-1.png` | 3. Kiwibeeren-Spritz mit Crémant | ja: Minze im Glas, nicht im Rezept; Flaschenhals/Kappe abgeschnitten; Alkoholangabe 43 % (Etikett). |
| Poire | `fotos-ki/poire-1.png` | 2. Poire mit Ginger Beer | ja: Ingwerwurzel auf dem Tisch, nicht im Rezept; Flaschenhals/Kappe abgeschnitten. |
| Neelchesbiren | `fotos-ki/neelchesbiren-1.png` | 2. Neelchesbiren-Tonic mit Zitronenschale | ja: Flasche und Getränk strohfarben statt klar (Foto zeigt klar); Thymianzweig im Glas nicht im Rezept. |
| Lënschouren | `fotos-ki/lenschouren-1.png` | 3. Lënschouren über Vanilleeis | ja: Gericht statt Getränk im Fokus; Minzblatt nicht im Rezept; Flaschenhals/Kappe am oberen Bildrand abgeschnitten. |
| Vullekiischt | `fotos-ki/vullekiischt-1.png` | 2. Vullekiischt-Tonic mit Zitronenschale | ja: Vogelbeeren im Glas, nicht im Rezept; Flaschenhals/Kappe abgeschnitten. |
| Schléiwen | `fotos-ki/schleiwen-1.png` | 2. Schléiwen-Sour | ja: Flaschenhals/Kappe am oberen Bildrand abgeschnitten. |
| Vizdrëpp | `fotos-ki/vizdrepp-1.png` | 2. Vizdrëpp-Tonic mit Apfelscheiben | ja: Flaschenform weicht ab (hohe schlanke Flasche mit Glasstopfen statt breiter, nach unten weitender Flasche); Rosmarin nicht im Rezept; Getränk blasser als die gemessene Füllung. |
| Hierber Sambuca | `fotos-ki/sambuca-1.png` | 1. Sambuca mit Kaffeebohnen | ja: Etikett nur aus Foto abgeleitet; echte Flasche hat Ausgießer mit zwei Metallröhrchen und Halsband, im Bild ein Korken. |
| Hierber Limoncello | `fotos-ki/limoncello-1.png` | 2. Limoncello-Spritz mit Crémant | ja: Adresse ohne „L-6665“; echte Flasche mit Ausgießer, im Bild ein Korken. |

## Braucht ein echtes Foto (nicht per KI)

Diese Platzhalter der Startseite sollen nicht per KI entstehen. Es gibt dazu keinen Prompt.

| Stelle | Was genau fotografiert bzw. geliefert werden muss |
|---|---|
| Startseite, Schritt „Maische“ | Foto der angesetzten Maische (vergorene Obstmaische im Gärbehälter oder Fass). Als Foto für „Wie wir brennen“, Schritt 2. |
| Startseite, Schritt „Abfüllen“ | Foto vom Abfüllen der Flaschen (Abfüllung von Brand in Flaschen am Hof). Schritt 5 von „Wie wir brennen“. |
| Startseite, „Kartenansicht“ | Kartenbild der Lage (2, Millewee, L-6665 Herborn) als statisches Bild; bisher nur Link zu OpenStreetMap. Nutzungsrechte der Karte klären. |
| Rum-Orange-Etikett | Das echte Etikett (Druckdatei) bzw. ein Foto der Flasche Hierber Rum Orange. Der Platzhalter erscheint auf der Startseite (Karte), auf der Sortenseite Rum Orange und in der Rum-Karte. |
