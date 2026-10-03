// Drei prozedurale Flaschenmodelle (schlank 0,5 L mit Glasstopfen, rund mit Holzkorken, Karaffe mit Metallausgießer).
// Proportionen sind aus den Produktfotos vermessen (Pixelprofile), Etiketten liegen als gewölbter Zylinderausschnitt
// mit dem echten Etikettenbild auf dem Glas. Glas: Transmission/Dicke/IOR (Qualitätsstufe hoch) bzw. Transparenz-Fallback.
import * as THREE from 'three';
import * as TX from './textures.js';
import { getEnv, fresnelMaterial } from './glassware.js';

const lerp = (a, b, t) => a + (b - a) * t;

/** Profil glätten (Catmull-Rom). Punkte [r, y] in Modellmetern. */
function smooth(arr, per = 4) {
  const c = new THREE.CatmullRomCurve3(arr.map(([r, y]) => new THREE.Vector3(r, y, 0)), false, 'centripetal');
  return c.getPoints((arr.length - 1) * per).map((v) => [Math.max(0, v.x), v.y]);
}

/* Maße in Foto-Pixeln (y von der Standfläche nach oben, r = Radius), k = Meter je Pixel.
   Gemessen an: Quetsch (schlank), Gin (rund), Vieux Marc (Karaffe). */
export const TYPES = {
  schlank: {
    R: 0.062, px: 200,
    outer: [[0, 58], [70, 54], [120, 40], [160, 14], [178, 3], [192, 6], [199, 22], [200, 52], [200, 1215], [196, 1250], [182, 1290], [152, 1330], [114, 1370], [94, 1400], [88, 1425], [88, 1765], [95, 1772], [97, 1798], [95, 1824], [89, 1830]],
    inner: [[0, 112], [80, 104], [130, 82], [165, 48], [186, 34], [192, 46], [193, 72], [193, 1215], [189, 1250], [175, 1290], [145, 1330], [107, 1370], [87, 1400], [81, 1425], [81, 1700]],
    fillY: 1555, bodyTop: 1215, mouthY: 1958, label: { y0: 271, h: 896 },
    aspectDefault: 0.5415,
  },
  rund: {
    R: 0.085, px: 376,
    outer: [[0, 72], [150, 62], [280, 38], [330, 12], [352, 3], [366, 9], [374, 32], [376, 72], [376, 1056], [368, 1090], [350, 1140], [322, 1190], [280, 1240], [225, 1275], [180, 1300], [145, 1330], [128, 1356], [125, 1400], [125, 1590], [133, 1598], [138, 1612], [137, 1630]],
    inner: [[0, 122], [130, 112], [250, 88], [310, 58], [340, 42], [362, 60], [366, 92], [366, 1056], [358, 1090], [340, 1140], [312, 1190], [270, 1240], [215, 1275], [170, 1300], [135, 1330], [118, 1356], [116, 1400], [116, 1600]],
    fillY: 1434, bodyTop: 1056, mouthY: 1630, label: { y0: 292, h: 715 },
    aspectDefault: 1.53,
  },
  karaffe: {
    R: 0.105, px: 295,
    outer: [[0, 60], [120, 52], [220, 34], [270, 10], [288, 3], [296, 10], [300, 34], [299, 80], [296, 184], [290, 300], [286, 424], [283, 520], [281, 604], [277, 724], [271, 784], [241, 844], [184, 904], [137, 964], [111, 1024], [96, 1084], [93, 1144], [91, 1204], [89, 1264], [87, 1324], [85, 1384], [83, 1444], [81, 1504], [81, 1540]],
    inner: [[0, 112], [110, 102], [200, 82], [248, 52], [272, 42], [290, 70], [289, 300], [284, 424], [279, 520], [277, 604], [273, 724], [266, 784], [236, 844], [180, 904], [133, 964], [107, 1024], [92, 1084], [89, 1144], [87, 1204], [85, 1264], [80, 1400], [78, 1500]],
    fillY: 1260, bodyTop: 724, mouthY: 1866, label: { y0: 250, h: 480 },
    aspectDefault: 1.317,
  },
};
for (const T of Object.values(TYPES)) T.k = T.R / T.px;

/* ---------- gemeinsame Materialien ---------- */
const SH = { glass: null, metal: null, cork: null, corkWood: null, paperN: null, mode: 'opac', geo: new Map(), labelGeo: new Map() };

export function initBottleMaterials({ mode = 'opac', mobile = false } = {}) {
  const env = getEnv();
  SH.glass = new THREE.MeshPhysicalMaterial({
    color: 0xffffff, roughness: 0.03, metalness: 0, ior: 1.5, thickness: 0.012, envMap: env, envMapIntensity: 0.9,
    specularIntensity: 1, side: THREE.DoubleSide, depthWrite: false, clearcoat: 0.6, clearcoatRoughness: 0.03,
    polygonOffset: true, polygonOffsetFactor: 3, polygonOffsetUnits: 3, // Glas liegt hinter dem Etikett (kein Flimmern beim Tiefentest)
  });
  SH.metal = new THREE.MeshStandardMaterial({ color: 0xd2d4d6, metalness: 1, roughness: 0.22, envMap: env, envMapIntensity: 1.6 });
  SH.corkWood = TX.corkWoodMap();
  SH.cork = new THREE.MeshStandardMaterial({ map: SH.corkWood, roughness: 0.7, envMap: env, envMapIntensity: 0.3 });
  SH.stopperCork = new THREE.MeshStandardMaterial({ color: 0xc9a06a, roughness: 0.85, envMap: env, envMapIntensity: 0.25 });
  SH.paperN = TX.paperNormal(); SH.paperN.repeat.set(5, 8); // feine Papierfaser statt großer Beulen
  SH.mobile = mobile;
  setGlassMode(mode);
}

/** 'trans' = echte Transmission (hoch), 'opac' = Transparenz mit Umgebungsreflex (mittel/niedrig/mobil). */
export function setGlassMode(mode) {
  SH.mode = mode;
  const g = SH.glass;
  if (mode === 'trans') { g.transmission = 1; g.transparent = false; g.opacity = 1; g.clearcoat = 0.6; g.envMapIntensity = 0.9; }
  else { g.transmission = 0; g.transparent = true; g.opacity = 0.09; g.clearcoat = 0.25; g.envMapIntensity = 0.6; }
  g.needsUpdate = true;
}
export const glassMode = () => SH.mode;
export const sharedGlass = () => SH.glass;

const cachedGeo = (key, fn) => { let g = SH.geo.get(key); if (!g) { g = fn(); SH.geo.set(key, g); } return g; };

function lathe(pts, k, seg, sy = 1) { return new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r * k, y * k * sy)), seg); }

function hullGeometry(type, seg, per) {
  return cachedGeo(`hull|${type}|${seg}|${per}`, () => { const T = TYPES[type]; return lathe(smooth(T.outer, per), T.k, seg); });
}
function liquidGeometry(type, seg, per) {
  return cachedGeo(`liq|${type}|${seg}|${per}`, () => { const T = TYPES[type]; return lathe(smooth(T.inner, per), T.k, seg); });
}

/** Radius der Innenwand auf Höhe y (m) – für Meniskus/Oberfläche. */
function innerRadiusAt(type, y) {
  const T = TYPES[type], pts = T.inner;
  const py = y / T.k;
  for (let i = 1; i < pts.length; i++) if (py <= pts[i][1]) { const a = pts[i - 1], b = pts[i]; return lerp(a[0], b[0], (py - a[1]) / Math.max(1e-6, b[1] - a[1])) * T.k; }
  return pts[pts.length - 1][0] * T.k;
}

function labelGeometry(type, aspect, seg) {
  const T = TYPES[type], key = `lab|${type}|${aspect.toFixed(3)}|${seg}`;
  return cachedGeo(key, () => {
    const k = T.k, h = T.label.h * k, y0 = T.label.y0 * k;
    const rAt = (y) => {
      const py = y / k, o = T.outer;
      for (let i = 1; i < o.length; i++) if (py <= o[i][1]) { const a = o[i - 1], b = o[i]; return lerp(a[0], b[0], (py - a[1]) / Math.max(1e-6, b[1] - a[1])) * k; }
      return o[o.length - 1][0] * k;
    };
    const rB = rAt(y0) + 0.0016, rT = rAt(y0 + h) + 0.0016;
    const arc = Math.min(Math.PI * 1.9, (h * aspect) / ((rB + rT) / 2));
    const g = new THREE.CylinderGeometry(rT, rB, h, seg, 1, true, -arc / 2, arc);
    g.translate(0, y0 + h / 2, 0);
    g.userData = { arc, y0, h };
    return g;
  });
}

/** Verschluss je Flaschentyp. Rückgabe: Gruppe (Ursprung = Flaschenboden), wird beim Öffnen angehoben. */
function buildClosure(type, seg) {
  const T = TYPES[type], k = T.k, g = new THREE.Group();
  if (type === 'schlank') { // Glasstopfen mit Korkstift
    const cork = new THREE.Mesh(lathe([[0, 1690], [44, 1690], [48, 1712], [48, 1830], [40, 1846], [0, 1846]], k, 20), SH.stopperCork);
    const stop = new THREE.Mesh(lathe(smooth([[0, 1828], [70, 1828], [86, 1834], [92, 1850], [92, 1946], [82, 1957], [50, 1959], [0, 1959]], 4), k, seg), SH.glass);
    stop.renderOrder = 7; g.add(cork, stop);
  } else if (type === 'rund') { // Holzkorken mit Pilzkopf
    g.add(new THREE.Mesh(lathe(smooth([[0, 1560], [98, 1560], [104, 1630], [136, 1640], [143, 1662], [143, 1745], [134, 1770], [104, 1779], [0, 1780]], 4), k, seg), SH.cork));
  }
  return g;
}
function buildStatic(type, seg) { // fest verbaut (Metallausgießer der Karaffe)
  if (type !== 'karaffe') return null;
  const T = TYPES[type];
  return new THREE.Mesh(lathe(smooth([[0, 1866], [22, 1864], [60, 1850], [80, 1806], [73, 1744], [98, 1684], [118, 1624], [101, 1564], [82, 1522], [70, 1490], [0, 1490]], 4), T.k, seg), SH.metal);
}

/**
 * Eine Flasche bauen.
 * o: { type, liquid:{color, alpha}, label:{ tex?, aspect, grundfarbe }, dim:[], mobile }
 */
export function makeBottle(type, o) {
  const T = TYPES[type], k = T.k, mobile = !!o.mobile, near = o.rim !== false, seg = mobile ? 20 : near ? 36 : 28, per = near && !mobile ? 2 : 1;
  const env = getEnv();
  const root = new THREE.Group();
  const plane = new THREE.Plane(new THREE.Vector3(0, -1, 0), -100);

  // Flüssigkeit (innen), Oberfläche mit Meniskus
  const clear = o.liquid.alpha < 0.3;
  const lc = new THREE.Color(o.liquid.color); if (!clear) lc.multiplyScalar(0.78); // Farbe der Foto-Flüssigkeit wirkt im Licht sonst ausgewaschen
  const liqMat = new THREE.MeshPhysicalMaterial({
    color: lc, emissive: lc, emissiveIntensity: clear ? 0.0 : 0.07, transparent: true, opacity: o.liquid.alpha, roughness: clear ? 0.05 : 0.12,
    envMap: env, envMapIntensity: clear ? 0.5 : 0.3, side: THREE.DoubleSide, depthWrite: false, clippingPlanes: [plane], polygonOffset: true, polygonOffsetFactor: 3, polygonOffsetUnits: 3,
    ior: 1.33, specularIntensity: 1,
  });
  const liq = new THREE.Mesh(liquidGeometry(type, seg, per), liqMat); liq.renderOrder = 2;
  const capMat = new THREE.MeshPhysicalMaterial({
    color: lc, emissive: lc, emissiveIntensity: clear ? 0.0 : 0.1, transparent: true, opacity: Math.min(1, o.liquid.alpha + 0.25), roughness: 0.03,
    envMap: env, envMapIntensity: 0.7, side: THREE.DoubleSide, depthWrite: false,
  });
  const capGeo = cachedGeo('meniscus', () => new THREE.LatheGeometry([[0, 0], [0.55, 0.0001], [0.85, 0.0006], [0.96, 0.0016], [1, 0.004], [1.02, 0.008]].map(([r, y]) => new THREE.Vector2(r, y)), 32));
  const cap = new THREE.Mesh(capGeo, capMat); cap.renderOrder = 3;
  const glass = new THREE.Mesh(hullGeometry(type, seg, per), SH.glass); glass.renderOrder = 6;
  root.add(liq, cap, glass);
  let rimMat = null, rim0 = 0;
  if (!mobile && o.rim !== false) {
    rimMat = fresnelMaterial(0xfff0d6, 0.32); rim0 = rimMat.uniforms.uI.value; rimMat.polygonOffset = true; rimMat.polygonOffsetFactor = 3; rimMat.polygonOffsetUnits = 3;
    const rim = new THREE.Mesh(hullGeometry(type, seg, per), rimMat); rim.renderOrder = 7; root.add(rim);
  }

  // Etikett (gewölbter Ausschnitt mit dem echten Bild)
  const aspect = o.label.aspect || T.aspectDefault;
  const lmat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(o.label.grundfarbe || '#d8c8a0'), roughness: 0.85, specularIntensity: 0.25, envMap: env, envMapIntensity: 0.15,
    normalMap: SH.paperN, normalScale: new THREE.Vector2(0.18, 0.18),
  });
  if (o.label.tex) { lmat.map = o.label.tex; lmat.color.set(0xffffff); }
  const label = new THREE.Mesh(labelGeometry(type, aspect, mobile ? 36 : 56), lmat);
  root.add(label);

  const cork = buildClosure(type, seg); root.add(cork);
  const stat = buildStatic(type, seg); if (stat) root.add(stat);

  // Abdunkeln (Auswahl anderer Objekte)
  const l0 = lmat.color.clone(), le = liqMat.emissiveIntensity;
  const dimFn = (f) => {
    lmat.color.copy(l0).multiplyScalar(f);
    liqMat.emissiveIntensity = le * (0.3 + 0.7 * f);
    if (rimMat) rimMat.uniforms.uI.value = rim0 * (0.2 + 0.8 * f);
  };
  o.dim?.push(dimFn);

  const yb = (T.inner[0][1] + 24) * k; // Innenboden (Standfläche des Pegels)
  const fillY0 = T.fillY * k;
  const B = {
    type, root, T, R: T.R, H: T.mouthY * k, mouthY: T.mouthY * k, bodyTop: T.bodyTop * k, cork, corkRest: 0,
    liqMat, capMat, label, lmat, glass, fill: 1, liq, cap, aspect,
    /** Volumenanteil (1 = Ausgangspegel). */
    setFill(f) { this.fill = f; },
    levelY() { return lerp(yb, fillY0, this.fill); },
    /** Flüssigkeit bleibt waagerecht, auch wenn die Flasche kippt (Elternobjekte liegen bei y = 0). */
    updateClip() {
      const rz = Math.abs(root.rotation.z), f = this.fill, ly = this.levelY();
      const up = root.position.y + ly;
      const tilted = root.position.y + Math.cos(rz) * this.bodyTop * 0.5 + T.R * 0.85 * (2 * f - 1) * 0.85;
      const kk = Math.min(1, rz / 1.2), s = kk * kk * (3 - 2 * kk);
      plane.constant = lerp(up, tilted, s);
      const upright = rz < 0.06;
      cap.visible = upright;
      if (upright) { const r = innerRadiusAt(type, ly) * 0.985; cap.position.y = ly; cap.scale.set(r, 1, r); }
    },
    setLiquid(color, alpha) {
      const c = new THREE.Color(color); if (alpha == null || alpha >= 0.3) c.multiplyScalar(0.78);
      liqMat.color.copy(c); liqMat.emissive.copy(c); capMat.color.copy(c); capMat.emissive.copy(c);
      if (alpha != null) { liqMat.opacity = alpha; capMat.opacity = Math.min(1, alpha + 0.25); }
    },
    setLabelTexture(tex) { lmat.map = tex; lmat.color.set(0xffffff); l0.set(0xffffff); lmat.needsUpdate = true; },
    restoreCork() { cork.position.set(0, 0, 0); cork.scale.setScalar(1); cork.rotation.set(0, 0, 0); cork.visible = true; },
  };
  B.updateClip();
  return B;
}

/** Tonic-Flasche (klein, ohne Etikett) für den Gin-Ablauf; einfache Glasflasche. */
export function makeTonicBottle() {
  const env = getEnv(), root = new THREE.Group();
  const pts = [[0, 0], [0.043, 0], [0.045, 0.01], [0.045, 0.2], [0.04, 0.235], [0.024, 0.262], [0.017, 0.29], [0.017, 0.32], [0.02, 0.325]].map(([r, y]) => new THREE.Vector2(r, y));
  const geo = new THREE.LatheGeometry(pts, 28);
  const gm = new THREE.MeshPhysicalMaterial({ color: 0x9fd8c4, transparent: true, opacity: 0.55, roughness: 0.06, envMap: env, envMapIntensity: 1.6, clearcoat: 1, depthWrite: false, side: THREE.DoubleSide });
  const hull = new THREE.Mesh(geo, gm); hull.renderOrder = 6;
  const plane = new THREE.Plane(new THREE.Vector3(0, -1, 0), -100);
  const lm = new THREE.MeshPhysicalMaterial({ color: 0xe6f4ef, transparent: true, opacity: 0.4, roughness: 0.1, envMap: env, side: THREE.DoubleSide, depthWrite: false, clippingPlanes: [plane] });
  const liq = new THREE.Mesh(new THREE.LatheGeometry(pts.map((p) => new THREE.Vector2(p.x * 0.9, p.y * 0.985 + 0.004)), 28), lm); liq.renderOrder = 2;
  root.add(liq, hull);
  const cork = new THREE.Group(); cork.position.y = 0.325;
  const head = new THREE.Mesh(new THREE.CylinderGeometry(0.023, 0.021, 0.014, 16), new THREE.MeshStandardMaterial({ color: 0xc9994a, metalness: 1, roughness: 0.3, envMap: env }));
  head.position.y = 0.005; cork.add(head); root.add(cork);
  const H = 0.33;
  return {
    root, H, cork, corkRest: 0.325, fill: 0.85, mouthY: H, bodyTop: 0.2, R: 0.045,
    setFill(f) { this.fill = f; },
    updateClip() {
      const rz = root.rotation.z, f = this.fill, up = root.position.y + lerp(0.012, 0.2, f);
      const tilted = root.position.y + Math.cos(rz) * 0.1 + 0.045 * 0.77 * (2 * f - 1);
      const kk = Math.min(1, Math.abs(rz) / 1.2), s = kk * kk * (3 - 2 * kk);
      plane.constant = lerp(up, tilted, s);
    },
    restoreCork() { cork.position.set(0, 0.325, 0); cork.scale.setScalar(1); cork.rotation.set(0, 0, 0); cork.visible = true; },
  };
}

export function disposeBottle(B) {
  B.root.traverse((o) => { if (o.material && o.material !== SH.glass && o.material !== SH.metal && o.material !== SH.cork && o.material !== SH.stopperCork) o.material.dispose?.(); });
}
