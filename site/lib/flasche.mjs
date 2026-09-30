// Vektor-Flasche (flächig, ruhig): Silhouette + Füllung in Sortenfarbe als inline-SVG, darüber das aktuelle flache Etikett als Bild.
// Das Etikett liegt als <picture> (AVIF/WebP/JPEG, srcset, lazy) in einem absolut positionierten Feld statt als SVG-<image>,
// damit die Bildpipeline und natives lazy loading greifen. Seitenverhältnis, Etikettenbreite und -oberkante sind je Flaschentyp einheitlich.
import { ETIKETTEN } from '../data/etiketten.js';
import { FLUESSIGKEIT } from '../data/fluessigkeit.js';
import { FLASCHENTYP, KAPPE, KAPPE_STANDARD } from '../data/flaschen.js';
import { esc, fmtMenge } from './util.mjs';
import { bild } from './layout.mjs';

// Geometrie im viewBox-System. fuell = Oberkante der Flüssigkeit, label = Oberkante/Breite des Etiketts, hoehe = Flaschenhöhe in % der Bühne.
export const TYP = {
  schlank: { w: 100, h: 380, fuell: 82, label: { x: 16, y: 206, w: 68 }, hoehe: 88,
    koerper: 'M41 28H59V104C59 128 92 134 92 166V366Q92 374 84 374H16Q8 374 8 366V166C8 134 41 128 41 104Z',
    kappe: '<rect x="35" y="2" width="30" height="15" rx="6" style="fill:var(--kappe)"/><rect x="43" y="16" width="14" height="14" fill="#b98f55"/>',
    glanz: 'M19 178V350' },
  rund: { w: 100, h: 236, fuell: 72, label: { x: 9, y: 140, w: 82 }, hoehe: 68,
    koerper: 'M36 24H64V62C64 75 94 80 94 112V226Q94 234 86 234H14Q6 234 6 226V112C6 80 36 75 36 62Z',
    kappe: '<rect x="34" y="3" width="32" height="22" rx="4" style="fill:var(--kappe)"/>',
    glanz: 'M16 128V214' },
  karaffe: { w: 100, h: 300, fuell: 100, label: { x: 12, y: 192, w: 76 }, hoehe: 76,
    koerper: 'M41 40H59V92C59 112 94 118 94 156V288Q94 296 86 296H14Q6 296 6 288V156C6 118 41 112 41 92Z',
    kappe: '<rect x="34" y="2" width="32" height="10" rx="3" style="fill:var(--kappe)"/><rect x="38" y="12" width="24" height="28" rx="2" style="fill:var(--kappe)"/>',
    glanz: 'M16 170V280' },
};
const STRICH = '#3b2c20';

// Einmal pro Seite: Umrisse und Klippflächen (ids sind dokumentweit gültig).
export const FLASCHEN_DEFS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>${Object.entries(TYP).map(([n, t]) =>
  `<clipPath id="cp-${n}"><path d="${t.koerper}"/></clipPath>`
  + `<g id="gl-${n}"><path d="${t.koerper}" fill="#fff" fill-opacity=".3"/></g>`
  + `<g id="ou-${n}"><path d="${t.koerper}" fill="none" stroke="${STRICH}" stroke-width="1.6" stroke-linejoin="round"/>${t.kappe.replace(/<(rect)/g, `<$1 stroke="${STRICH}" stroke-width="1.2"`)}<path d="${t.glanz}" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round" fill="none"/></g>`).join('')}</defs></svg>`;

export const typVon = (id) => FLASCHENTYP[id];

// Etikettenfeld (in % der Flaschengrafik) für ein Etikett mit Seitenverhältnis sv (Breite/Höhe)
export function labelFeld(typ, sv) {
  const t = TYP[typ], L = t.label, h = L.w / sv;
  return { x: L.x, y: L.y, w: L.w, h, left: (L.x / t.w) * 100, top: (L.y / t.h) * 100, width: (L.w / t.w) * 100, height: (h / t.h) * 100 };
}

export function fuellung(id) { return FLUESSIGKEIT[id]; }

// Inline-SVG-Flasche mit Etikettenbild (nur für Sorten mit flachem Etikett).
// gross: Sortenseite (Etikett eager, größere Bildquelle); sonst Karte (lazy, kleine Quelle).
export function flasche(IMG, p, { gross = false, label = true } = {}) {
  const typ = typVon(p.id), t = TYP[typ], f = FLUESSIGKEIT[p.id];
  const m = IMG[`label-${p.id}`];
  const feld = labelFeld(typ, m.quelleW / m.quelleH);
  const kappe = KAPPE[p.id] || (typ === 'schlank' ? 'rgba(255,255,255,.6)' : KAPPE_STANDARD);
  const svg = `<svg viewBox="0 0 ${t.w} ${t.h}" aria-hidden="true" focusable="false"><use href="#gl-${typ}"/>`
    + `<rect x="0" y="${t.fuell}" width="${t.w}" height="${t.h - t.fuell}" clip-path="url(#cp-${typ})" fill="${f.farbe}" fill-opacity="${f.alpha}"/><use href="#ou-${typ}"/></svg>`;
  const pic = bild(IMG, `label-${p.id}`, { alt: '', sizes: gross ? '(min-width: 800px) 110px, 96px' : '(min-width: 1000px) 64px, 56px', cls: 'fl-bild', eager: gross });
  const f4 = (n) => n.toFixed(2).replace(/\.?0+$/, '');
  const groessen = p.varianten.flatMap((v) => v.preise.map((x) => x.menge));
  const eine = [...new Set(groessen)];
  const aria = `Flasche ${p.name}${eine.length === 1 ? `, ${fmtMenge(eine[0])}` : ''}`;
  return `<span class="flasche flasche-${typ}" data-fuellung="${f.geschaetzt ? 'geschaetzt' : 'foto'}" style="--kappe:${kappe};--fh:${t.hoehe}cqh;--ar:${t.w}/${t.h}"${gross ? ` role="img" aria-label="${esc(aria)}"` : ' aria-hidden="true"'}>`
    + svg + `<span class="fl-etikett" style="left:${f4(feld.left)}%;top:${f4(feld.top)}%;width:${f4(feld.width)}%;height:${f4(feld.height)}%">${pic}</span></span>`;
}

// Eigenständiges SVG (ohne <use>, ohne CSS-Variablen) für die Rasterung der OG-Bilder. Etikett wird vom Aufrufer eingesetzt.
export function flascheStandalone(id) {
  const typ = typVon(id), t = TYP[typ], f = FLUESSIGKEIT[id];
  const kappe = KAPPE[id] || (typ === 'schlank' ? '#e9ecec' : KAPPE_STANDARD);
  const k = t.kappe.replace(/style="fill:var\(--kappe\)"/g, `fill="${kappe}"`).replace(/<(rect)/g, `<$1 stroke="${STRICH}" stroke-width="1.2"`);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${t.w} ${t.h}" width="${t.w * 4}" height="${t.h * 4}"><defs><clipPath id="c"><path d="${t.koerper}"/></clipPath></defs>`
    + `<path d="${t.koerper}" fill="#fff" fill-opacity=".3"/><rect x="0" y="${t.fuell}" width="${t.w}" height="${t.h - t.fuell}" clip-path="url(#c)" fill="${f.farbe}" fill-opacity="${f.alpha}"/>`
    + `<path d="${t.koerper}" fill="none" stroke="${STRICH}" stroke-width="1.6" stroke-linejoin="round"/>${k}<path d="${t.glanz}" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round" fill="none"/></svg>`;
}
