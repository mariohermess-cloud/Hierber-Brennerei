// Erzeugt die ChatGPT-Prompts "neue Produktflasche mit aktuellem Etikett" (Bildgenerierung), je Sorte einer. Anhang 1 (echtes Foto) ist nur Orientierung.
// Aufruf: node tools/foto_prompts_flaschen.mjs   (vor node tools/chatgpt_stapel.mjs)
//   Exit-Code 1, wenn eine Anhangdatei fehlt, ein Zielname doppelt vorkommt, die Sortenzahl nicht stimmt oder ein Prompt zu lang ist.
// Liest (nur lesend): site/data/produkte.js, etiketten.js, flaschen.js, flaschenfotos.js, Fertige Etiquetten/, Fotos/, fotos/ (Existenzprüfung),
//   fotos-flaschen/ (nur Existenzprüfung; bestimmt den Status vorhanden/offen; der Ordner wird NICHT angelegt)
// Schreibt: PROMPTS-FLASCHEN.md, tools/foto-prompts-flaschen.json
// Anhang 1 = echtes Flaschenfoto (nur Formvorbild: Form, Verschluss, Proportionen, Foto-Look), Anhang 2 = aktuelles flaches Etikett.
// Ergebnis: fotos-flaschen/<sorten-id>.png, Hochformat 1024x1536 (vom Nutzer gefüllt). Alle 29 Sorten bekommen einen Lauf; die Fotos in Fotos/ werden nicht ausgeliefert.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PRODUKTE } from '../site/data/produkte.js';
import { ETIKETTEN } from '../site/data/etiketten.js';
import { FLASCHENTYP } from '../site/data/flaschen.js';
import { FLASCHEN_ORDNER, FLASCHEN_FORMAT } from '../site/data/flaschenfotos.js';
import { ADRESSE, woerter } from './foto_gemeinsam.mjs';

const wurzel = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const rel = (...t) => path.join(wurzel, ...t);
const existiert = (p) => fs.existsSync(rel(p));
const fehler = [];
const fail = (m) => fehler.push(m);
const WORTGRENZE = 200; // wie bei den Serviervorschlags-Prompts; der feste Bausteintext (Format, Position, Etikett) braucht mehr als eine reine Bearbeitung
const ERWARTET = 29;

// ---------- Vorlagen (Anhang 1) ----------
const RUND_WODKA = 'fotos/flaschen-wodka.webp', RUND_RUM = 'fotos/flaschen-rum-02-05.webp';
// Je Sorte: Anhang 1, Art der Vorlage, Verschluss, Flüssigkeit, Zusatz. Verschlüsse und Formen sind an den Fotos abgelesen.
//  foto      = eigenes Foto der Sorte in Fotos/ (schlank, Frontalansicht)
//  schlankV  = Sorte ohne Foto: Fotos/flasche-kirsch.jpg dient nur als Formvorlage (klare Flüssigkeit)
//  rund2     = Foto auf schwarzem Grund mit zwei Flaschen (0,2 L links, 0,5 L rechts)
//  gruppe    = Gruppenfoto der Theke (Karaffe)
const GLASSTOPFEN = 'Glasstopfen mit Kork';
const SORTEN = {
  kirsch: { art: 'foto', fl: 'klar wie Wasser' }, framboise: { art: 'foto', fl: 'klar wie Wasser' }, quetsch: { art: 'foto', fl: 'klar wie Wasser' },
  'poire-williams': { art: 'foto', fl: 'klar wie Wasser' }, mirabelle: { art: 'foto', fl: 'klar wie Wasser' }, poire: { art: 'foto', fl: 'klar wie Wasser' },
  neelchesbiren: { art: 'foto', fl: 'klar wie Wasser' }, lenschouren: { art: 'foto', fl: 'klar wie Wasser' }, schleiwen: { art: 'foto', fl: 'klar wie Wasser' },
  kraeiderdrepp: { art: 'foto', fl: 'klar wie Wasser' }, kiwibeeren: { art: 'foto', fl: 'klar wie Wasser' },
  hunnegdrepp: { art: 'foto', fl: 'tiefes Honiggold' },
  'vieille-pomme': { art: 'foto', fl: 'klares Goldgelb' }, 'vieille-prune': { art: 'foto', fl: 'klares Goldgelb' },
  vizdrepp: { art: 'foto', form: 'bauchige Flasche mit weiter Schulter', fl: 'kräftiges, klares Goldgelb', extra: 'Das Etikett ist querformatig.' },
  kuerbisdrepp: { art: 'schlankV', fl: 'klar wie Wasser' }, grain: { art: 'schlankV', fl: 'klar wie Wasser' },
  hondsaarsch: { art: 'schlankV', fl: 'klar wie Wasser' }, vullekiischt: { art: 'schlankV', fl: 'klar wie Wasser' },
  wodka: { art: 'rund2', a1: RUND_WODKA, verschluss: 'flache, mattsilberne Metallkappe', fl: 'klar wie Wasser' },
  gin: { art: 'rund2', a1: RUND_WODKA, verschluss: 'flache, mattsilberne Metallkappe', fl: 'klar wie Wasser', extra: 'Es entsteht eine Gin-Flasche in der Form der Wodka-Flasche.' },
  rum: { art: 'rund2', a1: RUND_RUM, verschluss: 'dunkelbraune Holzkappe', fl: 'goldenes Bernstein' },
  'rum-orange': { art: 'rund2', a1: RUND_RUM, verschluss: 'dunkelbraune Holzkappe', fl: 'Bernstein, etwas orangener als im Foto (Orange-Bernstein)' },
  whisky: { art: 'rund2', a1: RUND_RUM, verschluss: 'schwarze Schraubkappe statt Holzkappe', fl: 'goldgelb', extra: 'Es entsteht eine Whisky-Flasche in der Form der Rum-Flasche.' },
  'hunneg-whisky': { art: 'rund2', a1: RUND_RUM, verschluss: 'schwarze Schraubkappe statt Holzkappe', fl: 'warmes, honigfarbenes Goldgelb', extra: 'Es entsteht eine Hunneg-Whisky-Flasche in der Form der Rum-Flasche.' },
  limoncello: { art: 'rund2', a1: 'fotos/flaschen-limoncello.webp', verschluss: 'grauer, spitz zulaufender Metallausgießer', fl: 'leuchtendes Gelbgrün' },
  sambuca: { art: 'rund2', a1: 'fotos/flaschen-sambuca.webp', verschluss: 'grauer, spitz zulaufender Metallausgießer', fl: 'klar wie Wasser' },
  'hierber-fruucht': { art: 'rund2', a1: 'fotos/flaschen-fruucht.webp', verschluss: 'rotbraune Holzkappe', fl: 'warmes, kräftiges Orange-Bernstein' },
  'vieux-marc': { art: 'gruppe', a1: 'fotos/flaschenreihe-theke.jpg', verschluss: 'schwarzer Ausgießer', fl: 'dunkles, fast schwarzes Braunglas, der Brand ist nicht zu sehen' },
};

const sorten = PRODUKTE.map((p) => {
  const s = SORTEN[p.id];
  if (!s) { fail(`${p.id}: keine Vorlagenangabe`); return null; }
  const typ = FLASCHENTYP[p.id];
  const a1 = s.art === 'foto' ? `Fotos/flasche-${p.id}.jpg` : s.art === 'schlankV' ? 'Fotos/flasche-kirsch.jpg' : s.a1;
  const a2 = ETIKETTEN[p.id] ? `Fertige Etiquetten/${ETIKETTEN[p.id]}` : null;
  if (!a2) fail(`${p.id}: kein flaches Etikett`);
  const ziel = `${FLASCHEN_ORDNER}/${p.id}.png`;
  const status = existiert(ziel) ? 'vorhanden' : 'offen';
  return { id: p.id, name: p.name, typ, s, a1, a2, ziel, status };
}).filter(Boolean);
if (sorten.length !== ERWARTET) fail(`Sortenzahl ${sorten.length}, erwartet ${ERWARTET}`);

// ---------- Prompt ----------
// ChatGPT erzeugt IMMER eine neue Flasche (kein Bearbeiten des Fotos). Anhang 1 ist nur Orientierung für Form, Verschluss, Proportionen und Foto-Look.
const FORMAT = `${FLASCHEN_FORMAT.w} × ${FLASCHEN_FORMAT.h} Pixel`;
const ORIENT = {
  foto: 'Foto der Flasche dieser Sorte: schlanke 0,5-L-Flasche mit hohem Hals',
  schlankV: 'schlanke 0,5-L-Flasche, Foto der Kirsch-Flasche nur als Formvorbild',
  rund2: 'Foto mit zwei runden Flaschen: die große 0,5-L-Flasche rechts ist das Formvorbild, es entsteht nur EINE Flasche',
  gruppe: 'Gruppenfoto der Theke: nur die dunkle Karaffe vorn links ist das Formvorbild',
};
function baue(e) {
  const { s, id } = e;
  const verschluss = s.art === 'foto' || s.art === 'schlankV' ? (id === 'vizdrepp' ? 'Glasstopfen' : GLASSTOPFEN) : s.verschluss;
  const orient = s.form && s.art === 'foto' ? `Foto der Flasche dieser Sorte: ${s.form}` : ORIENT[s.art];
  const t = [
    `Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (${FORMAT}), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum.`,
    `Form, Verschluss und Proportionen orientieren sich an Anhang 1 (${orient}); nur Orientierung, nicht kopieren, nicht dessen Etikett${s.art === 'rund2' ? ', kein Halsetikett' : ''}.${s.extra ? ` ${s.extra}` : ''}`,
    `Verschluss: ${verschluss}. ${id === 'vieux-marc' ? `Glas: ${s.fl}.` : `Flüssigkeit: ${s.fl}, bis zum Hals gefüllt.`}`,
    `Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „${ADRESSE}“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett.`,
    `Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „${e.ziel}“. Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.`,
  ];
  return t.join(' ').replace(/\s+/g, ' ').trim();
}

// ---------- Hinweise zur Vorlage (ehrlich, für die Tabelle und die Prüfliste) ----------
const PROBLEM = {
  rund2: 'Zwei-Flaschen-Foto (0,2 L und 0,5 L): nur die große Flasche ist Formvorbild, ChatGPT könnte beide zeichnen oder das Halsetikett übernehmen',
  gruppe: 'Gruppenfoto: nur eine Flasche von vielen, teils verdeckt; Form der Karaffe schwer zu erfassen',
  schlankV: 'Formvorlage ist die Kirsch-Flasche, nicht die Flasche der Sorte',
};
const VORLAGE_PROBLEM = (e) => (e.id === 'gin' ? 'Zwei-Flaschen-Foto der Wodka-Flasche; Gin nur über Etikett und Beschreibung' :
  ['whisky', 'hunneg-whisky', 'rum-orange'].includes(e.id) ? 'Zwei-Flaschen-Foto der Rum-Flasche; Farbe und Kappe nur über die Beschreibung' :
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
    'Das Foto aus Anhang 1 wurde nicht übernommen (kein altes Etikett, keine zweite Flasche, kein Halsetikett)',
  ];
  if (e.s.art === 'schlankV') l.push('Nicht das Kirsch-Etikett: es muss das Etikett der Sorte aus Anhang 2 sein');
  return l;
};
const nOffen = sorten.filter((e) => e.status === 'offen').length;
const nVorh = sorten.filter((e) => e.status === 'vorhanden').length;
const md = [];
md.push(`# PROMPTS-FLASCHEN: neue Produktflasche mit aktuellem Etikett (ChatGPT)

Erzeugt mit \`node tools/foto_prompts_flaschen.mjs\`. Nicht von Hand ändern. ${sorten.length} Prompts, je Sorte einer. **ChatGPT erzeugt eine NEUE, saubere Produktflasche** (Hochformat ${FLASCHEN_FORMAT.w} × ${FLASCHEN_FORMAT.h} Pixel, heller neutraler Studiogrund) mit dem aktuellen Etikett; das echte Foto wird nicht bearbeitet. Anhang 1 = echtes Flaschenfoto, nur Orientierung für Form, Verschluss, Proportionen und Foto-Look (nicht kopieren, nicht dessen Etikett). Anhang 2 = aktuelles flaches Etikett aus \`Fertige Etiquetten/\`. Die Flüssigkeitsfarbe steht im Prompt in Worten (gemessen in \`site/data/fluessigkeit.js\`).

Die Ergebnisse gehören als PNG unter dem Namen aus der Tabelle in den Ordner \`fotos-flaschen/\` im Repo (den legt der Nutzer an; das Skript legt ihn nicht an). Danach zeigen Sortenseite und Karte in „Die Theke“ dieses Bild statt der Vektor-Flasche (\`node build.mjs\`); fehlt die Datei, bleibt die Vektor-Flasche. **Alle ${sorten.length} Sorten bekommen einen Lauf**; die Fotos in \`Fotos/\` werden nicht auf der Seite gezeigt. Ob das Etikett auf einem Foto dem aktuellen entspricht, steht nur zur Information in \`FOTO-INVENTAR.md\` (Abschnitt 9) und steuert nichts.

**Einheitlichkeit:** Jeder Prompt enthält denselben festen Baustein (Format, heller Grund, Licht von links, Flasche mittig, Standfläche bei etwa 90 % der Bildhöhe, Verschlussoberkante bei etwa 8 %), damit Karten nebeneinander ruhig wirken. Das kann ChatGPT nur annähernd einhalten; abweichende Bilder besser neu erzeugen als auf der Seite zurechtrücken.

**Stand:** ${nOffen} offen, ${nVorh} vorhanden (Datei in \`fotos-flaschen/\`).

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
- **Gruppenfoto (Vieux Marc):** \`fotos/flaschenreihe-theke.jpg\` zeigt viele Flaschen; die Karaffe steht vorn links, teils verdeckt, mit Lampenreflexen. Als Formvorbild schwach; die Karaffenform kann abweichen.
- **Zwei Flaschen im selben Bild (Wodka, Gin, Rum, Rum Orange, Whisky, Hunneg Whisky, Limoncello, Sambuca, aale Fruucht):** die Fotos auf schwarzem Grund zeigen eine 0,2-L- und eine 0,5-L-Flasche samt Halsetikett „Hierber Brennerei“. Der Prompt nennt die große Flasche als Vorbild und verlangt nur EINE Flasche ohne Halsetikett; ob ChatGPT das einhält, ist offen. Der Grund im Foto ist schwarz, das Ergebnis soll hell sein.
- **Nur über Beschreibung (Gin, Rum Orange, Whisky, Hunneg Whisky):** es gibt kein Foto der Sorte. Gin entsteht in der Form der Wodka-Flasche, Whisky, Hunneg Whisky und Rum Orange in der Form der Rum-Flasche; Kappen- und Flüssigkeitsfarbe stehen nur im Text. Hier ist die Abweichung vom echten Produkt am größten.
- **Formvorlage Kirsch (Kürbisdrëpp, Grain, Hondsaarsch, Vullekiischt):** gleiche schlanke Flasche, aber das Foto ist nicht die Flasche der Sorte; Flüssigkeit „klar wie Wasser“ laut Beschreibung.
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
