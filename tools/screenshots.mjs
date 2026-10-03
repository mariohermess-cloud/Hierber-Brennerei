// Screenshots (390x844 und 1440x900) von Startseite, zwei Sortenseiten und der Anfrage-Seite.
// Aufruf: node tools/screenshots.mjs <Zielordner>   (dist/ muss auf Port 8770 laufen)
import fs from 'node:fs/promises';
import { chromium, BASIS } from './playwright.mjs';
const ziel = process.argv[2] || '/tmp/shots';
await fs.mkdir(ziel, { recursive: true });
const browser = await chromium.launch();
const seiten = [['start', '/'], ['quetsch', '/brand/quetsch/'], ['hondsaarsch', '/brand/hondsaarsch/'], ['kirsch', '/brand/kirsch/'], ['vieille-pomme', '/brand/vieille-pomme/'], ['whisky', '/brand/whisky/'], ['vieux-marc', '/brand/vieux-marc/'], ['rum', '/brand/rum/'], ['anfrage', '/anfrage/']];
for (const [vp, w, h] of [['mobil', 390, 844], ['desktop', 1440, 900]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  // Altershinweis vorab bestätigen, damit er die Aufnahme nicht überdeckt; Merkliste für die Anfrage-Seite füllen
  await page.addInitScript(() => {
    try { localStorage.setItem('hb-alter', '1'); if (!localStorage.getItem('hb-merkliste')) localStorage.setItem('hb-merkliste', JSON.stringify([{ i: 'quetsch', v: 'geraeift', g: '0,5 L', n: 2 }, { i: 'hondsaarsch', v: 'standard', g: null, n: 1 }, { i: 'gin', v: 'standard', g: '1 L', n: 1 }])); } catch (e) {}
  });
  for (const [name, p] of seiten) {
    await page.goto(BASIS + p, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.querySelectorAll('.reveal').forEach((e) => e.classList.add('sichtbar')));
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } window.scrollTo(0, 0); });
    await page.waitForLoadState('networkidle'); await page.waitForTimeout(500);
    await page.screenshot({ path: `${ziel}/${name}-${vp}.png`, fullPage: true });
  }
  await ctx.close();
}
await browser.close();
console.log('Screenshots in', ziel);
