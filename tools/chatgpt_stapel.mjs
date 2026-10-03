// Erzeugt den ChatGPT-Stapel (Automatik) aus den Ergebnissen von tools/foto_prompts_weitere.mjs und tools/foto_prompts_flaschen.mjs.
// Aufruf: node tools/foto_prompts_weitere.mjs && node tools/foto_prompts_flaschen.mjs && node tools/chatgpt_stapel.mjs
// Reihenfolge im Stapel: 1. Ersatzbilder (Gruppe ersatz), 2. Etikett auf die echte Flasche (Gruppe flasche), 3. weitere Serviervorschläge (-2, -3, -4, -5).
// Gruppe flasche: ChatGPT erzeugt eine neue Produktflasche mit dem Etikett (Hochformat); alle 29 Sorten stehen im Stapel.
// Liest:    tools/foto-prompts-weitere.json, tools/foto-prompts-ersatz.json, tools/foto-prompts-flaschen.json (jeweils inkl. Status), prüft alle Anhangdateien
// Schreibt: tools/chatgpt-stapel.csv (nur offen), tools/chatgpt-stapel-alle.csv, tools/chatgpt-stapel.json,
//           tools/chatgpt-stapel-block-NN.csv (je 10 offene Bilder), CHATGPT-STAPEL.md
// CSV: UTF-8 ohne BOM, Trennzeichen Semikolon, alle Felder in Anführungszeichen (" im Text wird verdoppelt), Zeilenumbrüche im Prompt durch Leerzeichen ersetzt.
// Exit-Code 1, wenn eine Anhangdatei fehlt oder ein Dateiname doppelt vorkommt.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const wurzel = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const rel = (...t) => path.join(wurzel, ...t);
const lies = (n) => JSON.parse(fs.readFileSync(rel('tools', n), 'utf8'));
const BLOCKGROESSE = 10;
const KOPF = ['nr', 'dateiname_ergebnis', 'anhang1', 'anhang2', 'prompt', 'gruppe', 'status'];

const weitere = lies('foto-prompts-weitere.json');
const ersatz = lies('foto-prompts-ersatz.json');
const flaschen = lies('foto-prompts-flaschen.json');
const nummer = (e) => Number(e.dateiname.match(/-(\d+)\.png$/)[1]);
// Reihenfolge: zuerst die Ersatzbilder, dann die Flaschenbilder (Etikett auf die echte Flasche), dann die weiteren nach Wichtigkeit
// (alle -2, dann -3, -4, -5; innerhalb gleicher Nummer wie in der Sortenliste)
const geordnet = [
  ...ersatz.map((e) => ({ ...e, gruppe: 'ersatz' })),
  ...flaschen.map((e) => ({ ...e, gruppe: 'flasche' })),
  ...weitere.map((e, i) => ({ e, i })).sort((a, b) => nummer(a.e) - nummer(b.e) || a.i - b.i).map((x) => ({ ...x.e, gruppe: 'weitere' })),
];
const zeilen = geordnet.map((e, i) => ({
  nr: i + 1, dateiname_ergebnis: e.dateiname, anhang1: e.anhang1, anhang2: e.anhang2,
  prompt: e.prompt.replace(/\s+/g, ' ').trim(), gruppe: e.gruppe, status: e.status,
}));

const fehler = [];
const namen = new Set();
for (const z of zeilen) {
  if (namen.has(z.dateiname_ergebnis)) fehler.push(`Dateiname doppelt: ${z.dateiname_ergebnis}`);
  namen.add(z.dateiname_ergebnis);
  for (const f of [z.anhang1, z.anhang2]) if (!f || !fs.existsSync(rel(f))) fehler.push(`Nr ${z.nr}: Anhang fehlt: ${f}`);
}
if (fehler.length) { console.error('FEHLER:\n' + fehler.map((m) => ' - ' + m).join('\n')); process.exit(1); }

const feld = (s) => `"${String(s).replace(/"/g, '""')}"`;
const csv = (liste) => [KOPF.join(';'), ...liste.map((z) => KOPF.map((k) => feld(z[k])).join(';'))].join('\n') + '\n';
const offen = zeilen.filter((z) => z.status === 'offen');

// alte Blockdateien entfernen, damit keine veralteten übrig bleiben
for (const f of fs.readdirSync(rel('tools'))) if (/^chatgpt-stapel-block-\d+\.csv$/.test(f)) fs.rmSync(rel('tools', f));
fs.writeFileSync(rel('tools', 'chatgpt-stapel.csv'), csv(offen));
fs.writeFileSync(rel('tools', 'chatgpt-stapel-alle.csv'), csv(zeilen));
const bloecke = [];
for (let i = 0; i < offen.length; i += BLOCKGROESSE) bloecke.push(offen.slice(i, i + BLOCKGROESSE));
bloecke.forEach((b, i) => fs.writeFileSync(rel('tools', `chatgpt-stapel-block-${String(i + 1).padStart(2, '0')}.csv`), csv(b)));
fs.writeFileSync(rel('tools', 'chatgpt-stapel.json'), JSON.stringify({
  hinweis: 'Alle Bilder des Stapels mit Status (offen, vorhanden, ersetzt, bitte prüfen). Die CSV tools/chatgpt-stapel.csv enthält nur die offenen. Erzeugt mit node tools/chatgpt_stapel.mjs.',
  anzahl: { gesamt: zeilen.length, offen: offen.length, vorhanden: zeilen.filter((z) => z.status === 'vorhanden').length, ersetztBittePruefen: zeilen.filter((z) => z.status.startsWith('ersetzt')).length },
  bilder: zeilen,
}, null, 2) + '\n');

// ---------- Anleitung ----------
const HAUPTPROMPT = `Du arbeitest einen Stapel von Bildaufträgen ab. Angehängt sind (1) eine CSV-Datei (Trennzeichen Semikolon, UTF-8, erste Zeile ist der Kopf: nr;dateiname_ergebnis;anhang1;anhang2;prompt;gruppe;status) und (2) die Bilddateien, die in den Spalten anhang1 und anhang2 genannt sind. Von den Pfaden zählt nur der Dateiname hinter dem letzten Schrägstrich.

Gehe die Zeilen der CSV der Reihe nach durch, immer nur eine Zeile auf einmal. Für jede Zeile gilt:
(a) Verwende die zwei Bilder anhang1 und anhang2 als Vorlagen. anhang2 ist immer das flache Etikett, das unverändert (kein Buchstabe anders, nichts neu geschrieben) um die halbe Flasche gelegt wird. Bei gruppe = ersatz oder weitere (Serviervorschlag-Bild) liefert anhang1 nur Flaschenform und Verschluss; das Etikett auf diesem Foto nicht übernehmen. Bei gruppe = flasche (neue Produktflasche mit dem Etikett) ist anhang1 nur Orientierung für Flaschenform, Verschluss, Proportionen und Foto-Look: nicht bearbeiten, nicht kopieren, sondern eine frische, saubere Flasche erzeugen, wie es der Prompt der Zeile beschreibt.
(b) Führe den Text aus der Spalte prompt wortgetreu als Bildauftrag aus. Nichts hinzuerfinden: keine zusätzlichen Zutaten, Kräuter, Früchte oder Texte.
(c) Liefere das Ergebnis als PNG im Format, das im Prompt der Zeile angegeben ist (Serviervorschlag-Bilder: Querformat 4:3, zum Beispiel 1448 x 1086 Pixel; Flaschenbilder: Hochformat 1024 x 1536 Pixel, wie im Prompt genannt) und nenne es genau so, wie es in der Spalte dateiname_ergebnis steht (nur der Dateiname, zum Beispiel gin-2.png oder kirsch.png).
(d) Prüfe danach Etikett und Adresszeile im Ergebnis gegen anhang2 (Sortenname, Alkoholgehalt, Grafik, Adresszeile "2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu"), außerdem, ob Hals und Verschluss der Flasche vollständig im Bild sind (bei gruppe = flasche zusätzlich: nur eine Flasche, Format und Position wie im Prompt, Halsband genau wie im Prompt beschrieben bzw. keines). Bei einer Abweichung bessere genau einmal nach (neues Bild mit dem Hinweis, das Etikett exakt aus anhang2 zu übernehmen). Weicht es danach immer noch ab, liefere das beste Bild und schreibe dazu "Etikett weicht ab" mit der Stelle. Versuche es nicht ein drittes Mal.
(e) Nutze pro Bild nur einen neuen Schritt im Gespräch und übernimm nichts aus den vorherigen Bildern (keine Garnituren, keine Flaschenform, keinen Stil von der vorigen Zeile), damit der Stil nicht kippt. Jede Zeile steht für sich.
(f) Halte nach jeweils 5 fertigen Bildern an, nenne kurz, welche Dateien fertig sind (Dateiname und "Etikett OK" oder "Etikett weicht ab"), und frage, ob du fortfahren sollst. Mache erst nach meiner Antwort weiter.

Zeilen, bei denen status nicht "offen" ist, überspringst du. Wenn eine Bilddatei fehlt oder du an ein Limit stößt, höre auf und sage genau, bei welcher nr du stehst. Am Ende gibst du eine Tabelle mit nr, dateiname_ergebnis und dem Ergebnis (OK, nachgebessert, Etikett weicht ab, nicht erzeugt) aus.`;

// Welche Dateien muss man pro Block hochladen?
const blockZeilen = bloecke.map((b, i) => {
  const dateien = [...new Set(b.flatMap((z) => [z.anhang1, z.anhang2]))];
  return `| ${String(i + 1).padStart(2, '0')} | \`tools/chatgpt-stapel-block-${String(i + 1).padStart(2, '0')}.csv\` | ${b[0].nr}–${b[b.length - 1].nr} | ${b.length} | ${dateien.length} |`;
});
const dateiListe = bloecke.map((b, i) => `**Block ${String(i + 1).padStart(2, '0')}** (${[...new Set(b.flatMap((z) => [z.anhang1, z.anhang2]))].length} Dateien): ${[...new Set(b.flatMap((z) => [z.anhang1, z.anhang2]))].map((f) => `\`${f}\``).join(', ')}`).join('\n\n');
const nWeitere = zeilen.filter((z) => z.gruppe === 'weitere');
const nErsatz = zeilen.filter((z) => z.gruppe === 'ersatz');
const nFlasche = zeilen.filter((z) => z.gruppe === 'flasche');

const md = `# CHATGPT-STAPEL: Bilder automatisch erzeugen lassen

Erzeugt mit \`node tools/chatgpt_stapel.mjs\` (nach \`node tools/foto_prompts_weitere.mjs\` und \`node tools/foto_prompts_flaschen.mjs\`). Nicht von Hand ändern. Hier steht, wie ChatGPT den Stapel der KI-Bilder abarbeitet, statt dass jedes Bild einzeln von Hand angefordert wird.

**Stand:** ${zeilen.length} Bilder im Stapel, in dieser Reihenfolge: **1. ${nErsatz.length} Ersatzbilder** für fehlerhafte Erstbilder (${nErsatz.filter((z) => z.status === 'offen').length} offen, ${nErsatz.filter((z) => z.status.startsWith('ersetzt')).length} „ersetzt, bitte prüfen“), **2. ${nFlasche.length} Flaschenbilder** „neue Produktflasche mit dem Etikett“ (Gruppe \`flasche\`, ${nFlasche.filter((z) => z.status === 'offen').length} offen), **3. ${nWeitere.length} weitere Serviervorschläge** (${nWeitere.filter((z) => z.status === 'vorhanden').length} schon vorhanden, ${nWeitere.filter((z) => z.status === 'offen').length} offen; zuerst alle \`-2\`, dann \`-3\`, \`-4\`, \`-5\`). Zu erzeugen sind also **${offen.length} Bilder**.

## Ehrlich vorab

- **Wie verlässlich die Automatik läuft, hängt von der ChatGPT-Version und dem Tarif ab.** Ich kann das von hier aus nicht testen. Typische Grenzen: wie viele Dateien man pro Nachricht oder Chat anhängen darf, wie viele Bilder pro Zeitraum erzeugt werden dürfen (danach „bitte später wieder“), und dass ein Chat bei sehr vielen Bildern langsam wird oder den Faden verliert. Die konkreten Zahlen ändern sich; bitte in der Hilfe von ChatGPT nachlesen.
- **Darum in Blöcken arbeiten:** nicht alle ${offen.length} auf einmal, sondern Blöcke zu je ${BLOCKGROESSE} Bildern (\`tools/chatgpt-stapel-block-01.csv\`, \`-02.csv\` …). Bei einem eigenen Limit lieber den Block verkleinern (5 Bilder) als abbrechen lassen.
- Ein Block mit ${BLOCKGROESSE} Bildern braucht bis zu ${BLOCKGROESSE * 2} Bilddateien plus die CSV. Passt das nicht in einen Chat, den Block halbieren (die ersten 5 Zeilen der CSV in eine neue Datei kopieren, Kopfzeile behalten).
- **Das Ergebnis muss immer von einem Menschen angesehen werden:** KI verfälscht gern Schrift. Etikett Wort für Wort mit dem Etikett aus \`Fertige Etiquetten/\` vergleichen, Flasche vollständig im Bild, nur Rezeptzutaten (Prüflisten stehen in \`PROMPTS-FOTOS-WEITERE.md\`, \`PROMPTS-FOTOS-ERSATZ.md\` und \`PROMPTS-FLASCHEN.md\`). Bei den Flaschenbildern zusätzlich: nur eine Flasche, Format und Position wie im Prompt, Flüssigkeit und Verschluss wie beschrieben; die Gruppenfoto- und Zwei-Flaschen-Vorlagen (Vieux Marc, runde Sorten) sind die heikelsten.
- Auch die eigene Etikettenprüfung von ChatGPT (Schritt d) ist nur eine Hilfe, keine Garantie.
- Die Gruppe \`flasche\` erzeugt eine **neue Produktflasche** mit dem Etikett (das echte Foto ist nur Orientierung). Ob ChatGPT das Etikett buchstabengetreu trifft und Format und Position einhält, ist ungetestet und unsicher.

## In 6 Schritten

1. **Block wählen.** Beginne mit \`tools/chatgpt-stapel-block-01.csv\`: im Stapel stehen **zuerst die Ersatzbilder**, danach die Flaschenbilder (Etikett auf die echte Flasche), zuletzt die weiteren Serviervorschläge (\`-2\`, \`-3\`, \`-4\`, \`-5\`). Alle offenen Bilder zusammen stehen in \`tools/chatgpt-stapel.csv\`, alle inklusive schon vorhandener in \`tools/chatgpt-stapel-alle.csv\`.
2. **Neuen Chat öffnen** (ChatGPT mit Bildgenerierung, ein neuer Chat pro Block).
3. **Dateien hochladen:** die Block-CSV und die Bilder, die darin in den Spalten \`anhang1\` und \`anhang2\` stehen. Welche das sind, listet der Abschnitt „Dateien je Block“ unten. Die Bilder sind Etiketten und Flaschenfotos aus dem Repo (\`Fertige Etiquetten/\`, \`Fotos/\`, \`fotos/\`); der Pfad in der CSV sagt, wo sie liegen.
4. **Hauptprompt einfügen** (Kasten unten) und absenden. ChatGPT erzeugt nun Bild für Bild und hält nach 5 Bildern an.
5. **Prüfen und speichern:** jedes Bild ansehen (siehe „Ehrlich vorab“), dann als PNG genau unter dem Namen aus \`dateiname_ergebnis\` speichern: Serviervorschläge im Ordner \`fotos-ki/\`, Flaschenbilder (\`gruppe = flasche\`, Pfad beginnt mit \`fotos-flaschen/\`) im Ordner \`fotos-flaschen/\` im Repo (den Ordner legt der Nutzer an). Bei Ersatzbildern (\`gruppe = ersatz\`, Name endet auf \`-1.png\`) wird die vorhandene Datei überschrieben, bei Bedarf vorher eine Kopie ziehen.
6. **Weitermachen:** auf die Rückfrage nach 5 Bildern „ja“ antworten, nach dem Block den nächsten Block in einem neuen Chat. Zum Schluss \`node tools/foto_prompts_weitere.mjs && node tools/foto_prompts_flaschen.mjs && node tools/chatgpt_stapel.mjs\` laufen lassen: der Status (offen/vorhanden) und die CSV-Dateien aktualisieren sich aus den Dateien in \`fotos-ki/\` und \`fotos-flaschen/\`; \`node build.mjs\` baut die Serviervorschläge an die richtige Karte und die Flaschenfotos auf die Sortenseiten und Karten.

## Hauptprompt (einmal pro Chat einfügen)

\`\`\`
${HAUPTPROMPT}
\`\`\`

## Dateien

| Datei | Inhalt |
|---|---|
| \`tools/chatgpt-stapel.csv\` | alle ${offen.length} offenen Bilder |
| \`tools/chatgpt-stapel-alle.csv\` | alle ${zeilen.length} Bilder mit Status |
| \`tools/chatgpt-stapel.json\` | dieselben Daten wie die CSV, alle ${zeilen.length} mit Status |
| \`tools/chatgpt-stapel-block-NN.csv\` | die offenen Bilder in Blöcken zu ${BLOCKGROESSE} |
| \`tools/chatgpt_stapel_api.py\` | optional: Stapel über die OpenAI-Bild-API (**ungetestet**, siehe unten) |

Spalten der CSV: \`nr\` (laufende Nummer), \`dateiname_ergebnis\` (Zielpfad: \`fotos-ki/…\` oder \`fotos-flaschen/…\`), \`anhang1\` (Flaschenvorlage bzw. bei \`flasche\` das zu bearbeitende Foto), \`anhang2\` (flaches Etikett), \`prompt\` (ein Absatz ohne Zeilenumbrüche), \`gruppe\` (\`ersatz\`, \`flasche\` oder \`weitere\`), \`status\` (\`offen\`, \`vorhanden\` oder \`ersetzt, bitte prüfen\`). Semikolon als Trennzeichen, alle Felder in Anführungszeichen. Beim Öffnen in Excel „Daten, aus Text/CSV“ mit UTF-8 wählen, sonst stimmen die Umlaute nicht.

## Blöcke

| Block | Datei | nr | Bilder | Dateien zum Hochladen |
|---|---|---|---|---|
${blockZeilen.join('\n')}

### Dateien je Block

${dateiListe}

## Optional: Automatik über die OpenAI-Bild-API (ungetestet)

\`tools/chatgpt_stapel_api.py\` liest dieselbe CSV und erzeugt die Bilder ohne Chat über die Bildbearbeitung der OpenAI-API mit mehreren Eingabebildern. **Das Skript ist ungetestet:** Es konnte hier weder gegen die API laufen (kein Zugang, kein Schlüssel) noch gegen die aktuelle Dokumentation geprüft werden. Modellname, Endpunkt, Bildgröße und Qualität stehen als Konstanten am Anfang und müssen gegen die aktuelle OpenAI-Dokumentation geprüft werden. Die API kostet Geld und ist von einem ChatGPT-Abo getrennt abgerechnet.

- Schlüssel in der Umgebung setzen (nicht ins Repo schreiben): \`export OPENAI_API_KEY=...\`
- Erst trocken: \`python3 tools/chatgpt_stapel_api.py --trocken\` (listet, was getan würde, prüft die Anhänge, ruft nichts auf)
- Test mit einem Bild: \`python3 tools/chatgpt_stapel_api.py --max 1\`
- Ganzer Stapel: \`python3 tools/chatgpt_stapel_api.py\` (Pause zwischen den Aufrufen, Wiederaufnahme: vorhandene Ergebnisdateien in \`fotos-ki/\` bzw. \`fotos-flaschen/\` werden übersprungen)
- Vorhandene Ergebnisdateien (Ersatzbilder, Gruppe \`flasche\`) überschreibt das Skript nur mit \`--ueberschreiben\` (die alte Datei wandert vorher in den Unterordner \`_vorher/\` des Zielordners). Mit \`--gruppe ersatz|flasche|weitere\` lässt sich eine Gruppe einzeln abarbeiten; Gruppe \`flasche\` liefert Hochformat.
- Die API liefert feste Bildgrößen; ob 4:3 dabei ist, ist zu prüfen. Das Skript speichert, was die API liefert; ein Zuschnitt auf 4:3 ist nur mit \`--zuschnitt-4zu3\` und installiertem Pillow möglich und schneidet bei 3:2-Bildern die Ränder ab (Flasche am Rand prüfen).
- Die Etikettenprüfung (Schritt d) macht das Skript nicht; jedes Bild muss von Hand geprüft werden.
`;
fs.writeFileSync(rel('CHATGPT-STAPEL.md'), md);
console.log(`OK: ${zeilen.length} Bilder im Stapel (${offen.length} offen, ${bloecke.length} Blöcke zu je ${BLOCKGROESSE}), alle Anhangdateien vorhanden.`);
