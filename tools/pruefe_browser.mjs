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

// 1. Konsole auf allen Seiten
const pfade = ['/', '/anfrage/', '/impressum/', '/datenschutz/', ...PRODUKTE.map((p) => `/brand/${p.id}/`)];
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
const vorschau = await page.locator('[data-vorschau]').textContent();
console.log('--- Vorschau Anfrage-Text ---\n' + vorschau + '\n-----------------------------');
check(vorschau.includes('2 x Quetsch (op Quetschen nogeräift), 0,5 L: 16 € je Stück = 32 €') && vorschau.includes('1 x Hondsaarsch: Preis auf Anfrage'), 'Text enthält Zeilen mit/ohne Preis');
await page.locator('[data-liste] input').first().fill('3');
check((await page.locator('[data-summe-wert]').textContent()).trim() === '48 €', 'Menge 3 ergibt 48 €');
await page.evaluate(() => { document.querySelector('[data-form]').addEventListener('submit', (e) => { e.stopImmediatePropagation; }, true); });
await page.evaluate(() => { window.__href = null; });
// mailto-Navigation abfangen: Attribut data-mailto wird vor der Navigation gesetzt
await page.route('mailto:*', (r) => r.abort()).catch(() => {});
await page.locator('[data-form] button[type=submit]').click().catch(() => {});
await page.waitForTimeout(300);
const href = await page.locator('[data-form]').getAttribute('data-mailto');
check(href && href.startsWith('mailto:info@hierber-brennerei.lu?subject=') && href.includes('%0D%0A') && !/[\r\n ]/.test(href), 'mailto-Link kodiert, mit %0D%0A');
console.log('mailto:', decodeURIComponent((href || '').split('body=')[1] || '').split('\r\n').join(' / '));
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
check((await page.locator('.schilder a.schild').evaluateAll((a) => a.every((x) => /^\/brand\/[a-z-]+\/$/.test(x.getAttribute('href'))))), 'Tafeln verlinken Sortenseiten');
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
// (a) Rum: kein 0,5-L-Bild; vorgewählt ist 0,5 L (Standard) = Vektor-Flasche, die übrigen Größen zeigen ihr Foto
await page.goto(BASIS + '/brand/rum/', { waitUntil: 'networkidle' });
let z = await buehne(page);
check(z && z.n === 1 && z.vektor && z.haupt, `rum: beim Laden 0,5 L vorgewählt, Vektor-Flasche (${JSON.stringify(z)})`);
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
// (c) Kirsch: 0,5 L vorgewählt (Vektor-Flasche), 0,1 L zeigt das 0,1-L-Foto
await page.goto(BASIS + '/brand/kirsch/', { waitUntil: 'networkidle' });
z = await buehne(page);
check(z && z.n === 1 && z.vektor, `kirsch: beim Laden 0,5 L vorgewählt, Vektor-Flasche (${JSON.stringify(z)})`);
await zeigtGroesse(page, '0,1 L', 'flasche-kirsch-0-1l', 'Flasche Kirsch, 0,1 L, mit Etikett', 'kirsch');
// Variantenwechsel (Quetsch): Bild folgt der Größe, nichts bricht
await page.goto(BASIS + '/brand/quetsch/', { waitUntil: 'networkidle' });
await page.locator('label.chip-radio', { has: page.locator('input[name=variante][value=geraeift]') }).click(); await warteBild(page);
z = await buehne(page); check(z && z.n === 1 && z.menge === '0,1 L' && z.foto && z.src.includes('/flasche-quetsch-0-1l-'), `quetsch: Variante gewechselt, Größe 0,1 L zeigt Foto (${JSON.stringify(z)})`);
await waehleGroesse(page, '0,5 L'); z = await buehne(page); check(z && z.vektor, 'quetsch: 0,5 L der anderen Variante zeigt die Vektor-Flasche');
await page.locator('label.chip-radio', { has: page.locator('input[name=variante][value=standard]') }).click(); await warteBild(page);
z = await buehne(page); check(z && z.n === 1 && z.menge === '0,1 L' && z.foto, `quetsch: zurück zur ersten Variante, Foto 0,1 L (${JSON.stringify(z)})`);
// (e) ohne JavaScript bleibt das Hauptbild (bzw. bei Kirsch die Vektor-Flasche der vorgewählten Größe 0,5 L); verborgene Größenbilder bleiben verborgen
const ctx6 = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } });
const p6 = await ctx6.newPage();
await p6.goto(BASIS + '/brand/gin/'); z = await buehne(p6);
check(z && z.n === 1 && z.haupt && z.foto, `ohne JS gin: Hauptbild sichtbar (${JSON.stringify(z)})`);
await p6.goto(BASIS + '/brand/kirsch/'); z = await buehne(p6);
check(z && z.n === 1 && z.vektor, `ohne JS kirsch: vorgewählte Größe 0,5 L, Vektor-Flasche sichtbar (${JSON.stringify(z)})`);
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

await browser.close();
console.log(`${ok} Prüfungen bestanden.`);
if (fehler.length) { console.log('FEHLER:\n' + fehler.join('\n')); process.exit(1); }
console.log('OK: alle Browserprüfungen bestanden.');
