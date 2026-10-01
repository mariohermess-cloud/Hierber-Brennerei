// Erzeugt die ChatGPT-Bildprompts für ALLE Serviervorschläge ohne KI-Bild, die Bilderliste und die Ersatz-Prompts für fehlerhafte Erstbilder.
// Aufruf: node tools/foto_prompts_weitere.mjs
//   Exit-Code 1, wenn eine Anhangdatei fehlt, ein Dateiname doppelt vorkommt, die Bildzahl nicht stimmt, ein Prompt über 200 Wörter hat
//   oder eine Szene/Farbe/Verschluss fehlt.
// Liest (nur lesend): site/data/produkte.js, serviervorschlaege.js, fluessigkeit.js, ki-bilder.js, v2/data/etiketten.json,
//   Fertige Etiquetten/, fotos/, Fotos/ (nur Existenzprüfung), fotos-ki/ (nur Existenzprüfung)
// Schreibt: BILDERLISTE.md, PROMPTS-FOTOS-WEITERE.md, tools/foto-prompts-weitere.json, PROMPTS-FOTOS-ERSATZ.md, tools/foto-prompts-ersatz.json
//
// Benennung (verbindlich): fotos-ki/<sorten-id>-<n>.png. Die Nummer 1 ist das vorhandene Hauptbild (Vorschlag laut ki-bilder.js).
// Die übrigen Karten der Sortenseite werden in Kartenreihenfolge ab 2 nummeriert, das Hauptbild-Kärtchen wird übersprungen.
// Dieselbe Regel nutzt der Build (site/lib/bilder.mjs, site/lib/brand.mjs über site/data/ki-bilder.js: kiNummer).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PRODUKTE, PLATZHALTER } from '../site/data/produkte.js';
import { SERVIERVORSCHLAEGE } from '../site/data/serviervorschlaege.js';
import { FLUESSIGKEIT } from '../site/data/fluessigkeit.js';
import { KI_BILDER, kartenNummern } from '../site/data/ki-bilder.js';
import { STIL, VORLAGE, FOTO_STATT_ETIKETT, RUM_ORANGE_FORM, ADRESSE, woerter } from './foto_gemeinsam.mjs';

const wurzel = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const rel = (...t) => path.join(wurzel, ...t);
const existiert = (p) => fs.existsSync(rel(p));
const fehler = [];
const fail = (m) => fehler.push(m);

const WORTGRENZE = 200;
// Erwartete Zahl fehlender Bilder. Der Auftrag nannte 94 (= 98 Platzhalter minus 4 Startseite); in den Daten stehen aber 121 Vorschläge
// (29 Sorten), davon 29 mit KI-Bild = 92 fehlend. Die 2 weiteren Platzhalter der Seiten sind Etiketten (Rum Orange), keine Serviervorschläge.
const ERWARTET_FEHLEND = 92;
const ERWARTET_VORHANDEN = 29;

// ---------- Sortendaten: Farbe, Verschluss (nach Foto-Prüfung), Hinweise ----------
// farbe: Flüssigkeit in der Flasche in Worten; klare Sorten nimmt das Skript aus fluessigkeit.js (klar = "klar wie Wasser").
const FARBE = {
  rum: 'goldenes Bernstein', 'rum-orange': 'orange-bernsteinfarben', whisky: 'Bernstein', 'hunneg-whisky': 'warmes Goldbernstein',
  'hierber-fruucht': 'warmes, kräftiges Bernstein', 'vieux-marc': 'sehr dunkles, undurchsichtiges Braunglas, der Brand ist nicht zu sehen',
  'vieille-prune': 'klares, kräftiges Goldgelb', 'vieille-pomme': 'klares Goldgelb', hunnegdrepp: 'tiefes Honiggold',
  vizdrepp: 'kräftiges, klares Goldgelb', limoncello: 'leuchtendes Gelbgrün',
};
// Verschluss je Sorte, beschrieben nach den Fotos in fotos/ (flaschen-*.webp, flasche-hunnegdrepp.png, flaschenreihe-theke.jpg)
const KAPPE_SCHLANK = 'klarer Glasstopfen';
const VERSCHLUSS = {
  gin: 'flache, mattsilberne Metallkappe',
  wodka: 'flache, mattsilberne Metallkappe',
  rum: 'flache dunkle Holzkappe, braunes Halsband am Flaschenhals wie im Foto',
  'rum-orange': 'flache dunkle Holzkappe wie bei Rum, kein Halsband',
  'hierber-fruucht': 'flache dunkle Holzkappe',
  whisky: 'schwarze, geriffelte Schraubkappe',
  'hunneg-whisky': 'schwarze, geriffelte Schraubkappe',
  'vieux-marc': 'schwarzer, profilierter Stopfen mit Wulst am Hals',
  sambuca: 'Ausgießer mit zwei dunklen Metallröhrchen, Halsband wie im Foto',
  limoncello: 'Ausgießer mit zwei dunklen Metallröhrchen, Halsband wie im Foto',
  vizdrepp: 'klarer Glasstopfen (flacher Kragen, wie auf Fotos/_DSC3054.jpg)',
};
// Abweichende Flaschenvorlage (statt der Vorlage nach Flaschentyp)
const VORLAGE_SONDER = {
  vizdrepp: { datei: 'Fotos/_DSC3054.jpg', hinweis: 'echte Vizdrëpp-Flasche (breite, nach unten weitende Form, Glasstopfen); nur die Form nutzen, das Etikett auf dem Foto nicht übernehmen' },
};
// Etikett-Alkoholangabe weicht von der Preisliste ab: Wert des Etiketts bleibt, Hinweis an den Nutzer
const ABV_HINWEIS = {
  rum: 'Das Etikett (Foto) nennt 40 % vol., die Preisliste 43 %: den Wert des Etiketts nicht ändern, Brenner klärt (TODO-INHALTE.md, Abschnitt 1).',
  kuerbisdrepp: 'Das Etikett nennt 40 % vol., die Preisliste 45 %: den Wert des Etiketts nicht ändern, Brenner klärt (TODO-INHALTE.md, Abschnitt 1).',
  kiwibeeren: 'Das Etikett nennt 43 % vol., die Preisliste 45 %: den Wert des Etiketts nicht ändern, Brenner klärt (TODO-INHALTE.md, Abschnitt 1).',
};

// Fehler der ersten 29 Bilder (TODO-INHALTE.md, Abschnitt 6). Sorten mit Eintrag bekommen einen Ersatz-Prompt.
const FEHLER = {
  gin: 'Adresszeile verfälscht („L. Hallinger L-6831 Herborn, Tél. 72 7602“), Etikettenmuster weicht ab.',
  wodka: 'Etikett am unteren Rand angeschnitten („www.hierber-brennere…“), Adresse verfälscht („Z. Millewee L-6665 hoıxn“).',
  rum: 'Etikett nur aus Foto abgeleitet: „1-6665“ statt „L-6665“, braunes Halsband fehlt, Etikett heller als im Foto.',
  'rum-orange': 'Erfundenes Etikett (Orange/Creme mit Orangenscheibe), Orangenblätter und -hälften auf dem Tisch stehen nicht im Rezept.',
  sambuca: 'Etikett nur aus Foto abgeleitet; echte Flasche hat Ausgießer mit zwei Metallröhrchen und Halsband, im Bild ein Korken.',
  limoncello: 'Adresse ohne „L-6665“; echte Flasche mit Ausgießer, im Bild ein Korken.',
  whisky: 'Adresse links abgeschnitten („Millewee“ ohne „2,“), Fass im Hintergrund.',
  'hunneg-whisky': 'Kräuterzweige im Hintergrund und Orangenstücke auf dem Tisch stehen nicht im Rezept.',
  kuerbisdrepp: 'Gericht statt Getränk im Fokus; Thymian und Pfeffer auf der Suppe nicht im Rezept; Flaschenhals/Kappe am oberen Bildrand abgeschnitten.',
  lenschouren: 'Gericht statt Getränk im Fokus; Minzblatt nicht im Rezept; Flaschenhals/Kappe am oberen Bildrand abgeschnitten.',
  'vieux-marc': 'Karaffe aus durchsichtigem Bernsteinglas statt sehr dunklem Glas; zusätzliches Glas Vieux Marc.',
  neelchesbiren: 'Flasche und Getränk strohfarben statt klar (Foto zeigt klar); Thymianzweig im Glas nicht im Rezept.',
  vizdrepp: 'Flaschenform weicht ab (hohe schlanke Flasche mit Glasstopfen statt breiter, nach unten weitender Flasche); Rosmarin nicht im Rezept; Getränk blasser als die gemessene Füllung.',
  framboise: 'Minze im Glas, nicht im Rezept; Flaschenhals/Kappe am oberen Bildrand abgeschnitten.',
  kiwibeeren: 'Minze im Glas, nicht im Rezept; Flaschenhals/Kappe abgeschnitten; Alkoholangabe 43 % (Etikett).',
  kraeiderdrepp: 'Minze und Rosmarin im Glas, nicht im Rezept.',
  mirabelle: 'Mirabellenspalten im Glas, nicht im Rezept; Flaschenhals/Kappe abgeschnitten.',
  vullekiischt: 'Vogelbeeren im Glas, nicht im Rezept; Flaschenhals/Kappe abgeschnitten.',
  poire: 'Ingwerwurzel auf dem Tisch, nicht im Rezept; Flaschenhals/Kappe abgeschnitten.',
  'vieille-prune': 'Getränk blasser als die gemessene Füllung; Flaschenhals/Kappe abgeschnitten.',
  kirsch: 'Flaschenhals/Kappe am oberen Bildrand abgeschnitten.',
  quetsch: 'Flaschenhals/Kappe am oberen Bildrand abgeschnitten.',
  'poire-williams': 'Flaschenhals/Kappe am oberen Bildrand abgeschnitten.',
  'vieille-pomme': 'Flaschenhals/Kappe am oberen Bildrand abgeschnitten.',
  hunnegdrepp: 'Flaschenhals/Kappe am oberen Bildrand abgeschnitten.',
  hondsaarsch: 'Flaschenhals/Kappe am oberen Bildrand abgeschnitten.',
  schleiwen: 'Flaschenhals/Kappe am oberen Bildrand abgeschnitten.',
};

// ---------- Szenen: je Sorte ein Eintrag je Karte der Sortenseite (Reihenfolge wie in serviervorschlaege.js) ----------
// Nur Zutaten, Garnituren und Beilagen aus dem Rezept bzw. aus passtZu. Die Glasform aus den Daten muss in der Szene vorkommen (Prüfung unten).
const SZENEN = {
  gin: [
    'Ein Gin-Tonic im großen Ballonglas, bis oben mit klaren Eiswürfeln, dazwischen 3 bis 4 dünne Apfelscheiben, ein frischer Rosmarinzweig steckt im Glas. Das Getränk ist klar und perlt leicht. Daneben unscharf ein kleiner Teller mit Ziegenkäse.',
    'Ein Gin Fizz im Longdrinkglas auf frischem Eis, das Getränk hell, klar und perlend, ohne Garnitur im Glas. Im unscharfen Hintergrund ein Teller Räucherlachs.',
    'Ein Dry Martini in einer vorgekühlten Cocktailschale, ohne Eis, das Getränk klar, ein Streifen Zitronenschale am Glasrand. Daneben unscharf eine kleine Schale Oliven.',
    'Ein gekühltes Dessertglas mit 2 Kugeln Zitronensorbet, darüber klarer Gin geträufelt. Sonst nichts im Glas.',
  ],
  wodka: [
    'Ein reifbeschlagenes Stamperl mit eiskaltem, klarem Wodka, ohne Eis und ohne Garnitur. Im unscharfen Hintergrund ein Teller mit Räucherlachs auf Schwarzbrot.',
    'Ein Wodka-Tonic im hohen Longdrinkglas, bis oben mit Eiswürfeln, 4 dünne Gurkenscheiben im Glas. Das Getränk ist klar und perlt leicht. Im unscharfen Hintergrund eine Schale Sommersalat.',
    'Ein Moscow Mule im Longdrinkglas, bis oben mit Eiswürfeln, eine Limettenspalte am Glasrand. Das Getränk ist hell, leicht trüb und perlt. Im unscharfen Hintergrund ein paar Nachos.',
    'Ein reifbeschlagenes Stamperl mit eiskaltem, klarem Wodka neben einem Holzbrett: 2 Scheiben Schwarzbrot, belegt mit Räucherlachs und einem Klecks Meerrettichcreme.',
  ],
  rum: [
    'Ein Ballonglas mit 4 cl goldbernsteinfarbenem Rum, ohne Eis und ohne Garnitur. Daneben unscharf ein Stück dunkle Schokolade und ein paar Nüsse.',
    'Rum und Ginger im Longdrinkglas, viel Eis, eine ausgedrückte Limettenspalte im Glas. Das Getränk ist helles Goldbernstein und perlt leicht, etwas heller als pur. Im unscharfen Hintergrund ein Burger auf einem Holzbrett.',
    'Ein Daiquiri in einer gekühlten Cocktailschale, ohne Eis und ohne Garnitur, das Getränk hell goldgelb und leicht trüb. Im unscharfen Hintergrund ein Teller Garnelen.',
    'Ein Dessertteller mit 2 längs halbierten, goldbraun gebratenen Bananen, daneben 2 Kugeln Vanilleeis.',
  ],
  'rum-orange': [
    'Ein Tumbler mit einem einzigen großen klaren Eiswürfel, der Rum Orange orange-bernsteinfarben, eine Orangenscheibe am Glasrand. Daneben unscharf ein Stück dunkle Schokolade und ein Mandelgebäck.',
    'Ein Rum-Orange-Highball im Highballglas, viel Eis, eine frische Orangenscheibe im Glas. Das Getränk ist orange-bernsteinfarben und perlt leicht von Sodawasser. Daneben unscharf ein paar Käsegebäck-Stangen.',
    'Ein Rum Orange-Sour im Tumbler auf frischem Eis, das Getränk orange-golden und leicht trüb, ohne Schaum, ein Streifen Zitronenschale am Glasrand. Daneben ein paar Nüsse.',
    'Eine Dessertschale mit leicht glänzenden Orangenfilets, dazu 2 Kugeln Vanilleeis.',
  ],
  whisky: [
    'Ein Nosing-Glas mit 4 cl bernsteinfarbenem Whisky, ohne Eis und ohne Garnitur. Daneben unscharf ein Stück dunkle Schokolade und ein paar Walnüsse.',
    'Ein Whisky-Highball im Highballglas, viel Eis, ein Streifen Zitronenschale im Glas. Das Getränk ist helles Bernstein und perlt leicht. Im unscharfen Hintergrund ein paar Käsegebäck-Stangen.',
    'Ein Old Fashioned im Tumbler mit einem einzigen großen klaren Eiswürfel, der Whisky bernsteinfarben, ein Streifen Orangenschale liegt im Glas. Daneben ein paar Walnüsse auf dem Eichentisch.',
    'Ein Tulpenglas mit 4 cl bernsteinfarbenem Whisky neben einem Holzbrett mit kleinen Stücken gereiftem Comté und einer Handvoll Walnüsse.',
    'Ein Teller mit einem gebratenen Steak, darüber eine helle, cremige Sauce mit groben Pfefferkörnern, daneben ein paar Bratkartoffeln.',
  ],
  'hunneg-whisky': [
    'Ein Tumbler mit einem einzigen großen klaren Eiswürfel, der Hunneg Whisky warmes Goldbernstein, ohne Garnitur. Daneben ein paar Walnüsse und ein Stück dunkle Schokolade.',
    'Ein Teeglas mit heißem, goldgelbem Getränk, eine Zitronenscheibe und eine Zimtstange im Glas, dezenter Dampf, kein Eis. Daneben unscharf ein Lebkuchen.',
    'Ein Highballglas mit Eis, Hunneg Whisky und Ginger Ale, das Getränk goldgelb bis bernsteinfarben und leicht perlend, ein Streifen Orangenschale im Glas. Im unscharfen Hintergrund Käsegebäck.',
    'Ein Tulpenglas mit 4 cl goldbernsteinfarbenem Hunneg Whisky neben einem Holzbrett mit kleinen Stücken Comté, Walnüssen und Trauben.',
  ],
  kirsch: [
    'Ein reifbeschlagenes Tulpenglas mit 4 cl klarem Kirsch, ohne Eis und ohne Garnitur. Daneben unscharf ein Stück Schwarzwälder Kirschtorte.',
    'Ein Kirsch-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, ein Streifen Zitronenschale im Glas. Das Getränk ist klar und perlt leicht. Im unscharfen Hintergrund ein kleiner Salat.',
    'Ein Kirsch-Sour im Tumbler auf frischem Eis, das Getränk hell und leicht trüb, ohne Schaum, ein Streifen Zitronenschale am Glasrand. Daneben unscharf ein paar Nüsse.',
    'Eine Dessertschale mit warm geschmorten dunklen Kirschen in glänzendem Sud, dazu 2 Kugeln Vanilleeis.',
    'Ein Tulpenglas mit 4 cl klarem Kirsch neben 3 Stücken dunkler Schokolade auf einem kleinen Brett.',
  ],
  framboise: [
    'Ein reifbeschlagenes Tulpenglas mit klarem Framboise, ohne Eis und ohne Garnitur. Daneben unscharf ein Stück Käsekuchen.',
    'Ein Framboise-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, ein Minzzweig steckt im Glas. Das Getränk ist klar und perlt leicht. Im unscharfen Hintergrund ein kleiner Salat.',
    'Ein Framboise-Spritz im großen Weinglas auf viel Eis, das Getränk fast klar und perlend, höchstens ein zarter Rosahauch, frische Himbeeren im Glas und ein paar daneben.',
    'Ein Dessertglas mit Panna cotta, darauf frische Himbeeren in leicht rotem Saft.',
  ],
  quetsch: [
    'Ein reifbeschlagenes Tulpenglas mit klarem Quetsch, ohne Eis und ohne Garnitur. Daneben unscharf ein Stück Zwetschgenkuchen.',
    'Ein Quetsch-Sour im Tumbler auf frischem Eis, das Getränk hell und leicht trüb, ohne Schaum, ein Streifen Zitronenschale am Glasrand. Daneben unscharf ein paar Nüsse.',
    'Ein Quetsch-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, eine Zimtstange steckt im Glas. Das Getränk ist klar und perlt leicht. Im unscharfen Hintergrund Käsegebäck.',
    'Eine Dessertschale mit halbierten, glänzend geschmorten Zwetschgen, dazu 2 Kugeln Vanilleeis. Keine Flamme.',
    'Ein Tulpenglas mit 4 cl klarem Quetsch neben einem Holzbrett mit kleinen Stücken kräftigem Bergkäse, Walnüssen und Trauben.',
  ],
  'poire-williams': [
    'Ein reifbeschlagenes Tulpenglas mit klarem Poire Williams, ohne Eis und ohne Garnitur. Daneben eine reife Birne mit Stiel.',
    'Ein Poire Williams Fizz im Longdrinkglas auf frischem Eis, das Getränk hell, leicht trüb und perlend, ohne Garnitur im Glas. Daneben unscharf ein kleiner Salat mit Birne.',
    'Ein Dessertteller mit 1 bis 2 pochierten Birnen mit Stiel in glänzendem Sud, dazu eine Kugel Vanilleeis.',
    'Ein Tulpenglas mit 4 cl klarem Poire Williams neben einem Holzbrett mit mildem Blauschimmelkäse, Birnenspalten und Walnüssen.',
  ],
  mirabelle: [
    'Ein reifbeschlagenes Tulpenglas mit klarer Mirabelle, ohne Eis und ohne Garnitur. Daneben unscharf ein Stück Mirabellentarte.',
    'Ein Mirabelle-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, ein frischer Thymianzweig steckt im Glas. Das Getränk ist klar und perlt leicht. Im unscharfen Hintergrund ein Stück Flammkuchen.',
    'Ein Mirabelle-Spritz im großen Weinglas auf viel Eis, das Getränk hell, fast klar und perlend, ein Thymianzweig im Glas. Im unscharfen Hintergrund ein Stück Flammkuchen.',
    'Eine Dessertschale mit warm geschmorten gelben Mirabellen in glänzendem Sud, dazu 2 Kugeln Vanilleeis.',
    'Ein Tulpenglas mit 4 cl klarer Mirabelle neben einem Holzbrett mit mildem Weichkäse, Mandeln und Weintrauben.',
  ],
  'hierber-fruucht': [
    'Ein Ballonglas mit 4 cl warm bernsteinfarbener Hierber aale Fruucht, ohne Eis und ohne Garnitur. Daneben unscharf ein paar Nüsse.',
    'Hierber aale Fruucht im Tumbler auf einem einzigen großen klaren Eiswürfel, das Getränk warm bernsteinfarben. Daneben ein Stück dunkle Schokolade und ein Stück Hartkäse.',
    'Eine Dessertschale mit 2 bis 3 Kugeln Vanilleeis, leicht angeschmolzen, darüber warm bernsteinfarbene Fruucht geträufelt und gehackte Walnüsse.',
    'Ein Ballonglas mit 4 cl warm bernsteinfarbener Fruucht neben einem Holzbrett mit kräftigem, reifem Käse, Walnüssen und Trauben.',
  ],
  'vieux-marc': [
    'Ein Ballonglas mit 4 cl kräftig bernsteinfarbenem Vieux Marc, ohne Eis und ohne Garnitur. Daneben unscharf eine kleine Tasse Espresso.',
    'Eine kleine Espressotasse mit frischem Espresso und Crema auf einer Untertasse, daneben ein kleines Glas Vieux Marc, kräftig bernsteinfarben, und zwei Mandelkekse. Kein Eis.',
    'Ein Ballonglas mit 4 cl kräftig bernsteinfarbenem Vieux Marc neben einem Holzbrett mit kräftigem Käse, Trauben und Nüssen.',
    'Ein Ballonglas mit 4 cl kräftig bernsteinfarbenem Vieux Marc neben 3 Stücken dunkler Schokolade auf einem kleinen Brett.',
  ],
  'vieille-prune': [
    'Ein Ballonglas mit 4 cl klar goldgelber Vieille Prune, ohne Eis und ohne Garnitur. Daneben unscharf ein Stück Zwetschgenkuchen.',
    'Vieille Prune im Tumbler auf einem einzigen großen klaren Eiswürfel, das Getränk klar goldgelb. Daneben ein paar Nüsse und ein Stück dunkle Schokolade.',
    'Eine Dessertschale mit 2 bis 3 Kugeln Vanilleeis, leicht angeschmolzen, darüber goldgelbe Vieille Prune geträufelt und gehackte Nüsse. Daneben unscharf eine Tasse Espresso.',
    'Ein Ballonglas mit 4 cl klar goldgelber Vieille Prune neben einem Holzbrett mit kräftigem Bergkäse, Walnüssen und Trauben.',
  ],
  'vieille-pomme': [
    'Ein Ballonglas mit 4 cl klar goldgelber Vieille Pomme, ohne Eis und ohne Garnitur. Daneben unscharf ein Stück Apfelkuchen.',
    'Vieille Pomme mit Ginger Beer im Longdrinkglas auf viel Eis, das Getränk klar goldgelb und perlend, eine Limettenspalte am Glasrand. Daneben unscharf ein Stück Apfelkuchen.',
    'Ein Dessertteller mit einem Stück warmer Apfeltarte, dazu eine Kugel Vanilleeis.',
    'Ein Ballonglas mit 4 cl klar goldgelber Vieille Pomme neben einem Holzbrett mit gereiftem Comté, Apfelspalten und Walnüssen.',
  ],
  vizdrepp: [
    'Ein Ballonglas mit 4 cl kräftig goldgelbem Vizdrëpp, ohne Eis und ohne Garnitur. Daneben unscharf ein Stück Apfelkuchen.',
    'Ein Vizdrëpp-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, 3 dünne Apfelscheiben im Glas. Das Getränk ist blass goldgelb schimmernd und perlend.',
    'Ein gekühltes Dessertglas mit 2 Kugeln Apfelsorbet, darüber goldgelber Vizdrëpp gegossen.',
    'Eine Dessertschale mit goldgelb gebratenen Apfelspalten, dazu 2 Kugeln Vanilleeis. Keine Flamme.',
    'Ein Tulpenglas mit 4 cl goldgelbem Vizdrëpp neben einem Holzbrett mit Weichkäse, Apfelspalten und Nüssen.',
  ],
  hunnegdrepp: [
    'Ein Teeglas mit heißem Schwarztee, eine Zitronenscheibe und eine Nelke im Glas, dezenter Dampf, kein Eis. Daneben unscharf ein Lebkuchen.',
    'Ein reifbeschlagenes Tulpenglas mit 4 cl honiggoldenem Hunnegdrëpp, ohne Eis und ohne Garnitur. Daneben unscharf ein paar Walnüsse.',
    'Ein Hunnegdrëpp-Sour im Tumbler auf frischem Eis, das Getränk honiggolden und leicht trüb, ohne Schaum, ein Streifen Zitronenschale am Glasrand. Daneben unscharf ein Käsegebäck.',
    'Ein Dessertglas mit Naturjoghurt, darüber ein Löffel Honig und gehackte Nüsse.',
    'Ein Tulpenglas mit 4 cl honiggoldenem Hunnegdrëpp neben einem Holzbrett mit Ziegenkäse, Walnüssen und Feigen.',
  ],
  poire: [
    'Ein reifbeschlagenes Tulpenglas mit klarer Poire, ohne Eis und ohne Garnitur. Daneben unscharf eine reife Birne.',
    'Poire mit Ginger Beer im Longdrinkglas auf viel Eis, das Getränk klar und perlend, eine Limettenspalte am Glasrand. Im unscharfen Hintergrund Käsegebäck.',
    'Eine Dessertschale mit 2 bis 3 Kugeln Vanilleeis, leicht angeschmolzen, darüber klare Poire geträufelt und gehackte Nüsse.',
    'Ein Tulpenglas mit 4 cl klarer Poire neben einem Holzbrett mit mildem Blauschimmelkäse, Birnenspalten und Walnüssen.',
  ],
  neelchesbiren: [
    'Ein reifbeschlagenes Tulpenglas mit klarem Neelchesbiren, ohne Eis und ohne Garnitur. Daneben unscharf ein Mandelgebäck.',
    'Ein Neelchesbiren-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, ein Streifen Zitronenschale im Glas. Das Getränk ist klar und perlt leicht. Im unscharfen Hintergrund ein kleiner Salat.',
    'Eine Dessertschale mit 2 bis 3 Kugeln Vanilleeis, leicht angeschmolzen, darüber klarer Neelchesbiren geträufelt und gehackte Nüsse. Daneben unscharf eine Tasse Espresso.',
    'Ein Tulpenglas mit 4 cl klarem Neelchesbiren neben einem Holzbrett mit mildem Käse, Birnenspalten und Nüssen.',
  ],
  lenschouren: [
    'Ein reifbeschlagenes Tulpenglas mit klarem Lënschouren, ohne Eis und ohne Garnitur. Daneben unscharf ein Mandelgebäck.',
    'Ein Lënschouren-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, ein Streifen Zitronenschale im Glas. Das Getränk ist klar und perlt leicht. Im unscharfen Hintergrund ein kleiner Salat.',
    'Eine gekühlte Dessertschale mit 2 bis 3 Kugeln Vanilleeis, leicht angeschmolzen, darüber gehackte Nüsse. Daneben unscharf eine Tasse Espresso. Kein Longdrink.',
    'Ein Tulpenglas mit 4 cl klarem Lënschouren neben einem Holzbrett mit mildem Käse, Nüssen und Trauben.',
  ],
  kiwibeeren: [
    'Ein reifbeschlagenes Tulpenglas mit klarem Kiwibeeren-Brand, ohne Eis und ohne Garnitur. Daneben unscharf ein Stück weiße Schokolade.',
    'Ein Kiwibeeren-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, eine Limettenscheibe im Glas. Das Getränk ist klar und perlt leicht. Im unscharfen Hintergrund ein kleiner Salat.',
    'Ein Kiwibeeren-Spritz im großen Weinglas auf viel Eis, das Getränk fast klar und perlend, eine Limettenscheibe im Glas. Im unscharfen Hintergrund Käsegebäck.',
    'Ein Dessertglas mit Naturjoghurt, darüber ein Löffel Honig und gehackte Nüsse.',
  ],
  hondsaarsch: [
    'Ein reifbeschlagenes Tulpenglas mit klarem Hondsaarsch, ohne Eis und ohne Garnitur. Daneben unscharf eine Tasse Espresso.',
    'Ein Hondsaarsch-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, ein Streifen Orangenschale im Glas. Das Getränk ist klar und perlt leicht. Im unscharfen Hintergrund ein heller Salat.',
    'Eine Dessertschale mit 2 bis 3 Kugeln Vanilleeis, leicht angeschmolzen, darüber klarer Hondsaarsch geträufelt und gehackte Nüsse. Daneben unscharf eine Tasse Espresso.',
    'Ein Tulpenglas mit 4 cl klarem Hondsaarsch neben einem Holzbrett mit kräftigem Käse, Walnüssen und Trauben.',
  ],
  vullekiischt: [
    'Ein reifbeschlagenes Tulpenglas mit klarem Vullekiischt, ohne Eis und ohne Garnitur. Daneben unscharf ein Stück Wildpastete.',
    'Ein Vullekiischt-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, ein Streifen Zitronenschale im Glas. Das Getränk ist klar und perlt leicht. Im unscharfen Hintergrund ein kleiner Salat.',
    'Ein Stamperl mit klarem, gekühltem Vullekiischt neben einem Holzbrett: Scheiben Wildpastete auf 2 Scheiben Landbrot, dazu ein Löffel Preiselbeeren.',
    'Eine Dessertschale mit 2 bis 3 Kugeln Vanilleeis, leicht angeschmolzen, darüber klarer Vullekiischt geträufelt und gehackte Nüsse. Daneben unscharf eine Tasse Espresso.',
  ],
  schleiwen: [
    'Ein reifbeschlagenes Tulpenglas mit klarem Schléiwen, ohne Eis und ohne Garnitur. Daneben unscharf ein Stück kräftiger Käse.',
    'Ein Schléiwen-Sour im Tumbler auf frischem Eis, das Getränk hell und leicht trüb, ohne Schaum, ein Streifen Zitronenschale am Glasrand. Daneben unscharf ein paar Nüsse.',
    'Ein Saucenkännchen mit dunkler, glänzender Wildsauce neben einem Teller mit Scheiben Rehrücken und einem Knödel.',
    'Ein Tulpenglas mit 4 cl klarem Schléiwen neben einem Holzbrett mit kräftigem Bergkäse, Walnüssen und Trauben.',
  ],
  kuerbisdrepp: [
    'Ein reifbeschlagenes Tulpenglas mit klarem Kürbisdrëpp, ohne Eis und ohne Garnitur. Daneben unscharf ein Schälchen Kürbiskerne.',
    'Kürbisdrëpp mit Ginger Beer im Longdrinkglas auf viel Eis, das Getränk hell, leicht trüb und perlend, eine Limettenspalte am Glasrand. Im unscharfen Hintergrund Käsegebäck.',
    'Ein tiefer Suppenteller mit orangefarbener, cremiger Kürbissuppe, eine Spirale Sahne, geröstete Kürbiskerne obenauf. Daneben eine Scheibe Kürbiskernbrot. Dampf nur ganz dezent, kein Eis.',
    'Ein Tulpenglas mit 4 cl klarem Kürbisdrëpp neben einem Holzbrett mit kräftigem Hartkäse, gerösteten Kürbiskernen und Walnüssen.',
  ],
  grain: [
    'Ein reifbeschlagenes Stamperl mit eiskaltem, klarem Grain, ohne Eis und ohne Garnitur. Daneben unscharf ein paar Gewürzgurken.',
    'Grain mit Apfelsaft im Longdrinkglas auf viel Eis, das Getränk naturtrüb goldgelb, eine Apfelscheibe am Glasrand. Im unscharfen Hintergrund ein Käsebrot.',
    'Ein Stamperl mit klarem, gekühltem Grain neben einem Holzbrett: luftgetrockneter Schinken, 2 Scheiben Bauernbrot und 3 Gewürzgurken.',
  ],
  kraeiderdrepp: [
    'Ein reifbeschlagenes Tulpenglas mit klarem Kräiderdrëpp, ohne Eis und ohne Garnitur. Daneben unscharf ein Stück kräftiger Käse.',
    'Ein Kräiderdrëpp-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, 4 dünne Gurkenscheiben im Glas. Das Getränk ist klar und perlt leicht. Im unscharfen Hintergrund ein kleiner Salat.',
    'Kräiderdrëpp mit Ginger Beer im Longdrinkglas auf viel Eis, das Getränk hell, leicht trüb und perlend, eine Limettenspalte am Glasrand. Im unscharfen Hintergrund Grillgemüse.',
    'Ein Stamperl mit klarem, gekühltem Kräiderdrëpp vor einem unscharfen Teller mit Schweinebraten und Kartoffeln.',
  ],
  sambuca: [
    'Ein kleines Likörglas mit klarem Sambuca, 3 Kaffeebohnen darin. Daneben eine Tasse Espresso und ein Mandelgebäck. Kein Eis.',
    'Ein Tumbler mit einem einzigen großen klaren Eiswürfel, klarer Sambuca, ohne Garnitur. Daneben ein Mandelgebäck.',
    'Eine Espressotasse mit frischem Espresso und Crema auf einer Untertasse, daneben ein kleines Glas klarer Sambuca und ein Mandelgebäck. Kein Eis.',
    'Eine Dessertschale mit 2 bis 3 Kugeln Vanilleeis, leicht angeschmolzen, darüber klarer Sambuca geträufelt und gehackte Mandeln.',
  ],
  limoncello: [
    'Ein reifbeschlagenes Stamperl mit eiskaltem, leuchtend gelbgrünem Limoncello, ohne Eis und ohne Garnitur. Daneben unscharf ein Zitronengebäck.',
    'Ein Limoncello-Spritz im großen Weinglas auf viel Eis, das Getränk hellgelb und perlend, ein frischer Minzzweig im Glas. Daneben unscharf ein paar Antipasti.',
    'Ein Limoncello-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, ein Minzzweig steckt im Glas. Das Getränk ist hellgelb und perlt leicht. Im unscharfen Hintergrund ein Sommersalat.',
    'Ein gekühltes Dessertglas mit 2 Kugeln Zitronensorbet, darüber leuchtend gelber Limoncello gegossen.',
  ],
};

// ---------- Daten laden ----------
const etik = JSON.parse(fs.readFileSync(rel('v2', 'data', 'etiketten.json'), 'utf8')).etiketten;

function sortenInfo(p) {
  const fl = FLUESSIGKEIT[p.id];
  if (!fl) { fail(`${p.id}: kein Eintrag in fluessigkeit.js`); return null; }
  const farbe = fl.klar ? 'klar wie Wasser' : FARBE[p.id];
  if (!farbe) { fail(`${p.id}: keine Farbbeschreibung (fluessigkeit.js: ${fl.farbe}, nicht klar)`); return null; }
  const typ = (etik.find((e) => e.sorte === p.id && e.verwendet) || PLATZHALTER[p.id] || {}).flaschentyp || (PLATZHALTER[p.id] || {}).typ;
  if (!typ || !VORLAGE[typ]) { fail(`${p.id}: kein Flaschentyp in etiketten.json`); return null; }
  const flach = etik.find((e) => e.sorte === p.id && e.variante === 'standard' && e.art === 'flach' && e.verwendet);
  let art, anhang1, anhang2;
  if (flach) { art = 'flach'; anhang1 = (VORLAGE_SONDER[p.id] || VORLAGE[typ]).datei; anhang2 = `Fertige Etiquetten/${flach.datei}`; }
  else if (FOTO_STATT_ETIKETT[p.id]) { art = 'foto'; anhang1 = FOTO_STATT_ETIKETT[p.id]; anhang2 = null; }
  else if (p.id === 'rum-orange') { art = 'neutral'; anhang1 = RUM_ORANGE_FORM; anhang2 = null; }
  else { fail(`${p.id}: weder flaches Etikett noch Foto`); return null; }
  for (const f of [anhang1, anhang2].filter(Boolean)) if (!existiert(f)) fail(`${p.id}: Anhang fehlt: ${f}`);
  const verschluss = VERSCHLUSS[p.id] || (typ === 'schlank' ? KAPPE_SCHLANK : null);
  if (!verschluss) { fail(`${p.id}: kein Verschluss beschrieben`); return null; }
  return { fl, farbe, typ, art, anhang1, anhang2, verschluss };
}

// ---------- Prompt ----------
function baueFlasche(p, s, v) {
  const gefaess = s.typ === 'karaffe' ? 'Karaffe' : 'Flasche';
  const neben = v.typ === 'In der Küche / Dessert' ? 'dem Gericht (Hauptmotiv)' : v.typ === 'Zum Essen' ? 'dem Essen und dem Glas' : 'dem Getränk';
  const voll = `Die ${gefaess} steht vollständig im Bild neben ${neben}: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum.`;
  if (s.art === 'flach') {
    return `${voll} Form aus Anhang 1 ohne dessen Etikett, Verschluss: ${s.verschluss}. Etikett aus Anhang 2 exakt übernehmen, kein Buchstabe anders, um die halbe ${gefaess} gelegt, Rundung sichtbar. Adresszeile fest: „${ADRESSE}“. Alkoholangabe wie in Anhang 2. Brand in der ${gefaess}: ${s.farbe}.`;
  }
  if (s.art === 'foto') {
    return `${voll} Die große 0,5-L-Flasche aus Anhang 1 exakt wie auf dem Foto: Form, Etikett, Verschluss (${s.verschluss}), kein Buchstabe anders, Etikett um die halbe Flasche gelegt, Rundung sichtbar. Adresszeile fest: „${ADRESSE}“. Alkoholangabe wie im Foto. Brand in der Flasche: ${s.farbe}.`;
  }
  return `${voll} Form und Verschluss wie die große Flasche in Anhang 1 (${s.verschluss}), aber ohne deren Etikett: stattdessen ein neutrales, leeres weißes Etikett ohne jeden Text und jede Grafik, um die halbe Flasche gelegt, Rundung sichtbar. Brand in der Flasche: ${s.farbe}.`;
}
const REGEL = 'Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.';
function bauePrompt(p, s, v, szene) {
  const negativ = s.art === 'neutral' ? 'Negativ: Text oder Grafik auf dem Etikett, zweite Flasche, Fantasieschrift.' : 'Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift.';
  return [`Erstelle ein Foto. ${STIL}`, `Szene: ${szene}`, `Flasche: ${baueFlasche(p, s, v)}`, REGEL, negativ].join('\n');
}

function baueHinweise(p, s, v, ersatz) {
  const h = [];
  h.push('Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.');
  if (s.art === 'flach') h.push(`Etikett mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „${ADRESSE}“.`);
  else if (s.art === 'foto') h.push(`Etikett mit dem Foto in Anhang 1 vergleichen und die Adresszeile prüfen: „${ADRESSE}“. Verschluss: ${s.verschluss}.`);
  else h.push('Etikett muss komplett leer sein (kein Text, keine Grafik). Im Bild darf nichts Erfundenes auf der Flasche stehen.');
  if (s.art !== 'neutral') h.push('Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.');
  h.push(`Verschluss prüfen: ${s.verschluss}.`);
  h.push(`Nur Rezept-Zutaten im Bild: ${v.zutaten.map(([, z]) => z).join('; ')}. Beilagen nur aus: ${v.passtZu.join(', ')}.`);
  if (v.typ === 'In der Küche / Dessert') h.push('Das Gericht ist Hauptmotiv, die Flasche steht daneben und ist vollständig sichtbar.');
  if (v.typ === 'Zum Essen') h.push('Neben dem Essen muss ein Glas mit dem Brand zu sehen sein.');
  if (s.fl.geschaetzt) h.push(`Flüssigkeitsfarbe ist in den Daten nur geschätzt (fluessigkeit.js: ${s.fl.farbe}); mit dem echten Produkt abgleichen.`);
  if (ABV_HINWEIS[p.id]) h.push(ABV_HINWEIS[p.id]);
  if (s.typ === 'karaffe') h.push('Anhang 1 ist ein Gruppenfoto: nur die dunkle Karaffe vorn links als Formvorlage nutzen, deren Etikett nicht übernehmen.');
  if (s.art === 'neutral') h.push('Für Rum Orange gibt es weder Etikett noch Foto: das Etikett bleibt bewusst leer, das echte Etikett muss später im Bildeditor eingesetzt werden (Anhang 1 zeigt Rum, nur Flaschenform und Holzkappe nutzen).');
  if (p.id === 'rum-orange') h.push('Verschluss (Holzkappe) ist angenommen wie bei Rum, es gibt kein Foto der Flasche.');
  if (p.id === 'hunneg-whisky') h.push('Verschluss (schwarze Schraubkappe) ist wie beim Whisky angenommen, es gibt kein Foto der Hunneg-Whisky-Flasche.');
  if (p.id === 'vizdrepp') h.push('Anhang 1 ist hier die echte Vizdrëpp-Flasche aus Fotos/ (breite, nach unten weitende Form statt der runden Standardflasche); ihr Etikett nicht übernehmen.');
  if (p.id === 'sambuca' || p.id === 'limoncello') h.push('Auf der Sortenseite steht das Etikett als „Platzhalter-Etikett – das echte Etikett folgt“; die Flasche im Bild zeigt das Foto-Etikett aus fotos/.');
  return h;
}

// ---------- Alle Karten durchgehen ----------
const alle = []; // alle Karten mit Zuordnung
const weitere = [];
const vorhanden = [];
const ersatz = [];
for (const p of PRODUKTE) {
  const liste = SERVIERVORSCHLAEGE[p.id];
  const szenen = SZENEN[p.id];
  const s = sortenInfo(p);
  if (!liste) { fail(`${p.id}: keine Serviervorschläge`); continue; }
  if (!szenen || szenen.length !== liste.length) { fail(`${p.id}: ${szenen ? szenen.length : 0} Szenen für ${liste.length} Karten`); continue; }
  if (!s) continue;
  const nummern = kartenNummern(p.id, liste);
  if (!nummern) { fail(`${p.id}: Hauptbild-Vorschlag „${KI_BILDER[p.id]}“ nicht in serviervorschlaege.js`); continue; }
  liste.forEach((v, i) => {
    const glasOk = v.glas.toLowerCase().split(' oder ').some((g) => szenen[i].toLowerCase().includes(g));
    if (!glasOk) fail(`${p.id} Karte ${i + 1}: Glasform „${v.glas}“ steht nicht in der Szene`);
    const n = nummern[i];
    const dateiname = `fotos-ki/${p.id}-${n}.png`;
    const prompt = bauePrompt(p, s, v, szenen[i]);
    const w = woerter(prompt);
    if (w > WORTGRENZE) fail(`${p.id}-${n}: Prompt hat ${w} Wörter (Grenze ${WORTGRENZE})`);
    const hauptbild = n === 1;
    const e = {
      id: `${p.id}-${n}`, sorteId: p.id, sorte: p.name, kartennummer: i + 1, anzahlKarten: liste.length, vorschlag: v.name, typ: v.typ, glas: v.glas,
      dateiname, anhang1: s.anhang1, anhang2: s.anhang2, anhang1Hinweis: s.art === 'foto' ? 'Produktfoto (Form, Etikett, Verschluss)' : s.art === 'neutral' ? 'nur Flaschenform und Holzkappe (Rum-Foto), Etikett nicht übernehmen' : (VORLAGE_SONDER[p.id] || VORLAGE[s.typ]).hinweis,
      etikettArt: s.art, woerter: w, prompt, hinweise: baueHinweise(p, s, v),
    };
    alle.push(e);
    if (hauptbild) {
      if (!existiert(dateiname)) fail(`${dateiname}: vorhandenes Hauptbild fehlt in fotos-ki/`);
      vorhanden.push({ ...e, fehler: FEHLER[p.id] || null });
      if (FEHLER[p.id]) ersatz.push({ ...e, fehler: FEHLER[p.id], hinweise: baueHinweise(p, s, v) });
    } else weitere.push(e);
  });
}

// ---------- Prüfungen ----------
const namen = new Map();
for (const e of alle) {
  if (namen.has(e.dateiname)) fail(`Dateiname doppelt: ${e.dateiname} (${namen.get(e.dateiname)} und ${e.id})`);
  namen.set(e.dateiname, e.id);
}
if (weitere.length !== ERWARTET_FEHLEND) fail(`Zahl fehlender Bilder ist ${weitere.length}, erwartet ${ERWARTET_FEHLEND}`);
if (vorhanden.length !== ERWARTET_VORHANDEN) fail(`Zahl vorhandener Bilder ist ${vorhanden.length}, erwartet ${ERWARTET_VORHANDEN}`);
for (const id of Object.keys(FEHLER)) if (!KI_BILDER[id]) fail(`FEHLER: unbekannte Sorte ${id}`);
for (const id of Object.keys(KI_BILDER)) if (!existiert(`fotos-ki/${id}-1.png`)) fail(`fotos-ki/${id}-1.png fehlt`);
for (const e of [...weitere, ...ersatz]) for (const f of [e.anhang1, e.anhang2].filter(Boolean)) if (!existiert(f)) fail(`${e.id}: Anhang fehlt: ${f}`);
// fotos-ki/ darf keine Nummer enthalten, die das Skript nicht kennt (verhindert Verwechslungen mit Nebendateien)
for (const f of fs.readdirSync(rel('fotos-ki'))) if (/\.png$/.test(f) && !namen.has(`fotos-ki/${f}`) && !/^.+-\d+\.png$/.test(f)) fail(`fotos-ki/${f}: Name folgt nicht der Regel <sorten-id>-<n>.png`);

if (fehler.length) {
  console.error('FEHLER:\n' + fehler.map((m) => ' - ' + m).join('\n'));
  process.exit(1);
}

// ---------- Ausgabe: PROMPTS-FOTOS-WEITERE.md / PROMPTS-FOTOS-ERSATZ.md ----------
const a1 = (e) => `\`${e.anhang1}\``;
const a2 = (e) => (e.anhang2 ? `\`${e.anhang2}\`` : e.etikettArt === 'neutral' ? 'entfällt (Etikett bleibt leer; es gibt kein Etikett)' : 'entfällt (Anhang 1 liefert Form und Etikett)');
const abschnitt = (e, nr, ersatzModus) => `---

## ${nr}. ${e.sorte}: ${e.vorschlag}

- **Sorte:** ${e.sorte}
- **Karte auf der Sortenseite:** Nr. ${e.kartennummer} von ${e.anzahlKarten}, „${e.vorschlag}“ (${e.typ})
- **Ergebnis speichern als:** \`${e.dateiname}\`${ersatzModus ? ' (ersetzt das vorhandene Bild)' : ''}
${ersatzModus ? `- **Was am alten Bild falsch war:** ${e.fehler}\n` : ''}- **Anhang 1 (${e.anhang1Hinweis}):** ${a1(e)}
- **Anhang 2 (Etikett):** ${a2(e)}
- **Prompt:** ${e.woerter} Wörter

\`\`\`
${e.prompt}
\`\`\`

**Prüfen:**
${e.hinweise.map((h) => `- ${h}`).join('\n')}
`;

const kopfSchritte = `## So geht es in 5 Schritten

1. **Neuen Chat öffnen** (ChatGPT mit Bildgenerierung). Pro Bild immer einen **neuen** Chat, sonst kippt der Stil.
2. **Anhänge:** Anhang 1 = Flaschenvorlage, Anhang 2 = Etikett der Sorte (genaue Dateinamen stehen beim Bild). Bei Rum, Limoncello, Sambuca und Rum Orange gibt es nur Anhang 1.
3. **Prompt einfügen:** den Text im Kasten kopieren und mit den Anhängen absenden.
4. **Ergebnis prüfen** (Liste unter dem Kasten): Flasche vollständig, Etikett Wort für Wort, nur Rezept-Zutaten, Glas und Farbe.
5. **Speichern** als PNG, 4:3 (1448×1086 px wie bisher, andere 4:3-Größen sind ok), genau unter dem Dateinamen aus dem Abschnitt, in den Ordner \`fotos-ki/\`. Danach baut \`node build.mjs\` das Bild automatisch an die richtige Karte.
`;
const stilBlock = `## Stilblock (gemeinsam für alle Bilder)

Derselbe Block wie in \`PROMPTS-FOTOS.md\`, damit alle Bilder zusammenpassen. Er steht in jedem Prompt vollständig drin.

\`\`\`
${STIL}
\`\`\`

Feste Adresszeile des Etiketts (in allen Prompts mit Etikett): \`${ADRESSE}\`
`;

const mdW = [];
mdW.push(`# Prompts für KI-Fotos (ChatGPT): weitere Serviervorschläge

Erzeugt mit \`node tools/foto_prompts_weitere.mjs\`. Nicht von Hand ändern, sondern das Skript anpassen und neu laufen lassen.
**${weitere.length} Bilder** für alle Serviervorschläge der Sortenseiten, für die noch kein KI-Bild existiert (die ${vorhanden.length} Hauptbilder \`<sorten-id>-1.png\` gibt es schon, siehe \`PROMPTS-FOTOS.md\`). Die Liste zum Abhaken steht in \`BILDERLISTE.md\`, verbesserte Prompts für fehlerhafte Erstbilder in \`PROMPTS-FOTOS-ERSATZ.md\`.

**Benennung:** \`fotos-ki/<sorten-id>-<n>.png\`. Die Nummern 2, 3, 4 ... gehören zu den Karten der Sortenseite in der Reihenfolge der Karten, die Karte des Hauptbilds (\`-1\`) wird übersprungen. Beispiel Wodka: \`wodka-1.png\` zeigt Karte 2; Karte 1 wird \`wodka-2.png\`, Karte 3 \`wodka-3.png\`, Karte 4 \`wodka-4.png\`.

${kopfSchritte}
${stilBlock}
**Verbesserungen gegenüber den ersten 29 Prompts** (in jedem Prompt enthalten): Flasche vollständig im Bild und nichts angeschnitten; nur Zutaten und Beilagen aus dem Rezept bzw. \`passtZu\`; Etikettentext exakt wie im Anhang inklusive fester Adresszeile; Verschluss der Sorte nach den Fotos aus \`fotos/\`; Flüssigkeitsfarbe nach \`site/data/fluessigkeit.js\`; bei Gerichten ist das Gericht Hauptmotiv, bei „Zum Essen“ steht ein Glas Brand daneben.
`);
weitere.forEach((e, i) => mdW.push(abschnitt(e, i + 1, false)));
mdW.push(`---

## Übersicht

| Nr | Sorte | Karte | Dateiname |
|---|---|---|---|
${weitere.map((e, i) => `| ${i + 1} | ${e.sorte} | ${e.vorschlag} | \`${e.dateiname}\` |`).join('\n')}
`);

const mdE = [];
mdE.push(`# Ersatz-Prompts für fehlerhafte Erstbilder (ChatGPT)

Erzeugt mit \`node tools/foto_prompts_weitere.mjs\`. Nicht von Hand ändern.
Für **${ersatz.length} der ${vorhanden.length}** vorhandenen Hauptbilder (\`fotos-ki/<sorten-id>-1.png\`) nennt \`TODO-INHALTE.md\` (Abschnitt 6) echte Fehler: verfälschte Adresse, angeschnittenes oder erfundenes Etikett, fehlender Verschluss, abgeschnittene Flasche, falsche Zutaten, Gericht ohne Getränk. Hier stehen verbesserte Prompts mit denselben Verbesserungen wie in \`PROMPTS-FOTOS-WEITERE.md\`.
Das neue Bild **ersetzt** das vorhandene (gleicher Dateiname, Nutzer überschreibt die Datei). Nicht aufgeführt, weil ohne Befund: ${vorhanden.filter((e) => !e.fehler).map((e) => e.sorte).join(', ')}.

${kopfSchritte}
${stilBlock}`);
ersatz.forEach((e, i) => mdE.push(abschnitt(e, i + 1, true)));
mdE.push(`---

## Übersicht

| Nr | Sorte | Karte | Dateiname | Fehler am alten Bild |
|---|---|---|---|---|
${ersatz.map((e, i) => `| ${i + 1} | ${e.sorte} | ${e.vorschlag} | \`${e.dateiname}\` | ${e.fehler} |`).join('\n')}
`);

// ---------- BILDERLISTE.md ----------
const proN = {};
for (const e of weitere) { const n = Number(e.id.match(/-(\d+)$/)[1]); proN[n] = (proN[n] || 0) + 1; }
const wellen = Object.keys(proN).map(Number).sort((x, y) => x - y).map((n) => `\`-${n}\`: ${proN[n]}`).join(', ');
const mdB = [];
mdB.push(`# Bilderliste: was noch fehlt

Erzeugt mit \`node tools/foto_prompts_weitere.mjs\`. Nicht von Hand ändern; den Status (Spalte rechts) trägt man in einer Kopie ein oder hakt auf Papier ab.

## Kurzanleitung

- **${weitere.length} weitere Bilder** fehlen, **${vorhanden.length}** sind schon da (je Sorte \`-1\`, siehe unten).
- Ablauf je Bild: Prompt aus \`PROMPTS-FOTOS-WEITERE.md\` kopieren, die beiden Anhänge aus der Tabelle anhängen (neuer Chat, ChatGPT Bildgenerierung), Ergebnis prüfen, als PNG 4:3 (1448×1086 px) unter dem **Dateinamen aus der Tabelle** in \`fotos-ki/\` speichern.
- **Reihenfolge nach Wichtigkeit:** je Sorte zuerst die Datei mit \`-2\` (alle ${proN[2]} Sorten), danach alle \`-3\`, dann \`-4\`, \`-5\`. Stückzahl je Nummer: ${wellen}. In der Tabelle nach der Endung des Dateinamens suchen.
- Optional vorher die ${ersatz.length} fehlerhaften Erstbilder ersetzen: \`PROMPTS-FOTOS-ERSATZ.md\`.
- Bilder, die nicht per KI gehen (Maische, Abfüllen, Karte, Rum-Orange-Etikett): letzter Abschnitt.

**Benennungsregel:** \`fotos-ki/<sorten-id>-<n>.png\`. \`-1\` ist das vorhandene Hauptbild der Sorte. Die weiteren Karten der Sortenseite werden in Kartenreihenfolge ab 2 nummeriert, ohne die Karte des Hauptbilds.
Beispiel Wodka: Karten 1 bis 4, \`wodka-1.png\` zeigt Karte 2 (Wodka-Tonic). Karte 1 (Wodka eiskalt) wird \`wodka-2.png\`, Karte 3 (Moscow Mule) \`wodka-3.png\`, Karte 4 (Wodka zu Räucherlachs) \`wodka-4.png\`.

## Tabelle der ${weitere.length} fehlenden Bilder

Anhang 1 = Flaschenvorlage, Anhang 2 = Etikett (Dateien liegen im Repo, Pfade ab Repo-Wurzel). Status leer = offen.

| Nr | Sorte | Karte auf der Sortenseite (Titel) | Typ | Dateiname | Anhang 1 | Anhang 2 | Status |
|---|---|---|---|---|---|---|---|
${weitere.map((e, i) => `| ${i + 1} | ${e.sorte} | ${e.kartennummer}. ${e.vorschlag} | ${e.typ} | \`${e.dateiname}\` | \`${e.anhang1}\` | ${e.anhang2 ? `\`${e.anhang2}\`` : 'entfällt'} |  |`).join('\n')}

## Bereits vorhanden (${vorhanden.length})

Fehler laut \`TODO-INHALTE.md\` Abschnitt 6; bei „ja“ gibt es einen Ersatz-Prompt in \`PROMPTS-FOTOS-ERSATZ.md\`.

| Sorte | Dateiname | Vorschlag (Karte) | Bild hat Fehler laut TODO-INHALTE.md Abschnitt 6? |
|---|---|---|---|
${vorhanden.map((e) => `| ${e.sorte} | \`${e.dateiname}\` | ${e.kartennummer}. ${e.vorschlag} | ${e.fehler ? `ja: ${e.fehler}` : 'nein'} |`).join('\n')}

## Braucht ein echtes Foto (nicht per KI)

Diese Platzhalter der Startseite sollen nicht per KI entstehen. Es gibt dazu keinen Prompt.

| Stelle | Was genau fotografiert bzw. geliefert werden muss |
|---|---|
| Startseite, Schritt „Maische“ | Foto der angesetzten Maische (vergorene Obstmaische im Gärbehälter oder Fass). Als Foto für „Wie wir brennen“, Schritt 2. |
| Startseite, Schritt „Abfüllen“ | Foto vom Abfüllen der Flaschen (Abfüllung von Brand in Flaschen am Hof). Schritt 5 von „Wie wir brennen“. |
| Startseite, „Kartenansicht“ | Kartenbild der Lage (2, Millewee, L-6665 Herborn) als statisches Bild; bisher nur Link zu OpenStreetMap. Nutzungsrechte der Karte klären. |
| Rum-Orange-Etikett | Das echte Etikett (Druckdatei) bzw. ein Foto der Flasche Hierber Rum Orange. Der Platzhalter erscheint auf der Startseite (Karte), auf der Sortenseite Rum Orange und in der Rum-Karte. |
`);

// ---------- JSON ----------
const jsonFeld = (e, extra = {}) => ({
  id: e.id, sorteId: e.sorteId, sorte: e.sorte, kartennummer: e.kartennummer, vorschlag: e.vorschlag, typ: e.typ, dateiname: e.dateiname,
  anhang1: e.anhang1, anhang2: e.anhang2, woerter: e.woerter, prompt: e.prompt, hinweise: e.hinweise, ...extra,
});
fs.writeFileSync(rel('BILDERLISTE.md'), mdB.join('\n'));
fs.writeFileSync(rel('PROMPTS-FOTOS-WEITERE.md'), mdW.join('\n'));
fs.writeFileSync(rel('PROMPTS-FOTOS-ERSATZ.md'), mdE.join('\n'));
fs.writeFileSync(rel('tools', 'foto-prompts-weitere.json'), JSON.stringify(weitere.map((e) => jsonFeld(e)), null, 2) + '\n');
fs.writeFileSync(rel('tools', 'foto-prompts-ersatz.json'), JSON.stringify(ersatz.map((e) => jsonFeld(e, { fehler: e.fehler })), null, 2) + '\n');

const maxW = Math.max(...[...weitere, ...ersatz].map((e) => e.woerter));
console.log(`OK: ${weitere.length} Prompts für fehlende Bilder + ${ersatz.length} Ersatz-Prompts (längster: ${maxW} Wörter), ${vorhanden.length} Bilder vorhanden, keine doppelten Dateinamen, alle Anhang-Dateien vorhanden.`);
