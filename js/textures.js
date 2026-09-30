// Prozedurale Texturen (Canvas) – keine externen Bilddateien nötig.
import * as THREE from 'three';

export const rng = (seed) => {
  let s = seed >>> 0;
  return () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296;
};

const mk = (w, h) => {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return [c, c.getContext('2d')];
};

const toTex = (c, { repeat, srgb = true } = {}) => {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  if (repeat) t.repeat.set(repeat[0], repeat[1]);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
};

/** Backstein-Verband (Farbe + Bump). */
export function brickMaps(repeat) {
  const W = 512, H = 512, rows = 8, cols = 4;
  const [c, g] = mk(W, H), [b, bg] = mk(W, H);
  const r = rng(11);
  g.fillStyle = '#1e1610'; g.fillRect(0, 0, W, H);
  bg.fillStyle = '#000'; bg.fillRect(0, 0, W, H);
  const bw = W / cols, bh = H / rows;
  for (let y = 0; y < rows; y++) {
    const off = (y % 2) * bw / 2;
    for (let x = -1; x <= cols; x++) {
      const px = x * bw + off + 2.5, py = y * bh + 2.5, w = bw - 5, h = bh - 5, t = r();
      const sand = r() < 0.2;
      const R = sand ? 132 + t * 20 : 112 + t * 36, G = sand ? 114 + t * 18 : 74 + t * 24, B = sand ? 92 + t * 14 : 62 + t * 18;
      g.fillStyle = `rgb(${R | 0},${G | 0},${B | 0})`; g.fillRect(px, py, w, h);
      g.fillStyle = 'rgba(0,0,0,.2)'; g.fillRect(px, py + h - 4, w, 4);
      g.fillStyle = 'rgba(255,220,180,.07)'; g.fillRect(px, py, w, 3);
      const v = (170 + t * 60) | 0;
      bg.fillStyle = `rgb(${v},${v},${v})`; bg.fillRect(px, py, w, h);
      for (let i = 0; i < 70; i++) {
        g.fillStyle = r() < 0.5 ? 'rgba(0,0,0,.12)' : 'rgba(255,210,170,.08)';
        g.fillRect(px + r() * w, py + r() * h, 1 + r() * 3, 1 + r() * 2);
        bg.fillStyle = r() < 0.5 ? 'rgba(0,0,0,.35)' : 'rgba(255,255,255,.25)';
        bg.fillRect(px + r() * w, py + r() * h, 1 + r() * 2, 1 + r() * 2);
      }
    }
  }
  return { map: toTex(c, { repeat }), bump: toTex(b, { repeat, srgb: false }) };
}

/** Bruchsteinplatten für Boden und Gurtbögen. */
export function stoneMaps(repeat) {
  const S = 1024;
  const [c, g] = mk(S, S), [b, bg] = mk(S, S);
  const r = rng(5);
  g.fillStyle = '#120e0a'; g.fillRect(0, 0, S, S);
  bg.fillStyle = '#000'; bg.fillRect(0, 0, S, S);
  let y = 0;
  while (y < S) {
    let h = Math.min(S - y, 150 + r() * 120);
    if (S - y - h < 100) h = S - y;
    let x = -r() * 120;
    while (x < S) {
      const w = 170 + r() * 190, t = r();
      const R = 96 + t * 40, G = 84 + t * 34, B = 70 + t * 28;
      g.fillStyle = `rgb(${R | 0},${G | 0},${B | 0})`;
      g.fillRect(x + 4, y + 4, w - 8, h - 8);
      const v = (150 + t * 70) | 0;
      bg.fillStyle = `rgb(${v},${v},${v})`; bg.fillRect(x + 4, y + 4, w - 8, h - 8);
      for (let i = 0; i < 260; i++) {
        g.fillStyle = r() < 0.5 ? 'rgba(0,0,0,.10)' : 'rgba(255,240,220,.07)';
        g.fillRect(x + 4 + r() * (w - 8), y + 4 + r() * (h - 8), 1 + r() * 3, 1 + r() * 3);
      }
      x += w;
    }
    y += h;
  }
  return { map: toTex(c, { repeat }), bump: toTex(b, { repeat, srgb: false }) };
}

/** Eichenholz: Dauben mit Maserung, u = Umfang, v = Achse. */
export function woodStaveMap() {
  const W = 1024, H = 512, n = 20;
  const [c, g] = mk(W, H);
  const r = rng(21);
  const sw = W / n;
  for (let s = 0; s < n; s++) {
    const x0 = s * sw, t = 0.82 + r() * 0.36;
    g.fillStyle = `rgb(${(116 * t) | 0},${(70 * t) | 0},${(36 * t) | 0})`;
    g.fillRect(x0, 0, sw, H);
    for (let k = 0; k < 44; k++) {
      const gx = x0 + r() * sw, ph = r() * 6, amp = 0.6 + r() * 2.4, f = 0.008 + r() * 0.02;
      g.strokeStyle = r() < 0.65 ? `rgba(38,18,6,${0.08 + r() * 0.16})` : `rgba(210,150,90,${0.05 + r() * 0.1})`;
      g.lineWidth = 0.5 + r() * 1.4;
      g.beginPath();
      for (let y = 0; y <= H; y += 8) {
        const x = gx + Math.sin(y * f + ph) * amp;
        y === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
      }
      g.stroke();
    }
    if (r() < 0.35) { // Astloch
      const kx = x0 + sw * (0.25 + r() * 0.5), ky = r() * H;
      for (let q = 4; q > 0; q--) {
        g.strokeStyle = `rgba(30,14,4,${0.12 + q * 0.05})`; g.lineWidth = 1.2;
        g.beginPath(); g.ellipse(kx, ky, q * 2.4, q * 8, 0, 0, 7); g.stroke();
      }
    }
    g.fillStyle = 'rgba(14,7,2,.85)'; g.fillRect(x0 - 1, 0, 2.5, H);
  }
  const grad = g.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, 'rgba(0,0,0,.35)'); grad.addColorStop(0.12, 'rgba(0,0,0,0)');
  grad.addColorStop(0.88, 'rgba(0,0,0,0)'); grad.addColorStop(1, 'rgba(0,0,0,.35)');
  g.fillStyle = grad; g.fillRect(0, 0, W, H);
  return toTex(c);
}

/** Fassboden (Stirnseite): Bretter mit Jahresringen. */
export function woodHeadMap() {
  const S = 512;
  const [c, g] = mk(S, S);
  const r = rng(33);
  const n = 7, pw = S / n;
  for (let i = 0; i < n; i++) {
    const t = 0.85 + r() * 0.3;
    g.fillStyle = `rgb(${(122 * t) | 0},${(76 * t) | 0},${(40 * t) | 0})`;
    g.fillRect(i * pw, 0, pw, S);
    for (let k = 0; k < 30; k++) {
      g.strokeStyle = `rgba(40,20,6,${0.06 + r() * 0.14})`; g.lineWidth = 0.6 + r();
      const x = i * pw + r() * pw;
      g.beginPath(); g.moveTo(x, 0);
      for (let y = 0; y <= S; y += 16) g.lineTo(x + Math.sin(y * 0.02 + k) * 2, y);
      g.stroke();
    }
    g.fillStyle = 'rgba(12,6,2,.8)'; g.fillRect(i * pw - 1, 0, 2.5, S);
  }
  const rg = g.createRadialGradient(S / 2, S / 2, S * 0.2, S / 2, S / 2, S * 0.72);
  rg.addColorStop(0, 'rgba(0,0,0,0)'); rg.addColorStop(1, 'rgba(0,0,0,.5)');
  g.fillStyle = rg; g.fillRect(0, 0, S, S);
  return toTex(c);
}

/** Radiale Leuchttextur. stops: [[pos, 'rgba(...)'], ...] */
export function glowTexture(stops, size = 128) {
  const [c, g] = mk(size, size);
  const gr = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  stops.forEach(([p, col]) => gr.addColorStop(p, col));
  g.fillStyle = gr; g.fillRect(0, 0, size, size);
  return toTex(c);
}

export const dotTexture = () =>
  glowTexture([[0, 'rgba(255,255,255,1)'], [0.4, 'rgba(255,255,255,.55)'], [1, 'rgba(255,255,255,0)']], 64);

/** Luftbläschen mit Randlicht. */
export function bubbleTexture() {
  const [c, g] = mk(64, 64);
  const gr = g.createRadialGradient(32, 32, 6, 32, 32, 30);
  gr.addColorStop(0, 'rgba(255,255,255,.08)'); gr.addColorStop(0.75, 'rgba(255,255,255,.35)');
  gr.addColorStop(0.95, 'rgba(255,255,255,.95)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  g.fillStyle = 'rgba(255,255,255,.9)'; g.beginPath(); g.arc(22, 22, 4, 0, 7); g.fill();
  return toTex(c);
}

/** Rauch: weiche Wolke. */
export function smokeTexture() {
  const [c, g] = mk(128, 128);
  const r = rng(77);
  for (let i = 0; i < 14; i++) {
    const x = 34 + r() * 60, y = 34 + r() * 60, rad = 18 + r() * 26;
    const gr = g.createRadialGradient(x, y, 0, x, y, rad);
    gr.addColorStop(0, 'rgba(255,255,255,.28)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  }
  const mask = g.createRadialGradient(64, 64, 10, 64, 64, 64);
  mask.addColorStop(0, 'rgba(0,0,0,0)'); mask.addColorStop(1, 'rgba(0,0,0,1)');
  g.globalCompositeOperation = 'destination-out'; g.fillStyle = mask; g.fillRect(0, 0, 128, 128);
  return toTex(c);
}

/** Frucht-/Gemüsescheibe (Aufsicht) für Gurke, Orange, Zitrone, Limette. */
export function sliceTexture({ rind, pith, flesh, segments = 0, seeds = 0 }) {
  const S = 256, R = S / 2;
  const [c, g] = mk(S, S);
  const r = rng(9);
  g.fillStyle = rind; g.beginPath(); g.arc(R, R, R - 1, 0, 7); g.fill();
  g.fillStyle = pith; g.beginPath(); g.arc(R, R, R * 0.92, 0, 7); g.fill();
  g.fillStyle = flesh; g.beginPath(); g.arc(R, R, R * 0.84, 0, 7); g.fill();
  g.strokeStyle = pith; g.lineWidth = 3;
  for (let i = 0; i < segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    g.beginPath(); g.moveTo(R, R); g.lineTo(R + Math.cos(a) * R * 0.84, R + Math.sin(a) * R * 0.84); g.stroke();
  }
  g.fillStyle = pith; g.beginPath(); g.arc(R, R, R * 0.06, 0, 7); g.fill();
  g.fillStyle = 'rgba(240,235,190,.9)';
  for (let i = 0; i < seeds; i++) {
    const a = (i / seeds) * Math.PI * 2 + r(), d = R * (0.35 + r() * 0.2);
    g.beginPath(); g.ellipse(R + Math.cos(a) * d, R + Math.sin(a) * d, 5, 9, a, 0, 7); g.fill();
  }
  return toTex(c);
}

/** Flaschenetikett (Papier, Serifen). ratio = Breite/Höhe. */
export function labelTexture(p, ratio = 1) {
  const W = 512, H = Math.round(512 / ratio);
  const [c, g] = mk(W, H);
  const paper = g.createLinearGradient(0, 0, W, H);
  paper.addColorStop(0, '#efe2c4'); paper.addColorStop(1, '#dcc9a0');
  g.fillStyle = paper; g.fillRect(0, 0, W, H);
  g.strokeStyle = '#8a5a26'; g.lineWidth = 5; g.strokeRect(14, 14, W - 28, H - 28);
  g.strokeStyle = '#2f6b4f'; g.lineWidth = 2; g.strokeRect(24, 24, W - 48, H - 48);
  g.textAlign = 'center'; g.fillStyle = '#2b1a0c';
  g.font = `italic 400 ${H * 0.085}px "Cormorant Garamond", serif`;
  g.fillText('Hierber Brennerei', W / 2, H * 0.22);
  const words = p.name.replace('Hierber ', '').split(' ');
  const big = words.length > 1 ? words : [words[0]];
  g.fillStyle = '#1f4a34';
  const fs = H * (big.length > 1 ? 0.17 : 0.2);
  g.font = `600 ${fs}px "Cormorant Garamond", serif`;
  big.forEach((w, i) => g.fillText(w, W / 2, H * (big.length > 1 ? 0.45 : 0.5) + i * fs * 0.95));
  g.fillStyle = '#8a5a26'; g.fillRect(W * 0.3, H * 0.66, W * 0.4, 2);
  g.fillStyle = '#2b1a0c';
  g.font = `600 ${H * 0.11}px "Cormorant Garamond", serif`;
  g.fillText(`${p.abv} % vol.`, W / 2, H * 0.79);
  g.font = `italic 400 ${H * 0.065}px "Cormorant Garamond", serif`;
  g.fillText('Herborn · Luxembourg', W / 2, H * 0.9);
  const t = toTex(c);
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  return t;
}

/** Messingschild am Fass. */
export function plaqueTexture(p) {
  const W = 512, H = 240;
  const [c, g] = mk(W, H);
  const gr = g.createLinearGradient(0, 0, W, H);
  gr.addColorStop(0, '#d7ab5c'); gr.addColorStop(0.5, '#a97a34'); gr.addColorStop(1, '#c79a4e');
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  g.strokeStyle = '#4a2f10'; g.lineWidth = 6; g.strokeRect(10, 10, W - 20, H - 20);
  g.lineWidth = 2; g.strokeRect(22, 22, W - 44, H - 44);
  g.textAlign = 'center'; g.fillStyle = '#2a1706';
  const fs = p.name.length > 14 ? 60 : 72;
  g.font = `600 ${fs}px "Cormorant Garamond", serif`;
  g.fillText(p.name, W / 2, 120);
  g.font = `italic 400 42px "Cormorant Garamond", serif`;
  g.fillText(`${p.abv} % vol.`, W / 2, 178);
  return toTex(c);
}

/** Frost: weißes Körnungsmuster. */
export function frostTexture() {
  const [c, g] = mk(256, 256);
  const r = rng(3);
  g.fillStyle = '#000'; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 2600; i++) {
    g.fillStyle = `rgba(255,255,255,${0.25 + r() * 0.75})`;
    const s = 0.6 + r() * 2.2;
    g.fillRect(r() * 256, r() * 256, s, s);
  }
  return toTex(c, { srgb: false });
}

/** Senkrechter Lichtreflex auf Glas. */
export function streakTexture() {
  const [c, g] = mk(32, 256);
  const gr = g.createLinearGradient(0, 0, 0, 256);
  gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(0.2, 'rgba(255,255,255,.9)');
  gr.addColorStop(0.8, 'rgba(255,255,255,.6)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(8, 0, 16, 256);
  return toTex(c);
}

/** Birnenscheibe: cremiges Fruchtfleisch, Kerngehäuse mit Kernen, grünlicher Rand (UV = Shape-Koordinaten). */
export function pearSliceTexture() {
  const S = 256;
  const [c, g] = mk(S, S);
  const gr = g.createRadialGradient(S / 2, S / 2, S * 0.08, S / 2, S / 2, S * 0.62);
  gr.addColorStop(0, '#fbf6d8'); gr.addColorStop(0.7, '#f0e9b8'); gr.addColorStop(1, '#b9c26a');
  g.fillStyle = gr; g.fillRect(0, 0, S, S);
  g.fillStyle = 'rgba(232,222,160,.9)'; g.beginPath(); g.ellipse(S / 2, S * 0.56, S * 0.13, S * 0.2, 0, 0, 7); g.fill();
  g.fillStyle = '#5a3a1a';
  for (const [x, y] of [[-0.05, 0.5], [0.05, 0.5], [-0.03, 0.62], [0.03, 0.62]]) {
    g.beginPath(); g.ellipse(S * (0.5 + x), S * y, 4, 8, 0, 0, 7); g.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.repeat.set(1 / 0.11, 1 / 0.125); t.offset.set(0.5, 0.5 - 0.004 / 0.125);
  return t;
}
