// Oberfläche: Fallback ohne WebGL, Fußzeile, Dock, Schilder, Detailpanel mit Kaufauswahl (Version, Größe, Live-Preis, Anfrage per E-Mail).
import { KONTAKT, fmtPreis } from '../data/produkte.js';

export const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const preisText = (v) => (v.preise.length ? v.preise.map((x) => `${x.menge} ${fmtPreis(x.preis)}`).join(' · ') : 'Preis auf Anfrage');

/** Produktliste in reinem HTML (ohne WebGL / ohne Modulstart). */
export function renderFallback(products, reason) {
  const gruppen = [['fass', 'Aus den Fässern'], ['regal', 'Von der Regalwand']];
  $('#fallback-list').innerHTML = gruppen.map(([ort, titel]) => `
    <li class="fb-group"><h2>${titel}</h2></li>${products.filter((p) => p.ort === ort).map((p) => `
    <li><h3>${esc(p.name)} <span>${p.abv} % vol.</span></h3><p>${esc(p.beschreibung)}</p>
    ${p.varianten.map((v) => `${p.varianten.length > 1 ? `<p class="fb-var"><b>${esc(v.name)} (${v.abv} % vol.)</b></p>` : ''}
    ${v.preise.length ? `<ul class="fb-prices">${v.preise.map((x) => `<li><span>${x.menge}</span><b>${fmtPreis(x.preis)}</b></li>`).join('')}</ul>` : '<p class="fb-ask">Preis auf Anfrage</p>'}`).join('')}</li>`).join('')}`).join('');
  $('#fallback-reason').textContent = reason;
  document.documentElement.classList.add('gl-fail');
}

export function fillFooter() {
  const k = KONTAKT;
  $('#foot-text').innerHTML = `${k.firma} · ${k.adresse} · <a href="mailto:${k.mail}">${k.mail}</a> · <a href="https://${k.web}">${k.web}</a>`;
  $('#foot-note').textContent = k.hinweis;
  $('#fallback-contact').innerHTML = `${k.firma}, ${k.adresse}<br><a href="mailto:${k.mail}">${k.mail}</a> · <a href="https://${k.web}">${k.web}</a><br><small>${k.hinweis}</small>`;
}

/** Dock (Auswahlleiste mit Gruppen) und Schilder über den Objekten. */
export function createNav(products, { onDock }) {
  const dockList = $('#dock-list'), tagsEl = $('#tags');
  const btns = [], tags = [];
  const gruppen = {};
  products.forEach((p, i) => {
    const g = p.ort === 'fass' ? p.gruppe : 'Regalwand';
    if (!gruppen[g]) { const li = document.createElement('li'); li.className = 'dock-group'; li.setAttribute('role', 'presentation'); li.textContent = g; dockList.appendChild(li); gruppen[g] = 1; }
    const li = document.createElement('li'), b = document.createElement('button');
    b.type = 'button'; b.textContent = p.kurzname; b.dataset.i = i;
    b.setAttribute('aria-label', `${p.name} – ${p.ort === 'fass' ? 'Fass' : 'Regalwand'}, ${i + 1} von ${products.length}`);
    b.addEventListener('click', () => onDock(i));
    li.appendChild(b); dockList.appendChild(li); btns.push(b);

    const t = document.createElement('button');
    t.className = 'tag'; t.type = 'button'; t.dataset.i = i;
    const std = p.varianten[0];
    t.setAttribute('aria-label', `${p.name}, ${p.abv} Prozent. ${p.ort === 'fass' ? 'Fass' : 'Flasche'} auswählen und einschenken.`);
    t.innerHTML = `<span class="tag-head"><span class="tag-name">${esc(p.name)}</span><span class="tag-abv">${p.abv} %</span></span>
      <span class="tag-more"><span class="tag-desc">${esc(p.kurz)}</span>
      <span class="tag-prices">${std.preise.length ? std.preise.map((x) => `<span><i>${x.menge}</i><b>${fmtPreis(x.preis)}</b></span>`).join('') : '<span><i>Preis</i><b>auf Anfrage</b></span>'}</span>
      <span class="tag-cta">Einschenken</span></span>`;
    t.addEventListener('click', () => onDock(i, true));
    tagsEl.appendChild(t); tags.push(t);
  });
  return { btns, tags, dockList };
}

/** Detailpanel mit Kaufauswahl. cb: { onVariant(p, v), onBack, onReplay, onPrev, onNext } */
export function createPanel(products, cb) {
  const panel = $('#panel');
  let cur = null, vi = 0, si = 0;
  const vWrap = $('#p-variants'), vChips = $('#p-variant-chips'), sWrap = $('#p-sizes'), sChips = $('#p-size-chips');
  const priceEl = $('#p-price'), labelEl = $('#p-price-label'), req = $('#p-request');

  const chip = (label, checked, onClick) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'chip'; b.setAttribute('role', 'radio'); b.setAttribute('aria-checked', String(checked)); b.tabIndex = checked ? 0 : -1;
    b.textContent = label; b.addEventListener('click', onClick);
    return b;
  };
  // Pfeiltasten innerhalb einer Auswahlgruppe (Radiogroup)
  const arrows = (wrap) => wrap.addEventListener('keydown', (e) => {
    const list = [...wrap.querySelectorAll('.chip')]; const i = list.indexOf(document.activeElement); if (i < 0) return;
    let n = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % list.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i - 1 + list.length) % list.length;
    if (n >= 0) { e.preventDefault(); e.stopPropagation(); list[n].click(); wrap.querySelectorAll('.chip')[n].focus(); }
  });
  arrows(vChips); arrows(sChips);

  function mailto() {
    const p = cur, v = p.varianten[vi], s = v.preise[si];
    const sub = `Anfrage: ${p.name}${s ? `, ${s.menge}` : ''}`;
    const lines = ['Guten Tag,', '', 'ich interessiere mich für folgendes Produkt:', '', `Sorte: ${p.name}`];
    if (p.varianten.length > 1) lines.push(`Version: ${v.name} (${v.abv} % vol.)`); else lines.push(`Alkoholgehalt: ${v.abv} % vol.`);
    if (s) lines.push(`Größe: ${s.menge}`, `Preis laut Preisliste 2025: ${fmtPreis(s.preis)} (inkl. 17 % MwSt.)`); else lines.push('Größe / Preis: bitte um Angebot');
    lines.push('Menge: ', '', 'Mit freundlichen Grüßen');
    req.href = `mailto:${KONTAKT.mail}?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(lines.join('\r\n'))}`;
  }
  function renderPrice() {
    const p = cur, v = p.varianten[vi], s = v.preise[si];
    if (s) { labelEl.textContent = s.menge; priceEl.textContent = fmtPreis(s.preis); priceEl.classList.remove('ask'); }
    else { labelEl.textContent = 'Preis'; priceEl.textContent = 'auf Anfrage'; priceEl.classList.add('ask'); }
    $('#p-abv').textContent = `${v.abv} % vol.`;
    mailto();
  }
  function renderSizes() {
    const v = cur.varianten[vi];
    sChips.innerHTML = '';
    sWrap.hidden = v.preise.length === 0;
    v.preise.forEach((x, i) => sChips.appendChild(chip(x.menge, i === si, () => { si = i; [...sChips.children].forEach((c, k) => { c.setAttribute('aria-checked', String(k === i)); c.tabIndex = k === i ? 0 : -1; }); renderPrice(); })));
  }
  function renderVariants() {
    vChips.innerHTML = '';
    vWrap.hidden = cur.varianten.length < 2;
    cur.varianten.forEach((v, i) => vChips.appendChild(chip(`${v.name} · ${v.abv} %`, i === vi, () => {
      const alt = cur.varianten[vi].preise[si]?.menge; vi = i;
      const gleich = cur.varianten[vi].preise.findIndex((x) => x.menge === alt); si = gleich >= 0 ? gleich : 0;
      [...vChips.children].forEach((c, k) => { c.setAttribute('aria-checked', String(k === i)); c.tabIndex = k === i ? 0 : -1; });
      renderSizes(); renderPrice(); cb.onVariant?.(cur, cur.varianten[vi]);
    })));
  }
  const api = {
    panel,
    render(i) {
      cur = products[i]; vi = 0; si = 0;
      const p = cur;
      $('#p-eyebrow').textContent = p.ort === 'fass' ? `Fass · ${p.gruppe}` : 'Regalwand';
      $('#p-name').textContent = p.name;
      $('#p-desc').textContent = p.beschreibung;
      // Größe: die zweitkleinste sinnvolle Standardgröße – 0,5 L, wenn vorhanden
      const std = p.varianten[0].preise.findIndex((x) => x.menge === '0,5 L'); si = std >= 0 ? std : 0;
      renderVariants(); renderSizes(); renderPrice();
      panel.setAttribute('aria-label', `${p.name} – Details, Version, Größe und Preis`);
    },
    current() { return { p: cur, v: cur?.varianten[vi], s: cur?.varianten[vi].preise[si], vi, si }; },
    setOpen(open) { panel.classList.toggle('open', open); panel.inert = !open; },
  };
  $('#p-back').addEventListener('click', () => cb.onBack());
  $('#p-replay').addEventListener('click', () => cb.onReplay());
  $('#p-prev').addEventListener('click', () => cb.onPrev());
  $('#p-next').addEventListener('click', () => cb.onNext());
  return api;
}
