// Neu erzeugte Produktflaschen (Hochformat 2:3, heller neutraler Studiogrund) mit dem aktuellen Etikett statt der Vektor-Flasche.
// Quelle: fotos-flaschen/, Ergebnis der ChatGPT-Läufe (PROMPTS-FLASCHEN.md, PROMPTS-GROESSEN.md); den Ordner füllt der Nutzer.
//   Hauptbild einer Sorte (= 0,5 L): <sorten-id>.png, gleichwertig <sorten-id>-0-5l.png (existieren beide, gilt <sorten-id>.png).
//   Größenbilder: <sorten-id>-<größe>.png mit Größe 0-1l, 0-2l, 0-7l, 1-0l, 1-5l (0-5l siehe oben); die Sortenseite tauscht sie beim Wählen der Größe ein.
// Fehlt die Datei, zeigt die Seite die Vektor-Flasche (Fallback). Die Fotos in Fotos/ und fotos/ werden NICHT ausgeliefert, sie sind nur Formvorlage (Anhang 1).
// Zum Testen kann HB_FLASCHEN_ZUSATZ auf ein Verzeichnis außerhalb des Repos zeigen: Dateien dort haben Vorrang.
export const FLASCHEN_ORDNER = 'fotos-flaschen';
// Festes Format aller Flaschenbilder (Breite x Höhe in Pixel) laut Prompt; Flasche mittig, Standfläche bei ca. 90 % der Höhe, Stopfenoberkante bei ca. 8 %.
// Größe der Preisliste -> Dateisuffix. 0,5 L ist die Hauptgröße (Hauptbild).
export const HAUPT_MENGE = '0,5 L';
export const GROESSEN_SUFFIX = { '0,1 L': '0-1l', '0,2 L': '0-2l', '0,5 L': '0-5l', '0,7 L': '0-7l', '1 L': '1-0l', '1,5 L': '1-5l' };
export const FLASCHEN_FORMAT = { w: 1024, h: 1536 };
