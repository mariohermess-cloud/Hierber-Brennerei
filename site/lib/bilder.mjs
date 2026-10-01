// Bildpipeline: AVIF + WebP + JPEG je Breite, nie über die Quellbreite hinaus. Erzeugt außerdem OG-Bilder und die Papiertextur.
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ETIKETTEN } from '../data/etiketten.js';
import { FOTO_SORTEN } from '../data/flaschen.js';
import { typVon, TYP, labelFeld, flascheStandalone } from './flasche.mjs';

const STANDARD = [480, 960, 1600];
const FORMATE = {
  avif: (s) => s.avif({ quality: 52, effort: 4 }),
  webp: (s) => s.webp({ quality: 76, effort: 5 }),
  jpg: (s) => s.jpeg({ quality: 80, mozjpeg: true, progressive: true }),
};

const istNeuer = async (out, ...srcs) => {
  try { const [o, ...s] = await Promise.all([fs.stat(out), ...srcs.map((x) => fs.stat(x))]); return s.every((x) => o.mtimeMs >= x.mtimeMs); } catch { return false; }
};
const DIESE_DATEI = fileURLToPath(import.meta.url);

// breitenFuer: Standardbreiten (480/960/1600), soweit die Quelle reicht, nie darüber.
// Reicht schon die kleinste Standardbreite nicht, wird die native Breite genutzt.
export function breitenFuer(nativ, liste = STANDARD) {
  const w = liste.filter((b) => b <= nativ);
  return w.length ? w : [nativ];
}

// Echte Fotos (vom Nutzer geliefert) in fotos/. Schlüssel = foto-<name>. Die KI-Beispielbilder sind ausgeschlossen.
export const FOTOS = ['hof-birnenkisten.jpg', 'flaschenreihe-theke.jpg', 'fassraum-eichenfaesser.jpg', 'brennanlage-gross.jpg', 'geschenkregal.jpg', 'hofschild-aussen.jpg',
  // Produktfotos auf schwarzem Grund (Rum, Limoncello, Sambuca: Hauptbild, da kein flaches Etikett vorhanden)
  'flaschen-rum-fuenf-groessen.webp', 'flaschen-rum-02-05.webp', 'flaschen-limoncello.webp', 'flaschen-sambuca.webp'];
// Etiketten (vorverzerrt, siehe warpeEtikett): 240 für Karten (Handy), 480 für Karten (Desktop) und Sortenseite, 960 für die Sortenseite bei hoher Pixeldichte
const LABEL_BREITEN = [240, 480, 960];

// Das Etikett legt sich um den halben Flaschenumfang: Winkelbereich +-WRAP (WRAP < 90 Grad, damit die Ränder noch erkennbar bleiben).
// Mitte unverzerrt, zu den Rändern horizontal gestaucht (Zylinderprojektion x = sin(w) / sin(WRAP), Quellspalte linear im Winkel).
// Damit der Text in der Mitte nicht gedehnt wirkt, ist das Ergebnis um K = WRAP / sin(WRAP) höher als das flache Etikett bei gleicher Breite.
const WRAP = (58 * Math.PI) / 180;
export const K = WRAP / Math.sin(WRAP);

// Liefert { data (RGB roh), w, h }: flaches Etikett auf Breite ow gestaucht (Quelle vorher auf ow*K skaliert).
export async function warpeEtikett(quelle, ow) {
  const sw = Math.round(ow * K);
  const { data: src, info } = await sharp(quelle).flatten({ background: '#ffffff' }).resize({ width: sw }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const sh = info.height, out = Buffer.alloc(ow * sh * 3), s = Math.sin(WRAP);
  const TAPS = [-1 / 3, 0, 1 / 3];
  // je Zielspalte drei Unterabtastungen (jeweils bilinear), gegen Aliasing in den gestauchten Randbereichen
  const idx = new Int32Array(ow * 3 * 2), wt = new Float32Array(ow * 3);
  for (let ox = 0; ox < ow; ox++) {
    TAPS.forEach((d, i) => {
      const x = ((ox + 0.5 + d) / ow) * 2 - 1;
      const u = (Math.asin(Math.max(-1, Math.min(1, x * s))) / WRAP + 1) / 2;
      const sx = Math.max(0, Math.min(sw - 1, u * sw - 0.5)), i0 = Math.floor(sx), i1 = Math.min(sw - 1, i0 + 1);
      idx[(ox * 3 + i) * 2] = i0; idx[(ox * 3 + i) * 2 + 1] = i1; wt[ox * 3 + i] = sx - i0;
    });
  }
  for (let y = 0; y < sh; y++) {
    const row = y * sw * 3;
    for (let ox = 0; ox < ow; ox++) {
      for (let c = 0; c < 3; c++) {
        let acc = 0;
        for (let i = 0; i < 3; i++) {
          const f = wt[ox * 3 + i];
          acc += src[row + idx[(ox * 3 + i) * 2] * 3 + c] * (1 - f) + src[row + idx[(ox * 3 + i) * 2 + 1] * 3 + c] * f;
        }
        out[(y * ow + ox) * 3 + c] = Math.round(acc / 3);
      }
    }
  }
  return { data: out, w: ow, h: sh };
}

async function verarbeite({ key, quelle, dist, flatten, liste, warpe = false }) {
  const meta = await sharp(quelle).metadata();
  const breiten = breitenFuer(meta.width, liste);
  let hoehe = Math.round((meta.height * breiten[breiten.length - 1]) / meta.width);
  const dir = path.join(dist, 'img');
  await fs.mkdir(dir, { recursive: true });
  for (const w of breiten) {
    for (const [ext, fn] of Object.entries(FORMATE)) {
      const out = path.join(dir, `${key}-${w}.${ext}`);
      if (await istNeuer(out, quelle, ...(warpe ? [DIESE_DATEI] : []))) continue;
      if (warpe) {
        const r = await warpeEtikett(quelle, w);
        await fn(sharp(r.data, { raw: { width: r.w, height: r.h, channels: 3 } })).toFile(out);
        continue;
      }
      let s = sharp(quelle);
      if (flatten) s = s.flatten({ background: flatten });
      if (w !== meta.width) s = s.resize({ width: w, withoutEnlargement: true });
      await fn(s).toFile(out);
    }
  }
  const gr = breiten[breiten.length - 1];
  if (warpe) hoehe = Math.round(Math.round(gr * K) * meta.height / meta.width);
  return { key, breiten, w: gr, h: hoehe, quelleW: meta.width, quelleH: meta.height };
}

export async function bilder({ root, dist }) {
  const IMG = {};
  const jobs = [];
  for (const [id, datei] of Object.entries(ETIKETTEN)) {
    jobs.push(verarbeite({ key: `label-${id}`, quelle: path.join(root, 'Fertige Etiquetten', datei), dist, liste: LABEL_BREITEN, warpe: true }));
  }
  for (const datei of FOTOS) {
    jobs.push(verarbeite({ key: `foto-${datei.replace(/\.[a-z]+$/, '')}`, quelle: path.join(root, 'fotos', datei), dist }));
  }
  // in kleinen Gruppen, damit der Speicher nicht explodiert
  const res = [];
  for (let i = 0; i < jobs.length; i += 4) res.push(...(await Promise.all(jobs.slice(i, i + 4))));
  for (const r of res) IMG[r.key] = r;
  return IMG;
}

// OG-Bilder 1200x630: Etikett auf dunklem Holzgrund, dünner Kupferrahmen. Startseite und Sorten ohne Etikett: Hofschild-Foto (Ausschnitt, nicht hochskaliert).
export async function ogBilder({ root, dist }) {
  const dir = path.join(dist, 'og');
  await fs.mkdir(dir, { recursive: true });
  const grund = { create: { width: 1200, height: 630, channels: 3, background: '#1b130d' } };
  const rahmen = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect x="24" y="24" width="1152" height="582" fill="none" stroke="#b8733a" stroke-width="2"/></svg>');
  const schreibe = async (out, bild) => {
    await sharp(grund).composite([{ input: bild, gravity: 'centre' }, { input: rahmen, top: 0, left: 0 }]).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
  };
  // Startseite / Standard: Ausschnitt 2000x1050 (Seitenverhältnis 1200:630) des Hofschild-Fotos, auf 1200x630 verkleinert
  const hofschild = path.join(root, 'fotos', 'hofschild-aussen.jpg');
  await sharp(hofschild).extract({ left: 0, top: 60, width: 2000, height: 1050 }).resize(1200, 630).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(dir, 'standard.jpg'));
  // Sorten mit flachem Etikett: Vektor-Flasche (Sortenfarbe) mit aufgesetztem Etikett auf heller Bühne, zentriert auf dunklem Grund
  const BUEHNE = { w: 360, h: 560 };
  const buehne = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${BUEHNE.w}" height="${BUEHNE.h}"><rect width="${BUEHNE.w}" height="${BUEHNE.h}" rx="2" fill="#e6dbc8"/><rect y="${BUEHNE.h - 34}" width="${BUEHNE.w}" height="34" fill="#cbbca2"/></svg>`);
  for (const [id, datei] of Object.entries(ETIKETTEN)) {
    const quelle = path.join(root, 'Fertige Etiquetten', datei);
    const out = path.join(dir, `${id}.jpg`);
    const typ = typVon(id), t = TYP[typ];
    const bh = Math.round(BUEHNE.h * 0.91 * (t.hoehe / 92)), bw = Math.round(bh * (t.w / t.h));
    const w = await warpeEtikett(quelle, 480);
    const feld = labelFeld(typ, w.w / w.h);
    const lw = Math.round((feld.width / 100) * bw), lh = Math.round((feld.height / 100) * bh);
    const fl = await sharp(Buffer.from(flascheStandalone(id))).resize(bw, bh).png().toBuffer();
    const et = await sharp(w.data, { raw: { width: w.w, height: w.h, channels: 3 } }).resize(lw, lh, { fit: 'fill' }).png().toBuffer();
    const bx = Math.round((BUEHNE.w - bw) / 2), by = BUEHNE.h - 34 - bh + 4;
    const stage = await sharp(buehne).composite([{ input: fl, left: bx, top: by }, { input: et, left: bx + Math.round((feld.left / 100) * bw), top: by + Math.round((feld.top / 100) * bh) }]).png().toBuffer();
    await schreibe(out, stage);
  }
  // Sorten mit Produktfoto (Rum, Limoncello, Sambuca): Foto auf schwarzem Grund, ganz sichtbar
  for (const [id, f] of Object.entries(FOTO_SORTEN)) {
    const out = path.join(dir, `${id}.jpg`);
    await sharp(path.join(root, 'fotos', `${f.haupt}.webp`)).resize(1200, 630, { fit: 'contain', background: '#000' }).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
  }
}

// Papiertextur: kleine, selbst erzeugte Kachel (pseudozufälliges Rauschen, fester Startwert), bewusst sehr dezent.
export async function textur({ dist }) {
  const n = 96;
  const buf = Buffer.alloc(n * n * 4);
  let z = 12345;
  const rnd = () => ((z = (z * 1664525 + 1013904223) >>> 0) / 4294967296);
  for (let i = 0; i < n * n; i++) {
    const a = Math.floor(rnd() * 16);
    buf[i * 4] = 110; buf[i * 4 + 1] = 80; buf[i * 4 + 2] = 50; buf[i * 4 + 3] = a;
  }
  const out = path.join(dist, 'assets', 'papier.webp');
  await fs.mkdir(path.dirname(out), { recursive: true });
  await sharp(buf, { raw: { width: n, height: n, channels: 4 } }).webp({ quality: 30, alphaQuality: 35, effort: 6 }).toFile(out);
  return (await fs.stat(out)).size;
}
