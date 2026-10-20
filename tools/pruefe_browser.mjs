// Browsertests (Playwright): Konsolenfehler auf allen Seiten, Tabs per Tastatur, Merkliste + Anfrage-Text, Filter, Seite ohne JS, Altershinweis, Größenbilder im Kopf der Sortenseite.
// Aufruf: node tools/pruefe_browser.mjs  (dist/ muss auf Port 8770 laufen)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, BASIS } from './playwright.mjs';
import { PRODUKTE } from '../site/data/produkte.js';

const fehler = []; let ok = 0;
const check = (bed, msg) => { if (bed) { ok++; } else fehler.push(msg); };
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
await ctx.addInitScript(() => { try { if (!sessionStorage.getItem('kein-alter')) localStorage.setItem('hb-alter', '1'); } catch (e) {} });
const page = await ctx.newPage();
let konsole = [];
page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) konsole.push(`${m.type()}: ${m.text()}`); });
page.on('pageerror', (e) => konsole.push('pageerror: ' + e.message));
page.on('requestfailed', (r) => konsole.push('requestfailed: ' + r.url()));
page.on('response', (r) => { if (r.status() >= 400) konsole.push(`HTTP ${r.status()}: ${r.url()}`); });
// Direktversand über den Formulardienst: Anfrage an das Formular-Ziel abfangen, mit 200 beantworten (kein echter Versand) und den JSON-Body zurückgeben
const direktSenden = async (pg) => {
  const ziel = await pg.locator('[data-form]').getAttribute('action');
  let anfrage = null;
  await pg.route(ziel, async (r) => {
    anfrage = { methode: r.request().method(), typ: r.request().headers()['content-type'] || '', body: r.request().postData() || '' };
    await r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
  });
  // auf das Ende der Anfrage warten, sonst bricht die nächste Navigation sie ab (requestfailed in der folgenden Konsolenprüfung)
  const fertig = pg.waitForEvent('requestfinished', { predicate: (r) => r.url() === ziel, timeout: 5000 }).catch(() => null);
  await pg.locator('[data-form] button[type=submit]').click();
  await fertig;
  await pg.locator('[data-erfolg]').waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
  await pg.unroute(ziel);
  check(anfrage && anfrage.methode === 'POST' && /application\/json/.test(anfrage.typ), `Direktversand: POST mit JSON an ${ziel}`);
  try { return anfrage ? JSON.parse(anfrage.body) : {}; } catch (e) { return {}; }
};

// 1. Konsole auf allen Seiten
const pfade = ['/', '/anfrage/', '/impressum/', '/datenschutz/', ...PRODUKTE.map((p) => `/brand/${p.id}/`), '/brand/holzkiste-4x0-2l/'];
for (const lang of ['', '/fr']) for (const p of pfade) {
  konsole = [];
  await page.goto(BASIS + lang + (p === '/' && lang ? '/' : p), { waitUntil: 'networkidle' });
  check(konsole.length === 0, `Konsole ${lang}${p}: ${konsole.join(' | ')}`);
}
console.log(`Konsole: ${pfade.length * 2} Seiten geprüft.`);

// 2. Tabs per Tastatur (Sortenseite Mirabelle)
await page.goto(BASIS + '/brand/mirabelle/');
const tabs = page.locator('[role="tab"]');
const n = await tabs.count();
check(n >= 3, `Tabs: nur ${n}`);
await tabs.first().focus();
const sel = async () => page.evaluate(() => [...document.querySelectorAll('[role=tab]')].findIndex((t) => t.getAttribute('aria-selected') === 'true'));
await page.keyboard.press('ArrowRight'); check((await sel()) === 1, 'Pfeil rechts wählt Tab 2');
await page.keyboard.press('End'); check((await sel()) === n - 1, 'End wählt letzten Tab');
await page.keyboard.press('ArrowRight'); check((await sel()) === 0, 'Pfeil rechts am Ende springt an den Anfang');
await page.keyboard.press('ArrowLeft'); check((await sel()) === n - 1, 'Pfeil links am Anfang springt ans Ende');
await page.keyboard.press('Home'); check((await sel()) === 0, 'Home wählt ersten Tab');
await page.keyboard.press('ArrowRight');
const panelSichtbar = await page.evaluate(() => [...document.querySelectorAll('[role=tabpanel]')].filter((p) => getComputedStyle(p).display !== 'none').map((p) => p.id));
check(panelSichtbar.length === 1 && panelSichtbar[0] === 'panel-1', `genau ein Panel sichtbar: ${panelSichtbar}`);
const ctl = await page.evaluate(() => { const t = document.querySelector('[role=tab][aria-selected=true]'); const p = document.getElementById(t.getAttribute('aria-controls')); return p && p.getAttribute('aria-labelledby') === t.id; });
check(ctl, 'aria-controls/aria-labelledby passen');
console.log('Tabs getestet.');

// 3. Merkliste: Variante wählen, hinzufügen, Zähler, Anfrage, Menge, Entfernen, mailto
await page.goto(BASIS + '/brand/quetsch/');
await page.evaluate(() => localStorage.removeItem('hb-merkliste'));
await page.reload();
await page.locator('input[name=variante][value=geraeift]').click();
check((await page.locator('[data-auswahl-preis]').textContent()).trim() === '6 €', 'Live-Preis Variante 1 (0,1 L = 6 €)');
await page.locator('input[name=groesse][data-variante=geraeift][data-menge="0,5 L"]').check({ force: true });
check((await page.locator('[data-auswahl-preis]').textContent()).trim() === '16 €', 'Live-Preis nach Größenwahl (16 €)');
await page.locator('[data-merk-add]').click(); await page.locator('[data-merk-add]').click();
check((await page.locator('[data-zaehler]').first().textContent()) === '2', 'Zähler nach zweimal Hinzufügen = 2');
await page.goto(BASIS + '/brand/hondsaarsch/');
await page.locator('[data-merk-add]').click();
check((await page.locator('[data-zaehler]').first().textContent()) === '3', 'Zähler = 3 nach Sorte ohne Preis');
await page.goto(BASIS + '/anfrage/');
check((await page.locator('[data-liste] li').count()) === 2, 'Anfrage zeigt 2 Zeilen');
check((await page.locator('[data-summe-wert]').textContent()).trim() === '32 €', 'Summe 32 € (2 x 16 €)');
await page.fill('#f-name', 'Max Muster'); await page.fill('#f-mail', 'max@example.org'); await page.fill('#f-tel', '123456');
// Zwei Wege: ohne Formulardienst Text-Vorschau + mailto; mit Formulardienst (FORMULAR_DIENST.aktion in site/lib/rest.mjs) Direktversand,
// dessen Anfrage hier abgefangen und beantwortet wird (kein echter Versand)
const direktModus = (await page.locator('[data-vorschau]').count()) === 0;
if (!direktModus) {
  const vorschau = await page.locator('[data-vorschau]').textContent();
  console.log('--- Vorschau Anfrage-Text ---\n' + vorschau + '\n-----------------------------');
  check(vorschau.includes('2 x Quetsch (op Quetschen nogeräift), 0,5 L: 16 € je Stück = 32 €') && vorschau.includes('1 x Hondsaarsch: Preis auf Anfrage'), 'Text enthält Zeilen mit/ohne Preis');
}
await page.locator('[data-liste] input').first().fill('3');
check((await page.locator('[data-summe-wert]').textContent()).trim() === '48 €', 'Menge 3 ergibt 48 €');
if (!direktModus) {
  await page.evaluate(() => { document.querySelector('[data-form]').addEventListener('submit', (e) => { e.stopImmediatePropagation; }, true); });
  await page.evaluate(() => { window.__href = null; });
  // mailto-Navigation abfangen: Attribut data-mailto wird vor der Navigation gesetzt
  await page.route('mailto:*', (r) => r.abort()).catch(() => {});
  await page.locator('[data-form] button[type=submit]').click().catch(() => {});
  await page.waitForTimeout(300);
  const href = await page.locator('[data-form]').getAttribute('data-mailto');
  check(href && href.startsWith('mailto:info@hierber-brennerei.lu?subject=') && href.includes('%0D%0A') && !/[\r\n ]/.test(href), 'mailto-Link kodiert, mit %0D%0A');
  console.log('mailto:', decodeURIComponent((href || '').split('body=')[1] || '').split('\r\n').join(' / '));
} else {
  const d = await direktSenden(page);
  console.log('--- Direktversand (abgefangen) ---\n' + JSON.stringify(d, null, 2));
  check(d.name === 'Max Muster' && d.email === 'max@example.org' && typeof d.wunsch === 'string' && d.wunsch !== '', 'Direktversand: Name, E-Mail, Wunsch');
  check(String(d.produkte).includes('3 x Quetsch (op Quetschen nogeräift), 0,5 L: 16 € je Stück = 48 €') && String(d.produkte).includes('1 x Hondsaarsch: Preis auf Anfrage'), 'Direktversand: Zeilen mit/ohne Preis');
  check(d.summe === '48 €', `Direktversand: Summe 48 € (${d.summe})`);
  check(!('website' in d), 'Direktversand: Honigtopf nicht gesendet');
  check(await page.locator('[data-erfolg]').isVisible(), 'Direktversand: Bestätigung sichtbar');
}
await page.getByRole('button', { name: /Entfernen: Hondsaarsch/ }).click();
check((await page.locator('[data-liste] li').count()) === 1 && (await page.locator('[data-zaehler]').first().textContent()) === '3', 'Entfernen: 1 Zeile, Zähler 3 (3 x Quetsch)');
await page.getByRole('button', { name: /Entfernen/ }).click();
check(await page.locator('[data-leer]').isVisible(), 'leere Merkliste zeigt Hinweis');
// fehlerhafter Speicher: Seite muss trotzdem funktionieren
const ctx2 = await browser.newContext(); await ctx2.addInitScript(() => { Object.defineProperty(window, 'localStorage', { get() { throw new Error('gesperrt'); } }); });
const p2 = await ctx2.newPage(); const f2 = []; p2.on('pageerror', (e) => f2.push(e.message));
await p2.goto(BASIS + '/brand/quetsch/'); await p2.locator('[data-merk-add]').click(); await p2.goto(BASIS + '/anfrage/');
check(f2.length === 0, `ohne localStorage keine Skriptfehler: ${f2}`);
await ctx2.close();
console.log('Merkliste getestet.');

// 4. Anlass-Filter
await page.goto(BASIS + '/');
const alle = await page.locator('.theke .karte-li').count();
await page.getByRole('button', { name: 'Digestif' }).click();
const sichtbar = await page.locator('.theke .karte-li:visible').count();
check(sichtbar > 0 && sichtbar < alle, `Filter reduziert ${alle} -> ${sichtbar}`);
check((await page.getByRole('button', { name: 'Digestif' }).getAttribute('aria-pressed')) === 'true', 'aria-pressed true');
await page.getByRole('button', { name: 'Digestif' }).click();
check((await page.locator('.theke .karte-li:visible').count()) === alle, 'Filter aufheben zeigt alle');

// 5. Altershinweis (Neue Sitzung ohne Bestätigung)
const ctx3 = await browser.newContext({ viewport: { width: 390, height: 844 } });
const p3 = await ctx3.newPage(); await p3.goto(BASIS + '/');
check(await p3.locator('[data-alter]').isVisible(), 'Altershinweis sichtbar');
await p3.keyboard.press('Tab'); await p3.keyboard.press('Tab');
await p3.locator('[data-alter-ok]').focus(); await p3.keyboard.press('Enter');
check(!(await p3.locator('[data-alter]').isVisible()), 'Altershinweis nach Enter weg');
await p3.reload(); check(!(await p3.locator('[data-alter]').isVisible()), 'bleibt nach Reload bestätigt');
await ctx3.close();

// 6. Ohne JavaScript
const ctx4 = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
const p4 = await ctx4.newPage(); await p4.goto(BASIS + '/brand/quetsch/');
const panels = await p4.evaluate(() => [...document.querySelectorAll('[role=tabpanel]')].filter((p) => getComputedStyle(p).display !== 'none').length);
check(panels >= 3, `ohne JS alle Panels sichtbar (${panels})`);
check(!(await p4.locator('[role=tablist]').isVisible()), 'ohne JS Tab-Leiste ausgeblendet');
check((await p4.locator('.variante:visible').count()) === 2, 'ohne JS beide Varianten mit Preisen sichtbar');
await p4.goto(BASIS + '/');
check((await p4.locator('.theke .karte-li:visible').count()) === PRODUKTE.length, 'ohne JS alle Karten sichtbar');
check(!(await p4.locator('[data-anlass-box]').isVisible()), 'ohne JS keine toten Filter-Chips');
check((await p4.locator('.reveal').evaluateAll((e) => e.every((x) => getComputedStyle(x).opacity === '1'))), 'ohne JS alles sichtbar (kein Reveal-Versteck)');
await ctx4.close();

// 7. reduced motion
const ctx5 = await browser.newContext({ reducedMotion: 'reduce' });
const p5 = await ctx5.newPage(); await p5.goto(BASIS + '/');
check(await p5.locator('.reveal').evaluateAll((e) => e.every((x) => getComputedStyle(x).opacity === '1' && getComputedStyle(x).transitionDuration === '0s')), 'prefers-reduced-motion: keine Reveal-Animation');
await ctx5.close();

// 8. Horizontales Überlaufen (390 px)
for (const p of ['/', '/brand/gin/', '/brand/vieille-prune/', '/anfrage/']) {
  await page.goto(BASIS + p);
  const w = await page.evaluate(() => document.documentElement.scrollWidth);
  check(w <= 390, `kein horizontaler Überlauf ${p}: scrollWidth ${w}`);
}


// 9. Fassreihe: 14 Kreidetafeln, Links zu Sortenseiten, Desktop volle Reihe ohne Textüberlauf, mobil Scroll-Leiste mit scroll-snap; Geschenk-Foto beim Anlass-Filter
await page.goto(BASIS + '/');
check((await page.locator('.schilder a.schild').count()) === 14, '14 Kreidetafeln');
check((await page.locator('.schilder a.schild').evaluateAll((a) => a.every((x) => /^\/brand\/[a-z-]+\/#produkt$/.test(x.getAttribute('href'))))), 'Tafeln verlinken Sortenseiten');
check((await page.locator('.schilder').evaluate((e) => getComputedStyle(e).scrollSnapType)).startsWith('x'), 'mobil scroll-snap x');
check((await page.locator('.schilder').evaluate((e) => e.scrollWidth > e.clientWidth)), 'mobil horizontal scrollbar');
for (const w of [1280, 1440]) {
  await page.setViewportSize({ width: w, height: 900 }); await page.goto(BASIS + '/');
  const r = await page.evaluate(() => { const u = document.querySelector('.schilder'); const tops = new Set([...u.querySelectorAll('.schild')].map((s) => Math.round(s.getBoundingClientRect().top))); const ueber = [...u.querySelectorAll('.schild-name')].filter((n) => n.scrollWidth > n.clientWidth + 1 || n.getBoundingClientRect().right > n.closest('.schild').getBoundingClientRect().right + 1).length; return { reihen: tops.size, ueber, breit: document.documentElement.scrollWidth }; });
  check(r.reihen === 1 && r.ueber === 0 && r.breit <= w, `Desktop ${w}: eine Reihe (${r.reihen}), Überlauf ${r.ueber}, Breite ${r.breit}`);
}
await page.setViewportSize({ width: 390, height: 844 }); await page.goto(BASIS + '/');
check(!(await page.locator('[data-anlass-foto]').isVisible()), 'Geschenkregal-Foto zunächst verborgen');
await page.getByRole('button', { name: 'Als Geschenk' }).click();
check(await page.locator('[data-anlass-foto]').isVisible(), 'Geschenkregal-Foto bei "Als Geschenk" sichtbar');
await page.getByRole('button', { name: 'Digestif' }).click();
check(!(await page.locator('[data-anlass-foto]').isVisible()), 'Geschenkregal-Foto bei Digestif verborgen');

// 10. Sortenseite: Kauf-Box im Kopf, Verkostung im Kopf, Reihenfolge, keine doppelten ids
await page.setViewportSize({ width: 1280, height: 800 });
await page.goto(BASIS + '/brand/kirsch/');
const kb = await page.locator('[data-kauf]').boundingBox();
check(kb && kb.y >= 0 && kb.y + kb.height <= 800, `Desktop 1280x800: Kauf-Box vollständig sichtbar (y ${kb && Math.round(kb.y)}, Höhe ${kb && Math.round(kb.height)})`);
const kbtn = await page.locator('[data-merk-add]').boundingBox();
check(kbtn && kbtn.y + kbtn.height <= 800, 'Desktop: Knopf im Viewport');
await page.evaluate(() => localStorage.removeItem('hb-merkliste'));
await page.locator('[data-merk-add]').click({ timeout: 3000 });
check(await page.locator('[data-zur-merkliste]').isVisible(), 'Desktop: Knopf klickbar, "Zur Merkliste" erscheint');
await page.setViewportSize({ width: 375, height: 812 });
await page.goto(BASIS + '/brand/kirsch/');
const mb = await page.evaluate(() => { const r = document.querySelector('[data-merk-add]').getBoundingClientRect(); return { top: r.top + window.scrollY, bottom: r.bottom + window.scrollY }; });

check(mb.top < 1.3 * 812, `Mobil: Knopf-Oberkante ${Math.round(mb.top)} < ${Math.round(1.3 * 812)}`);
for (const lang of ['', '/fr']) for (const id of ['kirsch', 'gin', 'quetsch', 'hondsaarsch', 'rum', 'vieux-marc']) {
  await page.goto(BASIS + lang + `/brand/${id}/`);
  const r = await page.evaluate(() => {
    const ids = [...document.querySelectorAll('[id]')].map((e) => e.id); const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
    const pos = (sel) => { const e = document.querySelector(sel); return e; };
    const intro = document.querySelector('.produkt-text .intro, .produkt-text .platzhalter.intro'), v = document.getElementById('verkostung'), sv = document.getElementById('servieren'), k = document.getElementById('kaufen');
    const nach = (a, b) => !!(a && b && (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING));
    const h = [...document.querySelectorAll('h1,h2,h3')].map((e) => e.tagName);
    return { dup, kaufImKopf: !!document.querySelector('.produkt-kopf #kaufen'), nIntro: nach(intro, v), vServ: nach(v, sv), kV: nach(k, intro), nKauf: document.querySelectorAll('[id=kaufen],[id=verkostung]').length, h1: h.filter((x) => x === 'H1').length, ersteH: h[0] };
  });
  check(r.dup.length === 0, `${lang}/${id}: doppelte ids ${r.dup}`);
  check(r.kaufImKopf && r.kV && r.nIntro && r.vServ && r.nKauf === 2, `${lang}/${id}: Reihenfolge Kauf-Box, Intro, Verkostung, Servieren (${JSON.stringify(r)})`);
  check(r.h1 === 1 && r.ersteH === 'H1', `${lang}/${id}: Überschriften beginnen mit einer h1`);
  check((await page.locator('a[href="#servieren"]').count()) === 1, `${lang}/${id}: Link zu #servieren`);
}
await page.goto(BASIS + '/brand/hondsaarsch/');
check((await page.locator('[data-kauf] [data-preis-anfrage]').count()) === 1 && (await page.locator('[data-kauf]').getByText('Preis auf Anfrage').count()) === 1, 'hondsaarsch: Preis auf Anfrage in der Kauf-Box');
console.log('Sortenseiten-Aufbau getestet.');

// 11. Größenbilder im Kopf der Sortenseite: Wählen einer Größe tauscht das Bild (data-bild-menge), sonst Hauptbild (data-bild-haupt, 0,5 L) bzw. Vektor-Flasche
const nb = (t) => (t || '').replace(/ /g, ' ');
// Zustand der Bühne: sichtbares Element (Größe/Haupt), ob Foto oder Vektor-Flasche, Bildquelle, geladen?, Alt-Text
const buehne = (pg) => pg.evaluate(() => {
  const b = document.querySelector('[data-buehne]'); if (!b) return null;
  const sicht = [...b.children].filter((e) => getComputedStyle(e).display !== 'none');
  const e = sicht[0], img = e && e.querySelector('picture img');
  return { n: sicht.length, menge: e && e.getAttribute('data-bild-menge'), haupt: !!(e && e.hasAttribute('data-bild-haupt')), vektor: !!(e && e.classList.contains('flasche')), foto: !!(e && e.classList.contains('flasche-foto')), src: img ? img.currentSrc : '', geladen: img ? img.complete && img.naturalWidth > 0 : false, alt: img ? img.alt : '' };
});
const waehleGroesse = async (pg, menge) => { await pg.locator('.variante.aktiv label.chip-radio', { has: pg.locator(`input[name=groesse][data-menge="${menge}"]`) }).first().click(); };
const warteBild = (pg) => pg.waitForFunction(() => { const b = document.querySelector('[data-buehne]'); const e = b && [...b.children].find((x) => getComputedStyle(x).display !== 'none'); const i = e && e.querySelector('picture img'); return !i || (i.complete && i.naturalWidth > 0); }, null, { timeout: 8000 }).catch(() => {});
const zeigtGroesse = async (pg, menge, key, altTeil, name) => {
  await waehleGroesse(pg, menge); await warteBild(pg);
  const z = await buehne(pg);
  check(z && z.n === 1 && z.menge === menge && z.foto && z.src.includes(`/${key}-`) && z.geladen, `${name}: ${menge} zeigt ${key} (${JSON.stringify(z)})`);
  check(z && nb(z.alt) === altTeil, `${name}: ${menge} Alt-Text "${altTeil}" (ist "${z && nb(z.alt)}")`);
};
await page.setViewportSize({ width: 1280, height: 800 });
// (a) Rum: vorgewählt ist 0,5 L (Standard) = Hauptbild, die übrigen Größen zeigen ihr Foto
await page.goto(BASIS + '/brand/rum/', { waitUntil: 'networkidle' });
let z = await buehne(page);
check(z && z.n === 1 && z.foto && z.haupt, `rum: beim Laden 0,5 L vorgewählt, Hauptbild (${JSON.stringify(z)})`);
const vorgewaehlt = await page.evaluate(() => document.querySelector('[data-kauf] input[name=groesse]:checked').getAttribute('data-menge'));
check(vorgewaehlt === '0,5 L', `rum: vorgewählte Größe 0,5 L (${vorgewaehlt})`);
await zeigtGroesse(page, '1,5 L', 'flasche-rum-1-5l', 'Flasche Hierber Rum, 1,5 L, mit Etikett', 'rum');
await zeigtGroesse(page, '0,2 L', 'flasche-rum-0-2l', 'Flasche Hierber Rum, 0,2 L, mit Etikett', 'rum');
await zeigtGroesse(page, '1 L', 'flasche-rum-1-0l', 'Flasche Hierber Rum, 1 L, mit Etikett', 'rum');
// (b) Gin: Hauptbild 0,5 L beim Laden; Größen tauschen; 0,5 L zurück zum Hauptbild
for (const [lang, l] of [['', 'de'], ['/fr', 'fr']]) {
  const name = `${lang}/gin`, alt = (m) => (l === 'fr' ? `Bouteille Hierber Gin, ${m}, avec étiquette` : `Flasche Hierber Gin, ${m}, mit Etikett`);
  await page.goto(BASIS + lang + '/brand/gin/', { waitUntil: 'networkidle' });
  z = await buehne(page);
  check(z && z.n === 1 && z.haupt && z.foto && /\/flasche-gin-\d+\./.test(z.src) && z.geladen, `${name}: beim Laden Hauptbild (${JSON.stringify(z)})`);
  check(z && nb(z.alt) === alt('0,5 L'), `${name}: Hauptbild Alt-Text mit 0,5 L (ist "${z && nb(z.alt)}")`);
  const lcp = await page.evaluate(() => [...document.querySelectorAll('[data-buehne] picture img')].map((i) => `${i.getAttribute('loading') || 'eager'}|${i.getAttribute('fetchpriority') || ''}`));
  check(lcp.filter((x) => x.startsWith('eager')).length === 1 && lcp[0] === 'eager|high', `${name}: nur das Hauptbild lädt sofort (${lcp})`);
  await zeigtGroesse(page, '1 L', 'flasche-gin-1-0l', alt('1 L'), name);
  await zeigtGroesse(page, '1,5 L', 'flasche-gin-1-5l', alt('1,5 L'), name);
  await zeigtGroesse(page, '0,2 L', 'flasche-gin-0-2l', alt('0,2 L'), name); // 0,2 L ist die vorgewählte Größe: Klick zeigt trotzdem deren Bild
  await waehleGroesse(page, '0,5 L'); await warteBild(page);
  z = await buehne(page); check(z && z.n === 1 && z.haupt && z.foto && /\/flasche-gin-\d+\./.test(z.src), `${name}: 0,5 L zurück zum Hauptbild (${JSON.stringify(z)})`);
}
// (c) Kirsch: 0,5 L vorgewählt (Hauptbild), 0,1 L zeigt das 0,1-L-Foto
await page.goto(BASIS + '/brand/kirsch/', { waitUntil: 'networkidle' });
z = await buehne(page);
check(z && z.n === 1 && z.foto && z.haupt, `kirsch: beim Laden 0,5 L vorgewählt, Hauptbild (${JSON.stringify(z)})`);
await zeigtGroesse(page, '0,1 L', 'flasche-kirsch-0-1l', 'Flasche Kirsch, 0,1 L, mit Etikett', 'kirsch');
// Variantenwechsel (Quetsch): Bild folgt der Größe, nichts bricht
await page.goto(BASIS + '/brand/quetsch/', { waitUntil: 'networkidle' });
await page.locator('label.chip-radio', { has: page.locator('input[name=variante][value=geraeift]') }).click(); await warteBild(page);
z = await buehne(page); check(z && z.n === 1 && z.menge === '0,1 L' && z.foto && z.src.includes('/flasche-quetsch-0-1l-'), `quetsch: Variante gewechselt, Größe 0,1 L zeigt Foto (${JSON.stringify(z)})`);
await waehleGroesse(page, '0,5 L'); z = await buehne(page); check(z && z.foto && z.haupt, 'quetsch: 0,5 L der anderen Variante zeigt das Hauptbild');
await page.locator('label.chip-radio', { has: page.locator('input[name=variante][value=standard]') }).click(); await warteBild(page);
z = await buehne(page); check(z && z.n === 1 && z.menge === '0,1 L' && z.foto, `quetsch: zurück zur ersten Variante, Foto 0,1 L (${JSON.stringify(z)})`);
// (e) ohne JavaScript bleibt das Hauptbild (bzw. bei Kirsch die Vektor-Flasche der vorgewählten Größe 0,5 L); verborgene Größenbilder bleiben verborgen
const ctx6 = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } });
const p6 = await ctx6.newPage();
await p6.goto(BASIS + '/brand/gin/'); z = await buehne(p6);
check(z && z.n === 1 && z.haupt && z.foto, `ohne JS gin: Hauptbild sichtbar (${JSON.stringify(z)})`);
await p6.goto(BASIS + '/brand/kirsch/'); z = await buehne(p6);
check(z && z.n === 1 && z.foto && z.haupt, `ohne JS kirsch: vorgewählte Größe 0,5 L, Hauptbild sichtbar (${JSON.stringify(z)})`);
await ctx6.close();
// (f) Mobil 375x812: Wechsel funktioniert, kein horizontaler Überlauf
await page.setViewportSize({ width: 375, height: 812 });
for (const id of ['gin', 'rum', 'kirsch']) {
  await page.goto(BASIS + `/brand/${id}/`, { waitUntil: 'networkidle' });
  const vorher = await page.evaluate(() => document.documentElement.scrollWidth);
  await waehleGroesse(page, id === 'kirsch' ? '0,1 L' : '1,5 L'); await warteBild(page);
  const nachher = await page.evaluate(() => document.documentElement.scrollWidth);
  z = await buehne(page);
  check(vorher <= 375 && nachher <= 375, `mobil /brand/${id}/: kein horizontaler Überlauf (${vorher}/${nachher})`);
  check(z && z.n === 1 && z.foto && z.geladen, `mobil /brand/${id}/: Größenbild sichtbar und geladen (${JSON.stringify(z)})`);
}
console.log('Größenbilder getestet.');

// 12. Sprung zum Hauptprodukt: Klick auf Karte/Fass-Schild öffnet /brand/<id>/#produkt, Kopfabschnitt liegt oben (Desktop und Mobil, DE und FR)
const kopfTop = (pg) => pg.evaluate(() => document.querySelector('.produkt-kopf').getBoundingClientRect().top);
for (const [vp, vname] of [[{ width: 1280, height: 800 }, 'Desktop'], [{ width: 375, height: 812 }, 'Mobil']]) {
  await page.setViewportSize(vp);
  for (const lang of ['', '/fr']) {
    for (const art of ['karte', 'schild']) {
      await page.goto(BASIS + lang + '/', { waitUntil: 'load' });
      const link = art === 'karte' ? page.locator('.theke .karte-li[data-id=kirsch] a.karte') : page.locator('.schilder a.schild').first();
      const erwartet = art === 'karte' ? 'kirsch' : (await link.getAttribute('href')).match(/\/brand\/([a-z-]+)\//)[1];
      await link.click();
      await page.waitForURL((u) => u.pathname.includes('/brand/'), { waitUntil: 'load' });
      const nameT = `${vname} ${lang || '/de'} ${art}`;
      check(page.url().endsWith(`${lang}/brand/${erwartet}/#produkt`), `${nameT}: URL endet auf /brand/${erwartet}/#produkt (${page.url()})`);
      const t0 = await kopfTop(page);
      check(t0 >= -2 && t0 <= 60, `${nameT}: Kopfabschnitt oben nach Laden (top ${Math.round(t0)})`);
      await page.waitForTimeout(2000);
      const t1 = await kopfTop(page);
      check(t1 >= -2 && t1 <= 60, `${nameT}: Kopfabschnitt oben nach 2 s (top ${Math.round(t1)})`);
    }
  }
}
// Canonical/hreflang ohne Anker; keine doppelten ids (auch beim Aufruf mit Anker)
for (const lang of ['', '/fr']) for (const id of ['gin', 'quetsch', 'hondsaarsch']) {
  await page.goto(BASIS + lang + `/brand/${id}/#produkt`, { waitUntil: 'load' });
  const r = await page.evaluate(() => {
    const ids = [...document.querySelectorAll('[id]')].map((e) => e.id);
    return { dup: ids.filter((x, i) => ids.indexOf(x) !== i), produkt: document.querySelectorAll('#produkt').length, links: [...document.querySelectorAll('link[rel=canonical],link[rel=alternate][hreflang]')].map((l) => l.href) };
  });
  check(r.dup.length === 0 && r.produkt === 1, `${lang}/${id}: keine doppelten ids, genau ein #produkt (${r.dup} / ${r.produkt})`);
  check(r.links.length === 4 && r.links.every((h) => !h.includes('#')), `${lang}/${id}: Canonical/hreflang ohne Anker (${r.links})`);
}
// Zurück: Browser stellt Scroll wieder her, Skript springt nicht erneut
await page.setViewportSize({ width: 375, height: 812 });
await page.goto(BASIS + '/brand/gin/#produkt', { waitUntil: 'load' }); await page.waitForTimeout(300);
await page.evaluate(() => window.scrollTo(0, 1500));
await page.goto(BASIS + '/anfrage/', { waitUntil: 'load' }); await page.goBack({ waitUntil: 'load' }); await page.waitForTimeout(1800);
const yz = await page.evaluate(() => window.scrollY);
check(Math.abs(yz - 1500) < 40, `Zurück: Scrollposition bleibt erhalten (${Math.round(yz)})`);
console.log('Sprung zum Hauptprodukt getestet.');

// 13. Hierberol: Sorte ohne flaches Etikett, nur Größenbild 0,7 L (fotos-flaschen/hierberol-0-7l.png); Foto im Kopf und auf der Karte, Preis 19 € (0,7 L), Merkliste
const bildGeladen = (pg, sel) => pg.waitForFunction((x) => { const i = document.querySelector(x); return i && i.complete && i.naturalWidth > 0; }, sel, { timeout: 8000 }).then(() => true, () => false);
for (const [vp, vname] of [[{ width: 1280, height: 800 }, 'Desktop'], [{ width: 375, height: 812 }, 'Mobil']]) {
  await page.setViewportSize(vp);
  await page.goto(BASIS + '/brand/hierberol/', { waitUntil: 'networkidle' });
  const kopfBild = '.produkt-kopf .haupt-bild picture img';
  check(await bildGeladen(page, kopfBild), `hierberol ${vname}: Foto im Kopf geladen (naturalWidth > 0)`);
  const hb = await page.evaluate((sel) => { const i = document.querySelector(sel); return i ? { alt: i.alt, src: i.currentSrc, w: i.naturalWidth, platzhalter: !!document.querySelector('.etikett-platzhalter'), vektor: !!document.querySelector('.produkt-kopf .flasche') } : null; }, kopfBild);
  check(hb && nb(hb.alt) === 'Flasche Hierberol, 0,7 L, mit Etikett', `hierberol ${vname}: Alt-Text mit 0,7 L (ist "${hb && nb(hb.alt)}")`);
  check(hb && hb.src.includes('/flasche-hierberol-0-7l-') && !hb.platzhalter && !hb.vektor, `hierberol ${vname}: Bild ist flasche-hierberol-0-7l, kein Platzhalter, keine Vektor-Flasche (${JSON.stringify(hb)})`);
  check((await page.locator('[data-kauf] [data-preis-anfrage]').count()) === 0 && (await page.locator('[data-kauf] input[name=groesse][data-menge="0,7 L"][data-preis="19"]').count()) === 1, `hierberol ${vname}: Kauf-Box mit genau einer Größe 0,7 L zu 19 €, kein „Preis auf Anfrage“`);
  check(nb(await page.locator('[data-kauf] [data-auswahl-preis]').textContent()).trim() === '19 €' && (await page.locator('[data-kauf] .abv-label, [data-kauf] .variante-abv').first().textContent()).includes('Alkoholgehalt'), `hierberol ${vname}: Auswahl-Preis 19 €, Alkoholgehalt angezeigt`);
  const abvText = nb(await page.locator('.produkt-text .abv-wert').textContent());
  check(abvText === '15 % vol.', `hierberol ${vname}: Alkoholgehalt 15 % vol. (${abvText})`);
  const ueberlauf = await page.evaluate(() => document.documentElement.scrollWidth);
  check(ueberlauf <= vp.width, `hierberol ${vname}: kein horizontaler Überlauf (${ueberlauf})`);
}
// Karte in der Theke zeigt das Foto statt Vektor-Flasche oder Platzhalter
await page.setViewportSize({ width: 1280, height: 800 });
await page.goto(BASIS + '/', { waitUntil: 'load' });
const karteBild = '.theke .karte-li[data-id=hierberol] .karte-bild-foto picture img';
await page.locator('.theke .karte-li[data-id=hierberol]').scrollIntoViewIfNeeded();
check(await bildGeladen(page, karteBild), 'hierberol: Karte zeigt das Foto (geladen)');
const kb2 = await page.evaluate(() => { const k = document.querySelector('.theke .karte-li[data-id=hierberol]'); return { src: (k.querySelector('picture img') || {}).currentSrc || '', vektor: !!k.querySelector('.flasche'), platzhalter: !!k.querySelector('.karte-platzhalter'), text: k.textContent.replace(/\s+/g, ' ') }; });
check(kb2.src.includes('/flasche-hierberol-0-7l-') && !kb2.vektor && !kb2.platzhalter && /ab\s+19\s€/.test(kb2.text) && !/Preis auf Anfrage/.test(kb2.text), `hierberol: Karte mit Foto, ohne Platzhalter, „ab 19 €“ (${JSON.stringify(kb2)})`);
check((await page.locator('.theke .gruppe[data-gruppe=spirituosen] .karte-li[data-id=hierberol]').count()) === 1, 'hierberol: Karte in der Gruppe Spirituosen');
const weitere = (await page.locator('.theke .weitere').textContent()).replace(/\s+/g, ' ');
check(!/Hierberol/.test(weitere), 'Satz „Weitere Produkte auf Anfrage“ nennt Hierberol nicht mehr');
// französische Seite lädt
const frAntwort = await page.goto(BASIS + '/fr/brand/hierberol/', { waitUntil: 'networkidle' });
check(frAntwort && frAntwort.status() === 200 && (await page.locator('h1').textContent()) === 'Hierberol' && (await page.locator('[data-kauf] [data-preis-wert="19"]').count()) === 1, 'hierberol: /fr/brand/hierberol/ lädt, h1 Hierberol, Preis 19 €');
check(await bildGeladen(page, '.produkt-kopf .haupt-bild picture img'), 'hierberol FR: Foto im Kopf geladen');
// OG-Bild: Standard (kein flaches Etikett)
await page.goto(BASIS + '/brand/hierberol/');
const og = await page.locator('meta[property="og:image"]').getAttribute('content');
check(og && og.endsWith('/og/standard.jpg'), `hierberol: og:image ist das Standard-OG-Bild (${og})`);
// Merkliste: „Auf die Merkliste“ mit Preis 19 €
await page.evaluate(() => localStorage.removeItem('hb-merkliste'));
await page.reload();
await page.locator('[data-merk-add]').click();
check((await page.locator('[data-zaehler]').first().textContent()) === '1' && await page.locator('[data-zur-merkliste]').isVisible(), 'hierberol: Auf die Merkliste, Zähler 1, „Zur Merkliste“ erscheint');
await page.goto(BASIS + '/anfrage/');
check((await page.locator('[data-liste] li').count()) === 1, 'hierberol: Anfrage zeigt 1 Zeile');
await page.fill('#f-name', 'Max Muster'); await page.fill('#f-mail', 'max@example.org'); await page.fill('#f-tel', '123456');
const vorschauH = (await page.locator('[data-vorschau]').count()) ? await page.locator('[data-vorschau]').textContent() : String((await direktSenden(page)).produkte || '');
check(vorschauH.includes('1 x Hierberol, 0,7 L: 19 € je Stück = 19 €'), `hierberol: Anfrage-Text „1 x Hierberol, 0,7 L: 19 € je Stück = 19 €“ (${vorschauH.replace(/\s+/g, ' ').slice(0, 160)})`);
await page.evaluate(() => localStorage.removeItem('hb-merkliste'));
console.log('Hierberol getestet.');

// Holzkiste 4 x 0,2 l: Seite, Live-Vorschau, Preis, Mehrfachwahl, Handybreite
{
  konsole = [];
  const r = await page.goto(BASIS + '/brand/holzkiste-4x0-2l/', { waitUntil: 'networkidle' });
  check(r && r.status() === 200 && (await page.locator('h1').textContent()) === 'Holzkiste 4 × 0,2 l', 'Holzkiste: Seite lädt, h1 „Holzkiste 4 × 0,2 l“');
  check(konsole.length === 0, `Holzkiste: Konsole ohne Fehler: ${konsole.join(' | ')}`);
  const preis = async () => (await page.locator('[data-kiste-preis]').textContent()).replace(/\s/g, ' ');
  check((await preis()) === '58 €', `Holzkiste: Preis 58 € (${await preis()})`);
  const belegung = () => page.locator('[data-kiste-buehne]').getAttribute('data-belegung');
  const sorten = () => page.evaluate(() => [...document.querySelectorAll('[data-fach-bild]')].sort((a, b) => a.getAttribute('data-fach-bild') - b.getAttribute('data-fach-bild')).map((i) => i.getAttribute('data-sorte')).join(','));
  const zusammen = async () => (await page.locator('[data-kiste-text]').textContent()).trim();
  // Wechsel und Einsetz-Sequenz laufen ca. 1 s: warten, bis die Bühne ruht (kiste.js entfernt dann data-bewegt)
  const kisteRuhe = () => page.waitForFunction(() => { const b = document.querySelector('[data-kiste-buehne]'); return b && b.classList.contains('kiste-bereit') && !b.hasAttribute('data-bewegt'); }, null, { timeout: 8000 }).then(() => true, () => false);
  check(await kisteRuhe(), 'Holzkiste: Einsetz-Sequenz endet, Bühne ruht');
  check((await belegung()) === 'gin,rum,whisky,wodka' && (await zusammen()) === 'Gin, Rum, Whisky, Wodka', `Holzkiste: Standardbelegung Gin, Rum, Whisky, Wodka (${await belegung()} / ${await zusammen()})`);
  check((await page.locator('[data-kiste-auswahl]').getAttribute('aria-live')) === 'polite', 'Holzkiste: Zusammenfassung ist aria-live');
  check((await page.locator('.kiste-fach').count()) === 4 && (await page.locator('.kiste-fach input[type=radio]').count()) === 24, 'Holzkiste: 4 Fächer mit je 6 Sorten');
  // Fach 1 auf Sambuca
  await page.locator('[data-fach="1"] label', { hasText: 'Sambuca' }).click();
  check(await kisteRuhe(), 'Holzkiste: Wechsel in Fach 1 endet, Bühne ruht');
  check((await sorten()) === 'sambuca,rum,whisky,wodka' && (await belegung()) === 'sambuca,rum,whisky,wodka', `Holzkiste: Fach 1 Sambuca ändert die Vorschau (${await sorten()})`);
  check((await zusammen()) === 'Sambuca, Rum, Whisky, Wodka', `Holzkiste: Zusammenfassung folgt (${await zusammen()})`);
  check((await page.locator('img[data-fach-bild="1"]').getAttribute('src')) === '/img/kiste-sambuca.webp', 'Holzkiste: Bild von Fach 1 ist der Sambuca-Freisteller');
  check(/vorne links Whisky/.test(await page.locator('img.kiste-grund').getAttribute('alt')) && /hinten links Sambuca/.test(await page.locator('img.kiste-grund').getAttribute('alt')), 'Holzkiste: Alt-Text wechselt mit der Auswahl');
  check((await preis()) === '58 €', 'Holzkiste: Preis bleibt 58 €');
  // Fach 3 auf dieselbe Sorte wie Fach 1
  await page.locator('[data-fach="3"] label', { hasText: 'Sambuca' }).click();
  await kisteRuhe();
  check((await belegung()) === 'sambuca,rum,sambuca,wodka' && (await zusammen()) === 'Sambuca, Rum, Sambuca, Wodka', `Holzkiste: dieselbe Sorte in zwei Fächern erlaubt (${await belegung()})`);
  check(await bildGeladen(page, 'img[data-fach-bild="3"]'), 'Holzkiste: Flaschenbild in Fach 3 geladen');
  // nach dem Wechsel steht je Fach genau eine Flasche mit richtiger Sorte (keine Kopie der alten Flasche übrig)
  const flaschenStand = () => page.evaluate(() => ({ n: document.querySelectorAll('img.kiste-flasche').length, alt: document.querySelectorAll('img.kiste-alt').length, f: [1, 2, 3, 4].map((n) => { const e = document.querySelectorAll(`img[data-fach-bild="${n}"]`); return e.length === 1 ? `${e[0].getAttribute('data-sorte')}:${e[0].getAttribute('src')}` : `x${e.length}`; }).join(',') }));
  const stand1 = await flaschenStand();
  check(stand1.n === 4 && stand1.alt === 0 && stand1.f === 'sambuca:/img/kiste-sambuca.webp,rum:/img/kiste-rum.webp,sambuca:/img/kiste-sambuca.webp,wodka:/img/kiste-wodka.webp', `Holzkiste: je Fach genau eine Flasche mit richtiger Sorte (${JSON.stringify(stand1)})`);
  // schnelles Mehrfachklicken in einem Fach: am Ende genau eine Flasche, letzte Wahl gilt
  for (const id of ['Rum', 'Gin', 'Wodka', 'Limoncello', 'Whisky']) await page.locator('[data-fach="2"] label', { hasText: id }).click();
  await kisteRuhe();
  const stand2 = await flaschenStand();
  check(stand2.n === 4 && stand2.alt === 0 && stand2.f.split(',')[1] === 'whisky:/img/kiste-whisky.webp' && (await belegung()) === 'sambuca,whisky,sambuca,wodka', `Holzkiste: schnelles Mehrfachklicken hinterlässt genau eine Flasche je Fach (${JSON.stringify(stand2)})`);
  // Merkliste: Kiste als eine Position zum Festpreis, Belegung (Fach 1 bis 4) im Eintrag
  await page.evaluate(() => localStorage.removeItem('hb-merkliste'));
  await page.reload({ waitUntil: 'networkidle' });
  await page.locator('[data-fach="3"] label', { hasText: 'Whisky' }).click();
  await page.locator('[data-fach="1"] label', { hasText: 'Sambuca' }).click();
  check(!(await page.locator('[data-kiste-zur]').isVisible()), 'Holzkiste: „Zur Merkliste“ vor dem Hinzufügen verborgen');
  await page.locator('[data-kiste-add]').click();
  const zaehler = async () => (await page.locator('[data-zaehler]').first().textContent()).trim();
  const eintraege = () => page.evaluate(() => JSON.parse(localStorage.getItem('hb-merkliste') || '[]'));
  check((await zaehler()) === '1' && await page.locator('[data-kiste-zur]').isVisible(), `Holzkiste: Auf die Merkliste, Zähler 1, „Zur Merkliste“ erscheint (${await zaehler()})`);
  const status1 = (await page.locator('[data-kiste-status]').textContent()).replace(/\s/g, ' ');
  check(status1 === 'Auf der Merkliste: Holzkiste 4 × 0,2 l (Sambuca, Rum, Whisky, Wodka)', `Holzkiste: Statuszeile (${status1})`);
  let e1 = await eintraege();
  check(e1.length === 1 && e1[0].i === 'holzkiste-4x0-2l' && e1[0].k.join(',') === 'sambuca,rum,whisky,wodka' && e1[0].n === 1, `Holzkiste: Eintrag mit Belegung (${JSON.stringify(e1)})`);
  await page.locator('[data-kiste-add]').click();
  e1 = await eintraege();
  check((await zaehler()) === '2' && e1.length === 1 && e1[0].n === 2, `Holzkiste: gleiche Belegung erhöht die Menge (Zähler ${await zaehler()}, ${e1.length} Position)`);
  await page.locator('[data-fach="2"] label', { hasText: 'Limoncello' }).click();
  await page.locator('[data-kiste-add]').click();
  e1 = await eintraege();
  check((await zaehler()) === '3' && e1.length === 2 && e1[1].k.join(',') === 'sambuca,limoncello,whisky,wodka' && e1[1].n === 1, `Holzkiste: andere Belegung ist eine neue Position (${JSON.stringify(e1)})`);
  // alte Einträge ohne Belegung und unbekannte Sorten-Ids dürfen die Anfrage-Seite nicht brechen
  await page.evaluate(() => { const l = JSON.parse(localStorage.getItem('hb-merkliste')); l.push({ i: 'holzkiste-4x0-2l', n: 1 }, { i: 'holzkiste-4x0-2l', k: ['gibtsnicht', 'gin', 'gin', 'gin'], n: 1 }); localStorage.setItem('hb-merkliste', JSON.stringify(l)); });
  konsole = [];
  await page.goto(BASIS + '/anfrage/', { waitUntil: 'networkidle' });
  check(konsole.length === 0 && (await page.locator('[data-liste] > li').count()) === 4 && /gibtsnicht/.test(await page.locator('[data-liste]').textContent()), `Holzkiste: Eintrag ohne Belegung und unbekannte Sorte brechen die Anfrage nicht (${konsole.join(' | ')})`);
  await page.evaluate(() => { const l = JSON.parse(localStorage.getItem('hb-merkliste')); l.length = 2; localStorage.setItem('hb-merkliste', JSON.stringify(l)); });
  await page.reload({ waitUntil: 'networkidle' });
  // Anfrage-Seite: zwei Positionen, Summe 2 x 58 + 58 = 174 €, Fächer mit Flaschennamen
  check((await page.locator('[data-liste] > li').count()) === 2, 'Holzkiste: Anfrage zeigt 2 Positionen');
  check((await page.locator('[data-liste] > li .pos-name').first().textContent()) === 'Holzkiste 4 × 0,2 l', 'Holzkiste: Anfrage-Name „Holzkiste 4 × 0,2 l“');
  const fachZeilen = (await page.locator('[data-liste] > li').first().locator('.pos-faecher > div').allTextContents()).map((z) => z.trim());
  check(fachZeilen.join('|') === 'Fach 1 (hinten links): Hierber Sambuca|Fach 2 (hinten rechts): Hierber Rum|Fach 3 (vorne links): Hierber Whisky|Fach 4 (vorne rechts): Hierber Wodka', `Holzkiste: Anfrage zeigt vier Fächer mit Flaschennamen (${fachZeilen.join(' | ')})`);
  check((await page.locator('[data-liste] > li .pos-summe').first().textContent()).replace(/\s/g, ' ') === '116 €', 'Holzkiste: Positionssumme 2 x 58 = 116 €');
  check((await page.locator('[data-summe-wert]').textContent()).replace(/\s/g, ' ') === '174 €', `Holzkiste: Summe 174 € (${await page.locator('[data-summe-wert]').textContent()})`);
  await page.fill('#f-name', 'Max Muster'); await page.fill('#f-mail', 'max@example.org');
  let kisteText, kisteNachricht = '';
  if (await page.locator('[data-vorschau]').count()) kisteText = kisteNachricht = await page.locator('[data-vorschau]').textContent();
  else { const d = await direktSenden(page); kisteText = String(d.produkte || ''); kisteNachricht = String(d.nachricht || ''); }
  const erwartet = '- 2 x Holzkiste 4 × 0,2 l: 58 € je Stück = 116 €\n    Fach 1 (hinten links): Hierber Sambuca, 0,2 L\n    Fach 2 (hinten rechts): Hierber Rum, 0,2 L\n    Fach 3 (vorne links): Hierber Whisky, 0,2 L\n    Fach 4 (vorne rechts): Hierber Wodka, 0,2 L\n- 1 x Holzkiste 4 × 0,2 l: 58 € je Stück = 58 €\n    Fach 1 (hinten links): Hierber Sambuca, 0,2 L\n    Fach 2 (hinten rechts): Hierber Limoncello, 0,2 L\n    Fach 3 (vorne links): Hierber Whisky, 0,2 L\n    Fach 4 (vorne rechts): Hierber Wodka, 0,2 L';
  check(kisteText.includes(erwartet), `Holzkiste: Anfrage-Text mit „Holzkiste 4 × 0,2 l: 58 € je Stück“ und vier Fach-Zeilen (${kisteText.replace(/\s+/g, ' ').slice(0, 200)})`);
  check(kisteNachricht.includes(erwartet) && kisteNachricht.includes('174 €'), 'Holzkiste: auch die Nachricht enthält Positionen und Summe 174 €');
  // französische Anfrage-Seite: Fächer auf Französisch
  await page.goto(BASIS + '/fr/anfrage/', { waitUntil: 'networkidle' });
  const frFach = (await page.locator('[data-liste] > li').first().locator('.pos-faecher > div').first().textContent()).trim();
  check(frFach === 'Compartiment 1 (arrière gauche): Hierber Sambuca' && (await page.locator('[data-liste] > li .pos-name').first().textContent()) === 'Caisse en bois 4 × 0,2 l', `Holzkiste FR: Anfrage-Seite zeigt Name und Fach auf Französisch (${frFach})`);
  await page.evaluate(() => localStorage.removeItem('hb-merkliste'));
  await page.goto(BASIS + '/brand/holzkiste-4x0-2l/', { waitUntil: 'networkidle' });
  // Handybreite: kein horizontales Scrollen
  const breite = await page.evaluate(() => ({ s: document.documentElement.scrollWidth, c: document.documentElement.clientWidth }));
  check(breite.s <= breite.c, `Holzkiste: bei 390 px kein horizontales Scrollen (${breite.s} > ${breite.c})`);
  // Seite ohne JavaScript: Standardbelegung als statisches HTML
  const ctxOhne = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
  const seiteOhne = await ctxOhne.newPage();
  await seiteOhne.goto(BASIS + '/brand/holzkiste-4x0-2l/', { waitUntil: 'load' });
  const ohneJs = await seiteOhne.evaluate(() => ({ s: [...document.querySelectorAll('[data-fach-bild]')].sort((a, b) => a.getAttribute('data-fach-bild') - b.getAttribute('data-fach-bild')).map((i) => i.getAttribute('data-sorte')).join(','), t: document.querySelector('[data-kiste-text]').textContent.trim() }));
  check(ohneJs.s === 'gin,rum,whisky,wodka' && ohneJs.t === 'Gin, Rum, Whisky, Wodka', `Holzkiste ohne JavaScript: Standardbelegung (${JSON.stringify(ohneJs)})`);
  await ctxOhne.close();
  // französische Seite
  const fr = await page.goto(BASIS + '/fr/brand/holzkiste-4x0-2l/', { waitUntil: 'networkidle' });
  check(fr && fr.status() === 200 && (await page.locator('[data-kiste-buehne]').count()) === 1, 'Holzkiste: /fr/brand/holzkiste-4x0-2l/ lädt');
  // Screenshots für die Sichtprüfung, falls KISTE_SHOTS gesetzt ist (Verzeichnis außerhalb des Repos)
  if (process.env.KISTE_SHOTS) {
    await page.setViewportSize({ width: 1100, height: 900 });
    await page.goto(BASIS + '/brand/holzkiste-4x0-2l/', { waitUntil: 'networkidle' });
    await page.locator('.kiste-bild').screenshot({ path: path.join(process.env.KISTE_SHOTS, 'kiste-1.png') });
    for (const [nr, id] of [[1, 'sambuca'], [2, 'limoncello'], [3, 'sambuca'], [4, 'gin']]) await page.locator(`[data-fach="${nr}"] label`, { hasText: new RegExp(`^\\s*${id}`, 'i') }).click();
    await kisteRuhe();
    await page.locator('.kiste-bild').screenshot({ path: path.join(process.env.KISTE_SHOTS, 'kiste-2.png') });
  }
  console.log('Holzkiste getestet.');
}

await browser.close();
console.log(`${ok} Prüfungen bestanden.`);
if (fehler.length) { console.log('FEHLER:\n' + fehler.join('\n')); process.exit(1); }
console.log('OK: alle Browserprüfungen bestanden.');
