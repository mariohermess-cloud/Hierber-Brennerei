// Misst die Flüssigkeitsfarbe der Sorten aus den Flaschenfotos in Fotos/ (Großschreibung! nicht fotos/) und schreibt NUR einen Bericht.
// Aufruf: node tools/fluessigkeit_messen.mjs [--debug <Ordner>]   -> FLUESSIGKEIT-MESSUNG.md im Repo-Wurzelverzeichnis
// fluessigkeit.js wird NICHT verändert; die Werte werden von Hand (Chef) übernommen.
//
// Methode (ein Satz): Pro Foto (Weißgrund, Flasche mittig) wird der Flaschenkörper über dem Etikett bestimmt (Etikettoberkante = erste Zeile mit starkem Kontrast
// in der Flaschenmitte), dort der Median einer Fläche im geraden Körper (Mittelachse +-12 % Flaschenbreite, abseits von Rand, Schulter und Glanzlicht,
// obere 40 % der Helligkeitsverteilung der Fläche ausgeschlossen = Glanzlicht) gebildet, gegen das "leere Glas" bewertet (Median der farblosen Referenzflaschen,
// auf die Hintergrundhelligkeit des Fotos skaliert) und die Flüssigkeitsfarbe daraus bei Deckkraft 0,85 entmischt: C = (O - 0,15 R) / 0,85, d. h. der Weißgrund,
// der durch das Glas scheint, wird herausgerechnet; ist der Abstand zur Referenz klein (Sättigungsabstand < SCHWELLE), gilt die Füllung als klar (Wasserfarbe).
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const wurzel = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const FOTOS = path.join(wurzel, 'Fotos'); // vom Nutzer, groß geschrieben; Ordner fotos/ (klein) ist ein anderer Ordner
const SCHWELLE = 14;     // max. Kanalabstand (0-255) zur Referenz, darunter "klar"
const DECKKRAFT = 0.85;  // Deckkraft der Füllung beim Entmischen (entspricht der Darstellung in flasche.mjs)
const BREITE = 600;

// Datei -> Sorten-ID (aus site/data/produkte.js) oder Text für "nicht auf der Seite"; sicher = Etikett eindeutig lesbar
export const ZUORDNUNG = {
  'flasche-poire-williams-altes-etikett.jpg': { sorte: 'poire-williams', altes: true }, 'flasche-mirabelle-altes-etikett.jpg': { sorte: 'mirabelle', altes: true }, 'flasche-neelchesbiren-altes-etikett.jpg': { sorte: 'neelchesbiren', altes: true },
  'flasche-framboise-altes-etikett.jpg': { sorte: 'framboise', altes: true }, 'flasche-quetsch-altes-etikett.jpg': { sorte: 'quetsch', altes: true }, 'flasche-quetsch-altes-etikett-2.jpg': { sorte: 'quetsch', altes: true },
  'flasche-pomme-altes-etikett.jpg': { sorte: null, text: 'Pomme (Apfel, altes Etikett)', altes: true }, 'flasche-pomme-altes-etikett-2.jpg': { sorte: null, text: 'Pomme (Apfel, altes Etikett)', altes: true }, 'flasche-kirsch-altes-etikett.jpg': { sorte: 'kirsch', altes: true },
  'flasche-poire.jpg': { sorte: 'poire' }, 'flasche-poire-2.jpg': { sorte: 'poire' }, 'flasche-lenschouren.jpg': { sorte: 'lenschouren' }, 'flasche-mirabelle.jpg': { sorte: 'mirabelle' },
  'flasche-schleiwen.jpg': { sorte: 'schleiwen' }, 'flasche-kirsch.jpg': { sorte: 'kirsch' }, 'flasche-neelchesbiren.jpg': { sorte: 'neelchesbiren' }, 'flasche-kirsch-2.jpg': { sorte: 'kirsch' },
  'flasche-framboise.jpg': { sorte: 'framboise' }, 'flasche-poire-williams.jpg': { sorte: 'poire-williams' }, 'flasche-quetsch.jpg': { sorte: 'quetsch' }, 'flasche-kraeiderdrepp.jpg': { sorte: 'kraeiderdrepp' },
  'flasche-hunnegdrepp.jpg': { sorte: 'hunnegdrepp' }, 'flasche-pefferminz.jpg': { sorte: null, text: 'Peffermënz (nicht auf der Seite)' }, 'flasche-kiwibeeren.jpg': { sorte: 'kiwibeeren' },
  'flasche-noessdrepp.jpg': { sorte: null, text: 'Nëssdrëpp (nicht auf der Seite)' }, 'flasche-vieille-pomme.jpg': { sorte: 'vieille-pomme' }, 'flasche-vieille-prune.jpg': { sorte: 'vieille-prune' },
  'flasche-williamsdrepp-nogeraeift.jpg': { sorte: null, text: 'Williamsdrëpp op Biren nogeräift, 35 % (Variante von Poire Williams; nicht Hauptsorte)' }, 'flasche-vizdrepp.jpg': { sorte: 'vizdrepp' },
  'flasche-likoer-williams.jpg': { sorte: null, text: 'Williamslikör (nicht auf der Seite)' }, 'flasche-likoer-viz.jpg': { sorte: null, text: 'Vizlikör, Apfel (nicht auf der Seite)' },
  'flasche-likoer-quitten.jpg': { sorte: null, text: 'Quittenlikör (nicht auf der Seite)' }, 'flasche-likoer-waldfruechte.jpg': { sorte: null, text: 'De wëlle Mix, Waldfrüchte-Likör (nicht auf der Seite)' },
  'flasche-likoer-schleiwen.jpg': { sorte: null, text: 'Schléiwenlikör (nicht auf der Seite)' }, 'flasche-likoer-pije.jpg': { sorte: null, text: 'Pijenlikör, Aprikose (nicht auf der Seite)' },
  'flasche-likoer-hambier.jpg': { sorte: null, text: 'Hambierlikör, Himbeere (nicht auf der Seite)' }, 'flasche-likoer-mirabellen.jpg': { sorte: null, text: 'Mirabellenlikör (nicht auf der Seite)' },
  'flasche-likoer-mandel.jpg': { sorte: null, text: 'Mandellikör (nicht auf der Seite)' }, 'flasche-likoer-kiischten.jpg': { sorte: null, text: 'Kiischtenlikör, Kirsche (nicht auf der Seite)' },
  'flasche-likoer-kraider.jpg': { sorte: null, text: 'Kräiderlikör (nicht auf der Seite)' },
};
// Referenz "leeres Glas": Flaschen, deren Füllung klar ist (Kirsch, Framboise, Poire, Lënschouren, Kräiderdrëpp, Kiwibeeren; Etikett eindeutig, Füllung farblos)
const REFERENZ = ['flasche-kirsch.jpg', 'flasche-kirsch-2.jpg', 'flasche-framboise.jpg', 'flasche-poire.jpg', 'flasche-lenschouren.jpg', 'flasche-kraeiderdrepp.jpg', 'flasche-kiwibeeren.jpg'];

const med = (a) => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
const hex = (c) => '#' + c.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');

async function lade(datei) {
  const { data, info } = await sharp(path.join(FOTOS, datei)).resize({ width: BREITE }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  return { data, w: info.width, h: info.height };
}
const lum = (d, i) => 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];

// Flasche finden: Hintergrund je Zeile = Median der äußeren 6 % links/rechts; Flaschenrand = Abweichung > 10 in Helligkeit (Glasrand wirft Schatten/Kante)
function geometrie({ data, w, h }) {
  const bg = new Array(h), links = new Array(h).fill(null), rechts = new Array(h).fill(null);
  for (let y = 0; y < h; y++) {
    const v = [];
    for (let x = 0; x < w * 0.06; x++) { v.push(lum(data, (y * w + x) * 3)); v.push(lum(data, (y * w + (w - 1 - x)) * 3)); }
    bg[y] = med(v);
    for (let x = Math.round(w * 0.2); x < w / 2; x++) if (Math.abs(lum(data, (y * w + x) * 3) - bg[y]) > 10) { links[y] = x; break; }
    for (let x = Math.round(w * 0.8); x > w / 2; x--) if (Math.abs(lum(data, (y * w + x) * 3) - bg[y]) > 10) { rechts[y] = x; break; }
  }
  const zeilen = []; for (let y = 0; y < h; y++) if (links[y] != null && rechts[y] != null && rechts[y] - links[y] > w * 0.05) zeilen.push(y);
  const top = zeilen[0], boden = zeilen[zeilen.length - 1];
  const H = boden - top;
  // Flaschenbreite im geraden Körper: Median über 45-60 % der Flaschenhöhe
  const bl = [], br = [];
  for (let y = top + Math.round(H * 0.45); y < top + Math.round(H * 0.6); y++) if (links[y] != null && rechts[y] != null) { bl.push(links[y]); br.push(rechts[y]); }
  const L = med(bl), R = med(br), cx = (L + R) / 2, bw = R - L;
  // Etikettoberkante: erste Zeile ab 40 % Höhe, in der die Helligkeit in der Flaschenmitte vom Median der Körperzeilen darüber stark abweicht ODER hohe Streuung hat
  const std = (y) => { const v = []; for (let x = Math.round(cx - bw * 0.3); x <= Math.round(cx + bw * 0.3); x++) v.push(lum(data, (y * w + x) * 3)); const m = v.reduce((a, b) => a + b, 0) / v.length; return Math.sqrt(v.reduce((a, b) => a + (b - m) ** 2, 0) / v.length); };
  const mitte = (y) => { const v = []; for (let x = Math.round(cx - bw * 0.1); x <= Math.round(cx + bw * 0.1); x++) v.push(lum(data, (y * w + x) * 3)); return med(v); };
  let label = null;
  for (let y = top + Math.round(H * 0.4); y < boden; y++) if (std(y) > 20) { label = y; break; }
  return { top, boden, H, cx, bw, L, R, label, bgMedian: med(bg), mitte };
}

// Probe: gerader Körper zwischen Schulter (ca. 42 % der Flaschenhöhe) und Etikettoberkante; Mittelachse +-12 % der Flaschenbreite
function probe(img, g) {
  const y0 = g.top + Math.round(g.H * 0.42), y1 = ((g.label != null && g.label > g.top + g.H * 0.5) ? g.label : g.top + Math.round(g.H * 0.6)) - Math.round(g.H * 0.02); // dunkle Flaschen: Etikett-Erkennung unsicher -> feste Grenze
  const x0 = Math.round(g.cx - g.bw * 0.12), x1 = Math.round(g.cx + g.bw * 0.12);
  const px = [];
  for (let y = y0; y < y1; y++) for (let x = x0; x <= x1; x++) { const i = (y * img.w + x) * 3; px.push([img.data[i], img.data[i + 1], img.data[i + 2], lum(img.data, i)]); }
  px.sort((a, b) => a[3] - b[3]);
  const keep = px.slice(0, Math.max(1, Math.floor(px.length * 0.6))); // hellste 40 % (Glanzlicht) verwerfen
  const c = [0, 1, 2].map((k) => med(keep.map((p) => p[k])));
  return { rgb: c, box: [x0, y0, x1, y1], n: keep.length };
}

export async function messen(debugDir) {
  const ergebnis = {};
  const bilder = {};
  for (const datei of Object.keys(ZUORDNUNG)) {
    if (!fs.existsSync(path.join(FOTOS, datei))) { console.error('fehlt:', datei); continue; }
    const img = await lade(datei);
    const g = geometrie(img);
    const p = probe(img, g);
    // Hintergrundhelligkeit neben der Flasche auf Probenhöhe
    const yb = Math.round((p.box[1] + p.box[3]) / 2);
    const bgc = [0, 1, 2].map((k) => med([...Array(20).keys()].flatMap((x) => [img.data[(yb * img.w + x + 5) * 3 + k], img.data[(yb * img.w + img.w - 25 + x) * 3 + k]])));
    ergebnis[datei] = { g, p, bg: bgc };
    bilder[datei] = img;
    if (debugDir) {
      fs.mkdirSync(debugDir, { recursive: true });
      const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${img.w}" height="${img.h}"><rect x="${p.box[0]}" y="${p.box[1]}" width="${p.box[2] - p.box[0]}" height="${p.box[3] - p.box[1]}" fill="none" stroke="#f0f" stroke-width="3"/><line x1="0" x2="${img.w}" y1="${g.label}" y2="${g.label}" stroke="#0a0" stroke-width="2"/><rect x="${g.L}" y="${g.top}" width="${g.bw}" height="${g.H}" fill="none" stroke="#0af" stroke-width="1"/></svg>`);
      const flach = await sharp(img.data, { raw: { width: img.w, height: img.h, channels: 3 } }).composite([{ input: svg }]).png().toBuffer();
      await sharp(flach).resize({ width: 300 }).jpeg({ quality: 80 }).toFile(path.join(debugDir, datei));
    }
  }
  // Referenz leeres Glas: Median der klaren Flaschen, Hintergrund-Median zur Skalierung
  const refRgb = [0, 1, 2].map((k) => med(REFERENZ.map((d) => ergebnis[d].p.rgb[k])));
  const refBg = [0, 1, 2].map((k) => med(REFERENZ.map((d) => ergebnis[d].bg[k])));
  const zeilen = [];
  for (const [datei, e] of Object.entries(ergebnis)) {
    const R = [0, 1, 2].map((k) => refRgb[k] * (e.bg[k] / refBg[k])); // leeres Glas bei dieser Hintergrundhelligkeit
    const O = e.p.rgb;
    const abstand = Math.max(...[0, 1, 2].map((k) => Math.abs(O[k] - R[k])));
    const klar = abstand < SCHWELLE;
    const C = [0, 1, 2].map((k) => (O[k] - (1 - DECKKRAFT) * R[k]) / DECKKRAFT);
    zeilen.push({ datei, ...ZUORDNUNG[datei], beobachtet: hex(O), leeresGlas: hex(R), abstand: Math.round(abstand), klar, farbe: klar ? null : hex(C) });
  }
  return { zeilen, refRgb, refBg };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dbg = process.argv.includes('--debug') ? process.argv[process.argv.indexOf('--debug') + 1] : null;
  const { zeilen, refRgb } = await messen(dbg);
  const md = ['# Messbericht Flüssigkeitsfarben', '', 'Erzeugt mit `node tools/fluessigkeit_messen.mjs` aus `Fotos/` (Flaschenfotos mit Weißgrund). Ändert `site/data/fluessigkeit.js` nicht.',
    `Referenz "leeres Glas" (Median der klaren Flaschen): ${hex(refRgb)}; Schwelle klar: Kanalabstand < ${SCHWELLE}; Deckkraft beim Entmischen ${DECKKRAFT}.`, '',
    '| Datei | Sorte / Produkt | beobachtet | leeres Glas | Abstand | Ergebnis | entmischte Farbe |', '|---|---|---|---|---|---|---|',
    ...zeilen.map((z) => `| ${z.datei} | ${z.sorte || z.text} | ${z.beobachtet} | ${z.leeresGlas} | ${z.abstand} | ${z.klar ? 'klar' : 'gefärbt'} | ${z.farbe || 'Wasserfarbe'} |`), ''];
  fs.writeFileSync(path.join(wurzel, 'FLUESSIGKEIT-MESSUNG.md'), md.join('\n'));
  console.log(md.join('\n'));
}
