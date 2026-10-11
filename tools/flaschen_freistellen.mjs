// Freisteller für die Holzkisten-Vorschau: fotos-flaschen/<sorte>-0-2l.png (grauer Studiohintergrund, kein Alpha)
// -> assets/kiste/<sorte>-0-2l.png (RGBA, auf die Flasche zugeschnitten, ca. 480 px hoch). Die Originale bleiben unverändert.
// Verfahren: Hintergrund je Bildzeile aus den Seitenrändern schätzen (Farbverlauf), Abweichung über Schwellwert,
// Hintergrund per Flood-Fill von den Rändern her bestimmen (Glas im Inneren bleibt dadurch erhalten), 1 px abtragen, Kante weich.
// Aufruf: node tools/flaschen_freistellen.mjs
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { KISTE_SORTEN } from '../site/data/holzkiste.js';

const wurzel = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const ZIEL_HOEHE = 480;
const SCHWELLE = 60;      // Abstand (Summe der Kanalabweichungen) zum geschätzten Hintergrund, ab dem ein Pixel sicher zur Flasche zählt
const SCHRITT = 7;        // größter Farbsprung (Summe der Kanäle) zwischen zwei Nachbarpixeln, den der Hintergrund-Flood-Fill überschreitet
const OEFFNEN = 24;      // Radius der morphologischen Öffnung: entfernt dünne Reste (Bodenspiegelung, Schattenfahnen) am Flaschenfuß
const SCHWELLE_SAMBUCA = 90, SCHRITT_SAMBUCA = 7;
const RAND = 0.06;        // Anteil der Breite links/rechts, aus dem der Hintergrund je Zeile geschätzt wird

// Sortenspezifische Abweichungen von den Vorgaben (nur eintragen, wenn eine Sorte sonst unsaubere Kanten bekommt)
const SORTE = {
  sambuca: { schwelle: SCHWELLE_SAMBUCA, schritt: SCHRITT_SAMBUCA },
};

const median = (a) => { const s = Float32Array.from(a).sort(); return s[Math.floor(s.length / 2)]; };


// Quadratische Erosion bzw. Dilatation (getrennt in Zeilen und Spalten), r = Radius
function rangfilter(bin, w, h, r, maximum) {
  const wert = maximum ? 1 : 0, tmp = new Uint8Array(w * h), out = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    let v = maximum ? 0 : 1;
    for (let k = Math.max(0, x - r); k <= Math.min(w - 1, x + r); k++) { if (bin[y * w + k] === wert) { v = wert; break; } }
    tmp[y * w + x] = v;
  }
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    let v = maximum ? 0 : 1;
    for (let k = Math.max(0, y - r); k <= Math.min(h - 1, y + r); k++) { if (tmp[k * w + x] === wert) { v = wert; break; } }
    out[y * w + x] = v;
  }
  return out;
}

async function freistellen(quelle, ziel, opt = {}) {
  const schwelle = opt.schwelle ?? SCHWELLE, schritt = opt.schritt ?? SCHRITT;
  const { data, info } = await sharp(quelle).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const rb = Math.max(4, Math.round(w * RAND));
  // Hintergrund je Zeile: links und rechts je Median, dazwischen linear
  const bgL = new Float32Array(h * 3), bgR = new Float32Array(h * 3);
  for (let y = 0; y < h; y++) for (let c = 0; c < 3; c++) {
    const l = [], r = [];
    for (let x = 0; x < rb; x++) { l.push(data[(y * w + x) * 3 + c]); r.push(data[(y * w + (w - 1 - x)) * 3 + c]); }
    bgL[y * 3 + c] = median(l); bgR[y * 3 + c] = median(r);
  }
  const nahe = new Uint8Array(w * h); // 1 = sieht aus wie Hintergrund
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const t = x / (w - 1); let d = 0;
    for (let c = 0; c < 3; c++) d += Math.abs(data[(y * w + x) * 3 + c] - (bgL[y * 3 + c] * (1 - t) + bgR[y * 3 + c] * t));
    nahe[y * w + x] = d <= schwelle ? 1 : 0;
  }
  // Flood-Fill des Hintergrunds von allen Randpixeln aus (4er-Nachbarschaft)
  const hg = new Uint8Array(w * h), stapel = [];
  const sprung = (i, j) => Math.abs(data[i * 3] - data[j * 3]) + Math.abs(data[i * 3 + 1] - data[j * 3 + 1]) + Math.abs(data[i * 3 + 2] - data[j * 3 + 2]);
  for (let x = 0; x < w; x++) for (const y of [0, h - 1]) { const i = y * w + x; if (nahe[i] && !hg[i]) { hg[i] = 1; stapel.push(i); } }
  for (let y = 0; y < h; y++) for (const x of [0, w - 1]) { const i = y * w + x; if (nahe[i] && !hg[i]) { hg[i] = 1; stapel.push(i); } }
  while (stapel.length) {
    const i = stapel.pop(), x = i % w, y = (i / w) | 0;
    for (const j of [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, y > 0 ? i - w : -1, y < h - 1 ? i + w : -1]) {
      if (j >= 0 && !hg[j] && nahe[j] && sprung(i, j) <= schritt) { hg[j] = 1; stapel.push(j); }
    }
  }
  // Vordergrund = alles andere; kleine Reste (Staub) entfernen: nur die größte zusammenhängende Fläche behalten
  let fg = new Uint8Array(w * h); for (let i = 0; i < w * h; i++) fg[i] = hg[i] ? 0 : 1;
  const marke = new Int32Array(w * h); let besteMarke = 0, besteGroesse = 0, nr = 0;
  for (let s = 0; s < w * h; s++) {
    if (!fg[s] || marke[s]) continue;
    nr++; let n = 0; const st = [s]; marke[s] = nr;
    while (st.length) {
      const i = st.pop(); n++; const x = i % w, y = (i / w) | 0;
      for (const j of [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, y > 0 ? i - w : -1, y < h - 1 ? i + w : -1]) if (j >= 0 && fg[j] && !marke[j]) { marke[j] = nr; st.push(j); }
    }
    if (n > besteGroesse) { besteGroesse = n; besteMarke = nr; }
  }
  for (let i = 0; i < w * h; i++) fg[i] = marke[i] === besteMarke ? 1 : 0;
  fg = rangfilter(rangfilter(fg, w, h, OEFFNEN, false), w, h, OEFFNEN, true); // Öffnung
  // 1 px abtragen (grauer Saum), danach Kante weichzeichnen
  const er = new Uint8Array(w * h);
  for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
    const i = y * w + x;
    er[i] = fg[i] && fg[i - 1] && fg[i + 1] && fg[i - w] && fg[i + w] ? 255 : 0;
  }
  const alpha = await sharp(Buffer.from(er), { raw: { width: w, height: h, channels: 1 } }).blur(1.1).toColourspace('b-w').raw().toBuffer();
  if (alpha.length !== w * h) throw new Error(`Alphakanal hat ${alpha.length} Bytes statt ${w * h}`);
  // Bounding Box der Flasche (Alpha > 8)
  let x0 = w, x1 = 0, y0 = h, y1 = 0;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (alpha[y * w + x] > 8) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  // Fuß: dünne Reste unter dem Boden (Spiegelung) abschneiden, letzte Zeile mit mindestens 55 % der größten Flaschenbreite
  const breite = new Int32Array(h); let maxB = 0;
  for (let y = y0; y <= y1; y++) { let n = 0; for (let x = x0; x <= x1; x++) if (alpha[y * w + x] > 128) n++; breite[y] = n; if (n > maxB) maxB = n; }
  while (y1 > y0 && breite[y1] < 0.55 * maxB) y1--;
  const rgba = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) { rgba[i * 4] = data[i * 3]; rgba[i * 4 + 1] = data[i * 3 + 1]; rgba[i * 4 + 2] = data[i * 3 + 2]; rgba[i * 4 + 3] = alpha[i]; }
  const bw = x1 - x0 + 1, bh = y1 - y0 + 1;
  await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
    .extract({ left: x0, top: y0, width: bw, height: bh })
    .resize({ height: ZIEL_HOEHE })
    .png({ compressionLevel: 9 }).toFile(ziel);
  return { bw, bh, x0, y0 };
}

const aus = path.join(wurzel, 'assets', 'kiste');
await fs.mkdir(aus, { recursive: true });
for (const s of KISTE_SORTEN) {
  const q = path.join(wurzel, 'fotos-flaschen', `${s}-0-2l.png`);
  const z = path.join(aus, `${s}-0-2l.png`);
  const r = await freistellen(q, z, SORTE[s]);
  console.log(`${s}: Box ${r.bw} x ${r.bh} bei (${r.x0}, ${r.y0}) -> ${path.relative(wurzel, z)}`);
}
