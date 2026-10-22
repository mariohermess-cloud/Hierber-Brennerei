/* Hierber Brennerei: kleine, abhängigkeitsfreie Verbesserungen. Ohne JavaScript bleibt die Seite vollständig lesbar. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var NB = ' ';
  var KEY = 'hb-merkliste', KEY_ALTER = 'hb-alter';

  /* ---------- Speicher (alles in try/catch; Fallback im Arbeitsspeicher) ---------- */
  var speicher = null;
  function lade() {
    try {
      var roh = window.localStorage.getItem(KEY);
      var a = roh ? JSON.parse(roh) : [];
      if (Array.isArray(a)) { speicher = a; return a; }
    } catch (e) { /* Speicher gesperrt */ }
    return speicher || [];
  }
  function sichere(a) {
    speicher = a;
    try { window.localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) { /* ignorieren */ }
    zaehlerUpdate();
  }
  function gesamt(a) { return a.reduce(function (s, x) { return s + (x.n || 1); }, 0); }
  function zaehlerUpdate() {
    var n = gesamt(lade());
    $$('[data-zaehler]').forEach(function (z) { z.textContent = n; z.hidden = n === 0; });
    $$('[data-merk-link]').forEach(function (l) {
      var t = n === 1 ? l.getAttribute('data-l-eins') : (l.getAttribute('data-l-viele') || '').replace('{n}', n);
      if (n === 0) t = (l.getAttribute('data-l-viele') || '').replace('{n}', 0);
      if (t) l.setAttribute('aria-label', t);
    });
  }
  var euro = function (n) { return n + NB + '€'; };

  /* ---------- Altershinweis ---------- */
  var alter = $('[data-alter-ok]');
  if (alter) {
    alter.addEventListener('click', function () {
      try { window.localStorage.setItem(KEY_ALTER, '1'); } catch (e) { /* ignorieren */ }
      document.documentElement.classList.add('alter-ok');
      var m = $('#inhalt'); if (m) { m.setAttribute('tabindex', '-1'); m.focus({ preventScroll: true }); }
    });
  }

  /* ---------- Einblenden beim Scrollen (dezent, reduced-motion wird im CSS respektiert) ---------- */
  var rev = $$('.reveal');
  if (rev.length) {
    if (!('IntersectionObserver' in window)) rev.forEach(function (e) { e.classList.add('sichtbar'); });
    else {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('sichtbar'); io.unobserve(e.target); } });
      }, { threshold: 0.12 });
      rev.forEach(function (e) { io.observe(e); });
    }
  }
  if (/[?&]todo\b/.test(location.search)) document.body.classList.add('todo');

  /* ---------- Sortenkarten (nur Maus, ohne reduzierte Bewegung): Kreis-Reveal ab Eintritts-/Austrittsstelle, dezenter Tilt, Glanzlicht ----------
     Gesetzt werden nur CSS-Variablen an der Karte: --mx/--my (Prozent im Kartenbild, nur beim Betreten und Verlassen, damit sich der Kreis nicht verschiebt),
     --gx/--gy (Prozent in der Karte) und --rx/--ry (Grad). Das Bewegen der Maus wird per requestAnimationFrame gedrosselt. */
  var mausBewegung = window.matchMedia ? window.matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)') : null;
  if (mausBewegung) {
    var MAX_KIPPEN = 2;
    var klemme = function (v) { return Math.max(0, Math.min(100, v)); };
    $$('.karte').forEach(function (karte) {
      var li = karte.parentNode, kbild = $('.karte-bild', karte), plan = 0, zx = 0, zy = 0;
      var setze = function (n, w) { karte.style.setProperty(n, w); };
      var punkt = function (cx, cy) {
        var r = li.getBoundingClientRect();
        return { x: klemme((cx - r.left) / (r.width || 1) * 100), y: klemme((cy - r.top) / (r.height || 1) * 100), r: r };
      };
      var ursprung = function (cx, cy) {
        if (!kbild) return;
        var b = kbild.getBoundingClientRect();
        setze('--mx', klemme((cx - b.left) / (b.width || 1) * 100).toFixed(1) + '%');
        setze('--my', klemme((cy - b.top) / (b.height || 1) * 100).toFixed(1) + '%');
      };
      var kippe = function (cx, cy) {
        var q = punkt(cx, cy);
        setze('--gx', q.x.toFixed(1) + '%'); setze('--gy', q.y.toFixed(1) + '%');
        setze('--ry', ((q.x - 50) / 50 * MAX_KIPPEN).toFixed(2) + 'deg');
        setze('--rx', (-(q.y - 50) / 50 * MAX_KIPPEN).toFixed(2) + 'deg');
      };
      karte.addEventListener('pointerenter', function (e) {
        if (!mausBewegung.matches || e.pointerType === 'touch') return;
        ursprung(e.clientX, e.clientY); kippe(e.clientX, e.clientY);
      });
      karte.addEventListener('pointermove', function (e) {
        if (!mausBewegung.matches || e.pointerType === 'touch') return;
        zx = e.clientX; zy = e.clientY;
        if (!plan) plan = window.requestAnimationFrame(function () { plan = 0; kippe(zx, zy); });
      });
      karte.addEventListener('pointerleave', function (e) {
        if (!mausBewegung.matches || e.pointerType === 'touch') return;
        if (plan) { window.cancelAnimationFrame(plan); plan = 0; }
        ursprung(e.clientX, e.clientY);
        setze('--rx', '0deg'); setze('--ry', '0deg');
      });
    });
  }

  /* ---------- Überschriften: Enthüllung aus einer Maske beim Scrollen ----------
     Der Text wird nur in ein Hüllelement gelegt (Inhalt und id bleiben, Screenreader lesen unverändert). Sicherheitsnetz: Überschriften oberhalb des Sichtbereichs
     (Ankersprung), Druckansicht, Ankerwechsel und ein Zeitgeber sorgen dafür, dass keine Überschrift dauerhaft verborgen bleibt. */
  (function () {
    if (!window.matchMedia || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    var hs = $$('.sektion h2').filter(function (h) { return !h.closest('.kauf-box, .prose'); });
    if (!hs.length) return;
    var zeige = function (h) { h.classList.add('sichtbar'); };
    try {
      hs.forEach(function (h) {
        var innen = document.createElement('span');
        innen.className = 'h2-innen';
        while (h.firstChild) innen.appendChild(h.firstChild);
        h.appendChild(innen);
        h.classList.add('h2-maske');
      });
      var io2 = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting || e.boundingClientRect.bottom < 0) { zeige(e.target); io2.unobserve(e.target); }
        });
      }, { threshold: 0.3, rootMargin: '0px 0px -6% 0px' });
      hs.forEach(function (h) { io2.observe(h); });
    } catch (err) { hs.forEach(zeige); return; }
    var alle = function () { hs.forEach(zeige); };
    window.addEventListener('beforeprint', alle);
    window.addEventListener('hashchange', function () {
      var z = document.getElementById(location.hash.slice(1));
      if (z) hs.forEach(function (h) { if (z.contains(h)) zeige(h); });
    });
    setTimeout(function () { hs.forEach(function (h) { if (h.getBoundingClientRect().top < window.innerHeight) zeige(h); }); }, 4000);
  })();

  /* ---------- Sparsames Parallax (ab 700 px, ohne reduzierte Bewegung): Hero-Foto, Kistenbild, Fotos von „Wie wir brennen“ ----------
     JavaScript statt CSS-Scroll-Timeline (animation-timeline: view()): Die Timeline fehlt in Firefox, ein zweiter Pfad wäre doppelt zu pflegen und zu prüfen;
     bei wenigen Elementen, passivem scroll-Ereignis, requestAnimationFrame und IntersectionObserver (nur sichtbare Elemente) ist der Aufwand gering.
     Gesetzt wird nur --pv (px); die Wirkung und der Überstand, der Lücken verhindert, stehen im CSS. */
  (function () {
    if (!window.matchMedia || !('IntersectionObserver' in window)) return;
    var mq = window.matchMedia('(min-width:700px) and (prefers-reduced-motion:no-preference)');
    var ziele = [];
    var sammle = function (sel, amp, bezug) {
      $$(sel).forEach(function (el) {
        var ref = bezug(el);
        if (ref) ziele.push({ el: el, ref: ref, amp: amp, sichtbar: false });
      });
    };
    sammle('.hero-bild', 0.04, function (el) { return el.parentNode; });
    sammle('.probier-bild', 0.035, function (el) { return el.parentNode; });
    sammle('.schritt-foto', 0.035, function (el) { return $('.schritt-bild', el) ? $('picture', el) : null; });
    if (!ziele.length) return;
    var geplant = false;
    var rechne = function () {
      geplant = false;
      if (!mq.matches) return;
      var vh = window.innerHeight, lese = [];
      ziele.forEach(function (z) { if (z.sichtbar) lese.push([z, z.ref.getBoundingClientRect()]); });
      lese.forEach(function (x) {
        var z = x[0], b = x[1];
        var p = Math.max(0, Math.min(1, (vh - b.top) / (vh + b.height)));
        z.el.style.setProperty('--pv', ((p - 0.5) * 2 * z.amp * b.height).toFixed(1) + 'px');
      });
    };
    var plane = function () { if (!geplant) { geplant = true; window.requestAnimationFrame(rechne); } };
    var io3 = new IntersectionObserver(function (es) {
      es.forEach(function (e) { ziele.forEach(function (z) { if (z.ref === e.target) z.sichtbar = e.isIntersecting; }); });
      plane();
    }, { rootMargin: '15% 0px' });
    ziele.forEach(function (z) { io3.observe(z.ref); });
    window.addEventListener('scroll', plane, { passive: true });
    window.addEventListener('resize', plane);
    var aenderung = function () { if (!mq.matches) ziele.forEach(function (z) { z.el.style.removeProperty('--pv'); }); plane(); };
    if (mq.addEventListener) mq.addEventListener('change', aenderung); else if (mq.addListener) mq.addListener(aenderung);
  })();

  /* ---------- Anlass-Filter ---------- */
  var chips = $$('[data-anlass-filter]');
  if (chips.length) {
    var karten = $$('.theke .karte-li'), gruppen = $$('.theke .gruppe'), status = $('[data-filter-status]');
    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        var war = c.getAttribute('aria-pressed') === 'true';
        chips.forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
        var aktiv = null;
        if (!war) { c.setAttribute('aria-pressed', 'true'); aktiv = c.getAttribute('data-anlass-filter'); }
        $$('[data-anlass-foto]').forEach(function (f) { f.hidden = f.getAttribute('data-anlass-foto') !== aktiv; });
        karten.forEach(function (k) { k.hidden = !!aktiv && (k.getAttribute('data-anlass') || '').split(' ').indexOf(aktiv) < 0; });
        gruppen.forEach(function (g) { g.hidden = $$('.karte-li:not([hidden])', g).length === 0; });
        if (status) {
          var n = $$('.theke .karte-li:not([hidden])').length;
          status.textContent = aktiv ? (n === 1 ? status.getAttribute('data-tpl-eins') : status.getAttribute('data-tpl').replace(/^0/, n)) : '';
        }
      });
    });
  }

  /* ---------- Kopfleiste: ab etwas Scrollen mit Hintergrund und Unschärfe (CSS: .gescrollt) ---------- */
  var kopfleiste = $('.kopf');
  if (kopfleiste) {
    var kopfWar = null;
    var kopfPruefe = function () {
      var ist = (window.pageYOffset || document.documentElement.scrollTop || 0) > 24;
      if (ist !== kopfWar) { kopfWar = ist; kopfleiste.classList.toggle('gescrollt', ist); }
    };
    window.addEventListener('scroll', kopfPruefe, { passive: true });
    kopfPruefe();
  }

  /* ---------- Hauptnavigation (schmale Breiten: eine wischbare Zeile): Randverlauf nur dort, wo noch Inhalt verborgen ist (CSS: .haupt[data-rand]) ---------- */
  var hauptNav = $('.haupt');
  if (hauptNav) {
    var randPruefe = function () {
      var max = hauptNav.scrollWidth - hauptNav.clientWidth, x = hauptNav.scrollLeft;
      var links = max > 2 && x > 2, rechts = max > 2 && x < max - 2;
      var w = links && rechts ? 'beide' : links ? 'links' : rechts ? 'rechts' : '';
      if (w) hauptNav.setAttribute('data-rand', w); else hauptNav.removeAttribute('data-rand');
    };
    hauptNav.addEventListener('scroll', randPruefe, { passive: true });
    window.addEventListener('resize', randPruefe);
    window.addEventListener('load', randPruefe);
    randPruefe();
  }

  /* ---------- So genießen (Startseite): Filter nach Art, Blätterpfeile ---------- */
  var gChips = $$('[data-geniess-filter]');
  if (gChips.length) {
    var gListe = $('[data-geniess-liste]'), gKarten = $$('.geniess-li', gListe), gStatus = $('[data-geniess-status]');
    gChips.forEach(function (c) {
      c.addEventListener('click', function () {
        var typ = c.getAttribute('data-geniess-filter');
        gChips.forEach(function (x) { x.setAttribute('aria-pressed', x === c ? 'true' : 'false'); });
        gKarten.forEach(function (k) { k.hidden = !!typ && k.getAttribute('data-typ') !== typ; });
        gListe.scrollLeft = 0;
        if (gStatus) {
          var n = gKarten.filter(function (k) { return !k.hidden; }).length;
          gStatus.textContent = typ ? (n === 1 ? gStatus.getAttribute('data-tpl-eins') : gStatus.getAttribute('data-tpl').replace(/^0/, n)) : '';
        }
      });
    });
    $$('[data-geniess-pfeil]').forEach(function (b) {
      b.addEventListener('click', function () {
        var richtung = parseInt(b.getAttribute('data-geniess-pfeil'), 10);
        var weich = !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
        gListe.scrollBy({ left: richtung * Math.max(240, gListe.clientWidth * 0.8), behavior: weich ? 'smooth' : 'auto' });
      });
    });
  }

  /* ---------- Tabs (Serviervorschläge): Pfeiltasten, Home/End ---------- */
  $$('[data-tabs]').forEach(function (w) {
    var tabs = $$('[role="tab"]', w), panels = $$('[role="tabpanel"]', w);
    function waehle(i, fokus) {
      tabs.forEach(function (t, k) { t.setAttribute('aria-selected', k === i ? 'true' : 'false'); t.tabIndex = k === i ? 0 : -1; });
      panels.forEach(function (p, k) { p.classList.toggle('aktiv', k === i); p.classList.remove('einblenden'); });
      void panels[i].offsetWidth; panels[i].classList.add('einblenden');
      if (fokus) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { waehle(i, false); });
      t.addEventListener('keydown', function (e) {
        var n = tabs.length, k = null;
        if (e.key === 'ArrowRight') k = (i + 1) % n;
        else if (e.key === 'ArrowLeft') k = (i - 1 + n) % n;
        else if (e.key === 'Home') k = 0;
        else if (e.key === 'End') k = n - 1;
        if (k !== null) { e.preventDefault(); waehle(k, true); }
      });
    });
  });

  /* ---------- Sortenseite: Variante, Größe, Live-Preis, Merkliste ---------- */
  var kauf = $('[data-kauf]');
  if (kauf) {
    var id = kauf.getAttribute('data-produkt'), pname = kauf.getAttribute('data-produkt-name');
    var vRadios = $$('input[name="variante"]', kauf), bloecke = $$('[data-variante-block]', kauf);
    var txt = $('[data-auswahl-text]', kauf), preisEl = $('[data-auswahl-preis]', kauf), stat = $('[data-merk-status]', kauf), zur = $('[data-zur-merkliste]', kauf);
    var aktVar = function () { var r = vRadios.filter(function (x) { return x.checked; })[0]; return r ? r.value : bloecke[0].getAttribute('data-variante-block'); };
    var aktGroesse = function () { return $$('input[name="groesse"]', kauf).filter(function (r) { return r.checked && r.getAttribute('data-variante') === aktVar(); })[0] || null; };
    var varName = function () { var b = bloecke.filter(function (x) { return x.getAttribute('data-variante-block') === aktVar(); })[0]; var k = b && $('.variante-kopf', b); return k ? k.textContent : pname; };
    var zeige = function () {
      var v = aktVar();
      bloecke.forEach(function (b) { b.classList.toggle('aktiv', b.getAttribute('data-variante-block') === v); });
      var gr = $$('input[name="groesse"]', kauf).filter(function (r) { return r.getAttribute('data-variante') === v; });
      if (gr.length && !gr.some(function (r) { return r.checked; })) gr[0].checked = true;
      var g = aktGroesse();
      if (txt) txt.textContent = varName() + (g ? ', ' + g.getAttribute('data-menge').replace(' ', NB) : '');
      if (preisEl && g) preisEl.textContent = euro(g.getAttribute('data-preis'));
    };
    /* Bühne im Kopf: zur gewählten Größe das Bild dieser Größe zeigen (data-bild-menge), sonst das Hauptbild (data-bild-haupt, 0,5 L bzw. Vektor-Flasche) */
    var buehne = $('[data-buehne]');
    var zeigeBild = function () {
      if (!buehne) return;
      var g = aktGroesse(), m = g ? g.getAttribute('data-menge') : null;
      var alle = $$('[data-bild-menge], [data-bild-haupt]', buehne);
      var ziel = alle.filter(function (e) { return e.getAttribute('data-bild-menge') === m; })[0] || $('[data-bild-haupt]', buehne);
      if (!ziel) return;
      alle.forEach(function (e) { e.hidden = e !== ziel; });
    };
    kauf.addEventListener('change', function () { zeige(); zeigeBild(); });
    /* click auch bei schon gewählter Größe (die Standardgröße zeigt beim Laden das Hauptbild) */
    kauf.addEventListener('click', function (e) { if (e.target && e.target.name === 'groesse') zeigeBild(); });
    zeige();
    /* vom Browser wiederhergestellte Auswahl (Reload, Zurück): Bild passend zur gewählten Größe, wenn sie nicht die erste ist */
    if (buehne) {
      var erste = $('input[name="groesse"]', kauf), g0 = aktGroesse();
      if (erste && g0 && g0 !== erste) zeigeBild();
    }
    var add = $('[data-merk-add]', kauf);
    if (add) add.addEventListener('click', function () {
      var g = aktGroesse(), v = aktVar(), menge = g ? g.getAttribute('data-menge') : null;
      var liste = lade().slice(), f = null;
      liste.forEach(function (x) { if (x.i === id && x.v === v && (x.g || null) === menge) f = x; });
      if (f) f.n = Math.min(99, (f.n || 1) + 1); else liste.push({ i: id, v: v, g: menge, n: 1 });
      sichere(liste);
      if (stat) stat.textContent = stat.getAttribute('data-ok') + ': ' + varName() + (menge ? ', ' + menge.replace(' ', NB) : '');
      if (zur) zur.hidden = false;
    });
  }

  /* ---------- Holzkiste (Kistenseite): Belegung als eine Position zum Festpreis auf die Merkliste ----------
     Eintrag { i: Kisten-Id, k: [Sorten-Id je Fach 1 bis 4], n }; gleiche Belegung zählt hoch, andere Belegung ist eine neue Position. Auswahl und Vorschau: kiste.js. */
  var kisteAdd = $('[data-kiste-add]');
  if (kisteAdd) {
    var kisteStat = $('[data-kiste-status]'), kisteZur = $('[data-kiste-zur]');
    kisteAdd.addEventListener('click', function () {
      var gewaehlt = $$('[data-kiste-wahl] [data-fach]').map(function (f) { return $('input:checked', f); });
      if (!gewaehlt.length || gewaehlt.some(function (r) { return !r; })) return;
      var kid = kisteAdd.getAttribute('data-kiste-id'), k = gewaehlt.map(function (r) { return r.value; });
      var liste = lade().slice(), f = null;
      liste.forEach(function (x) { if (x.i === kid && Array.isArray(x.k) && x.k.join(',') === k.join(',')) f = x; });
      if (f) f.n = Math.min(99, (f.n || 1) + 1); else liste.push({ i: kid, k: k, n: 1 });
      sichere(liste);
      if (kisteStat) kisteStat.textContent = kisteStat.getAttribute('data-ok') + ': ' + kisteAdd.getAttribute('data-kiste-name') + ' (' + gewaehlt.map(function (r) { return r.getAttribute('data-name'); }).join(', ') + ')';
      if (kisteZur) kisteZur.hidden = false;
    });
  }

  /* ---------- Anfrage-Seite ---------- */
  var root = $('[data-anfrage]');
  if (root) {
    var I = {}; try { I = JSON.parse($('#hb-i18n').textContent); } catch (e) { /* ignorieren */ }
    var KAT = window.HB_KAT || {};
    var ul = $('[data-liste]', root), leer = $('[data-leer]', root), form = $('[data-form]', root), summeEl = $('[data-summe]', root), summeWert = $('[data-summe-wert]', root), vorschau = $('[data-vorschau]', root);
    /* Holzkiste: ein Eintrag mit Festpreis und Belegung (x.k); Name und Fachtexte je Sprache aus dem Katalog, unbekannte Sorten-Ids erscheinen als Id */
    var kisteInfo = function (x, kiste) {
      var L = (kiste.l || {})[I.lang] || (kiste.l || {}).de || {}, sorten = kiste.sorten || {};
      var faecher = (Array.isArray(x.k) ? x.k : []).map(function (s, i) {
        return { fach: (L.fach || [])[i] || String(i + 1), name: sorten[s] || String(s) };
      });
      return { name: L.n || KAT[x.i].n, meta: '', preis: kiste.preis, faecher: faecher, menge: kiste.menge };
    };
    var info = function (x) {
      var p = KAT[x.i] || { n: x.i, v: {} };
      if (p.kiste) return kisteInfo(x, p.kiste);
      var v = (p.v || {})[x.v] || { n: p.n, p: {} };
      var name = p.n + (p.m ? ' (' + v.n + ')' : '');
      var preis = x.g && v.p ? v.p[x.g] : undefined;
      return { name: name, meta: x.g || (Array.isArray(x.k) ? x.k.join(', ') : ''), preis: preis };
    };
    var label = function (x) { var d = info(x); return d.name + (d.meta ? ', ' + d.meta.replace(' ', NB) : ''); };
    var summe = function (a) { var s = 0, hat = false; a.forEach(function (x) { var p = info(x).preis; if (typeof p === 'number') { s += p * (x.n || 1); hat = true; } }); return hat ? s : null; };
    /* Felder über ihre IDs ansprechen: mit Formulardienst tragen die Eingaben dessen Feldnamen */
    var nameEl = document.getElementById('f-name'), mailEl = document.getElementById('f-mail'), telEl = document.getElementById('f-tel');
    var wunschText = function () {
      var r = $$('.wunsch input[type="radio"]', form);
      return r[1] && r[1].checked ? I.rueckruf : I.abholen;
    };
    // Eine Zeile je Position (gleicher Wortlaut für E-Mail-Vorschau und Direktversand)
    // Bei der Holzkiste folgen darunter, eingerückt, die vier Fächer mit den Flaschen
    var produktZeilen = function () {
      var z = [];
      lade().forEach(function (x) {
        var d = info(x), n = x.n || 1;
        if (typeof d.preis === 'number') z.push('- ' + n + ' x ' + label(x).split(NB).join(' ') + ': ' + d.preis + ' € ' + I.je + ' = ' + (d.preis * n) + ' €');
        else z.push('- ' + n + ' x ' + label(x).split(NB).join(' ') + ': ' + I.anfrage);
        (d.faecher || []).forEach(function (f) { z.push('    ' + f.fach + ': ' + f.name + ', ' + d.menge); });
      });
      return z;
    };
    var summeZeile = function () { var s = summe(lade()); return s === null ? '' : s + ' €'; };
    var mailText = function () {
      var L = [];
      L.push(I.anrede, '');
      L.push(I.name + ': ' + nameEl.value); L.push(I.mail + ': ' + mailEl.value);
      if (telEl.value) L.push(I.tel + ': ' + telEl.value);
      L.push(I.wunsch + ': ' + wunschText());
      L.push('', I.produkte + ':');
      produktZeilen().forEach(function (z) { L.push(z); });
      var s = summe(lade());
      if (s !== null) L.push('', I.summe + ': ' + s + ' €');
      L.push('', I.gruss, nameEl.value);
      return L;
    };
    var mailto = function () {
      var L = mailText();
      return 'mailto:' + I.an + '?subject=' + encodeURIComponent(I.betreff) + '&body=' + L.map(encodeURIComponent).join('%0D%0A');
    };
    var aktualisiere = function () {
      var a = lade(), s = summe(a);
      summeEl.hidden = s === null; if (s !== null) summeWert.textContent = euro(s);
      $$('li', ul).forEach(function (li, i) {
        var d = info(a[i]), n = a[i].n || 1, e = $('.pos-summe', li);
        if (e) e.textContent = typeof d.preis === 'number' ? euro(d.preis * n) : '';
      });
      if (vorschau) vorschau.textContent = mailText().join('\n');
    };
    var render = function () {
      var a = lade(); ul.innerHTML = '';
      leer.hidden = a.length > 0; ul.hidden = a.length === 0; form.hidden = a.length === 0;
      a.forEach(function (x, i) {
        var d = info(x), li = document.createElement('li');
        var h = '<div><div class="pos-name"></div><div class="pos-meta"></div></div><div class="pos-summe"></div><div class="pos-ctl"><label></label><input type="number" min="1" max="99" inputmode="numeric"><button type="button" class="linkknopf"></button></div>';
        li.innerHTML = h;
        $('.pos-name', li).textContent = d.name;
        var metaEl = $('.pos-meta', li);
        if (d.faecher) {
          /* Holzkiste: Festpreis, darunter eine Zeile je Fach mit dem Namen der Flasche */
          metaEl.textContent = euro(d.preis) + ' ' + (I.je || '');
          var fz = document.createElement('div'); fz.className = 'pos-faecher';
          d.faecher.forEach(function (f) { var r = document.createElement('div'); r.textContent = f.fach + ': ' + f.name; fz.appendChild(r); });
          metaEl.parentNode.appendChild(fz);
        } else metaEl.textContent = (d.meta ? d.meta.replace(' ', NB) : '') + (typeof d.preis === 'number' ? ' · ' + euro(d.preis) + ' ' + (I.je || '') : (d.meta ? ' · ' : '') + (I.anfrage || ''));
        var lab = $('label', li), inp = $('input', li), btn = $('button', li), idn = 'm-' + i;
        lab.textContent = I.menge; lab.setAttribute('for', idn); inp.id = idn; inp.value = x.n || 1;
        btn.textContent = I.entfernen; btn.setAttribute('aria-label', I.entfernen + ': ' + label(x) + (d.faecher ? ' (' + d.faecher.map(function (f) { return f.name; }).join(', ') + ')' : ''));
        inp.addEventListener('input', function () {
          var v = parseInt(inp.value, 10); if (!(v >= 1)) return;
          var l = lade().slice(); l[i].n = Math.min(99, v); sichere(l); aktualisiere();
        });
        btn.addEventListener('click', function () {
          var l = lade().slice(); l.splice(i, 1); sichere(l); render();
          var ziel = l.length ? $('input', ul) : $('[data-leer] .knopf', root); if (ziel) ziel.focus();
        });
        ul.appendChild(li);
      });
      aktualisiere();
    };
    form.addEventListener('input', aktualisiere);
    form.addEventListener('change', aktualisiere);
    /* Direktversand über den Formulardienst (nur wenn die Seite mit gesetzter Formular-Adresse gebaut wurde) */
    var direkt = I.direkt || null;
    /* Versteckte Felder füllen: Nachricht (Text wie die E-Mail-Vorschau), Positionen und Summe */
    var fuelleVersteckte = function () {
      var F = direkt.felder, f = form.elements;
      if (f[F.nachricht]) f[F.nachricht].value = mailText().join('\n');
      if (f[F.produkte]) f[F.produkte].value = produktZeilen().join('\n');
      if (f[F.summe]) f[F.summe].value = summeZeile();
    };
    /* Gemeinsamer Versand per fetch (Versandart 'fetch' und 'json'): Zustände, Erfolgsbox, Fehlerbox mit mailto-Rückfall */
    var sende = function (init) {
      var knopf = $('button[type="submit"]', form), knopfText = knopf.textContent;
      var erfolg = $('[data-erfolg]', root), fehlerBox = $('[data-sendefehler]', root), rueck = $('[data-mailto-rueckfall]', root);
      fehlerBox.hidden = true;
      knopf.disabled = true; knopf.setAttribute('aria-busy', 'true'); if (direkt.sendet) knopf.textContent = direkt.sendet;
      var zurueck = function () { knopf.disabled = false; knopf.removeAttribute('aria-busy'); knopf.textContent = knopfText; };
      var misslungen = function () {
        zurueck();
        var href = mailto(); rueck.href = href; form.setAttribute('data-mailto', href);
        fehlerBox.hidden = false; fehlerBox.focus();
      };
      if (!window.fetch) { misslungen(); return; }
      window.fetch(form.getAttribute('action'), init).then(function (r) {
        if (!r.ok) throw new Error('Status ' + r.status);
        zurueck(); form.hidden = true; erfolg.hidden = false; erfolg.focus();
      }).catch(misslungen);
    };
    var sendeFetch = function () {
      var fd = new FormData(form); /* enthält auch Felder, die ein Spamschutz-Skript ergänzt hat */
      fd.delete(direkt.felder.falle);
      sende({ method: 'POST', body: fd, headers: { Accept: 'application/json' } });
    };
    /* JSON-Body wie im nForms-Einbaucode; telefon (nur wenn ausgefüllt) und nachricht nur mit direkt.zusatzfelder; der Honigtopf wird nie mitgesendet */
    var sendeJson = function () {
      var F = direkt.felder, daten = {};
      daten[F.name] = nameEl.value.trim();
      daten[F.email] = mailEl.value.trim();
      daten[F.wunsch] = wunschText();
      daten[F.produkte] = produktZeilen().join('\n');
      daten[F.summe] = summeZeile();
      if (direkt.zusatzfelder) {
        if (telEl.value.trim() !== '') daten[F.telefon] = telEl.value.trim();
        daten[F.nachricht] = mailText().join('\n');
      }
      sende({ method: 'POST', body: JSON.stringify(daten), headers: { 'Content-Type': 'application/json', Accept: 'application/json' } });
    };
    form.addEventListener('submit', function (e) {
      var falle = direkt && form.elements[direkt.felder.falle];
      if (falle && falle.value !== '') { e.preventDefault(); return; } /* Honigtopf befüllt: nichts senden */
      var ok = true;
      [['f-name', 'e-name'], ['f-mail', 'e-mail']].forEach(function (p) {
        var f = document.getElementById(p[0]), fehler = document.getElementById(p[1]), gut = f.value.trim() !== '' && f.checkValidity();
        fehler.hidden = gut; f.setAttribute('aria-invalid', gut ? 'false' : 'true'); if (!gut && ok) { f.focus(); ok = false; }
      });
      if (!ok) { e.preventDefault(); return; }
      if (direkt) {
        if (direkt.versand === 'json') { e.preventDefault(); sendeJson(); return; }
        fuelleVersteckte();
        if (direkt.versand === 'fetch') { e.preventDefault(); sendeFetch(); }
        return; /* klassisch: der Browser sendet das Formular selbst */
      }
      e.preventDefault();
      var href = mailto(); form.setAttribute('data-mailto', href);
      window.location.href = href;
    });
    render();
  }

  /* ---------- Karte (Google Maps) erst nach Klick laden ----------
     Datenschutz: Vorher gibt es keine Anfrage an Google. Die Einwilligung wird bewusst nicht gespeichert (jedes Mal Klick). */
  $$('[data-karte]').forEach(function (box) {
    var knopf = $('[data-karte-laden]', box), flaeche = $('[data-karte-flaeche]', box);
    var quelle = box.getAttribute('data-karte-src');
    if (!knopf || !flaeche || !quelle) return;
    knopf.addEventListener('click', function () {
      var rahmen = document.createElement('iframe');
      rahmen.src = quelle;
      rahmen.title = box.getAttribute('data-karte-titel') || '';
      rahmen.loading = 'lazy';
      rahmen.referrerPolicy = 'no-referrer-when-downgrade';
      rahmen.setAttribute('allowfullscreen', '');
      flaeche.textContent = '';
      flaeche.appendChild(rahmen);
      flaeche.setAttribute('tabindex', '-1');
      flaeche.focus();
    });
  });

  /* ---------- Sprung zum Hauptprodukt (#produkt): nach dem Laden und bei nachladenden Bildern erneut ausrichten ---------- */
  (function () {
    if (location.hash !== '#produkt') return;
    var ziel = document.getElementById('produkt');
    if (!ziel) return;
    var nav = null;
    try { nav = performance.getEntriesByType('navigation')[0]; } catch (e) { /* ignorieren */ }
    if (nav && (nav.type === 'back_forward' || nav.type === 'reload')) return;
    var springe = function () { ziel.scrollIntoView({ block: 'start', behavior: 'auto' }); };
    var ende = Date.now() + 1500, fertig = false;
    var bilder = $$('img').filter(function (i) { return !i.complete; });
    var nachladen = function () { if (!fertig && Date.now() < ende) springe(); };
    bilder.forEach(function (i) { i.addEventListener('load', nachladen); i.addEventListener('error', nachladen); });
    var los = function () { springe(); setTimeout(function () { fertig = true; }, Math.max(0, ende - Date.now())); };
    if (document.readyState === 'complete') los(); else window.addEventListener('load', los);
  })();

  zaehlerUpdate();
  window.addEventListener('storage', function () { zaehlerUpdate(); });
})();
