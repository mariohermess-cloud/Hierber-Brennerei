// Erzeugt die ChatGPT-Bildprompts für die Serviervorschlag-Fotos (KI-Symbolbilder) und die Liste aller Foto-Platzhalter.
// Aufruf: node tools/foto_prompts.mjs   (Exit-Code 1, wenn ein Vorschlag, eine Etiketten-/Fotodatei oder ein Flüssigkeitseintrag fehlt)
// Liest (nur lesend): site/data/produkte.js, site/data/serviervorschlaege.js, site/data/fluessigkeit.js,
//   v2/data/etiketten.json, Fertige Etiquetten/, fotos/, dist/**/index.html (ohne dist/fr)
// Schreibt: PROMPTS-FOTOS.md, FOTO-PLATZHALTER.md, tools/foto-prompts.json
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PRODUKTE } from '../site/data/produkte.js';
import { SERVIERVORSCHLAEGE } from '../site/data/serviervorschlaege.js';
import { FLUESSIGKEIT } from '../site/data/fluessigkeit.js';
import { KI_BILDER } from '../site/data/ki-bilder.js';
import { STIL, VORLAGE, flaschenVorlage } from './foto_gemeinsam.mjs';

const wurzel = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const rel = (...t) => path.join(wurzel, ...t);
const fehler = [];
const fail = (m) => fehler.push(m);

// ---------- Auswahl je Sorte: Name des Serviervorschlags (muss exakt in den Daten stehen) und Szene ----------
// szene: sortenpassend, nur Zutaten/Garnituren aus dem Rezept; Umgebung/Beilage aus passtZu bzw. aus der Sorte selbst.
// farbe: Farbe der Flüssigkeit in der Flasche in Worten (klar = automatisch "klar wie Wasser"); Quelle: site/data/fluessigkeit.js.
const AUSWAHL = {
  gin: { vorschlag: 'Gin-Tonic mit Apfel und Rosmarin',
    szene: 'Ein Gin-Tonic im großen Ballonglas, bis oben mit klaren Eiswürfeln, dazwischen 3 bis 4 dünne Apfelscheiben, ein frischer Rosmarinzweig steckt im Glas. Das Getränk ist klar und perlt leicht. Daneben unscharf ein kleiner Teller mit Ziegenkäse.' },
  wodka: { vorschlag: 'Wodka-Tonic mit Gurkenscheiben',
    szene: 'Ein Wodka-Tonic im hohen Longdrinkglas, bis oben mit Eiswürfeln, 4 dünne Gurkenscheiben im Glas. Das Getränk ist klar und perlt leicht. Im unscharfen Hintergrund eine Schale Sommersalat.' },
  rum: { vorschlag: 'Rum und Ginger mit Limette',
    farbe: 'goldenes Bernstein',
    szene: 'Rum und Ginger im Longdrinkglas, viel Eis, eine ausgedrückte Limettenspalte im Glas. Das Getränk ist helles Goldbernstein und perlt leicht, etwas heller als pur. Im unscharfen Hintergrund ein Burger auf einem Holzbrett.' },
  'rum-orange': { vorschlag: 'Rum Orange-Highball',
    farbe: 'orange-bernsteinfarben',
    szene: 'Ein Rum-Orange-Highball im Highballglas, viel Eis, eine frische Orangenscheibe im Glas. Das Getränk ist orange-bernsteinfarben und perlt leicht von Sodawasser. Daneben unscharf ein paar Käsegebäck-Stangen.' },
  whisky: { vorschlag: 'Old Fashioned',
    farbe: 'Bernstein',
    szene: 'Ein Old Fashioned im Tumbler mit einem einzigen großen klaren Eiswürfel, der Whisky bernsteinfarben, ein Streifen Orangenschale liegt im Glas. Daneben ein paar Walnüsse auf dem Eichentisch.' },
  'hunneg-whisky': { vorschlag: 'Hunneg Whisky-Highball', geschaetztOk: true,
    farbe: 'warmes Goldbernstein',
    szene: 'Ein Highballglas mit Eis, Hunneg Whisky und Ginger Ale, das Getränk goldgelb bis bernsteinfarben und leicht perlend, ein Streifen Orangenschale im Glas. Im unscharfen Hintergrund Käsegebäck.' },
  kirsch: { vorschlag: 'Kirsch-Sour',
    szene: 'Ein Kirsch-Sour im Tumbler auf frischem Eis, das Getränk hell und leicht trüb, ohne Schaum, ein Streifen Zitronenschale am Glasrand. Daneben ein paar frische Kirschen mit Stiel.' },
  framboise: { vorschlag: 'Framboise-Spritz mit Crémant',
    szene: 'Ein Framboise-Spritz im großen Weinglas auf viel Eis, das Getränk fast klar und perlend, höchstens ein zarter Rosahauch, frische Himbeeren im Glas und ein paar daneben.' },
  quetsch: { vorschlag: 'Quetsch-Sour',
    szene: 'Ein Quetsch-Sour im Tumbler auf frischem Eis, das Getränk hell und leicht trüb, ohne Schaum, ein Streifen Zitronenschale am Glasrand. Daneben ein paar frische dunkelblaue Zwetschgen.' },
  'poire-williams': { vorschlag: 'Poire Williams Fizz',
    szene: 'Ein Poire Williams Fizz im Longdrinkglas auf frischem Eis, das Getränk hell, leicht trüb und perlend, ohne Garnitur im Glas. Daneben eine reife Birne mit Stiel.' },
  mirabelle: { vorschlag: 'Mirabelle-Tonic mit Thymian',
    szene: 'Ein Mirabelle-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, ein frischer Thymianzweig steckt im Glas. Das Getränk ist klar und perlt leicht. Daneben frische gelbe Mirabellen.' },
  'hierber-fruucht': { vorschlag: 'Hierber aale Fruucht auf einem großen Eiswürfel',
    farbe: 'warmes, kräftiges Bernstein',
    szene: 'Hierber aale Fruucht im Tumbler auf einem einzigen großen klaren Eiswürfel, das Getränk warm bernsteinfarben. Daneben ein Stück dunkle Schokolade und ein paar Walnüsse.' },
  'vieux-marc': { vorschlag: 'Espresso mit Vieux Marc',
    farbe: 'kräftiges Bernstein (die Karaffe selbst aus sehr dunklem, braunem Glas)',
    szene: 'Eine kleine Espressotasse mit frischem Espresso und Crema auf einer Untertasse, daneben ein kleines Glas Vieux Marc, kräftig bernsteinfarben, und zwei Mandelkekse. Kein Eis.' },
  'vieille-prune': { vorschlag: 'Vieille Prune auf einem großen Eiswürfel',
    farbe: 'blasses Gold',
    szene: 'Vieille Prune im Tumbler auf einem einzigen großen klaren Eiswürfel, das Getränk blass goldfarben. Daneben ein paar Walnüsse und frische Zwetschgen.' },
  'vieille-pomme': { vorschlag: 'Vieille Pomme mit Ginger Beer',
    farbe: 'blass strohfarben',
    szene: 'Vieille Pomme mit Ginger Beer im Longdrinkglas auf viel Eis, das Getränk blass goldgelb und perlend, eine Limettenspalte am Glasrand. Daneben ein halber Apfel.' },
  hunnegdrepp: { vorschlag: 'Hunnegdrëpp-Sour',
    farbe: 'tiefes Honiggold',
    szene: 'Ein Hunnegdrëpp-Sour im Tumbler auf frischem Eis, das Getränk honiggolden und leicht trüb, ohne Schaum, ein Streifen Zitronenschale am Glasrand. Daneben ein kleines Schälchen Honig.' },
  kraeiderdrepp: { vorschlag: 'Kräiderdrëpp-Tonic mit Gurkenscheiben',
    szene: 'Ein Kräiderdrëpp-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, 4 dünne Gurkenscheiben im Glas. Das Getränk ist klar und perlt leicht. Daneben ein paar frische Kräuterzweige.' },
  kuerbisdrepp: { vorschlag: 'Kürbissuppe mit einem Schuss Kürbisdrëpp',
    szene: 'Ein tiefer Suppenteller mit orangefarbener, cremiger Kürbissuppe, eine Spirale Sahne, geröstete Kürbiskerne obenauf. Daneben eine Scheibe Kürbiskernbrot. Dampf nur ganz dezent, kein Eis.' },
  grain: { vorschlag: 'Grain mit Apfelsaft auf Eis',
    szene: 'Grain mit Apfelsaft im Longdrinkglas auf viel Eis, das Getränk naturtrüb goldgelb, eine Apfelscheibe am Glasrand. Im unscharfen Hintergrund ein Brett mit Bauernbrot.' },
  hondsaarsch: { vorschlag: 'Hondsaarsch-Tonic mit Orangenschale',
    szene: 'Ein Hondsaarsch-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, ein Streifen Orangenschale im Glas. Das Getränk ist klar und perlt leicht. Im unscharfen Hintergrund ein heller Salat.' },
  kiwibeeren: { vorschlag: 'Kiwibeeren-Spritz mit Crémant',
    szene: 'Ein Kiwibeeren-Spritz im großen Weinglas auf viel Eis, das Getränk fast klar und perlend, eine Limettenscheibe im Glas. Daneben ein paar kleine, glatte grüne Kiwibeeren.' },
  poire: { vorschlag: 'Poire mit Ginger Beer',
    szene: 'Poire mit Ginger Beer im Longdrinkglas auf viel Eis, das Getränk blass goldgelb und perlend, eine Limettenspalte am Glasrand. Daneben eine reife Birne.' },
  neelchesbiren: { vorschlag: 'Neelchesbiren-Tonic mit Zitronenschale',
    farbe: 'blass strohfarben',
    szene: 'Ein Neelchesbiren-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, ein Streifen Zitronenschale im Glas. Das Getränk ist blass strohfarben und perlt leicht.' },
  lenschouren: { vorschlag: 'Lënschouren über Vanilleeis',
    szene: 'Eine gekühlte Dessertschale mit 2 bis 3 Kugeln Vanilleeis, leicht angeschmolzen, darüber gehackte Nüsse. Daneben unscharf eine Tasse Espresso. Kein Longdrink.' },
  vullekiischt: { vorschlag: 'Vullekiischt-Tonic mit Zitronenschale',
    szene: 'Ein Vullekiischt-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, ein Streifen Zitronenschale im Glas. Das Getränk ist klar und perlt leicht. Daneben ein kleiner Zweig roter Vogelbeeren.' },
  schleiwen: { vorschlag: 'Schléiwen-Sour',
    szene: 'Ein Schléiwen-Sour im Tumbler auf frischem Eis, das Getränk hell und leicht trüb, ohne Schaum, ein Streifen Zitronenschale am Glasrand. Daneben ein paar blauschwarze Schlehen.' },
  vizdrepp: { vorschlag: 'Vizdrëpp-Tonic mit Apfelscheiben',
    farbe: 'blasses Goldgelb',
    szene: 'Ein Vizdrëpp-Tonic im Longdrinkglas, bis oben mit Eiswürfeln, 3 dünne Apfelscheiben im Glas. Das Getränk ist sehr hell, blass goldgelb schimmernd und perlend.' },
  sambuca: { vorschlag: 'Sambuca mit Kaffeebohnen',
    szene: 'Ein kleines Likörglas mit klarem Sambuca, 3 Kaffeebohnen darin. Daneben eine Tasse Espresso und ein Mandelgebäck. Kein Eis.' },
  limoncello: { vorschlag: 'Limoncello-Spritz mit Crémant',
    farbe: 'leuchtendes Gelbgrün',
    szene: 'Ein Limoncello-Spritz im großen Weinglas auf viel Eis, das Getränk hellgelb und perlend, ein frischer Minzzweig im Glas. Daneben eine halbe Zitrone.' },
};

// ---------- Daten laden und prüfen ----------
const etik = JSON.parse(fs.readFileSync(rel('v2', 'data', 'etiketten.json'), 'utf8')).etiketten;
const existiert = (p) => fs.existsSync(rel(p));

const WORTGRENZE = 200;
const eintraege = [];
const ids = Object.keys(AUSWAHL);
if (PRODUKTE.length !== ids.length || !PRODUKTE.every((p) => AUSWAHL[p.id])) fail(`Auswahl (${ids.length}) deckt nicht alle ${PRODUKTE.length} Sorten aus produkte.js ab`);

for (const p of PRODUKTE) {
  const a = AUSWAHL[p.id];
  if (!a) continue;
  const liste = SERVIERVORSCHLAEGE[p.id] || [];
  const idx = liste.findIndex((v) => v.name === a.vorschlag);
  if (idx < 0) { fail(`${p.id}: Serviervorschlag „${a.vorschlag}“ nicht in serviervorschlaege.js (vorhanden: ${liste.map((v) => v.name).join(' | ')})`); continue; }
  const v = liste[idx];
  if (KI_BILDER[p.id] !== a.vorschlag) fail(`${p.id}: site/data/ki-bilder.js nennt „${KI_BILDER[p.id]}“, Auswahl hier „${a.vorschlag}“`);
  // Glasform bzw. Gefäß aus den Daten muss in der Szene vorkommen (Longdrinkglas, Tumbler, Weinglas, Suppenteller, ...)
  if (!a.szene.toLowerCase().includes(v.glas.toLowerCase())) fail(`${p.id}: Glasform „${v.glas}“ aus den Daten steht nicht in der Szene`);
  const fl = FLUESSIGKEIT[p.id];
  if (!fl) { fail(`${p.id}: kein Eintrag in fluessigkeit.js`); continue; }
  let farbe = a.farbe;
  if (fl.klar) farbe = 'klar wie Wasser';
  if (!farbe) { fail(`${p.id}: keine Farbbeschreibung (fluessigkeit.js: ${fl.farbe}, nicht klar)`); continue; }

  // Etikett / Anhänge: Anhang 2 ist für alle Sorten das flache Etikett, Anhang 1 das Flaschenfoto der Sorte (sonst Standardvorlage je Typ)
  const eintrag = etik.find((e) => e.sorte === p.id && e.verwendet);
  const typ = eintrag && eintrag.flaschentyp;
  if (!typ || !VORLAGE[typ]) { fail(`${p.id}: kein Flaschentyp in etiketten.json`); continue; }
  const flach = etik.find((e) => e.sorte === p.id && e.variante === 'standard' && e.art === 'flach' && e.verwendet);
  if (!flach) { fail(`${p.id}: kein flaches Etikett in etiketten.json`); continue; }
  const vorlage = flaschenVorlage(p.id, p.kurzname, typ);
  const anhang1 = vorlage.datei, anhang2 = `Fertige Etiquetten/${flach.datei}`;
  for (const f of [anhang1, anhang2]) if (!existiert(f)) fail(`${p.id}: Datei fehlt: ${f}`);

  // Flaschenregel
  const FLASCHE = `Neben dem Getränk steht scharf die Flasche${typ === 'karaffe' ? ' (Karaffe)' : ''} in der Form von Anhang 1 (ohne deren Etikett). Das Etikett aus Anhang 2 unverändert übernehmen, nicht neu zeichnen oder schreiben, kein Buchstabe anders: Es legt sich wie ein echtes Etikett um die halbe Flasche, Rundung sichtbar, Ränder laufen seitlich weg, Text mittig, frontal, lesbar.`;
  const NEGATIV = 'Negativ: verändertes oder neu geschriebenes Etikett, zweite Flasche, Fantasieschrift.';
  const prompt = [
    `Erstelle ein Foto. ${STIL}`,
    `Szene: ${a.szene}`,
    `Flasche: ${FLASCHE}`,
    `Farbe des Brandes in der Flasche: ${farbe}.`,
    NEGATIV,
  ].join('\n');
  const woerter = prompt.split(/\s+/).filter(Boolean).length;
  if (woerter > WORTGRENZE) fail(`${p.id}: Prompt hat ${woerter} Wörter (Grenze ${WORTGRENZE})`);

  const hinweise = ['Etikett im Bild mit Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Adresse, Grafik).', 'Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“', 'Bleibt der Text falsch: Bild ohne Text nehmen und das Etikett später im Bildeditor einsetzen.'];
  if (fl.geschaetzt) hinweise.push(`Flüssigkeitsfarbe der Flasche ist in den Daten nur geschätzt (fluessigkeit.js: ${fl.farbe}); mit dem echten Produkt abgleichen.`);
  if (typ === 'karaffe') hinweise.push('Anhang 1 ist ein Gruppenfoto: nur die dunkle Karaffe vorn links als Formvorlage nutzen, deren Etikett nicht übernehmen.');
  if (vorlage.foto) hinweise.push('Anhang 1 ist das echte Flaschenfoto der Sorte (teils mit älterem Etikett): nur Form und Verschluss nutzen, das Etikett kommt aus Anhang 2.');
  if (p.id === 'vieux-marc') hinweise.push('Im Rezept steht „Vieux Marc direkt in die Tasse geben oder separat dazu reichen“; im Bild steht der Vieux Marc separat im kleinen Glas, damit die Farbe sichtbar ist.');

  eintraege.push({
    id: p.id, name: p.name, vorschlag: v.name, typ: v.typ, glas: v.glas, position: idx + 1, anzahlVorschlaege: liste.length,
    dateiname: `fotos-ki/${p.id}-1.png`, anhang1, anhang2, anhang1Hinweis: vorlage.hinweis,
    flaschentyp: typ, anhang1Foto: vorlage.foto, farbe, woerter, prompt, hinweise,
  });
}

// ---------- Platzhalter aus dist/ (nur lesen, nur deutsche Seiten) ----------
const dec = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
const text = (h) => dec(h.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
function seiten() {
  const out = [];
  const d = rel('dist');
  if (!fs.existsSync(d)) return out;
  const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).forEach((e) => {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) { if (!(dir === d && e.name === 'fr')) walk(f); }
    else if (e.name === 'index.html') out.push(f);
  });
  walk(d);
  return out.sort();
}
const gewaehlt = new Map(eintraege.map((e) => [e.id, e.vorschlag]));
const nameVonId = Object.fromEntries(PRODUKTE.map((p) => [p.id, p.name]));
const platz = [];
const eingebaut = eintraege.filter((e) => existiert(`fotos-ki/${e.id}-1.png`) && fs.existsSync(rel('dist', 'img', `ki-${e.id}-480.avif`))).length;
for (const f of seiten()) {
  const html = fs.readFileSync(f, 'utf8');
  const url = '/' + path.relative(rel('dist'), path.dirname(f)).split(path.sep).filter(Boolean).join('/');
  const m = url.match(/^\/brand\/([^/]+)$/);
  const sorteId = m ? m[1] : null;
  const re = /<(div|span)\b([^>]*)data-todo="foto"([^>]*)>/g;
  let t;
  while ((t = re.exec(html))) {
    const attr = t[2] + t[3];
    const klasse = (attr.match(/class="([^"]*)"/) || [, ''])[1];
    const rest = html.slice(t.index + t[0].length);
    const ende = t[1] === 'div' ? rest.indexOf('</div>') : rest.indexOf('</span></span>');
    const inhalt = text(rest.slice(0, ende < 0 ? 300 : ende));
    const z = { seite: url === '/' ? '/ (Startseite)' : url + '/', sorte: sorteId ? nameVonId[sorteId] || sorteId : '', sorteId };
    if (/panel-foto/.test(klasse)) {
      const name = inhalt.replace(/^Foto folgt:\s*/, '');
      const ki = sorteId && gewaehlt.get(sorteId) === name;
      Object.assign(z, { art: 'Serviervorschlag', name, ki: ki ? 'KI (gewählt)' : 'später/echt' });
      if (!ki && !(SERVIERVORSCHLAEGE[sorteId] || []).some((v) => v.name === name)) z.ki += ' (Name nicht in Daten)';
    } else if (/etikett-platzhalter/.test(klasse)) {
      Object.assign(z, { art: 'Etikett (Platzhalter)', name: inhalt, ki: 'nein, echtes Etikett' });
    } else if (/schritt-foto/.test(klasse)) {
      Object.assign(z, { art: 'Prozessbild', name: inhalt.replace(/^Foto nötig:\s*/, ''), ki: 'nein, echtes Foto' });
    } else if (/karte-platzhalter/.test(attr) || /karte-platzhalter/.test(klasse)) {
      Object.assign(z, { art: 'Etikett in Karte', name: inhalt, ki: 'nein, echtes Etikett' });
    } else if (/karte-platz/.test(klasse)) {
      Object.assign(z, { art: 'Kartenansicht', name: inhalt, ki: 'nein, echte Karte' });
    } else {
      Object.assign(z, { art: 'Sonstiges', name: inhalt, ki: 'nein' });
    }
    platz.push(z);
  }
}

// ---------- Ausgabe ----------
const md = [];
const kopf = `# Prompts für KI-Fotos (ChatGPT) – Serviervorschläge

Erzeugt mit \`node tools/foto_prompts.mjs\` aus den Daten der Seite. Nicht von Hand ändern, sondern das Skript anpassen und neu laufen lassen.
Die Bilder sind **Symbolbilder** (unter dem Bild steht „Symbolbild: Serviervorschlag“; eingebaut über \`site/data/ki-bilder.js\`). Beginn: ${eintraege.length} Bilder, eins pro Sorte, im Querformat 4:3.

## So geht es in 5 Schritten

1. **Neuen Chat öffnen** (ChatGPT mit Bildgenerierung). Pro Sorte immer einen **neuen** Chat, sonst kippt der Stil.
2. **Zwei Bilder anhängen:** Anhang 1 = Flaschenvorlage (das Flaschenfoto der Sorte aus \`Fotos/\`, sonst eine Standardvorlage je Flaschentyp), Anhang 2 = flaches Etikett der Sorte (für alle 29 Sorten vorhanden). Der genaue Dateiname steht bei jeder Sorte.
3. **Prompt einfügen:** den Text im Kasten der Sorte kopieren (Kopier-Symbol am Kasten) und im Chat absenden.
4. **Ergebnis prüfen:** Etikett im Bild Wort für Wort mit dem Anhang vergleichen, dazu Glas, Garnitur, Eis und Flüssigkeitsfarbe. KI verfälscht gern Schrift. Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ Hilft das nicht, das Etikett später im Bildeditor einsetzen.
5. **Speichern** unter dem Dateinamen, der bei der Sorte steht (\`fotos-ki/<sorten-id>-1.jpg\`).

## Stilblock (gemeinsam für alle Bilder)

Steht in jedem Prompt unten vollständig mit drin, damit jeder Kasten für sich kopierbar ist.

\`\`\`
${STIL}
\`\`\`

Gegenüber der ersten Fassung ergänzt, ohne den Charakter zu ändern: saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Der Brand selbst wird nicht verändert und nichts hinzuerfunden: Zutaten und Garnituren stammen aus den Rezeptentwürfen der Sortenseite (Entwürfe, vom Brenner noch zu bestätigen).

**Gewählt wurde je Sorte der fotogenste Serviervorschlag, möglichst Longdrink, Cocktail oder Gericht statt Pur.** Der Titel steht bei jeder Sorte; auf der Sortenseite ersetzt das Bild den Platzhalter „Foto folgt: <Titel>“, sobald \`fotos-ki/<id>-1.png\` vorliegt.
`;
md.push(kopf);
eintraege.forEach((e, i) => {
  const a2 = `\`${e.anhang2}\``;
  md.push(`---

## ${i + 1}. ${e.name}

- **Serviervorschlag:** ${e.vorschlag} (${e.typ}), Nr. ${e.position} von ${e.anzahlVorschlaege} auf der Sortenseite
- **Ergebnis speichern als:** \`${e.dateiname}\`
- **Anhang 1 (${e.anhang1Hinweis}):** \`${e.anhang1}\`
- **Anhang 2 (Etikett):** ${a2}
- **Prompt:** ${e.woerter} Wörter

\`\`\`
${e.prompt}
\`\`\`

**Prüfen:**
${e.hinweise.map((h) => `- ${h}`).join('\n')}
`);
});
md.push(`---

## Übersicht

| Sorte | Serviervorschlag | Dateiname | Anhang 1 | Anhang 2 |
|---|---|---|---|---|
${eintraege.map((e) => `| ${e.name} | ${e.vorschlag} | \`${e.dateiname}\` | \`${e.anhang1}\` | \`${e.anhang2}\` |`).join('\n')}
`);

const pl = [];
pl.push(`# Foto-Platzhalter der deutschen Seiten

Erzeugt mit \`node tools/foto_prompts.mjs\` aus \`dist/**/index.html\` (ohne \`dist/fr\`) und den Sortendaten. Stand der gebauten Seiten beim Lauf des Skripts.

**${platz.length} Platzhalter** (\`data-todo="foto"\`), davon ${platz.filter((x) => x.ki.startsWith('KI')).length} per KI vorgesehen und noch ohne Bild. **${eingebaut} KI-Symbolbilder sind bereits eingebaut** (\`fotos-ki/<id>-1.png\`, ein Serviervorschlag je Sorte, siehe \`PROMPTS-FOTOS.md\`) und zählen nicht mehr als Platzhalter. Prozess-, Karten- und Etikettenbilder sind bewusst nicht per KI.

| Seite | Sorte | Art | Stelle / Name | Vorgesehen |
|---|---|---|---|---|
${platz.map((x) => `| ${x.seite} | ${x.sorte || 'Startseite'} | ${x.art} | ${x.name} | ${x.ki} |`).join('\n')}
`);

const json = eintraege.map((e) => ({ id: e.id, name: e.name, vorschlag: e.vorschlag, typ: e.typ, dateiname: e.dateiname, anhang1: e.anhang1, anhang2: e.anhang2, prompt: e.prompt, hinweise: e.hinweise }));

if (fehler.length) {
  console.error('FEHLER:\n' + fehler.map((m) => ' - ' + m).join('\n'));
  process.exit(1);
}
fs.writeFileSync(rel('PROMPTS-FOTOS.md'), md.join('\n'));
fs.writeFileSync(rel('FOTO-PLATZHALTER.md'), pl.join('\n'));
fs.writeFileSync(rel('tools', 'foto-prompts.json'), JSON.stringify(json, null, 2) + '\n');
const maxW = Math.max(...eintraege.map((e) => e.woerter));
console.log(`OK: ${eintraege.length} Prompts (längster: ${maxW} Wörter), ${platz.length} Platzhalter (${platz.filter((x) => x.ki.startsWith('KI')).length} per KI), alle Anhang-Dateien vorhanden.`);
