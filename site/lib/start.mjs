// Startseite und wiederverwendbare Bausteine (Sortenkarte, Fass-Symbol).
import { PRODUKTE, KONTAKT } from '../data/produkte.js';
import { GRUPPEN } from '../data/gruppen.js';
import { ANLAESSE, anlaesseVon } from '../data/anlaesse.js';
import { ETIKETTEN } from '../data/etiketten.js';
import { FOTO_SORTEN } from '../data/flaschen.js';
import { TYPEN, SERVIERVORSCHLAEGE } from '../data/serviervorschlaege.js';
import { KI_BILDER, kiKey } from '../data/ki-bilder.js';
import { STANDARD_BELEGUNG, ZUSCHNITT, FAECHER, ZEICHENREIHENFOLGE, VORDERTEILE, SCHATTEN } from '../data/holzkiste.js';
import { KISTE_ID, vorschauAlt, zahlenbandHtml } from './holzkiste.mjs';
import { flasche, flaschenFoto, kartenFotoKey, FLASCHEN_DEFS } from './flasche.mjs';
import { STR } from './i18n.mjs';
import { esc, pfad, absUrl, fmtAbv, fmtPreis, preisInfo, BASE, NB } from './util.mjs';
import { seite, bild, folgt, TELEFON, OSM } from './layout.mjs';

export const produktById = (id) => PRODUKTE.find((p) => p.id === id);

// Sortenkarte: neu erzeugte Produktflasche (fotos-flaschen/<id>-0-5l.png), sonst Vektor-Flasche mit flachem Etikett auf Holzton; ohne Etikett beschrifteter Platzhalter.
export function karte(IMG, p, lang, { anlass = true } = {}) {
  const t = STR[lang];
  const info = preisInfo(p);
  const foto = FOTO_SORTEN[p.id];
  let bildHtml;
  const fotoKey = kartenFotoKey(IMG, p), mitFoto = !!fotoKey;
  if (mitFoto) bildHtml = flaschenFoto(IMG, p, { key: fotoKey });
  else if (ETIKETTEN[p.id]) bildHtml = flasche(IMG, p);
  else if (foto) bildHtml = `<span class="karte-foto">${bild(IMG, `foto-${foto.karte}`, { alt: '', sizes: '(min-width: 1000px) 260px, 45vw', cls: 'karte-foto-bild' }).replace('<img ', `<img style="object-position:${foto.pos}" `)}</span>`;
  else bildHtml = `<span class="karte-platzhalter" data-todo="foto"><span>${esc(p.name)}</span><span>${t.etikettFolgt}</span></span>`;
  const preis = info
    ? `<span class="preis" data-preis-ab="${info.min}">${t.ab} ${fmtPreis(info.min)}</span>`
    : `<span class="preis anfrage" data-preis-anfrage>${t.preisAnfrage}</span>`;
  // Bildwechsel: Serviervorschlag-Hauptbild (KI-Symbolbild) als zweites, dekoratives Bild; erscheint nur bei Maus-Hover (CSS), lädt lazy und nur dort, wo es angezeigt wird
  const wechsel = KI_BILDER[p.id] && IMG[kiKey(p.id, 1)]
    ? `<span class="karte-wechsel" aria-hidden="true">${bild(IMG, kiKey(p.id, 1), { alt: '', sizes: '260px', cls: 'karte-wechsel-bild' })}</span>` : '';
  const an = anlass ? ` data-anlass="${anlaesseVon(p.id).join(' ')}"` : '';
  return `<li class="karte-li" data-id="${p.id}"${an}><a class="karte" href="${pfad(lang, `/brand/${p.id}/`)}#produkt">`
    + `<span class="karte-bild${mitFoto ? ' karte-bild-foto' : ''}">${bildHtml}${wechsel}</span>`
    + `<span class="karte-name" data-sortenname="${esc(p.name)}">${esc(p.name)}</span>`
    + `<span class="karte-meta">${p.abv == null ? '' : `<span data-abv="${p.abv}">${fmtAbv(p.abv)}</span> <span aria-hidden="true">·</span> `}${preis}</span></a></li>`;
}

const FASS_IDS = PRODUKTE.filter((p) => p.ort === 'fass');

// Fassreihe: die Kreidetafeln der 14 Fass-Sorten nebeneinander (das Foto des Fassraums steht im Hero) (mobil horizontal scrollbar mit scroll-snap).
// Die Tafeln sind keine Zuordnung zu den sichtbaren Fässern (unbekannt, TODO-INHALTE.md).
function fassreihe(IMG, lang) {
  const t = STR[lang];
  const tafeln = FASS_IDS.map((p) => `<li class="schild-li"><a class="schild" href="${pfad(lang, `/brand/${p.id}/`)}#produkt">`
    + `<span class="schild-name" data-sortenname="${esc(p.kurzname)}">${esc(p.kurzname)}</span>`
    + `<span class="schild-abv" data-abv="${p.abv}">${p.abv}${NB}%</span></a></li>`).join('\n');
  return `<section class="sektion dunkel fassreihe-sektion" id="fassreihe" aria-labelledby="fass-h">
  <div class="wrap reveal"><h2 id="fass-h">${t.fassTitel}</h2><p class="lead-klein">${t.fassText}</p></div>
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
    ? `<div class="weitere" data-todo="bestaetigen"><h3>${t.weitereTitel}</h3><p>Kräider Batti · <a href="${pfad(lang, '/brand/holzkiste-4x0-2l/')}">Holzkisten</a></p></div>`
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

// ---------- So genießen: Serviervorschläge über alle Sorten ----------
// Karten mit Bild: je Sorte der Vorschlag, dessen Symbolbild die Sortenseite als Hauptbild zeigt (KI_BILDER, Bild ki-<id> in IMG); Sorten ohne Bild entfallen.
// Höchstens GENIESS_MAX_TYP Karten je Art, damit die Reihe (insgesamt höchstens 24 Karten) abwechslungsreich bleibt. Reihenfolge wie in KI_BILDER.
const GENIESS_MAX_TYP = 10;
function geniessAuswahl(IMG) {
  const zaehler = {};
  const liste = [];
  for (const id of Object.keys(KI_BILDER)) {
    const p = produktById(id);
    const r = (SERVIERVORSCHLAEGE[id] || []).find((v) => v.name === KI_BILDER[id]);
    if (!p || !r || !IMG[kiKey(id, 1)]) continue;
    zaehler[r.typ] = (zaehler[r.typ] || 0) + 1;
    if (zaehler[r.typ] > GENIESS_MAX_TYP) continue;
    liste.push({ p, r });
  }
  return liste;
}

function geniessen(IMG, lang) {
  const t = STR[lang];
  const kopf = `<div class="reveal"><h2 id="geniessen-h">${t.geniessenTitel}</h2>`;
  // Wie auf den Sortenseiten: Serviervorschläge nur auf Deutsch, im Französischen der Platzhalter
  if (lang === 'fr') return `<section class="sektion papier geniessen" id="geniessen" aria-labelledby="geniessen-h"><div class="wrap">${kopf}${folgt(t)}</div></div></section>`;
  const auswahl = geniessAuswahl(IMG);
  const typen = TYPEN.filter((typ) => auswahl.some((a) => a.r.typ === typ));
  const chips = [`<button type="button" class="chip" data-geniess-filter="" aria-pressed="true">${t.geniessenAlle}</button>`,
    ...typen.map((typ) => `<button type="button" class="chip" data-geniess-filter="${esc(typ)}" aria-pressed="false">${esc(typ)}</button>`)].join('\n');
  const karten = auswahl.map(({ p, r }) => `<li class="geniess-li" data-typ="${esc(r.typ)}"><a class="geniess-karte" href="${pfad(lang, `/brand/${p.id}/`)}#servieren">`
    + `<span class="geniess-bild">${bild(IMG, kiKey(p.id, 1), { alt: '', sizes: '(min-width: 900px) 336px, 74vw', cls: 'geniess-bild-img', todo: ' data-todo="bestaetigen"' })}<span class="geniess-badge">${t.symbolbildKurz}</span></span>`
    + `<span class="geniess-typ">${esc(r.typ)}</span><span class="geniess-name">${esc(r.name)}</span><span class="geniess-sorte">${esc(p.name)}</span></a></li>`).join('\n');
  return `<section class="sektion papier geniessen" id="geniessen" aria-labelledby="geniessen-h" data-todo="bestaetigen">
  <div class="wrap">
    ${kopf}<p class="lead-klein">${t.geniessenText}</p></div>
    <div class="geniess-steuerung" data-geniess-box>
      <div class="chips" role="group" aria-label="${t.geniessenFilterAria}" data-geniess-chips>
${chips}
      </div>
      <p class="geniess-pfeile"><button type="button" class="pfeil" data-geniess-pfeil="-1" aria-label="${t.geniessenZurueck}"><span aria-hidden="true">←</span></button><button type="button" class="pfeil" data-geniess-pfeil="1" aria-label="${t.geniessenWeiter}"><span aria-hidden="true">→</span></button></p>
    </div>
    <p class="sr-status" role="status" aria-live="polite" data-geniess-status data-tpl-eins="${esc(t.anzahlVorschlaege(1))}" data-tpl="${esc(t.anzahlVorschlaege(0))}"></p>
  </div>
  <div class="geniess-rahmen">
    <ul class="geniess-liste" role="list" aria-label="${t.geniessenAria}" data-geniess-liste>
${karten}
    </ul>
  </div>
</section>`;
}

// ---------- Probierkiste: Band zur Holzkiste 4 x 0,2 l ----------
// Bild wie die Vorschau auf /brand/holzkiste-4x0-2l/ (Kistenfoto mit den Freistellern der Standardbelegung), aber ohne Auswahl. Preis steht bewusst nicht hier (pruefe_daten erlaubt auf der Startseite keine Preise außerhalb der Karten).
const px = (x) => +((x - ZUSCHNITT.x) / ZUSCHNITT.b * 100).toFixed(3);
const py = (y) => +((y - ZUSCHNITT.y) / ZUSCHNITT.h * 100).toFixed(3);
const ph = (h) => +(h / ZUSCHNITT.h * 100).toFixed(3);
const pb = (b) => +(b / ZUSCHNITT.b * 100).toFixed(3);

function kistenBild(IMG, lang) {
  const belegung = STANDARD_BELEGUNG;
  const flaschen = ZEICHENREIHENFOLGE.map((nr) => {
    const f = FAECHER[nr - 1], id = belegung[nr - 1];
    const sw = SCHATTEN.breite * f.hoehe, sh = SCHATTEN.hoehe * f.hoehe;
    return `<span class="kiste-schatten" style="left:${px(f.fuss.x)}%;top:${py(f.fuss.y)}%;width:${pb(sw)}%;height:${ph(sh)}%;opacity:${SCHATTEN.deckkraft}"></span>`
      + `<img class="kiste-flasche" src="/img/kiste-${id}.webp" alt="" loading="lazy" decoding="async" style="left:${px(f.fuss.x)}%;top:${py(f.fuss.y - f.hoehe)}%;height:${ph(f.hoehe)}%">`;
  }).join('');
  const maske = `polygon(${VORDERTEILE.map(([x, y]) => `${px(x)}% ${py(y)}%`).join(',')})`;
  const sizes = '(min-width: 900px) 540px, 92vw';
  return `<figure class="probier-bild rahmen"><div class="kiste-buehne" style="aspect-ratio:${ZUSCHNITT.b}/${ZUSCHNITT.h}">`
    + `${bild(IMG, 'kiste-leer', { alt: vorschauAlt(belegung, lang), sizes, cls: 'kiste-grund' })}${flaschen}`
    + `<div class="kiste-vorn" style="clip-path:${maske}" aria-hidden="true">${bild(IMG, 'kiste-leer', { alt: '', sizes })}</div></div></figure>`;
}

// sorte: auf der Sortenseite einer Kistensorte (KISTE_SORTEN) der Hinweis auf diese Sorte; ohne sorte (Startseite) der allgemeine Text
export function probierkiste(IMG, lang, sorte = null) {
  const t = STR[lang];
  const deText = sorte
    ? `${esc(sorte.kurzname)} gibt es auch als 0,2-l-Flasche in der Probierkiste. Wählen Sie für jedes Fach eine Sorte.`
    : 'Vier Flaschen zu je 0,2 l in der Holzkiste. Wählen Sie für jedes Fach eine Sorte.';
  const text = lang === 'de'
    ? `<p class="lead-klein" data-todo="bestaetigen">${deText}</p>`
    : folgt(t, 'lead-klein');
  return `<section class="sektion dunkel probierkiste" id="probierkiste" aria-labelledby="probierkiste-h">
  <div class="wrap probier-raster">
    ${kistenBild(IMG, lang)}
    <div class="probier-text reveal">
      <p class="eyebrow">${t.kisteEyebrow}</p>
      <h2 id="probierkiste-h">${t.kisteTitel}</h2>
      ${text}
      <p class="knoepfe"><a class="knopf" href="${pfad(lang, `/brand/${KISTE_ID}/`)}">${t.kisteKnopf}</a></p>
    </div>
  </div>
</section>`;
}

// Zahlenband unter dem Hero: ausschließlich aus den Daten berechnet (Markup: zahlenbandHtml in holzkiste.mjs)
function zahlenband(lang) {
  const t = STR[lang];
  return zahlenbandHtml(t.zahlenAria, [
    { wert: PRODUKTE.length, label: t.zahlSorten },
    { wert: FASS_IDS.length, label: t.zahlFass },
    { wert: 'Herborn', label: t.zahlLand },
  ]);
}

const SCHRITT_TEXTE = [
  'Am Anfang steht das Obst, ergänzt um Beeren, Kräuter und andere Zutaten, je nach Sorte.',
  'Aus dem Obst wird die Maische angesetzt, die Grundlage für den späteren Brand.',
  'In der Brennanlage wird die Maische gebrannt; das Destillat ist der Brand.',
  'Manche Brände ruhen danach in Tank oder Fass, bis sie abgefüllt werden.',
  'Zum Schluss wird abgefüllt und die Flasche beschriftet.',
];

// Schritt -> Foto (Schlüssel, Alt-Schlüssel, Ausschnitt, Symbolbild?). Maische und Abfüllen: Bilder des Nutzers (Fotos/hof-maische.png, hof-abfullen.png), als Symbolbild gekennzeichnet.
const SCHRITT_FOTO = { 0: ['hof-birnenkisten', 'obst', 'center 88%'], 1: ['hof-maische', 'maische', 'center', true], 4: ['hof-abfullen', 'abfuellen', 'center', true], 2: ['brennanlage-gross', 'brennen', 'center'], 3: ['fassraum-eichenfaesser', 'reifen', 'center'] };

function brennen(IMG, lang) {
  const t = STR[lang];
  const items = t.schritte.map((s, i) => {
    const f = SCHRITT_FOTO[i];
    const fig = f
      ? `<figure class="schritt-foto">${bild(IMG, `foto-${f[0]}`, { alt: t.fotoAlt[f[1]], sizes: '(min-width: 900px) 560px, 92vw', cls: 'schritt-bild' })}${f[3] ? `<figcaption>${t.symbolbildKurz}</figcaption>` : ''}</figure>`
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
  // Vollbild-Hero mit dem Foto des Fassraums (LCP: eager); dunkler Verlauf und langsamer Zoom per CSS
  const heroFoto = bild(IMG, 'foto-fassraum-eichenfaesser', { alt: t.heroAlt, sizes: '100vw', eager: true });
  const lead = lang === 'de'
    ? `<p class="lead" data-todo="bestaetigen">Obstbrände, Whisky und Gin aus der eigenen Brennerei: klar, ehrlich und mit dem vollen Geschmack der Früchte, aus denen sie entstehen.</p>`
    : folgt(t, 'lead');
  const inhalt = `<section class="hero hero-voll dunkel" aria-labelledby="h1">
  <div class="hero-bild">${heroFoto}</div>
  <div class="wrap hero-inhalt">
    <div class="hero-text">
      <p class="eyebrow">${t.heroEyebrow}</p>
      <h1 id="h1">Hierber Brennerei</h1>
      ${lead}
      <p class="knoepfe"><a class="knopf" href="#theke">${t.heroKnopf1}</a><a class="knopf knopf-hell" href="#besuch">${t.heroKnopf2}</a></p>
    </div>
  </div>
</section>
${zahlenband(lang)}
${fassreihe(IMG, lang)}
${theke(IMG, lang)}
${geniessen(IMG, lang)}
${probierkiste(IMG, lang)}
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
  return seite({ lang, p: '/', titel, beschreibung: beschr, inhalt, jsonld: ld, skripte: ['/assets/js/site.js'], bodyClass: 'start' });
}
