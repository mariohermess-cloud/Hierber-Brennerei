// Produktdaten der Hierber Brennerei (Preisliste 2025, alle Preise TTC = inkl. 17 % MwSt.)
// Leicht austauschbar: Texte, Preise und Ablauf der Einschenk-Animation werden hier gepflegt.
//
// glas:     Glasform (siehe js/glassware.js): ballon | tumbler | highball | tulpe | tulpe2 | shot
// flasche:  Flaschenform (gin | whisky | rum | schlank | birne | limoncello) und Glasfarbe
// fluessig: Farbe/Deckkraft der Flüssigkeit im Glas
// stimmung: Szenenlicht bei Auswahl (lantern = Laternenhelligkeit, exposure = Belichtung, warm = 0..1, andere = Abdunklung der übrigen Fässer)
// ablauf:   Reihenfolge der Schritte: { gies: {fill} } = Einschenken, { deko: 'name' } = Dekoration

export const PRODUKTE = [
  {
    id: 'gin',
    name: 'Hierber Gin',
    kurzname: 'Gin',
    abv: 43,
    kurz: 'Klar, frisch und kräuterwürzig.',
    beschreibung:
      'Klar und frisch, mit feiner Wacholdernote und kräutrigem Charakter – im Longdrink mit Tonic ebenso zu Hause wie pur.',
    preise: [
      { menge: '0,2 L', preis: 12 },
      { menge: '0,5 L', preis: 25 },
      { menge: '1 L', preis: 42 },
      { menge: '1,5 L', preis: 55 },
    ],
    glas: 'ballon',
    flasche: { form: 'gin', glas: 0x1d6a45 },
    fluessig: { farbe: '#dfeee9', alpha: 0.32 },
    stimmung: { lantern: 0.75, exposure: 0.98, warm: 0.1, andere: 0.32 },
    ablauf: [
      { gies: { fill: 0.3 } },
      { deko: 'eis' },
      { gies: { fill: 0.8, flasche: 'tonic', farbe: '#eaf5f1', alpha: 0.3 } },
      { deko: 'gurke' },
      { deko: 'wacholder' },
      { deko: 'pfeffer' },
      { deko: 'rosmarin' },
    ],
  },
  {
    id: 'whisky',
    name: 'Hierber Whisky',
    kurzname: 'Whisky',
    abv: 43,
    kurz: 'Warm, rund und von samtiger Tiefe.',
    beschreibung:
      'Warm und rund, mit samtiger Tiefe und ruhigem Abgang – ein Whisky für langsame Abende, pur oder auf einem großen Eiswürfel.',
    preise: [
      { menge: '0,2 L', preis: 12 },
      { menge: '0,5 L', preis: 28 },
      { menge: '1 L', preis: 48 },
      { menge: '1,5 L', preis: 63 },
    ],
    glas: 'tumbler',
    flasche: { form: 'whisky', glas: 0x24503a },
    fluessig: { farbe: '#c8741c', alpha: 0.88 },
    // deutlich dunklere, wärmere Szene
    stimmung: { lantern: 0.3, exposure: 0.78, warm: 1, andere: 0.18 },
    ablauf: [
      { deko: 'eisgross' },
      { gies: { fill: 0.55 } },
      { deko: 'zeste' },
      { deko: 'rauch' },
    ],
  },
  {
    id: 'rum',
    name: 'Hierber Rum',
    kurzname: 'Rum',
    abv: 43,
    kurz: 'Dunkel, weich und voller Wärme.',
    beschreibung:
      'Dunkel und weich, mit sanfter Süße und wohliger Wärme – pur genossen oder als Basis für einen langen Drink.',
    preise: [
      { menge: '0,2 L', preis: 12 },
      { menge: '0,5 L', preis: 26 },
      { menge: '1 L', preis: 46 },
      { menge: '1,5 L', preis: 61 },
    ],
    glas: 'highball',
    flasche: { form: 'rum', glas: 0x1a5a3c },
    fluessig: { farbe: '#36180a', alpha: 0.95 },
    stimmung: { lantern: 0.6, exposure: 0.92, warm: 0.6, andere: 0.28 },
    ablauf: [
      { deko: 'eis' },
      { gies: { fill: 0.6 } },
      { deko: 'limette' },
      { deko: 'zimt' },
    ],
  },
  {
    id: 'mirabelle',
    name: 'Mirabelle',
    kurzname: 'Mirabelle',
    abv: 45,
    kurz: 'Zartgelb, fruchtig, fein im Abgang.',
    beschreibung:
      'Zartgelb im Glas und voller Duft nach reifen Mirabellen – ein klarer, feiner Brand, gedacht als Digestif.',
    preise: [
      { menge: '0,1 L', preis: 6 },
      { menge: '0,5 L', preis: 17 },
      { menge: '0,7 L', preis: 20 },
    ],
    glas: 'tulpe',
    flasche: { form: 'schlank', glas: 0x2c7a4a },
    fluessig: { farbe: '#f3e7a2', alpha: 0.38 },
    stimmung: { lantern: 0.8, exposure: 1, warm: 0.2, andere: 0.32 },
    ablauf: [
      { gies: { fill: 0.6 } },
      { deko: 'mirabellen' },
      { deko: 'blueten' },
      { deko: 'blatt' },
    ],
  },
  {
    id: 'poire',
    name: 'Poire Williams',
    kurzname: 'Poire Williams',
    abv: 45,
    kurz: 'Klar, elegant, duftig nach reifer Birne.',
    beschreibung:
      'Klar und elegant, mit dem weichen Duft reifer Birnen und einem feinen, fruchtigen Nachhall – ein Digestif zum Innehalten.',
    preise: [
      { menge: '0,1 L', preis: 6 },
      { menge: '0,5 L', preis: 18 },
      { menge: '0,7 L', preis: 20 },
    ],
    glas: 'tulpe2',
    flasche: { form: 'birne', glas: 0x2f7d4d },
    fluessig: { farbe: '#eef2dc', alpha: 0.3 },
    stimmung: { lantern: 0.8, exposure: 1, warm: 0.2, andere: 0.32 },
    ablauf: [
      { gies: { fill: 0.6 } },
      { deko: 'birne' },
      { deko: 'blatt' },
    ],
  },
  {
    id: 'limoncello',
    name: 'Hierber Limoncello',
    kurzname: 'Limoncello',
    abv: 28,
    kurz: 'Leuchtend, frisch und zitronig.',
    beschreibung:
      'Leuchtend gelb, frisch und zitronig – gut gekühlt ein sonniger, leichter Abschluss.',
    preise: [
      { menge: '0,2 L', preis: 8 },
      { menge: '0,5 L', preis: 18 },
      { menge: '1 L', preis: 32 },
      { menge: '1,5 L', preis: 44 },
    ],
    glas: 'shot',
    flasche: { form: 'limoncello', glas: 0x3a8a4c },
    fluessig: { farbe: '#f6dc3a', alpha: 0.82 },
    stimmung: { lantern: 0.85, exposure: 1.02, warm: 0.1, andere: 0.34 },
    ablauf: [
      { deko: 'frost' },
      { gies: { fill: 0.72 } },
      { deko: 'zitrone' },
      { deko: 'minze' },
      { deko: 'tropfen' },
    ],
  },
];

// Kontakt und Fußzeile
export const KONTAKT = {
  firma: 'Hierber Brennerei Sàrl',
  adresse: '2, Millewee · L-6665 Herborn',
  mail: 'info@hierber-brennerei.lu',
  web: 'www.hierber-brennerei.lu',
  hinweis: 'Alle Preise inkl. 17 % MwSt. (Preisliste 2025)',
};
