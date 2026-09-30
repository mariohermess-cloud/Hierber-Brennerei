// Produktdaten der Keller-Ansicht v2 (Preisliste Hierber Brennerei 2025, alle Preise TTC = inkl. 17 % MwSt.).
// Preise stammen aus der Preisliste (PDF, Spaltenposition je Zeile geprüft). Nichts erfunden:
// Sorten, die in der Preisliste fehlen, tragen preise: [] und zeigen „Preis auf Anfrage“.
//
// ort:      'fass' (Fass im Gang) | 'regal' (Flasche auf der Regalwand am Gangende)
// sorte:    Schlüssel in v2/data/etiketten.json (Etikett, Flaschentyp, Flüssigkeitsfarbe)
// varianten: [{ id, name, abv, sorte-Variante, preise: [{ menge, preis }] }]; die erste ist die Standard-Variante.
//           Ein Fass/eine Flasche zeigt immer nur die Standard-Variante, die anderen werden erst in der Kaufauswahl gewählt.
// glas:     Glasform (siehe v2/js/glassware.js): ballon | tumbler | highball | tulpe | tulpe2 | shot
// fluessig: Farbe/Deckkraft der Flüssigkeit im Glas (Flaschen-Flüssigkeit kommt aus etiketten.json)
// stimmung: Szenenlicht bei Auswahl (lantern, exposure, warm, andere = Abdunklung der übrigen Objekte)
// ablauf:   { gies: { fill } } = Einschenken, { deko: 'name' } = Dekoration (siehe v2/js/deko.js)

const p = (menge, preis) => ({ menge, preis });
const KLAR = { farbe: '#cfe0da', alpha: 0.2 };
const ST = {
  hell: { lantern: 0.85, exposure: 1.0, warm: 0.1, andere: 0.34 },
  mittel: { lantern: 0.75, exposure: 0.98, warm: 0.2, andere: 0.32 },
  warm: { lantern: 0.55, exposure: 0.9, warm: 0.7, andere: 0.26 },
  dunkel: { lantern: 0.3, exposure: 0.78, warm: 1, andere: 0.18 },
};

export const PRODUKTE = [
  /* ---------- Fässer (14): Spirituosen, Obstbrände, Gereift ---------- */
  {
    id: 'gin', name: 'Hierber Gin', kurzname: 'Gin', ort: 'fass', gruppe: 'Spirituosen', sorte: 'gin', abv: 43,
    kurz: 'Klarer Gin, 43 % vol.',
    beschreibung: 'Hierber Gin – klarer Gin der Hierber Brennerei aus Herborn.',
    varianten: [{ id: 'standard', name: 'Hierber Gin', abv: 43, preise: [p('0,2 L', 12), p('0,5 L', 25), p('1 L', 42), p('1,5 L', 55)] }],
    glas: 'ballon', fluessig: KLAR, stimmung: ST.mittel,
    ablauf: [{ gies: { fill: 0.3 } }, { deko: 'eis' }, { gies: { fill: 0.8, flasche: 'tonic', farbe: '#eaf5f1', alpha: 0.3 } },
      { deko: 'gurke' }, { deko: 'wacholder' }, { deko: 'pfeffer' }, { deko: 'rosmarin' }],
  },
  {
    id: 'wodka', name: 'Hierber Wodka', kurzname: 'Wodka', ort: 'fass', gruppe: 'Spirituosen', sorte: 'wodka', abv: 43,
    kurz: 'Klarer Wodka, 43 % vol.',
    beschreibung: 'Hierber Wodka – klar, gekühlt zu genießen.',
    varianten: [{ id: 'standard', name: 'Hierber Wodka', abv: 43, preise: [p('0,2 L', 8), p('0,5 L', 18)] }],
    glas: 'shot', fluessig: KLAR, stimmung: ST.hell,
    ablauf: [{ deko: 'frost' }, { deko: 'eis' }, { gies: { fill: 0.7 } }, { deko: 'zitronenzeste' }, { deko: 'tropfen' }],
  },
  {
    id: 'rum', name: 'Hierber Rum', kurzname: 'Rum', ort: 'fass', gruppe: 'Spirituosen', sorte: 'rum', abv: 43,
    kurz: 'Bernsteinfarbener Rum, 43 % vol.',
    beschreibung: 'Hierber Rum. Auf dem Etikett: „5 Joer aal, am Eeche Faass gelagert“. (Alkoholgehalt laut Preisliste 2025; das Etikettenbild zeigt 40 % vol.)',
    varianten: [{ id: 'standard', name: 'Hierber Rum', abv: 43, preise: [p('0,2 L', 12), p('0,5 L', 26), p('1 L', 46), p('1,5 L', 61)] }],
    glas: 'highball', fluessig: { farbe: '#a8600e', alpha: 0.92 }, stimmung: ST.warm,
    ablauf: [{ deko: 'eis' }, { gies: { fill: 0.6 } }, { deko: 'limette' }, { deko: 'zimt' }],
  },
  {
    id: 'rum-orange', name: 'Hierber Rum Orange', kurzname: 'Rum Orange', ort: 'fass', gruppe: 'Spirituosen', sorte: 'rum-orange', abv: 35,
    kurz: 'Rum mit Orange, 35 % vol.',
    beschreibung: 'Hierber Rum Orange – orange-bernsteinfarben.',
    varianten: [{ id: 'standard', name: 'Hierber Rum Orange', abv: 35, preise: [p('0,2 L', 12), p('0,5 L', 22), p('1 L', 40), p('1,5 L', 52)] }],
    glas: 'highball', fluessig: { farbe: '#c8760f', alpha: 0.9 }, stimmung: ST.warm,
    ablauf: [{ deko: 'eis' }, { gies: { fill: 0.6 } }, { deko: 'orangenscheibe' }],
  },
  {
    id: 'whisky', name: 'Hierber Whisky', kurzname: 'Whisky', ort: 'fass', gruppe: 'Spirituosen', sorte: 'whisky', abv: 43,
    kurz: 'Whisky, 43 % vol.',
    beschreibung: 'Hierber Whisky – pur oder auf einem großen Eiswürfel.',
    varianten: [{ id: 'standard', name: 'Hierber Whisky', abv: 43, preise: [p('0,2 L', 12), p('0,5 L', 28), p('1 L', 48), p('1,5 L', 63)] }],
    glas: 'tumbler', fluessig: { farbe: '#b8620f', alpha: 0.9 }, stimmung: ST.dunkel,
    ablauf: [{ deko: 'eisgross' }, { gies: { fill: 0.55 } }, { deko: 'zeste' }, { deko: 'rauch' }],
  },
  {
    id: 'kirsch', name: 'Kirsch', kurzname: 'Kirsch', ort: 'fass', gruppe: 'Obstbrände', sorte: 'kirsch', abv: 45,
    kurz: 'Klarer Kirschbrand',
    beschreibung: 'Kirsch – klare Eau-de-vie von der Kirsche.',
    varianten: [{ id: 'standard', name: 'Kirsch', abv: 45, preise: [p('0,1 L', 6), p('0,5 L', 18)] }],
    glas: 'tulpe', fluessig: KLAR, stimmung: ST.hell,
    ablauf: [{ gies: { fill: 0.6 } }, { deko: 'kirschen' }, { deko: 'blatt' }],
  },

  {
    id: 'framboise', name: 'Framboise', kurzname: 'Framboise', ort: 'fass', gruppe: 'Obstbrände', sorte: 'framboise', abv: 45,
    kurz: 'Klarer Himbeerbrand',
    beschreibung: 'Framboise – klare Eau-de-vie von der Himbeere.',
    varianten: [{ id: 'standard', name: 'Framboise', abv: 45, preise: [p('0,1 L', 6), p('0,5 L', 20), p('0,7 L', 24)] }],
    glas: 'tulpe', fluessig: KLAR, stimmung: ST.hell,
    ablauf: [{ gies: { fill: 0.6 } }, { deko: 'himbeeren' }, { deko: 'minze' }],
  },
  {
    id: 'quetsch', name: 'Quetsch', kurzname: 'Quetsch', ort: 'fass', gruppe: 'Obstbrände', sorte: 'quetsch', abv: 45,
    kurz: 'Klarer Zwetschgenbrand',
    beschreibung: 'Quetsch – klare Eau-de-vie von der Zwetschge.',
    varianten: [
      { id: 'standard', name: 'Quetsch', abv: 45, preise: [p('0,1 L', 6), p('0,5 L', 14), p('0,7 L', 16)] },
      { id: 'geraeift', name: 'op Quetschen nogeräift', abv: 35, preise: [p('0,1 L', 6), p('0,5 L', 16)] },
    ],
    glas: 'tulpe', fluessig: KLAR, stimmung: ST.hell,
    ablauf: [{ gies: { fill: 0.6 } }, { deko: 'zwetschgen' }, { deko: 'blatt' }],
  },
  {
    id: 'poire-williams', name: 'Poire Williams', kurzname: 'Poire Williams', ort: 'fass', gruppe: 'Obstbrände', sorte: 'poire-williams', abv: 45,
    kurz: 'Klare Williams-Birne',
    beschreibung: 'Poire Williams – klare Eau-de-vie von der Williams-Birne.',
    varianten: [
      { id: 'standard', name: 'Poire Williams', abv: 45, preise: [p('0,1 L', 6), p('0,5 L', 18), p('0,7 L', 20)] },
      { id: 'geraeift', name: 'Williamsdrëpp op Biren nogeräift', abv: 35, preise: [p('0,1 L', 6), p('0,5 L', 16)] },
    ],
    glas: 'tulpe2', fluessig: KLAR, stimmung: ST.hell,
    ablauf: [{ gies: { fill: 0.6 } }, { deko: 'birne' }, { deko: 'blatt' }],
  },
  {
    id: 'mirabelle', name: 'Mirabelle', kurzname: 'Mirabelle', ort: 'fass', gruppe: 'Obstbrände', sorte: 'mirabelle', abv: 45,
    kurz: 'Klarer Mirabellenbrand',
    beschreibung: 'Mirabelle – klare Eau-de-vie von der Mirabelle.',
    varianten: [
      { id: 'standard', name: 'Mirabelle', abv: 45, preise: [p('0,1 L', 6), p('0,5 L', 17), p('0,7 L', 20)] },
      { id: 'geraeift', name: 'op Mirabellen nogeräift', abv: 35, preise: [p('0,1 L', 6), p('0,5 L', 16)] },
    ],
    glas: 'tulpe', fluessig: KLAR, stimmung: ST.hell,
    ablauf: [{ gies: { fill: 0.6 } }, { deko: 'mirabellen' }, { deko: 'blueten' }, { deko: 'blatt' }],
  },
  {
    id: 'hierber-fruucht', name: 'Hierber aale Fruucht', kurzname: 'Aale Fruucht', ort: 'fass', gruppe: 'Gereift', sorte: 'hierber-fruucht', abv: 43,
    kurz: 'Grande réserve, 43 % vol.',
    beschreibung: 'Hierber aale Fruucht. Auf dem Etikett: „Grande réserve, 10 Joer aal, am Eeche Faass gelagert“.',
    varianten: [{ id: 'standard', name: 'Hierber aale Fruucht', abv: 43, preise: [p('0,5 L', 26), p('1 L', 43), p('1,5 L', 56)] }],
    glas: 'ballon', fluessig: { farbe: '#b8700f', alpha: 0.9 }, stimmung: ST.warm,
    ablauf: [{ gies: { fill: 0.45 } }, { deko: 'eichenblatt' }, { deko: 'rauch' }],
  },
  {
    id: 'vieux-marc', name: 'Vieux Marc', kurzname: 'Vieux Marc', ort: 'fass', gruppe: 'Gereift', sorte: 'vieux-marc', abv: 45,
    kurz: 'Vieux Marc, im Eichenfass gereift',
    beschreibung: 'Vieux Marc (Grappa) – bernsteinfarben. Auf dem Etikett: „vieilli en fût de chêne“.',
    varianten: [{ id: 'standard', name: 'Vieux Marc / Grappa', abv: 45, preise: [p('0,7 L', 18)] }],
    glas: 'ballon', fluessig: { farbe: '#a8580f', alpha: 0.92 }, stimmung: ST.warm,
    ablauf: [{ gies: { fill: 0.4 } }, { deko: 'trauben' }, { deko: 'rauch' }],
  },
  {
    id: 'vieille-prune', name: 'Vieille Prune', kurzname: 'Vieille Prune', ort: 'fass', gruppe: 'Gereift', sorte: 'vieille-prune', abv: 40,
    kurz: 'Zwetschgenbrand, blass goldfarben',
    beschreibung: 'Vieille Prune – Eau-de-vie von der Pflaume, blass goldfarben.',
    varianten: [{ id: 'standard', name: 'Vieille Prune', abv: 40, preise: [p('0,1 L', 6), p('0,5 L', 15)] }],
    glas: 'tulpe', fluessig: { farbe: '#efdfa4', alpha: 0.52 }, stimmung: ST.mittel,
    ablauf: [{ gies: { fill: 0.55 } }, { deko: 'zwetschgen' }, { deko: 'blatt' }],
  },
  {
    id: 'vieille-pomme', name: 'Vieille Pomme', kurzname: 'Vieille Pomme', ort: 'fass', gruppe: 'Gereift', sorte: 'vieille-pomme', abv: 40,
    kurz: 'Apfelbrand, blass strohfarben',
    beschreibung: 'Vieille Pomme – Eau-de-vie vom Apfel, blass strohfarben.',
    varianten: [{ id: 'standard', name: 'Vieille Pomme', abv: 40, preise: [p('0,1 L', 6), p('0,5 L', 14)] }],
    glas: 'tulpe', fluessig: { farbe: '#efe4b0', alpha: 0.5 }, stimmung: ST.mittel,
    ablauf: [{ gies: { fill: 0.55 } }, { deko: 'apfel' }, { deko: 'zimtstange' }],
  },
  /* ---------- Regalwand (15) ---------- */
  {
    id: 'hunnegdrepp', name: 'Hunnegdrëpp', kurzname: 'Hunnegdrëpp', ort: 'regal', sorte: 'hunnegdrepp', abv: 40,
    kurz: 'Honig-Eau-de-vie, goldfarben',
    beschreibung: 'Hunnegdrëpp (Honig) – Eau-de-vie, honiggolden.',
    varianten: [{ id: 'standard', name: 'Hunnegdrëpp (Honig)', abv: 40, preise: [p('0,1 L', 6), p('0,5 L', 16)] }],
    glas: 'tulpe', fluessig: { farbe: '#f0c860', alpha: 0.62 }, stimmung: ST.warm,
    ablauf: [{ gies: { fill: 0.55 } }, { deko: 'honig' }, { deko: 'biene' }],
  },
  {
    id: 'hunneg-whisky', name: 'Hierber Hunneg Whisky', kurzname: 'Hunneg Whisky', ort: 'regal', sorte: 'hunneg-whisky', abv: 43,
    kurz: 'Honig-Whisky, 43 % vol.',
    beschreibung: 'Hierber Hunneg Whisky (Honig-Whisky). Preis auf Anfrage.',
    varianten: [{ id: 'standard', name: 'Hierber Hunneg Whisky', abv: 43, preise: [] }],
    glas: 'tumbler', fluessig: { farbe: '#c2740f', alpha: 0.9 }, stimmung: ST.dunkel,
    ablauf: [{ deko: 'eisgross' }, { gies: { fill: 0.55 } }, { deko: 'honig' }, { deko: 'rauch' }],
  },
  {
    id: 'kraeiderdrepp', name: 'Kräiderdrëpp', kurzname: 'Kräiderdrëpp', ort: 'regal', sorte: 'kraeiderdrepp', abv: 45,
    kurz: 'Kräuter-Eau-de-vie',
    beschreibung: 'Kräiderdrëpp (Kräuter) – klare Eau-de-vie.',
    varianten: [{ id: 'standard', name: 'Kräiderdrëpp (Kräuter)', abv: 45, preise: [p('0,1 L', 6), p('0,5 L', 14)] }],
    glas: 'shot', fluessig: KLAR, stimmung: ST.hell,
    ablauf: [{ gies: { fill: 0.7 } }, { deko: 'kraeuter' }],
  },
  {
    id: 'kuerbisdrepp', name: 'Kürbisdrëpp', kurzname: 'Kürbisdrëpp', ort: 'regal', sorte: 'kuerbisdrepp', abv: 45,
    kurz: 'Kürbis-Eau-de-vie',
    beschreibung: 'Kürbisdrëpp – klare Eau-de-vie. (Alkoholgehalt laut Preisliste 2025; das Etikettenbild zeigt 40 % vol.)',
    varianten: [{ id: 'standard', name: 'Kürbisdrëpp', abv: 45, preise: [p('0,5 L', 14)] }],
    glas: 'shot', fluessig: KLAR, stimmung: ST.hell,
    ablauf: [{ gies: { fill: 0.7 } }, { deko: 'kuerbis' }, { deko: 'blatt' }],
  },
  {
    id: 'grain', name: 'Grain', kurzname: 'Grain', ort: 'regal', sorte: 'grain', abv: 45,
    kurz: 'Getreidebrand',
    beschreibung: 'Grain – klare Eau-de-vie (Preisliste 2025: „Grains/Fruucht/Korn“).',
    varianten: [{ id: 'standard', name: 'Grain', abv: 45, preise: [p('1 L', 13)] }],
    glas: 'tumbler', fluessig: KLAR, stimmung: ST.hell,
    ablauf: [{ gies: { fill: 0.5 } }, { deko: 'aehren' }],
  },
  {
    id: 'hondsaarsch', name: 'Hondsaarsch', kurzname: 'Hondsaarsch', ort: 'regal', sorte: 'hondsaarsch', abv: 45,
    kurz: 'Mispel-Eau-de-vie',
    beschreibung: 'Hondsaarsch (Mispel) – klare Eau-de-vie. Preis auf Anfrage.',
    varianten: [{ id: 'standard', name: 'Hondsaarsch (Mispel)', abv: 45, preise: [] }],
    glas: 'tulpe', fluessig: KLAR, stimmung: ST.hell,
    ablauf: [{ gies: { fill: 0.6 } }, { deko: 'mispeln' }],
  },
  {
    id: 'kiwibeeren', name: 'Kiwibeeren', kurzname: 'Kiwibeeren', ort: 'regal', sorte: 'kiwibeeren', abv: 45,
    kurz: 'Kiwibeeren-Eau-de-vie',
    beschreibung: 'Kiwibeeren – klare Eau-de-vie. (Alkoholgehalt laut Preisliste 2025; das Etikettenbild zeigt 43 % vol.)',
    varianten: [{ id: 'standard', name: 'Kiwibeeren', abv: 45, preise: [p('0,1 L', 6), p('0,5 L', 16)] }],
    glas: 'tulpe', fluessig: KLAR, stimmung: ST.hell,
    ablauf: [{ gies: { fill: 0.6 } }, { deko: 'kiwi' }],
  },
  {
    id: 'poire', name: 'Poire', kurzname: 'Poire', ort: 'regal', sorte: 'poire', abv: 45,
    kurz: 'Birnen-Eau-de-vie',
    beschreibung: 'Poire – klare Eau-de-vie von der Birne.',
    varianten: [{ id: 'standard', name: 'Poire', abv: 45, preise: [p('0,5 L', 11)] }],
    glas: 'tulpe2', fluessig: KLAR, stimmung: ST.hell,
    ablauf: [{ gies: { fill: 0.6 } }, { deko: 'birne' }, { deko: 'blatt' }],
  },
  {
    id: 'neelchesbiren', name: 'Neelchesbiren', kurzname: 'Neelchesbiren', ort: 'regal', sorte: 'neelchesbiren', abv: 45,
    kurz: 'Eau-de-vie, blass strohfarben',
    beschreibung: 'Neelchesbiren – Eau-de-vie, blass strohfarben.',
    varianten: [{ id: 'standard', name: 'Neelchesbiren', abv: 45, preise: [p('0,1 L', 6), p('0,5 L', 18), p('0,7 L', 20)] }],
    glas: 'tulpe2', fluessig: { farbe: '#efe6b4', alpha: 0.48 }, stimmung: ST.hell,
    ablauf: [{ gies: { fill: 0.6 } }, { deko: 'birne' }, { deko: 'blatt' }],
  },
  {
    id: 'lenschouren', name: 'Lënschouren', kurzname: 'Lënschouren', ort: 'regal', sorte: 'lenschouren', abv: 45,
    kurz: 'Klare Eau-de-vie',
    beschreibung: 'Lënschouren – klare Eau-de-vie.',
    varianten: [{ id: 'standard', name: 'Lënschouren', abv: 45, preise: [p('0,1 L', 6), p('0,5 L', 17), p('0,7 L', 20)] }],
    glas: 'tulpe', fluessig: KLAR, stimmung: ST.hell,
    ablauf: [{ gies: { fill: 0.6 } }, { deko: 'gelbepflaumen' }, { deko: 'blatt' }],
  },
  {
    id: 'vullekiischt', name: 'Vullekiischt', kurzname: 'Vullekiischt', ort: 'regal', sorte: 'vullekiischt', abv: 45,
    kurz: 'Vogelbeeren-Eau-de-vie',
    beschreibung: 'Vullekiischt (Vogelbeere) – klare Eau-de-vie. Preis auf Anfrage.',
    varianten: [{ id: 'standard', name: 'Vullekiischt (Vogelbeere)', abv: 45, preise: [] }],
    glas: 'shot', fluessig: KLAR, stimmung: ST.hell,
    ablauf: [{ gies: { fill: 0.7 } }, { deko: 'vogelbeeren' }],
  },
  {
    id: 'schleiwen', name: 'Schléiwen', kurzname: 'Schléiwen', ort: 'regal', sorte: 'schleiwen', abv: 45,
    kurz: 'Schlehen-Eau-de-vie',
    beschreibung: 'Schléiwen (Schlehen) – klare Eau-de-vie.',
    varianten: [{ id: 'standard', name: 'Schléiwen (Schlehen)', abv: 45, preise: [p('0,1 L', 6), p('0,5 L', 20)] }],
    glas: 'shot', fluessig: KLAR, stimmung: ST.hell,
    ablauf: [{ gies: { fill: 0.7 } }, { deko: 'schlehen' }],
  },
  {
    id: 'vizdrepp', name: 'Vizdrëpp', kurzname: 'Vizdrëpp', ort: 'regal', sorte: 'vizdrepp', abv: 40,
    kurz: 'Vizdrëpp (Calvados)',
    beschreibung: 'Vizdrëpp (Calvados) – Apfel-Eau-de-vie.',
    varianten: [{ id: 'standard', name: 'Vizdrëpp (Calvados)', abv: 40, preise: [p('0,5 L', 15)] }],
    glas: 'ballon', fluessig: { farbe: '#eee4b8', alpha: 0.45 }, stimmung: ST.mittel,
    ablauf: [{ gies: { fill: 0.4 } }, { deko: 'apfel' }],
  },
  {
    id: 'sambuca', name: 'Hierber Sambuca', kurzname: 'Sambuca', ort: 'regal', sorte: 'sambuca', abv: 43, platzhalter: true,
    kurz: 'Sambuca, 43 % vol.',
    beschreibung: 'Hierber Sambuca. Platzhalter-Etikett – das echte Etikett folgt.',
    varianten: [{ id: 'standard', name: 'Hierber Sambuca', abv: 43, preise: [p('0,2 L', 12), p('0,5 L', 24), p('1 L', 41), p('1,5 L', 53)] }],
    glas: 'shot', fluessig: KLAR, stimmung: ST.hell,
    ablauf: [{ deko: 'eis' }, { gies: { fill: 0.65 } }],
  },
  {
    id: 'limoncello', name: 'Hierber Limoncello', kurzname: 'Limoncello', ort: 'regal', sorte: 'limoncello', abv: 28, platzhalter: true,
    kurz: 'Limoncello, 28 % vol.',
    beschreibung: 'Hierber Limoncello – leuchtend gelb. Platzhalter-Etikett – das echte Etikett folgt.',
    varianten: [{ id: 'standard', name: 'Hierber Limoncello', abv: 28, preise: [p('0,2 L', 8), p('0,5 L', 18), p('1 L', 32), p('1,5 L', 44)] }],
    glas: 'shot', fluessig: { farbe: '#f6dc3a', alpha: 0.82 }, stimmung: ST.hell,
    ablauf: [{ deko: 'frost' }, { gies: { fill: 0.72 } }, { deko: 'zitrone' }, { deko: 'minze' }, { deko: 'tropfen' }],
  },
];

// Platzhalter-Etiketten (kein Etikettenbild vorhanden): Text im Markenstil, klar als Platzhalter markiert.
export const PLATZHALTER = {
  sambuca: { titel: 'Hierber Sambuca', abv: 43, farbe: '#20303a', typ: 'rund' },
  limoncello: { titel: 'Hierber Limoncello', abv: 28, farbe: '#5b5a1c', typ: 'rund' },
};
// Flüssigkeitsfarben der Platzhalter-Flaschen (kein Foto vorhanden)
export const PLATZHALTER_FLUESSIG = { sambuca: '#f2f6f4', limoncello: '#f2d63a' };

// Kontakt und Fußzeile
export const KONTAKT = {
  firma: 'Hierber Brennerei Sàrl',
  adresse: '2, Millewee · L-6665 Herborn',
  mail: 'info@hierber-brennerei.lu',
  web: 'www.hierber-brennerei.lu',
  hinweis: 'Alle Preise inkl. 17 % MwSt. (Preisliste 2025)',
};

export const fmtPreis = (n) => `${n} €`;
