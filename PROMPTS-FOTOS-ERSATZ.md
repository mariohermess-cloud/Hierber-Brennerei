# Ersatz-Prompts für fehlerhafte Erstbilder (ChatGPT)

Erzeugt mit `node tools/foto_prompts_weitere.mjs`. Nicht von Hand ändern.
Für **27 der 29** vorhandenen Hauptbilder (`fotos-ki/<sorten-id>-1.png`) nennt `TODO-INHALTE.md` (Abschnitt 6) echte Fehler: verfälschte Adresse, angeschnittenes oder erfundenes Etikett, fehlender Verschluss, abgeschnittene Flasche, falsche Zutaten, Gericht ohne Getränk. Hier stehen verbesserte Prompts mit denselben Verbesserungen wie in `PROMPTS-FOTOS-WEITERE.md`.
Das neue Bild **ersetzt** das vorhandene (gleicher Dateiname, Nutzer überschreibt die Datei). Welche Ersatzbilder schon ersetzt wurden, kann das Skript nicht sicher wissen; nur lenschouren ist laut Nutzer bereits durch ein neues Bild ersetzt (Status „ersetzt, bitte prüfen“). Nicht aufgeführt, weil ohne Befund: Hierber aale Fruucht, Grain.

Automatisch abarbeiten statt von Hand: `CHATGPT-STAPEL.md` (Hauptprompt, Stapeldateien `tools/chatgpt-stapel*.csv`).

## So geht es in 5 Schritten

1. **Neuen Chat öffnen** (ChatGPT mit Bildgenerierung). Pro Bild immer einen **neuen** Chat, sonst kippt der Stil.
2. **Anhänge:** Anhang 1 = Flaschenvorlage (Flaschenfoto der Sorte aus `Fotos/`, sonst Standardvorlage je Flaschentyp), Anhang 2 = flaches Etikett der Sorte (für alle 29 Sorten vorhanden); genaue Dateinamen stehen beim Bild.
3. **Prompt einfügen:** den Text im Kasten kopieren und mit den Anhängen absenden.
4. **Ergebnis prüfen** (Liste unter dem Kasten): Flasche vollständig, Etikett Wort für Wort, nur Rezept-Zutaten, Glas und Farbe.
5. **Speichern** als PNG, 4:3 (1448×1086 px wie bisher, andere 4:3-Größen sind ok), genau unter dem Dateinamen aus dem Abschnitt, in den Ordner `fotos-ki/`. Danach baut `node build.mjs` das Bild automatisch an die richtige Karte.

## Stilblock (gemeinsam für alle Bilder)

Derselbe Block wie in `PROMPTS-FOTOS.md`, damit alle Bilder zusammenpassen. Er steht in jedem Prompt vollständig drin.

```
Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
```

Feste Adresszeile des Etiketts (in allen Prompts mit Etikett): `2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu`

---

## 1. Hierber Gin: Gin-Tonic mit Apfel und Rosmarin

- **Sorte:** Hierber Gin
- **Karte auf der Sortenseite:** Nr. 1 von 4, „Gin-Tonic mit Apfel und Rosmarin“ (Auf Eis / Longdrink)
- **Ergebnis speichern als:** `fotos-ki/gin-1.png` (ersetzt das vorhandene Bild)
- **Status:** offen
- **Was am alten Bild falsch war:** Adresszeile verfälscht („L. Hallinger L-6831 Herborn, Tél. 72 7602“), Etikettenmuster weicht ab.
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Gin - Nei 1-01.png`
- **Prompt:** 194 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Gin-Tonic im großen Ballonglas, bis oben mit klaren Eiswürfeln, dazwischen 3 bis 4 dünne Apfelscheiben, ein frischer Rosmarinzweig steckt im Glas. Das Getränk ist klar und perlt leicht. Daneben unscharf ein kleiner Teller mit Ziegenkäse.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: flache, mattsilberne Metallkappe. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: flache, mattsilberne Metallkappe.
- Nur Rezept-Zutaten im Bild: Hierber Gin; Tonic Water, gut gekühlt; dünne Apfelscheiben; Rosmarin; Eiswürfel. Beilagen nur aus: Ziegenkäse, Meeresfrüchte, leichte Vorspeisen.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.

---

## 2. Hierber Wodka: Wodka-Tonic mit Gurkenscheiben

- **Sorte:** Hierber Wodka
- **Karte auf der Sortenseite:** Nr. 2 von 4, „Wodka-Tonic mit Gurkenscheiben“ (Auf Eis / Longdrink)
- **Ergebnis speichern als:** `fotos-ki/wodka-1.png` (ersetzt das vorhandene Bild)
- **Status:** offen
- **Was am alten Bild falsch war:** Etikett am unteren Rand angeschnitten („www.hierber-brennere…“), Adresse verfälscht („Z. Millewee L-6665 hoıxn“).
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Wodka-01.png`
- **Prompt:** 185 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Wodka-Tonic im hohen Longdrinkglas, bis oben mit Eiswürfeln, 4 dünne Gurkenscheiben im Glas. Das Getränk ist klar und perlt leicht. Im unscharfen Hintergrund eine Schale Sommersalat.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: flache, mattsilberne Metallkappe. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: flache, mattsilberne Metallkappe.
- Nur Rezept-Zutaten im Bild: Wodka; Tonic Water, gut gekühlt; Eiswürfel; Gurkenscheiben. Beilagen nur aus: Sommersalate, Sushi, leichte Vorspeisen.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.

---

## 3. Hierber Rum: Rum und Ginger mit Limette

- **Sorte:** Hierber Rum
- **Karte auf der Sortenseite:** Nr. 2 von 4, „Rum und Ginger mit Limette“ (Auf Eis / Longdrink)
- **Ergebnis speichern als:** `fotos-ki/rum-1.png` (ersetzt das vorhandene Bild)
- **Status:** offen
- **Was am alten Bild falsch war:** Etikett nur aus dem alten Produktfoto abgeleitet („1-6665“ statt „L-6665“, braunes Halsband fehlt, Etikett heller); das flache Etikett liegt jetzt vor.
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Rum nei-01.png`
- **Prompt:** 193 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Rum und Ginger im Longdrinkglas, viel Eis, eine ausgedrückte Limettenspalte im Glas. Das Getränk ist helles Goldbernstein und perlt leicht, etwas heller als pur. Im unscharfen Hintergrund ein Burger auf einem Holzbrett.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: flache dunkle Holzkappe, braunes Halsband am Flaschenhals. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: goldenes Bernstein.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: flache dunkle Holzkappe, braunes Halsband am Flaschenhals.
- Nur Rezept-Zutaten im Bild: Hierber Rum; Ginger Ale; Limettenspalte; Eiswürfel. Beilagen nur aus: Burger, Grillfleisch, Nachos.
- Das Etikett nennt 40 % vol., die Preisliste 43 %: den Wert des Etiketts nicht ändern, Brenner klärt (TODO-INHALTE.md, Abschnitt 1).
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.
- Verschluss laut Produktfoto in fotos/ (flaschen-*.webp); die Standardvorlage in Anhang 1 hat eine andere Kappe, der Verschluss kommt aus dem Prompt.

---

## 4. Hierber Rum Orange: Rum Orange-Highball

- **Sorte:** Hierber Rum Orange
- **Karte auf der Sortenseite:** Nr. 2 von 4, „Rum Orange-Highball“ (Auf Eis / Longdrink)
- **Ergebnis speichern als:** `fotos-ki/rum-orange-1.png` (ersetzt das vorhandene Bild)
- **Status:** offen
- **Was am alten Bild falsch war:** Erfundenes Etikett, nicht das echte (das echte hat Segelschiff, Weltkarte und Orangenhälfte mit Blättern); Orangenblätter und -hälften auf dem Tisch stehen nicht im Rezept. Das flache Etikett liegt jetzt vor.
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Rum orange nei-01.png`
- **Prompt:** 186 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Rum-Orange-Highball im Highballglas, viel Eis, eine frische Orangenscheibe im Glas. Das Getränk ist orange-bernsteinfarben und perlt leicht von Sodawasser. Daneben unscharf ein paar Käsegebäck-Stangen.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: flache dunkle Holzkappe wie bei Rum, kein Halsband. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: orange-bernsteinfarben.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: flache dunkle Holzkappe wie bei Rum, kein Halsband.
- Nur Rezept-Zutaten im Bild: Rum Orange; Sodawasser, gut gekühlt; Eiswürfel; Orangenscheibe. Beilagen nur aus: Geflügel, Käsegebäck, Sommersalate.
- Flüssigkeitsfarbe ist in den Daten nur geschätzt (fluessigkeit.js: #c67a1c); mit dem echten Produkt abgleichen.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.
- Verschluss (Holzkappe) ist angenommen wie bei Rum, es gibt kein Foto der Flasche.

---

## 5. Hierber Whisky: Old Fashioned

- **Sorte:** Hierber Whisky
- **Karte auf der Sortenseite:** Nr. 3 von 5, „Old Fashioned“ (Cocktail)
- **Ergebnis speichern als:** `fotos-ki/whisky-1.png` (ersetzt das vorhandene Bild)
- **Status:** offen
- **Was am alten Bild falsch war:** Adresse links abgeschnitten („Millewee“ ohne „2,“), Fass im Hintergrund.
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Whisky 0,5L nei 4-01.png`
- **Prompt:** 183 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Old Fashioned im Tumbler mit einem einzigen großen klaren Eiswürfel, der Whisky bernsteinfarben, ein Streifen Orangenschale liegt im Glas. Daneben ein paar Walnüsse auf dem Eichentisch.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: schwarze, geriffelte Schraubkappe. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: Bernstein.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: schwarze, geriffelte Schraubkappe.
- Nur Rezept-Zutaten im Bild: Hierber Whisky; Zuckersirup; Aromatic Bitters; großer Eiswürfel; Streifen Orangenschale. Beilagen nur aus: Nüsse, Hartkäse, Steak.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.

---

## 6. Kirsch: Kirsch-Sour

- **Sorte:** Kirsch
- **Karte auf der Sortenseite:** Nr. 3 von 5, „Kirsch-Sour“ (Cocktail)
- **Ergebnis speichern als:** `fotos-ki/kirsch-1.png` (ersetzt das vorhandene Bild)
- **Status:** offen
- **Was am alten Bild falsch war:** Flaschenhals/Kappe am oberen Bildrand abgeschnitten.
- **Anhang 1 (echtes Foto der Kirsch-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-kirsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Kirsch-01.png`
- **Prompt:** 179 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Kirsch-Sour im Tumbler auf frischem Eis, das Getränk hell und leicht trüb, ohne Schaum, ein Streifen Zitronenschale am Glasrand. Daneben unscharf ein paar Nüsse.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Kirsch; frischer Zitronensaft; Zuckersirup; Eiswürfel. Beilagen nur aus: Käsegebäck, Nüsse, Schokoladenkekse.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 7. Framboise: Framboise-Spritz mit Crémant

- **Sorte:** Framboise
- **Karte auf der Sortenseite:** Nr. 3 von 4, „Framboise-Spritz mit Crémant“ (Cocktail)
- **Ergebnis speichern als:** `fotos-ki/framboise-1.png` (ersetzt das vorhandene Bild)
- **Status:** offen
- **Was am alten Bild falsch war:** Minze im Glas, nicht im Rezept; Flaschenhals/Kappe am oberen Bildrand abgeschnitten.
- **Anhang 1 (echtes Foto der Framboise-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-framboise.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Framboise-01.png`
- **Prompt:** 180 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Framboise-Spritz im großen Weinglas auf viel Eis, das Getränk fast klar und perlend, höchstens ein zarter Rosahauch, frische Himbeeren im Glas und ein paar daneben.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Framboise; Crémant, gut gekühlt; Sodawasser; Eiswürfel; Himbeeren. Beilagen nur aus: Aperitif, Sommerfeste, Biskuit.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 8. Quetsch: Quetsch-Sour

- **Sorte:** Quetsch
- **Karte auf der Sortenseite:** Nr. 2 von 5, „Quetsch-Sour“ (Cocktail)
- **Ergebnis speichern als:** `fotos-ki/quetsch-1.png` (ersetzt das vorhandene Bild)
- **Status:** offen
- **Was am alten Bild falsch war:** Flaschenhals/Kappe am oberen Bildrand abgeschnitten.
- **Anhang 1 (echtes Foto der Quetsch-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-quetsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Quetsch-01.png`
- **Prompt:** 179 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Quetsch-Sour im Tumbler auf frischem Eis, das Getränk hell und leicht trüb, ohne Schaum, ein Streifen Zitronenschale am Glasrand. Daneben unscharf ein paar Nüsse.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Quetsch; frischer Zitronensaft; Zuckersirup; Eiswürfel. Beilagen nur aus: Käsegebäck, Nüsse, Herbstgerichte.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 9. Poire Williams: Poire Williams Fizz

- **Sorte:** Poire Williams
- **Karte auf der Sortenseite:** Nr. 2 von 4, „Poire Williams Fizz“ (Cocktail)
- **Ergebnis speichern als:** `fotos-ki/poire-williams-1.png` (ersetzt das vorhandene Bild)
- **Status:** offen
- **Was am alten Bild falsch war:** Flaschenhals/Kappe am oberen Bildrand abgeschnitten.
- **Anhang 1 (echtes Foto der Poire Williams-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-poire-williams.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Williams-01.png`
- **Prompt:** 181 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Poire Williams Fizz im Longdrinkglas auf frischem Eis, das Getränk hell, leicht trüb und perlend, ohne Garnitur im Glas. Daneben unscharf ein kleiner Salat mit Birne.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Poire Williams; frischer Zitronensaft; Zuckersirup; Sodawasser; Eiswürfel. Beilagen nur aus: leichte Vorspeisen, Ziegenkäse, Salate mit Birne.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 10. Mirabelle: Mirabelle-Tonic mit Thymian

- **Sorte:** Mirabelle
- **Karte auf der Sortenseite:** Nr. 2 von 5, „Mirabelle-Tonic mit Thymian“ (Auf Eis / Longdrink)
- **Ergebnis speichern als:** `fotos-ki/mirabelle-1.png` (ersetzt das vorhandene Bild)
- **Status:** offen
- **Was am alten Bild falsch war:** Mirabellenspalten im Glas, nicht im Rezept; Flaschenhals/Kappe abgeschnitten.
- **Anhang 1 (echtes Foto der Mirabelle-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-mirabelle.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Mirabelle-01.png`
- **Prompt:** 181 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Mirabelle-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, ein frischer Thymianzweig steckt im Glas. Das Getränk ist klar und perlt leicht. Im unscharfen Hintergrund ein Stück Flammkuchen.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Mirabelle; Tonic Water, gut gekühlt; frischer Thymian; Eiswürfel. Beilagen nur aus: Ziegenfrischkäse, Flammkuchen, leichte Sommergerichte.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 11. Vieux Marc: Espresso mit Vieux Marc

- **Sorte:** Vieux Marc
- **Karte auf der Sortenseite:** Nr. 2 von 4, „Espresso mit Vieux Marc“ (Zum Essen)
- **Ergebnis speichern als:** `fotos-ki/vieux-marc-1.png` (ersetzt das vorhandene Bild)
- **Status:** offen
- **Was am alten Bild falsch war:** Karaffe aus durchsichtigem Bernsteinglas statt sehr dunklem Glas; zusätzliches Glas Vieux Marc.
- **Anhang 1 (Karaffe: die dunkle Vieux-Marc-Karaffe vorn links im Foto (nur die Karaffe beachten)):** `fotos/flaschenreihe-theke.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Vieux marc-01.png`
- **Prompt:** 196 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Eine kleine Espressotasse mit frischem Espresso und Crema auf einer Untertasse, daneben ein kleines Glas Vieux Marc, kräftig bernsteinfarben, und zwei Mandelkekse. Kein Eis.
Flasche: Die Karaffe steht vollständig im Bild neben dem Essen und dem Glas: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: schwarzer, profilierter Stopfen mit Wulst am Hals. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Karaffe gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Karaffe: sehr dunkles, undurchsichtiges Braunglas, der Brand ist nicht zu sehen.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: schwarzer, profilierter Stopfen mit Wulst am Hals.
- Nur Rezept-Zutaten im Bild: frischer Espresso; Vieux Marc. Beilagen nur aus: Gebäck, Mandelkekse, nach dem Essen.
- Neben dem Essen muss ein Glas mit dem Brand zu sehen sein.
- Anhang 1 ist ein Gruppenfoto: nur die dunkle Karaffe vorn links als Formvorlage nutzen, deren Etikett nicht übernehmen.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (karaffe); Verschluss und Brandfarbe stehen im Prompt.

---

## 12. Vieille Prune: Vieille Prune auf einem großen Eiswürfel

- **Sorte:** Vieille Prune
- **Karte auf der Sortenseite:** Nr. 2 von 4, „Vieille Prune auf einem großen Eiswürfel“ (Auf Eis / Longdrink)
- **Ergebnis speichern als:** `fotos-ki/vieille-prune-1.png` (ersetzt das vorhandene Bild)
- **Status:** offen
- **Was am alten Bild falsch war:** Getränk blasser als die gemessene Füllung; Flaschenhals/Kappe abgeschnitten.
- **Anhang 1 (echtes Foto der Vieille Prune-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-vieille-prune.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Vieille prune-01.png`
- **Prompt:** 177 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Vieille Prune im Tumbler auf einem einzigen großen klaren Eiswürfel, das Getränk klar goldgelb. Daneben ein paar Nüsse und ein Stück dunkle Schokolade.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klares, kräftiges Goldgelb.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Vieille Prune; großer Eiswürfel. Beilagen nur aus: Nüsse, dunkle Schokolade.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 13. Vieille Pomme: Vieille Pomme mit Ginger Beer

- **Sorte:** Vieille Pomme
- **Karte auf der Sortenseite:** Nr. 2 von 4, „Vieille Pomme mit Ginger Beer“ (Auf Eis / Longdrink)
- **Ergebnis speichern als:** `fotos-ki/vieille-pomme-1.png` (ersetzt das vorhandene Bild)
- **Status:** offen
- **Was am alten Bild falsch war:** Flaschenhals/Kappe am oberen Bildrand abgeschnitten.
- **Anhang 1 (echtes Foto der Vieille Pomme-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-vieille-pomme.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Vieille pomme-01.png`
- **Prompt:** 178 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Vieille Pomme mit Ginger Beer im Longdrinkglas auf viel Eis, das Getränk klar goldgelb und perlend, eine Limettenspalte am Glasrand. Daneben unscharf ein Stück Apfelkuchen.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klares Goldgelb.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Vieille Pomme; Limettensaft; Ginger Beer; Eiswürfel; Limettenspalte. Beilagen nur aus: Geflügel, Käsegebäck, Apfelkuchen.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 14. Hunnegdrëpp: Hunnegdrëpp-Sour

- **Sorte:** Hunnegdrëpp
- **Karte auf der Sortenseite:** Nr. 3 von 5, „Hunnegdrëpp-Sour“ (Cocktail)
- **Ergebnis speichern als:** `fotos-ki/hunnegdrepp-1.png` (ersetzt das vorhandene Bild)
- **Status:** offen
- **Was am alten Bild falsch war:** Flaschenhals/Kappe am oberen Bildrand abgeschnitten.
- **Anhang 1 (echtes Foto der Hunnegdrëpp-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-hunnegdrepp.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Hunnegdrepp-01.png`
- **Prompt:** 177 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Hunnegdrëpp-Sour im Tumbler auf frischem Eis, das Getränk honiggolden und leicht trüb, ohne Schaum, ein Streifen Zitronenschale am Glasrand. Daneben unscharf ein Käsegebäck.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: tiefes Honiggold.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Hunnegdrëpp; frischer Zitronensaft; Zuckersirup; Eiswürfel. Beilagen nur aus: Käsegebäck, Nüsse, Herbstgerichte.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 15. Hierber Hunneg Whisky: Hunneg Whisky-Highball

- **Sorte:** Hierber Hunneg Whisky
- **Karte auf der Sortenseite:** Nr. 3 von 4, „Hunneg Whisky-Highball“ (Auf Eis / Longdrink)
- **Ergebnis speichern als:** `fotos-ki/hunneg-whisky-1.png` (ersetzt das vorhandene Bild)
- **Status:** offen
- **Was am alten Bild falsch war:** Kräuterzweige im Hintergrund und Orangenstücke auf dem Tisch stehen nicht im Rezept.
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Whisky 0,5L Hunneg-01.png`
- **Prompt:** 183 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Highballglas mit Eis, Hunneg Whisky und Ginger Ale, das Getränk goldgelb bis bernsteinfarben und leicht perlend, ein Streifen Orangenschale im Glas. Im unscharfen Hintergrund Käsegebäck.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: schwarze, geriffelte Schraubkappe. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: warmes Goldbernstein.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: schwarze, geriffelte Schraubkappe.
- Nur Rezept-Zutaten im Bild: Hunneg Whisky; Ginger Ale, gut gekühlt; Eiswürfel; Streifen Orangenschale. Beilagen nur aus: Geflügel, Käsegebäck, Grillgemüse.
- Flüssigkeitsfarbe ist in den Daten nur geschätzt (fluessigkeit.js: #c4912e); mit dem echten Produkt abgleichen.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.
- Verschluss (schwarze Schraubkappe) ist wie beim Whisky angenommen, es gibt kein Foto der Hunneg-Whisky-Flasche.

---

## 16. Kräiderdrëpp: Kräiderdrëpp-Tonic mit Gurkenscheiben

- **Sorte:** Kräiderdrëpp
- **Karte auf der Sortenseite:** Nr. 2 von 4, „Kräiderdrëpp-Tonic mit Gurkenscheiben“ (Auf Eis / Longdrink)
- **Ergebnis speichern als:** `fotos-ki/kraeiderdrepp-1.png` (ersetzt das vorhandene Bild)
- **Status:** offen
- **Was am alten Bild falsch war:** Minze und Rosmarin im Glas, nicht im Rezept.
- **Anhang 1 (echtes Foto der Kräiderdrëpp-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-kraeiderdrepp.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Kraider-01.png`
- **Prompt:** 180 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Kräiderdrëpp-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, 4 dünne Gurkenscheiben im Glas. Das Getränk ist klar und perlt leicht. Im unscharfen Hintergrund ein kleiner Salat.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Kräiderdrëpp; Tonic Water, gut gekühlt; Eiswürfel; Gurkenscheiben. Beilagen nur aus: Sommersalate, leichte Vorspeisen, Ziegenfrischkäse.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 17. Kürbisdrëpp: Kürbissuppe mit einem Schuss Kürbisdrëpp

- **Sorte:** Kürbisdrëpp
- **Karte auf der Sortenseite:** Nr. 3 von 4, „Kürbissuppe mit einem Schuss Kürbisdrëpp“ (In der Küche / Dessert)
- **Ergebnis speichern als:** `fotos-ki/kuerbisdrepp-1.png` (ersetzt das vorhandene Bild)
- **Status:** offen
- **Was am alten Bild falsch war:** Gericht statt Getränk im Fokus; Thymian und Pfeffer auf der Suppe nicht im Rezept; Flaschenhals/Kappe am oberen Bildrand abgeschnitten.
- **Anhang 1 (schlanke 0,5-L-Flasche (Foto der Kirsch-Flasche, dieselbe Form; deren Etikett nicht übernehmen)):** `Fotos/flasche-kirsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Kürbisdrepp-01.png`
- **Prompt:** 178 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein tiefer Suppenteller mit orangefarbener, cremiger Kürbissuppe, eine Spirale Sahne, geröstete Kürbiskerne obenauf. Daneben eine Scheibe Kürbiskernbrot. Dampf nur ganz dezent, kein Eis.
Flasche: Die Flasche steht vollständig im Bild neben dem Gericht (Hauptmotiv): Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: fertige Kürbissuppe; Kürbisdrëpp pro Teller; geröstete Kürbiskerne; Sahne. Beilagen nur aus: Kürbiskernbrot, Herbstabende, Hartkäse.
- Das Gericht ist Hauptmotiv, die Flasche steht daneben und ist vollständig sichtbar.
- Das Etikett nennt 40 % vol., die Preisliste 45 %: den Wert des Etiketts nicht ändern, Brenner klärt (TODO-INHALTE.md, Abschnitt 1).
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (schlank); Verschluss und Brandfarbe stehen im Prompt.

---

## 18. Hondsaarsch: Hondsaarsch-Tonic mit Orangenschale

- **Sorte:** Hondsaarsch
- **Karte auf der Sortenseite:** Nr. 2 von 4, „Hondsaarsch-Tonic mit Orangenschale“ (Auf Eis / Longdrink)
- **Ergebnis speichern als:** `fotos-ki/hondsaarsch-1.png` (ersetzt das vorhandene Bild)
- **Status:** offen
- **Was am alten Bild falsch war:** Flaschenhals/Kappe am oberen Bildrand abgeschnitten.
- **Anhang 1 (schlanke 0,5-L-Flasche (Foto der Kirsch-Flasche, dieselbe Form; deren Etikett nicht übernehmen)):** `Fotos/flasche-kirsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Hondsaarsch-01.png`
- **Prompt:** 180 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Hondsaarsch-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, ein Streifen Orangenschale im Glas. Das Getränk ist klar und perlt leicht. Im unscharfen Hintergrund ein heller Salat.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Hondsaarsch; Tonic Water, gut gekühlt; Eiswürfel; Orangenschale. Beilagen nur aus: leichte Sommergerichte, Salate, Ziegenfrischkäse.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (schlank); Verschluss und Brandfarbe stehen im Prompt.

---

## 19. Kiwibeeren: Kiwibeeren-Spritz mit Crémant

- **Sorte:** Kiwibeeren
- **Karte auf der Sortenseite:** Nr. 3 von 4, „Kiwibeeren-Spritz mit Crémant“ (Cocktail)
- **Ergebnis speichern als:** `fotos-ki/kiwibeeren-1.png` (ersetzt das vorhandene Bild)
- **Status:** offen
- **Was am alten Bild falsch war:** Minze im Glas, nicht im Rezept; Flaschenhals/Kappe abgeschnitten; Alkoholangabe 43 % (Etikett).
- **Anhang 1 (echtes Foto der Kiwibeeren-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-kiwibeeren.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Kiwi-01.png`
- **Prompt:** 176 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Kiwibeeren-Spritz im großen Weinglas auf viel Eis, das Getränk fast klar und perlend, eine Limettenscheibe im Glas. Im unscharfen Hintergrund Käsegebäck.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Kiwibeeren; Crémant, gut gekühlt; Sodawasser; Eiswürfel; Limettenscheibe. Beilagen nur aus: Aperitif, Sommerfeste, Käsegebäck.
- Das Etikett nennt 43 % vol., die Preisliste 45 %: den Wert des Etiketts nicht ändern, Brenner klärt (TODO-INHALTE.md, Abschnitt 1).
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 20. Poire: Poire mit Ginger Beer

- **Sorte:** Poire
- **Karte auf der Sortenseite:** Nr. 2 von 4, „Poire mit Ginger Beer“ (Auf Eis / Longdrink)
- **Ergebnis speichern als:** `fotos-ki/poire-1.png` (ersetzt das vorhandene Bild)
- **Status:** offen
- **Was am alten Bild falsch war:** Ingwerwurzel auf dem Tisch, nicht im Rezept; Flaschenhals/Kappe abgeschnitten.
- **Anhang 1 (echtes Foto der Poire-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-poire.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Poire-01.png`
- **Prompt:** 176 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Poire mit Ginger Beer im Longdrinkglas auf viel Eis, das Getränk klar und perlend, eine Limettenspalte am Glasrand. Im unscharfen Hintergrund Käsegebäck.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Poire; Limettensaft; Ginger Beer; Eiswürfel; Limettenspalte. Beilagen nur aus: Geflügel, Käsegebäck, asiatisch gewürzte Gerichte.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 21. Neelchesbiren: Neelchesbiren-Tonic mit Zitronenschale

- **Sorte:** Neelchesbiren
- **Karte auf der Sortenseite:** Nr. 2 von 4, „Neelchesbiren-Tonic mit Zitronenschale“ (Auf Eis / Longdrink)
- **Ergebnis speichern als:** `fotos-ki/neelchesbiren-1.png` (ersetzt das vorhandene Bild)
- **Status:** offen
- **Was am alten Bild falsch war:** Flasche und Getränk strohfarben statt klar (Foto zeigt klar); Thymianzweig im Glas nicht im Rezept.
- **Anhang 1 (echtes Foto der Neelchesbiren-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-neelchesbiren.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Nelchensbiren-01.png`
- **Prompt:** 180 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Neelchesbiren-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, ein Streifen Zitronenschale im Glas. Das Getränk ist klar und perlt leicht. Im unscharfen Hintergrund ein kleiner Salat.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Neelchesbiren; Tonic Water, gut gekühlt; Eiswürfel; Zitronenschale. Beilagen nur aus: leichte Sommergerichte, Salate, Ziegenfrischkäse.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 22. Lënschouren: Lënschouren über Vanilleeis

- **Sorte:** Lënschouren
- **Karte auf der Sortenseite:** Nr. 3 von 4, „Lënschouren über Vanilleeis“ (In der Küche / Dessert)
- **Ergebnis speichern als:** `fotos-ki/lenschouren-1.png` (ersetzt das vorhandene Bild)
- **Status:** ersetzt, bitte prüfen
- **Was am alten Bild falsch war:** Gericht statt Getränk im Fokus; Minzblatt nicht im Rezept; Flaschenhals/Kappe am oberen Bildrand abgeschnitten.
- **Anhang 1 (echtes Foto der Lënschouren-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-lenschouren.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Lenschouren-01.png`
- **Prompt:** 176 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Eine gekühlte Dessertschale mit 2 bis 3 Kugeln Vanilleeis, leicht angeschmolzen, darüber gehackte Nüsse. Daneben unscharf eine Tasse Espresso. Kein Longdrink.
Flasche: Die Flasche steht vollständig im Bild neben dem Gericht (Hauptmotiv): Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Vanilleeis; Lënschouren; gehackte Nüsse. Beilagen nur aus: Espresso, Gebäck, frische Früchte.
- Das Gericht ist Hauptmotiv, die Flasche steht daneben und ist vollständig sichtbar.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 23. Vullekiischt: Vullekiischt-Tonic mit Zitronenschale

- **Sorte:** Vullekiischt
- **Karte auf der Sortenseite:** Nr. 2 von 4, „Vullekiischt-Tonic mit Zitronenschale“ (Auf Eis / Longdrink)
- **Ergebnis speichern als:** `fotos-ki/vullekiischt-1.png` (ersetzt das vorhandene Bild)
- **Status:** offen
- **Was am alten Bild falsch war:** Vogelbeeren im Glas, nicht im Rezept; Flaschenhals/Kappe abgeschnitten.
- **Anhang 1 (schlanke 0,5-L-Flasche (Foto der Kirsch-Flasche, dieselbe Form; deren Etikett nicht übernehmen)):** `Fotos/flasche-kirsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Vogelbeere-01.png`
- **Prompt:** 180 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Vullekiischt-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, ein Streifen Zitronenschale im Glas. Das Getränk ist klar und perlt leicht. Im unscharfen Hintergrund ein kleiner Salat.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Vullekiischt; Tonic Water, gut gekühlt; Eiswürfel; Zitronenschale. Beilagen nur aus: leichte Sommergerichte, Salate, Ziegenfrischkäse.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (schlank); Verschluss und Brandfarbe stehen im Prompt.

---

## 24. Schléiwen: Schléiwen-Sour

- **Sorte:** Schléiwen
- **Karte auf der Sortenseite:** Nr. 2 von 4, „Schléiwen-Sour“ (Cocktail)
- **Ergebnis speichern als:** `fotos-ki/schleiwen-1.png` (ersetzt das vorhandene Bild)
- **Status:** offen
- **Was am alten Bild falsch war:** Flaschenhals/Kappe am oberen Bildrand abgeschnitten.
- **Anhang 1 (echtes Foto der Schléiwen-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-schleiwen.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Schleiwen-01.png`
- **Prompt:** 179 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Schléiwen-Sour im Tumbler auf frischem Eis, das Getränk hell und leicht trüb, ohne Schaum, ein Streifen Zitronenschale am Glasrand. Daneben unscharf ein paar Nüsse.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Schléiwen; frischer Zitronensaft; Zuckersirup; Eiswürfel. Beilagen nur aus: Käsegebäck, Nüsse, Herbstgerichte.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 25. Vizdrëpp: Vizdrëpp-Tonic mit Apfelscheiben

- **Sorte:** Vizdrëpp
- **Karte auf der Sortenseite:** Nr. 2 von 5, „Vizdrëpp-Tonic mit Apfelscheiben“ (Auf Eis / Longdrink)
- **Ergebnis speichern als:** `fotos-ki/vizdrepp-1.png` (ersetzt das vorhandene Bild)
- **Status:** offen
- **Was am alten Bild falsch war:** Flaschenform weicht ab (hohe schlanke Flasche mit Glasstopfen statt breiter, nach unten weitender Flasche); Rosmarin nicht im Rezept; Getränk blasser als die gemessene Füllung.
- **Anhang 1 (echtes Foto der Vizdrëpp-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-vizdrepp.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Vizdrepp 0,5l_Zeichenfläche 1.png`
- **Prompt:** 179 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Vizdrëpp-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, 3 dünne Apfelscheiben im Glas. Das Getränk ist blass goldgelb schimmernd und perlend.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen mit flachem, breitem Kragen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: kräftiges, klares Goldgelb.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen mit flachem, breitem Kragen.
- Nur Rezept-Zutaten im Bild: Vizdrëpp; Tonic Water, gut gekühlt; Eiswürfel; Apfelscheiben. Beilagen nur aus: Geflügel, Käsegebäck, leichte Vorspeisen.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.
- Die echte Vizdrëpp-Flasche hat eine breite, nach unten weitende Form (anders als die schlanken Flaschen).

---

## 26. Hierber Sambuca: Sambuca mit Kaffeebohnen

- **Sorte:** Hierber Sambuca
- **Karte auf der Sortenseite:** Nr. 1 von 4, „Sambuca mit Kaffeebohnen“ (Pur)
- **Ergebnis speichern als:** `fotos-ki/sambuca-1.png` (ersetzt das vorhandene Bild)
- **Status:** offen
- **Was am alten Bild falsch war:** Etikett nur aus dem alten Produktfoto abgeleitet (das echte ist rot mit Fellstruktur); echte Flasche hat Ausgießer mit zwei Metallröhrchen und Halsband, im Bild ein Korken.
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Sambuca_Zeichenfläche 1.png`
- **Prompt:** 181 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein kleines Likörglas mit klarem Sambuca, 3 Kaffeebohnen darin. Daneben eine Tasse Espresso und ein Mandelgebäck. Kein Eis.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: Ausgießer mit zwei dunklen Metallröhrchen, Halsband am Flaschenhals. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: Ausgießer mit zwei dunklen Metallröhrchen, Halsband am Flaschenhals.
- Nur Rezept-Zutaten im Bild: Hierber Sambuca; Kaffeebohnen. Beilagen nur aus: Espresso, Mandelgebäck, nach dem Essen.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.
- Verschluss laut Produktfoto in fotos/ (flaschen-*.webp); die Standardvorlage in Anhang 1 hat eine andere Kappe, der Verschluss kommt aus dem Prompt.

---

## 27. Hierber Limoncello: Limoncello-Spritz mit Crémant

- **Sorte:** Hierber Limoncello
- **Karte auf der Sortenseite:** Nr. 2 von 4, „Limoncello-Spritz mit Crémant“ (Cocktail)
- **Ergebnis speichern als:** `fotos-ki/limoncello-1.png` (ersetzt das vorhandene Bild)
- **Status:** offen
- **Was am alten Bild falsch war:** Adresse ohne „L-6665“; echte Flasche mit Ausgießer, im Bild ein Korken. Das flache Etikett liegt jetzt vor.
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Limoncello-01.png`
- **Prompt:** 185 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Limoncello-Spritz im großen Weinglas auf viel Eis, das Getränk hellgelb und perlend, ein frischer Minzzweig im Glas. Daneben unscharf ein paar Antipasti.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: Ausgießer mit zwei dunklen Metallröhrchen, Halsband am Flaschenhals. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: leuchtendes Gelbgrün.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: Ausgießer mit zwei dunklen Metallröhrchen, Halsband am Flaschenhals.
- Nur Rezept-Zutaten im Bild: Limoncello; Crémant, gut gekühlt; Sodawasser; Eiswürfel; Minzzweig. Beilagen nur aus: Aperitif, Sommerfeste, Antipasti.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.
- Verschluss laut Produktfoto in fotos/ (flaschen-*.webp); die Standardvorlage in Anhang 1 hat eine andere Kappe, der Verschluss kommt aus dem Prompt.

---

## Übersicht

| Nr | Sorte | Karte | Dateiname | Status | Fehler am alten Bild |
|---|---|---|---|---|---|
| 1 | Hierber Gin | Gin-Tonic mit Apfel und Rosmarin | `fotos-ki/gin-1.png` | offen | Adresszeile verfälscht („L. Hallinger L-6831 Herborn, Tél. 72 7602“), Etikettenmuster weicht ab. |
| 2 | Hierber Wodka | Wodka-Tonic mit Gurkenscheiben | `fotos-ki/wodka-1.png` | offen | Etikett am unteren Rand angeschnitten („www.hierber-brennere…“), Adresse verfälscht („Z. Millewee L-6665 hoıxn“). |
| 3 | Hierber Rum | Rum und Ginger mit Limette | `fotos-ki/rum-1.png` | offen | Etikett nur aus dem alten Produktfoto abgeleitet („1-6665“ statt „L-6665“, braunes Halsband fehlt, Etikett heller); das flache Etikett liegt jetzt vor. |
| 4 | Hierber Rum Orange | Rum Orange-Highball | `fotos-ki/rum-orange-1.png` | offen | Erfundenes Etikett, nicht das echte (das echte hat Segelschiff, Weltkarte und Orangenhälfte mit Blättern); Orangenblätter und -hälften auf dem Tisch stehen nicht im Rezept. Das flache Etikett liegt jetzt vor. |
| 5 | Hierber Whisky | Old Fashioned | `fotos-ki/whisky-1.png` | offen | Adresse links abgeschnitten („Millewee“ ohne „2,“), Fass im Hintergrund. |
| 6 | Kirsch | Kirsch-Sour | `fotos-ki/kirsch-1.png` | offen | Flaschenhals/Kappe am oberen Bildrand abgeschnitten. |
| 7 | Framboise | Framboise-Spritz mit Crémant | `fotos-ki/framboise-1.png` | offen | Minze im Glas, nicht im Rezept; Flaschenhals/Kappe am oberen Bildrand abgeschnitten. |
| 8 | Quetsch | Quetsch-Sour | `fotos-ki/quetsch-1.png` | offen | Flaschenhals/Kappe am oberen Bildrand abgeschnitten. |
| 9 | Poire Williams | Poire Williams Fizz | `fotos-ki/poire-williams-1.png` | offen | Flaschenhals/Kappe am oberen Bildrand abgeschnitten. |
| 10 | Mirabelle | Mirabelle-Tonic mit Thymian | `fotos-ki/mirabelle-1.png` | offen | Mirabellenspalten im Glas, nicht im Rezept; Flaschenhals/Kappe abgeschnitten. |
| 11 | Vieux Marc | Espresso mit Vieux Marc | `fotos-ki/vieux-marc-1.png` | offen | Karaffe aus durchsichtigem Bernsteinglas statt sehr dunklem Glas; zusätzliches Glas Vieux Marc. |
| 12 | Vieille Prune | Vieille Prune auf einem großen Eiswürfel | `fotos-ki/vieille-prune-1.png` | offen | Getränk blasser als die gemessene Füllung; Flaschenhals/Kappe abgeschnitten. |
| 13 | Vieille Pomme | Vieille Pomme mit Ginger Beer | `fotos-ki/vieille-pomme-1.png` | offen | Flaschenhals/Kappe am oberen Bildrand abgeschnitten. |
| 14 | Hunnegdrëpp | Hunnegdrëpp-Sour | `fotos-ki/hunnegdrepp-1.png` | offen | Flaschenhals/Kappe am oberen Bildrand abgeschnitten. |
| 15 | Hierber Hunneg Whisky | Hunneg Whisky-Highball | `fotos-ki/hunneg-whisky-1.png` | offen | Kräuterzweige im Hintergrund und Orangenstücke auf dem Tisch stehen nicht im Rezept. |
| 16 | Kräiderdrëpp | Kräiderdrëpp-Tonic mit Gurkenscheiben | `fotos-ki/kraeiderdrepp-1.png` | offen | Minze und Rosmarin im Glas, nicht im Rezept. |
| 17 | Kürbisdrëpp | Kürbissuppe mit einem Schuss Kürbisdrëpp | `fotos-ki/kuerbisdrepp-1.png` | offen | Gericht statt Getränk im Fokus; Thymian und Pfeffer auf der Suppe nicht im Rezept; Flaschenhals/Kappe am oberen Bildrand abgeschnitten. |
| 18 | Hondsaarsch | Hondsaarsch-Tonic mit Orangenschale | `fotos-ki/hondsaarsch-1.png` | offen | Flaschenhals/Kappe am oberen Bildrand abgeschnitten. |
| 19 | Kiwibeeren | Kiwibeeren-Spritz mit Crémant | `fotos-ki/kiwibeeren-1.png` | offen | Minze im Glas, nicht im Rezept; Flaschenhals/Kappe abgeschnitten; Alkoholangabe 43 % (Etikett). |
| 20 | Poire | Poire mit Ginger Beer | `fotos-ki/poire-1.png` | offen | Ingwerwurzel auf dem Tisch, nicht im Rezept; Flaschenhals/Kappe abgeschnitten. |
| 21 | Neelchesbiren | Neelchesbiren-Tonic mit Zitronenschale | `fotos-ki/neelchesbiren-1.png` | offen | Flasche und Getränk strohfarben statt klar (Foto zeigt klar); Thymianzweig im Glas nicht im Rezept. |
| 22 | Lënschouren | Lënschouren über Vanilleeis | `fotos-ki/lenschouren-1.png` | ersetzt, bitte prüfen | Gericht statt Getränk im Fokus; Minzblatt nicht im Rezept; Flaschenhals/Kappe am oberen Bildrand abgeschnitten. |
| 23 | Vullekiischt | Vullekiischt-Tonic mit Zitronenschale | `fotos-ki/vullekiischt-1.png` | offen | Vogelbeeren im Glas, nicht im Rezept; Flaschenhals/Kappe abgeschnitten. |
| 24 | Schléiwen | Schléiwen-Sour | `fotos-ki/schleiwen-1.png` | offen | Flaschenhals/Kappe am oberen Bildrand abgeschnitten. |
| 25 | Vizdrëpp | Vizdrëpp-Tonic mit Apfelscheiben | `fotos-ki/vizdrepp-1.png` | offen | Flaschenform weicht ab (hohe schlanke Flasche mit Glasstopfen statt breiter, nach unten weitender Flasche); Rosmarin nicht im Rezept; Getränk blasser als die gemessene Füllung. |
| 26 | Hierber Sambuca | Sambuca mit Kaffeebohnen | `fotos-ki/sambuca-1.png` | offen | Etikett nur aus dem alten Produktfoto abgeleitet (das echte ist rot mit Fellstruktur); echte Flasche hat Ausgießer mit zwei Metallröhrchen und Halsband, im Bild ein Korken. |
| 27 | Hierber Limoncello | Limoncello-Spritz mit Crémant | `fotos-ki/limoncello-1.png` | offen | Adresse ohne „L-6665“; echte Flasche mit Ausgießer, im Bild ein Korken. Das flache Etikett liegt jetzt vor. |
