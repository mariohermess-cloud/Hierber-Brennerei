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
- Servierte Gläser je Serviervorschlag (Platzhalter `data-todo="foto"`), Maische, Abfüllen, Karte, Rum Orange (Etikett/Foto).
- Gin und Whisky: Flaschenform im Theke-Foto nur sinngemäß als „rund“ angenähert.
- Etiketten in den Produktfotos (Rum, Limoncello, Sambuca, Wodka, Fruucht, Hunnegdrëpp) können ältere Fassungen sein; aktuelle flache Etiketten haben Vorrang.

## 5. Flüssigkeitsfarbe bestätigen
Farben der Vektor-Flaschen; „geschätzt“ = Flüssigkeitsfarbe bestätigen.

| Sorte | Bild | Farbe | Quelle / geschätzt |
|---|---|---|---|
| Hierber Gin | Vektor-Flasche rund | klar | flaschenreihe-theke.jpg: Hierber-Gin-Flasche (Sichtprüfung, Füllung farblos), farblos |
| Hierber Wodka | Vektor-Flasche rund | klar | Foto vom Nutzer: flaschen-wodka.webp (0,2 L und 0,5 L), Füllung farblos; Probe Schulter #878683 = Durchsicht auf Tisch |
| Hierber Rum | Produktfoto | #c58a08 (α 0.92) | Foto vom Nutzer: flaschen-rum-02-05.webp / flaschen-rum-fuenf-groessen.webp, Probe Schulter #c68f04, #c49313, #c17a07 (Mittel) |
| Hierber Rum Orange | Platzhalter | #c67a1c (α 0.9) | **geschätzt** – produkte.js: „orange-bernsteinfarben“ |
| Hierber Whisky | Vektor-Flasche rund | #9c7d26 (α 0.9) | flaschenreihe-theke.jpg: Whisky-Flasche (schwarzes Etikett), Probe x 1192-1262, y 850-920 |
| Kirsch | Vektor-Flasche schlank | klar | flaschenreihe-theke.jpg: Kirsch-Flaschen, Pixelprobe Sättigung höchstens 0,08, farblos |
| Framboise | Vektor-Flasche schlank | klar | flaschenreihe-theke.jpg: Framboise-Flasche, Pixelprobe Sättigung höchstens 0,08, farblos |
| Quetsch | Vektor-Flasche schlank | klar | produkte.js: „klare Eau-de-vie“ |
| Poire Williams | Vektor-Flasche schlank | klar | flaschenreihe-theke.jpg: liegende Poire-Williams-Flasche (Sichtprüfung), farblos |
| Mirabelle | Vektor-Flasche schlank | klar | produkte.js: „klare Eau-de-vie“ |
| Hierber aale Fruucht | Vektor-Flasche rund | #bd6e1b (α 0.92) | Foto vom Nutzer: flaschen-fruucht.webp, Probe Schulter 0,5 L (60.-95. Perzentil) #bd6e1b, 0,2 L #af6813 |
| Vieux Marc | Vektor-Flasche karaffe | #42352a (α 0.96) | flaschenreihe-theke.jpg: Vieux-Marc-Karaffe, Probe x 262-338, y 925-1040 (dunkles Glas) |
| Vieille Prune | Vektor-Flasche schlank | #a48a2c (α 0.8) | flaschenreihe-theke.jpg: Vieille-Prune-Flasche, Probe x 1100-1158, y 870-940 |
| Vieille Pomme | Vektor-Flasche schlank | #e6dba0 (α 0.7) | **geschätzt** – produkte.js: „blass strohfarben“ |
| Hunnegdrëpp | Vektor-Flasche schlank | #b9861b (α 0.92) | Foto vom Nutzer: flasche-hunnegdrepp.png, Sichtung Füllung tiefes Honiggold (Pixelprobe durch schwarze Rückwand verfälscht) |
| Hierber Hunneg Whisky | Vektor-Flasche rund | #c4912e (α 0.9) | **geschätzt** – produkte.js: Honig-Whisky; golden geschätzt, dunkler als Whisky |
| Kräiderdrëpp | Vektor-Flasche schlank | klar | flaschenreihe-theke.jpg: Kräiderdrëpp-Flasche, Pixelprobe Sättigung höchstens 0,08, farblos |
| Kürbisdrëpp | Vektor-Flasche schlank | klar | produkte.js: „klare Eau-de-vie“ |
| Grain | Vektor-Flasche schlank | klar | produkte.js: „klare Eau-de-vie“ |
| Hondsaarsch | Vektor-Flasche schlank | klar | produkte.js: „klare Eau-de-vie“ |
| Kiwibeeren | Vektor-Flasche schlank | klar | produkte.js: „klare Eau-de-vie“ |
| Poire | Vektor-Flasche schlank | klar | produkte.js: „klare Eau-de-vie“ |
| Neelchesbiren | Vektor-Flasche schlank | #e8deaa (α 0.6) | **geschätzt** – produkte.js: „blass strohfarben“ |
| Lënschouren | Vektor-Flasche schlank | klar | flaschenreihe-theke.jpg: Lënschouren-Flasche, Pixelprobe Sättigung höchstens 0,08, farblos |
| Vullekiischt | Vektor-Flasche schlank | klar | produkte.js: „klare Eau-de-vie“ |
| Schléiwen | Vektor-Flasche schlank | klar | flaschenreihe-theke.jpg: Schléiwen-Flasche, Pixelprobe Sättigung höchstens 0,08, farblos |
| Vizdrëpp | Vektor-Flasche rund | #e3d594 (α 0.75) | **geschätzt** – flaschenreihe-theke.jpg: Vizdrëpp-Flasche blass goldgelb (Sichtprüfung; Pixelprobe durch Hintergrund verfälscht) |
| Hierber Sambuca | Produktfoto | klar | Foto vom Nutzer: flaschen-sambuca.webp, Füllung farblos |
| Hierber Limoncello | Produktfoto | #d7d62f (α 0.95) | Foto vom Nutzer: flaschen-limoncello.webp, Probe Farbton gelbgrün (Helligkeit durch schwarzen Grund gedrückt, Wert aufgehellt) |
