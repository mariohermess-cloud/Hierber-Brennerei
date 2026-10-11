// Erzeugt die ChatGPT-Bildprompts für vier neue Gruppen (Flaschen: Sorten mit Sortenseite in site/data/produkte.js; Holzkisten: nur Prompts; keine Serviervorschläge):
//   likoere (25 % vol.), holzkisten (nur mit Flaschen), geraeift (35 % vol.), weitere-braende (Status der Sorten unklar).
// Aufruf: node tools/foto_prompts_neue_gruppen.mjs   (nach foto_prompts_weitere_sorten.mjs, vor node tools/chatgpt_stapel.mjs)
//   Exit-Code 1, wenn ein Zielname doppelt vorkommt, ein Prompt zu lang ist, eine Pflichtangabe im Prompt fehlt oder ein geschütztes Markenwort vorkommt.
//   Fehlt ein Anhang (Etikett folgt noch, Basisflasche fehlt), bricht das Skript NICHT ab: der Eintrag trägt „Anhang fehlt“ und bleibt im Stapel markiert.
// Liest (nur lesend): tools/neue-gruppen.json, Fertige Etiquetten/, fotos-basis/ und fotos-flaschen/ (Existenzprüfung für Anhänge und Status)
// Schreibt: PROMPTS-NEUE-GRUPPEN.md, tools/foto-prompts-neue-gruppen.json (Feldstruktur wie foto-prompts-weitere-sorten.json, zusätzlich Feld gruppe)
// Flaschen: Hochformat 1024 x 1536, fotos-flaschen/<id>-<größe>.png (Größe IMMER im Namen, z. B. -0-5l, -0-1l). Hauptbild = 0,5 L.
// Kisten: Querformat 1448 x 1086, fotos-flaschen/<kisten-id>.png (z. B. holzkiste-6x0-1l.png, die Größe steckt in der Kisten-Id).
// Markenschutz: Die Prompts beschreiben nur die Art des Produkts und verlangen ausdrücklich, keine bekannten Markenzeichen nachzubauen.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FLASCHEN_FORMAT } from '../site/data/flaschenfotos.js';
import { ADRESSE, VERSCHLUSS, woerter, satzFormat, satzEtikett, NACHBESSERUNG } from './foto_gemeinsam.mjs';

const wurzel = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const rel = (...t) => path.join(wurzel, ...t);
const existiert = (p) => fs.existsSync(rel(p));
const fehler = [];
const fail = (m) => fehler.push(m);

const WORTGRENZE_FLASCHE = 280;
const WORTGRENZE_KISTE = 240;
const KISTE_FORMAT = { w: 1448, h: 1086 };
const FORMAT = `${FLASCHEN_FORMAT.w} × ${FLASCHEN_FORMAT.h} Pixel`;
const KEINE_MARKEN = 'Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.';
const GRUPPEN_TITEL = { likoere: 'Liköre', holzkisten: 'Holzkisten (nur mit Flaschen)', geraeift: 'Geräift', 'weitere-braende': 'Weitere Brände' };
const GROESSE_TEXT = { '0-1l': '0,1 l', '0-2l': '0,2 l', '0-5l': '0,5 l', '1-0l': '1 l' };
const GROESSE_L = { '0-1l': '0,1 L', '0-2l': '0,2 L', '0-5l': '0,5 L', '1-0l': '1 L' };

const konfig = JSON.parse(fs.readFileSync(rel('tools', 'neue-gruppen.json'), 'utf8'));
const eintraege = [];

// Basisflasche je Form und Größe: rund-<größe> falls vorhanden, sonst (nur 0,1 L, rund) schlank-0-1l; sonst die Wunschdatei (fehlt dann, wird markiert)
function basisFlasche(form, g) {
  const wunsch = `fotos-basis/${form}-${g}.png`;
  if (existiert(wunsch)) return { datei: wunsch, ersatz: false };
  if (form === 'rund' && g === '0-1l' && existiert('fotos-basis/schlank-0-1l.png')) return { datei: 'fotos-basis/schlank-0-1l.png', ersatz: true };
  return { datei: wunsch, ersatz: false };
}

// ---------- Prompts ----------
function baueFlaschePrompt(s, g, a, ziel) {
  const menge = GROESSE_TEXT[g];
  const mengeFlasche = GROESSE_L[g].replace(' ', '-') + '-Flasche';
  const formWort = s.form === 'rund' ? 'runde' : 'schlanke';
  const orient = a.basis.ersatz
    ? `leere schlanke ${mengeFlasche} ohne Etikett (Ersatz, eine runde Basis dieser Größe gibt es nicht; Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen, Flasche eher rund als schlank halten`
    : `leere ${formWort} ${mengeFlasche} ohne Etikett (Verschluss des Basisfotos nicht übernehmen), nur Form und Proportionen`;
  let etikett;
  if (a.etikettFolgt) {
    const teile = [`Name „${s.name}“`, s.art ? `Art „${s.art}“` : null, s.abv == null ? null : `„${s.abv} % vol.“`, `„${menge}“`].filter(Boolean).join(', ');
    etikett = `Auf die Flasche kommt das Etikett aus Anhang 2, es liegt noch nicht vor und wird mitgeschickt: Text nur ${teile}, nichts erfinden. Es wird unverändert übernommen (kein Buchstabe anders, Adresszeile fest „${ADRESSE}“) und legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, Glanz und Reflexe des Glases laufen über das Etikett.`;
  } else {
    const mengeSatz = g === '0-5l'
      ? 'Mengenangabe wie in Anhang 2.'
      : `Etikett proportional zur Flasche skaliert, sitzt in der unteren Hälfte. Mengenangabe auf dem Etikett: statt „0,5 l“ steht „${menge}“; sonst keine Änderung am Etikett.`;
    etikett = `${satzEtikett()} ${mengeSatz}`;
  }
  return [
    satzFormat(FORMAT),
    `Form und Proportionen orientieren sich an Anhang 1 (${orient}); nur Orientierung, nicht kopieren, nicht dessen Etikett.`,
    `${VERSCHLUSS} Kein Halsband: der Hals bleibt klares Glas. Inhalt: ${s.fluessigkeit}, bis zum Hals gefüllt.`,
    etikett,
    KEINE_MARKEN,
    `Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „${ziel}“. ${NACHBESSERUNG}`,
  ].join(' ').replace(/\s+/g, ' ').trim();
}

function baueKistePrompt(k, basisDatei, ziel) {
  const n = k.anzahl;
  return [
    `Erzeuge ein fotorealistisches Produktfoto im Querformat 4:3 (${KISTE_FORMAT.w} × ${KISTE_FORMAT.h} Pixel), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), leicht von oben.`,
    `Eine offene Holzkiste aus hellem, unbehandeltem Holz steht mittig, ganz im Bild, Luft ringsum. Sie enthält genau ${n} Flaschen (${k.flaschenText}), jede in einem eigenen Fach aus Holzstegen auf Holzwolle, alle aufrecht, Hals und Verschluss vollständig sichtbar. Der Deckel ist abgenommen und lehnt offen neben der Kiste.`,
    `Form der Flaschen wie Anhang 1 (${k.flaschenText} ohne Etikett; Anhang 2 ist dasselbe Bild); nur Form und Proportionen, nicht kopieren.`,
    `${VERSCHLUSS}`,
    `Inhalt der Flaschen: ${k.inhalt}; die Flüssigkeiten dürfen sich in der Farbe unterscheiden. Etiketten: schlichte, leere Etiketten ohne lesbaren Text, in verschiedenen Farben für verschiedene Sorten; keine Schrift, kein Name, keine Zahlen.`,
    KEINE_MARKEN,
    `Nur diese Kiste mit genau ${n} Flaschen, keine weiteren Gegenstände, kein Text auf der Kiste, kein Logo, kein Wasserzeichen. Ergebnis als PNG „${ziel}“.`,
  ].join(' ').replace(/\s+/g, ' ').trim();
}

// ---------- Einträge: Flaschen ----------
for (const s of konfig.flaschen) {
  for (const g of s.groessen) {
    const ziel = `fotos-flaschen/${s.id}-${g}.png`;
    const basis = basisFlasche(s.form, g);
    const etikettDatei = s.etikettDatei ? `Fertige Etiquetten/${s.etikettDatei}` : null;
    const etikettFolgt = !etikettDatei || !existiert(etikettDatei);
    const anhang2 = etikettFolgt ? `PLATZHALTER: Etikett von ${s.name} folgt` : etikettDatei;
    const a = { basis, etikettFolgt };
    const prompt = baueFlaschePrompt(s, g, a, ziel);
    const formName = s.form === 'rund' ? 'runde' : 'schlanke';
    eintraege.push({
      id: `${s.id}-${g}`, gruppe: s.gruppe, sorte: s.name, typ: 'flasche', format: `Hochformat ${FORMAT}`,
      dateiname: ziel, anhang1: basis.datei, anhang2, etikettFolgt,
      anhang1Text: `leere ${formName} ${GROESSE_L[g].replace(' ', '-')}-Flasche${basis.ersatz ? ' (Ersatz: schlanke 0,1-L-Flasche, es gibt keine runde)' : ''}`,
      anhang2Text: etikettFolgt ? `Etikett von ${s.name} (liegt noch nicht vor)` : 'flaches Etikett aus Fertige Etiquetten/',
      prompt, woerter: woerter(prompt), grenze: WORTGRENZE_FLASCHE,
      pflicht: [ziel, KEINE_MARKEN, VERSCHLUSS],
      hinweise: [
        etikettFolgt ? `Etikett von ${s.name} liegt noch nicht vor (Anhang 2 ist ein Platzhalter): ohne Etikett nicht erzeugen, sonst erfindet ChatGPT den Text. Sobald es da ist, in tools/neue-gruppen.json bei etikettDatei eintragen.` : 'Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, Likör-Art bzw. Alkoholangabe, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.',
        g !== '0-5l' && !etikettFolgt ? `Mengenangabe auf dem Etikett lautet „${GROESSE_TEXT[g]}“ (nicht „0,5 l“); ob das 0,5-L-Etikett diese Angabe als „0,5 l“ trägt, ist nicht geprüft (nicht verifiziert).` : null,
        `Adresszeile prüfen: „${ADRESSE}“.`,
        'Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.',
        `Format Hochformat ${FORMAT}; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.`,
        `Inhalt: ${s.fluessigkeit} (Farbe ist ein Entwurf, der Brenner bestätigt sie).`,
        basis.ersatz ? 'Anhang 1 ist die schlanke 0,1-L-Flasche (Ersatz, es gibt keine runde 0,1-L-Basis); die Form kann von den runden Flaschen der Reihe abweichen.' : null,
        basis.datei === `fotos-basis/rund-${g}.png` && g === '0-2l' ? 'fotos-basis/rund-0-2l.png ist dasselbe Bild wie rund-0-5l.png: Größe nur über die Beschreibung (nicht verifiziert).' : null,
        s.gruppe === 'geraeift' ? 'OFFENE FRAGE: Sind ganze Früchte in der Flasche sichtbar? Der Prompt verlangt einige ganze Früchte in der Flüssigkeit, sonst nichts; der Brenner bestätigt.' : null,
        s.gruppe === 'weitere-braende' ? 'Status der Sorte unklar (Preisliste/Alkohol laut Auftrag, aber keine Bestätigung, ob die Sorte geführt wird); Flüssigkeitsfarbe geschätzt.' : null,
        s.id === 'winterdreams' ? 'Saisonal; Beschreibung nur „saisonaler Likör“, nichts weiter erfunden. Farbe winterlich dunkelrot.' : null,
        KEINE_MARKEN,
      ].filter(Boolean),
    });
  }
}

// ---------- Einträge: Kisten ----------
for (const k of konfig.kisten) {
  const ziel = `fotos-flaschen/${k.id}.png`;
  const basisDatei = `fotos-basis/${k.basis}.png`;
  const prompt = baueKistePrompt(k, basisDatei, ziel);
  eintraege.push({
    id: k.id, gruppe: 'holzkisten', sorte: k.name, typ: 'kiste', format: `Querformat 4:3 (${KISTE_FORMAT.w} × ${KISTE_FORMAT.h} Pixel)`,
    dateiname: ziel, anhang1: basisDatei, anhang2: basisDatei, etikettFolgt: false,
    anhang1Text: `${k.flaschenText} ohne Etikett (Basisflasche, nur Form)`, anhang2Text: 'dasselbe Bild wie Anhang 1 (die Kiste wird nur im Prompt beschrieben, es gibt kein Kistenfoto)',
    prompt, woerter: woerter(prompt), grenze: WORTGRENZE_KISTE,
    pflicht: [ziel, KEINE_MARKEN, VERSCHLUSS],
    hinweise: [
      `Genau ${k.anzahl} Flaschen in der Kiste zählen; Kiste ganz im Bild, Deckel offen daneben.`,
      'Nur Flaschen in der Kiste, keine anderen Gegenstände; Verschluss Glasstopfen ohne Kork (auch bei den Apothekerflaschen).',
      'Etiketten leer bzw. ohne lesbaren Text: keine erfundenen Namen oder Zahlen auf den Etiketten. Kiste ohne Beschriftung.',
      `Format Querformat ${KISTE_FORMAT.w} × ${KISTE_FORMAT.h}; die Datei heißt ${ziel} (Größe steckt im Kisten-Namen; fotos_uebernehmen.mjs kennt diese Namen).`,
      'Holzart und Fachaufteilung sind Annahmen (heller Holzton, Holzstege, Holzwolle); der Brenner bestätigt, wie die echte Kiste aussieht.',
      KEINE_MARKEN,
    ],
  });
}

// ---------- Prüfungen und Status ----------
const namen = new Map();
for (const e of eintraege) {
  if (namen.has(e.dateiname)) fail(`Dateiname doppelt: ${e.dateiname} (${namen.get(e.dateiname)} und ${e.id})`);
  namen.set(e.dateiname, e.id);
  if (e.woerter > e.grenze) fail(`${e.id}: Prompt ${e.woerter} Wörter (Grenze ${e.grenze})`);
  for (const muss of e.pflicht) if (!e.prompt.includes(muss)) fail(`${e.id}: Prompt enthält nicht: ${muss}`);
  if (new RegExp('jäger' + 'meister', 'i').test(JSON.stringify(e))) fail(`${e.id}: enthält ein geschütztes Markenwort`);
  if (/\d\s*(€|euro)/i.test(e.prompt)) fail(`${e.id}: Preis im Prompt`);
  e.status = existiert(e.dateiname) ? 'vorhanden' : 'offen';
  // fehlende Anhänge (Etikett folgt, Basisflasche fehlt): nur vermerken, nicht abbrechen
  e.anhangFehlt = [...new Set([e.anhang1, e.anhang2].filter((x) => !existiert(x)))];
  if (e.anhangFehlt.length) e.hinweise.unshift(`Anhang fehlt: ${e.anhangFehlt.join(', ')}. Eintrag im ChatGPT-Stapel mit Status „Etikett fehlt“ markiert, nicht in der CSV der offenen Bilder.`);
}
if (fehler.length) { console.error('FEHLER:\n' + fehler.map((m) => ' - ' + m).join('\n')); process.exit(1); }

// ---------- Ausgabe ----------
const nOffen = eintraege.filter((e) => e.status === 'offen').length;
const nVorh = eintraege.filter((e) => e.status === 'vorhanden').length;
const nFehlt = eintraege.filter((e) => e.anhangFehlt.length).length;
const proGruppe = Object.keys(GRUPPEN_TITEL).map((g) => ({ g, n: eintraege.filter((e) => e.gruppe === g).length }));
const md = `# PROMPTS-NEUE-GRUPPEN: Liköre, Holzkisten, Geräift, weitere Brände (ChatGPT)

Erzeugt mit \`node tools/foto_prompts_neue_gruppen.mjs\` aus \`tools/neue-gruppen.json\`. Nicht von Hand ändern. ${eintraege.length} Prompts (${proGruppe.map((x) => `${GRUPPEN_TITEL[x.g]}: ${x.n}`).join(', ')}). Die Flaschen sind Sorten mit Sortenseite (Eintrag in \`site/data/produkte.js\`), die Holzkisten haben nur Prompts; keine Serviervorschläge. Alles sind Entwürfe, der Brenner bestätigt sie.

**Stand:** ${nOffen} offen, ${nVorh} vorhanden, davon ${nFehlt} mit fehlendem Anhang (Etikett liegt noch nicht vor, siehe Übersicht).

- **Liköre** (25 % vol.): je Likör ein Prompt für 0,5 L (\`<id>-0-5l.png\`) und 0,1 L (\`<id>-0-1l.png\`); Winterdreams (saisonal) nur 0,5 L, Ingwerlikör 0,2 L und 0,5 L. Anhang 2 ist das flache Etikett aus \`Fertige Etiquetten/\`, wo es eines gibt (Ingwerlikör: Etikett folgt).
- **Holzkisten (nur mit Flaschen):** Querformat ${KISTE_FORMAT.w} × ${KISTE_FORMAT.h}, Datei \`fotos-flaschen/<kisten-id>.png\`. Es gibt kein Kistenfoto; die Kiste steht nur im Prompt, Anhang 1 und 2 sind dieselbe Basisflasche.
- **Geräift** (35 % vol., 0,5 L und 0,1 L): Branntwein „op … geräift“, einige ganze Früchte in der Flüssigkeit (offene Frage, siehe unten). Etikett für Mirabelle und Quetsch aus \`Fertige Etiquetten/\`, für Williams-Birne folgt es.
- **Weitere Brände:** Neutraler Alkohol 1 L, Äppel/Pommes, Pastis, Nëssdrëpp Walnuss, Pefferminz, Quitten (je 0,5 L). **Status der Sorten unklar**; Etiketten folgen, Flüssigkeitsfarben geschätzt.
- Alle Flaschen: Glasstopfen ohne Kork (Verschluss-Zeile), Hochformat ${FORMAT}. Markenschutz: Die Prompts verlangen, keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachzubauen. Keine Preise in den Prompts.

## Offene Fragen

- Geräift: Sind ganze Früchte in der Flasche sichtbar? Der Prompt verlangt einige ganze Früchte in der Flüssigkeit, sonst nichts.
- Weitere Brände: Werden die Sorten geführt (Status unklar)? Welche Farbe hat die Flüssigkeit?
- Etiketten: für Ingwerlikör, Williams-Birne geräift und die sechs weiteren Brände liegt kein flaches Etikett vor.
- Holzkisten: Holzart, Fächer, Größe der Kiste (Annahme: heller Holzton, Holzstege, Holzwolle).
- Likör 0,1 L: Anhang 1 ist die schlanke 0,1-L-Flasche (es gibt keine runde 0,1-L-Basis).

Die Ergebnisse gehören als PNG unter dem Namen aus der Tabelle in \`fotos-flaschen/\`. Automatisch abarbeiten: \`CHATGPT-STAPEL.md\` (Gruppe \`neue-gruppen\`).

## Übersicht

| Eintrag | Gruppe | Typ | Anhang 1 | Anhang 2 | Zieldatei | Status | Wörter |
|---|---|---|---|---|---|---|---|
${eintraege.map((e) => `| ${e.id} | ${e.gruppe} | ${e.typ} | \`${e.anhang1}\`${existiert(e.anhang1) ? '' : ' (fehlt)'} | \`${e.anhang2}\`${existiert(e.anhang2) ? '' : ' (fehlt)'} | \`${e.dateiname}\` | ${e.status} | ${e.woerter} |`).join('\n')}

${eintraege.map((e, i) => `---

## ${i + 1}. ${e.sorte}: ${e.typ === 'kiste' ? 'Kiste' : `Flasche ${GROESSE_L[e.dateiname.match(/-(\d-\dl)\.png$/)[1]]}`} (${GRUPPEN_TITEL[e.gruppe]})

- **Format:** ${e.format}
- **Anhang 1:** \`${e.anhang1}\` (${e.anhang1Text})${existiert(e.anhang1) ? '' : ' **(fehlt)**'}
- **Anhang 2:** \`${e.anhang2}\` (${e.anhang2Text})${existiert(e.anhang2) ? '' : ' **(fehlt)**'}
- **Ergebnis speichern als:** \`${e.dateiname}\`
- **Status:** ${e.status}
- **Prompt:** ${e.woerter} Wörter

\`\`\`
${e.prompt}
\`\`\`

**Prüfen:**
${e.hinweise.map((h) => `- ${h}`).join('\n')}
`).join('\n')}`;
fs.writeFileSync(rel('PROMPTS-NEUE-GRUPPEN.md'), md + '\n');
fs.writeFileSync(rel('tools', 'foto-prompts-neue-gruppen.json'), JSON.stringify(eintraege.map((e) => ({
  id: e.id, gruppe: e.gruppe, sorte: e.sorte, typ: e.typ, dateiname: e.dateiname, anhang1: e.anhang1, anhang2: e.anhang2, prompt: e.prompt, hinweise: e.hinweise,
  status: e.status, woerter: e.woerter, anhangFehlt: e.anhangFehlt,
})), null, 2) + '\n');
console.log(`OK: ${eintraege.length} Prompts für neue Gruppen (${proGruppe.map((x) => `${x.g} ${x.n}`).join(', ')}; ${nOffen} offen, ${nVorh} vorhanden, ${nFehlt} mit fehlendem Anhang), längster ${Math.max(...eintraege.map((e) => e.woerter))} Wörter.`);
