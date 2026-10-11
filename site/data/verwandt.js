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
  // Geräift hat nur drei Sorten; die dritte Karte ist der Brand, der dem Geräift den Namen gibt
  'willi-op-biren-geraeift': ['mirabelle-op-mirabellen-geraeift', 'quetsch-op-quetsch-geraeift', 'poire-williams'],
  'mirabelle-op-mirabellen-geraeift': ['quetsch-op-quetsch-geraeift', 'willi-op-biren-geraeift', 'mirabelle'],
  'quetsch-op-quetsch-geraeift': ['mirabelle-op-mirabellen-geraeift', 'willi-op-biren-geraeift', 'quetsch'],
  // Mirabelle op Mirabellen Likör: die Mirabellen-Sorten (Likör, Geräift, Brand) statt der alphabetischen Nachbarn
  'mirabelle-op-mirabellen-likoer': ['mirabellenlikoer', 'mirabelle-op-mirabellen-geraeift', 'mirabelle'],
  hierberol: ['limoncello', 'gin', 'sambuca'], // sonst käme der Umlauf der Gruppe: Gin, Wodka, Rum
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
