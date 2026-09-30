// Startseite und wiederverwendbare Bausteine (Sortenkarte, Fass-Symbol).
import { PRODUKTE, KONTAKT } from '../data/produkte.js';
import { GRUPPEN } from '../data/gruppen.js';
import { ANLAESSE, anlaesseVon } from '../data/anlaesse.js';
import { ETIKETTEN } from '../data/etiketten.js';
import { STR } from './i18n.mjs';
import { esc, pfad, absUrl, fmtAbv, fmtPreis, preisInfo, BASE } from './util.mjs';
import { seite, bild, folgt, TELEFON, OSM } from './layout.mjs';

export const produktById = (id) => PRODUKTE.find((p) => p.id === id);

// Sortenkarte: flaches Etikett (Grafik) auf Holzton; ohne Etikett beschrifteter Platzhalter.
export function karte(IMG, p, lang, { anlass = true } = {}) {
  const t = STR[lang];
  const info = preisInfo(p);
  const bildHtml = ETIKETTEN[p.id]
    ? bild(IMG, `label-${p.id}`, { alt: t.etikettAlt(p.name), sizes: '(min-width: 900px) 200px, 45vw', cls: 'karte-etikett' })
    : `<span class="karte-platzhalter" data-todo="foto"><span>${t.etikettFolgt}</span></span>`;
  const preis = info
    ? `<span class="preis" data-preis-ab="${info.min}">${t.ab} ${fmtPreis(info.min)}</span>`
    : `<span class="preis anfrage" data-preis-anfrage>${t.preisAnfrage}</span>`;
  const an = anlass ? ` data-anlass="${anlaesseVon(p.id).join(' ')}"` : '';
  return `<li class="karte-li" data-id="${p.id}"${an}><a class="karte" href="${pfad(lang, `/brand/${p.id}/`)}">`
    + `<span class="karte-bild">${bildHtml}</span>`
    + `<span class="karte-name" data-sortenname="${esc(p.name)}">${esc(p.name)}</span>`
    + `<span class="karte-meta"><span data-abv="${p.abv}">${fmtAbv(p.abv)}</span> <span aria-hidden="true">·</span> ${preis}</span></a></li>`;
}

// Fass-Symbol (Stirnseite eines liegenden Eichenfasses): flächig, dunkles Holz, Reifen in Kupfer.
const FASS_SYMBOL = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
<radialGradient id="fass-holz" cx="38%" cy="32%" r="80%"><stop offset="0" stop-color="#5d3d23"/><stop offset="1" stop-color="#34200f"/></radialGradient>
<clipPath id="fass-kopf"><circle cx="50" cy="50" r="37"/></clipPath>
<symbol id="fass" viewBox="0 0 100 100">
<circle cx="50" cy="50" r="49" fill="#2a190c"/>
<circle cx="50" cy="50" r="46" fill="url(#fass-holz)"/>
<g clip-path="url(#fass-kopf)"><rect x="10" y="10" width="80" height="80" fill="#4a3120"/>
<path d="M24 10v80M37 10v80M50 10v80M63 10v80M76 10v80" stroke="#2b1a0e" stroke-width="1.2" fill="none"/>
<path d="M30 10v80M43 10v80M57 10v80M70 10v80" stroke="#5a3d25" stroke-width=".6" fill="none" opacity=".6"/></g>
<circle cx="50" cy="50" r="37" fill="none" stroke="#1d1108" stroke-width="1.6"/>
<circle cx="50" cy="50" r="46" fill="none" stroke="#b8733a" stroke-width="2.2"/>
<circle cx="50" cy="50" r="41.5" fill="none" stroke="#b8733a" stroke-width=".9" opacity=".55"/>
<rect x="47.5" y="66" width="5" height="9" rx="1" fill="#8a5a30"/><rect x="43" y="74" width="14" height="4.5" rx="2.2" fill="#b8733a"/>
<ellipse cx="36" cy="30" rx="18" ry="9" fill="#fff" opacity=".05" transform="rotate(-30 36 30)"/>
</symbol></defs></svg>`;

const FASS_IDS = PRODUKTE.filter((p) => p.ort === 'fass');

function fassreihe(lang) {
  const t = STR[lang];
  const teile = FASS_IDS.map((p) => `<li class="fass-li"><a class="fass" href="${pfad(lang, `/brand/${p.id}/`)}">`
    + `<span class="schild" data-sortenname="${esc(p.kurzname)}"><span class="schild-text">${esc(p.kurzname)}</span></span>`
    + `<svg class="fass-bild" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><use href="#fass"/></svg></a></li>`).join('\n');
  return `<section class="sektion dunkel fassreihe-sektion" id="fassreihe" aria-labelledby="fass-h">
  <div class="wrap reveal"><h2 id="fass-h">${t.fassTitel}</h2><p class="lead-klein">${t.fassText}</p></div>
  ${FASS_SYMBOL}
  <div class="fass-rahmen">
    <ul class="fassreihe" role="list" aria-label="${t.fassAria}">
${teile}
    </ul>
  </div>
  <div class="wrap"><p class="foto-hinweis" data-todo="foto"><span>${t.fassHinweis}</span></p></div>
</section>`;
}

function theke(IMG, lang) {
  const t = STR[lang];
  const chips = ANLAESSE.map((a) => `<button type="button" class="chip" data-anlass-filter="${a}" aria-pressed="false">${t.anlass[a]}</button>`).join('\n');
  const gruppen = GRUPPEN.map((g) => `<div class="gruppe" data-gruppe="${g.id}"><h3>${t.gruppe[g.id]}</h3>
<ul class="karten" role="list">
${g.ids.map((id) => karte(IMG, produktById(id), lang)).join('\n')}
</ul></div>`).join('\n');
  const weitere = lang === 'de'
    ? `<div class="weitere" data-todo="bestaetigen"><h3>${t.weitereTitel}</h3><p>Äppel/Pommes · Quitten · Nëssdrëpp · Pefferminz · Pastis · Hierberol · Ingwerlikör · Kräider Batti · Neutraler Alkohol · Liköre · Holzkisten</p></div>`
    : `<div class="weitere"><h3>${t.weitereTitel}</h3>${folgt(t)}</div>`;
  return `<section class="sektion dunkel flaeche theke" id="theke" aria-labelledby="theke-h">
  <div class="wrap">
    <div class="reveal"><h2 id="theke-h">${t.thekeTitel}</h2><p class="lead-klein">${t.thekeText}</p></div>
    <div class="anlass" data-anlass-box>
      <p class="anlass-titel" id="anlass-t">${t.anlassTitel}</p>
      <div class="chips" role="group" aria-labelledby="anlass-t" data-chips>
${chips}
      </div>
      <p class="sr-status" role="status" aria-live="polite" data-filter-status data-tpl-eins="${esc(t.anzahlSorten(1))}" data-tpl="${esc(t.anzahlSorten(0))}"></p>
    </div>
    ${gruppen}
    ${weitere}
  </div>
</section>`;
}

const SCHRITT_TEXTE = [
  'Am Anfang steht das Obst, ergänzt um Beeren, Kräuter und andere Zutaten, je nach Sorte.',
  'Aus dem Obst wird die Maische angesetzt, die Grundlage für den späteren Brand.',
  'In der Brennanlage wird die Maische gebrannt; das Destillat ist der Brand.',
  'Manche Brände ruhen danach in Tank oder Fass, bis sie abgefüllt werden.',
  'Zum Schluss wird abgefüllt und mit dem Etikett versehen.',
];

function brennen(IMG, lang) {
  const t = STR[lang];
  const foto = { 2: ['brennanlage', 'Brennanlage der Hierber Brennerei aus Kupfer und Edelstahl'], 3: ['lagerraum', 'Lagerraum der Hierber Brennerei mit Edelstahltanks und Eichenfässern'] };
  const items = t.schritte.map((s, i) => {
    const f = foto[i];
    const m = f && IMG[`foto-${f[0]}`];
    const fig = f
      ? `<div class="schritt-foto" style="max-width:${m.quelleW}px">${bild(IMG, `foto-${f[0]}`, { alt: f[1], sizes: `(min-width: 900px) 20vw, (min-width: 600px) 45vw, 90vw` })}</div>`
      : `<div class="schritt-foto platz" style="aspect-ratio:3/2" data-todo="foto"><span>${t.fotoNoetig}: ${s}</span></div>`;
    return `<li class="schritt">${fig}<p class="schritt-nr">${t.schrittNr} ${i + 1}</p><h3>${s}</h3>${lang === 'de' ? `<p data-todo="bestaetigen">${SCHRITT_TEXTE[i]}</p>` : ''}</li>`;
  }).join('\n');
  return `<section class="sektion papier" id="brennen" aria-labelledby="brennen-h">
  <div class="wrap">
    <div class="reveal"><h2 id="brennen-h">${t.brennenTitel}</h2>${lang === 'fr' ? folgt(t) : ''}</div>
    <ol class="schritte" role="list">
${items}
    </ol>
  </div>
</section>`;
}

function besuch(IMG, lang) {
  const t = STR[lang];
  const foto = bild(IMG, 'foto-verkaufsraum', { alt: t.besuchAlt, sizes: '(min-width: 900px) 480px, 90vw' });
  const zeiten = lang === 'de' ? `<p data-todo="bestaetigen">Öffnungszeiten folgen.</p>` : folgt(t);
  return `<section class="sektion papier papier2" id="besuch" aria-labelledby="besuch-h">
  <div class="wrap besuch-raster">
    <div class="besuch-text reveal">
      <h2 id="besuch-h">${t.besuchTitel}</h2>
      <h3>${t.adresse}</h3>
      <address>${esc(KONTAKT.firma)}<br>2, Millewee<br>L-6665 Herborn, Luxembourg</address>
      <h3>${t.oeffnungszeiten}</h3>
      ${zeiten}
      <h3>${t.telefon}</h3>
      <p><span data-todo="bestaetigen">${TELEFON}</span><br><a href="mailto:${KONTAKT.mail}">${KONTAKT.mail}</a></p>
      <div class="karte-platz" data-todo="foto"><span>${t.kartePlatzhalter}</span></div>
      <p><a class="textlink" href="${OSM}" rel="noopener" target="_blank">${t.karteLink}<span class="sr-only"> ${t.neuerTab}</span></a></p>
    </div>
    <figure class="besuch-foto" style="max-width:${Math.min(975, IMG['foto-verkaufsraum'].w)}px">${foto}</figure>
  </div>
</section>`;
}

export function startseite(IMG, lang) {
  const t = STR[lang];
  const heroFoto = bild(IMG, 'foto-verkaufsraum', { alt: t.heroAlt, sizes: '(min-width: 900px) 50vw, 100vw', eager: true });
  const lead = lang === 'de'
    ? `<p class="lead" data-todo="bestaetigen">Obstbrände, Whisky und Gin aus der eigenen Brennerei: klar, ehrlich und mit dem vollen Geschmack der Früchte, aus denen sie entstehen.</p>`
    : folgt(t, 'lead');
  const inhalt = `<section class="hero dunkel" aria-labelledby="h1">
  <div class="wrap hero-raster">
    <div class="hero-text">
      <p class="eyebrow">${t.heroEyebrow}</p>
      <h1 id="h1">Hierber Brennerei</h1>
      ${lead}
      <p class="knoepfe"><a class="knopf" href="#theke">${t.heroKnopf1}</a><a class="knopf knopf-hell" href="#besuch">${t.heroKnopf2}</a></p>
    </div>
    <figure class="hero-foto rahmen">${heroFoto}</figure>
  </div>
</section>
${fassreihe(lang)}
${theke(IMG, lang)}
${brennen(IMG, lang)}
${besuch(IMG, lang)}`;
  const ld = [{
    '@context': 'https://schema.org', '@type': 'LocalBusiness', name: KONTAKT.firma, url: absUrl('de', '/'), email: KONTAKT.mail, telephone: TELEFON,
    image: `${BASE}/og/standard.jpg`,
    address: { '@type': 'PostalAddress', streetAddress: '2, Millewee', postalCode: 'L-6665', addressLocality: 'Herborn', addressCountry: 'LU' },
  }];
  const titel = lang === 'de' ? 'Hierber Brennerei in Herborn, Luxemburg: Obstbrände, Whisky, Gin' : 'Hierber Brennerei à Herborn, Luxembourg : eaux-de-vie, whisky, gin';
  const beschr = lang === 'de'
    ? 'Hierber Brennerei in Herborn (Luxemburg): Obstbrände wie Mirabelle, Quetsch und Kirsch, Whisky, Gin und weitere Spirituosen. Sorten, Preise und Besuch.'
    : 'Hierber Brennerei à Herborn (Luxembourg) : eaux-de-vie de fruits comme la mirabelle, la quetsch et la cerise, whisky, gin et autres spiritueux. Variétés, prix et visite.';
  return seite({ lang, p: '/', titel, beschreibung: beschr, inhalt, jsonld: ld, skripte: ['/assets/js/site.js'] });
}
