# Prompts für KI-Fotos (ChatGPT) – Serviervorschläge

Erzeugt mit `node tools/foto_prompts.mjs` aus den Daten der Seite. Nicht von Hand ändern, sondern das Skript anpassen und neu laufen lassen.
Die Bilder sind **Symbolbilder** (unter dem Bild steht „Symbolbild: Serviervorschlag“; eingebaut über `site/data/ki-bilder.js`). Beginn: 29 Bilder, eins pro Sorte, im Querformat 4:3.

## So geht es in 5 Schritten

1. **Neuen Chat öffnen** (ChatGPT mit Bildgenerierung). Pro Sorte immer einen **neuen** Chat, sonst kippt der Stil.
2. **Zwei Bilder anhängen:** Anhang 1 = Flaschenvorlage (das Flaschenfoto der Sorte aus `Fotos/`, sonst eine Standardvorlage je Flaschentyp), Anhang 2 = flaches Etikett der Sorte (für alle 29 Sorten vorhanden). Der genaue Dateiname steht bei jeder Sorte.
3. **Prompt einfügen:** den Text im Kasten der Sorte kopieren (Kopier-Symbol am Kasten) und im Chat absenden.
4. **Ergebnis prüfen:** Etikett im Bild Wort für Wort mit dem Anhang vergleichen, dazu Glas, Garnitur, Eis und Flüssigkeitsfarbe. KI verfälscht gern Schrift. Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
5. **Speichern** unter dem Dateinamen, der bei der Sorte steht (`fotos-ki/<sorten-id>-1.jpg`).

## Stilblock (gemeinsam für alle Bilder)

Steht in jedem Prompt unten vollständig mit drin, damit jeder Kasten für sich kopierbar ist.

```
Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
```

Gegenüber der ersten Fassung ergänzt, ohne den Charakter zu ändern: saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Der Brand selbst wird nicht verändert und nichts hinzuerfunden: Zutaten und Garnituren stammen aus den Rezeptentwürfen der Sortenseite (Entwürfe, vom Brenner noch zu bestätigen).

**Gewählt wurde je Sorte der fotogenste Serviervorschlag, möglichst Longdrink, Cocktail oder Gericht statt Pur.** Der Titel steht bei jeder Sorte; auf der Sortenseite ersetzt das Bild den Platzhalter „Foto folgt: <Titel>“, sobald `fotos-ki/<id>-1.png` vorliegt.

---

## 1. Hierber Gin

- **Serviervorschlag:** Gin-Tonic mit Apfel und Rosmarin (Auf Eis / Longdrink), Nr. 1 von 4 auf der Sortenseite
- **Ergebnis speichern als:** `fotos-ki/gin-1.png`
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Gin - Nei 1-01.png`
- **Prompt:** 170 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Gin-Tonic im großen Ballonglas, bis oben mit klaren Eiswürfeln, dazwischen 3 bis 4 dünne Apfelscheiben, ein frischer Rosmarinzweig steckt im Glas. Das Getränk ist klar und perlt leicht. Daneben unscharf ein kleiner Teller mit Ziegenkäse.
Flasche: Neben dem Getränk steht scharf die Flasche in der Form von Anhang 1 (ohne deren Etikett). Das Etikett aus Anhang 2 unverändert übernehmen, nicht neu zeichnen oder schreiben, kein Buchstabe anders: Es legt sich wie ein echtes Etikett um die halbe Flasche, Rundung sichtbar, Ränder laufen seitlich weg, Text mittig, frontal, lesbar.
Farbe des Brandes in der Flasche: klar wie Wasser.
Negativ: verändertes oder neu geschriebenes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Etikett im Bild mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Adresse, Grafik).
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“
- Bleibt der Text falsch: Bild ohne Text nehmen und das Etikett später im Bildeditor einsetzen.

---

## 2. Hierber Wodka

- **Serviervorschlag:** Wodka-Tonic mit Gurkenscheiben (Auf Eis / Longdrink), Nr. 2 von 4 auf der Sortenseite
- **Ergebnis speichern als:** `fotos-ki/wodka-1.png`
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Wodka-01.png`
- **Prompt:** 161 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Wodka-Tonic im hohen Longdrinkglas, bis oben mit Eiswürfeln, 4 dünne Gurkenscheiben im Glas. Das Getränk ist klar und perlt leicht. Im unscharfen Hintergrund eine Schale Sommersalat.
Flasche: Neben dem Getränk steht scharf die Flasche in der Form von Anhang 1 (ohne deren Etikett). Das Etikett aus Anhang 2 unverändert übernehmen, nicht neu zeichnen oder schreiben, kein Buchstabe anders: Es legt sich wie ein echtes Etikett um die halbe Flasche, Rundung sichtbar, Ränder laufen seitlich weg, Text mittig, frontal, lesbar.
Farbe des Brandes in der Flasche: klar wie Wasser.
Negativ: verändertes oder neu geschriebenes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Etikett im Bild mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Adresse, Grafik).
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“
- Bleibt der Text falsch: Bild ohne Text nehmen und das Etikett später im Bildeditor einsetzen.

---

## 3. Hierber Rum

- **Serviervorschlag:** Rum und Ginger mit Limette (Auf Eis / Longdrink), Nr. 2 von 4 auf der Sortenseite
- **Ergebnis speichern als:** `fotos-ki/rum-1.png`
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Rum nei-01.png`
- **Prompt:** 165 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Rum und Ginger im Longdrinkglas, viel Eis, eine ausgedrückte Limettenspalte im Glas. Das Getränk ist helles Goldbernstein und perlt leicht, etwas heller als pur. Im unscharfen Hintergrund ein Burger auf einem Holzbrett.
Flasche: Neben dem Getränk steht scharf die Flasche in der Form von Anhang 1 (ohne deren Etikett). Das Etikett aus Anhang 2 unverändert übernehmen, nicht neu zeichnen oder schreiben, kein Buchstabe anders: Es legt sich wie ein echtes Etikett um die halbe Flasche, Rundung sichtbar, Ränder laufen seitlich weg, Text mittig, frontal, lesbar.
Farbe des Brandes in der Flasche: goldenes Bernstein.
Negativ: verändertes oder neu geschriebenes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Etikett im Bild mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Adresse, Grafik).
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“
- Bleibt der Text falsch: Bild ohne Text nehmen und das Etikett später im Bildeditor einsetzen.

---

## 4. Hierber Rum Orange

- **Serviervorschlag:** Rum Orange-Highball (Auf Eis / Longdrink), Nr. 2 von 4 auf der Sortenseite
- **Ergebnis speichern als:** `fotos-ki/rum-orange-1.png`
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Rum orange nei-01.png`
- **Prompt:** 157 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Rum-Orange-Highball im Highballglas, viel Eis, eine frische Orangenscheibe im Glas. Das Getränk ist orange-bernsteinfarben und perlt leicht von Sodawasser. Daneben unscharf ein paar Käsegebäck-Stangen.
Flasche: Neben dem Getränk steht scharf die Flasche in der Form von Anhang 1 (ohne deren Etikett). Das Etikett aus Anhang 2 unverändert übernehmen, nicht neu zeichnen oder schreiben, kein Buchstabe anders: Es legt sich wie ein echtes Etikett um die halbe Flasche, Rundung sichtbar, Ränder laufen seitlich weg, Text mittig, frontal, lesbar.
Farbe des Brandes in der Flasche: orange-bernsteinfarben.
Negativ: verändertes oder neu geschriebenes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Etikett im Bild mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Adresse, Grafik).
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“
- Bleibt der Text falsch: Bild ohne Text nehmen und das Etikett später im Bildeditor einsetzen.
- Flüssigkeitsfarbe der Flasche ist in den Daten nur geschätzt (fluessigkeit.js: #c67a1c); mit dem echten Produkt abgleichen.

---

## 5. Hierber Whisky

- **Serviervorschlag:** Old Fashioned (Cocktail), Nr. 3 von 5 auf der Sortenseite
- **Ergebnis speichern als:** `fotos-ki/whisky-1.png`
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Whisky 0,5L nei 4-01.png`
- **Prompt:** 159 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Old Fashioned im Tumbler mit einem einzigen großen klaren Eiswürfel, der Whisky bernsteinfarben, ein Streifen Orangenschale liegt im Glas. Daneben ein paar Walnüsse auf dem Eichentisch.
Flasche: Neben dem Getränk steht scharf die Flasche in der Form von Anhang 1 (ohne deren Etikett). Das Etikett aus Anhang 2 unverändert übernehmen, nicht neu zeichnen oder schreiben, kein Buchstabe anders: Es legt sich wie ein echtes Etikett um die halbe Flasche, Rundung sichtbar, Ränder laufen seitlich weg, Text mittig, frontal, lesbar.
Farbe des Brandes in der Flasche: Bernstein.
Negativ: verändertes oder neu geschriebenes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Etikett im Bild mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Adresse, Grafik).
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“
- Bleibt der Text falsch: Bild ohne Text nehmen und das Etikett später im Bildeditor einsetzen.

---

## 6. Kirsch

- **Serviervorschlag:** Kirsch-Sour (Cocktail), Nr. 3 von 5 auf der Sortenseite
- **Ergebnis speichern als:** `fotos-ki/kirsch-1.png`
- **Anhang 1 (echtes Foto der Kirsch-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-kirsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Kirsch-01.png`
- **Prompt:** 161 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Kirsch-Sour im Tumbler auf frischem Eis, das Getränk hell und leicht trüb, ohne Schaum, ein Streifen Zitronenschale am Glasrand. Daneben ein paar frische Kirschen mit Stiel.
Flasche: Neben dem Getränk steht scharf die Flasche in der Form von Anhang 1 (ohne deren Etikett). Das Etikett aus Anhang 2 unverändert übernehmen, nicht neu zeichnen oder schreiben, kein Buchstabe anders: Es legt sich wie ein echtes Etikett um die halbe Flasche, Rundung sichtbar, Ränder laufen seitlich weg, Text mittig, frontal, lesbar.
Farbe des Brandes in der Flasche: klar wie Wasser.
Negativ: verändertes oder neu geschriebenes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Etikett im Bild mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Adresse, Grafik).
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“
- Bleibt der Text falsch: Bild ohne Text nehmen und das Etikett später im Bildeditor einsetzen.
- Anhang 1 ist das echte Flaschenfoto der Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 7. Framboise

- **Serviervorschlag:** Framboise-Spritz mit Crémant (Cocktail), Nr. 3 von 4 auf der Sortenseite
- **Ergebnis speichern als:** `fotos-ki/framboise-1.png`
- **Anhang 1 (echtes Foto der Framboise-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-framboise.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Framboise-01.png`
- **Prompt:** 160 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Framboise-Spritz im großen Weinglas auf viel Eis, das Getränk fast klar und perlend, höchstens ein zarter Rosahauch, frische Himbeeren im Glas und ein paar daneben.
Flasche: Neben dem Getränk steht scharf die Flasche in der Form von Anhang 1 (ohne deren Etikett). Das Etikett aus Anhang 2 unverändert übernehmen, nicht neu zeichnen oder schreiben, kein Buchstabe anders: Es legt sich wie ein echtes Etikett um die halbe Flasche, Rundung sichtbar, Ränder laufen seitlich weg, Text mittig, frontal, lesbar.
Farbe des Brandes in der Flasche: klar wie Wasser.
Negativ: verändertes oder neu geschriebenes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Etikett im Bild mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Adresse, Grafik).
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“
- Bleibt der Text falsch: Bild ohne Text nehmen und das Etikett später im Bildeditor einsetzen.
- Anhang 1 ist das echte Flaschenfoto der Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 8. Quetsch

- **Serviervorschlag:** Quetsch-Sour (Cocktail), Nr. 2 von 5 auf der Sortenseite
- **Ergebnis speichern als:** `fotos-ki/quetsch-1.png`
- **Anhang 1 (echtes Foto der Quetsch-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-quetsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Quetsch-01.png`
- **Prompt:** 160 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Quetsch-Sour im Tumbler auf frischem Eis, das Getränk hell und leicht trüb, ohne Schaum, ein Streifen Zitronenschale am Glasrand. Daneben ein paar frische dunkelblaue Zwetschgen.
Flasche: Neben dem Getränk steht scharf die Flasche in der Form von Anhang 1 (ohne deren Etikett). Das Etikett aus Anhang 2 unverändert übernehmen, nicht neu zeichnen oder schreiben, kein Buchstabe anders: Es legt sich wie ein echtes Etikett um die halbe Flasche, Rundung sichtbar, Ränder laufen seitlich weg, Text mittig, frontal, lesbar.
Farbe des Brandes in der Flasche: klar wie Wasser.
Negativ: verändertes oder neu geschriebenes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Etikett im Bild mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Adresse, Grafik).
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“
- Bleibt der Text falsch: Bild ohne Text nehmen und das Etikett später im Bildeditor einsetzen.
- Anhang 1 ist das echte Flaschenfoto der Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 9. Poire Williams

- **Serviervorschlag:** Poire Williams Fizz (Cocktail), Nr. 2 von 4 auf der Sortenseite
- **Ergebnis speichern als:** `fotos-ki/poire-williams-1.png`
- **Anhang 1 (echtes Foto der Poire Williams-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-poire-williams.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Williams-01.png`
- **Prompt:** 160 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Poire Williams Fizz im Longdrinkglas auf frischem Eis, das Getränk hell, leicht trüb und perlend, ohne Garnitur im Glas. Daneben eine reife Birne mit Stiel.
Flasche: Neben dem Getränk steht scharf die Flasche in der Form von Anhang 1 (ohne deren Etikett). Das Etikett aus Anhang 2 unverändert übernehmen, nicht neu zeichnen oder schreiben, kein Buchstabe anders: Es legt sich wie ein echtes Etikett um die halbe Flasche, Rundung sichtbar, Ränder laufen seitlich weg, Text mittig, frontal, lesbar.
Farbe des Brandes in der Flasche: klar wie Wasser.
Negativ: verändertes oder neu geschriebenes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Etikett im Bild mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Adresse, Grafik).
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“
- Bleibt der Text falsch: Bild ohne Text nehmen und das Etikett später im Bildeditor einsetzen.
- Anhang 1 ist das echte Flaschenfoto der Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 10. Mirabelle

- **Serviervorschlag:** Mirabelle-Tonic mit Thymian (Auf Eis / Longdrink), Nr. 2 von 5 auf der Sortenseite
- **Ergebnis speichern als:** `fotos-ki/mirabelle-1.png`
- **Anhang 1 (echtes Foto der Mirabelle-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-mirabelle.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Mirabelle-01.png`
- **Prompt:** 159 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Mirabelle-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, ein frischer Thymianzweig steckt im Glas. Das Getränk ist klar und perlt leicht. Daneben frische gelbe Mirabellen.
Flasche: Neben dem Getränk steht scharf die Flasche in der Form von Anhang 1 (ohne deren Etikett). Das Etikett aus Anhang 2 unverändert übernehmen, nicht neu zeichnen oder schreiben, kein Buchstabe anders: Es legt sich wie ein echtes Etikett um die halbe Flasche, Rundung sichtbar, Ränder laufen seitlich weg, Text mittig, frontal, lesbar.
Farbe des Brandes in der Flasche: klar wie Wasser.
Negativ: verändertes oder neu geschriebenes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Etikett im Bild mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Adresse, Grafik).
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“
- Bleibt der Text falsch: Bild ohne Text nehmen und das Etikett später im Bildeditor einsetzen.
- Anhang 1 ist das echte Flaschenfoto der Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 11. Hierber aale Fruucht

- **Serviervorschlag:** Hierber aale Fruucht auf einem großen Eiswürfel (Auf Eis / Longdrink), Nr. 2 von 4 auf der Sortenseite
- **Ergebnis speichern als:** `fotos-ki/hierber-fruucht-1.png`
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Fruucht-01.png`
- **Prompt:** 158 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Hierber aale Fruucht im Tumbler auf einem einzigen großen klaren Eiswürfel, das Getränk warm bernsteinfarben. Daneben ein Stück dunkle Schokolade und ein paar Walnüsse.
Flasche: Neben dem Getränk steht scharf die Flasche in der Form von Anhang 1 (ohne deren Etikett). Das Etikett aus Anhang 2 unverändert übernehmen, nicht neu zeichnen oder schreiben, kein Buchstabe anders: Es legt sich wie ein echtes Etikett um die halbe Flasche, Rundung sichtbar, Ränder laufen seitlich weg, Text mittig, frontal, lesbar.
Farbe des Brandes in der Flasche: warmes, kräftiges Bernstein.
Negativ: verändertes oder neu geschriebenes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Etikett im Bild mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Adresse, Grafik).
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“
- Bleibt der Text falsch: Bild ohne Text nehmen und das Etikett später im Bildeditor einsetzen.

---

## 12. Vieux Marc

- **Serviervorschlag:** Espresso mit Vieux Marc (Zum Essen), Nr. 2 von 4 auf der Sortenseite
- **Ergebnis speichern als:** `fotos-ki/vieux-marc-1.png`
- **Anhang 1 (Karaffe: die dunkle Vieux-Marc-Karaffe vorn links im Foto (nur die Karaffe beachten)):** `fotos/flaschenreihe-theke.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Vieux marc-01.png`
- **Prompt:** 166 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Eine kleine Espressotasse mit frischem Espresso und Crema auf einer Untertasse, daneben ein kleines Glas Vieux Marc, kräftig bernsteinfarben, und zwei Mandelkekse. Kein Eis.
Flasche: Neben dem Getränk steht scharf die Flasche (Karaffe) in der Form von Anhang 1 (ohne deren Etikett). Das Etikett aus Anhang 2 unverändert übernehmen, nicht neu zeichnen oder schreiben, kein Buchstabe anders: Es legt sich wie ein echtes Etikett um die halbe Flasche, Rundung sichtbar, Ränder laufen seitlich weg, Text mittig, frontal, lesbar.
Farbe des Brandes in der Flasche: kräftiges Bernstein (die Karaffe selbst aus sehr dunklem, braunem Glas).
Negativ: verändertes oder neu geschriebenes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Etikett im Bild mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Adresse, Grafik).
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“
- Bleibt der Text falsch: Bild ohne Text nehmen und das Etikett später im Bildeditor einsetzen.
- Anhang 1 ist ein Gruppenfoto: nur die dunkle Karaffe vorn links als Formvorlage nutzen, deren Etikett nicht übernehmen.
- Im Rezept steht „Vieux Marc direkt in die Tasse geben oder separat dazu reichen“; im Bild steht der Vieux Marc separat im kleinen Glas, damit die Farbe sichtbar ist.

---

## 13. Vieille Prune

- **Serviervorschlag:** Vieille Prune auf einem großen Eiswürfel (Auf Eis / Longdrink), Nr. 2 von 4 auf der Sortenseite
- **Ergebnis speichern als:** `fotos-ki/vieille-prune-1.png`
- **Anhang 1 (echtes Foto der Vieille Prune-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-vieille-prune.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Vieille prune-01.png`
- **Prompt:** 154 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Vieille Prune im Tumbler auf einem einzigen großen klaren Eiswürfel, das Getränk blass goldfarben. Daneben ein paar Walnüsse und frische Zwetschgen.
Flasche: Neben dem Getränk steht scharf die Flasche in der Form von Anhang 1 (ohne deren Etikett). Das Etikett aus Anhang 2 unverändert übernehmen, nicht neu zeichnen oder schreiben, kein Buchstabe anders: Es legt sich wie ein echtes Etikett um die halbe Flasche, Rundung sichtbar, Ränder laufen seitlich weg, Text mittig, frontal, lesbar.
Farbe des Brandes in der Flasche: blasses Gold.
Negativ: verändertes oder neu geschriebenes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Etikett im Bild mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Adresse, Grafik).
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“
- Bleibt der Text falsch: Bild ohne Text nehmen und das Etikett später im Bildeditor einsetzen.
- Anhang 1 ist das echte Flaschenfoto der Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 14. Vieille Pomme

- **Serviervorschlag:** Vieille Pomme mit Ginger Beer (Auf Eis / Longdrink), Nr. 2 von 4 auf der Sortenseite
- **Ergebnis speichern als:** `fotos-ki/vieille-pomme-1.png`
- **Anhang 1 (echtes Foto der Vieille Pomme-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-vieille-pomme.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Vieille pomme-01.png`
- **Prompt:** 157 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Vieille Pomme mit Ginger Beer im Longdrinkglas auf viel Eis, das Getränk blass goldgelb und perlend, eine Limettenspalte am Glasrand. Daneben ein halber Apfel.
Flasche: Neben dem Getränk steht scharf die Flasche in der Form von Anhang 1 (ohne deren Etikett). Das Etikett aus Anhang 2 unverändert übernehmen, nicht neu zeichnen oder schreiben, kein Buchstabe anders: Es legt sich wie ein echtes Etikett um die halbe Flasche, Rundung sichtbar, Ränder laufen seitlich weg, Text mittig, frontal, lesbar.
Farbe des Brandes in der Flasche: blass strohfarben.
Negativ: verändertes oder neu geschriebenes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Etikett im Bild mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Adresse, Grafik).
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“
- Bleibt der Text falsch: Bild ohne Text nehmen und das Etikett später im Bildeditor einsetzen.
- Anhang 1 ist das echte Flaschenfoto der Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 15. Hunnegdrëpp

- **Serviervorschlag:** Hunnegdrëpp-Sour (Cocktail), Nr. 3 von 5 auf der Sortenseite
- **Ergebnis speichern als:** `fotos-ki/hunnegdrepp-1.png`
- **Anhang 1 (echtes Foto der Hunnegdrëpp-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-hunnegdrepp.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Hunnegdrepp-01.png`
- **Prompt:** 158 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Hunnegdrëpp-Sour im Tumbler auf frischem Eis, das Getränk honiggolden und leicht trüb, ohne Schaum, ein Streifen Zitronenschale am Glasrand. Daneben ein kleines Schälchen Honig.
Flasche: Neben dem Getränk steht scharf die Flasche in der Form von Anhang 1 (ohne deren Etikett). Das Etikett aus Anhang 2 unverändert übernehmen, nicht neu zeichnen oder schreiben, kein Buchstabe anders: Es legt sich wie ein echtes Etikett um die halbe Flasche, Rundung sichtbar, Ränder laufen seitlich weg, Text mittig, frontal, lesbar.
Farbe des Brandes in der Flasche: tiefes Honiggold.
Negativ: verändertes oder neu geschriebenes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Etikett im Bild mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Adresse, Grafik).
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“
- Bleibt der Text falsch: Bild ohne Text nehmen und das Etikett später im Bildeditor einsetzen.
- Anhang 1 ist das echte Flaschenfoto der Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 16. Hierber Hunneg Whisky

- **Serviervorschlag:** Hunneg Whisky-Highball (Auf Eis / Longdrink), Nr. 3 von 4 auf der Sortenseite
- **Ergebnis speichern als:** `fotos-ki/hunneg-whisky-1.png`
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Whisky 0,5L Hunneg-01.png`
- **Prompt:** 159 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Highballglas mit Eis, Hunneg Whisky und Ginger Ale, das Getränk goldgelb bis bernsteinfarben und leicht perlend, ein Streifen Orangenschale im Glas. Im unscharfen Hintergrund Käsegebäck.
Flasche: Neben dem Getränk steht scharf die Flasche in der Form von Anhang 1 (ohne deren Etikett). Das Etikett aus Anhang 2 unverändert übernehmen, nicht neu zeichnen oder schreiben, kein Buchstabe anders: Es legt sich wie ein echtes Etikett um die halbe Flasche, Rundung sichtbar, Ränder laufen seitlich weg, Text mittig, frontal, lesbar.
Farbe des Brandes in der Flasche: warmes Goldbernstein.
Negativ: verändertes oder neu geschriebenes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Etikett im Bild mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Adresse, Grafik).
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“
- Bleibt der Text falsch: Bild ohne Text nehmen und das Etikett später im Bildeditor einsetzen.
- Flüssigkeitsfarbe der Flasche ist in den Daten nur geschätzt (fluessigkeit.js: #c4912e); mit dem echten Produkt abgleichen.

---

## 17. Kräiderdrëpp

- **Serviervorschlag:** Kräiderdrëpp-Tonic mit Gurkenscheiben (Auf Eis / Longdrink), Nr. 2 von 4 auf der Sortenseite
- **Ergebnis speichern als:** `fotos-ki/kraeiderdrepp-1.png`
- **Anhang 1 (echtes Foto der Kräiderdrëpp-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-kraeiderdrepp.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Kraider-01.png`
- **Prompt:** 159 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Kräiderdrëpp-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, 4 dünne Gurkenscheiben im Glas. Das Getränk ist klar und perlt leicht. Daneben ein paar frische Kräuterzweige.
Flasche: Neben dem Getränk steht scharf die Flasche in der Form von Anhang 1 (ohne deren Etikett). Das Etikett aus Anhang 2 unverändert übernehmen, nicht neu zeichnen oder schreiben, kein Buchstabe anders: Es legt sich wie ein echtes Etikett um die halbe Flasche, Rundung sichtbar, Ränder laufen seitlich weg, Text mittig, frontal, lesbar.
Farbe des Brandes in der Flasche: klar wie Wasser.
Negativ: verändertes oder neu geschriebenes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Etikett im Bild mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Adresse, Grafik).
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“
- Bleibt der Text falsch: Bild ohne Text nehmen und das Etikett später im Bildeditor einsetzen.
- Anhang 1 ist das echte Flaschenfoto der Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 18. Kürbisdrëpp

- **Serviervorschlag:** Kürbissuppe mit einem Schuss Kürbisdrëpp (In der Küche / Dessert), Nr. 3 von 4 auf der Sortenseite
- **Ergebnis speichern als:** `fotos-ki/kuerbisdrepp-1.png`
- **Anhang 1 (schlanke 0,5-L-Flasche (Foto der Kirsch-Flasche, dieselbe Form; deren Etikett nicht übernehmen)):** `Fotos/flasche-kirsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Kürbisdrepp-01.png`
- **Prompt:** 157 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein tiefer Suppenteller mit orangefarbener, cremiger Kürbissuppe, eine Spirale Sahne, geröstete Kürbiskerne obenauf. Daneben eine Scheibe Kürbiskernbrot. Dampf nur ganz dezent, kein Eis.
Flasche: Neben dem Getränk steht scharf die Flasche in der Form von Anhang 1 (ohne deren Etikett). Das Etikett aus Anhang 2 unverändert übernehmen, nicht neu zeichnen oder schreiben, kein Buchstabe anders: Es legt sich wie ein echtes Etikett um die halbe Flasche, Rundung sichtbar, Ränder laufen seitlich weg, Text mittig, frontal, lesbar.
Farbe des Brandes in der Flasche: klar wie Wasser.
Negativ: verändertes oder neu geschriebenes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Etikett im Bild mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Adresse, Grafik).
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“
- Bleibt der Text falsch: Bild ohne Text nehmen und das Etikett später im Bildeditor einsetzen.

---

## 19. Grain

- **Serviervorschlag:** Grain mit Apfelsaft auf Eis (Auf Eis / Longdrink), Nr. 2 von 3 auf der Sortenseite
- **Ergebnis speichern als:** `fotos-ki/grain-1.png`
- **Anhang 1 (schlanke 0,5-L-Flasche (Foto der Kirsch-Flasche, dieselbe Form; deren Etikett nicht übernehmen)):** `Fotos/flasche-kirsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Grain-01.png`
- **Prompt:** 157 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Grain mit Apfelsaft im Longdrinkglas auf viel Eis, das Getränk naturtrüb goldgelb, eine Apfelscheibe am Glasrand. Im unscharfen Hintergrund ein Brett mit Bauernbrot.
Flasche: Neben dem Getränk steht scharf die Flasche in der Form von Anhang 1 (ohne deren Etikett). Das Etikett aus Anhang 2 unverändert übernehmen, nicht neu zeichnen oder schreiben, kein Buchstabe anders: Es legt sich wie ein echtes Etikett um die halbe Flasche, Rundung sichtbar, Ränder laufen seitlich weg, Text mittig, frontal, lesbar.
Farbe des Brandes in der Flasche: klar wie Wasser.
Negativ: verändertes oder neu geschriebenes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Etikett im Bild mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Adresse, Grafik).
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“
- Bleibt der Text falsch: Bild ohne Text nehmen und das Etikett später im Bildeditor einsetzen.

---

## 20. Hondsaarsch

- **Serviervorschlag:** Hondsaarsch-Tonic mit Orangenschale (Auf Eis / Longdrink), Nr. 2 von 4 auf der Sortenseite
- **Ergebnis speichern als:** `fotos-ki/hondsaarsch-1.png`
- **Anhang 1 (schlanke 0,5-L-Flasche (Foto der Kirsch-Flasche, dieselbe Form; deren Etikett nicht übernehmen)):** `Fotos/flasche-kirsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Hondsaarsch-01.png`
- **Prompt:** 160 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Hondsaarsch-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, ein Streifen Orangenschale im Glas. Das Getränk ist klar und perlt leicht. Im unscharfen Hintergrund ein heller Salat.
Flasche: Neben dem Getränk steht scharf die Flasche in der Form von Anhang 1 (ohne deren Etikett). Das Etikett aus Anhang 2 unverändert übernehmen, nicht neu zeichnen oder schreiben, kein Buchstabe anders: Es legt sich wie ein echtes Etikett um die halbe Flasche, Rundung sichtbar, Ränder laufen seitlich weg, Text mittig, frontal, lesbar.
Farbe des Brandes in der Flasche: klar wie Wasser.
Negativ: verändertes oder neu geschriebenes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Etikett im Bild mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Adresse, Grafik).
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“
- Bleibt der Text falsch: Bild ohne Text nehmen und das Etikett später im Bildeditor einsetzen.

---

## 21. Kiwibeeren

- **Serviervorschlag:** Kiwibeeren-Spritz mit Crémant (Cocktail), Nr. 3 von 4 auf der Sortenseite
- **Ergebnis speichern als:** `fotos-ki/kiwibeeren-1.png`
- **Anhang 1 (echtes Foto der Kiwibeeren-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-kiwibeeren.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Kiwi-01.png`
- **Prompt:** 159 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Kiwibeeren-Spritz im großen Weinglas auf viel Eis, das Getränk fast klar und perlend, eine Limettenscheibe im Glas. Daneben ein paar kleine, glatte grüne Kiwibeeren.
Flasche: Neben dem Getränk steht scharf die Flasche in der Form von Anhang 1 (ohne deren Etikett). Das Etikett aus Anhang 2 unverändert übernehmen, nicht neu zeichnen oder schreiben, kein Buchstabe anders: Es legt sich wie ein echtes Etikett um die halbe Flasche, Rundung sichtbar, Ränder laufen seitlich weg, Text mittig, frontal, lesbar.
Farbe des Brandes in der Flasche: klar wie Wasser.
Negativ: verändertes oder neu geschriebenes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Etikett im Bild mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Adresse, Grafik).
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“
- Bleibt der Text falsch: Bild ohne Text nehmen und das Etikett später im Bildeditor einsetzen.
- Anhang 1 ist das echte Flaschenfoto der Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 22. Poire

- **Serviervorschlag:** Poire mit Ginger Beer (Auf Eis / Longdrink), Nr. 2 von 4 auf der Sortenseite
- **Ergebnis speichern als:** `fotos-ki/poire-1.png`
- **Anhang 1 (echtes Foto der Poire-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-poire.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Poire-01.png`
- **Prompt:** 157 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Poire mit Ginger Beer im Longdrinkglas auf viel Eis, das Getränk blass goldgelb und perlend, eine Limettenspalte am Glasrand. Daneben eine reife Birne.
Flasche: Neben dem Getränk steht scharf die Flasche in der Form von Anhang 1 (ohne deren Etikett). Das Etikett aus Anhang 2 unverändert übernehmen, nicht neu zeichnen oder schreiben, kein Buchstabe anders: Es legt sich wie ein echtes Etikett um die halbe Flasche, Rundung sichtbar, Ränder laufen seitlich weg, Text mittig, frontal, lesbar.
Farbe des Brandes in der Flasche: klar wie Wasser.
Negativ: verändertes oder neu geschriebenes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Etikett im Bild mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Adresse, Grafik).
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“
- Bleibt der Text falsch: Bild ohne Text nehmen und das Etikett später im Bildeditor einsetzen.
- Anhang 1 ist das echte Flaschenfoto der Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 23. Neelchesbiren

- **Serviervorschlag:** Neelchesbiren-Tonic mit Zitronenschale (Auf Eis / Longdrink), Nr. 2 von 4 auf der Sortenseite
- **Ergebnis speichern als:** `fotos-ki/neelchesbiren-1.png`
- **Anhang 1 (echtes Foto der Neelchesbiren-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-neelchesbiren.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Nelchensbiren-01.png`
- **Prompt:** 155 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Neelchesbiren-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, ein Streifen Zitronenschale im Glas. Das Getränk ist blass strohfarben und perlt leicht.
Flasche: Neben dem Getränk steht scharf die Flasche in der Form von Anhang 1 (ohne deren Etikett). Das Etikett aus Anhang 2 unverändert übernehmen, nicht neu zeichnen oder schreiben, kein Buchstabe anders: Es legt sich wie ein echtes Etikett um die halbe Flasche, Rundung sichtbar, Ränder laufen seitlich weg, Text mittig, frontal, lesbar.
Farbe des Brandes in der Flasche: klar wie Wasser.
Negativ: verändertes oder neu geschriebenes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Etikett im Bild mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Adresse, Grafik).
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“
- Bleibt der Text falsch: Bild ohne Text nehmen und das Etikett später im Bildeditor einsetzen.
- Anhang 1 ist das echte Flaschenfoto der Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 24. Lënschouren

- **Serviervorschlag:** Lënschouren über Vanilleeis (In der Küche / Dessert), Nr. 3 von 4 auf der Sortenseite
- **Ergebnis speichern als:** `fotos-ki/lenschouren-1.png`
- **Anhang 1 (echtes Foto der Lënschouren-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-lenschouren.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Lenschouren-01.png`
- **Prompt:** 155 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Eine gekühlte Dessertschale mit 2 bis 3 Kugeln Vanilleeis, leicht angeschmolzen, darüber gehackte Nüsse. Daneben unscharf eine Tasse Espresso. Kein Longdrink.
Flasche: Neben dem Getränk steht scharf die Flasche in der Form von Anhang 1 (ohne deren Etikett). Das Etikett aus Anhang 2 unverändert übernehmen, nicht neu zeichnen oder schreiben, kein Buchstabe anders: Es legt sich wie ein echtes Etikett um die halbe Flasche, Rundung sichtbar, Ränder laufen seitlich weg, Text mittig, frontal, lesbar.
Farbe des Brandes in der Flasche: klar wie Wasser.
Negativ: verändertes oder neu geschriebenes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Etikett im Bild mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Adresse, Grafik).
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“
- Bleibt der Text falsch: Bild ohne Text nehmen und das Etikett später im Bildeditor einsetzen.
- Anhang 1 ist das echte Flaschenfoto der Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 25. Vullekiischt

- **Serviervorschlag:** Vullekiischt-Tonic mit Zitronenschale (Auf Eis / Longdrink), Nr. 2 von 4 auf der Sortenseite
- **Ergebnis speichern als:** `fotos-ki/vullekiischt-1.png`
- **Anhang 1 (schlanke 0,5-L-Flasche (Foto der Kirsch-Flasche, dieselbe Form; deren Etikett nicht übernehmen)):** `Fotos/flasche-kirsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Vogelbeere-01.png`
- **Prompt:** 160 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Vullekiischt-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, ein Streifen Zitronenschale im Glas. Das Getränk ist klar und perlt leicht. Daneben ein kleiner Zweig roter Vogelbeeren.
Flasche: Neben dem Getränk steht scharf die Flasche in der Form von Anhang 1 (ohne deren Etikett). Das Etikett aus Anhang 2 unverändert übernehmen, nicht neu zeichnen oder schreiben, kein Buchstabe anders: Es legt sich wie ein echtes Etikett um die halbe Flasche, Rundung sichtbar, Ränder laufen seitlich weg, Text mittig, frontal, lesbar.
Farbe des Brandes in der Flasche: klar wie Wasser.
Negativ: verändertes oder neu geschriebenes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Etikett im Bild mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Adresse, Grafik).
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“
- Bleibt der Text falsch: Bild ohne Text nehmen und das Etikett später im Bildeditor einsetzen.

---

## 26. Schléiwen

- **Serviervorschlag:** Schléiwen-Sour (Cocktail), Nr. 2 von 4 auf der Sortenseite
- **Ergebnis speichern als:** `fotos-ki/schleiwen-1.png`
- **Anhang 1 (echtes Foto der Schléiwen-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-schleiwen.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Schleiwen-01.png`
- **Prompt:** 159 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Schléiwen-Sour im Tumbler auf frischem Eis, das Getränk hell und leicht trüb, ohne Schaum, ein Streifen Zitronenschale am Glasrand. Daneben ein paar blauschwarze Schlehen.
Flasche: Neben dem Getränk steht scharf die Flasche in der Form von Anhang 1 (ohne deren Etikett). Das Etikett aus Anhang 2 unverändert übernehmen, nicht neu zeichnen oder schreiben, kein Buchstabe anders: Es legt sich wie ein echtes Etikett um die halbe Flasche, Rundung sichtbar, Ränder laufen seitlich weg, Text mittig, frontal, lesbar.
Farbe des Brandes in der Flasche: klar wie Wasser.
Negativ: verändertes oder neu geschriebenes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Etikett im Bild mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Adresse, Grafik).
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“
- Bleibt der Text falsch: Bild ohne Text nehmen und das Etikett später im Bildeditor einsetzen.
- Anhang 1 ist das echte Flaschenfoto der Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 27. Vizdrëpp

- **Serviervorschlag:** Vizdrëpp-Tonic mit Apfelscheiben (Auf Eis / Longdrink), Nr. 2 von 5 auf der Sortenseite
- **Ergebnis speichern als:** `fotos-ki/vizdrepp-1.png`
- **Anhang 1 (echtes Foto der Vizdrëpp-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-vizdrepp.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Vizdrepp 0,5l_Zeichenfläche 1.png`
- **Prompt:** 156 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Vizdrëpp-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, 3 dünne Apfelscheiben im Glas. Das Getränk ist sehr hell, blass goldgelb schimmernd und perlend.
Flasche: Neben dem Getränk steht scharf die Flasche in der Form von Anhang 1 (ohne deren Etikett). Das Etikett aus Anhang 2 unverändert übernehmen, nicht neu zeichnen oder schreiben, kein Buchstabe anders: Es legt sich wie ein echtes Etikett um die halbe Flasche, Rundung sichtbar, Ränder laufen seitlich weg, Text mittig, frontal, lesbar.
Farbe des Brandes in der Flasche: blasses Goldgelb.
Negativ: verändertes oder neu geschriebenes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Etikett im Bild mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Adresse, Grafik).
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“
- Bleibt der Text falsch: Bild ohne Text nehmen und das Etikett später im Bildeditor einsetzen.
- Anhang 1 ist das echte Flaschenfoto der Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 28. Hierber Sambuca

- **Serviervorschlag:** Sambuca mit Kaffeebohnen (Pur), Nr. 1 von 4 auf der Sortenseite
- **Ergebnis speichern als:** `fotos-ki/sambuca-1.png`
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Sambuca_Zeichenfläche 1.png`
- **Prompt:** 152 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein kleines Likörglas mit klarem Sambuca, 3 Kaffeebohnen darin. Daneben eine Tasse Espresso und ein Mandelgebäck. Kein Eis.
Flasche: Neben dem Getränk steht scharf die Flasche in der Form von Anhang 1 (ohne deren Etikett). Das Etikett aus Anhang 2 unverändert übernehmen, nicht neu zeichnen oder schreiben, kein Buchstabe anders: Es legt sich wie ein echtes Etikett um die halbe Flasche, Rundung sichtbar, Ränder laufen seitlich weg, Text mittig, frontal, lesbar.
Farbe des Brandes in der Flasche: klar wie Wasser.
Negativ: verändertes oder neu geschriebenes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Etikett im Bild mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Adresse, Grafik).
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“
- Bleibt der Text falsch: Bild ohne Text nehmen und das Etikett später im Bildeditor einsetzen.

---

## 29. Hierber Limoncello

- **Serviervorschlag:** Limoncello-Spritz mit Crémant (Cocktail), Nr. 2 von 4 auf der Sortenseite
- **Ergebnis speichern als:** `fotos-ki/limoncello-1.png`
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Limoncello-01.png`
- **Prompt:** 155 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Limoncello-Spritz im großen Weinglas auf viel Eis, das Getränk hellgelb und perlend, ein frischer Minzzweig im Glas. Daneben eine halbe Zitrone.
Flasche: Neben dem Getränk steht scharf die Flasche in der Form von Anhang 1 (ohne deren Etikett). Das Etikett aus Anhang 2 unverändert übernehmen, nicht neu zeichnen oder schreiben, kein Buchstabe anders: Es legt sich wie ein echtes Etikett um die halbe Flasche, Rundung sichtbar, Ränder laufen seitlich weg, Text mittig, frontal, lesbar.
Farbe des Brandes in der Flasche: leuchtendes Gelbgrün.
Negativ: verändertes oder neu geschriebenes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Etikett im Bild mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Adresse, Grafik).
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“
- Bleibt der Text falsch: Bild ohne Text nehmen und das Etikett später im Bildeditor einsetzen.

---

## Übersicht

| Sorte | Serviervorschlag | Dateiname | Anhang 1 | Anhang 2 |
|---|---|---|---|---|
| Hierber Gin | Gin-Tonic mit Apfel und Rosmarin | `fotos-ki/gin-1.png` | `fotos/flaschen-wodka.webp` | `Fertige Etiquetten/Branntwein Hierber Gin - Nei 1-01.png` |
| Hierber Wodka | Wodka-Tonic mit Gurkenscheiben | `fotos-ki/wodka-1.png` | `fotos/flaschen-wodka.webp` | `Fertige Etiquetten/Branntwein Wodka-01.png` |
| Hierber Rum | Rum und Ginger mit Limette | `fotos-ki/rum-1.png` | `fotos/flaschen-wodka.webp` | `Fertige Etiquetten/Branntwein Hierber Rum nei-01.png` |
| Hierber Rum Orange | Rum Orange-Highball | `fotos-ki/rum-orange-1.png` | `fotos/flaschen-wodka.webp` | `Fertige Etiquetten/Branntwein Hierber Rum orange nei-01.png` |
| Hierber Whisky | Old Fashioned | `fotos-ki/whisky-1.png` | `fotos/flaschen-wodka.webp` | `Fertige Etiquetten/Branntwein Whisky 0,5L nei 4-01.png` |
| Kirsch | Kirsch-Sour | `fotos-ki/kirsch-1.png` | `Fotos/flasche-kirsch.jpg` | `Fertige Etiquetten/Brandwein Kirsch-01.png` |
| Framboise | Framboise-Spritz mit Crémant | `fotos-ki/framboise-1.png` | `Fotos/flasche-framboise.jpg` | `Fertige Etiquetten/Brandwein Framboise-01.png` |
| Quetsch | Quetsch-Sour | `fotos-ki/quetsch-1.png` | `Fotos/flasche-quetsch.jpg` | `Fertige Etiquetten/Brandwein Quetsch-01.png` |
| Poire Williams | Poire Williams Fizz | `fotos-ki/poire-williams-1.png` | `Fotos/flasche-poire-williams.jpg` | `Fertige Etiquetten/Brandwein Williams-01.png` |
| Mirabelle | Mirabelle-Tonic mit Thymian | `fotos-ki/mirabelle-1.png` | `Fotos/flasche-mirabelle.jpg` | `Fertige Etiquetten/Brandwein Mirabelle-01.png` |
| Hierber aale Fruucht | Hierber aale Fruucht auf einem großen Eiswürfel | `fotos-ki/hierber-fruucht-1.png` | `fotos/flaschen-wodka.webp` | `Fertige Etiquetten/Branntwein Hierber Fruucht-01.png` |
| Vieux Marc | Espresso mit Vieux Marc | `fotos-ki/vieux-marc-1.png` | `fotos/flaschenreihe-theke.jpg` | `Fertige Etiquetten/Branntwein Vieux marc-01.png` |
| Vieille Prune | Vieille Prune auf einem großen Eiswürfel | `fotos-ki/vieille-prune-1.png` | `Fotos/flasche-vieille-prune.jpg` | `Fertige Etiquetten/Brandwein Vieille prune-01.png` |
| Vieille Pomme | Vieille Pomme mit Ginger Beer | `fotos-ki/vieille-pomme-1.png` | `Fotos/flasche-vieille-pomme.jpg` | `Fertige Etiquetten/Brandwein Vieille pomme-01.png` |
| Hunnegdrëpp | Hunnegdrëpp-Sour | `fotos-ki/hunnegdrepp-1.png` | `Fotos/flasche-hunnegdrepp.jpg` | `Fertige Etiquetten/Brandwein Hunnegdrepp-01.png` |
| Hierber Hunneg Whisky | Hunneg Whisky-Highball | `fotos-ki/hunneg-whisky-1.png` | `fotos/flaschen-wodka.webp` | `Fertige Etiquetten/Branntwein Whisky 0,5L Hunneg-01.png` |
| Kräiderdrëpp | Kräiderdrëpp-Tonic mit Gurkenscheiben | `fotos-ki/kraeiderdrepp-1.png` | `Fotos/flasche-kraeiderdrepp.jpg` | `Fertige Etiquetten/Brandwein Kraider-01.png` |
| Kürbisdrëpp | Kürbissuppe mit einem Schuss Kürbisdrëpp | `fotos-ki/kuerbisdrepp-1.png` | `Fotos/flasche-kirsch.jpg` | `Fertige Etiquetten/Brandwein Kürbisdrepp-01.png` |
| Grain | Grain mit Apfelsaft auf Eis | `fotos-ki/grain-1.png` | `Fotos/flasche-kirsch.jpg` | `Fertige Etiquetten/Branntwein Grain-01.png` |
| Hondsaarsch | Hondsaarsch-Tonic mit Orangenschale | `fotos-ki/hondsaarsch-1.png` | `Fotos/flasche-kirsch.jpg` | `Fertige Etiquetten/Brandwein Hondsaarsch-01.png` |
| Kiwibeeren | Kiwibeeren-Spritz mit Crémant | `fotos-ki/kiwibeeren-1.png` | `Fotos/flasche-kiwibeeren.jpg` | `Fertige Etiquetten/Branntwein Kiwi-01.png` |
| Poire | Poire mit Ginger Beer | `fotos-ki/poire-1.png` | `Fotos/flasche-poire.jpg` | `Fertige Etiquetten/Brandwein Poire-01.png` |
| Neelchesbiren | Neelchesbiren-Tonic mit Zitronenschale | `fotos-ki/neelchesbiren-1.png` | `Fotos/flasche-neelchesbiren.jpg` | `Fertige Etiquetten/Brandwein Nelchensbiren-01.png` |
| Lënschouren | Lënschouren über Vanilleeis | `fotos-ki/lenschouren-1.png` | `Fotos/flasche-lenschouren.jpg` | `Fertige Etiquetten/Brandwein Lenschouren-01.png` |
| Vullekiischt | Vullekiischt-Tonic mit Zitronenschale | `fotos-ki/vullekiischt-1.png` | `Fotos/flasche-kirsch.jpg` | `Fertige Etiquetten/Brandwein Vogelbeere-01.png` |
| Schléiwen | Schléiwen-Sour | `fotos-ki/schleiwen-1.png` | `Fotos/flasche-schleiwen.jpg` | `Fertige Etiquetten/Branntwein Schleiwen-01.png` |
| Vizdrëpp | Vizdrëpp-Tonic mit Apfelscheiben | `fotos-ki/vizdrepp-1.png` | `Fotos/flasche-vizdrepp.jpg` | `Fertige Etiquetten/Vizdrepp 0,5l_Zeichenfläche 1.png` |
| Hierber Sambuca | Sambuca mit Kaffeebohnen | `fotos-ki/sambuca-1.png` | `fotos/flaschen-wodka.webp` | `Fertige Etiquetten/Branntwein Sambuca_Zeichenfläche 1.png` |
| Hierber Limoncello | Limoncello-Spritz mit Crémant | `fotos-ki/limoncello-1.png` | `fotos/flaschen-wodka.webp` | `Fertige Etiquetten/Branntwein Limoncello-01.png` |
