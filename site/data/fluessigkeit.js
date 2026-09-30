// Flüssigkeitsfarbe je Sorte für die Flaschen-Grafik (Produktbild, eigene Farben; Akzentfarbe der Seite bleibt Kupfer).
// Quelle: Pixelprobe in fotos/flaschenreihe-theke.jpg (2000x1333), Medianbereich (50.-90. Helligkeits-Perzentil) im Füllbereich
// über dem Etikett, weit weg von Glanzlicht und Etikett; Zuordnung zur Sorte über das lesbare Etikett der Flasche.
// Nicht eindeutig zuzuordnende Flaschen (z. B. Pefferminz, Nëssdrëpp, Liköre ohne Sortenseite) sind nicht verwendet.
// Fotos des Nutzers auf schwarzem Grund liefern Hunnegdrëpp, Wodka, Fruucht, Rum, Limoncello, Sambuca.
// geschaetzt: true = keine Fotoquelle; Wert aus der Beschreibung in produkte.js bzw. Sichtprüfung geschätzt (TODO-INHALTE.md).
// Die KI-Flaschenbilder sind auch für Farben ausgeschlossen.
const KLAR = { farbe: '#d3e1dc', alpha: 0.4, klar: true };
const klarFoto = (q) => ({ ...KLAR, quelle: `flaschenreihe-theke.jpg: ${q}, farblos`, geschaetzt: false });
const klarBeschr = { ...KLAR, quelle: 'produkte.js: „klare Eau-de-vie“', geschaetzt: false };
const schaetz = (farbe, alpha, quelle) => ({ farbe, alpha, quelle, geschaetzt: true });

export const FLUESSIGKEIT = {
  // --- Fotoquelle (Pixelprobe) ---
  kirsch: klarFoto('Kirsch-Flaschen, Pixelprobe Sättigung höchstens 0,08'),
  framboise: klarFoto('Framboise-Flasche, Pixelprobe Sättigung höchstens 0,08'),
  lenschouren: klarFoto('Lënschouren-Flasche, Pixelprobe Sättigung höchstens 0,08'),
  kraeiderdrepp: klarFoto('Kräiderdrëpp-Flasche, Pixelprobe Sättigung höchstens 0,08'),
  schleiwen: klarFoto('Schléiwen-Flasche, Pixelprobe Sättigung höchstens 0,08'),
  'poire-williams': klarFoto('liegende Poire-Williams-Flasche (Sichtprüfung)'),
  gin: klarFoto('Hierber-Gin-Flasche (Sichtprüfung, Füllung farblos)'),
  // --- Produktfotos vom Nutzer auf schwarzem Grund (fotos/flaschen-*.webp, flasche-hunnegdrepp.png) ---
  wodka: { ...KLAR, quelle: 'Foto vom Nutzer: flaschen-wodka.webp (0,2 L und 0,5 L), Füllung farblos; Probe Schulter #878683 = Durchsicht auf Tisch', geschaetzt: false },
  hunnegdrepp: { farbe: '#b9861b', alpha: 0.92, quelle: 'Foto vom Nutzer: flasche-hunnegdrepp.png, Sichtung Füllung tiefes Honiggold (Pixelprobe durch schwarze Rückwand verfälscht)', geschaetzt: false },
  'hierber-fruucht': { farbe: '#bd6e1b', alpha: 0.92, quelle: 'Foto vom Nutzer: flaschen-fruucht.webp, Probe Schulter 0,5 L (60.-95. Perzentil) #bd6e1b, 0,2 L #af6813', geschaetzt: false },
  rum: { farbe: '#c58a08', alpha: 0.92, quelle: 'Foto vom Nutzer: flaschen-rum-02-05.webp / flaschen-rum-fuenf-groessen.webp, Probe Schulter #c68f04, #c49313, #c17a07 (Mittel)', geschaetzt: false },
  limoncello: { farbe: '#d7d62f', alpha: 0.95, quelle: 'Foto vom Nutzer: flaschen-limoncello.webp, Probe Farbton gelbgrün (Helligkeit durch schwarzen Grund gedrückt, Wert aufgehellt)', geschaetzt: false },
  sambuca: { ...KLAR, quelle: 'Foto vom Nutzer: flaschen-sambuca.webp, Füllung farblos', geschaetzt: false },
  'vieux-marc': { farbe: '#42352a', alpha: 0.96, quelle: 'flaschenreihe-theke.jpg: Vieux-Marc-Karaffe, Probe x 262-338, y 925-1040 (dunkles Glas)', geschaetzt: false },
  'vieille-prune': { farbe: '#a48a2c', alpha: 0.8, quelle: 'flaschenreihe-theke.jpg: Vieille-Prune-Flasche, Probe x 1100-1158, y 870-940', geschaetzt: false },
  whisky: { farbe: '#9c7d26', alpha: 0.9, quelle: 'flaschenreihe-theke.jpg: Whisky-Flasche (schwarzes Etikett), Probe x 1192-1262, y 850-920', geschaetzt: false },
  vizdrepp: schaetz('#e3d594', 0.75, 'flaschenreihe-theke.jpg: Vizdrëpp-Flasche blass goldgelb (Sichtprüfung; Pixelprobe durch Hintergrund verfälscht)'),
  // --- klar laut Beschreibung in produkte.js ---
  quetsch: klarBeschr, mirabelle: klarBeschr, poire: klarBeschr, kiwibeeren: klarBeschr, hondsaarsch: klarBeschr,
  vullekiischt: klarBeschr, kuerbisdrepp: klarBeschr, grain: klarBeschr,
  // --- geschätzt nach den Farbworten in produkte.js ---
  neelchesbiren: schaetz('#e8deaa', 0.6, 'produkte.js: „blass strohfarben“'),
  'vieille-pomme': schaetz('#e6dba0', 0.7, 'produkte.js: „blass strohfarben“'),
  'hunneg-whisky': schaetz('#c4912e', 0.9, 'produkte.js: Honig-Whisky; golden geschätzt, dunkler als Whisky'),
  'rum-orange': schaetz('#c67a1c', 0.9, 'produkte.js: „orange-bernsteinfarben“'),
};
