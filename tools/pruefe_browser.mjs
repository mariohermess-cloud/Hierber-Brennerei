// Browsertests (Playwright): Konsolenfehler auf allen Seiten, Tabs per Tastatur, Merkliste + Anfrage-Text, Filter, Seite ohne JS, Altershinweis.
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

await browser.close();
console.log(`${ok} Prüfungen bestanden.`);
if (fehler.length) { console.log('FEHLER:\n' + fehler.join('\n')); process.exit(1); }
console.log('OK: alle Browserprüfungen bestanden.');
