// Holzkiste 4 x 0,2 l: Daten und gemessene Koordinaten der Live-Vorschau.
// Alle Pixelwerte beziehen sich auf das Originalfoto fotos-kisten/holzkiste-leer.png (1024 x 1536, Hochformat).
// Gemessen wurde einmal von Hand an Rasterüberlagerungen des Fotos; bei einem neuen Kistenfoto müssen sie neu bestimmt werden.

export const KISTE_PREIS = 58; // immer fest 58 EUR (TTC), unabhängig von der Sortenwahl

// Wählbare Sorten (Ids aus site/data/produkte.js). Dieselbe Sorte darf in mehreren Fächern stehen.
export const KISTE_SORTEN = ['gin', 'rum', 'whisky', 'sambuca', 'wodka', 'limoncello'];

// Vorbelegung (ohne JavaScript das, was die Seite zeigt): Fach 1 bis 4
export const STANDARD_BELEGUNG = ['gin', 'rum', 'whisky', 'wodka'];

// Kistenfoto (nur der im Bild genutzte Ausschnitt wird ausgeliefert: ganze Breite, y von ZUSCHNITT.y bis y + h)
export const KISTE_FOTO = 'fotos-kisten/holzkiste-leer.png';
export const ZUSCHNITT = { x: 0, y: 340, b: 1024, h: 860 };

// Freisteller (tools/flaschen_freistellen.mjs): assets/kiste/<sorte>-0-2l.png, RGBA, auf die Flasche zugeschnitten
export const FREISTELLER_ORDNER = 'assets/kiste';

// Fächer (2 x 2). Blick auf die Schriftseite: vorne = die Seite mit der Schrift "Hierber Brennerei".
// fuss = Mitte der Standfläche der Flasche im Foto (x, y), hoehe = Flaschenhöhe in Fotopixeln.
// Herleitung: Das Bodenviereck der Kiste (innen) wurde im Foto gemessen:
//   vorne unten (F) 445/1105, rechts (R) 905/1030, links (L) 115/1040, hinten (B) 548/950.
//   Die Fachmitten liegen bei 25 % bzw. 75 % entlang beider Kanten (perspektivisch über die Homographie dieses Vierecks).
//   Der Maßstab (Flaschenhöhe bei vollem Maß) wächst linear mit der Bildzeile: Hc(y) = 1,12 * (y - 460).
//   Fach 3 (rechnerisch x = 467) ist um 23 px nach rechts gerückt, damit der linke vordere Pfosten das Etikett nicht zur Hälfte verdeckt.
//   Die Flaschenhöhe ist HOEHEN_FAKTOR * Hc: eine 0,2-l-Flasche ist etwas niedriger als die Kistenhöhe.
export const HOEHEN_FAKTOR = 0.85;
export const FAECHER = [
  { nr: 1, name: 'hinten links', fuss: { x: 299, y: 1038 }, hoehe: 550 },
  { nr: 2, name: 'hinten rechts', fuss: { x: 518, y: 995 }, hoehe: 509 },
  { nr: 3, name: 'vorne links', fuss: { x: 490, y: 1072 }, hoehe: 582 },
  { nr: 4, name: 'vorne rechts', fuss: { x: 693, y: 1033 }, hoehe: 545 },
];
// Zeichenreihenfolge nach Tiefe: weiter hinten zuerst (Fach 2, 1, dann 4, 3)
export const ZEICHENREIHENFOLGE = [2, 1, 4, 3];

// Maske der Teile, die vor den Flaschen liegen: linke Seitenlatte, linker vorderer Pfosten, vordere Latte mit Schrift.
// Ein zusammenhängendes Polygon in Fotopixeln; die Seite legt eine Kopie des Kistenfotos mit diesem Ausschnitt über die Flaschen.
export const VORDERTEILE = [
  [120, 885], [386, 923], [386, 390], [471, 390], [471, 947], [975, 872], [992, 872],
  [992, 1048], [465, 1138], [386, 1108], [120, 1078],
];

// Schatten unter jeder Flasche (weicher Ellipsenverlauf): Breite relativ zur Flaschenhöhe, Deckkraft
export const SCHATTEN = { breite: 0.34, hoehe: 0.07, deckkraft: 0.28 };
