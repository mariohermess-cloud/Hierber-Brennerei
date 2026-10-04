// Erzeugt die ChatGPT-Prompts "neue Produktflasche mit aktuellem Etikett" (Bildgenerierung), je Sorte einer. Anhang 1 (echtes Foto) ist nur Orientierung.
// Aufruf: node tools/foto_prompts_flaschen.mjs   (vor node tools/chatgpt_stapel.mjs)
//   Exit-Code 1, wenn eine Anhangdatei fehlt, ein Zielname doppelt vorkommt, die Sortenzahl nicht stimmt oder ein Prompt zu lang ist.
// Liest (nur lesend): site/data/produkte.js, etiketten.js, flaschen.js, flaschenfotos.js, Fertige Etiquetten/, fotos/ und fotos-basis/ (Existenzprüfung),
//   fotos-flaschen/ (nur Existenzprüfung; <id>.png ODER <id>-0-5l.png zählt als vorhanden; der Ordner wird NICHT angelegt)
// Schreibt: PROMPTS-FLASCHEN.md, tools/foto-prompts-flaschen.json
// Anhang 1 = leere Flasche ohne Etikett als Formvorbild (schlanke Sorten: fotos-basis/schlank-0-5l.png, runde Sorten: fotos-basis/rund-0-5l.png, Vieux Marc: fotos-basis/karaffe-0-7l.png; Vizdrëpp: etikettierte Vorlage fotos/vorlage-vizdrepp.png), Anhang 2 = aktuelles flaches Etikett.
// Ergebnis: fotos-flaschen/<sorten-id>.png (oder gleichwertig <sorten-id>-0-5l.png), Hochformat 1024x1536 (vom Nutzer gefüllt). Alle 29 Sorten bekommen einen Lauf; die Fotos in Fotos/ und fotos-basis/ werden nicht ausgeliefert.
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
const WORTGRENZE = 230; // Serviervorschläge: 200; hier mehr, weil Etikett- und Halsband-Baustein fest dazugehören
const ERWARTET = 29;

// ---------- Vorlagen (Anhang 1) ----------
// Sortentabelle, Halsband-Bausteine und feste Prompt-Sätze stehen in tools/foto_gemeinsam.mjs (auch vom Größen-Generator genutzt).

const sorten = PRODUKTE.map((p) => {
  const s = SORTEN[p.id];
  if (!s) { fail(`${p.id}: keine Vorlagenangabe`); return null; }
  const typ = FLASCHENTYP[p.id];
  const a1 = s.art === 'foto' || s.art === 'schlankV' ? BASIS_SCHLANK_05 : s.a1;
  const a2 = ETIKETTEN[p.id] ? `Fertige Etiquetten/${ETIKETTEN[p.id]}` : null;
  if (!a2) fail(`${p.id}: kein flaches Etikett`);
  const ziel = `${FLASCHEN_ORDNER}/${p.id}.png`;
  const status = existiert(ziel) || existiert(`${FLASCHEN_ORDNER}/${p.id}-0-5l.png`) ? 'vorhanden' : 'offen';
  return { id: p.id, name: p.name, typ, s, a1, a2, ziel, status };
}).filter(Boolean);
if (sorten.length !== ERWARTET) fail(`Sortenzahl ${sorten.length}, erwartet ${ERWARTET}`);

// ---------- Prompt ----------
// ChatGPT erzeugt IMMER eine neue Flasche (kein Bearbeiten des Fotos). Anhang 1 ist nur Orientierung für Form, Verschluss, Proportionen und Foto-Look.
const FORMAT = `${FLASCHEN_FORMAT.w} × ${FLASCHEN_FORMAT.h} Pixel`;
const ORIENT = {
  foto: 'leere schlanke Flasche ohne Etikett, nur Form und Proportionen',
  schlankV: 'leere schlanke Flasche ohne Etikett, nur Form und Proportionen',
  rund: 'leere runde 0,5-L-Flasche ohne Etikett (Basisfoto mit Korken), nur Form und Proportionen; Verschluss, Halsband und Flüssigkeit sind die der Sorte',
  vorlage: 'leere Vorlagenflasche ohne Etikett, nur Form und Verschluss',
  gruppe: 'Gruppenfoto der Theke: nur die dunkle Karaffe vorn links ist das Formvorbild',
};
function baue(e) {
  const { s, id } = e;
  const verschluss = s.art === 'foto' || s.art === 'schlankV' ? GLASSTOPFEN : s.verschluss;
  const orient = s.form && (s.art === 'foto' || s.art === 'vorlage') ? `Foto einer leeren Flasche dieser Form (ohne Etikett): ${s.form}` : ORIENT[s.art];
  const t = [
    satzFormat(FORMAT),
    `Form, Verschluss und Proportionen orientieren sich an Anhang 1 (${orient}); nur Orientierung, nicht kopieren, nicht dessen Etikett.${s.extra ? ` ${s.extra}` : ''}`,
    `Verschluss: ${verschluss}. ${halsText(id)} ${id === 'vieux-marc' ? `Glas: ${s.fl}.` : `Flüssigkeit: ${s.fl}, bis zum Hals gefüllt.`}`,
    satzEtikett(),
    satzSchluss(e.ziel),
  ];
  return t.join(' ').replace(/\s+/g, ' ').trim();
}

// ---------- Hinweise zur Vorlage (ehrlich, für die Tabelle und die Prüfliste) ----------
const PROBLEM = {
  rund: 'Basisfoto fotos-basis/rund-0-5l.png zeigt einen Korken; Kappe oder Ausgießer der Sorte und das Halsband nur über die Beschreibung',
  gruppe: 'Gruppenfoto: nur eine Flasche von vielen, teils verdeckt; Form der Karaffe schwer zu erfassen',
  vorlage: 'Leere Vorlagenflasche (ohne Etikett) auf schwarzem Grund; der Grund soll hell werden',
  foto: 'Anhang 1 ist die leere schlanke Basisflasche fotos-basis/schlank-0-5l.png, kein Foto der Sorte; Verschluss und Flüssigkeit nur über die Beschreibung',
  schlankV: 'Anhang 1 ist die leere schlanke Basisflasche fotos-basis/schlank-0-5l.png, kein Foto der Sorte; Verschluss und Flüssigkeit nur über die Beschreibung',
};
const VORLAGE_PROBLEM = (e) => (e.id === 'vieux-marc' ? 'Basisfoto fotos-basis/karaffe-0-7l.png zeigt klares Glas und einen Glasstopfen; dunkles Braunglas und schwarzer Ausgießer nur über die Beschreibung' :
  PROBLEM[e.s.art] || '');

for (const e of sorten) {
  e.prompt = baue(e);
  e.woerter = woerter(e.prompt);
  e.problem = VORLAGE_PROBLEM(e);
  if (e.woerter > WORTGRENZE) fail(`${e.id}: Prompt ${e.woerter} Wörter (Grenze ${WORTGRENZE})`);
  for (const f of [e.a1, e.a2]) if (!existiert(f)) fail(`${e.id}: Anhang fehlt: ${f}`);
  for (const muss of [e.ziel, ADRESSE, 'Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.']) if (!e.prompt.includes(muss)) fail(`${e.id}: Prompt enthält nicht: ${muss}`);
}
const namen = new Set();
for (const e of sorten) { if (namen.has(e.ziel)) fail(`Zielname doppelt: ${e.ziel}`); namen.add(e.ziel); }
if (fehler.length) { console.error('FEHLER:\n' + fehler.map((m) => ' - ' + m).join('\n')); process.exit(1); }

// ---------- Ausgabe ----------
const pruef = (e) => {
  const l = [
    `Etikett Wort für Wort gegen Anhang 2 vergleichen (Sortenname, Alkoholgehalt, Grafik, Adresszeile „${ADRESSE}“). **Dass ChatGPT den Text buchstabengetreu trifft, ist unsicher** (gleiche Fehlerart wie bei den Serviervorschlägen: verfälschte Adresse, erfundene Schrift); bei Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern`,
    'Nur EINE Flasche im Bild, ganz sichtbar (Hals und Verschluss nicht angeschnitten), Luft ringsum',
    `Format Hochformat ${FLASCHEN_FORMAT.w} × ${FLASCHEN_FORMAT.h}; Flasche mittig, Standfläche bei etwa 90 % der Höhe, Verschlussoberkante bei etwa 8 % (gleich wie bei allen anderen Sorten)`,
    'Grund hell, neutral, weißgrau, ohne Verlauf ins Farbige; sanfter Schatten am Boden',
    e.id === 'vieux-marc' ? `Glas: ${e.s.fl}` : `Flüssigkeit: ${e.s.fl}, bis zum Hals gefüllt`,
    'Etikett liegt rund auf der Flasche (nicht aufgeklebt, nicht flach), Glanz und Reflexe des Glases laufen darüber',
    'Das Foto aus Anhang 1 wurde nicht übernommen (kein altes Etikett, keine zweite Flasche)',
    HALS_BAND[e.id] ? `Halsband vorhanden und passend: ${HALS_BAND[e.id]}${HALS_UNBESTAETIGT.includes(e.id) ? ' (unbestätigt, kein eigenes Foto)' : ''}` : 'Kein Halsband am Hals (schlanke Flaschen und Vieux Marc haben keines)',
  ];
  return l;
};
const nOffen = sorten.filter((e) => e.status === 'offen').length;
const nVorh = sorten.filter((e) => e.status === 'vorhanden').length;
const md = [];
md.push(`# PROMPTS-FLASCHEN: neue Produktflasche mit aktuellem Etikett (ChatGPT)

Erzeugt mit \`node tools/foto_prompts_flaschen.mjs\`. Nicht von Hand ändern. ${sorten.length} Prompts, je Sorte einer. **ChatGPT erzeugt eine NEUE, saubere Produktflasche** (Hochformat ${FLASCHEN_FORMAT.w} × ${FLASCHEN_FORMAT.h} Pixel, heller neutraler Studiogrund) mit dem aktuellen Etikett; kein Foto wird bearbeitet. Anhang 1 = Formvorlage, nur Orientierung für Form, Verschluss, Proportionen und Foto-Look (nicht kopieren, nicht deren Etikett): bei den schlanken Sorten die leere Basisflasche \`fotos-basis/schlank-0-5l.png\`, bei den runden Sorten die leere runde Basisflasche \`fotos-basis/rund-0-5l.png\`, bei Vieux Marc die leere Karaffe \`fotos-basis/karaffe-0-7l.png\`, bei Vizdrëpp die Vorlage \`fotos/vorlage-vizdrepp.png\`. Anhang 2 = aktuelles flaches Etikett aus \`Fertige Etiquetten/\`. Die Flüssigkeitsfarbe steht im Prompt in Worten (gemessen in \`site/data/fluessigkeit.js\`).

Die Ergebnisse gehören als PNG unter dem Namen aus der Tabelle (gleichwertig gilt \`<sorten-id>-0-5l.png\`; existieren beide, gilt \`<sorten-id>.png\`) in den Ordner \`fotos-flaschen/\` im Repo (den legt der Nutzer an; das Skript legt ihn nicht an). Danach zeigen Sortenseite und Karte in „Die Theke“ dieses Bild statt der Vektor-Flasche (\`node build.mjs\`); fehlt die Datei, bleibt die Vektor-Flasche. **Alle ${sorten.length} Sorten bekommen einen Lauf**; die Fotos in \`Fotos/\` und \`fotos-basis/\` werden nicht auf der Seite gezeigt. Ob das Etikett auf einem Foto dem aktuellen entspricht, steht nur zur Information in \`FOTO-INVENTAR.md\` (Abschnitt 9) und steuert nichts.

**Einheitlichkeit:** Jeder Prompt enthält denselben festen Baustein (Format, heller Grund, Licht von links, Flasche mittig, Standfläche bei etwa 90 % der Bildhöhe, Verschlussoberkante bei etwa 8 %), damit Karten nebeneinander ruhig wirken. Das kann ChatGPT nur annähernd einhalten; abweichende Bilder besser neu erzeugen als auf der Seite zurechtrücken.

**Stand:** ${nOffen} offen, ${nVorh} vorhanden (\`<id>.png\` oder \`<id>-0-5l.png\` in \`fotos-flaschen/\`).

Automatisch abarbeiten: \`CHATGPT-STAPEL.md\` (Gruppe \`flasche\`, Ausgabe Hochformat).

## So geht es

1. Neuen Chat öffnen (ChatGPT mit Bildgenerierung), pro Sorte ein neuer Chat.
2. Beide Anhänge hochladen (Pfade siehe Tabelle) und den Prompt aus dem Kasten einfügen.
3. Ergebnis mit der Prüfliste unter dem Kasten prüfen. Bei einer Abweichung einmal mit „Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.“ nachbessern.
4. Als PNG unter dem Namen aus der Spalte „Zieldatei“ in \`fotos-flaschen/\` speichern.

## Übersicht

| Sorte | Anhang 1 (nur Orientierung) | Anhang 2 (Etikett) | Zieldatei | Problem der Vorlage |
|---|---|---|---|---|
${sorten.map((e) => `| ${e.name} | \`${e.a1}\` | \`${e.a2}\` | \`${e.ziel}\` | ${e.problem || '–'} |`).join('\n')}

## Problematische Vorlagen und Unsicherheiten (ehrlich)

- **Etikett Wort für Wort:** Dass ChatGPT Sortenname, Alkoholangabe, Grafik und die feste Adresszeile fehlerfrei übernimmt, ist unsicher. Jedes Ergebnis von Hand gegen das flache Etikett prüfen.
- **Karaffe (Vieux Marc):** \`fotos-basis/karaffe-0-7l.png\` zeigt eine leere Karaffe aus klarem Glas mit Glasstopfen. Dunkles, fast schwarzes Braunglas und der schwarze Ausgießer stehen nur im Prompt; ob ChatGPT das einhält, ist offen.
- **Runde Basisflasche (Wodka, Gin, Rum, Rum Orange, Whisky, Hunneg Whisky, Limoncello, Sambuca, aale Fruucht):** \`fotos-basis/rund-0-5l.png\` ist eine leere runde Flasche mit Korken, kein Foto der Sorte. Kappe oder Ausgießer, Halsband und Flüssigkeit stehen nur im Prompt; ob ChatGPT den Korken ersetzt, ist offen.
- **Nur über Beschreibung (Gin, Rum Orange, Whisky, Hunneg Whisky):** es gibt kein Foto der Sorte; Kappen- und Flüssigkeitsfarbe stehen nur im Text. Hier ist die Abweichung vom echten Produkt am größten.
- **Schlanke Basisflasche (alle schlanken Sorten):** \`fotos-basis/schlank-0-5l.png\` ist eine leere, schlanke Flasche mit kurzem Hals und Glasstopfen, kein Foto der Sorte; Flüssigkeit und Verschluss stehen im Prompt (Flüssigkeitsfarbe je Sorte, Glasstopfen). Grain wird laut Preisliste nur als 1 L angeboten; sein 0,5-L-Prompt gehört trotzdem zum Standard (1-L-Prompt: \`PROMPTS-GROESSEN.md\`).
- **Einheitliche Position:** Standfläche bei etwa 90 % und Verschlussoberkante bei etwa 8 % hält ChatGPT erfahrungsgemäß nur ungefähr ein.

${sorten.map((e, i) => `---

## ${i + 1}. ${e.name}

- **Anhang 1 (nur Orientierung):** \`${e.a1}\`
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
fs.writeFileSync(rel('PROMPTS-FLASCHEN.md'), md.join('\n') + '\n');
fs.writeFileSync(rel('tools', 'foto-prompts-flaschen.json'), JSON.stringify(sorten.map((e) => ({
  id: e.id, sorte: e.name, anhang1: e.a1, anhang2: e.a2, dateiname: e.ziel, vorlageArt: e.s.art, woerter: e.woerter, prompt: e.prompt,
  hinweise: pruef(e), problem: e.problem, status: e.status,
})), null, 2) + '\n');
const maxW = Math.max(...sorten.map((e) => e.woerter));
console.log(`OK: ${sorten.length} Flaschen-Prompts (${nOffen} offen, ${nVorh} vorhanden), längster ${maxW} Wörter, alle Anhänge vorhanden.`);
