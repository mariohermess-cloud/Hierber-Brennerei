# TODO-INHALTE: was der Brenner bestätigen oder liefern muss

Sortiert nach Priorität. Auf der Seite sind alle Entwürfe mit `data-todo="bestaetigen"` markiert.

## 1. Widersprüche klären (stehen nicht auf der Seite; dort gilt der Wert aus produkte.js)
- Kiwibeeren: Etikett 43 %, Preisliste 45 %.
- Kürbisdrëpp: Etikett 40 %, Preisliste 45 %.
- Rum: Etikett (auch im Produktfoto) 40 %, Preisliste 43 %; ggf. neues Foto.
- Mirabelle, Quetsch, Poire Williams: Etikett der Variante „nogeräift“ 35 %, Preisliste „geräift“; Bezeichnung klären.
- Telefon „727602“ (Schreibweise/Vorwahl unbekannt, steht so auf Etikett und Preisliste).
- Whisky und Hunneg Whisky: Preis von Hunneg Whisky fehlt (Seite zeigt „Preis auf Anfrage“); Hondsaarsch und Vullekiischt ebenfalls ohne Preis.

## 2. Pflichtangaben
- Impressum: RCS-Nr., TVA-Nr., Vertretungsberechtigte, Telefon bestätigen. Datenschutz rechtlich prüfen lassen (Hosting-Anbieter, Speicherdauer).
- Öffnungszeiten, Kartenansicht (statisches Bild; bisher Link zu OpenStreetMap).
- Logo (Brennkolben-Symbol) als Vektor liefern; bisher nur Wortmarke in Cormorant Garamond.

## 3. Entwurfstexte bestätigen
- Hero-Satz, Schritte „Wie wir brennen“ (Obst, Maische, Brennen, Reifen, Abfüllen), Intro, Nase, Gaumen, Abgang, Trinktemperatur und Glas je Sorte (`site/data/texte.js`).
- Erklärung von Quetsch, Lënschouren, Neelchesbiren (luxemburgische Namen).
- Anlass-Zuordnung (`site/data/anlaesse.js`), Gruppen (`gruppen.js`; unklar: Grain, Kürbisdrëpp, Vizdrëpp), „Passt auch“ (`verwandt.js`).
- Alle Serviervorschläge: Rezeptentwurf, Brenner bestätigen (`site/data/serviervorschlaege.js`; 29 Sorten, je 3 bis 5).
- Weitere Produkte auf Anfrage (Äppel/Pommes, Quitten, Nëssdrëpp, Pefferminz, Pastis, Hierberol, Ingwerlikör, Kräider Batti, Neutraler Alkohol, Liköre, Holzkisten): Liste bestätigen.
- Französisch: alle Entwurfstexte (`data-todo="uebersetzung"`, „Textes à venir“).

## 4. Fotos
- Welches Fass enthält welche Sorte: Tafeln der Fassreihe sind nur eine Sortenauswahl, keine Zuordnung zu den Fässern im Foto.
- Servierte Gläser: 29 Serviervorschläge (einer je Sorte) haben ein KI-Symbolbild (siehe „6. KI-Bilder“); alle übrigen Vorschläge behalten den Platzhalter `data-todo="foto"` (98 Platzhalter auf den deutschen Seiten, `FOTO-PLATZHALTER.md`). Außerdem fehlen Maische, Abfüllen, Karte, Rum Orange (Etikett/Foto).
- Gin und Whisky: Flaschenform im Theke-Foto nur sinngemäß als „rund“ angenähert.
- Etiketten in den Produktfotos (Rum, Limoncello, Sambuca, Wodka, Fruucht, Hunnegdrëpp) können ältere Fassungen sein; aktuelle flache Etiketten haben Vorrang.

## 5. Flüssigkeitsfarben
Farben der Vektor-Flaschen; „geschätzt“ = Flüssigkeitsfarbe bestätigen. Messung: `node tools/fluessigkeit_messen.mjs` (Bericht `FLUESSIGKEIT-MESSUNG.md`; Flaschenfotos mit Weißgrund in `Fotos/`, nicht `fotos/`; aktuelle flache Etiketten haben weiter Vorrang, die Etiketten auf den Fotos sind teils ältere Entwürfe).

**Aus `Fotos/` gemessen (15 Sorten):** Kirsch `_DSC3038.jpg`, Framboise `_DSC3041.jpg`, Quetsch `_DSC3044.jpg`, Poire Williams `_DSC3042.jpg`, Mirabelle `_DSC3036.jpg`, Poire `_DSC3033.jpg`, Neelchesbiren `_DSC3039.jpg` (alle klar, vorher teils „geschätzt“; Neelchesbiren war „blass strohfarben“ angenommen, das Foto zeigt klar), Lënschouren `_DSC3035.jpg`, Schléiwen `_DSC3037.jpg`, Kräiderdrëpp `_DSC3046.jpg`, Kiwibeeren `_DSC3049.jpg` (klar); Vieille Pomme `_DSC3051.jpg` (#e2cc43), Vieille Prune `_DSC3052.jpg` (#e3cd3a), Vizdrëpp `_DSC3054.jpg` (#d9ba15); Hunnegdrëpp `_DSC3047.jpg` bestätigt die bisherige Farbe aus dem Foto auf schwarzem Grund (beobachtet #c18e00, entmischt #ba7e00; Wert #b9861b bleibt).
**Weiter aus früheren Fotos (`fotos/`, schwarzer Grund bzw. Theke):** Wodka, Rum, Limoncello, Sambuca, Aale Fruucht, Gin, Whisky, Vieux Marc.
**Weiter nur geschätzt:** Rum Orange (kein Foto), Hunneg Whisky (kein Foto in `Fotos/`); klar nach Beschreibung ohne Foto: Hondsaarsch, Vullekiischt, Kürbisdrëpp, Grain.
**Nicht auf der Seite (nur Foto vorhanden):** Pefferminz, Nëssdrëpp, Williamsdrëpp op Biren nogeräift, Liköre (siehe `FOTO-INVENTAR.md`, Abschnitt 8).

| Sorte | Bild | Farbe | Quelle / geschätzt |
|---|---|---|---|
| Hierber Gin | Vektor-Flasche rund | klar | flaschenreihe-theke.jpg: Hierber-Gin-Flasche (Sichtprüfung, Füllung farblos), farblos |
| Hierber Wodka | Vektor-Flasche rund | klar | Foto vom Nutzer: flaschen-wodka.webp (0,2 L und 0,5 L), Füllung farblos; Probe Schulter #878683 = Durchsicht auf Tisch |
| Hierber Rum | Produktfoto | #c58a08 (α 0.92) | Foto vom Nutzer: flaschen-rum-02-05.webp / flaschen-rum-fuenf-groessen.webp, Probe Schulter #c68f04, #c49313, #c17a07 (Mittel) |
| Hierber Rum Orange | Platzhalter | #c67a1c (α 0.9) | **geschätzt** – produkte.js: „orange-bernsteinfarben“ |
| Hierber Whisky | Vektor-Flasche rund | #9c7d26 (α 0.9) | flaschenreihe-theke.jpg: Whisky-Flasche (schwarzes Etikett), Probe x 1192-1262, y 850-920 |
| Kirsch | Vektor-Flasche schlank | klar | Foto Fotos/_DSC3038.jpg: gemessen, Füllung farblos (Abstand zum leeren Glas < 14) |
| Framboise | Vektor-Flasche schlank | klar | Foto Fotos/_DSC3041.jpg: gemessen, Füllung farblos (Abstand zum leeren Glas < 14) |
| Quetsch | Vektor-Flasche schlank | klar | Foto Fotos/_DSC3044.jpg: gemessen, Füllung farblos (Abstand zum leeren Glas < 14) |
| Poire Williams | Vektor-Flasche schlank | klar | Foto Fotos/_DSC3042.jpg: gemessen, Füllung farblos (Abstand zum leeren Glas < 14) |
| Mirabelle | Vektor-Flasche schlank | klar | Foto Fotos/_DSC3036.jpg: gemessen, Füllung farblos (Abstand zum leeren Glas < 14) |
| Hierber aale Fruucht | Vektor-Flasche rund | #bd6e1b (α 0.92) | Foto vom Nutzer: flaschen-fruucht.webp, Probe Schulter 0,5 L (60.-95. Perzentil) #bd6e1b, 0,2 L #af6813 |
| Vieux Marc | Vektor-Flasche karaffe | #42352a (α 0.96) | flaschenreihe-theke.jpg: Vieux-Marc-Karaffe, Probe x 262-338, y 925-1040 (dunkles Glas) |
| Vieille Prune | Vektor-Flasche schlank | #e3cd3a (α 0.85) | Foto Fotos/_DSC3052.jpg: gemessen, beobachtet #e3d052, Weißgrund herausgerechnet |
| Vieille Pomme | Vektor-Flasche schlank | #e2cc43 (α 0.85) | Foto Fotos/_DSC3051.jpg: gemessen, beobachtet #e2cf59, Weißgrund herausgerechnet |
| Hunnegdrëpp | Vektor-Flasche schlank | #b9861b (α 0.92) | Foto vom Nutzer: flasche-hunnegdrepp.png, Sichtung Füllung tiefes Honiggold (Pixelprobe durch schwarze Rückwand verfälscht); bestätigt durch Messung Fotos/_DSC3047.jpg (beobachtet #c18e00, entmischt #ba7e00) |
| Hierber Hunneg Whisky | Vektor-Flasche rund | #c4912e (α 0.9) | **geschätzt** – produkte.js: Honig-Whisky; golden geschätzt, dunkler als Whisky |
| Kräiderdrëpp | Vektor-Flasche schlank | klar | Foto Fotos/_DSC3046.jpg: gemessen, Füllung farblos (Abstand zum leeren Glas < 14) |
| Kürbisdrëpp | Vektor-Flasche schlank | klar | produkte.js: „klare Eau-de-vie“ |
| Grain | Vektor-Flasche schlank | klar | produkte.js: „klare Eau-de-vie“ |
| Hondsaarsch | Vektor-Flasche schlank | klar | produkte.js: „klare Eau-de-vie“ |
| Kiwibeeren | Vektor-Flasche schlank | klar | Foto Fotos/_DSC3049.jpg: gemessen, Füllung farblos (Abstand zum leeren Glas < 14) |
| Poire | Vektor-Flasche schlank | klar | Foto Fotos/_DSC3033.jpg: gemessen, Füllung farblos (Abstand zum leeren Glas < 14) |
| Neelchesbiren | Vektor-Flasche schlank | klar | Foto Fotos/_DSC3039.jpg: gemessen, Füllung farblos (Abstand zum leeren Glas < 14) |
| Lënschouren | Vektor-Flasche schlank | klar | Foto Fotos/_DSC3035.jpg: gemessen, Füllung farblos (Abstand zum leeren Glas < 14) |
| Vullekiischt | Vektor-Flasche schlank | klar | produkte.js: „klare Eau-de-vie“ |
| Schléiwen | Vektor-Flasche schlank | klar | Foto Fotos/_DSC3037.jpg: gemessen, Füllung farblos (Abstand zum leeren Glas < 14) |
| Vizdrëpp | Vektor-Flasche rund | #d9ba15 (α 0.85) | Foto Fotos/_DSC3054.jpg: gemessen, beobachtet #d9bf31, Weißgrund herausgerechnet |
| Hierber Sambuca | Produktfoto | klar | Foto vom Nutzer: flaschen-sambuca.webp, Füllung farblos |
| Hierber Limoncello | Produktfoto | #d7d62f (α 0.95) | Foto vom Nutzer: flaschen-limoncello.webp, Probe Farbton gelbgrün (Helligkeit durch schwarzen Grund gedrückt, Wert aufgehellt) |

## 6. KI-Bilder
Alle 29 Serviervorschlag-Bilder (`fotos-ki/<sorten-id>-1.png`, auf der Sortenseite je ein Vorschlag mit „Symbolbild: Serviervorschlag“) sind **KI-erzeugt** und vom Brenner auf Etikett- und Flaschentreue sowie auf das Rezept zu prüfen (am Bild `data-todo="bestaetigen"`). Einbau über `site/data/ki-bilder.js`; Open-Graph-Bild je Sorte bleibt das Etikett-Bild (der 4:3-Ausschnitt auf 1200×630 würde Flaschenkappen und Glasränder abschneiden, und KI-Etiketten mit Fehlern sollen nicht per Social-Share verbreitet werden).

Einzeln auffällig (beim Betrachten aller 29 Bilder, Etikett-Adresszeilen zusätzlich in 1:1 geprüft):

| Sorte | Auffälligkeit |
|---|---|
| Gin | Adresszeile **verfälscht**: „L. Hallinger L-6831 Herborn, Tél. 72 7602“ statt „2, Millewee L-6665 Herborn, Tél: 727602“; Etikettenmuster weicht ab |
| Wodka | Etikett am unteren Rand **angeschnitten** („www.hierber-brennere…“), Adresse verfälscht („Z. Millewee L-6665 hoıxn“) |
| Rum | Etikett nur aus Foto abgeleitet; „1-6665“ statt „L-6665“; braunes Halsband „Hierber Brennerei“ der echten Flasche fehlt; Etikett heller als im Foto |
| Rum Orange | Es gibt kein Etikett: Bild zeigt ein **erfundenes** Etikett „Hierber Rum Orange“ in Orange/Creme mit Orangenscheibe (35 % aus den Daten); ob es dem echten Etikett entspricht, ist unklar; Orangenblätter und -hälften auf dem Tisch stehen nicht im Rezept |
| Sambuca | Etikett nur aus Foto abgeleitet; echte Flasche hat einen Ausgießer mit zwei Metallröhrchen und Halsband, im Bild ein Korken |
| Limoncello | Etikett nur aus Foto abgeleitet; Adresse ohne „L-6665“ („…Millewee Herborn“); echte Flasche mit Ausgießer, im Bild Korken |
| Whisky | Adresse links abgeschnitten („Millewee“ ohne „2,“); Fass im Hintergrund (Kulisse) |
| Hunneg Whisky | Kräuterzweige im Hintergrund und Orangenstücke auf dem Tisch stehen nicht im Rezept |
| Kürbisdrëpp, Lënschouren, Vieux Marc | **Gericht statt Getränk**, Flasche steht daneben. Kürbis: Thymian/Pfeffer auf der Suppe nicht im Rezept; Lënschouren: Minzblatt nicht im Rezept; Vieux Marc: Karaffe aus durchsichtigem Bernsteinglas statt sehr dunklem Glas, zusätzliches Glas Vieux Marc (im Rezept „direkt in die Tasse oder separat“) |
| Neelchesbiren | Flasche und Getränk strohfarben; das Foto `Fotos/_DSC3039.jpg` zeigt einen **klaren** Brand; Thymianzweig im Glas nicht im Rezept |
| Vizdrëpp | Flaschenform weicht ab (im Bild hohe schlanke Flasche mit Glasstopfen, auf `Fotos/_DSC3054.jpg` breite, nach unten weitende Flasche); Rosmarin nicht im Rezept; Getränk blasser als die gemessene Füllung |
| Framboise, Kiwibeeren, Kräiderdrëpp | Minze (Kräiderdrëpp zusätzlich Rosmarin) im Glas, nicht im Rezept (bei Limoncello steht Minze im Rezept) |
| Mirabelle, Vullekiischt, Poire | Zusätze, die nicht im Rezept stehen: Mirabellenspalten im Glas, Vogelbeeren im Glas, Ingwerwurzel auf dem Tisch |
| Vieille Prune | Gemessene Füllung kräftiger gelb als das blasse Gold im Bild |
| 15 Bilder | Flaschenhals bzw. Kappe am oberen Bildrand abgeschnitten: Kirsch, Framboise, Quetsch, Poire Williams, Mirabelle, Vieille Prune, Vieille Pomme, Hunnegdrëpp, Kürbisdrëpp, Hondsaarsch, Kiwibeeren, Poire, Lënschouren, Vullekiischt, Schléiwen |
| Rum, Kürbisdrëpp, Kiwibeeren | Alkoholangabe im Bild folgt dem Etikett (40 % / 40 % / 43 %), nicht der Preisliste (43 % / 45 % / 45 %), siehe Abschnitt 1 |
