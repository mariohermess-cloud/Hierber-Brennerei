// Routine "Fotos übernehmen": ein Befehl nach jedem Foto-Upload des Nutzers. Idempotent; Exit-Code 1, wenn ein Schritt fehlschlägt.
// Aufruf: node tools/fotos_uebernehmen.mjs [--ohne-build] [--browser]
//   --ohne-build  Schritt 4 (build.mjs und die Prüfskripte) überspringen
//   --browser     zusätzlich tools/pruefe_browser.mjs (startet und stoppt dafür selbst einen Server auf Port 8770, per PID)
// Schritte:
//   1. Dateinamen in fotos-flaschen/, fotos-ki/ und fotos-basis/ gegen die Namensregeln prüfen (nur melden, nichts verschieben oder löschen)
//   2. Bildformat prüfen (fotos-flaschen 1024x1536, fotos-ki 1448x1086; Abweichung nur melden)
//   3. Generatoren in fester Reihenfolge: foto_prompts, foto_prompts_weitere, foto_prompts_flaschen, foto_prompts_groessen, chatgpt_stapel
//      (FOTO-PLATZHALTER.md wird nach foto_prompts.mjs per git restore zurückgesetzt, wenn es vorher unverändert war)
//   4. node build.mjs, dann pruefe_daten, pruefe_links, pruefe_notizen, pruefe_kontrast (und mit --browser pruefe_browser)
//   5. Zusammenfassung nach stdout und FOTO-STAND.md
// Namensregeln:
//   fotos-flaschen/<id>.png (Hauptbild = 0,5 L) oder <id>-<größe>.png, Größe 0-1l, 0-2l, 0-5l, 0-7l, 1-0l, 1-5l; <id>-0-5l.png gilt wie <id>.png, existieren beide, gilt <id>.png
//   fotos-ki/<id>-<n>.png (Serviervorschlag n, n = 1 Hauptbild)
//   fotos-basis/<form>-<größe>.png mit Form rund, schlank, karaffe (und rund-40ml.png, ungenutzt)
import fs from 'node:fs';
import path from 'node:path';
import net from 'node:net';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { PRODUKTE } from '../site/data/produkte.js';
import { FLASCHEN_ORDNER, FLASCHEN_FORMAT, GROESSEN_SUFFIX, HAUPT_MENGE } from '../site/data/flaschenfotos.js';
import { KI_BILDER, kartenNummern, kiKey } from '../site/data/ki-bilder.js';
import { SERVIERVORSCHLAEGE } from '../site/data/serviervorschlaege.js';

const wurzel = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const rel = (...t) => path.join(wurzel, ...t);
const args = new Set(process.argv.slice(2));
const unbekannteArgs = [...args].filter((a) => !['--ohne-build', '--browser'].includes(a));
if (unbekannteArgs.length) { console.error(`Unbekannte Option: ${unbekannteArgs.join(' ')}\nAufruf: node tools/fotos_uebernehmen.mjs [--ohne-build] [--browser]`); process.exit(2); }
const OHNE_BUILD = args.has('--ohne-build'), BROWSER = args.has('--browser');
const PORT = 8770;
const KI_FORMAT = { w: 1448, h: 1086 };
const KI_ORDNER = 'fotos-ki', BASIS_ORDNER = 'fotos-basis';

const fehler = [];       // fehlgeschlagene Schritte (Exit-Code 1)
const auffaellig = [];   // Auffälligkeiten (nur melden)
const schritt = (n, t) => console.log(`\n== ${n}. ${t}`);

// ---------- Stammdaten ----------
const IDS = new Set(PRODUKTE.map((p) => p.id));
const SUFFIXE = new Set(Object.values(GROESSEN_SUFFIX));
const MENGE_ZU_SUFFIX = GROESSEN_SUFFIX;
const SUFFIX_ZU_MENGE = Object.fromEntries(Object.entries(GROESSEN_SUFFIX).map(([m, s]) => [s, m]));
const HAUPT_SUFFIX = GROESSEN_SUFFIX[HAUPT_MENGE];
const mengenVon = (p) => [...new Set(p.varianten.flatMap((v) => v.preise.map((x) => x.menge)))];
const GROESSEN_SPALTEN = Object.keys(GROESSEN_SUFFIX); // 0,1 / 0,2 / 0,5 / 0,7 / 1 / 1,5 L

const dateien = (ordner) => {
  const d = rel(ordner);
  if (!fs.existsSync(d)) return [];
  return fs.readdirSync(d, { withFileTypes: true }).filter((e) => !e.name.startsWith('.')).map((e) => ({ name: e.name, dir: e.isDirectory() }));
};

// ---------- 1. Dateinamen ----------
// Zerlegt einen Namen aus fotos-flaschen/ in { id, suffix } (suffix null = Hauptbild) oder null.
function zerlegeFlasche(name) {
  if (!name.endsWith('.png')) return null;
  const stamm = name.slice(0, -4);
  if (IDS.has(stamm)) return { id: stamm, suffix: null };
  const m = stamm.match(/^(.+)-(\d-\dl)$/);
  if (m && IDS.has(m[1]) && SUFFIXE.has(m[2])) return { id: m[1], suffix: m[2] };
  return null;
}
const zerlegeKi = (name) => {
  const m = name.match(/^(.+)-(\d+)\.png$/);
  return m && IDS.has(m[1]) ? { id: m[1], n: Number(m[2]) } : null;
};
const BASIS_NAME = /^(rund|schlank|karaffe)-(0-1l|0-2l|0-5l|0-7l|1-0l|1-5l)\.png$|^rund-40ml\.png$/;

schritt(1, 'Dateinamen prüfen');
const flaschen = { haupt: new Map(), groesse: new Map() }; // haupt: id -> Dateiname; groesse: `${id}|${suffix}` -> Dateiname
const kiDateien = new Map(); // id -> Set(n)
for (const e of dateien(FLASCHEN_ORDNER)) {
  const z = e.dir ? null : zerlegeFlasche(e.name);
  if (!z) { auffaellig.push(`${FLASCHEN_ORDNER}/${e.name}: Name folgt der Regel nicht (erwartet <sorten-id>.png oder <sorten-id>-<0-1l|0-2l|0-5l|0-7l|1-0l|1-5l>.png mit bekannter Sorte)`); continue; }
  if (z.suffix === null || z.suffix === HAUPT_SUFFIX) {
    // <id>.png hat Vorrang vor <id>-0-5l.png
    const alt = flaschen.haupt.get(z.id);
    if (alt && alt !== e.name) auffaellig.push(`${FLASCHEN_ORDNER}: ${z.id}.png und ${z.id}-${HAUPT_SUFFIX}.png existieren beide; es gilt ${z.id}.png`);
    if (!alt || z.suffix === null) flaschen.haupt.set(z.id, e.name);
  } else {
    flaschen.groesse.set(`${z.id}|${z.suffix}`, e.name);
    const p = PRODUKTE.find((x) => x.id === z.id);
    if (!mengenVon(p).includes(SUFFIX_ZU_MENGE[z.suffix])) auffaellig.push(`${FLASCHEN_ORDNER}/${e.name}: ${SUFFIX_ZU_MENGE[z.suffix]} steht nicht in der Preisliste von ${p.name}; die Seite zeigt das Bild nicht`);
  }
}
for (const e of dateien(KI_ORDNER)) {
  const z = e.dir ? null : zerlegeKi(e.name);
  if (!z) { auffaellig.push(`${KI_ORDNER}/${e.name}: Name folgt der Regel nicht (erwartet <sorten-id>-<n>.png mit bekannter Sorte)`); continue; }
  const liste = SERVIERVORSCHLAEGE[z.id] || [];
  const nummern = KI_BILDER[z.id] ? kartenNummern(z.id, liste) : null;
  if (!nummern) auffaellig.push(`${KI_ORDNER}/${e.name}: ${z.id} hat keinen Eintrag in site/data/ki-bilder.js; die Seite bindet das Bild nicht ein`);
  else if (!nummern.includes(z.n)) auffaellig.push(`${KI_ORDNER}/${e.name}: Nummer ${z.n} passt zu keiner Karte von ${z.id} (Nummern ${[...nummern].sort((a, b) => a - b).join(', ')}); die Seite bindet das Bild nicht ein`);
  if (!kiDateien.has(z.id)) kiDateien.set(z.id, new Set());
  kiDateien.get(z.id).add(z.n);
}
for (const e of dateien(BASIS_ORDNER)) if (e.dir || !BASIS_NAME.test(e.name)) auffaellig.push(`${BASIS_ORDNER}/${e.name}: Name folgt der Regel nicht (erwartet <rund|schlank|karaffe>-<0-1l|0-2l|0-5l|0-7l|1-0l|1-5l>.png oder rund-40ml.png)`);
console.log(auffaellig.length ? `${auffaellig.length} Auffälligkeit(en), siehe unten.` : 'Alle Namen folgen den Regeln.');

// ---------- 2. Bildformat ----------
schritt(2, 'Bildformat prüfen');
const formatAbw = [];
async function pruefeFormat(ordner, namen, soll) {
  for (const name of namen) {
    try {
      const m = await sharp(rel(ordner, name)).metadata();
      if (m.width !== soll.w || m.height !== soll.h) formatAbw.push(`${ordner}/${name}: ${m.width}x${m.height}, erwartet ${soll.w}x${soll.h}`);
    } catch (e) { formatAbw.push(`${ordner}/${name}: nicht lesbar als Bild (${e.message})`); }
  }
}
await pruefeFormat(FLASCHEN_ORDNER, dateien(FLASCHEN_ORDNER).filter((e) => !e.dir && zerlegeFlasche(e.name)).map((e) => e.name), FLASCHEN_FORMAT);
await pruefeFormat(KI_ORDNER, dateien(KI_ORDNER).filter((e) => !e.dir && zerlegeKi(e.name)).map((e) => e.name), KI_FORMAT);
auffaellig.push(...formatAbw);
console.log(formatAbw.length ? `${formatAbw.length} Abweichung(en) vom erwarteten Format (nur gemeldet).` : `Alle Bilder im erwarteten Format (Flaschen ${FLASCHEN_FORMAT.w}x${FLASCHEN_FORMAT.h}, Serviervorschläge ${KI_FORMAT.w}x${KI_FORMAT.h}).`);

// ---------- Stand je Sorte (vor dem Bauen: "neu" = Quelle ohne oder mit älterer Ausgabe in dist/img) ----------
const keinHaupt = [];
const stand = PRODUKTE.map((p) => {
  const haupt = flaschen.haupt.has(p.id);
  if (!haupt) keinHaupt.push(p.id);
  const mengen = mengenVon(p);
  const groessen = Object.fromEntries(GROESSEN_SPALTEN.map((m) => [m, m === HAUPT_MENGE ? haupt : !mengen.includes(m) ? null : flaschen.groesse.has(`${p.id}|${MENGE_ZU_SUFFIX[m]}`)]));
  const nummern = KI_BILDER[p.id] ? kartenNummern(p.id, SERVIERVORSCHLAEGE[p.id] || []) || [1] : [];
  const kiHat = nummern.filter((n) => kiDateien.get(p.id)?.has(n)).length;
  return { id: p.id, name: p.name, haupt, groessen, kiHat, kiGesamt: nummern.length, mengen };
});
const istNeu = (quelle, key) => {
  const out = rel('dist', 'img', `${key}-480.avif`);
  try { return fs.statSync(out).mtimeMs < fs.statSync(quelle).mtimeMs; } catch { return true; }
};
let neuHaupt = 0, neuGroesse = 0, neuKi = 0;
for (const s of stand) {
  if (s.haupt && istNeu(rel(FLASCHEN_ORDNER, flaschen.haupt.get(s.id)), `flasche-${s.id}`)) neuHaupt++;
  for (const m of GROESSEN_SPALTEN) {
    if (m === HAUPT_MENGE || !s.groessen[m]) continue;
    const suffix = MENGE_ZU_SUFFIX[m];
    if (istNeu(rel(FLASCHEN_ORDNER, flaschen.groesse.get(`${s.id}|${suffix}`)), `flasche-${s.id}-${suffix}`)) neuGroesse++;
  }
  for (const n of kiDateien.get(s.id) || []) if (KI_BILDER[s.id] && istNeu(rel(KI_ORDNER, `${s.id}-${n}.png`), kiKey(s.id, n))) neuKi++;
}

// ---------- Hilfen zum Ausführen ----------
const ausgabe = (r) => `${r.stdout || ''}${r.stderr || ''}`.trim();
const letzte = (text, n) => text.split('\n').slice(-n).join('\n');
function lauf(titel, cmd, argv, { zeigeAlles = false, timeout = 20 * 60 * 1000 } = {}) {
  const t0 = Date.now();
  const r = spawnSync(cmd, argv, { cwd: wurzel, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024, timeout });
  const text = ausgabe(r), ok = r.status === 0;
  console.log(`${ok ? 'OK    ' : 'FEHLER'} ${titel} (${((Date.now() - t0) / 1000).toFixed(1)} s)`);
  console.log(ok && !zeigeAlles ? letzte(text, 3).replace(/^/gm, '       ') : letzte(text, 40).replace(/^/gm, '       '));
  if (!ok) fehler.push(`${titel} (Exit ${r.status ?? r.signal})`);
  return ok;
}
const git = (argv) => spawnSync('git', argv, { cwd: wurzel, encoding: 'utf8' });

// ---------- 3. Generatoren ----------
schritt(3, 'Generatoren');
const generatoren = ['foto_prompts', 'foto_prompts_weitere', 'foto_prompts_flaschen', 'foto_prompts_groessen', 'chatgpt_stapel'];
for (const g of generatoren) {
  const platzhalterSauber = g === 'foto_prompts' ? git(['diff', '--quiet', '--', 'FOTO-PLATZHALTER.md']).status === 0 : false;
  const ok = lauf(`node tools/${g}.mjs`, 'node', [`tools/${g}.mjs`]);
  if (g === 'foto_prompts' && ok) {
    if (platzhalterSauber && git(['diff', '--quiet', '--', 'FOTO-PLATZHALTER.md']).status !== 0) {
      git(['restore', '--', 'FOTO-PLATZHALTER.md']);
      console.log('       FOTO-PLATZHALTER.md (nur durch den dist-Stand verändert) per git restore zurückgesetzt.');
    } else if (!platzhalterSauber) console.log('       Hinweis: FOTO-PLATZHALTER.md war schon vorher geändert und bleibt unangetastet.');
  }
  if (!ok) { console.log('       Weitere Generatoren übersprungen (sie bauen aufeinander auf).'); break; }
}

// ---------- 5a. FOTO-STAND.md (vor dem Bauen, damit die Datei auch bei einem Fehler des Builds aktuell ist) ----------
const zelle = (v) => (v === null ? '·' : v ? '✔' : '–');
const nHaupt = stand.filter((s) => s.haupt).length;
const nGroesse = stand.reduce((a, s) => a + GROESSEN_SPALTEN.filter((m) => m !== HAUPT_MENGE && s.groessen[m]).length, 0);
const nGroesseGesamt = stand.reduce((a, s) => a + GROESSEN_SPALTEN.filter((m) => m !== HAUPT_MENGE && s.groessen[m] !== null).length, 0);
const nKi = stand.reduce((a, s) => a + s.kiHat, 0), nKiGesamt = stand.reduce((a, s) => a + s.kiGesamt, 0);
const md = `# FOTO-STAND

Erzeugt mit \`node tools/fotos_uebernehmen.mjs\`. Nicht von Hand ändern. Zeigt, welche Bilder in \`fotos-flaschen/\` und \`fotos-ki/\` liegen.

- **Hauptbilder (0,5 L):** ${nHaupt} von ${stand.length} Sorten
- **Größenbilder (alle anderen Größen der Preisliste):** ${nGroesse} von ${nGroesseGesamt}
- **Serviervorschläge (\`fotos-ki/\`):** ${nKi} von ${nKiGesamt} Karten

## Flaschenbilder je Sorte und Größe

✔ vorhanden · – offen · · Größe steht nicht in der Preisliste. Die Spalte 0,5 L ist das Hauptbild (\`<id>.png\` oder \`<id>-0-5l.png\`), das jede Sorte bekommt, auch wenn 0,5 L nicht in der Preisliste steht.

| Sorte | ${GROESSEN_SPALTEN.join(' | ')} | Serviervorschläge |
|---|${GROESSEN_SPALTEN.map(() => ':-:').join('|')}|:-:|
${stand.map((s) => `| ${s.name} | ${GROESSEN_SPALTEN.map((m) => zelle(s.groessen[m])).join(' | ')} | ${s.kiGesamt ? `${s.kiHat}/${s.kiGesamt}` : '·'} |`).join('\n')}

## Sorten ohne Hauptbild (0,5 L)

${keinHaupt.length ? keinHaupt.map((id) => `- ${id}`).join('\n') : '(keine)'}
`;
fs.writeFileSync(rel('FOTO-STAND.md'), md);

// ---------- 4. Bauen und prüfen ----------
if (OHNE_BUILD) console.log('\n== 4. Bauen und prüfen: übersprungen (--ohne-build)');
else if (fehler.length) console.log('\n== 4. Bauen und prüfen: übersprungen (vorheriger Schritt fehlgeschlagen)');
else {
  schritt(4, 'Bauen und prüfen');
  if (lauf('node build.mjs', 'node', ['build.mjs'], { timeout: 30 * 60 * 1000 })) {
    for (const c of ['pruefe_daten', 'pruefe_links', 'pruefe_notizen', 'pruefe_kontrast']) lauf(`node tools/${c}.mjs`, 'node', [`tools/${c}.mjs`]);
    if (BROWSER) await browserPruefung();
  }
}

// Server auf Port 8770 (python3 -m http.server -d dist) starten, pruefe_browser.mjs laufen lassen, Server per PID wieder beenden (nie pkill).
async function browserPruefung() {
  const frei = await new Promise((res) => { const s = net.createServer(); s.once('error', () => res(false)); s.once('listening', () => s.close(() => res(true))); s.listen(PORT, '127.0.0.1'); });
  if (!frei) { console.log(`FEHLER Port ${PORT} ist belegt; Browserprüfung nicht gestartet (fremden Prozess nicht beenden).`); fehler.push(`Port ${PORT} belegt`); return; }
  const server = spawn('python3', ['-m', 'http.server', String(PORT), '-d', 'dist'], { cwd: wurzel, stdio: 'ignore' });
  const stoppe = () => { try { if (server.pid) process.kill(server.pid); } catch { /* schon beendet */ } };
  process.once('exit', stoppe);
  for (const sig of ['SIGINT', 'SIGTERM']) process.once(sig, () => { stoppe(); process.exit(130); });
  try {
    let bereit = false;
    for (let i = 0; i < 50 && !bereit; i++) {
      try { const r = await fetch(`http://127.0.0.1:${PORT}/`); bereit = r.ok; } catch { await new Promise((r) => setTimeout(r, 200)); }
    }
    if (!bereit) { console.log('FEHLER Server auf Port 8770 antwortet nicht.'); fehler.push('Server startet nicht'); return; }
    // Der Server hat eigenen Prozess; die Prüfung läuft asynchron, damit der Eventloop frei bleibt
    const t0 = Date.now();
    const r = await new Promise((res) => {
      const k = spawn('node', ['tools/pruefe_browser.mjs'], { cwd: wurzel });
      let o = ''; k.stdout.on('data', (d) => { o += d; }); k.stderr.on('data', (d) => { o += d; });
      k.on('close', (status) => res({ status, o }));
    });
    const ok = r.status === 0;
    console.log(`${ok ? 'OK    ' : 'FEHLER'} node tools/pruefe_browser.mjs (${((Date.now() - t0) / 1000).toFixed(1)} s)`);
    console.log((ok ? letzte(r.o.trim(), 3) : letzte(r.o.trim(), 40)).replace(/^/gm, '       '));
    if (!ok) fehler.push(`node tools/pruefe_browser.mjs (Exit ${r.status})`);
  } finally { stoppe(); }
}

// ---------- 5b. Zusammenfassung ----------
const unbekannt = auffaellig.filter((a) => !formatAbw.includes(a));
console.log('\n== Zusammenfassung');
console.log(`neu: ${neuHaupt} Hauptbilder, ${neuGroesse} Größenbilder, ${neuKi} Serviervorschläge (noch nicht oder veraltet in dist/img); unbekannte Dateien: ${unbekannt.length ? unbekannt.length : 'keine'}; Sorten ohne Bild: ${keinHaupt.length ? keinHaupt.join(', ') : 'keine'}.`);
console.log(`Stand: Hauptbilder ${nHaupt}/${stand.length}, Größenbilder ${nGroesse}/${nGroesseGesamt}, Serviervorschläge ${nKi}/${nKiGesamt} (Tabelle: FOTO-STAND.md).`);
if (auffaellig.length) console.log('Auffälligkeiten:\n' + auffaellig.map((a) => ` - ${a}`).join('\n'));
if (fehler.length) { console.log('\nFEHLER:\n' + fehler.map((f) => ` - ${f}`).join('\n')); process.exit(1); }
console.log('\nOK: alle Schritte erfolgreich.');
