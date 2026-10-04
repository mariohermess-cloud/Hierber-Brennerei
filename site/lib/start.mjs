// Startseite und wiederverwendbare Bausteine (Sortenkarte, Fass-Symbol).
import { PRODUKTE, KONTAKT } from '../data/produkte.js';
import { GRUPPEN } from '../data/gruppen.js';
import { ANLAESSE, anlaesseVon } from '../data/anlaesse.js';
import { ETIKETTEN } from '../data/etiketten.js';
import { FOTO_SORTEN } from '../data/flaschen.js';
import { flasche, flaschenFoto, FLASCHEN_DEFS } from './flasche.mjs';
import { STR } from './i18n.mjs';
import { esc, pfad, absUrl, fmtAbv, fmtPreis, preisInfo, BASE, NB } from './util.mjs';
import { seite, bild, folgt, TELEFON, OSM } from './layout.mjs';

export const produktById = (id) => PRODUKTE.find((p) => p.id === id);

// Sortenkarte: neu erzeugte Produktflasche (fotos-flaschen/<id>.png), sonst Vektor-Flasche mit flachem Etikett auf Holzton; ohne Etikett beschrifteter Platzhalter.
export function karte(IMG, p, lang, { anlass = true } = {}) {
  const t = STR[lang];
  const info = preisInfo(p);
  const foto = FOTO_SORTEN[p.id];
  let bildHtml;
  const mitFoto = !!IMG[`flasche-${p.id}`];
  if (mitFoto) bildHtml = flaschenFoto(IMG, p);
  else if (ETIKETTEN[p.id]) bildHtml = flasche(IMG, p);
  else if (foto) bildHtml = `<span class="karte-foto">${bild(IMG, `foto-${foto.karte}`, { alt: '', sizes: '(min-width: 1000px) 260px, 45vw', cls: 'karte-foto-bild' }).replace('<img ', `<img style="object-position:${foto.pos}" `)}</span>`;
  else bildHtml = `<span class="karte-platzhalter" data-todo="foto"><span>${esc(p.name)}</span><span>${t.etikettFolgt}</span></span>`;
  const preis = info
    ? `<span class="preis" data-preis-ab="${info.min}">${t.ab} ${fmtPreis(info.min)}</span>`
    : `<span class="preis anfrage" data-preis-anfrage>${t.preisAnfrage}</span>`;
  const an = anlass ? ` data-anlass="${anlaesseVon(p.id).join(' ')}"` : '';
  return `<li class="karte-li" data-id="${p.id}"${an}><a class="karte" href="${pfad(lang, `/brand/${p.id}/`)}#produkt">`
    + `<span class="karte-bild${mitFoto ? ' karte-bild-foto' : ''}">${bildHtml}</span>`
    + `<span class="karte-name" data-sortenname="${esc(p.name)}">${esc(p.name)}</span>`
    + `<span class="karte-meta"><span data-abv="${p.abv}">${fmtAbv(p.abv)}</span> <span aria-hidden="true">·</span> ${preis}</span></a></li>`;
}

const FASS_IDS = PRODUKTE.filter((p) => p.ort === 'fass');

// Fassreihe: Foto des Fassraums, darunter die Kreidetafeln der 14 Fass-Sorten nebeneinander (mobil horizontal scrollbar mit scroll-snap).
// Die Tafeln sind keine Zuordnung zu den sichtbaren Fässern (unbekannt, TODO-INHALTE.md).
function fassreihe(IMG, lang) {
  const t = STR[lang];
  const tafeln = FASS_IDS.map((p) => `<li class="schild-li"><a class="schild" href="${pfad(lang, `/brand/${p.id}/`)}#produkt">`
    + `<span class="schild-name" data-sortenname="${esc(p.kurzname)}">${esc(p.kurzname)}</span>`
    + `<span class="schild-abv" data-abv="${p.abv}">${p.abv}${NB}%</span></a></li>`).join('\n');
  return `<section class="sektion dunkel fassreihe-sektion" id="fassreihe" aria-labelledby="fass-h">
  <div class="wrap reveal"><h2 id="fass-h">${t.fassTitel}</h2><p class="lead-klein">${t.fassText}</p></div>
  <div class="wrap">
    <figure class="rahmen bildrahmen">${bild(IMG, 'foto-fassraum-eichenfaesser', { alt: t.fassAlt, sizes: '(min-width: 1200px) 1150px, 92vw' })}<figcaption>${t.fassBildunterschrift}</figcaption></figure>
  </div>
  <div class="schilder-rahmen">
    <ul class="schilder" role="list" aria-label="${t.fassAria}">
${tafeln}
    </ul>
  </div>
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
  ${FLASCHEN_DEFS}
  <div class="wrap">
    <div class="reveal"><h2 id="theke-h">${t.thekeTitel}</h2><p class="lead-klein">${t.thekeText}</p></div>
    <figure class="rahmen bildrahmen theke-foto">${bild(IMG, 'foto-flaschenreihe-theke', { alt: t.thekeAlt, sizes: '(min-width: 1200px) 1150px, 92vw' })}<figcaption>${t.thekeBildunterschrift}</figcaption></figure>
    <div class="anlass" data-anlass-box>
      <p class="anlass-titel" id="anlass-t">${t.anlassTitel}</p>
      <div class="chips" role="group" aria-labelledby="anlass-t" data-chips>
${chips}
      </div>
      <p class="sr-status" role="status" aria-live="polite" data-filter-status data-tpl-eins="${esc(t.anzahlSorten(1))}" data-tpl="${esc(t.anzahlSorten(0))}"></p>
      <figure class="rahmen bildrahmen anlass-foto" data-anlass-foto="geschenk" hidden>${bild(IMG, 'foto-geschenkregal', { alt: t.geschenkAlt, sizes: '(min-width: 900px) 520px, 92vw' })}<figcaption>${t.geschenkBildunterschrift}</figcaption></figure>
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
  'Zum Schluss wird abgefüllt und die Flasche beschriftet.',
];

// Schritt -> Foto (Schlüssel, Ausschnitt). Maische und Abfüllen: beschriftete Foto-Platzhalter.
const SCHRITT_FOTO = { 0: ['hof-birnenkisten', 'obst', 'center 88%'], 2: ['brennanlage-gross', 'brennen', 'center'], 3: ['fassraum-eichenfaesser', 'reifen', 'center'] };

function brennen(IMG, lang) {
  const t = STR[lang];
  const items = t.schritte.map((s, i) => {
    const f = SCHRITT_FOTO[i];
    const fig = f
      ? `<figure class="schritt-foto">${bild(IMG, `foto-${f[0]}`, { alt: t.fotoAlt[f[1]], sizes: '(min-width: 900px) 560px, 92vw', cls: 'schritt-bild' })}</figure>`
      : `<div class="schritt-foto platz" data-todo="foto"><span>${t.fotoNoetig}: ${s}</span></div>`;
    return `<li class="schritt">${fig}<div class="schritt-text"><p class="schritt-nr">${t.schrittNr} ${i + 1}</p><h3>${s}</h3>${lang === 'de' ? `<p data-todo="bestaetigen">${SCHRITT_TEXTE[i]}</p>` : ''}</div></li>`;
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
    <div class="besuch-bilder">
      <figure class="besuch-foto">${bild(IMG, 'foto-hofschild-aussen', { alt: t.besuchAlt, sizes: '(min-width: 900px) 560px, 92vw' })}<figcaption>${t.besuchBildunterschrift}</figcaption></figure>
      <figure class="besuch-foto klein">${bild(IMG, 'foto-geschenkregal', { alt: t.geschenkAlt, sizes: '(min-width: 900px) 300px, 60vw' })}<figcaption>${t.geschenkBildunterschrift}</figcaption></figure>
    </div>
  </div>
</section>`;
}

export function startseite(IMG, lang) {
  const t = STR[lang];
  const heroFoto = bild(IMG, 'foto-hof-birnenkisten', { alt: t.heroAlt, sizes: '(min-width: 1200px) 560px, (min-width: 900px) 46vw, 92vw', eager: true });
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
${fassreihe(IMG, lang)}
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
