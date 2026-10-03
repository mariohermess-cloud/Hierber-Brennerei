// KI-Symbolbilder der Serviervorschläge: Sorten-ID -> Titel des Serviervorschlags, dessen Platzhalter das Bild ersetzt.
// Quelle der Bilder: fotos-ki/<id>-1.png (1448x1086, vom Nutzer erzeugt; bleiben unverändert). Alle noch vom Brenner zu bestätigen (TODO-INHALTE.md, Abschnitt KI-Bilder).
// Weitere Bilder je Sorte: fotos-ki/<id>-<n>.png mit n >= 2 (siehe kartenNummern unten). Existiert die Datei nicht, bleibt der Platzhalter.
// Der Titel muss exakt einem Vorschlag in serviervorschlaege.js entsprechen (prüft tools/pruefe_daten.mjs bzw. der Bau).
export const KI_BILDER = {
  gin: 'Gin-Tonic mit Apfel und Rosmarin',
  wodka: 'Wodka-Tonic mit Gurkenscheiben',
  rum: 'Rum und Ginger mit Limette',
  'rum-orange': 'Rum Orange-Highball',
  whisky: 'Old Fashioned',
  kirsch: 'Kirsch-Sour',
  framboise: 'Framboise-Spritz mit Crémant',
  quetsch: 'Quetsch-Sour',
  'poire-williams': 'Poire Williams Fizz',
  mirabelle: 'Mirabelle-Tonic mit Thymian',
  'hierber-fruucht': 'Hierber aale Fruucht auf einem großen Eiswürfel',
  'vieux-marc': 'Espresso mit Vieux Marc',
  'vieille-prune': 'Vieille Prune auf einem großen Eiswürfel',
  'vieille-pomme': 'Vieille Pomme mit Ginger Beer',
  hunnegdrepp: 'Hunnegdrëpp-Sour',
  'hunneg-whisky': 'Hunneg Whisky-Highball',
  kraeiderdrepp: 'Kräiderdrëpp-Tonic mit Gurkenscheiben',
  kuerbisdrepp: 'Kürbissuppe mit einem Schuss Kürbisdrëpp',
  grain: 'Grain mit Apfelsaft auf Eis',
  hondsaarsch: 'Hondsaarsch-Tonic mit Orangenschale',
  kiwibeeren: 'Kiwibeeren-Spritz mit Crémant',
  poire: 'Poire mit Ginger Beer',
  neelchesbiren: 'Neelchesbiren-Tonic mit Zitronenschale',
  lenschouren: 'Lënschouren über Vanilleeis',
  vullekiischt: 'Vullekiischt-Tonic mit Zitronenschale',
  schleiwen: 'Schléiwen-Sour',
  vizdrepp: 'Vizdrëpp-Tonic mit Apfelscheiben',
  sambuca: 'Sambuca mit Kaffeebohnen',
  limoncello: 'Limoncello-Spritz mit Crémant',
};

// Nummern der Karten einer Sortenseite: Der Hauptbild-Vorschlag (KI_BILDER) bekommt die 1, alle übrigen Karten werden in
// Kartenreihenfolge ab 2 nummeriert. Beispiel Wodka (Karten 1 bis 4, Hauptbild = Karte 2): [2, 1, 3, 4].
// Gibt null zurück, wenn der Hauptbild-Vorschlag nicht in der Liste steht. Dieselbe Regel nutzt tools/foto_prompts_weitere.mjs.
export function kartenNummern(id, liste) {
  const haupt = liste.findIndex((v) => v.name === KI_BILDER[id]);
  if (haupt < 0) return null;
  let n = 2;
  return liste.map((_, i) => (i === haupt ? 1 : n++));
}

// Schlüssel in IMG (Bildpipeline) und Dateiname im Verzeichnis dist/img: Hauptbild "ki-<id>", weitere "ki-<id>-<n>".
export const kiKey = (id, n) => (n === 1 ? `ki-${id}` : `ki-${id}-${n}`);
