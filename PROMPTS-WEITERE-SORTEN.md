# PROMPTS-WEITERE-SORTEN: Hierberol und Kräider Batti (ChatGPT)

Erzeugt mit `node tools/foto_prompts_weitere_sorten.mjs` aus `tools/weitere-sorten.json`. Nicht von Hand ändern. 10 Prompts: je Produkt eine Flasche (Hochformat 1024 × 1536 Pixel) und vier Serviervorschläge (Querformat 4:3, 1448 × 1086). Alles sind Entwürfe, der Brenner bestätigt sie.

**Stand:** 2 offen, 8 vorhanden, davon 1 mit fehlendem Anhang (Kräider Batti: Etikett und Flaschenbild liegen noch nicht vor).

- **Hierberol** (Aperitif, 0,7 l, 15 % vol.): hat ein Flaschenbild (`fotos-flaschen/hierberol-0-7l.png`) und eine Sortenseite. Es gibt kein flaches Etikett in `Fertige Etiquetten/`; Anhang 2 ist deshalb das Foto selbst, nur als Etikett-Referenz. Die vier Serviervorschläge stehen in `site/data/serviervorschlaege.js`; die Bilder `fotos-ki/hierberol-1.png` bis `-4.png` fehlen noch und werden nach dem Upload vom Build eingebaut.
- **Kräider Batti** (Kräuterlikör, dunkel): nur Prompts. Es gibt weder Etikett noch Bild noch Preis noch Alkoholgehalt noch Größe; keine Sortenseite, kein Eintrag in `produkte.js`. Anhang 2 der Flasche ist ein Platzhalter („Etikett folgt“). Bis das Etikett vorliegt, stehen diese Einträge im ChatGPT-Stapel mit Status „Etikett fehlt“.
- **Markenschutz:** Die Prompts beschreiben nur die Art des Produkts und verlangen ausdrücklich, keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachzubauen. Ergebnisse trotzdem darauf prüfen.

Die Ergebnisse gehören als PNG unter dem Namen aus der Tabelle in `fotos-flaschen/` bzw. `fotos-ki/`. Automatisch abarbeiten: `CHATGPT-STAPEL.md` (Gruppe `weitere-sorten`).

## Übersicht

| Eintrag | Typ | Anhang 1 | Anhang 2 | Zieldatei | Status | Wörter |
|---|---|---|---|---|---|---|
| hierberol-flasche | flasche | `fotos-basis/rund-0-7l.png` | `fotos-flaschen/hierberol-0-7l.png` | `fotos-flaschen/hierberol-0-7l.png` | vorhanden | 255 |
| hierberol-1 | serviervorschlag | `fotos-flaschen/hierberol-0-7l.png` | `fotos-flaschen/hierberol-0-7l.png` | `fotos-ki/hierberol-1.png` | vorhanden | 194 |
| hierberol-2 | serviervorschlag | `fotos-flaschen/hierberol-0-7l.png` | `fotos-flaschen/hierberol-0-7l.png` | `fotos-ki/hierberol-2.png` | vorhanden | 187 |
| hierberol-3 | serviervorschlag | `fotos-flaschen/hierberol-0-7l.png` | `fotos-flaschen/hierberol-0-7l.png` | `fotos-ki/hierberol-3.png` | vorhanden | 193 |
| hierberol-4 | serviervorschlag | `fotos-flaschen/hierberol-0-7l.png` | `fotos-flaschen/hierberol-0-7l.png` | `fotos-ki/hierberol-4.png` | vorhanden | 193 |
| kraider-batti-flasche | flasche | `fotos-basis/rund-0-5l.png` | `PLATZHALTER: Etikett von Kräider Batti folgt` (fehlt) | `fotos-flaschen/kraider-batti-0-5l.png` | vorhanden | 256 |
| kraider-batti-1 | serviervorschlag | `fotos-flaschen/kraider-batti-0-5l.png` | `fotos-flaschen/kraider-batti-0-5l.png` | `fotos-ki/kraider-batti-1.png` | vorhanden | 188 |
| kraider-batti-2 | serviervorschlag | `fotos-flaschen/kraider-batti-0-5l.png` | `fotos-flaschen/kraider-batti-0-5l.png` | `fotos-ki/kraider-batti-2.png` | vorhanden | 180 |
| kraider-batti-3 | serviervorschlag | `fotos-flaschen/kraider-batti-0-5l.png` | `fotos-flaschen/kraider-batti-0-5l.png` | `fotos-ki/kraider-batti-3.png` | offen | 190 |
| kraider-batti-4 | serviervorschlag | `fotos-flaschen/kraider-batti-0-5l.png` | `fotos-flaschen/kraider-batti-0-5l.png` | `fotos-ki/kraider-batti-4.png` | offen | 188 |

---

## 1. Hierberol: Flasche

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/rund-0-7l.png` (leere runde 0,7-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen)
- **Anhang 2:** `fotos-flaschen/hierberol-0-7l.png` (dasselbe Foto der fertigen Flasche, nur als Etikett-Referenz)
- **Ergebnis speichern als:** `fotos-flaschen/hierberol-0-7l.png`
- **Status:** vorhanden
- **Prompt:** 255 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde 0,7-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: leuchtendes Orange-Rot (Bitter-Aperitif), bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2, exakt wie auf diesem Bild (nur das Etikett übernehmen, nicht Flasche, Grund oder Licht): blaues Etikett mit weißer Raute und schwarzer Schreibschrift „Hierberol“, oben „APERITIF“, unten „0,7 l“ und „15 % vol.“, rechts oben die Zubereitung „Prosecco (90 ml), Hierberol (60 ml), Soda (30 ml), Eis, Orangenscheibe“. Kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2; es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, Glanz und Reflexe des Glases laufen über das Etikett. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/hierberol-0-7l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, „APERITIF“, „0,7 l“, „15 % vol.“, Zubereitung, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Grund hell, neutral, weißgrau; sanfter Schatten am Boden.
- Inhalt: leuchtendes Orange-Rot (Bitter-Aperitif), bis zum Hals gefüllt.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller im Ergebnis (Form, Etikett, Schrift, Symbole).
- Der Verschluss des Basisfotos fotos-basis/rund-0-7l.png zählt nicht, die Verschluss-Zeile (Glasstopfen ohne Kork) hat Vorrang; das Etikett kommt nur aus Anhang 2, der Rest von Anhang 2 (Grund, Licht, Flasche) ist nicht vorgegeben
- Dieses Bild ist die Datei, die die Sortenseite im Kopf und auf der Karte zeigt (Größenbild 0,7 L).

---

## 2. Hierberol: Hierberol-Spritz (Karte 1 von 4)

- **Format:** Querformat 4:3 (1448 × 1086 Pixel)
- **Anhang 1:** `fotos-flaschen/hierberol-0-7l.png`
- **Anhang 2:** `fotos-flaschen/hierberol-0-7l.png`
- **Ergebnis speichern als:** `fotos-ki/hierberol-1.png`
- **Status:** vorhanden
- **Prompt:** 194 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein großes Weinglas mit viel Eis, gefüllt mit einem perlenden, leuchtend orange-roten Getränk, eine Orangenscheibe im Glas. Daneben unscharf ein Schälchen Oliven und Käsewürfel.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Aussehen: Form und blaues Etikett mit weißer Raute exakt wie auf Anhang 1 (Anhang 2 zeigt dasselbe Foto als Etikett-Referenz). Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Etikett kein Buchstabe anders, Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in den Anhängen. Inhalt der Flasche: leuchtendes Orange-Rot.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift, nachgebaute Markenzeichen oder Aufmachungen anderer Hersteller.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit der Flaschenvorlage vergleichen (Name, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“
- Nur Rezept-Zutaten im Bild; Entwurf, der Brenner bestätigt die Rezepte (Karte „Hierberol-Spritz“).
- Keine bekannten Markenzeichen oder Aufmachungen anderer Hersteller im Ergebnis.
- Sobald die Datei in fotos-ki/ liegt, baut der nächste Build sie in die Sortenseite ein (site/data/ki-bilder.js, Karte nach kartenNummern); bis dahin zeigt die Karte den Platzhalter.

---

## 3. Hierberol: Hierberol auf Eis mit Orangenscheibe (Karte 2 von 4)

- **Format:** Querformat 4:3 (1448 × 1086 Pixel)
- **Anhang 1:** `fotos-flaschen/hierberol-0-7l.png`
- **Anhang 2:** `fotos-flaschen/hierberol-0-7l.png`
- **Ergebnis speichern als:** `fotos-ki/hierberol-2.png`
- **Status:** vorhanden
- **Prompt:** 187 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Tumbler mit Eiswürfeln und leuchtend orange-rotem Hierberol, eine Orangenscheibe am Glasrand. Daneben unscharf ein Schälchen Oliven.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Aussehen: Form und blaues Etikett mit weißer Raute exakt wie auf Anhang 1 (Anhang 2 zeigt dasselbe Foto als Etikett-Referenz). Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Etikett kein Buchstabe anders, Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in den Anhängen. Inhalt der Flasche: leuchtendes Orange-Rot.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift, nachgebaute Markenzeichen oder Aufmachungen anderer Hersteller.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit der Flaschenvorlage vergleichen (Name, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“
- Nur Rezept-Zutaten im Bild; Entwurf, der Brenner bestätigt die Rezepte (Karte „Hierberol auf Eis mit Orangenscheibe“).
- Keine bekannten Markenzeichen oder Aufmachungen anderer Hersteller im Ergebnis.
- Sobald die Datei in fotos-ki/ liegt, baut der nächste Build sie in die Sortenseite ein (site/data/ki-bilder.js, Karte nach kartenNummern); bis dahin zeigt die Karte den Platzhalter.

---

## 4. Hierberol: Hierberol Tonic (Karte 3 von 4)

- **Format:** Querformat 4:3 (1448 × 1086 Pixel)
- **Anhang 1:** `fotos-flaschen/hierberol-0-7l.png`
- **Anhang 2:** `fotos-flaschen/hierberol-0-7l.png`
- **Ergebnis speichern als:** `fotos-ki/hierberol-3.png`
- **Status:** vorhanden
- **Prompt:** 193 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Longdrinkglas, bis oben mit Eiswürfeln gefüllt, darin ein hell orange-rotes, leicht perlendes Getränk, eine Orangenscheibe im Glas. Daneben unscharf ein paar Käsewürfel.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Aussehen: Form und blaues Etikett mit weißer Raute exakt wie auf Anhang 1 (Anhang 2 zeigt dasselbe Foto als Etikett-Referenz). Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Etikett kein Buchstabe anders, Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in den Anhängen. Inhalt der Flasche: leuchtendes Orange-Rot.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift, nachgebaute Markenzeichen oder Aufmachungen anderer Hersteller.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit der Flaschenvorlage vergleichen (Name, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“
- Nur Rezept-Zutaten im Bild; Entwurf, der Brenner bestätigt die Rezepte (Karte „Hierberol Tonic“).
- Keine bekannten Markenzeichen oder Aufmachungen anderer Hersteller im Ergebnis.
- Sobald die Datei in fotos-ki/ liegt, baut der nächste Build sie in die Sortenseite ein (site/data/ki-bilder.js, Karte nach kartenNummern); bis dahin zeigt die Karte den Platzhalter.

---

## 5. Hierberol: Hierberol zu Oliven und Käsewürfeln (Karte 4 von 4)

- **Format:** Querformat 4:3 (1448 × 1086 Pixel)
- **Anhang 1:** `fotos-flaschen/hierberol-0-7l.png`
- **Anhang 2:** `fotos-flaschen/hierberol-0-7l.png`
- **Ergebnis speichern als:** `fotos-ki/hierberol-4.png`
- **Status:** vorhanden
- **Prompt:** 193 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Holzbrett mit grünen Oliven und kleinen Käsewürfeln, daneben ein Tumbler mit leuchtend orange-rotem Hierberol, ohne Eis und ohne Garnitur.
Flasche: Die Flasche steht vollständig im Bild neben dem Essen und dem Glas: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Aussehen: Form und blaues Etikett mit weißer Raute exakt wie auf Anhang 1 (Anhang 2 zeigt dasselbe Foto als Etikett-Referenz). Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Etikett kein Buchstabe anders, Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in den Anhängen. Inhalt der Flasche: leuchtendes Orange-Rot.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift, nachgebaute Markenzeichen oder Aufmachungen anderer Hersteller.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit der Flaschenvorlage vergleichen (Name, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“
- Nur Rezept-Zutaten im Bild; Entwurf, der Brenner bestätigt die Rezepte (Karte „Hierberol zu Oliven und Käsewürfeln“).
- Keine bekannten Markenzeichen oder Aufmachungen anderer Hersteller im Ergebnis.
- Sobald die Datei in fotos-ki/ liegt, baut der nächste Build sie in die Sortenseite ein (site/data/ki-bilder.js, Karte nach kartenNummern); bis dahin zeigt die Karte den Platzhalter.

---

## 6. Kräider Batti: Flasche

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/rund-0-5l.png` (leere runde Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur als Platzhalter für Form und Proportionen; die endgültige Form ist noch zu klären)
- **Anhang 2:** `PLATZHALTER: Etikett von Kräider Batti folgt` (das Etikett von Kräider Batti (liegt noch nicht vor)) **(fehlt)**
- **Ergebnis speichern als:** `fotos-flaschen/kraider-batti-0-5l.png`
- **Status:** vorhanden
- **Prompt:** 256 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur als Platzhalter für Form und Proportionen; die endgültige Form ist noch zu klären); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt ohne Papierband. Inhalt: sehr dunkelbrauner, fast schwarzer Kräuterlikör in dunkler Glasflasche, der Likör ist durch das dunkle Glas kaum zu sehen, die Flasche ist bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2, es liegt noch nicht vor und wird mitgeschickt: Name „Kräider Batti“, Alkoholangabe und Menge nur wie auf dem Etikett, nichts erfinden. Es wird unverändert übernommen (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“) und legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, Glanz und Reflexe des Glases laufen über das Etikett. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/kraider-batti-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Anhang fehlt: PLATZHALTER: Etikett von Kräider Batti folgt. Eintrag im ChatGPT-Stapel mit Status „Etikett fehlt“ markiert, nicht in der CSV der offenen Bilder.
- Anhang 2 fehlt: das Etikett von Kräider Batti liegt noch nicht vor. Ohne Etikett nicht erzeugen (ChatGPT würde den Namen frei erfinden); sobald es da ist, als Datei in den Prompt einsetzen und diese Konfiguration anpassen (anhang2, etikettFolgt).
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Grund hell, neutral, weißgrau; sanfter Schatten am Boden.
- Inhalt: sehr dunkelbrauner, fast schwarzer Kräuterlikör in dunkler Glasflasche, der Likör ist durch das dunkle Glas kaum zu sehen, die Flasche ist bis zum Hals gefüllt.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller im Ergebnis (Form, Etikett, Schrift, Symbole).
- Form klären: fotos-basis/rund-0-5l.png ist nur ein Platzhalter (klares Glas, anderer Verschluss); Größe und Flaschenform von Kräider Batti sind nicht bekannt, dunkles Glas steht nur im Prompt; der Verschluss ist die Verschluss-Zeile (Glasstopfen ohne Kork)
- Größe, Alkoholgehalt und Preis von Kräider Batti sind nicht bekannt; nichts davon in den Prompt oder auf die Seite schreiben, bis der Brenner sie liefert.

---

## 7. Kräider Batti: Kräider Batti pur, gut gekühlt (Karte 1 von 4)

- **Format:** Querformat 4:3 (1448 × 1086 Pixel)
- **Anhang 1:** `fotos-flaschen/kraider-batti-0-5l.png`
- **Anhang 2:** `fotos-flaschen/kraider-batti-0-5l.png`
- **Ergebnis speichern als:** `fotos-ki/kraider-batti-1.png`
- **Status:** vorhanden
- **Prompt:** 188 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein kleines Stielglas mit gut gekühltem, sehr dunkelbraunem Kräuterlikör, das Glas leicht beschlagen, ohne Eis und ohne Garnitur.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Aussehen: Form, dunkles Glas und Etikett exakt wie auf Anhang 1 (Anhang 2 zeigt dasselbe Bild als Etikett-Referenz). Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Etikett kein Buchstabe anders, Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in den Anhängen. Inhalt der Flasche: sehr dunkelbraun, fast schwarz.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift, nachgebaute Markenzeichen oder Aufmachungen anderer Hersteller.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit der Flaschenvorlage vergleichen (Name, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“
- Nur Rezept-Zutaten im Bild; Entwurf, der Brenner bestätigt die Rezepte (Karte „Kräider Batti pur, gut gekühlt“).
- Keine bekannten Markenzeichen oder Aufmachungen anderer Hersteller im Ergebnis.
- Kräider Batti hat keine Sortenseite: die Datei dient nur als Vorrat. Erst erzeugen, wenn Flaschenbild und Etikett vorliegen (Anhang 1 und 2 sind das noch fehlende Flaschenbild).

---

## 8. Kräider Batti: Kräider Batti auf Eis (Karte 2 von 4)

- **Format:** Querformat 4:3 (1448 × 1086 Pixel)
- **Anhang 1:** `fotos-flaschen/kraider-batti-0-5l.png`
- **Anhang 2:** `fotos-flaschen/kraider-batti-0-5l.png`
- **Ergebnis speichern als:** `fotos-ki/kraider-batti-2.png`
- **Status:** vorhanden
- **Prompt:** 180 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein Tumbler mit Eiswürfeln und sehr dunkelbraunem Kräuterlikör, ohne Garnitur.
Flasche: Die Flasche steht vollständig im Bild neben dem Getränk: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Aussehen: Form, dunkles Glas und Etikett exakt wie auf Anhang 1 (Anhang 2 zeigt dasselbe Bild als Etikett-Referenz). Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Etikett kein Buchstabe anders, Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in den Anhängen. Inhalt der Flasche: sehr dunkelbraun, fast schwarz.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift, nachgebaute Markenzeichen oder Aufmachungen anderer Hersteller.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit der Flaschenvorlage vergleichen (Name, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“
- Nur Rezept-Zutaten im Bild; Entwurf, der Brenner bestätigt die Rezepte (Karte „Kräider Batti auf Eis“).
- Keine bekannten Markenzeichen oder Aufmachungen anderer Hersteller im Ergebnis.
- Kräider Batti hat keine Sortenseite: die Datei dient nur als Vorrat. Erst erzeugen, wenn Flaschenbild und Etikett vorliegen (Anhang 1 und 2 sind das noch fehlende Flaschenbild).

---

## 9. Kräider Batti: Espresso mit Kräider Batti (Karte 3 von 4)

- **Format:** Querformat 4:3 (1448 × 1086 Pixel)
- **Anhang 1:** `fotos-flaschen/kraider-batti-0-5l.png`
- **Anhang 2:** `fotos-flaschen/kraider-batti-0-5l.png`
- **Ergebnis speichern als:** `fotos-ki/kraider-batti-3.png`
- **Status:** offen
- **Prompt:** 190 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Eine Espressotasse mit frischem Espresso und Crema auf einer Untertasse, daneben ein kleines Glas sehr dunkelbrauner Kräuterlikör.
Flasche: Die Flasche steht vollständig im Bild neben dem Essen und dem Glas: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Aussehen: Form, dunkles Glas und Etikett exakt wie auf Anhang 1 (Anhang 2 zeigt dasselbe Bild als Etikett-Referenz). Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Etikett kein Buchstabe anders, Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in den Anhängen. Inhalt der Flasche: sehr dunkelbraun, fast schwarz.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift, nachgebaute Markenzeichen oder Aufmachungen anderer Hersteller.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit der Flaschenvorlage vergleichen (Name, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“
- Nur Rezept-Zutaten im Bild; Entwurf, der Brenner bestätigt die Rezepte (Karte „Espresso mit Kräider Batti“).
- Keine bekannten Markenzeichen oder Aufmachungen anderer Hersteller im Ergebnis.
- Kräider Batti hat keine Sortenseite: die Datei dient nur als Vorrat. Erst erzeugen, wenn Flaschenbild und Etikett vorliegen (Anhang 1 und 2 sind das noch fehlende Flaschenbild).

---

## 10. Kräider Batti: Kräider Batti zu dunkler Schokolade (Karte 4 von 4)

- **Format:** Querformat 4:3 (1448 × 1086 Pixel)
- **Anhang 1:** `fotos-flaschen/kraider-batti-0-5l.png`
- **Anhang 2:** `fotos-flaschen/kraider-batti-0-5l.png`
- **Ergebnis speichern als:** `fotos-ki/kraider-batti-4.png`
- **Status:** offen
- **Prompt:** 188 Wörter

```
Erstelle ein Foto. Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.
Szene: Ein kleines Stielglas mit sehr dunkelbraunem Kräuterlikör, daneben auf einem Holzbrett drei Stücke dunkle Schokolade.
Flasche: Die Flasche steht vollständig im Bild neben dem Essen und dem Glas: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Aussehen: Form, dunkles Glas und Etikett exakt wie auf Anhang 1 (Anhang 2 zeigt dasselbe Bild als Etikett-Referenz). Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Etikett kein Buchstabe anders, Adresszeile fest: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“. Alkoholangabe wie in den Anhängen. Inhalt der Flasche: sehr dunkelbraun, fast schwarz.
Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.
Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift, nachgebaute Markenzeichen oder Aufmachungen anderer Hersteller.
```

**Prüfen:**
- Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.
- Etikett mit der Flaschenvorlage vergleichen (Name, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“
- Nur Rezept-Zutaten im Bild; Entwurf, der Brenner bestätigt die Rezepte (Karte „Kräider Batti zu dunkler Schokolade“).
- Keine bekannten Markenzeichen oder Aufmachungen anderer Hersteller im Ergebnis.
- Kräider Batti hat keine Sortenseite: die Datei dient nur als Vorrat. Erst erzeugen, wenn Flaschenbild und Etikett vorliegen (Anhang 1 und 2 sind das noch fehlende Flaschenbild).

