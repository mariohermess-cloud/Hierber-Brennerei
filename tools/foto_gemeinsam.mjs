// Gemeinsame Bausteine für die Foto-Prompt-Skripte (tools/foto_prompts.mjs, foto_prompts_weitere.mjs, foto_prompts_flaschen.mjs, foto_prompts_groessen.mjs).
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

// ---------- Flaschen-Prompts (gemeinsam für tools/foto_prompts_flaschen.mjs und tools/foto_prompts_groessen.mjs) ----------
// Je Sorte: Art der Vorlage, Verschluss, Flüssigkeit, Zusatz. Verschlüsse und Formen sind an den Fotos abgelesen.
//  foto      = schlanke Sorte, Anhang 1 ist die leere schlanke Basisflasche fotos-basis/schlank-0-5l.png
//  schlankV  = wie foto (Sorte ohne eigenes Flaschenfoto in Fotos/); beide Arten haben im Prompt dieselbe Orientierung
//  rund      = runde Sorte, Anhang 1 ist die leere runde Basisflasche fotos-basis/rund-0-5l.png (Korken; Kappe/Halsband der Sorte stehen im Prompt)
//  vorlage   = eigene Vorlagenflasche (Vizdrëpp) bzw. leere Karaffe aus fotos-basis/ (Vieux Marc)
export const BASIS_SCHLANK_05 = 'fotos-basis/schlank-0-5l.png';
export const BASIS_RUND_05 = 'fotos-basis/rund-0-5l.png';
export const GLASSTOPFEN = 'Glasstopfen mit Kork';
export const SORTEN = {
  kirsch: { art: 'foto', fl: 'klar wie Wasser' }, framboise: { art: 'foto', fl: 'klar wie Wasser' }, quetsch: { art: 'foto', fl: 'klar wie Wasser' },
  'poire-williams': { art: 'foto', fl: 'klar wie Wasser' }, mirabelle: { art: 'foto', fl: 'klar wie Wasser' }, poire: { art: 'foto', fl: 'klar wie Wasser' },
  neelchesbiren: { art: 'foto', fl: 'klar wie Wasser' }, lenschouren: { art: 'foto', fl: 'klar wie Wasser' }, schleiwen: { art: 'foto', fl: 'klar wie Wasser' },
  kraeiderdrepp: { art: 'foto', fl: 'klar wie Wasser' }, kiwibeeren: { art: 'foto', fl: 'klar wie Wasser' },
  hunnegdrepp: { art: 'foto', fl: 'tiefes Honiggold' },
  'vieille-pomme': { art: 'foto', fl: 'klares Goldgelb' }, 'vieille-prune': { art: 'foto', fl: 'klares Goldgelb' },
  vizdrepp: { art: 'vorlage', a1: 'fotos/vorlage-vizdrepp.png', form: 'schlanker Hals, nach unten glockenförmig breiter werdender Körper mit eingewölbtem Boden', verschluss: 'Glasstopfen mit flachem, breitem Kragen', fl: 'kräftiges, klares Goldgelb', extra: 'Das Etikett ist querformatig.' },
  kuerbisdrepp: { art: 'schlankV', fl: 'klar wie Wasser' }, grain: { art: 'schlankV', fl: 'klar wie Wasser' },
  hondsaarsch: { art: 'schlankV', fl: 'klar wie Wasser' }, vullekiischt: { art: 'schlankV', fl: 'klar wie Wasser' },
  wodka: { art: 'rund', a1: BASIS_RUND_05, verschluss: 'flache, mattsilberne Metallkappe', fl: 'klar wie Wasser' },
  gin: { art: 'rund', a1: BASIS_RUND_05, verschluss: 'flache, mattsilberne Metallkappe', fl: 'klar wie Wasser' },
  rum: { art: 'rund', a1: BASIS_RUND_05, verschluss: 'dunkelbraune Holzkappe', fl: 'goldenes Bernstein' },
  'rum-orange': { art: 'rund', a1: BASIS_RUND_05, verschluss: 'dunkelbraune Holzkappe', fl: 'Bernstein, etwas orangener als im Foto (Orange-Bernstein)' },
  whisky: { art: 'rund', a1: BASIS_RUND_05, verschluss: 'schwarze Schraubkappe statt Holzkappe', fl: 'goldgelb' },
  'hunneg-whisky': { art: 'rund', a1: BASIS_RUND_05, verschluss: 'schwarze Schraubkappe statt Holzkappe', fl: 'warmes, honigfarbenes Goldgelb' },
  limoncello: { art: 'rund', a1: BASIS_RUND_05, verschluss: 'grauer, spitz zulaufender Metallausgießer', fl: 'leuchtendes Gelbgrün' },
  sambuca: { art: 'rund', a1: BASIS_RUND_05, verschluss: 'grauer, spitz zulaufender Metallausgießer', fl: 'klar wie Wasser' },
  'hierber-fruucht': { art: 'rund', a1: BASIS_RUND_05, verschluss: 'rotbraune Holzkappe', fl: 'warmes, kräftiges Orange-Bernstein' },
  'vieux-marc': { art: 'vorlage', a1: 'fotos-basis/karaffe-0-7l.png', form: 'Karaffe mit langem, schlankem Hals und nach unten breit auslaufendem Körper; das Glas im Foto ist klar und der Verschluss ein Glasstopfen, Glasfarbe und Verschluss gelten wie weiter unten beschrieben', verschluss: 'schwarzer Ausgießer', fl: 'dunkles, fast schwarzes Braunglas, der Brand ist nicht zu sehen' },
};

// Halsband je Sorte, abgelesen an den echten Fotos (Fotos/flasche-*.jpg: schlanke Flaschen haben KEIN Halsband; fotos/flaschen-*.webp: runde Flaschen tragen ein Papierband am Hals).
// unbestaetigt = kein eigenes Foto der Sorte, Band von der Schwestersorte übernommen (TODO-INHALTE.md, Abschnitt 7).
export const KEIN_HALS = 'Kein Halsband: der Hals bleibt klares Glas, höchstens ein schmaler goldgelber Siegelstreifen am Rand des Verschlusses.';
export const HALS_BAND = {
  wodka: 'hellblaues Band mit weißer Schreibschrift „Hierber Brennerei“',
  gin: 'hellblaues Band mit weißer Schreibschrift „Hierber Brennerei“',
  rum: 'braungraues Band mit heller Schreibschrift „Hierber Brennerei“',
  'rum-orange': 'braungraues Band mit heller Schreibschrift „Hierber Brennerei“',
  whisky: 'braungraues Band mit heller Schreibschrift „Hierber Brennerei“',
  'hunneg-whisky': 'braungraues Band mit heller Schreibschrift „Hierber Brennerei“',
  limoncello: 'gelbes Band mit Zitronenscheiben und Schreibschrift „Hierber Brennerei“',
  sambuca: 'dunkelrotes Band mit Faserstruktur und heller Schreibschrift „Hierber Brennerei“',
  'hierber-fruucht': 'graubraunes Band mit kleinem Brennblasen-Logo und heller Schreibschrift „Hierber Brennerei“',
};
export const HALS_UNBESTAETIGT = ['gin', 'rum-orange', 'whisky', 'hunneg-whisky'];
export const halsText = (id) => HALS_BAND[id]
  ? `Halsband: schmales Papierband um den Hals, ${HALS_BAND[id]}, eigenes Band neben dem großen Etikett (Anhang 1 zeigt es nicht, bitte ergänzen).`
  : id === 'vieux-marc' ? 'Kein Halsband: der Hals bleibt ohne Papierband.' : KEIN_HALS;

// Feste Prompt-Sätze der Flaschenbilder (Format/Position, Etikett, Schluss); format = „1024 × 1536 Pixel“, ziel = Zielpfad
export const satzFormat = (format) => `Erzeuge eine neue, saubere Produktflasche als Hochformat-Foto (${format}), freigestellt auf hellem, neutralem Grund (weißgrau, weiche Studiobeleuchtung von links, sanfter Schatten am Boden), frontal. Die Flasche steht mittig, Standfläche bei etwa 90 % der Bildhöhe, Oberkante des Verschlusses bei etwa 8 %; Hals und Verschluss nicht angeschnitten, Luft ringsum.`;
export const satzEtikett = () => `Auf die Flasche kommt das Etikett aus Anhang 2 unverändert (kein Buchstabe anders, Adresszeile fest „${ADRESSE}“, Alkoholangabe wie in Anhang 2); es legt sich wie ein echtes Papieretikett um die halbe Flasche: Rundung sichtbar, Ränder laufen seitlich weg, leichte Papierkante, Glanz und Reflexe des Glases laufen über das Etikett.`;
export const NACHBESSERUNG = 'Nachbesserung: Etikett exakt aus Anhang 2 übernehmen, keine Buchstaben verändern.';
export const satzSchluss = (ziel, zusatz = '') => `Nur EINE Flasche, keine weiteren Gegenstände, kein zusätzlicher Text, kein Logo, kein Wasserzeichen; nicht: verändertes Etikett, Fantasieschrift, übernommenes Foto aus Anhang 1. Ergebnis als PNG „${ziel}“. ${NACHBESSERUNG}${zusatz ? ` ${zusatz}` : ''}`;
