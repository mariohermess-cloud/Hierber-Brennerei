// Einschenk-Sequenz: Flasche hebt sich, kippt, schenkt ein, danach erscheint die Dekoration.
import * as THREE from 'three';
import { buildBottle, buildStream } from './glassware.js';
import { DEKO } from './deko.js';
import { GLASS_Y } from './cellar.js';

const gsap = window.gsap;
const A0 = 1.72, A1 = 2.02; // Kippwinkel (rad) zu Beginn/Ende des Eingießens

/** Zusätzliche Tonic-Flasche (klein, von links) – nur für den Gin. */
function makeTonic(B, ctx) {
  const t = buildBottle('tonic', B.product, { glassColor: 0x9fd8c4, liquidColor: '#e6f4ef', liquidAlpha: 0.4, dim: B.dim, mobile: ctx.mobile, label: false });
  t.root.visible = false; t.root.scale.setScalar(0.001);
  B.root.add(t.root);
  return t;
}

/** Eine Gießphase (Flasche ans Glas, kippen, Pegel steigt, zurück). */
function pourTL(B, ctx, o, startFill) {
  const G = B.glass, tonic = o.flasche === 'tonic';
  const bot = tonic ? (B.tonic ||= makeTonic(B, ctx)) : B.bottle;
  const s = tonic ? -1 : 1, H = bot.H, R = bot.root;
  const M = { x: s * G.rimR * 0.5, y: GLASS_Y + G.H + 0.1, z: 0 };
  const landX = -s * G.rimR * 0.1;
  const pose = (a) => ({ x: M.x + s * H * Math.sin(a), y: M.y - H * Math.cos(a) });
  const P0 = pose(A0);
  const liftY = P0.y + 0.14;
  const slot = B.bottleSlot.position;
  const dur = tonic ? 1.7 : 2.1;
  const color = o.farbe || G.product.fluessig.farbe, alpha = o.alpha ?? G.product.fluessig.alpha;
  const tl = gsap.timeline();

  // 1) Auftritt / Entkorken / Anheben
  if (tonic) {
    R.visible = true; R.position.set(-1.0, liftY, 0.1); R.rotation.set(0, 0, 0); bot.restoreCork();
    tl.fromTo(R.scale, { x: 0.001, y: 0.001, z: 0.001 }, { x: 1, y: 1, z: 1, duration: 0.55, ease: 'back.out(1.6)' }, 0);
    tl.to(bot.cork.position, { y: bot.H + 0.25, duration: 0.4, ease: 'power2.out' }, 0.5)
      .to(bot.cork.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 0.4 }, 0.5);
  } else {
    tl.to(bot.cork.position, { y: bot.H + 0.3, duration: 0.45, ease: 'power2.out' }, 0)
      .to(bot.cork.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 0.45, ease: 'power1.in' }, 0)
      .to(R.position, { y: liftY, duration: 0.75, ease: 'power2.inOut' }, 0.1);
  }
  // 2) Anfahrt und Kippen
  const t1 = tonic ? 0.95 : 0.95;
  tl.to(R.position, { x: P0.x, y: P0.y, z: M.z, duration: t1, ease: 'power2.inOut' }, '>');
  tl.to(R.rotation, { z: s * A0, duration: t1, ease: 'power2.inOut' }, '<');

  // 3) Eingießen
  tl.call(() => {
    G.pouring = true;
    G.setLiquidColor(color, alpha);
    B.stream.setColor(color, Math.min(0.9, 0.42 + alpha * 0.5));
    G.splash.mat.color.set(color).lerp(new THREE.Color(0xffffff), 0.5);
    G.fizz.start(tonic ? 1 : 0.5);
  });
  const drv = { a: A0, f: startFill, bf: bot.fill };
  const bEnd = bot.fill - (tonic ? 0.1 : 0.07);
  tl.to(drv, {
    a: A1, f: o.fill, bf: bEnd, duration: dur, ease: 'none',
    onUpdate() {
      const p = pose(drv.a), prog = this.progress();
      R.position.set(p.x, p.y, M.z); R.rotation.z = s * drv.a;
      bot.setFill(drv.bf); G.setFill(drv.f);
      const w = 0.0075 * (0.35 + 0.65 * Math.min(1, prog * 8, (1 - prog) * 6 + 0.25));
      B.stream.update(M, landX, GLASS_Y + Math.max(G.level, G.yb + 0.001), w);
    },
  });
  tl.call(() => {
    G.pouring = false; B.stream.hide(); if (!tonic) G.fizz.active = false;
    if (!ctx.dekoCam) { ctx.dekoCam = true; ctx.onFirstPourDone(); } // Kamera fährt ans Glas, während die Flasche zurückkehrt
  });

  // 4) Zurück
  tl.to(R.rotation, { z: 0, duration: 0.9, ease: 'power2.inOut' }, '>+0.1');
  if (tonic) {
    tl.to(R.position, { x: -1.0, y: liftY, z: 0.1, duration: 0.9, ease: 'power2.inOut' }, '<');
    tl.to(R.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 0.4, ease: 'power2.in' }, '>');
    tl.call(() => { R.visible = false; });
  } else {
    tl.to(R.position, { x: slot.x, y: liftY, z: slot.z, duration: 0.9, ease: 'power2.inOut' }, '<');
    tl.to(R.position, { y: 0, duration: 0.6, ease: 'power2.in' }, '>');
    tl.call(() => { bot.cork.position.y = bot.H; bot.cork.scale.setScalar(1); });
  }
  return tl;
}

/** Baut die komplette Sequenz (pausiert). ctx: {mobile, onFirstPourDone, onComplete}. */
export function buildSequence(B, ctx) {
  const P = B.product, G = B.glass;
  B.stream ||= buildStream(B.root);
  ctx.finalLevel = G.levelFromFill([...P.ablauf].reverse().find((x) => x.gies).gies.fill);
  const tl = gsap.timeline({ paused: true });
  let fill = 0;
  for (const step of P.ablauf) {
    if (step.gies) {
      tl.add(pourTL(B, ctx, step.gies, fill));
      fill = step.gies.fill;
    } else if (step.deko) {
      tl.add(DEKO[step.deko](G, ctx));
      tl.to({}, { duration: 0.3 });
    }
  }
  tl.call(() => ctx.onComplete());
  return tl;
}

/** Fass in den Ausgangszustand bringen (Flasche zurück, Glas leer, Deko weg). */
export function resetBarrel(B) {
  B.seq?.kill(); B.seq = null;
  B.stream?.hide();
  const G = B.glass, b = B.bottle, slot = B.bottleSlot.position;
  gsap.killTweensOf([b.root.position, b.root.rotation, b.root.scale, b.cork.position, b.cork.scale]);
  b.root.position.set(slot.x, 0, slot.z); b.root.rotation.set(0, 0, 0); b.root.scale.setScalar(1);
  b.restoreCork(); b.setFill(0.85);
  if (B.tonic) {
    gsap.killTweensOf([B.tonic.root.position, B.tonic.root.rotation, B.tonic.root.scale, B.tonic.cork.position, B.tonic.cork.scale]);
    B.root.remove(B.tonic.root);
    B.tonic.root.traverse((o) => { o.geometry?.dispose(); o.material?.dispose?.(); });
    B.tonic = null;
  }
  G.reset();
}
