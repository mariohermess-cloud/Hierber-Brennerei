<?php
/**
 * Vorlage für die Einstellungen des Anfrage-Moduls (site/api/anfrage.php).
 *
 * So wird sie benutzt:
 *   1. Diese Datei als `anfrage-einstellungen.php` (ohne ".beispiel") kopieren, und zwar auf den Server (Synology)
 *      EINE EBENE ÜBER den Web-Ordner der Website (dort ist sie nicht aus dem Internet abrufbar)
 *      oder an einen beliebigen Ort und dessen Pfad in der Umgebungsvariable HB_ANFRAGE_EINSTELLUNGEN eintragen.
 *   2. Werte unten eintragen. Das Passwort steht NUR dort, nie im Repository.
 *   3. Dateirechte so setzen, dass nur der Web-Server-Benutzer die Datei lesen kann (siehe docs/ANFRAGE-MODUL.md).
 *
 * Diese Vorlage enthält bewusst keine Zugangsdaten und gehört unverändert ins Repository;
 * die ausgefüllte Datei `anfrage-einstellungen.php` nicht (steht in .gitignore).
 */

return [
    // Postausgangsserver laut POST Luxembourg (Webmail-Hilfe/Kundendienst); Port meist 587 (starttls) oder 465 (ssl) – nicht verifiziert
    'smtp_host' => 'SMTP-SERVER-VON-POST-EINTRAGEN',
    'smtp_port' => 587,

    // 'starttls' (Port 587), 'ssl' (implizites TLS, Port 465) oder 'keine'.
    // 'keine' ist NUR für lokale Tests mit smtp_host = 'localhost' gedacht (Zugangsdaten würden sonst im Klartext übertragen)
    // und wird für andere Server vom Modul abgelehnt. Im Betrieb 'starttls' oder 'ssl' verwenden; die Zertifikatsprüfung ist nicht abschaltbar.
    'smtp_sicherheit' => 'starttls',

    // Anmeldung am Postfach (meist die vollständige Adresse). Leer lassen = ohne Anmeldung.
    'smtp_benutzer' => 'info@hierber-brennerei.lu',

    // nur auf der Synology eintragen, nie ins Repository
    'smtp_passwort' => '',

    // Absenderadresse der Mails (Anzeigename „Hierber Brennerei – Website“ setzt das Modul selbst).
    // Sollte das Postfach sein, mit dem die Anmeldung erfolgt.
    'absender' => 'info@hierber-brennerei.lu',

    // Empfänger der Anfragen. Steht fest hier und wird nie aus der Anfrage übernommen.
    'empfaenger' => 'info@hierber-brennerei.lu',

    // true = die Kundin bekommt eine Kopie ihrer Anfrage. Der Hinweis unter dem Senden-Knopf der Anfrage-Seite
    // (site/lib/i18n.mjs, sendenDirektHinweis) und die Datenschutzerklärung (site/lib/rest.mjs) sagen heute „Sie erhalten eine Kopie“;
    // bei false müssen beide Texte angepasst werden.
    'kopie_an_kundin' => true,

    // Erlaubte Herkunft (Origin-Header) der Anfragen. Ohne Origin-Header (z. B. manche Browser/Werkzeuge) wird erlaubt.
    'erlaubte_herkunft' => ['https://hierber-brennerei.lu', 'https://www.hierber-brennerei.lu'],

    // Höchstzahl der Anfragen je IP-Adresse und Stunde. Gespeichert wird nur ein SHA-256-Wert der IP (mit Salz) und der Zeitpunkt; Einträge älter als eine Stunde werden bei der nächsten Anfrage gelöscht.
    'limit_pro_stunde' => 5,

    // Ordner für die Begrenzungsdatei; er muss für den Web-Server-Benutzer beschreibbar sein. Standard: der temporäre Ordner des Systems.
    'limit_ordner' => sys_get_temp_dir(),

    // Zufälliger Text (mindestens 8 Zeichen, besser 32 und mehr) als Salz für den IP-Hash; hier einmalig selbst erzeugen und eintragen.
    'salz' => 'HIER-ZUFAELLIGEN-TEXT-EINTRAGEN',
];
