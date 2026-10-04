# TODO-INHALTE: was der Brenner bestätigen oder liefern muss

Sortiert nach Priorität. Auf der Seite sind alle Entwürfe mit `data-todo="bestaetigen"` markiert.

## 1. Widersprüche klären (stehen nicht auf der Seite; dort gilt der Wert aus produkte.js)
- Kiwibeeren: Etikett 43 %, Preisliste 45 %.
- Kürbisdrëpp: Etikett 40 %, Preisliste 45 %.
- Rum: Etikett (neues flaches Etikett und Produktfoto) 40 %, Preisliste 43 %.
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
- Servierte Gläser: 29 Serviervorschläge (einer je Sorte) haben ein KI-Symbolbild (siehe „6. KI-Bilder“); alle übrigen Vorschläge behalten den Platzhalter `data-todo="foto"` (98 Platzhalter auf den deutschen Seiten, `FOTO-PLATZHALTER.md`). Außerdem fehlen Maische, Abfüllen, Karte. Rum, Rum Orange, Limoncello und Sambuca haben seit Oktober 2026 flache Etiketten (`Fertige Etiquetten/`) und werden wie alle Sorten als Vektor-Flasche mit aktuellem Etikett gezeigt; die Platzhalterkarten „Etikett folgt“ sind entfallen.
- Gin und Whisky: Flaschenform im Theke-Foto nur sinngemäß als „rund“ angenähert.
- Etiketten in den Produktfotos (Rum, Limoncello, Sambuca, Wodka, Fruucht, Hunnegdrëpp) können ältere Fassungen sein; aktuelle flache Etiketten haben Vorrang.

## 5. Flüssigkeitsfarben
Farben der Vektor-Flaschen; „geschätzt“ = Flüssigkeitsfarbe bestätigen. Messung: `node tools/fluessigkeit_messen.mjs` (Bericht `FLUESSIGKEIT-MESSUNG.md`; Flaschenfotos mit Weißgrund in `Fotos/`, nicht `fotos/`; aktuelle flache Etiketten haben weiter Vorrang, die Etiketten auf den Fotos sind teils ältere Entwürfe).

**Aus `Fotos/` gemessen (15 Sorten):** Kirsch `flasche-kirsch.jpg`, Framboise `flasche-framboise.jpg`, Quetsch `flasche-quetsch.jpg`, Poire Williams `flasche-poire-williams.jpg`, Mirabelle `flasche-mirabelle.jpg`, Poire `flasche-poire.jpg`, Neelchesbiren `flasche-neelchesbiren.jpg` (alle klar, vorher teils „geschätzt“; Neelchesbiren war „blass strohfarben“ angenommen, das Foto zeigt klar), Lënschouren `flasche-lenschouren.jpg`, Schléiwen `flasche-schleiwen.jpg`, Kräiderdrëpp `flasche-kraeiderdrepp.jpg`, Kiwibeeren `flasche-kiwibeeren.jpg` (klar); Vieille Pomme `flasche-vieille-pomme.jpg` (#e2cc43), Vieille Prune `flasche-vieille-prune.jpg` (#e3cd3a), Vizdrëpp `flasche-vizdrepp.jpg` (#d9ba15); Hunnegdrëpp `flasche-hunnegdrepp.jpg` bestätigt die bisherige Farbe aus dem Foto auf schwarzem Grund (beobachtet #c18e00, entmischt #ba7e00; Wert #b9861b bleibt).
**Weiter aus früheren Fotos (`fotos/`, schwarzer Grund bzw. Theke):** Wodka, Rum, Limoncello, Sambuca, Aale Fruucht, Gin, Whisky, Vieux Marc. Die Flaschen von Rum, Limoncello und Sambuca sind jetzt ebenfalls Vektor-Flaschen mit flachem Etikett; das Produktfoto liefert nur noch Farbe und Form.
**Weiter nur geschätzt:** Rum Orange (kein Foto), Hunneg Whisky (kein Foto in `Fotos/`); klar nach Beschreibung ohne Foto: Hondsaarsch, Vullekiischt, Kürbisdrëpp, Grain.
**Nicht auf der Seite (nur Foto vorhanden):** Pefferminz, Nëssdrëpp, Williamsdrëpp op Biren nogeräift, Liköre (siehe `FOTO-INVENTAR.md`, Abschnitt 8).

| Sorte | Bild | Farbe | Quelle / geschätzt |
|---|---|---|---|
| Hierber Gin | Vektor-Flasche rund | klar | flaschenreihe-theke.jpg: Hierber-Gin-Flasche (Sichtprüfung, Füllung farblos), farblos |
| Hierber Wodka | Vektor-Flasche rund | klar | Foto vom Nutzer: flaschen-wodka.webp (0,2 L und 0,5 L), Füllung farblos; Probe Schulter #878683 = Durchsicht auf Tisch |
| Hierber Rum | Vektor-Flasche rund | #c58a08 (α 0.92) | Foto vom Nutzer: flaschen-rum-02-05.webp / flaschen-rum-fuenf-groessen.webp, Probe Schulter #c68f04, #c49313, #c17a07 (Mittel) |
| Hierber Rum Orange | Vektor-Flasche rund | #c67a1c (α 0.9) | **geschätzt** – produkte.js: „orange-bernsteinfarben“ |
| Hierber Whisky | Vektor-Flasche rund | #9c7d26 (α 0.9) | flaschenreihe-theke.jpg: Whisky-Flasche (schwarzes Etikett), Probe x 1192-1262, y 850-920 |
| Kirsch | Vektor-Flasche schlank | klar | Foto Fotos/flasche-kirsch.jpg: gemessen, Füllung farblos (Abstand zum leeren Glas < 14) |
| Framboise | Vektor-Flasche schlank | klar | Foto Fotos/flasche-framboise.jpg: gemessen, Füllung farblos (Abstand zum leeren Glas < 14) |
| Quetsch | Vektor-Flasche schlank | klar | Foto Fotos/flasche-quetsch.jpg: gemessen, Füllung farblos (Abstand zum leeren Glas < 14) |
| Poire Williams | Vektor-Flasche schlank | klar | Foto Fotos/flasche-poire-williams.jpg: gemessen, Füllung farblos (Abstand zum leeren Glas < 14) |
| Mirabelle | Vektor-Flasche schlank | klar | Foto Fotos/flasche-mirabelle.jpg: gemessen, Füllung farblos (Abstand zum leeren Glas < 14) |
| Hierber aale Fruucht | Vektor-Flasche rund | #bd6e1b (α 0.92) | Foto vom Nutzer: flaschen-fruucht.webp, Probe Schulter 0,5 L (60.-95. Perzentil) #bd6e1b, 0,2 L #af6813 |
| Vieux Marc | Vektor-Flasche karaffe | #42352a (α 0.96) | flaschenreihe-theke.jpg: Vieux-Marc-Karaffe, Probe x 262-338, y 925-1040 (dunkles Glas) |
| Vieille Prune | Vektor-Flasche schlank | #e3cd3a (α 0.85) | Foto Fotos/flasche-vieille-prune.jpg: gemessen, beobachtet #e3d052, Weißgrund herausgerechnet |
| Vieille Pomme | Vektor-Flasche schlank | #e2cc43 (α 0.85) | Foto Fotos/flasche-vieille-pomme.jpg: gemessen, beobachtet #e2cf59, Weißgrund herausgerechnet |
| Hunnegdrëpp | Vektor-Flasche schlank | #b9861b (α 0.92) | Foto vom Nutzer: flasche-hunnegdrepp.png, Sichtung Füllung tiefes Honiggold (Pixelprobe durch schwarze Rückwand verfälscht); bestätigt durch Messung Fotos/flasche-hunnegdrepp.jpg (beobachtet #c18e00, entmischt #ba7e00) |
| Hierber Hunneg Whisky | Vektor-Flasche rund | #c4912e (α 0.9) | **geschätzt** – produkte.js: Honig-Whisky; golden geschätzt, dunkler als Whisky |
| Kräiderdrëpp | Vektor-Flasche schlank | klar | Foto Fotos/flasche-kraeiderdrepp.jpg: gemessen, Füllung farblos (Abstand zum leeren Glas < 14) |
| Kürbisdrëpp | Vektor-Flasche schlank | klar | produkte.js: „klare Eau-de-vie“ |
| Grain | Vektor-Flasche schlank | klar | produkte.js: „klare Eau-de-vie“ |
| Hondsaarsch | Vektor-Flasche schlank | klar | produkte.js: „klare Eau-de-vie“ |
| Kiwibeeren | Vektor-Flasche schlank | klar | Foto Fotos/flasche-kiwibeeren.jpg: gemessen, Füllung farblos (Abstand zum leeren Glas < 14) |
| Poire | Vektor-Flasche schlank | klar | Foto Fotos/flasche-poire.jpg: gemessen, Füllung farblos (Abstand zum leeren Glas < 14) |
| Neelchesbiren | Vektor-Flasche schlank | klar | Foto Fotos/flasche-neelchesbiren.jpg: gemessen, Füllung farblos (Abstand zum leeren Glas < 14) |
| Lënschouren | Vektor-Flasche schlank | klar | Foto Fotos/flasche-lenschouren.jpg: gemessen, Füllung farblos (Abstand zum leeren Glas < 14) |
| Vullekiischt | Vektor-Flasche schlank | klar | produkte.js: „klare Eau-de-vie“ |
| Schléiwen | Vektor-Flasche schlank | klar | Foto Fotos/flasche-schleiwen.jpg: gemessen, Füllung farblos (Abstand zum leeren Glas < 14) |
| Vizdrëpp | Vektor-Flasche rund | #d9ba15 (α 0.85) | Foto Fotos/flasche-vizdrepp.jpg: gemessen, beobachtet #d9bf31, Weißgrund herausgerechnet |
| Hierber Sambuca | Vektor-Flasche rund | klar | Foto vom Nutzer: flaschen-sambuca.webp, Füllung farblos |
| Hierber Limoncello | Vektor-Flasche rund | #d7d62f (α 0.95) | Foto vom Nutzer: flaschen-limoncello.webp, Probe Farbton gelbgrün (Helligkeit durch schwarzen Grund gedrückt, Wert aufgehellt) |

## 6. KI-Bilder
Alle 29 Serviervorschlag-Bilder (`fotos-ki/<sorten-id>-1.png`, auf der Sortenseite je ein Vorschlag mit „Symbolbild: Serviervorschlag“) sind **KI-erzeugt** und vom Brenner auf Etikett- und Flaschentreue sowie auf das Rezept zu prüfen (am Bild `data-todo="bestaetigen"`). Einbau über `site/data/ki-bilder.js`; Open-Graph-Bild je Sorte bleibt das Etikett-Bild (der 4:3-Ausschnitt auf 1200×630 würde Flaschenkappen und Glasränder abschneiden, und KI-Etiketten mit Fehlern sollen nicht per Social-Share verbreitet werden).

Einzeln auffällig (beim Betrachten aller 29 Bilder, Etikett-Adresszeilen zusätzlich in 1:1 geprüft):

| Sorte | Auffälligkeit |
|---|---|
| Gin | Adresszeile **verfälscht**: „L. Hallinger L-6831 Herborn, Tél. 72 7602“ statt „2, Millewee L-6665 Herborn, Tél: 727602“; Etikettenmuster weicht ab |
| Wodka | Etikett am unteren Rand **angeschnitten** („www.hierber-brennere…“), Adresse verfälscht („Z. Millewee L-6665 hoıxn“) |
| Rum | Etikett nur aus Foto abgeleitet; „1-6665“ statt „L-6665“; braunes Halsband „Hierber Brennerei“ der echten Flasche fehlt; Etikett heller als im Foto |
| Rum Orange | Zum Zeitpunkt des Bildes gab es kein Etikett (jetzt liegt das echte vor: Segelschiff, Weltkarte, Orangenhälfte): Bild zeigt ein **erfundenes** Etikett „Hierber Rum Orange“ in Orange/Creme mit Orangenscheibe (35 % aus den Daten); ob es dem echten Etikett entspricht, ist unklar; Orangenblätter und -hälften auf dem Tisch stehen nicht im Rezept |
| Sambuca | Etikett nur aus Foto abgeleitet; echte Flasche hat einen Ausgießer mit zwei Metallröhrchen und Halsband, im Bild ein Korken |
| Limoncello | Etikett nur aus Foto abgeleitet; Adresse ohne „L-6665“ („…Millewee Herborn“); echte Flasche mit Ausgießer, im Bild Korken |
| Whisky | Adresse links abgeschnitten („Millewee“ ohne „2,“); Fass im Hintergrund (Kulisse) |
| Hunneg Whisky | Kräuterzweige im Hintergrund und Orangenstücke auf dem Tisch stehen nicht im Rezept |
| Kürbisdrëpp, Lënschouren, Vieux Marc | **Gericht statt Getränk**, Flasche steht daneben. Kürbis: Thymian/Pfeffer auf der Suppe nicht im Rezept; Lënschouren: Minzblatt nicht im Rezept; Vieux Marc: Karaffe aus durchsichtigem Bernsteinglas statt sehr dunklem Glas, zusätzliches Glas Vieux Marc (im Rezept „direkt in die Tasse oder separat“) |
| Neelchesbiren | Flasche und Getränk strohfarben; das Foto `Fotos/flasche-neelchesbiren.jpg` zeigt einen **klaren** Brand; Thymianzweig im Glas nicht im Rezept |
| Vizdrëpp | Flaschenform weicht ab (im Bild hohe schlanke Flasche mit Glasstopfen, auf `Fotos/flasche-vizdrepp.jpg` breite, nach unten weitende Flasche); Rosmarin nicht im Rezept; Getränk blasser als die gemessene Füllung |
| Framboise, Kiwibeeren, Kräiderdrëpp | Minze (Kräiderdrëpp zusätzlich Rosmarin) im Glas, nicht im Rezept (bei Limoncello steht Minze im Rezept) |
| Mirabelle, Vullekiischt, Poire | Zusätze, die nicht im Rezept stehen: Mirabellenspalten im Glas, Vogelbeeren im Glas, Ingwerwurzel auf dem Tisch |
| Vieille Prune | Gemessene Füllung kräftiger gelb als das blasse Gold im Bild |
| 15 Bilder | Flaschenhals bzw. Kappe am oberen Bildrand abgeschnitten: Kirsch, Framboise, Quetsch, Poire Williams, Mirabelle, Vieille Prune, Vieille Pomme, Hunnegdrëpp, Kürbisdrëpp, Hondsaarsch, Kiwibeeren, Poire, Lënschouren, Vullekiischt, Schléiwen |
| Rum, Kürbisdrëpp, Kiwibeeren | Alkoholangabe im Bild folgt dem Etikett (40 % / 40 % / 43 %), nicht der Preisliste (43 % / 45 % / 45 %), siehe Abschnitt 1 |

### Neue Bilder (Oktober 2026: gin-2 bis -4, lenschouren-1 bis -4, limoncello-2 bis -4)

Zuordnung nach `site/data/ki-bilder.js` geprüft (Hauptbild = -1, übrige ab -2 in Kartenreihenfolge): Gin -2 Gin Fizz, -3 Dry Martini, -4 Zitronensorbet mit Gin; Lënschouren -1 Vanilleeis (Ersatzbild), -2 pur, -3 Tonic, -4 zu Käse; Limoncello -2 eiskalt, -3 Tonic, -4 Zitronensorbet. Stimmt mit den Bildern überein. Alle Bilder 1448×1086, Flasche vollständig im Bild.

| Bild | Auffälligkeit |
|---|---|
| Gin -2, -3, -4 | Etikett und Adresszeile stimmen („2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu“); Flasche vollständig; nichts Fremdes. Beilagen (Räucherlachs, Oliven) stehen in `passtZu`. |
| Lënschouren -1 | Ersatzbild: Flasche vollständig (Hals und Stopfen sichtbar), Etikett lesbar mit Adresse, Dessert mit Nüssen und Espresso; **bitte prüfen**, ob es das alte Bild sauber ersetzt (Nüsse im Rezept: gehackte Nüsse). |
| Lënschouren -2, -3 | Stopfen der Flasche steht sehr dicht am oberen Bildrand (nicht abgeschnitten, aber knapp); -3 mit buntem Salat (Beilage laut `passtZu`). |
| Lënschouren -4 | Käseplatte mit Trauben und Walnüssen; Etikett lesbar. |
| Limoncello -2, -4 | Adresszeile auf dem Etikett **unvollständig**: „…Millewee Herborn, Tél: 727602, www.hierber-bren…“ ohne „2,“ und „L-6665“, „www“-Teil rechts abgeschnitten; Halsband am Flaschenhals mit angeschnittenem Text („…ber Bre…“, nicht auf dem flachen Etikett). -4: ganze und halbe Zitronen auf dem Tisch (im Rezept nur Sorbet). |
| Limoncello -3 | Adresse wie oben ohne „L-6665“; Minzzweig im Glas laut Rezept, Sommersalat als Beilage. |


## 7. Halsband der Flaschen (aus den echten Fotos abgelesen)

Prüfung der Fotos in `Fotos/` und `fotos/`: Die **26 schlanken Flaschen** (Hals mit Glasstopfen) haben **kein Halsband**, nur bei einigen einen schmalen goldgelben Siegelstreifen am Stopfenrand; auch Vizdrëpp und Vieux Marc haben keines. Die **runden Flaschen** tragen ein eigenes Papierband am Hals (zusätzlich zum großen Etikett); die Prompts in `PROMPTS-FLASCHEN.md` beschreiben es je Sorte.

| Sorte | Halsband laut Foto |
|---|---|
| Wodka | hellblau, weiße Schreibschrift „Hierber Brennerei“ |
| Rum | braungrau, helle Schreibschrift „Hierber Brennerei“ |
| Limoncello | gelb mit Zitronenscheiben, Schreibschrift |
| Sambuca | dunkelrot mit Faserstruktur, helle Schreibschrift |
| Hierber aale Fruucht | graubraun mit kleinem Brennblasen-Logo, helle Schreibschrift |
| **Unbestätigt** (kein eigenes Foto, Band der Schwestersorte übernommen) | Gin (wie Wodka), Rum Orange, Whisky, Hunneg Whisky (wie Rum) |

Offen für den Brenner: Stimmen die vier unbestätigten Sorten? Der Bandtext ist auf den Fotos wegen der Rundung nur teilweise lesbar („Hierber Bren…“); „Hierber Brennerei“ ist daraus geschlossen. Eine flache Bandgrafik liegt nicht vor.

### Neue Bilder (Oktober 2026, zweite Lieferung: 83 Serviervorschläge, jeweils -2 bis -5)

Alle 92 weiteren Serviervorschläge sind eingebaut. Gesichtet an Übersichtsbögen (Etikett, Flasche vollständig, Zutaten laut Rezept); die Adresszeile ist bei den kleinen Etiketten **nicht Zeichen für Zeichen geprüft**.

| Bild | Auffälligkeit |
|---|---|
| Vieux Marc -2 bis -4, Vizdrëpp -2 bis -5 | Etikett trägt die Zeile „Barzen-Wewer Arsène“. Das **entspricht dem aktuellen flachen Etikett** (`Fertige Etiquetten/`), ist also kein KI-Fehler; alle anderen Etiketten nennen keinen Personennamen. Brenner klären: Name auf den beiden Etiketten gewollt? |
| Fruucht, Rum, Rum Orange, Sambuca, Wodka -2 bis -4 | Flaschen tragen das Halsband („Hierber Brennerei“), wie auf den echten Fotos. |
| Hunneg Whisky -2 bis -4 | Etikett mit schwarz-goldener Marmorierung und „43 % vol.“; Adresse am Rand abgeschnitten (Etikett um die Flasche gewölbt). |

Eine Datei, die in keinen Platz passte (`Warm Vizdrëpp Tasting Table.png`, altes Etikett), liegt in `fotos-ki-unbenutzt/`.

## 8. Basisfotos (`fotos-basis/`)

Leere Flaschen als Anhang 1 der ChatGPT-Prompts (Tabelle in `FOTO-INVENTAR.md`, Abschnitt 10).
- `schlank-0-5l.png` ist die schlanke Flasche (hoch, kurzer Hals, Glasstopfen) für alle schlanken 0,5-L-Sorten; `rund-0-5l.png` ist jetzt eine **runde** Flasche (Korken) für die runden 0,5-L-Sorten. `rund-0-2l.png` ist identisch mit `rund-0-5l.png`.
- `rund-40ml.png` (Miniatur) ist ungenutzt: 40 ml steht nicht in der Preisliste.
- **Fehlende Basisfotos:** schlank 0,7 L, schlank 1 L. (Für rund 0,2 L liegt eine Datei vor, die aber nur die 0,5-L-Flasche zeigt.)
- **Ersatzbasen sind nur Näherung:** schlank 0,7 L und schlank 1 L nutzen `schlank-0-5l.png`, rund 0,2 L nutzt `rund-0-2l.png` (dasselbe Bild wie 0,5 L); die Zielgröße steht nur als ungefähres Verhältnis im Prompt (`PROMPTS-GROESSEN.md`).
- Zu bestätigen: Verschluss der echten 1-L- und 1,5-L-Flaschen (Prompts übernehmen den Korken des Basisfotos), Verschluss der 0,1-L-Flaschen (Basisfoto: Holzkugel auf Korkschaft).
