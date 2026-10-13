# PROMPTS-NEUE-GRUPPEN: Liköre, Holzkisten, Geräift, weitere Brände (ChatGPT)

Erzeugt mit `node tools/foto_prompts_neue_gruppen.mjs` aus `tools/neue-gruppen.json`. Nicht von Hand ändern. 49 Prompts (Liköre: 32, Holzkisten (nur mit Flaschen): 4, Geräift: 6, Weitere Brände: 7). Die Flaschen sind Sorten mit Sortenseite (Eintrag in `site/data/produkte.js`), die Holzkisten haben nur Prompts; keine Serviervorschläge. Alles sind Entwürfe, der Brenner bestätigt sie.

**Stand:** 3 offen, 46 vorhanden, davon 11 mit fehlendem Anhang (Etikett liegt noch nicht vor, siehe Übersicht).

- **Liköre** (25 % vol.): je Likör ein Prompt für 0,5 L (`<id>-0-5l.png`) und 0,1 L (`<id>-0-1l.png`); Winterdreams (saisonal) nur 0,5 L, Ingwerlikör 0,2 L und 0,5 L. Anhang 2 ist das flache Etikett aus `Fertige Etiquetten/`, wo es eines gibt (Ingwerlikör: Etikett folgt).
- **Holzkisten (nur mit Flaschen):** Querformat 1448 × 1086, Datei `fotos-flaschen/<kisten-id>.png`. Es gibt kein Kistenfoto; die Kiste steht nur im Prompt, Anhang 1 und 2 sind dieselbe Basisflasche.
- **Geräift** (35 % vol., 0,5 L und 0,1 L): Branntwein „op … geräift“, einige ganze Früchte in der Flüssigkeit (offene Frage, siehe unten). Etikett für Mirabelle und Quetsch aus `Fertige Etiquetten/`, für Williams-Birne folgt es.
- **Weitere Brände:** Neutraler Alkohol 1 L, Äppel/Pommes, Pastis, Nëssdrëpp Walnuss, Pefferminz, Quitten (je 0,5 L). **Status der Sorten unklar**; Etiketten folgen, Flüssigkeitsfarben geschätzt.
- Alle Flaschen: Glasstopfen ohne Kork (Verschluss-Zeile), Hochformat 1024 × 1536 Pixel. Markenschutz: Die Prompts verlangen, keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachzubauen. Keine Preise in den Prompts.

## Offene Fragen

- Geräift: Sind ganze Früchte in der Flasche sichtbar? Der Prompt verlangt einige ganze Früchte in der Flüssigkeit, sonst nichts.
- Weitere Brände: Werden die Sorten geführt (Status unklar)? Welche Farbe hat die Flüssigkeit?
- Etiketten: für Ingwerlikör, Williams-Birne geräift und die sechs weiteren Brände liegt kein flaches Etikett vor.
- Holzkisten: Holzart, Fächer, Größe der Kiste (Annahme: heller Holzton, Holzstege, Holzwolle).
- Likör 0,1 L: Anhang 1 ist die schlanke 0,1-L-Flasche (es gibt keine runde 0,1-L-Basis).

Die Ergebnisse gehören als PNG unter dem Namen aus der Tabelle in `fotos-flaschen/`. Automatisch abarbeiten: `CHATGPT-STAPEL.md` (Gruppe `neue-gruppen`).

## Übersicht

| Eintrag | Gruppe | Typ | Anhang 1 | Anhang 2 | Zieldatei | Status | Wörter |
|---|---|---|---|---|---|---|---|
| de-welle-max-0-5l | likoere | flasche | `fotos-basis/rund-0-5l.png` | `Fertige Etiquetten/Likör Welle max_Zeichenfläche 1.png` | `fotos-flaschen/de-welle-max-0-5l.png` | vorhanden | 218 |
| de-welle-max-0-1l | likoere | flasche | `fotos-basis/schlank-0-1l.png` | `Fertige Etiquetten/Likör Welle max_Zeichenfläche 1.png` | `fotos-flaschen/de-welle-max-0-1l.png` | vorhanden | 253 |
| hambierlikoer-0-5l | likoere | flasche | `fotos-basis/rund-0-5l.png` | `Fertige Etiquetten/Likör Hambier_Zeichenfläche 1.png` | `fotos-flaschen/hambierlikoer-0-5l.png` | vorhanden | 215 |
| hambierlikoer-0-1l | likoere | flasche | `fotos-basis/schlank-0-1l.png` | `Fertige Etiquetten/Likör Hambier_Zeichenfläche 1.png` | `fotos-flaschen/hambierlikoer-0-1l.png` | vorhanden | 250 |
| holly-0-5l | likoere | flasche | `fotos-basis/rund-0-5l.png` | `Fertige Etiquetten/Likör Holunderblüte-01_Zeichenfläche 1.png` | `fotos-flaschen/holly-0-5l.png` | vorhanden | 216 |
| holly-0-1l | likoere | flasche | `fotos-basis/schlank-0-1l.png` | `Fertige Etiquetten/Likör Holunderblüte-01_Zeichenfläche 1.png` | `fotos-flaschen/holly-0-1l.png` | vorhanden | 251 |
| kiischtenlikoer-0-5l | likoere | flasche | `fotos-basis/rund-0-5l.png` | `Fertige Etiquetten/Likör Kiischt_Zeichenfläche 1.png` | `fotos-flaschen/kiischtenlikoer-0-5l.png` | vorhanden | 215 |
| kiischtenlikoer-0-1l | likoere | flasche | `fotos-basis/schlank-0-1l.png` | `Fertige Etiquetten/Likör Kiischt_Zeichenfläche 1.png` | `fotos-flaschen/kiischtenlikoer-0-1l.png` | vorhanden | 250 |
| kraeiderlikoer-0-5l | likoere | flasche | `fotos-basis/rund-0-5l.png` | `Fertige Etiquetten/Likör Kraider_Zeichenfläche 1.png` | `fotos-flaschen/kraeiderlikoer-0-5l.png` | vorhanden | 215 |
| kraeiderlikoer-0-1l | likoere | flasche | `fotos-basis/schlank-0-1l.png` | `Fertige Etiquetten/Likör Kraider_Zeichenfläche 1.png` | `fotos-flaschen/kraeiderlikoer-0-1l.png` | vorhanden | 250 |
| mandellikoer-0-5l | likoere | flasche | `fotos-basis/rund-0-5l.png` | `Fertige Etiquetten/Likör Mandel_Zeichenfläche 1.png` | `fotos-flaschen/mandellikoer-0-5l.png` | vorhanden | 215 |
| mandellikoer-0-1l | likoere | flasche | `fotos-basis/schlank-0-1l.png` | `Fertige Etiquetten/Likör Mandel_Zeichenfläche 1.png` | `fotos-flaschen/mandellikoer-0-1l.png` | vorhanden | 250 |
| mirabellenlikoer-0-5l | likoere | flasche | `fotos-basis/rund-0-5l.png` | `Fertige Etiquetten/Likör Mirabelle_Zeichenfläche 1.png` | `fotos-flaschen/mirabellenlikoer-0-5l.png` | vorhanden | 215 |
| mirabellenlikoer-0-1l | likoere | flasche | `fotos-basis/schlank-0-1l.png` | `Fertige Etiquetten/Likör Mirabelle_Zeichenfläche 1.png` | `fotos-flaschen/mirabellenlikoer-0-1l.png` | vorhanden | 250 |
| mirabelle-op-mirabellen-likoer-0-5l | likoere | flasche | `fotos-basis/rund-0-5l.png` | `Fertige Etiquetten/Likör Mirabelle geräift_Zeichenfläche 1.png` | `fotos-flaschen/mirabelle-op-mirabellen-likoer-0-5l.png` | offen | 215 |
| nesslikoer-0-5l | likoere | flasche | `fotos-basis/rund-0-5l.png` | `Fertige Etiquetten/Likör Nesslikör_Zeichenfläche 1.png` | `fotos-flaschen/nesslikoer-0-5l.png` | vorhanden | 215 |
| nesslikoer-0-1l | likoere | flasche | `fotos-basis/schlank-0-1l.png` | `Fertige Etiquetten/Likör Nesslikör_Zeichenfläche 1.png` | `fotos-flaschen/nesslikoer-0-1l.png` | vorhanden | 250 |
| pfeffi-0-5l | likoere | flasche | `fotos-basis/rund-0-5l.png` | `Fertige Etiquetten/Likör Pfeffi Peffermenz_Zeichenfläche 1.png` | `fotos-flaschen/pfeffi-0-5l.png` | vorhanden | 215 |
| pfeffi-0-1l | likoere | flasche | `fotos-basis/schlank-0-1l.png` | `Fertige Etiquetten/Likör Pfeffi Peffermenz_Zeichenfläche 1.png` | `fotos-flaschen/pfeffi-0-1l.png` | offen | 250 |
| pijenlikoer-0-5l | likoere | flasche | `fotos-basis/rund-0-5l.png` | `Fertige Etiquetten/Likör Pijen_Zeichenfläche 1.png` | `fotos-flaschen/pijenlikoer-0-5l.png` | vorhanden | 215 |
| pijenlikoer-0-1l | likoere | flasche | `fotos-basis/schlank-0-1l.png` | `Fertige Etiquetten/Likör Pijen_Zeichenfläche 1.png` | `fotos-flaschen/pijenlikoer-0-1l.png` | vorhanden | 250 |
| quittenlikoer-0-5l | likoere | flasche | `fotos-basis/rund-0-5l.png` | `Fertige Etiquetten/Likör Quitten_Zeichenfläche 1.png` | `fotos-flaschen/quittenlikoer-0-5l.png` | vorhanden | 215 |
| quittenlikoer-0-1l | likoere | flasche | `fotos-basis/schlank-0-1l.png` | `Fertige Etiquetten/Likör Quitten_Zeichenfläche 1.png` | `fotos-flaschen/quittenlikoer-0-1l.png` | vorhanden | 250 |
| schleiwenlikoer-0-5l | likoere | flasche | `fotos-basis/rund-0-5l.png` | `Fertige Etiquetten/Likör Schleiwen_Zeichenfläche 1.png` | `fotos-flaschen/schleiwenlikoer-0-5l.png` | vorhanden | 215 |
| schleiwenlikoer-0-1l | likoere | flasche | `fotos-basis/schlank-0-1l.png` | `Fertige Etiquetten/Likör Schleiwen_Zeichenfläche 1.png` | `fotos-flaschen/schleiwenlikoer-0-1l.png` | vorhanden | 250 |
| vizlikoer-0-5l | likoere | flasche | `fotos-basis/rund-0-5l.png` | `Fertige Etiquetten/Likör Viz_Zeichenfläche 1.png` | `fotos-flaschen/vizlikoer-0-5l.png` | vorhanden | 215 |
| vizlikoer-0-1l | likoere | flasche | `fotos-basis/schlank-0-1l.png` | `Fertige Etiquetten/Likör Viz_Zeichenfläche 1.png` | `fotos-flaschen/vizlikoer-0-1l.png` | vorhanden | 250 |
| williamslikoer-0-5l | likoere | flasche | `fotos-basis/rund-0-5l.png` | `Fertige Etiquetten/Likör Williams_Zeichenfläche 1.png` | `fotos-flaschen/williamslikoer-0-5l.png` | vorhanden | 215 |
| williamslikoer-0-1l | likoere | flasche | `fotos-basis/schlank-0-1l.png` | `Fertige Etiquetten/Likör Williams_Zeichenfläche 1.png` | `fotos-flaschen/williamslikoer-0-1l.png` | vorhanden | 250 |
| winterdreams-0-5l | likoere | flasche | `fotos-basis/rund-0-5l.png` | `Fertige Etiquetten/Likör Winter Dreams-01.png` | `fotos-flaschen/winterdreams-0-5l.png` | vorhanden | 216 |
| ingwerlikoer-0-5l | likoere | flasche | `fotos-basis/rund-0-5l.png` | `PLATZHALTER: Etikett von Ingwerlikör folgt` (fehlt) | `fotos-flaschen/ingwerlikoer-0-5l.png` | vorhanden | 227 |
| ingwerlikoer-0-2l | likoere | flasche | `fotos-basis/rund-0-2l.png` | `PLATZHALTER: Etikett von Ingwerlikör folgt` (fehlt) | `fotos-flaschen/ingwerlikoer-0-2l.png` | vorhanden | 227 |
| willi-op-biren-geraeift-0-5l | geraeift | flasche | `fotos-basis/schlank-0-5l.png` | `PLATZHALTER: Etikett von Willi op Biren geräift folgt` (fehlt) | `fotos-flaschen/willi-op-biren-geraeift-0-5l.png` | vorhanden | 241 |
| willi-op-biren-geraeift-0-1l | geraeift | flasche | `fotos-basis/schlank-0-1l.png` | `PLATZHALTER: Etikett von Willi op Biren geräift folgt` (fehlt) | `fotos-flaschen/willi-op-biren-geraeift-0-1l.png` | vorhanden | 241 |
| mirabelle-op-mirabellen-geraeift-0-5l | geraeift | flasche | `fotos-basis/schlank-0-5l.png` | `Fertige Etiquetten/Brandwein Mirabelle geräift-01.png` | `fotos-flaschen/mirabelle-op-mirabellen-geraeift-0-5l.png` | vorhanden | 225 |
| mirabelle-op-mirabellen-geraeift-0-1l | geraeift | flasche | `fotos-basis/schlank-0-1l.png` | `Fertige Etiquetten/Brandwein Mirabelle geräift-01.png` | `fotos-flaschen/mirabelle-op-mirabellen-geraeift-0-1l.png` | vorhanden | 245 |
| quetsch-op-quetsch-geraeift-0-5l | geraeift | flasche | `fotos-basis/schlank-0-5l.png` | `Fertige Etiquetten/Brandwein Quetsch geräift-01.png` | `fotos-flaschen/quetsch-op-quetsch-geraeift-0-5l.png` | vorhanden | 225 |
| quetsch-op-quetsch-geraeift-0-1l | geraeift | flasche | `fotos-basis/schlank-0-1l.png` | `Fertige Etiquetten/Brandwein Quetsch geräift-01.png` | `fotos-flaschen/quetsch-op-quetsch-geraeift-0-1l.png` | vorhanden | 245 |
| neutral-alkohol-1-0l | weitere-braende | flasche | `fotos-basis/rund-1-0l.png` | `PLATZHALTER: Etikett von Neutraler Alkohol folgt` (fehlt) | `fotos-flaschen/neutral-alkohol-1-0l.png` | vorhanden | 227 |
| aeppel-pommes-0-5l | weitere-braende | flasche | `fotos-basis/rund-0-5l.png` | `PLATZHALTER: Etikett von Äppel/Pommes folgt` (fehlt) | `fotos-flaschen/aeppel-pommes-0-5l.png` | vorhanden | 225 |
| aeppel-pommes-1-0l | weitere-braende | flasche | `fotos-basis/rund-1-0l.png` | `PLATZHALTER: Etikett von Äppel/Pommes folgt` (fehlt) | `fotos-flaschen/aeppel-pommes-1-0l.png` | offen | 225 |
| pastis-0-5l | weitere-braende | flasche | `fotos-basis/rund-0-5l.png` | `PLATZHALTER: Etikett von Pastis folgt` (fehlt) | `fotos-flaschen/pastis-0-5l.png` | vorhanden | 226 |
| nessdrepp-0-5l | weitere-braende | flasche | `fotos-basis/rund-0-5l.png` | `PLATZHALTER: Etikett von Nëssdrëpp Walnuss folgt` (fehlt) | `fotos-flaschen/nessdrepp-0-5l.png` | vorhanden | 226 |
| pefferminz-0-5l | weitere-braende | flasche | `fotos-basis/rund-0-5l.png` | `PLATZHALTER: Etikett von Pefferminz folgt` (fehlt) | `fotos-flaschen/pefferminz-0-5l.png` | vorhanden | 226 |
| quitten-0-5l | weitere-braende | flasche | `fotos-basis/rund-0-5l.png` | `PLATZHALTER: Etikett von Quitten folgt` (fehlt) | `fotos-flaschen/quitten-0-5l.png` | vorhanden | 225 |
| holzkiste-6x0-1l | holzkisten | kiste | `fotos-basis/schlank-0-1l.png` | `fotos-basis/schlank-0-1l.png` | `fotos-flaschen/holzkiste-6x0-1l.png` | vorhanden | 179 |
| holzkiste-3x0-1l | holzkisten | kiste | `fotos-basis/schlank-0-1l.png` | `fotos-basis/schlank-0-1l.png` | `fotos-flaschen/holzkiste-3x0-1l.png` | vorhanden | 179 |
| holzkiste-4x0-2l | holzkisten | kiste | `fotos-basis/rund-0-2l.png` | `fotos-basis/rund-0-2l.png` | `fotos-flaschen/holzkiste-4x0-2l.png` | vorhanden | 182 |
| holzkiste-5x-apotheker-0-1l | holzkisten | kiste | `fotos-basis/apotheker-0-1l.png` | `fotos-basis/apotheker-0-1l.png` | `fotos-flaschen/holzkiste-5x-apotheker-0-1l.png` | vorhanden | 178 |

---

## 1. De wëlle Max: Flasche 0,5 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/rund-0-5l.png` (leere runde 0,5-L-Flasche)
- **Anhang 2:** `Fertige Etiquetten/Likör Welle max_Zeichenfläche 1.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/de-welle-max-0-5l.png`
- **Status:** vorhanden
- **Prompt:** 218 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: dunkles Beerenrot mit violettem Ton, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Mengenangabe wie in Anhang 2. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/de-welle-max-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: dunkles Beerenrot mit violettem Ton (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 2. De wëlle Max: Flasche 0,1 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/schlank-0-1l.png` (leere runde 0,1-L-Flasche (Ersatz: schlanke 0,1-L-Flasche, es gibt keine runde))
- **Anhang 2:** `Fertige Etiquetten/Likör Welle max_Zeichenfläche 1.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/de-welle-max-0-1l.png`
- **Status:** vorhanden
- **Prompt:** 253 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke 0,1-L-Flasche ohne Etikett (Ersatz, eine runde Basis dieser Größe gibt es nicht; Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen, Flasche eher rund als schlank halten); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: dunkles Beerenrot mit violettem Ton, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,1 l“; sonst keine Änderung am Etikett. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/de-welle-max-0-1l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Mengenangabe auf dem Etikett lautet „0,1 l“ (nicht „0,5 l“); ob das 0,5-L-Etikett diese Angabe als „0,5 l“ trägt, ist nicht geprüft (nicht verifiziert).
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: dunkles Beerenrot mit violettem Ton (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Anhang 1 ist die schlanke 0,1-L-Flasche (Ersatz, es gibt keine runde 0,1-L-Basis); die Form kann von den runden Flaschen der Reihe abweichen.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 3. Hambierlikör: Flasche 0,5 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/rund-0-5l.png` (leere runde 0,5-L-Flasche)
- **Anhang 2:** `Fertige Etiquetten/Likör Hambier_Zeichenfläche 1.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/hambierlikoer-0-5l.png`
- **Status:** vorhanden
- **Prompt:** 215 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: kräftiges Himbeerrot, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Mengenangabe wie in Anhang 2. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/hambierlikoer-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: kräftiges Himbeerrot (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 4. Hambierlikör: Flasche 0,1 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/schlank-0-1l.png` (leere runde 0,1-L-Flasche (Ersatz: schlanke 0,1-L-Flasche, es gibt keine runde))
- **Anhang 2:** `Fertige Etiquetten/Likör Hambier_Zeichenfläche 1.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/hambierlikoer-0-1l.png`
- **Status:** vorhanden
- **Prompt:** 250 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke 0,1-L-Flasche ohne Etikett (Ersatz, eine runde Basis dieser Größe gibt es nicht; Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen, Flasche eher rund als schlank halten); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: kräftiges Himbeerrot, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,1 l“; sonst keine Änderung am Etikett. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/hambierlikoer-0-1l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Mengenangabe auf dem Etikett lautet „0,1 l“ (nicht „0,5 l“); ob das 0,5-L-Etikett diese Angabe als „0,5 l“ trägt, ist nicht geprüft (nicht verifiziert).
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: kräftiges Himbeerrot (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Anhang 1 ist die schlanke 0,1-L-Flasche (Ersatz, es gibt keine runde 0,1-L-Basis); die Form kann von den runden Flaschen der Reihe abweichen.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 5. Holly: Flasche 0,5 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/rund-0-5l.png` (leere runde 0,5-L-Flasche)
- **Anhang 2:** `Fertige Etiquetten/Likör Holunderblüte-01_Zeichenfläche 1.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/holly-0-5l.png`
- **Status:** vorhanden
- **Prompt:** 216 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: blasses, klares Strohgelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Mengenangabe wie in Anhang 2. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/holly-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: blasses, klares Strohgelb (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 6. Holly: Flasche 0,1 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/schlank-0-1l.png` (leere runde 0,1-L-Flasche (Ersatz: schlanke 0,1-L-Flasche, es gibt keine runde))
- **Anhang 2:** `Fertige Etiquetten/Likör Holunderblüte-01_Zeichenfläche 1.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/holly-0-1l.png`
- **Status:** vorhanden
- **Prompt:** 251 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke 0,1-L-Flasche ohne Etikett (Ersatz, eine runde Basis dieser Größe gibt es nicht; Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen, Flasche eher rund als schlank halten); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: blasses, klares Strohgelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,1 l“; sonst keine Änderung am Etikett. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/holly-0-1l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Mengenangabe auf dem Etikett lautet „0,1 l“ (nicht „0,5 l“); ob das 0,5-L-Etikett diese Angabe als „0,5 l“ trägt, ist nicht geprüft (nicht verifiziert).
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: blasses, klares Strohgelb (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Anhang 1 ist die schlanke 0,1-L-Flasche (Ersatz, es gibt keine runde 0,1-L-Basis); die Form kann von den runden Flaschen der Reihe abweichen.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 7. Kiischtenlikör: Flasche 0,5 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/rund-0-5l.png` (leere runde 0,5-L-Flasche)
- **Anhang 2:** `Fertige Etiquetten/Likör Kiischt_Zeichenfläche 1.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/kiischtenlikoer-0-5l.png`
- **Status:** vorhanden
- **Prompt:** 215 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: dunkles Kirschrot, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Mengenangabe wie in Anhang 2. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/kiischtenlikoer-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: dunkles Kirschrot (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 8. Kiischtenlikör: Flasche 0,1 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/schlank-0-1l.png` (leere runde 0,1-L-Flasche (Ersatz: schlanke 0,1-L-Flasche, es gibt keine runde))
- **Anhang 2:** `Fertige Etiquetten/Likör Kiischt_Zeichenfläche 1.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/kiischtenlikoer-0-1l.png`
- **Status:** vorhanden
- **Prompt:** 250 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke 0,1-L-Flasche ohne Etikett (Ersatz, eine runde Basis dieser Größe gibt es nicht; Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen, Flasche eher rund als schlank halten); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: dunkles Kirschrot, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,1 l“; sonst keine Änderung am Etikett. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/kiischtenlikoer-0-1l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Mengenangabe auf dem Etikett lautet „0,1 l“ (nicht „0,5 l“); ob das 0,5-L-Etikett diese Angabe als „0,5 l“ trägt, ist nicht geprüft (nicht verifiziert).
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: dunkles Kirschrot (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Anhang 1 ist die schlanke 0,1-L-Flasche (Ersatz, es gibt keine runde 0,1-L-Basis); die Form kann von den runden Flaschen der Reihe abweichen.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 9. Kräiderlikör: Flasche 0,5 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/rund-0-5l.png` (leere runde 0,5-L-Flasche)
- **Anhang 2:** `Fertige Etiquetten/Likör Kraider_Zeichenfläche 1.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/kraeiderlikoer-0-5l.png`
- **Status:** vorhanden
- **Prompt:** 215 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: dunkles Grünbraun, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Mengenangabe wie in Anhang 2. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/kraeiderlikoer-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: dunkles Grünbraun (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 10. Kräiderlikör: Flasche 0,1 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/schlank-0-1l.png` (leere runde 0,1-L-Flasche (Ersatz: schlanke 0,1-L-Flasche, es gibt keine runde))
- **Anhang 2:** `Fertige Etiquetten/Likör Kraider_Zeichenfläche 1.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/kraeiderlikoer-0-1l.png`
- **Status:** vorhanden
- **Prompt:** 250 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke 0,1-L-Flasche ohne Etikett (Ersatz, eine runde Basis dieser Größe gibt es nicht; Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen, Flasche eher rund als schlank halten); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: dunkles Grünbraun, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,1 l“; sonst keine Änderung am Etikett. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/kraeiderlikoer-0-1l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Mengenangabe auf dem Etikett lautet „0,1 l“ (nicht „0,5 l“); ob das 0,5-L-Etikett diese Angabe als „0,5 l“ trägt, ist nicht geprüft (nicht verifiziert).
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: dunkles Grünbraun (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Anhang 1 ist die schlanke 0,1-L-Flasche (Ersatz, es gibt keine runde 0,1-L-Basis); die Form kann von den runden Flaschen der Reihe abweichen.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 11. Mandellikör: Flasche 0,5 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/rund-0-5l.png` (leere runde 0,5-L-Flasche)
- **Anhang 2:** `Fertige Etiquetten/Likör Mandel_Zeichenfläche 1.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/mandellikoer-0-5l.png`
- **Status:** vorhanden
- **Prompt:** 215 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: helles Karamellbraun, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Mengenangabe wie in Anhang 2. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/mandellikoer-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: helles Karamellbraun (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 12. Mandellikör: Flasche 0,1 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/schlank-0-1l.png` (leere runde 0,1-L-Flasche (Ersatz: schlanke 0,1-L-Flasche, es gibt keine runde))
- **Anhang 2:** `Fertige Etiquetten/Likör Mandel_Zeichenfläche 1.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/mandellikoer-0-1l.png`
- **Status:** vorhanden
- **Prompt:** 250 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke 0,1-L-Flasche ohne Etikett (Ersatz, eine runde Basis dieser Größe gibt es nicht; Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen, Flasche eher rund als schlank halten); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: helles Karamellbraun, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,1 l“; sonst keine Änderung am Etikett. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/mandellikoer-0-1l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Mengenangabe auf dem Etikett lautet „0,1 l“ (nicht „0,5 l“); ob das 0,5-L-Etikett diese Angabe als „0,5 l“ trägt, ist nicht geprüft (nicht verifiziert).
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: helles Karamellbraun (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Anhang 1 ist die schlanke 0,1-L-Flasche (Ersatz, es gibt keine runde 0,1-L-Basis); die Form kann von den runden Flaschen der Reihe abweichen.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 13. Mirabellenlikör: Flasche 0,5 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/rund-0-5l.png` (leere runde 0,5-L-Flasche)
- **Anhang 2:** `Fertige Etiquetten/Likör Mirabelle_Zeichenfläche 1.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/mirabellenlikoer-0-5l.png`
- **Status:** vorhanden
- **Prompt:** 215 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: warmes Goldgelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Mengenangabe wie in Anhang 2. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/mirabellenlikoer-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: warmes Goldgelb (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 14. Mirabellenlikör: Flasche 0,1 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/schlank-0-1l.png` (leere runde 0,1-L-Flasche (Ersatz: schlanke 0,1-L-Flasche, es gibt keine runde))
- **Anhang 2:** `Fertige Etiquetten/Likör Mirabelle_Zeichenfläche 1.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/mirabellenlikoer-0-1l.png`
- **Status:** vorhanden
- **Prompt:** 250 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke 0,1-L-Flasche ohne Etikett (Ersatz, eine runde Basis dieser Größe gibt es nicht; Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen, Flasche eher rund als schlank halten); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: warmes Goldgelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,1 l“; sonst keine Änderung am Etikett. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/mirabellenlikoer-0-1l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Mengenangabe auf dem Etikett lautet „0,1 l“ (nicht „0,5 l“); ob das 0,5-L-Etikett diese Angabe als „0,5 l“ trägt, ist nicht geprüft (nicht verifiziert).
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: warmes Goldgelb (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Anhang 1 ist die schlanke 0,1-L-Flasche (Ersatz, es gibt keine runde 0,1-L-Basis); die Form kann von den runden Flaschen der Reihe abweichen.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 15. Mirabelle op Mirabellen Likör: Flasche 0,5 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/rund-0-5l.png` (leere runde 0,5-L-Flasche)
- **Anhang 2:** `Fertige Etiquetten/Likör Mirabelle geräift_Zeichenfläche 1.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/mirabelle-op-mirabellen-likoer-0-5l.png`
- **Status:** offen
- **Prompt:** 215 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: warmes Goldgelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Mengenangabe wie in Anhang 2. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/mirabelle-op-mirabellen-likoer-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: warmes Goldgelb (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 16. Nësslikör: Flasche 0,5 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/rund-0-5l.png` (leere runde 0,5-L-Flasche)
- **Anhang 2:** `Fertige Etiquetten/Likör Nesslikör_Zeichenfläche 1.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/nesslikoer-0-5l.png`
- **Status:** vorhanden
- **Prompt:** 215 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: mittleres Nussbraun, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Mengenangabe wie in Anhang 2. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/nesslikoer-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: mittleres Nussbraun (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 17. Nësslikör: Flasche 0,1 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/schlank-0-1l.png` (leere runde 0,1-L-Flasche (Ersatz: schlanke 0,1-L-Flasche, es gibt keine runde))
- **Anhang 2:** `Fertige Etiquetten/Likör Nesslikör_Zeichenfläche 1.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/nesslikoer-0-1l.png`
- **Status:** vorhanden
- **Prompt:** 250 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke 0,1-L-Flasche ohne Etikett (Ersatz, eine runde Basis dieser Größe gibt es nicht; Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen, Flasche eher rund als schlank halten); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: mittleres Nussbraun, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,1 l“; sonst keine Änderung am Etikett. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/nesslikoer-0-1l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Mengenangabe auf dem Etikett lautet „0,1 l“ (nicht „0,5 l“); ob das 0,5-L-Etikett diese Angabe als „0,5 l“ trägt, ist nicht geprüft (nicht verifiziert).
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: mittleres Nussbraun (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Anhang 1 ist die schlanke 0,1-L-Flasche (Ersatz, es gibt keine runde 0,1-L-Basis); die Form kann von den runden Flaschen der Reihe abweichen.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 18. Pfeffi: Flasche 0,5 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/rund-0-5l.png` (leere runde 0,5-L-Flasche)
- **Anhang 2:** `Fertige Etiquetten/Likör Pfeffi Peffermenz_Zeichenfläche 1.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/pfeffi-0-5l.png`
- **Status:** vorhanden
- **Prompt:** 215 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: leuchtendes Minzgrün, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Mengenangabe wie in Anhang 2. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/pfeffi-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: leuchtendes Minzgrün (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 19. Pfeffi: Flasche 0,1 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/schlank-0-1l.png` (leere runde 0,1-L-Flasche (Ersatz: schlanke 0,1-L-Flasche, es gibt keine runde))
- **Anhang 2:** `Fertige Etiquetten/Likör Pfeffi Peffermenz_Zeichenfläche 1.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/pfeffi-0-1l.png`
- **Status:** offen
- **Prompt:** 250 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke 0,1-L-Flasche ohne Etikett (Ersatz, eine runde Basis dieser Größe gibt es nicht; Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen, Flasche eher rund als schlank halten); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: leuchtendes Minzgrün, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,1 l“; sonst keine Änderung am Etikett. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/pfeffi-0-1l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Mengenangabe auf dem Etikett lautet „0,1 l“ (nicht „0,5 l“); ob das 0,5-L-Etikett diese Angabe als „0,5 l“ trägt, ist nicht geprüft (nicht verifiziert).
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: leuchtendes Minzgrün (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Anhang 1 ist die schlanke 0,1-L-Flasche (Ersatz, es gibt keine runde 0,1-L-Basis); die Form kann von den runden Flaschen der Reihe abweichen.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 20. Pijenlikör: Flasche 0,5 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/rund-0-5l.png` (leere runde 0,5-L-Flasche)
- **Anhang 2:** `Fertige Etiquetten/Likör Pijen_Zeichenfläche 1.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/pijenlikoer-0-5l.png`
- **Status:** vorhanden
- **Prompt:** 215 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: helles Pfirsich-Orange, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Mengenangabe wie in Anhang 2. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/pijenlikoer-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: helles Pfirsich-Orange (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 21. Pijenlikör: Flasche 0,1 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/schlank-0-1l.png` (leere runde 0,1-L-Flasche (Ersatz: schlanke 0,1-L-Flasche, es gibt keine runde))
- **Anhang 2:** `Fertige Etiquetten/Likör Pijen_Zeichenfläche 1.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/pijenlikoer-0-1l.png`
- **Status:** vorhanden
- **Prompt:** 250 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke 0,1-L-Flasche ohne Etikett (Ersatz, eine runde Basis dieser Größe gibt es nicht; Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen, Flasche eher rund als schlank halten); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: helles Pfirsich-Orange, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,1 l“; sonst keine Änderung am Etikett. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/pijenlikoer-0-1l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Mengenangabe auf dem Etikett lautet „0,1 l“ (nicht „0,5 l“); ob das 0,5-L-Etikett diese Angabe als „0,5 l“ trägt, ist nicht geprüft (nicht verifiziert).
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: helles Pfirsich-Orange (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Anhang 1 ist die schlanke 0,1-L-Flasche (Ersatz, es gibt keine runde 0,1-L-Basis); die Form kann von den runden Flaschen der Reihe abweichen.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 22. Quittenlikör: Flasche 0,5 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/rund-0-5l.png` (leere runde 0,5-L-Flasche)
- **Anhang 2:** `Fertige Etiquetten/Likör Quitten_Zeichenfläche 1.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/quittenlikoer-0-5l.png`
- **Status:** vorhanden
- **Prompt:** 215 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: blasses Bernstein-Gelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Mengenangabe wie in Anhang 2. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/quittenlikoer-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: blasses Bernstein-Gelb (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 23. Quittenlikör: Flasche 0,1 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/schlank-0-1l.png` (leere runde 0,1-L-Flasche (Ersatz: schlanke 0,1-L-Flasche, es gibt keine runde))
- **Anhang 2:** `Fertige Etiquetten/Likör Quitten_Zeichenfläche 1.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/quittenlikoer-0-1l.png`
- **Status:** vorhanden
- **Prompt:** 250 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke 0,1-L-Flasche ohne Etikett (Ersatz, eine runde Basis dieser Größe gibt es nicht; Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen, Flasche eher rund als schlank halten); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: blasses Bernstein-Gelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,1 l“; sonst keine Änderung am Etikett. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/quittenlikoer-0-1l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Mengenangabe auf dem Etikett lautet „0,1 l“ (nicht „0,5 l“); ob das 0,5-L-Etikett diese Angabe als „0,5 l“ trägt, ist nicht geprüft (nicht verifiziert).
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: blasses Bernstein-Gelb (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Anhang 1 ist die schlanke 0,1-L-Flasche (Ersatz, es gibt keine runde 0,1-L-Basis); die Form kann von den runden Flaschen der Reihe abweichen.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 24. Schléiwenlikör: Flasche 0,5 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/rund-0-5l.png` (leere runde 0,5-L-Flasche)
- **Anhang 2:** `Fertige Etiquetten/Likör Schleiwen_Zeichenfläche 1.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/schleiwenlikoer-0-5l.png`
- **Status:** vorhanden
- **Prompt:** 215 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: dunkles Violettrot, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Mengenangabe wie in Anhang 2. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/schleiwenlikoer-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: dunkles Violettrot (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 25. Schléiwenlikör: Flasche 0,1 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/schlank-0-1l.png` (leere runde 0,1-L-Flasche (Ersatz: schlanke 0,1-L-Flasche, es gibt keine runde))
- **Anhang 2:** `Fertige Etiquetten/Likör Schleiwen_Zeichenfläche 1.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/schleiwenlikoer-0-1l.png`
- **Status:** vorhanden
- **Prompt:** 250 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke 0,1-L-Flasche ohne Etikett (Ersatz, eine runde Basis dieser Größe gibt es nicht; Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen, Flasche eher rund als schlank halten); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: dunkles Violettrot, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,1 l“; sonst keine Änderung am Etikett. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/schleiwenlikoer-0-1l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Mengenangabe auf dem Etikett lautet „0,1 l“ (nicht „0,5 l“); ob das 0,5-L-Etikett diese Angabe als „0,5 l“ trägt, ist nicht geprüft (nicht verifiziert).
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: dunkles Violettrot (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Anhang 1 ist die schlanke 0,1-L-Flasche (Ersatz, es gibt keine runde 0,1-L-Basis); die Form kann von den runden Flaschen der Reihe abweichen.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 26. Vizlikör: Flasche 0,5 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/rund-0-5l.png` (leere runde 0,5-L-Flasche)
- **Anhang 2:** `Fertige Etiquetten/Likör Viz_Zeichenfläche 1.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/vizlikoer-0-5l.png`
- **Status:** vorhanden
- **Prompt:** 215 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: blasses Apfelgelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Mengenangabe wie in Anhang 2. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/vizlikoer-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: blasses Apfelgelb (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 27. Vizlikör: Flasche 0,1 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/schlank-0-1l.png` (leere runde 0,1-L-Flasche (Ersatz: schlanke 0,1-L-Flasche, es gibt keine runde))
- **Anhang 2:** `Fertige Etiquetten/Likör Viz_Zeichenfläche 1.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/vizlikoer-0-1l.png`
- **Status:** vorhanden
- **Prompt:** 250 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke 0,1-L-Flasche ohne Etikett (Ersatz, eine runde Basis dieser Größe gibt es nicht; Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen, Flasche eher rund als schlank halten); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: blasses Apfelgelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,1 l“; sonst keine Änderung am Etikett. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/vizlikoer-0-1l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Mengenangabe auf dem Etikett lautet „0,1 l“ (nicht „0,5 l“); ob das 0,5-L-Etikett diese Angabe als „0,5 l“ trägt, ist nicht geprüft (nicht verifiziert).
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: blasses Apfelgelb (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Anhang 1 ist die schlanke 0,1-L-Flasche (Ersatz, es gibt keine runde 0,1-L-Basis); die Form kann von den runden Flaschen der Reihe abweichen.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 28. Williamslikör: Flasche 0,5 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/rund-0-5l.png` (leere runde 0,5-L-Flasche)
- **Anhang 2:** `Fertige Etiquetten/Likör Williams_Zeichenfläche 1.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/williamslikoer-0-5l.png`
- **Status:** vorhanden
- **Prompt:** 215 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: helles Goldgelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Mengenangabe wie in Anhang 2. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/williamslikoer-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: helles Goldgelb (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 29. Williamslikör: Flasche 0,1 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/schlank-0-1l.png` (leere runde 0,1-L-Flasche (Ersatz: schlanke 0,1-L-Flasche, es gibt keine runde))
- **Anhang 2:** `Fertige Etiquetten/Likör Williams_Zeichenfläche 1.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/williamslikoer-0-1l.png`
- **Status:** vorhanden
- **Prompt:** 250 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke 0,1-L-Flasche ohne Etikett (Ersatz, eine runde Basis dieser Größe gibt es nicht; Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen, Flasche eher rund als schlank halten); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: helles Goldgelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,1 l“; sonst keine Änderung am Etikett. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/williamslikoer-0-1l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Mengenangabe auf dem Etikett lautet „0,1 l“ (nicht „0,5 l“); ob das 0,5-L-Etikett diese Angabe als „0,5 l“ trägt, ist nicht geprüft (nicht verifiziert).
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: helles Goldgelb (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Anhang 1 ist die schlanke 0,1-L-Flasche (Ersatz, es gibt keine runde 0,1-L-Basis); die Form kann von den runden Flaschen der Reihe abweichen.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 30. Winterdreams: Flasche 0,5 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/rund-0-5l.png` (leere runde 0,5-L-Flasche)
- **Anhang 2:** `Fertige Etiquetten/Likör Winter Dreams-01.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/winterdreams-0-5l.png`
- **Status:** vorhanden
- **Prompt:** 216 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: winterlich dunkles Rot, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Mengenangabe wie in Anhang 2. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/winterdreams-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: winterlich dunkles Rot (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Saisonal; Beschreibung nur „saisonaler Likör“, nichts weiter erfunden. Farbe winterlich dunkelrot.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 31. Ingwerlikör: Flasche 0,5 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/rund-0-5l.png` (leere runde 0,5-L-Flasche)
- **Anhang 2:** `PLATZHALTER: Etikett von Ingwerlikör folgt` (Etikett von Ingwerlikör (liegt noch nicht vor)) **(fehlt)**
- **Ergebnis speichern als:** `fotos-flaschen/ingwerlikoer-0-5l.png`
- **Status:** vorhanden
- **Prompt:** 227 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: helles Goldgelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2, es liegt noch nicht vor und wird mitgeschickt: Text nur Name „Ingwerlikör“, Art „Ingwerlikör“, „25 % vol.“, „0,5 l“, nichts erfinden. Es wird unverändert übernommen (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“) und legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, Glanz und Reflexe des Glases laufen über das Etikett. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/ingwerlikoer-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Anhang fehlt: PLATZHALTER: Etikett von Ingwerlikör folgt. Eintrag im ChatGPT-Stapel mit Status „Etikett fehlt“ markiert, nicht in der CSV der offenen Bilder.
- Etikett von Ingwerlikör liegt noch nicht vor (Anhang 2 ist ein Platzhalter): ohne Etikett nicht erzeugen, sonst erfindet ChatGPT den Text. Sobald es da ist, in tools/neue-gruppen.json bei etikettDatei eintragen.
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: helles Goldgelb (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 32. Ingwerlikör: Flasche 0,2 L (Liköre)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/rund-0-2l.png` (leere runde 0,2-L-Flasche)
- **Anhang 2:** `PLATZHALTER: Etikett von Ingwerlikör folgt` (Etikett von Ingwerlikör (liegt noch nicht vor)) **(fehlt)**
- **Ergebnis speichern als:** `fotos-flaschen/ingwerlikoer-0-2l.png`
- **Status:** vorhanden
- **Prompt:** 227 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde 0,2-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: helles Goldgelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2, es liegt noch nicht vor und wird mitgeschickt: Text nur Name „Ingwerlikör“, Art „Ingwerlikör“, „25 % vol.“, „0,2 l“, nichts erfinden. Es wird unverändert übernommen (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“) und legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, Glanz und Reflexe des Glases laufen über das Etikett. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/ingwerlikoer-0-2l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Anhang fehlt: PLATZHALTER: Etikett von Ingwerlikör folgt. Eintrag im ChatGPT-Stapel mit Status „Etikett fehlt“ markiert, nicht in der CSV der offenen Bilder.
- Etikett von Ingwerlikör liegt noch nicht vor (Anhang 2 ist ein Platzhalter): ohne Etikett nicht erzeugen, sonst erfindet ChatGPT den Text. Sobald es da ist, in tools/neue-gruppen.json bei etikettDatei eintragen.
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: helles Goldgelb (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- fotos-basis/rund-0-2l.png ist dasselbe Bild wie rund-0-5l.png: Größe nur über die Beschreibung (nicht verifiziert).
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 33. Willi op Biren geräift: Flasche 0,5 L (Geräift)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/schlank-0-5l.png` (leere schlanke 0,5-L-Flasche)
- **Anhang 2:** `PLATZHALTER: Etikett von Willi op Biren geräift folgt` (Etikett von Willi op Biren geräift (liegt noch nicht vor)) **(fehlt)**
- **Ergebnis speichern als:** `fotos-flaschen/willi-op-biren-geraeift-0-5l.png`
- **Status:** vorhanden
- **Prompt:** 241 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: klar wie Wasser, darin einige ganze kleine Williams-Birnen, sonst nichts in der Flasche, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2, es liegt noch nicht vor und wird mitgeschickt: Text nur Name „Willi op Biren geräift“, Art „Branntwein“, „35 % vol.“, „0,5 l“, nichts erfinden. Es wird unverändert übernommen (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“) und legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, Glanz und Reflexe des Glases laufen über das Etikett. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/willi-op-biren-geraeift-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Anhang fehlt: PLATZHALTER: Etikett von Willi op Biren geräift folgt. Eintrag im ChatGPT-Stapel mit Status „Etikett fehlt“ markiert, nicht in der CSV der offenen Bilder.
- Etikett von Willi op Biren geräift liegt noch nicht vor (Anhang 2 ist ein Platzhalter): ohne Etikett nicht erzeugen, sonst erfindet ChatGPT den Text. Sobald es da ist, in tools/neue-gruppen.json bei etikettDatei eintragen.
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: klar wie Wasser, darin einige ganze kleine Williams-Birnen, sonst nichts in der Flasche (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- OFFENE FRAGE: Sind ganze Früchte in der Flasche sichtbar? Der Prompt verlangt einige ganze Früchte in der Flüssigkeit, sonst nichts; der Brenner bestätigt.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 34. Willi op Biren geräift: Flasche 0,1 L (Geräift)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/schlank-0-1l.png` (leere schlanke 0,1-L-Flasche)
- **Anhang 2:** `PLATZHALTER: Etikett von Willi op Biren geräift folgt` (Etikett von Willi op Biren geräift (liegt noch nicht vor)) **(fehlt)**
- **Ergebnis speichern als:** `fotos-flaschen/willi-op-biren-geraeift-0-1l.png`
- **Status:** vorhanden
- **Prompt:** 241 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke 0,1-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: klar wie Wasser, darin einige ganze kleine Williams-Birnen, sonst nichts in der Flasche, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2, es liegt noch nicht vor und wird mitgeschickt: Text nur Name „Willi op Biren geräift“, Art „Branntwein“, „35 % vol.“, „0,1 l“, nichts erfinden. Es wird unverändert übernommen (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“) und legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, Glanz und Reflexe des Glases laufen über das Etikett. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/willi-op-biren-geraeift-0-1l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Anhang fehlt: PLATZHALTER: Etikett von Willi op Biren geräift folgt. Eintrag im ChatGPT-Stapel mit Status „Etikett fehlt“ markiert, nicht in der CSV der offenen Bilder.
- Etikett von Willi op Biren geräift liegt noch nicht vor (Anhang 2 ist ein Platzhalter): ohne Etikett nicht erzeugen, sonst erfindet ChatGPT den Text. Sobald es da ist, in tools/neue-gruppen.json bei etikettDatei eintragen.
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: klar wie Wasser, darin einige ganze kleine Williams-Birnen, sonst nichts in der Flasche (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- OFFENE FRAGE: Sind ganze Früchte in der Flasche sichtbar? Der Prompt verlangt einige ganze Früchte in der Flüssigkeit, sonst nichts; der Brenner bestätigt.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 35. Mirabelle op Mirabellen geräift: Flasche 0,5 L (Geräift)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/schlank-0-5l.png` (leere schlanke 0,5-L-Flasche)
- **Anhang 2:** `Fertige Etiquetten/Brandwein Mirabelle geräift-01.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/mirabelle-op-mirabellen-geraeift-0-5l.png`
- **Status:** vorhanden
- **Prompt:** 225 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: klar wie Wasser, darin einige ganze Mirabellen, sonst nichts in der Flasche, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Mengenangabe wie in Anhang 2. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/mirabelle-op-mirabellen-geraeift-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: klar wie Wasser, darin einige ganze Mirabellen, sonst nichts in der Flasche (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- OFFENE FRAGE: Sind ganze Früchte in der Flasche sichtbar? Der Prompt verlangt einige ganze Früchte in der Flüssigkeit, sonst nichts; der Brenner bestätigt.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 36. Mirabelle op Mirabellen geräift: Flasche 0,1 L (Geräift)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/schlank-0-1l.png` (leere schlanke 0,1-L-Flasche)
- **Anhang 2:** `Fertige Etiquetten/Brandwein Mirabelle geräift-01.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/mirabelle-op-mirabellen-geraeift-0-1l.png`
- **Status:** vorhanden
- **Prompt:** 245 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke 0,1-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: klar wie Wasser, darin einige ganze Mirabellen, sonst nichts in der Flasche, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,1 l“; sonst keine Änderung am Etikett. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/mirabelle-op-mirabellen-geraeift-0-1l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Mengenangabe auf dem Etikett lautet „0,1 l“ (nicht „0,5 l“); ob das 0,5-L-Etikett diese Angabe als „0,5 l“ trägt, ist nicht geprüft (nicht verifiziert).
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: klar wie Wasser, darin einige ganze Mirabellen, sonst nichts in der Flasche (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- OFFENE FRAGE: Sind ganze Früchte in der Flasche sichtbar? Der Prompt verlangt einige ganze Früchte in der Flüssigkeit, sonst nichts; der Brenner bestätigt.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 37. Quetsch op Quetsch geräift: Flasche 0,5 L (Geräift)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/schlank-0-5l.png` (leere schlanke 0,5-L-Flasche)
- **Anhang 2:** `Fertige Etiquetten/Brandwein Quetsch geräift-01.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/quetsch-op-quetsch-geraeift-0-5l.png`
- **Status:** vorhanden
- **Prompt:** 225 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: klar wie Wasser, darin einige ganze Zwetschgen, sonst nichts in der Flasche, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Mengenangabe wie in Anhang 2. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/quetsch-op-quetsch-geraeift-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: klar wie Wasser, darin einige ganze Zwetschgen, sonst nichts in der Flasche (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- OFFENE FRAGE: Sind ganze Früchte in der Flasche sichtbar? Der Prompt verlangt einige ganze Früchte in der Flüssigkeit, sonst nichts; der Brenner bestätigt.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 38. Quetsch op Quetsch geräift: Flasche 0,1 L (Geräift)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/schlank-0-1l.png` (leere schlanke 0,1-L-Flasche)
- **Anhang 2:** `Fertige Etiquetten/Brandwein Quetsch geräift-01.png` (flaches Etikett aus Fertige Etiquetten/)
- **Ergebnis speichern als:** `fotos-flaschen/quetsch-op-quetsch-geraeift-0-1l.png`
- **Status:** vorhanden
- **Prompt:** 245 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere schlanke 0,1-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: klar wie Wasser, darin einige ganze Zwetschgen, sonst nichts in der Flasche, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „0,1 l“; sonst keine Änderung am Etikett. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/quetsch-op-quetsch-geraeift-0-1l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.
- Mengenangabe auf dem Etikett lautet „0,1 l“ (nicht „0,5 l“); ob das 0,5-L-Etikett diese Angabe als „0,5 l“ trägt, ist nicht geprüft (nicht verifiziert).
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: klar wie Wasser, darin einige ganze Zwetschgen, sonst nichts in der Flasche (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- OFFENE FRAGE: Sind ganze Früchte in der Flasche sichtbar? Der Prompt verlangt einige ganze Früchte in der Flüssigkeit, sonst nichts; der Brenner bestätigt.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 39. Neutraler Alkohol: Flasche 1 L (Weitere Brände)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/rund-1-0l.png` (leere runde 1-L-Flasche)
- **Anhang 2:** `PLATZHALTER: Etikett von Neutraler Alkohol folgt` (Etikett von Neutraler Alkohol (liegt noch nicht vor)) **(fehlt)**
- **Ergebnis speichern als:** `fotos-flaschen/neutral-alkohol-1-0l.png`
- **Status:** vorhanden
- **Prompt:** 227 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde 1-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2, es liegt noch nicht vor und wird mitgeschickt: Text nur Name „Neutraler Alkohol“, „40 % vol.“, „1 l“, nichts erfinden. Es wird unverändert übernommen (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“) und legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, Glanz und Reflexe des Glases laufen über das Etikett. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/neutral-alkohol-1-0l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Anhang fehlt: PLATZHALTER: Etikett von Neutraler Alkohol folgt. Eintrag im ChatGPT-Stapel mit Status „Etikett fehlt“ markiert, nicht in der CSV der offenen Bilder.
- Etikett von Neutraler Alkohol liegt noch nicht vor (Anhang 2 ist ein Platzhalter): ohne Etikett nicht erzeugen, sonst erfindet ChatGPT den Text. Sobald es da ist, in tools/neue-gruppen.json bei etikettDatei eintragen.
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: klar wie Wasser (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Status der Sorte unklar (Preisliste/Alkohol laut Auftrag, aber keine Bestätigung, ob die Sorte geführt wird); Flüssigkeitsfarbe geschätzt.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 40. Äppel/Pommes: Flasche 0,5 L (Weitere Brände)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/rund-0-5l.png` (leere runde 0,5-L-Flasche)
- **Anhang 2:** `PLATZHALTER: Etikett von Äppel/Pommes folgt` (Etikett von Äppel/Pommes (liegt noch nicht vor)) **(fehlt)**
- **Ergebnis speichern als:** `fotos-flaschen/aeppel-pommes-0-5l.png`
- **Status:** vorhanden
- **Prompt:** 225 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: klares Goldgelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2, es liegt noch nicht vor und wird mitgeschickt: Text nur Name „Äppel/Pommes“, „45 % vol.“, „0,5 l“, nichts erfinden. Es wird unverändert übernommen (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“) und legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, Glanz und Reflexe des Glases laufen über das Etikett. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/aeppel-pommes-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Anhang fehlt: PLATZHALTER: Etikett von Äppel/Pommes folgt. Eintrag im ChatGPT-Stapel mit Status „Etikett fehlt“ markiert, nicht in der CSV der offenen Bilder.
- Etikett von Äppel/Pommes liegt noch nicht vor (Anhang 2 ist ein Platzhalter): ohne Etikett nicht erzeugen, sonst erfindet ChatGPT den Text. Sobald es da ist, in tools/neue-gruppen.json bei etikettDatei eintragen.
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: klares Goldgelb (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Status der Sorte unklar (Preisliste/Alkohol laut Auftrag, aber keine Bestätigung, ob die Sorte geführt wird); Flüssigkeitsfarbe geschätzt.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 41. Äppel/Pommes: Flasche 1 L (Weitere Brände)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/rund-1-0l.png` (leere runde 1-L-Flasche)
- **Anhang 2:** `PLATZHALTER: Etikett von Äppel/Pommes folgt` (Etikett von Äppel/Pommes (liegt noch nicht vor)) **(fehlt)**
- **Ergebnis speichern als:** `fotos-flaschen/aeppel-pommes-1-0l.png`
- **Status:** offen
- **Prompt:** 225 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde 1-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: klares Goldgelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2, es liegt noch nicht vor und wird mitgeschickt: Text nur Name „Äppel/Pommes“, „45 % vol.“, „1 l“, nichts erfinden. Es wird unverändert übernommen (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“) und legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, Glanz und Reflexe des Glases laufen über das Etikett. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/aeppel-pommes-1-0l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Anhang fehlt: PLATZHALTER: Etikett von Äppel/Pommes folgt. Eintrag im ChatGPT-Stapel mit Status „Etikett fehlt“ markiert, nicht in der CSV der offenen Bilder.
- Etikett von Äppel/Pommes liegt noch nicht vor (Anhang 2 ist ein Platzhalter): ohne Etikett nicht erzeugen, sonst erfindet ChatGPT den Text. Sobald es da ist, in tools/neue-gruppen.json bei etikettDatei eintragen.
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: klares Goldgelb (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Status der Sorte unklar (Preisliste/Alkohol laut Auftrag, aber keine Bestätigung, ob die Sorte geführt wird); Flüssigkeitsfarbe geschätzt.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 42. Pastis: Flasche 0,5 L (Weitere Brände)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/rund-0-5l.png` (leere runde 0,5-L-Flasche)
- **Anhang 2:** `PLATZHALTER: Etikett von Pastis folgt` (Etikett von Pastis (liegt noch nicht vor)) **(fehlt)**
- **Ergebnis speichern als:** `fotos-flaschen/pastis-0-5l.png`
- **Status:** vorhanden
- **Prompt:** 226 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: mattes, helles Gelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2, es liegt noch nicht vor und wird mitgeschickt: Text nur Name „Pastis“, „40 % vol.“, „0,5 l“, nichts erfinden. Es wird unverändert übernommen (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“) und legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, Glanz und Reflexe des Glases laufen über das Etikett. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/pastis-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Anhang fehlt: PLATZHALTER: Etikett von Pastis folgt. Eintrag im ChatGPT-Stapel mit Status „Etikett fehlt“ markiert, nicht in der CSV der offenen Bilder.
- Etikett von Pastis liegt noch nicht vor (Anhang 2 ist ein Platzhalter): ohne Etikett nicht erzeugen, sonst erfindet ChatGPT den Text. Sobald es da ist, in tools/neue-gruppen.json bei etikettDatei eintragen.
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: mattes, helles Gelb (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Status der Sorte unklar (Preisliste/Alkohol laut Auftrag, aber keine Bestätigung, ob die Sorte geführt wird); Flüssigkeitsfarbe geschätzt.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 43. Nëssdrëpp Walnuss: Flasche 0,5 L (Weitere Brände)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/rund-0-5l.png` (leere runde 0,5-L-Flasche)
- **Anhang 2:** `PLATZHALTER: Etikett von Nëssdrëpp Walnuss folgt` (Etikett von Nëssdrëpp Walnuss (liegt noch nicht vor)) **(fehlt)**
- **Ergebnis speichern als:** `fotos-flaschen/nessdrepp-0-5l.png`
- **Status:** vorhanden
- **Prompt:** 226 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: helles Goldbraun, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2, es liegt noch nicht vor und wird mitgeschickt: Text nur Name „Nëssdrëpp Walnuss“, „45 % vol.“, „0,5 l“, nichts erfinden. Es wird unverändert übernommen (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“) und legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, Glanz und Reflexe des Glases laufen über das Etikett. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/nessdrepp-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Anhang fehlt: PLATZHALTER: Etikett von Nëssdrëpp Walnuss folgt. Eintrag im ChatGPT-Stapel mit Status „Etikett fehlt“ markiert, nicht in der CSV der offenen Bilder.
- Etikett von Nëssdrëpp Walnuss liegt noch nicht vor (Anhang 2 ist ein Platzhalter): ohne Etikett nicht erzeugen, sonst erfindet ChatGPT den Text. Sobald es da ist, in tools/neue-gruppen.json bei etikettDatei eintragen.
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: helles Goldbraun (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Status der Sorte unklar (Preisliste/Alkohol laut Auftrag, aber keine Bestätigung, ob die Sorte geführt wird); Flüssigkeitsfarbe geschätzt.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 44. Pefferminz: Flasche 0,5 L (Weitere Brände)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/rund-0-5l.png` (leere runde 0,5-L-Flasche)
- **Anhang 2:** `PLATZHALTER: Etikett von Pefferminz folgt` (Etikett von Pefferminz (liegt noch nicht vor)) **(fehlt)**
- **Ergebnis speichern als:** `fotos-flaschen/pefferminz-0-5l.png`
- **Status:** vorhanden
- **Prompt:** 226 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2, es liegt noch nicht vor und wird mitgeschickt: Text nur Name „Pefferminz“, „45 % vol.“, „0,5 l“, nichts erfinden. Es wird unverändert übernommen (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“) und legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, Glanz und Reflexe des Glases laufen über das Etikett. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/pefferminz-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Anhang fehlt: PLATZHALTER: Etikett von Pefferminz folgt. Eintrag im ChatGPT-Stapel mit Status „Etikett fehlt“ markiert, nicht in der CSV der offenen Bilder.
- Etikett von Pefferminz liegt noch nicht vor (Anhang 2 ist ein Platzhalter): ohne Etikett nicht erzeugen, sonst erfindet ChatGPT den Text. Sobald es da ist, in tools/neue-gruppen.json bei etikettDatei eintragen.
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: klar wie Wasser (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Status der Sorte unklar (Preisliste/Alkohol laut Auftrag, aber keine Bestätigung, ob die Sorte geführt wird); Flüssigkeitsfarbe geschätzt.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 45. Quitten: Flasche 0,5 L (Weitere Brände)

- **Format:** Hochformat 1024 × 1536 Pixel
- **Anhang 1:** `fotos-basis/rund-0-5l.png` (leere runde 0,5-L-Flasche)
- **Anhang 2:** `PLATZHALTER: Etikett von Quitten folgt` (Etikett von Quitten (liegt noch nicht vor)) **(fehlt)**
- **Ergebnis speichern als:** `fotos-flaschen/quitten-0-5l.png`
- **Status:** vorhanden
- **Prompt:** 225 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form und Proportionen orientieren sich an Anhang 1 (leere runde 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas. Inhalt: klares Goldgelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2, es liegt noch nicht vor und wird mitgeschickt: Text nur Name „Quitten“, „45 % vol.“, „0,5 l“, nichts erfinden. Es wird unverändert übernommen (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“) und legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, Glanz und Reflexe des Glases laufen über das Etikett. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/quitten-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
```

**Prüfen:**
- Anhang fehlt: PLATZHALTER: Etikett von Quitten folgt. Eintrag im ChatGPT-Stapel mit Status „Etikett fehlt“ markiert, nicht in der CSV der offenen Bilder.
- Etikett von Quitten liegt noch nicht vor (Anhang 2 ist ein Platzhalter): ohne Etikett nicht erzeugen, sonst erfindet ChatGPT den Text. Sobald es da ist, in tools/neue-gruppen.json bei etikettDatei eintragen.
- Adresszeile prüfen: „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“.
- Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.
- Format Hochformat 1024 × 1536 Pixel; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.
- Inhalt: klares Goldgelb (Farbe ist ein Entwurf, der Brenner bestätigt sie).
- Status der Sorte unklar (Preisliste/Alkohol laut Auftrag, aber keine Bestätigung, ob die Sorte geführt wird); Flüssigkeitsfarbe geschätzt.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 46. Holzkiste 6 × 0,1 l: Kiste (Holzkisten (nur mit Flaschen))

- **Format:** Querformat 4:3 (1448 × 1086 Pixel)
- **Anhang 1:** `fotos-basis/schlank-0-1l.png` (schlanke 0,1-L-Flasche ohne Etikett (Basisflasche, nur Form))
- **Anhang 2:** `fotos-basis/schlank-0-1l.png` (dasselbe Bild wie Anhang 1 (die Kiste wird nur im Prompt beschrieben, es gibt kein Kistenfoto))
- **Ergebnis speichern als:** `fotos-flaschen/holzkiste-6x0-1l.png`
- **Status:** vorhanden
- **Prompt:** 179 Wörter

```
Erzeuge ein fotorealistisches Produktfoto im Querformat 4:3 (1448 × 1086 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), leicht von oben. Eine offene Holzkiste aus hellem, unbehandeltem Holz steht mittig, ganz im Bild, Luft ringsum. Sie enthält genau 6 Flaschen (schlanke 0,1-L-Flasche), jede in einem eigenen Fach aus Holzstegen auf Holzwolle, alle aufrecht, Hals und Verschluss vollständig sichtbar. Der Deckel ist abgenommen und lehnt offen neben der Kiste. Form der Flaschen wie Anhang 1 (schlanke 0,1-L-Flasche ohne Etikett; Anhang 2 ist dasselbe Bild); nur Form und Proportionen, nicht kopieren. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Inhalt der Flaschen: Likör und Branntwein, verschiedene Sorten; die Flüssigkeiten dürfen sich in der Farbe unterscheiden. Etiketten: schlichte, leere Etiketten ohne lesbaren Text, in verschiedenen Farben für verschiedene Sorten; keine Schrift, kein Name, keine Zahlen. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur diese Kiste mit genau 6 Flaschen, keine weiteren Gegenstände, kein Text auf der Kiste, kein Logo, kein Wasserzeichen. Ergebnis als PNG „fotos-flaschen/holzkiste-6x0-1l.png“.
```

**Prüfen:**
- Genau 6 Flaschen in der Kiste zählen; Kiste ganz im Bild, Deckel offen daneben.
- Nur Flaschen in der Kiste, keine anderen Gegenstände; Verschluss Glasstopfen ohne Kork (auch bei den Apothekerflaschen).
- Etiketten leer bzw. ohne lesbaren Text: keine erfundenen Namen oder Zahlen auf den Etiketten. Kiste ohne Beschriftung.
- Format Querformat 1448 × 1086; die Datei heißt fotos-flaschen/holzkiste-6x0-1l.png (Größe steckt im Kisten-Namen; fotos_uebernehmen.mjs kennt diese Namen).
- Holzart und Fachaufteilung sind Annahmen (heller Holzton, Holzstege, Holzwolle); der Brenner bestätigt, wie die echte Kiste aussieht.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 47. Holzkiste 3 × 0,1 l: Kiste (Holzkisten (nur mit Flaschen))

- **Format:** Querformat 4:3 (1448 × 1086 Pixel)
- **Anhang 1:** `fotos-basis/schlank-0-1l.png` (schlanke 0,1-L-Flasche ohne Etikett (Basisflasche, nur Form))
- **Anhang 2:** `fotos-basis/schlank-0-1l.png` (dasselbe Bild wie Anhang 1 (die Kiste wird nur im Prompt beschrieben, es gibt kein Kistenfoto))
- **Ergebnis speichern als:** `fotos-flaschen/holzkiste-3x0-1l.png`
- **Status:** vorhanden
- **Prompt:** 179 Wörter

```
Erzeuge ein fotorealistisches Produktfoto im Querformat 4:3 (1448 × 1086 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), leicht von oben. Eine offene Holzkiste aus hellem, unbehandeltem Holz steht mittig, ganz im Bild, Luft ringsum. Sie enthält genau 3 Flaschen (schlanke 0,1-L-Flasche), jede in einem eigenen Fach aus Holzstegen auf Holzwolle, alle aufrecht, Hals und Verschluss vollständig sichtbar. Der Deckel ist abgenommen und lehnt offen neben der Kiste. Form der Flaschen wie Anhang 1 (schlanke 0,1-L-Flasche ohne Etikett; Anhang 2 ist dasselbe Bild); nur Form und Proportionen, nicht kopieren. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Inhalt der Flaschen: Likör und Branntwein, verschiedene Sorten; die Flüssigkeiten dürfen sich in der Farbe unterscheiden. Etiketten: schlichte, leere Etiketten ohne lesbaren Text, in verschiedenen Farben für verschiedene Sorten; keine Schrift, kein Name, keine Zahlen. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur diese Kiste mit genau 3 Flaschen, keine weiteren Gegenstände, kein Text auf der Kiste, kein Logo, kein Wasserzeichen. Ergebnis als PNG „fotos-flaschen/holzkiste-3x0-1l.png“.
```

**Prüfen:**
- Genau 3 Flaschen in der Kiste zählen; Kiste ganz im Bild, Deckel offen daneben.
- Nur Flaschen in der Kiste, keine anderen Gegenstände; Verschluss Glasstopfen ohne Kork (auch bei den Apothekerflaschen).
- Etiketten leer bzw. ohne lesbaren Text: keine erfundenen Namen oder Zahlen auf den Etiketten. Kiste ohne Beschriftung.
- Format Querformat 1448 × 1086; die Datei heißt fotos-flaschen/holzkiste-3x0-1l.png (Größe steckt im Kisten-Namen; fotos_uebernehmen.mjs kennt diese Namen).
- Holzart und Fachaufteilung sind Annahmen (heller Holzton, Holzstege, Holzwolle); der Brenner bestätigt, wie die echte Kiste aussieht.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 48. Holzkiste 4 × 0,2 l: Kiste (Holzkisten (nur mit Flaschen))

- **Format:** Querformat 4:3 (1448 × 1086 Pixel)
- **Anhang 1:** `fotos-basis/rund-0-2l.png` (runde 0,2-L-Flasche ohne Etikett (Basisflasche, nur Form))
- **Anhang 2:** `fotos-basis/rund-0-2l.png` (dasselbe Bild wie Anhang 1 (die Kiste wird nur im Prompt beschrieben, es gibt kein Kistenfoto))
- **Ergebnis speichern als:** `fotos-flaschen/holzkiste-4x0-2l.png`
- **Status:** vorhanden
- **Prompt:** 182 Wörter

```
Erzeuge ein fotorealistisches Produktfoto im Querformat 4:3 (1448 × 1086 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), leicht von oben. Eine offene Holzkiste aus hellem, unbehandeltem Holz steht mittig, ganz im Bild, Luft ringsum. Sie enthält genau 4 Flaschen (runde 0,2-L-Flasche), jede in einem eigenen Fach aus Holzstegen auf Holzwolle, alle aufrecht, Hals und Verschluss vollständig sichtbar. Der Deckel ist abgenommen und lehnt offen neben der Kiste. Form der Flaschen wie Anhang 1 (runde 0,2-L-Flasche ohne Etikett; Anhang 2 ist dasselbe Bild); nur Form und Proportionen, nicht kopieren. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Inhalt der Flaschen: verschiedene Sorten (Gin, Rum, Whisky, Sambuca, Wodka, Limoncello); die Flüssigkeiten dürfen sich in der Farbe unterscheiden. Etiketten: schlichte, leere Etiketten ohne lesbaren Text, in verschiedenen Farben für verschiedene Sorten; keine Schrift, kein Name, keine Zahlen. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur diese Kiste mit genau 4 Flaschen, keine weiteren Gegenstände, kein Text auf der Kiste, kein Logo, kein Wasserzeichen. Ergebnis als PNG „fotos-flaschen/holzkiste-4x0-2l.png“.
```

**Prüfen:**
- Genau 4 Flaschen in der Kiste zählen; Kiste ganz im Bild, Deckel offen daneben.
- Nur Flaschen in der Kiste, keine anderen Gegenstände; Verschluss Glasstopfen ohne Kork (auch bei den Apothekerflaschen).
- Etiketten leer bzw. ohne lesbaren Text: keine erfundenen Namen oder Zahlen auf den Etiketten. Kiste ohne Beschriftung.
- Format Querformat 1448 × 1086; die Datei heißt fotos-flaschen/holzkiste-4x0-2l.png (Größe steckt im Kisten-Namen; fotos_uebernehmen.mjs kennt diese Namen).
- Holzart und Fachaufteilung sind Annahmen (heller Holzton, Holzstege, Holzwolle); der Brenner bestätigt, wie die echte Kiste aussieht.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

---

## 49. Holzkiste 5 Apothekerflaschen 0,1 l: Kiste (Holzkisten (nur mit Flaschen))

- **Format:** Querformat 4:3 (1448 × 1086 Pixel)
- **Anhang 1:** `fotos-basis/apotheker-0-1l.png` (Apothekerflasche 0,1 l ohne Etikett (Basisflasche, nur Form))
- **Anhang 2:** `fotos-basis/apotheker-0-1l.png` (dasselbe Bild wie Anhang 1 (die Kiste wird nur im Prompt beschrieben, es gibt kein Kistenfoto))
- **Ergebnis speichern als:** `fotos-flaschen/holzkiste-5x-apotheker-0-1l.png`
- **Status:** vorhanden
- **Prompt:** 178 Wörter

```
Erzeuge ein fotorealistisches Produktfoto im Querformat 4:3 (1448 × 1086 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), leicht von oben. Eine offene Holzkiste aus hellem, unbehandeltem Holz steht mittig, ganz im Bild, Luft ringsum. Sie enthält genau 5 Flaschen (Apothekerflasche 0,1 l), jede in einem eigenen Fach aus Holzstegen auf Holzwolle, alle aufrecht, Hals und Verschluss vollständig sichtbar. Der Deckel ist abgenommen und lehnt offen neben der Kiste. Form der Flaschen wie Anhang 1 (Apothekerflasche 0,1 l ohne Etikett; Anhang 2 ist dasselbe Bild); nur Form und Proportionen, nicht kopieren. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Inhalt der Flaschen: verschiedene Sorten; die Flüssigkeiten dürfen sich in der Farbe unterscheiden. Etiketten: schlichte, leere Etiketten ohne lesbaren Text, in verschiedenen Farben für verschiedene Sorten; keine Schrift, kein Name, keine Zahlen. Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen. Nur diese Kiste mit genau 5 Flaschen, keine weiteren Gegenstände, kein Text auf der Kiste, kein Logo, kein Wasserzeichen. Ergebnis als PNG „fotos-flaschen/holzkiste-5x-apotheker-0-1l.png“.
```

**Prüfen:**
- Genau 5 Flaschen in der Kiste zählen; Kiste ganz im Bild, Deckel offen daneben.
- Nur Flaschen in der Kiste, keine anderen Gegenstände; Verschluss Glasstopfen ohne Kork (auch bei den Apothekerflaschen).
- Etiketten leer bzw. ohne lesbaren Text: keine erfundenen Namen oder Zahlen auf den Etiketten. Kiste ohne Beschriftung.
- Format Querformat 1448 × 1086; die Datei heißt fotos-flaschen/holzkiste-5x-apotheker-0-1l.png (Größe steckt im Kisten-Namen; fotos_uebernehmen.mjs kennt diese Namen).
- Holzart und Fachaufteilung sind Annahmen (heller Holzton, Holzstege, Holzwolle); der Brenner bestätigt, wie die echte Kiste aussieht.
- Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.

