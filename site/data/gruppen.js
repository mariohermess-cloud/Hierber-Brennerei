// Gruppen der Theke (Entwurf der Zuordnung; unklare Fälle stehen in TODO-INHALTE.md).
// Die Reihenfolge der Gruppen und der Sorten innerhalb der Gruppe bestimmt die Anzeige.
export const GRUPPEN = [
  { id: 'obstbraende', ids: ['kirsch', 'framboise', 'quetsch', 'poire-williams', 'mirabelle', 'poire', 'neelchesbiren', 'lenschouren', 'kiwibeeren', 'hondsaarsch', 'vullekiischt', 'schleiwen'] },
  { id: 'gereift', ids: ['hierber-fruucht', 'vieux-marc', 'vieille-prune', 'vieille-pomme'] },
  { id: 'dreppen', ids: ['hunnegdrepp', 'kraeiderdrepp', 'kuerbisdrepp', 'vizdrepp'] },
  { id: 'spirituosen', ids: ['gin', 'wodka', 'rum', 'rum-orange', 'whisky', 'hunneg-whisky', 'grain', 'sambuca', 'limoncello'] },
];
export const gruppeVon = (id) => GRUPPEN.find((g) => g.ids.includes(id)).id;
