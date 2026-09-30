// Bildpipeline: AVIF + WebP + JPEG je Breite, nie über die Quellbreite hinaus. Erzeugt außerdem OG-Bilder und die Papiertextur.
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { ETIKETTEN } from '../data/etiketten.js';

const STANDARD = [480, 960, 1600];
const FORMATE = {
  avif: (s) => s.avif({ quality: 52, effort: 4 }),
  webp: (s) => s.webp({ quality: 76, effort: 5 }),
  jpg: (s) => s.jpeg({ quality: 80, mozjpeg: true, progressive: true }),
};

const istNeuer = async (out, src) => {
  try { const [o, s] = await Promise.all([fs.stat(out), fs.stat(src)]); return o.mtimeMs >= s.mtimeMs; } catch { return false; }
};

// breitenFuer: Standardbreiten, soweit die Quelle reicht; bei Fotos zusätzlich die native Breite (nie darüber).
export function breitenFuer(nativ, mitNativ) {
  const w = STANDARD.filter((b) => b <= nativ);
  if (mitNativ && (w.length === 0 || nativ - w[w.length - 1] >= 40)) w.push(nativ);
  return w;
}

async function verarbeite({ key, quelle, dist, mitNativ, flatten }) {
  const meta = await sharp(quelle).metadata();
  const breiten = breitenFuer(meta.width, mitNativ);
  const dir = path.join(dist, 'img');
  await fs.mkdir(dir, { recursive: true });
  for (const w of breiten) {
    for (const [ext, fn] of Object.entries(FORMATE)) {
      const out = path.join(dir, `${key}-${w}.${ext}`);
      if (await istNeuer(out, quelle)) continue;
      let s = sharp(quelle);
      if (flatten) s = s.flatten({ background: flatten });
      if (w !== meta.width) s = s.resize({ width: w, withoutEnlargement: true });
      await fn(s).toFile(out);
    }
  }
  const gr = breiten[breiten.length - 1];
  return { key, breiten, w: gr, h: Math.round((meta.height * gr) / meta.width), quelleW: meta.width, quelleH: meta.height };
}

export async function bilder({ root, dist }) {
  const IMG = {};
  const jobs = [];
  for (const [id, datei] of Object.entries(ETIKETTEN)) {
    jobs.push(verarbeite({ key: `label-${id}`, quelle: path.join(root, 'Fertige Etiquetten', datei), dist, mitNativ: false }));
  }
  for (const n of ['verkaufsraum', 'brennanlage', 'lagerraum']) {
    jobs.push(verarbeite({ key: `foto-${n}`, quelle: path.join(root, 'fotos', `${n}.png`), dist, mitNativ: true, flatten: '#1b130d' }));
  }
  // in kleinen Gruppen, damit der Speicher nicht explodiert
  const res = [];
  for (let i = 0; i < jobs.length; i += 4) res.push(...(await Promise.all(jobs.slice(i, i + 4))));
  for (const r of res) IMG[r.key] = r;
  return IMG;
}

// OG-Bilder 1200x630: Etikett auf dunklem Holzgrund, dünner Kupferrahmen. Ohne Etikett: Verkaufsraum-Foto (nicht hochskaliert).
export async function ogBilder({ root, dist }) {
  const dir = path.join(dist, 'og');
  await fs.mkdir(dir, { recursive: true });
  const grund = { create: { width: 1200, height: 630, channels: 3, background: '#1b130d' } };
  const rahmen = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect x="24" y="24" width="1152" height="582" fill="none" stroke="#b8733a" stroke-width="2"/></svg>');
  const schreibe = async (out, bild) => {
    await sharp(grund).composite([{ input: bild, gravity: 'centre' }, { input: rahmen, top: 0, left: 0 }]).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
  };
  const standard = path.join(dir, 'standard.jpg');
  const foto = await sharp(path.join(root, 'fotos', 'verkaufsraum.png')).flatten({ background: '#1b130d' }).resize({ height: 560, withoutEnlargement: true }).png().toBuffer();
  await schreibe(standard, foto);
  for (const [id, datei] of Object.entries(ETIKETTEN)) {
    const quelle = path.join(root, 'Fertige Etiquetten', datei);
    const out = path.join(dir, `${id}.jpg`);
    if (await istNeuer(out, quelle)) continue;
    const etikett = await sharp(quelle).resize({ width: 1000, height: 540, fit: 'inside', withoutEnlargement: true }).png().toBuffer();
    await schreibe(out, etikett);
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
