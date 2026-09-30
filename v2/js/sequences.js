// Einschenk-Sequenz (aus v1 übernommen, auf „Bühne“ verallgemeinert: Fass mit Glasscheibe oder Probiertisch):
// Flasche hebt sich, wird geöffnet, kippt, schenkt ein, kehrt zurück; danach erscheint die Sortendeko.
import * as THREE from 'three';
import { buildStream } from './glassware.js';
import { makeTonicBottle } from './bottles.js';
import { DEKO } from './deko.js';

const gsap = window.gsap;
const A0 = 1.72, A1 = 2.02; // Kippwinkel (rad) zu Beginn/Ende des Eingießens

function makeTonic(S) {
  const t = makeTonicBottle();
  t.root.visible = false; t.root.scale.setScalar(0.001);
  S.root.add(t.root);
  return t;
}

/** Eine Gießphase (Flasche ans Glas, kippen, Pegel steigt, zurück). */
function pourTL(S, ctx, o, startFill) {
  const G = S.glass, tonic = o.flasche === 'tonic';
  const bot = tonic ? (S.tonic ||= makeTonic(S)) : S.bottle;
  const s = tonic ? 1 : -1, H = bot.mouthY, R = bot.root; // Hauptflasche steht links vom Glas, die Tonic-Flasche kommt von rechts
  const M = { x: s * G.rimR * 0.5, y: S.glassY + G.H + 0.1, z: 0 };
  const landX = -s * G.rimR * 0.1;
  const pose = (a) => ({ x: M.x + s * H * Math.sin(a), y: M.y - H * Math.cos(a) });
  const P0 = pose(A0);
  const liftY = Math.max(P0.y, S.bottleHome.y) + 0.14;
  const slot = S.bottleHome;
  const dur = tonic ? 1.7 : 2.1;
  const color = o.farbe || G.product.fluessig.farbe, alpha = o.alpha ?? G.product.fluessig.alpha;
  const tl = gsap.timeline();

  // 1) Auftritt / Entkorken / Anheben
  if (tonic) {
    R.visible = true; R.position.set(s * 1.0, liftY, 0.1); R.rotation.set(0, 0, 0); bot.restoreCork();
    tl.fromTo(R.scale, { x: 0.001, y: 0.001, z: 0.001 }, { x: 1, y: 1, z: 1, duration: 0.55, ease: 'back.out(1.6)' }, 0);
    tl.to(bot.cork.position, { y: bot.corkRest + 0.25, duration: 0.4, ease: 'power2.out' }, 0.5)
      .to(bot.cork.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 0.4 }, 0.5);
  } else {
    tl.to(bot.cork.position, { y: bot.corkRest + 0.3, duration: 0.45, ease: 'power2.out' }, 0)
      .to(bot.cork.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 0.45, ease: 'power1.in' }, 0)
      .to(R.position, { y: liftY, duration: 0.75, ease: 'power2.inOut' }, 0.1);
  }
  // 2) Anfahrt und Kippen
  const t1 = 0.95;
  tl.to(R.position, { x: P0.x, y: P0.y, z: M.z, duration: t1, ease: 'power2.inOut' }, '>');
  tl.to(R.rotation, { z: s * A0, duration: t1, ease: 'power2.inOut' }, '<');

  // 3) Eingießen
  tl.call(() => {
    G.pouring = true;
    G.setLiquidColor(color, alpha);
    S.stream.setColor(color, Math.min(0.9, 0.42 + alpha * 0.5));
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
      S.stream.update(M, landX, S.glassY + Math.max(G.level, G.yb + 0.001), w);
    },
  });
  tl.call(() => {
    G.pouring = false; S.stream.hide(); if (!tonic) G.fizz.active = false;
    if (!ctx.dekoCam) { ctx.dekoCam = true; ctx.onFirstPourDone(); } // Kamera fährt ans Glas, während die Flasche zurückkehrt
  });

  // 4) Zurück
  tl.to(R.rotation, { z: 0, duration: 0.9, ease: 'power2.inOut' }, '>+0.1');
  if (tonic) {
    tl.to(R.position, { x: s * 1.0, y: liftY, z: 0.1, duration: 0.9, ease: 'power2.inOut' }, '<');
    tl.to(R.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 0.4, ease: 'power2.in' }, '>');
    tl.call(() => { R.visible = false; });
  } else {
    tl.to(R.position, { x: slot.x, y: liftY, z: slot.z, duration: 0.9, ease: 'power2.inOut' }, '<');
    tl.to(R.position, { y: slot.y, duration: 0.6, ease: 'power2.in' }, '>');
    tl.call(() => { bot.cork.position.y = bot.corkRest; bot.cork.scale.setScalar(1); });
  }
  return tl;
}

/** Baut die komplette Sequenz (pausiert). ctx: {mobile, onFirstPourDone, onComplete}. */
export function buildSequence(S, ctx) {
  const P = S.product, G = S.glass;
  S.stream ||= buildStream(S.root);
  ctx.finalLevel = G.levelFromFill([...P.ablauf].reverse().find((x) => x.gies).gies.fill);
  const tl = gsap.timeline({ paused: true });
  let fill = 0;
  for (const step of P.ablauf) {
    if (step.gies) { tl.add(pourTL(S, ctx, step.gies, fill)); fill = step.gies.fill; }
    else if (step.deko) {
      if (!DEKO[step.deko]) { console.warn('Deko fehlt:', step.deko); continue; }
      tl.add(DEKO[step.deko](G, ctx)); tl.to({}, { duration: 0.3 });
    }
  }
  tl.call(() => ctx.onComplete());
  return tl;
}

/** Bühne in den Ausgangszustand bringen (Flasche zurück, Glas leer, Deko weg). */
export function resetStage(S) {
  S.seq?.kill(); S.seq = null;
  S.stream?.hide();
  const b = S.bottle, home = S.bottleHome;
  if (b) {
    gsap.killTweensOf([b.root.position, b.root.rotation, b.root.scale, b.cork.position, b.cork.scale]);
    b.root.position.copy(home); b.root.rotation.set(0, b.homeYaw || 0, 0); b.root.scale.setScalar(1);
    b.restoreCork(); b.setFill(1);
  }
  if (S.tonic) {
    gsap.killTweensOf([S.tonic.root.position, S.tonic.root.rotation, S.tonic.root.scale, S.tonic.cork.position, S.tonic.cork.scale]);
    S.root.remove(S.tonic.root);
    S.tonic.root.traverse((o) => { o.geometry?.dispose(); o.material?.dispose?.(); });
    S.tonic = null;
  }
  S.glass?.reset();
}
