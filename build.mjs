// Baut die statische Seite: site/ (Quellen) -> dist/ (Ausgabe). Aufruf: node build.mjs
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PRODUKTE } from './site/data/produkte.js';
import { bilder, ogBilder, textur } from './site/lib/bilder.mjs';
import { startseite } from './site/lib/start.mjs';
import { sortenseite } from './site/lib/brand.mjs';
import { anfrageSeite, impressum, datenschutz } from './site/lib/rest.mjs';

export const BASIS_URL = 'https://hierber-brennerei.lu'; // Basis-URL (auch in site/lib/util.mjs als BASE)
const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
const LANGS = ['de', 'fr'];

const schreibe = async (rel, inhalt) => {
  const ziel = path.join(dist, rel);
  await fs.mkdir(path.dirname(ziel), { recursive: true });
  await fs.writeFile(ziel, inhalt);
};
const seitenDatei = (lang, p) => path.join(lang === 'fr' ? 'fr' : '', p, 'index.html');

async function kopiere(von, nach, filter) {
  await fs.mkdir(nach, { recursive: true });
  for (const e of await fs.readdir(von, { withFileTypes: true })) {
    if (e.isDirectory()) await kopiere(path.join(von, e.name), path.join(nach, e.name), filter);
    else if (!filter || filter(e.name)) await fs.copyFile(path.join(von, e.name), path.join(nach, e.name));
  }
}

const t0 = Date.now();
await fs.mkdir(dist, { recursive: true });
// Seiten und Assets neu erzeugen; img/ und og/ bleiben als Cache erhalten.
for (const n of ['index.html', 'brand', 'fr', 'anfrage', 'impressum', 'datenschutz', 'assets', 'sitemap.xml', 'robots.txt']) {
  await fs.rm(path.join(dist, n), { recursive: true, force: true });
}

await kopiere(path.join(root, 'site/assets'), path.join(dist, 'assets'));
await kopiere(path.join(root, 'assets/fonts'), path.join(dist, 'assets/fonts'), (n) => n.endsWith('.woff2'));
const texturBytes = await textur({ dist });

// Veraltete Foto-Varianten (frühere Teilarbeit mit den kleinen Fotos) entfernen
for (const n of await fs.readdir(path.join(dist, 'img')).catch(() => [])) {
  if (/^foto-(verkaufsraum|brennanlage|lagerraum)-/.test(n)) await fs.rm(path.join(dist, 'img', n));
}
const IMG = await bilder({ root, dist });
await ogBilder({ root, dist });

// Katalog für die Anfrage-Seite (Namen und Preise aus produkte.js)
const kat = Object.fromEntries(PRODUKTE.map((p) => [p.id, {
  n: p.name, m: p.varianten.length > 1 ? 1 : 0,
  v: Object.fromEntries(p.varianten.map((v) => [v.id, { n: v.name, p: Object.fromEntries(v.preise.map((x) => [x.menge, x.preis])) }])),
}]));
await schreibe('assets/js/katalog.js', `window.HB_KAT=${JSON.stringify(kat)};\n`);

// Seiten
const seiten = [{ p: '/', fn: (l) => startseite(IMG, l) }, { p: '/anfrage/', fn: anfrageSeite }, { p: '/impressum/', fn: impressum }, { p: '/datenschutz/', fn: datenschutz }];
for (const p of PRODUKTE) seiten.push({ p: `/brand/${p.id}/`, fn: (l) => sortenseite(IMG, p, l) });
for (const s of seiten) for (const lang of LANGS) await schreibe(seitenDatei(lang, s.p), s.fn(lang));

// Sitemap mit hreflang, robots.txt
const url = (lang, p) => `${BASIS_URL}${lang === 'fr' ? '/fr' : ''}${p}`;
const eintrag = (lang, p) => `  <url>\n    <loc>${url(lang, p)}</loc>\n`
  + `    <xhtml:link rel="alternate" hreflang="de" href="${url('de', p)}"/>\n    <xhtml:link rel="alternate" hreflang="fr" href="${url('fr', p)}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${url('de', p)}"/>\n  </url>`;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${seiten.flatMap((s) => LANGS.map((l) => eintrag(l, s.p))).join('\n')}\n</urlset>\n`;
await schreibe('sitemap.xml', sitemap);
await schreibe('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${BASIS_URL}/sitemap.xml\n`);

console.log(`Fertig in ${((Date.now() - t0) / 1000).toFixed(1)} s: ${seiten.length * LANGS.length} Seiten, ${Object.keys(IMG).length} Bildquellen, Textur ${texturBytes} Bytes.`);
