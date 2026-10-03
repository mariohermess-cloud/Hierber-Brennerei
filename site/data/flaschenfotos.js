// Neu erzeugte Produktflaschen (Hochformat 2:3, heller neutraler Studiogrund) mit dem aktuellen Etikett statt der Vektor-Flasche.
// Quelle: fotos-flaschen/<sorten-id>.png, Ergebnis des ChatGPT-Laufs (PROMPTS-FLASCHEN.md); den Ordner füllt der Nutzer.
// Fehlt die Datei, zeigt die Seite die Vektor-Flasche (Fallback). Die Fotos in Fotos/ und fotos/ werden NICHT ausgeliefert, sie sind nur Formvorlage (Anhang 1).
// Zum Testen kann HB_FLASCHEN_ZUSATZ auf ein Verzeichnis außerhalb des Repos zeigen: Dateien <id>.png dort haben Vorrang.
export const FLASCHEN_ORDNER = 'fotos-flaschen';
// Festes Format aller Flaschenbilder (Breite x Höhe in Pixel) laut Prompt; Flasche mittig, Standfläche bei ca. 90 % der Höhe, Stopfenoberkante bei ca. 8 %.
export const FLASCHEN_FORMAT = { w: 1024, h: 1536 };
