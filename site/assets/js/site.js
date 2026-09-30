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
        karten.forEach(function (k) { k.hidden = !!aktiv && (k.getAttribute('data-anlass') || '').split(' ').indexOf(aktiv) < 0; });
        gruppen.forEach(function (g) { g.hidden = $$('.karte-li:not([hidden])', g).length === 0; });
        if (status) {
          var n = $$('.theke .karte-li:not([hidden])').length;
          status.textContent = aktiv ? (n === 1 ? status.getAttribute('data-tpl-eins') : status.getAttribute('data-tpl').replace(/^0/, n)) : '';
        }
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
    kauf.addEventListener('change', zeige);
    zeige();
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

  /* ---------- Anfrage-Seite ---------- */
  var root = $('[data-anfrage]');
  if (root) {
    var I = {}; try { I = JSON.parse($('#hb-i18n').textContent); } catch (e) { /* ignorieren */ }
    var KAT = window.HB_KAT || {};
    var ul = $('[data-liste]', root), leer = $('[data-leer]', root), form = $('[data-form]', root), summeEl = $('[data-summe]', root), summeWert = $('[data-summe-wert]', root), vorschau = $('[data-vorschau]', root);
    var info = function (x) {
      var p = KAT[x.i] || { n: x.i, v: {} }, v = (p.v || {})[x.v] || { n: p.n, p: {} };
      var name = p.n + (p.m ? ' (' + v.n + ')' : '');
      var preis = x.g && v.p ? v.p[x.g] : undefined;
      return { name: name, meta: x.g || '', preis: preis };
    };
    var label = function (x) { var d = info(x); return d.name + (d.meta ? ', ' + d.meta.replace(' ', NB) : ''); };
    var summe = function (a) { var s = 0, hat = false; a.forEach(function (x) { var p = info(x).preis; if (typeof p === 'number') { s += p * (x.n || 1); hat = true; } }); return hat ? s : null; };
    var mailText = function () {
      var a = lade(), f = form.elements, L = [];
      L.push(I.anrede, '');
      L.push(I.name + ': ' + f.name.value); L.push(I.mail + ': ' + f.mail.value);
      if (f.tel.value) L.push(I.tel + ': ' + f.tel.value);
      var w = $$('input[name="wunsch"]', form).filter(function (r) { return r.checked; })[0];
      L.push(I.wunsch + ': ' + (w && w.value === 'rueckruf' ? I.rueckruf : I.abholen));
      L.push('', I.produkte + ':');
      a.forEach(function (x) {
        var d = info(x), n = x.n || 1;
        if (typeof d.preis === 'number') L.push('- ' + n + ' x ' + label(x).replace(NB, ' ') + ': ' + d.preis + ' € ' + I.je + ' = ' + (d.preis * n) + ' €');
        else L.push('- ' + n + ' x ' + label(x).replace(NB, ' ') + ': ' + I.anfrage);
      });
      var s = summe(a);
      if (s !== null) L.push('', I.summe + ': ' + s + ' €');
      L.push('', I.gruss, f.name.value);
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
      vorschau.textContent = mailText().join('\n');
    };
    var render = function () {
      var a = lade(); ul.innerHTML = '';
      leer.hidden = a.length > 0; ul.hidden = a.length === 0; form.hidden = a.length === 0;
      a.forEach(function (x, i) {
        var d = info(x), li = document.createElement('li');
        var h = '<div><div class="pos-name"></div><div class="pos-meta"></div></div><div class="pos-summe"></div><div class="pos-ctl"><label></label><input type="number" min="1" max="99" inputmode="numeric"><button type="button" class="linkknopf"></button></div>';
        li.innerHTML = h;
        $('.pos-name', li).textContent = d.name;
        $('.pos-meta', li).textContent = (d.meta ? d.meta.replace(' ', NB) : '') + (typeof d.preis === 'number' ? ' · ' + euro(d.preis) + ' ' + (I.je || '') : (d.meta ? ' · ' : '') + (I.anfrage || ''));
        var lab = $('label', li), inp = $('input', li), btn = $('button', li), idn = 'm-' + i;
        lab.textContent = I.menge; lab.setAttribute('for', idn); inp.id = idn; inp.value = x.n || 1;
        btn.textContent = I.entfernen; btn.setAttribute('aria-label', I.entfernen + ': ' + label(x));
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
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      [['name', 'e-name'], ['mail', 'e-mail']].forEach(function (p) {
        var f = form.elements[p[0]], fehler = document.getElementById(p[1]), gut = f.value.trim() !== '' && f.checkValidity();
        fehler.hidden = gut; f.setAttribute('aria-invalid', gut ? 'false' : 'true'); if (!gut && ok) { f.focus(); ok = false; }
      });
      if (!ok) return;
      var href = mailto(); form.setAttribute('data-mailto', href);
      window.location.href = href;
    });
    render();
  }

  zaehlerUpdate();
  window.addEventListener('storage', function () { zaehlerUpdate(); });
})();
