#!/usr/bin/env node
/* Vorschau-Fassung aus dist/ erzeugen (für mehrseitige Artifacts unter unbekanntem URL-Unterpfad).
 *
 *   node tools/vorschau.mjs [ausgabe-ordner]
 *
 * - alle wurzelrelativen Pfade (/…) werden je Seitentiefe relativ (../…), Ordner-Links bekommen index.html
 * - nur WebP: AVIF-<source> entfällt, .jpg wird zu .webp, nur benötigte Dateien werden kopiert
 * - zusätzlich index.artifact.html (Startseite ohne doctype/html/head/body, Attribute per Skript gesetzt)
 * - dateien.json: veröffentlichter Pfad -> Quellpfad (ohne index.artifact.html)
 * dist/ und die Quellen werden nur gelesen. */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(REPO, 'dist');
const STANDARD_AUS = path.join(os.tmpdir(), 'hierber-vorschau');
const AUS = path.resolve(process.argv[2] || STANDARD_AUS);
const MAX_DATEIEN = 240;

const fehler = [];
const fail = (m) => fehler.push(m);

/* Sicherheitsprüfung: Ausgabe darf dist/ oder dessen Eltern nicht überdecken. */
const innen = (a, b) => { const r = path.relative(b, a); return r === '' || (!r.startsWith('..') && !path.isAbsolute(r)); };
if (innen(AUS, DIST) || innen(DIST, AUS) || innen(REPO, AUS)) {
  console.error('Abbruch: Ausgabeordner überschneidet sich mit dist/ oder dem Repo: ' + AUS);
  process.exit(2);
}
if (!fs.existsSync(path.join(DIST, 'index.html'))) { console.error('dist/index.html fehlt. Erst bauen.'); process.exit(2); }

const alleDateien = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? alleDateien(path.join(dir, e.name)) : [path.join(dir, e.name)]);

/* ---------- Pfade umschreiben ---------- */
const benoetigt = new Set();            // Quellpfade relativ zu dist/ (posix), die kopiert werden müssen
const toPosix = (p) => p.split(path.sep).join('/');

/* url: wurzelrelativ -> relativ zum Verzeichnis `von` (posix, relativ zu dist/, '' = Wurzel). */
function relativ(url, von, ctx) {
  if (!url.startsWith('/') || url.startsWith('//')) return url;
  const m = url.match(/^([^?#]*)([?#].*)?$/);
  let p = m[1], rest = m[2] || '';
  p = p.replace(/^\/+/, '');
  if (p === '' || p.endsWith('/')) p += 'index.html';
  p = p.replace(/\.jpg$/i, '.webp');
  benoetigt.add(p);
  let r = path.posix.relative(von, p);
  if (r === '') r = path.posix.basename(p);
  return r + rest;
}

function srcsetUmschreiben(val, von, ctx) {
  return val.split(',').map((e) => {
    const t = e.trim(); if (!t) return null;
    const [u, ...d] = t.split(/\s+/);
    return [relativ(u, von, ctx), ...d].join(' ');
  }).filter(Boolean).join(', ');
}

function htmlUmschreiben(html, seite) {
  const von = path.posix.dirname(seite) === '.' ? '' : path.posix.dirname(seite);
  html = html.replace(/<source\b[^>]*\btype="image\/avif"[^>]*>/g, '');
  html = html.replace(/(<[a-zA-Z][^>]*?)(?=>)/g, (tag) =>
    tag.replace(/(\s)(href|src|poster|srcset)="([^"]*)"/g, (all, sp, name, val) => {
      if (name === 'srcset') return `${sp}srcset="${srcsetUmschreiben(val, von, seite)}"`;
      if (/^(#|[a-z][a-z0-9+.-]*:|\/\/)/i.test(val)) return all;   // Anker, https:, mailto:, tel: …
      if (!val.startsWith('/')) { fail(`${seite}: unerwarteter relativer Pfad ${name}="${val}"`); return all; }
      return `${sp}${name}="${relativ(val, von, seite)}"`;
    }));
  return html;
}

function cssUmschreiben(css, datei) {
  const von = path.posix.dirname(datei);
  return css.replace(/url\(\s*(['"]?)([^)'"]+)\1\s*\)/g, (all, q, u) => {
    if (u.startsWith('data:') || u.startsWith('#') || /^[a-z][a-z0-9+.-]*:/i.test(u)) return all;
    if (!u.startsWith('/')) { fail(`${datei}: unerwarteter relativer CSS-Pfad ${u}`); return all; }
    return `url(${relativ(u, von, datei)})`;
  });
}

/* ---------- Startseite ohne Dokument-Skelett ---------- */
function artifactStartseite(html) {
  const get = (re) => { const m = html.match(re); return m ? m[1] : null; };
  const htmlAttr = get(/<html\b([^>]*)>/i) || '';
  const bodyAttr = get(/<body\b([^>]*)>/i) || '';
  const head = get(/<head\b[^>]*>([\s\S]*?)<\/head>/i);
  const body = get(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  if (head === null || body === null) throw new Error('index.html: head/body nicht gefunden');
  const attrs = (s) => [...s.matchAll(/([a-zA-Z:-]+)(?:="([^"]*)")?/g)].map((m) => [m[1], m[2] ?? '']);
  /* Die class-Werte setzt das vorhandene Inline-Skript (js / alter-ok) selbst; hier nur lang, data-* und Body-class. */
  const h = attrs(htmlAttr).filter(([k]) => k !== 'class');
  const b = attrs(bodyAttr);
  const hz = h.map(([k, v]) => `d.documentElement.setAttribute(${JSON.stringify(k)},${JSON.stringify(v)});`);
  const bz = b.map(([k, v]) => (k === 'class' ? (v ? `d.body.className=${JSON.stringify(v)};` : '') : `d.body.setAttribute(${JSON.stringify(k)},${JSON.stringify(v)});`));
  /* body existiert im Skelett des Hosts evtl. noch nicht: dann nach DOMContentLoaded setzen */
  const skript = `<script>(function(d){${hz.join('')}function b(){${bz.join('')}}if(d.body)b();else d.addEventListener('DOMContentLoaded',b);})(document);</script>`;
  const kopf = head.replace(/<title>[\s\S]*?<\/title>/, '<title>Hierber Brennerei</title>').trim();
  return skript + '\n' + kopf + '\n' + body.trim() + '\n';
}

/* ---------- Ablauf ---------- */
fs.rmSync(AUS, { recursive: true, force: true });
fs.mkdirSync(AUS, { recursive: true });
const schreibe = (rel, inhalt) => {
  const z = path.join(AUS, rel); fs.mkdirSync(path.dirname(z), { recursive: true }); fs.writeFileSync(z, inhalt);
};

const seiten = alleDateien(DIST).map((f) => toPosix(path.relative(DIST, f))).filter((f) => f.endsWith('.html')).sort();
const erzeugt = {};                       // veröffentlichter Pfad -> Inhalt (Text)
for (const s of seiten) erzeugt[s] = htmlUmschreiben(fs.readFileSync(path.join(DIST, s), 'utf8'), s);

const cssDatei = 'assets/css/main.css';
erzeugt[cssDatei] = cssUmschreiben(fs.readFileSync(path.join(DIST, cssDatei), 'utf8'), cssDatei);

/* JS: darf keine wurzelrelativen Seitenpfade bauen, sonst hier bewusst scheitern statt raten. */
const jsDateien = alleDateien(path.join(DIST, 'assets/js')).map((f) => toPosix(path.relative(DIST, f)));
for (const j of jsDateien) {
  const t = fs.readFileSync(path.join(DIST, j), 'utf8');
  const treffer = t.match(/['"`]\/(?:brand|fr|anfrage|impressum|datenschutz|img|assets|#)[^'"`]*['"`]|location\.pathname|\.pathname/g);
  if (treffer) fail(`${j}: baut möglicherweise Pfade (${[...new Set(treffer)].join(' | ')}); Laufzeit-Basispfad nötig`);
  benoetigt.add(j);
}
benoetigt.add(cssDatei);

/* Nebenabhängigkeiten der Seiten prüfen und Dateien zusammenstellen */
for (const s of seiten) benoetigt.add(s);
const textDateien = new Set(Object.keys(erzeugt));
for (const p of [...benoetigt]) {
  if (!textDateien.has(p) && !fs.existsSync(path.join(DIST, p))) fail(`Quelle fehlt in dist/: ${p}`);
}

/* AVIF/JPG dürfen nicht benötigt werden */
for (const p of benoetigt) if (/\.(avif|jpe?g)$/i.test(p) || p.startsWith('og/')) fail(`unerwünschte Datei referenziert: ${p}`);

const indexArt = artifactStartseite(erzeugt['index.html']);

if (fehler.length) { console.error('FEHLER:\n - ' + fehler.join('\n - ')); process.exit(1); }

const karte = {};                         // veröffentlichter Pfad -> Quellpfad (absolut)
for (const p of [...benoetigt].sort()) {
  if (textDateien.has(p)) schreibe(p, erzeugt[p]);
  else { fs.mkdirSync(path.dirname(path.join(AUS, p)), { recursive: true }); fs.copyFileSync(path.join(DIST, p), path.join(AUS, p)); }
  karte[p] = path.join(AUS, p);
}
schreibe('index.artifact.html', indexArt);

/* Nachkontrolle: in der Ausgabe darf kein avif / wurzelrelativer Pfad / lokaler jpg-Verweis stehen. */
const nach = [];
for (const s of seiten) {
  const t = erzeugt[s];
  if (/\.avif|image\/avif/.test(t)) nach.push(`${s}: avif übrig`);
  if (/\s(?:href|src|poster)="\/(?!\/)/.test(t) || /srcset="\s*\//.test(t)) nach.push(`${s}: wurzelrelativer Pfad übrig`);
  if (/(?:src|srcset)="[^"]*\.jpg/.test(t)) nach.push(`${s}: jpg übrig`);
}
if (/url\(\s*['"]?\//.test(erzeugt[cssDatei])) nach.push('main.css: wurzelrelative url()');
if (nach.length) { console.error('FEHLER (Nachkontrolle):\n - ' + nach.join('\n - ')); process.exit(1); }

schreibe('dateien.json', JSON.stringify(karte, null, 1) + '\n');

const ausgabe = alleDateien(AUS);
const groesse = ausgabe.reduce((s, f) => s + fs.statSync(f).size, 0);
console.log(`Vorschau: ${AUS}`);
console.log(`Dateien gesamt: ${ausgabe.length} (davon veröffentlichbar laut dateien.json: ${Object.keys(karte).length}, Hauptseite index.artifact.html: 1, dateien.json: 1)`);
console.log(`Gesamtgröße: ${(groesse / 1048576).toFixed(2)} MB`);
console.log(`Gruppen zu je höchstens ${MAX_DATEIEN}: ${Math.ceil(Object.keys(karte).length / MAX_DATEIEN)}`);
if (Object.keys(karte).length + 1 > MAX_DATEIEN) { console.error(`WARNUNG: mehr als ${MAX_DATEIEN} Dateien`); process.exit(1); }
