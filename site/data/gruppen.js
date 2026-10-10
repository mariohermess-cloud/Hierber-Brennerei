// Gruppen der Theke (Entwurf der Zuordnung; unklare Fälle stehen in TODO-INHALTE.md).
// Die Reihenfolge der Gruppen und der Sorten innerhalb der Gruppe bestimmt die Anzeige.
export const GRUPPEN = [
  { id: 'obstbraende', ids: ['kirsch', 'framboise', 'quetsch', 'poire-williams', 'mirabelle', 'poire', 'neelchesbiren', 'lenschouren', 'kiwibeeren', 'hondsaarsch', 'vullekiischt', 'schleiwen'] },
  { id: 'geraeift', ids: ['willi-op-biren-geraeift', 'mirabelle-op-mirabellen-geraeift', 'quetsch-op-quetsch-geraeift'] },
  { id: 'gereift', ids: ['hierber-fruucht', 'vieux-marc', 'vieille-prune', 'vieille-pomme'] },
  { id: 'dreppen', ids: ['hunnegdrepp', 'kraeiderdrepp', 'kuerbisdrepp', 'vizdrepp'] },
  { id: 'spirituosen', ids: ['gin', 'wodka', 'rum', 'rum-orange', 'whisky', 'hunneg-whisky', 'grain', 'sambuca', 'limoncello', 'hierberol'] },
  { id: 'likoere', ids: ['de-welle-max', 'hambierlikoer', 'holly', 'kiischtenlikoer', 'kraeiderlikoer', 'mandellikoer', 'mirabellenlikoer', 'nesslikoer', 'pfeffi', 'pijenlikoer', 'quittenlikoer', 'schleiwenlikoer', 'vizlikoer', 'williamslikoer', 'winterdreams', 'ingwerlikoer'] },
  { id: 'weitere-braende', ids: ['aeppel-pommes', 'quitten', 'nessdrepp', 'pefferminz', 'pastis', 'neutral-alkohol'] },
];
export const gruppeVon = (id) => GRUPPEN.find((g) => g.ids.includes(id)).id;
