// Hierber Brennerei – Startseite: Bootstrap, Kamera, Zustände, Eingaben, UI.
import * as THREE from 'three';
import { PRODUKTE, KONTAKT } from '../data/produkte.js';
import * as TX from './textures.js';
import { LAYOUT, GLASS_Y, makeEnvMap, buildCellar, buildBarrel, barrelPose } from './cellar.js';
import { setEnv, buildGlass, buildBottle } from './glassware.js';
import { buildSequence, resetBarrel } from './sequences.js';

const gsap = window.gsap;
window.__hbStarted = true;

const $ = (s, r = document) => r.querySelector(s);
const root = document.documentElement;
const params = new URLSearchParams(location.search);
const euro = (n) => `${n} €`;
const reducedQuery = matchMedia('(prefers-reduced-motion: reduce)');
const reduced = () => reducedQuery.matches;
const mobile = matchMedia('(pointer: coarse)').matches || Math.min(innerWidth, innerHeight) < 600;
const frame = () => new Promise((r) => requestAnimationFrame(() => r()));
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/* ---------- Fallback (ohne WebGL) und statische UI aus den Daten ---------- */
function renderFallback(reason) {
  const list = $('#fallback-list');
  list.innerHTML = PRODUKTE.map((p) => `
    <li><h3>${p.name} <span>${p.abv} % vol.</span></h3><p>${p.beschreibung}</p>
    <ul class="fb-prices">${p.preise.map((x) => `<li><span>${x.menge}</span><b>${euro(x.preis)}</b></li>`).join('')}</ul></li>`).join('');
  $('#fallback-reason').textContent = reason;
  root.classList.add('gl-fail');
}
function fillFooter() {
  const k = KONTAKT;
  $('#foot-text').innerHTML = `${k.firma} · ${k.adresse} · <a href="mailto:${k.mail}">${k.mail}</a> · <a href="https://${k.web}">${k.web}</a>`;
  $('#foot-note').textContent = k.hinweis;
  const fb = $('#fallback-contact');
  fb.innerHTML = `${k.firma}, ${k.adresse}<br><a href="mailto:${k.mail}">${k.mail}</a> · <a href="https://${k.web}">${k.web}</a><br><small>${k.hinweis}</small>`;
}
fillFooter();

function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch { return false; }
}

if (!webglAvailable()) {
  renderFallback('Die 3D-Ansicht benötigt WebGL, das in diesem Browser nicht verfügbar ist. Hier unsere Produktliste:');
} else {
  init().catch((e) => {
    console.error(e);
    renderFallback('Die 3D-Ansicht konnte nicht gestartet werden. Hier unsere Produktliste:');
  });
}

/* ---------- Hauptprogramm ---------- */
async function init() {
  const setProgress = async (p, msg) => {
    $('#loader-bar').style.transform = `scaleX(${p})`;
    $('#loader-pct').textContent = `${Math.round(p * 100)} %`;
    if (msg) $('#loader-msg').textContent = msg;
    await frame();
  };
  await setProgress(0.05, 'Schriften werden geladen …');
  try {
    await Promise.all([
      document.fonts.load('600 40px "Cormorant Garamond"'), document.fonts.load('italic 400 40px "Cormorant Garamond"'),
      document.fonts.load('400 16px Inter'),
    ]);
  } catch { /* Fallback-Schrift genügt */ }

  /* Renderer */
  const canvas = $('#gl');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, powerPreference: 'high-performance' });
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.localClippingEnabled = true;
  const maxDpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
  let dpr = maxDpr;
  renderer.setPixelRatio(dpr);
  renderer.setSize(innerWidth, innerHeight, false);
  if (!mobile) { renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap; }

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b0704);
  scene.fog = new THREE.FogExp2(0x0d0805, mobile ? 0.05 : 0.042);
  const camera = new THREE.PerspectiveCamera(48, innerWidth / innerHeight, 0.05, 80);

  await setProgress(0.15, 'Licht wird entzündet …');
  const env = makeEnvMap(renderer);
  setEnv(env);

  await setProgress(0.3, 'Gewölbe wird gemauert …');
  const cellar = buildCellar(scene, { mobile, env });

  await setProgress(0.5, 'Fässer werden gerollt …');
  const woodTex = TX.woodStaveMap(), headTex = TX.woodHeadMap();
  const barrels = [];
  for (let i = 0; i < PRODUKTE.length; i++) {
    const p = PRODUKTE[i];
    const B = buildBarrel(i, p, { env, woodTex, headTex, mobile, index: i });
    B.glassY = GLASS_Y;
    B.glass = buildGlass(p.glas, p, { baseY: GLASS_Y, mobile, dim: B.dim });
    B.glassAnchor.add(B.glass.group);
    B.bottle = buildBottle(p.flasche.form, p, { glassColor: p.flasche.glas, liquidColor: p.fluessig.farbe, liquidAlpha: Math.max(0.55, p.fluessig.alpha), dim: B.dim, mobile });
    B.bottle.root.position.copy(B.bottleSlot.position);
    B.root.add(B.bottle.root);
    B.glass.hull.userData.barrel = i; B.bottle.hull.userData.barrel = i;
    B.pick.push(B.glass.hull, B.bottle.hull);
    scene.add(B.root);
    barrels.push(B);
    if (i % 2) await setProgress(0.5 + 0.3 * ((i + 1) / PRODUKTE.length));
  }

  // Schlüssellicht bei Auswahl (Fokus auf das Glas) und grünes Randlicht
  const key = new THREE.SpotLight(0xffe2b8, 0, 9, 0.34, 0.9, 1.4);
  key.castShadow = !mobile; key.shadow.mapSize.set(1024, 1024); key.shadow.bias = -0.0005;
  const rimL = new THREE.PointLight(0x9fe6bc, 0, 4, 2);
  scene.add(key, key.target, rimL);

  await setProgress(0.88, 'Letzte Handgriffe …');
  if (renderer.extensions.has('KHR_parallel_shader_compile')) {
    try { await renderer.compileAsync(scene, camera); } catch { /* erstes Frame kompiliert notfalls */ }
  }

  /* ---------- UI aufbauen ---------- */
  const tagsEl = $('#tags'), dockList = $('#dock-list');
  const tags = PRODUKTE.map((p, i) => {
    const b = document.createElement('button');
    b.className = 'tag'; b.type = 'button'; b.dataset.i = i;
    b.setAttribute('aria-label', `${p.name}, ${p.abv} Prozent. Fass auswählen und einschenken.`);
    b.innerHTML = `<span class="tag-head"><span class="tag-name">${p.name}</span><span class="tag-abv">${p.abv} %</span></span>
      <span class="tag-more"><span class="tag-desc">${p.kurz}</span>
      <span class="tag-prices">${p.preise.map((x) => `<span><i>${x.menge}</i><b>${euro(x.preis)}</b></span>`).join('')}</span>
      <span class="tag-cta">Einschenken</span></span>`;
    b.addEventListener('click', () => select(i));
    tagsEl.appendChild(b);
    return b;
  });
  const dockBtns = PRODUKTE.map((p, i) => {
    const li = document.createElement('li');
    const b = document.createElement('button');
    b.type = 'button'; b.textContent = p.kurzname; b.dataset.i = i;
    b.setAttribute('aria-label', `${p.name} – Fass ${i + 1} von ${PRODUKTE.length}`);
    b.addEventListener('click', () => (state.mode === 'select' ? select(i) : goBrowse(i)));
    li.appendChild(b); dockList.appendChild(li);
    return b;
  });

  const panel = $('#panel'), live = $('#live');
  const announce = (t) => { live.textContent = ''; setTimeout(() => (live.textContent = t), 50); };
  function renderPanel(i) {
    const p = PRODUKTE[i];
    $('#p-eyebrow').textContent = `Fass ${i + 1} von ${PRODUKTE.length}`;
    $('#p-name').textContent = p.name;
    $('#p-abv').textContent = `${p.abv} % vol.`;
    $('#p-desc').textContent = p.beschreibung;
    $('#p-prices').innerHTML = p.preise.map((x) => `<div><dt>${x.menge}</dt><dd>${euro(x.preis)}</dd></div>`).join('');
    panel.setAttribute('aria-label', `${p.name} – Details und Preise`);
  }
  const setPanel = (open) => { panel.classList.toggle('open', open); panel.inert = !open; };
  setPanel(false);

  /* ---------- Zustand, Kamera, Stimmung ---------- */
  const state = { mode: 'intro', index: -1, sel: -1, phase: 'pour' };
  const aspect = () => innerWidth / innerHeight;
  const portrait = () => aspect() < 1;
  const overviewOK = () => aspect() >= 1.05;
  const minIndex = () => (overviewOK() ? -1 : 0);

  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  function viewOverview() {
    const d = Math.min(19.5, Math.max(12.8, 19.5 / aspect()));
    return { px: 0, py: 2.5, pz: -7 + d, tx: 0, ty: 1.05, tz: -7, fov: 48, amp: 0.45 };
  }
  function viewFocus(i) {
    const { pos, n, t } = barrelPose(i), d = portrait() ? 6.4 : 5.4;
    const tg = pos.clone().add(V(0, 1.05, 0)).addScaledVector(t, 0.4);
    const cp = tg.clone().addScaledVector(n, d).add(V(0, 0.85, 0));
    return { px: cp.x, py: cp.y, pz: cp.z, tx: tg.x, ty: tg.y, tz: tg.z, fov: portrait() ? 52 : 44, amp: 0.3 };
  }
  function viewSelect(i, phase) {
    const B = barrels[i], { pos, n, t } = B.pose, gh = B.glass.H;
    const port = portrait(), fov = phase === 'pour' && port ? 44 : 36;
    const d = phase === 'pour' ? (port ? 3.6 : 2.5) : 0.9 + gh * 1.6 + (port ? 0.4 : 0);
    const halfH = Math.tan((fov * Math.PI) / 360) * d, halfW = halfH * aspect();
    const c = pos.clone().add(V(0, GLASS_Y + gh * 0.5, 0));
    if (port) {
      c.addScaledVector(t, phase === 'pour' ? 0.28 : 0);
      c.y -= halfH * 0.3;
    } else c.addScaledVector(t, halfW * (phase === 'pour' ? 0.33 : 0.36));
    const cp = c.clone().addScaledVector(n, d).add(V(0, d * 0.13, 0));
    return { px: cp.x, py: cp.y, pz: cp.z, tx: c.x, ty: c.y, tz: c.z, fov, amp: 0.05 };
  }
  const currentView = () => (state.mode === 'select' ? viewSelect(state.sel, state.phase) : state.mode === 'intro' ? viewOverview() : state.index < 0 ? viewOverview() : viewFocus(state.index));

  const camState = { px: 0, py: 1.7, pz: 11, tx: 0, ty: 1.4, tz: -10, fov: 60, amp: 0.1 };
  function flyTo(v, dur, ease = 'power3.inOut') {
    gsap.killTweensOf(camState);
    if (reduced()) return gsap.to(camState, { ...v, duration: 0.05 });
    return gsap.to(camState, { ...v, duration: dur, ease });
  }

  const mood = { lantern: 1, ambient: 1, exposure: 1, warm: 0, key: 0, rim: 0, other: 1 };
  const MOODS = {
    browse: { lantern: 1, ambient: 1, exposure: 1, warm: 0, key: 0, rim: 0, other: 0.7 },
    overview: { lantern: 1, ambient: 1, exposure: 1, warm: 0, key: 0, rim: 0, other: 1 },
  };
  let dimKeep = -1; // Fass, das nicht abgedunkelt wird (-1 = keins)
  const applyDim = () => barrels.forEach((B, i) => B.setDim(dimKeep < 0 || i === dimKeep ? 1 : mood.other));
  function setMood(m, dur = 1.6) {
    gsap.killTweensOf(mood);
    gsap.to(mood, { ...m, duration: reduced() ? 0.05 : dur, ease: 'power2.inOut', onUpdate: applyDim });
  }
  applyDim();

  /* ---------- Zustandswechsel ---------- */
  let introDone = false, seqDelay = null, panelDelay = null;
  const resetCalls = new Map();
  const scheduleReset = (i, delay) => {
    resetCalls.get(i)?.kill();
    resetCalls.set(i, gsap.delayedCall(reduced() ? 0 : delay, () => { resetBarrel(barrels[i]); resetCalls.delete(i); }));
  };
  const setBody = (k, v) => { document.body.dataset[k] = v; };
  const syncNav = () => {
    const cur = state.mode === 'select' ? state.sel : state.index;
    dockBtns.forEach((b, i) => { b.setAttribute('aria-pressed', String(i === cur)); b.classList.toggle('on', i === cur); });
    tags.forEach((t, i) => t.classList.toggle('is-focus', state.mode === 'browse' && i === state.index));
  };

  function goBrowse(i) {
    if (!introDone) return;
    i = clamp(i, minIndex(), PRODUKTE.length - 1);
    seqDelay?.kill(); panelDelay?.kill();
    if (state.mode === 'select') { barrels[state.sel].seq?.kill(); scheduleReset(state.sel, 1.1); }
    state.mode = 'browse'; state.index = i; state.sel = -1;
    setBody('mode', 'browse'); setBody('focus', String(i)); setBody('seq', 'idle');
    setPanel(false);
    dimKeep = i;
    setMood(i < 0 ? MOODS.overview : MOODS.browse);
    if (i < 0) dimKeep = -1;
    flyTo(currentView(), 1.7);
    syncNav();
    if (i >= 0) announce(`${PRODUKTE[i].name}, ${PRODUKTE[i].abv} Prozent`);
  }

  function startSequence(i) {
    const B = barrels[i];
    state.phase = 'pour';
    setBody('seq', 'running');
    $('#p-replay').disabled = true;
    seqDelay?.kill();
    seqDelay = gsap.delayedCall(reduced() ? 0.05 : 0.9, () => {
      B.seq = buildSequence(B, {
        mobile,
        onFirstPourDone: () => { state.phase = 'deko'; flyTo(viewSelect(i, 'deko'), 2.2, 'power2.inOut'); },
        onComplete: () => {
          state.phase = 'deko';
          setBody('seq', 'done'); $('#p-replay').disabled = false;
          announce(`${PRODUKTE[i].name} eingeschenkt.`);
        },
      });
      if (reduced()) B.seq.timeScale(6);
      B.seq.play();
    });
  }

  function select(i) {
    if (!introDone || i < 0 || i >= PRODUKTE.length) return;
    if (state.mode === 'select' && state.sel === i) return;
    seqDelay?.kill(); panelDelay?.kill();
    if (state.mode === 'select') { barrels[state.sel].seq?.kill(); scheduleReset(state.sel, 0.5); }
    resetCalls.get(i)?.kill(); resetCalls.delete(i);
    resetBarrel(barrels[i]);
    state.mode = 'select'; state.sel = i; state.index = i;
    setBody('mode', 'select'); setBody('focus', String(i));
    renderPanel(i); syncNav();
    dimKeep = i;
    const P = PRODUKTE[i], S = P.stimmung;
    setMood({ lantern: S.lantern, ambient: S.lantern < 0.5 ? 0.45 : 0.7, exposure: S.exposure, warm: S.warm, key: 1, rim: 1, other: S.andere }, 1.8);
    // Schlüssellicht auf das Glas richten
    const B = barrels[i], { pos, n, t } = B.pose, c = pos.clone().add(V(0, GLASS_Y + B.glass.H * 0.5, 0));
    key.position.copy(c).addScaledVector(n, 1.7).addScaledVector(t, -0.5).add(V(0, 1.6, 0));
    key.target.position.copy(c);
    rimL.position.copy(c).addScaledVector(n, -0.55).addScaledVector(t, 0.2).add(V(0, 0.25, 0));
    flyTo(viewSelect(i, 'pour'), 2.1);
    panelDelay = gsap.delayedCall(reduced() ? 0 : 1.5, () => { setPanel(true); });
    startSequence(i);
    announce(`${P.name} ausgewählt. Es wird eingeschenkt.`);
  }

  function back() {
    if (state.mode !== 'select') return;
    const i = state.sel;
    goBrowse(overviewOK() ? -1 : i);
    setTimeout(() => dockBtns[i]?.focus({ preventScroll: true }), 50);
  }

  function replay() {
    if (state.mode !== 'select') return;
    const i = state.sel;
    seqDelay?.kill();
    barrels[i].seq?.kill();
    resetBarrel(barrels[i]);
    flyTo(viewSelect(i, 'pour'), 1.4);
    startSequence(i);
    announce('Noch einmal einschenken.');
  }

  $('#p-back').addEventListener('click', back);
  $('#p-replay').addEventListener('click', replay);
  $('#p-prev').addEventListener('click', () => select((state.sel + PRODUKTE.length - 1) % PRODUKTE.length));
  $('#p-next').addEventListener('click', () => select((state.sel + 1) % PRODUKTE.length));
  $('#nav-prev').addEventListener('click', () => goBrowse(state.index - 1));
  $('#nav-next').addEventListener('click', () => goBrowse(state.index + 1));
  $('#nav-all').addEventListener('click', () => goBrowse(minIndex()));

  /* ---------- Eingaben ---------- */
  const ptr = { x: 0, y: 0, sx: 0, sy: 0, moved: false, down: null, hover: -1 };
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const pickList = barrels.flatMap((B) => B.pick);
  function pickAt(cx, cy) {
    ndc.set((cx / innerWidth) * 2 - 1, -(cy / innerHeight) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    const hit = raycaster.intersectObjects(pickList, false)[0];
    return hit ? hit.object.userData.barrel : -1;
  }
  canvas.addEventListener('pointermove', (e) => {
    ptr.x = (e.clientX / innerWidth) * 2 - 1; ptr.y = (e.clientY / innerHeight) * 2 - 1;
    ptr.cx = e.clientX; ptr.cy = e.clientY; ptr.moved = true;
  });
  canvas.addEventListener('pointerdown', (e) => { ptr.down = { x: e.clientX, y: e.clientY, t: performance.now(), touch: e.pointerType === 'touch' }; });
  canvas.addEventListener('pointerup', (e) => {
    const d = ptr.down; ptr.down = null;
    if (!d || !introDone) return;
    const dx = e.clientX - d.x, dy = e.clientY - d.y;
    if (d.touch && Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.3 && state.mode === 'browse') { goBrowse(state.index + (dx < 0 ? 1 : -1)); return; }
    if (Math.hypot(dx, dy) < 9 && state.mode === 'browse') {
      const i = pickAt(e.clientX, e.clientY);
      if (i >= 0) select(i);
    }
  });
  canvas.addEventListener('pointerleave', () => { ptr.x = ptr.y = 0; ptr.hover = -1; });
  let wheelAcc = 0, wheelLock = 0;
  addEventListener('wheel', (e) => {
    if (state.mode !== 'browse') return;
    const now = performance.now();
    if (now < wheelLock) return;
    wheelAcc += e.deltaY;
    if (Math.abs(wheelAcc) > 40) { goBrowse(state.index + Math.sign(wheelAcc)); wheelAcc = 0; wheelLock = now + 700; }
  }, { passive: true });
  addEventListener('keydown', (e) => {
    if (!introDone) { if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') skipIntro(); return; }
    if (e.key === 'Escape') { if (state.mode === 'select') { e.preventDefault(); back(); } return; }
    const tgt = e.target;
    const inControl = tgt && (tgt.tagName === 'BUTTON' || tgt.tagName === 'A');
    const fwd = ['ArrowRight', 'ArrowDown', 'PageDown'].includes(e.key), bwd = ['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key);
    if (fwd || bwd) {
      e.preventDefault();
      const d = fwd ? 1 : -1;
      if (state.mode === 'browse') goBrowse(state.index + d);
      else if (state.mode === 'select') select((state.sel + d + PRODUKTE.length) % PRODUKTE.length);
    } else if (e.key === 'Home' && state.mode === 'browse') goBrowse(minIndex());
    else if (e.key === 'End' && state.mode === 'browse') goBrowse(PRODUKTE.length - 1);
    else if (/^[1-6]$/.test(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) select(Number(e.key) - 1);
    else if ((e.key === 'Enter' || e.key === ' ') && !inControl && state.mode === 'browse' && state.index >= 0) { e.preventDefault(); select(state.index); }
  });
  addEventListener('resize', () => {
    renderer.setSize(innerWidth, innerHeight, false);
    camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
    if (introDone) {
      if (state.mode === 'browse' && state.index < minIndex()) state.index = minIndex();
      gsap.killTweensOf(camState); Object.assign(camState, currentView());
    }
  });

  /* ---------- Intro ---------- */
  let introTl = null;
  function finishIntro() {
    introDone = true;
    state.mode = 'browse'; state.index = minIndex();
    setBody('mode', 'browse'); setBody('focus', String(state.index)); setBody('seq', 'idle');
    dimKeep = state.index < 0 ? -1 : state.index;
    setMood(state.index < 0 ? MOODS.overview : MOODS.browse, 0.8);
    syncNav();
    if (state.index >= 0) flyTo(currentView(), 1.4);
    $('#loader').remove();
    announce('Der Keller ist geöffnet. Mit Pfeiltasten oder Scrollen zwischen den Fässern wechseln, Enter zum Einschenken.');
  }
  function skipIntro() { if (introTl) introTl.progress(1); }

  const start = () => {
    setBody('mode', 'intro');
    Object.assign(camState, { px: 0, py: 1.7, pz: 10.6, tx: 0, ty: 1.5, tz: -10, fov: 58, amp: 0.05 });
    $('#loader').classList.add('ready');
    $('#loader-msg').textContent = 'Keller geöffnet';
    $('#loader-bar').style.transform = 'scaleX(1)'; $('#loader-pct').textContent = '100 %';
    const target = viewOverview();
    if (!mobile || overviewOK()) {
      introTl = gsap.timeline({ onComplete: finishIntro });
      if (reduced()) { Object.assign(camState, target); introTl.to({}, { duration: 0.4 }); }
      else {
        introTl.to('#loader', { opacity: 0, duration: 1.3, delay: 0.9, ease: 'power1.inOut' }, 0)
          .to(camState, { ...target, duration: 5.2, ease: 'power2.inOut' }, 0.5);
        introTl.add(() => $('#loader').classList.add('gone'), 2.2);
      }
    } else {
      // Hochformat: direkt an das erste Fass heranfahren
      const t2 = viewFocus(0);
      introTl = gsap.timeline({ onComplete: finishIntro });
      if (reduced()) { Object.assign(camState, t2); introTl.to({}, { duration: 0.4 }); }
      else {
        introTl.to('#loader', { opacity: 0, duration: 1.2, delay: 0.7 }, 0)
          .to(camState, { ...t2, duration: 4.6, ease: 'power2.inOut' }, 0.4);
      }
    }
  };

  /* ---------- Render-Schleife ---------- */
  const clock = new THREE.Clock();
  let t = 0, acc = 0, frames = 0;
  const cur = { x: 0, y: 0 };
  const tmp = V(0, 0, 0), fwdV = V(0, 0, 0), rightV = V(0, 0, 0), lookAt = V(0, 0, 0);
  const warm = new THREE.Color();
  const adaptive = params.get('q') !== 'high';

  function updateTags() {
    const w = innerWidth, h = innerHeight;
    const show = state.mode === 'browse' && introDone;
    for (let i = 0; i < barrels.length; i++) {
      const el = tags[i];
      tmp.copy(barrels[i].pose.pos); tmp.y = 2.0; tmp.project(camera);
      const x = (tmp.x * 0.5 + 0.5) * w, y = (-tmp.y * 0.5 + 0.5) * h;
      const inView = tmp.z < 1 && x > -40 && x < w + 40 && y > 0 && y < h + 60;
      const focus = state.index === i;
      const vis = show && inView && (state.index < 0 || Math.abs(state.index - i) <= (mobile ? 0 : 1) || focus);
      el.style.opacity = vis ? (focus || state.index < 0 ? '1' : '0.55') : '0';
      el.style.pointerEvents = vis ? 'auto' : 'none';
      el.tabIndex = vis ? 0 : -1;
      const hw = (el.offsetWidth || 160) / 2 + 8, cx = clamp(x, hw, w - hw);
      el.style.transform = `translate3d(${cx.toFixed(1)}px,${y.toFixed(1)}px,0) translate(-50%,-100%)`;
      el.style.zIndex = focus ? 3 : Math.round(10 - Math.abs(tmp.x) * 5);
      el.classList.toggle('is-hover', ptr.hover === i);
    }
  }

  renderer.setAnimationLoop(() => {
    const dt = Math.min(clock.getDelta(), adaptive ? 0.05 : 0.25); // ?q=high: kein Zeitraffer-Schutz (Tests)
    t += dt;

    // Parallax (Maus/Touch)
    const k = Math.min(1, dt * 3);
    cur.x += ((reduced() ? 0 : ptr.x) - cur.x) * k; cur.y += ((reduced() ? 0 : ptr.y) - cur.y) * k;
    camera.fov = camState.fov;
    camera.position.set(camState.px, camState.py, camState.pz);
    lookAt.set(camState.tx, camState.ty, camState.tz);
    fwdV.copy(lookAt).sub(camera.position).normalize();
    rightV.crossVectors(fwdV, camera.up).normalize();
    const amp = camState.amp, breath = reduced() ? 0 : Math.sin(t * 0.5) * 0.015;
    camera.position.addScaledVector(rightV, cur.x * amp).addScaledVector(camera.up, -cur.y * amp * 0.5 + breath);
    camera.lookAt(lookAt);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();

    // Licht
    cellar.update(t, dt, mood, reduced());
    cellar.amb.intensity = 0.3 * mood.ambient;
    cellar.row.intensity = 110 * mood.ambient * (0.5 + 0.5 * mood.lantern);
    renderer.toneMappingExposure = mood.exposure;
    key.intensity = 34 * mood.key * (reduced() ? 1 : 1 + 0.03 * Math.sin(t * 7));
    rimL.intensity = 2.4 * mood.rim;

    // aktives Fass
    if (state.sel >= 0) {
      const B = barrels[state.sel];
      B.glass.update(dt, t);
      B.bottle.updateClip(); B.tonic?.updateClip();
    }

    // Hover (nur Maus)
    if (ptr.moved && introDone && state.mode === 'browse' && !mobile) {
      ptr.moved = false;
      ptr.hover = pickAt(ptr.cx, ptr.cy);
      canvas.style.cursor = ptr.hover >= 0 ? 'pointer' : 'default';
    } else if (state.mode !== 'browse') { ptr.hover = -1; canvas.style.cursor = 'default'; }

    updateTags();
    renderer.render(scene, camera);

    // adaptive Auflösung
    if (adaptive && introDone) {
      acc += dt; frames++;
      if (frames >= 90) {
        const avg = acc / frames; acc = 0; frames = 0;
        if (avg > 1 / 38 && dpr > 0.75) { dpr = Math.max(0.75, dpr - 0.25); renderer.setPixelRatio(dpr); renderer.setSize(innerWidth, innerHeight, false); }
        else if (avg < 1 / 58 && dpr < maxDpr) { dpr = Math.min(maxDpr, dpr + 0.25); renderer.setPixelRatio(dpr); renderer.setSize(innerWidth, innerHeight, false); }
      }
    }
  });

  root.classList.add('gl-ok');
  setBody('mode', 'intro');
  await setProgress(1, 'Keller geöffnet');
  start();

  // Test-/Debug-Zugriff
  window.__hb = { select, back, goBrowse, state, barrels, camera, renderer, scene, skipIntro, replay, camState, viewSelect, get dpr() { return dpr; } };
}
