// Geometrie und Anordnung des Kellers (Meter). Weinkeller mit Tonnengewölbe entlang -z,
// Nischen links/rechts, Regalwand und Probiertisch am Gangende.
import * as THREE from 'three';
import { rng } from './textures.js';

export const HALL = {
  A: 3.4,        // halbe Gangbreite
  Y0: 2.75,      // Kämpferhöhe des Gewölbes
  RISE: 2.2,     // Stichhöhe (Scheitel = Y0 + RISE)
  ZN: 14,        // Eingang (z, +)
  ZF: -21.4,     // Stirnwand am Gangende
  BAY: 3.15,     // Jochlänge
  BAY0: 3.2,     // z der ersten Nische
  NBAYS: 7,      // Nischen je Seite
  D: 1.7,        // Tiefe einer Nische
  OW: 2.5,       // Öffnungsbreite der Nische
  HS: 1.8,       // gerade Höhe der Öffnung
  ORISE: 0.75,   // Bogenstich der Öffnung
};
export const bayZ = (k) => HALL.BAY0 - HALL.BAY * k;
export const pilasterZ = (k) => HALL.BAY0 + HALL.BAY / 2 - HALL.BAY * k; // k = 0..NBAYS

// Fass (Lokalkoordinaten: x = Fassachse, z = Schildseite zum Gang)
export const BARREL = { L: 1.5, R: 0.62, K: 0.16, CY: 0.78, TOP: 1.4 };
export const GLASS_Y = 1.46; // Oberkante der Glasscheibe (Fass-Lokalkoordinaten)
export const barrelTopY = (a) => BARREL.CY + BARREL.R * (1 - BARREL.K * Math.pow(a / (BARREL.L / 2), 2)); // Oberkante bei Achsposition a

// Nischenbelegung (Produkt-ID). Seite -1 = links, +1 = rechts; k = Nische von vorn nach hinten.
export const FASS_PLAN = [
  ['gin', -1, 0], ['wodka', -1, 1], ['rum', -1, 2], ['rum-orange', -1, 3], ['whisky', -1, 4], ['hierber-fruucht', -1, 5], ['vieux-marc', -1, 6],
  ['kirsch', 1, 0], ['framboise', 1, 1], ['quetsch', 1, 2], ['poire-williams', 1, 3], ['mirabelle', 1, 4], ['vieille-prune', 1, 5], ['vieille-pomme', 1, 6],
];

/** Pose eines Fasses: leicht unregelmäßig (Versatz, Drehung), n = Blickrichtung zum Gang, t = „rechts“ (Fassachse +x). */
export function barrelPose(side, k, seed) {
  const r = rng(seed * 977 + k * 31 + (side > 0 ? 7 : 3));
  const jitter = (a) => (r() - 0.5) * 2 * a;
  const x = side * (HALL.A + 0.78 + jitter(0.1));
  const z = bayZ(k) + jitter(0.22);
  const yaw = (side < 0 ? Math.PI / 2 : -Math.PI / 2) + jitter(0.1);
  const roll = r() * Math.PI * 2; // Drehung um die Achse (andere Dauben-Muster)
  const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
  const n = new THREE.Vector3(0, 0, 1).applyQuaternion(q); // Schildseite
  const t = new THREE.Vector3(1, 0, 0).applyQuaternion(q); // Fassachse (auf dem Bildschirm rechts)
  return { pos: new THREE.Vector3(x, 0, z), yaw, roll, n, t, q, age: r(), hoop: (r() * 3) | 0 };
}

// Probiertisch am Gangende (Flaschen der Regalwand werden hierher geholt)
export const TABLE = { x: 0, z: -18.75, top: 0.94, w: 1.9, d: 0.95 };
// Regalwand an der Stirnwand
export const SHELF = { z: -21.0, depth: 0.5, halfW: 3.0, rows: [0.62, 1.42, 2.22], top: 3.0 };

/** Regalplätze (Mitte der Flaschenstandfläche) für n Flaschen: 3 Reihen, von oben-links nach unten-rechts. */
export function shelfSlots(n) {
  const r = rng(4711), perRow = Math.ceil(n / SHELF.rows.length), slots = [];
  for (let i = 0; i < n; i++) {
    const row = Math.floor(i / perRow), col = i % perRow;
    const rowRev = SHELF.rows.length - 1 - row; // erste Sorten oben
    const span = SHELF.halfW * 2 - 1.0, x = -SHELF.halfW + 0.5 + (perRow === 1 ? span / 2 : (span * col) / (perRow - 1)) + (r() - 0.5) * 0.14;
    slots.push({ x, y: SHELF.rows[rowRev], z: SHELF.z + (r() - 0.5) * 0.06, yaw: (r() - 0.5) * 0.3, row: rowRev, col });
  }
  return slots;
}
