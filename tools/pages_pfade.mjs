// Kopiert dist/ nach _pages/ und macht dort alle absoluten Pfade relativ,
// damit die Website auch unter dem GitHub-Pages-Unterordner /Hierber-Brennerei/ läuft.
// Setzt zusätzlich noindex. Die Quelle (dist/) bleibt unverändert.
//
// Aufruf: node tools/pages_pfade.mjs [quelle] [ziel]   (Standard: dist _pages)
import fs from 'node:fs';
import path from 'node:path';

const quelle = path.resolve(process.argv[2] || 'dist');
const ziel = path.resolve(process.argv[3] || '_pages');

let umgeschrieben = 0;

function alleDateien(ordner) {
  const liste = [];
  for (const e of fs.readdirSync(ordner, { withFileTypes: true })) {
    const p = path.join(ordner, e.name);
    if (e.isDirectory()) liste.push(...alleDateien(p));
    else liste.push(p);
  }
  return liste;
}

// Einen Verweis, der mit "/" beginnt, relativ machen. pre = "./" oder "../" * Tiefe.
function url(u, pre) {
  if (!u.startsWith('/') || u.startsWith('//')) return u;
  let hash = '';
  let abfrage = '';
  const h = u.indexOf('#');
  if (h >= 0) { hash = u.slice(h); u = u.slice(0, h); }
  const k = u.indexOf('?');
  if (k >= 0) { abfrage = u.slice(k); u = u.slice(0, k); }
  let p = u.slice(1);
  if (p === '' || p.endsWith('/')) p += 'index.html';
  umgeschrieben++;
  return pre + p + abfrage + hash;
}

function seite(html, tiefe) {
  const pre = tiefe ? '../'.repeat(tiefe) : './';
  html = html.replace(/(?<![\w-])(href|src|srcset|poster)="([^"]*)"/g, (m, a, v) => {
    if (a === 'srcset') {
      const teile = v.split(',').map((t) => {
        t = t.trim();
        const i = t.search(/\s/);
        return i < 0 ? url(t, pre) : url(t.slice(0, i), pre) + t.slice(i);
      });
      return a + '="' + teile.join(', ') + '"';
    }
    return a + '="' + url(v, pre) + '"';
  });
  // noindex setzen: vorhandenes meta robots ersetzen, sonst nach <head> einfügen
  const robots = '<meta name="robots" content="noindex, nofollow">';
  if (/<meta\s+name="robots"[^>]*>/i.test(html)) {
    html = html.replace(/<meta\s+name="robots"[^>]*>/i, robots);
  } else {
    html = html.replace(/<head(\s[^>]*)?>/i, (m) => m + robots);
  }
  return html;
}

function fehlerAusgeben(fehler) {
  console.error('Fehler (' + fehler.length + '):');
  for (const f of fehler.slice(0, 20)) console.error('  - ' + f);
  if (fehler.length > 20) console.error('  ... und ' + (fehler.length - 20) + ' weitere');
  process.exit(1);
}

if (!fs.existsSync(quelle) || !fs.statSync(quelle).isDirectory()) {
  console.error('Quelle nicht gefunden: ' + quelle);
  process.exit(1);
}
if (ziel === quelle || ziel.startsWith(quelle + path.sep) || quelle.startsWith(ziel + path.sep)) {
  console.error('Ziel und Quelle dürfen sich nicht überschneiden.');
  process.exit(1);
}

// 1. Kopieren
fs.rmSync(ziel, { recursive: true, force: true });
fs.cpSync(quelle, ziel, { recursive: true });

const dateien = alleDateien(ziel);
const fehler = [];

// 2. HTML
const htmlDateien = dateien.filter((f) => f.endsWith('.html'));
for (const f of htmlDateien) {
  const tiefe = path.relative(ziel, f).split(path.sep).length - 1;
  fs.writeFileSync(f, seite(fs.readFileSync(f, 'utf8'), tiefe));
}

// 3. CSS: url(/…) relativ zum CSS-Ordner
for (const f of dateien.filter((x) => x.endsWith('.css'))) {
  const tiefe = path.relative(ziel, f).split(path.sep).length - 1;
  const pre = tiefe ? '../'.repeat(tiefe) : './';
  const css = fs.readFileSync(f, 'utf8').replace(/url\(\s*(['"]?)\/(?!\/)([^)'"]*)\1\s*\)/g, (m, q, p) => {
    umgeschrieben++;
    return 'url(' + q + pre + p + q + ')';
  });
  fs.writeFileSync(f, css);
}

// 4. kiste.js: Bildpfad relativ zum Skript bestimmen
const kiste = path.join(ziel, 'assets', 'js', 'kiste.js');
if (fs.existsSync(kiste)) {
  let js = fs.readFileSync(kiste, 'utf8');
  const teile = js.split("'/img/kiste-'");
  if (teile.length < 2) {
    fehler.push('assets/js/kiste.js: Zeichenkette \'/img/kiste-\' nicht gefunden');
  } else {
    umgeschrieben += teile.length - 1;
    js = "var KB=(function(){var s=document.querySelector('script[src*=\"kiste.js\"]');return new URL('../../img/',s?s.src:location.href).href;})();\n"
      + teile.join("KB + 'kiste-'");
    fs.writeFileSync(kiste, js);
  }
} else {
  fehler.push('assets/js/kiste.js fehlt im Ziel');
}

// 5. robots.txt und sitemap.xml
fs.writeFileSync(path.join(ziel, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
fs.rmSync(path.join(ziel, 'sitemap.xml'), { force: true });

// 6. Selbstprüfung
const kopiert = alleDateien(ziel);
const rel = (f) => path.relative(ziel, f).split(path.sep).join('/');

for (const f of kopiert.filter((x) => x.endsWith('.html'))) {
  const html = fs.readFileSync(f, 'utf8');
  const ordner = path.dirname(f);
  for (const m of html.matchAll(/(?<![\w-])(href|src|srcset|poster)="([^"]*)"/g)) {
    const a = m[1];
    const werte = a === 'srcset'
      ? m[2].split(',').map((t) => t.trim().split(/\s+/)[0])
      : [m[2]];
    for (let w of werte) {
      if (w === '') continue;
      if (w.startsWith('/')) {
        fehler.push(rel(f) + ': absoluter Verweis übrig: ' + a + '="' + w + '"');
        continue;
      }
      if (/^(#|[a-z][a-z0-9+.-]*:)/i.test(w)) continue; // Anker, http(s), mailto, tel, data …
      w = w.split('#')[0].split('?')[0];
      if (w === '') continue;
      if (w.endsWith('/')) w += 'index.html';
      let ziel_datei;
      try { ziel_datei = path.resolve(ordner, decodeURI(w)); } catch { ziel_datei = path.resolve(ordner, w); }
      if (!fs.existsSync(ziel_datei) || !fs.statSync(ziel_datei).isFile()) {
        fehler.push(rel(f) + ': Ziel fehlt: ' + a + '="' + w + '"');
      }
    }
  }
}

for (const f of kopiert.filter((x) => x.endsWith('.css'))) {
  if (/url\(\s*['"]?\//.test(fs.readFileSync(f, 'utf8'))) fehler.push(rel(f) + ': url(/ übrig');
}

for (const f of kopiert.filter((x) => x.endsWith('.js') && rel(x).startsWith('assets/js/'))) {
  const treffer = fs.readFileSync(f, 'utf8').match(/['"`]\/(img|assets|brand|fr)\//g);
  if (treffer) fehler.push(rel(f) + ': absoluter Pfad in Zeichenkette übrig (' + treffer.length + 'x)');
}

if (fehler.length) fehlerAusgeben(fehler);

console.log('HTML-Seiten verarbeitet: ' + htmlDateien.length);
console.log('Dateien kopiert: ' + kopiert.length);
console.log('Verweise umgeschrieben: ' + umgeschrieben);
console.log('Selbstprüfung bestanden.');
