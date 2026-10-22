// Anfrage (Merkliste), Impressum, Datenschutz.
import { KONTAKT } from '../data/produkte.js';
import { STR } from './i18n.mjs';
import { esc, pfad } from './util.mjs';
import { seite, folgt, TELEFON } from './layout.mjs';

// Formulardienst nForms.eu (Direktversand der Anfrage an info@hierber-brennerei.lu).
// aktion: Formular-Adresse (Ziel-URL des Formulars) aus dem nForms-Konto.
// skript: URL eines Spamschutz-Skripts („Shield“) aus dem nForms-Konto; wird nur auf /anfrage/ und nur mit gesetzter aktion eingebunden.
//   Aktuell leer: der nForms-Einbaucode enthält kein Spamschutz-Skript, der Schutz läuft über das Honigtopf-Feld (falle).
//   Bewusst nur dieses eine Skript: kein Statistik- oder Analyse-Skript von nForms, denn die Datenschutzerklärung sagt „kein Tracking“.
//   Ist skript gesetzt, erscheinen in datenschutz() zusätzlich die Spamschutz-Sätze.
// aktion leer lassen = bisheriges Verhalten (Anfrage per E-Mail-Programm, Datenschutzerklärung unverändert, Seite byte-gleich).
// versand: 'json' (Standard, entspricht dem nForms-Einbaucode): site.js sendet selbst per fetch einen JSON-Body
//     (Content-Type und Accept: application/json), zeigt Bestätigung bzw. Fehlermeldung mit E-Mail-Rückfall.
//   'fetch': wie 'json', aber als FormData (Accept: application/json); die versteckten Felder werden im Formular befüllt.
//   'klassisch': site.js prüft die Pflichtfelder, füllt die versteckten Felder (nachricht, produkte, summe) und lässt den Browser
//     das Formular normal per POST absenden; ein Skript (Shield) darf das Absenden übernehmen.
// felder: Feldnamen, wie nForms sie erwartet. name, email, wunsch, produkte, summe stammen aus dem nForms-Einbaucode (summe als Text mit „ €“).
//   telefon und nachricht (vollständiger E-Mail-Text) stehen NICHT im nForms-Beispiel; ob nForms zusätzliche Felder annimmt, ist nicht verifiziert.
//   falle = Honigtopf-Feld gegen Spam-Bots; bei Befüllung wird nichts gesendet und das Feld nie mitgesendet.
// zusatzfelder: true = telefon (nur wenn ausgefüllt) und nachricht mitsenden (nur bei versand 'json').
//   Liefert die Testanfrage einen 4xx-Fehler, auf false setzen, ohne Codeänderung; dann entfallen diese beiden Felder.
// avvAbgeschlossen: false, bis der Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO mit nForms bestätigt vorliegt.
//   Erst bei true nennt die Datenschutzerklärung den Vertrag (sonst stünde eine unbestätigte Tatsache auf der Seite).
// Ist aktion gesetzt, erscheint in datenschutz() ein Entwurfsabsatz (data-todo="bestaetigen"). Offen vor Livegang, alles nicht verifiziert:
//   - Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO: vom Betrieb noch anzufordern (hello@nforms.eu), vor Livegang bestätigen, dann avvAbgeschlossen auf true.
//   - Resend (Unterauftragsverarbeiter für den E-Mail-Versand): Sitz und Drittlandübermittlung nicht verifiziert;
//     ggf. Hinweis auf Drittland und Garantien (z. B. Standardvertragsklauseln) ergänzen.
//   - Angaben zu nForms (Name, Anschrift) stammen vom Betrieb laut Mitteilung von nForms; Serverstandort nicht geprüft, daher nicht genannt.
export const FORMULAR_DIENST = {
  aktion: 'https://api.nforms.eu/f/nf_y0u3pztm9o4x05lh8spdoimw725errly',
  skript: '',
  versand: 'json',
  zusatzfelder: true,
  avvAbgeschlossen: false,
  felder: { name: 'name', email: 'email', telefon: 'telefon', wunsch: 'wunsch', nachricht: 'nachricht', produkte: 'produkte', summe: 'summe', betreff: '_betreff', falle: 'website' },
};
const direktSenden = () => FORMULAR_DIENST.aktion.trim() !== '';
const versandArt = () => (['json', 'fetch'].includes(FORMULAR_DIENST.versand) ? FORMULAR_DIENST.versand : 'klassisch');

export function anfrageSeite(lang) {
  const t = STR[lang];
  const direkt = direktSenden();
  const json = direkt && versandArt() === 'json';
  const fetchen = direkt && versandArt() !== 'klassisch'; /* 'json' und 'fetch': Versand per fetch mit Statusboxen */
  const F = FORMULAR_DIENST.felder;
  const i18n = {
    lang, betreff: t.mailBetreff, anrede: t.mailAnrede, produkte: t.mailProdukte, je: t.mailEinzel, summe: t.mailSumme, anfrage: t.mailPreisAnfrage, gruss: t.mailGruss,
    name: t.feldName, mail: t.feldMail, tel: t.feldTel, wunsch: t.wunsch, abholen: t.wunschAbholen, rueckruf: t.wunschRueckruf, an: KONTAKT.mail,
    entfernen: t.entfernen, menge: t.spMenge, einzel: t.spEinzel, sumTab: t.spSumme, pflicht: t.pflicht, eintraege: [t.merklisteEintraege(0)], merkliste: t.merkliste,
  };
  // Nur bei gesetztem Formulardienst: Feldnamen und Versandart für site.js
  if (direkt) i18n.direkt = { felder: F, versand: versandArt(), zusatzfelder: FORMULAR_DIENST.zusatzfelder !== false, sendet: t.sendenLaeuft };
  // Feldnamen und Wunsch-Werte: mit Formulardienst die Namen von nForms (der Browser sendet sie direkt), sonst unverändert
  const nm = (alt, neu) => (direkt ? esc(neu) : alt);
  const wunschWert = (alt, text) => (direkt ? esc(text) : alt);
  const formAttr = direkt ? `action="${esc(FORMULAR_DIENST.aktion.trim())}" method="post"` : 'action="#"';
  const formId = direkt ? ' id="bestellformular"' : '';
  // Honigtopf und versteckte Felder (werden im submit-Ereignis befüllt, siehe site.js); bei 'json' baut site.js den Body selbst, es bleibt nur der Honigtopf
  const versteckt = json ? '' : `
        <input type="hidden" name="${esc(F.betreff)}" value="${esc(t.mailBetreff)}">
        <input type="hidden" name="${esc(F.nachricht)}">
        <input type="hidden" id="produkte" name="${esc(F.produkte)}">
        <input type="hidden" id="summe" name="${esc(F.summe)}">`;
  const falle = direkt ? `\n        <div class="hp-feld" aria-hidden="true"><input type="text" name="${esc(F.falle)}" tabindex="-1" autocomplete="off" aria-hidden="true"></div>${versteckt}` : '';
  const vorschauHtml = direkt ? '' : `\n        <details class="vorschau"><summary>${t.vorschau}</summary><pre data-vorschau></pre></details>`;
  const sendeHinweis = !direkt ? `<p class="hinweis-klein">${t.sendenHinweis}</p>`
    : t.sendenDirektHinweis ? `<p class="hinweis-klein">${t.sendenDirektHinweis(pfad(lang, '/datenschutz/'))}</p>` : folgt(t, 'hinweis-klein');
  // Statusboxen nur beim fetch-/json-Versand (Fehler mit E-Mail-Rückfall, Erfolg); Französisch bis zur Bestätigung mit Platzhalter
  const text = (s) => (s ? `<p>${s}</p>` : folgt(t));
  const fehlerBox = fetchen ? `\n        <div class="anfrage-status anfrage-status-fehler" role="alert" tabindex="-1" data-sendefehler hidden>${text(t.sendenFehler)}<p><a class="knopf" href="mailto:${KONTAKT.mail}" data-mailto-rueckfall>${t.senden}</a></p></div>` : '';
  const erfolgBox = fetchen ? `\n      <div class="anfrage-status" role="status" tabindex="-1" data-erfolg hidden>${text(t.sendenDanke)}</div>` : '';
  const inhalt = `<section class="sektion papier anfrage" aria-labelledby="h1">
  <div class="wrap schmal">
    <h1 id="h1">${t.anfrageTitel}</h1>
    <p class="lead-klein">${direkt && t.anfrageTextDirekt ? t.anfrageTextDirekt : t.anfrageText}</p>
    <div data-anfrage>
      <div class="leer" data-leer hidden><p>${t.leer}</p><p><a class="knopf" href="${pfad(lang, '/')}#theke">${t.zuDenBraenden}</a></p></div>
      <ul class="liste" role="list" data-liste hidden></ul>
      <p class="summe" data-summe hidden><span>${t.summe}</span> <strong data-summe-wert></strong> <span class="mwst">${t.preisHinweis}</span></p>
      <form class="anfrage-form"${formId} data-form ${formAttr} novalidate hidden>
        <div class="feld"><label for="f-name">${t.feldName}</label><input id="f-name" name="${nm('name', F.name)}" type="text" autocomplete="name" required aria-describedby="e-name"><p class="fehler" id="e-name" hidden>${t.pflicht}</p></div>
        <div class="feld"><label for="f-mail">${t.feldMail}</label><input id="f-mail" name="${nm('mail', F.email)}" type="email" autocomplete="email" required aria-describedby="e-mail"><p class="fehler" id="e-mail" hidden>${t.pflicht}</p></div>
        <div class="feld"><label for="f-tel">${t.feldTel}</label><input id="f-tel" name="${nm('tel', F.telefon)}" type="tel" autocomplete="tel"></div>
        <fieldset class="feld wunsch"><legend>${t.wunsch}</legend>
          <label class="chip-radio"><input type="radio" name="${nm('wunsch', F.wunsch)}" value="${wunschWert('abholen', t.wunschAbholen)}" checked><span>${t.wunschAbholen}</span></label>
          <label class="chip-radio"><input type="radio" name="${nm('wunsch', F.wunsch)}" value="${wunschWert('rueckruf', t.wunschRueckruf)}"><span>${t.wunschRueckruf}</span></label>
        </fieldset>${falle}
        <p><button type="submit" class="knopf">${direkt ? t.sendenDirekt : t.senden}</button></p>
        ${sendeHinweis}${fehlerBox}${vorschauHtml}
      </form>${erfolgBox}
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
  return seite({ lang, p: '/anfrage/', titel, beschreibung: beschr, inhalt, skripte: ['/assets/js/katalog.js', '/assets/js/site.js', ...(direkt && FORMULAR_DIENST.skript.trim() ? [FORMULAR_DIENST.skript.trim()] : [])], bodyClass: 'seite-anfrage' });
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
  const direkt = direktSenden();
  // Entwurf (data-todo="bestaetigen"), nur mit aktivem Formulardienst. Offene Punkte (nicht verifiziert) stehen bei FORMULAR_DIENST:
  // Vertrag nach Art. 28 DSGVO noch anzufordern, Sitz/Drittlandübermittlung von Resend ungeklärt.
  // Art.-28-Satz nur mit bestätigtem Vertrag (avvAbgeschlossen), Spamschutz-Satz nur mit gesetztem Skript
  const avv = FORMULAR_DIENST.avvAbgeschlossen === true ? ' Mit dem Anbieter besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO.' : '';
  const skriptGesetzt = direkt && FORMULAR_DIENST.skript.trim() !== '';
  const spam = skriptGesetzt ? ' Zum Schutz vor Spam lädt die Seite ‚Anfrage‘ ein Skript des Anbieters.' : '';
  const formularAbsatz = direkt ? `
    <h2>Anfrageformular</h2>
    <p data-todo="bestaetigen">Wenn Sie uns über das Formular auf der Seite ‚Anfrage‘ schreiben, übermitteln wir Ihre Angaben (Name, E-Mail-Adresse, freiwillig Telefonnummer, gewählte Sorten und Mengen sowie Ihren Wunsch nach Abholung oder Rückruf) an den Formulardienst nForms (Noah Kellner, Billerstraße 6, 86154 Augsburg, Deutschland), der sie in unserem Auftrag verarbeitet und per E-Mail an ${KONTAKT.mail} weiterleitet. Für den Versand der E-Mail setzt nForms den Dienst Resend ein.${avv}${spam} Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Bearbeitung Ihrer Anfrage). Wir nutzen Ihre Angaben nur zur Beantwortung der Anfrage und löschen sie, sobald sie dafür nicht mehr nötig sind und keine gesetzliche Aufbewahrungspflicht besteht. Sie können uns auch direkt per E-Mail an ${KONTAKT.mail} schreiben.</p>` : '';
  const body = lang === 'de' ? `<div data-todo="bestaetigen">
    <h2>Überblick</h2>
    <p>Diese Website ist eine statische Seite. Wir setzen keine Cookies und kein Tracking ein, binden keine Analyse- oder Werbedienste ein und laden keine Schriften oder Skripte von fremden Servern${skriptGesetzt ? ', mit Ausnahme des Spamschutzes auf der Seite ‚Anfrage‘ und der Karte auf der Startseite, die erst nach Ihrem Klick geladen wird' : ', mit Ausnahme der Karte auf der Startseite, die erst nach Ihrem Klick geladen wird'}.</p>
    <h2>Verantwortlicher</h2>
    <p>${esc(KONTAKT.firma)}, 2, Millewee, L-6665 Herborn, Luxemburg, <a href="mailto:${KONTAKT.mail}">${KONTAKT.mail}</a>.</p>
    <h2>Lokaler Speicher im Browser</h2>
    <p>Ihre Merkliste und die Bestätigung des Altershinweises speichert Ihr Browser lokal auf Ihrem Gerät (localStorage). Diese Daten werden nicht an uns oder Dritte übertragen. Sie können sie jederzeit in den Browsereinstellungen löschen.</p>
    <h2>Anfrage per E-Mail</h2>
    ${direkt ? '<p data-todo="bestaetigen">Schlägt das Senden über das Formular fehl, bietet die Seite an, Ihr E-Mail-Programm mit einem vorformulierten Text zu öffnen. Die Anfrage wird dann erst gesendet, wenn Sie sie selbst absenden. Wir verwenden Ihre Angaben nur, um Ihre Anfrage zu beantworten.</p>' : '<p>Die Schaltfläche „Anfrage per E-Mail vorbereiten“ öffnet Ihr E-Mail-Programm mit einem vorformulierten Text. Die Anfrage wird erst gesendet, wenn Sie sie selbst absenden. Wir verwenden Ihre Angaben nur, um Ihre Anfrage zu beantworten.</p>'}${formularAbsatz}
    <h2>Server-Protokolle</h2>
    <p>Beim Aufruf der Seite verarbeitet der Hosting-Anbieter technisch notwendige Verbindungsdaten (zum Beispiel IP-Adresse und Zeitpunkt). <span class="platzhalter-inline">[Hosting-Anbieter und Speicherdauer folgen]</span></p>
    <h2>Google Maps</h2>
    <p data-todo="bestaetigen">Auf der Startseite können Sie eine Karte mit unserem Standort anzeigen. Die Karte wird erst geladen, wenn Sie auf „Karte laden (Google Maps)“ klicken. Dabei werden Daten, unter anderem Ihre IP-Adresse, an Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Irland) übertragen, die Anbieterin von Google Maps im Europäischen Wirtschaftsraum. Google kann dabei Cookies setzen und Daten in die USA übertragen. Rechtsgrundlage ist Ihre Einwilligung durch den Klick (Art. 6 Abs. 1 lit. a DSGVO). Wir speichern Ihre Einwilligung nicht; beim nächsten Besuch müssen Sie erneut klicken. Mehr dazu in der <a href="https://policies.google.com/privacy" rel="noopener" target="_blank">Datenschutzerklärung von Google<span class="sr-only"> (neuer Tab)</span></a>.</p>
    <h2>Externe Links</h2>
    <p>Der Link zu Google Maps führt auf eine fremde Seite. Erst wenn Sie ihn anklicken, werden Daten an den Betreiber dieser Seite übertragen.</p>
    <h2>Ihre Rechte</h2>
    <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten sowie ein Beschwerderecht bei der Commission nationale pour la protection des données (CNPD) in Luxemburg.</p>
  </div>` : folgt(t);
  const inhalt = `<section class="sektion papier" aria-labelledby="h1"><div class="wrap schmal prose"><h1 id="h1">${t.dsTitel}</h1>${body}</div></section>`;
  return seite({ lang, p: '/datenschutz/', titel: `${t.dsTitel} | Hierber Brennerei`, beschreibung: lang === 'de' ? 'Datenschutzerklärung der Hierber Brennerei: keine Cookies, kein Tracking.' : 'Politique de confidentialité de la Hierber Brennerei : pas de cookies, pas de suivi.', inhalt, skripte: ['/assets/js/site.js'] });
}
