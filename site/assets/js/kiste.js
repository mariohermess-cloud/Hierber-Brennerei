/* Holzkiste 4 x 0,2 l: Auswahl je Fach wechselt die Flasche in der Vorschau. Ohne JavaScript bleibt die Standardbelegung stehen.
   Die Kiste wird „befüllt“: beim ersten Sichtbarwerden werden die vier Flaschen nacheinander eingesetzt, beim Wechsel einer Sorte hebt sich die alte Flasche
   aus dem Fach und die neue sinkt hinein. Bewegt werden nur transform und opacity (Web Animations); die vorderen Latten (.kiste-vorn) liegen weiter über den Flaschen.
   Bei „Bewegung reduzieren“ wird weder eingesetzt noch animiert: der Wechsel geschieht sofort. */
(function () {
  'use strict';
  var buehne = document.querySelector('[data-kiste-buehne]');
  if (!buehne) return;
  var fs = Array.prototype.slice.call(document.querySelectorAll('[data-kiste-wahl] [data-fach]'));
  var grund = buehne.querySelector('img.kiste-grund');
  var text = document.querySelector('[data-kiste-text]');
  var vorgeladen = {};

  /* Zeiten in ms (ruhig, keine hektischen Bewegungen): rausheben 600, die neue Flasche startet nach 250 und braucht 800, insgesamt 1050 */
  var RAUS = 600, REIN_VERZOEGERUNG = 250, REIN = 800, GESAMT = REIN_VERZOEGERUNG + REIN;
  var STAFFEL = 300;        // Abstand der Flaschen in der Einsetz-Sequenz beim Laden
  var NOTFALL = 3000;       // spätestens danach sind alle Flaschen sichtbar, auch wenn der Observer nicht feuert

  function reduziert() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }
  function kannAnimieren() { return typeof buehne.animate === 'function'; }
  function urlVon(sorte) { return '/img/kiste-' + sorte + '.webp'; }

  /* Zustand je Fach: Flasche, Schatten, Zielsorte, laufende Animationen und die ausblendende Kopie der alten Flasche */
  var zustand = {};
  var flaschen = Array.prototype.slice.call(buehne.querySelectorAll('img.kiste-flasche[data-fach-bild]'));
  flaschen.forEach(function (b) {
    var s = b.previousElementSibling;
    var basis = s && s.classList.contains('kiste-schatten') ? parseFloat(s.style.opacity) : NaN;
    zustand[b.getAttribute('data-fach-bild')] = {
      bild: b,
      schatten: s && s.classList.contains('kiste-schatten') ? s : null,
      deckkraft: isNaN(basis) ? 0.28 : basis,
      ziel: b.getAttribute('data-sorte'),
      token: 0, anims: [], alt: null, aktiv: false
    };
  });

  function setzeAktiv(z, an) {
    z.aktiv = an;
    var irgendeines = Object.keys(zustand).some(function (k) { return zustand[k].aktiv; });
    if (irgendeines) buehne.setAttribute('data-bewegt', ''); else buehne.removeAttribute('data-bewegt');
  }

  /* laufende Animation des Fachs abbrechen: Flasche steht danach ruhig an ihrer Stelle, die Kopie der alten Flasche verschwindet */
  function beende(z) {
    z.token++;
    z.anims.forEach(function (a) { a.onfinish = null; a.cancel(); });
    z.anims = [];
    if (z.alt) { z.alt.remove(); z.alt = null; }
    setzeAktiv(z, false);
  }

  function tausche(z, sorte) {
    z.bild.src = urlVon(sorte);
    z.bild.setAttribute('data-sorte', sorte);
  }

  function anim(z, el, bilder, opt) {
    var a = el.animate(bilder, opt);
    z.anims.push(a);
    return a;
  }

  /* Die neue Flasche schwebt von oben ein, sinkt in ihr Fach (hinter die vorderen Latten) und setzt mit einem kleinen Nachfedern (1,4 % der Flaschenhöhe) auf.
     translate in Prozent bezieht sich auf die Höhe der Flasche selbst, die Bewegung skaliert also mit der Bildgröße. */
  function einsetzen(z, verzoegerung, mitSchatten) {
    var bewegung = anim(z, z.bild, [
      { transform: 'translate(-50%,-80%)', offset: 0, easing: 'cubic-bezier(.25,.8,.35,1)' },
      { transform: 'translate(-50%,0)', offset: 0.74, easing: 'cubic-bezier(.3,0,.4,1)' },
      { transform: 'translate(-50%,-1.4%)', offset: 0.88, easing: 'cubic-bezier(.45,0,.55,1)' },
      { transform: 'translate(-50%,0)', offset: 1 }
    ], { duration: REIN, delay: verzoegerung, fill: 'backwards' });
    anim(z, z.bild, [{ opacity: 0 }, { opacity: 1 }], { duration: REIN * 0.45, delay: verzoegerung, fill: 'backwards', easing: 'cubic-bezier(.3,0,.4,1)' });
    if (z.schatten && mitSchatten) {
      var d = z.deckkraft;
      anim(z, z.schatten, [
        { transform: 'translate(-50%,-50%) scale(.6)', opacity: 0, offset: 0, easing: 'cubic-bezier(.3,0,.3,1)' },
        { transform: 'translate(-50%,-50%) scale(1.06)', opacity: Math.min(1, d * 1.1), offset: 0.78, easing: 'cubic-bezier(.45,0,.55,1)' },
        { transform: 'translate(-50%,-50%) scale(1)', opacity: d, offset: 1 }
      ], { duration: REIN, delay: verzoegerung, fill: 'backwards' });
    }
    return bewegung;
  }

  function wechselAnimation(z, sorte, token) {
    /* die alte Flasche bleibt als Kopie stehen und hebt sich heraus; die echte Flasche (data-fach-bild) zeigt sofort die neue Sorte und sinkt ein */
    var alt = z.bild.cloneNode(false);
    alt.removeAttribute('data-fach-bild');
    alt.removeAttribute('data-sorte');
    alt.className = 'kiste-flasche kiste-alt';
    alt.setAttribute('aria-hidden', 'true');
    alt.setAttribute('decoding', 'sync');
    z.bild.parentNode.insertBefore(alt, z.bild);
    z.alt = alt;
    tausche(z, sorte);

    var raus = alt.animate([{ transform: 'translate(-50%,0)' }, { transform: 'translate(-50%,-42%)' }], { duration: RAUS, fill: 'forwards', easing: 'cubic-bezier(.35,0,.3,1)' });
    var aus = alt.animate([{ opacity: 1 }, { opacity: 0 }], { duration: RAUS, fill: 'forwards', easing: 'cubic-bezier(.4,0,.9,1)' });
    z.anims.push(raus, aus);
    raus.onfinish = function () { if (token === z.token && z.alt === alt) { alt.remove(); z.alt = null; } };

    var bewegung = einsetzen(z, REIN_VERZOEGERUNG, false);
    if (z.schatten) {
      /* Schatten: beim Anheben kleiner und heller, beim Aufsetzen wächst er mit */
      var d = z.deckkraft, klein = 'translate(-50%,-50%) scale(.62)', voll = 'translate(-50%,-50%) scale(1)';
      anim(z, z.schatten, [
        { transform: voll, opacity: d, offset: 0, easing: 'cubic-bezier(.4,0,.2,1)' },
        { transform: klein, opacity: d * 0.35, offset: 0.3, easing: 'linear' },
        { transform: klein, opacity: d * 0.35, offset: 0.42, easing: 'cubic-bezier(.3,0,.4,1)' },
        { transform: 'translate(-50%,-50%) scale(1.06)', opacity: Math.min(1, d * 1.1), offset: 0.82, easing: 'cubic-bezier(.45,0,.55,1)' },
        { transform: voll, opacity: d, offset: 1 }
      ], { duration: GESAMT });
    }
    bewegung.onfinish = function () {
      if (token !== z.token) return;
      z.anims = [];
      if (z.alt) { z.alt.remove(); z.alt = null; }
      setzeAktiv(z, false);
    };
  }

  function wechsle(z, sorte) {
    beende(z);
    var token = z.token;
    if (z.bild.getAttribute('data-sorte') === sorte) return;
    if (reduziert() || !kannAnimieren()) { tausche(z, sorte); return; }
    setzeAktiv(z, true);
    var erledigt = false;
    function los() { if (erledigt || token !== z.token) return; erledigt = true; wechselAnimation(z, sorte, token); }
    function sofort() { if (erledigt || token !== z.token) return; erledigt = true; tausche(z, sorte); setzeAktiv(z, false); }
    var pre = vorgeladen[sorte];
    if (!pre) { pre = vorgeladen[sorte] = new Image(); pre.src = urlVon(sorte); }
    if (typeof pre.decode !== 'function') { los(); return; }
    /* erst starten, wenn die neue Quelle dekodiert ist; bei Fehler oder Verzögerung sofort tauschen */
    var frist = setTimeout(sofort, 1500);
    pre.decode().then(function () { clearTimeout(frist); los(); }, function () { clearTimeout(frist); sofort(); });
  }

  function gewaehlt(f) { return f.querySelector('input:checked'); }

  function aktualisiere() {
    if (!buehne.classList.contains('kiste-bereit')) bereit(false); // Wahl vor der Sequenz: ohne Sequenz einblenden
    var namen = [], ids = [], alt = [];
    fs.forEach(function (f) {
      var r = gewaehlt(f);
      if (!r) return;
      var nr = f.getAttribute('data-fach');
      var z = zustand[nr];
      if (z && z.ziel !== r.value) {
        z.ziel = r.value;
        wechsle(z, r.value);
      }
      ids.push(r.value);
      namen.push(r.getAttribute('data-name'));
      alt.push(f.getAttribute('data-position') + ' ' + r.getAttribute('data-name'));
    });
    buehne.setAttribute('data-belegung', ids.join(','));
    if (grund) grund.alt = buehne.getAttribute('data-alt-vor') + ': ' + alt.join(', ') + '.';
    if (text) text.textContent = namen.join(', ');
  }

  /* Kupferglanz am gewählten Sortenfeld (CSS-Animation auf ::after, nur opacity/transform) */
  function glanz(radio) {
    if (reduziert()) return;
    var kachel = radio.closest ? radio.closest('.kiste-kachel') : radio.parentNode;
    if (!kachel) return;
    kachel.classList.remove('kiste-glanz');
    void kachel.offsetWidth;
    kachel.classList.add('kiste-glanz');
  }
  var wahlBox = document.querySelector('[data-kiste-wahl]');
  if (wahlBox) wahlBox.addEventListener('animationend', function (e) {
    if (e.target.classList && e.target.classList.contains('kiste-glanz')) e.target.classList.remove('kiste-glanz');
  });

  fs.forEach(function (f) {
    f.addEventListener('change', function (e) {
      if (e.target && e.target.type === 'radio' && e.target.checked) glanz(e.target);
      aktualisiere();
    });
  });

  /* Freisteller aller Sorten vorladen, damit der Wechsel ohne Flackern geht */
  fs[0] && Array.prototype.slice.call(fs[0].querySelectorAll('input')).forEach(function (r) {
    if (vorgeladen[r.value]) return;
    vorgeladen[r.value] = new Image();
    vorgeladen[r.value].src = urlVon(r.value);
  });

  /* Einsetz-Sequenz beim ersten Sichtbarwerden: hinten zuerst (Reihenfolge der Flaschen im Markup = Zeichenreihenfolge).
     Das CSS blendet die Flaschen nur mit der Klasse html.js und ohne „Bewegung reduzieren“ bis .kiste-bereit aus (mit Notfall-Einblendung nach 3,5 s);
     hier werden die Animationen mit fill:backwards angelegt, bevor die Klasse gesetzt wird, damit nichts aufblitzt. */
  function bereit(mitSequenz) {
    if (buehne.classList.contains('kiste-bereit')) return;
    if (mitSequenz) {
      flaschen.forEach(function (b, i) {
        var z = zustand[b.getAttribute('data-fach-bild')];
        if (z.aktiv) return;
        setzeAktiv(z, true);
        einsetzen(z, i * STAFFEL, true).onfinish = function () {
          if (z.alt) return; // inzwischen läuft ein Wechsel im Fach
          z.anims = [];
          setzeAktiv(z, false);
        };
      });
    }
    buehne.classList.add('kiste-bereit');
  }

  if (reduziert() || !kannAnimieren() || !('IntersectionObserver' in window)) {
    bereit(false);
  } else {
    var io = new IntersectionObserver(function (eintraege) {
      if (!eintraege.some(function (e) { return e.isIntersecting; })) return;
      io.disconnect();
      clearTimeout(notfall);
      bereit(!reduziert());
    }, { threshold: 0.25 });
    var notfall = setTimeout(function () {
      io.disconnect();
      bereit(false);
    }, NOTFALL);
    io.observe(buehne);
  }
})();
