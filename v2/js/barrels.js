// Eichenfässer in den Nischen: geteilte Geometrien (Instancing) mit Patina je Fass, Messingschild,
// von unten warm beleuchtete Glasscheibe. Flaschen und Gläser werden von main.js daran gehängt.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import * as TX from './textures.js';
import { BARREL, GLASS_Y, barrelPose, barrelTopY } from './layout.js';

const { L, R, K, CY, TOP } = BARREL;
const rAt = (a) => R * (1 - K * Math.pow(a / (L / 2), 2));

/** Geteilte Fass-Geometrien (Lokalkoordinaten wie in layout.js: Achse = x, Boden y = 0). */
function barrelGeometries(mobile) {
  // Daubenkörper (Drehkörper um X), Mittelpunkt im Ursprung; Chimes (Ränder) angefügt
  const prof = [];
  for (let k = 0; k <= 18; k++) { const a = -L / 2 + (L * k) / 18; prof.push(new THREE.Vector2(rAt(a), a)); }
  const body = new THREE.LatheGeometry(prof, mobile ? 28 : 48); body.rotateZ(-Math.PI / 2);
  const rEnd = rAt(L / 2);
  const chimes = [-1, 1].map((s) => { const c = new THREE.TorusGeometry(rEnd - 0.004, 0.02, 8, mobile ? 24 : 40); c.rotateY(Math.PI / 2); c.translate(s * (L / 2), 0, 0); return c; });
  const wood = mergeGeometries([body, ...chimes], false);

  // Böden (Stirnseiten) in Fass-Lokalkoordinaten (mit CY)
  const heads = [-1, 1].map((s) => { const h = new THREE.CircleGeometry(rEnd * 0.97, 40); h.rotateY(s * Math.PI / 2); h.translate(s * (L / 2 - 0.02), CY, 0); return h; });
  const headG = mergeGeometries(heads, false);

  // Reifen + Messingring der Glasscheibe
  const parts = [];
  for (const a of [-0.66, -0.44, 0.44, 0.66]) {
    const h = new THREE.CylinderGeometry(rAt(a) + 0.012, rAt(a) + 0.012, 0.07, mobile ? 32 : 64, 1, true); h.rotateZ(Math.PI / 2); h.translate(a, CY, 0); parts.push(h);
  }
  const hoops = mergeGeometries(parts, false);
  const collar = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 48, 1, true); collar.translate(0, TOP - 0.02, 0);
  const ring = new THREE.TorusGeometry(0.3, 0.013, 8, 48); ring.rotateX(Math.PI / 2); ring.translate(0, TOP + 0.03, 0);
  const brass = mergeGeometries([collar, ring], false);

  // Auflagen (Keile)
  const cr = [-1, 1].map((s) => { const c = new THREE.BoxGeometry(0.2, 0.34, 0.95); c.translate(s * 0.46, 0.17, 0); return c; });
  const cradle = mergeGeometries(cr, false);
  return { wood, headG, hoops, cradle, brass };
}

const METALS = [[0.56, 0.28, 0.14], [0.56, 0.4, 0.15], [0.2, 0.19, 0.18], [0.46, 0.32, 0.22], [0.28, 0.4, 0.32]]; // Kupfer, Messing, Eisen, altes Kupfer, Patina

/**
 * Baut alle Fass-Stufen.
 * plan: [{ product, side, k }], cellar: aus buildCellar (Materialien), opts: {env, mobile, plateMat, scene}
 */
export function buildBarrels(scene, cellar, plan, { env, mobile, plateMat }) {
  const G = barrelGeometries(mobile), M = cellar.mats;
  const n = plan.length;
  const mkInst = (geo, mat, cast) => { const m = new THREE.InstancedMesh(geo, mat, n); m.castShadow = cast; m.receiveShadow = true; m.frustumCulled = false; m.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(n * 3), 3); scene.add(m); return m; };
  const iWood = mkInst(G.wood, M.wood, true), iHead = mkInst(G.headG, M.headMat, false), iHoop = mkInst(G.hoops, M.hoopMat, false), iCradle = mkInst(G.cradle, M.plankDarkMat, true), iBrass = mkInst(G.brass, M.brassMat, false);
  const insts = [iWood, iHead, iHoop, iCradle, iBrass];
  const base = insts.map(() => new Float32Array(n * 3));

  const shadowTex = TX.blobShadowTexture();
  const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false, opacity: 0.85, fog: true, color: 0x000000 });
  const shadowGeo = new THREE.PlaneGeometry(2.7, 2.1);
  const glowTex = TX.glowTexture([[0, 'rgba(255,190,105,1)'], [0.55, 'rgba(235,125,40,1)'], [1, 'rgba(110,45,8,1)']]);
  const haloTex = TX.glowTexture([[0, 'rgba(255,180,90,.9)'], [0.4, 'rgba(255,140,50,.35)'], [1, 'rgba(255,120,30,0)']]);
  const glowGeo = new THREE.CircleGeometry(0.285, 40), plateGeo = new THREE.CylinderGeometry(0.29, 0.29, 0.03, 48), plaqueGeo = new THREE.PlaneGeometry(0.46, 0.215);
  const pickGeo = new THREE.BoxGeometry(1.75, 1.5, 1.4);

  const tmpM = new THREE.Matrix4(), rootM = new THREE.Matrix4(), bodyM = new THREE.Matrix4(), q = new THREE.Quaternion(), qr = new THREE.Quaternion(), one = new THREE.Vector3(1, 1, 1);
  const stages = plan.map(({ product: p, side, k }, i) => {
    const pose = barrelPose(side, k, i + 1);
    const root = new THREE.Group(); root.position.copy(pose.pos); root.rotation.y = pose.yaw; scene.add(root);
    const tq = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), (pose.age - 0.5) * 0.04); // leichte Neigung auf den Auflagen
    rootM.compose(pose.pos, pose.q.clone().multiply(tq), one);
    qr.setFromAxisAngle(new THREE.Vector3(1, 0, 0), pose.roll);
    bodyM.copy(rootM).multiply(tmpM.compose(new THREE.Vector3(0, CY, 0), qr, one));
    iWood.setMatrixAt(i, bodyM); iHead.setMatrixAt(i, rootM); iHoop.setMatrixAt(i, rootM); iCradle.setMatrixAt(i, rootM); iBrass.setMatrixAt(i, rootM);
    // Patina: Alter bestimmt Helligkeit/Graustich des Holzes, Metall wechselt (Kupfer/Messing/Eisen)
    const a = pose.age, wc = new THREE.Color().setRGB(1.0 - a * 0.16, 0.96 - a * 0.22, 0.9 - a * 0.28).multiplyScalar(0.78 + (1 - a) * 0.34);
    const mc = new THREE.Color(...METALS[(i * 2 + pose.hoop) % METALS.length]);
    const cols = [wc, wc.clone().multiplyScalar(0.92), mc, new THREE.Color(1, 1, 1), new THREE.Color(1, 1, 1)];
    insts.forEach((m, j) => { base[j][i * 3] = cols[j].r; base[j][i * 3 + 1] = cols[j].g; base[j][i * 3 + 2] = cols[j].b; m.setColorAt(i, cols[j]); });

    // Kontaktschatten
    const sh = new THREE.Mesh(shadowGeo, shadowMat); sh.rotation.x = -Math.PI / 2; sh.position.set(0, 0.016, 0.05); root.add(sh);

    const dim = [];
    // Messingschild
    const plaqueMat = new THREE.MeshStandardMaterial({ map: TX.plaqueTexture(p), metalness: 0.7, roughness: 0.4, envMap: env, envMapIntensity: 1 });
    const plaque = new THREE.Mesh(plaqueGeo, plaqueMat); plaque.position.set(0, CY - 0.02, R + 0.006); root.add(plaque);
    const pq0 = plaqueMat.color.clone(); dim.push((f) => plaqueMat.color.copy(pq0).multiplyScalar(f));

    // Glühscheibe (von unten warm beleuchtet), Glasscheibe, Halo
    const glowMat = new THREE.MeshBasicMaterial({ map: glowTex, toneMapped: false });
    const glowDisc = new THREE.Mesh(glowGeo, glowMat); glowDisc.rotation.x = -Math.PI / 2; glowDisc.position.y = TOP + 0.012; root.add(glowDisc);
    const g0 = glowMat.color.clone(); dim.push((f) => glowMat.color.copy(g0).multiplyScalar(0.25 + 0.75 * f));
    const plate = new THREE.Mesh(plateGeo, plateMat); plate.position.y = TOP + 0.045; plate.renderOrder = 5; root.add(plate);
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: haloTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.6, fog: false }));
    halo.scale.setScalar(1.15); halo.position.y = TOP + 0.03; root.add(halo);
    dim.push((f) => { halo.material.opacity = 0.14 + 0.46 * f; });

    const glassAnchor = new THREE.Group(); glassAnchor.position.y = GLASS_Y; root.add(glassAnchor);
    const pickBox = new THREE.Mesh(pickGeo, new THREE.MeshBasicMaterial()); pickBox.visible = false; pickBox.position.y = 0.75; pickBox.userData.stage = i; root.add(pickBox);

    const st = {
      kind: 'fass', index: i, product: p, root, pose, glassAnchor, glassY: GLASS_Y, dim, pick: [pickBox], halo, glowMat, plate,
      bottleHome: new THREE.Vector3(-0.58, barrelTopY(-0.58), 0),
      setDim(f) {
        dim.forEach((fn) => fn(f));
        insts.forEach((m, j) => { const c = new THREE.Color(base[j][i * 3], base[j][i * 3 + 1], base[j][i * 3 + 2]).multiplyScalar(f); m.setColorAt(i, c); m.instanceColor.needsUpdate = true; });
      },
    };
    return st;
  });
  insts.forEach((m) => { m.instanceMatrix.needsUpdate = true; m.instanceColor.needsUpdate = true; });
  return { stages, insts, plateGeo };
}

/** Holzuntersetzer auf dem Fass, damit die Flasche gerade steht; setzt bottleHome. */
export function addCoaster(stage, bottleR, woodMat) {
  const x = stage.bottleHome.x, y = barrelTopY(x) + 0.006;
  const c = new THREE.Mesh(new THREE.CylinderGeometry(bottleR + 0.03, bottleR + 0.035, 0.03, 32), woodMat);
  c.position.set(x, y - 0.006, 0); c.receiveShadow = true; stage.root.add(c);
  stage.bottleHome.set(x, y + 0.009, 0);
  return c;
}
