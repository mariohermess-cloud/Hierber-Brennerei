// Gemeinsame Bausteine für die Foto-Prompt-Skripte (tools/foto_prompts.mjs und tools/foto_prompts_weitere.mjs).
// Reine Konstanten, keine Seiteneffekte.

// ---------- Stilblock (gemeinsam, steht in jedem Prompt vollständig) ----------
export const STIL = 'Fotorealistisches Magazin-Food-Foto, Querformat 4:3. Natürliches Tageslicht von links, weiches warmes Licht, warme leicht entsättigte Farben. Tisch aus dunkler Eiche, ein kleines Detail aus mattem Kupfer. Geringe Schärfentiefe wie 85 mm bei Blende 2.0. Echte Kondenswassertropfen auf kalten Gläsern, saubere Gläser ohne Fingerabdrücke, realistisches Eis, frische Garnitur. Keine Personen, keine Hände, keine zusätzlichen Texte, keine Logos, kein Wasserzeichen, nichts Überstyltes.';

// ---------- Flaschenvorlagen je Flaschentyp (etiketten.json: flaschentypen) ----------
export const VORLAGE = {
  schlank: { datei: 'fotos/flasche-hunnegdrepp.png', hinweis: 'schlanke 0,5-L-Flasche (Foto der Hunnegdrëpp-Flasche)' },
  rund: { datei: 'fotos/flaschen-wodka.webp', hinweis: 'runde Flasche, die große 0,5-L-Flasche rechts im Foto' },
  karaffe: { datei: 'fotos/flaschenreihe-theke.jpg', hinweis: 'Karaffe: die dunkle Vieux-Marc-Karaffe vorn links im Foto (nur die Karaffe beachten)' },
};
// Sorten ohne flaches Etikett: Produktfoto aus fotos/ (Sambuca, Limoncello, Rum); Rum Orange hat weder Etikett noch Foto.
export const FOTO_STATT_ETIKETT = {
  rum: 'fotos/flaschen-rum-02-05.webp',
  limoncello: 'fotos/flaschen-limoncello.webp',
  sambuca: 'fotos/flaschen-sambuca.webp',
};
export const RUM_ORANGE_FORM = 'fotos/flaschen-rum-02-05.webp';

// Feste Adresszeile des Etiketts (Vorgabe für alle Prompts mit Etikett)
export const ADRESSE = '2, Millewee L-6665 Herborn, Tél: 727602, www.hierber-brennerei.lu';

export const woerter = (s) => s.split(/\s+/).filter(Boolean).length;
