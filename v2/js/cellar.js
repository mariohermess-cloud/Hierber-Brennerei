// Kellergang v2: Tonnengewölbe (Backstein), Steinbögen, Wände mit Nischen, Bodenplatten, Laternen,
// Lichtstrahlen (Volumenkegel), Staub, Pfützen. Scheinlichter (Halos, Lichtflecken) statt vieler echter Lichter.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import * as TX from './textures.js';
import { HALL, bayZ, pilasterZ } from './layout.js';

const V = (x, y, z) => new THREE.Vector3(x, y, z);

/** Umgebungskarte aus einer kleinen Lichtszene (Reflexe für Glas/Metall). */
export function makeEnvMap(renderer) {
  const s = new THREE.Scene();
  s.add(new THREE.Mesh(new THREE.BoxGeometry(24, 12, 24), new THREE.MeshBasicMaterial({ color: 0x24130a, side: THREE.BackSide })));
  const panel = (w, h, pos, rgb) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(rgb[0], rgb[1], rgb[2]), side: THREE.DoubleSide }));
    m.position.set(...pos); m.lookAt(0, 0, 0); s.add(m);
  };
  panel(7, 3, [0, 5, -2], [9, 6.2, 3.2]);
  panel(3, 4, [-9, 2, 0], [7, 3.8, 1.4]);
  panel(3, 4, [9, 2, 0], [7, 3.8, 1.4]);
  panel(5, 2.5, [0, 2, 9], [3.6, 2.4, 1.3]);
  panel(4, 4, [0, 3, -10], [2.4, 1.5, 0.7]);
  panel(1.6, 6, [-4, 3, 8], [1.2, 2.4, 1.6]);
  panel(2.2, 5, [5, 2.5, 7], [4, 3, 1.6]);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(s, 0.035);
  pm.dispose();
  return rt.texture;
}

/** Bogenfläche (Halbellipse) zwischen z0 und z1, Normalen nach innen. UV in Metern / tile. */
export function archGeometry({ W, H, y0, z0, z1, inset = 0, seg = 40, tile = 1 }) {
  const w = W - inset, h = H - inset;
  const pos = [], nor = [], uv = [], idx = [], arc = [0];
  const pt = (i) => { const th = (Math.PI * i) / seg; return [w * Math.cos(th), y0 + h * Math.sin(th), th]; };
  for (let i = 1; i <= seg; i++) { const a = pt(i - 1), b = pt(i); arc[i] = arc[i - 1] + Math.hypot(b[0] - a[0], b[1] - a[1]); }
  for (let k = 0; k < 2; k++) {
    const z = k ? z1 : z0;
    for (let i = 0; i <= seg; i++) {
      const [x, y, th] = pt(i);
      pos.push(x, y, z);
      const nx = -Math.cos(th) / w, ny = -Math.sin(th) / h, l = Math.hypot(nx, ny);
      nor.push(nx / l, ny / l, 0);
      uv.push(arc[i] / tile, Math.abs(z - z0) / tile);
    }
  }
  for (let i = 0; i < seg; i++) { const a = i, b = i + 1, c = seg + 1 + i, d = seg + 2 + i; idx.push(a, c, b, b, c, d); }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  return g;
}

/** Stirnfläche eines Gurtbogens: Band zwischen zwei Halbellipsen. */
function archRing({ W, H, y0, z, insetA, insetB, seg = 40, flip = false }) {
  const pos = [], nor = [], uv = [], idx = [];
  for (let i = 0; i <= seg; i++) {
    const th = (Math.PI * i) / seg;
    [insetA, insetB].forEach((ins, k) => { pos.push((W - ins) * Math.cos(th), y0 + (H - ins) * Math.sin(th), z); nor.push(0, 0, flip ? -1 : 1); uv.push(i / 6, k * 0.15); });
  }
  for (let i = 0; i < seg; i++) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  return g;
}

const uvShift = (geo, du, dv) => { const a = geo.attributes.uv; for (let i = 0; i < a.count; i++) a.setXY(i, a.getX(i) + du, a.getY(i) + dv); return geo; };
const planeM = (w, h) => { const g = new THREE.PlaneGeometry(w, h); const a = g.attributes.uv; for (let i = 0; i < a.count; i++) a.setXY(i, a.getX(i) * w, a.getY(i) * h); return g; };

/** Halbellipsenpunkte von (-rx, y0) über den Scheitel nach (rx, y0). */
const archPts = (rx, ry, y0, n = 24) => Array.from({ length: n + 1 }, (_, i) => { const th = Math.PI - (Math.PI * i) / n; return [rx * Math.cos(th), y0 + ry * Math.sin(th)]; });

/** Wandfeld eines Jochs mit bogenförmiger Nischenöffnung (Loch). UV = Meter. */
function wallPanelGeometry() {
  const { BAY: L, Y0, OW, HS, ORISE } = HALL, hw = L / 2;
  const s = new THREE.Shape();
  s.moveTo(-hw, -0.05); s.lineTo(hw, -0.05); s.lineTo(hw, Y0); s.lineTo(-hw, Y0); s.lineTo(-hw, -0.05);
  const hole = new THREE.Path();
  hole.moveTo(-OW / 2, 0); hole.lineTo(-OW / 2, HS);
  for (const [x, y] of archPts(OW / 2, ORISE, HS, 28).slice(1)) hole.lineTo(x, y);
  hole.lineTo(OW / 2, 0); hole.lineTo(-OW / 2, 0);
  s.holes.push(hole);
  return new THREE.ShapeGeometry(s, 8);
}
/** Rückwand der Nische: Rechteck + Halbellipse. */
function recessBackGeometry() {
  const { OW, HS, ORISE } = HALL, s = new THREE.Shape();
  s.moveTo(-OW / 2, 0); s.lineTo(OW / 2, 0); s.lineTo(OW / 2, HS);
  for (const [x, y] of archPts(OW / 2, ORISE, HS, 28).reverse().slice(1)) s.lineTo(x, y);
  s.lineTo(-OW / 2, 0);
  return new THREE.ShapeGeometry(s, 8);
}
/** Steinbogen-Rahmen um die Nischenöffnung (U-Profil, extrudiert). */
function archFrameGeometry() {
  const { OW, HS, ORISE } = HALL, t = 0.24, s = new THREE.Shape();
  s.moveTo(-OW / 2 - t, 0); s.lineTo(-OW / 2 - t, HS);
  archPts(OW / 2 + t, ORISE + t, HS, 28).slice(1).forEach(([x, y]) => s.lineTo(x, y));
  s.lineTo(OW / 2 + t, 0); s.lineTo(OW / 2, 0); s.lineTo(OW / 2, HS);
  archPts(OW / 2, ORISE, HS, 28).reverse().slice(1).forEach(([x, y]) => s.lineTo(x, y));
  s.lineTo(-OW / 2, 0); s.lineTo(-OW / 2 - t, 0);
  return new THREE.ExtrudeGeometry(s, { depth: 0.2, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 1, curveSegments: 1 });
}

const mergeMeshes = (meshes) => {
  const gs = meshes.map((m) => { m.updateMatrix(); const g = m.geometry.clone(); g.applyMatrix4(m.matrix); return g; });
  return mergeGeometries(gs, false);
};

/**
 * Baut Hülle, Beleuchtung und Atmosphäre. Rückgabe: Materialien (für Fässer/Regale), Update-Funktion, Tier-Umschalter.
 */
export function buildCellar(scene, { mobile, env, texSize }) {
  const { A, Y0, RISE, ZN, ZF, NBAYS, D, BAY } = HALL;
  const std = (o) => new THREE.MeshStandardMaterial({ envMap: env, ...o });
  const shadowCasters = [], shadowReceivers = [];
  const group = new THREE.Group(); group.name = 'keller-huelle'; scene.add(group);

  /* ----- Texturen und Materialien ----- */
  const brick = TX.brickSet(texSize), wall = TX.stoneSet(texSize, { nx: 11, ny: 13, seed: 5, pal: 'wall', moss: 0.22, jitter: 0.6 }), rib = TX.ashlarSet(texSize);
  const floorT = TX.stoneSet(texSize, { nx: 7, ny: 9, seed: 29, pal: 'floor', moss: 0.3, jitter: 0.55 });
  const rep = (set, r) => Object.values(set).forEach((t) => t.repeat.set(r, r));
  rep(brick, 0.5); rep(wall, 1 / 3); rep(rib, 1 / 2.2);
  const brickMat = std({ map: brick.map, normalMap: brick.normal, roughnessMap: brick.rough, normalScale: new THREE.Vector2(1.1, 1.1), roughness: 1, envMapIntensity: 0.22, side: THREE.DoubleSide, color: 0xb0a49a });
  const wallMat = std({ map: wall.map, normalMap: wall.normal, roughnessMap: wall.rough, normalScale: new THREE.Vector2(0.75, 0.75), roughness: 1, envMapIntensity: 0.22, side: THREE.DoubleSide, color: 0xbeb2a4 });
  const ribMat = std({ map: rib.map, normalMap: rib.normal, roughnessMap: rib.rough, normalScale: new THREE.Vector2(0.9, 0.9), roughness: 1, envMapIntensity: 0.3, side: THREE.DoubleSide, color: 0xd6c8b4 });
  const fsize = { w: (A + D + 0.3) * 2, l: ZN - ZF };
  floorT.map.repeat.set(fsize.w / 3, fsize.l / 3); floorT.normal.repeat.copy(floorT.map.repeat); floorT.rough.repeat.copy(floorT.map.repeat);
  const floorMat = std({ map: floorT.map, normalMap: floorT.normal, roughnessMap: floorT.rough, normalScale: new THREE.Vector2(1.0, 1.0), roughness: 1, envMapIntensity: 0.5, color: 0xa39a90 });

  // Holz (Fässer, Bretter)
  const woodStave = TX.woodStaveSet(texSize), head = TX.woodHeadMap(), metalR = TX.metalRoughMap();
  const plank = TX.plankSet(Math.min(texSize, 512)), plankDark = TX.plankSet(Math.min(texSize, 512), { seed: 63, boards: 4, tint: [86, 56, 34] });
  const wood = std({ map: woodStave.map, normalMap: woodStave.normal, roughnessMap: woodStave.rough, normalScale: new THREE.Vector2(0.8, 0.8), roughness: 1, envMapIntensity: 0.35, color: 0xffffff });
  const headMat = std({ map: head, roughness: 0.72, envMapIntensity: 0.35, color: 0xffffff });
  const hoopMat = std({ color: 0xffffff, metalness: 0.78, roughness: 1.3, roughnessMap: metalR, envMapIntensity: 0.32, side: THREE.DoubleSide });
  const brassMat = std({ color: 0xb8903c, metalness: 1, roughness: 0.62, roughnessMap: metalR, envMapIntensity: 0.9, side: THREE.DoubleSide });
  const plankMat = std({ map: plank.map, normalMap: plank.normal, roughness: 0.75, envMapIntensity: 0.3, color: 0xd8c8b8 });
  const plankDarkMat = std({ map: plankDark.map, normalMap: plankDark.normal, roughness: 0.8, envMapIntensity: 0.25, color: 0xc0b0a0 });
  const iron = std({ color: 0x1b1612, metalness: 0.75, roughness: 0.5 });

  /* ----- Gewölbe, Wände, Boden ----- */
  const len = ZN - ZF, zMid = (ZN + ZF) / 2, seg = mobile ? 28 : 56;
  const vault = new THREE.Mesh(archGeometry({ W: A, H: RISE, y0: Y0, z0: ZN, z1: ZF, seg, tile: 1 }), brickMat);
  vault.receiveShadow = true; group.add(vault);

  // Stirnwand (Bruchstein) mit Bogenabschluss
  const endWall = new THREE.Mesh(new THREE.PlaneGeometry(A * 2, Y0 + RISE), wallMat);
  uvShift(endWall.geometry, 0, 0); { const a = endWall.geometry.attributes.uv; for (let i = 0; i < a.count; i++) a.setXY(i, a.getX(i) * A * 2, a.getY(i) * (Y0 + RISE)); }
  endWall.position.set(0, (Y0 + RISE) / 2, ZF); endWall.receiveShadow = true; group.add(endWall);

  // Boden mit leichter Unebenheit
  const fg = new THREE.PlaneGeometry(fsize.w, fsize.l, mobile ? 30 : 56, mobile ? 80 : 150);
  { const p = fg.attributes.position; for (let i = 0; i < p.count; i++) { const x = p.getX(i), y = p.getY(i); p.setZ(i, (Math.sin(x * 1.7 + y * 0.9) * 0.5 + Math.sin(x * 0.6 - y * 1.3 + 2) * 0.5 + Math.sin(x * 4.1 + y * 3.3) * 0.2) * 0.007); } fg.computeVertexNormals(); }
  const floor = new THREE.Mesh(fg, floorMat);
  floor.rotation.x = -Math.PI / 2; floor.position.set(0, 0, zMid); floor.receiveShadow = true; group.add(floor);

  // Wandfelder je Joch mit Nischenöffnung + Nische selbst
  const panelGeo = wallPanelGeometry(), backGeo = recessBackGeometry();
  const r = TX.rng(101);
  const OW = HALL.OW, HS = HALL.HS, RS = HALL.ORISE;
  const frameGeo = archFrameGeometry();
  for (const side of [-1, 1]) {
    const rotY = side < 0 ? Math.PI / 2 : -Math.PI / 2; // lokal +z zeigt in den Gang
    for (let k = 0; k < NBAYS; k++) {
      const g = new THREE.Group(); g.position.set(side * A, 0, bayZ(k)); g.rotation.y = rotY; group.add(g);
      const pan = new THREE.Mesh(uvShift(panelGeo.clone(), r() * 3, r() * 3), wallMat); pan.receiveShadow = true; g.add(pan);
      const back = new THREE.Mesh(uvShift(backGeo.clone(), r() * 3, r() * 3), wallMat); back.position.z = -D; back.receiveShadow = true; g.add(back);
      const tun = new THREE.Mesh(uvShift(archGeometry({ W: OW / 2, H: RS, y0: HS, z0: 0, z1: -D, seg: 22, tile: 1 }), r() * 3, r() * 3), brickMat); tun.receiveShadow = true; g.add(tun);
      for (const sx of [-1, 1]) {
        const fl = new THREE.Mesh(uvShift(planeM(D, HS), r() * 3, r() * 3), wallMat);
        fl.rotation.y = -sx * Math.PI / 2; fl.position.set(sx * OW / 2, HS / 2, -D / 2); fl.receiveShadow = true; g.add(fl);
      }
      const fr = new THREE.Mesh(frameGeo, ribMat); fr.position.z = -0.02; fr.castShadow = false; fr.receiveShadow = true; g.add(fr);
      // Nischenboden: Steinplatte leicht erhöht wirkt wie Sockel
      const sill = new THREE.Mesh(new THREE.BoxGeometry(OW + 0.3, 0.06, 0.34), ribMat); sill.position.set(0, 0.03, 0.14); sill.receiveShadow = true; g.add(sill);
    }
    // Wand vor dem ersten und hinter dem letzten Joch
    const z0 = pilasterZ(0), z1 = pilasterZ(NBAYS);
    for (const [za, zb] of [[z0, ZN], [ZF, z1]]) {
      const w = Math.abs(zb - za), pw = new THREE.Mesh(planeM(w, Y0), wallMat);
      pw.rotation.y = rotY; pw.position.set(side * A, Y0 / 2, (za + zb) / 2); pw.receiveShadow = true; group.add(pw);
    }
  }

  // Gurtbögen und Pilaster (Naturstein)
  const ribZs = []; for (let k = 0; k <= NBAYS; k++) ribZs.push(pilasterZ(k)); ribZs.push(pilasterZ(0) + BAY, pilasterZ(0) + BAY * 2, pilasterZ(NBAYS) - BAY * 0.7);
  const pilGeo = new THREE.BoxGeometry(0.46, Y0, 0.62);
  for (const zc of ribZs) {
    const m = new THREE.Mesh(archGeometry({ W: A, H: RISE, y0: Y0, z0: zc + 0.31, z1: zc - 0.31, inset: 0.36, seg, tile: 1 }), ribMat); m.receiveShadow = true; group.add(m);
    for (const z of [zc - 0.31, zc + 0.31]) group.add(new THREE.Mesh(archRing({ W: A, H: RISE, y0: Y0, z, insetA: 0.36, insetB: 0, seg }), ribMat));
    for (const sx of [-1, 1]) { const p = new THREE.Mesh(pilGeo, ribMat); p.position.set(sx * (A - 0.23), Y0 / 2, zc); p.castShadow = true; p.receiveShadow = true; group.add(p); }
  }

  // Statische Hüllenteile je Material zu einem Mesh verschmelzen (weniger Zeichenaufrufe)
  {
    group.updateMatrixWorld(true);
    const byMat = new Map(), rest = [];
    for (const ch of [...group.children]) {
      const list = [];
      ch.traverse((o) => { if (o.isMesh && o.material && (o.material === wallMat || o.material === brickMat || o.material === ribMat)) list.push(o); });
      for (const o of list) { const g = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone(); for (const n of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(n)) g.deleteAttribute(n); g.clearGroups(); g.applyMatrix4(o.matrixWorld); const key = o.material; if (!byMat.has(key)) byMat.set(key, []); byMat.get(key).push(g); o.parent.remove(o); }
    }
    for (const [mat, geos] of byMat) {
      const m = new THREE.Mesh(mergeGeometries(geos, false), mat); m.receiveShadow = true; m.castShadow = mat === ribMat; m.name = 'huelle-' + (mat === ribMat ? 'stein' : mat === brickMat ? 'ziegel' : 'wand');
      geos.forEach((g) => g.dispose()); group.add(m);
    }
  }

  /* ----- Grundlicht ----- */
  const amb = new THREE.HemisphereLight(0x9a7a5a, 0x1a0f08, 0.5);
  scene.add(amb);
  // Eingangslicht: warm, von vorn oben; wirft statische Schatten (einmal gebacken)
  const sun = new THREE.DirectionalLight(0xffc48a, 1.5);
  sun.position.set(1.5, 7.5, 17); sun.target.position.set(0, 0, -8);
  sun.shadow.mapSize.set(mobile ? 1024 : 4096, mobile ? 1024 : 4096);
  const sc = sun.shadow.camera; sc.left = -8.5; sc.right = 8.5; sc.top = 21; sc.bottom = -21; sc.near = 1; sc.far = 62; sc.updateProjectionMatrix();
  sun.shadow.bias = -0.0006; sun.shadow.normalBias = 0.03; sun.shadow.radius = 3;
  scene.add(sun, sun.target);

  /* ----- Laternen (Scheinlicht: Halo + Lichtfleck, keine echten Lichter) ----- */
  const glowTex = TX.glowTexture([[0, 'rgba(255,190,110,1)'], [0.25, 'rgba(255,150,60,.55)'], [1, 'rgba(255,120,30,0)']]);
  const poolTex = TX.glowTexture([[0, 'rgba(255,170,90,.9)'], [0.45, 'rgba(255,130,50,.35)'], [1, 'rgba(255,100,20,0)']]);
  const lanterns = [];
  const lz = [];
  for (let k = 0; k <= NBAYS; k++) lz.push([pilasterZ(k), k % 2 ? 1 : -1]);
  lz.push([pilasterZ(0) + BAY, 1]);
  const extra = new Set(); // Laternen an der Stirnwand (ohne Pilaster): Wandmontage
  for (const s of [-1, 1]) { lz.push([ZF + 1.15, s]); extra.add(`${ZF + 1.15}|${s}`); }
  const ironG = (() => {
    const parts = [];
    const add = (geo, x, y, z, rx = 0, rz = 0) => { const m = new THREE.Mesh(geo, iron); m.position.set(x, y, z); m.rotation.set(rx, 0, rz); parts.push(m); };
    add(new THREE.BoxGeometry(0.34, 0.04, 0.04), -0.17, 0, 0);
    add(new THREE.BoxGeometry(0.03, 0.34, 0.16), 0.02, 0, 0);
    add(new THREE.ConeGeometry(0.115, 0.1, 8), -0.32, -0.2 + 0.19, 0);
    add(new THREE.CylinderGeometry(0.065, 0.05, 0.04, 8), -0.32, -0.2 - 0.16, 0);
    for (let q = 0; q < 4; q++) { const a = (q / 4) * Math.PI * 2 + Math.PI / 4; add(new THREE.BoxGeometry(0.012, 0.29, 0.012), -0.32 + Math.cos(a) * 0.075, -0.2, Math.sin(a) * 0.075); }
    return mergeMeshes(parts);
  })();
  const cageGeo = new THREE.CylinderGeometry(0.075, 0.06, 0.28, 8);
  const lanternMeshes = [];
  for (const [z, sx] of lz) {
    const mo = extra.has(`${z}|${sx}`) ? 0.04 : 0.49; // Abstand der Montagefläche von der Wand
    const g = new THREE.Group(); g.position.set(sx * (A - mo), 2.2, z); if (sx < 0) g.rotation.y = Math.PI;
    const mesh = new THREE.Mesh(ironG, iron); g.add(mesh);
    const glass = new THREE.MeshBasicMaterial({ color: new THREE.Color(1.8, 1.1, 0.5), toneMapped: false });
    const cage = new THREE.Mesh(cageGeo, glass); cage.position.set(-0.32, -0.2, 0); g.add(cage);
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.85, fog: false }));
    halo.scale.setScalar(2.6); halo.position.set(-0.32, -0.2, 0); g.add(halo);
    group.add(g);
    const wx = sx * (A - mo) - sx * 0.32; // Weltposition der Flamme (x)
    // Lichtfleck auf dem Boden und an der Wand gegenüber
    const pool = new THREE.Mesh(new THREE.PlaneGeometry(4.6, 4.6), new THREE.MeshBasicMaterial({ map: poolTex, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, opacity: 0.42, fog: false }));
    pool.rotation.x = -Math.PI / 2; pool.position.set(wx - sx * 1.1, 0.02, z); group.add(pool);
    const wpool = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 3.6), new THREE.MeshBasicMaterial({ map: poolTex, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, opacity: 0.2, fog: false }));
    wpool.rotation.y = sx > 0 ? -Math.PI / 2 : Math.PI / 2; wpool.position.set(sx * (A - mo + 0.01), 2.0, z); group.add(wpool);
    lanternMeshes.push({ glass, halo, pool, wpool, ph: r() * 100, sx, z, g });
    lanterns.push(lanternMeshes[lanternMeshes.length - 1]);
  }

  /* ----- Lichtstrahlen (Volumenkegel) aus Lichtschächten im Scheitel ----- */
  const shaftMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false,
    uniforms: { uT: { value: 0 }, uI: { value: 1 }, uCol: { value: new THREE.Color(1.0, 0.82, 0.55) } },
    vertexShader: `varying vec3 vN; varying vec3 vV; varying float vH; varying vec3 vP;
      void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); vH = uv.y; vP = position; gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `uniform float uT; uniform float uI; uniform vec3 uCol; varying vec3 vN; varying vec3 vV; varying float vH; varying vec3 vP;
      void main(){ float f = pow(abs(dot(normalize(vN), normalize(vV))), 1.6);
        float fade = smoothstep(0.0, 0.08, vH) * (1.0 - smoothstep(0.3, 1.0, vH));
        float flick = 0.85 + 0.15 * sin(uT * 0.7 + vP.y * 1.3 + vP.x * 3.0);
        float a = f * fade * uI * flick * 0.16;
        gl_FragColor = vec4(uCol * a, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
  const shafts = [];
  const shaftDefs = [[-1.4, -3.0, 0.09], [1.6, -10.0, -0.1], [-0.8, -16.4, 0.07]];
  for (const [x, z, tilt] of shaftDefs) {
    const yTop = Y0 + RISE * Math.sqrt(1 - (x / A) ** 2) - 0.05, h = yTop, top = 0.2, bot = 1.05;
    const cone = new THREE.Mesh(new THREE.CylinderGeometry(top, bot, h, 24, 1, true), shaftMat);
    // uv.y: 0 an der Decke, 1 am Boden (Ausblenden im Shader)
    const uv = cone.geometry.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setY(i, 1 - uv.getY(i));
    cone.position.set(x - Math.sin(tilt) * h / 2, h / 2, z); cone.rotation.z = -tilt; cone.renderOrder = 8; group.add(cone);
    const disc = new THREE.Mesh(new THREE.CircleGeometry(0.16, 20), new THREE.MeshBasicMaterial({ color: new THREE.Color(1.5, 1.2, 0.8), toneMapped: false }));
    disc.rotation.x = Math.PI / 2; disc.position.set(x, yTop + 0.01, z); group.add(disc);
    const spot = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 2.8), new THREE.MeshBasicMaterial({ map: poolTex, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, opacity: 0.32, color: 0xffe3b0, fog: false }));
    spot.rotation.x = -Math.PI / 2; spot.position.set(x - Math.sin(tilt) * h, 0.025, z); group.add(spot);
    shafts.push({ cone, spot, disc });
  }

  /* ----- Pfützen (Reflexion der Umgebungskarte) ----- */
  const puddles = [];
  const pTex = TX.puddleTexture(3);
  const puddleMat = new THREE.MeshStandardMaterial({ color: 0x0c0806, roughness: 0.04, metalness: 0.0, envMap: env, envMapIntensity: 0.85, transparent: true, alphaMap: pTex, opacity: 0.9, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 });
  for (const [x, z, s] of [[-0.6, -5.5, 1.5], [1.1, 0.6, 1.2], [-1.0, -13, 1.7], [0.5, -8.2, 1.1], [0.2, 4.4, 1.3]]) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(s * 1.8, s), puddleMat); m.rotation.x = -Math.PI / 2; m.rotation.z = r() * 3; m.position.set(x, 0.012, z); group.add(m); puddles.push(m);
  }

  /* ----- Staub ----- */
  const N = mobile ? 220 : 700;
  const dpos = new Float32Array(N * 3), dvel = new Float32Array(N * 3), dsz = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    dpos.set([(Math.random() - 0.5) * 6.4, 0.3 + Math.random() * 4.4, 8 - Math.random() * 29], i * 3);
    dvel.set([(Math.random() - 0.5) * 0.05, 0.008 + Math.random() * 0.03, (Math.random() - 0.5) * 0.05], i * 3);
    dsz[i] = 0.6 + Math.random() * 1.2;
  }
  const dgeo = new THREE.BufferGeometry();
  dgeo.setAttribute('position', new THREE.BufferAttribute(dpos, 3));
  dgeo.setAttribute('aSize', new THREE.BufferAttribute(dsz, 1));
  const dustMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false,
    uniforms: { uMap: { value: TX.dotTexture() }, uScale: { value: 600 }, uCol: { value: new THREE.Color(1.0, 0.85, 0.6) }, uT: { value: 0 } },
    vertexShader: `attribute float aSize; uniform float uScale; uniform float uT; varying float vA;
      void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); float d = -mv.z; gl_PointSize = clamp(aSize * uScale * 0.045 / max(d, 0.5), 1.0, 14.0);
        vA = clamp(1.6 / (1.0 + d * 0.16), 0.0, 1.0) * (0.55 + 0.45 * sin(uT * 0.9 + position.x * 7.0 + position.y * 5.0)); gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `uniform sampler2D uMap; uniform vec3 uCol; varying float vA;
      void main(){ vec4 t = texture2D(uMap, gl_PointCoord); gl_FragColor = vec4(uCol * t.a * vA * 0.5, 1.0); }`,
  });
  const dust = new THREE.Points(dgeo, dustMat); dust.frustumCulled = false; dust.renderOrder = 9; group.add(dust);

  const warmA = new THREE.Color(0xffa04a), warmB = new THREE.Color(0xff6a1c), tmp = new THREE.Color();
  const cellar = {
    group, amb, sun, lanterns, shafts, puddles, dust, dustMat, mats: { wood, headMat, hoopMat, brassMat, plankMat, plankDarkMat, iron, ribMat, wallMat, brickMat, floorMat },
    tex: { plank, plankDark, glowTex, poolTex }, N, tier: null,
    /** Qualitätsstufe anwenden. */
    setTier(t) {
      this.tier = t;
      dgeo.setDrawRange(0, Math.min(N, t.dust));
      shafts.forEach((s) => { s.cone.visible = t.shafts; s.disc.visible = t.shafts; });
      puddles.forEach((p) => { p.visible = t.puddles; });
      lanterns.forEach((l) => { l.wpool.visible = t.pools; });
      sun.castShadow = !!t.shadows;
    },
    /** Laternen flackern lassen; mood: {lantern, warm, ...}. calm = weniger Bewegung. */
    update(t, dt, mood, calm) {
      dustMat.uniforms.uT.value = t; shaftMat.uniforms.uT.value = t;
      shaftMat.uniforms.uI.value = 0.35 + 0.65 * mood.lantern;
      for (const l of lanterns) {
        const f = calm ? 1 : 1 + 0.1 * Math.sin(t * 9 + l.ph) + 0.07 * Math.sin(t * 23.7 + l.ph * 2) + 0.05 * Math.sin(t * 3.1 + l.ph * 5);
        tmp.setRGB(1.8, 1.1, 0.5).multiplyScalar(0.45 + 0.55 * mood.lantern * f); tmp.lerp(warmB.clone().multiplyScalar(2), mood.warm * 0.25);
        l.glass.color.copy(tmp);
        l.halo.material.opacity = 0.35 + 0.5 * mood.lantern * f;
        l.pool.material.opacity = (0.16 + 0.3 * mood.lantern) * f;
        l.wpool.material.opacity = (0.06 + 0.16 * mood.lantern) * f;
      }
      if (calm) return;
      const p = dpos, hi = Math.min(N, this.tier ? this.tier.dust : N);
      for (let i = 0; i < hi; i++) {
        const k = i * 3;
        p[k] += (dvel[k] + Math.sin(t * 0.3 + i) * 0.008) * dt;
        p[k + 1] += dvel[k + 1] * dt;
        p[k + 2] += (dvel[k + 2] + Math.cos(t * 0.27 + i) * 0.008) * dt;
        if (p[k + 1] > 4.9) p[k + 1] = 0.2;
      }
      dgeo.attributes.position.needsUpdate = true;
    },
  };
  return cellar;
}
