# Anfrage-Modul (E-Mail-Versand auf der eigenen Synology)

Die Seite „Anfrage“ (`/anfrage/`) schickt die Merkliste samt Kontaktdaten an das PHP-Skript
`api/anfrage.php`. Das Skript verschickt die Anfrage per SMTP über das Postfach
`info@hierber-brennerei.lu` (Anbieter POST Luxembourg). Es gibt keinen externen Formulardienst.

Was passiert bei einer Anfrage:

1. Die Anfrage kommt als JSON am Server an und wird geprüft (Pflichtfelder, Längen, Schutz vor Missbrauch).
2. Mail 1 geht an den festen Empfänger aus den Einstellungen (`empfaenger`, normalerweise `info@hierber-brennerei.lu`).
   Antworten (Reply-To) gehen direkt an die Kundin.
3. Mail 2 ist eine Kopie an die Kundin (abschaltbar mit `kopie_an_kundin`).
4. Auf dem Server wird nichts gespeichert, außer einem Hash der IP-Adresse mit Zeitpunkt (Begrenzung auf 5 Anfragen je IP und Stunde). Einträge älter als eine Stunde zählen nicht mehr und werden bei der nächsten Anfrage gelöscht; ohne weitere Anfragen bleiben sie bis dahin in der Datei.

## Dateien

| Datei | Zweck |
|---|---|
| `site/api/anfrage.php` | das Modul; der Build kopiert es nach `dist/api/anfrage.php` |
| `server/anfrage-einstellungen.beispiel.php` | Vorlage der Einstellungen (ohne Geheimnisse); wird **nicht** nach `dist/` kopiert |
| `anfrage-einstellungen.php` | die ausgefüllte Datei, **nur auf dem Server**; steht in `.gitignore` und gehört nie ins Repository |

## Einrichtung auf der Synology

Alle Menünamen unten sind **nicht verifiziert** (Stand DSM/Web Station nicht geprüft); sinngemäß vorgehen.

1. **PHP für die Website einschalten.** In der Web Station ein PHP-Profil mit PHP 8 anlegen (PHP 8.0 oder neuer;
   getestet wurde mit 8.3) und der Website (dem Webportal der Seite) zuweisen. Die Erweiterungen `openssl` und `json`
   müssen aktiv sein (bei PHP 8 ist `json` immer dabei). Die Erweiterung `mbstring` wird nicht benötigt.
   Kontrolle: `https://<Adresse der Website>/api/anfrage.php` im Browser öffnen. Es muss die Meldung
   `{"ok":false,"fehler":"methode"}` erscheinen (Statuscode 405), nicht der PHP-Quelltext und nicht „404“.
2. **Website hochladen.** Inhalt des Ordners `dist/` in den Web-Ordner der Website kopieren (inklusive `api/anfrage.php`).
3. **Einstellungen anlegen.**
   - `server/anfrage-einstellungen.beispiel.php` als `anfrage-einstellungen.php` (ohne „.beispiel“) auf die Synology kopieren,
     und zwar **eine Ebene über den Web-Ordner** der Website. Liegt die Website z. B. in `/volume1/web/hierber/`,
     gehört die Datei nach `/volume1/web/anfrage-einstellungen.php`. So findet das Modul sie von selbst
     (zwei Ebenen über `api/`), und sie ist nicht aus dem Internet abrufbar.
   - Alternative: die Datei an einen beliebigen Ort legen und den Pfad in der Umgebungsvariable `HB_ANFRAGE_EINSTELLUNGEN`
     setzen (in der Web Station am PHP-Profil; ob und wo die Web Station Umgebungsvariablen anbietet, ist nicht verifiziert).
   - Achtung: Wird `/volume1/web` selbst als Wurzel eines anderen Webportals ausgeliefert, liegt die Datei dort im Web-Bereich.
     Solange PHP dort läuft, gibt ein Abruf nur eine leere Seite zurück, der Quelltext bliebe verborgen; sicherer ist ein Ort
     außerhalb jedes Webportals und die Umgebungsvariable.
4. **Werte eintragen** (Schlüssel siehe Vorlage):
   - `smtp_host`: Postausgangsserver laut POST Luxembourg (Webmail-Hilfe oder Kundendienst fragen). **Nicht verifiziert**: der Servername.
   - `smtp_port` und `smtp_sicherheit`: meist Port 587 mit `'starttls'` oder Port 465 mit `'ssl'` (nicht verifiziert; POST Luxembourg fragen).
     Der Modus `'keine'` ist nur für Tests auf demselben Rechner gedacht und wird für andere Server abgelehnt.
   - `smtp_benutzer` und `smtp_passwort`: Zugangsdaten des Postfachs (meist die vollständige Adresse). Das Passwort steht **nur in dieser Datei auf der Synology**.
   - `absender`: `info@hierber-brennerei.lu` (sollte zum angemeldeten Postfach passen, sonst lehnt der Anbieter den Absender eventuell ab).
   - `erlaubte_herkunft`: die Adressen, von denen die Seite aufgerufen wird (`https://hierber-brennerei.lu`, `https://www.hierber-brennerei.lu`).
   - `limit_ordner`: Ordner, in den der Web-Server-Benutzer schreiben darf (Standard: temporärer Ordner des Systems).
   - `salz`: einmal einen langen Zufallstext (mindestens 32 Zeichen) selbst erzeugen und eintragen.
5. **Dateirechte.** Die Einstellungsdatei soll nur vom Web-Server-Benutzer (bei der Web Station meist `http`) lesbar sein,
   nicht für „Alle“ (Zielwert z. B. Besitzer lesen/schreiben, Gruppe/Andere nichts: `chmod 600`, Besitzer = Web-Server-Benutzer;
   ob die Web Station den Benutzer so benennt, ist nicht verifiziert). Der `limit_ordner` muss für diesen Benutzer beschreibbar sein.

## Test

1. Auf der Website zwei Produkte auf die Merkliste legen, `/anfrage/` öffnen, Formular ausfüllen und „Anfrage senden“ klicken.
   Erwartet: grüne Bestätigung „Vielen Dank! …“.
2. Postfach `info@hierber-brennerei.lu` prüfen: Anfrage mit dem Betreff „Anfrage über hierber-brennerei.lu“ (Antwort geht an die Kundin).
3. Postfach der angegebenen Test-Adresse prüfen: Kopie mit dem Betreff „Ihre Anfrage bei der Hierber Brennerei“ (auch im Spam-Ordner nachsehen).
4. Mehr als 5 Anfragen in einer Stunde von derselben IP lösen die Meldung „Die Anfrage konnte nicht gesendet werden“ mit E-Mail-Rückfall aus (so gewollt).

## Fehlersuche

Bei jedem Fehler zeigt die Seite die Meldung „Die Anfrage konnte nicht gesendet werden …“ mit einem Knopf, der das E-Mail-Programm öffnet.
Die Ursache steht im PHP-Fehlerprotokoll (Web Station: Protokoll bzw. Fehlerprotokoll des Webportals/PHP-Profils; genaue Menüpunkte nicht verifiziert).
Das Protokoll enthält nur feste Texte und Statuscodes, keine Namen oder Adressen. Die Einträge beginnen mit `anfrage.php:`.

| Antwort des Servers | Meist die Ursache |
|---|---|
| 500 `nicht_eingerichtet` | Einstellungsdatei fehlt oder ist unvollständig (Platzhalter noch drin, `salz` zu kurz). Pfad und Werte prüfen; das Protokoll nennt die Namen der fehlerhaften Schlüssel. |
| 500 `senden_fehlgeschlagen` | SMTP-Problem: Servername/Port/Modus falsch, Zugangsdaten falsch, Absender nicht erlaubt, Zertifikat nicht vertrauenswürdig (die Prüfung ist bewusst nicht abschaltbar). Das Protokoll nennt den SMTP-Schritt und den Statuscode. Eine ausgehende Verbindung der Synology zum Port muss erlaubt sein (Firewall/Router). |
| 500 `intern` | Begrenzungsdatei nicht beschreibbar (`limit_ordner`) oder unerwarteter Fehler. |
| 403 `herkunft` | Die Website wird von einer Adresse aufgerufen, die nicht in `erlaubte_herkunft` steht. |
| 429 `zu_viele_anfragen` | Mehr als `limit_pro_stunde` Anfragen von derselben IP. Läuft hinter einem Reverse Proxy der Synology, sieht das Modul möglicherweise nur die Adresse des Proxys, dann teilen sich alle Besucher das Limit (nicht verifiziert). |
| 400 `…_ungueltig` / `…_fehlt` / `…_zu_lang` | Eingabe passt nicht (z. B. Name kürzer als 2 Zeichen, Telefonnummer mit Buchstaben). |
| 405 / 415 / 413 | Kein POST, falscher Content-Type bzw. Anfrage größer als 20 KB. |
| 404 oder Quelltext statt JSON | PHP ist für die Website nicht aktiv oder die Datei liegt nicht unter `api/`. |

## GitHub Page (Test)

Auf der GitHub Page gibt es kein PHP. Der Versand schlägt dort fehl, die Seite zeigt die Fehlermeldung und bietet
den Rückfall an: Das E-Mail-Programm öffnet sich mit dem vorformulierten Text. Das ist gewollt; der Direktversand funktioniert nur auf der Synology.

## Hinweise

- Kopie an die Kundin: Der Betreff und Text der Kopie sind nur auf Deutsch festgelegt (französischer Wortlaut nicht bestätigt);
  auch französische Besucher erhalten die deutsche Kopie, bis ein bestätigter Text vorliegt.
- Schaltet man `kopie_an_kundin` ab, müssen der Satz „Sie erhalten eine Kopie per E-Mail“ unter dem Senden-Knopf
  (`site/lib/i18n.mjs`, `sendenDirektHinweis`) und die Datenschutzerklärung (`site/lib/rest.mjs`, Abschnitt „Anfrageformular“) angepasst werden.
- Die Texte unter dem Senden-Knopf und in der Datenschutzerklärung sind Entwürfe (`data-todo="bestaetigen"`) und vor dem Livegang zu bestätigen.
  Die Hinweise zu POST Luxembourg als E-Mail-Anbieter und zur Speicherung der IP-Adresse sind nicht verifiziert.
- Missbrauchsschutz: Honigtopf-Feld, Herkunftsprüfung, Begrenzung je IP, fester Empfänger. Wer die Kopie-Funktion missbraucht,
  kann an fremde Adressen eine Mail im Namen der Brennerei auslösen (höchstens `limit_pro_stunde` je IP und Stunde). Bei Bedarf `limit_pro_stunde` senken
  oder `kopie_an_kundin` abschalten.
- Unterstützte PHP-Version: 8.0 oder neuer (getestet mit 8.3). Es gibt keine Abhängigkeiten (kein Composer, kein PHPMailer).
- Anmeldeverfahren: AUTH LOGIN, sonst AUTH PLAIN. Welches Verfahren POST Luxembourg anbietet, ist nicht verifiziert.
