// Sucht in den sichtbaren Texten von dist/ nach internen Notizen, die nicht auf die Seite gehören.
// Aufruf: node tools/pruefe_notizen.mjs   (Exit-Code 1 bei Fund)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith('.html') ? [path.join(d, e.name)] : []));
const verboten = [/Etikett(?!\s+folgt)(?!en)/i, /Etikettenbild/i, /Auf dem Etikett/i, /Platzhalter-Etikett/i, /zeigt \d+\s*%/i, /Widerspruch/i, /TODO/, /Preisliste(?! 2025\))/, /KI-/, /Etikett im Foto/i, /Pixelprobe/i, /geschätzt/i];
const fehler = []; let n = 0;
for (const f of walk(dist)) {
  const html = fs.readFileSync(f, 'utf8').replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
  const text = html.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');
  n++;
  for (const re of verboten) { const m = text.match(re); if (m) fehler.push(`${path.relative(dist, f)}: "${m[0]}" im Kontext "…${text.slice(Math.max(0, m.index - 40), m.index + 60)}…"`); }
  // "Preisliste 2025" nur im erlaubten Preishinweis
  for (const m of text.matchAll(/Preisliste 2025|liste de prix 2025/g)) if (!/(MwSt\.|TVA 17 % comprise)[^.]{0,6}\((?:Preisliste|liste de prix) 2025|\(liste de prix 2025|\(Preisliste 2025/.test(text.slice(Math.max(0, m.index - 12), m.index + 20))) fehler.push(`${path.relative(dist, f)}: "Preisliste 2025" außerhalb des Preishinweises`);
}
console.log(`Geprüft: ${n} Seiten auf interne Notizen.`);
if (fehler.length) { console.log(fehler.slice(0, 30).join('\n')); process.exit(1); }
console.log('OK: keine internen Notizen sichtbar.');
