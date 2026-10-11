// Erzeugt die ChatGPT-Bildprompts für zwei weitere Produkte: Hierberol (Aperitif, Foto vorhanden, kein flaches Etikett) und Kräider Batti (Kräuterlikör, nur Prompts).
// Aufruf: node tools/foto_prompts_weitere_sorten.mjs   (nach foto_prompts_groessen.mjs, vor node tools/chatgpt_stapel.mjs)
//   Exit-Code 1, wenn ein Anhang von Hierberol fehlt, ein Zielname doppelt vorkommt, ein Prompt zu lang ist oder die Daten nicht zu site/data passen.
//   Fehlt dagegen ein Anhang von Kräider Batti (Etikett liegt noch nicht vor), bricht das Skript NICHT ab: der Eintrag trägt „Anhang fehlt“ und bleibt im Stapel markiert.
// Liest (nur lesend): tools/weitere-sorten.json, site/data/produkte.js, serviervorschlaege.js, ki-bilder.js, fotos-basis/ und fotos-flaschen/ (Existenzprüfung), fotos-ki/ (Existenzprüfung für den Status)
// Schreibt: PROMPTS-WEITERE-SORTEN.md, tools/foto-prompts-weitere-sorten.json
// Je Sorte: eine Flasche (Hochformat 1024 x 1536, typ flasche) und vier Serviervorschläge (Querformat 1448 x 1086, typ serviervorschlag, fotos-ki/<id>-<n>.png, n = 1 Hauptbild).
// Markenschutz: Die Prompts beschreiben nur die Art des Produkts und verlangen ausdrücklich, keine bekannten Markenzeichen oder Etiketten-Aufmachungen nachzubauen.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PRODUKTE } from '../site/data/produkte.js';
import { SERVIERVORSCHLAEGE } from '../site/data/serviervorschlaege.js';
import { KI_BILDER, kartenNummern } from '../site/data/ki-bilder.js';
import { FLASCHEN_FORMAT } from '../site/data/flaschenfotos.js';
import { STIL, ADRESSE, VERSCHLUSS, woerter, satzFormat, NACHBESSERUNG } from './foto_gemeinsam.mjs';

const wurzel = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const rel = (...t) => path.join(wurzel, ...t);
const existiert = (p) => fs.existsSync(rel(p));
const fehler = [];
const fail = (m) => fehler.push(m);

// Wortgrenzen: Serviervorschläge 200 wie bei foto_prompts_weitere.mjs. Flaschen 250 statt 230: der Etikett-Baustein beschreibt hier das Etikett in Worten
// (Hierberol: Farben, Raute, Schreibschrift, Zubereitung), weil Anhang 2 ein Foto statt eines flachen Etiketts ist, und der Markenschutz-Satz kommt dazu.
const WORTGRENZE_SERVIER = 210; // vorher 200, 250: die feste Verschluss-Zeile (VERSCHLUSS) kommt dazu
const WORTGRENZE_FLASCHE = 260;
const KI_FORMAT = { w: 1448, h: 1086 };
const FORMAT = `${FLASCHEN_FORMAT.w} × ${FLASCHEN_FORMAT.h} Pixel`;
const KEINE_MARKEN = 'Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachbauen.';
const REGEL = 'Nur die genannten Zutaten, Garnituren und Beilagen, nichts dazuerfinden (keine zusätzlichen Kräuter, Früchte, Gewürze); Mischzutaten nur im Glas.';

const konfig = JSON.parse(fs.readFileSync(rel('tools', 'weitere-sorten.json'), 'utf8'));
const eintraege = [];

// ---------- Prompts ----------
function baueFlaschePrompt(s) {
  const f = s.flasche;
  const etikett = f.etikettFolgt
    ? `Auf die Flasche kommt das Etikett aus Anhang 2, es liegt noch nicht vor und wird mitgeschickt: ${f.etikett}. Es wird unverändert übernommen (kein Buchstabe anders, Adresszeile fest „${ADRESSE}“) und legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, Glanz und Reflexe des Glases laufen über das Etikett.`
    : `Auf die Flasche kommt das Etikett aus Anhang 2, exakt wie auf diesem Bild (nur das Etikett übernehmen, nicht Flasche, Grund oder Licht): ${f.etikett}. Kein Buchstabe anders, Adresszeile fest „${ADRESSE}“, Alkoholangabe wie in Anhang 2; es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, Glanz und Reflexe des Glases laufen über das Etikett.`;
  return [
    satzFormat(FORMAT),
    `Form und Proportionen orientieren sich an Anhang 1 (${f.anhang1Text}); nur Orientierung, nicht kopieren, nicht dessen Etikett.`,
    `${VERSCHLUSS} ${f.halsband} Inhalt: ${f.fluessigkeit}.`,
    etikett,
    KEINE_MARKEN,
    `Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „${f.datei}“. ${NACHBESSERUNG}`,
  ].join(' ').replace(/\s+/g, ' ').trim();
}

function baueServierPrompt(s, k) {
  const sv = s.serviervorschlaege;
  const neben = k.typ === 'Zum Essen' ? 'dem Essen und dem Glas' : 'dem Getränk';
  const flasche = `Die Flasche steht vollständig im Bild neben ${neben}: Hals, Verschluss und Etikett nicht angeschnitten, Luft ringsum. Aussehen: ${sv.aussehen}. ${VERSCHLUSS} Etikett kein Buchstabe anders, Adresszeile fest: „${ADRESSE}“. Alkoholangabe wie in den Anhängen. Inhalt der Flasche: ${sv.fluessigkeit}.`;
  const negativ = 'Negativ: verändertes Etikett, zweite Flasche, Fantasieschrift, nachgebaute Markenzeichen oder Aufmachungen anderer Hersteller.';
  return [`Erstelle ein Foto. ${STIL}`, `Szene: ${k.szene}`, `Flasche: ${flasche}`, REGEL, negativ].join('\n');
}

// ---------- Einträge ----------
for (const s of konfig.sorten) {
  const p = PRODUKTE.find((x) => x.id === s.id);
  if (s.inProdukte && !p) fail(`${s.id}: steht in weitere-sorten.json mit inProdukte, aber nicht in site/data/produkte.js`);
  if (!s.inProdukte && p) fail(`${s.id}: steht in produkte.js, die Konfiguration sagt aber inProdukte: false`);
  const f = s.flasche;

  // (a) Flasche
  const prompt = baueFlaschePrompt(s);
  eintraege.push({
    id: `${s.id}-flasche`, sorte: s.name, sorteId: s.id, typ: 'flasche', format: `Hochformat ${FORMAT}`,
    dateiname: f.datei, anhang1: f.anhang1, anhang2: f.anhang2, anhang1Text: f.anhang1Text, anhang2Text: f.anhang2Text, etikettFolgt: !!f.etikettFolgt,
    prompt, woerter: woerter(prompt), grenze: WORTGRENZE_FLASCHE,
    hinweise: [
      f.etikettFolgt
        ? 'Anhang 2 fehlt: das Etikett von Kräider Batti liegt noch nicht vor. Ohne Etikett nicht erzeugen (ChatGPT würde den Namen frei erfinden); sobald es da ist, als Datei in den Prompt einsetzen und diese Konfiguration anpassen (anhang2, etikettFolgt).'
        : 'Etikett Wort für Wort gegen Anhang 2 vergleichen (Name, „APERITIF“, „0,7 l“, „15 % vol.“, Zubereitung, Adresszeile). Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher; bei Abweichung nachbessern.',
      `Adresszeile prüfen: „${ADRESSE}“.`,
      'Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum.',
      `Format Hochformat ${FORMAT}; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 %.`,
      'Grund hell, neutral, weißgrau; sanfter Schatten am Boden.',
      `Inhalt: ${f.fluessigkeit}.`,
      'Keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller im Ergebnis (Form, Etikett, Schrift, Symbole).',
      f.formHinweis,
      s.inProdukte ? 'Dieses Bild ist die Datei, die die Sortenseite im Kopf und auf der Karte zeigt (Größenbild 0,7 L).' : 'Größe, Alkoholgehalt und Preis von Kräider Batti sind nicht bekannt; nichts davon in den Prompt oder auf die Seite schreiben, bis der Brenner sie liefert.',
    ],
  });

  // (b) Serviervorschläge: bei Sorten in produkte.js müssen die Karten zu serviervorschlaege.js und ki-bilder.js passen
  const karten = s.serviervorschlaege.karten;
  let nummern = karten.map((_, i) => i + 1); // Kräider Batti: Karte 1 ist das Hauptbild, danach in Reihenfolge
  if (s.inProdukte) {
    const daten = SERVIERVORSCHLAEGE[s.id] || [];
    if (JSON.stringify(daten.map((v) => v.name)) !== JSON.stringify(karten.map((k) => k.name))) fail(`${s.id}: Kartennamen in weitere-sorten.json (${karten.map((k) => k.name).join(' | ')}) weichen von serviervorschlaege.js ab (${daten.map((v) => v.name).join(' | ')})`);
    daten.forEach((v, i) => { if (karten[i] && v.glas !== karten[i].glas) fail(`${s.id} Karte ${i + 1}: Glas „${karten[i].glas}“ in weitere-sorten.json, „${v.glas}“ in serviervorschlaege.js`); });
    const n = kartenNummern(s.id, daten);
    if (!n) fail(`${s.id}: Hauptbild-Vorschlag „${KI_BILDER[s.id]}“ steht nicht in serviervorschlaege.js (ki-bilder.js)`);
    else nummern = n;
  }
  karten.forEach((k, i) => {
    if (!k.szene.toLowerCase().includes(k.glas.toLowerCase().split(' ')[0].replace(/glas$/, '')) ) fail(`${s.id} Karte ${i + 1}: Glasform „${k.glas}“ steht nicht in der Szene`);
    const dateiname = `fotos-ki/${s.id}-${nummern[i]}.png`;
    const prompt2 = baueServierPrompt(s, k);
    eintraege.push({
      id: `${s.id}-${nummern[i]}`, sorte: s.name, sorteId: s.id, typ: 'serviervorschlag', format: `Querformat 4:3 (${KI_FORMAT.w} × ${KI_FORMAT.h} Pixel)`,
      vorschlag: k.name, vorschlagTyp: k.typ, glas: k.glas, kartennummer: i + 1, anzahlKarten: karten.length,
      dateiname, anhang1: s.serviervorschlaege.anhang1, anhang2: s.serviervorschlaege.anhang2, etikettFolgt: !!f.etikettFolgt,
      prompt: prompt2, woerter: woerter(prompt2), grenze: WORTGRENZE_SERVIER,
      hinweise: [
        'Flasche komplett im Bild? Hals, Verschluss und Etikett dürfen nirgends am Bildrand angeschnitten sein.',
        `Etikett mit der Flaschenvorlage vergleichen (Name, Alkoholgehalt, Grafik) und die Adresszeile prüfen: „${ADRESSE}“.`,
        'Bei Fehlern im selben Chat nachlegen: „Etikett exakt aus dem Anhang übernehmen, keine Buchstaben verändern.“',
        `Nur Rezept-Zutaten im Bild; Entwurf, der Brenner bestätigt die Rezepte (Karte „${k.name}“).`,
        'Keine bekannten Markenzeichen oder Aufmachungen anderer Hersteller im Ergebnis.',
        s.inProdukte
          ? 'Sobald die Datei in fotos-ki/ liegt, baut der nächste Build sie in die Sortenseite ein (site/data/ki-bilder.js, Karte nach kartenNummern); bis dahin zeigt die Karte den Platzhalter.'
          : 'Kräider Batti hat keine Sortenseite: die Datei dient nur als Vorrat. Erst erzeugen, wenn Flaschenbild und Etikett vorliegen (Anhang 1 und 2 sind das noch fehlende Flaschenbild).',
      ],
    });
  });
}

// ---------- Prüfungen und Status ----------
const namen = new Map();
for (const e of eintraege) {
  if (namen.has(e.dateiname)) fail(`Dateiname doppelt: ${e.dateiname} (${namen.get(e.dateiname)} und ${e.id})`);
  namen.set(e.dateiname, e.id);
  if (e.woerter > e.grenze) fail(`${e.id}: Prompt ${e.woerter} Wörter (Grenze ${e.grenze})`);
  if (!e.prompt.includes(e.dateiname) && e.typ === 'flasche') fail(`${e.id}: Prompt enthält nicht den Zielnamen ${e.dateiname}`);
  e.status = existiert(e.dateiname) ? 'vorhanden' : 'offen';
  // fehlende Anhänge: bei Hierberol Fehler; bei Kräider Batti (Etikett folgt) nur vermerken, nicht abbrechen
  e.anhangFehlt = [...new Set([e.anhang1, e.anhang2].filter((a) => !existiert(a)))];
  if (e.anhangFehlt.length && !e.etikettFolgt) fail(`${e.id}: Anhang fehlt: ${e.anhangFehlt.join(', ')}`);
  if (e.anhangFehlt.length && e.etikettFolgt) e.hinweise.unshift(`Anhang fehlt: ${e.anhangFehlt.join(', ')}. Eintrag im ChatGPT-Stapel mit Status „Etikett fehlt“ markiert, nicht in der CSV der offenen Bilder.`);
}
if (fehler.length) { console.error('FEHLER:\n' + fehler.map((m) => ' - ' + m).join('\n')); process.exit(1); }

// ---------- Ausgabe ----------
const nOffen = eintraege.filter((e) => e.status === 'offen').length;
const nVorh = eintraege.filter((e) => e.status === 'vorhanden').length;
const nFehlt = eintraege.filter((e) => e.anhangFehlt.length).length;
const md = `# PROMPTS-WEITERE-SORTEN: Hierberol und Kräider Batti (ChatGPT)

Erzeugt mit \`node tools/foto_prompts_weitere_sorten.mjs\` aus \`tools/weitere-sorten.json\`. Nicht von Hand ändern. ${eintraege.length} Prompts: je Produkt eine Flasche (Hochformat ${FORMAT}) und vier Serviervorschläge (Querformat 4:3, ${KI_FORMAT.w} × ${KI_FORMAT.h}). Alles sind Entwürfe, der Brenner bestätigt sie.

**Stand:** ${nOffen} offen, ${nVorh} vorhanden, davon ${nFehlt} mit fehlendem Anhang (Kräider Batti: Etikett und Flaschenbild liegen noch nicht vor).

- **Hierberol** (Aperitif, 0,7 l, 15 % vol.): hat ein Flaschenbild (\`fotos-flaschen/hierberol-0-7l.png\`) und eine Sortenseite. Es gibt kein flaches Etikett in \`Fertige Etiquetten/\`; Anhang 2 ist deshalb das Foto selbst, nur als Etikett-Referenz. Die vier Serviervorschläge stehen in \`site/data/serviervorschlaege.js\`; die Bilder \`fotos-ki/hierberol-1.png\` bis \`-4.png\` fehlen noch und werden nach dem Upload vom Build eingebaut.
- **Kräider Batti** (Kräuterlikör, dunkel): nur Prompts. Es gibt weder Etikett noch Bild noch Preis noch Alkoholgehalt noch Größe; keine Sortenseite, kein Eintrag in \`produkte.js\`. Anhang 2 der Flasche ist ein Platzhalter („Etikett folgt“). Bis das Etikett vorliegt, stehen diese Einträge im ChatGPT-Stapel mit Status „Etikett fehlt“.
- **Markenschutz:** Die Prompts beschreiben nur die Art des Produkts und verlangen ausdrücklich, keine bekannten Markenzeichen, Flaschenformen oder Etiketten-Aufmachungen anderer Hersteller nachzubauen. Ergebnisse trotzdem darauf prüfen.

Die Ergebnisse gehören als PNG unter dem Namen aus der Tabelle in \`fotos-flaschen/\` bzw. \`fotos-ki/\`. Automatisch abarbeiten: \`CHATGPT-STAPEL.md\` (Gruppe \`weitere-sorten\`).

## Übersicht

| Eintrag | Typ | Anhang 1 | Anhang 2 | Zieldatei | Status | Wörter |
|---|---|---|---|---|---|---|
${eintraege.map((e) => `| ${e.id} | ${e.typ} | \`${e.anhang1}\`${existiert(e.anhang1) ? '' : ' (fehlt)'} | \`${e.anhang2}\`${existiert(e.anhang2) ? '' : ' (fehlt)'} | \`${e.dateiname}\` | ${e.status} | ${e.woerter} |`).join('\n')}

${eintraege.map((e, i) => `---

## ${i + 1}. ${e.sorte}: ${e.typ === 'flasche' ? 'Flasche' : `${e.vorschlag} (Karte ${e.kartennummer} von ${e.anzahlKarten})`}

- **Format:** ${e.format}
- **Anhang 1:** \`${e.anhang1}\`${e.anhang1Text ? ` (${e.anhang1Text})` : ''}${existiert(e.anhang1) ? '' : ' **(fehlt)**'}
- **Anhang 2:** \`${e.anhang2}\`${e.anhang2Text ? ` (${e.anhang2Text})` : ''}${existiert(e.anhang2) ? '' : ' **(fehlt)**'}
- **Ergebnis speichern als:** \`${e.dateiname}\`
- **Status:** ${e.status}
- **Prompt:** ${e.woerter} Wörter

\`\`\`
${e.prompt}
\`\`\`

**Prüfen:**
${e.hinweise.map((h) => `- ${h}`).join('\n')}
`).join('\n')}`;
fs.writeFileSync(rel('PROMPTS-WEITERE-SORTEN.md'), md + '\n');
fs.writeFileSync(rel('tools', 'foto-prompts-weitere-sorten.json'), JSON.stringify(eintraege.map((e) => ({
  id: e.id, sorte: e.sorte, typ: e.typ, dateiname: e.dateiname, anhang1: e.anhang1, anhang2: e.anhang2, prompt: e.prompt, hinweise: e.hinweise,
  status: e.status, woerter: e.woerter, anhangFehlt: e.anhangFehlt,
})), null, 2) + '\n');
console.log(`OK: ${eintraege.length} Prompts für weitere Sorten (${nOffen} offen, ${nVorh} vorhanden, ${nFehlt} mit fehlendem Anhang), längster ${Math.max(...eintraege.map((e) => e.woerter))} Wörter.`);
