// ENTWURF: "Passt auch" – drei verwandte Sorten. Explizite Paare, sonst die nächsten Sorten derselben Gruppe.
import { GRUPPEN, gruppeVon } from './gruppen.js';

const EXPLIZIT = {
  gin: ['wodka', 'limoncello', 'whisky'],
  wodka: ['gin', 'grain', 'limoncello'],
  rum: ['rum-orange', 'whisky', 'hierber-fruucht'],
  'rum-orange': ['rum', 'limoncello', 'hunneg-whisky'],
  whisky: ['hunneg-whisky', 'rum', 'hierber-fruucht'],
  'hunneg-whisky': ['whisky', 'hunnegdrepp', 'hierber-fruucht'],
  quetsch: ['vieille-prune', 'mirabelle', 'lenschouren'],
  mirabelle: ['quetsch', 'lenschouren', 'vieille-prune'],
  'vieille-prune': ['quetsch', 'mirabelle', 'vieille-pomme'],
  'vieille-pomme': ['vizdrepp', 'vieille-prune', 'poire-williams'],
  vizdrepp: ['vieille-pomme', 'poire-williams', 'hierber-fruucht'],
  'poire-williams': ['poire', 'neelchesbiren', 'vieille-pomme'],
  hunnegdrepp: ['hunneg-whisky', 'kraeiderdrepp', 'vizdrepp'],
};

export function verwandtFuer(id) {
  if (EXPLIZIT[id]) return EXPLIZIT[id];
  const g = GRUPPEN.find((x) => x.id === gruppeVon(id));
  const i = g.ids.indexOf(id);
  const aus = [];
  for (let k = 1; aus.length < 3 && k < g.ids.length + 3; k++) {
    const kand = g.ids[(i + k) % g.ids.length];
    if (kand !== id && !aus.includes(kand)) aus.push(kand);
  }
  return aus;
}
