// Erzeugt die ChatGPT-Prompts "neue Produktflasche in anderer Größe als 0,5 L mit aktuellem Etikett", je (Sorte, Größe) einer.
// Aufruf: node tools/foto_prompts_groessen.mjs   (nach node tools/foto_prompts_flaschen.mjs, vor node tools/chatgpt_stapel.mjs)
//   Exit-Code 1, wenn die Anzahl nicht stimmt, eine Anhangdatei fehlt, ein Zielname doppelt vorkommt, ein Prompt zu lang ist oder zu einer Form/Größe keine Basis definiert ist.
// Liest (nur lesend): site/data/produkte.js (varianten[].preise[].menge), etiketten.js, flaschen.js, flaschenfotos.js, Fertige Etiquetten/, fotos-basis/ (Existenzprüfung),
//   fotos-flaschen/ (nur Existenzprüfung für den Status; der Ordner wird NICHT angelegt)
// Schreibt: PROMPTS-GROESSEN.md, tools/foto-prompts-groessen.json
// Anhang 1 = leere Basisflasche aus fotos-basis/ (Form und Proportionen; wo es keine Flasche der Größe gibt: Ersatz, Maßstab steht im Prompt; rund 0,2 L: Datei identisch mit rund 0,5 L),
// Anhang 2 = das flache 0,5-L-Etikett der Sorte; im Prompt wird nur die Mengenangabe ersetzt.
// Je Sorte zählt jede Menge einmal, auch wenn mehrere Varianten sie führen. Menge 0,5 L ist Sache von tools/foto_prompts_flaschen.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PRODUKTE } from '../site/data/produkte.js';
import { ETIKETTEN } from '../site/data/etiketten.js';
import { FLASCHENTYP } from '../site/data/flaschen.js';
import { FLASCHEN_ORDNER, FLASCHEN_FORMAT } from '../site/data/flaschenfotos.js';
import { ADRESSE, woerter, SORTEN, GLASSTOPFEN, BASIS_SCHLANK_05, HALS_BAND, HALS_UNBESTAETIGT, halsText, satzFormat, satzEtikett, satzSchluss } from './foto_gemeinsam.mjs';

const wurzel = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const rel = (...t) => path.join(wurzel, ...t);
const existiert = (p) => fs.existsSync(rel(p));
const fehler = [];
const fail = (m) => fehler.push(m);
// Der Flaschen-Generator hat 230 (Etikett- und Halsband-Baustein gehören fest dazu; dort längster Prompt 228). Hier kommen Mengenangabe, Etikett-Skalierung und
// bei Ersatzbasis der Maßstab dazu; dafür ist die Orientierung kürzer und der Zusatz „Es entsteht eine ...-Flasche“ entfällt. Ohne Anhebung blieben 35 von 42 Prompts unter 240;
// nur die sieben runden 0,2-L-Prompts (langes Halsband, Sortenkappe, Maßstab, Mengenangabe) liegen bei 243 bis 248. Grenze deshalb 250 statt 240; Wörter nicht gekürzt, damit
// Etikett-, Halsband- und Nachbesserungsbaustein unverändert bleiben.
const WORTGRENZE = 250;
const ERWARTET = { '0,1 L': 13, '0,2 L': 7, '0,7 L': 7, '1 L': 8, '1,5 L': 7 };
const ERWARTET_GESAMT = Object.values(ERWARTET).reduce((a, b) => a + b, 0); // 42

// ---------- Größen ----------
// Dateisuffix und Schreibweise der Mengenangabe auf dem Etikett (kleines l wie auf dem 0,5-L-Etikett: „0,5 l“)
const GROESSEN = {
  '0,1 L': { suffix: '0-1l', etikett: '0,1 l' },
  '0,2 L': { suffix: '0-2l', etikett: '0,2 l' },
  '0,7 L': { suffix: '0-7l', etikett: '0,7 l' },
  '1 L': { suffix: '1-0l', etikett: '1 l' },
  '1,5 L': { suffix: '1-5l', etikett: '1,5 l' },
};

// ---------- Basisfoto je Form und Größe ----------
// ersatz = es gibt kein Foto genau dieser Form und Größe (schlank 0,7 L und 1 L); massstab sagt, wie die Zielflasche zur Basis steht (nur ungefähres Verhältnis, keine Maße)
// massstab ohne ersatz: das Basisfoto trägt die Größe (rund 0,2 L), ist aber dasselbe Bild wie 0,5 L; der Maßstab bleibt im Prompt.
// verschluss = null: Verschluss der Sorte aus SORTEN (runde 0,2 L, Karaffe); sonst fest (so wie die Basisfotos ihn zeigen)
const KORKEN = 'heller Naturkorken wie in Anhang 1';
const FORM_TEXT = {
  schlank: 'leere schlanke Flasche ohne Etikett, nur Form und Proportionen',
  rund: 'leere runde Flasche ohne Etikett, nur Form und Proportionen',
  karaffe: 'leere Karaffe ohne Etikett (Glas im Foto klar, Glasfarbe und Verschluss wie weiter unten beschrieben), nur Form und Proportionen',
};
const BASIS = {
  'schlank|0,1 L': { a1: 'fotos-basis/schlank-0-1l.png', verschluss: 'Holzkugel auf Korkschaft wie in Anhang 1' },
  'schlank|0,7 L': { a1: BASIS_SCHLANK_05, ersatz: true, massstab: 'etwas höher und voller als in Anhang 1, 0,7-L-Flasche derselben schlanken Form', verschluss: GLASSTOPFEN },
  'schlank|1 L': { a1: BASIS_SCHLANK_05, ersatz: true, massstab: 'deutlich größer als in Anhang 1, 1-L-Flasche derselben schlanken Form', verschluss: GLASSTOPFEN },
  'rund|0,2 L': { a1: 'fotos-basis/rund-0-2l.png', massstab: 'deutlich kleiner als die 0,5-L-Flasche in Anhang 1, etwa halbe Höhe, 0,2-L-Flasche derselben Form', verschluss: null },
  'rund|1 L': { a1: 'fotos-basis/rund-1-0l.png', verschluss: KORKEN },
  'rund|1,5 L': { a1: 'fotos-basis/rund-1-5l.png', verschluss: KORKEN },
  'karaffe|0,7 L': { a1: 'fotos-basis/karaffe-0-7l.png', verschluss: null },
};

// ---------- Einträge aus der Preisliste ----------
const eintraege = [];
for (const p of PRODUKTE) {
  const mengen = [...new Set(p.varianten.flatMap((v) => v.preise.map((x) => x.menge)))].filter((m) => m !== '0,5 L');
  for (const menge of mengen) {
    const g = GROESSEN[menge];
    if (!g) { fail(`${p.id}: unbekannte Größe „${menge}“`); continue; }
    const s = SORTEN[p.id];
    if (!s) { fail(`${p.id}: keine Sortenangabe`); continue; }
    const form = FLASCHENTYP[p.id];
    const basis = BASIS[`${form}|${menge}`];
    if (!basis) { fail(`${p.id} ${menge}: keine Basis für Form „${form}“`); continue; }
    const a2 = ETIKETTEN[p.id] ? `Fertige Etiquetten/${ETIKETTEN[p.id]}` : null;
    if (!a2) fail(`${p.id}: kein flaches Etikett`);
    const ziel = `${FLASCHEN_ORDNER}/${p.id}-${g.suffix}.png`;
    eintraege.push({ id: `${p.id}-${g.suffix}`, sorteId: p.id, name: p.name, menge, g, s, form, basis, a1: basis.a1, a2, ziel, status: existiert(ziel) ? 'vorhanden' : 'offen' });
  }
}
const proGroesse = {};
for (const e of eintraege) proGroesse[e.menge] = (proGroesse[e.menge] || 0) + 1;
for (const [m, n] of Object.entries(ERWARTET)) if ((proGroesse[m] || 0) !== n) fail(`Größe ${m}: ${proGroesse[m] || 0} Prompts, erwartet ${n}`);
if (eintraege.length !== ERWARTET_GESAMT) fail(`Gesamtzahl ${eintraege.length}, erwartet ${ERWARTET_GESAMT}`);

// ---------- Prompt ----------
const FORMAT = `${FLASCHEN_FORMAT.w} × ${FLASCHEN_FORMAT.h} Pixel`;
function baue(e) {
  const { s, basis, form, g, sorteId } = e;
  const verschluss = basis.verschluss || s.verschluss;
  const massstab = basis.massstab ? ` Größe: ${basis.massstab}.` : '';
  const t = [
    satzFormat(FORMAT),
    `Form und Proportionen orientieren sich an Anhang 1 (${FORM_TEXT[form]}); nur Orientierung, nicht kopieren.${massstab}`,
    `Verschluss: ${verschluss}. ${halsText(sorteId)} ${sorteId === 'vieux-marc' ? `Glas: ${s.fl}.` : `Flüssigkeit: ${s.fl}, bis zum Hals gefüllt.`}`,
    `${satzEtikett()} Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „${g.etikett}“; sonst keine Änderung am Etikett.`,
    satzSchluss(e.ziel, 'Ausnahme bleibt die Mengenangabe.'),
  ];
  return t.join(' ').replace(/\s+/g, ' ').trim();
}

// ---------- Hinweise ----------
const hinweisBasis = (e) => (e.basis.ersatz ? `Basis weicht ab (Größe): ${e.a1} zeigt die schlanke 0,5-L-Flasche, die Zielgröße ist nur über den Maßstab im Prompt beschrieben` : '');
const problem = (e) => {
  const l = [];
  if (e.basis.ersatz) l.push(`Basis weicht ab (Größe): ${e.a1} ist nicht die ${e.menge}-Flasche; Maßstab nur über die Beschreibung`);
  if (e.a1 === 'fotos-basis/rund-0-2l.png') l.push('Datei identisch mit fotos-basis/rund-0-5l.png (0,5-L-Flasche): Größe nur über den Maßstab im Prompt');
  if (e.sorteId === 'vieux-marc') l.push('Basisfoto zeigt klares Glas und Glasstopfen; Braunglas und Ausgießer nur über die Beschreibung');
  if (e.basis.verschluss === null && e.form === 'rund') l.push('Basisfoto zeigt einen Korken, die Sorte hat eine andere Kappe: Kappe nur über die Beschreibung');
  return l.join('; ');
};

for (const e of eintraege) {
  e.prompt = baue(e);
  e.woerter = woerter(e.prompt);
  e.problem = problem(e);
  if (e.woerter > WORTGRENZE) fail(`${e.id}: Prompt ${e.woerter} Wörter (Grenze ${WORTGRENZE})`);
  for (const f of [e.a1, e.a2]) if (!f || !existiert(f)) fail(`${e.id}: Anhang fehlt: ${f}`);
  for (const muss of [e.ziel, ADRESSE, 'Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.', `statt „0,5 l“ steht „${e.g.etikett}“`]) if (!e.prompt.includes(muss)) fail(`${e.id}: Prompt enthält nicht: ${muss}`);
}
const namen = new Set();
for (const e of eintraege) { if (namen.has(e.ziel)) fail(`Zielname doppelt: ${e.ziel}`); namen.add(e.ziel); }
if (fehler.length) { console.error('FEHLER:\n' + fehler.map((m) => ' - ' + m).join('\n')); process.exit(1); }

// ---------- Ausgabe ----------
const pruef = (e) => {
  const l = [
    `Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „${ADRESSE}“); **einzige erlaubte Abweichung: die Mengenangabe „${e.g.etikett}“ statt „0,5 l“**. Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern`,
    `Mengenangabe auf dem Etikett lautet „${e.g.etikett}“ (nicht „0,5 l“)`,
    'Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum',
    `Format Hochformat ${FLASCHEN_FORMAT.w} × ${FLASCHEN_FORMAT.h}; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %`,
    e.basis.massstab ? `Größenverhältnis plausibel: ${e.basis.massstab}; Etikett mitskaliert, in der unteren Hälfte` : 'Etikett proportional zur Flasche, in der unteren Hälfte',
    e.sorteId === 'vieux-marc' ? `Glas: ${e.s.fl}` : `Flüssigkeit: ${e.s.fl}, bis zum Hals gefüllt`,
    'Das Foto aus Anhang 1 wurde nicht übernommen (keine zweite Flasche, Verschluss und Farbe wie im Prompt)',
    HALS_BAND[e.sorteId] ? `Halsband vorhanden und passend: ${HALS_BAND[e.sorteId]}${HALS_UNBESTAETIGT.includes(e.sorteId) ? ' (unbestätigt, kein eigenes Foto)' : ''}` : 'Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)',
  ];
  const b = hinweisBasis(e);
  if (b) l.push(b);
  return l;
};
const hinweise = (e) => [...(e.basis.ersatz ? ['Basis weicht ab (Größe)'] : []), ...pruef(e)];
const nOffen = eintraege.filter((e) => e.status === 'offen').length;
const nVorh = eintraege.filter((e) => e.status === 'vorhanden').length;
const uebersicht = Object.keys(GROESSEN).map((m) => `${m}: ${proGroesse[m]}`).join(', ');
const md = [];
md.push(`# PROMPTS-GROESSEN: neue Produktflasche in anderen Größen mit aktuellem Etikett (ChatGPT)

Erzeugt mit \`node tools/foto_prompts_groessen.mjs\`. Nicht von Hand ändern. ${eintraege.length} Prompts, je (Sorte, Größe) einer, für alle Größen der Preisliste außer 0,5 L (die stehen in \`PROMPTS-FLASCHEN.md\`): ${uebersicht}. **ChatGPT erzeugt eine NEUE, saubere Produktflasche** (Hochformat ${FLASCHEN_FORMAT.w} × ${FLASCHEN_FORMAT.h} Pixel, heller neutraler Studiogrund) mit dem aktuellen Etikett; kein Foto wird bearbeitet. Anhang 1 = leere Basisflasche ohne Etikett aus \`fotos-basis/\` (nur Form und Proportionen), Anhang 2 = das flache 0,5-L-Etikett aus \`Fertige Etiquetten/\`. Auf dem Etikett wird nur die Mengenangabe geändert („0,5 l“ wird zur Größe der Flasche); das Etikett wird proportional zur Flasche skaliert und sitzt in der unteren Hälfte.

Die Ergebnisse gehören als PNG unter dem Namen aus der Tabelle (\`<sorten-id>-<größe>.png\`, Größe als \`0-1l\`, \`0-2l\`, \`0-7l\`, \`1-0l\`, \`1-5l\`) in den Ordner \`fotos-flaschen/\` im Repo (den legt der Nutzer an; das Skript legt ihn nicht an). Die Sortenseite tauscht beim Wählen einer Größe das Bild im Kopf gegen das Bild dieser Größe, wenn eines existiert (\`site/lib/brand.mjs\`, \`site/assets/js/site.js\`).

**Basisfotos:** Es gibt kein Foto für schlank 0,7 L und schlank 1 L. Dort dient die schlanke 0,5-L-Flasche als Ersatz (Hinweis „Basis weicht ab (Größe)“); die Zielgröße steht nur als ungefähres Verhältnis im Prompt („etwas höher und voller“, „deutlich größer“), keine Maße. Für rund 0,2 L ist \`fotos-basis/rund-0-2l.png\` hinterlegt, diese Datei ist aber identisch mit \`fotos-basis/rund-0-5l.png\` (zeigt also die 0,5-L-Flasche); die Maßstabszeile „deutlich kleiner als die 0,5-L-Flasche“ bleibt deshalb im Prompt. Das Ergebnis kann in den Proportionen abweichen. \`fotos-basis/rund-40ml.png\` (Miniatur) wird nicht verwendet.

**Verschluss:** schlank 0,1 L Holzkugel auf Korkschaft (wie das Basisfoto), schlank 0,7 L und 1 L Glasstopfen (wie bei 0,5 L), rund 1 L und 1,5 L heller Naturkorken (wie die Basisfotos), runde 0,2 L und Vieux Marc die Kappe bzw. der Ausgießer der Sorte (wie bei 0,5 L; die Basisfotos zeigen Korken bzw. Glasstopfen).

**Stand:** ${nOffen} offen, ${nVorh} vorhanden (Datei \`<id>-<größe>.png\` in \`fotos-flaschen/\`).

Automatisch abarbeiten: \`CHATGPT-STAPEL.md\` (Gruppe \`groessen\`, Ausgabe Hochformat).

## So geht es

1. Neuen Chat öffnen (ChatGPT mit Bildgenerierung), pro Eintrag ein neuer Chat.
2. Beide Anhänge hochladen (Pfade siehe Tabelle) und den Prompt aus dem Kasten einfügen.
3. Ergebnis mit der Prüfliste unter dem Kasten prüfen. Bei einer Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern.
4. Als PNG unter dem Namen aus der Spalte „Zieldatei“ in \`fotos-flaschen/\` speichern.

## Übersicht

| Sorte | Größe | Anhang 1 (nur Orientierung) | Anhang 2 (Etikett) | Zieldatei | Hinweis zur Basis |
|---|---|---|---|---|---|
${eintraege.map((e) => `| ${e.name} | ${e.menge} | \`${e.a1}\` | \`${e.a2}\` | \`${e.ziel}\` | ${e.problem || '–'} |`).join('\n')}

## Unsicherheiten (ehrlich)

- **Etikett Wort für Wort:** Dass ChatGPT Sortenname, Alkoholangabe, Grafik und die feste Adresszeile fehlerfrei übernimmt und dabei nur die Mengenangabe ändert, ist unsicher. Jedes Ergebnis von Hand gegen das flache Etikett prüfen.
- **Ersatzbasis (Größe):** schlank 0,7 L und schlank 1 L (Basis: schlanke 0,5-L-Flasche); rund 0,2 L hat eine eigene Basisdatei, die aber dasselbe Bild wie rund 0,5 L ist. ChatGPT muss die Größe aus dem Text ableiten; Proportionen und Etikettgröße sind nur Näherung.
- **Verschluss weicht vom Basisfoto ab:** runde 0,2 L tragen die Kappe der Sorte, nicht den Korken des Basisfotos; Vieux Marc trägt einen schwarzen Ausgießer, das Basisfoto zeigt einen Glasstopfen und klares Glas.
- **Korken bei 1 L und 1,5 L:** übernommen wie die Basisfotos; ob die echten 1-L- und 1,5-L-Flaschen der Brennerei so verschlossen sind, ist nicht bestätigt.
- **Einheitliche Position:** Standfläche bei etwa 90 % und Verschlussoberkante bei etwa 8 % hält ChatGPT erfahrungsgemäß nur ungefähr ein; bei kleinen und großen Flaschen im selben Rahmen ist die Größenwirkung dadurch begrenzt.

${eintraege.map((e, i) => `---

## ${i + 1}. ${e.name}, ${e.menge}

- **Anhang 1 (nur Orientierung):** \`${e.a1}\`${e.basis.ersatz ? ' (Ersatz, Basis weicht ab (Größe))' : ''}
- **Anhang 2 (Etikett):** \`${e.a2}\`
- **Ergebnis speichern als:** \`${e.ziel}\`
- **Status:** ${e.status}
- **Prompt:** ${e.woerter} Wörter

\`\`\`
${e.prompt}
\`\`\`

**Prüfen:**
${pruef(e).map((h) => `- ${h}`).join('\n')}
`).join('\n')}`);
fs.writeFileSync(rel('PROMPTS-GROESSEN.md'), md.join('\n') + '\n');
fs.writeFileSync(rel('tools', 'foto-prompts-groessen.json'), JSON.stringify(eintraege.map((e) => ({
  id: e.id, sorte: e.name, groesse: e.menge, dateiname: e.ziel, anhang1: e.a1, anhang2: e.a2, prompt: e.prompt,
  hinweise: hinweise(e), problem: e.problem, status: e.status, woerter: e.woerter, vorlageArt: e.basis.ersatz ? `${e.form}-ersatz` : e.form,
})), null, 2) + '\n');
const maxW = Math.max(...eintraege.map((e) => e.woerter));
console.log(`OK: ${eintraege.length} Größen-Prompts (${uebersicht}; ${nOffen} offen, ${nVorh} vorhanden), längster ${maxW} Wörter, alle Anhänge vorhanden.`);
