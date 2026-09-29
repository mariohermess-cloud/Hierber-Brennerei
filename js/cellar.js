// Gewölbekeller: Umgebung, Tonnengewölbe, Boden, Laternen, Staub, Fässer.
import * as THREE from 'three';
import * as TX from './textures.js';

// Geometrie der Fassreihe: Bogen (konkav zur Kamera), Fässer liegen tangential.
export const LAYOUT = { W: 9, Y0: 1.8, H: 4.2, ARC_R: 15, ARC_Z0: 8, SPACING: 0.174, COUNT: 6 };
export const BARREL = { L: 1.5, R: 0.62, K: 0.16, CY: 0.78, TOP: 1.4 };
export const GLASS_Y = 1.46; // Oberkante der Glasscheibe (Fass-Lokalkoordinaten)

const V = (x, y, z) => new THREE.Vector3(x, y, z);

/** Position/Orientierung von Fass i in Weltkoordinaten. n = Blickrichtung nach vorn, t = Tangente (nach rechts). */
export function barrelPose(i) {
  const th = (i - (LAYOUT.COUNT - 1) / 2) * LAYOUT.SPACING;
  const { ARC_R: R, ARC_Z0: Z0 } = LAYOUT;
  return {
    th,
    pos: V(R * Math.sin(th), 0, Z0 - R * Math.cos(th)),
    n: V(-Math.sin(th), 0, Math.cos(th)),
    t: V(Math.cos(th), 0, Math.sin(th)),
  };
}

/** Umgebungskarte aus einer kleinen Lichtszene (Reflexe für Glas/Kupfer). */
export function makeEnvMap(renderer) {
  const s = new THREE.Scene();
  s.add(new THREE.Mesh(new THREE.BoxGeometry(24, 12, 24), new THREE.MeshBasicMaterial({ color: 0x24130a, side: THREE.BackSide })));
  const panel = (w, h, pos, rgb) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(rgb[0], rgb[1], rgb[2]), side: THREE.DoubleSide }));
    m.position.set(...pos); m.lookAt(0, 0, 0); s.add(m);
  };
  panel(7, 3, [0, 5, -2], [8, 5.2, 2.6]);
  panel(3, 4, [-9, 2, 0], [6, 3.2, 1.2]);
  panel(3, 4, [9, 2, 0], [6, 3.2, 1.2]);
  panel(5, 2.5, [0, 2, 9], [3.2, 2.2, 1.2]);
  panel(4, 4, [0, 3, -10], [2, 1.3, 0.6]);
  panel(1.6, 6, [-4, 3, 8], [1.2, 2.4, 1.6]); // grüner Akzent
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(s, 0.035);
  pm.dispose();
  return rt.texture;
}

/** Bogen-Fläche (Halbellipse) zwischen z0 und z1, Normalen nach innen. */
function archGeometry({ W, H, y0, z0, z1, inset = 0, seg = 40, tile = 2.4 }) {
  const w = W - inset, h = H - inset;
  const pos = [], nor = [], uv = [], idx = [];
  const arc = [0];
  const pt = (i) => { const th = (Math.PI * i) / seg; return [w * Math.cos(th), y0 + h * Math.sin(th), th]; };
  for (let i = 1; i <= seg; i++) {
    const a = pt(i - 1), b = pt(i);
    arc[i] = arc[i - 1] + Math.hypot(b[0] - a[0], b[1] - a[1]);
  }
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
  for (let i = 0; i < seg; i++) {
    const a = i, b = i + 1, c = seg + 1 + i, d = seg + 2 + i;
    idx.push(a, c, b, b, c, d);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  return g;
}

/** Stirnfläche eines Gurtbogens: Band zwischen zwei Halbellipsen. */
function archRing({ W, H, y0, z, insetA, insetB, seg = 40 }) {
  const pos = [], nor = [], uv = [], idx = [];
  for (let i = 0; i <= seg; i++) {
    const th = (Math.PI * i) / seg;
    [insetA, insetB].forEach((ins, k) => {
      pos.push((W - ins) * Math.cos(th), y0 + (H - ins) * Math.sin(th), z);
      nor.push(0, 0, 1);
      uv.push(i / 6, k * 0.15);
    });
  }
  for (let i = 0; i < seg; i++) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  return g;
}

/** Gewölbe, Boden, Laternen, Staub. */
export function buildCellar(scene, { mobile, env }) {
  const { W, Y0, H } = LAYOUT;
  const zNear = 12, zFar = -28, len = zNear - zFar;
  const std = (o) => new THREE.MeshStandardMaterial({ envMap: env, ...o });

  // Wände / Gewölbe
  const brick = TX.brickMaps([1, 1]);
  const brickMat = std({ map: brick.map, bumpMap: brick.bump, bumpScale: 2.2, roughness: 0.92, envMapIntensity: 0.25, side: THREE.DoubleSide, color: 0x8f8279 });
  const vault = new THREE.Mesh(archGeometry({ W, H, y0: Y0, z0: zNear, z1: zFar, seg: mobile ? 28 : 48 }), brickMat);
  scene.add(vault);
  for (const sx of [-1, 1]) {
    const wall = new THREE.Mesh(new THREE.PlaneGeometry(len, Y0), brickMat);
    wall.geometry.attributes.uv.array.forEach((v, i, a) => { a[i] = i % 2 ? v * (Y0 / 2.4) : v * (len / 2.4); });
    wall.rotation.y = sx * -Math.PI / 2;
    wall.position.set(sx * W, Y0 / 2, (zNear + zFar) / 2);
    scene.add(wall);
  }
  const back = new THREE.Mesh(new THREE.PlaneGeometry(W * 2, Y0 + H), std({ color: 0x3a2418, roughness: 1, envMapIntensity: 0.1 }));
  back.position.set(0, (Y0 + H) / 2, zFar); scene.add(back);

  // Boden
  const stone = TX.stoneMaps([W * 2 / 2.8, len / 2.8]);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(W * 2, len), std({ map: stone.map, bumpMap: stone.bump, bumpScale: 1.6, roughness: 0.6, envMapIntensity: 0.4, color: 0x9a948c }));
  floor.rotation.x = -Math.PI / 2; floor.position.set(0, 0, (zNear + zFar) / 2); floor.receiveShadow = true;
  scene.add(floor);

  // Gurtbögen und Pilaster aus Naturstein
  const rib = TX.stoneMaps([2, 0.6]);
  const ribMat = std({ map: rib.map, bumpMap: rib.bump, bumpScale: 1.6, roughness: 0.85, envMapIntensity: 0.25, side: THREE.DoubleSide, color: 0xc9b8a2 });
  for (const zc of [3, -4, -11, -18, -25]) {
    scene.add(new THREE.Mesh(archGeometry({ W, H, y0: Y0, z0: zc - 0.32, z1: zc + 0.32, inset: 0.38, seg: mobile ? 28 : 48 }), ribMat));
    for (const z of [zc - 0.32, zc + 0.32]) scene.add(new THREE.Mesh(archRing({ W, H, y0: Y0, z, insetA: 0.38, insetB: 0 }), ribMat));
    for (const sx of [-1, 1]) {
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.38, Y0, 0.64), ribMat);
      p.position.set(sx * (W - 0.19), Y0 / 2, zc); scene.add(p);
    }
  }

  // Grundlicht
  const amb = new THREE.HemisphereLight(0x8a6a4a, 0x1a0f08, 0.55);
  scene.add(amb);
  const row = new THREE.SpotLight(0xffc890, 260, 30, 0.9, 1, 1.4);
  row.position.set(0, 6, 1); row.target.position.set(0, 0.8, -7);
  scene.add(row, row.target);

  // Laternen mit flackerndem Licht
  const glowTex = TX.glowTexture([[0, 'rgba(255,190,110,1)'], [0.25, 'rgba(255,150,60,.55)'], [1, 'rgba(255,120,30,0)']]);
  const iron = std({ color: 0x1b1612, metalness: 0.75, roughness: 0.5 });
  const lanterns = [];
  const zs = mobile ? [-2, -10] : [0, -7, -14];
  for (const sx of [-1, 1]) {
    for (const z of zs) {
      const g = new THREE.Group();
      g.position.set(sx * (W - 0.16), 2.15, z);
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.04, 0.04), iron); arm.position.x = -sx * 0.17; g.add(arm);
      const plate = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.34, 0.16), iron); plate.position.x = 0.02 * sx; g.add(plate);
      const body = new THREE.Group(); body.position.set(-sx * 0.32, -0.2, 0); g.add(body);
      const glassMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(1.6, 1.0, 0.45), toneMapped: false });
      const cage = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.06, 0.28, 8), glassMat); body.add(cage);
      const cap = new THREE.Mesh(new THREE.ConeGeometry(0.115, 0.1, 8), iron); cap.position.y = 0.19; body.add(cap);
      const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.05, 0.04, 8), iron); foot.position.y = -0.16; body.add(foot);
      for (let k = 0; k < 4; k++) {
        const bar = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.29, 0.012), iron);
        const a = (k / 4) * Math.PI * 2 + Math.PI / 4; bar.position.set(Math.cos(a) * 0.075, 0, Math.sin(a) * 0.075); body.add(bar);
      }
      const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.8, fog: false }));
      halo.scale.setScalar(2.4); body.add(halo);
      const light = new THREE.PointLight(0xffa04a, 19, 26, 2);
      light.position.set(sx * (W - 0.55), 2.0, z);
      scene.add(g, light);
      lanterns.push({ light, halo, glassMat, base: 19, ph: Math.random() * 100 });
    }
  }

  // Staubpartikel
  const N = mobile ? 200 : 650;
  const dpos = new Float32Array(N * 3), dvel = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    dpos.set([(Math.random() - 0.5) * 16, 0.3 + Math.random() * 5, 4 - Math.random() * 24], i * 3);
    dvel.set([(Math.random() - 0.5) * 0.05, 0.01 + Math.random() * 0.03, (Math.random() - 0.5) * 0.05], i * 3);
  }
  const dgeo = new THREE.BufferGeometry();
  dgeo.setAttribute('position', new THREE.BufferAttribute(dpos, 3));
  const dust = new THREE.Points(dgeo, new THREE.PointsMaterial({
    map: TX.dotTexture(), size: mobile ? 0.06 : 0.05, color: 0xffd9a0, transparent: true, opacity: 0.55,
    depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true,
  }));
  dust.frustumCulled = false;
  scene.add(dust);

  const warmA = new THREE.Color(0xffa04a), warmB = new THREE.Color(0xff6a1c);
  const tmp = new THREE.Color();
  return {
    amb, row, lanterns, dust,
    /** Laternen flackern lassen; mood: {lantern, warm}. calm = weniger Bewegung (reduced motion). */
    update(t, dt, mood, calm) {
      for (const l of lanterns) {
        const f = calm ? 1 : 1 + 0.1 * Math.sin(t * 9 + l.ph) + 0.07 * Math.sin(t * 23.7 + l.ph * 2) + 0.05 * Math.sin(t * 3.1 + l.ph * 5);
        l.light.intensity = l.base * mood.lantern * f;
        l.light.color.copy(warmA).lerp(warmB, mood.warm);
        tmp.setRGB(1.6, 1.0, 0.45).multiplyScalar(0.45 + 0.55 * mood.lantern * f);
        l.glassMat.color.copy(tmp);
        l.halo.material.opacity = 0.35 + 0.45 * mood.lantern * f;
      }
      if (calm) return;
      const p = dpos;
      for (let i = 0; i < N; i++) {
        const k = i * 3;
        p[k] += (dvel[k] + Math.sin(t * 0.3 + i) * 0.008) * dt;
        p[k + 1] += dvel[k + 1] * dt;
        p[k + 2] += (dvel[k + 2] + Math.cos(t * 0.27 + i) * 0.008) * dt;
        if (p[k + 1] > 5.8) p[k + 1] = 0.2;
      }
      dgeo.attributes.position.needsUpdate = true;
    },
  };
}

/** Ein liegendes Eichenfass mit Reifen, Auflage, Schild, Glasscheibe und Glühen. */
export function buildBarrel(i, p, { env, woodTex, headTex, mobile, index }) {
  const { L, R, K, CY, TOP } = BARREL;
  const pose = barrelPose(i);
  const root = new THREE.Group();
  root.position.copy(pose.pos);
  root.rotation.y = -pose.th;
  const dim = []; // Abdunkeln der nicht gewählten Fässer
  const pick = [];
  const addDim = (mat, extra) => {
    const c = mat.color.clone();
    dim.push((f) => { mat.color.copy(c).multiplyScalar(f); if (extra) extra(f); });
  };
  const std = (o) => new THREE.MeshStandardMaterial({ envMap: env, ...o });
  const rAt = (a) => R * (1 - K * Math.pow(a / (L / 2), 2));

  // Daubenkörper (Drehkörper um X)
  const prof = [];
  for (let k = 0; k <= 22; k++) { const a = -L / 2 + (L * k) / 22; prof.push(new THREE.Vector2(rAt(a), a)); }
  const geo = new THREE.LatheGeometry(prof, mobile ? 32 : 56);
  geo.rotateZ(-Math.PI / 2);
  const woodMat = std({ map: woodTex, color: 0xc4ab96, roughness: 0.62, envMapIntensity: 0.4 });
  const body = new THREE.Mesh(geo, woodMat);
  body.position.y = CY; body.castShadow = true; body.receiveShadow = true;
  root.add(body); pick.push(body); addDim(woodMat);

  // Böden
  const headMat = std({ map: headTex, roughness: 0.7, envMapIntensity: 0.4 });
  const rEnd = rAt(L / 2);
  for (const s of [-1, 1]) {
    const head = new THREE.Mesh(new THREE.CircleGeometry(rEnd * 0.97, 40), headMat);
    head.rotation.y = s * Math.PI / 2; head.position.set(s * (L / 2 - 0.02), CY, 0); root.add(head);
    const chime = new THREE.Mesh(new THREE.TorusGeometry(rEnd - 0.004, 0.02, 8, 40), woodMat);
    chime.rotation.y = Math.PI / 2; chime.position.set(s * (L / 2), CY, 0); root.add(chime);
  }
  addDim(headMat);

  // Reifen aus Kupfer bzw. Messing
  const brass = i % 2 === 1;
  const hoopMat = std({ color: brass ? 0xd4a53f : 0xc27a45, metalness: 1, roughness: 0.3, envMapIntensity: 1.6, side: THREE.DoubleSide });
  for (const a of [-0.66, -0.44, 0.44, 0.66]) {
    const h = new THREE.Mesh(new THREE.CylinderGeometry(rAt(a) + 0.012, rAt(a) + 0.012, 0.07, mobile ? 32 : 64, 1, true), hoopMat);
    h.rotation.z = Math.PI / 2; h.position.set(a, CY, 0); root.add(h);
  }
  addDim(hoopMat);

  // Auflagen
  const cradleMat = std({ color: 0x2e1c10, roughness: 0.8, envMapIntensity: 0.3 });
  for (const s of [-1, 1]) {
    const c = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.34, 0.95), cradleMat);
    c.position.set(s * 0.46, 0.17, 0); c.castShadow = true; c.receiveShadow = true; root.add(c);
  }
  addDim(cradleMat);

  // Messingschild mit Name
  const plaqueMat = std({ map: TX.plaqueTexture(p), metalness: 0.7, roughness: 0.4, envMapIntensity: 1 });
  const plaque = new THREE.Mesh(new THREE.PlaneGeometry(0.46, 0.215), plaqueMat);
  plaque.position.set(0, CY - 0.02, R + 0.006); root.add(plaque); addDim(plaqueMat);

  // Auflage für die Glasscheibe: Messingring, Glühscheibe, Glas
  const collarMat = std({ color: 0xc9994a, metalness: 1, roughness: 0.28, envMapIntensity: 1.5, side: THREE.DoubleSide });
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.14, 48, 1, true), collarMat);
  collar.position.y = TOP - 0.04; root.add(collar);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.013, 8, 48), collarMat);
  ring.rotation.x = Math.PI / 2; ring.position.y = TOP + 0.03; root.add(ring); addDim(collarMat);

  const glowTex = TX.glowTexture([[0, 'rgba(255,190,105,1)'], [0.55, 'rgba(235,125,40,1)'], [1, 'rgba(110,45,8,1)']]);
  const glowMat = new THREE.MeshBasicMaterial({ map: glowTex, toneMapped: false });
  const glowDisc = new THREE.Mesh(new THREE.CircleGeometry(0.285, 40), glowMat);
  glowDisc.rotation.x = -Math.PI / 2; glowDisc.position.y = TOP + 0.012; root.add(glowDisc);
  const glow0 = glowMat.color.clone();
  dim.push((f) => glowMat.color.copy(glow0).multiplyScalar(0.25 + 0.75 * f));

  const plateMat = mobile
    ? new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.28, roughness: 0.05, envMap: env, envMapIntensity: 1.6 })
    : new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 1, thickness: 0.08, roughness: 0.06, ior: 1.5, envMap: env, envMapIntensity: 1.4, specularIntensity: 1 });
  const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.29, 0.03, 48), plateMat);
  plate.position.y = TOP + 0.045; root.add(plate); pick.push(plate);

  const haloTex = TX.glowTexture([[0, 'rgba(255,180,90,.9)'], [0.4, 'rgba(255,140,50,.35)'], [1, 'rgba(255,120,30,0)']]);
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: haloTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.6, fog: false }));
  halo.scale.setScalar(1.15); halo.position.y = TOP + 0.03; root.add(halo);
  dim.push((f) => { halo.material.opacity = 0.14 + 0.46 * f; });

  // Ankerpunkte
  const glassAnchor = new THREE.Group(); glassAnchor.position.y = GLASS_Y; root.add(glassAnchor);
  const bottleSlot = new THREE.Group(); bottleSlot.position.set(1.3, 0, 0.22); root.add(bottleSlot);

  root.traverse((o) => { if (o.isMesh) o.userData.barrel = index; });
  return {
    index, product: p, root, pose, glassAnchor, bottleSlot, dim, pick, halo, glowMat,
    setDim(f) { dim.forEach((fn) => fn(f)); },
  };
}
