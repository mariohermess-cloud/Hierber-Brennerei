// Vektor-Flasche (flächig, ruhig): Silhouette + Füllung in Sortenfarbe als inline-SVG, darüber das aktuelle flache Etikett als Bild.
// Das Etikett liegt als <picture> (AVIF/WebP/JPEG, srcset, lazy) in einem absolut positionierten Feld statt als SVG-<image>,
// damit die Bildpipeline und natives lazy loading greifen. Seitenverhältnis, Etikettenbreite und -oberkante sind je Flaschentyp einheitlich.
import { ETIKETTEN } from '../data/etiketten.js';
import { FLUESSIGKEIT } from '../data/fluessigkeit.js';
import { FLASCHENTYP, KAPPE, KAPPE_STANDARD } from '../data/flaschen.js';
import { GROESSEN_SUFFIX, HAUPT_MENGE } from '../data/flaschenfotos.js';
import { esc, fmtMenge } from './util.mjs';
import { bild } from './layout.mjs';

// Geometrie im viewBox-System. fuell = Oberkante der Flüssigkeit, hoehe = Flaschenhöhe in % der Bühne.
// label: Etikett mittig auf dem geraden Körper (Körper x 6..94): w = Soll-Breite (ca. 90 % der Körperbreite), y = Oberkante, maxH = größte Höhe.
// sag = Durchhang der gewölbten Ober-/Unterkante in viewBox-Einheiten. Das Etikett umschließt rechnerisch den halben Umfang (siehe bilder.mjs, WRAP).
export const TYP = {
  schlank: { w: 100, h: 312, fuell: 40, label: { w: 80, y: 114, maxH: 168, sag: 3 }, hoehe: 92,
    koerper: 'M41 22H59V50C59 76 94 80 94 112V288Q94 296 86 296H14Q6 296 6 288V112C6 80 41 76 41 50Z',
    kappe: '<rect x="35" y="2" width="30" height="14" rx="6" style="fill:var(--kappe)"/><rect x="43" y="15" width="14" height="9" fill="#b98f55"/>',
    glanz: 'M10 150V280' },
  rund: { w: 100, h: 204, fuell: 34, label: { w: 82, y: 112, maxH: 76, sag: 3 }, hoehe: 74,
    koerper: 'M36 22H64V50C64 66 94 72 94 104V190Q94 198 86 198H14Q6 198 6 190V104C6 72 36 66 36 50Z',
    kappe: '<rect x="34" y="3" width="32" height="22" rx="4" style="fill:var(--kappe)"/>',
    glanz: 'M11 180V190' },
  karaffe: { w: 100, h: 262, fuell: 84, label: { w: 82, y: 142, maxH: 104, sag: 3 }, hoehe: 84,
    koerper: 'M41 40H59V76C59 94 94 100 94 128V250Q94 258 86 258H14Q6 258 6 250V128C6 100 41 94 41 76Z',
    kappe: '<rect x="34" y="2" width="32" height="10" rx="3" style="fill:var(--kappe)"/><rect x="38" y="12" width="24" height="28" rx="2" style="fill:var(--kappe)"/>',
    glanz: 'M12 224V246' },
};
const STRICH = '#3b2c20';

// Gewölbte Ober- und Unterkante des Etiketts (Ellipsenbogen, Mitte hängt durch wie bei einem um die Flasche gelegten Etikett) als Pfad in Bruchteilen der Etikettenbox.
// Nenn-Etikettenhöhe je Typ, damit der Durchhang in viewBox-Einheiten ähnlich bleibt.
const NENNHOEHE = { schlank: 165, rund: 62, karaffe: 74 };
function etikettKante(typ) {
  const e = TYP[typ].label.sag / NENNHOEHE[typ];
  return `M0 0Q.5 ${(2 * e).toFixed(4)} 1 0V${(1 - e).toFixed(4)}Q.5 ${(1 + e).toFixed(4)} 0 ${(1 - e).toFixed(4)}Z`;
}

// Einmal pro Seite: Umrisse und Klippflächen (ids sind dokumentweit gültig).
export const FLASCHEN_DEFS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>${Object.entries(TYP).map(([n, t]) =>
  `<clipPath id="cp-${n}"><path d="${t.koerper}"/></clipPath>`
  + `<clipPath id="cl-${n}" clipPathUnits="objectBoundingBox"><path d="${etikettKante(n)}"/></clipPath>`
  + `<g id="gl-${n}"><path d="${t.koerper}" fill="#fff" fill-opacity=".3"/></g>`
  + `<g id="ou-${n}"><path d="${t.koerper}" fill="none" stroke="${STRICH}" stroke-width="1.6" stroke-linejoin="round"/>${t.kappe.replace(/<(rect)/g, `<$1 stroke="${STRICH}" stroke-width="1.2"`)}<path d="${t.glanz}" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round" fill="none"/></g>`).join('')}</defs></svg>`;

export const typVon = (id) => FLASCHENTYP[id];

// Etikettenfeld (in % der Flaschengrafik) für das vorverzerrte Etikettenbild mit Seitenverhältnis sv (Breite/Höhe).
// Breite = Soll-Breite, bei hohen Etiketten verkleinert, bis die Höhe auf den geraden Körper passt. Mittig.
export function labelFeld(typ, sv) {
  const t = TYP[typ], L = t.label, w = Math.min(L.w, L.maxH * sv), h = w / sv, x = (t.w - w) / 2;
  return { x, y: L.y, w, h, left: (x / t.w) * 100, top: (L.y / t.h) * 100, width: (w / t.w) * 100, height: (h / t.h) * 100 };
}

export function fuellung(id) { return FLUESSIGKEIT[id]; }

// Inline-SVG-Flasche mit Etikettenbild (nur für Sorten mit flachem Etikett).
// gross: Sortenseite (Etikett eager, größere Bildquelle); sonst Karte (lazy, kleine Quelle).
// attrs: zusätzliche Attribute für das äußere <span> (Bühne: data-bild-haupt, hidden); eager: Etikettenbild sofort laden (Vorgabe: gross)
export function flasche(IMG, p, { gross = false, label = true, attrs = '', eager = gross } = {}) {
  const typ = typVon(p.id), t = TYP[typ], f = FLUESSIGKEIT[p.id];
  const m = IMG[`label-${p.id}`];
  const feld = labelFeld(typ, m.w / m.h);
  const kappe = KAPPE[p.id] || (typ === 'schlank' ? 'rgba(255,255,255,.6)' : KAPPE_STANDARD);
  const svg = `<svg viewBox="0 0 ${t.w} ${t.h}" aria-hidden="true" focusable="false"><use href="#gl-${typ}"/>`
    + `<rect x="0" y="${t.fuell}" width="${t.w}" height="${t.h - t.fuell}" clip-path="url(#cp-${typ})" fill="${f.farbe}" fill-opacity="${f.alpha}"/><use href="#ou-${typ}"/></svg>`;
  const pic = bild(IMG, `label-${p.id}`, { alt: '', sizes: gross ? '(min-width: 800px) 210px, 130px' : '(min-width: 1000px) 100px, 80px', cls: 'fl-bild', eager });
  const f4 = (n) => n.toFixed(2).replace(/\.?0+$/, '');
  const groessen = p.varianten.flatMap((v) => v.preise.map((x) => x.menge));
  const eine = [...new Set(groessen)];
  const aria = `Flasche ${p.name}${eine.length === 1 ? `, ${fmtMenge(eine[0])}` : ''}`;
  return `<span class="flasche flasche-${typ}" data-fuellung="${f.geschaetzt ? 'geschaetzt' : 'foto'}" style="--kappe:${kappe};--fh:${t.hoehe}cqh;--ar:${t.w}/${t.h}"${attrs}${gross ? ` role="img" aria-label="${esc(aria)}"` : ' aria-hidden="true"'}>`
    + svg + `<span class="fl-etikett" style="left:${f4(feld.left)}%;top:${f4(feld.top)}%;width:${f4(feld.width)}%;height:${f4(feld.height)}%">${pic}</span></span>`;
}

// Neu erzeugte Produktflasche (Foto fotos-flaschen/<id>.png, Hochformat 2:3, heller Studiogrund) statt der Vektor-Flasche.
// Der Grund ist auf Weiß normalisiert und wird per mix-blend-mode: multiply auf die Bühnenfarbe gelegt (CSS .flasche-foto). Alt-Text wie bei der Vektor-Flasche.
// gross: Sortenseite (LCP: eager, fetchpriority high); sonst Karte (lazy).
// Bühne der Sortenseite: key = Bildschlüssel (Vorgabe flasche-<id>), alt = Alt-Text am Bild (dann ohne role/aria-label am <span>), eager = sofort laden (nur das sichtbare Bild),
// attrs = zusätzliche Attribute am <span> (data-bild-haupt, data-bild-menge, hidden).
export function flaschenFoto(IMG, p, { gross = false, key = `flasche-${p.id}`, alt = '', eager = gross, attrs = '' } = {}) {
  const pic = bild(IMG, key, { alt, sizes: gross ? '(min-width: 800px) 480px, 75vw' : '(min-width: 1000px) 240px, 45vw', cls: 'ff-bild', eager });
  if (alt) return `<span class="flasche-foto"${attrs}>${pic}</span>`;
  const eine = [...new Set(p.varianten.flatMap((v) => v.preise.map((x) => x.menge)))];
  const aria = `Flasche ${p.name}${eine.length === 1 ? `, ${fmtMenge(eine[0])}` : ''}`;
  return `<span class="flasche-foto"${attrs}${gross ? ` role="img" aria-label="${esc(aria)}"` : ' aria-hidden="true"'}>${pic}</span>`;
}

// Größen der Sorte (Preisliste, alle Varianten, ohne 0,5 L) mit Größenbild: [{ menge, key }] in Reihenfolge der Preisliste.
export function groessenFotos(IMG, p) {
  const mengen = [...new Set(p.varianten.flatMap((v) => v.preise.map((x) => x.menge)))];
  return mengen.filter((m) => m !== HAUPT_MENGE && GROESSEN_SUFFIX[m] && IMG[`flasche-${p.id}-${GROESSEN_SUFFIX[m]}`]).map((m) => ({ menge: m, key: `flasche-${p.id}-${GROESSEN_SUFFIX[m]}` }));
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
