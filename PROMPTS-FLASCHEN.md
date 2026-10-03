# PROMPTS-FLASCHEN: neue Produktflasche mit aktuellem Etikett (ChatGPT)

Erzeugt mit `node tools/foto_prompts_flaschen.mjs`. Nicht von Hand ändern. 29 Prompts, je Sorte einer. **ChatGPT erzeugt eine NEUE, saubere Produktflasche** (Hochformat 1024 × 1536 Pixel, heller neutraler Studiogrund) mit dem aktuellen Etikett; das echte Foto wird nicht bearbeitet. Anhang 1 = echtes Flaschenfoto, nur Orientierung für Form, Verschluss, Proportionen und Foto-Look (nicht kopieren, nicht dessen Etikett). Anhang 2 = aktuelles flaches Etikett aus `Fertige Etiquetten/`. Die Flüssigkeitsfarbe steht im Prompt in Worten (gemessen in `site/data/fluessigkeit.js`).

Die Ergebnisse gehören als PNG unter dem Namen aus der Tabelle in den Ordner `fotos-flaschen/` im Repo (den legt der Nutzer an; das Skript legt ihn nicht an). Danach zeigen Sortenseite und Karte in „Die Theke“ dieses Bild statt der Vektor-Flasche (`node build.mjs`); fehlt die Datei, bleibt die Vektor-Flasche. **Alle 29 Sorten bekommen einen Lauf**; die Fotos in `Fotos/` werden nicht auf der Seite gezeigt. Ob das Etikett auf einem Foto dem aktuellen entspricht, steht nur zur Information in `FOTO-INVENTAR.md` (Abschnitt 9) und steuert nichts.

**Einheitlichkeit:** Jeder Prompt enthält denselben festen Baustein (Format, heller Grund, Licht von links, Flasche mittig, Standfläche bei etwa 90 % der Bildhöhe, Verschlussoberkante bei etwa 8 %), damit Karten nebeneinander ruhig wirken. Das kann ChatGPT nur annähernd einhalten; abweichende Bilder besser neu erzeugen als auf der Seite zurechtrücken.

**Stand:** 29 offen, 0 vorhanden (Datei in `fotos-flaschen/`).

Automatisch abarbeiten: `CHATGPT-STAPEL.md` (Gruppe `flasche`, Ausgabe Hochformat).

## So geht es

1. Neuen Chat öffnen (ChatGPT mit Bildgenerierung), pro Sorte ein neuer Chat.
2. Beide Anhänge hochladen (Pfade siehe Tabelle) und den Prompt aus dem Kasten einfügen.
3. Ergebnis mit der Prüfliste unter dem Kasten prüfen. Bei einer Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern.
4. Als PNG unter dem Namen aus der Spalte „Zieldatei“ in `fotos-flaschen/` speichern.

## Übersicht

| Sorte | Anhang 1 (nur Orientierung) | Anhang 2 (Etikett) | Zieldatei | Problem der Vorlage |
|---|---|---|---|---|
| Hierber Gin | `fotos/flaschen-wodka.webp` | `Fertige Etiquetten/Branntwein Hierber Gin - Nei 1-01.png` | `fotos-flaschen/gin.png` | Zwei-Flaschen-Foto der Wodka-Flasche; Gin nur über Etikett und Beschreibung |
| Hierber Wodka | `fotos/flaschen-wodka.webp` | `Fertige Etiquetten/Branntwein Wodka-01.png` | `fotos-flaschen/wodka.png` | Zwei-Flaschen-Foto (0,2 L und 0,5 L): nur die große Flasche ist Formvorbild, ChatGPT könnte beide zeichnen; das Halsband ist gewollt und im Prompt beschrieben |
| Hierber Rum | `fotos/flaschen-rum-02-05.webp` | `Fertige Etiquetten/Branntwein Hierber Rum nei-01.png` | `fotos-flaschen/rum.png` | Zwei-Flaschen-Foto (0,2 L und 0,5 L): nur die große Flasche ist Formvorbild, ChatGPT könnte beide zeichnen; das Halsband ist gewollt und im Prompt beschrieben |
| Hierber Rum Orange | `fotos/flaschen-rum-02-05.webp` | `Fertige Etiquetten/Branntwein Hierber Rum orange nei-01.png` | `fotos-flaschen/rum-orange.png` | Zwei-Flaschen-Foto der Rum-Flasche; Farbe und Kappe nur über die Beschreibung |
| Hierber Whisky | `fotos/flaschen-rum-02-05.webp` | `Fertige Etiquetten/Branntwein Whisky 0,5L nei 4-01.png` | `fotos-flaschen/whisky.png` | Zwei-Flaschen-Foto der Rum-Flasche; Farbe und Kappe nur über die Beschreibung |
| Kirsch | `Fotos/flasche-kirsch.jpg` | `Fertige Etiquetten/Brandwein Kirsch-01.png` | `fotos-flaschen/kirsch.png` | – |
| Framboise | `Fotos/flasche-framboise.jpg` | `Fertige Etiquetten/Brandwein Framboise-01.png` | `fotos-flaschen/framboise.png` | – |
| Quetsch | `Fotos/flasche-quetsch.jpg` | `Fertige Etiquetten/Brandwein Quetsch-01.png` | `fotos-flaschen/quetsch.png` | – |
| Poire Williams | `Fotos/flasche-poire-williams.jpg` | `Fertige Etiquetten/Brandwein Williams-01.png` | `fotos-flaschen/poire-williams.png` | – |
| Mirabelle | `Fotos/flasche-mirabelle.jpg` | `Fertige Etiquetten/Brandwein Mirabelle-01.png` | `fotos-flaschen/mirabelle.png` | – |
| Hierber aale Fruucht | `fotos/flaschen-fruucht.webp` | `Fertige Etiquetten/Branntwein Hierber Fruucht-01.png` | `fotos-flaschen/hierber-fruucht.png` | Zwei-Flaschen-Foto (0,2 L und 0,5 L): nur die große Flasche ist Formvorbild, ChatGPT könnte beide zeichnen; das Halsband ist gewollt und im Prompt beschrieben |
| Vieux Marc | `fotos/vorlage-vieux-marc.png` | `Fertige Etiquetten/Branntwein Vieux marc-01.png` | `fotos-flaschen/vieux-marc.png` | Leere Vorlagenflasche (ohne Etikett) auf schwarzem Grund; der Grund soll hell werden |
| Vieille Prune | `Fotos/flasche-vieille-prune.jpg` | `Fertige Etiquetten/Brandwein Vieille prune-01.png` | `fotos-flaschen/vieille-prune.png` | – |
| Vieille Pomme | `Fotos/flasche-vieille-pomme.jpg` | `Fertige Etiquetten/Brandwein Vieille pomme-01.png` | `fotos-flaschen/vieille-pomme.png` | – |
| Hunnegdrëpp | `Fotos/flasche-hunnegdrepp.jpg` | `Fertige Etiquetten/Brandwein Hunnegdrepp-01.png` | `fotos-flaschen/hunnegdrepp.png` | – |
| Hierber Hunneg Whisky | `fotos/flaschen-rum-02-05.webp` | `Fertige Etiquetten/Branntwein Whisky 0,5L Hunneg-01.png` | `fotos-flaschen/hunneg-whisky.png` | Zwei-Flaschen-Foto der Rum-Flasche; Farbe und Kappe nur über die Beschreibung |
| Kräiderdrëpp | `Fotos/flasche-kraeiderdrepp.jpg` | `Fertige Etiquetten/Brandwein Kraider-01.png` | `fotos-flaschen/kraeiderdrepp.png` | – |
| Kürbisdrëpp | `Fotos/flasche-kirsch.jpg` | `Fertige Etiquetten/Brandwein Kürbisdrepp-01.png` | `fotos-flaschen/kuerbisdrepp.png` | Formvorlage ist die Kirsch-Flasche, nicht die Flasche der Sorte |
| Grain | `Fotos/flasche-kirsch.jpg` | `Fertige Etiquetten/Branntwein Grain-01.png` | `fotos-flaschen/grain.png` | Formvorlage ist die Kirsch-Flasche, nicht die Flasche der Sorte |
| Hondsaarsch | `Fotos/flasche-kirsch.jpg` | `Fertige Etiquetten/Brandwein Hondsaarsch-01.png` | `fotos-flaschen/hondsaarsch.png` | Formvorlage ist die Kirsch-Flasche, nicht die Flasche der Sorte |
| Kiwibeeren | `Fotos/flasche-kiwibeeren.jpg` | `Fertige Etiquetten/Branntwein Kiwi-01.png` | `fotos-flaschen/kiwibeeren.png` | – |
| Poire | `Fotos/flasche-poire.jpg` | `Fertige Etiquetten/Brandwein Poire-01.png` | `fotos-flaschen/poire.png` | – |
| Neelchesbiren | `Fotos/flasche-neelchesbiren.jpg` | `Fertige Etiquetten/Brandwein Nelchensbiren-01.png` | `fotos-flaschen/neelchesbiren.png` | – |
| Lënschouren | `Fotos/flasche-lenschouren.jpg` | `Fertige Etiquetten/Brandwein Lenschouren-01.png` | `fotos-flaschen/lenschouren.png` | – |
| Vullekiischt | `Fotos/flasche-kirsch.jpg` | `Fertige Etiquetten/Brandwein Vogelbeere-01.png` | `fotos-flaschen/vullekiischt.png` | Formvorlage ist die Kirsch-Flasche, nicht die Flasche der Sorte |
| Schléiwen | `Fotos/flasche-schleiwen.jpg` | `Fertige Etiquetten/Branntwein Schleiwen-01.png` | `fotos-flaschen/schleiwen.png` | – |
| Vizdrëpp | `fotos/vorlage-vizdrepp.png` | `Fertige Etiquetten/Vizdrepp 0,5l_Zeichenfläche 1.png` | `fotos-flaschen/vizdrepp.png` | Leere Vorlagenflasche (ohne Etikett) auf schwarzem Grund; der Grund soll hell werden |
| Hierber Sambuca | `fotos/flaschen-sambuca.webp` | `Fertige Etiquetten/Branntwein Sambuca_Zeichenfläche 1.png` | `fotos-flaschen/sambuca.png` | Zwei-Flaschen-Foto (0,2 L und 0,5 L): nur die große Flasche ist Formvorbild, ChatGPT könnte beide zeichnen; das Halsband ist gewollt und im Prompt beschrieben |
| Hierber Limoncello | `fotos/flaschen-limoncello.webp` | `Fertige Etiquetten/Branntwein Limoncello-01.png` | `fotos-flaschen/limoncello.png` | Zwei-Flaschen-Foto (0,2 L und 0,5 L): nur die große Flasche ist Formvorbild, ChatGPT könnte beide zeichnen; das Halsband ist gewollt und im Prompt beschrieben |

## Problematische Vorlagen und Unsicherheiten (ehrlich)

- **Etikett Wort für Wort:** Dass ChatGPT Sortenname, Alkoholangabe, Grafik und die feste Adresszeile fehlerfrei übernimmt, ist unsicher. Jedes Ergebnis von Hand gegen das flache Etikett prüfen.
- **Gruppenfoto (Vieux Marc):** `fotos/flaschenreihe-theke.jpg` zeigt viele Flaschen; die Karaffe steht vorn links, teils verdeckt, mit Lampenreflexen. Als Formvorbild schwach; die Karaffenform kann abweichen.
- **Zwei Flaschen im selben Bild (Wodka, Gin, Rum, Rum Orange, Whisky, Hunneg Whisky, Limoncello, Sambuca, aale Fruucht):** die Fotos auf schwarzem Grund zeigen eine 0,2-L- und eine 0,5-L-Flasche samt Halsband „Hierber Brennerei“. Der Prompt nennt die große Flasche als Vorbild, verlangt nur EINE Flasche und beschreibt das Halsband je Sorte; ob ChatGPT das einhält, ist offen. Der Grund im Foto ist schwarz, das Ergebnis soll hell sein.
- **Nur über Beschreibung (Gin, Rum Orange, Whisky, Hunneg Whisky):** es gibt kein Foto der Sorte. Gin entsteht in der Form der Wodka-Flasche, Whisky, Hunneg Whisky und Rum Orange in der Form der Rum-Flasche; Kappen- und Flüssigkeitsfarbe stehen nur im Text. Hier ist die Abweichung vom echten Produkt am größten.
- **Formvorlage Kirsch (Kürbisdrëpp, Grain, Hondsaarsch, Vullekiischt):** gleiche schlanke Flasche, aber das Foto ist nicht die Flasche der Sorte; Flüssigkeit „klar wie Wasser“ laut Beschreibung.
- **Einheitliche Position:** Standfläche bei etwa 90 % und Verschlussoberkante bei etwa 8 % hält ChatGPT erfahrungsgemäß nur ungefähr ein.

---

## 1. Hierber Gin

- **Anhang 1 (nur Orientierung):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Gin - Nei 1-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/gin.png`
- **Status:** offen
- **Prompt:** 219 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (Foto mit zwei runden Flaschen: die große 0,5-L-Flasche rechts ist das Formvorbild, es entsteht nur EINE Flasche); nur Orientierung, nicht kopieren, nicht dessen Etikett. Es entsteht eine Gin-Flasche in der Form der Wodka-Flasche. Verschluss: flache, mattsilberne Metallkappe. Halsband: schmales Papierband um den Hals, hellblaues Band mit weißer Schreibschrift „Hierber Brennerei“, wie in Anhang 1, eigenes Band neben dem großen Etikett. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/gin.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“). **Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher** (gleiche Fehlerart wie bei den Serviervorschlägen: verfälschte Adresse, erfundene Schrift); bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 % (gleich wie bei allen anderen Sorten)
- Grund hell, neutral, weißgrau, ohne Verlauf ins Farbige; sanfter Schatten am Boden
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Etikett liegt rund auf der Flasche (nicht aufgeklebt, nicht flach), Glanz und Reflexe des Glases laufen darüber
- Das Foto aus Anhang 1 wurde nicht übernommen (kein altes Etikett, keine zweite Flasche)
- Halsband vorhanden und passend: hellblaues Band mit weißer Schreibschrift „Hierber Brennerei“ (unbestätigt, kein eigenes Foto)

---

## 2. Hierber Wodka

- **Anhang 1 (nur Orientierung):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Wodka-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/wodka.png`
- **Status:** offen
- **Prompt:** 210 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (Foto mit zwei runden Flaschen: die große 0,5-L-Flasche rechts ist das Formvorbild, es entsteht nur EINE Flasche); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: flache, mattsilberne Metallkappe. Halsband: schmales Papierband um den Hals, hellblaues Band mit weißer Schreibschrift „Hierber Brennerei“, wie in Anhang 1, eigenes Band neben dem großen Etikett. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/wodka.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“). **Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher** (gleiche Fehlerart wie bei den Serviervorschlägen: verfälschte Adresse, erfundene Schrift); bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 % (gleich wie bei allen anderen Sorten)
- Grund hell, neutral, weißgrau, ohne Verlauf ins Farbige; sanfter Schatten am Boden
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Etikett liegt rund auf der Flasche (nicht aufgeklebt, nicht flach), Glanz und Reflexe des Glases laufen darüber
- Das Foto aus Anhang 1 wurde nicht übernommen (kein altes Etikett, keine zweite Flasche)
- Halsband vorhanden und passend: hellblaues Band mit weißer Schreibschrift „Hierber Brennerei“

---

## 3. Hierber Rum

- **Anhang 1 (nur Orientierung):** `fotos/flaschen-rum-02-05.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Rum nei-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/rum.png`
- **Status:** offen
- **Prompt:** 208 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (Foto mit zwei runden Flaschen: die große 0,5-L-Flasche rechts ist das Formvorbild, es entsteht nur EINE Flasche); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: dunkelbraune Holzkappe. Halsband: schmales Papierband um den Hals, braungraues Band mit heller Schreibschrift „Hierber Brennerei“, wie in Anhang 1, eigenes Band neben dem großen Etikett. Flüssigkeit: goldenes Bernstein, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/rum.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“). **Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher** (gleiche Fehlerart wie bei den Serviervorschlägen: verfälschte Adresse, erfundene Schrift); bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 % (gleich wie bei allen anderen Sorten)
- Grund hell, neutral, weißgrau, ohne Verlauf ins Farbige; sanfter Schatten am Boden
- Flüssigkeit: goldenes Bernstein, bis zum Hals gefüllt
- Etikett liegt rund auf der Flasche (nicht aufgeklebt, nicht flach), Glanz und Reflexe des Glases laufen darüber
- Das Foto aus Anhang 1 wurde nicht übernommen (kein altes Etikett, keine zweite Flasche)
- Halsband vorhanden und passend: braungraues Band mit heller Schreibschrift „Hierber Brennerei“

---

## 4. Hierber Rum Orange

- **Anhang 1 (nur Orientierung):** `fotos/flaschen-rum-02-05.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Rum orange nei-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/rum-orange.png`
- **Status:** offen
- **Prompt:** 213 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (Foto mit zwei runden Flaschen: die große 0,5-L-Flasche rechts ist das Formvorbild, es entsteht nur EINE Flasche); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: dunkelbraune Holzkappe. Halsband: schmales Papierband um den Hals, braungraues Band mit heller Schreibschrift „Hierber Brennerei“, wie in Anhang 1, eigenes Band neben dem großen Etikett. Flüssigkeit: Bernstein, etwas orangener als im Foto (Orange-Bernstein), bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/rum-orange.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“). **Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher** (gleiche Fehlerart wie bei den Serviervorschlägen: verfälschte Adresse, erfundene Schrift); bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 % (gleich wie bei allen anderen Sorten)
- Grund hell, neutral, weißgrau, ohne Verlauf ins Farbige; sanfter Schatten am Boden
- Flüssigkeit: Bernstein, etwas orangener als im Foto (Orange-Bernstein), bis zum Hals gefüllt
- Etikett liegt rund auf der Flasche (nicht aufgeklebt, nicht flach), Glanz und Reflexe des Glases laufen darüber
- Das Foto aus Anhang 1 wurde nicht übernommen (kein altes Etikett, keine zweite Flasche)
- Halsband vorhanden und passend: braungraues Band mit heller Schreibschrift „Hierber Brennerei“ (unbestätigt, kein eigenes Foto)

---

## 5. Hierber Whisky

- **Anhang 1 (nur Orientierung):** `fotos/flaschen-rum-02-05.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Whisky 0,5L nei 4-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/whisky.png`
- **Status:** offen
- **Prompt:** 218 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (Foto mit zwei runden Flaschen: die große 0,5-L-Flasche rechts ist das Formvorbild, es entsteht nur EINE Flasche); nur Orientierung, nicht kopieren, nicht dessen Etikett. Es entsteht eine Whisky-Flasche in der Form der Rum-Flasche. Verschluss: schwarze Schraubkappe statt Holzkappe. Halsband: schmales Papierband um den Hals, braungraues Band mit heller Schreibschrift „Hierber Brennerei“, wie in Anhang 1, eigenes Band neben dem großen Etikett. Flüssigkeit: goldgelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/whisky.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“). **Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher** (gleiche Fehlerart wie bei den Serviervorschlägen: verfälschte Adresse, erfundene Schrift); bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 % (gleich wie bei allen anderen Sorten)
- Grund hell, neutral, weißgrau, ohne Verlauf ins Farbige; sanfter Schatten am Boden
- Flüssigkeit: goldgelb, bis zum Hals gefüllt
- Etikett liegt rund auf der Flasche (nicht aufgeklebt, nicht flach), Glanz und Reflexe des Glases laufen darüber
- Das Foto aus Anhang 1 wurde nicht übernommen (kein altes Etikett, keine zweite Flasche)
- Halsband vorhanden und passend: braungraues Band mit heller Schreibschrift „Hierber Brennerei“ (unbestätigt, kein eigenes Foto)

---

## 6. Kirsch

- **Anhang 1 (nur Orientierung):** `Fotos/flasche-kirsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Kirsch-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/kirsch.png`
- **Status:** offen
- **Prompt:** 196 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (Foto der Flasche dieser Sorte: schlanke 0,5-L-Flasche mit hohem Hals); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen mit Kork. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/kirsch.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“). **Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher** (gleiche Fehlerart wie bei den Serviervorschlägen: verfälschte Adresse, erfundene Schrift); bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 % (gleich wie bei allen anderen Sorten)
- Grund hell, neutral, weißgrau, ohne Verlauf ins Farbige; sanfter Schatten am Boden
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Etikett liegt rund auf der Flasche (nicht aufgeklebt, nicht flach), Glanz und Reflexe des Glases laufen darüber
- Das Foto aus Anhang 1 wurde nicht übernommen (kein altes Etikett, keine zweite Flasche)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)

---

## 7. Framboise

- **Anhang 1 (nur Orientierung):** `Fotos/flasche-framboise.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Framboise-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/framboise.png`
- **Status:** offen
- **Prompt:** 196 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (Foto der Flasche dieser Sorte: schlanke 0,5-L-Flasche mit hohem Hals); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen mit Kork. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/framboise.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“). **Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher** (gleiche Fehlerart wie bei den Serviervorschlägen: verfälschte Adresse, erfundene Schrift); bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 % (gleich wie bei allen anderen Sorten)
- Grund hell, neutral, weißgrau, ohne Verlauf ins Farbige; sanfter Schatten am Boden
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Etikett liegt rund auf der Flasche (nicht aufgeklebt, nicht flach), Glanz und Reflexe des Glases laufen darüber
- Das Foto aus Anhang 1 wurde nicht übernommen (kein altes Etikett, keine zweite Flasche)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)

---

## 8. Quetsch

- **Anhang 1 (nur Orientierung):** `Fotos/flasche-quetsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Quetsch-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/quetsch.png`
- **Status:** offen
- **Prompt:** 196 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (Foto der Flasche dieser Sorte: schlanke 0,5-L-Flasche mit hohem Hals); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen mit Kork. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/quetsch.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“). **Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher** (gleiche Fehlerart wie bei den Serviervorschlägen: verfälschte Adresse, erfundene Schrift); bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 % (gleich wie bei allen anderen Sorten)
- Grund hell, neutral, weißgrau, ohne Verlauf ins Farbige; sanfter Schatten am Boden
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Etikett liegt rund auf der Flasche (nicht aufgeklebt, nicht flach), Glanz und Reflexe des Glases laufen darüber
- Das Foto aus Anhang 1 wurde nicht übernommen (kein altes Etikett, keine zweite Flasche)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)

---

## 9. Poire Williams

- **Anhang 1 (nur Orientierung):** `Fotos/flasche-poire-williams.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Williams-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/poire-williams.png`
- **Status:** offen
- **Prompt:** 196 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (Foto der Flasche dieser Sorte: schlanke 0,5-L-Flasche mit hohem Hals); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen mit Kork. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/poire-williams.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“). **Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher** (gleiche Fehlerart wie bei den Serviervorschlägen: verfälschte Adresse, erfundene Schrift); bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 % (gleich wie bei allen anderen Sorten)
- Grund hell, neutral, weißgrau, ohne Verlauf ins Farbige; sanfter Schatten am Boden
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Etikett liegt rund auf der Flasche (nicht aufgeklebt, nicht flach), Glanz und Reflexe des Glases laufen darüber
- Das Foto aus Anhang 1 wurde nicht übernommen (kein altes Etikett, keine zweite Flasche)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)

---

## 10. Mirabelle

- **Anhang 1 (nur Orientierung):** `Fotos/flasche-mirabelle.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Mirabelle-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/mirabelle.png`
- **Status:** offen
- **Prompt:** 196 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (Foto der Flasche dieser Sorte: schlanke 0,5-L-Flasche mit hohem Hals); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen mit Kork. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/mirabelle.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“). **Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher** (gleiche Fehlerart wie bei den Serviervorschlägen: verfälschte Adresse, erfundene Schrift); bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 % (gleich wie bei allen anderen Sorten)
- Grund hell, neutral, weißgrau, ohne Verlauf ins Farbige; sanfter Schatten am Boden
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Etikett liegt rund auf der Flasche (nicht aufgeklebt, nicht flach), Glanz und Reflexe des Glases laufen darüber
- Das Foto aus Anhang 1 wurde nicht übernommen (kein altes Etikett, keine zweite Flasche)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)

---

## 11. Hierber aale Fruucht

- **Anhang 1 (nur Orientierung):** `fotos/flaschen-fruucht.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Fruucht-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/hierber-fruucht.png`
- **Status:** offen
- **Prompt:** 212 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (Foto mit zwei runden Flaschen: die große 0,5-L-Flasche rechts ist das Formvorbild, es entsteht nur EINE Flasche); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: rotbraune Holzkappe. Halsband: schmales Papierband um den Hals, graubraunes Band mit kleinem Brennblasen-Logo und heller Schreibschrift „Hierber Brennerei“, wie in Anhang 1, eigenes Band neben dem großen Etikett. Flüssigkeit: warmes, kräftiges Orange-Bernstein, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/hierber-fruucht.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“). **Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher** (gleiche Fehlerart wie bei den Serviervorschlägen: verfälschte Adresse, erfundene Schrift); bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 % (gleich wie bei allen anderen Sorten)
- Grund hell, neutral, weißgrau, ohne Verlauf ins Farbige; sanfter Schatten am Boden
- Flüssigkeit: warmes, kräftiges Orange-Bernstein, bis zum Hals gefüllt
- Etikett liegt rund auf der Flasche (nicht aufgeklebt, nicht flach), Glanz und Reflexe des Glases laufen darüber
- Das Foto aus Anhang 1 wurde nicht übernommen (kein altes Etikett, keine zweite Flasche)
- Halsband vorhanden und passend: graubraunes Band mit kleinem Brennblasen-Logo und heller Schreibschrift „Hierber Brennerei“

---

## 12. Vieux Marc

- **Anhang 1 (nur Orientierung):** `fotos/vorlage-vieux-marc.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Vieux marc-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/vieux-marc.png`
- **Status:** offen
- **Prompt:** 199 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (Foto einer leeren Flasche dieser Form (ohne Etikett): dunkle Karaffe mit langem, schlankem Hals und nach unten breit auslaufendem Körper); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: schwarzer Ausgießer. Kein Halsband: der Hals bleibt ohne Papierband. Glas: dunkles, fast schwarzes Braunglas, der Brand ist nicht zu sehen. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/vieux-marc.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“). **Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher** (gleiche Fehlerart wie bei den Serviervorschlägen: verfälschte Adresse, erfundene Schrift); bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 % (gleich wie bei allen anderen Sorten)
- Grund hell, neutral, weißgrau, ohne Verlauf ins Farbige; sanfter Schatten am Boden
- Glas: dunkles, fast schwarzes Braunglas, der Brand ist nicht zu sehen
- Etikett liegt rund auf der Flasche (nicht aufgeklebt, nicht flach), Glanz und Reflexe des Glases laufen darüber
- Das Foto aus Anhang 1 wurde nicht übernommen (kein altes Etikett, keine zweite Flasche)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)

---

## 13. Vieille Prune

- **Anhang 1 (nur Orientierung):** `Fotos/flasche-vieille-prune.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Vieille prune-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/vieille-prune.png`
- **Status:** offen
- **Prompt:** 195 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (Foto der Flasche dieser Sorte: schlanke 0,5-L-Flasche mit hohem Hals); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen mit Kork. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klares Goldgelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/vieille-prune.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“). **Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher** (gleiche Fehlerart wie bei den Serviervorschlägen: verfälschte Adresse, erfundene Schrift); bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 % (gleich wie bei allen anderen Sorten)
- Grund hell, neutral, weißgrau, ohne Verlauf ins Farbige; sanfter Schatten am Boden
- Flüssigkeit: klares Goldgelb, bis zum Hals gefüllt
- Etikett liegt rund auf der Flasche (nicht aufgeklebt, nicht flach), Glanz und Reflexe des Glases laufen darüber
- Das Foto aus Anhang 1 wurde nicht übernommen (kein altes Etikett, keine zweite Flasche)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)

---

## 14. Vieille Pomme

- **Anhang 1 (nur Orientierung):** `Fotos/flasche-vieille-pomme.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Vieille pomme-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/vieille-pomme.png`
- **Status:** offen
- **Prompt:** 195 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (Foto der Flasche dieser Sorte: schlanke 0,5-L-Flasche mit hohem Hals); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen mit Kork. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klares Goldgelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/vieille-pomme.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“). **Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher** (gleiche Fehlerart wie bei den Serviervorschlägen: verfälschte Adresse, erfundene Schrift); bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 % (gleich wie bei allen anderen Sorten)
- Grund hell, neutral, weißgrau, ohne Verlauf ins Farbige; sanfter Schatten am Boden
- Flüssigkeit: klares Goldgelb, bis zum Hals gefüllt
- Etikett liegt rund auf der Flasche (nicht aufgeklebt, nicht flach), Glanz und Reflexe des Glases laufen darüber
- Das Foto aus Anhang 1 wurde nicht übernommen (kein altes Etikett, keine zweite Flasche)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)

---

## 15. Hunnegdrëpp

- **Anhang 1 (nur Orientierung):** `Fotos/flasche-hunnegdrepp.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Hunnegdrepp-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/hunnegdrepp.png`
- **Status:** offen
- **Prompt:** 195 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (Foto der Flasche dieser Sorte: schlanke 0,5-L-Flasche mit hohem Hals); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen mit Kork. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: tiefes Honiggold, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/hunnegdrepp.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“). **Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher** (gleiche Fehlerart wie bei den Serviervorschlägen: verfälschte Adresse, erfundene Schrift); bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 % (gleich wie bei allen anderen Sorten)
- Grund hell, neutral, weißgrau, ohne Verlauf ins Farbige; sanfter Schatten am Boden
- Flüssigkeit: tiefes Honiggold, bis zum Hals gefüllt
- Etikett liegt rund auf der Flasche (nicht aufgeklebt, nicht flach), Glanz und Reflexe des Glases laufen darüber
- Das Foto aus Anhang 1 wurde nicht übernommen (kein altes Etikett, keine zweite Flasche)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)

---

## 16. Hierber Hunneg Whisky

- **Anhang 1 (nur Orientierung):** `fotos/flaschen-rum-02-05.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Whisky 0,5L Hunneg-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/hunneg-whisky.png`
- **Status:** offen
- **Prompt:** 220 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (Foto mit zwei runden Flaschen: die große 0,5-L-Flasche rechts ist das Formvorbild, es entsteht nur EINE Flasche); nur Orientierung, nicht kopieren, nicht dessen Etikett. Es entsteht eine Hunneg-Whisky-Flasche in der Form der Rum-Flasche. Verschluss: schwarze Schraubkappe statt Holzkappe. Halsband: schmales Papierband um den Hals, braungraues Band mit heller Schreibschrift „Hierber Brennerei“, wie in Anhang 1, eigenes Band neben dem großen Etikett. Flüssigkeit: warmes, honigfarbenes Goldgelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/hunneg-whisky.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“). **Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher** (gleiche Fehlerart wie bei den Serviervorschlägen: verfälschte Adresse, erfundene Schrift); bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 % (gleich wie bei allen anderen Sorten)
- Grund hell, neutral, weißgrau, ohne Verlauf ins Farbige; sanfter Schatten am Boden
- Flüssigkeit: warmes, honigfarbenes Goldgelb, bis zum Hals gefüllt
- Etikett liegt rund auf der Flasche (nicht aufgeklebt, nicht flach), Glanz und Reflexe des Glases laufen darüber
- Das Foto aus Anhang 1 wurde nicht übernommen (kein altes Etikett, keine zweite Flasche)
- Halsband vorhanden und passend: braungraues Band mit heller Schreibschrift „Hierber Brennerei“ (unbestätigt, kein eigenes Foto)

---

## 17. Kräiderdrëpp

- **Anhang 1 (nur Orientierung):** `Fotos/flasche-kraeiderdrepp.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Kraider-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/kraeiderdrepp.png`
- **Status:** offen
- **Prompt:** 196 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (Foto der Flasche dieser Sorte: schlanke 0,5-L-Flasche mit hohem Hals); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen mit Kork. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/kraeiderdrepp.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“). **Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher** (gleiche Fehlerart wie bei den Serviervorschlägen: verfälschte Adresse, erfundene Schrift); bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 % (gleich wie bei allen anderen Sorten)
- Grund hell, neutral, weißgrau, ohne Verlauf ins Farbige; sanfter Schatten am Boden
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Etikett liegt rund auf der Flasche (nicht aufgeklebt, nicht flach), Glanz und Reflexe des Glases laufen darüber
- Das Foto aus Anhang 1 wurde nicht übernommen (kein altes Etikett, keine zweite Flasche)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)

---

## 18. Kürbisdrëpp

- **Anhang 1 (nur Orientierung):** `Fotos/flasche-kirsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Kürbisdrepp-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/kuerbisdrepp.png`
- **Status:** offen
- **Prompt:** 194 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (schlanke 0,5-L-Flasche, Foto der Kirsch-Flasche nur als Formvorbild); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen mit Kork. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/kuerbisdrepp.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“). **Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher** (gleiche Fehlerart wie bei den Serviervorschlägen: verfälschte Adresse, erfundene Schrift); bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 % (gleich wie bei allen anderen Sorten)
- Grund hell, neutral, weißgrau, ohne Verlauf ins Farbige; sanfter Schatten am Boden
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Etikett liegt rund auf der Flasche (nicht aufgeklebt, nicht flach), Glanz und Reflexe des Glases laufen darüber
- Das Foto aus Anhang 1 wurde nicht übernommen (kein altes Etikett, keine zweite Flasche)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)
- Nicht das Kirsch-Etikett: es muss das Etikett der Sorte aus Anhang 2 sein

---

## 19. Grain

- **Anhang 1 (nur Orientierung):** `Fotos/flasche-kirsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Grain-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/grain.png`
- **Status:** offen
- **Prompt:** 194 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (schlanke 0,5-L-Flasche, Foto der Kirsch-Flasche nur als Formvorbild); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen mit Kork. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/grain.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“). **Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher** (gleiche Fehlerart wie bei den Serviervorschlägen: verfälschte Adresse, erfundene Schrift); bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 % (gleich wie bei allen anderen Sorten)
- Grund hell, neutral, weißgrau, ohne Verlauf ins Farbige; sanfter Schatten am Boden
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Etikett liegt rund auf der Flasche (nicht aufgeklebt, nicht flach), Glanz und Reflexe des Glases laufen darüber
- Das Foto aus Anhang 1 wurde nicht übernommen (kein altes Etikett, keine zweite Flasche)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)
- Nicht das Kirsch-Etikett: es muss das Etikett der Sorte aus Anhang 2 sein

---

## 20. Hondsaarsch

- **Anhang 1 (nur Orientierung):** `Fotos/flasche-kirsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Hondsaarsch-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/hondsaarsch.png`
- **Status:** offen
- **Prompt:** 194 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (schlanke 0,5-L-Flasche, Foto der Kirsch-Flasche nur als Formvorbild); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen mit Kork. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/hondsaarsch.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“). **Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher** (gleiche Fehlerart wie bei den Serviervorschlägen: verfälschte Adresse, erfundene Schrift); bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 % (gleich wie bei allen anderen Sorten)
- Grund hell, neutral, weißgrau, ohne Verlauf ins Farbige; sanfter Schatten am Boden
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Etikett liegt rund auf der Flasche (nicht aufgeklebt, nicht flach), Glanz und Reflexe des Glases laufen darüber
- Das Foto aus Anhang 1 wurde nicht übernommen (kein altes Etikett, keine zweite Flasche)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)
- Nicht das Kirsch-Etikett: es muss das Etikett der Sorte aus Anhang 2 sein

---

## 21. Kiwibeeren

- **Anhang 1 (nur Orientierung):** `Fotos/flasche-kiwibeeren.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Kiwi-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/kiwibeeren.png`
- **Status:** offen
- **Prompt:** 196 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (Foto der Flasche dieser Sorte: schlanke 0,5-L-Flasche mit hohem Hals); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen mit Kork. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/kiwibeeren.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“). **Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher** (gleiche Fehlerart wie bei den Serviervorschlägen: verfälschte Adresse, erfundene Schrift); bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 % (gleich wie bei allen anderen Sorten)
- Grund hell, neutral, weißgrau, ohne Verlauf ins Farbige; sanfter Schatten am Boden
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Etikett liegt rund auf der Flasche (nicht aufgeklebt, nicht flach), Glanz und Reflexe des Glases laufen darüber
- Das Foto aus Anhang 1 wurde nicht übernommen (kein altes Etikett, keine zweite Flasche)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)

---

## 22. Poire

- **Anhang 1 (nur Orientierung):** `Fotos/flasche-poire.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Poire-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/poire.png`
- **Status:** offen
- **Prompt:** 196 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (Foto der Flasche dieser Sorte: schlanke 0,5-L-Flasche mit hohem Hals); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen mit Kork. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/poire.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“). **Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher** (gleiche Fehlerart wie bei den Serviervorschlägen: verfälschte Adresse, erfundene Schrift); bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 % (gleich wie bei allen anderen Sorten)
- Grund hell, neutral, weißgrau, ohne Verlauf ins Farbige; sanfter Schatten am Boden
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Etikett liegt rund auf der Flasche (nicht aufgeklebt, nicht flach), Glanz und Reflexe des Glases laufen darüber
- Das Foto aus Anhang 1 wurde nicht übernommen (kein altes Etikett, keine zweite Flasche)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)

---

## 23. Neelchesbiren

- **Anhang 1 (nur Orientierung):** `Fotos/flasche-neelchesbiren.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Nelchensbiren-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/neelchesbiren.png`
- **Status:** offen
- **Prompt:** 196 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (Foto der Flasche dieser Sorte: schlanke 0,5-L-Flasche mit hohem Hals); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen mit Kork. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/neelchesbiren.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“). **Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher** (gleiche Fehlerart wie bei den Serviervorschlägen: verfälschte Adresse, erfundene Schrift); bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 % (gleich wie bei allen anderen Sorten)
- Grund hell, neutral, weißgrau, ohne Verlauf ins Farbige; sanfter Schatten am Boden
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Etikett liegt rund auf der Flasche (nicht aufgeklebt, nicht flach), Glanz und Reflexe des Glases laufen darüber
- Das Foto aus Anhang 1 wurde nicht übernommen (kein altes Etikett, keine zweite Flasche)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)

---

## 24. Lënschouren

- **Anhang 1 (nur Orientierung):** `Fotos/flasche-lenschouren.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Lenschouren-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/lenschouren.png`
- **Status:** offen
- **Prompt:** 196 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (Foto der Flasche dieser Sorte: schlanke 0,5-L-Flasche mit hohem Hals); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen mit Kork. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/lenschouren.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“). **Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher** (gleiche Fehlerart wie bei den Serviervorschlägen: verfälschte Adresse, erfundene Schrift); bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 % (gleich wie bei allen anderen Sorten)
- Grund hell, neutral, weißgrau, ohne Verlauf ins Farbige; sanfter Schatten am Boden
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Etikett liegt rund auf der Flasche (nicht aufgeklebt, nicht flach), Glanz und Reflexe des Glases laufen darüber
- Das Foto aus Anhang 1 wurde nicht übernommen (kein altes Etikett, keine zweite Flasche)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)

---

## 25. Vullekiischt

- **Anhang 1 (nur Orientierung):** `Fotos/flasche-kirsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Vogelbeere-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/vullekiischt.png`
- **Status:** offen
- **Prompt:** 194 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (schlanke 0,5-L-Flasche, Foto der Kirsch-Flasche nur als Formvorbild); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen mit Kork. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/vullekiischt.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“). **Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher** (gleiche Fehlerart wie bei den Serviervorschlägen: verfälschte Adresse, erfundene Schrift); bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 % (gleich wie bei allen anderen Sorten)
- Grund hell, neutral, weißgrau, ohne Verlauf ins Farbige; sanfter Schatten am Boden
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Etikett liegt rund auf der Flasche (nicht aufgeklebt, nicht flach), Glanz und Reflexe des Glases laufen darüber
- Das Foto aus Anhang 1 wurde nicht übernommen (kein altes Etikett, keine zweite Flasche)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)
- Nicht das Kirsch-Etikett: es muss das Etikett der Sorte aus Anhang 2 sein

---

## 26. Schléiwen

- **Anhang 1 (nur Orientierung):** `Fotos/flasche-schleiwen.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Schleiwen-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/schleiwen.png`
- **Status:** offen
- **Prompt:** 196 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (Foto der Flasche dieser Sorte: schlanke 0,5-L-Flasche mit hohem Hals); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen mit Kork. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/schleiwen.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“). **Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher** (gleiche Fehlerart wie bei den Serviervorschlägen: verfälschte Adresse, erfundene Schrift); bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 % (gleich wie bei allen anderen Sorten)
- Grund hell, neutral, weißgrau, ohne Verlauf ins Farbige; sanfter Schatten am Boden
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Etikett liegt rund auf der Flasche (nicht aufgeklebt, nicht flach), Glanz und Reflexe des Glases laufen darüber
- Das Foto aus Anhang 1 wurde nicht übernommen (kein altes Etikett, keine zweite Flasche)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)

---

## 27. Vizdrëpp

- **Anhang 1 (nur Orientierung):** `fotos/vorlage-vizdrepp.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Vizdrepp 0,5l_Zeichenfläche 1.png`
- **Ergebnis speichern als:** `fotos-flaschen/vizdrepp.png`
- **Status:** offen
- **Prompt:** 211 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (Foto einer leeren Flasche dieser Form (ohne Etikett): schlanker Hals, nach unten glockenförmig breiter werdender Körper mit eingewölbtem Boden); nur Orientierung, nicht kopieren, nicht dessen Etikett. Das Etikett ist querformatig. Verschluss: Glasstopfen mit flachem, breitem Kragen. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: kräftiges, klares Goldgelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/vizdrepp.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“). **Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher** (gleiche Fehlerart wie bei den Serviervorschlägen: verfälschte Adresse, erfundene Schrift); bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 % (gleich wie bei allen anderen Sorten)
- Grund hell, neutral, weißgrau, ohne Verlauf ins Farbige; sanfter Schatten am Boden
- Flüssigkeit: kräftiges, klares Goldgelb, bis zum Hals gefüllt
- Etikett liegt rund auf der Flasche (nicht aufgeklebt, nicht flach), Glanz und Reflexe des Glases laufen darüber
- Das Foto aus Anhang 1 wurde nicht übernommen (kein altes Etikett, keine zweite Flasche)
- Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)

---

## 28. Hierber Sambuca

- **Anhang 1 (nur Orientierung):** `fotos/flaschen-sambuca.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Sambuca_Zeichenfläche 1.png`
- **Ergebnis speichern als:** `fotos-flaschen/sambuca.png`
- **Status:** offen
- **Prompt:** 213 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (Foto mit zwei runden Flaschen: die große 0,5-L-Flasche rechts ist das Formvorbild, es entsteht nur EINE Flasche); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: grauer, spitz zulaufender Metallausgießer. Halsband: schmales Papierband um den Hals, dunkelrotes Band mit Faserstruktur und heller Schreibschrift „Hierber Brennerei“, wie in Anhang 1, eigenes Band neben dem großen Etikett. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/sambuca.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“). **Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher** (gleiche Fehlerart wie bei den Serviervorschlägen: verfälschte Adresse, erfundene Schrift); bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 % (gleich wie bei allen anderen Sorten)
- Grund hell, neutral, weißgrau, ohne Verlauf ins Farbige; sanfter Schatten am Boden
- Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt
- Etikett liegt rund auf der Flasche (nicht aufgeklebt, nicht flach), Glanz und Reflexe des Glases laufen darüber
- Das Foto aus Anhang 1 wurde nicht übernommen (kein altes Etikett, keine zweite Flasche)
- Halsband vorhanden und passend: dunkelrotes Band mit Faserstruktur und heller Schreibschrift „Hierber Brennerei“

---

## 29. Hierber Limoncello

- **Anhang 1 (nur Orientierung):** `fotos/flaschen-limoncello.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Limoncello-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/limoncello.png`
- **Status:** offen
- **Prompt:** 211 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (Foto mit zwei runden Flaschen: die große 0,5-L-Flasche rechts ist das Formvorbild, es entsteht nur EINE Flasche); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: grauer, spitz zulaufender Metallausgießer. Halsband: schmales Papierband um den Hals, gelbes Band mit Zitronenscheiben und Schreibschrift „Hierber Brennerei“, wie in Anhang 1, eigenes Band neben dem großen Etikett. Flüssigkeit: leuchtendes Gelbgrün, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/limoncello.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“). **Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher** (gleiche Fehlerart wie bei den Serviervorschlägen: verfälschte Adresse, erfundene Schrift); bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum
- Format Hochformat 1024 × 1536; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 % (gleich wie bei allen anderen Sorten)
- Grund hell, neutral, weißgrau, ohne Verlauf ins Farbige; sanfter Schatten am Boden
- Flüssigkeit: leuchtendes Gelbgrün, bis zum Hals gefüllt
- Etikett liegt rund auf der Flasche (nicht aufgeklebt, nicht flach), Glanz und Reflexe des Glases laufen darüber
- Das Foto aus Anhang 1 wurde nicht übernommen (kein altes Etikett, keine zweite Flasche)
- Halsband vorhanden und passend: gelbes Band mit Zitronenscheiben und Schreibschrift „Hierber Brennerei“

