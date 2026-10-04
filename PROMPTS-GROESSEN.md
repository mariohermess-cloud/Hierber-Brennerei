# PROMPTS-GROESSEN: neue Produktflasche in anderen Größen mit aktuellem Etikett (ChatGPT)

Erzeugt mit `node tools/foto_prompts_groessen.mjs`. Nicht von Hand ändern. 42 Prompts, je (Sorte, Größe) einer, für alle Größen der Preisliste außer 0,5 L (die stehen in `PROMPTS-FLASCHEN.md`): 0,1 L: 13, 0,2 L: 7, 0,7 L: 7, 1 L: 8, 1,5 L: 7. **ChatGPT erzeugt eine NEUE, saubere Produktflasche** (Hochformat 1024 × 1536 Pixel, heller neutraler Studiogrund) mit dem aktuellen Etikett; kein Foto wird bearbeitet. Anhang 1 = leere Basisflasche ohne Etikett aus `fotos-basis/` (nur Form und Proportionen), Anhang 2 = das flache 0,5-L-Etikett aus `Fertige Etiquetten/`. Auf dem Etikett wird nur die Mengenangabe geändert („0,5 l“ wird zur Größe der Flasche); das Etikett wird proportional zur Flasche skaliert und sitzt in der unteren Hälfte.

Die Ergebnisse gehören als PNG unter dem Namen aus der Tabelle (`<sorten-id>-<größe>.png`, Größe als `0-1l`, `0-2l`, `0-7l`, `1-0l`, `1-5l`) in den Ordner `fotos-flaschen/` im Repo (den legt der Nutzer an; das Skript legt ihn nicht an). Die Sortenseite tauscht beim Wählen einer Größe das Bild im Kopf gegen das Bild dieser Größe, wenn eines existiert (`site/lib/brand.mjs`, `site/assets/js/site.js`).

**Basisfotos:** Es gibt kein Foto für schlank 0,7 L und schlank 1 L. Dort dient die schlanke 0,5-L-Flasche als Ersatz (Hinweis „Basis weicht ab (Größe)“); die Zielgröße steht nur als ungefähres Verhältnis im Prompt („etwas höher und voller“, „deutlich größer“), keine Maße. Für rund 0,2 L ist `fotos-basis/rund-0-2l.png` hinterlegt, diese Datei ist aber identisch mit `fotos-basis/rund-0-5l.png` (zeigt also die 0,5-L-Flasche); die Maßstabszeile „deutlich kleiner als die 0,5-L-Flasche“ bleibt deshalb im Prompt. Das Ergebnis kann in den Proportionen abweichen. `fotos-basis/rund-40ml.png` (Miniatur) wird nicht verwendet.

**Verschluss:** schlank 0,1 L Holzkugel auf Korkschaft (wie das Basisfoto), schlank 0,7 L und 1 L Glasstopfen (wie bei 0,5 L), rund 1 L und 1,5 L heller Naturkorken (wie die Basisfotos), runde 0,2 L und Vieux Marc die Kappe bzw. der Ausgießer der Sorte (wie bei 0,5 L; die Basisfotos zeigen Korken bzw. Glasstopfen).

**Stand:** 25 offen, 17 vorhanden (Datei `<id>-<größe>.png` in `fotos-flaschen/`).

Automatisch abarbeiten: `CHATGPT-STAPEL.md` (Gruppe `groessen`, Ausgabe Hochformat).

## So geht es

1. Neuen Chat öffnen (ChatGPT mit Bildgenerierung), pro Eintrag ein neuer Chat.
2. Beide Anhänge hochladen (Pfade siehe Tabelle) und den Prompt aus dem Kasten einfügen.
3. Ergebnis mit der Prüfliste unter dem Kasten prüfen. Bei einer Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern.
4. Als PNG unter dem Namen aus der Spalte „Zieldatei“ in `fotos-flaschen/` speichern.

## Übersicht

| Sorte | Größe | Anhang 1 (nur Orientierung) | Anhang 2 (Etikett) | Zieldatei | Hinweis zur Basis |
|---|---|---|---|---|---|
| Hierber Gin | 0,2 L | `fotos-basis/rund-0-2l.png` | `Fertige Etiquetten/Branntwein Hierber Gin - Nei 1-01.png` | `fotos-flaschen/gin-0-2l.png` | Datei identisch mit fotos-basis/rund-0-5l.png (0,5-L-Flasche): Größe nur über den Maßstab im Prompt; Basisfoto zeigt einen Korken, die Sorte hat eine andere Kappe: Kappe nur über die Beschreibung |
| Hierber Gin | 1 L | `fotos-basis/rund-1-0l.png` | `Fertige Etiquetten/Branntwein Hierber Gin - Nei 1-01.png` | `fotos-flaschen/gin-1-0l.png` | – |
| Hierber Gin | 1,5 L | `fotos-basis/rund-1-5l.png` | `Fertige Etiquetten/Branntwein Hierber Gin - Nei 1-01.png` | `fotos-flaschen/gin-1-5l.png` | – |
| Hierber Wodka | 0,2 L | `fotos-basis/rund-0-2l.png` | `Fertige Etiquetten/Branntwein Wodka-01.png` | `fotos-flaschen/wodka-0-2l.png` | Datei identisch mit fotos-basis/rund-0-5l.png (0,5-L-Flasche): Größe nur über den Maßstab im Prompt; Basisfoto zeigt einen Korken, die Sorte hat eine andere Kappe: Kappe nur über die Beschreibung |
| Hierber Rum | 0,2 L | `fotos-basis/rund-0-2l.png` | `Fertige Etiquetten/Branntwein Hierber Rum nei-01.png` | `fotos-flaschen/rum-0-2l.png` | Datei identisch mit fotos-basis/rund-0-5l.png (0,5-L-Flasche): Größe nur über den Maßstab im Prompt; Basisfoto zeigt einen Korken, die Sorte hat eine andere Kappe: Kappe nur über die Beschreibung |
| Hierber Rum | 1 L | `fotos-basis/rund-1-0l.png` | `Fertige Etiquetten/Branntwein Hierber Rum nei-01.png` | `fotos-flaschen/rum-1-0l.png` | – |
| Hierber Rum | 1,5 L | `fotos-basis/rund-1-5l.png` | `Fertige Etiquetten/Branntwein Hierber Rum nei-01.png` | `fotos-flaschen/rum-1-5l.png` | – |
| Hierber Rum Orange | 0,2 L | `fotos-basis/rund-0-2l.png` | `Fertige Etiquetten/Branntwein Hierber Rum orange nei-01.png` | `fotos-flaschen/rum-orange-0-2l.png` | Datei identisch mit fotos-basis/rund-0-5l.png (0,5-L-Flasche): Größe nur über den Maßstab im Prompt; Basisfoto zeigt einen Korken, die Sorte hat eine andere Kappe: Kappe nur über die Beschreibung |
| Hierber Rum Orange | 1 L | `fotos-basis/rund-1-0l.png` | `Fertige Etiquetten/Branntwein Hierber Rum orange nei-01.png` | `fotos-flaschen/rum-orange-1-0l.png` | – |
| Hierber Rum Orange | 1,5 L | `fotos-basis/rund-1-5l.png` | `Fertige Etiquetten/Branntwein Hierber Rum orange nei-01.png` | `fotos-flaschen/rum-orange-1-5l.png` | – |
| Hierber Whisky | 0,2 L | `fotos-basis/rund-0-2l.png` | `Fertige Etiquetten/Branntwein Whisky 0,5L nei 4-01.png` | `fotos-flaschen/whisky-0-2l.png` | Datei identisch mit fotos-basis/rund-0-5l.png (0,5-L-Flasche): Größe nur über den Maßstab im Prompt; Basisfoto zeigt einen Korken, die Sorte hat eine andere Kappe: Kappe nur über die Beschreibung |
| Hierber Whisky | 1 L | `fotos-basis/rund-1-0l.png` | `Fertige Etiquetten/Branntwein Whisky 0,5L nei 4-01.png` | `fotos-flaschen/whisky-1-0l.png` | – |
| Hierber Whisky | 1,5 L | `fotos-basis/rund-1-5l.png` | `Fertige Etiquetten/Branntwein Whisky 0,5L nei 4-01.png` | `fotos-flaschen/whisky-1-5l.png` | – |
| Kirsch | 0,1 L | `fotos-basis/schlank-0-1l.png` | `Fertige Etiquetten/Brandwein Kirsch-01.png` | `fotos-flaschen/kirsch-0-1l.png` | – |
| Framboise | 0,1 L | `fotos-basis/schlank-0-1l.png` | `Fertige Etiquetten/Brandwein Framboise-01.png` | `fotos-flaschen/framboise-0-1l.png` | – |
| Framboise | 0,7 L | `fotos-basis/schlank-0-5l.png` | `Fertige Etiquetten/Brandwein Framboise-01.png` | `fotos-flaschen/framboise-0-7l.png` | Basis weicht ab (Größe): fotos-basis/schlank-0-5l.png ist nicht die 0,7 L-Flasche; Maßstab nur über die Beschreibung |
| Quetsch | 0,1 L | `fotos-basis/schlank-0-1l.png` | `Fertige Etiquetten/Brandwein Quetsch-01.png` | `fotos-flaschen/quetsch-0-1l.png` | – |
| Quetsch | 0,7 L | `fotos-basis/schlank-0-5l.png` | `Fertige Etiquetten/Brandwein Quetsch-01.png` | `fotos-flaschen/quetsch-0-7l.png` | Basis weicht ab (Größe): fotos-basis/schlank-0-5l.png ist nicht die 0,7 L-Flasche; Maßstab nur über die Beschreibung |
| Poire Williams | 0,1 L | `fotos-basis/schlank-0-1l.png` | `Fertige Etiquetten/Brandwein Williams-01.png` | `fotos-flaschen/poire-williams-0-1l.png` | – |
| Poire Williams | 0,7 L | `fotos-basis/schlank-0-5l.png` | `Fertige Etiquetten/Brandwein Williams-01.png` | `fotos-flaschen/poire-williams-0-7l.png` | Basis weicht ab (Größe): fotos-basis/schlank-0-5l.png ist nicht die 0,7 L-Flasche; Maßstab nur über die Beschreibung |
| Mirabelle | 0,1 L | `fotos-basis/schlank-0-1l.png` | `Fertige Etiquetten/Brandwein Mirabelle-01.png` | `fotos-flaschen/mirabelle-0-1l.png` | – |
| Mirabelle | 0,7 L | `fotos-basis/schlank-0-5l.png` | `Fertige Etiquetten/Brandwein Mirabelle-01.png` | `fotos-flaschen/mirabelle-0-7l.png` | Basis weicht ab (Größe): fotos-basis/schlank-0-5l.png ist nicht die 0,7 L-Flasche; Maßstab nur über die Beschreibung |
| Hierber aale Fruucht | 1 L | `fotos-basis/rund-1-0l.png` | `Fertige Etiquetten/Branntwein Hierber Fruucht-01.png` | `fotos-flaschen/hierber-fruucht-1-0l.png` | – |
| Hierber aale Fruucht | 1,5 L | `fotos-basis/rund-1-5l.png` | `Fertige Etiquetten/Branntwein Hierber Fruucht-01.png` | `fotos-flaschen/hierber-fruucht-1-5l.png` | – |
| Vieux Marc | 0,7 L | `fotos-basis/karaffe-0-7l.png` | `Fertige Etiquetten/Branntwein Vieux marc-01.png` | `fotos-flaschen/vieux-marc-0-7l.png` | Basisfoto zeigt klares Glas und Glasstopfen; Braunglas und Ausgießer nur über die Beschreibung |
| Vieille Prune | 0,1 L | `fotos-basis/schlank-0-1l.png` | `Fertige Etiquetten/Brandwein Vieille prune-01.png` | `fotos-flaschen/vieille-prune-0-1l.png` | – |
| Vieille Pomme | 0,1 L | `fotos-basis/schlank-0-1l.png` | `Fertige Etiquetten/Brandwein Vieille pomme-01.png` | `fotos-flaschen/vieille-pomme-0-1l.png` | – |
| Hunnegdrëpp | 0,1 L | `fotos-basis/schlank-0-1l.png` | `Fertige Etiquetten/Brandwein Hunnegdrepp-01.png` | `fotos-flaschen/hunnegdrepp-0-1l.png` | – |
| Kräiderdrëpp | 0,1 L | `fotos-basis/schlank-0-1l.png` | `Fertige Etiquetten/Brandwein Kraider-01.png` | `fotos-flaschen/kraeiderdrepp-0-1l.png` | – |
| Grain | 1 L | `fotos-basis/schlank-0-5l.png` | `Fertige Etiquetten/Branntwein Grain-01.png` | `fotos-flaschen/grain-1-0l.png` | Basis weicht ab (Größe): fotos-basis/schlank-0-5l.png ist nicht die 1 L-Flasche; Maßstab nur über die Beschreibung |
| Kiwibeeren | 0,1 L | `fotos-basis/schlank-0-1l.png` | `Fertige Etiquetten/Branntwein Kiwi-01.png` | `fotos-flaschen/kiwibeeren-0-1l.png` | – |
| Neelchesbiren | 0,1 L | `fotos-basis/schlank-0-1l.png` | `Fertige Etiquetten/Brandwein Nelchensbiren-01.png` | `fotos-flaschen/neelchesbiren-0-1l.png` | – |
| Neelchesbiren | 0,7 L | `fotos-basis/schlank-0-5l.png` | `Fertige Etiquetten/Brandwein Nelchensbiren-01.png` | `fotos-flaschen/neelchesbiren-0-7l.png` | Basis weicht ab (Größe): fotos-basis/schlank-0-5l.png ist nicht die 0,7 L-Flasche; Maßstab nur über die Beschreibung |
| Lënschouren | 0,1 L | `fotos-basis/schlank-0-1l.png` | `Fertige Etiquetten/Brandwein Lenschouren-01.png` | `fotos-flaschen/lenschouren-0-1l.png` | – |
| Lënschouren | 0,7 L | `fotos-basis/schlank-0-5l.png` | `Fertige Etiquetten/Brandwein Lenschouren-01.png` | `fotos-flaschen/lenschouren-0-7l.png` | Basis weicht ab (Größe): fotos-basis/schlank-0-5l.png ist nicht die 0,7 L-Flasche; Maßstab nur über die Beschreibung |
| Schléiwen | 0,1 L | `fotos-basis/schlank-0-1l.png` | `Fertige Etiquetten/Branntwein Schleiwen-01.png` | `fotos-flaschen/schleiwen-0-1l.png` | – |
| Hierber Sambuca | 0,2 L | `fotos-basis/rund-0-2l.png` | `Fertige Etiquetten/Branntwein Sambuca_Zeichenfläche 1.png` | `fotos-flaschen/sambuca-0-2l.png` | Datei identisch mit fotos-basis/rund-0-5l.png (0,5-L-Flasche): Größe nur über den Maßstab im Prompt; Basisfoto zeigt einen Korken, die Sorte hat eine andere Kappe: Kappe nur über die Beschreibung |
| Hierber Sambuca | 1 L | `fotos-basis/rund-1-0l.png` | `Fertige Etiquetten/Branntwein Sambuca_Zeichenfläche 1.png` | `fotos-flaschen/sambuca-1-0l.png` | – |
| Hierber Sambuca | 1,5 L | `fotos-basis/rund-1-5l.png` | `Fertige Etiquetten/Branntwein Sambuca_Zeichenfläche 1.png` | `fotos-flaschen/sambuca-1-5l.png` | – |
| Hierber Limoncello | 0,2 L | `fotos-basis/rund-0-2l.png` | `Fertige Etiquetten/Branntwein Limoncello-01.png` | `fotos-flaschen/limoncello-0-2l.png` | Datei identisch mit fotos-basis/rund-0-5l.png (0,5-L-Flasche): Größe nur über den Maßstab im Prompt; Basisfoto zeigt einen Korken, die Sorte hat eine andere Kappe: Kappe nur über die Beschreibung |
| Hierber Limoncello | 1 L | `fotos-basis/rund-1-0l.png` | `Fertige Etiquetten/Branntwein Limoncello-01.png` | `fotos-flaschen/limoncello-1-0l.png` | – |
| Hierber Limoncello | 1,5 L | `fotos-basis/rund-1-5l.png` | `Fertige Etiquetten/Branntwein Limoncello-01.png` | `fotos-flaschen/limoncello-1-5l.png` | – |

## Unsicherheiten (ehrlich)

- **Etikett Wort für Wort:** Dass ChatGPT Sortenname, Alkoholangabe, Grafik und die feste Adresszeile fehlerfrei übernimmt und dabei nur die Mengenangabe ändert, ist unsicher. Jedes Ergebnis von Hand gegen das flache Etikett prüfen.
- **Ersatzbasis (Größe):** schlank 0,7 L und schlank 1 L (Basis: schlanke 0,5-L-Flasche); rund 0,2 L hat eine eigene Basisdatei, die aber dasselbe Bild wie rund 0,5 L ist. ChatGPT muss die Größe aus dem Text ableiten; Proportionen und Etikettgröße sind nur Näherung.
- **Verschluss weicht vom Basisfoto ab:** runde 0,2 L tragen die Kappe der Sorte, nicht den Korken des Basisfotos; Vieux Marc trägt einen schwarzen Ausgießer, das Basisfoto zeigt einen Glasstopfen und klares Glas.
- **Korken bei 1 L und 1,5 L:** übernommen wie die Basisfotos; ob die echten 1-L- und 1,5-L-Flaschen der Brennerei so verschlossen sind, ist nicht bestätigt.
- **Einheitliche Position:** Standfläche bei etwa 90 % und Verschlussoberkante bei etwa 8 % hält ChatGPT erfahrungsgemäß nur ungefähr ein; bei kleinen und großen Flaschen im selben Rahmen ist die Größenwirkung dadurch begrenzt.

---

## 1. Hierber Gin, 0,2 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/rund-0-2l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Gin - Nei 1-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/gin-0-2l.png`
- **Status:** vorhanden
- **Prompt:** 245 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Größe: deutlich kleiner als die 0,5-L-Flasche in Anhang 1, etwa halbe Höhe, 0,2-L-Flasche derselben Form. Verschluss: flache, mattsilberne Metallkappe. Halsband: schmales Papierband um den Hals, hellblaues Band mit weißer Schreibschrift „Hierber Brennerei“, eigenes Band neben dem großen Etikett (Anhang 1 zeigt es nicht, bitte ergänzen). Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,2 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/gin-0-2l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „0,2 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „0,2 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Größenverhältnis plausibel: deutlich kleiner als die 0,5-L-Flasche in Anhang 1, etwa halbe Höhe, 0,2-L-Flasche derselben Form; Etikett mitskaliert, in der unteren Hälfte
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Halsband vorhanden und passend: hellblaues Band mit weißer Schreibschrift „Hierber Brennerei“ (unbestätigt, kein eigenes Foto)

---

## 2. Hierber Gin, 1 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/rund-1-0l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Gin - Nei 1-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/gin-1-0l.png`
- **Status:** vorhanden
- **Prompt:** 233 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Verschluss: heller Naturkorken wie in Anhang 1. Halsband: schmales Papierband um den Hals, hellblaues Band mit weißer Schreibschrift „Hierber Brennerei“, eigenes Band neben dem großen Etikett (Anhang 1 zeigt es nicht, bitte ergänzen). Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „1 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/gin-1-0l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „1 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „1 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Etikett proportional zur Flasche, in der unteren Hälfte
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Halsband vorhanden und passend: hellblaues Band mit weißer Schreibschrift „Hierber Brennerei“ (unbestätigt, kein eigenes Foto)

---

## 3. Hierber Gin, 1,5 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/rund-1-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Gin - Nei 1-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/gin-1-5l.png`
- **Status:** vorhanden
- **Prompt:** 233 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Verschluss: heller Naturkorken wie in Anhang 1. Halsband: schmales Papierband um den Hals, hellblaues Band mit weißer Schreibschrift „Hierber Brennerei“, eigenes Band neben dem großen Etikett (Anhang 1 zeigt es nicht, bitte ergänzen). Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „1,5 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/gin-1-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „1,5 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „1,5 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Etikett proportional zur Flasche, in der unteren Hälfte
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Halsband vorhanden und passend: hellblaues Band mit weißer Schreibschrift „Hierber Brennerei“ (unbestätigt, kein eigenes Foto)

---

## 4. Hierber Wodka, 0,2 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/rund-0-2l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Wodka-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/wodka-0-2l.png`
- **Status:** vorhanden
- **Prompt:** 245 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Größe: deutlich kleiner als die 0,5-L-Flasche in Anhang 1, etwa halbe Höhe, 0,2-L-Flasche derselben Form. Verschluss: flache, mattsilberne Metallkappe. Halsband: schmales Papierband um den Hals, hellblaues Band mit weißer Schreibschrift „Hierber Brennerei“, eigenes Band neben dem großen Etikett (Anhang 1 zeigt es nicht, bitte ergänzen). Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,2 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/wodka-0-2l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „0,2 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „0,2 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Größenverhältnis plausibel: deutlich kleiner als die 0,5-L-Flasche in Anhang 1, etwa halbe Höhe, 0,2-L-Flasche derselben Form; Etikett mitskaliert, in der unteren Hälfte
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Halsband vorhanden und passend: hellblaues Band mit weißer Schreibschrift „Hierber Brennerei“

---

## 5. Hierber Rum, 0,2 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/rund-0-2l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Rum nei-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/rum-0-2l.png`
- **Status:** vorhanden
- **Prompt:** 243 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Größe: deutlich kleiner als die 0,5-L-Flasche in Anhang 1, etwa halbe Höhe, 0,2-L-Flasche derselben Form. Verschluss: dunkelbraune Holzkappe. Halsband: schmales Papierband um den Hals, braungraues Band mit heller Schreibschrift „Hierber Brennerei“, eigenes Band neben dem großen Etikett (Anhang 1 zeigt es nicht, bitte ergänzen). Flüssigkeit: goldenes Bernstein, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,2 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/rum-0-2l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „0,2 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „0,2 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Größenverhältnis plausibel: deutlich kleiner als die 0,5-L-Flasche in Anhang 1, etwa halbe Höhe, 0,2-L-Flasche derselben Form; Etikett mitskaliert, in der unteren Hälfte
- Flüssigkeit: goldenes Bernstein, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Halsband vorhanden und passend: braungraues Band mit heller Schreibschrift „Hierber Brennerei“

---

## 6. Hierber Rum, 1 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/rund-1-0l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Rum nei-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/rum-1-0l.png`
- **Status:** vorhanden
- **Prompt:** 232 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Verschluss: heller Naturkorken wie in Anhang 1. Halsband: schmales Papierband um den Hals, braungraues Band mit heller Schreibschrift „Hierber Brennerei“, eigenes Band neben dem großen Etikett (Anhang 1 zeigt es nicht, bitte ergänzen). Flüssigkeit: goldenes Bernstein, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „1 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/rum-1-0l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „1 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „1 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Etikett proportional zur Flasche, in der unteren Hälfte
- Flüssigkeit: goldenes Bernstein, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Halsband vorhanden und passend: braungraues Band mit heller Schreibschrift „Hierber Brennerei“

---

## 7. Hierber Rum, 1,5 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/rund-1-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Rum nei-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/rum-1-5l.png`
- **Status:** vorhanden
- **Prompt:** 232 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Verschluss: heller Naturkorken wie in Anhang 1. Halsband: schmales Papierband um den Hals, braungraues Band mit heller Schreibschrift „Hierber Brennerei“, eigenes Band neben dem großen Etikett (Anhang 1 zeigt es nicht, bitte ergänzen). Flüssigkeit: goldenes Bernstein, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „1,5 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/rum-1-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „1,5 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „1,5 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Etikett proportional zur Flasche, in der unteren Hälfte
- Flüssigkeit: goldenes Bernstein, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Halsband vorhanden und passend: braungraues Band mit heller Schreibschrift „Hierber Brennerei“

---

## 8. Hierber Rum Orange, 0,2 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/rund-0-2l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Rum orange nei-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/rum-orange-0-2l.png`
- **Status:** vorhanden
- **Prompt:** 248 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Größe: deutlich kleiner als die 0,5-L-Flasche in Anhang 1, etwa halbe Höhe, 0,2-L-Flasche derselben Form. Verschluss: dunkelbraune Holzkappe. Halsband: schmales Papierband um den Hals, braungraues Band mit heller Schreibschrift „Hierber Brennerei“, eigenes Band neben dem großen Etikett (Anhang 1 zeigt es nicht, bitte ergänzen). Flüssigkeit: Bernstein, etwas orangener als im Foto (Orange-Bernstein), bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,2 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/rum-orange-0-2l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „0,2 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „0,2 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Größenverhältnis plausibel: deutlich kleiner als die 0,5-L-Flasche in Anhang 1, etwa halbe Höhe, 0,2-L-Flasche derselben Form; Etikett mitskaliert, in der unteren Hälfte
- Flüssigkeit: Bernstein, etwas orangener als im Foto (Orange-Bernstein), bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Halsband vorhanden und passend: braungraues Band mit heller Schreibschrift „Hierber Brennerei“ (unbestätigt, kein eigenes Foto)

---

## 9. Hierber Rum Orange, 1 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/rund-1-0l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Rum orange nei-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/rum-orange-1-0l.png`
- **Status:** vorhanden
- **Prompt:** 237 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Verschluss: heller Naturkorken wie in Anhang 1. Halsband: schmales Papierband um den Hals, braungraues Band mit heller Schreibschrift „Hierber Brennerei“, eigenes Band neben dem großen Etikett (Anhang 1 zeigt es nicht, bitte ergänzen). Flüssigkeit: Bernstein, etwas orangener als im Foto (Orange-Bernstein), bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „1 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/rum-orange-1-0l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „1 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „1 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Etikett proportional zur Flasche, in der unteren Hälfte
- Flüssigkeit: Bernstein, etwas orangener als im Foto (Orange-Bernstein), bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Halsband vorhanden und passend: braungraues Band mit heller Schreibschrift „Hierber Brennerei“ (unbestätigt, kein eigenes Foto)

---

## 10. Hierber Rum Orange, 1,5 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/rund-1-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Rum orange nei-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/rum-orange-1-5l.png`
- **Status:** vorhanden
- **Prompt:** 237 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Verschluss: heller Naturkorken wie in Anhang 1. Halsband: schmales Papierband um den Hals, braungraues Band mit heller Schreibschrift „Hierber Brennerei“, eigenes Band neben dem großen Etikett (Anhang 1 zeigt es nicht, bitte ergänzen). Flüssigkeit: Bernstein, etwas orangener als im Foto (Orange-Bernstein), bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „1,5 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/rum-orange-1-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „1,5 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „1,5 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Etikett proportional zur Flasche, in der unteren Hälfte
- Flüssigkeit: Bernstein, etwas orangener als im Foto (Orange-Bernstein), bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Halsband vorhanden und passend: braungraues Band mit heller Schreibschrift „Hierber Brennerei“ (unbestätigt, kein eigenes Foto)

---

## 11. Hierber Whisky, 0,2 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/rund-0-2l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Whisky 0,5L nei 4-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/whisky-0-2l.png`
- **Status:** vorhanden
- **Prompt:** 244 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Größe: deutlich kleiner als die 0,5-L-Flasche in Anhang 1, etwa halbe Höhe, 0,2-L-Flasche derselben Form. Verschluss: schwarze Schraubkappe statt Holzkappe. Halsband: schmales Papierband um den Hals, braungraues Band mit heller Schreibschrift „Hierber Brennerei“, eigenes Band neben dem großen Etikett (Anhang 1 zeigt es nicht, bitte ergänzen). Flüssigkeit: goldgelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,2 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/whisky-0-2l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „0,2 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „0,2 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Größenverhältnis plausibel: deutlich kleiner als die 0,5-L-Flasche in Anhang 1, etwa halbe Höhe, 0,2-L-Flasche derselben Form; Etikett mitskaliert, in der unteren Hälfte
- Flüssigkeit: goldgelb, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Halsband vorhanden und passend: braungraues Band mit heller Schreibschrift „Hierber Brennerei“ (unbestätigt, kein eigenes Foto)

---

## 12. Hierber Whisky, 1 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/rund-1-0l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Whisky 0,5L nei 4-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/whisky-1-0l.png`
- **Status:** vorhanden
- **Prompt:** 231 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Verschluss: heller Naturkorken wie in Anhang 1. Halsband: schmales Papierband um den Hals, braungraues Band mit heller Schreibschrift „Hierber Brennerei“, eigenes Band neben dem großen Etikett (Anhang 1 zeigt es nicht, bitte ergänzen). Flüssigkeit: goldgelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „1 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/whisky-1-0l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „1 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „1 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Etikett proportional zur Flasche, in der unteren Hälfte
- Flüssigkeit: goldgelb, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Halsband vorhanden und passend: braungraues Band mit heller Schreibschrift „Hierber Brennerei“ (unbestätigt, kein eigenes Foto)

---

## 13. Hierber Whisky, 1,5 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/rund-1-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Whisky 0,5L nei 4-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/whisky-1-5l.png`
- **Status:** vorhanden
- **Prompt:** 231 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Verschluss: heller Naturkorken wie in Anhang 1. Halsband: schmales Papierband um den Hals, braungraues Band mit heller Schreibschrift „Hierber Brennerei“, eigenes Band neben dem großen Etikett (Anhang 1 zeigt es nicht, bitte ergänzen). Flüssigkeit: goldgelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „1,5 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/whisky-1-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „1,5 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „1,5 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Etikett proportional zur Flasche, in der unteren Hälfte
- Flüssigkeit: goldgelb, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Halsband vorhanden und passend: braungraues Band mit heller Schreibschrift „Hierber Brennerei“ (unbestätigt, kein eigenes Foto)

---

## 14. Kirsch, 0,1 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-1l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Kirsch-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/kirsch-0-1l.png`
- **Status:** vorhanden
- **Prompt:** 224 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Verschluss: Holzkugel auf Korkschaft wie in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,1 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/kirsch-0-1l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „0,1 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „0,1 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Etikett proportional zur Flasche, in der unteren Hälfte
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)

---

## 15. Framboise, 0,1 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-1l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Framboise-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/framboise-0-1l.png`
- **Status:** vorhanden
- **Prompt:** 224 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Verschluss: Holzkugel auf Korkschaft wie in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,1 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/framboise-0-1l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „0,1 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „0,1 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Etikett proportional zur Flasche, in der unteren Hälfte
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)

---

## 16. Framboise, 0,7 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-5l.png` (Ersatz, Basis weicht ab (Größe))
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Framboise-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/framboise-0-7l.png`
- **Status:** offen
- **Prompt:** 233 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Größe: etwas höher und voller als in Anhang 1, 0,7-L-Flasche derselben schlanken Form. Verschluss: Glasstopfen mit Kork. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,7 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/framboise-0-7l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „0,7 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „0,7 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Größenverhältnis plausibel: etwas höher und voller als in Anhang 1, 0,7-L-Flasche derselben schlanken Form; Etikett mitskaliert, in der unteren Hälfte
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)
- Basis weicht ab (Größe): fotos-basis/schlank-0-5l.png zeigt die schlanke 0,5-L-Flasche, die Zielgröße ist nur über den Maßstab im Prompt beschrieben

---

## 17. Quetsch, 0,1 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-1l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Quetsch-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/quetsch-0-1l.png`
- **Status:** vorhanden
- **Prompt:** 224 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Verschluss: Holzkugel auf Korkschaft wie in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,1 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/quetsch-0-1l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „0,1 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „0,1 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Etikett proportional zur Flasche, in der unteren Hälfte
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)

---

## 18. Quetsch, 0,7 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-5l.png` (Ersatz, Basis weicht ab (Größe))
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Quetsch-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/quetsch-0-7l.png`
- **Status:** offen
- **Prompt:** 233 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Größe: etwas höher und voller als in Anhang 1, 0,7-L-Flasche derselben schlanken Form. Verschluss: Glasstopfen mit Kork. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,7 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/quetsch-0-7l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „0,7 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „0,7 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Größenverhältnis plausibel: etwas höher und voller als in Anhang 1, 0,7-L-Flasche derselben schlanken Form; Etikett mitskaliert, in der unteren Hälfte
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)
- Basis weicht ab (Größe): fotos-basis/schlank-0-5l.png zeigt die schlanke 0,5-L-Flasche, die Zielgröße ist nur über den Maßstab im Prompt beschrieben

---

## 19. Poire Williams, 0,1 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-1l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Williams-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/poire-williams-0-1l.png`
- **Status:** vorhanden
- **Prompt:** 224 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Verschluss: Holzkugel auf Korkschaft wie in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,1 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/poire-williams-0-1l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „0,1 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „0,1 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Etikett proportional zur Flasche, in der unteren Hälfte
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)

---

## 20. Poire Williams, 0,7 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-5l.png` (Ersatz, Basis weicht ab (Größe))
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Williams-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/poire-williams-0-7l.png`
- **Status:** offen
- **Prompt:** 233 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Größe: etwas höher und voller als in Anhang 1, 0,7-L-Flasche derselben schlanken Form. Verschluss: Glasstopfen mit Kork. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,7 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/poire-williams-0-7l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „0,7 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „0,7 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Größenverhältnis plausibel: etwas höher und voller als in Anhang 1, 0,7-L-Flasche derselben schlanken Form; Etikett mitskaliert, in der unteren Hälfte
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)
- Basis weicht ab (Größe): fotos-basis/schlank-0-5l.png zeigt die schlanke 0,5-L-Flasche, die Zielgröße ist nur über den Maßstab im Prompt beschrieben

---

## 21. Mirabelle, 0,1 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-1l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Mirabelle-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/mirabelle-0-1l.png`
- **Status:** offen
- **Prompt:** 224 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Verschluss: Holzkugel auf Korkschaft wie in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,1 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/mirabelle-0-1l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „0,1 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „0,1 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Etikett proportional zur Flasche, in der unteren Hälfte
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)

---

## 22. Mirabelle, 0,7 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-5l.png` (Ersatz, Basis weicht ab (Größe))
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Mirabelle-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/mirabelle-0-7l.png`
- **Status:** offen
- **Prompt:** 233 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Größe: etwas höher und voller als in Anhang 1, 0,7-L-Flasche derselben schlanken Form. Verschluss: Glasstopfen mit Kork. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,7 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/mirabelle-0-7l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „0,7 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „0,7 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Größenverhältnis plausibel: etwas höher und voller als in Anhang 1, 0,7-L-Flasche derselben schlanken Form; Etikett mitskaliert, in der unteren Hälfte
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)
- Basis weicht ab (Größe): fotos-basis/schlank-0-5l.png zeigt die schlanke 0,5-L-Flasche, die Zielgröße ist nur über den Maßstab im Prompt beschrieben

---

## 23. Hierber aale Fruucht, 1 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/rund-1-0l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Fruucht-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/hierber-fruucht-1-0l.png`
- **Status:** offen
- **Prompt:** 236 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Verschluss: heller Naturkorken wie in Anhang 1. Halsband: schmales Papierband um den Hals, graubraunes Band mit kleinem Brennblasen-Logo und heller Schreibschrift „Hierber Brennerei“, eigenes Band neben dem großen Etikett (Anhang 1 zeigt es nicht, bitte ergänzen). Flüssigkeit: warmes, kräftiges Orange-Bernstein, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „1 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/hierber-fruucht-1-0l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „1 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „1 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Etikett proportional zur Flasche, in der unteren Hälfte
- Flüssigkeit: warmes, kräftiges Orange-Bernstein, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Halsband vorhanden und passend: graubraunes Band mit kleinem Brennblasen-Logo und heller Schreibschrift „Hierber Brennerei“

---

## 24. Hierber aale Fruucht, 1,5 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/rund-1-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Fruucht-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/hierber-fruucht-1-5l.png`
- **Status:** offen
- **Prompt:** 236 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Verschluss: heller Naturkorken wie in Anhang 1. Halsband: schmales Papierband um den Hals, graubraunes Band mit kleinem Brennblasen-Logo und heller Schreibschrift „Hierber Brennerei“, eigenes Band neben dem großen Etikett (Anhang 1 zeigt es nicht, bitte ergänzen). Flüssigkeit: warmes, kräftiges Orange-Bernstein, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „1,5 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/hierber-fruucht-1-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „1,5 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „1,5 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Etikett proportional zur Flasche, in der unteren Hälfte
- Flüssigkeit: warmes, kräftiges Orange-Bernstein, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Halsband vorhanden und passend: graubraunes Band mit kleinem Brennblasen-Logo und heller Schreibschrift „Hierber Brennerei“

---

## 25. Vieux Marc, 0,7 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/karaffe-0-7l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Vieux marc-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/vieux-marc-0-7l.png`
- **Status:** offen
- **Prompt:** 223 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere Karaffe ohne Etikett (Glas im Foto klar, Glasfarbe und Verschluss wie weiter unten beschrieben), nur Form und Proportionen); nur Orientierung, nicht kopieren. Verschluss: schwarzer Ausgießer. Kein Halsband: der Hals bleibt ohne Papierband. Glas: dunkles, fast schwarzes Braunglas, der Brand ist nicht zu sehen. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,7 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/vieux-marc-0-7l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „0,7 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „0,7 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Etikett proportional zur Flasche, in der unteren Hälfte
- Glas: dunkles, fast schwarzes Braunglas, der Brand ist nicht zu sehen
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)

---

## 26. Vieille Prune, 0,1 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-1l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Vieille prune-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/vieille-prune-0-1l.png`
- **Status:** offen
- **Prompt:** 223 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Verschluss: Holzkugel auf Korkschaft wie in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klares Goldgelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,1 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/vieille-prune-0-1l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „0,1 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „0,1 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Etikett proportional zur Flasche, in der unteren Hälfte
- Flüssigkeit: klares Goldgelb, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)

---

## 27. Vieille Pomme, 0,1 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-1l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Vieille pomme-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/vieille-pomme-0-1l.png`
- **Status:** offen
- **Prompt:** 223 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Verschluss: Holzkugel auf Korkschaft wie in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klares Goldgelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,1 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/vieille-pomme-0-1l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „0,1 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „0,1 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Etikett proportional zur Flasche, in der unteren Hälfte
- Flüssigkeit: klares Goldgelb, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)

---

## 28. Hunnegdrëpp, 0,1 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-1l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Hunnegdrepp-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/hunnegdrepp-0-1l.png`
- **Status:** offen
- **Prompt:** 223 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Verschluss: Holzkugel auf Korkschaft wie in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: tiefes Honiggold, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,1 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/hunnegdrepp-0-1l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „0,1 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „0,1 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Etikett proportional zur Flasche, in der unteren Hälfte
- Flüssigkeit: tiefes Honiggold, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)

---

## 29. Kräiderdrëpp, 0,1 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-1l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Kraider-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/kraeiderdrepp-0-1l.png`
- **Status:** offen
- **Prompt:** 224 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Verschluss: Holzkugel auf Korkschaft wie in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,1 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/kraeiderdrepp-0-1l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „0,1 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „0,1 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Etikett proportional zur Flasche, in der unteren Hälfte
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)

---

## 30. Grain, 1 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-5l.png` (Ersatz, Basis weicht ab (Größe))
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Grain-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/grain-1-0l.png`
- **Status:** offen
- **Prompt:** 231 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Größe: deutlich größer als in Anhang 1, 1-L-Flasche derselben schlanken Form. Verschluss: Glasstopfen mit Kork. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „1 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/grain-1-0l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „1 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „1 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Größenverhältnis plausibel: deutlich größer als in Anhang 1, 1-L-Flasche derselben schlanken Form; Etikett mitskaliert, in der unteren Hälfte
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)
- Basis weicht ab (Größe): fotos-basis/schlank-0-5l.png zeigt die schlanke 0,5-L-Flasche, die Zielgröße ist nur über den Maßstab im Prompt beschrieben

---

## 31. Kiwibeeren, 0,1 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-1l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Kiwi-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/kiwibeeren-0-1l.png`
- **Status:** offen
- **Prompt:** 224 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Verschluss: Holzkugel auf Korkschaft wie in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,1 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/kiwibeeren-0-1l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „0,1 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „0,1 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Etikett proportional zur Flasche, in der unteren Hälfte
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)

---

## 32. Neelchesbiren, 0,1 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-1l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Nelchensbiren-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/neelchesbiren-0-1l.png`
- **Status:** offen
- **Prompt:** 224 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Verschluss: Holzkugel auf Korkschaft wie in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,1 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/neelchesbiren-0-1l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „0,1 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „0,1 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Etikett proportional zur Flasche, in der unteren Hälfte
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)

---

## 33. Neelchesbiren, 0,7 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-5l.png` (Ersatz, Basis weicht ab (Größe))
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Nelchensbiren-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/neelchesbiren-0-7l.png`
- **Status:** offen
- **Prompt:** 233 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Größe: etwas höher und voller als in Anhang 1, 0,7-L-Flasche derselben schlanken Form. Verschluss: Glasstopfen mit Kork. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,7 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/neelchesbiren-0-7l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „0,7 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „0,7 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Größenverhältnis plausibel: etwas höher und voller als in Anhang 1, 0,7-L-Flasche derselben schlanken Form; Etikett mitskaliert, in der unteren Hälfte
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)
- Basis weicht ab (Größe): fotos-basis/schlank-0-5l.png zeigt die schlanke 0,5-L-Flasche, die Zielgröße ist nur über den Maßstab im Prompt beschrieben

---

## 34. Lënschouren, 0,1 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-1l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Lenschouren-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/lenschouren-0-1l.png`
- **Status:** offen
- **Prompt:** 224 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Verschluss: Holzkugel auf Korkschaft wie in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,1 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/lenschouren-0-1l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „0,1 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „0,1 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Etikett proportional zur Flasche, in der unteren Hälfte
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)

---

## 35. Lënschouren, 0,7 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-5l.png` (Ersatz, Basis weicht ab (Größe))
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Lenschouren-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/lenschouren-0-7l.png`
- **Status:** offen
- **Prompt:** 233 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Größe: etwas höher und voller als in Anhang 1, 0,7-L-Flasche derselben schlanken Form. Verschluss: Glasstopfen mit Kork. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,7 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/lenschouren-0-7l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „0,7 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „0,7 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Größenverhältnis plausibel: etwas höher und voller als in Anhang 1, 0,7-L-Flasche derselben schlanken Form; Etikett mitskaliert, in der unteren Hälfte
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)
- Basis weicht ab (Größe): fotos-basis/schlank-0-5l.png zeigt die schlanke 0,5-L-Flasche, die Zielgröße ist nur über den Maßstab im Prompt beschrieben

---

## 36. Schléiwen, 0,1 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-1l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Schleiwen-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/schleiwen-0-1l.png`
- **Status:** offen
- **Prompt:** 224 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Verschluss: Holzkugel auf Korkschaft wie in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,1 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/schleiwen-0-1l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „0,1 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „0,1 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Etikett proportional zur Flasche, in der unteren Hälfte
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)

---

## 37. Hierber Sambuca, 0,2 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/rund-0-2l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Sambuca_Zeichenfläche 1.png`
- **Ergebnis speichern als:** `fotos-flaschen/sambuca-0-2l.png`
- **Status:** offen
- **Prompt:** 248 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Größe: deutlich kleiner als die 0,5-L-Flasche in Anhang 1, etwa halbe Höhe, 0,2-L-Flasche derselben Form. Verschluss: grauer, spitz zulaufender Metallausgießer. Halsband: schmales Papierband um den Hals, dunkelrotes Band mit Faserstruktur und heller Schreibschrift „Hierber Brennerei“, eigenes Band neben dem großen Etikett (Anhang 1 zeigt es nicht, bitte ergänzen). Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,2 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/sambuca-0-2l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „0,2 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „0,2 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Größenverhältnis plausibel: deutlich kleiner als die 0,5-L-Flasche in Anhang 1, etwa halbe Höhe, 0,2-L-Flasche derselben Form; Etikett mitskaliert, in der unteren Hälfte
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Halsband vorhanden und passend: dunkelrotes Band mit Faserstruktur und heller Schreibschrift „Hierber Brennerei“

---

## 38. Hierber Sambuca, 1 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/rund-1-0l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Sambuca_Zeichenfläche 1.png`
- **Ergebnis speichern als:** `fotos-flaschen/sambuca-1-0l.png`
- **Status:** offen
- **Prompt:** 235 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Verschluss: heller Naturkorken wie in Anhang 1. Halsband: schmales Papierband um den Hals, dunkelrotes Band mit Faserstruktur und heller Schreibschrift „Hierber Brennerei“, eigenes Band neben dem großen Etikett (Anhang 1 zeigt es nicht, bitte ergänzen). Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „1 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/sambuca-1-0l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „1 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „1 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Etikett proportional zur Flasche, in der unteren Hälfte
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Halsband vorhanden und passend: dunkelrotes Band mit Faserstruktur und heller Schreibschrift „Hierber Brennerei“

---

## 39. Hierber Sambuca, 1,5 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/rund-1-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Sambuca_Zeichenfläche 1.png`
- **Ergebnis speichern als:** `fotos-flaschen/sambuca-1-5l.png`
- **Status:** offen
- **Prompt:** 235 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Verschluss: heller Naturkorken wie in Anhang 1. Halsband: schmales Papierband um den Hals, dunkelrotes Band mit Faserstruktur und heller Schreibschrift „Hierber Brennerei“, eigenes Band neben dem großen Etikett (Anhang 1 zeigt es nicht, bitte ergänzen). Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „1,5 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/sambuca-1-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „1,5 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „1,5 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Etikett proportional zur Flasche, in der unteren Hälfte
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Halsband vorhanden und passend: dunkelrotes Band mit Faserstruktur und heller Schreibschrift „Hierber Brennerei“

---

## 40. Hierber Limoncello, 0,2 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/rund-0-2l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Limoncello-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/limoncello-0-2l.png`
- **Status:** offen
- **Prompt:** 246 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Größe: deutlich kleiner als die 0,5-L-Flasche in Anhang 1, etwa halbe Höhe, 0,2-L-Flasche derselben Form. Verschluss: grauer, spitz zulaufender Metallausgießer. Halsband: schmales Papierband um den Hals, gelbes Band mit Zitronenscheiben und Schreibschrift „Hierber Brennerei“, eigenes Band neben dem großen Etikett (Anhang 1 zeigt es nicht, bitte ergänzen). Flüssigkeit: leuchtendes Gelbgrün, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,2 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/limoncello-0-2l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „0,2 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „0,2 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Größenverhältnis plausibel: deutlich kleiner als die 0,5-L-Flasche in Anhang 1, etwa halbe Höhe, 0,2-L-Flasche derselben Form; Etikett mitskaliert, in der unteren Hälfte
- Flüssigkeit: leuchtendes Gelbgrün, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Halsband vorhanden und passend: gelbes Band mit Zitronenscheiben und Schreibschrift „Hierber Brennerei“

---

## 41. Hierber Limoncello, 1 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/rund-1-0l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Limoncello-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/limoncello-1-0l.png`
- **Status:** offen
- **Prompt:** 233 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Verschluss: heller Naturkorken wie in Anhang 1. Halsband: schmales Papierband um den Hals, gelbes Band mit Zitronenscheiben und Schreibschrift „Hierber Brennerei“, eigenes Band neben dem großen Etikett (Anhang 1 zeigt es nicht, bitte ergänzen). Flüssigkeit: leuchtendes Gelbgrün, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „1 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/limoncello-1-0l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „1 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „1 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Etikett proportional zur Flasche, in der unteren Hälfte
- Flüssigkeit: leuchtendes Gelbgrün, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Halsband vorhanden und passend: gelbes Band mit Zitronenscheiben und Schreibschrift „Hierber Brennerei“

---

## 42. Hierber Limoncello, 1,5 L

- **Anhang 1 (nur Orientierung):** `fotos-basis/rund-1-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Limoncello-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/limoncello-1-5l.png`
- **Status:** offen
- **Prompt:** 233 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren. Verschluss: heller Naturkorken wie in Anhang 1. Halsband: schmales Papierband um den Hals, gelbes Band mit Zitronenscheiben und Schreibschrift „Hierber Brennerei“, eigenes Band neben dem großen Etikett (Anhang 1 zeigt es nicht, bitte ergänzen). Flüssigkeit: leuchtendes Gelbgrün, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „1,5 l“; sonst keine Änderung am Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/limoncello-1-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern. Ausnahme bleibt die Mengenangabe.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); **einzige erlaubte Abweichung: die Mengenangabe „1,5 l“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Mengenangabe auf dem Etikett lautet „1,5 l“ (nicht „0,5 l“)
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %
- Etikett proportional zur Flasche, in der unteren Hälfte
- Flüssigkeit: leuchtendes Gelbgrün, bis zum Hals gefüllt
- Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)
- Halsband vorhanden und passend: gelbes Band mit Zitronenscheiben und Schreibschrift „Hierber Brennerei“

