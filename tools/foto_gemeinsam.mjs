// Gemeinsame Bausteine für die Foto-Prompt-Skripte (tools/foto_prompts.mjs und tools/foto_prompts_weitere.mjs).
// Keine Seiteneffekte außer lesenden Existenzprüfungen im Ordner Fotos/.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const wurzel = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------- Stilblock (gemeinsam, steht in jedem Prompt vollständig) ----------
export const STIL = 'Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.';

// ---------- Flaschenvorlagen ----------
// Anhang 1 ist das Flaschenfoto der jeweiligen Sorte aus Fotos/ (flasche-<sorten-id>.jpg, ohne Zusatz = Foto mit aktuellem Etikettendesign).
// Nur wo es kein solches Foto gibt, gilt die Standardvorlage je Flaschentyp (etiketten.json: flaschentypen).
// Schlank: Form der Kirsch-Flasche aus Fotos/ (Grain, Hondsaarsch, Vullekiischt, Kürbisdrëpp nutzen dieselbe schlanke Flasche).
export const VORLAGE = {
  schlank: { datei: 'Fotos/flasche-kirsch.jpg', hinweis: 'schlanke 0,5-L-Flasche (Foto der Kirsch-Flasche, dieselbe Form; deren Etikett nicht übernehmen)' },
  rund: { datei: 'fotos/flaschen-wodka.webp', hinweis: 'runde Flasche, die große 0,5-L-Flasche rechts im Foto' },
  karaffe: { datei: 'fotos/flaschenreihe-theke.jpg', hinweis: 'Karaffe: die dunkle Vieux-Marc-Karaffe vorn links im Foto (nur die Karaffe beachten)' },
};
// Hunnegdrëpp hatte bisher fotos/flasche-hunnegdrepp.png als Standard-Schlankvorlage; jetzt hat die Sorte ein eigenes Foto in Fotos/.

// Liefert { datei, hinweis, foto } für eine Sorte: eigenes Foto in Fotos/ oder Standardvorlage des Typs.
export function flaschenVorlage(id, name, typ) {
  const f = `Fotos/flasche-${id}.jpg`;
  if (fs.existsSync(path.join(wurzel, f))) {
    return { datei: f, foto: true, hinweis: `echtes Foto der ${name}-Flasche: nur die Form (und der Verschluss) zählt, das Etikett auf dem Foto nicht übernehmen` };
  }
  return { ...VORLAGE[typ], foto: false };
}

// Feste Adresszeile des Etiketts (Vorgabe für alle Prompts mit Etikett)
export const ADRESSE = '2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu';

export const woerter = (s) => s.split(/\s+/).filter(Boolean).length;
