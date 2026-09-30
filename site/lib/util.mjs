export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const NB = ' ';
export const fmtPreis = (n) => `${n}${NB}€`;
export const fmtAbv = (n) => `${n}${NB}%${NB}vol.`;
export const fmtMenge = (m) => m.replace(' ', NB);
export const BASE = 'https://hierber-brennerei.lu';

// Pfade: DE-Pfad wie '/brand/kirsch/'; FR bekommt das Präfix /fr
export const pfad = (lang, p) => (lang === 'fr' ? `/fr${p}` : p);
export const absUrl = (lang, p) => `${BASE}${pfad(lang, p)}`;

// Preisübersicht einer Sorte (über alle Varianten)
export function preisInfo(produkt) {
  const alle = produkt.varianten.flatMap((v) => v.preise.map((x) => x.preis));
  return alle.length ? { min: Math.min(...alle), max: Math.max(...alle), anzahl: alle.length } : null;
}

// Name ohne Klammerzusatz und Erklärung aus der Klammer, wie in produkte.js hinterlegt: "Hondsaarsch (Mispel)"
export function erklaerung(produkt) {
  const v = produkt.varianten[0].name;
  const m = v.match(/^(.+?)\s*\((.+)\)$/);
  return m ? { lux: m[1], de: m[2] } : null;
}
