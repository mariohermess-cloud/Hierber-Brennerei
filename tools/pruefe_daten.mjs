// Maschineller Abgleich dist/ gegen site/data/produkte.js: Preise, Alkoholgehalt, Größen, Sortennamen, "Preis auf Anfrage", JSON-LD.
// Aufruf: node tools/pruefe_daten.mjs   (Exit-Code 1 bei Abweichung)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PRODUKTE } from '../site/data/produkte.js';

const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const fehler = [];
const fail = (seite, msg) => fehler.push(`${seite}: ${msg}`);
let geprueft = { seiten: 0, preise: 0, abv: 0, groessen: 0, namen: 0, karten: 0 };

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith('.html') ? [path.join(d, e.name)] : []));
const dec = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const num = (s) => parseFloat(s.replace(',', '.'));
const norm = (s) => s.replace(/ /g, ' ');

const alleNamen = new Set(PRODUKTE.flatMap((p) => [p.name, p.kurzname, ...p.varianten.map((v) => v.name)]));
const byId = Object.fromEntries(PRODUKTE.map((p) => [p.id, p]));
const preiseVon = (p) => p.varianten.flatMap((v) => v.preise.map((x) => x.preis));
const groessenVon = (p) => new Set(p.varianten.flatMap((v) => v.preise.map((x) => x.menge)));
const abvVon = (p) => new Set(p.varianten.map((v) => v.abv));

function extrahiere(html) {
  const ohneSkript = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
  const sichtbar = norm(dec(ohneSkript.replace(/<[^>]+>/g, ' ')));
  const meta = norm(dec((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '') + ' ' + dec((html.match(/<title>([^<]*)/) || [])[1] || ''));
  return { ohneSkript, text: sichtbar + ' ' + meta };
}
const tokens = (text) => ({
  preise: [...text.matchAll(/(\d+(?:,\d+)?) €/g)].map((m) => num(m[1])),
  abv: [...text.matchAll(/(\d+(?:,\d+)?) % vol/g)].map((m) => num(m[1])),
  groessen: [...text.matchAll(/(\d+(?:,\d+)?) L(?![\p{L}])/gu)].map((m) => m[1] + ' L'),
});
const laengenSet = (a) => new Set(a);

for (const datei of walk(dist)) {
  const rel = path.relative(dist, datei);
  let html = fs.readFileSync(datei, 'utf8');
  geprueft.seiten++;
  const fr = rel.startsWith('fr');
  const m = rel.replace(/\\/g, '/').match(/brand\/([^/]+)\/index\.html$/);
  const istStart = /^(fr\/)?index\.html$/.test(rel.replace(/\\/g, '/'));

  // Sortennamen (data-sortenname) immer gegen produkte.js
  for (const n of html.matchAll(/data-sortenname="([^"]*)"/g)) { geprueft.namen++; if (!alleNamen.has(dec(n[1]))) fail(rel, `unbekannter Sortenname "${dec(n[1])}"`); }

  // Karten (Startseite, "Passt auch") einzeln prüfen und aus dem Rest herausnehmen
  const karten = [...html.matchAll(/<li class="karte-li" data-id="([^"]+)"[\s\S]*?<\/li>/g)];
  for (const k of karten) {
    geprueft.karten++;
    const p = byId[k[1]]; if (!p) { fail(rel, `Karte mit unbekannter id ${k[1]}`); continue; }
    const t = extrahiere(k[0]).text, tk = tokens(t);
    if (!t.includes(p.name)) fail(rel, `Karte ${p.id}: Name fehlt`);
    if (tk.abv.length !== 1 || tk.abv[0] !== p.abv) fail(rel, `Karte ${p.id}: abv ${tk.abv} statt ${p.abv}`);
    const pr = preiseVon(p);
    if (pr.length) { if (tk.preise.length !== 1 || tk.preise[0] !== Math.min(...pr)) fail(rel, `Karte ${p.id}: Preis ${tk.preise} statt ab ${Math.min(...pr)}`); }
    else if (tk.preise.length || !/Preis auf Anfrage|Prix sur demande/.test(t)) fail(rel, `Karte ${p.id}: sollte "Preis auf Anfrage" zeigen`);
    geprueft.preise += tk.preise.length; geprueft.abv++;
  }
  if (istStart) {
    const ids = karten.map((k) => k[1]);
    if (new Set(ids).size !== PRODUKTE.length) fail(rel, `Startseite zeigt ${new Set(ids).size} statt ${PRODUKTE.length} Sorten`);
    const fass = [...html.matchAll(/class="schild" data-sortenname="([^"]*)"/g)].map((x) => dec(x[1]));
    const soll = PRODUKTE.filter((p) => p.ort === 'fass').map((p) => p.kurzname);
    if (JSON.stringify(fass) !== JSON.stringify(soll)) fail(rel, `Fassreihe: ${fass.length} Fässer, erwartet ${soll.length} in Reihenfolge der Daten`);
  }
  html = html.replace(/<li class="karte-li" data-id="[^"]+"[\s\S]*?<\/li>/g, '');

  const { ohneSkript, text } = extrahiere(html);
  const tk = tokens(text);
  if (m) {
    const p = byId[m[1]];
    if (!p) { fail(rel, 'Sortenseite ohne Sorte in produkte.js'); continue; }
    const h1 = (ohneSkript.match(/<h1[^>]*>([^<]*)<\/h1>/) || [])[1];
    if (dec(h1 || '') !== p.name) fail(rel, `h1 "${h1}" statt "${p.name}"`);
    const pr = new Set(preiseVon(p));
    tk.preise.forEach((x) => { geprueft.preise++; if (!pr.has(x)) fail(rel, `Preis ${x} € nicht in Daten`); });
    tk.abv.forEach((x) => { geprueft.abv++; if (!abvVon(p).has(x)) fail(rel, `Alkoholgehalt ${x} % nicht in Daten`); });
    const gs = groessenVon(p);
    tk.groessen.forEach((x) => { geprueft.groessen++; if (!gs.has(x)) fail(rel, `Größe ${x} nicht in Daten`); });
    // Radios: genau die Preise/Größen der Daten, je Variante
    const radios = [...html.matchAll(/<input type="radio" name="groesse" value="([^"]*)" data-variante="([^"]*)" data-menge="([^"]*)" data-preis="([^"]*)"/g)].map((r) => `${r[2]}|${r[3]}|${r[4]}`);
    const soll = p.varianten.flatMap((v) => v.preise.map((x) => `${v.id}|${x.menge}|${x.preis}`));
    if (JSON.stringify(radios) !== JSON.stringify(soll)) fail(rel, `Größen/Preise der Auswahl weichen ab: ${radios} statt ${soll}`);
    // Preis auf Anfrage
    const ohnePreis = p.varianten.some((v) => v.preise.length === 0);
    if (ohnePreis) {
      if (!/data-preis-anfrage/.test(html) || !/Preis auf Anfrage|Prix sur demande/.test(text)) fail(rel, '"Preis auf Anfrage" fehlt');
      if (/data-preis="/.test(html) || tk.preise.length) fail(rel, 'Preis-Markup trotz preise: []');
    }
    // JSON-LD
    const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    const ldAlle = [...m ? [] : []];
    const docs = [...fs.readFileSync(datei, 'utf8').matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((x) => JSON.parse(x[1]));
    const prod = docs.find((d) => d['@type'] === 'Product');
    if (!prod) fail(rel, 'JSON-LD Product fehlt');
    else {
      if (prod.name !== p.name) fail(rel, `JSON-LD name ${prod.name}`);
      const offers = prod.offers ? (prod.offers.offers || [prod.offers]) : [];
      const ldPreise = offers.map((o) => parseFloat(o.price));
      if (preiseVon(p).length === 0 && prod.offers) fail(rel, 'JSON-LD Offer trotz preise: []');
      if (preiseVon(p).length && JSON.stringify(ldPreise) !== JSON.stringify(preiseVon(p))) fail(rel, `JSON-LD Preise ${ldPreise} statt ${preiseVon(p)}`);
      if (prod.offers && prod.offers.lowPrice && (parseFloat(prod.offers.lowPrice) !== Math.min(...preiseVon(p)) || parseFloat(prod.offers.highPrice) !== Math.max(...preiseVon(p)))) fail(rel, 'AggregateOffer low/high weicht ab');
    }
  } else if (!istStart) {
    if (tk.preise.length || tk.abv.length) fail(rel, `unerwartete Preise/Alkoholangaben ${tk.preise} ${tk.abv}`);
  } else if (tk.preise.length || tk.abv.length) fail(rel, `Startseite: Preise/Alkohol außerhalb der Karten ${tk.preise} ${tk.abv}`);
}

// Alle 29 Sorten in de und fr vorhanden
for (const p of PRODUKTE) for (const pre of ['', 'fr/']) if (!fs.existsSync(path.join(dist, `${pre}brand/${p.id}/index.html`))) fail(p.id, `${pre}brand/${p.id}/ fehlt`);

console.log(`Geprüft: ${geprueft.seiten} Seiten, ${geprueft.karten} Sortenkarten, ${geprueft.preise} Preisangaben, ${geprueft.abv} Alkoholangaben, ${geprueft.groessen} Größen, ${geprueft.namen} Sortennamen.`);
if (fehler.length) { console.log(`FEHLER (${fehler.length}):\n` + fehler.slice(0, 40).join('\n')); process.exit(1); }
console.log('OK: alle Angaben stimmen mit site/data/produkte.js überein.');
