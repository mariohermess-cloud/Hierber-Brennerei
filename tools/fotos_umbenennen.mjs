// Benennt die Kamera-nummerierten Fotos in Fotos/ nach Inhalt um (Zuordnung: tools/fotos-umbenennung.json, alt -> neu).
// Aufruf:  node tools/fotos_umbenennen.mjs                 (umbenennen)
//          node tools/fotos_umbenennen.mjs --rueckgaengig  (zurückbenennen, neu -> alt)
//          node tools/fotos_umbenennen.mjs --trocken       (nur prüfen, nichts ändern)
// Prüft vorher: Quelle vorhanden, kein Zielname doppelt, kein Zielname schon vergeben (außer er ist selbst eine Quelle).
// Nutzt nur fs.rename (kein git); die Dateiinhalte bleiben unverändert. Exit-Code 1 bei Fehlern, dann wird nichts umbenannt.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const wurzel = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const ordner = path.join(wurzel, 'Fotos');
const zuordnung = JSON.parse(fs.readFileSync(path.join(wurzel, 'tools', 'fotos-umbenennung.json'), 'utf8')).dateien;
const zurueck = process.argv.includes('--rueckgaengig');
const trocken = process.argv.includes('--trocken');

const paare = zuordnung.map((z) => (zurueck ? { von: z.neu, nach: z.alt } : { von: z.alt, nach: z.neu }));
const fehler = [];
const vonSet = new Set(paare.map((p) => p.von));
const nachSet = new Set();
for (const { von, nach } of paare) {
  if (!zurueck && !/^[a-z0-9-]+\.jpg$/.test(nach)) fehler.push(`Ungültiger Zielname (erlaubt: a-z, 0-9, Bindestrich, .jpg): ${nach}`);
  if (!fs.existsSync(path.join(ordner, von))) fehler.push(`Quelle fehlt: Fotos/${von}`);
  if (nachSet.has(nach)) fehler.push(`Zielname doppelt: ${nach}`);
  nachSet.add(nach);
  if (fs.existsSync(path.join(ordner, nach)) && !vonSet.has(nach)) fehler.push(`Zielname schon vergeben: Fotos/${nach}`);
}
if (vonSet.size !== paare.length) fehler.push('Quellname doppelt in der Zuordnung');
if (fehler.length) {
  console.error('FEHLER, nichts umbenannt:\n' + fehler.map((m) => ' - ' + m).join('\n'));
  process.exit(1);
}
if (trocken) { console.log(`OK (nur Prüfung): ${paare.length} Dateien könnten umbenannt werden.`); process.exit(0); }

// Zweistufig über temporäre Namen, damit sich Quellen und Ziele überschneiden dürfen
const tmp = (n) => `.umbenennen-${n}`;
for (const { von } of paare) fs.renameSync(path.join(ordner, von), path.join(ordner, tmp(von)));
for (const { von, nach } of paare) fs.renameSync(path.join(ordner, tmp(von)), path.join(ordner, nach));
console.log(`OK: ${paare.length} Dateien ${zurueck ? 'zurück' : ''}umbenannt in Fotos/.`);
