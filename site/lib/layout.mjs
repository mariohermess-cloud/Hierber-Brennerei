// Gemeinsames Gerüst: <head>, Kopfzeile, Fußzeile, Altershinweis, Bild-Helfer.
import { esc, pfad, absUrl, BASE } from './util.mjs';
import { STR } from './i18n.mjs';
import { KONTAKT } from '../data/produkte.js';

export const TELEFON = '727602'; // laut Etikett/Preisliste; Vorwahl/Schreibweise ungeklärt (TODO-INHALTE.md)
export const OSM = 'https://www.openstreetmap.org/search?query=2%20Millewee%20Herborn';

// <picture> mit AVIF, WebP, JPEG. opts: sizes, cls, eager (Hero), alt, fixed (feste Anzeigebreite/-höhe über CSS)
export function bild(IMG, key, { alt, sizes, cls = '', eager = false, todo = '' }) {
  const m = IMG[key];
  const set = (ext) => m.breiten.map((w) => `/img/${key}-${w}.${ext} ${w}w`).join(', ');
  const fallback = `/img/${key}-${m.breiten[Math.min(1, m.breiten.length - 1)]}.jpg`;
  const attr = eager ? 'fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"';
  return `<picture><source type="image/avif" srcset="${set('avif')}" sizes="${sizes}"><source type="image/webp" srcset="${set('webp')}" sizes="${sizes}">`
    + `<img src="${fallback}" srcset="${set('jpg')}" sizes="${sizes}" width="${m.w}" height="${m.h}" alt="${esc(alt)}" class="${cls}" ${attr}${todo}></picture>`;
}

const ICON_MERKLISTE = '<svg class="icon" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M6 3.5h12a1 1 0 0 1 1 1V21l-7-4.2L5 21V4.5a1 1 0 0 1 1-1z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>';

export function seite({ lang, p, titel, beschreibung, inhalt, og, jsonld = [], skripte = [], typ = 'website', noindex = false, bodyClass = '' }) {
  const t = STR[lang];
  const de = absUrl('de', p), fr = absUrl('fr', p);
  const ogBild = `${BASE}${og || '/og/standard.jpg'}`;
  const ld = jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n');
  const skriptTags = skripte.map((s) => `<script src="${s}" defer></script>`).join('\n');
  const anderePfad = lang === 'de' ? pfad('fr', p) : pfad('de', p);
  return `<!doctype html>
<html lang="${t.lang}" class="nojs">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titel)}</title>
<meta name="description" content="${esc(beschreibung)}">
${noindex ? '<meta name="robots" content="noindex">' : ''}<link rel="canonical" href="${lang === 'de' ? de : fr}">
<link rel="alternate" hreflang="de" href="${de}">
<link rel="alternate" hreflang="fr" href="${fr}">
<link rel="alternate" hreflang="x-default" href="${de}">
<meta property="og:type" content="${typ}">
<meta property="og:site_name" content="Hierber Brennerei">
<meta property="og:title" content="${esc(titel)}">
<meta property="og:description" content="${esc(beschreibung)}">
<meta property="og:url" content="${lang === 'de' ? de : fr}">
<meta property="og:locale" content="${t.locale}">
<meta property="og:image" content="${ogBild}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#1b130d">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/fonts/cormorant-garamond-latin-600-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/inter-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/main.css">
<script>document.documentElement.className='js';try{if(localStorage.getItem('hb-alter')==='1')document.documentElement.classList.add('alter-ok')}catch(e){}</script>
${ld}
</head>
<body class="${bodyClass}" data-lang="${t.lang}">
<a class="skip" href="#inhalt">${t.skip}</a>
<header class="kopf">
  <div class="kopf-innen">
    <a class="logo" href="${pfad(lang, '/')}" aria-label="${esc(t.logoAlt)}"><span class="logo-name">Hierber Brennerei</span></a>
    <nav class="haupt" aria-label="${t.navHaupt}">
      <a href="${pfad(lang, '/')}#theke">${t.navBraende}</a>
      <a href="${pfad(lang, '/')}#besuch">${t.navBesuch}</a>
    </nav>
    <div class="kopf-rechts">
      <a class="merk" href="${pfad(lang, '/anfrage/')}" data-merk-link data-l-eins="${esc(t.merklisteEintraege(1))}" data-l-viele="${esc(t.merklisteEintraege(2).replace('2', '{n}'))}" aria-label="${esc(t.merklisteEintraege(0))}">${ICON_MERKLISTE}<span class="merk-text">${t.merkliste}</span><span class="zaehler" data-zaehler hidden>0</span></a>
      <div class="sprache" role="group" aria-label="${t.sprache}">
        <a href="${pfad('de', p)}" hreflang="de" lang="de"${lang === 'de' ? ' aria-current="true"' : ''}>DE</a><span aria-hidden="true">|</span><a href="${pfad('fr', p)}" hreflang="fr" lang="fr"${lang === 'fr' ? ' aria-current="true"' : ''}>FR</a>
      </div>
    </div>
  </div>
</header>
<div class="alter" role="region" aria-label="${t.alterRegion}" data-alter>
  <p>${t.alterText}</p>
  <button type="button" class="knopf" data-alter-ok>${t.alterKnopf}</button>
</div>
<main id="inhalt">
${inhalt}
</main>
<footer class="fuss">
  <div class="wrap fuss-raster">
    <div>
      <p class="fuss-titel">${esc(KONTAKT.firma)}</p>
      <address>2, Millewee<br>L-6665 Herborn<br>Luxembourg</address>
    </div>
    <div>
      <p class="fuss-titel">${t.footerKontakt}</p>
      <p><a href="mailto:${KONTAKT.mail}">${KONTAKT.mail}</a><br>${t.tel} ${TELEFON}</p>
    </div>
    <div>
      <p class="fuss-titel">${t.footerRechtliches}</p>
      <p><a href="${pfad(lang, '/impressum/')}">${t.impressum}</a><br><a href="${pfad(lang, '/datenschutz/')}">${t.datenschutz}</a></p>
    </div>
  </div>
  <div class="wrap fuss-klein">
    <p data-todo="bestaetigen">${t.genuss}</p>
    <p>${t.preisHinweis}</p>
  </div>
</footer>
${skriptTags}
</body>
</html>
`;
}

// Platzhalter für nicht übersetzte Entwurfstexte (FR)
export const folgt = (t, cls = '') => `<p class="platzhalter ${cls}" data-todo="uebersetzung">${t.textFolgt}</p>`;
