# PROMPTS-FLASCHEN: neue Produktflasche mit aktuellem Etikett (ChatGPT)

Erzeugt mit `node tools/foto_prompts_flaschen.mjs`. Nicht von Hand ändern. 29 Prompts, je Sorte einer. **ChatGPT erzeugt eine NEUE, saubere Produktflasche** (Hochformat 1024 × 1536 Pixel, heller neutraler Studiogrund) mit dem aktuellen Etikett; kein Foto wird bearbeitet. Anhang 1 = Formvorlage, nur Orientierung für Form, Verschluss, Proportionen und Foto-Look (nicht kopieren, nicht deren Etikett): bei den schlanken Sorten die leere Basisflasche `fotos-basis/schlank-0-5l.png`, bei den runden Sorten die leere runde Basisflasche `fotos-basis/rund-0-5l.png`, bei Vieux Marc die leere Karaffe `fotos-basis/karaffe-0-7l.png`, bei Vizdrëpp die Vorlage `fotos/vorlage-vizdrepp.png`. Anhang 2 = aktuelles flaches Etikett aus `Fertige Etiquetten/`. Die Flüssigkeitsfarbe steht im Prompt in Worten (gemessen in `site/data/fluessigkeit.js`).

Die Ergebnisse gehören als PNG unter dem Namen aus der Tabelle (Name immer mit Größe: `<sorten-id>-0-5l.png`) in den Ordner `fotos-flaschen/` im Repo (den legt der Nutzer an; das Skript legt ihn nicht an). Danach zeigen Sortenseite und Karte in „Die Theke“ dieses Bild statt der Vektor-Flasche (`node build.mjs`); fehlt die Datei, bleibt die Vektor-Flasche. **Alle 29 Sorten bekommen einen Lauf**; die Fotos in `Fotos/` und `fotos-basis/` werden nicht auf der Seite gezeigt. Ob das Etikett auf einem Foto dem aktuellen entspricht, steht nur zur Information in `FOTO-INVENTAR.md` (Abschnitt 9) und steuert nichts.

**Einheitlichkeit:** Jeder Prompt enthält denselben festen Baustein (Format, heller Grund, Licht von links, Flasche mittig, Standfläche bei etwa 90 % der Bildhöhe, Verschlussoberkante bei etwa 8 %), damit Karten nebeneinander ruhig wirken. Das kann ChatGPT nur annähernd einhalten; abweichende Bilder besser neu erzeugen als auf der Seite zurechtrücken.

**Stand:** 28 offen, 1 vorhanden (`<id>-0-5l.png` in `fotos-flaschen/`).

Automatisch abarbeiten: `CHATGPT-STAPEL.md` (Gruppe `flasche`, Ausgabe Hochformat).

## So geht es

1. Neuen Chat öffnen (ChatGPT mit Bildgenerierung), pro Sorte ein neuer Chat.
2. Beide Anhänge hochladen (Pfade siehe Tabelle) und den Prompt aus dem Kasten einfügen.
3. Ergebnis mit der Prüfliste unter dem Kasten prüfen. Bei einer Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern.
4. Als PNG unter dem Namen aus der Spalte „Zieldatei“ in `fotos-flaschen/` speichern.

## Übersicht

| Sorte | Anhang 1 (nur Orientierung) | Anhang 2 (Etikett) | Zieldatei | Problem der Vorlage |
|---|---|---|---|---|
| Hierber Gin | `fotos-basis/rund-0-5l.png` | `Fertige Etiquetten/Branntwein Hierber Gin - Nei 1-01.png` | `fotos-flaschen/gin-0-5l.png` | Basisfoto fotos-basis/rund-0-5l.png zeigt einen anderen Verschluss; der Glasstopfen aus der Verschluss-Zeile hat Vorrang, Halsband nur über die Beschreibung |
| Hierber Wodka | `fotos-basis/rund-0-5l.png` | `Fertige Etiquetten/Branntwein Wodka-01.png` | `fotos-flaschen/wodka-0-5l.png` | Basisfoto fotos-basis/rund-0-5l.png zeigt einen anderen Verschluss; der Glasstopfen aus der Verschluss-Zeile hat Vorrang, Halsband nur über die Beschreibung |
| Hierber Rum | `fotos-basis/rund-0-5l.png` | `Fertige Etiquetten/Branntwein Hierber Rum nei-01.png` | `fotos-flaschen/rum-0-5l.png` | Basisfoto fotos-basis/rund-0-5l.png zeigt einen anderen Verschluss; der Glasstopfen aus der Verschluss-Zeile hat Vorrang, Halsband nur über die Beschreibung |
| Hierber Rum Orange | `fotos-basis/rund-0-5l.png` | `Fertige Etiquetten/Branntwein Hierber Rum orange nei-01.png` | `fotos-flaschen/rum-orange-0-5l.png` | Basisfoto fotos-basis/rund-0-5l.png zeigt einen anderen Verschluss; der Glasstopfen aus der Verschluss-Zeile hat Vorrang, Halsband nur über die Beschreibung |
| Hierber Whisky | `fotos-basis/rund-0-5l.png` | `Fertige Etiquetten/Branntwein Whisky 0,5L nei 4-01.png` | `fotos-flaschen/whisky-0-5l.png` | Basisfoto fotos-basis/rund-0-5l.png zeigt einen anderen Verschluss; der Glasstopfen aus der Verschluss-Zeile hat Vorrang, Halsband nur über die Beschreibung |
| Kirsch | `fotos-basis/schlank-0-5l.png` | `Fertige Etiquetten/Brandwein Kirsch-01.png` | `fotos-flaschen/kirsch-0-5l.png` | Anhang 1 ist die leere schlanke Basisflasche fotos-basis/schlank-0-5l.png, kein Foto der Sorte; Verschluss und Flüssigkeit nur über die Beschreibung |
| Framboise | `fotos-basis/schlank-0-5l.png` | `Fertige Etiquetten/Brandwein Framboise-01.png` | `fotos-flaschen/framboise-0-5l.png` | Anhang 1 ist die leere schlanke Basisflasche fotos-basis/schlank-0-5l.png, kein Foto der Sorte; Verschluss und Flüssigkeit nur über die Beschreibung |
| Quetsch | `fotos-basis/schlank-0-5l.png` | `Fertige Etiquetten/Brandwein Quetsch-01.png` | `fotos-flaschen/quetsch-0-5l.png` | Anhang 1 ist die leere schlanke Basisflasche fotos-basis/schlank-0-5l.png, kein Foto der Sorte; Verschluss und Flüssigkeit nur über die Beschreibung |
| Poire Williams | `fotos-basis/schlank-0-5l.png` | `Fertige Etiquetten/Brandwein Williams-01.png` | `fotos-flaschen/poire-williams-0-5l.png` | Anhang 1 ist die leere schlanke Basisflasche fotos-basis/schlank-0-5l.png, kein Foto der Sorte; Verschluss und Flüssigkeit nur über die Beschreibung |
| Mirabelle | `fotos-basis/schlank-0-5l.png` | `Fertige Etiquetten/Brandwein Mirabelle-01.png` | `fotos-flaschen/mirabelle-0-5l.png` | Anhang 1 ist die leere schlanke Basisflasche fotos-basis/schlank-0-5l.png, kein Foto der Sorte; Verschluss und Flüssigkeit nur über die Beschreibung |
| Hierber aale Fruucht | `fotos-basis/rund-0-5l.png` | `Fertige Etiquetten/Branntwein Hierber Fruucht-01.png` | `fotos-flaschen/hierber-fruucht-0-5l.png` | Basisfoto fotos-basis/rund-0-5l.png zeigt einen anderen Verschluss; der Glasstopfen aus der Verschluss-Zeile hat Vorrang, Halsband nur über die Beschreibung |
| Vieux Marc | `fotos-basis/karaffe-0-7l.png` | `Fertige Etiquetten/Branntwein Vieux marc-01.png` | `fotos-flaschen/vieux-marc-0-5l.png` | Basisfoto fotos-basis/karaffe-0-7l.png zeigt klares Glas und einen Glasstopfen; dunkles Braunglas nur über die Beschreibung |
| Vieille Prune | `fotos-basis/schlank-0-5l.png` | `Fertige Etiquetten/Brandwein Vieille prune-01.png` | `fotos-flaschen/vieille-prune-0-5l.png` | Anhang 1 ist die leere schlanke Basisflasche fotos-basis/schlank-0-5l.png, kein Foto der Sorte; Verschluss und Flüssigkeit nur über die Beschreibung |
| Vieille Pomme | `fotos-basis/schlank-0-5l.png` | `Fertige Etiquetten/Brandwein Vieille pomme-01.png` | `fotos-flaschen/vieille-pomme-0-5l.png` | Anhang 1 ist die leere schlanke Basisflasche fotos-basis/schlank-0-5l.png, kein Foto der Sorte; Verschluss und Flüssigkeit nur über die Beschreibung |
| Hunnegdrëpp | `fotos-basis/schlank-0-5l.png` | `Fertige Etiquetten/Brandwein Hunnegdrepp-01.png` | `fotos-flaschen/hunnegdrepp-0-5l.png` | Anhang 1 ist die leere schlanke Basisflasche fotos-basis/schlank-0-5l.png, kein Foto der Sorte; Verschluss und Flüssigkeit nur über die Beschreibung |
| Hierber Hunneg Whisky | `fotos-basis/rund-0-5l.png` | `Fertige Etiquetten/Branntwein Whisky 0,5L Hunneg-01.png` | `fotos-flaschen/hunneg-whisky-0-5l.png` | Basisfoto fotos-basis/rund-0-5l.png zeigt einen anderen Verschluss; der Glasstopfen aus der Verschluss-Zeile hat Vorrang, Halsband nur über die Beschreibung |
| Kräiderdrëpp | `fotos-basis/schlank-0-5l.png` | `Fertige Etiquetten/Brandwein Kraider-01.png` | `fotos-flaschen/kraeiderdrepp-0-5l.png` | Anhang 1 ist die leere schlanke Basisflasche fotos-basis/schlank-0-5l.png, kein Foto der Sorte; Verschluss und Flüssigkeit nur über die Beschreibung |
| Kürbisdrëpp | `fotos-basis/schlank-0-5l.png` | `Fertige Etiquetten/Brandwein Kürbisdrepp-01.png` | `fotos-flaschen/kuerbisdrepp-0-5l.png` | Anhang 1 ist die leere schlanke Basisflasche fotos-basis/schlank-0-5l.png, kein Foto der Sorte; Verschluss und Flüssigkeit nur über die Beschreibung |
| Grain | `fotos-basis/schlank-0-5l.png` | `Fertige Etiquetten/Branntwein Grain-01.png` | `fotos-flaschen/grain-0-5l.png` | Anhang 1 ist die leere schlanke Basisflasche fotos-basis/schlank-0-5l.png, kein Foto der Sorte; Verschluss und Flüssigkeit nur über die Beschreibung |
| Hondsaarsch | `fotos-basis/schlank-0-5l.png` | `Fertige Etiquetten/Brandwein Hondsaarsch-01.png` | `fotos-flaschen/hondsaarsch-0-5l.png` | Anhang 1 ist die leere schlanke Basisflasche fotos-basis/schlank-0-5l.png, kein Foto der Sorte; Verschluss und Flüssigkeit nur über die Beschreibung |
| Kiwibeeren | `fotos-basis/schlank-0-5l.png` | `Fertige Etiquetten/Branntwein Kiwi-01.png` | `fotos-flaschen/kiwibeeren-0-5l.png` | Anhang 1 ist die leere schlanke Basisflasche fotos-basis/schlank-0-5l.png, kein Foto der Sorte; Verschluss und Flüssigkeit nur über die Beschreibung |
| Poire | `fotos-basis/schlank-0-5l.png` | `Fertige Etiquetten/Brandwein Poire-01.png` | `fotos-flaschen/poire-0-5l.png` | Anhang 1 ist die leere schlanke Basisflasche fotos-basis/schlank-0-5l.png, kein Foto der Sorte; Verschluss und Flüssigkeit nur über die Beschreibung |
| Neelchesbiren | `fotos-basis/schlank-0-5l.png` | `Fertige Etiquetten/Brandwein Nelchensbiren-01.png` | `fotos-flaschen/neelchesbiren-0-5l.png` | Anhang 1 ist die leere schlanke Basisflasche fotos-basis/schlank-0-5l.png, kein Foto der Sorte; Verschluss und Flüssigkeit nur über die Beschreibung |
| Lënschouren | `fotos-basis/schlank-0-5l.png` | `Fertige Etiquetten/Brandwein Lenschouren-01.png` | `fotos-flaschen/lenschouren-0-5l.png` | Anhang 1 ist die leere schlanke Basisflasche fotos-basis/schlank-0-5l.png, kein Foto der Sorte; Verschluss und Flüssigkeit nur über die Beschreibung |
| Vullekiischt | `fotos-basis/schlank-0-5l.png` | `Fertige Etiquetten/Brandwein Vogelbeere-01.png` | `fotos-flaschen/vullekiischt-0-5l.png` | Anhang 1 ist die leere schlanke Basisflasche fotos-basis/schlank-0-5l.png, kein Foto der Sorte; Verschluss und Flüssigkeit nur über die Beschreibung |
| Schléiwen | `fotos-basis/schlank-0-5l.png` | `Fertige Etiquetten/Branntwein Schleiwen-01.png` | `fotos-flaschen/schleiwen-0-5l.png` | Anhang 1 ist die leere schlanke Basisflasche fotos-basis/schlank-0-5l.png, kein Foto der Sorte; Verschluss und Flüssigkeit nur über die Beschreibung |
| Vizdrëpp | `fotos/vorlage-vizdrepp.png` | `Fertige Etiquetten/Vizdrepp 0,5l_Zeichenfläche 1.png` | `fotos-flaschen/vizdrepp-0-5l.png` | Leere Vorlagenflasche (ohne Etikett) auf schwarzem Grund; der Grund soll hell werden |
| Hierber Sambuca | `fotos-basis/rund-0-5l.png` | `Fertige Etiquetten/Branntwein Sambuca_Zeichenfläche 1.png` | `fotos-flaschen/sambuca-0-5l.png` | Basisfoto fotos-basis/rund-0-5l.png zeigt einen anderen Verschluss; der Glasstopfen aus der Verschluss-Zeile hat Vorrang, Halsband nur über die Beschreibung |
| Hierber Limoncello | `fotos-basis/rund-0-5l.png` | `Fertige Etiquetten/Branntwein Limoncello-01.png` | `fotos-flaschen/limoncello-0-5l.png` | Basisfoto fotos-basis/rund-0-5l.png zeigt einen anderen Verschluss; der Glasstopfen aus der Verschluss-Zeile hat Vorrang, Halsband nur über die Beschreibung |

## Problematische Vorlagen und Unsicherheiten (ehrlich)

- **Etikett Wort für Wort:** Dass ChatGPT Sortenname, Alkoholangabe, Grafik und die feste Adresszeile fehlerfrei übernimmt, ist unsicher. Jedes Ergebnis von Hand gegen das flache Etikett prüfen.
- **Karaffe (Vieux Marc):** `fotos-basis/karaffe-0-7l.png` zeigt eine leere Karaffe aus klarem Glas mit Glasstopfen. Dunkles, fast schwarzes Braunglas steht nur im Prompt; ob ChatGPT das einhält, ist offen.
- **Runde Basisflasche (Wodka, Gin, Rum, Rum Orange, Whisky, Hunneg Whisky, Limoncello, Sambuca, aale Fruucht):** `fotos-basis/rund-0-5l.png` ist eine leere runde Flasche mit anderem Verschluss, kein Foto der Sorte. Halsband und Flüssigkeit stehen nur im Prompt; die Verschluss-Zeile (Glasstopfen ohne Kork) hat Vorrang vor dem Basisfoto, ob ChatGPT das einhält, ist offen.
- **Nur über Beschreibung (Gin, Rum Orange, Whisky, Hunneg Whisky):** es gibt kein Foto der Sorte; Halsband- und Flüssigkeitsfarbe stehen nur im Text. Hier ist die Abweichung vom echten Produkt am größten.
- **Schlanke Basisflasche (alle schlanken Sorten):** `fotos-basis/schlank-0-5l.png` ist eine leere, schlanke Flasche mit kurzem Hals und Glasstopfen, kein Foto der Sorte; Flüssigkeit und Verschluss stehen im Prompt (Flüssigkeitsfarbe je Sorte, Glasstopfen). Grain wird laut Preisliste nur als 1 L angeboten; sein 0,5-L-Prompt gehört trotzdem zum Standard (1-L-Prompt: `PROMPTS-GROESSEN.md`).
- **Einheitliche Position:** Standfläche bei etwa 90 % und Verschlussoberkante bei etwa 8 % hält ChatGPT erfahrungsgemäß nur ungefähr ein.

---

## 1. Hierber Gin

- **Anhang 1 (nur Orientierung):** `fotos-basis/rund-0-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Gin - Nei 1-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/gin-0-5l.png`
- **Status:** vorhanden
- **Prompt:** 229 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (leere runde 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen; Halsband und Flüssigkeit sind die der Sorte); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Halsband: schmales Papierband um den Hals, hellblaues Band mit weißer Schreibschrift „Hierber Brennerei“, eigenes Band neben dem großen Etikett (Anhang 1 zeigt es nicht, bitte ergänzen). Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/gin-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
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

- **Anhang 1 (nur Orientierung):** `fotos-basis/rund-0-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Wodka-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/wodka-0-5l.png`
- **Status:** offen
- **Prompt:** 229 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (leere runde 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen; Halsband und Flüssigkeit sind die der Sorte); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Halsband: schmales Papierband um den Hals, hellblaues Band mit weißer Schreibschrift „Hierber Brennerei“, eigenes Band neben dem großen Etikett (Anhang 1 zeigt es nicht, bitte ergänzen). Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/wodka-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
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

- **Anhang 1 (nur Orientierung):** `fotos-basis/rund-0-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Rum nei-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/rum-0-5l.png`
- **Status:** offen
- **Prompt:** 228 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (leere runde 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen; Halsband und Flüssigkeit sind die der Sorte); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Halsband: schmales Papierband um den Hals, braungraues Band mit heller Schreibschrift „Hierber Brennerei“, eigenes Band neben dem großen Etikett (Anhang 1 zeigt es nicht, bitte ergänzen). Flüssigkeit: goldenes Bernstein, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/rum-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
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

- **Anhang 1 (nur Orientierung):** `fotos-basis/rund-0-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Rum orange nei-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/rum-orange-0-5l.png`
- **Status:** offen
- **Prompt:** 233 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (leere runde 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen; Halsband und Flüssigkeit sind die der Sorte); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Halsband: schmales Papierband um den Hals, braungraues Band mit heller Schreibschrift „Hierber Brennerei“, eigenes Band neben dem großen Etikett (Anhang 1 zeigt es nicht, bitte ergänzen). Flüssigkeit: Bernstein, etwas orangener als im Foto (Orange-Bernstein), bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/rum-orange-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
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

- **Anhang 1 (nur Orientierung):** `fotos-basis/rund-0-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Whisky 0,5L nei 4-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/whisky-0-5l.png`
- **Status:** offen
- **Prompt:** 227 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (leere runde 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen; Halsband und Flüssigkeit sind die der Sorte); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Halsband: schmales Papierband um den Hals, braungraues Band mit heller Schreibschrift „Hierber Brennerei“, eigenes Band neben dem großen Etikett (Anhang 1 zeigt es nicht, bitte ergänzen). Flüssigkeit: goldgelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/whisky-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
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

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Kirsch-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/kirsch-0-5l.png`
- **Status:** offen
- **Prompt:** 207 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/kirsch-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
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

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Framboise-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/framboise-0-5l.png`
- **Status:** offen
- **Prompt:** 207 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/framboise-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
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

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Quetsch-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/quetsch-0-5l.png`
- **Status:** offen
- **Prompt:** 207 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/quetsch-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
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

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Williams-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/poire-williams-0-5l.png`
- **Status:** offen
- **Prompt:** 207 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/poire-williams-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
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

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Mirabelle-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/mirabelle-0-5l.png`
- **Status:** offen
- **Prompt:** 207 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/mirabelle-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
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

- **Anhang 1 (nur Orientierung):** `fotos-basis/rund-0-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Hierber Fruucht-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/hierber-fruucht-0-5l.png`
- **Status:** offen
- **Prompt:** 232 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (leere runde 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen; Halsband und Flüssigkeit sind die der Sorte); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Halsband: schmales Papierband um den Hals, graubraunes Band mit kleinem Brennblasen-Logo und heller Schreibschrift „Hierber Brennerei“, eigenes Band neben dem großen Etikett (Anhang 1 zeigt es nicht, bitte ergänzen). Flüssigkeit: warmes, kräftiges Orange-Bernstein, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/hierber-fruucht-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
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

- **Anhang 1 (nur Orientierung):** `fotos-basis/karaffe-0-7l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Vieux marc-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/vieux-marc-0-5l.png`
- **Status:** offen
- **Prompt:** 230 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (Foto einer leeren Flasche dieser Form (ohne Etikett): Karaffe mit langem, schlankem Hals und nach unten breit auslaufendem Körper; das Glas im Foto ist klar und der Verschluss ein Glasstopfen, Glasfarbe und Verschluss gelten wie weiter unten beschrieben); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt ohne Papierband. Glas: dunkles, fast schwarzes Braunglas, der Brand ist nicht zu sehen. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/vieux-marc-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
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

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Vieille prune-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/vieille-prune-0-5l.png`
- **Status:** offen
- **Prompt:** 206 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klares Goldgelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/vieille-prune-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
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

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Vieille pomme-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/vieille-pomme-0-5l.png`
- **Status:** offen
- **Prompt:** 206 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klares Goldgelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/vieille-pomme-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
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

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Hunnegdrepp-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/hunnegdrepp-0-5l.png`
- **Status:** offen
- **Prompt:** 206 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: tiefes Honiggold, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/hunnegdrepp-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
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

- **Anhang 1 (nur Orientierung):** `fotos-basis/rund-0-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Whisky 0,5L Hunneg-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/hunneg-whisky-0-5l.png`
- **Status:** offen
- **Prompt:** 229 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (leere runde 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen; Halsband und Flüssigkeit sind die der Sorte); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Halsband: schmales Papierband um den Hals, braungraues Band mit heller Schreibschrift „Hierber Brennerei“, eigenes Band neben dem großen Etikett (Anhang 1 zeigt es nicht, bitte ergänzen). Flüssigkeit: warmes, honigfarbenes Goldgelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/hunneg-whisky-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
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

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Kraider-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/kraeiderdrepp-0-5l.png`
- **Status:** offen
- **Prompt:** 207 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/kraeiderdrepp-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
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

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Kürbisdrepp-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/kuerbisdrepp-0-5l.png`
- **Status:** offen
- **Prompt:** 207 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/kuerbisdrepp-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
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

## 19. Grain

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Grain-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/grain-0-5l.png`
- **Status:** offen
- **Prompt:** 207 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/grain-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
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

## 20. Hondsaarsch

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Hondsaarsch-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/hondsaarsch-0-5l.png`
- **Status:** offen
- **Prompt:** 207 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/hondsaarsch-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
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

## 21. Kiwibeeren

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Kiwi-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/kiwibeeren-0-5l.png`
- **Status:** offen
- **Prompt:** 207 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/kiwibeeren-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
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

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Poire-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/poire-0-5l.png`
- **Status:** offen
- **Prompt:** 207 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/poire-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
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

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Nelchensbiren-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/neelchesbiren-0-5l.png`
- **Status:** offen
- **Prompt:** 207 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/neelchesbiren-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
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

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Lenschouren-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/lenschouren-0-5l.png`
- **Status:** offen
- **Prompt:** 207 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/lenschouren-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
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

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Brandwein Vogelbeere-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/vullekiischt-0-5l.png`
- **Status:** offen
- **Prompt:** 207 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/vullekiischt-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
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

## 26. Schléiwen

- **Anhang 1 (nur Orientierung):** `fotos-basis/schlank-0-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Schleiwen-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/schleiwen-0-5l.png`
- **Status:** offen
- **Prompt:** 207 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (leere schlanke Flasche ohne Etikett, nur Form und Proportionen); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/schleiwen-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
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
- **Ergebnis speichern als:** `fotos-flaschen/vizdrepp-0-5l.png`
- **Status:** offen
- **Prompt:** 221 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (Foto einer leeren Flasche dieser Form (ohne Etikett): schlanker Hals, nach unten glockenförmig breiter werdender Körper mit eingewölbtem Boden); nur Orientierung, nicht kopieren, nicht dessen Etikett. Das Etikett ist querformatig. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses. Flüssigkeit: kräftiges, klares Goldgelb, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/vizdrepp-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
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

- **Anhang 1 (nur Orientierung):** `fotos-basis/rund-0-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Sambuca_Zeichenfläche 1.png`
- **Ergebnis speichern als:** `fotos-flaschen/sambuca-0-5l.png`
- **Status:** offen
- **Prompt:** 231 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (leere runde 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen; Halsband und Flüssigkeit sind die der Sorte); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Halsband: schmales Papierband um den Hals, dunkelrotes Band mit Faserstruktur und heller Schreibschrift „Hierber Brennerei“, eigenes Band neben dem großen Etikett (Anhang 1 zeigt es nicht, bitte ergänzen). Flüssigkeit: klar wie Wasser, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/sambuca-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
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

- **Anhang 1 (nur Orientierung):** `fotos-basis/rund-0-5l.png`
- **Anhang 2 (Etikett):** `Fertige Etiquetten/Branntwein Limoncello-01.png`
- **Ergebnis speichern als:** `fotos-flaschen/limoncello-0-5l.png`
- **Status:** offen
- **Prompt:** 229 Wörter

```
Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (1024 × 1536 Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum. Form, Verschluss und Proportionen orientieren sich an Anhang 1 (leere runde 0,5-L-Flasche ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen; Halsband und Flüssigkeit sind die der Sorte); nur Orientierung, nicht kopieren, nicht dessen Etikett. Verschluss: Glasstopfen ohne Kork (kein Korken, kein Schraubverschluss); hat Vorrang vor dem Verschluss in Anhang 1. Halsband: schmales Papierband um den Hals, gelbes Band mit Zitronenscheiben und Schreibschrift „Hierber Brennerei“, eigenes Band neben dem großen Etikett (Anhang 1 zeigt es nicht, bitte ergänzen). Flüssigkeit: leuchtendes Gelbgrün, bis zum Hals gefüllt. Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett. Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „fotos-flaschen/limoncello-0-5l.png“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.
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

