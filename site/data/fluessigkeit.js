// Flüssigkeitsfarbe je Sorte für die Flaschen-Grafik (Produktbild, eigene Farben; Akzentfarbe der Seite bleibt Kupfer).
// Quelle: Pixelprobe in fotos/flaschenreihe-theke.jpg (2000x1333), Medianbereich (50.-90. Helligkeits-Perzentil) im Füllbereich
// über dem Etikett, weit weg von Glanzlicht und Etikett; Zuordnung zur Sorte über das lesbare Etikett der Flasche.
// Neu: Flaschenfotos mit Weißgrund in Fotos/ (groß geschrieben, vom Nutzer; NICHT fotos/): Messung mit tools/fluessigkeit_messen.mjs
// (Bericht FLUESSIGKEIT-MESSUNG.md; Median im geraden Körper über dem Etikett, gegen das leere Glas bewertet, bei Deckkraft 0,85 entmischt).
// Gemessen für 15 Sorten (Kirsch, Framboise, Quetsch, Poire Williams, Mirabelle, Poire, Neelchesbiren, Lënschouren, Schléiwen, Kräiderdrëpp, Kiwibeeren, Vieille Pomme, Vieille Prune, Vizdrëpp; Hunnegdrëpp bestätigt).
// Nicht eindeutig zuzuordnende Flaschen (z. B. Pefferminz, Nëssdrëpp, Liköre ohne Sortenseite) sind nicht verwendet.
// Fotos des Nutzers auf schwarzem Grund liefern Hunnegdrëpp, Wodka, Fruucht, Rum, Limoncello, Sambuca.
// geschaetzt: true = keine Fotoquelle; Wert aus der Beschreibung in produkte.js bzw. Sichtprüfung geschätzt (TODO-INHALTE.md).
// Die KI-Flaschenbilder sind auch für Farben ausgeschlossen.
const KLAR = { farbe: '#d3e1dc', alpha: 0.4, klar: true };
const klarFoto = (q) => ({ ...KLAR, quelle: `flaschenreihe-theke.jpg: ${q}, farblos`, geschaetzt: false });
const klarMess = (datei) => ({ ...KLAR, quelle: `Foto Fotos/${datei}: gemessen, Füllung farblos (Abstand zum leeren Glas < 14)`, geschaetzt: false });
const mess = (datei, farbe, alpha, beob) => ({ farbe, alpha, quelle: `Foto Fotos/${datei}: gemessen, beobachtet ${beob}, Weißgrund herausgerechnet`, geschaetzt: false });
const klarBeschr = { ...KLAR, quelle: 'produkte.js: „klare Eau-de-vie“', geschaetzt: false };
const schaetz = (farbe, alpha, quelle) => ({ farbe, alpha, quelle, geschaetzt: true });

export const FLUESSIGKEIT = {
  // --- Fotoquelle (Pixelprobe) ---
  kirsch: klarMess('flasche-kirsch.jpg'),
  framboise: klarMess('flasche-framboise.jpg'),
  lenschouren: klarMess('flasche-lenschouren.jpg'),
  kraeiderdrepp: klarMess('flasche-kraeiderdrepp.jpg'),
  schleiwen: klarMess('flasche-schleiwen.jpg'),
  'poire-williams': klarMess('flasche-poire-williams.jpg'),
  gin: klarFoto('Hierber-Gin-Flasche (Sichtprüfung, Füllung farblos)'),
  // --- Produktfotos vom Nutzer auf schwarzem Grund (fotos/flaschen-*.webp, flasche-hunnegdrepp.png) ---
  wodka: { ...KLAR, quelle: 'Foto vom Nutzer: flaschen-wodka.webp (0,2 L und 0,5 L), Füllung farblos; Probe Schulter #878683 = Durchsicht auf Tisch', geschaetzt: false },
  hunnegdrepp: { farbe: '#b9861b', alpha: 0.92, quelle: 'Foto vom Nutzer: flasche-hunnegdrepp.png, Sichtung Füllung tiefes Honiggold (Pixelprobe durch schwarze Rückwand verfälscht); bestätigt durch Messung Fotos/flasche-hunnegdrepp.jpg (beobachtet #c18e00, entmischt #ba7e00)', geschaetzt: false },
  'hierber-fruucht': { farbe: '#bd6e1b', alpha: 0.92, quelle: 'Foto vom Nutzer: flaschen-fruucht.webp, Probe Schulter 0,5 L (60.-95. Perzentil) #bd6e1b, 0,2 L #af6813', geschaetzt: false },
  rum: { farbe: '#c58a08', alpha: 0.92, quelle: 'Foto vom Nutzer: flaschen-rum-02-05.webp / flaschen-rum-fuenf-groessen.webp, Probe Schulter #c68f04, #c49313, #c17a07 (Mittel)', geschaetzt: false },
  limoncello: { farbe: '#d7d62f', alpha: 0.95, quelle: 'Foto vom Nutzer: flaschen-limoncello.webp, Probe Farbton gelbgrün (Helligkeit durch schwarzen Grund gedrückt, Wert aufgehellt)', geschaetzt: false },
  sambuca: { ...KLAR, quelle: 'Foto vom Nutzer: flaschen-sambuca.webp, Füllung farblos', geschaetzt: false },
  'vieux-marc': { farbe: '#42352a', alpha: 0.96, quelle: 'flaschenreihe-theke.jpg: Vieux-Marc-Karaffe, Probe x 262-338, y 925-1040 (dunkles Glas)', geschaetzt: false },
  'vieille-prune': mess('flasche-vieille-prune.jpg', '#e3cd3a', 0.85, '#e3d052'),
  whisky: { farbe: '#9c7d26', alpha: 0.9, quelle: 'flaschenreihe-theke.jpg: Whisky-Flasche (schwarzes Etikett), Probe x 1192-1262, y 850-920', geschaetzt: false },
  vizdrepp: mess('flasche-vizdrepp.jpg', '#d9ba15', 0.85, '#d9bf31'),
  // --- Fotos/ gemessen (klar) ---
  quetsch: klarMess('flasche-quetsch.jpg'), mirabelle: klarMess('flasche-mirabelle.jpg'), poire: klarMess('flasche-poire.jpg'), kiwibeeren: klarMess('flasche-kiwibeeren.jpg'), neelchesbiren: klarMess('flasche-neelchesbiren.jpg'),
  // --- klar laut Beschreibung in produkte.js ---
  hondsaarsch: klarBeschr, vullekiischt: klarBeschr, kuerbisdrepp: klarBeschr, grain: klarBeschr, // kein Foto der Sorte in Fotos/
  // --- geschätzt nach den Farbworten in produkte.js ---
  'vieille-pomme': mess('flasche-vieille-pomme.jpg', '#e2cc43', 0.85, '#e2cf59'),
  'hunneg-whisky': schaetz('#c4912e', 0.9, 'produkte.js: Honig-Whisky; golden geschätzt, dunkler als Whisky'),
  'rum-orange': schaetz('#c67a1c', 0.9, 'produkte.js: „orange-bernsteinfarben“'),
  // --- Liköre, Geräift, Weitere Brände: Farbworte aus tools/neue-gruppen.json (Entwurf, der Brenner bestätigt sie); kein Foto der Flasche ---
  'de-welle-max': schaetz('#5a1f44', 0.9, 'tools/neue-gruppen.json: „dunkles Beerenrot mit violettem Ton“'),
  'hambierlikoer': schaetz('#b3122e', 0.9, 'tools/neue-gruppen.json: „kräftiges Himbeerrot“'),
  'holly': schaetz('#efe3a0', 0.6, 'tools/neue-gruppen.json: „blasses, klares Strohgelb“'),
  'kiischtenlikoer': schaetz('#7a0f1f', 0.9, 'tools/neue-gruppen.json: „dunkles Kirschrot“'),
  'kraeiderlikoer': schaetz('#3a3a1c', 0.95, 'tools/neue-gruppen.json: „dunkles Grünbraun“'),
  'mandellikoer': schaetz('#b98a52', 0.9, 'tools/neue-gruppen.json: „helles Karamellbraun“'),
  'mirabellenlikoer': schaetz('#e0b13a', 0.9, 'tools/neue-gruppen.json: „warmes Goldgelb“'),
  'mirabelle-op-mirabellen-likoer': schaetz('#e0b13a', 0.9, 'tools/neue-gruppen.json: „warmes Goldgelb“'),
  'nesslikoer': schaetz('#7a5232', 0.9, 'tools/neue-gruppen.json: „mittleres Nussbraun“'),
  'pfeffi': schaetz('#2fcf6a', 0.9, 'tools/neue-gruppen.json: „leuchtendes Minzgrün“'),
  'pijenlikoer': schaetz('#f0a56a', 0.9, 'tools/neue-gruppen.json: „helles Pfirsich-Orange“'),
  'quittenlikoer': schaetz('#ecc66a', 0.7, 'tools/neue-gruppen.json: „blasses Bernstein-Gelb“'),
  'schleiwenlikoer': schaetz('#6b1230', 0.9, 'tools/neue-gruppen.json: „dunkles Violettrot“'),
  'vizlikoer': schaetz('#e8e08a', 0.6, 'tools/neue-gruppen.json: „blasses Apfelgelb“'),
  'williamslikoer': schaetz('#e6c25a', 0.7, 'tools/neue-gruppen.json: „helles Goldgelb“'),
  'winterdreams': schaetz('#7a1522', 0.9, 'tools/neue-gruppen.json: „winterlich dunkles Rot“'),
  'ingwerlikoer': schaetz('#e0b13a', 0.7, 'tools/neue-gruppen.json: „helles Goldgelb“'),
  'aeppel-pommes': schaetz('#d9b43a', 0.6, 'tools/neue-gruppen.json: „klares Goldgelb“'),
  'pastis': schaetz('#f1e49a', 0.6, 'tools/neue-gruppen.json: „mattes, helles Gelb“'),
  'nessdrepp': schaetz('#c79a5a', 0.8, 'tools/neue-gruppen.json: „helles Goldbraun“'),
  'quitten': schaetz('#dcb44c', 0.6, 'tools/neue-gruppen.json: „klares Goldgelb“'),
  'willi-op-biren-geraeift': schaetz(KLAR.farbe, KLAR.alpha, 'tools/neue-gruppen.json: „klar wie Wasser“'),
  'mirabelle-op-mirabellen-geraeift': schaetz(KLAR.farbe, KLAR.alpha, 'tools/neue-gruppen.json: „klar wie Wasser“'),
  'quetsch-op-quetsch-geraeift': schaetz(KLAR.farbe, KLAR.alpha, 'tools/neue-gruppen.json: „klar wie Wasser“'),
  'neutral-alkohol': schaetz(KLAR.farbe, KLAR.alpha, 'tools/neue-gruppen.json: „klar wie Wasser“'),
  'pefferminz': schaetz(KLAR.farbe, KLAR.alpha, 'tools/neue-gruppen.json: „klar wie Wasser“'),
  hierberol: schaetz('#e0501c', 0.9, 'Sichtung fotos-flaschen/hierberol-0-7l.png: leuchtend orange-rot; die Seite zeigt das Foto, keine Vektor-Flasche'),
};
