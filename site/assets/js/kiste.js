/* Holzkiste 4 x 0,2 l: Auswahl je Fach wechselt die Flasche in der Vorschau. Ohne JavaScript bleibt die Standardbelegung stehen. */
(function () {
  'use strict';
  var buehne = document.querySelector('[data-kiste-buehne]');
  if (!buehne) return;
  var fs = Array.prototype.slice.call(document.querySelectorAll('[data-kiste-wahl] [data-fach]'));
  var grund = buehne.querySelector('img.kiste-grund');
  var text = document.querySelector('[data-kiste-text]');
  var vorgeladen = {};

  function gewaehlt(f) { return f.querySelector('input:checked'); }

  function aktualisiere() {
    var namen = [], ids = [], alt = [];
    fs.forEach(function (f) {
      var r = gewaehlt(f);
      if (!r) return;
      var nr = f.getAttribute('data-fach');
      var bild = buehne.querySelector('[data-fach-bild="' + nr + '"]');
      if (bild && bild.getAttribute('data-sorte') !== r.value) {
        bild.src = '/img/kiste-' + r.value + '.webp';
        bild.setAttribute('data-sorte', r.value);
      }
      ids.push(r.value);
      namen.push(r.getAttribute('data-name'));
      alt.push(f.getAttribute('data-position') + ' ' + r.getAttribute('data-name'));
    });
    buehne.setAttribute('data-belegung', ids.join(','));
    if (grund) grund.alt = buehne.getAttribute('data-alt-vor') + ': ' + alt.join(', ') + '.';
    if (text) text.textContent = namen.join(', ');
  }

  fs.forEach(function (f) { f.addEventListener('change', aktualisiere); });

  /* Freisteller aller Sorten vorladen, damit der Wechsel ohne Flackern geht */
  fs[0] && Array.prototype.slice.call(fs[0].querySelectorAll('input')).forEach(function (r) {
    if (vorgeladen[r.value]) return;
    vorgeladen[r.value] = new Image();
    vorgeladen[r.value].src = '/img/kiste-' + r.value + '.webp';
  });
})();
