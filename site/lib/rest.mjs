// Anfrage (Merkliste), Impressum, Datenschutz.
import { KONTAKT } from '../data/produkte.js';
import { STR } from './i18n.mjs';
import { esc, pfad } from './util.mjs';
import { seite, folgt, TELEFON } from './layout.mjs';

export function anfrageSeite(lang) {
  const t = STR[lang];
  const i18n = {
    lang, betreff: t.mailBetreff, anrede: t.mailAnrede, produkte: t.mailProdukte, je: t.mailEinzel, summe: t.mailSumme, anfrage: t.mailPreisAnfrage, gruss: t.mailGruss,
    name: t.feldName, mail: t.feldMail, tel: t.feldTel, wunsch: t.wunsch, abholen: t.wunschAbholen, rueckruf: t.wunschRueckruf, an: KONTAKT.mail,
    entfernen: t.entfernen, menge: t.spMenge, einzel: t.spEinzel, sumTab: t.spSumme, pflicht: t.pflicht, eintraege: [t.merklisteEintraege(0)], merkliste: t.merkliste,
  };
  const inhalt = `<section class="sektion papier anfrage" aria-labelledby="h1">
  <div class="wrap schmal">
    <h1 id="h1">${t.anfrageTitel}</h1>
    <p class="lead-klein">${t.anfrageText}</p>
    <div data-anfrage>
      <div class="leer" data-leer hidden><p>${t.leer}</p><p><a class="knopf" href="${pfad(lang, '/')}#theke">${t.zuDenBraenden}</a></p></div>
      <ul class="liste" role="list" data-liste hidden></ul>
      <p class="summe" data-summe hidden><span>${t.summe}</span> <strong data-summe-wert></strong> <span class="mwst">${t.preisHinweis}</span></p>
      <form class="anfrage-form" data-form action="#" novalidate hidden>
        <div class="feld"><label for="f-name">${t.feldName}</label><input id="f-name" name="name" type="text" autocomplete="name" required aria-describedby="e-name"><p class="fehler" id="e-name" hidden>${t.pflicht}</p></div>
        <div class="feld"><label for="f-mail">${t.feldMail}</label><input id="f-mail" name="mail" type="email" autocomplete="email" required aria-describedby="e-mail"><p class="fehler" id="e-mail" hidden>${t.pflicht}</p></div>
        <div class="feld"><label for="f-tel">${t.feldTel}</label><input id="f-tel" name="tel" type="tel" autocomplete="tel"></div>
        <fieldset class="feld wunsch"><legend>${t.wunsch}</legend>
          <label class="chip-radio"><input type="radio" name="wunsch" value="abholen" checked><span>${t.wunschAbholen}</span></label>
          <label class="chip-radio"><input type="radio" name="wunsch" value="rueckruf"><span>${t.wunschRueckruf}</span></label>
        </fieldset>
        <p><button type="submit" class="knopf">${t.senden}</button></p>
        <p class="hinweis-klein">${t.sendenHinweis}</p>
        <details class="vorschau"><summary>${t.vorschau}</summary><pre data-vorschau></pre></details>
      </form>
    </div>
    <noscript><p class="hinweis">${t.merklisteHinweisKein}</p></noscript>
    <p class="direkt">${t.adresseText} <a href="mailto:${KONTAKT.mail}" data-mail-direkt>${KONTAKT.mail}</a></p>
  </div>
  <script type="application/json" id="hb-i18n">${JSON.stringify(i18n).replace(/</g, '\\u003c')}</script>
</section>`;
  const titel = lang === 'de' ? 'Anfrage senden | Hierber Brennerei, Herborn' : 'Envoyer une demande | Hierber Brennerei, Herborn';
  const beschr = lang === 'de'
    ? 'Merkliste zusammenstellen und die Anfrage per E-Mail an die Hierber Brennerei in Herborn senden: Sorten, Größen und Mengen, Abholung vor Ort oder Rückruf.'
    : 'Composez votre sélection et envoyez la demande par e-mail à la Hierber Brennerei à Herborn : variétés, contenances et quantités, retrait sur place ou rappel.';
  return seite({ lang, p: '/anfrage/', titel, beschreibung: beschr, inhalt, skripte: ['/assets/js/katalog.js', '/assets/js/site.js'], bodyClass: 'seite-anfrage' });
}

const ph = (t, txt) => `<span data-todo="bestaetigen" class="platzhalter-inline">[${esc(txt)}]</span>`;

export function impressum(lang) {
  const t = STR[lang];
  const folgtTxt = t.impFolgt;
  const inhalt = `<section class="sektion papier" aria-labelledby="h1"><div class="wrap schmal prose">
    <h1 id="h1">${t.impTitel}</h1>
    <dl class="impressum">
      <div><dt>${t.impFirma}</dt><dd>${esc(KONTAKT.firma)}</dd></div>
      <div><dt>${t.impAnschrift}</dt><dd>2, Millewee<br>L-6665 Herborn<br>Luxembourg</dd></div>
      <div><dt>${t.impMail}</dt><dd><a href="mailto:${KONTAKT.mail}">${KONTAKT.mail}</a></dd></div>
      <div><dt>${t.impTel}</dt><dd><span data-todo="bestaetigen">${TELEFON}</span></dd></div>
      <div><dt>${t.impRcs}</dt><dd>${ph(t, folgtTxt)}</dd></div>
      <div><dt>${t.impTva}</dt><dd>${ph(t, folgtTxt)}</dd></div>
      <div><dt>${t.impVertretung}</dt><dd>${ph(t, folgtTxt)}</dd></div>
    </dl>
  </div></section>`;
  return seite({ lang, p: '/impressum/', titel: `${t.impTitel} | Hierber Brennerei`, beschreibung: lang === 'de' ? 'Impressum der Hierber Brennerei Sàrl, 2, Millewee, L-6665 Herborn, Luxemburg.' : 'Mentions légales de la Hierber Brennerei Sàrl, 2, Millewee, L-6665 Herborn, Luxembourg.', inhalt, skripte: ['/assets/js/site.js'] });
}

export function datenschutz(lang) {
  const t = STR[lang];
  const body = lang === 'de' ? `<div data-todo="bestaetigen">
    <h2>Überblick</h2>
    <p>Diese Website ist eine statische Seite. Wir setzen keine Cookies und kein Tracking ein, binden keine Analyse- oder Werbedienste ein und laden keine Schriften oder Skripte von fremden Servern.</p>
    <h2>Verantwortlicher</h2>
    <p>${esc(KONTAKT.firma)}, 2, Millewee, L-6665 Herborn, Luxemburg, <a href="mailto:${KONTAKT.mail}">${KONTAKT.mail}</a>.</p>
    <h2>Lokaler Speicher im Browser</h2>
    <p>Ihre Merkliste und die Bestätigung des Altershinweises speichert Ihr Browser lokal auf Ihrem Gerät (localStorage). Diese Daten werden nicht an uns oder Dritte übertragen. Sie können sie jederzeit in den Browsereinstellungen löschen.</p>
    <h2>Anfrage per E-Mail</h2>
    <p>Die Schaltfläche „Anfrage per E-Mail vorbereiten“ öffnet Ihr E-Mail-Programm mit einem vorformulierten Text. Die Anfrage wird erst gesendet, wenn Sie sie selbst absenden. Wir verwenden Ihre Angaben nur, um Ihre Anfrage zu beantworten.</p>
    <h2>Server-Protokolle</h2>
    <p>Beim Aufruf der Seite verarbeitet der Hosting-Anbieter technisch notwendige Verbindungsdaten (zum Beispiel IP-Adresse und Zeitpunkt). <span class="platzhalter-inline">[Hosting-Anbieter und Speicherdauer folgen]</span></p>
    <h2>Externe Links</h2>
    <p>Der Link zu OpenStreetMap führt auf eine fremde Seite. Erst wenn Sie ihn anklicken, werden Daten an den Betreiber dieser Seite übertragen.</p>
    <h2>Ihre Rechte</h2>
    <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten sowie ein Beschwerderecht bei der Commission nationale pour la protection des données (CNPD) in Luxemburg.</p>
  </div>` : folgt(t);
  const inhalt = `<section class="sektion papier" aria-labelledby="h1"><div class="wrap schmal prose"><h1 id="h1">${t.dsTitel}</h1>${body}</div></section>`;
  return seite({ lang, p: '/datenschutz/', titel: `${t.dsTitel} | Hierber Brennerei`, beschreibung: lang === 'de' ? 'Datenschutzerklärung der Hierber Brennerei: keine Cookies, kein Tracking.' : 'Politique de confidentialité de la Hierber Brennerei : pas de cookies, pas de suivi.', inhalt, skripte: ['/assets/js/site.js'] });
}
