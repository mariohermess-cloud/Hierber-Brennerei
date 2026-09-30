// ENTWURF: Zuordnung Sorte -> Anlass. Noch nicht vom Brenner bestätigt (siehe TODO-INHALTE.md).
export const ANLAESSE = ['digestif', 'sommer', 'kueche', 'geschenk'];

export const ZUORDNUNG = {
  digestif: ['kirsch', 'framboise', 'quetsch', 'poire-williams', 'mirabelle', 'poire', 'neelchesbiren', 'lenschouren', 'hondsaarsch', 'vullekiischt', 'schleiwen',
    'hierber-fruucht', 'vieux-marc', 'vieille-prune', 'vieille-pomme', 'hunnegdrepp', 'kraeiderdrepp', 'vizdrepp', 'whisky', 'hunneg-whisky', 'rum', 'grain', 'sambuca'],
  sommer: ['gin', 'wodka', 'rum', 'rum-orange', 'whisky', 'mirabelle', 'framboise', 'quetsch', 'kiwibeeren', 'poire', 'hondsaarsch', 'vieille-pomme', 'vizdrepp',
    'kuerbisdrepp', 'grain', 'limoncello', 'hunneg-whisky', 'kraeiderdrepp'],
  kueche: ['kirsch', 'framboise', 'quetsch', 'poire-williams', 'mirabelle', 'poire', 'lenschouren', 'vieille-prune', 'vieille-pomme', 'vizdrepp', 'hunnegdrepp',
    'kuerbisdrepp', 'schleiwen', 'vullekiischt', 'rum', 'rum-orange', 'whisky', 'hunneg-whisky', 'sambuca', 'limoncello', 'gin', 'hierber-fruucht', 'vieux-marc', 'kiwibeeren', 'neelchesbiren'],
  geschenk: ['gin', 'whisky', 'hunneg-whisky', 'rum', 'hierber-fruucht', 'vieux-marc', 'vieille-prune', 'vieille-pomme', 'poire-williams', 'mirabelle', 'quetsch',
    'kirsch', 'framboise', 'hunnegdrepp', 'vizdrepp', 'kraeiderdrepp', 'limoncello', 'rum-orange'],
};
export const anlaesseVon = (id) => ANLAESSE.filter((a) => ZUORDNUNG[a].includes(id));
