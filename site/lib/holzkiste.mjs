// Seite /brand/holzkiste-4x0-2l/: Holzkiste 4 x 0,2 l mit Live-Vorschau.
// Die Kundin wählt je Fach (2 x 2) eine Sorte; die Vorschau stellt die Freisteller-Flaschen in das echte Foto der leeren Kiste.
// Ebenen (von unten): Kistenfoto, Schatten und Flaschen (hinten zuerst), darüber eine Kopie des Kistenfotos, die per clip-path
// nur die vorderen Teile (linke Seitenlatte, linker vorderer Pfosten, vordere Latte mit Schrift) zeigt. Koordinaten: site/data/holzkiste.js.
// Ohne JavaScript steht die Standardbelegung im HTML; assets/js/kiste.js erweitert nur die Auswahl.
// Die Kiste steht bewusst nicht in PRODUKTE (keine Sortenkarte, kein Katalogeintrag).
import { PRODUKTE } from '../data/produkte.js';
import {
  KISTE_PREIS, KISTE_SORTEN, STANDARD_BELEGUNG, ZUSCHNITT, FAECHER, ZEICHENREIHENFOLGE, VORDERTEILE, SCHATTEN,
} from '../data/holzkiste.js';
import { STR } from './i18n.mjs';
import { esc, pfad, absUrl, fmtAbv, fmtPreis } from './util.mjs';
import { seite, bild, folgt } from './layout.mjs';

export const KISTE_ID = 'holzkiste-4x0-2l';
export const KISTE_NAME = 'Holzkiste 4 × 0,2 l';

const SORTE = Object.fromEntries(KISTE_SORTEN.map((id) => [id, PRODUKTE.find((p) => p.id === id)]));

// Beschriftungen der Seite (Entwurfstexte nur auf Deutsch, siehe folgt() im Französischen)
const K = {
  de: {
    eyebrow: 'Holzkisten',
    kurz: 'Vier Flaschen zu je 0,2 l in der Holzkiste.',
    intro: 'Wählen Sie für jedes der vier Fächer eine Sorte. Dieselbe Sorte darf auch mehrfach vorkommen.',
    festpreis: 'Festpreis, unabhängig von der Sortenwahl',
    fach: (n) => `Fach ${n}`,
    pos: ['hinten links', 'hinten rechts', 'vorne links', 'vorne rechts'],
    auswahl: 'Ihre Auswahl',
    vorschau: 'Vorschau der Kiste',
    altVor: `${KISTE_NAME} mit vier Flaschen`,
    ohneJs: 'Ohne JavaScript zeigt die Seite die Standardbelegung. Ihre Wunschbelegung können Sie uns in der Anfrage nennen.',
    anfrage: 'Anfrage senden',
    anfrageText: 'Nennen Sie uns in der Anfrage Ihre Belegung.',
    titel: `${KISTE_NAME} aus Herborn (Luxemburg) | Hierber Brennerei`,
    beschr: `${KISTE_NAME}: vier Flaschen zu je 0,2 l nach Wahl, zum Festpreis von ${KISTE_PREIS} €. Hierber Brennerei in Herborn, Luxemburg.`,
    mwst: 'inkl. 17 % MwSt.',
  },
  fr: {
    eyebrow: 'Caisses en bois',
    kurz: '',
    intro: '',
    festpreis: 'Prix fixe, quelle que soit la sélection',
    fach: (n) => `Compartiment ${n}`,
    pos: ['arrière gauche', 'arrière droite', 'avant gauche', 'avant droite'],
    auswahl: 'Votre choix',
    vorschau: 'Aperçu de la caisse',
    altVor: 'Caisse en bois 4 × 0,2 l avec quatre bouteilles',
    ohneJs: 'Sans JavaScript, la page montre la sélection par défaut. Indiquez-nous votre souhait dans la demande.',
    anfrage: 'Envoyer une demande',
    anfrageText: 'Indiquez-nous votre sélection dans la demande.',
    titel: 'Caisse en bois 4 × 0,2 l de Herborn (Luxembourg) | Hierber Brennerei',
    beschr: `Caisse en bois 4 × 0,2 l : quatre bouteilles de 0,2 l au choix, au prix fixe de ${KISTE_PREIS} €. Hierber Brennerei à Herborn, Luxembourg.`,
    mwst: 'TVA 17 % comprise',
  },
};

const name = (id) => SORTE[id].kurzname;

// Alt-Text der Vorschau aus der Belegung: "Holzkiste 4 × 0,2 l mit vier Flaschen: hinten links Gin, hinten rechts Rum, ..."
export function vorschauAlt(belegung, lang) {
  const k = K[lang];
  return `${k.altVor}: ${belegung.map((id, i) => `${k.pos[i]} ${name(id)}`).join(', ')}.`;
}

// Prozentwerte relativ zum Zuschnitt des Kistenfotos
const px = (x) => +((x - ZUSCHNITT.x) / ZUSCHNITT.b * 100).toFixed(3);
const py = (y) => +((y - ZUSCHNITT.y) / ZUSCHNITT.h * 100).toFixed(3);
const ph = (h) => +(h / ZUSCHNITT.h * 100).toFixed(3);
const pb = (b) => +(b / ZUSCHNITT.b * 100).toFixed(3);

function vorschau(IMG, belegung, lang) {
  const k = K[lang];
  const flaschen = ZEICHENREIHENFOLGE.map((nr) => {
    const f = FAECHER[nr - 1], id = belegung[nr - 1];
    const sw = SCHATTEN.breite * f.hoehe, sh = SCHATTEN.hoehe * f.hoehe;
    const schatten = `<span class="kiste-schatten" style="left:${px(f.fuss.x)}%;top:${py(f.fuss.y)}%;width:${pb(sw)}%;height:${ph(sh)}%;opacity:${SCHATTEN.deckkraft}"></span>`;
    const flasche = `<img class="kiste-flasche" src="/img/kiste-${id}.webp" alt="" data-fach-bild="${nr}" data-sorte="${id}" decoding="async" style="left:${px(f.fuss.x)}%;top:${py(f.fuss.y - f.hoehe)}%;height:${ph(f.hoehe)}%">`;
    return schatten + flasche;
  }).join('');
  const maske = `polygon(${VORDERTEILE.map(([x, y]) => `${px(x)}% ${py(y)}%`).join(',')})`;
  const alt = vorschauAlt(belegung, lang);
  return `<figure class="kiste-bild rahmen">
      <div class="kiste-buehne" data-kiste-buehne data-belegung="${belegung.join(',')}" data-alt-vor="${esc(k.altVor)}" style="aspect-ratio:${ZUSCHNITT.b}/${ZUSCHNITT.h}">
        ${bild(IMG, 'kiste-leer', { alt, sizes: '(min-width: 900px) 540px, 92vw', cls: 'kiste-grund', eager: true })}
        ${flaschen}
        <div class="kiste-vorn" style="clip-path:${maske}" aria-hidden="true">${bild(IMG, 'kiste-leer', { alt: '', sizes: '(min-width: 900px) 540px, 92vw', eager: true })}</div>
      </div>
      <figcaption class="sr-only">${esc(k.vorschau)}</figcaption>
    </figure>`;
}

function wahl(belegung, lang) {
  const k = K[lang];
  const faecher = FAECHER.map((f, i) => {
    const kacheln = KISTE_SORTEN.map((id) => `<label class="chip-radio kiste-kachel"><input type="radio" name="fach-${f.nr}" value="${id}" data-name="${esc(name(id))}"${belegung[i] === id ? ' checked' : ''}><span><span class="kiste-sorte">${esc(name(id))}</span> <span class="kiste-abv">${fmtAbv(SORTE[id].abv)}</span></span></label>`).join('');
    return `<fieldset class="kiste-fach" data-fach="${f.nr}" data-position="${esc(k.pos[i])}"><legend>${k.fach(f.nr)} <span class="kiste-pos">· ${k.pos[i]}</span></legend><div class="chips">${kacheln}</div></fieldset>`;
  }).join('\n');
  return `<div class="kiste-wahl" data-kiste-wahl>\n${faecher}\n</div>`;
}

function jsonLd(lang, beschr) {
  const url = absUrl(lang, `/brand/${KISTE_ID}/`);
  const t = STR[lang];
  return [
    {
      '@context': 'https://schema.org', '@type': 'Product', name: lang === 'de' ? KISTE_NAME : K.fr.altVor.split(' avec ')[0], description: beschr, url,
      brand: { '@type': 'Brand', name: 'Hierber Brennerei' }, category: 'Spirituosen',
      offers: { '@type': 'Offer', price: KISTE_PREIS.toFixed(2), priceCurrency: 'EUR', url },
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t.startseite, item: absUrl(lang, '/') },
        { '@type': 'ListItem', position: 2, name: lang === 'de' ? KISTE_NAME : 'Caisse en bois 4 × 0,2 l', item: url },
      ],
    },
  ];
}

export function kistenSeite(IMG, lang) {
  const t = STR[lang], k = K[lang];
  const belegung = STANDARD_BELEGUNG;
  const titel = lang === 'de' ? KISTE_NAME : 'Caisse en bois 4 × 0,2 l';
  const krumen = `<nav class="brotkrumen" aria-label="${t.brotkrumen}"><ol><li><a href="${pfad(lang, '/')}">${t.startseite}</a></li><li aria-current="page">${esc(titel)}</li></ol></nav>`;
  const text = lang === 'de'
    ? `<p class="kurz" data-todo="bestaetigen">${esc(k.kurz)}</p><p class="intro" data-todo="bestaetigen">${esc(k.intro)}</p>`
    : folgt(t, 'intro');
  const inhalt = `<section class="sektion dunkel produkt-kopf kiste" id="produkt" aria-labelledby="h1">
  <div class="wrap">
    ${krumen}
    <div class="kiste-raster">
      ${vorschau(IMG, belegung, lang)}
      <div class="produkt-text">
        <p class="eyebrow">${k.eyebrow}</p>
        <h1 id="h1">${esc(titel)}</h1>
        ${text}
        <p class="kiste-preis"><strong class="auswahl-preis" data-kiste-preis>${fmtPreis(KISTE_PREIS)}</strong> <span class="mwst">${k.mwst}</span><br><span class="kiste-fest">${k.festpreis}</span></p>
        ${wahl(belegung, lang)}
        <p class="auswahl kiste-auswahl" data-kiste-auswahl aria-live="polite"><span class="auswahl-label">${k.auswahl}:</span> <span data-kiste-text>${belegung.map(name).map(esc).join(', ')}</span></p>
        <noscript><p class="hinweis">${k.ohneJs}</p></noscript>
        <p class="kiste-anfrage">${k.anfrageText} <a class="knopf" href="${pfad(lang, '/anfrage/')}">${k.anfrage}</a></p>
      </div>
    </div>
  </div>
</section>`;
  return seite({
    lang, p: `/brand/${KISTE_ID}/`, titel: k.titel, beschreibung: k.beschr, inhalt, og: '/og/standard.jpg',
    jsonld: jsonLd(lang, k.beschr), skripte: ['/assets/js/site.js', '/assets/js/kiste.js'], typ: 'product',
  });
}
