# Prompts für KI-Fotos (ChatGPT): weitere Serviervorschläge

Erzeugt mit `node tools/foto_prompts_weitere.mjs`. Nicht von Hand ändern, sondern das Skript anpassen und neu laufen lassen.
**92 weitere Bilder** für alle Serviervorschläge der Sortenseiten (**9 davon liegen schon in `fotos-ki/`, 83 sind offen**; der Status steht bei jedem Bild und wird aus der Datei in `fotos-ki/` abgelesen). Die 29 Hauptbilder `<sorten-id>-1.png` gibt es schon, siehe `PROMPTS-FOTOS.md`). Die Liste zum Abhaken steht in `BILDERLISTE.md`, verbesserte Prompts für fehlerhafte Erstbilder in `PROMPTS-FOTOS-ERSATZ.md`.

**Benennung:** `fotos-ki/<sorten-id>-<n>.png`. Die Nummern 2, 3, 4 ... gehören zu den Karten der Sortenseite in der Reihenfolge der Karten, die Karte des Hauptbilds (`-1`) wird übersprungen. Beispiel Wodka: `wodka-1.png` zeigt Karte 2; Karte 1 wird `wodka-2.png`, Karte 3 `wodka-3.png`, Karte 4 `wodka-4.png`.

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

**Verbesserungen gegenüber den ersten 29 Prompts** (in jedem Prompt enthalten): Flasche vollständig im Bild und nichts angeschnitten; nur Zutaten und Beilagen aus dem Rezept bzw. `passtZu`; Etikettentext exakt wie im Anhang inklusive fester Adresszeile; Anhang 1 ist das Flaschenfoto der Sorte (`Fotos/flasche-<sorten-id>.jpg`), nur ohne Foto die Standardvorlage; Verschluss der Sorte nach den Fotos; Flüssigkeitsfarbe nach `site/data/fluessigkeit.js`; bei Gerichten ist das Gericht Hauptmotiv, bei „Zum Essen“ steht ein Glas Brand daneben.

---

## 1. Hierber Gin: Gin Fizz

- **Sorte:** Hierber Gin
- **Karte auf der Sortenseite:** Nr. 2 von 4, „Gin Fizz“ (Cocktail)
- **Ergebnis speichern als:** `fotos-ki/gin-2.png`
- **Status:** vorhanden
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Gin - Nei 1-01.png`
- **Prompt:** 182 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Gin Fizz im Longdrinkglas auf frischem Eis, das Getränk hell, klar und perlend, ohne Garnitur im Glas. Im unscharfen Hintergrund ein Teller Räucherlachs.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: flache, mattsilberne Metallkappe. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: flache, mattsilberne Metallkappe.
- Nur Rezept-Zutaten im Bild: Gin; frischer Zitronensaft; Zuckersirup; Sodawasser; Eiswürfel. Beilagen nur aus: Austern, Räucherlachs, Sommersalate.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.

---

## 2. Hierber Gin: Dry Martini

- **Sorte:** Hierber Gin
- **Karte auf der Sortenseite:** Nr. 3 von 4, „Dry Martini“ (Cocktail)
- **Ergebnis speichern als:** `fotos-ki/gin-3.png`
- **Status:** vorhanden
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Gin - Nei 1-01.png`
- **Prompt:** 181 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Dry Martini in einer vorgekühlten Cocktailschale, ohne Eis, das Getränk klar, ein Streifen Zitronenschale am Glasrand. Daneben unscharf eine kleine Schale Oliven.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: flache, mattsilberne Metallkappe. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: flache, mattsilberne Metallkappe.
- Nur Rezept-Zutaten im Bild: Hierber Gin; trockener Wermut; Eiswürfel; Streifen Zitronenschale. Beilagen nur aus: gesalzene Mandeln, Oliven, Räucherfisch.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.

---

## 3. Hierber Gin: Zitronensorbet mit Gin

- **Sorte:** Hierber Gin
- **Karte auf der Sortenseite:** Nr. 4 von 4, „Zitronensorbet mit Gin“ (In der Küche / Dessert)
- **Ergebnis speichern als:** `fotos-ki/gin-4.png`
- **Status:** vorhanden
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Gin - Nei 1-01.png`
- **Prompt:** 174 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein gekühltes Dessertglas mit 2 Kugeln Zitronensorbet, darüber klarer Gin geträufelt. Sonst nichts im Glas.
Flasche: Die Flasche steht vollständig im Bild neben dem Gericht (Hauptmotiv): Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: flache, mattsilberne Metallkappe. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: flache, mattsilberne Metallkappe.
- Nur Rezept-Zutaten im Bild: Zitronensorbet; Gin. Beilagen nur aus: zwischen zwei Gängen, Sommerabende, nach Fisch.
- Das Gericht ist Hauptmotiv, die Flasche steht daneben und ist vollständig sichtbar.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.

---

## 4. Hierber Wodka: Wodka eiskalt

- **Sorte:** Hierber Wodka
- **Karte auf der Sortenseite:** Nr. 1 von 4, „Wodka eiskalt“ (Pur)
- **Ergebnis speichern als:** `fotos-ki/wodka-2.png`
- **Status:** offen
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Wodka-01.png`
- **Prompt:** 179 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein reifbeschlagenes Stamperl mit eiskaltem, klarem Wodka, ohne Eis und ohne Garnitur. Im unscharfen Hintergrund ein Teller mit Räucherlachs auf Schwarzbrot.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: flache, mattsilberne Metallkappe. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: flache, mattsilberne Metallkappe.
- Nur Rezept-Zutaten im Bild: Wodka. Beilagen nur aus: Räucherlachs auf Schwarzbrot, Gewürzgurken, Kaviarersatz.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.

---

## 5. Hierber Wodka: Moscow Mule

- **Sorte:** Hierber Wodka
- **Karte auf der Sortenseite:** Nr. 3 von 4, „Moscow Mule“ (Cocktail)
- **Ergebnis speichern als:** `fotos-ki/wodka-3.png`
- **Status:** offen
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Wodka-01.png`
- **Prompt:** 185 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Moscow Mule im Longdrinkglas, bis oben mit Eiswürfeln, eine Limettenspalte am Glasrand. Das Getränk ist hell, leicht trüb und perlt. Im unscharfen Hintergrund ein paar Nachos.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: flache, mattsilberne Metallkappe. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: flache, mattsilberne Metallkappe.
- Nur Rezept-Zutaten im Bild: Hierber Wodka; Limettensaft; Ginger Beer; Eiswürfel; Limettenspalte. Beilagen nur aus: Burger, Nachos, Grillgemüse.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.

---

## 6. Hierber Wodka: Wodka zu Räucherlachs und Schwarzbrot

- **Sorte:** Hierber Wodka
- **Karte auf der Sortenseite:** Nr. 4 von 4, „Wodka zu Räucherlachs und Schwarzbrot“ (Zum Essen)
- **Ergebnis speichern als:** `fotos-ki/wodka-4.png`
- **Status:** offen
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Wodka-01.png`
- **Prompt:** 181 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein reifbeschlagenes Stamperl mit eiskaltem, klarem Wodka neben einem Holzbrett: 2 Scheiben Schwarzbrot, belegt mit Räucherlachs und einem Klecks Meerrettichcreme.
Flasche: Die Flasche steht vollständig im Bild neben dem Essen und dem Glas: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: flache, mattsilberne Metallkappe. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: flache, mattsilberne Metallkappe.
- Nur Rezept-Zutaten im Bild: Hierber Wodka, eiskalt; Räucherlachs; Schwarzbrot; Meerrettichcreme. Beilagen nur aus: Räucherlachs, Schwarzbrot, Meerrettich.
- Neben dem Essen muss ein Glas mit dem Brand zu sehen sein.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.

---

## 7. Hierber Rum: Rum pur, bei Zimmertemperatur

- **Sorte:** Hierber Rum
- **Karte auf der Sortenseite:** Nr. 1 von 4, „Rum pur, bei Zimmertemperatur“ (Pur)
- **Ergebnis speichern als:** `fotos-ki/rum-2.png`
- **Status:** offen
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Rum nei-01.png`
- **Prompt:** 183 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Ballonglas mit 4 cl goldbernsteinfarbenem Rum, ohne Eis und ohne Garnitur. Daneben unscharf ein Stück dunkle Schokolade und ein paar Nüsse.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: flache dunkle Holzkappe, braunes Halsband am Flaschenhals. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: goldenes Bernstein.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: flache dunkle Holzkappe, braunes Halsband am Flaschenhals.
- Nur Rezept-Zutaten im Bild: Rum. Beilagen nur aus: dunkle Schokolade, Zigarrenpause, Nüsse.
- Das Etikett nennt 40 % vol., die Preisliste 43 %: den Wert des Etiketts nicht ändern, Brenner klärt (TODO-INHALTE.md, Abschnitt 1).
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.
- Verschluss laut Produktfoto in fotos/ (flaschen-*.webp); die Standardvorlage in Anhang 1 hat eine andere Kappe, der Verschluss kommt aus dem Prompt.

---

## 8. Hierber Rum: Daiquiri

- **Sorte:** Hierber Rum
- **Karte auf der Sortenseite:** Nr. 3 von 4, „Daiquiri“ (Cocktail)
- **Ergebnis speichern als:** `fotos-ki/rum-3.png`
- **Status:** offen
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Rum nei-01.png`
- **Prompt:** 185 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Daiquiri in einer gekühlten Cocktailschale, ohne Eis und ohne Garnitur, das Getränk hell goldgelb und leicht trüb. Im unscharfen Hintergrund ein Teller Garnelen.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: flache dunkle Holzkappe, braunes Halsband am Flaschenhals. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: goldenes Bernstein.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: flache dunkle Holzkappe, braunes Halsband am Flaschenhals.
- Nur Rezept-Zutaten im Bild: Hierber Rum; Limettensaft; Zuckersirup; Eiswürfel. Beilagen nur aus: Garnelen, Ceviche, leichte Vorspeisen.
- Das Etikett nennt 40 % vol., die Preisliste 43 %: den Wert des Etiketts nicht ändern, Brenner klärt (TODO-INHALTE.md, Abschnitt 1).
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.
- Verschluss laut Produktfoto in fotos/ (flaschen-*.webp); die Standardvorlage in Anhang 1 hat eine andere Kappe, der Verschluss kommt aus dem Prompt.

---

## 9. Hierber Rum: Gebratene Bananen mit Rum

- **Sorte:** Hierber Rum
- **Karte auf der Sortenseite:** Nr. 4 von 4, „Gebratene Bananen mit Rum“ (In der Küche / Dessert)
- **Ergebnis speichern als:** `fotos-ki/rum-4.png`
- **Status:** offen
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Rum nei-01.png`
- **Prompt:** 175 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Dessertteller mit 2 längs halbierten, goldbraun gebratenen Bananen, daneben 2 Kugeln Vanilleeis.
Flasche: Die Flasche steht vollständig im Bild neben dem Gericht (Hauptmotiv): Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: flache dunkle Holzkappe, braunes Halsband am Flaschenhals. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: goldenes Bernstein.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: flache dunkle Holzkappe, braunes Halsband am Flaschenhals.
- Nur Rezept-Zutaten im Bild: reife Bananen; Butter; brauner Zucker; Hierber Rum; Vanilleeis. Beilagen nur aus: Vanilleeis, Schlagsahne, Kaffee.
- Das Gericht ist Hauptmotiv, die Flasche steht daneben und ist vollständig sichtbar.
- Das Etikett nennt 40 % vol., die Preisliste 43 %: den Wert des Etiketts nicht ändern, Brenner klärt (TODO-INHALTE.md, Abschnitt 1).
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.
- Verschluss laut Produktfoto in fotos/ (flaschen-*.webp); die Standardvorlage in Anhang 1 hat eine andere Kappe, der Verschluss kommt aus dem Prompt.

---

## 10. Hierber Rum Orange: Rum Orange auf einem großen Eiswürfel

- **Sorte:** Hierber Rum Orange
- **Karte auf der Sortenseite:** Nr. 1 von 4, „Rum Orange auf einem großen Eiswürfel“ (Auf Eis / Longdrink)
- **Ergebnis speichern als:** `fotos-ki/rum-orange-2.png`
- **Status:** offen
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Rum orange nei-01.png`
- **Prompt:** 186 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Tumbler mit einem einzigen großen klaren Eiswürfel, der Rum Orange orange-bernsteinfarben, eine Orangenscheibe am Glasrand. Daneben unscharf ein Stück dunkle Schokolade und ein Mandelgebäck.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: flache dunkle Holzkappe wie bei Rum, kein Halsband. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: orange-bernsteinfarben.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: flache dunkle Holzkappe wie bei Rum, kein Halsband.
- Nur Rezept-Zutaten im Bild: Rum Orange; großer Eiswürfel; Orangenscheibe. Beilagen nur aus: dunkle Schokolade, Mandelgebäck.
- Flüssigkeitsfarbe ist in den Daten nur geschätzt (fluessigkeit.js: #c67a1c); mit dem echten Produkt abgleichen.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.
- Verschluss (Holzkappe) ist angenommen wie bei Rum, es gibt kein Foto der Flasche.

---

## 11. Hierber Rum Orange: Rum Orange-Sour

- **Sorte:** Hierber Rum Orange
- **Karte auf der Sortenseite:** Nr. 3 von 4, „Rum Orange-Sour“ (Cocktail)
- **Ergebnis speichern als:** `fotos-ki/rum-orange-3.png`
- **Status:** offen
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Rum orange nei-01.png`
- **Prompt:** 186 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Rum Orange-Sour im Tumbler auf frischem Eis, das Getränk orange-golden und leicht trüb, ohne Schaum, ein Streifen Zitronenschale am Glasrand. Daneben ein paar Nüsse.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: flache dunkle Holzkappe wie bei Rum, kein Halsband. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: orange-bernsteinfarben.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: flache dunkle Holzkappe wie bei Rum, kein Halsband.
- Nur Rezept-Zutaten im Bild: Rum Orange; frischer Zitronensaft; Zuckersirup; Eiswürfel. Beilagen nur aus: Nüsse, Vorspeisen, Schokoladenkekse.
- Flüssigkeitsfarbe ist in den Daten nur geschätzt (fluessigkeit.js: #c67a1c); mit dem echten Produkt abgleichen.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.
- Verschluss (Holzkappe) ist angenommen wie bei Rum, es gibt kein Foto der Flasche.

---

## 12. Hierber Rum Orange: Orangenfilets mit Rum Orange

- **Sorte:** Hierber Rum Orange
- **Karte auf der Sortenseite:** Nr. 4 von 4, „Orangenfilets mit Rum Orange“ (In der Küche / Dessert)
- **Ergebnis speichern als:** `fotos-ki/rum-orange-4.png`
- **Status:** offen
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Rum orange nei-01.png`
- **Prompt:** 172 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Eine Dessertschale mit leicht glänzenden Orangenfilets, dazu 2 Kugeln Vanilleeis.
Flasche: Die Flasche steht vollständig im Bild neben dem Gericht (Hauptmotiv): Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: flache dunkle Holzkappe wie bei Rum, kein Halsband. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: orange-bernsteinfarben.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: flache dunkle Holzkappe wie bei Rum, kein Halsband.
- Nur Rezept-Zutaten im Bild: Orangen; Hierber Rum Orange; Zucker; Vanilleeis. Beilagen nur aus: Vanilleeis, Schokoladenkuchen, Mandelgebäck.
- Das Gericht ist Hauptmotiv, die Flasche steht daneben und ist vollständig sichtbar.
- Flüssigkeitsfarbe ist in den Daten nur geschätzt (fluessigkeit.js: #c67a1c); mit dem echten Produkt abgleichen.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.
- Verschluss (Holzkappe) ist angenommen wie bei Rum, es gibt kein Foto der Flasche.

---

## 13. Hierber Whisky: Whisky pur, mit einem Spritzer Wasser

- **Sorte:** Hierber Whisky
- **Karte auf der Sortenseite:** Nr. 1 von 5, „Whisky pur, mit einem Spritzer Wasser“ (Pur)
- **Ergebnis speichern als:** `fotos-ki/whisky-2.png`
- **Status:** offen
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Whisky 0,5L nei 4-01.png`
- **Prompt:** 178 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Nosing-Glas mit 4 cl bernsteinfarbenem Whisky, ohne Eis und ohne Garnitur. Daneben unscharf ein Stück dunkle Schokolade und ein paar Walnüsse.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: schwarze, geriffelte Schraubkappe. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: Bernstein.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: schwarze, geriffelte Schraubkappe.
- Nur Rezept-Zutaten im Bild: Hierber Whisky; stilles Wasser, Zimmertemperatur. Beilagen nur aus: dunkle Schokolade, Walnüsse, ruhiger Abend.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.

---

## 14. Hierber Whisky: Whisky-Highball

- **Sorte:** Hierber Whisky
- **Karte auf der Sortenseite:** Nr. 2 von 5, „Whisky-Highball“ (Auf Eis / Longdrink)
- **Ergebnis speichern als:** `fotos-ki/whisky-3.png`
- **Status:** offen
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Whisky 0,5L nei 4-01.png`
- **Prompt:** 181 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Whisky-Highball im Highballglas, viel Eis, ein Streifen Zitronenschale im Glas. Das Getränk ist helles Bernstein und perlt leicht. Im unscharfen Hintergrund ein paar Käsegebäck-Stangen.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: schwarze, geriffelte Schraubkappe. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: Bernstein.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: schwarze, geriffelte Schraubkappe.
- Nur Rezept-Zutaten im Bild: Whisky; Sodawasser, gut gekühlt; Eiswürfel; Streifen Zitronenschale. Beilagen nur aus: Geflügel, Käsegebäck, gegrillter Fisch.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.

---

## 15. Hierber Whisky: Whisky zu Comté

- **Sorte:** Hierber Whisky
- **Karte auf der Sortenseite:** Nr. 4 von 5, „Whisky zu Comté“ (Zum Essen)
- **Ergebnis speichern als:** `fotos-ki/whisky-4.png`
- **Status:** offen
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Whisky 0,5L nei 4-01.png`
- **Prompt:** 178 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Tulpenglas mit 4 cl bernsteinfarbenem Whisky neben einem Holzbrett mit kleinen Stücken gereiftem Comté und einer Handvoll Walnüsse.
Flasche: Die Flasche steht vollständig im Bild neben dem Essen und dem Glas: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: schwarze, geriffelte Schraubkappe. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: Bernstein.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: schwarze, geriffelte Schraubkappe.
- Nur Rezept-Zutaten im Bild: Hierber Whisky; gut gereifter Comté; Walnüsse. Beilagen nur aus: Comté, Walnüsse, Bergkäse.
- Neben dem Essen muss ein Glas mit dem Brand zu sehen sein.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.

---

## 16. Hierber Whisky: Pfeffersteak mit Whisky-Sauce

- **Sorte:** Hierber Whisky
- **Karte auf der Sortenseite:** Nr. 5 von 5, „Pfeffersteak mit Whisky-Sauce“ (In der Küche / Dessert)
- **Ergebnis speichern als:** `fotos-ki/whisky-5.png`
- **Status:** offen
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Whisky 0,5L nei 4-01.png`
- **Prompt:** 175 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Teller mit einem gebratenen Steak, darüber eine helle, cremige Sauce mit groben Pfefferkörnern, daneben ein paar Bratkartoffeln.
Flasche: Die Flasche steht vollständig im Bild neben dem Gericht (Hauptmotiv): Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: schwarze, geriffelte Schraubkappe. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: Bernstein.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: schwarze, geriffelte Schraubkappe.
- Nur Rezept-Zutaten im Bild: Steaks; grob gestoßener Pfeffer; Hierber Whisky; Sahne; Butter. Beilagen nur aus: Bratkartoffeln, grüne Bohnen, Rotwein.
- Das Gericht ist Hauptmotiv, die Flasche steht daneben und ist vollständig sichtbar.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.

---

## 17. Kirsch: Kirsch pur, gut gekühlt

- **Sorte:** Kirsch
- **Karte auf der Sortenseite:** Nr. 1 von 5, „Kirsch pur, gut gekühlt“ (Pur)
- **Ergebnis speichern als:** `fotos-ki/kirsch-2.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Kirsch-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-kirsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Kirsch-01.png`
- **Prompt:** 173 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein reifbeschlagenes Tulpenglas mit 4 cl klarem Kirsch, ohne Eis und ohne Garnitur. Daneben unscharf ein Stück Schwarzwälder Kirschtorte.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Kirsch. Beilagen nur aus: Schwarzwälder Kirschtorte, dunkle Schokolade, Espresso.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 18. Kirsch: Kirsch-Tonic mit Zitronenschale

- **Sorte:** Kirsch
- **Karte auf der Sortenseite:** Nr. 2 von 5, „Kirsch-Tonic mit Zitronenschale“ (Auf Eis / Longdrink)
- **Ergebnis speichern als:** `fotos-ki/kirsch-3.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Kirsch-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-kirsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Kirsch-01.png`
- **Prompt:** 180 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Kirsch-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, ein Streifen Zitronenschale im Glas. Das Getränk ist klar und perlt leicht. Im unscharfen Hintergrund ein kleiner Salat.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Kirsch; Tonic Water, gut gekühlt; Eiswürfel; Zitronenschale. Beilagen nur aus: leichte Vorspeisen, Salate, Ziegenfrischkäse.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 19. Kirsch: Geschmorte Kirschen mit Kirsch

- **Sorte:** Kirsch
- **Karte auf der Sortenseite:** Nr. 4 von 5, „Geschmorte Kirschen mit Kirsch“ (In der Küche / Dessert)
- **Ergebnis speichern als:** `fotos-ki/kirsch-4.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Kirsch-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-kirsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Kirsch-01.png`
- **Prompt:** 169 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Eine Dessertschale mit warm geschmorten dunklen Kirschen in glänzendem Sud, dazu 2 Kugeln Vanilleeis.
Flasche: Die Flasche steht vollständig im Bild neben dem Gericht (Hauptmotiv): Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Kirschen; Butter; Zucker; Kirsch; Vanilleeis. Beilagen nur aus: Vanilleeis, Quark, Biskuit.
- Das Gericht ist Hauptmotiv, die Flasche steht daneben und ist vollständig sichtbar.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 20. Kirsch: Kirsch zu dunkler Schokolade

- **Sorte:** Kirsch
- **Karte auf der Sortenseite:** Nr. 5 von 5, „Kirsch zu dunkler Schokolade“ (Zum Essen)
- **Ergebnis speichern als:** `fotos-ki/kirsch-5.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Kirsch-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-kirsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Kirsch-01.png`
- **Prompt:** 173 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Tulpenglas mit 4 cl klarem Kirsch neben 3 Stücken dunkler Schokolade auf einem kleinen Brett.
Flasche: Die Flasche steht vollständig im Bild neben dem Essen und dem Glas: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Kirsch; dunkle Schokolade (mindestens 70 % Kakao). Beilagen nur aus: Espresso, Trüffel, Orangenschale.
- Neben dem Essen muss ein Glas mit dem Brand zu sehen sein.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 21. Framboise: Framboise pur, gut gekühlt

- **Sorte:** Framboise
- **Karte auf der Sortenseite:** Nr. 1 von 4, „Framboise pur, gut gekühlt“ (Pur)
- **Ergebnis speichern als:** `fotos-ki/framboise-2.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Framboise-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-framboise.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Framboise-01.png`
- **Prompt:** 170 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein reifbeschlagenes Tulpenglas mit klarem Framboise, ohne Eis und ohne Garnitur. Daneben unscharf ein Stück Käsekuchen.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Framboise. Beilagen nur aus: Vanilledessert, weiße Schokolade, Käsekuchen.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 22. Framboise: Framboise-Tonic mit Minze

- **Sorte:** Framboise
- **Karte auf der Sortenseite:** Nr. 2 von 4, „Framboise-Tonic mit Minze“ (Auf Eis / Longdrink)
- **Ergebnis speichern als:** `fotos-ki/framboise-3.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Framboise-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-framboise.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Framboise-01.png`
- **Prompt:** 180 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Framboise-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, ein Minzzweig steckt im Glas. Das Getränk ist klar und perlt leicht. Im unscharfen Hintergrund ein kleiner Salat.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Framboise; Tonic Water, gut gekühlt; Eiswürfel; Minze. Beilagen nur aus: Sommerdesserts, Salate, Ziegenfrischkäse.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 23. Framboise: Panna cotta mit Himbeeren und Framboise

- **Sorte:** Framboise
- **Karte auf der Sortenseite:** Nr. 4 von 4, „Panna cotta mit Himbeeren und Framboise“ (In der Küche / Dessert)
- **Ergebnis speichern als:** `fotos-ki/framboise-4.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Framboise-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-framboise.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Framboise-01.png`
- **Prompt:** 167 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Dessertglas mit Panna cotta, darauf frische Himbeeren in leicht rotem Saft.
Flasche: Die Flasche steht vollständig im Bild neben dem Gericht (Hauptmotiv): Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Panna cotta (fertig oder selbst gemacht); frische Himbeeren; Zucker; Framboise. Beilagen nur aus: Panna cotta, Vanilleeis, Biskuit.
- Das Gericht ist Hauptmotiv, die Flasche steht daneben und ist vollständig sichtbar.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 24. Quetsch: Quetsch pur, gut gekühlt

- **Sorte:** Quetsch
- **Karte auf der Sortenseite:** Nr. 1 von 5, „Quetsch pur, gut gekühlt“ (Pur)
- **Ergebnis speichern als:** `fotos-ki/quetsch-2.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Quetsch-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-quetsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Quetsch-01.png`
- **Prompt:** 170 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein reifbeschlagenes Tulpenglas mit klarem Quetsch, ohne Eis und ohne Garnitur. Daneben unscharf ein Stück Zwetschgenkuchen.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Quetsch. Beilagen nur aus: Zwetschgenkuchen, Espresso, nach einem deftigen Essen.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 25. Quetsch: Quetsch-Tonic mit Zimtstange

- **Sorte:** Quetsch
- **Karte auf der Sortenseite:** Nr. 3 von 5, „Quetsch-Tonic mit Zimtstange“ (Auf Eis / Longdrink)
- **Ergebnis speichern als:** `fotos-ki/quetsch-3.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Quetsch-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-quetsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Quetsch-01.png`
- **Prompt:** 178 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Quetsch-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, eine Zimtstange steckt im Glas. Das Getränk ist klar und perlt leicht. Im unscharfen Hintergrund Käsegebäck.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Quetsch; Tonic Water, gut gekühlt; Eiswürfel; Zimtstange. Beilagen nur aus: Herbstgerichte, Kürbissuppe, Käsegebäck.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 26. Quetsch: Flambierte Zwetschgen mit Quetsch

- **Sorte:** Quetsch
- **Karte auf der Sortenseite:** Nr. 4 von 5, „Flambierte Zwetschgen mit Quetsch“ (In der Küche / Dessert)
- **Ergebnis speichern als:** `fotos-ki/quetsch-4.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Quetsch-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-quetsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Quetsch-01.png`
- **Prompt:** 168 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Eine Dessertschale mit halbierten, glänzend geschmorten Zwetschgen, dazu 2 Kugeln Vanilleeis. Keine Flamme.
Flasche: Die Flasche steht vollständig im Bild neben dem Gericht (Hauptmotiv): Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Zwetschgen; Butter; Zucker; Quetsch; Vanilleeis. Beilagen nur aus: Vanilleeis, Zimtparfait, Kaffee.
- Das Gericht ist Hauptmotiv, die Flasche steht daneben und ist vollständig sichtbar.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 27. Quetsch: Quetsch zu kräftigem Bergkäse

- **Sorte:** Quetsch
- **Karte auf der Sortenseite:** Nr. 5 von 5, „Quetsch zu kräftigem Bergkäse“ (Zum Essen)
- **Ergebnis speichern als:** `fotos-ki/quetsch-5.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Quetsch-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-quetsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Quetsch-01.png`
- **Prompt:** 175 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Tulpenglas mit 4 cl klarem Quetsch neben einem Holzbrett mit kleinen Stücken kräftigem Bergkäse, Walnüssen und Trauben.
Flasche: Die Flasche steht vollständig im Bild neben dem Essen und dem Glas: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Quetsch; kräftigem Bergkäse; Walnüsse und Trauben. Beilagen nur aus: Bergkäse, Walnüsse, Trauben.
- Neben dem Essen muss ein Glas mit dem Brand zu sehen sein.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 28. Poire Williams: Poire Williams pur, gut gekühlt

- **Sorte:** Poire Williams
- **Karte auf der Sortenseite:** Nr. 1 von 4, „Poire Williams pur, gut gekühlt“ (Pur)
- **Ergebnis speichern als:** `fotos-ki/poire-williams-2.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Poire Williams-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-poire-williams.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Williams-01.png`
- **Prompt:** 172 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein reifbeschlagenes Tulpenglas mit klarem Poire Williams, ohne Eis und ohne Garnitur. Daneben eine reife Birne mit Stiel.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Poire Williams. Beilagen nur aus: reife Birnen, Mandelgebäck, nach dem Essen.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 29. Poire Williams: Pochierte Birnen mit Poire Williams

- **Sorte:** Poire Williams
- **Karte auf der Sortenseite:** Nr. 3 von 4, „Pochierte Birnen mit Poire Williams“ (In der Küche / Dessert)
- **Ergebnis speichern als:** `fotos-ki/poire-williams-3.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Poire Williams-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-poire-williams.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Williams-01.png`
- **Prompt:** 172 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Dessertteller mit 1 bis 2 pochierten Birnen mit Stiel in glänzendem Sud, dazu eine Kugel Vanilleeis.
Flasche: Die Flasche steht vollständig im Bild neben dem Gericht (Hauptmotiv): Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: feste Birnen; Wasser; Zucker; Zimtstange; Poire Williams. Beilagen nur aus: Vanilleeis, Mandelgebäck, Schlagsahne.
- Das Gericht ist Hauptmotiv, die Flasche steht daneben und ist vollständig sichtbar.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 30. Poire Williams: Poire Williams zu mildem Blauschimmelkäse

- **Sorte:** Poire Williams
- **Karte auf der Sortenseite:** Nr. 4 von 4, „Poire Williams zu mildem Blauschimmelkäse“ (Zum Essen)
- **Ergebnis speichern als:** `fotos-ki/poire-williams-4.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Poire Williams-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-poire-williams.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Williams-01.png`
- **Prompt:** 174 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Tulpenglas mit 4 cl klarem Poire Williams neben einem Holzbrett mit mildem Blauschimmelkäse, Birnenspalten und Walnüssen.
Flasche: Die Flasche steht vollständig im Bild neben dem Essen und dem Glas: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Poire Williams; mildem Blauschimmelkäse; Birnenspalten und Walnüsse. Beilagen nur aus: Blauschimmelkäse, Birne, Walnüsse.
- Neben dem Essen muss ein Glas mit dem Brand zu sehen sein.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 31. Mirabelle: Mirabelle pur, gut gekühlt

- **Sorte:** Mirabelle
- **Karte auf der Sortenseite:** Nr. 1 von 5, „Mirabelle pur, gut gekühlt“ (Pur)
- **Ergebnis speichern als:** `fotos-ki/mirabelle-2.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Mirabelle-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-mirabelle.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Mirabelle-01.png`
- **Prompt:** 170 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein reifbeschlagenes Tulpenglas mit klarer Mirabelle, ohne Eis und ohne Garnitur. Daneben unscharf ein Stück Mirabellentarte.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Mirabelle. Beilagen nur aus: Mirabellentarte, Weichkäse, Espresso.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 32. Mirabelle: Mirabelle-Spritz mit Crémant

- **Sorte:** Mirabelle
- **Karte auf der Sortenseite:** Nr. 3 von 5, „Mirabelle-Spritz mit Crémant“ (Cocktail)
- **Ergebnis speichern als:** `fotos-ki/mirabelle-3.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Mirabelle-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-mirabelle.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Mirabelle-01.png`
- **Prompt:** 179 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Mirabelle-Spritz im großen Weinglas auf viel Eis, das Getränk hell, fast klar und perlend, ein Thymianzweig im Glas. Im unscharfen Hintergrund ein Stück Flammkuchen.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Mirabelle; Crémant, gut gekühlt; Sodawasser; Eiswürfel; Thymianzweig. Beilagen nur aus: Aperitif, Quiche, Flammkuchen.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 33. Mirabelle: Geschmorte Mirabellen mit Mirabelle

- **Sorte:** Mirabelle
- **Karte auf der Sortenseite:** Nr. 4 von 5, „Geschmorte Mirabellen mit Mirabelle“ (In der Küche / Dessert)
- **Ergebnis speichern als:** `fotos-ki/mirabelle-4.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Mirabelle-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-mirabelle.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Mirabelle-01.png`
- **Prompt:** 169 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Eine Dessertschale mit warm geschmorten gelben Mirabellen in glänzendem Sud, dazu 2 Kugeln Vanilleeis.
Flasche: Die Flasche steht vollständig im Bild neben dem Gericht (Hauptmotiv): Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Mirabellen; Butter; Zucker; Mirabelle; Vanilleeis. Beilagen nur aus: Vanilleeis, Quark, Buttergebäck.
- Das Gericht ist Hauptmotiv, die Flasche steht daneben und ist vollständig sichtbar.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 34. Mirabelle: Mirabelle zu mildem Weichkäse

- **Sorte:** Mirabelle
- **Karte auf der Sortenseite:** Nr. 5 von 5, „Mirabelle zu mildem Weichkäse“ (Zum Essen)
- **Ergebnis speichern als:** `fotos-ki/mirabelle-5.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Mirabelle-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-mirabelle.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Mirabelle-01.png`
- **Prompt:** 173 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Tulpenglas mit 4 cl klarer Mirabelle neben einem Holzbrett mit mildem Weichkäse, Mandeln und Weintrauben.
Flasche: Die Flasche steht vollständig im Bild neben dem Essen und dem Glas: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Mirabelle; mildem Weichkäse; Mandeln und Weintrauben. Beilagen nur aus: Weichkäse, Mandeln, Trauben.
- Neben dem Essen muss ein Glas mit dem Brand zu sehen sein.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 35. Hierber aale Fruucht: Hierber aale Fruucht pur, bei Zimmertemperatur

- **Sorte:** Hierber aale Fruucht
- **Karte auf der Sortenseite:** Nr. 1 von 4, „Hierber aale Fruucht pur, bei Zimmertemperatur“ (Pur)
- **Ergebnis speichern als:** `fotos-ki/hierber-fruucht-2.png`
- **Status:** offen
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Fruucht-01.png`
- **Prompt:** 178 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Ballonglas mit 4 cl warm bernsteinfarbener Hierber aale Fruucht, ohne Eis und ohne Garnitur. Daneben unscharf ein paar Nüsse.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: flache dunkle Holzkappe. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: warmes, kräftiges Bernstein.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: flache dunkle Holzkappe.
- Nur Rezept-Zutaten im Bild: Hierber aale Fruucht. Beilagen nur aus: Nüsse, reifer Käse, ruhiger Abend.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.

---

## 36. Hierber aale Fruucht: Hierber aale Fruucht über Vanilleeis

- **Sorte:** Hierber aale Fruucht
- **Karte auf der Sortenseite:** Nr. 3 von 4, „Hierber aale Fruucht über Vanilleeis“ (In der Küche / Dessert)
- **Ergebnis speichern als:** `fotos-ki/hierber-fruucht-3.png`
- **Status:** offen
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Fruucht-01.png`
- **Prompt:** 177 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Eine Dessertschale mit 2 bis 3 Kugeln Vanilleeis, leicht angeschmolzen, darüber warm bernsteinfarbene Fruucht geträufelt und gehackte Walnüsse.
Flasche: Die Flasche steht vollständig im Bild neben dem Gericht (Hauptmotiv): Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: flache dunkle Holzkappe. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: warmes, kräftiges Bernstein.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: flache dunkle Holzkappe.
- Nur Rezept-Zutaten im Bild: Vanilleeis; Hierber aale Fruucht; gehackte Walnüsse. Beilagen nur aus: Espresso, Walnüsse, Gebäck.
- Das Gericht ist Hauptmotiv, die Flasche steht daneben und ist vollständig sichtbar.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.

---

## 37. Hierber aale Fruucht: Hierber aale Fruucht zu kräftigem, reifem Käse

- **Sorte:** Hierber aale Fruucht
- **Karte auf der Sortenseite:** Nr. 4 von 4, „Hierber aale Fruucht zu kräftigem, reifem Käse“ (Zum Essen)
- **Ergebnis speichern als:** `fotos-ki/hierber-fruucht-4.png`
- **Status:** offen
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Fruucht-01.png`
- **Prompt:** 179 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Ballonglas mit 4 cl warm bernsteinfarbener Fruucht neben einem Holzbrett mit kräftigem, reifem Käse, Walnüssen und Trauben.
Flasche: Die Flasche steht vollständig im Bild neben dem Essen und dem Glas: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: flache dunkle Holzkappe. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: warmes, kräftiges Bernstein.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: flache dunkle Holzkappe.
- Nur Rezept-Zutaten im Bild: Hierber aale Fruucht; kräftigem, reifem Käse; Walnüsse und Trauben. Beilagen nur aus: reifer Käse, Walnüsse, Feigen.
- Neben dem Essen muss ein Glas mit dem Brand zu sehen sein.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.

---

## 38. Vieux Marc: Vieux Marc pur, bei Zimmertemperatur

- **Sorte:** Vieux Marc
- **Karte auf der Sortenseite:** Nr. 1 von 4, „Vieux Marc pur, bei Zimmertemperatur“ (Pur)
- **Ergebnis speichern als:** `fotos-ki/vieux-marc-2.png`
- **Status:** offen
- **Anhang 1 (Karaffe: die dunkle Vieux-Marc-Karaffe vorn links im Foto (nur die Karaffe beachten)):** `fotos/flaschenreihe-theke.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Vieux marc-01.png`
- **Prompt:** 189 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Ballonglas mit 4 cl kräftig bernsteinfarbenem Vieux Marc, ohne Eis und ohne Garnitur. Daneben unscharf eine kleine Tasse Espresso.
Flasche: Die Karaffe steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: schwarzer, profilierter Stopfen mit Wulst am Hals. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Karaffe gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Karaffe: sehr dunkles, undurchsichtiges Braunglas, der Brand ist nicht zu sehen.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: schwarzer, profilierter Stopfen mit Wulst am Hals.
- Nur Rezept-Zutaten im Bild: Vieux Marc. Beilagen nur aus: Espresso, Käse, Trauben.
- Anhang 1 ist ein Gruppenfoto: nur die dunkle Karaffe vorn links als Formvorlage nutzen, deren Etikett nicht übernehmen.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (karaffe); Verschluss und Brandfarbe stehen im Prompt.

---

## 39. Vieux Marc: Vieux Marc zu kräftigem Käse

- **Sorte:** Vieux Marc
- **Karte auf der Sortenseite:** Nr. 3 von 4, „Vieux Marc zu kräftigem Käse“ (Zum Essen)
- **Ergebnis speichern als:** `fotos-ki/vieux-marc-3.png`
- **Status:** offen
- **Anhang 1 (Karaffe: die dunkle Vieux-Marc-Karaffe vorn links im Foto (nur die Karaffe beachten)):** `fotos/flaschenreihe-theke.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Vieux marc-01.png`
- **Prompt:** 190 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Ballonglas mit 4 cl kräftig bernsteinfarbenem Vieux Marc neben einem Holzbrett mit kräftigem Käse, Trauben und Nüssen.
Flasche: Die Karaffe steht vollständig im Bild neben dem Essen und dem Glas: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: schwarzer, profilierter Stopfen mit Wulst am Hals. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Karaffe gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Karaffe: sehr dunkles, undurchsichtiges Braunglas, der Brand ist nicht zu sehen.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: schwarzer, profilierter Stopfen mit Wulst am Hals.
- Nur Rezept-Zutaten im Bild: Vieux Marc; kräftigem Käse; Trauben und Nüsse. Beilagen nur aus: kräftiger Käse, Trauben, Nüsse.
- Neben dem Essen muss ein Glas mit dem Brand zu sehen sein.
- Anhang 1 ist ein Gruppenfoto: nur die dunkle Karaffe vorn links als Formvorlage nutzen, deren Etikett nicht übernehmen.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (karaffe); Verschluss und Brandfarbe stehen im Prompt.

---

## 40. Vieux Marc: Vieux Marc zu dunkler Schokolade

- **Sorte:** Vieux Marc
- **Karte auf der Sortenseite:** Nr. 4 von 4, „Vieux Marc zu dunkler Schokolade“ (Zum Essen)
- **Ergebnis speichern als:** `fotos-ki/vieux-marc-4.png`
- **Status:** offen
- **Anhang 1 (Karaffe: die dunkle Vieux-Marc-Karaffe vorn links im Foto (nur die Karaffe beachten)):** `fotos/flaschenreihe-theke.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Vieux marc-01.png`
- **Prompt:** 190 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Ballonglas mit 4 cl kräftig bernsteinfarbenem Vieux Marc neben 3 Stücken dunkler Schokolade auf einem kleinen Brett.
Flasche: Die Karaffe steht vollständig im Bild neben dem Essen und dem Glas: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: schwarzer, profilierter Stopfen mit Wulst am Hals. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Karaffe gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Karaffe: sehr dunkles, undurchsichtiges Braunglas, der Brand ist nicht zu sehen.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: schwarzer, profilierter Stopfen mit Wulst am Hals.
- Nur Rezept-Zutaten im Bild: Vieux Marc; dunkle Schokolade (mindestens 70 % Kakao). Beilagen nur aus: Trüffel, Espresso, Nüsse.
- Neben dem Essen muss ein Glas mit dem Brand zu sehen sein.
- Anhang 1 ist ein Gruppenfoto: nur die dunkle Karaffe vorn links als Formvorlage nutzen, deren Etikett nicht übernehmen.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (karaffe); Verschluss und Brandfarbe stehen im Prompt.

---

## 41. Vieille Prune: Vieille Prune pur, bei Zimmertemperatur

- **Sorte:** Vieille Prune
- **Karte auf der Sortenseite:** Nr. 1 von 4, „Vieille Prune pur, bei Zimmertemperatur“ (Pur)
- **Ergebnis speichern als:** `fotos-ki/vieille-prune-2.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Vieille Prune-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-vieille-prune.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Vieille prune-01.png`
- **Prompt:** 173 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Ballonglas mit 4 cl klar goldgelber Vieille Prune, ohne Eis und ohne Garnitur. Daneben unscharf ein Stück Zwetschgenkuchen.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klares, kräftiges Goldgelb.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Vieille Prune. Beilagen nur aus: Zwetschgenkuchen, Hartkäse, Espresso.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 42. Vieille Prune: Vieille Prune über Vanilleeis

- **Sorte:** Vieille Prune
- **Karte auf der Sortenseite:** Nr. 3 von 4, „Vieille Prune über Vanilleeis“ (In der Küche / Dessert)
- **Ergebnis speichern als:** `fotos-ki/vieille-prune-3.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Vieille Prune-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-vieille-prune.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Vieille prune-01.png`
- **Prompt:** 178 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Eine Dessertschale mit 2 bis 3 Kugeln Vanilleeis, leicht angeschmolzen, darüber goldgelbe Vieille Prune geträufelt und gehackte Nüsse. Daneben unscharf eine Tasse Espresso.
Flasche: Die Flasche steht vollständig im Bild neben dem Gericht (Hauptmotiv): Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klares, kräftiges Goldgelb.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Vanilleeis; Vieille Prune; gehackte Nüsse. Beilagen nur aus: Zwetschgenkompott, Espresso, Mandelgebäck.
- Das Gericht ist Hauptmotiv, die Flasche steht daneben und ist vollständig sichtbar.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 43. Vieille Prune: Vieille Prune zu kräftigem Bergkäse

- **Sorte:** Vieille Prune
- **Karte auf der Sortenseite:** Nr. 4 von 4, „Vieille Prune zu kräftigem Bergkäse“ (Zum Essen)
- **Ergebnis speichern als:** `fotos-ki/vieille-prune-4.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Vieille Prune-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-vieille-prune.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Vieille prune-01.png`
- **Prompt:** 175 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Ballonglas mit 4 cl klar goldgelber Vieille Prune neben einem Holzbrett mit kräftigem Bergkäse, Walnüssen und Trauben.
Flasche: Die Flasche steht vollständig im Bild neben dem Essen und dem Glas: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klares, kräftiges Goldgelb.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Vieille Prune; kräftigem Bergkäse; Walnüsse und Trauben. Beilagen nur aus: Bergkäse, Walnüsse, Trauben.
- Neben dem Essen muss ein Glas mit dem Brand zu sehen sein.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 44. Vieille Pomme: Vieille Pomme pur, bei Zimmertemperatur

- **Sorte:** Vieille Pomme
- **Karte auf der Sortenseite:** Nr. 1 von 4, „Vieille Pomme pur, bei Zimmertemperatur“ (Pur)
- **Ergebnis speichern als:** `fotos-ki/vieille-pomme-2.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Vieille Pomme-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-vieille-pomme.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Vieille pomme-01.png`
- **Prompt:** 172 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Ballonglas mit 4 cl klar goldgelber Vieille Pomme, ohne Eis und ohne Garnitur. Daneben unscharf ein Stück Apfelkuchen.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klares Goldgelb.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Vieille Pomme. Beilagen nur aus: Apfelkuchen, Hartkäse, Espresso.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 45. Vieille Pomme: Apfeltarte mit Vieille Pomme

- **Sorte:** Vieille Pomme
- **Karte auf der Sortenseite:** Nr. 3 von 4, „Apfeltarte mit Vieille Pomme“ (In der Küche / Dessert)
- **Ergebnis speichern als:** `fotos-ki/vieille-pomme-3.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Vieille Pomme-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-vieille-pomme.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Vieille pomme-01.png`
- **Prompt:** 165 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Dessertteller mit einem Stück warmer Apfeltarte, dazu eine Kugel Vanilleeis.
Flasche: Die Flasche steht vollständig im Bild neben dem Gericht (Hauptmotiv): Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klares Goldgelb.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Apfeltarte; Vieille Pomme; Vanilleeis. Beilagen nur aus: Apfeltarte, Vanilleeis, Kaffee.
- Das Gericht ist Hauptmotiv, die Flasche steht daneben und ist vollständig sichtbar.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 46. Vieille Pomme: Vieille Pomme zu gereiftem Comté

- **Sorte:** Vieille Pomme
- **Karte auf der Sortenseite:** Nr. 4 von 4, „Vieille Pomme zu gereiftem Comté“ (Zum Essen)
- **Ergebnis speichern als:** `fotos-ki/vieille-pomme-4.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Vieille Pomme-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-vieille-pomme.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Vieille pomme-01.png`
- **Prompt:** 174 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Ballonglas mit 4 cl klar goldgelber Vieille Pomme neben einem Holzbrett mit gereiftem Comté, Apfelspalten und Walnüssen.
Flasche: Die Flasche steht vollständig im Bild neben dem Essen und dem Glas: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klares Goldgelb.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Vieille Pomme; gereiftem Comté; Apfelspalten und Walnüsse. Beilagen nur aus: Comté, Apfel, Walnüsse.
- Neben dem Essen muss ein Glas mit dem Brand zu sehen sein.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 47. Hunnegdrëpp: Heißer Hunnegdrëpp mit Tee und Zitrone

- **Sorte:** Hunnegdrëpp
- **Karte auf der Sortenseite:** Nr. 1 von 5, „Heißer Hunnegdrëpp mit Tee und Zitrone“ (Auf Eis / Longdrink)
- **Ergebnis speichern als:** `fotos-ki/hunnegdrepp-2.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Hunnegdrëpp-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-hunnegdrepp.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Hunnegdrepp-01.png`
- **Prompt:** 173 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Teeglas mit heißem Schwarztee, eine Zitronenscheibe und eine Nelke im Glas, dezenter Dampf, kein Eis. Daneben unscharf ein Lebkuchen.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: tiefes Honiggold.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Hunnegdrëpp; heißer Schwarztee; Scheibe Zitrone; Nelke (nach Belieben). Beilagen nur aus: Lebkuchen, Shortbread, kalte Abende.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 48. Hunnegdrëpp: Hunnegdrëpp pur, gut gekühlt

- **Sorte:** Hunnegdrëpp
- **Karte auf der Sortenseite:** Nr. 2 von 5, „Hunnegdrëpp pur, gut gekühlt“ (Pur)
- **Ergebnis speichern als:** `fotos-ki/hunnegdrepp-3.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Hunnegdrëpp-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-hunnegdrepp.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Hunnegdrepp-01.png`
- **Prompt:** 171 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein reifbeschlagenes Tulpenglas mit 4 cl honiggoldenem Hunnegdrëpp, ohne Eis und ohne Garnitur. Daneben unscharf ein paar Walnüsse.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: tiefes Honiggold.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Hunnegdrëpp. Beilagen nur aus: Käse, Walnüsse, Gebäck.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 49. Hunnegdrëpp: Joghurt mit Honig und Hunnegdrëpp

- **Sorte:** Hunnegdrëpp
- **Karte auf der Sortenseite:** Nr. 4 von 5, „Joghurt mit Honig und Hunnegdrëpp“ (In der Küche / Dessert)
- **Ergebnis speichern als:** `fotos-ki/hunnegdrepp-4.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Hunnegdrëpp-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-hunnegdrepp.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Hunnegdrepp-01.png`
- **Prompt:** 165 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Dessertglas mit Naturjoghurt, darüber ein Löffel Honig und gehackte Nüsse.
Flasche: Die Flasche steht vollständig im Bild neben dem Gericht (Hauptmotiv): Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: tiefes Honiggold.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Naturjoghurt; Honig; Hunnegdrëpp; gehackte Nüsse. Beilagen nur aus: Frühstück, frische Früchte, leichtes Dessert.
- Das Gericht ist Hauptmotiv, die Flasche steht daneben und ist vollständig sichtbar.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 50. Hunnegdrëpp: Hunnegdrëpp zu Ziegenkäse

- **Sorte:** Hunnegdrëpp
- **Karte auf der Sortenseite:** Nr. 5 von 5, „Hunnegdrëpp zu Ziegenkäse“ (Zum Essen)
- **Ergebnis speichern als:** `fotos-ki/hunnegdrepp-5.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Hunnegdrëpp-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-hunnegdrepp.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Hunnegdrepp-01.png`
- **Prompt:** 171 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Tulpenglas mit 4 cl honiggoldenem Hunnegdrëpp neben einem Holzbrett mit Ziegenkäse, Walnüssen und Feigen.
Flasche: Die Flasche steht vollständig im Bild neben dem Essen und dem Glas: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: tiefes Honiggold.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Hunnegdrëpp; Ziegenkäse; Walnüsse und Feigen. Beilagen nur aus: Ziegenkäse, Feigen, Walnüsse.
- Neben dem Essen muss ein Glas mit dem Brand zu sehen sein.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 51. Hierber Hunneg Whisky: Hunneg Whisky auf einem großen Eiswürfel

- **Sorte:** Hierber Hunneg Whisky
- **Karte auf der Sortenseite:** Nr. 1 von 4, „Hunneg Whisky auf einem großen Eiswürfel“ (Auf Eis / Longdrink)
- **Ergebnis speichern als:** `fotos-ki/hunneg-whisky-2.png`
- **Status:** offen
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Whisky 0,5L Hunneg-01.png`
- **Prompt:** 181 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Tumbler mit einem einzigen großen klaren Eiswürfel, der Hunneg Whisky warmes Goldbernstein, ohne Garnitur. Daneben ein paar Walnüsse und ein Stück dunkle Schokolade.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: schwarze, geriffelte Schraubkappe. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: warmes Goldbernstein.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: schwarze, geriffelte Schraubkappe.
- Nur Rezept-Zutaten im Bild: Hunneg Whisky; großer Eiswürfel. Beilagen nur aus: Hartkäse, Walnüsse, dunkle Schokolade.
- Flüssigkeitsfarbe ist in den Daten nur geschätzt (fluessigkeit.js: #c4912e); mit dem echten Produkt abgleichen.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.
- Verschluss (schwarze Schraubkappe) ist wie beim Whisky angenommen, es gibt kein Foto der Hunneg-Whisky-Flasche.

---

## 52. Hierber Hunneg Whisky: Heißer Hunneg Whisky mit Zitrone und Zimt

- **Sorte:** Hierber Hunneg Whisky
- **Karte auf der Sortenseite:** Nr. 2 von 4, „Heißer Hunneg Whisky mit Zitrone und Zimt“ (Auf Eis / Longdrink)
- **Ergebnis speichern als:** `fotos-ki/hunneg-whisky-3.png`
- **Status:** offen
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Whisky 0,5L Hunneg-01.png`
- **Prompt:** 178 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Teeglas mit heißem, goldgelbem Getränk, eine Zitronenscheibe und eine Zimtstange im Glas, dezenter Dampf, kein Eis. Daneben unscharf ein Lebkuchen.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: schwarze, geriffelte Schraubkappe. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: warmes Goldbernstein.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: schwarze, geriffelte Schraubkappe.
- Nur Rezept-Zutaten im Bild: Hierber Hunneg Whisky; heißes Wasser; Scheibe Zitrone; Zimtstange. Beilagen nur aus: Lebkuchen, kalte Abende, Shortbread.
- Flüssigkeitsfarbe ist in den Daten nur geschätzt (fluessigkeit.js: #c4912e); mit dem echten Produkt abgleichen.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.
- Verschluss (schwarze Schraubkappe) ist wie beim Whisky angenommen, es gibt kein Foto der Hunneg-Whisky-Flasche.

---

## 53. Hierber Hunneg Whisky: Hunneg Whisky zu Comté

- **Sorte:** Hierber Hunneg Whisky
- **Karte auf der Sortenseite:** Nr. 4 von 4, „Hunneg Whisky zu Comté“ (Zum Essen)
- **Ergebnis speichern als:** `fotos-ki/hunneg-whisky-4.png`
- **Status:** offen
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Whisky 0,5L Hunneg-01.png`
- **Prompt:** 178 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Tulpenglas mit 4 cl goldbernsteinfarbenem Hunneg Whisky neben einem Holzbrett mit kleinen Stücken Comté, Walnüssen und Trauben.
Flasche: Die Flasche steht vollständig im Bild neben dem Essen und dem Glas: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: schwarze, geriffelte Schraubkappe. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: warmes Goldbernstein.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: schwarze, geriffelte Schraubkappe.
- Nur Rezept-Zutaten im Bild: Hunneg Whisky; Comté; Walnüsse und Trauben. Beilagen nur aus: Comté, Walnüsse, Birne.
- Neben dem Essen muss ein Glas mit dem Brand zu sehen sein.
- Flüssigkeitsfarbe ist in den Daten nur geschätzt (fluessigkeit.js: #c4912e); mit dem echten Produkt abgleichen.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.
- Verschluss (schwarze Schraubkappe) ist wie beim Whisky angenommen, es gibt kein Foto der Hunneg-Whisky-Flasche.

---

## 54. Kräiderdrëpp: Kräiderdrëpp pur, gut gekühlt

- **Sorte:** Kräiderdrëpp
- **Karte auf der Sortenseite:** Nr. 1 von 4, „Kräiderdrëpp pur, gut gekühlt“ (Pur)
- **Ergebnis speichern als:** `fotos-ki/kraeiderdrepp-2.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Kräiderdrëpp-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-kraeiderdrepp.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Kraider-01.png`
- **Prompt:** 171 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein reifbeschlagenes Tulpenglas mit klarem Kräiderdrëpp, ohne Eis und ohne Garnitur. Daneben unscharf ein Stück kräftiger Käse.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Kräiderdrëpp. Beilagen nur aus: deftige Gerichte, kräftiger Käse, nach dem Essen.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 55. Kräiderdrëpp: Kräiderdrëpp mit Ginger Beer

- **Sorte:** Kräiderdrëpp
- **Karte auf der Sortenseite:** Nr. 3 von 4, „Kräiderdrëpp mit Ginger Beer“ (Auf Eis / Longdrink)
- **Ergebnis speichern als:** `fotos-ki/kraeiderdrepp-3.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Kräiderdrëpp-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-kraeiderdrepp.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Kraider-01.png`
- **Prompt:** 178 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Kräiderdrëpp mit Ginger Beer im Longdrinkglas auf viel Eis, das Getränk hell, leicht trüb und perlend, eine Limettenspalte am Glasrand. Im unscharfen Hintergrund Grillgemüse.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Kräiderdrëpp; Limettensaft; Ginger Beer; Eiswürfel; Limettenspalte. Beilagen nur aus: Grillgemüse, Burger, deftige Gerichte.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 56. Kräiderdrëpp: Kräiderdrëpp nach einem deftigen Essen

- **Sorte:** Kräiderdrëpp
- **Karte auf der Sortenseite:** Nr. 4 von 4, „Kräiderdrëpp nach einem deftigen Essen“ (Zum Essen)
- **Ergebnis speichern als:** `fotos-ki/kraeiderdrepp-4.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Kräiderdrëpp-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-kraeiderdrepp.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Kraider-01.png`
- **Prompt:** 171 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Stamperl mit klarem, gekühltem Kräiderdrëpp vor einem unscharfen Teller mit Schweinebraten und Kartoffeln.
Flasche: Die Flasche steht vollständig im Bild neben dem Essen und dem Glas: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Kräiderdrëpp, gut gekühlt. Beilagen nur aus: Schweinebraten, Kartoffelgerichte, kräftige Wurst.
- Neben dem Essen muss ein Glas mit dem Brand zu sehen sein.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 57. Kürbisdrëpp: Kürbisdrëpp pur, gut gekühlt

- **Sorte:** Kürbisdrëpp
- **Karte auf der Sortenseite:** Nr. 1 von 4, „Kürbisdrëpp pur, gut gekühlt“ (Pur)
- **Ergebnis speichern als:** `fotos-ki/kuerbisdrepp-2.png`
- **Status:** offen
- **Anhang 1 (schlanke 0,5-L-Flasche (Foto der Kirsch-Flasche, dieselbe Form; deren Etikett nicht übernehmen)):** `Fotos/flasche-kirsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Kürbisdrepp-01.png`
- **Prompt:** 170 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein reifbeschlagenes Tulpenglas mit klarem Kürbisdrëpp, ohne Eis und ohne Garnitur. Daneben unscharf ein Schälchen Kürbiskerne.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Kürbisdrëpp. Beilagen nur aus: Kürbiskerne, Hartkäse, Espresso.
- Das Etikett nennt 40 % vol., die Preisliste 45 %: den Wert des Etiketts nicht ändern, Brenner klärt (TODO-INHALTE.md, Abschnitt 1).
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (schlank); Verschluss und Brandfarbe stehen im Prompt.

---

## 58. Kürbisdrëpp: Kürbisdrëpp mit Ginger Beer

- **Sorte:** Kürbisdrëpp
- **Karte auf der Sortenseite:** Nr. 2 von 4, „Kürbisdrëpp mit Ginger Beer“ (Auf Eis / Longdrink)
- **Ergebnis speichern als:** `fotos-ki/kuerbisdrepp-3.png`
- **Status:** offen
- **Anhang 1 (schlanke 0,5-L-Flasche (Foto der Kirsch-Flasche, dieselbe Form; deren Etikett nicht übernehmen)):** `Fotos/flasche-kirsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Kürbisdrepp-01.png`
- **Prompt:** 178 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Kürbisdrëpp mit Ginger Beer im Longdrinkglas auf viel Eis, das Getränk hell, leicht trüb und perlend, eine Limettenspalte am Glasrand. Im unscharfen Hintergrund Käsegebäck.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Kürbisdrëpp; Limettensaft; Ginger Beer; Eiswürfel; Limettenspalte. Beilagen nur aus: Herbstgerichte, Kürbissuppe, Käsegebäck.
- Das Etikett nennt 40 % vol., die Preisliste 45 %: den Wert des Etiketts nicht ändern, Brenner klärt (TODO-INHALTE.md, Abschnitt 1).
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (schlank); Verschluss und Brandfarbe stehen im Prompt.

---

## 59. Kürbisdrëpp: Kürbisdrëpp zu kräftigem Hartkäse

- **Sorte:** Kürbisdrëpp
- **Karte auf der Sortenseite:** Nr. 4 von 4, „Kürbisdrëpp zu kräftigem Hartkäse“ (Zum Essen)
- **Ergebnis speichern als:** `fotos-ki/kuerbisdrepp-4.png`
- **Status:** offen
- **Anhang 1 (schlanke 0,5-L-Flasche (Foto der Kirsch-Flasche, dieselbe Form; deren Etikett nicht übernehmen)):** `Fotos/flasche-kirsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Kürbisdrepp-01.png`
- **Prompt:** 174 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Tulpenglas mit 4 cl klarem Kürbisdrëpp neben einem Holzbrett mit kräftigem Hartkäse, gerösteten Kürbiskernen und Walnüssen.
Flasche: Die Flasche steht vollständig im Bild neben dem Essen und dem Glas: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Kürbisdrëpp; kräftigem Hartkäse; gerösteten Kürbiskernen. Beilagen nur aus: Hartkäse, Kürbiskerne, Walnüsse.
- Neben dem Essen muss ein Glas mit dem Brand zu sehen sein.
- Das Etikett nennt 40 % vol., die Preisliste 45 %: den Wert des Etiketts nicht ändern, Brenner klärt (TODO-INHALTE.md, Abschnitt 1).
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (schlank); Verschluss und Brandfarbe stehen im Prompt.

---

## 60. Grain: Grain eiskalt

- **Sorte:** Grain
- **Karte auf der Sortenseite:** Nr. 1 von 3, „Grain eiskalt“ (Pur)
- **Ergebnis speichern als:** `fotos-ki/grain-2.png`
- **Status:** offen
- **Anhang 1 (schlanke 0,5-L-Flasche (Foto der Kirsch-Flasche, dieselbe Form; deren Etikett nicht übernehmen)):** `Fotos/flasche-kirsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Grain-01.png`
- **Prompt:** 171 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein reifbeschlagenes Stamperl mit eiskaltem, klarem Grain, ohne Eis und ohne Garnitur. Daneben unscharf ein paar Gewürzgurken.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Grain. Beilagen nur aus: deftige Brotzeit, Schinken, Gewürzgurken.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (schlank); Verschluss und Brandfarbe stehen im Prompt.

---

## 61. Grain: Grain zu Brotzeit mit Schinken

- **Sorte:** Grain
- **Karte auf der Sortenseite:** Nr. 3 von 3, „Grain zu Brotzeit mit Schinken“ (Zum Essen)
- **Ergebnis speichern als:** `fotos-ki/grain-3.png`
- **Status:** offen
- **Anhang 1 (schlanke 0,5-L-Flasche (Foto der Kirsch-Flasche, dieselbe Form; deren Etikett nicht übernehmen)):** `Fotos/flasche-kirsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Grain-01.png`
- **Prompt:** 174 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Stamperl mit klarem, gekühltem Grain neben einem Holzbrett: luftgetrockneter Schinken, 2 Scheiben Bauernbrot und 3 Gewürzgurken.
Flasche: Die Flasche steht vollständig im Bild neben dem Essen und dem Glas: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Grain, gekühlt; luftgetrockneter Schinken; Bauernbrot; Gewürzgurken. Beilagen nur aus: Schinken, Bauernbrot, Gewürzgurken.
- Neben dem Essen muss ein Glas mit dem Brand zu sehen sein.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (schlank); Verschluss und Brandfarbe stehen im Prompt.

---

## 62. Hondsaarsch: Hondsaarsch pur, gut gekühlt

- **Sorte:** Hondsaarsch
- **Karte auf der Sortenseite:** Nr. 1 von 4, „Hondsaarsch pur, gut gekühlt“ (Pur)
- **Ergebnis speichern als:** `fotos-ki/hondsaarsch-2.png`
- **Status:** offen
- **Anhang 1 (schlanke 0,5-L-Flasche (Foto der Kirsch-Flasche, dieselbe Form; deren Etikett nicht übernehmen)):** `Fotos/flasche-kirsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Hondsaarsch-01.png`
- **Prompt:** 170 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein reifbeschlagenes Tulpenglas mit klarem Hondsaarsch, ohne Eis und ohne Garnitur. Daneben unscharf eine Tasse Espresso.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Hondsaarsch. Beilagen nur aus: Wildgerichte, kräftiger Käse, Espresso.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (schlank); Verschluss und Brandfarbe stehen im Prompt.

---

## 63. Hondsaarsch: Hondsaarsch über Vanilleeis

- **Sorte:** Hondsaarsch
- **Karte auf der Sortenseite:** Nr. 3 von 4, „Hondsaarsch über Vanilleeis“ (In der Küche / Dessert)
- **Ergebnis speichern als:** `fotos-ki/hondsaarsch-3.png`
- **Status:** offen
- **Anhang 1 (schlanke 0,5-L-Flasche (Foto der Kirsch-Flasche, dieselbe Form; deren Etikett nicht übernehmen)):** `Fotos/flasche-kirsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Hondsaarsch-01.png`
- **Prompt:** 177 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Eine Dessertschale mit 2 bis 3 Kugeln Vanilleeis, leicht angeschmolzen, darüber klarer Hondsaarsch geträufelt und gehackte Nüsse. Daneben unscharf eine Tasse Espresso.
Flasche: Die Flasche steht vollständig im Bild neben dem Gericht (Hauptmotiv): Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Vanilleeis; Hondsaarsch; gehackte Nüsse. Beilagen nur aus: Espresso, Gebäck, frische Früchte.
- Das Gericht ist Hauptmotiv, die Flasche steht daneben und ist vollständig sichtbar.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (schlank); Verschluss und Brandfarbe stehen im Prompt.

---

## 64. Hondsaarsch: Hondsaarsch zu kräftigem Käse

- **Sorte:** Hondsaarsch
- **Karte auf der Sortenseite:** Nr. 4 von 4, „Hondsaarsch zu kräftigem Käse“ (Zum Essen)
- **Ergebnis speichern als:** `fotos-ki/hondsaarsch-4.png`
- **Status:** offen
- **Anhang 1 (schlanke 0,5-L-Flasche (Foto der Kirsch-Flasche, dieselbe Form; deren Etikett nicht übernehmen)):** `Fotos/flasche-kirsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Hondsaarsch-01.png`
- **Prompt:** 173 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Tulpenglas mit 4 cl klarem Hondsaarsch neben einem Holzbrett mit kräftigem Käse, Walnüssen und Trauben.
Flasche: Die Flasche steht vollständig im Bild neben dem Essen und dem Glas: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Hondsaarsch; kräftigem Käse; Walnüsse und Trauben. Beilagen nur aus: kräftigem Käse, Walnüsse, Trauben.
- Neben dem Essen muss ein Glas mit dem Brand zu sehen sein.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (schlank); Verschluss und Brandfarbe stehen im Prompt.

---

## 65. Kiwibeeren: Kiwibeeren pur, gut gekühlt

- **Sorte:** Kiwibeeren
- **Karte auf der Sortenseite:** Nr. 1 von 4, „Kiwibeeren pur, gut gekühlt“ (Pur)
- **Ergebnis speichern als:** `fotos-ki/kiwibeeren-2.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Kiwibeeren-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-kiwibeeren.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Kiwi-01.png`
- **Prompt:** 171 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein reifbeschlagenes Tulpenglas mit klarem Kiwibeeren-Brand, ohne Eis und ohne Garnitur. Daneben unscharf ein Stück weiße Schokolade.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Kiwibeeren. Beilagen nur aus: frische Früchte, weiße Schokolade, leichte Desserts.
- Das Etikett nennt 43 % vol., die Preisliste 45 %: den Wert des Etiketts nicht ändern, Brenner klärt (TODO-INHALTE.md, Abschnitt 1).
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 66. Kiwibeeren: Kiwibeeren-Tonic mit Limettenscheibe

- **Sorte:** Kiwibeeren
- **Karte auf der Sortenseite:** Nr. 2 von 4, „Kiwibeeren-Tonic mit Limettenscheibe“ (Auf Eis / Longdrink)
- **Ergebnis speichern als:** `fotos-ki/kiwibeeren-3.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Kiwibeeren-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-kiwibeeren.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Kiwi-01.png`
- **Prompt:** 179 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Kiwibeeren-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, eine Limettenscheibe im Glas. Das Getränk ist klar und perlt leicht. Im unscharfen Hintergrund ein kleiner Salat.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Kiwibeeren; Tonic Water, gut gekühlt; Eiswürfel; Limettenscheibe. Beilagen nur aus: Sommersalate, leichte Vorspeisen, Ziegenfrischkäse.
- Das Etikett nennt 43 % vol., die Preisliste 45 %: den Wert des Etiketts nicht ändern, Brenner klärt (TODO-INHALTE.md, Abschnitt 1).
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 67. Kiwibeeren: Joghurt mit Honig und Kiwibeeren

- **Sorte:** Kiwibeeren
- **Karte auf der Sortenseite:** Nr. 4 von 4, „Joghurt mit Honig und Kiwibeeren“ (In der Küche / Dessert)
- **Ergebnis speichern als:** `fotos-ki/kiwibeeren-4.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Kiwibeeren-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-kiwibeeren.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Kiwi-01.png`
- **Prompt:** 166 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Dessertglas mit Naturjoghurt, darüber ein Löffel Honig und gehackte Nüsse.
Flasche: Die Flasche steht vollständig im Bild neben dem Gericht (Hauptmotiv): Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Naturjoghurt; Honig; Kiwibeeren; gehackte Nüsse. Beilagen nur aus: Frühstück, frische Früchte, leichtes Dessert.
- Das Gericht ist Hauptmotiv, die Flasche steht daneben und ist vollständig sichtbar.
- Das Etikett nennt 43 % vol., die Preisliste 45 %: den Wert des Etiketts nicht ändern, Brenner klärt (TODO-INHALTE.md, Abschnitt 1).
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 68. Poire: Poire pur, gut gekühlt

- **Sorte:** Poire
- **Karte auf der Sortenseite:** Nr. 1 von 4, „Poire pur, gut gekühlt“ (Pur)
- **Ergebnis speichern als:** `fotos-ki/poire-2.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Poire-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-poire.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Poire-01.png`
- **Prompt:** 170 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein reifbeschlagenes Tulpenglas mit klarer Poire, ohne Eis und ohne Garnitur. Daneben unscharf eine reife Birne.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Poire. Beilagen nur aus: reife Birnen, Mandelgebäck, nach dem Essen.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 69. Poire: Poire über Vanilleeis

- **Sorte:** Poire
- **Karte auf der Sortenseite:** Nr. 3 von 4, „Poire über Vanilleeis“ (In der Küche / Dessert)
- **Ergebnis speichern als:** `fotos-ki/poire-3.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Poire-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-poire.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Poire-01.png`
- **Prompt:** 172 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Eine Dessertschale mit 2 bis 3 Kugeln Vanilleeis, leicht angeschmolzen, darüber klare Poire geträufelt und gehackte Nüsse.
Flasche: Die Flasche steht vollständig im Bild neben dem Gericht (Hauptmotiv): Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Vanilleeis; Poire; gehackte Nüsse. Beilagen nur aus: Birnenkompott, Gebäck, Kaffee.
- Das Gericht ist Hauptmotiv, die Flasche steht daneben und ist vollständig sichtbar.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 70. Poire: Poire zu mildem Blauschimmelkäse

- **Sorte:** Poire
- **Karte auf der Sortenseite:** Nr. 4 von 4, „Poire zu mildem Blauschimmelkäse“ (Zum Essen)
- **Ergebnis speichern als:** `fotos-ki/poire-4.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Poire-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-poire.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Poire-01.png`
- **Prompt:** 173 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Tulpenglas mit 4 cl klarer Poire neben einem Holzbrett mit mildem Blauschimmelkäse, Birnenspalten und Walnüssen.
Flasche: Die Flasche steht vollständig im Bild neben dem Essen und dem Glas: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Poire; mildem Blauschimmelkäse; Birnenspalten und Walnüsse. Beilagen nur aus: Blauschimmelkäse, Birne, Walnüsse.
- Neben dem Essen muss ein Glas mit dem Brand zu sehen sein.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 71. Neelchesbiren: Neelchesbiren pur, gut gekühlt

- **Sorte:** Neelchesbiren
- **Karte auf der Sortenseite:** Nr. 1 von 4, „Neelchesbiren pur, gut gekühlt“ (Pur)
- **Ergebnis speichern als:** `fotos-ki/neelchesbiren-2.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Neelchesbiren-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-neelchesbiren.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Nelchensbiren-01.png`
- **Prompt:** 169 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein reifbeschlagenes Tulpenglas mit klarem Neelchesbiren, ohne Eis und ohne Garnitur. Daneben unscharf ein Mandelgebäck.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Neelchesbiren. Beilagen nur aus: Obstkuchen, Mandelgebäck, Espresso.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 72. Neelchesbiren: Neelchesbiren über Vanilleeis

- **Sorte:** Neelchesbiren
- **Karte auf der Sortenseite:** Nr. 3 von 4, „Neelchesbiren über Vanilleeis“ (In der Küche / Dessert)
- **Ergebnis speichern als:** `fotos-ki/neelchesbiren-3.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Neelchesbiren-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-neelchesbiren.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Nelchensbiren-01.png`
- **Prompt:** 177 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Eine Dessertschale mit 2 bis 3 Kugeln Vanilleeis, leicht angeschmolzen, darüber klarer Neelchesbiren geträufelt und gehackte Nüsse. Daneben unscharf eine Tasse Espresso.
Flasche: Die Flasche steht vollständig im Bild neben dem Gericht (Hauptmotiv): Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Vanilleeis; Neelchesbiren; gehackte Nüsse. Beilagen nur aus: Espresso, Gebäck, frische Früchte.
- Das Gericht ist Hauptmotiv, die Flasche steht daneben und ist vollständig sichtbar.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 73. Neelchesbiren: Neelchesbiren zu mildem Käse

- **Sorte:** Neelchesbiren
- **Karte auf der Sortenseite:** Nr. 4 von 4, „Neelchesbiren zu mildem Käse“ (Zum Essen)
- **Ergebnis speichern als:** `fotos-ki/neelchesbiren-4.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Neelchesbiren-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-neelchesbiren.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Nelchensbiren-01.png`
- **Prompt:** 173 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Tulpenglas mit 4 cl klarem Neelchesbiren neben einem Holzbrett mit mildem Käse, Birnenspalten und Nüssen.
Flasche: Die Flasche steht vollständig im Bild neben dem Essen und dem Glas: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Neelchesbiren; mildem Käse; Birnenspalten und Nüsse. Beilagen nur aus: mildem Käse, Walnüsse, Trauben.
- Neben dem Essen muss ein Glas mit dem Brand zu sehen sein.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 74. Lënschouren: Lënschouren pur, gut gekühlt

- **Sorte:** Lënschouren
- **Karte auf der Sortenseite:** Nr. 1 von 4, „Lënschouren pur, gut gekühlt“ (Pur)
- **Ergebnis speichern als:** `fotos-ki/lenschouren-2.png`
- **Status:** vorhanden
- **Anhang 1 (echtes Foto der Lënschouren-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-lenschouren.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Lenschouren-01.png`
- **Prompt:** 169 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein reifbeschlagenes Tulpenglas mit klarem Lënschouren, ohne Eis und ohne Garnitur. Daneben unscharf ein Mandelgebäck.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Lënschouren. Beilagen nur aus: Obstkuchen, Mandelgebäck, Espresso.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 75. Lënschouren: Lënschouren-Tonic mit Zitronenschale

- **Sorte:** Lënschouren
- **Karte auf der Sortenseite:** Nr. 2 von 4, „Lënschouren-Tonic mit Zitronenschale“ (Auf Eis / Longdrink)
- **Ergebnis speichern als:** `fotos-ki/lenschouren-3.png`
- **Status:** vorhanden
- **Anhang 1 (echtes Foto der Lënschouren-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-lenschouren.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Lenschouren-01.png`
- **Prompt:** 180 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Lënschouren-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, ein Streifen Zitronenschale im Glas. Das Getränk ist klar und perlt leicht. Im unscharfen Hintergrund ein kleiner Salat.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Lënschouren; Tonic Water, gut gekühlt; Eiswürfel; Zitronenschale. Beilagen nur aus: leichte Sommergerichte, Salate, Ziegenfrischkäse.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 76. Lënschouren: Lënschouren zu mildem Käse

- **Sorte:** Lënschouren
- **Karte auf der Sortenseite:** Nr. 4 von 4, „Lënschouren zu mildem Käse“ (Zum Essen)
- **Ergebnis speichern als:** `fotos-ki/lenschouren-4.png`
- **Status:** vorhanden
- **Anhang 1 (echtes Foto der Lënschouren-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-lenschouren.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Lenschouren-01.png`
- **Prompt:** 173 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Tulpenglas mit 4 cl klarem Lënschouren neben einem Holzbrett mit mildem Käse, Nüssen und Trauben.
Flasche: Die Flasche steht vollständig im Bild neben dem Essen und dem Glas: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Lënschouren; mildem Käse; Nüsse und Trauben. Beilagen nur aus: mildem Käse, Walnüsse, Trauben.
- Neben dem Essen muss ein Glas mit dem Brand zu sehen sein.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 77. Vullekiischt: Vullekiischt pur, gut gekühlt

- **Sorte:** Vullekiischt
- **Karte auf der Sortenseite:** Nr. 1 von 4, „Vullekiischt pur, gut gekühlt“ (Pur)
- **Ergebnis speichern als:** `fotos-ki/vullekiischt-2.png`
- **Status:** offen
- **Anhang 1 (schlanke 0,5-L-Flasche (Foto der Kirsch-Flasche, dieselbe Form; deren Etikett nicht übernehmen)):** `Fotos/flasche-kirsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Vogelbeere-01.png`
- **Prompt:** 170 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein reifbeschlagenes Tulpenglas mit klarem Vullekiischt, ohne Eis und ohne Garnitur. Daneben unscharf ein Stück Wildpastete.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Vullekiischt. Beilagen nur aus: Wildgerichte, Wildpastete, kräftiger Käse.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (schlank); Verschluss und Brandfarbe stehen im Prompt.

---

## 78. Vullekiischt: Vullekiischt zu Wildpastete

- **Sorte:** Vullekiischt
- **Karte auf der Sortenseite:** Nr. 3 von 4, „Vullekiischt zu Wildpastete“ (Zum Essen)
- **Ergebnis speichern als:** `fotos-ki/vullekiischt-3.png`
- **Status:** offen
- **Anhang 1 (schlanke 0,5-L-Flasche (Foto der Kirsch-Flasche, dieselbe Form; deren Etikett nicht übernehmen)):** `Fotos/flasche-kirsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Vogelbeere-01.png`
- **Prompt:** 176 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Stamperl mit klarem, gekühltem Vullekiischt neben einem Holzbrett: Scheiben Wildpastete auf 2 Scheiben Landbrot, dazu ein Löffel Preiselbeeren.
Flasche: Die Flasche steht vollständig im Bild neben dem Essen und dem Glas: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Vullekiischt; Wildpastete; Landbrot; Preiselbeeren. Beilagen nur aus: Wildpastete, Preiselbeeren, Landbrot.
- Neben dem Essen muss ein Glas mit dem Brand zu sehen sein.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (schlank); Verschluss und Brandfarbe stehen im Prompt.

---

## 79. Vullekiischt: Vullekiischt über Vanilleeis

- **Sorte:** Vullekiischt
- **Karte auf der Sortenseite:** Nr. 4 von 4, „Vullekiischt über Vanilleeis“ (In der Küche / Dessert)
- **Ergebnis speichern als:** `fotos-ki/vullekiischt-4.png`
- **Status:** offen
- **Anhang 1 (schlanke 0,5-L-Flasche (Foto der Kirsch-Flasche, dieselbe Form; deren Etikett nicht übernehmen)):** `Fotos/flasche-kirsch.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Vogelbeere-01.png`
- **Prompt:** 177 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Eine Dessertschale mit 2 bis 3 Kugeln Vanilleeis, leicht angeschmolzen, darüber klarer Vullekiischt geträufelt und gehackte Nüsse. Daneben unscharf eine Tasse Espresso.
Flasche: Die Flasche steht vollständig im Bild neben dem Gericht (Hauptmotiv): Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Vanilleeis; Vullekiischt; gehackte Nüsse. Beilagen nur aus: Espresso, Gebäck, frische Früchte.
- Das Gericht ist Hauptmotiv, die Flasche steht daneben und ist vollständig sichtbar.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (schlank); Verschluss und Brandfarbe stehen im Prompt.

---

## 80. Schléiwen: Schléiwen pur, gut gekühlt

- **Sorte:** Schléiwen
- **Karte auf der Sortenseite:** Nr. 1 von 4, „Schléiwen pur, gut gekühlt“ (Pur)
- **Ergebnis speichern als:** `fotos-ki/schleiwen-2.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Schléiwen-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-schleiwen.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Schleiwen-01.png`
- **Prompt:** 171 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein reifbeschlagenes Tulpenglas mit klarem Schléiwen, ohne Eis und ohne Garnitur. Daneben unscharf ein Stück kräftiger Käse.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Schléiwen. Beilagen nur aus: Wildgerichte, kräftiger Käse, nach einem deftigen Essen.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 81. Schléiwen: Wildsauce mit Schléiwen

- **Sorte:** Schléiwen
- **Karte auf der Sortenseite:** Nr. 3 von 4, „Wildsauce mit Schléiwen“ (In der Küche / Dessert)
- **Ergebnis speichern als:** `fotos-ki/schleiwen-3.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Schléiwen-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-schleiwen.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Schleiwen-01.png`
- **Prompt:** 170 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Saucenkännchen mit dunkler, glänzender Wildsauce neben einem Teller mit Scheiben Rehrücken und einem Knödel.
Flasche: Die Flasche steht vollständig im Bild neben dem Gericht (Hauptmotiv): Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Wildfond; Butter; Preiselbeeren; Schléiwen. Beilagen nur aus: Rehrücken, Wildschwein, Knödel.
- Das Gericht ist Hauptmotiv, die Flasche steht daneben und ist vollständig sichtbar.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 82. Schléiwen: Schléiwen zu kräftigem Bergkäse

- **Sorte:** Schléiwen
- **Karte auf der Sortenseite:** Nr. 4 von 4, „Schléiwen zu kräftigem Bergkäse“ (Zum Essen)
- **Ergebnis speichern als:** `fotos-ki/schleiwen-4.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Schléiwen-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-schleiwen.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Schleiwen-01.png`
- **Prompt:** 173 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Tulpenglas mit 4 cl klarem Schléiwen neben einem Holzbrett mit kräftigem Bergkäse, Walnüssen und Trauben.
Flasche: Die Flasche steht vollständig im Bild neben dem Essen und dem Glas: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen.
- Nur Rezept-Zutaten im Bild: Schléiwen; kräftigem Bergkäse; Walnüsse und Trauben. Beilagen nur aus: Bergkäse, Walnüsse, Trauben.
- Neben dem Essen muss ein Glas mit dem Brand zu sehen sein.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.

---

## 83. Vizdrëpp: Vizdrëpp pur, bei Zimmertemperatur

- **Sorte:** Vizdrëpp
- **Karte auf der Sortenseite:** Nr. 1 von 5, „Vizdrëpp pur, bei Zimmertemperatur“ (Pur)
- **Ergebnis speichern als:** `fotos-ki/vizdrepp-2.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Vizdrëpp-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-vizdrepp.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Vizdrepp 0,5l_Zeichenfläche 1.png`
- **Prompt:** 176 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Ballonglas mit 4 cl kräftig goldgelbem Vizdrëpp, ohne Eis und ohne Garnitur. Daneben unscharf ein Stück Apfelkuchen.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen mit flachem, breitem Kragen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: kräftiges, klares Goldgelb.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen mit flachem, breitem Kragen.
- Nur Rezept-Zutaten im Bild: Vizdrëpp. Beilagen nur aus: Apfelkuchen, Käse, Espresso.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.
- Die echte Vizdrëpp-Flasche hat eine breite, nach unten weitende Form (anders als die schlanken Flaschen).

---

## 84. Vizdrëpp: Apfelsorbet mit Vizdrëpp

- **Sorte:** Vizdrëpp
- **Karte auf der Sortenseite:** Nr. 3 von 5, „Apfelsorbet mit Vizdrëpp“ (In der Küche / Dessert)
- **Ergebnis speichern als:** `fotos-ki/vizdrepp-3.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Vizdrëpp-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-vizdrepp.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Vizdrepp 0,5l_Zeichenfläche 1.png`
- **Prompt:** 170 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein gekühltes Dessertglas mit 2 Kugeln Apfelsorbet, darüber goldgelber Vizdrëpp gegossen.
Flasche: Die Flasche steht vollständig im Bild neben dem Gericht (Hauptmotiv): Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen mit flachem, breitem Kragen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: kräftiges, klares Goldgelb.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen mit flachem, breitem Kragen.
- Nur Rezept-Zutaten im Bild: Apfelsorbet; Vizdrëpp. Beilagen nur aus: zwischen zwei Gängen, nach einem üppigen Essen, Herbstmenü.
- Das Gericht ist Hauptmotiv, die Flasche steht daneben und ist vollständig sichtbar.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.
- Die echte Vizdrëpp-Flasche hat eine breite, nach unten weitende Form (anders als die schlanken Flaschen).

---

## 85. Vizdrëpp: Flambierte Äpfel mit Vizdrëpp

- **Sorte:** Vizdrëpp
- **Karte auf der Sortenseite:** Nr. 4 von 5, „Flambierte Äpfel mit Vizdrëpp“ (In der Küche / Dessert)
- **Ergebnis speichern als:** `fotos-ki/vizdrepp-4.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Vizdrëpp-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-vizdrepp.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Vizdrepp 0,5l_Zeichenfläche 1.png`
- **Prompt:** 171 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Eine Dessertschale mit goldgelb gebratenen Apfelspalten, dazu 2 Kugeln Vanilleeis. Keine Flamme.
Flasche: Die Flasche steht vollständig im Bild neben dem Gericht (Hauptmotiv): Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen mit flachem, breitem Kragen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: kräftiges, klares Goldgelb.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen mit flachem, breitem Kragen.
- Nur Rezept-Zutaten im Bild: feste Äpfel; Butter; Zucker; Vizdrëpp; Vanilleeis. Beilagen nur aus: Vanilleeis, Zimt, Karamell.
- Das Gericht ist Hauptmotiv, die Flasche steht daneben und ist vollständig sichtbar.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.
- Die echte Vizdrëpp-Flasche hat eine breite, nach unten weitende Form (anders als die schlanken Flaschen).

---

## 86. Vizdrëpp: Vizdrëpp zu Weichkäse

- **Sorte:** Vizdrëpp
- **Karte auf der Sortenseite:** Nr. 5 von 5, „Vizdrëpp zu Weichkäse“ (Zum Essen)
- **Ergebnis speichern als:** `fotos-ki/vizdrepp-5.png`
- **Status:** offen
- **Anhang 1 (echtes Foto der Vizdrëpp-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen):** `Fotos/flasche-vizdrepp.jpg`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Vizdrepp 0,5l_Zeichenfläche 1.png`
- **Prompt:** 176 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Tulpenglas mit 4 cl goldgelbem Vizdrëpp neben einem Holzbrett mit Weichkäse, Apfelspalten und Nüssen.
Flasche: Die Flasche steht vollständig im Bild neben dem Essen und dem Glas: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form und Verschluss aus Anhang 1 (klarer Glasstopfen mit flachem, breitem Kragen), aber ohne dessen Etikett. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: kräftiges, klares Goldgelb.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: klarer Glasstopfen mit flachem, breitem Kragen.
- Nur Rezept-Zutaten im Bild: Vizdrëpp; Weichkäse; Apfelspalten und Nüsse. Beilagen nur aus: Weichkäse, Apfel, Nüsse.
- Neben dem Essen muss ein Glas mit dem Brand zu sehen sein.
- Anhang 1 ist das echte Flaschenfoto dieser Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.
- Die echte Vizdrëpp-Flasche hat eine breite, nach unten weitende Form (anders als die schlanken Flaschen).

---

## 87. Hierber Sambuca: Sambuca auf einem großen Eiswürfel

- **Sorte:** Hierber Sambuca
- **Karte auf der Sortenseite:** Nr. 2 von 4, „Sambuca auf einem großen Eiswürfel“ (Auf Eis / Longdrink)
- **Ergebnis speichern als:** `fotos-ki/sambuca-2.png`
- **Status:** offen
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Sambuca_Zeichenfläche 1.png`
- **Prompt:** 178 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Tumbler mit einem einzigen großen klaren Eiswürfel, klarer Sambuca, ohne Garnitur. Daneben ein Mandelgebäck.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: Ausgießer mit zwei dunklen Metallröhrchen, Halsband am Flaschenhals. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: Ausgießer mit zwei dunklen Metallröhrchen, Halsband am Flaschenhals.
- Nur Rezept-Zutaten im Bild: Sambuca; großer Eiswürfel. Beilagen nur aus: Espresso, Mandelgebäck.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.
- Verschluss laut Produktfoto in fotos/ (flaschen-*.webp); die Standardvorlage in Anhang 1 hat eine andere Kappe, der Verschluss kommt aus dem Prompt.

---

## 88. Hierber Sambuca: Espresso mit Sambuca

- **Sorte:** Hierber Sambuca
- **Karte auf der Sortenseite:** Nr. 3 von 4, „Espresso mit Sambuca“ (Zum Essen)
- **Ergebnis speichern als:** `fotos-ki/sambuca-3.png`
- **Status:** offen
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Sambuca_Zeichenfläche 1.png`
- **Prompt:** 187 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Eine Espressotasse mit frischem Espresso und Crema auf einer Untertasse, daneben ein kleines Glas klarer Sambuca und ein Mandelgebäck. Kein Eis.
Flasche: Die Flasche steht vollständig im Bild neben dem Essen und dem Glas: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: Ausgießer mit zwei dunklen Metallröhrchen, Halsband am Flaschenhals. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: Ausgießer mit zwei dunklen Metallröhrchen, Halsband am Flaschenhals.
- Nur Rezept-Zutaten im Bild: frischer Espresso; Sambuca. Beilagen nur aus: Gebäck, Mandelkekse, nach dem Essen.
- Neben dem Essen muss ein Glas mit dem Brand zu sehen sein.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.
- Verschluss laut Produktfoto in fotos/ (flaschen-*.webp); die Standardvorlage in Anhang 1 hat eine andere Kappe, der Verschluss kommt aus dem Prompt.

---

## 89. Hierber Sambuca: Sambuca über Vanilleeis

- **Sorte:** Hierber Sambuca
- **Karte auf der Sortenseite:** Nr. 4 von 4, „Sambuca über Vanilleeis“ (In der Küche / Dessert)
- **Ergebnis speichern als:** `fotos-ki/sambuca-4.png`
- **Status:** offen
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Sambuca_Zeichenfläche 1.png`
- **Prompt:** 181 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Eine Dessertschale mit 2 bis 3 Kugeln Vanilleeis, leicht angeschmolzen, darüber klarer Sambuca geträufelt und gehackte Mandeln.
Flasche: Die Flasche steht vollständig im Bild neben dem Gericht (Hauptmotiv): Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: Ausgießer mit zwei dunklen Metallröhrchen, Halsband am Flaschenhals. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: klar wie Wasser.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: Ausgießer mit zwei dunklen Metallröhrchen, Halsband am Flaschenhals.
- Nur Rezept-Zutaten im Bild: Vanilleeis; Sambuca; gehackte Mandeln. Beilagen nur aus: Espresso, Mandelgebäck, frische Früchte.
- Das Gericht ist Hauptmotiv, die Flasche steht daneben und ist vollständig sichtbar.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.
- Verschluss laut Produktfoto in fotos/ (flaschen-*.webp); die Standardvorlage in Anhang 1 hat eine andere Kappe, der Verschluss kommt aus dem Prompt.

---

## 90. Hierber Limoncello: Limoncello eiskalt

- **Sorte:** Hierber Limoncello
- **Karte auf der Sortenseite:** Nr. 1 von 4, „Limoncello eiskalt“ (Pur)
- **Ergebnis speichern als:** `fotos-ki/limoncello-2.png`
- **Status:** vorhanden
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Limoncello-01.png`
- **Prompt:** 179 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein reifbeschlagenes Stamperl mit eiskaltem, leuchtend gelbgrünem Limoncello, ohne Eis und ohne Garnitur. Daneben unscharf ein Zitronengebäck.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: Ausgießer mit zwei dunklen Metallröhrchen, Halsband am Flaschenhals. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: leuchtendes Gelbgrün.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: Ausgießer mit zwei dunklen Metallröhrchen, Halsband am Flaschenhals.
- Nur Rezept-Zutaten im Bild: Limoncello. Beilagen nur aus: Zitronengebäck, Mandelkekse, Sommerabende.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.
- Verschluss laut Produktfoto in fotos/ (flaschen-*.webp); die Standardvorlage in Anhang 1 hat eine andere Kappe, der Verschluss kommt aus dem Prompt.

---

## 91. Hierber Limoncello: Limoncello-Tonic mit Minze

- **Sorte:** Hierber Limoncello
- **Karte auf der Sortenseite:** Nr. 3 von 4, „Limoncello-Tonic mit Minze“ (Auf Eis / Longdrink)
- **Ergebnis speichern als:** `fotos-ki/limoncello-3.png`
- **Status:** vorhanden
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Limoncello-01.png`
- **Prompt:** 187 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Limoncello-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, ein Minzzweig steckt im Glas. Das Getränk ist hellgelb und perlt leicht. Im unscharfen Hintergrund ein Sommersalat.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: Ausgießer mit zwei dunklen Metallröhrchen, Halsband am Flaschenhals. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: leuchtendes Gelbgrün.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: Ausgießer mit zwei dunklen Metallröhrchen, Halsband am Flaschenhals.
- Nur Rezept-Zutaten im Bild: Limoncello; Tonic Water, gut gekühlt; Eiswürfel; Minze. Beilagen nur aus: Sommersalate, Antipasti, Meeresfrüchte.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.
- Verschluss laut Produktfoto in fotos/ (flaschen-*.webp); die Standardvorlage in Anhang 1 hat eine andere Kappe, der Verschluss kommt aus dem Prompt.

---

## 92. Hierber Limoncello: Zitronensorbet mit Limoncello

- **Sorte:** Hierber Limoncello
- **Karte auf der Sortenseite:** Nr. 4 von 4, „Zitronensorbet mit Limoncello“ (In der Küche / Dessert)
- **Ergebnis speichern als:** `fotos-ki/limoncello-4.png`
- **Status:** vorhanden
- **Anhang 1 (runde Flasche, die große 0,5-L-Flasche rechts im Foto):** `fotos/flaschen-wodka.webp`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Limoncello-01.png`
- **Prompt:** 175 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein gekühltes Dessertglas mit 2 Kugeln Zitronensorbet, darüber leuchtend gelber Limoncello gegossen.
Flasche: Die Flasche steht vollständig im Bild neben dem Gericht (Hauptmotiv): Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Form aus Anhang 1 ohne dessen Etikett und ohne dessen Verschluss, stattdessen Verschluss: Ausgießer mit zwei dunklen Metallröhrchen, Halsband am Flaschenhals. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in Anhang 2. Brand in der Flasche: leuchtendes Gelbgrün.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
- Verschluss prüfen: Ausgießer mit zwei dunklen Metallröhrchen, Halsband am Flaschenhals.
- Nur Rezept-Zutaten im Bild: Zitronensorbet; Limoncello. Beilagen nur aus: Sommerabende, nach Fisch, zwischen zwei Gängen.
- Das Gericht ist Hauptmotiv, die Flasche steht daneben und ist vollständig sichtbar.
- Es gibt kein Flaschenfoto dieser Sorte: Anhang 1 ist die Standardvorlage (rund); Verschluss und Brandfarbe stehen im Prompt.
- Verschluss laut Produktfoto in fotos/ (flaschen-*.webp); die Standardvorlage in Anhang 1 hat eine andere Kappe, der Verschluss kommt aus dem Prompt.

---

## Übersicht

| Nr | Sorte | Karte | Dateiname | Status |
|---|---|---|---|---|
| 1 | Hierber Gin | Gin Fizz | `fotos-ki/gin-2.png` | vorhanden |
| 2 | Hierber Gin | Dry Martini | `fotos-ki/gin-3.png` | vorhanden |
| 3 | Hierber Gin | Zitronensorbet mit Gin | `fotos-ki/gin-4.png` | vorhanden |
| 4 | Hierber Wodka | Wodka eiskalt | `fotos-ki/wodka-2.png` | offen |
| 5 | Hierber Wodka | Moscow Mule | `fotos-ki/wodka-3.png` | offen |
| 6 | Hierber Wodka | Wodka zu Räucherlachs und Schwarzbrot | `fotos-ki/wodka-4.png` | offen |
| 7 | Hierber Rum | Rum pur, bei Zimmertemperatur | `fotos-ki/rum-2.png` | offen |
| 8 | Hierber Rum | Daiquiri | `fotos-ki/rum-3.png` | offen |
| 9 | Hierber Rum | Gebratene Bananen mit Rum | `fotos-ki/rum-4.png` | offen |
| 10 | Hierber Rum Orange | Rum Orange auf einem großen Eiswürfel | `fotos-ki/rum-orange-2.png` | offen |
| 11 | Hierber Rum Orange | Rum Orange-Sour | `fotos-ki/rum-orange-3.png` | offen |
| 12 | Hierber Rum Orange | Orangenfilets mit Rum Orange | `fotos-ki/rum-orange-4.png` | offen |
| 13 | Hierber Whisky | Whisky pur, mit einem Spritzer Wasser | `fotos-ki/whisky-2.png` | offen |
| 14 | Hierber Whisky | Whisky-Highball | `fotos-ki/whisky-3.png` | offen |
| 15 | Hierber Whisky | Whisky zu Comté | `fotos-ki/whisky-4.png` | offen |
| 16 | Hierber Whisky | Pfeffersteak mit Whisky-Sauce | `fotos-ki/whisky-5.png` | offen |
| 17 | Kirsch | Kirsch pur, gut gekühlt | `fotos-ki/kirsch-2.png` | offen |
| 18 | Kirsch | Kirsch-Tonic mit Zitronenschale | `fotos-ki/kirsch-3.png` | offen |
| 19 | Kirsch | Geschmorte Kirschen mit Kirsch | `fotos-ki/kirsch-4.png` | offen |
| 20 | Kirsch | Kirsch zu dunkler Schokolade | `fotos-ki/kirsch-5.png` | offen |
| 21 | Framboise | Framboise pur, gut gekühlt | `fotos-ki/framboise-2.png` | offen |
| 22 | Framboise | Framboise-Tonic mit Minze | `fotos-ki/framboise-3.png` | offen |
| 23 | Framboise | Panna cotta mit Himbeeren und Framboise | `fotos-ki/framboise-4.png` | offen |
| 24 | Quetsch | Quetsch pur, gut gekühlt | `fotos-ki/quetsch-2.png` | offen |
| 25 | Quetsch | Quetsch-Tonic mit Zimtstange | `fotos-ki/quetsch-3.png` | offen |
| 26 | Quetsch | Flambierte Zwetschgen mit Quetsch | `fotos-ki/quetsch-4.png` | offen |
| 27 | Quetsch | Quetsch zu kräftigem Bergkäse | `fotos-ki/quetsch-5.png` | offen |
| 28 | Poire Williams | Poire Williams pur, gut gekühlt | `fotos-ki/poire-williams-2.png` | offen |
| 29 | Poire Williams | Pochierte Birnen mit Poire Williams | `fotos-ki/poire-williams-3.png` | offen |
| 30 | Poire Williams | Poire Williams zu mildem Blauschimmelkäse | `fotos-ki/poire-williams-4.png` | offen |
| 31 | Mirabelle | Mirabelle pur, gut gekühlt | `fotos-ki/mirabelle-2.png` | offen |
| 32 | Mirabelle | Mirabelle-Spritz mit Crémant | `fotos-ki/mirabelle-3.png` | offen |
| 33 | Mirabelle | Geschmorte Mirabellen mit Mirabelle | `fotos-ki/mirabelle-4.png` | offen |
| 34 | Mirabelle | Mirabelle zu mildem Weichkäse | `fotos-ki/mirabelle-5.png` | offen |
| 35 | Hierber aale Fruucht | Hierber aale Fruucht pur, bei Zimmertemperatur | `fotos-ki/hierber-fruucht-2.png` | offen |
| 36 | Hierber aale Fruucht | Hierber aale Fruucht über Vanilleeis | `fotos-ki/hierber-fruucht-3.png` | offen |
| 37 | Hierber aale Fruucht | Hierber aale Fruucht zu kräftigem, reifem Käse | `fotos-ki/hierber-fruucht-4.png` | offen |
| 38 | Vieux Marc | Vieux Marc pur, bei Zimmertemperatur | `fotos-ki/vieux-marc-2.png` | offen |
| 39 | Vieux Marc | Vieux Marc zu kräftigem Käse | `fotos-ki/vieux-marc-3.png` | offen |
| 40 | Vieux Marc | Vieux Marc zu dunkler Schokolade | `fotos-ki/vieux-marc-4.png` | offen |
| 41 | Vieille Prune | Vieille Prune pur, bei Zimmertemperatur | `fotos-ki/vieille-prune-2.png` | offen |
| 42 | Vieille Prune | Vieille Prune über Vanilleeis | `fotos-ki/vieille-prune-3.png` | offen |
| 43 | Vieille Prune | Vieille Prune zu kräftigem Bergkäse | `fotos-ki/vieille-prune-4.png` | offen |
| 44 | Vieille Pomme | Vieille Pomme pur, bei Zimmertemperatur | `fotos-ki/vieille-pomme-2.png` | offen |
| 45 | Vieille Pomme | Apfeltarte mit Vieille Pomme | `fotos-ki/vieille-pomme-3.png` | offen |
| 46 | Vieille Pomme | Vieille Pomme zu gereiftem Comté | `fotos-ki/vieille-pomme-4.png` | offen |
| 47 | Hunnegdrëpp | Heißer Hunnegdrëpp mit Tee und Zitrone | `fotos-ki/hunnegdrepp-2.png` | offen |
| 48 | Hunnegdrëpp | Hunnegdrëpp pur, gut gekühlt | `fotos-ki/hunnegdrepp-3.png` | offen |
| 49 | Hunnegdrëpp | Joghurt mit Honig und Hunnegdrëpp | `fotos-ki/hunnegdrepp-4.png` | offen |
| 50 | Hunnegdrëpp | Hunnegdrëpp zu Ziegenkäse | `fotos-ki/hunnegdrepp-5.png` | offen |
| 51 | Hierber Hunneg Whisky | Hunneg Whisky auf einem großen Eiswürfel | `fotos-ki/hunneg-whisky-2.png` | offen |
| 52 | Hierber Hunneg Whisky | Heißer Hunneg Whisky mit Zitrone und Zimt | `fotos-ki/hunneg-whisky-3.png` | offen |
| 53 | Hierber Hunneg Whisky | Hunneg Whisky zu Comté | `fotos-ki/hunneg-whisky-4.png` | offen |
| 54 | Kräiderdrëpp | Kräiderdrëpp pur, gut gekühlt | `fotos-ki/kraeiderdrepp-2.png` | offen |
| 55 | Kräiderdrëpp | Kräiderdrëpp mit Ginger Beer | `fotos-ki/kraeiderdrepp-3.png` | offen |
| 56 | Kräiderdrëpp | Kräiderdrëpp nach einem deftigen Essen | `fotos-ki/kraeiderdrepp-4.png` | offen |
| 57 | Kürbisdrëpp | Kürbisdrëpp pur, gut gekühlt | `fotos-ki/kuerbisdrepp-2.png` | offen |
| 58 | Kürbisdrëpp | Kürbisdrëpp mit Ginger Beer | `fotos-ki/kuerbisdrepp-3.png` | offen |
| 59 | Kürbisdrëpp | Kürbisdrëpp zu kräftigem Hartkäse | `fotos-ki/kuerbisdrepp-4.png` | offen |
| 60 | Grain | Grain eiskalt | `fotos-ki/grain-2.png` | offen |
| 61 | Grain | Grain zu Brotzeit mit Schinken | `fotos-ki/grain-3.png` | offen |
| 62 | Hondsaarsch | Hondsaarsch pur, gut gekühlt | `fotos-ki/hondsaarsch-2.png` | offen |
| 63 | Hondsaarsch | Hondsaarsch über Vanilleeis | `fotos-ki/hondsaarsch-3.png` | offen |
| 64 | Hondsaarsch | Hondsaarsch zu kräftigem Käse | `fotos-ki/hondsaarsch-4.png` | offen |
| 65 | Kiwibeeren | Kiwibeeren pur, gut gekühlt | `fotos-ki/kiwibeeren-2.png` | offen |
| 66 | Kiwibeeren | Kiwibeeren-Tonic mit Limettenscheibe | `fotos-ki/kiwibeeren-3.png` | offen |
| 67 | Kiwibeeren | Joghurt mit Honig und Kiwibeeren | `fotos-ki/kiwibeeren-4.png` | offen |
| 68 | Poire | Poire pur, gut gekühlt | `fotos-ki/poire-2.png` | offen |
| 69 | Poire | Poire über Vanilleeis | `fotos-ki/poire-3.png` | offen |
| 70 | Poire | Poire zu mildem Blauschimmelkäse | `fotos-ki/poire-4.png` | offen |
| 71 | Neelchesbiren | Neelchesbiren pur, gut gekühlt | `fotos-ki/neelchesbiren-2.png` | offen |
| 72 | Neelchesbiren | Neelchesbiren über Vanilleeis | `fotos-ki/neelchesbiren-3.png` | offen |
| 73 | Neelchesbiren | Neelchesbiren zu mildem Käse | `fotos-ki/neelchesbiren-4.png` | offen |
| 74 | Lënschouren | Lënschouren pur, gut gekühlt | `fotos-ki/lenschouren-2.png` | vorhanden |
| 75 | Lënschouren | Lënschouren-Tonic mit Zitronenschale | `fotos-ki/lenschouren-3.png` | vorhanden |
| 76 | Lënschouren | Lënschouren zu mildem Käse | `fotos-ki/lenschouren-4.png` | vorhanden |
| 77 | Vullekiischt | Vullekiischt pur, gut gekühlt | `fotos-ki/vullekiischt-2.png` | offen |
| 78 | Vullekiischt | Vullekiischt zu Wildpastete | `fotos-ki/vullekiischt-3.png` | offen |
| 79 | Vullekiischt | Vullekiischt über Vanilleeis | `fotos-ki/vullekiischt-4.png` | offen |
| 80 | Schléiwen | Schléiwen pur, gut gekühlt | `fotos-ki/schleiwen-2.png` | offen |
| 81 | Schléiwen | Wildsauce mit Schléiwen | `fotos-ki/schleiwen-3.png` | offen |
| 82 | Schléiwen | Schléiwen zu kräftigem Bergkäse | `fotos-ki/schleiwen-4.png` | offen |
| 83 | Vizdrëpp | Vizdrëpp pur, bei Zimmertemperatur | `fotos-ki/vizdrepp-2.png` | offen |
| 84 | Vizdrëpp | Apfelsorbet mit Vizdrëpp | `fotos-ki/vizdrepp-3.png` | offen |
| 85 | Vizdrëpp | Flambierte Äpfel mit Vizdrëpp | `fotos-ki/vizdrepp-4.png` | offen |
| 86 | Vizdrëpp | Vizdrëpp zu Weichkäse | `fotos-ki/vizdrepp-5.png` | offen |
| 87 | Hierber Sambuca | Sambuca auf einem großen Eiswürfel | `fotos-ki/sambuca-2.png` | offen |
| 88 | Hierber Sambuca | Espresso mit Sambuca | `fotos-ki/sambuca-3.png` | offen |
| 89 | Hierber Sambuca | Sambuca über Vanilleeis | `fotos-ki/sambuca-4.png` | offen |
| 90 | Hierber Limoncello | Limoncello eiskalt | `fotos-ki/limoncello-2.png` | vorhanden |
| 91 | Hierber Limoncello | Limoncello-Tonic mit Minze | `fotos-ki/limoncello-3.png` | vorhanden |
| 92 | Hierber Limoncello | Zitronensorbet mit Limoncello | `fotos-ki/limoncello-4.png` | vorhanden |
