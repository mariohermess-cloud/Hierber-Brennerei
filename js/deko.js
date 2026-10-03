// Dekoration: jede Funktion baut die Objekte (unsichtbar) und liefert eine GSAP-Timeline, die sie nacheinander einblendet.
// Koordinaten: Glas-Lokal (y = 0 auf der Glasscheibe, Deko-Gruppe hängt am Glas).
import * as THREE from 'three';
import * as TX from './textures.js';
import { getEnv } from './glassware.js';

const gsap = window.gsap;
const rnd = TX.rng(4242);
const between = (a, b) => a + rnd() * (b - a);

const mat = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.55, envMap: getEnv(), envMapIntensity: 0.9, ...o });
const put = (G, obj) => { G.deco.add(obj); return obj; };
const hidden = (obj) => { obj.scale.setScalar(0.0001); return obj; };
const popIn = (tl, obj, at, dur = 0.55, s = 1) => tl.to(obj.scale, { x: s, y: s, z: s, duration: dur, ease: 'back.out(1.8)' }, at);

/** Band (Ribbon) entlang einer Kurve: fn(t) -> {p, d} mit Breitenrichtung d. */
function band(n, fn, w) {
  const pos = [], idx = [];
  for (let i = 0; i <= n; i++) {
    const { p, d } = fn(i / n);
    pos.push(p.x - d.x * w / 2, p.y - d.y * w / 2, p.z - d.z * w / 2, p.x + d.x * w / 2, p.y + d.y * w / 2, p.z + d.z * w / 2);
  }
  for (let i = 0; i < n; i++) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx); g.computeVertexNormals();
  g.setDrawRange(0, 0);
  g.userData.n = n;
  return g;
}
const grow = (tl, geo, at, dur, ease = 'power2.out') => {
  const o = { p: 0 };
  return tl.to(o, { p: 1, duration: dur, ease, onUpdate: () => geo.setDrawRange(0, Math.floor(o.p * geo.userData.n) * 6) }, at);
};

/** Falllinie: Objekt von oben auf y fallen lassen. */
function drop(tl, obj, y, at, { dur = 0.5, ease = 'power2.in', from = 0.25, onLand } = {}) {
  obj.position.y = y + from;
  obj.visible = false;
  tl.set(obj, { visible: true }, at);
  tl.to(obj.position, { y, duration: dur, ease }, at);
  if (onLand) tl.call(onLand, null, at + dur);
}

// Blatt mit Mittelfalte
function leafGeo(len = 0.075, wid = 0.02) {
  const s = new THREE.Shape();
  s.moveTo(0, 0); s.bezierCurveTo(wid, len * 0.2, wid, len * 0.6, 0, len); s.bezierCurveTo(-wid, len * 0.6, -wid, len * 0.2, 0, 0);
  const g = new THREE.ShapeGeometry(s, 8);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) p.setZ(i, Math.abs(p.getX(i)) * 0.45);
  g.computeVertexNormals();
  return g;
}

/** Zweig: stem-Kurve mit Blättern; kind = needle | round | mint. */
function sprig({ len = 0.2, kind = 'needle', color = 0x486f3a }) {
  const g = new THREE.Group();
  const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.006, len * 0.35, 0.004), new THREE.Vector3(0.016, len * 0.7, 0.006), new THREE.Vector3(0.03, len, 0.004)]);
  g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 12, 0.0022, 5), mat(0x5a4326, { roughness: 0.8 })));
  const up = new THREE.Vector3(0, 1, 0), q = new THREE.Quaternion(), m = new THREE.Matrix4();
  if (kind === 'mint') {
    const lg = leafGeo(0.045, 0.024), lm = mat(color, { side: THREE.DoubleSide, roughness: 0.45 });
    for (let k = 0; k < 5; k++) {
      const t = 0.25 + k * 0.18, p = curve.getPoint(Math.min(t, 1)), tan = curve.getTangent(Math.min(t, 1));
      for (const s of k === 4 ? [0] : [-1, 1]) {
        const l = new THREE.Mesh(lg, lm), sc = 1 - k * 0.12;
        l.position.copy(p); l.scale.setScalar(sc);
        const dir = tan.clone().multiplyScalar(0.7).add(new THREE.Vector3(s * 0.85, 0.25, k % 2 ? 0.3 : -0.3)).normalize();
        l.quaternion.setFromUnitVectors(up, dir);
        g.add(l);
      }
    }
    return g;
  }
  const count = kind === 'round' ? 36 : 54;
  const lg = kind === 'round' ? new THREE.SphereGeometry(0.0042, 6, 4).scale(1, 1.5, 0.5) : new THREE.ConeGeometry(0.0017, 0.03, 4).translate(0, 0.015, 0);
  const inst = new THREE.InstancedMesh(lg, mat(color, { roughness: 0.5 }), count);
  for (let i = 0; i < count; i++) {
    const t = 0.12 + (i / count) * 0.88, p = curve.getPoint(t), tan = curve.getTangent(t);
    const a = rnd() * 6.28, out = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
    const dir = tan.clone().multiplyScalar(0.8).add(out.multiplyScalar(0.75)).normalize();
    q.setFromUnitVectors(up, dir);
    m.compose(p, q, new THREE.Vector3(1, 1, 1).multiplyScalar(1 - t * 0.25));
    inst.setMatrixAt(i, m);
  }
  g.add(inst);
  return g;
}

function floater(G, mesh, rest, half, sink = 0.6) {
  const f = { mesh, rest, half, sink, landed: false, ph: rnd() * 6 };
  G.floaters.push(f);
  return f;
}

const iceMat = () => new THREE.MeshPhysicalMaterial({
  color: 0xe3f3ff, transparent: true, opacity: 0.5, roughness: 0.08, envMap: getEnv(), envMapIntensity: 2, clearcoat: 1, depthWrite: false, ior: 1.31,
});
function iceCube(size, m) {
  const g = new THREE.BoxGeometry(size, size, size);
  const cube = new THREE.Mesh(g, m); cube.renderOrder = 5;
  cube.add(new THREE.LineSegments(new THREE.EdgesGeometry(g), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, depthWrite: false })));
  return cube;
}

export const DEKO = {
  /** Eiswürfel fallen ins Glas. */
  eis(G, ctx, { count = 3, big = false } = {}) {
    const tl = gsap.timeline();
    const size = big ? Math.min(0.075, G.rimR * 0.85) : Math.min(0.045, G.rimR * 0.62);
    const m = iceMat();
    for (let i = 0; i < count; i++) {
      const cube = iceCube(size, m);
      const rr = big ? 0 : G.radiusAt(G.yb + size) * 0.42, a = (i * 6.283) / Math.min(3, count) + 0.6;
      const stack = !big && i >= 3;
      cube.position.set(stack ? 0.004 : Math.cos(a) * rr, 0, stack ? 0.004 : Math.sin(a) * rr);
      cube.rotation.set(between(0, 1), between(0, 3), between(0, 1));
      put(G, cube);
      const rest = G.yb + size * (stack ? 1.5 : 0.62) + 0.003;
      const f = floater(G, cube, rest, size / 2, 0.55);
      const at = i * 0.3;
      drop(tl, cube, rest, at, { dur: 0.45, from: G.H + 0.2 - rest, onLand: () => { f.landed = true; G.splash.emit(big ? 22 : 12, 0.9); } });
      tl.to(cube.rotation, { x: cube.rotation.x + 0.5, y: cube.rotation.y + 0.4, duration: 0.7, ease: 'power2.out' }, at + 0.45);
    }
    return tl;
  },
  eisgross(G, ctx) { return DEKO.eis(G, ctx, { count: 1, big: true }); },

  /** Gurkenband + Scheiben. */
  gurke(G, ctx) {
    const tl = gsap.timeline();
    const y0 = G.yb + 0.025, y1 = ctx.finalLevel - 0.004;
    const turns = 1.7, ph = between(0, 6);
    const geo = band(110, (t) => {
      const y = y0 + (y1 - y0) * t, r = G.radiusAt(y) * 0.86, a = ph + t * turns * 6.283;
      return { p: new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r), d: new THREE.Vector3(0, 1, 0) };
    }, 0.028);
    const rib = new THREE.Mesh(geo, mat(0x62ad4c, { side: THREE.DoubleSide, roughness: 0.4, transparent: true, opacity: 0.92, emissive: 0x1d4a18, emissiveIntensity: 0.35 }));
    rib.renderOrder = 5; put(G, rib);
    grow(tl, geo, 0, 1.7, 'power1.inOut');
    tl.from(rib.rotation, { y: -1.4, duration: 1.7, ease: 'power1.inOut' }, 0);
    const tex = TX.sliceTexture({ rind: '#2f6b30', pith: '#cfe5a8', flesh: '#e4f2c4', seeds: 12 });
    for (let i = 0; i < 2; i++) {
      const s = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.036, 0.006, 28), [mat(0x2f6b30), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.4, transparent: true, opacity: 0.95 }), mat(0xcfe5a8)]);
      s.position.set(i ? 0.03 : -0.028, ctx.finalLevel - 0.003, i ? -0.02 : 0.024);
      s.rotation.set(between(-0.25, 0.25), between(0, 3), between(-0.25, 0.25));
      s.renderOrder = 5; put(G, hidden(s)); popIn(tl, s, 0.9 + i * 0.3, 0.5);
    }
    return tl;
  },

  wacholder(G, ctx) {
    const tl = gsap.timeline();
    const m = new THREE.MeshPhysicalMaterial({ color: 0x2c3358, roughness: 0.35, clearcoat: 0.7, envMap: getEnv(), envMapIntensity: 1 });
    const geo = new THREE.SphereGeometry(0.011, 12, 10);
    for (let i = 0; i < 5; i++) {
      const b = new THREE.Mesh(geo, m), a = i * 1.26 + 0.4, rr = G.radiusAt(ctx.finalLevel) * (0.28 + 0.4 * ((i * 37) % 10) / 10);
      b.position.set(Math.cos(a) * rr, 0, Math.sin(a) * rr); put(G, b);
      const f = floater(G, b, G.yb + 0.012, 0.011, 0.3);
      drop(tl, b, ctx.finalLevel - 0.004, i * 0.18, { dur: 0.42, from: 0.28, onLand: () => { f.landed = true; G.splash.emit(4, 0.6); } });
    }
    return tl;
  },

  pfeffer(G, ctx) {
    const tl = gsap.timeline();
    const pink = mat(0xdd6f86, { roughness: 0.5 }), black = mat(0x1a1616, { roughness: 0.4 });
    const geo = new THREE.SphereGeometry(0.0055, 8, 6);
    for (let i = 0; i < 16; i++) {
      const s = new THREE.Mesh(geo, i % 3 ? pink : black), a = between(0, 6.28), rr = G.radiusAt(ctx.finalLevel) * between(0.1, 0.8);
      s.position.set(Math.cos(a) * rr, 0, Math.sin(a) * rr); put(G, s);
      const f = floater(G, s, G.yb + 0.006, 0.006, 0.15);
      drop(tl, s, ctx.finalLevel - 0.002, i * 0.06, { dur: 0.4, from: 0.3, ease: 'power1.in', onLand: () => { f.landed = true; if (i % 4 === 0) G.splash.emit(2, 0.4); } });
    }
    return tl;
  },

  rosmarin(G, ctx) {
    const tl = gsap.timeline();
    const r = sprig({ len: 0.22, kind: 'needle', color: 0x476f3a });
    r.position.set(-0.03 * G.k, G.yb + 0.05, -0.02 * G.k); r.rotation.z = -0.22; r.rotation.x = 0.1;
    put(G, hidden(r));
    tl.set(r.scale, { x: 1, y: 1, z: 1 }, 0).from(r.position, { y: r.position.y + 0.12, duration: 0.8, ease: 'power2.out' }, 0);
    tl.fromTo(r.scale, { x: 0.001, y: 0.001, z: 0.001 }, { x: 1, y: 1, z: 1, duration: 0.8, ease: 'back.out(1.4)' }, 0);
    const th = sprig({ len: 0.13, kind: 'round', color: 0x62924f });
    th.position.set(0.035 * G.k, ctx.finalLevel - 0.03, 0.03 * G.k); th.rotation.z = 0.35;
    put(G, hidden(th));
    tl.fromTo(th.scale, { x: 0.001, y: 0.001, z: 0.001 }, { x: 1, y: 1, z: 1, duration: 0.7, ease: 'back.out(1.6)' }, 0.5);
    return tl;
  },

  /** Orangenzeste als Spirale über dem Rand. */
  zeste(G, ctx, { color = 0xf08a1c, emis = 0xff7a00 } = {}) {
    const tl = gsap.timeline();
    const geo = band(70, (t) => {
      const a = t * 3.2 * 6.283, y = t * 0.09;
      return { p: new THREE.Vector3(Math.cos(a) * 0.014, y, Math.sin(a) * 0.014), d: new THREE.Vector3(Math.cos(a), 0, Math.sin(a)) };
    }, 0.016);
    const z = new THREE.Mesh(geo, mat(color, { side: THREE.DoubleSide, roughness: 0.4, emissive: emis, emissiveIntensity: 0.18 }));
    z.position.set(G.rimR * 0.9, G.H - 0.07, 0.01); z.rotation.set(0.1, 0.4, 0.15);
    put(G, z);
    grow(tl, geo, 0, 1.0, 'power2.out');
    tl.from(z.position, { y: G.H + 0.16, duration: 0.9, ease: 'bounce.out' }, 0);
    tl.from(z.rotation, { y: -3, duration: 1, ease: 'power2.out' }, 0);
    return tl;
  },

  rauch(G) {
    return gsap.timeline().call(() => G.smoke.start()).to({}, { duration: 0.05 });
  },

  /** Limettenspalte am Glasrand. */
  limette(G) {
    const tl = gsap.timeline();
    const rr = 0.052, sh = new THREE.Shape();
    sh.moveTo(0, 0); sh.absarc(0, 0, rr, Math.PI / 2 - 0.62, Math.PI / 2 + 0.62, false); sh.lineTo(0, 0);
    const geo = new THREE.ExtrudeGeometry(sh, { depth: 0.04, bevelEnabled: false, curveSegments: 12 });
    geo.translate(0, 0, -0.02);
    const w = new THREE.Mesh(geo, [mat(0xb9d36a, { roughness: 0.35, emissive: 0x476a18, emissiveIntensity: 0.25 }), mat(0x3d7d2a, { roughness: 0.5 })]);
    w.position.set(0.012, G.H - 0.028, G.rimR * 0.96); w.rotation.set(0.05, 0, 0.32);
    put(G, w);
    drop(tl, w, w.position.y, 0, { dur: 0.7, ease: 'bounce.out', from: 0.22 });
    tl.from(w.rotation, { z: -1.4, duration: 0.7, ease: 'power2.out' }, 0);
    return tl;
  },

  zimt(G, ctx) {
    const tl = gsap.timeline();
    const s = new THREE.Mesh(new THREE.CylinderGeometry(0.0075, 0.0068, 0.3, 10), mat(0x8c4b22, { roughness: 0.9 }));
    s.position.set(-0.022, G.yb + 0.14, 0.012); s.rotation.set(0.06, 0, -0.2);
    put(G, s);
    drop(tl, s, s.position.y, 0, { dur: 0.55, from: 0.4, onLand: () => G.splash.emit(8, 0.8) });
    tl.from(s.rotation, { z: 0.6, duration: 0.55, ease: 'power2.in' }, 0);
    return tl;
  },

  mirabellen(G) {
    const tl = gsap.timeline();
    const spots = [[-0.13, 0.05], [0.15, 0.07], [0.02, 0.17], [-0.05, 0.13], [0.19, -0.03]];
    const fm = [mat(0xe8ae2a, { roughness: 0.32 }), mat(0xeb9f2c, { roughness: 0.32 })];
    spots.forEach(([x, z], i) => {
      const g = new THREE.Group();
      const f = new THREE.Mesh(new THREE.SphereGeometry(0.03, 20, 16).scale(1, 0.94, 1), fm[i % 2]);
      f.position.y = 0.028;
      const st = new THREE.Mesh(new THREE.CylinderGeometry(0.0022, 0.0022, 0.014, 5), mat(0x5a4326));
      st.position.y = 0.056; g.add(f, st);
      g.position.set(x, 0, z); put(G, g);
      drop(tl, g, 0.0, i * 0.2, { dur: 0.6, ease: 'bounce.out', from: 0.32 });
    });
    return tl;
  },

  blueten(G) {
    const tl = gsap.timeline();
    const pm = mat(0xfff1ed, { roughness: 0.6, side: THREE.DoubleSide }), cm = mat(0xf2c21e, { roughness: 0.5 });
    const pg = new THREE.SphereGeometry(1, 8, 6).scale(0.014, 0.0035, 0.02);
    [[-0.09, 0.14], [0.09, 0.1], [0.11, 0.2], [-0.17, 0.02]].forEach(([x, z], i) => {
      const f = new THREE.Group();
      for (let k = 0; k < 5; k++) {
        const p = new THREE.Mesh(pg, pm), a = (k / 5) * 6.283;
        p.position.set(Math.cos(a) * 0.016, 0, Math.sin(a) * 0.016); p.rotation.y = -a + Math.PI / 2; p.rotation.z = 0.15; f.add(p);
      }
      const c = new THREE.Mesh(new THREE.SphereGeometry(0.006, 8, 6), cm); c.position.y = 0.003; f.add(c);
      f.position.set(x, 0.005, z); f.rotation.set(between(-0.2, 0.2), between(0, 6), between(-0.2, 0.2));
      put(G, hidden(f)); popIn(tl, f, i * 0.28, 0.5);
    });
    return tl;
  },

  blatt(G) {
    const tl = gsap.timeline();
    const geo = leafGeo(0.11, 0.032), m = mat(0x4d8a3c, { side: THREE.DoubleSide, roughness: 0.45, emissive: 0x18380f, emissiveIntensity: 0.3 });
    [[-0.11, 0.09, 2.2], [0.1, 0.06, -0.8], [0.02, 0.16, 3.4]].forEach(([x, z, ry], i) => {
      const l = new THREE.Mesh(geo, m);
      l.position.set(x, 0.006, z); l.rotation.set(-Math.PI / 2 + 0.18, ry, 0);
      put(G, hidden(l)); popIn(tl, l, i * 0.25, 0.55);
    });
    return tl;
  },

  /** Ganze Birne + Birnenscheibe am Rand. */
  birne(G) {
    const tl = gsap.timeline();
    const prof = [[0, 0], [0.016, 0.002], [0.034, 0.014], [0.046, 0.04], [0.042, 0.062], [0.03, 0.08], [0.021, 0.098], [0.016, 0.112], [0.012, 0.124]].map(([r, y]) => new THREE.Vector2(r, y));
    const pear = new THREE.Group();
    const body = new THREE.Mesh(new THREE.LatheGeometry(prof, 28), mat(0xc4c34a, { roughness: 0.4, emissive: 0x5a5810, emissiveIntensity: 0.15 }));
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.0025, 0.003, 0.03, 6), mat(0x5a4326)); stem.position.set(0.004, 0.135, 0); stem.rotation.z = -0.3;
    pear.add(body, stem); pear.position.set(0.15, 0, 0.09); pear.rotation.z = 0.18;
    put(G, pear);
    drop(tl, pear, 0, 0, { dur: 0.7, ease: 'bounce.out', from: 0.3 });
    const right = [[0.005, -0.055], [0.03, -0.045], [0.048, -0.02], [0.04, 0.005], [0.026, 0.025], [0.018, 0.048], [0.012, 0.062]];
    const pts = [...right.map(([x, y]) => new THREE.Vector2(x, y)), ...right.slice().reverse().map(([x, y]) => new THREE.Vector2(-x, y))];
    pts.push(pts[0].clone());
    const outline = new THREE.SplineCurve(pts).getPoints(60);
    const geo = new THREE.ExtrudeGeometry(new THREE.Shape(outline), { depth: 0.007, bevelEnabled: false });
    geo.translate(0, 0, -0.0035);
    const slice = new THREE.Mesh(geo, [new THREE.MeshStandardMaterial({ map: TX.pearSliceTexture(), roughness: 0.5, envMap: getEnv(), envMapIntensity: 0.4, side: THREE.DoubleSide }), mat(0xb9b45a)]);
    slice.scale.setScalar(0.55); slice.position.set(0.0, G.H - 0.02, G.rimR * 0.98); slice.rotation.z = 0.32;
    put(G, hidden(slice)); popIn(tl, slice, 0.6, 0.6, 0.55);
    return tl;
  },

  /** Frostbeschlag am gekühlten Glas. */
  frost(G) {
    const tl = gsap.timeline();
    const tex = TX.frostTexture(); tex.repeat.set(3, 2);
    const fm = new THREE.MeshStandardMaterial({ color: 0xeaf6ff, alphaMap: tex, transparent: true, opacity: 0, roughness: 0.9, depthWrite: false, envMap: getEnv(), envMapIntensity: 0.8 });
    const frost = new THREE.Mesh(G.hullGeo, fm); frost.scale.set(1.006, 1, 1.006); frost.renderOrder = 8;
    G.group.add(frost); G.frost = frost;
    tl.to(fm, { opacity: 0.5, duration: 1.6, ease: 'power1.inOut' }, 0);
    tl.to(G.hullMat, { opacity: 0.3, duration: 1.6 }, 0);
    return tl;
  },

  zitrone(G, ctx) {
    const tl = gsap.timeline();
    const tex = TX.sliceTexture({ rind: '#e5c521', pith: '#f7eeb0', flesh: '#f3d846', segments: 9 });
    const s = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.007, 32), [mat(0xe5c521), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.4, emissive: 0x6a5a00, emissiveIntensity: 0.15 }), mat(0xf3d846)]);
    s.rotation.x = Math.PI / 2; s.rotation.z = 0.2;
    const holder = new THREE.Group(); holder.add(s);
    holder.position.set(0.004, G.H - 0.006, G.rimR * 0.98); holder.rotation.z = 0.28;
    put(G, hidden(holder)); popIn(tl, holder, 0, 0.7, 0.78);
    const z = DEKO.zeste(G, ctx, { color: 0xf5d928, emis: 0xc8a800 });
    tl.add(z, 0.5);
    return tl;
  },

  minze(G) {
    const tl = gsap.timeline();
    const m = sprig({ len: 0.2, kind: 'mint', color: 0x3f8f4a });
    m.position.set(-0.014, G.yb + 0.03, -0.012); m.rotation.z = 0.3; m.rotation.x = 0.1;
    put(G, hidden(m));
    tl.fromTo(m.scale, { x: 0.001, y: 0.001, z: 0.001 }, { x: 1, y: 1, z: 1, duration: 0.9, ease: 'back.out(1.4)' }, 0);
    tl.from(m.position, { y: m.position.y + 0.1, duration: 0.9, ease: 'power2.out' }, 0);
    return tl;
  },

  /** Kondensperlen auf dem Glas. */
  tropfen(G, ctx) {
    const tl = gsap.timeline();
    const n = ctx.mobile ? 34 : 80;
    const inst = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 8, 6), new THREE.MeshPhysicalMaterial({
      color: 0xffffff, transparent: true, opacity: 0.6, roughness: 0.02, envMap: getEnv(), envMapIntensity: 2.5, clearcoat: 1, depthWrite: false,
    }), n);
    inst.renderOrder = 9; inst.frustumCulled = false;
    const d = [];
    for (let i = 0; i < n; i++) {
      const y = between(G.yb + 0.01, G.H - 0.025), a = between(-1.5, 1.5) + (i % 5 === 0 ? 3.14 : 0), r = G.outerRadiusAt(y) + 0.0008;
      d.push({ p: new THREE.Vector3(Math.sin(a) * r, y, Math.cos(a) * r), s: between(0.002, 0.0038), a });
    }
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3();
    const set = (p) => {
      d.forEach((x, i) => {
        const k = Math.max(0, Math.min(1, p * 1.6 - (i / n) * 0.6));
        q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), x.a);
        sc.set(x.s * k, x.s * k * 1.2, x.s * k * 0.5);
        inst.setMatrixAt(i, m.compose(x.p, q, sc));
      });
      inst.instanceMatrix.needsUpdate = true;
    };
    set(0); put(G, inst);
    const o = { p: 0 };
    tl.to(o, { p: 1, duration: 1.6, ease: 'none', onUpdate: () => set(o.p) }, 0);
    return tl;
  },
};
