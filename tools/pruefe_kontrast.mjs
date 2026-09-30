// Rechnet WCAG-Kontraste der Farbpaare aus site/assets/css/main.css nach (Exit-Code 1 bei Unterschreitung).
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const L = (h) => { const [r, g, b] = hex(h).map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const cr = (a, b) => { const [x, y] = [L(a), L(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const C = { holz: '#1b130d', flaeche: '#2a1d14', papier: '#f3ece0', papier2: '#eadfcd', text_papier: '#2b211a', kupfer: '#b8733a',
  text_dunkel: '#f3ece0', gedaempt_dunkel: '#cdbfac', kupfer_hell: '#d9975f', gedaempt_papier: '#5c4e42', kupfer_dunkel: '#8a4a1c', kreide: '#ece6d8', schild: '#23282b' };
// [Vordergrund, Hintergrund, Mindestwert, Verwendung]
const paare = [
  ['text_dunkel', 'holz', 4.5, 'Fließtext auf Holz'], ['text_dunkel', 'flaeche', 4.5, 'Fließtext auf Fläche'],
  ['gedaempt_dunkel', 'holz', 4.5, 'gedämpfter Text auf Holz'], ['gedaempt_dunkel', 'flaeche', 4.5, 'gedämpfter Text auf Fläche'],
  ['kupfer_hell', 'holz', 4.5, 'Kupfer-Textton auf Holz'], ['kupfer_hell', 'flaeche', 4.5, 'Kupfer-Textton auf Fläche'],
  ['kupfer', 'holz', 3, 'Kupfer (nur Linien/große Schrift) auf Holz'],
  ['text_papier', 'papier', 4.5, 'Text auf Papier'], ['text_papier', 'papier2', 4.5, 'Text auf Papier 2'],
  ['gedaempt_papier', 'papier', 4.5, 'gedämpfter Text auf Papier'], ['gedaempt_papier', 'papier2', 4.5, 'gedämpfter Text auf Papier 2'],
  ['kupfer_dunkel', 'papier', 4.5, 'Kupfer-Textton auf Papier'], ['kupfer_dunkel', 'papier2', 4.5, 'Kupfer-Textton auf Papier 2'],
  ['holz', 'kupfer', 4.5, 'Knopftext (Holz) auf Kupfer'], ['kreide', 'schild', 4.5, 'Kreideschrift auf Schild'],
];
let fehler = 0;
for (const [f, b, min, was] of paare) {
  const v = cr(C[f], C[b]); const ok = v >= min; if (!ok) fehler++;
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${v.toFixed(2).padStart(5)}:1 (min ${min})  ${C[f]} auf ${C[b]}  ${was}`);
}
process.exit(fehler ? 1 : 0);
