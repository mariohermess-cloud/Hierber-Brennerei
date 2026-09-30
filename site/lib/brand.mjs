// Sortenseite /brand/<id>/ mit Verkostung, Serviervorschlägen (Tabs), Varianten/Größen/Preisen und "Passt auch".
import { PRODUKTE } from '../data/produkte.js';
import { ETIKETTEN } from '../data/etiketten.js';
import { TEXTE, FAMILIE, FAM } from '../data/texte.js';
import { SERVIERVORSCHLAEGE } from '../data/serviervorschlaege.js';
import { verwandtFuer } from '../data/verwandt.js';
import { gruppeVon } from '../data/gruppen.js';
import { STR } from './i18n.mjs';
import { esc, pfad, absUrl, fmtAbv, fmtPreis, fmtMenge, preisInfo, erklaerung, BASE } from './util.mjs';
import { seite, bild, folgt } from './layout.mjs';
import { karte, produktById } from './start.mjs';

const ohneAbv = (kurz) => kurz.replace(/,?\s*\d+\s*%\s*vol\.?/, '').trim();

function servieren(p, lang) {
  const t = STR[lang];
  const liste = SERVIERVORSCHLAEGE[p.id];
  const kopf = `<h2 id="servieren-h">${t.serviertTitel(esc(p.kurzname))}</h2>`;
  if (lang === 'fr') return `<section class="sektion papier papier2" id="servieren" aria-labelledby="servieren-h"><div class="wrap">${kopf}${folgt(t)}</div></section>`;
  const tabs = liste.map((r, i) => `<button type="button" role="tab" class="tab" id="tab-${i}" aria-selected="${i === 0}" aria-controls="panel-${i}" tabindex="${i === 0 ? 0 : -1}"><span class="tab-typ">${esc(r.typ)}</span><span class="tab-name">${esc(r.name)}</span></button>`).join('\n');
  const panels = liste.map((r, i) => `<div role="tabpanel" class="panel${i === 0 ? ' aktiv' : ''}" id="panel-${i}" aria-labelledby="tab-${i}" tabindex="0" data-todo="bestaetigen">
  <div class="panel-foto platz" data-todo="foto" style="aspect-ratio:4/3"><span>${esc(t.serviertFoto(r.name))}</span></div>
  <div class="panel-text">
    <p class="panel-typ">${esc(r.typ)}</p>
    <h3>${esc(r.name)}</h3>
    <p class="panel-glas">${t.glas}: ${esc(r.glas)}</p>
    <h4>${t.zutaten}</h4>
    <ul class="zutaten" role="list">${r.zutaten.map(([m, z]) => `<li><span class="menge">${esc(m)}</span> ${esc(z)}</li>`).join('')}</ul>
    <h4>${t.zubereitung}</h4>
    <ol class="schritte-liste">${r.schritte.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
    <p class="passt"><span class="passt-label">${t.passtZu}:</span> ${r.passtZu.map(esc).join(', ')}</p>
  </div>
</div>`).join('\n');
  return `<section class="sektion papier papier2" id="servieren" aria-labelledby="servieren-h">
  <div class="wrap">
    ${kopf}
    <div class="tabs" data-tabs>
      <div class="tablist" role="tablist" aria-label="${t.serviertAria}" aria-orientation="horizontal">
${tabs}
      </div>
${panels}
    </div>
  </div>
</section>`;
}

function kaufen(p, lang) {
  const t = STR[lang];
  const mehrere = p.varianten.length > 1;
  const keinPreis = p.varianten.every((v) => v.preise.length === 0);
  const chips = mehrere
    ? `<div class="varianten" role="radiogroup" aria-label="${t.variante}" data-varianten>${p.varianten.map((v, i) => `<label class="chip-radio"><input type="radio" name="variante" value="${v.id}"${i === 0 ? ' checked' : ''}><span data-sortenname="${esc(v.name)}">${esc(v.name)}</span></label>`).join('')}</div>` : '';
  const bloecke = p.varianten.map((v, i) => {
    const kopf = `<h3 class="variante-kopf" data-sortenname="${esc(v.name)}">${esc(v.name)}</h3>`;
    const abv = `<p class="variante-abv">${t.alkoholgehalt}: <span data-abv="${v.abv}">${fmtAbv(v.abv)}</span></p>`;
    let groessen;
    if (v.preise.length) {
      groessen = `<fieldset class="groessen"><legend>${t.groesse}</legend><div class="chips">${v.preise.map((x, j) => {
        const gewaehlt = i === 0 && j === 0;
        return `<label class="chip-radio"><input type="radio" name="groesse" value="${esc(x.menge)}" data-variante="${v.id}" data-menge="${esc(x.menge)}" data-preis="${x.preis}"${gewaehlt ? ' checked' : ''}><span><span data-groesse>${fmtMenge(x.menge)}</span> <span aria-hidden="true">·</span> <span class="chip-preis" data-preis-wert="${x.preis}">${fmtPreis(x.preis)}</span></span></label>`;
      }).join('')}</div></fieldset>`;
    } else {
      groessen = `<p class="preis anfrage" data-preis-anfrage>${t.preisAnfrage}</p>`;
    }
    return `<div class="variante${i === 0 ? ' aktiv' : ''}" data-variante-block="${v.id}">${kopf}${abv}${groessen}</div>`;
  }).join('\n');
  const v0 = p.varianten[0];
  const x0 = v0.preise[0];
  const auswahl = keinPreis
    ? ''
    : `<p class="auswahl" data-auswahl aria-live="polite"><span class="auswahl-label">${t.auswahl}:</span> <span data-auswahl-text>${esc(v0.name)}${x0 ? `, ${fmtMenge(x0.menge)}` : ''}</span> <strong class="auswahl-preis" data-auswahl-preis>${x0 ? fmtPreis(x0.preis) : t.preisAnfrage}</strong> <span class="mwst">${t.inklMwst}</span></p>`;
  return `<section class="sektion dunkel" id="kaufen" aria-labelledby="kaufen-h" data-kauf data-produkt="${p.id}" data-produkt-name="${esc(p.name)}" data-lang="${lang}">
  <div class="wrap kauf">
    <h2 id="kaufen-h">${t.kaufTitel}</h2>
    ${chips}
    ${bloecke}
    ${auswahl}
    <p class="kauf-knoepfe"><button type="button" class="knopf" data-merk-add>${t.aufMerkliste}</button><a class="knopf knopf-hell" href="${pfad(lang, '/anfrage/')}" data-zur-merkliste hidden>${t.zurMerkliste}</a></p>
    <p class="status" role="status" aria-live="polite" data-merk-status data-ok="${esc(t.hinzugefuegt)}"></p>
    <noscript><p class="hinweis">${t.merklisteHinweisKein}</p></noscript>
  </div>
</section>`;
}

function jsonLd(p, lang, beschr, IMG) {
  const url = absUrl(lang, `/brand/${p.id}/`);
  const eintraege = p.varianten.flatMap((v) => v.preise.map((x) => ({ name: `${v.name}, ${x.menge}`, preis: x.preis })));
  const produkt = {
    '@context': 'https://schema.org', '@type': 'Product', name: p.name, description: beschr, url,
    brand: { '@type': 'Brand', name: 'Hierber Brennerei' }, category: 'Spirituosen',
  };
  if (IMG[`label-${p.id}`]) produkt.image = [`${BASE}/img/label-${p.id}-960.jpg`];
  const offer = (e) => ({ '@type': 'Offer', name: e.name, price: e.preis.toFixed(2), priceCurrency: 'EUR', url });
  if (eintraege.length === 1) produkt.offers = offer(eintraege[0]);
  else if (eintraege.length > 1) {
    const preise = eintraege.map((e) => e.preis);
    produkt.offers = { '@type': 'AggregateOffer', lowPrice: Math.min(...preise).toFixed(2), highPrice: Math.max(...preise).toFixed(2), priceCurrency: 'EUR', offerCount: eintraege.length, offers: eintraege.map(offer) };
  }
  const t = STR[lang];
  const krumen = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.startseite, item: absUrl(lang, '/') },
      { '@type': 'ListItem', position: 2, name: t.gruppe[gruppeVon(p.id)], item: `${absUrl(lang, '/')}#theke` },
      { '@type': 'ListItem', position: 3, name: p.name, item: url },
    ],
  };
  return [produkt, krumen];
}

export function sortenseite(IMG, p, lang) {
  const t = STR[lang];
  const tx = TEXTE[p.id];
  const fam = FAM[FAMILIE[p.id]];
  const erk = erklaerung(p);
  const gruppe = gruppeVon(p.id);
  const hatEtikett = !!ETIKETTEN[p.id];
  const etikett = hatEtikett
    ? bild(IMG, `label-${p.id}`, { alt: t.etikettAlt(p.name), sizes: '(min-width: 900px) 360px, 80vw', eager: true, cls: 'etikett-bild' })
    : `<div class="etikett-platzhalter platz" data-todo="foto"><span class="platz-marke">Hierber Brennerei</span><span class="platz-name">${esc(p.name)}</span><span>${t.etikettFolgt}</span></div>`;
  const tastDe = `<dl class="verkostung">
      <div><dt>${t.nase}</dt><dd data-todo="bestaetigen">${esc(tx.nase)}</dd></div>
      <div><dt>${t.gaumen}</dt><dd data-todo="bestaetigen">${esc(tx.gaumen)}</dd></div>
      <div><dt>${t.abgang}</dt><dd data-todo="bestaetigen">${esc(fam.abgang)}</dd></div>
      <div><dt>${t.trinktemp}</dt><dd data-todo="bestaetigen">${esc(fam.temp)}</dd></div>
      <div><dt>${t.glas}</dt><dd data-todo="bestaetigen">${esc(fam.glas)}</dd></div>
    </dl>`;
  const erkHtml = erk && lang === 'de' ? `<p class="lux">${esc(t.luxErkl(erk.lux, erk.de))}</p>` : '';
  const intro = lang === 'de' ? `<p class="intro" data-todo="bestaetigen">${esc(tx.intro)}</p>` : folgt(t, 'intro');
  const kurz = lang === 'de' ? `<p class="kurz">${esc(ohneAbv(p.kurz))}</p>` : '';
  const verw = verwandtFuer(p.id).map((id) => karte(IMG, produktById(id), lang, { anlass: false })).join('\n');
  const krumen = `<nav class="brotkrumen" aria-label="${t.brotkrumen}"><ol><li><a href="${pfad(lang, '/')}">${t.startseite}</a></li><li><a href="${pfad(lang, '/')}#theke">${t.gruppe[gruppe]}</a></li><li aria-current="page">${esc(p.name)}</li></ol></nav>`;
  const inhalt = `<section class="sektion dunkel produkt-kopf" aria-labelledby="h1">
  <div class="wrap">
    ${krumen}
    <div class="produkt-raster">
      <figure class="etikett-rahmen ${hatEtikett && IMG[`label-${p.id}`].w > IMG[`label-${p.id}`].h ? 'quer' : 'hoch'}">${etikett}</figure>
      <div class="produkt-text">
        <p class="eyebrow">${t.gruppe[gruppe]}</p>
        <h1 id="h1" data-sortenname="${esc(p.name)}">${esc(p.name)}</h1>
        ${erkHtml}
        ${kurz}
        <p class="abv"><span class="abv-label">${t.alkoholgehalt}</span> <span class="abv-wert" data-abv="${p.abv}">${fmtAbv(p.abv)}</span></p>
        ${intro}
      </div>
    </div>
  </div>
</section>
<section class="sektion papier" id="verkostung" aria-labelledby="verk-h">
  <div class="wrap">
    <h2 id="verk-h">${t.verkostung}</h2>
    ${lang === 'de' ? tastDe : folgt(t)}
  </div>
</section>
${servieren(p, lang)}
${kaufen(p, lang)}
<section class="sektion papier" id="passt" aria-labelledby="passt-h">
  <div class="wrap">
    <h2 id="passt-h">${t.passtAuch}</h2>
    <ul class="karten karten-3" role="list">
${verw}
    </ul>
  </div>
</section>`;
  const abvT = fmtAbv(p.abv);
  const titel = lang === 'de' ? `${p.name} aus Herborn (Luxemburg) | Hierber Brennerei` : `${p.name} de Herborn (Luxembourg) | Hierber Brennerei`;
  const beschr = lang === 'de'
    ? `${p.name}: ${ohneAbv(p.kurz)}, ${abvT}. Verkostung, Serviervorschläge und Preise von der Hierber Brennerei in Herborn, Luxemburg.`
    : `${p.name} de la Hierber Brennerei à Herborn, Luxembourg : ${abvT}, variantes, contenances et prix.`;
  return seite({
    lang, p: `/brand/${p.id}/`, titel, beschreibung: beschr, inhalt, og: hatEtikett ? `/og/${p.id}.jpg` : '/og/standard.jpg',
    jsonld: jsonLd(p, lang, beschr, IMG), skripte: ['/assets/js/site.js'], typ: 'product',
  });
}
