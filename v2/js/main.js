// Hierber Brennerei – Keller-Ansicht v2: Bootstrap, Szene, Kamera, Zustände, Eingaben.
import * as THREE from 'three';
import { PRODUKTE, PLATZHALTER, PLATZHALTER_FLUESSIG } from '../data/produkte.js';
import * as TX from './textures.js';
import { FASS_PLAN, shelfSlots } from './layout.js';
import { makeEnvMap, buildCellar } from './cellar.js';
import { buildBarrels, addCoaster } from './barrels.js';
import { buildShelfAndTable } from './shelf.js';
import { setEnv, buildGlass, disposeChildren } from './glassware.js';
import { initBottleMaterials, setGlassMode, makeBottle, TYPES } from './bottles.js';
import { buildSequence, resetStage } from './sequences.js';
import { TIERS, pickStartTier, createAdaptive } from './quality.js';
import { createPost } from './post.js';
import { $, renderFallback, fillFooter, createNav, createPanel } from './ui.js';

const gsap = window.gsap;
window.__hbStarted = true;

const root = document.documentElement;
const params = new URLSearchParams(location.search);
const reducedQuery = matchMedia('(prefers-reduced-motion: reduce)');
const reduced = () => reducedQuery.matches;
const mobile = params.get('mobile') === '1' || matchMedia('(pointer: coarse)').matches || Math.min(innerWidth, innerHeight) < 600;
const frame = () => new Promise((r) => requestAnimationFrame(() => r()));
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const V = (x, y, z) => new THREE.Vector3(x, y, z);
const URL_ETI = new URL('../data/etiketten.json', import.meta.url);
const labelUrl = (f) => new URL(`../../assets/labels/${f}`, import.meta.url).href;

fillFooter();

function webglAvailable() {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; }
}
if (!webglAvailable()) renderFallback(PRODUKTE, 'Die 3D-Ansicht benötigt WebGL, das in diesem Browser nicht verfügbar ist. Hier unsere Produktliste:');
else init().catch((e) => { console.error(e); renderFallback(PRODUKTE, 'Die 3D-Ansicht konnte nicht gestartet werden. Hier unsere Produktliste:'); });

/** Deckkraft der Flaschenflüssigkeit aus der Farbe: klar = fast durchsichtig, Bernstein = kräftig. */
function liquidAlpha(hex) {
  const c = new THREE.Color(hex), mx = Math.max(c.r, c.g, c.b), mn = Math.min(c.r, c.g, c.b), sat = mx - mn;
  return clamp(sat < 0.05 ? 0.1 : 0.2 + sat * 1.1, 0.1, 0.92);
}

async function init() {
  const setProgress = async (p, msg) => {
    $('#loader-bar').style.transform = `scaleX(${p})`; $('#loader-pct').textContent = `${Math.round(p * 100)} %`;
    if (msg) $('#loader-msg').textContent = msg;
    await frame();
  };
  await setProgress(0.04, 'Schriften werden geladen …');
  try { await Promise.all([document.fonts.load('600 40px "Cormorant Garamond"'), document.fonts.load('italic 400 40px "Cormorant Garamond"'), document.fonts.load('400 16px Inter')]); } catch { /* Fallback-Schrift genügt */ }
  if (params.get('q')) gsap.ticker.lagSmoothing(0); // Testläufe (langsame Software-Renderer): keine Zeitlupe

  // Etiketten-Zuordnung (dieselbe JSON wie das Aufbereitungsskript)
  const eti = await (await fetch(URL_ETI)).json();
  const LAB = new Map();
  for (const e of eti.etiketten) if (e.verwendet !== false && e.art !== 'foto-referenz') LAB.set(`${e.sorte}|${e.variante}`, e);

  /* Renderer, Qualitätsstufe */
  const canvas = $('#gl');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, powerPreference: 'high-performance', stencil: false });
  const gl = renderer.getContext();
  const start = pickStartTier(gl, params, mobile);
  let tier = start.tier;
  renderer.localClippingEnabled = true;
  renderer.toneMapping = tier.post ? THREE.NoToneMapping : THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  if (!mobile) { renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap; renderer.shadowMap.autoUpdate = false; }
  let dpr = Math.min(window.devicePixelRatio || 1, tier.dprMax);
  renderer.setPixelRatio(dpr);
  renderer.setSize(innerWidth, innerHeight, false);
  TX.setAnisotropy(Math.min(renderer.capabilities.getMaxAnisotropy(), mobile ? 4 : 8));

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b0704);
  scene.fog = new THREE.FogExp2(0x0d0805, mobile ? 0.05 : 0.038);
  const camera = new THREE.PerspectiveCamera(52, innerWidth / innerHeight, 0.1, 70);
  scene.add(camera);
  const torch = new THREE.PointLight(0xffd6a6, 7, 11, 1.6); torch.position.set(0.2, 0.15, -0.6); camera.add(torch);

  await setProgress(0.12, 'Licht wird entzündet …');
  const env = makeEnvMap(renderer);
  setEnv(env);
  initBottleMaterials({ mode: tier.trans ? 'trans' : 'opac', mobile });

  await setProgress(0.22, 'Gewölbe wird gemauert …');
  const cellar = buildCellar(scene, { mobile, env, texSize: tier.texSize });
  cellar.setTier(tier);

  await setProgress(0.4, 'Fässer werden gerollt …');
  const plateMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.06, ior: 1.5, thickness: 0.08, envMap: env, envMapIntensity: 0.7, specularIntensity: 0.8, transparent: true, opacity: 0.28, depthWrite: false });
  const setPlateMode = (trans) => { plateMat.transmission = trans ? 1 : 0; plateMat.transparent = !trans; plateMat.opacity = trans ? 1 : 0.28; plateMat.needsUpdate = true; };
  setPlateMode(tier.trans);
  const fassProdukte = PRODUKTE.filter((p) => p.ort === 'fass'), regalProdukte = PRODUKTE.filter((p) => p.ort === 'regal');
  const planMap = new Map(FASS_PLAN.map(([id, side, k]) => [id, { side, k }]));
  const barrels = buildBarrels(scene, cellar, fassProdukte.map((p) => ({ product: p, ...planMap.get(p.id) })), { env, mobile, plateMat });
  const stages = barrels.stages;
  const shelf = buildShelfAndTable(scene, cellar, { env, mobile });
  const table = shelf.tableStage;

  /* ---------- Flaschen (eine pro Sorte) ---------- */
  await setProgress(0.55, 'Flaschen werden aufgestellt …');
  const ents = []; // je Produkt: { i, p, kind, stage, bottle, dim:[], anchor, slot?, proxy }
  const specFor = (p, variantId = 'standard') => {
    const e = LAB.get(`${p.sorte}|${variantId}`) || LAB.get(`${p.sorte}|standard`);
    if (e) return { type: e.flaschentyp, color: e.fluessigkeit, aspect: e.seitenverhaeltnis, grundfarbe: e.grundfarbe, url: labelUrl(e.ausgabe), key: e.ausgabe };
    const ph = PLATZHALTER[p.sorte]; // Platzhalter-Etikett (Sambuca, Limoncello)
    return { type: ph.typ, color: PLATZHALTER_FLUESSIG[p.sorte] || '#f2f6f4', aspect: 1024 / 669, grundfarbe: ph.farbe, placeholder: true, key: `ph-${p.sorte}` };
  };
  const phTex = new Map();
  const slots = shelfSlots(regalProdukte.length);
  PRODUKTE.forEach((p, i) => {
    const sp = specFor(p), dim = [];
    let tex = null;
    if (sp.placeholder) { const pl = phTex.get(sp.key) || TX.placeholderLabel(PLATZHALTER[p.sorte].titel, PLATZHALTER[p.sorte].abv, PLATZHALTER[p.sorte].farbe); phTex.set(sp.key, pl); tex = pl.tex; }
    const b = makeBottle(sp.type, { liquid: { color: sp.color, alpha: liquidAlpha(sp.color) }, label: { aspect: sp.aspect, grundfarbe: sp.grundfarbe, tex }, dim, mobile, rim: p.ort === 'fass' });
    b.homeYaw = 0; b.labelKey = sp.placeholder ? sp.key : null; b.spec = sp;
    const R = TYPES[sp.type].R, H = b.mouthY;
    const proxy = new THREE.Mesh(new THREE.CylinderGeometry(R + 0.035, R + 0.035, H * 1.02, 10), new THREE.MeshBasicMaterial()); proxy.visible = false; proxy.position.y = H / 2; proxy.userData.idx = i; b.root.add(proxy);
    const ent = { i, p, kind: p.ort, bottle: b, dim, proxy };
    if (p.ort === 'fass') {
      const S = stages[i]; ent.stage = S;
      addCoaster(S, R, cellar.mats.plankDarkMat);
      b.root.position.copy(S.bottleHome); S.root.add(b.root); S.bottle = b; S.dimB = dim;
      S.glass = buildGlass(p.glas, p, { baseY: S.glassY, mobile, dim: S.dim }); S.glassAnchor.add(S.glass.group);
      S.anchor = V(S.pose.pos.x, 2.25, S.pose.pos.z);
      S.dim.push((f) => dim.forEach((fn) => fn(f)));
    } else {
      const slot = slots[i - fassProdukte.length]; ent.slot = slot;
      b.root.position.set(slot.x, slot.y, slot.z); b.root.rotation.y = slot.yaw; shelf.group.add(b.root);
      ent.anchor = V(slot.x, slot.y + H + 0.16, slot.z);
      const sh = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.34), shelf.blobMat); sh.rotation.x = -Math.PI / 2; sh.position.set(slot.x, slot.y + 0.004, slot.z); shelf.group.add(sh);
    }
    b.updateClip();
    ents.push(ent);
  });
  const pickList = [...stages.flatMap((S) => S.pick), ...ents.map((e) => e.proxy)];

  // Schlüssellicht bei Auswahl (Fokus auf das Glas) und Randlicht
  const key = new THREE.SpotLight(0xffe2b8, 0, 9, 0.34, 0.9, 1.4);
  const rimL = new THREE.PointLight(0x9fe6bc, 0, 4, 2);
  scene.add(key, key.target, rimL);

  /* ---------- Etiketten nur bei Bedarf laden ---------- */
  const texLoader = new THREE.TextureLoader();
  const texCache = new Map(), pending = new Set();
  const maxAniso = Math.min(renderer.capabilities.getMaxAnisotropy(), mobile ? 4 : 8);
  function loadLabel(key, url, cb) {
    if (texCache.has(key)) { cb(texCache.get(key)); return; }
    if (pending.has(key)) return;
    pending.add(key);
    texLoader.load(url, (t) => {
      t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = maxAniso; texCache.set(key, t); pending.delete(key); cb(t);
    }, undefined, () => { pending.delete(key); console.warn('Etikett konnte nicht geladen werden:', url); });
  }
  function ensureLabel(ent, variantId = 'standard') {
    const sp = specFor(ent.p, variantId);
    if (sp.placeholder) return;
    const b = ent.bottle;
    if (b.labelKey === sp.key) return;
    loadLabel(sp.key, sp.url, (t) => { b.setLabelTexture(t); b.labelKey = sp.key; });
  }
  let labelsLoaded = 0;
  const countLabels = () => ents.filter((e) => e.bottle.labelKey).length;
  function updateLabelLoading(force) {
    if (pending.size >= (mobile ? 2 : 4)) return;
    const cam = camera.position, wp = V(0, 0, 0);
    const cand = [];
    for (const e of ents) {
      if (e.bottle.labelKey) continue;
      e.bottle.root.getWorldPosition(wp);
      const d = wp.distanceTo(cam);
      const lim = e.kind === 'regal' ? (cam.z < -7 || state.sel === e.i || state.index === e.i ? 30 : 0) : 15;
      if (force || d < lim) cand.push([d, e]);
    }
    cand.sort((a, b) => a[0] - b[0]);
    for (const [, e] of cand.slice(0, (mobile ? 2 : 4) - pending.size)) ensureLabel(e);
  }

  await setProgress(0.72, 'Letzte Handgriffe …');
  // Schatten einmalig „backen“ (Szene ist statisch)
  if (!mobile && tier.shadows) { cellar.sun.castShadow = true; renderer.shadowMap.needsUpdate = true; }

  /* ---------- Nachbearbeitung ---------- */
  let post = null;
  const ensurePost = () => { if (!post) { post = createPost(renderer, scene, camera); post.setSize(innerWidth, innerHeight, dpr); } };
  function applyTier(t, { first = false } = {}) {
    const prevPost = tier.post; tier = t;
    cellar.setTier(t);
    if (t.post) ensurePost();
    post?.setTier(t);
    const tmap = t.post ? THREE.NoToneMapping : THREE.ACESFilmicToneMapping;
    if (renderer.toneMapping !== tmap) { renderer.toneMapping = tmap; scene.traverse((o) => { if (o.material) [].concat(o.material).forEach((m) => { m.needsUpdate = true; }); }); }
    setGlassMode(t.trans ? 'trans' : 'opac'); setPlateMode(t.trans);
    if (!mobile) { cellar.sun.castShadow = !!t.shadows; if (t.shadows) renderer.shadowMap.needsUpdate = true; }
    document.body.classList.toggle('post-on', !!t.post);
    document.body.dataset.tier = t.name;
    if (!first && prevPost !== t.post) resize();
  }
  const adaptive = createAdaptive({
    tier, fixed: start.fixed, mobile,
    onTier: (t) => applyTier(t),
    onDpr: (d) => { dpr = d; renderer.setPixelRatio(d); renderer.setSize(innerWidth, innerHeight, false); post?.setSize(innerWidth, innerHeight, d); },
  });
  try { applyTier(tier, { first: true }); } catch (e) { console.warn('Nachbearbeitung nicht verfügbar, wechsle auf niedrige Stufe:', e); post = null; tier = mobile ? TIERS.mobile : TIERS.low; applyTier(tier, { first: true }); }
  if (renderer.extensions.has('KHR_parallel_shader_compile')) { try { await renderer.compileAsync(scene, camera); } catch { /* erstes Frame kompiliert notfalls */ } }

  /* ---------- UI ---------- */
  const live = $('#live');
  const announce = (t) => { live.textContent = ''; setTimeout(() => (live.textContent = t), 50); };
  const state = { mode: 'intro', index: -1, sel: -1, phase: 'pour' };
  const nav = createNav(PRODUKTE, { onDock: (i, fromTag) => (state.mode === 'select' || fromTag ? select(i) : goBrowse(i)) });
  const panelUI = createPanel(PRODUKTE, {
    onBack: () => back(), onReplay: () => replay(),
    onPrev: () => select((state.sel + PRODUKTE.length - 1) % PRODUKTE.length), onNext: () => select((state.sel + 1) % PRODUKTE.length),
    onVariant: (p, v) => { const ent = ents[state.sel]; if (ent && ent.p === p) ensureLabel(ent, v.id); },
  });
  panelUI.setOpen(false);

  /* ---------- Kamera, Stimmung ---------- */
  const aspect = () => innerWidth / innerHeight;
  const portrait = () => aspect() < 1;
  const overviewOK = () => aspect() >= 1.05;
  const minIndex = () => (overviewOK() ? -1 : 0);
  const stageOf = (i) => (PRODUKTE[i].ort === 'fass' ? stages[i] : table);
  const viewOverview = () => ({ px: 0, py: 1.75, pz: 7.6, tx: 0, ty: 1.4, tz: -9, fov: clamp(58 + (1.6 - aspect()) * 8, 54, 70), amp: 0.4 });
  function viewFocus(i) {
    const e = ents[i], port = portrait();
    if (e.kind === 'fass') {
      const { pos, n, t } = e.stage.pose, d = port ? 5.4 : 4.7;
      const tg = pos.clone().add(V(0, 1.75, 0)).addScaledVector(t, 0.3), cp = tg.clone().addScaledVector(n, d).add(V(0, 0.3, 0));
      return { px: cp.x, py: cp.y, pz: cp.z, tx: tg.x, ty: tg.y, tz: tg.z, fov: port ? 54 : 46, amp: 0.3 };
    }
    const s = e.slot, H = e.bottle.mouthY, tg = V(s.x, s.y + H * 0.5 + 0.1, s.z), d = port ? 4.8 : 4.5, cp = V(s.x * 0.45, s.y + H * 0.55 + 0.45, s.z + d);
    return { px: cp.x, py: cp.y, pz: cp.z, tx: tg.x, ty: tg.y, tz: tg.z, fov: port ? 56 : 46, amp: 0.2 };
  }
  function viewSelect(i, phase) {
    const S = stageOf(i), { pos, n, t } = S.pose, gh = S.glass ? S.glass.H : 0.3;
    const port = portrait(), fov = phase === 'pour' && port ? 44 : 36;
    const d = phase === 'pour' ? (port ? 3.6 : 2.5) : 1.12 + gh * 1.6 + (port ? 0.4 : 0);
    const halfH = Math.tan((fov * Math.PI) / 360) * d, halfW = halfH * aspect();
    const c = pos.clone().add(V(0, S.glassY + gh * 0.5, 0));
    if (port) { c.addScaledVector(t, phase === 'pour' ? 0.28 : 0); c.y -= halfH * 0.3; } else c.addScaledVector(t, halfW * (phase === 'pour' ? 0.2 : 0.19));
    const cp = c.clone().addScaledVector(n, d).add(V(0, d * 0.13, 0));
    return { px: cp.x, py: cp.y, pz: cp.z, tx: c.x, ty: c.y, tz: c.z, fov, amp: 0.05 };
  }
  const currentView = () => (state.mode === 'select' ? viewSelect(state.sel, state.phase) : state.index < 0 ? viewOverview() : viewFocus(state.index));
  const camState = { px: 0, py: 1.7, pz: 12.2, tx: 0, ty: 1.45, tz: -10, fov: 58, amp: 0.05 };
  function flyTo(v, dur, ease = 'power3.inOut') {
    gsap.killTweensOf(camState);
    if (reduced()) return gsap.to(camState, { ...v, duration: 0.05 });
    return gsap.to(camState, { ...v, duration: dur, ease });
  }

  const mood = { lantern: 1, ambient: 1, exposure: 1, warm: 0, key: 0, rim: 0, other: 1 };
  const MOODS = { browse: { lantern: 1, ambient: 1, exposure: 1, warm: 0, key: 0, rim: 0, other: 0.72 }, overview: { lantern: 1, ambient: 1, exposure: 1, warm: 0, key: 0, rim: 0, other: 1 } };
  let dimKeep = -1;
  const applyDim = () => ents.forEach((e) => {
    const f = dimKeep < 0 || e.i === dimKeep ? 1 : mood.other;
    if (e.kind === 'fass') e.stage.setDim(f); else e.dim.forEach((fn) => fn(f));
  });
  function setMood(m, dur = 1.6) { gsap.killTweensOf(mood); gsap.to(mood, { ...m, duration: reduced() ? 0.05 : dur, ease: 'power2.inOut', onUpdate: applyDim }); }
  applyDim();

  /* ---------- Zustandswechsel ---------- */
  let introDone = false, seqDelay = null, panelDelay = null;
  const resetCalls = new Map();
  const setBody = (k, v) => { document.body.dataset[k] = v; };
  function syncNav() {
    const cur = state.mode === 'select' ? state.sel : state.index;
    nav.btns.forEach((b, i) => { b.setAttribute('aria-pressed', String(i === cur)); b.classList.toggle('on', i === cur); });
    nav.tags.forEach((t, i) => t.classList.toggle('is-focus', state.mode === 'browse' && i === state.index));
    const on = nav.btns[cur]; if (on && introDone) { const box = nav.dockList; const l = on.parentElement.offsetLeft - box.clientWidth / 2 + on.offsetWidth / 2; box.scrollTo?.({ left: l, behavior: reduced() ? 'auto' : 'smooth' }); }
  }

  /** Regalflasche zum Probiertisch holen bzw. zurückbringen. */
  function fetchShelf(ent) {
    const b = ent.bottle, S = table; S.product = ent.p;
    gsap.killTweensOf([b.root.position, b.root.rotation]);
    S.root.attach(b.root);
    S.bottle = b; b.homeYaw = 0;
    S.glass = buildGlass(ent.p.glas, ent.p, { baseY: S.glassY, mobile, dim: S.dim });
    S.glassAnchor.add(S.glass.group);
    ent.tableGlassBuilt = true;
    const from = b.root.position.clone(), to = S.bottleHome, mid = V((from.x + to.x) / 2, Math.max(from.y, to.y) + 0.45, (from.z + to.z) / 2);
    const tl = gsap.timeline();
    const o = { t: 0 };
    tl.to(o, { t: 1, duration: reduced() ? 0.05 : 1.7, ease: 'power2.inOut', onUpdate() { const k = o.t, a = 1 - k; b.root.position.set(a * a * from.x + 2 * a * k * mid.x + k * k * to.x, a * a * from.y + 2 * a * k * mid.y + k * k * to.y, a * a * from.z + 2 * a * k * mid.z + k * k * to.z); b.updateClip(); } }, 0);
    tl.to(b.root.rotation, { y: 0, duration: reduced() ? 0.05 : 1.7, ease: 'power2.inOut' }, 0);
    return tl;
  }
  function returnShelf(ent) {
    const b = ent.bottle, S = table;
    resetStage(S);
    if (S.glass) { S.glassAnchor.remove(S.glass.group); disposeChildren(S.glass.deco); S.glass = null; S.dim.length = 0; }
    const s = ent.slot;
    shelf.group.attach(b.root);
    S.bottle = null;
    const from = b.root.position.clone(), to = V(s.x, s.y, s.z), mid = V((from.x + to.x) / 2, Math.max(from.y, to.y) + 0.45, (from.z + to.z) / 2);
    const o = { t: 0 };
    gsap.to(o, { t: 1, duration: reduced() ? 0.05 : 1.5, ease: 'power2.inOut', onUpdate() { const k = o.t, a = 1 - k; b.root.position.set(a * a * from.x + 2 * a * k * mid.x + k * k * to.x, a * a * from.y + 2 * a * k * mid.y + k * k * to.y, a * a * from.z + 2 * a * k * mid.z + k * k * to.z); b.updateClip(); } });
    gsap.to(b.root.rotation, { y: s.yaw, duration: reduced() ? 0.05 : 1.5, ease: 'power2.inOut' });
  }
  const scheduleReset = (i, delay) => {
    resetCalls.get(i)?.kill();
    resetCalls.set(i, gsap.delayedCall(reduced() ? 0 : delay, () => {
      resetCalls.delete(i);
      const e = ents[i];
      if (e.kind === 'fass') resetStage(e.stage); else returnShelf(e);
      if (e.bottle.spec) e.bottle.setLiquid(e.bottle.spec.color, liquidAlpha(e.bottle.spec.color));
    }));
  };

  function goBrowse(i) {
    if (!introDone) return;
    i = clamp(i, minIndex(), PRODUKTE.length - 1);
    seqDelay?.kill(); panelDelay?.kill();
    if (state.mode === 'select') { stageOf(state.sel).seq?.kill(); scheduleReset(state.sel, 1.1); }
    state.mode = 'browse'; state.index = i; state.sel = -1;
    setBody('mode', 'browse'); setBody('focus', String(i)); setBody('seq', 'idle');
    panelUI.setOpen(false);
    dimKeep = i;
    setMood(i < 0 ? MOODS.overview : MOODS.browse);
    if (i < 0) dimKeep = -1;
    flyTo(currentView(), 1.9);
    syncNav();
    if (i >= 0) { ensureLabel(ents[i]); announce(`${PRODUKTE[i].name}, ${PRODUKTE[i].abv} Prozent`); }
    updateLabelLoading(false);
  }

  function startSequence(i) {
    const S = stageOf(i), ent = ents[i];
    state.phase = 'pour';
    setBody('seq', 'running'); $('#p-replay').disabled = true;
    seqDelay?.kill();
    const wait = ent.kind === 'regal' ? 0 : 0;
    seqDelay = gsap.delayedCall(reduced() ? 0.05 : 0.9 + wait, () => {
      S.seq = buildSequence(S, {
        mobile,
        onFirstPourDone: () => { state.phase = 'deko'; flyTo(viewSelect(i, 'deko'), 2.2, 'power2.inOut'); },
        onComplete: () => { state.phase = 'deko'; setBody('seq', 'done'); $('#p-replay').disabled = false; announce(`${PRODUKTE[i].name} eingeschenkt.`); },
      });
      if (reduced()) S.seq.timeScale(6);
      S.seq.play();
    });
  }

  function select(i) {
    if (!introDone || i < 0 || i >= PRODUKTE.length) return;
    if (state.mode === 'select' && state.sel === i) return;
    seqDelay?.kill(); panelDelay?.kill();
    if (state.mode === 'select') { stageOf(state.sel).seq?.kill(); scheduleReset(state.sel, 0.5); }
    resetCalls.get(i)?.kill(); resetCalls.delete(i);
    const ent = ents[i], P = PRODUKTE[i];
    if (ent.kind === 'fass') resetStage(ent.stage);
    state.mode = 'select'; state.sel = i; state.index = i;
    setBody('mode', 'select'); setBody('focus', String(i));
    panelUI.render(i); syncNav(); ensureLabel(ent);
    dimKeep = i;
    const S = P.stimmung;
    setMood({ lantern: S.lantern, ambient: S.lantern < 0.5 ? 0.45 : 0.7, exposure: S.exposure, warm: S.warm, key: 1, rim: 1, other: S.andere }, 1.8);
    let fetchTl = null;
    if (ent.kind === 'regal') { // Flasche zum Probiertisch holen, Glas dort aufstellen
      flyTo(viewFocus(i), 1.1, 'power2.inOut');
      gsap.delayedCall(reduced() ? 0 : 0.7, () => { if (state.sel !== i) return; fetchTl = fetchShelf(ent); state.phase = 'pour'; flyTo(viewSelect(i, 'pour'), 2.0); });
    }
    const St = stageOf(i);
    if (ent.kind === 'fass') flyTo(viewSelect(i, 'pour'), 2.1);
    // Schlüssellicht auf das Glas richten
    const place = () => {
      const s2 = stageOf(i), { pos, n, t } = s2.pose, c = pos.clone().add(V(0, s2.glassY + (s2.glass ? s2.glass.H : 0.3) * 0.5, 0));
      key.position.copy(c).addScaledVector(n, 1.7).addScaledVector(t, -0.5).add(V(0, 1.6, 0)); key.target.position.copy(c);
      rimL.position.copy(c).addScaledVector(n, -0.55).addScaledVector(t, 0.2).add(V(0, 0.25, 0));
    };
    place();
    panelDelay = gsap.delayedCall(reduced() ? 0 : 1.5, () => panelUI.setOpen(true));
    if (ent.kind === 'regal') {
      seqDelay = gsap.delayedCall(reduced() ? 0.1 : 0.7 + 1.9 + 0.3, () => { place(); startSequence(i); });
    } else startSequence(i);
    announce(`${P.name} ausgewählt. Es wird eingeschenkt.`);
  }

  function back() {
    if (state.mode !== 'select') return;
    const i = state.sel;
    goBrowse(overviewOK() ? -1 : i);
    setTimeout(() => nav.btns[i]?.focus({ preventScroll: true }), 50);
  }
  function replay() {
    if (state.mode !== 'select') return;
    const i = state.sel, S = stageOf(i);
    seqDelay?.kill(); S.seq?.kill();
    const ent = ents[i];
    if (ent.kind === 'fass') resetStage(S); else { S.seq = null; S.stream?.hide(); S.glass?.reset(); S.bottle.root.position.copy(S.bottleHome); S.bottle.root.rotation.set(0, 0, 0); S.bottle.restoreCork(); S.bottle.setFill(1); if (S.tonic) { S.root.remove(S.tonic.root); S.tonic = null; } }
    flyTo(viewSelect(i, 'pour'), 1.4);
    startSequence(i);
    announce('Noch einmal einschenken.');
  }

  $('#nav-prev').addEventListener('click', () => goBrowse(state.index - 1));
  $('#nav-next').addEventListener('click', () => goBrowse(state.index + 1));
  $('#nav-all').addEventListener('click', () => goBrowse(minIndex()));

  /* ---------- Eingaben ---------- */
  const ptr = { x: 0, y: 0, cx: 0, cy: 0, moved: false, down: null, hover: -1 };
  const raycaster = new THREE.Raycaster(), ndc = new THREE.Vector2();
  function pickAt(cx, cy) {
    ndc.set((cx / innerWidth) * 2 - 1, -(cy / innerHeight) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    const hit = raycaster.intersectObjects(pickList, false)[0];
    return hit ? (hit.object.userData.idx ?? hit.object.userData.stage ?? -1) : -1;
  }
  canvas.addEventListener('pointermove', (e) => { ptr.x = (e.clientX / innerWidth) * 2 - 1; ptr.y = (e.clientY / innerHeight) * 2 - 1; ptr.cx = e.clientX; ptr.cy = e.clientY; ptr.moved = true; });
  canvas.addEventListener('pointerdown', (e) => { ptr.down = { x: e.clientX, y: e.clientY, touch: e.pointerType === 'touch' }; });
  canvas.addEventListener('pointerup', (e) => {
    const d = ptr.down; ptr.down = null;
    if (!d) return;
    if (!introDone) { skipIntro(); return; }
    const dx = e.clientX - d.x, dy = e.clientY - d.y;
    if (d.touch && Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.3 && state.mode === 'browse') { goBrowse(state.index + (dx < 0 ? 1 : -1)); return; }
    if (Math.hypot(dx, dy) < 9 && state.mode === 'browse') { const i = pickAt(e.clientX, e.clientY); if (i >= 0) select(i); }
  });
  canvas.addEventListener('pointerleave', () => { ptr.x = ptr.y = 0; ptr.hover = -1; });
  let wheelAcc = 0, wheelLock = 0;
  addEventListener('wheel', (e) => {
    if (state.mode !== 'browse') return;
    const now = performance.now(); if (now < wheelLock) return;
    wheelAcc += e.deltaY;
    if (Math.abs(wheelAcc) > 40) { goBrowse(state.index + Math.sign(wheelAcc)); wheelAcc = 0; wheelLock = now + 700; }
  }, { passive: true });
  addEventListener('keydown', (e) => {
    if (!introDone) { if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') skipIntro(); return; }
    if (e.key === 'Escape') { if (state.mode === 'select') { e.preventDefault(); back(); } return; }
    const tgt = e.target, inControl = tgt && (tgt.tagName === 'BUTTON' || tgt.tagName === 'A' || tgt.tagName === 'INPUT');
    if (tgt && tgt.closest && tgt.closest('[role="radiogroup"]')) return; // Pfeiltasten gehören der Auswahl
    const fwd = ['ArrowRight', 'ArrowDown', 'PageDown'].includes(e.key), bwd = ['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key);
    if (fwd || bwd) {
      e.preventDefault();
      const d = fwd ? 1 : -1;
      if (state.mode === 'browse') goBrowse(state.index + d);
      else if (state.mode === 'select') select((state.sel + d + PRODUKTE.length) % PRODUKTE.length);
    } else if (e.key === 'Home' && state.mode === 'browse') goBrowse(minIndex());
    else if (e.key === 'End' && state.mode === 'browse') goBrowse(PRODUKTE.length - 1);
    else if ((e.key === 'Enter' || e.key === ' ') && !inControl && state.mode === 'browse' && state.index >= 0) { e.preventDefault(); select(state.index); }
  });
  function resize() {
    renderer.setSize(innerWidth, innerHeight, false);
    post?.setSize(innerWidth, innerHeight, dpr);
    camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
    if (introDone) { if (state.mode === 'browse' && state.index < minIndex()) state.index = minIndex(); gsap.killTweensOf(camState); Object.assign(camState, currentView()); }
  }
  addEventListener('resize', resize);

  /* ---------- Intro: gemächliche Fahrt durch den Gang ---------- */
  let introTl = null;
  function finishIntro() {
    introDone = true;
    state.mode = 'browse'; state.index = minIndex();
    setBody('mode', 'browse'); setBody('focus', String(state.index)); setBody('seq', 'idle');
    dimKeep = state.index < 0 ? -1 : state.index;
    setMood(state.index < 0 ? MOODS.overview : MOODS.browse, 0.8);
    syncNav();
    if (state.index >= 0) flyTo(currentView(), 1.4);
    $('#loader')?.remove();
    announce('Der Keller ist geöffnet. Mit Pfeiltasten oder Scrollen zwischen den Fässern und Flaschen wechseln, Enter zum Einschenken.');
  }
  function skipIntro() { if (introTl) introTl.progress(1); }
  const beginIntro = () => {
    setBody('mode', 'intro');
    Object.assign(camState, { px: 0, py: 1.7, pz: 12.4, tx: 0, ty: 1.5, tz: -10, fov: 58, amp: 0.05 });
    $('#loader').classList.add('ready'); $('#loader-msg').textContent = 'Keller geöffnet'; $('#loader-bar').style.transform = 'scaleX(1)'; $('#loader-pct').textContent = '100 %';
    const fast = params.get('nointro') === '1';
    const target = !mobile || overviewOK() ? viewOverview() : viewFocus(0);
    introTl = gsap.timeline({ onComplete: finishIntro });
    if (reduced() || fast) { Object.assign(camState, target); introTl.to({}, { duration: 0.4 }); if (fast) $('#loader').classList.add('gone'); }
    else {
      introTl.to('#loader', { opacity: 0, duration: 1.4, delay: 0.8, ease: 'power1.inOut' }, 0)
        .to(camState, { ...target, duration: 8, ease: 'power1.inOut' }, 0.4);
      introTl.add(() => $('#loader')?.classList.add('gone'), 2.4);
    }
  };

  /* ---------- Render-Schleife ---------- */
  const clock = new THREE.Clock();
  let t = 0, bobT = 0;
  const cur = { x: 0, y: 0 };
  const tmp = V(0, 0, 0), fwdV = V(0, 0, 0), rightV = V(0, 0, 0), lookAt = V(0, 0, 0);
  const proj = V(0, 0, 0);

  function updateTags() {
    const w = innerWidth, h = innerHeight, show = state.mode === 'browse' && introDone;
    for (let i = 0; i < PRODUKTE.length; i++) {
      const el = nav.tags[i], e = ents[i];
      const anchor = e.kind === 'fass' ? e.stage.anchor : e.anchor;
      proj.copy(anchor).project(camera);
      const x = (proj.x * 0.5 + 0.5) * w, y = (-proj.y * 0.5 + 0.5) * h;
      const dist = anchor.distanceTo(camera.position);
      const inView = proj.z < 1 && x > -40 && x < w + 40 && y > 0 && y < h + 60;
      const focus = state.index === i;
      let vis;
      if (!show || !inView) vis = false;
      else if (state.index < 0) vis = ptr.hover === i; // Überblick: Schild nur beim Darüberfahren
      else vis = focus || (Math.abs(state.index - i) <= (mobile ? 0 : 1) && dist < 9);
      el.style.opacity = vis ? (focus || state.index < 0 ? '1' : '0.55') : '0';
      el.style.pointerEvents = vis ? 'auto' : 'none'; el.tabIndex = vis ? 0 : -1;
      const hw = (el.offsetWidth || 160) / 2 + 8, cx = clamp(x, hw, w - hw);
      el.style.transform = `translate3d(${cx.toFixed(1)}px,${y.toFixed(1)}px,0) translate(-50%,-100%)`;
      el.style.zIndex = focus ? 30 : Math.round(20 - dist);
      el.classList.toggle('is-hover', ptr.hover === i);
    }
  }

  let lastLabelCheck = 0, torchScale = 1;
  const sceneFocus = V(0, 0, 0), fuv = new THREE.Vector3(), bw = new THREE.Vector3(), bUv = new THREE.Vector2();
  renderer.setAnimationLoop(() => {
    const dt = Math.min(clock.getDelta(), start.fixed ? 0.25 : 0.05);
    t += dt;

    // Parallax (Maus/Touch) und Kopf-Bob während der Fahrt
    const k = Math.min(1, dt * 3);
    cur.x += ((reduced() ? 0 : ptr.x) - cur.x) * k; cur.y += ((reduced() ? 0 : ptr.y) - cur.y) * k;
    camera.fov = camState.fov;
    camera.position.set(camState.px, camState.py, camState.pz);
    lookAt.set(camState.tx, camState.ty, camState.tz);
    fwdV.copy(lookAt).sub(camera.position).normalize();
    rightV.crossVectors(fwdV, camera.up).normalize();
    const walking = !introDone && !reduced() ? 1 : 0;
    if (walking) bobT += dt;
    const bobY = walking * Math.sin(bobT * 3.4) * 0.016, bobX = walking * Math.sin(bobT * 1.7) * 0.014;
    const amp = camState.amp, breath = reduced() ? 0 : Math.sin(t * 0.5) * 0.015;
    camera.position.addScaledVector(rightV, cur.x * amp + bobX).addScaledVector(camera.up, -cur.y * amp * 0.5 + breath + bobY);
    camera.lookAt(lookAt);
    if (walking) camera.rotateZ(Math.sin(bobT * 1.7) * 0.004);
    camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();

    // Licht
    cellar.update(t, dt, mood, reduced());
    shelf.update(t, reduced());
    cellar.amb.intensity = 0.5 * mood.ambient;
    cellar.sun.intensity = 1.5 * (0.35 + 0.65 * mood.ambient) * (0.5 + 0.5 * mood.lantern) * (1 - 0.4 * mood.key);
    torch.intensity = torchScale * 7 * (0.6 + 0.4 * mood.ambient) * (1 - 0.65 * mood.key);
    key.intensity = 13 * mood.key * (reduced() ? 1 : 1 + 0.03 * Math.sin(t * 7));
    rimL.intensity = 1.4 * mood.rim;

    // aktive Bühne
    if (state.sel >= 0) {
      const S = stageOf(state.sel);
      S.glass?.update(dt, t);
      S.bottle?.updateClip(); S.tonic?.updateClip();
    }

    // Hover (nur Maus)
    if (ptr.moved && introDone && state.mode === 'browse' && !mobile) {
      ptr.moved = false; ptr.hover = pickAt(ptr.cx, ptr.cy); canvas.style.cursor = ptr.hover >= 0 ? 'pointer' : 'default';
    } else if (state.mode !== 'browse') { ptr.hover = -1; canvas.style.cursor = 'default'; }

    updateTags();
    if (t - lastLabelCheck > 0.4) { lastLabelCheck = t; updateLabelLoading(false); labelsLoaded = countLabels(); }

    if (post && tier.post) {
      let focusDist = camera.position.distanceTo(sceneFocus.set(camState.tx, camState.ty, camState.tz));
      if (state.index < 0 && state.mode !== 'select') focusDist = Math.min(focusDist, 8.5); // Überblick/Fahrt: Gang bleibt insgesamt scharf
      const sel = state.mode === 'select';
      fuv.copy(sceneFocus).project(camera); fuv.set(fuv.x * 0.5 + 0.5, fuv.y * 0.5 + 0.5);
      let buv = null;
      if (sel && state.sel >= 0 && stageOf(state.sel).bottle) { const b = stageOf(state.sel).bottle; b.root.getWorldPosition(bw); bw.y += b.mouthY * 0.45; bw.project(camera); buv = bUv.set(bw.x * 0.5 + 0.5, bw.y * 0.5 + 0.5); }
      post.setFocus(focusDist, sel ? 2.0 : introDone ? (state.index < 0 ? 0.16 : 0.55) : 0.14, fuv, sel ? 0.13 : 0.3, sel ? 0.34 : 0.75, buv);
      post.render(dt, t, renderer.toneMappingExposure = mood.exposure);
    } else {
      renderer.toneMappingExposure = mood.exposure;
      renderer.render(scene, camera);
    }
    adaptive.tick(dt);
  });

  root.classList.add('gl-ok');
  setBody('mode', 'intro');
  await setProgress(1, 'Keller geöffnet');
  beginIntro();
  updateLabelLoading(false);

  // Test-/Debug-Zugriff
  window.__hb = {
    select, back, goBrowse, state, ents, stages, table, camera, renderer, scene, skipIntro, replay, camState, viewSelect, cellar, get dpr() { return dpr; }, get tier() { return tier; },
    get introTl() { return introTl; }, setTier: (n) => applyTier(TIERS[n]), labelsReady: () => ents.every((e) => e.bottle.labelKey), labelCount: () => countLabels(), loadAllLabels: () => updateLabelLoading(true),
    ensureLabel, panelUI, post: () => post, mood, applyDim,
    /** Nahaufnahme einer Flasche (Prüfung von Etikett/Verzerrung). */
    closeup(i, dist = 0.7) {
      const e = ents[i], wp = V(0, 0, 0); e.bottle.root.getWorldPosition(wp);
      const n = e.kind === 'fass' ? e.stage.pose.n : V(0, 0, 1), T = e.bottle.T, ly = (T.label.y0 + T.label.h / 2) * T.k;
      gsap.killTweensOf(camState); torchScale = 0.25;
      Object.assign(camState, { px: wp.x + n.x * dist, py: wp.y + ly + 0.02, pz: wp.z + n.z * dist, tx: wp.x, ty: wp.y + ly, tz: wp.z, fov: 30, amp: 0 });
    },
  };
}
