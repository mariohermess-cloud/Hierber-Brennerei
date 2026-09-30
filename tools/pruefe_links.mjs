// Prüft interne Links, src/srcset, preload und CSS-url() in dist/ auf Existenz (und #Anker auf derselben Seite).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const fehler = []; let n = 0;
const loese = (von, ref) => {
  const [pfad0, anker] = ref.split('#');
  let p = pfad0.startsWith('/') ? path.join(dist, pfad0) : pfad0 === '' ? von : path.join(path.dirname(von), pfad0);
  if (pfad0 === '') return { datei: von, anker };
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html');
  return { datei: p, anker };
};
const pruefe = (von, ref) => {
  if (/^(https?:|mailto:|tel:|data:|#?$)/.test(ref) && !ref.startsWith('#')) return;
  n++;
  const { datei, anker } = loese(von, ref.split('?')[0]);
  if (!fs.existsSync(datei)) return fehler.push(`${path.relative(dist, von)}: tot -> ${ref}`);
  if (anker && datei.endsWith('.html') && !new RegExp(`id="${anker}"`).test(fs.readFileSync(datei, 'utf8'))) fehler.push(`${path.relative(dist, von)}: Anker fehlt -> ${ref}`);
};
for (const f of walk(dist)) {
  if (f.endsWith('.html')) {
    const h = fs.readFileSync(f, 'utf8').replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
    for (const m of h.matchAll(/\b(?:href|src)="([^"]*)"/g)) pruefe(f, m[1].replace(/&amp;/g, '&'));
    for (const m of h.matchAll(/\bsrcset="([^"]*)"/g)) for (const part of m[1].split(',')) pruefe(f, part.trim().split(/\s+/)[0]);
  } else if (f.endsWith('.css')) {
    for (const m of fs.readFileSync(f, 'utf8').matchAll(/url\(([^)]+)\)/g)) pruefe(f, m[1].replace(/["']/g, ''));
  }
}
console.log(`Geprüft: ${n} interne Verweise.`);
if (fehler.length) { console.log(fehler.slice(0, 40).join('\n')); process.exit(1); }
console.log('OK: keine toten Links oder Bilder.');
