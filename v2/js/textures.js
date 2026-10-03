// Prozedurale Texturen (Canvas) für die Keller-Ansicht v2: Farbe + Normalmap + Rauheit für Backstein, Bruchstein,
// Bodenplatten, Eiche und Bretter; dazu Leucht-, Partikel- und Deko-Texturen. Keine externen Bilddateien nötig.
import * as THREE from 'three';

export const rng = (seed) => {
  let s = seed >>> 0;
  return () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296;
};

const mk = (w, h) => {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return [c, c.getContext('2d', { willReadFrequently: true })];
};

const AN = { max: 8 }; // wird von setAnisotropy gesetzt
export const setAnisotropy = (n) => { AN.max = n; };

export const toTex = (c, { repeat, srgb = true, wrap = true, aniso } = {}) => {
  const t = new THREE.CanvasTexture(c);
  if (wrap) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  if (repeat) t.repeat.set(repeat[0], repeat[1]);
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  t.anisotropy = aniso ?? AN.max;
  return t;
};

/* ---------- Rauschen (kachelbar) ---------- */
function gridNoise(size, cells, seed) {
  const r = rng(seed), n = cells;
  const g = new Float32Array(n * n);
  for (let i = 0; i < g.length; i++) g[i] = r();
  const out = new Float32Array(size * size);
  const step = n / size;
  for (let y = 0; y < size; y++) {
    const fy = y * step, y0 = Math.floor(fy), ty = fy - y0, sy = ty * ty * (3 - 2 * ty), y1 = (y0 + 1) % n;
    for (let x = 0; x < size; x++) {
      const fx = x * step, x0 = Math.floor(fx), tx = fx - x0, sx = tx * tx * (3 - 2 * tx), x1 = (x0 + 1) % n;
      const a = g[y0 * n + x0], b = g[y0 * n + x1], c = g[y1 * n + x0], d = g[y1 * n + x1];
      out[y * size + x] = a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
    }
  }
  return out;
}
/** Fraktales Rauschen 0..1, kachelbar. */
export function fbm(size, base = 4, oct = 4, seed = 1) {
  const out = new Float32Array(size * size);
  let amp = 1, tot = 0;
  for (let o = 0; o < oct; o++) {
    const g = gridNoise(size, base * 2 ** o, seed * 31 + o * 7);
    for (let i = 0; i < out.length; i++) out[i] += g[i] * amp;
    tot += amp; amp *= 0.5;
  }
  for (let i = 0; i < out.length; i++) out[i] /= tot;
  return out;
}

/** Höhenfeld (Float32, size x size, kachelbar) -> Normalmap-Canvas. */
export function heightToNormalCanvas(h, size, strength = 2) {
  const [c, g] = mk(size, size);
  const img = g.createImageData(size, size), d = img.data;
  for (let y = 0; y < size; y++) {
    const ym = ((y - 1 + size) % size) * size, yp = ((y + 1) % size) * size, y0 = y * size;
    for (let x = 0; x < size; x++) {
      const xm = (x - 1 + size) % size, xp = (x + 1) % size;
      const dx = (h[y0 + xp] - h[y0 + xm]) * strength, dy = (h[yp + x] - h[ym + x]) * strength;
      const l = Math.hypot(dx, dy, 1), o = (y0 + x) * 4;
      d[o] = (-dx / l * 0.5 + 0.5) * 255; d[o + 1] = (dy / l * 0.5 + 0.5) * 255; d[o + 2] = (1 / l * 0.5 + 0.5) * 255; d[o + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  return c;
}
const grayCanvas = (v, size, lo = 0, hi = 1) => {
  const [c, g] = mk(size, size), img = g.createImageData(size, size), d = img.data;
  for (let i = 0; i < v.length; i++) { const k = Math.max(0, Math.min(1, (v[i] - lo) / (hi - lo))) * 255; d[i * 4] = d[i * 4 + 1] = d[i * 4 + 2] = k; d[i * 4 + 3] = 255; }
  g.putImageData(img, 0, 0);
  return c;
};

/** Voronoi-Zellen (kachelbar): liefert je Pixel Zell-ID, Abstand zur Kante (F2-F1) und Zellenmittelpunkt-Abstand. */
function voronoi(size, nx, ny, seed, jitter = 0.85) {
  const r = rng(seed), pts = [];
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) pts.push([(i + 0.5 + (r() - 0.5) * jitter) / nx, (j + 0.5 + (r() - 0.5) * jitter) / ny]);
  const id = new Int32Array(size * size), edge = new Float32Array(size * size), cen = new Float32Array(size * size);
  const sx = size, cw = 1 / nx, ch = 1 / ny;
  for (let y = 0; y < size; y++) {
    const v = (y + 0.5) / size, cj = Math.floor(v / ch);
    for (let x = 0; x < size; x++) {
      const u = (x + 0.5) / size, ci = Math.floor(u / cw);
      let f1 = 9, f2 = 9, best = 0;
      for (let dj = -1; dj <= 1; dj++) for (let di = -1; di <= 1; di++) {
        const ii = (ci + di + nx) % nx, jj = (cj + dj + ny) % ny, p = pts[jj * nx + ii];
        let dx = u - p[0], dy = v - p[1];
        dx -= Math.round(dx); dy -= Math.round(dy);
        const dd = Math.hypot(dx * nx, dy * ny);
        if (dd < f1) { f2 = f1; f1 = dd; best = jj * nx + ii; } else if (dd < f2) f2 = dd;
      }
      const o = y * sx + x; id[o] = best; edge[o] = f2 - f1; cen[o] = f1;
    }
  }
  return { id, edge, cen };
}

const shade = (arr, o, r, g, b) => { arr[o] = r < 0 ? 0 : r > 255 ? 255 : r; arr[o + 1] = g < 0 ? 0 : g > 255 ? 255 : g; arr[o + 2] = b < 0 ? 0 : b > 255 ? 255 : b; arr[o + 3] = 255; };

/** Backstein (Gewölbe): Farbe, Normal, Rauheit. tile = Kantenlänge in Metern. */
export function brickSet(size = 1024) {
  const cols = 8, rows = 24;
  const [c, g] = mk(size, size), img = g.createImageData(size, size), d = img.data;
  const h = new Float32Array(size * size), rough = new Float32Array(size * size);
  const r = rng(11), nz = fbm(size, 8, 4, 3), nz2 = fbm(size, 32, 3, 5);
  const bw = size / cols, bh = size / rows, mort = Math.max(3, size / 220);
  const pal = [[132, 62, 44], [148, 76, 52], [118, 56, 42], [156, 92, 62], [104, 52, 40], [140, 100, 76]];
  const cellCol = [];
  for (let i = 0; i < cols * rows * 2; i++) { const p = pal[(r() * pal.length) | 0], t = 0.82 + r() * 0.36; cellCol.push([p[0] * t, p[1] * t, p[2] * t, r()]); }
  for (let y = 0; y < size; y++) {
    const row = Math.floor(y / bh), off = (row % 2) * bw * 0.5, fy = y - row * bh;
    for (let x = 0; x < size; x++) {
      const xx = (x + off) % size, col = Math.floor(xx / bw), fx = xx - col * bw;
      const e = Math.min(fx, bw - fx, fy, bh - fy);
      const o = y * size + x, o4 = o * 4;
      const cc = cellCol[row * cols + col];
      const n = nz[o], n2 = nz2[o];
      if (e < mort) { // Mörtel
        const m = 150 + n * 40 + (n2 - 0.5) * 30;
        shade(d, o4, m, m * 0.94, m * 0.84);
        h[o] = 0.12 + n2 * 0.1; rough[o] = 0.97;
      } else {
        const bev = Math.min(1, (e - mort) / (size / 90));
        const k = 0.75 + n * 0.5 + (n2 - 0.5) * 0.25;
        shade(d, o4, cc[0] * k * (0.8 + bev * 0.2), cc[1] * k * (0.8 + bev * 0.2), cc[2] * k * (0.8 + bev * 0.2));
        h[o] = 0.55 + bev * 0.3 + n * 0.25 + (n2 - 0.5) * 0.15; rough[o] = 0.82 + n2 * 0.15;
      }
    }
  }
  g.putImageData(img, 0, 0);
  return { map: toTex(c), normal: toTex(heightToNormalCanvas(h, size, 3.2), { srgb: false }), rough: toTex(grayCanvas(rough, size, 0.6, 1), { srgb: false }) };
}

/** Bruchstein-/Quaderwand und Bodenplatten. cells = Anzahl Steine je Kachel, moss = Bemoosung 0..1. */
export function stoneSet(size = 1024, { nx = 10, ny = 8, seed = 5, pal = 'wall', moss = 0.25, jitter = 0.7 } = {}) {
  const V = voronoi(size, nx, ny, seed, jitter);
  const [c, g] = mk(size, size), img = g.createImageData(size, size), d = img.data;
  const h = new Float32Array(size * size), rough = new Float32Array(size * size);
  const nz = fbm(size, 6, 5, seed + 1), nz2 = fbm(size, 24, 3, seed + 2), nzm = fbm(size, 5, 4, seed + 9);
  const r = rng(seed * 13);
  const palettes = {
    wall: [[128, 112, 94], [142, 124, 102], [112, 100, 86], [152, 132, 108], [120, 108, 98]],
    floor: [[96, 88, 80], [108, 98, 86], [86, 80, 74], [116, 104, 90], [92, 90, 86]],
  }[pal];
  const cell = [];
  for (let i = 0; i < nx * ny; i++) { const p = palettes[(r() * palettes.length) | 0], t = 0.88 + r() * 0.24; cell.push([p[0] * t, p[1] * t, p[2] * t, 0.7 + r() * 0.3]); }
  for (let i = 0; i < size * size; i++) {
    const cc = cell[V.id[i]], e = V.edge[i], n = nz[i], n2 = nz2[i], o4 = i * 4;
    const mortar = e < 0.045;
    const dome = Math.min(1, e * 4.5);
    if (mortar) {
      const m = 78 + n * 30;
      shade(d, o4, m * 1.02, m, m * 0.9);
      h[i] = 0.05 + n2 * 0.1; rough[i] = 0.98;
    } else {
      const k = 0.86 + n * 0.32 + (n2 - 0.5) * 0.22;
      let R = cc[0] * k, G = cc[1] * k, B = cc[2] * k;
      const mo = Math.max(0, nzm[i] - (1 - moss) + (0.1 - Math.min(0.1, e)) * 2); // Moos vor allem in Fugen und feuchten Flecken
      if (mo > 0) { const q = Math.min(1, mo * 3); R = R * (1 - q * 0.5) + 40 * q * 0.5; G = G * (1 - q * 0.35) + 62 * q * 0.35; B = B * (1 - q * 0.5) + 30 * q * 0.5; }
      shade(d, o4, R, G, B);
      h[i] = 0.4 + dome * 0.16 + n * 0.3 + (n2 - 0.5) * 0.2; rough[i] = cc[3] * (0.75 + n2 * 0.25);
    }
  }
  g.putImageData(img, 0, 0);
  return { map: toTex(c), normal: toTex(heightToNormalCanvas(h, size, 3), { srgb: false }), rough: toTex(grayCanvas(rough, size, 0.5, 1), { srgb: false }) };
}


/** Sandstein-Quader (Rippen, Pilaster, Bogenrahmen): Lagerfugen in Reihen, versetzte Stoßfugen. */
export function ashlarSet(size = 1024, { rows = 9, seed = 17 } = {}) {
  const [c, g] = mk(size, size), img = g.createImageData(size, size), d = img.data;
  const h = new Float32Array(size * size), rough = new Float32Array(size * size);
  const r = rng(seed), nz = fbm(size, 6, 5, seed + 1), nz2 = fbm(size, 28, 3, seed + 2);
  const rowH = size / rows, joints = [];
  for (let y = 0; y < rows; y++) { const xs = []; let x = -r() * size * 0.3; while (x < size) { const w = size * (0.22 + r() * 0.2); xs.push([x, x + w, 0.85 + r() * 0.25]); x += w; } joints.push(xs); }
  const mort = Math.max(2, size / 300);
  for (let y = 0; y < size; y++) {
    const row = Math.min(rows - 1, Math.floor(y / rowH)), fy = y - row * rowH;
    for (let x = 0; x < size; x++) {
      const o = y * size + x, n = nz[o], n2 = nz2[o];
      let blk = joints[row].find((b) => x >= b[0] && x < b[1]) || joints[row][joints[row].length - 1];
      const fx = Math.min(x - blk[0], blk[1] - x), e = Math.min(fx, fy, rowH - fy);
      if (e < mort) { const m = 92 + n * 26; shade(d, o * 4, m * 1.02, m, m * 0.9); h[o] = 0.1; rough[o] = 0.98; }
      else {
        const bev = Math.min(1, (e - mort) / (size / 70)), k = blk[2] * (0.88 + n * 0.3 + (n2 - 0.5) * 0.18);
        shade(d, o * 4, 168 * k, 150 * k, 124 * k); h[o] = 0.55 + bev * 0.3 + n * 0.2 + (n2 - 0.5) * 0.12; rough[o] = 0.85 + n2 * 0.12;
      }
    }
  }
  g.putImageData(img, 0, 0);
  return { map: toTex(c), normal: toTex(heightToNormalCanvas(h, size, 2.6), { srgb: false }), rough: toTex(grayCanvas(rough, size, 0.6, 1), { srgb: false }) };
}

/** Eichendauben (u = Umfang, v = Achse): Farbe, Normal, Rauheit. */
export function woodStaveSet(size = 1024) {
  const W = size, H = size >> 1, n = 20;
  const [c, g] = mk(W, H);
  const r = rng(21), sw = W / n;
  for (let s = 0; s < n; s++) {
    const x0 = s * sw, t = 0.82 + r() * 0.36;
    g.fillStyle = `rgb(${(122 * t) | 0},${(74 * t) | 0},${(38 * t) | 0})`;
    g.fillRect(x0, 0, sw, H);
    for (let k = 0; k < 60; k++) {
      const gx = x0 + r() * sw, ph = r() * 6, amp = 0.6 + r() * 2.6, f = 0.006 + r() * 0.02;
      g.strokeStyle = r() < 0.65 ? `rgba(38,18,6,${0.08 + r() * 0.2})` : `rgba(214,152,92,${0.05 + r() * 0.12})`;
      g.lineWidth = 0.5 + r() * 1.6;
      g.beginPath();
      for (let y = 0; y <= H; y += 8) { const x = gx + Math.sin(y * f + ph) * amp; y === 0 ? g.moveTo(x, y) : g.lineTo(x, y); }
      g.stroke();
    }
    if (r() < 0.4) { // Astloch
      const kx = x0 + sw * (0.25 + r() * 0.5), ky = r() * H;
      for (let q = 5; q > 0; q--) { g.strokeStyle = `rgba(30,14,4,${0.1 + q * 0.05})`; g.lineWidth = 1.2; g.beginPath(); g.ellipse(kx, ky, q * 2.6, q * 9, 0, 0, 7); g.stroke(); }
    }
    g.fillStyle = 'rgba(14,7,2,.85)'; g.fillRect(x0 - 1, 0, 2.5, H);
  }
  // Patina: dunkle Reifenränder, Wasser-/Grauschleier, Fleckenrauschen
  const bands = [0.16, 0.24, 0.76, 0.84];
  for (const b of bands) { const gr = g.createLinearGradient(0, H * (b - 0.05), 0, H * (b + 0.05)); gr.addColorStop(0, 'rgba(10,6,3,0)'); gr.addColorStop(0.5, 'rgba(10,6,3,.22)'); gr.addColorStop(1, 'rgba(10,6,3,0)'); g.fillStyle = gr; g.fillRect(0, H * (b - 0.05), W, H * 0.1); }
  const grad = g.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, 'rgba(0,0,0,.4)'); grad.addColorStop(0.12, 'rgba(0,0,0,0)'); grad.addColorStop(0.88, 'rgba(0,0,0,0)'); grad.addColorStop(1, 'rgba(0,0,0,.4)');
  g.fillStyle = grad; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 26; i++) { const x = r() * W, y = r() * H, rad = 20 + r() * 70; const gr = g.createRadialGradient(x, y, 0, x, y, rad); gr.addColorStop(0, r() < 0.6 ? 'rgba(20,12,6,.18)' : 'rgba(150,150,140,.09)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(x - rad, y - rad, rad * 2, rad * 2); }
  // Höhenfeld aus der Helligkeit (Maserung wird zu Relief)
  const px = g.getImageData(0, 0, W, H).data, hh = new Float32Array(W * H), rr = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) { const l = (px[i * 4] + px[i * 4 + 1] + px[i * 4 + 2]) / 765; hh[i] = l; rr[i] = 0.55 + (1 - l) * 0.35; }
  const [nc, ng] = mk(W, H), ni = ng.createImageData(W, H), nd = ni.data;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const o = y * W + x, xm = y * W + (x + W - 1) % W, xp = y * W + (x + 1) % W, ym = ((y + H - 1) % H) * W + x, yp = ((y + 1) % H) * W + x;
    const dx = (hh[xp] - hh[xm]) * 2.2, dy = (hh[yp] - hh[ym]) * 2.2, l = Math.hypot(dx, dy, 1);
    nd[o * 4] = (-dx / l * 0.5 + 0.5) * 255; nd[o * 4 + 1] = (dy / l * 0.5 + 0.5) * 255; nd[o * 4 + 2] = (1 / l * 0.5 + 0.5) * 255; nd[o * 4 + 3] = 255;
  }
  ng.putImageData(ni, 0, 0);
  const [rc, rg] = mk(W, H), ri = rg.createImageData(W, H), rd = ri.data;
  for (let i = 0; i < W * H; i++) { const k = Math.min(1, rr[i]) * 255; rd[i * 4] = rd[i * 4 + 1] = rd[i * 4 + 2] = k; rd[i * 4 + 3] = 255; }
  rg.putImageData(ri, 0, 0);
  return { map: toTex(c), normal: toTex(nc, { srgb: false }), rough: toTex(rc, { srgb: false }) };
}

/** Bretter (Regale, Kisten, Tisch): Maserung entlang u. */
export function plankSet(size = 512, { seed = 41, boards = 5, tint = [128, 84, 48] } = {}) {
  const [c, g] = mk(size, size), r = rng(seed), bh = size / boards;
  for (let b = 0; b < boards; b++) {
    const y0 = b * bh, t = 0.78 + r() * 0.4;
    g.fillStyle = `rgb(${tint[0] * t | 0},${tint[1] * t | 0},${tint[2] * t | 0})`; g.fillRect(0, y0, size, bh);
    for (let k = 0; k < 46; k++) {
      const gy = y0 + r() * bh, ph = r() * 6, amp = 0.5 + r() * 2.2, f = 0.008 + r() * 0.02;
      g.strokeStyle = r() < 0.65 ? `rgba(34,16,4,${0.07 + r() * 0.2})` : `rgba(220,160,100,${0.05 + r() * 0.1})`; g.lineWidth = 0.5 + r() * 1.5;
      g.beginPath();
      for (let x = 0; x <= size; x += 8) { const y = gy + Math.sin(x * f + ph) * amp; x === 0 ? g.moveTo(x, y) : g.lineTo(x, y); }
      g.stroke();
    }
    if (r() < 0.5) { const kx = r() * size, ky = y0 + bh * (0.25 + r() * 0.5); for (let q = 4; q > 0; q--) { g.strokeStyle = `rgba(30,14,4,${0.12 + q * 0.05})`; g.beginPath(); g.ellipse(kx, ky, q * 8, q * 2.4, 0, 0, 7); g.stroke(); } }
    g.fillStyle = 'rgba(12,6,2,.85)'; g.fillRect(0, y0 - 1, size, 2.5);
  }
  const px = g.getImageData(0, 0, size, size).data, hh = new Float32Array(size * size);
  for (let i = 0; i < size * size; i++) hh[i] = (px[i * 4] + px[i * 4 + 1] + px[i * 4 + 2]) / 765;
  return { map: toTex(c), normal: toTex(heightToNormalCanvas(hh, size, 2.4), { srgb: false }) };
}

/** Fassboden (Stirnseite): Bretter mit Jahresringen. */
export function woodHeadMap() {
  const S = 512, [c, g] = mk(S, S), r = rng(33), n = 7, pw = S / n;
  for (let i = 0; i < n; i++) {
    const t = 0.85 + r() * 0.3;
    g.fillStyle = `rgb(${(122 * t) | 0},${(76 * t) | 0},${(40 * t) | 0})`; g.fillRect(i * pw, 0, pw, S);
    for (let k = 0; k < 34; k++) {
      g.strokeStyle = `rgba(40,20,6,${0.06 + r() * 0.16})`; g.lineWidth = 0.6 + r();
      const x = i * pw + r() * pw; g.beginPath(); g.moveTo(x, 0);
      for (let y = 0; y <= S; y += 16) g.lineTo(x + Math.sin(y * 0.02 + k) * 2, y);
      g.stroke();
    }
    g.fillStyle = 'rgba(12,6,2,.8)'; g.fillRect(i * pw - 1, 0, 2.5, S);
  }
  const rg = g.createRadialGradient(S / 2, S / 2, S * 0.2, S / 2, S / 2, S * 0.72);
  rg.addColorStop(0, 'rgba(0,0,0,0)'); rg.addColorStop(1, 'rgba(0,0,0,.55)');
  g.fillStyle = rg; g.fillRect(0, 0, S, S);
  return toTex(c);
}

/** Streifige Rauheit für Metallreifen. */
export function metalRoughMap() {
  const S = 256, [c, g] = mk(S, S), r = rng(8);
  g.fillStyle = '#7a7a7a'; g.fillRect(0, 0, S, S);
  for (let i = 0; i < 260; i++) { const v = 90 + r() * 120 | 0; g.fillStyle = `rgba(${v},${v},${v},${0.15 + r() * 0.3})`; g.fillRect(r() * S, r() * S, 10 + r() * 60, 1 + r() * 2); }
  for (let i = 0; i < 40; i++) { g.fillStyle = 'rgba(230,230,230,.5)'; g.beginPath(); g.arc(r() * S, r() * S, 1 + r() * 4, 0, 7); g.fill(); }
  return toTex(c, { srgb: false });
}

/** Papierfasern als Normalmap (kachelbar). */
export function paperNormal() {
  const S = 256, h = fbm(S, 32, 3, 77), h2 = fbm(S, 8, 3, 78);
  const v = new Float32Array(S * S);
  for (let i = 0; i < v.length; i++) v[i] = h[i] * 0.6 + h2[i] * 0.4;
  return toTex(heightToNormalCanvas(v, S, 0.9), { srgb: false });
}

/** Holzkorken (Ahorn/Buche hell), Maserung um die Achse. */
export function corkWoodMap() {
  const S = 256, [c, g] = mk(S, S), r = rng(91);
  g.fillStyle = '#c9a476'; g.fillRect(0, 0, S, S);
  for (let i = 0; i < 90; i++) { g.strokeStyle = `rgba(${r() < 0.5 ? '90,58,28' : '235,205,160'},${0.08 + r() * 0.16})`; g.lineWidth = 0.6 + r() * 1.6; const x = r() * S; g.beginPath(); g.moveTo(x, 0); for (let y = 0; y <= S; y += 16) g.lineTo(x + Math.sin(y * 0.03 + i) * 2, y); g.stroke(); }
  return toTex(c);
}

/** Etikettenplatzhalter im Markenstil (nur wenn kein echtes Etikett vorliegt); klar als Platzhalter gekennzeichnet. */
export function placeholderLabel(titel, abv, farbe = '#1c2a3a') {
  const W = 1024, H = 669, [c, g] = mk(W, H);
  const gr = g.createLinearGradient(0, 0, W, H); gr.addColorStop(0, farbe); gr.addColorStop(1, '#0c1218'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
  g.strokeStyle = 'rgba(243,232,205,.85)'; g.lineWidth = 6; g.strokeRect(22, 22, W - 44, H - 44);
  g.strokeStyle = 'rgba(227,185,108,.7)'; g.lineWidth = 2; g.strokeRect(40, 40, W - 80, H - 80);
  g.textAlign = 'center'; g.fillStyle = '#f5ead0';
  g.font = 'italic 400 46px "Cormorant Garamond", Georgia, serif'; g.fillText('Produit luxembourgeois', W / 2, 108);
  const parts = titel.split(' ');
  const l1 = parts.slice(0, 1).join(' '), l2 = parts.slice(1).join(' ');
  g.font = '600 118px "Cormorant Garamond", Georgia, serif'; g.fillText(l1, W / 2, 250);
  g.fillStyle = '#e3b96c'; g.font = 'italic 600 128px "Cormorant Garamond", Georgia, serif'; g.fillText(l2, W / 2, 380);
  g.fillStyle = '#f5ead0'; g.font = '600 46px "Cormorant Garamond", Georgia, serif'; g.fillText(`${abv} % vol.`, W / 2, 470);
  g.font = '400 34px "Cormorant Garamond", Georgia, serif'; g.fillText('Hierber Brennerei · Herborn', W / 2, 540);
  g.fillStyle = 'rgba(243,232,205,.6)'; g.font = '500 24px Inter, sans-serif'; g.fillText('PLATZHALTER-ETIKETT', W / 2, 600);
  const t = toTex(c, { wrap: false, aniso: 8 });
  return { tex: t, aspect: W / H };
}

/** Messingschild am Fass. */
export function plaqueTexture(p) {
  const W = 512, H = 240, [c, g] = mk(W, H);
  const gr = g.createLinearGradient(0, 0, W, H);
  gr.addColorStop(0, '#d7ab5c'); gr.addColorStop(0.5, '#a97a34'); gr.addColorStop(1, '#c79a4e');
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  const r = rng(p.id.length * 17);
  for (let i = 0; i < 300; i++) { g.fillStyle = `rgba(${r() < 0.5 ? '60,36,8' : '255,225,160'},${0.03 + r() * 0.06})`; g.fillRect(r() * W, r() * H, 1 + r() * 24, 1); }
  g.strokeStyle = '#4a2f10'; g.lineWidth = 6; g.strokeRect(10, 10, W - 20, H - 20);
  g.lineWidth = 2; g.strokeRect(22, 22, W - 44, H - 44);
  g.textAlign = 'center'; g.fillStyle = '#2a1706';
  const fs = p.name.length > 18 ? 46 : p.name.length > 14 ? 56 : 68;
  g.font = `600 ${fs}px "Cormorant Garamond", Georgia, serif`;
  g.fillText(p.name, W / 2, 118);
  g.font = 'italic 400 42px "Cormorant Garamond", Georgia, serif';
  g.fillText(`${p.abv} % vol.`, W / 2, 178);
  return toTex(c);
}

/* ---------- Leucht-/Partikel-Texturen ---------- */
export function glowTexture(stops, size = 128) {
  const [c, g] = mk(size, size);
  const gr = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  stops.forEach(([p, col]) => gr.addColorStop(p, col));
  g.fillStyle = gr; g.fillRect(0, 0, size, size);
  return toTex(c, { wrap: false });
}
export const dotTexture = () => glowTexture([[0, 'rgba(255,255,255,1)'], [0.4, 'rgba(255,255,255,.55)'], [1, 'rgba(255,255,255,0)']], 64);
export const blobShadowTexture = () => glowTexture([[0, 'rgba(0,0,0,.85)'], [0.5, 'rgba(0,0,0,.45)'], [1, 'rgba(0,0,0,0)']], 128);
export const flameTexture = () => {
  const [c, g] = mk(64, 128);
  const gr = g.createRadialGradient(32, 84, 2, 32, 84, 44);
  gr.addColorStop(0, 'rgba(255,250,220,1)'); gr.addColorStop(0.25, 'rgba(255,190,90,.95)'); gr.addColorStop(0.6, 'rgba(255,120,30,.4)'); gr.addColorStop(1, 'rgba(255,90,10,0)');
  g.save(); g.scale(1, 1.5); g.translate(0, -28); g.fillStyle = gr; g.fillRect(0, 0, 64, 128); g.restore();
  return toTex(c, { wrap: false });
};
export function bubbleTexture() {
  const [c, g] = mk(64, 64), gr = g.createRadialGradient(32, 32, 6, 32, 32, 30);
  gr.addColorStop(0, 'rgba(255,255,255,.08)'); gr.addColorStop(0.75, 'rgba(255,255,255,.35)'); gr.addColorStop(0.95, 'rgba(255,255,255,.95)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  g.fillStyle = 'rgba(255,255,255,.9)'; g.beginPath(); g.arc(22, 22, 4, 0, 7); g.fill();
  return toTex(c, { wrap: false });
}
export function smokeTexture() {
  const [c, g] = mk(128, 128), r = rng(77);
  for (let i = 0; i < 14; i++) { const x = 34 + r() * 60, y = 34 + r() * 60, rad = 18 + r() * 26, gr = g.createRadialGradient(x, y, 0, x, y, rad); gr.addColorStop(0, 'rgba(255,255,255,.28)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, 128, 128); }
  const mask = g.createRadialGradient(64, 64, 10, 64, 64, 64);
  mask.addColorStop(0, 'rgba(0,0,0,0)'); mask.addColorStop(1, 'rgba(0,0,0,1)');
  g.globalCompositeOperation = 'destination-out'; g.fillStyle = mask; g.fillRect(0, 0, 128, 128);
  return toTex(c, { wrap: false });
}
export function frostTexture() {
  const [c, g] = mk(256, 256), r = rng(3);
  g.fillStyle = '#000'; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 2600; i++) { g.fillStyle = `rgba(255,255,255,${0.25 + r() * 0.75})`; const s = 0.6 + r() * 2.2; g.fillRect(r() * 256, r() * 256, s, s); }
  return toTex(c, { srgb: false });
}
/** Unregelmäßiger, weicher Fleck als Graustufen-Maske (Pfützen; wird als alphaMap gelesen: Grünkanal). */
export function puddleTexture(seed = 3) {
  const S = 256, [c, g] = mk(S, S), r = rng(seed);
  g.fillStyle = '#000'; g.fillRect(0, 0, S, S);
  g.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 9; i++) { const x = S * (0.3 + r() * 0.4), y = S * (0.3 + r() * 0.4), rad = S * (0.14 + r() * 0.16); const gr = g.createRadialGradient(x, y, 0, x, y, rad); gr.addColorStop(0, 'rgba(255,255,255,.9)'); gr.addColorStop(0.6, 'rgba(255,255,255,.55)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(0, 0, S, S); }
  g.globalCompositeOperation = 'multiply';
  const mask = g.createRadialGradient(S / 2, S / 2, S * 0.18, S / 2, S / 2, S * 0.5); mask.addColorStop(0, '#fff'); mask.addColorStop(1, '#000');
  g.fillStyle = mask; g.fillRect(0, 0, S, S);
  return toTex(c, { wrap: false, srgb: false });
}

/* ---------- Deko-Texturen (aus v1 übernommen und erweitert) ---------- */
export function sliceTexture({ rind, pith, flesh, segments = 0, seeds = 0, seedColor = 'rgba(240,235,190,.9)', ring = 0.35 }) {
  const S = 256, R = S / 2, [c, g] = mk(S, S), r = rng(9);
  g.fillStyle = rind; g.beginPath(); g.arc(R, R, R - 1, 0, 7); g.fill();
  g.fillStyle = pith; g.beginPath(); g.arc(R, R, R * 0.92, 0, 7); g.fill();
  g.fillStyle = flesh; g.beginPath(); g.arc(R, R, R * 0.84, 0, 7); g.fill();
  g.strokeStyle = pith; g.lineWidth = 3;
  for (let i = 0; i < segments; i++) { const a = (i / segments) * Math.PI * 2; g.beginPath(); g.moveTo(R, R); g.lineTo(R + Math.cos(a) * R * 0.84, R + Math.sin(a) * R * 0.84); g.stroke(); }
  g.fillStyle = pith; g.beginPath(); g.arc(R, R, R * 0.06, 0, 7); g.fill();
  g.fillStyle = seedColor;
  for (let i = 0; i < seeds; i++) { const a = (i / seeds) * Math.PI * 2 + r(), dd = R * (ring + r() * 0.2); g.beginPath(); g.ellipse(R + Math.cos(a) * dd, R + Math.sin(a) * dd, 5, 9, a, 0, 7); g.fill(); }
  return toTex(c, { wrap: false });
}
export function kiwiSliceTexture() {
  const S = 256, R = S / 2, [c, g] = mk(S, S), r = rng(19);
  g.fillStyle = '#6b5a2c'; g.beginPath(); g.arc(R, R, R - 1, 0, 7); g.fill();
  const gr = g.createRadialGradient(R, R, R * 0.12, R, R, R * 0.86); gr.addColorStop(0, '#e6efb4'); gr.addColorStop(0.3, '#9ccb45'); gr.addColorStop(1, '#5da12a');
  g.fillStyle = gr; g.beginPath(); g.arc(R, R, R * 0.9, 0, 7); g.fill();
  g.strokeStyle = 'rgba(230,240,180,.45)'; g.lineWidth = 2;
  for (let i = 0; i < 26; i++) { const a = i / 26 * 6.283; g.beginPath(); g.moveTo(R + Math.cos(a) * R * 0.2, R + Math.sin(a) * R * 0.2); g.lineTo(R + Math.cos(a) * R * 0.86, R + Math.sin(a) * R * 0.86); g.stroke(); }
  g.fillStyle = '#eef5c8'; g.beginPath(); g.arc(R, R, R * 0.16, 0, 7); g.fill();
  g.fillStyle = '#1b1a10';
  for (let i = 0; i < 44; i++) { const a = i / 44 * 6.283 + r() * 0.1, dd = R * (0.24 + (i % 2) * 0.12 + r() * 0.03); g.beginPath(); g.ellipse(R + Math.cos(a) * dd, R + Math.sin(a) * dd, 2.2, 4.2, a, 0, 7); g.fill(); }
  return toTex(c, { wrap: false });
}
export function appleSliceTexture() {
  const S = 256, R = S / 2, [c, g] = mk(S, S);
  g.fillStyle = '#b6bd3c'; g.beginPath(); g.arc(R, R, R - 1, 0, 7); g.fill();
  const gr = g.createRadialGradient(R, R, R * 0.1, R, R, R * 0.9); gr.addColorStop(0, '#fbf6d2'); gr.addColorStop(1, '#f3edb8');
  g.fillStyle = gr; g.beginPath(); g.arc(R, R, R * 0.94, 0, 7); g.fill();
  g.fillStyle = 'rgba(210,195,120,.6)'; g.beginPath(); g.ellipse(R, R, R * 0.26, R * 0.2, 0, 0, 7); g.fill();
  g.fillStyle = '#4a2c12'; for (const a of [0.4, 1.6, 2.7, 3.9, 5.1]) { g.beginPath(); g.ellipse(R + Math.cos(a) * R * 0.15, R + Math.sin(a) * R * 0.11, 3.5, 6.5, a, 0, 7); g.fill(); }
  return toTex(c, { wrap: false });
}
export function honeycombTexture() {
  const S = 256, [c, g] = mk(S, S), hexR = 22;
  g.fillStyle = '#7a4a10'; g.fillRect(0, 0, S, S);
  const w = hexR * Math.sqrt(3);
  for (let row = -1; row < S / (hexR * 1.5) + 1; row++) for (let col = -1; col < S / w + 1; col++) {
    const cx = col * w + (row % 2 ? w / 2 : 0), cy = row * hexR * 1.5;
    g.beginPath(); for (let k = 0; k < 6; k++) { const a = Math.PI / 6 + k * Math.PI / 3; g.lineTo(cx + Math.cos(a) * (hexR - 2), cy + Math.sin(a) * (hexR - 2)); } g.closePath();
    const gr = g.createRadialGradient(cx - 4, cy - 4, 2, cx, cy, hexR); gr.addColorStop(0, '#ffd45a'); gr.addColorStop(1, '#e79a1a'); g.fillStyle = gr; g.fill();
  }
  return toTex(c);
}
export function pearSliceTexture() {
  const S = 256, [c, g] = mk(S, S), gr = g.createRadialGradient(S / 2, S / 2, S * 0.08, S / 2, S / 2, S * 0.62);
  gr.addColorStop(0, '#fbf6d8'); gr.addColorStop(0.7, '#f0e9b8'); gr.addColorStop(1, '#b9c26a');
  g.fillStyle = gr; g.fillRect(0, 0, S, S);
  g.fillStyle = 'rgba(232,222,160,.9)'; g.beginPath(); g.ellipse(S / 2, S * 0.56, S * 0.13, S * 0.2, 0, 0, 7); g.fill();
  g.fillStyle = '#5a3a1a'; for (const [x, y] of [[-0.05, 0.5], [0.05, 0.5], [-0.03, 0.62], [0.03, 0.62]]) { g.beginPath(); g.ellipse(S * (0.5 + x), S * y, 4, 8, 0, 0, 7); g.fill(); }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.repeat.set(1 / 0.11, 1 / 0.125); t.offset.set(0.5, 0.5 - 0.004 / 0.125);
  return t;
}
