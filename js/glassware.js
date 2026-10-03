// Gläser, Flaschen, Flüssigkeit, Strahl, Bläschen, Spritzer, Rauch.
import * as THREE from 'three';
import * as TX from './textures.js';

let ENV = null;
export const setEnv = (e) => { ENV = e; };
export const getEnv = () => ENV;

/** Glasformen: outer = Außenprofil [r, y] von unten nach oben, yb = Innenboden, t = Wandstärke. Maße in Szenen-Einheiten (leicht überhöht). */
const GLASS = {
  ballon: { outer: [[0, 0], [.07, 0], [.073, .006], [.06, .012], [.024, .026], [.013, .04], [.012, .115], [.022, .132], [.05, .152], [.078, .185], [.094, .23], [.092, .27], [.08, .31], [.072, .335]], yb: .128, t: .004, maxFill: .85 },
  tumbler: { outer: [[0, 0], [.078, 0], [.081, .005], [.085, .03], [.0855, .034], [.09, .2]], yb: .032, t: .006, maxFill: .8 },
  highball: { outer: [[0, 0], [.062, 0], [.064, .005], [.0655, .024], [.066, .026], [.07, .3]], yb: .022, t: .004, maxFill: .85 },
  tulpe: { outer: [[0, 0], [.062, 0], [.065, .006], [.05, .012], [.02, .026], [.01, .045], [.01, .115], [.02, .13], [.04, .148], [.052, .18], [.056, .21], [.052, .25], [.045, .28], [.041, .3]], yb: .124, t: .0035, maxFill: .85 },
  tulpe2: { outer: [[0, 0], [.062, 0], [.065, .006], [.05, .012], [.02, .026], [.01, .045], [.01, .115], [.02, .13], [.04, .148], [.052, .18], [.056, .21], [.052, .25], [.045, .28], [.041, .3]], yb: .124, t: .0035, maxFill: .85, sr: 1.12, sy: 1.1 },
  shot: { outer: [[0, 0], [.045, 0], [.047, .005], [.043, .026], [.044, .032], [.05, .07], [.052, .11], [.047, .15], [.043, .165]], yb: .03, t: .004, maxFill: .85 },
};

/** Additiver Fresnel-Rand: lässt Glaskanten im Dunkeln aufleuchten. */
export function fresnelMaterial(color, intensity = 1) {
  return new THREE.ShaderMaterial({
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
    uniforms: { uColor: { value: new THREE.Color(color) }, uI: { value: intensity } },
    vertexShader: `varying vec3 vN; varying vec3 vV;
      void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `uniform vec3 uColor; uniform float uI; varying vec3 vN; varying vec3 vV;
      void main(){ float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 3.0);
        gl_FragColor = vec4(uColor * f * uI, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
}

const lerp = (a, b, t) => a + (b - a) * t;

/** Profil glätten (Catmull-Rom), damit Drehkörper nicht kantig wirken. */
function smooth(arr, per = 4) {
  const c = new THREE.CatmullRomCurve3(arr.map(([r, y]) => new THREE.Vector3(r, y, 0)), false, 'centripetal');
  return c.getPoints((arr.length - 1) * per).map((v) => [Math.max(0, v.x), v.y]);
}

/** Trinkglas mit Flüssigkeit (per Clipping-Plane gefüllt), Bläschen, Spritzern. */
export function buildGlass(kind, product, { baseY, mobile, dim }) {
  const S = GLASS[kind];
  const sr = S.sr || 1, sy = S.sy || 1;
  const outer = smooth(S.outer.map(([r, y]) => [r * sr, y * sy]));
  const yb = S.yb * sy, t = S.t;
  const H = outer[outer.length - 1][1];
  const inner = [[0, yb]];
  for (const [r, y] of outer) if (y > yb + 1e-4) inner.push([Math.max(r - t, 0.004), y]);
  const rimR = inner[inner.length - 1][0];
  const closed = outer.map(([r, y]) => new THREE.Vector2(r, y));
  closed.push(new THREE.Vector2(outer[outer.length - 1][0] - t, H));
  for (let i = inner.length - 1; i >= 0; i--) closed.push(new THREE.Vector2(inner[i][0], inner[i][1]));

  const group = new THREE.Group();
  const seg = mobile ? 32 : 56;
  const hullGeo = new THREE.LatheGeometry(closed, seg);
  const hullMat = new THREE.MeshPhysicalMaterial({
    color: 0xe4f2ef, transparent: true, opacity: 0.14, roughness: 0.02, metalness: 0, envMap: ENV, envMapIntensity: 0.6,
    clearcoat: 0.4, clearcoatRoughness: 0.03, depthWrite: false, side: THREE.DoubleSide,
  });
  const hull = new THREE.Mesh(hullGeo, hullMat); hull.renderOrder = 6;
  const rimMat = fresnelMaterial(0xffe2b8, 0.4);
  const rim = new THREE.Mesh(hullGeo, rimMat); rim.renderOrder = 7;
  group.add(hull, rim);
  const rim0 = rimMat.uniforms.uI.value;
  dim.push((f) => { rimMat.uniforms.uI.value = rim0 * (0.25 + 0.75 * f); });

  // Flüssigkeit
  const plane = new THREE.Plane(new THREE.Vector3(0, -1, 0), -100);
  const lp = inner.map(([r, y]) => new THREE.Vector2(r * 0.985, y + 0.0015));
  const liqCol = new THREE.Color(product.fluessig.farbe);
  const liqMat = new THREE.MeshPhysicalMaterial({
    color: liqCol, emissive: liqCol, emissiveIntensity: 0.06, transparent: true, opacity: product.fluessig.alpha,
    roughness: product.id === 'limoncello' ? 0.45 : 0.08, envMap: ENV, envMapIntensity: 0.22, side: THREE.DoubleSide,
    depthWrite: false, clippingPlanes: [plane],
  });
  const liquid = new THREE.Mesh(new THREE.LatheGeometry(lp, seg), liqMat); liquid.renderOrder = 2; liquid.visible = false;
  const surfMat = new THREE.MeshPhysicalMaterial({
    color: liqCol, emissive: liqCol, emissiveIntensity: 0.2, transparent: true, opacity: Math.min(1, product.fluessig.alpha + 0.2),
    roughness: 0.06, envMap: ENV, envMapIntensity: 0.45, side: THREE.DoubleSide, depthWrite: false,
  });
  const surface = new THREE.Mesh(new THREE.CircleGeometry(1, seg), surfMat); surface.rotation.x = -Math.PI / 2; surface.renderOrder = 3; surface.visible = false;
  group.add(liquid, surface);

  const deco = new THREE.Group(); group.add(deco);

  const G = {
    group, deco, kind, H, yb, rimR, hull, hullMat, liquid, liqMat, surface, surfMat, plane, level: 0, fill: 0,
    baseY, outer, inner, floaters: [], k: rimR / 0.07, product, hullGeo,
    radiusAt(y) { // Innenradius auf Höhe y
      if (y <= yb) return 0;
      for (let i = 1; i < inner.length; i++) {
        if (y <= inner[i][1]) { const a = inner[i - 1], b = inner[i]; return lerp(a[0], b[0], (y - a[1]) / Math.max(1e-6, b[1] - a[1])); }
      }
      return rimR;
    },
    outerRadiusAt(y) {
      for (let i = 1; i < outer.length; i++) {
        if (y <= outer[i][1]) { const a = outer[i - 1], b = outer[i]; return lerp(a[0], b[0], (y - a[1]) / Math.max(1e-6, b[1] - a[1])); }
      }
      return outer[outer.length - 1][0];
    },
    levelFromFill(f) { const top = yb + (H - yb) * S.maxFill; return yb + 0.003 + f * (top - yb - 0.003); },
    /** Füllstand (lokale Höhe) setzen. */
    setLevel(y) {
      this.level = y;
      const on = y > yb + 0.003;
      plane.constant = baseY + y;
      liquid.visible = surface.visible = on;
      if (on) { const r = this.radiusAt(y) * 0.985; surface.position.y = y; surface.scale.set(r, r, 1); }
    },
    setFill(f) { this.fill = f; this.setLevel(this.levelFromFill(f)); },
    setLiquidColor(c, a) { liqMat.color.set(c); liqMat.emissive.set(c); surfMat.color.set(c); surfMat.emissive.set(c); if (a != null) { liqMat.opacity = a; surfMat.opacity = Math.min(1, a + 0.2); } },
    reset() { // leeren + Dekoration entfernen
      this.setFill(0);
      this.setLiquidColor(product.fluessig.farbe, product.fluessig.alpha);
      this.floaters.length = 0;
      this.fizz.stop(); this.splash.clear(); this.smoke.stop();
      this.pouring = false;
      disposeChildren(deco);
      if (this.frost) { this.group.remove(this.frost); this.frost.material.dispose(); this.frost = null; }
      hullMat.opacity = 0.14;
    },
    update(dt, t) {
      // schwimmende Elemente (Eis, Beeren) folgen dem Pegel
      for (const f of this.floaters) {
        if (!f.landed) continue;
        const target = Math.max(f.rest, this.level - f.half * f.sink) + Math.sin(t * 1.3 + f.ph) * 0.0012;
        f.mesh.position.y += (target - f.mesh.position.y) * Math.min(1, dt * 6);
      }
      if (this.pouring) { // Spritzer am Aufprallpunkt
        this._sa = (this._sa || 0) + dt * 50;
        while (this._sa >= 1) { this._sa -= 1; this.splash.emit(1, 0.8); }
      }
      this.fizz.update(dt, t);
      this.splash.update(dt);
      this.smoke.update(dt);
    },
  };
  G.fizz = new Fizz(G, mobile ? 22 : 40);
  G.splash = new Splash(G, mobile ? 30 : 60);
  G.smoke = new Smoke(G, mobile ? 8 : 14);
  return G;
}

/** Objekte samt Geometrie/Material freigeben. */
export function disposeChildren(group) {
  for (const c of [...group.children]) {
    group.remove(c);
    c.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) { const m = Array.isArray(o.material) ? o.material : [o.material]; m.forEach((x) => { if (x.map) x.map.dispose(); x.dispose(); }); }
    });
  }
}

/** Aufsteigende Bläschen im Glas. */
class Fizz {
  constructor(G, n) {
    this.G = G; this.n = n; this.active = false; this.strength = 0;
    this.st = Array.from({ length: n }, () => ({ y: -9, sp: 0, a: 0, r: 0, w: 0 }));
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    this.pts = new THREE.Points(geo, new THREE.PointsMaterial({ map: TX.bubbleTexture(), size: 0.013, transparent: true, opacity: 0.9, depthWrite: false, sizeAttenuation: true }));
    this.pts.frustumCulled = false; this.pts.renderOrder = 4; this.pts.visible = false;
    G.group.add(this.pts);
  }
  start(strength = 1) { this.active = true; this.strength = strength; this.pts.visible = true; }
  stop() { this.active = false; this.pts.visible = false; this.st.forEach((s) => (s.y = -9)); }
  update(dt, t) {
    if (!this.pts.visible) return;
    const G = this.G, p = this.pts.geometry.attributes.position.array;
    let alive = 0;
    this.st.forEach((s, i) => {
      if (s.y < -1 || s.y > G.level - 0.004) {
        if (this.active && G.level > G.yb + 0.02 && Math.random() < this.strength * dt * 3) {
          s.y = G.yb + 0.008; s.sp = 0.03 + Math.random() * 0.05; s.a = Math.random() * 6.28; s.r = Math.random() * 0.75; s.w = Math.random() * 6;
        } else s.y = -9;
      }
      if (s.y > -1) { s.y += s.sp * dt; alive++; }
      const rr = G.radiusAt(Math.max(s.y, G.yb + 0.01)) * s.r;
      p[i * 3] = Math.cos(s.a) * rr + Math.sin(t * 3 + s.w) * 0.0015; p[i * 3 + 1] = s.y; p[i * 3 + 2] = Math.sin(s.a) * rr;
    });
    this.pts.geometry.attributes.position.needsUpdate = true;
    if (!this.active && !alive) this.pts.visible = false;
  }
}

/** Spritzer beim Eingießen und Eiswurf. */
class Splash {
  constructor(G, n) {
    this.G = G; this.n = n; this.cursor = 0;
    this.st = Array.from({ length: n }, () => ({ life: 0, v: new THREE.Vector3() }));
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3).fill(-9), 3));
    this.mat = new THREE.PointsMaterial({ map: TX.dotTexture(), size: 0.011, transparent: true, opacity: 0.9, depthWrite: false, sizeAttenuation: true, color: 0xffffff });
    this.pts = new THREE.Points(geo, this.mat); this.pts.frustumCulled = false; this.pts.renderOrder = 5;
    G.group.add(this.pts);
  }
  emit(n, power = 1) {
    const G = this.G, p = this.pts.geometry.attributes.position.array;
    for (let i = 0; i < n; i++) {
      const k = this.cursor++ % this.n, s = this.st[k];
      const a = Math.random() * 6.28, r = Math.random() * 0.012;
      s.life = 0.35 + Math.random() * 0.35;
      s.v.set(Math.cos(a) * (0.03 + Math.random() * 0.07) * power, (0.14 + Math.random() * 0.26) * power, Math.sin(a) * (0.03 + Math.random() * 0.07) * power);
      p[k * 3] = Math.cos(a) * r; p[k * 3 + 1] = G.level + 0.002; p[k * 3 + 2] = Math.sin(a) * r;
    }
  }
  clear() { this.st.forEach((s) => (s.life = 0)); this.pts.geometry.attributes.position.array.fill(-9); this.pts.geometry.attributes.position.needsUpdate = true; }
  update(dt) {
    const p = this.pts.geometry.attributes.position.array;
    let any = false;
    this.st.forEach((s, i) => {
      if (s.life <= 0) return;
      s.life -= dt; any = true;
      s.v.y -= 1.8 * dt;
      p[i * 3] += s.v.x * dt; p[i * 3 + 1] += s.v.y * dt; p[i * 3 + 2] += s.v.z * dt;
      if (s.life <= 0 || p[i * 3 + 1] < this.G.level - 0.003) { s.life = 0; p[i * 3 + 1] = -9; }
    });
    if (any || this._dirty) this.pts.geometry.attributes.position.needsUpdate = true;
    this._dirty = any;
  }
}

/** Rauchschwaden (Sprites), steigen aus dem Glas. */
class Smoke {
  constructor(G, n) {
    this.G = G; this.active = false; this.acc = 0;
    const tex = TX.smokeTexture();
    this.sp = Array.from({ length: n }, () => {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, opacity: 0, color: 0xd8cbb8, fog: false }));
      s.visible = false; s.renderOrder = 9; s.userData = { life: 0, max: 1, vx: 0, vz: 0, rot: 0, ph: 0 };
      G.group.add(s); return s;
    });
  }
  start() { this.active = true; }
  stop() { this.active = false; this.sp.forEach((s) => { s.visible = false; s.userData.life = 0; }); }
  update(dt) {
    if (this.active) { this.acc += dt; if (this.acc > 0.3) { this.acc = 0; this.spawn(); } }
    for (const s of this.sp) {
      const u = s.userData; if (u.life <= 0) continue;
      u.life -= dt; const k = 1 - u.life / u.max;
      if (u.life <= 0) { s.visible = false; continue; }
      s.position.y += (0.05 + 0.06 * k) * dt;
      s.position.x = u.x0 + Math.sin(k * 5 + u.ph) * 0.03 * k + u.vx * k;
      s.position.z = u.z0 + Math.cos(k * 4 + u.ph) * 0.02 * k;
      const sc = 0.1 + 0.34 * k; s.scale.set(sc, sc, 1);
      s.material.rotation += u.rot * dt;
      s.material.opacity = 0.5 * Math.sin(Math.PI * Math.min(1, k * 1.15));
    }
  }
  spawn() {
    const s = this.sp.find((x) => x.userData.life <= 0); if (!s) return;
    const u = s.userData; u.max = u.life = 3.4 + Math.random(); u.vx = (Math.random() - 0.5) * 0.08; u.ph = Math.random() * 6;
    u.rot = (Math.random() - 0.5) * 0.5;
    u.x0 = (Math.random() - 0.5) * this.G.rimR; u.z0 = (Math.random() - 0.5) * this.G.rimR;
    s.position.set(u.x0, this.G.H - 0.005, u.z0); s.visible = true;
  }
}

/** Gießstrahl (Parabel aus zwei gekreuzten Bändern), in Fass-Lokalkoordinaten. */
export function buildStream(parent) {
  const N = 14;
  const pos = new Float32Array(2 * (N + 1) * 2 * 3);
  const idx = [];
  for (let r = 0; r < 2; r++) for (let i = 0; i < N; i++) { const a = (r * (N + 1) + i) * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setIndex(idx);
  const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.75, side: THREE.DoubleSide, depthWrite: false, fog: false });
  const mesh = new THREE.Mesh(geo, mat); mesh.frustumCulled = false; mesh.visible = false; mesh.renderOrder = 4;
  parent.add(mesh);
  const g = 2.4;
  return {
    mesh,
    setColor(c, a = 0.75) { mat.color.set(c).lerp(new THREE.Color(0xfff1d8), 0.28); mat.opacity = a; },
    /** mouth {x,y,z}, landX = Aufprall-x, targetY = Pegel, w = halbe Breite */
    update(mouth, landX, targetY, w) {
      const drop = Math.max(0.03, mouth.y - targetY);
      const tau = Math.sqrt((2 * drop) / g), vx = (landX - mouth.x) / tau;
      const p = geo.attributes.position.array;
      for (let i = 0; i <= N; i++) {
        const tt = (tau * i) / N, cx = mouth.x + vx * tt, cy = mouth.y - 0.5 * g * tt * tt, ww = w * (1 - 0.35 * i / N);
        let o = (i * 2) * 3;
        p[o] = cx - ww; p[o + 1] = cy; p[o + 2] = mouth.z; p[o + 3] = cx + ww; p[o + 4] = cy; p[o + 5] = mouth.z;
        o = ((N + 1) * 2 + i * 2) * 3;
        p[o] = cx; p[o + 1] = cy; p[o + 2] = mouth.z - ww; p[o + 3] = cx; p[o + 4] = cy; p[o + 5] = mouth.z + ww;
      }
      geo.attributes.position.needsUpdate = true;
      mesh.visible = true;
    },
    hide() { mesh.visible = false; },
  };
}

/** Flaschenformen: R = Körperradius, body/sh/nh = Höhe Körper/Schulter/Hals, nr = Halsradius. */
const FORMS = {
  gin: { R: .105, body: .4, sh: .11, nr: .028, nh: .19 },
  whisky: { R: .115, body: .34, sh: .07, nr: .036, nh: .12 },
  rum: { R: .1, body: .38, sh: .13, nr: .03, nh: .16 },
  schlank: { R: .072, body: .4, sh: .17, nr: .021, nh: .21 },
  birne: { R: .08, body: .34, sh: .22, nr: .022, nh: .17 },
  limoncello: { R: .09, body: .3, sh: .15, nr: .03, nh: .13 },
  tonic: { R: .045, body: .19, sh: .05, nr: .017, nh: .07 },
};

/** Flasche mit Etikett, Kork und innenliegender Flüssigkeit. */
export function buildBottle(form, product, { glassColor, liquidColor, liquidAlpha = 0.9, dim, mobile, label = true }) {
  const F = FORMS[form];
  const { R, body, sh, nr, nh } = F;
  const H = body + sh + nh;
  const pts = [[0, 0], [R * 0.86, 0], [R * 0.97, 0.008], [R, 0.022], [R, body]];
  for (let k = 1; k <= 10; k++) { const t = k / 10, s = t * t * (3 - 2 * t); pts.push([lerp(R, nr, s), body + sh * t]); }
  pts.push([nr, H - 0.01], [nr * 1.13, H - 0.006], [nr * 1.13, H]);
  const v2 = (m) => pts.map(([r, y]) => new THREE.Vector2(r * m, m < 1 ? y * 0.985 + 0.012 : y));
  const seg = mobile ? 28 : 44;
  const root = new THREE.Group();

  const hullMat = new THREE.MeshPhysicalMaterial({
    color: glassColor, transparent: true, opacity: 0.6, roughness: 0.06, envMap: ENV, envMapIntensity: 1.6,
    clearcoat: 1, clearcoatRoughness: 0.03, depthWrite: false, side: THREE.DoubleSide,
  });
  const hull = new THREE.Mesh(new THREE.LatheGeometry(v2(1), seg), hullMat); hull.renderOrder = 6; hull.castShadow = !mobile;
  const fres = new THREE.Mesh(hull.geometry, fresnelMaterial(new THREE.Color(glassColor).lerp(new THREE.Color(0xffffff), 0.5), 0.9)); fres.renderOrder = 7;
  const plane = new THREE.Plane(new THREE.Vector3(0, -1, 0), -100);
  const lc = new THREE.Color(liquidColor);
  const liqMat = new THREE.MeshPhysicalMaterial({ color: lc, emissive: lc, emissiveIntensity: 0.2, transparent: true, opacity: liquidAlpha, roughness: 0.1, envMap: ENV, envMapIntensity: 1, side: THREE.DoubleSide, depthWrite: false, clippingPlanes: [plane] });
  const liq = new THREE.Mesh(new THREE.LatheGeometry(v2(0.9), seg), liqMat); liq.renderOrder = 2;
  root.add(liq, hull, fres);
  const f0 = fres.material.uniforms.uI.value;

  if (label) {
    const len = 1.7, lh = Math.min(body * 0.55, 0.19);
    const tex = TX.labelTexture(product, ((R + 0.002) * len) / lh);
    const lmat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7, envMap: ENV, envMapIntensity: 0.4 });
    const lab = new THREE.Mesh(new THREE.CylinderGeometry(R + 0.0025, R + 0.0025, lh, 28, 1, true, -len / 2, len), lmat);
    lab.position.y = body * 0.5 + 0.01;
    root.add(lab);
    const c0 = lmat.color.clone();
    dim.push((f) => lmat.color.copy(c0).multiplyScalar(f));
  }

  // Kork mit Messingkopf
  const cork = new THREE.Group(); cork.position.y = H;
  const plug = new THREE.Mesh(new THREE.CylinderGeometry(nr * 0.95, nr * 0.8, 0.05, 16), new THREE.MeshStandardMaterial({ color: 0xb98d58, roughness: 0.9, envMap: ENV, envMapIntensity: 0.3 }));
  plug.position.y = -0.005;
  const head = new THREE.Mesh(new THREE.CylinderGeometry(nr * 1.35, nr * 1.3, 0.035, 20), new THREE.MeshStandardMaterial({ color: 0xc9994a, metalness: 1, roughness: 0.3, envMap: ENV, envMapIntensity: 1.4 }));
  head.position.y = 0.03;
  cork.add(plug, head); root.add(cork);

  const hc = hullMat.color.clone(), lcol = liqMat.emissiveIntensity;
  dim.push((f) => { hullMat.color.copy(hc).multiplyScalar(f); fres.material.uniforms.uI.value = f0 * (0.2 + 0.8 * f); liqMat.emissiveIntensity = lcol * (0.3 + 0.7 * f); });

  const B = {
    root, H, R, body, sh, cork, hull, liq, liqMat, fill: 0.85, form,
    setFill(f) { this.fill = f; },
    /** Flüssigkeit bleibt waagerecht, auch wenn die Flasche kippt. */
    updateClip() {
      const rz = root.rotation.z, f = this.fill;
      const up = root.position.y + lerp(0.012, body + sh * 0.55, f);
      const tilted = root.position.y + Math.cos(rz) * body * 0.5 + R * 0.9 * (2 * f - 1) * 0.85;
      const k = Math.min(1, Math.abs(rz) / 1.2), s = k * k * (3 - 2 * k);
      plane.constant = lerp(up, tilted, s);
    },
    restoreCork() { cork.position.set(0, H, 0); cork.scale.setScalar(1); cork.rotation.set(0, 0, 0); cork.visible = true; },
  };
  B.updateClip();
  return B;
}
