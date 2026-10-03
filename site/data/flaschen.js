// Flaschenform und Verschluss je Sorte (Typen laut v2/data/etiketten.json: schlank, rund, karaffe).
// Gin und Whisky: Form der Theke-Aufnahme (flaschenreihe-theke.jpg) nur sinngemäß: Gin runde Flasche mit blauem Etikett,
// Whisky Flasche mit schwarzem Etikett und schwarzem Verschluss. Beides als Typ "rund" angenähert (TODO-INHALTE.md).
const SCHLANK = ['kirsch', 'framboise', 'quetsch', 'poire-williams', 'mirabelle', 'poire', 'neelchesbiren', 'lenschouren', 'kiwibeeren', 'hondsaarsch',
  'vullekiischt', 'schleiwen', 'vieille-prune', 'vieille-pomme', 'hunnegdrepp', 'kraeiderdrepp', 'kuerbisdrepp', 'grain'];
export const FLASCHENTYP = {
  ...Object.fromEntries(SCHLANK.map((id) => [id, 'schlank'])),
  'vieux-marc': 'karaffe',
  gin: 'rund', wodka: 'rund', whisky: 'rund', 'hunneg-whisky': 'rund', 'hierber-fruucht': 'rund', vizdrepp: 'rund',
  rum: 'rund', 'rum-orange': 'rund', sambuca: 'rund', limoncello: 'rund',
};
// Verschlussfarbe (Kork ist Standard der runden Flasche)
// Kappen laut Nutzerfotos: Wodka Silber (Alu), Fruucht Holz, Rum Holz/Kork; Gin und Whisky nach Theke-Aufnahme.
export const KAPPE = { gin: '#5b7490', whisky: '#17130f', 'hunneg-whisky': '#17130f', 'vieux-marc': '#1c1714', wodka: '#b4b6b7', 'hierber-fruucht': '#7a4a30' };
export const KAPPE_STANDARD = '#8b5e3c';

// Sorten, für die ein echtes Produktfoto (schwarzer Grund) statt der Vektor-Flasche das Bild ist. Derzeit keine:
// auch Rum, Rum Orange, Limoncello und Sambuca haben jetzt ein flaches Etikett (Regel: immer das aktuelle Etikett auf die Flasche).
// Die Produktfotos in fotos/ (flaschen-*.webp) bleiben Farb- und Formreferenz. Struktur wie bisher:
// haupt = Bild auf der Sortenseite, karte = Bild in der Karte (Ausschnitt per object-position), og = OG-Bild.
export const FOTO_SORTEN = {};
