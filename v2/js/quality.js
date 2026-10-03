// Qualitätsstufen und adaptive Steuerung (Auflösung zuerst, dann Stufe herunter). Handy: eigene abgespeckte Stufe.
export const TIERS = {
  high: { name: 'high', post: true, msaa: 4, bloom: true, bloomStrength: 0.22, dof: true, ca: 0.0009, trans: true, dust: 700, shafts: true, puddles: true, pools: true, shadows: true, dprMax: 2, texSize: 1024 },
  medium: { name: 'medium', post: true, msaa: 2, bloom: true, bloomStrength: 0.18, dof: false, ca: 0, trans: false, dust: 420, shafts: true, puddles: true, pools: true, shadows: true, dprMax: 1.5, texSize: 1024 },
  low: { name: 'low', post: false, trans: false, dust: 220, shafts: false, puddles: false, pools: true, shadows: false, dprMax: 1.25, texSize: 512 },
  mobile: { name: 'mobile', post: false, trans: false, dust: 180, shafts: false, puddles: false, pools: true, shadows: false, dprMax: 1.5, texSize: 512, mobile: true },
};
const ORDER = ['high', 'medium', 'low'];

/** Anfangsstufe wählen: URL (?q=…) > Handy > Softwarerenderer > integrierte GPU (mittel) > hoch. */
export function pickStartTier(gl, params, mobile) {
  const q = params.get('q');
  if (q && TIERS[q]) return { tier: TIERS[q], fixed: true };
  if (typeof WebGL2RenderingContext === 'undefined' || !(gl instanceof WebGL2RenderingContext)) return { tier: mobile ? TIERS.mobile : TIERS.low, fixed: false }; // Nachbearbeitung braucht WebGL 2
  if (mobile) return { tier: TIERS.mobile, fixed: false };
  let info = '';
  try { const e = gl.getExtension('WEBGL_debug_renderer_info'); if (e) info = String(gl.getParameter(e.UNMASKED_RENDERER_WEBGL) || ''); } catch { /* egal */ }
  if (/swiftshader|llvmpipe|software|basic render/i.test(info)) return { tier: TIERS.low, fixed: false, info };
  if (/intel/i.test(info) && !/arc/i.test(info)) return { tier: TIERS.medium, fixed: false, info };
  return { tier: TIERS.high, fixed: false, info };
}

/**
 * Adaptive Steuerung. Alle 90 Bilder: zu langsam -> erst Auflösung (min. 0,75), dann Stufe herunter;
 * flott -> Auflösung wieder anheben. onTier(tier), onDpr(dpr) übernehmen die Umschaltung.
 */
export function createAdaptive({ tier, fixed, onTier, onDpr, mobile }) {
  let cur = tier, dpr = Math.min(window.devicePixelRatio || 1, cur.dprMax), acc = 0, frames = 0, warm = 0;
  const minDpr = 0.75;
  return {
    get tier() { return cur; }, get dpr() { return dpr; }, fixed,
    startDpr() { return dpr; },
    tick(dt) {
      if (fixed) return;
      if (warm < 60) { warm++; return; } // Start (Shader-Kompilierung) nicht mitzählen
      acc += dt; frames++;
      if (frames < 90) return;
      const avg = acc / frames; acc = 0; frames = 0;
      const maxDpr = Math.min(window.devicePixelRatio || 1, cur.dprMax);
      if (avg > 1 / 40) {
        if (dpr > minDpr + 1e-3) { dpr = Math.max(minDpr, dpr - 0.25); onDpr(dpr); }
        else if (!mobile && ORDER.indexOf(cur.name) < ORDER.length - 1) {
          cur = TIERS[ORDER[ORDER.indexOf(cur.name) + 1]]; dpr = Math.min(window.devicePixelRatio || 1, cur.dprMax) * 0.85; onTier(cur); onDpr(dpr); warm = 0;
        }
      } else if (avg < 1 / 58 && dpr < maxDpr - 1e-3) { dpr = Math.min(maxDpr, dpr + 0.25); onDpr(dpr); }
    },
  };
}
