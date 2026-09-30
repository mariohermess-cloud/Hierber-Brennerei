// Regalwand an der Stirnwand (Flaschen der übrigen Sorten) und Probiertisch, Kisten, Kerzen.
import * as THREE from 'three';
import * as TX from './textures.js';
import { HALL, SHELF, TABLE } from './layout.js';

/** Quader mit Meter-UV (Maserung nicht gestreckt). */
function boxGeo(w, h, d, tile = 1.1) {
  const g = new THREE.BoxGeometry(w, h, d), uv = g.attributes.uv;
  const dims = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
  for (let f = 0; f < 6; f++) for (let i = 0; i < 4; i++) { const k = f * 4 + i; uv.setXY(k, uv.getX(k) * dims[f][0] / tile, uv.getY(k) * dims[f][1] / tile); }
  return g;
}

export function buildShelfAndTable(scene, cellar, { env, mobile }) {
  const M = cellar.mats, group = new THREE.Group(); group.name = 'regal-tisch'; scene.add(group);
  const box = (w, h, d, mat, x, y, z, cast = true) => { const m = new THREE.Mesh(boxGeo(w, h, d), mat); m.position.set(x, y, z); m.castShadow = cast; m.receiveShadow = true; group.add(m); return m; };
  const hw = SHELF.halfW + 0.2, zc = SHELF.z, dd = SHELF.depth;

  // Regal: Rückwand, Pfosten, Böden, Kranz
  const bg = new THREE.PlaneGeometry(hw * 2, SHELF.top + 0.2); { const u = bg.attributes.uv; for (let i = 0; i < u.count; i++) u.setXY(i, u.getX(i) * hw * 2 / 1.1, u.getY(i) * (SHELF.top + 0.2) / 1.1); }
  const back = new THREE.Mesh(bg, M.plankDarkMat); back.position.set(0, (SHELF.top + 0.2) / 2, zc - dd / 2 + 0.02); back.receiveShadow = true; group.add(back);
  for (const x of [-hw, -1.875, 1.875, hw]) box(0.12, SHELF.top + 0.2, dd, M.plankMat, x, (SHELF.top + 0.2) / 2, zc);
  for (const y of SHELF.rows) box(hw * 2, 0.05, dd, M.plankMat, 0, y - 0.025, zc);
  box(hw * 2 + 0.2, 0.1, dd + 0.08, M.plankMat, 0, SHELF.top + 0.1, zc);
  box(hw * 2, 0.12, dd, M.plankDarkMat, 0, 0.06, zc);

  // Scheinlicht: weiche warme Flecken auf der Rückwand (Laternen- und Kerzenschein), kein echtes Licht
  for (const [x, y, w, o] of [[-1.7, 1.15, 3.2, 0.32], [1.6, 1.95, 3.4, 0.3], [-0.2, 2.75, 3.6, 0.24], [2.2, 0.95, 2.6, 0.22]]) {
    const gl = new THREE.Mesh(new THREE.PlaneGeometry(w, w * 0.62), new THREE.MeshBasicMaterial({ map: cellar.tex.poolTex, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, opacity: o, fog: false }));
    gl.position.set(x, y, zc - dd / 2 + 0.04); group.add(gl);
  }

  // Kisten am Boden vor dem Regal
  const crateMat = M.plankMat;
  const crate = (x, z, s = 1, ry = 0) => {
    const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry; group.add(g);
    const b = new THREE.Mesh(boxGeo(0.74 * s, 0.4 * s, 0.5 * s), crateMat); b.position.y = 0.2 * s; b.castShadow = true; b.receiveShadow = true; g.add(b);
    for (const sx of [-1, 1]) { const p = new THREE.Mesh(boxGeo(0.06 * s, 0.42 * s, 0.54 * s), M.plankDarkMat); p.position.set(sx * 0.35 * s, 0.2 * s, 0); p.castShadow = true; g.add(p); }
    return g;
  };
  crate(-2.5, zc + 0.62, 1, 0.12); crate(-1.9, zc + 0.6, 0.9, -0.08); crate(2.4, zc + 0.62, 1, -0.1);
  const c2 = crate(-2.45, zc + 0.6, 0.9, 0.05); c2.position.y = 0.4 * 1;
  if (!mobile) { const c3 = crate(2.35, zc + 0.6, 0.85, 0.2); c3.position.y = 0.4; }

  // Kisten und kleine Fässer am Eingang und an den Pilastern (Weinkeller-Atmosphäre)
  if (!mobile) {
    const wr = TX.rng(55);
    for (const [x, z, sc, ry] of [[-3.0, 8.4, 1, 0.1], [-2.95, 7.7, 0.9, -0.05], [-3.0, 8.1, 0.85, 0.2], [3.0, 9.6, 1, -0.1], [2.95, 8.9, 0.9, 0.05], [3.05, 12.2, 1, 0.15], [-3.0, 11.6, 0.95, -0.15]]) {
      const c = crate(x, z, sc, ry + (wr() - 0.5) * 0.1);
      if (wr() < 0.5) c.position.y = 0;
    }
    const c4 = crate(-2.98, 8.1, 0.85, 0.2); c4.position.y = 0.4 * 0.85 + 0.4;
    const c5 = crate(3.0, 9.3, 0.8, 0.0); c5.position.y = 0.4 * 0.9;
  }

  // Probiertisch
  const tg = new THREE.Group(); tg.position.set(TABLE.x, 0, TABLE.z); group.add(tg);
  const tbox = (w, h, d, mat, x, y, z) => { const m = new THREE.Mesh(boxGeo(w, h, d), mat); m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; tg.add(m); return m; };
  tbox(TABLE.w, 0.08, TABLE.d, M.plankMat, 0, TABLE.top - 0.04, 0);
  tbox(TABLE.w - 0.1, 0.1, 0.08, M.plankDarkMat, 0, TABLE.top - 0.13, TABLE.d / 2 - 0.1);
  tbox(TABLE.w - 0.1, 0.1, 0.08, M.plankDarkMat, 0, TABLE.top - 0.13, -TABLE.d / 2 + 0.1);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) tbox(0.11, TABLE.top - 0.08, 0.11, M.plankDarkMat, sx * (TABLE.w / 2 - 0.12), (TABLE.top - 0.08) / 2, sz * (TABLE.d / 2 - 0.12));
  tbox(TABLE.w - 0.3, 0.06, 0.07, M.plankDarkMat, 0, 0.22, 0);
  // Holzuntersetzer für das Glas
  const tray = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.115, 0.012, 32), M.plankDarkMat); tray.position.set(0, TABLE.top + 0.006, 0); tray.receiveShadow = true; tg.add(tray);
  const shadowMat = new THREE.MeshBasicMaterial({ map: TX.blobShadowTexture(), transparent: true, depthWrite: false, opacity: 0.7, color: 0x000000 });
  const tsh = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.5), shadowMat); tsh.rotation.x = -Math.PI / 2; tsh.position.set(0, 0.016, 0); tg.add(tsh);

  // Kerzen (Flamme = Sprite, kein echtes Licht)
  const flameTex = TX.flameTexture(), glowTex = cellar.tex.glowTex;
  const candles = [];
  const wax = new THREE.MeshStandardMaterial({ color: 0xe8d9b8, roughness: 0.6, envMap: env, envMapIntensity: 0.3, emissive: 0x3a2410, emissiveIntensity: 0.6 });
  const candle = (parent, x, y, z, h) => {
    const c = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.024, h, 12), wax); c.position.set(x, y + h / 2, z); parent.add(c);
    const fl = new THREE.Sprite(new THREE.SpriteMaterial({ map: flameTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, fog: false })); fl.scale.set(0.07, 0.13, 1); fl.position.set(x, y + h + 0.06, z); parent.add(fl);
    const ha = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.6, fog: false })); ha.scale.setScalar(0.9); ha.position.copy(fl.position); parent.add(ha);
    candles.push({ fl, ha, ph: Math.random() * 50 });
  };
  candle(tg, -0.72, TABLE.top, -0.26, 0.22); candle(tg, -0.58, TABLE.top, -0.3, 0.14); candle(tg, 0.86, TABLE.top, -0.28, 0.18);
  candle(group, -1.3, SHELF.rows[1], zc + 0.1, 0.16); candle(group, 1.7, SHELF.rows[0], zc + 0.12, 0.2);
  if (!mobile) candle(group, 0.4, SHELF.rows[2], zc + 0.12, 0.12);

  // Kontaktschatten unter den Regalflaschen: Decal je Bodenbrett wird von main gesetzt (siehe placeShelfBottle)
  const tableStage = {
    kind: 'tisch', index: -1, product: null, root: tg, glassAnchor: (() => { const a = new THREE.Group(); a.position.y = TABLE.top + 0.012; tg.add(a); return a; })(),
    glassY: TABLE.top + 0.012, dim: [], pick: [], bottleHome: new THREE.Vector3(-0.62, TABLE.top + 0.0, 0),
    pose: { pos: new THREE.Vector3(TABLE.x, 0, TABLE.z), n: new THREE.Vector3(0, 0, 1), t: new THREE.Vector3(1, 0, 0) },
    setDim() {},
  };

  return {
    group, tableStage, candles,
    blobMat: shadowMat,
    update(t, calm) {
      for (const c of candles) {
        const f = calm ? 1 : 1 + 0.12 * Math.sin(t * 11 + c.ph) + 0.08 * Math.sin(t * 27 + c.ph * 3);
        c.fl.scale.set(0.07 * (2 - f), 0.13 * f, 1); c.fl.material.opacity = 0.85 + 0.15 * f; c.ha.material.opacity = 0.3 + 0.3 * f;
      }
    },
  };
}
