<?php
/**
 * Hierber Brennerei: Anfrage-Formular per SMTP verschicken (abhängigkeitsfrei, nur PHP 8 ohne Zusatzpakete).
 *
 * Ablauf: Die Anfrage-Seite sendet per fetch einen JSON-Body (POST) an dieses Skript. Es prüft die Eingaben,
 * begrenzt die Anfragen je IP-Adresse und verschickt zwei E-Mails über das Postfach der Brennerei:
 *   1. die Anfrage an den festen Empfänger aus den Einstellungen (Reply-To = Kundin),
 *   2. optional eine Kopie an die Kundin (Einstellung kopie_an_kundin).
 *
 * Antwort immer JSON: {"ok":true} oder {"ok":false,"fehler":"<kurzer Code>"}.
 * Interna (SMTP-Antworten, Pfade, Zugangsdaten) gehen nie an den Client.
 * Das Protokoll (error_log) enthält keine personenbezogenen Daten.
 *
 * Einstellungen: Eine PHP-Datei, die ein Array zurückgibt (Vorlage: server/anfrage-einstellungen.beispiel.php).
 * Reihenfolge der Suche: Umgebungsvariable HB_ANFRAGE_EINSTELLUNGEN, sonst <zwei Ebenen über diesem Ordner>/anfrage-einstellungen.php,
 * bei der Website im Web-Wurzelordner also eine Ebene über dem Web-Ordner (nicht abrufbar). Die Datei gehört nie ins Repository.
 */

declare(strict_types=1);

const HB_MAX_BYTES = 20480; // maximale Größe des Request-Bodys (20 KB)
const HB_SMTP_TIMEOUT = 15; // Sekunden für Verbindungsaufbau und jede einzelne Antwort
const HB_WUNSCH_DE = ['Abholen vor Ort', 'Bitte um Rückruf'];
const HB_WUNSCH_FR = ['Retrait sur place', 'Merci de me rappeler'];

/** Texte je Sprache (Wortlaut aus site/lib/i18n.mjs; die Kopie an die Kundin ist nur auf Deutsch bestätigt). */
function hb_texte(string $lang): array
{
    if ($lang === 'fr') {
        return [
            'betreff' => 'Demande via hierber-brennerei.lu',
            'anrede' => 'Bonjour, je souhaite demander les produits suivants :',
            'name' => 'Nom', 'mail' => 'E-mail', 'tel' => 'Téléphone', 'wunsch' => 'Votre souhait',
            'produkte' => 'Produits souhaités', 'summe' => 'Total (produits avec prix uniquement)',
            'gruss' => 'Cordialement',
        ];
    }
    return [
        'betreff' => 'Anfrage über hierber-brennerei.lu',
        'anrede' => 'Guten Tag, ich möchte gern folgende Produkte anfragen:',
        'name' => 'Name', 'mail' => 'E-Mail', 'tel' => 'Telefon', 'wunsch' => 'Ihr Wunsch',
        'produkte' => 'Gewünschte Produkte', 'summe' => 'Summe (nur Produkte mit Preis)',
        'gruss' => 'Mit freundlichen Grüßen',
    ];
}

// Kopie an die Kundin: Französisch ist nicht bestätigt, daher immer die deutsche Fassung.
const HB_KOPIE_BETREFF = 'Ihre Anfrage bei der Hierber Brennerei';
const HB_KOPIE_EINLEITUNG = 'Vielen Dank für Ihre Anfrage. Wir melden uns so bald wie möglich. Ihre Angaben:';

/** JSON-Antwort senden und beenden. */
function hb_antwort(int $status, array $daten, array $kopfzeilen = []): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    foreach ($kopfzeilen as $k) {
        header($k);
    }
    echo json_encode($daten, JSON_UNESCAPED_UNICODE);
    exit;
}

function hb_fehler(int $status, string $code, array $kopfzeilen = []): void
{
    hb_antwort($status, ['ok' => false, 'fehler' => $code], $kopfzeilen);
}

/** Protokoll ohne personenbezogene Daten (nur feste Texte, Schrittnamen und Statuscodes). */
function hb_protokoll(string $text): void
{
    error_log('anfrage.php: ' . $text);
}

/** Länge in Zeichen (UTF-8), ohne die mbstring-Erweiterung vorauszusetzen. */
function hb_zeichen(string $s): int
{
    return (int) preg_match_all('/./su', $s);
}

function hb_ist_utf8(string $s): bool
{
    return preg_match('//u', $s) === 1;
}

/** Einstellungen laden; null, wenn die Datei fehlt oder unbrauchbar ist. */
function hb_einstellungen_laden(): ?array
{
    $pfad = getenv('HB_ANFRAGE_EINSTELLUNGEN');
    if (!is_string($pfad) || $pfad === '') {
        $pfad = dirname(__DIR__, 2) . '/anfrage-einstellungen.php';
    }
    if (!is_file($pfad) || !is_readable($pfad)) {
        hb_protokoll('Einstellungsdatei fehlt oder ist nicht lesbar (HB_ANFRAGE_EINSTELLUNGEN bzw. Standardpfad prüfen).');
        return null;
    }
    $e = (static function (string $datei) {
        return require $datei;
    })($pfad);
    if (!is_array($e)) {
        hb_protokoll('Einstellungsdatei gibt kein Array zurück.');
        return null;
    }

    // Vorgaben für optionale Schlüssel
    $e += [
        'empfaenger' => 'info@hierber-brennerei.lu',
        'kopie_an_kundin' => true,
        'erlaubte_herkunft' => [],
        'limit_pro_stunde' => 5,
        'limit_ordner' => sys_get_temp_dir(),
        'smtp_benutzer' => '',
        'smtp_passwort' => '',
    ];

    // Pflichtangaben prüfen (ohne Werte ins Protokoll zu schreiben)
    $host = $e['smtp_host'] ?? '';
    $sicher = $e['smtp_sicherheit'] ?? '';
    $port = $e['smtp_port'] ?? 0;
    $fehlt = [];
    if (!is_string($host) || $host === '' || str_starts_with($host, 'SMTP-SERVER-')) {
        $fehlt[] = 'smtp_host';
    }
    if (!is_int($port) || $port < 1 || $port > 65535) {
        $fehlt[] = 'smtp_port';
    }
    if (!in_array($sicher, ['ssl', 'starttls', 'keine'], true)) {
        $fehlt[] = 'smtp_sicherheit';
    }
    // Ohne Verschlüsselung nur für lokale Tests: Zugangsdaten dürfen nie unverschlüsselt ins Netz.
    if ($sicher === 'keine' && is_string($host) && !in_array($host, ['localhost', '127.0.0.1', '::1', '[::1]'], true)) {
        $fehlt[] = 'smtp_sicherheit (keine nur für localhost)';
    }
    foreach (['absender', 'empfaenger'] as $k) {
        if (!is_string($e[$k] ?? null) || !hb_adresse_gueltig($e[$k])) {
            $fehlt[] = $k;
        }
    }
    if (!is_string($e['salz'] ?? null) || strlen($e['salz']) < 8 || str_starts_with($e['salz'], 'HIER-ZUFAELLIGEN')) {
        $fehlt[] = 'salz';
    }
    if (!is_int($e['limit_pro_stunde']) || $e['limit_pro_stunde'] < 1) {
        $fehlt[] = 'limit_pro_stunde';
    }
    if (!is_string($e['limit_ordner']) || $e['limit_ordner'] === '') {
        $fehlt[] = 'limit_ordner';
    }
    if (!is_array($e['erlaubte_herkunft'])) {
        $fehlt[] = 'erlaubte_herkunft';
    }
    if (!is_string($e['smtp_benutzer']) || !is_string($e['smtp_passwort'])) {
        $fehlt[] = 'smtp_benutzer/smtp_passwort';
    }
    if ($fehlt) {
        hb_protokoll('Einstellungen unvollständig oder ungültig: ' . implode(', ', $fehlt));
        return null;
    }
    return $e;
}

/** E-Mail-Adresse streng prüfen: Standardprüfung plus feste Zeichenmenge (keine Anführungszeichen, Kommentare, Leerzeichen). */
function hb_adresse_gueltig(string $a): bool
{
    return strlen($a) <= 200
        && filter_var($a, FILTER_VALIDATE_EMAIL) !== false
        && preg_match('/^[A-Za-z0-9.!#$%&\'*+\/=?^_`{|}~-]+@[A-Za-z0-9.-]+$/', $a) === 1;
}

/** Steuerzeichen (inklusive CR/LF) vorhanden? */
function hb_hat_steuerzeichen(string $s): bool
{
    return preg_match('/[\x00-\x1F\x7F]/', $s) === 1;
}

/** Mehrzeiliges Feld: Zeilenumbruch und Tabulator erlaubt, sonstige Steuerzeichen nicht. */
function hb_hat_steuerzeichen_mehrzeilig(string $s): bool
{
    return preg_match('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', $s) === 1;
}

/**
 * Anfrage-Inhalt prüfen. Gibt die bereinigten Felder zurück oder beendet mit 400.
 * Kopfzeilen-relevante Felder (name, email) dürfen keine Steuerzeichen enthalten (Schutz vor Header-Injection).
 */
function hb_felder_pruefen(array $in): array
{
    $text = static function (string $feld, bool $pflicht, int $min, int $max, bool $mehrzeilig = false) use ($in): string {
        $w = $in[$feld] ?? null;
        if ($w === null || $w === '') {
            if ($pflicht) {
                hb_fehler(400, $feld . '_fehlt');
            }
            return '';
        }
        if (!is_string($w) || !hb_ist_utf8($w)) {
            hb_fehler(400, $feld . '_ungueltig');
        }
        $w = trim($w);
        $steuer = $mehrzeilig ? hb_hat_steuerzeichen_mehrzeilig($w) : hb_hat_steuerzeichen($w);
        if ($steuer) {
            hb_fehler(400, $feld . '_ungueltig');
        }
        $len = hb_zeichen($w);
        if ($len < $min || $len > $max) {
            hb_fehler(400, $feld . ($len > $max ? '_zu_lang' : '_zu_kurz'));
        }
        return $w;
    };

    $lang = $in['lang'] ?? 'de';
    if (!is_string($lang) || !in_array($lang, ['de', 'fr'], true)) {
        hb_fehler(400, 'lang_ungueltig');
    }

    $name = $text('name', true, 2, 100);
    $email = $text('email', true, 3, 200);
    if (!hb_adresse_gueltig($email)) {
        hb_fehler(400, 'email_ungueltig');
    }
    $telefon = $text('telefon', false, 0, 40);
    if ($telefon !== '' && preg_match('/^[0-9 +()\-\/.]+$/', $telefon) !== 1) {
        hb_fehler(400, 'telefon_ungueltig');
    }
    $wunsch = $text('wunsch', false, 0, 100);
    if ($wunsch !== '' && !in_array($wunsch, array_merge(HB_WUNSCH_DE, HB_WUNSCH_FR), true)) {
        hb_fehler(400, 'wunsch_ungueltig');
    }
    $produkte = $text('produkte', true, 1, 8000, true);
    $summe = $text('summe', false, 0, 50);
    $nachricht = $text('nachricht', false, 0, 10000, true);

    return compact('lang', 'name', 'email', 'telefon', 'wunsch', 'produkte', 'summe', 'nachricht');
}

/** Mail-Inhalt: die Nachricht aus dem Formular, sonst aus den Einzelfeldern zusammengesetzt (Format wie mailText in site.js). */
function hb_inhalt(array $f): string
{
    if ($f['nachricht'] !== '') {
        return $f['nachricht'];
    }
    $t = hb_texte($f['lang']);
    $z = [$t['anrede'], ''];
    $z[] = $t['name'] . ': ' . $f['name'];
    $z[] = $t['mail'] . ': ' . $f['email'];
    if ($f['telefon'] !== '') {
        $z[] = $t['tel'] . ': ' . $f['telefon'];
    }
    if ($f['wunsch'] !== '') {
        $z[] = $t['wunsch'] . ': ' . $f['wunsch'];
    }
    $z[] = '';
    $z[] = $t['produkte'] . ':';
    $z[] = $f['produkte'];
    if ($f['summe'] !== '') {
        $z[] = '';
        $z[] = $t['summe'] . ': ' . $f['summe'];
    }
    $z[] = '';
    $z[] = $t['gruss'];
    $z[] = $f['name'];
    return implode("\n", $z);
}

/** Zeilenenden auf CRLF vereinheitlichen. */
function hb_crlf(string $s): string
{
    return preg_replace('/\r\n|\r|\n/', "\r\n", $s);
}

/** Kopfzeilenwert nach RFC 2047 kodieren (nur wenn nötig); lange Werte werden an Zeichengrenzen auf mehrere Wörter verteilt. */
function hb_kopf_kodieren(string $s): string
{
    if (preg_match('/^[\x20-\x7E]*$/', $s) === 1) {
        return $s;
    }
    $teile = [];
    $aktuell = '';
    foreach (preg_split('//u', $s, -1, PREG_SPLIT_NO_EMPTY) as $zeichen) {
        if (strlen($aktuell) + strlen($zeichen) > 45) { // 45 Bytes -> 60 Zeichen Base64 + 12 Zeichen Rahmen = 72 (<= 75)
            $teile[] = $aktuell;
            $aktuell = '';
        }
        $aktuell .= $zeichen;
    }
    if ($aktuell !== '') {
        $teile[] = $aktuell;
    }
    return implode("\r\n ", array_map(static fn(string $t): string => '=?UTF-8?B?' . base64_encode($t) . '?=', $teile));
}

/** Vollständige Nachricht (Kopfzeilen + Base64-Körper) mit CRLF-Zeilenenden bauen. */
function hb_nachricht_bauen(array $e, string $an, string $betreff, string $text, ?string $replyTo, bool $automatisch): string
{
    $domain = substr(strrchr($e['absender'], '@'), 1);
    $k = [
        'Date: ' . gmdate('D, d M Y H:i:s') . ' +0000',
        'From: ' . hb_kopf_kodieren('Hierber Brennerei – Website') . ' <' . $e['absender'] . '>',
        'To: ' . $an,
    ];
    if ($replyTo !== null) {
        $k[] = 'Reply-To: ' . $replyTo;
    }
    $k[] = 'Subject: ' . hb_kopf_kodieren($betreff);
    $k[] = 'Message-ID: <' . bin2hex(random_bytes(16)) . '@' . $domain . '>';
    $k[] = 'MIME-Version: 1.0';
    $k[] = 'Content-Type: text/plain; charset=UTF-8';
    $k[] = 'Content-Transfer-Encoding: base64';
    if ($automatisch) {
        $k[] = 'Auto-Submitted: auto-generated';
    }
    return implode("\r\n", $k) . "\r\n\r\n" . chunk_split(base64_encode(hb_crlf($text)), 76, "\r\n");
}

/** DATA-Block vorbereiten: Dot-Stuffing (Zeilen mit führendem Punkt verdoppeln), Abschluss mit CRLF.CRLF. */
function hb_smtp_datenblock(string $nachricht): string
{
    $nachricht = hb_crlf($nachricht);
    $nachricht = preg_replace('/^\./m', '..', $nachricht);
    if (!str_ends_with($nachricht, "\r\n")) {
        $nachricht .= "\r\n";
    }
    return $nachricht . ".\r\n";
}

/** Eine (ggf. mehrzeilige) SMTP-Antwort lesen. Gibt [Code, Zeilen] zurück. */
function hb_smtp_lesen($sock, string $schritt): array
{
    $zeilen = [];
    do {
        $z = '';
        do {
            $teil = fgets($sock, 2048);
            if ($teil === false) {
                throw new RuntimeException('SMTP ' . $schritt . ': keine Antwort');
            }
            $z .= $teil;
        } while (!str_ends_with($z, "\n"));
        $z = rtrim($z, "\r\n");
        if (strlen($z) < 3 || !ctype_digit(substr($z, 0, 3))) {
            throw new RuntimeException('SMTP ' . $schritt . ': ungültige Antwort');
        }
        $zeilen[] = $z;
        $weiter = strlen($z) > 3 && $z[3] === '-';
    } while ($weiter && count($zeilen) < 100);
    return [(int) substr($z, 0, 3), $zeilen];
}

function hb_smtp_schreiben($sock, string $daten): void
{
    $rest = $daten;
    while ($rest !== '') {
        $n = fwrite($sock, $rest);
        if ($n === false || $n === 0) {
            throw new RuntimeException('SMTP: Schreiben fehlgeschlagen');
        }
        $rest = substr($rest, $n);
    }
}

/** Befehl senden und die Antwort auf einen erwarteten Code prüfen. Ins Protokoll gehen nur Schritt und Code. */
function hb_smtp_befehl($sock, string $befehl, array $erwartet, string $schritt): array
{
    if (preg_match('/[\r\n]/', $befehl) === 1) {
        throw new RuntimeException('SMTP ' . $schritt . ': ungültiger Befehl');
    }
    hb_smtp_schreiben($sock, $befehl . "\r\n");
    return hb_smtp_erwarten($sock, $erwartet, $schritt);
}

function hb_smtp_erwarten($sock, array $erwartet, string $schritt): array
{
    [$code, $zeilen] = hb_smtp_lesen($sock, $schritt);
    if (!in_array($code, $erwartet, true)) {
        throw new RuntimeException('SMTP ' . $schritt . ': Code ' . $code);
    }
    return [$code, $zeilen];
}

/**
 * Eine Nachricht per SMTP verschicken.
 * Modi (smtp_sicherheit):
 *   'ssl'      implizites TLS (Port 465)
 *   'starttls' unverschlüsselt verbinden, dann STARTTLS (Port 587)
 *   'keine'    KEINE Verschlüsselung. NUR für lokale Tests gegen einen Test-Server auf demselben Rechner!
 *              Mit 'keine' würden Zugangsdaten im Klartext übertragen. Wird daher nur mit smtp_host = localhost akzeptiert.
 * Die Zertifikatsprüfung (Kette und Servername) bleibt in den Modi ssl/starttls immer eingeschaltet.
 * Wirft bei jedem Fehler eine RuntimeException mit einem Text ohne personenbezogene Daten.
 */
function hb_smtp_senden(array $e, string $von, string $an, string $nachricht): void
{
    $host = $e['smtp_host'];
    $port = $e['smtp_port'];
    $modus = $e['smtp_sicherheit'];

    $ctx = stream_context_create(['ssl' => [
        'verify_peer' => true,
        'verify_peer_name' => true,
        'allow_self_signed' => false,
        'peer_name' => $host,
        'SNI_enabled' => true,
        'crypto_method' => STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT,
    ]]);
    $ziel = ($modus === 'ssl' ? 'ssl://' : 'tcp://') . $host . ':' . $port;
    $sock = @stream_socket_client($ziel, $fehlerNr, $fehlerText, HB_SMTP_TIMEOUT, STREAM_CLIENT_CONNECT, $ctx);
    if ($sock === false) {
        throw new RuntimeException('SMTP: Verbindung fehlgeschlagen (Fehler ' . (int) $fehlerNr . ')');
    }
    stream_set_timeout($sock, HB_SMTP_TIMEOUT);

    try {
        hb_smtp_erwarten($sock, [220], 'Begrüßung');
        $ehlo = static function () use ($sock): array {
            $name = preg_replace('/[^A-Za-z0-9.-]/', '', (string) gethostname());
            [, $zeilen] = hb_smtp_befehl($sock, 'EHLO ' . ($name !== '' ? $name : 'localhost'), [250], 'EHLO');
            return $zeilen;
        };
        $zeilen = $ehlo();

        if ($modus === 'starttls') {
            if (!preg_grep('/^250[ -]STARTTLS\b/i', $zeilen)) {
                throw new RuntimeException('SMTP: STARTTLS nicht angeboten');
            }
            hb_smtp_befehl($sock, 'STARTTLS', [220], 'STARTTLS');
            $ok = @stream_socket_enable_crypto($sock, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT);
            if ($ok !== true) {
                throw new RuntimeException('SMTP: TLS-Aushandlung oder Zertifikatsprüfung fehlgeschlagen');
            }
            $zeilen = $ehlo();
        }

        if ($e['smtp_benutzer'] !== '') {
            $angeboten = '';
            foreach ($zeilen as $z) {
                if (preg_match('/^250[ -]AUTH[ =](.*)$/i', $z, $m)) {
                    $angeboten .= ' ' . strtoupper($m[1]);
                }
            }
            $verfahren = preg_split('/\s+/', trim($angeboten));
            if (in_array('LOGIN', $verfahren, true)) {
                hb_smtp_befehl($sock, 'AUTH LOGIN', [334], 'AUTH');
                hb_smtp_befehl($sock, base64_encode($e['smtp_benutzer']), [334], 'AUTH-Benutzer');
                hb_smtp_befehl($sock, base64_encode($e['smtp_passwort']), [235], 'AUTH-Passwort');
            } elseif (in_array('PLAIN', $verfahren, true)) {
                hb_smtp_befehl($sock, 'AUTH PLAIN ' . base64_encode("\0" . $e['smtp_benutzer'] . "\0" . $e['smtp_passwort']), [235], 'AUTH');
            } else {
                throw new RuntimeException('SMTP: kein unterstütztes Anmeldeverfahren angeboten');
            }
        }

        hb_smtp_befehl($sock, 'MAIL FROM:<' . $von . '>', [250], 'MAIL FROM');
        hb_smtp_befehl($sock, 'RCPT TO:<' . $an . '>', [250, 251], 'RCPT TO');
        hb_smtp_befehl($sock, 'DATA', [354], 'DATA');
        hb_smtp_schreiben($sock, hb_smtp_datenblock($nachricht));
        hb_smtp_erwarten($sock, [250], 'Nachrichtenende');
        try {
            hb_smtp_befehl($sock, 'QUIT', [221], 'QUIT');
        } catch (RuntimeException $x) {
            // Die Nachricht ist angenommen; ein Fehler beim Abmelden ist unerheblich.
        }
    } finally {
        fclose($sock);
    }
}

/**
 * Begrenzung je IP und Stunde. Gespeichert wird nur der SHA-256 der IP (mit Salz) und der Zeitpunkt,
 * Einträge älter als eine Stunde werden verworfen. Gibt true zurück, wenn die Anfrage erlaubt ist (und zählt sie).
 */
function hb_limit_pruefen(array $e, string $ip): bool
{
    $datei = rtrim($e['limit_ordner'], '/\\') . '/hb-anfrage-limit-' . substr(hash('sha256', 'datei|' . $e['salz']), 0, 12) . '.json';
    $fh = @fopen($datei, 'c+');
    if ($fh === false) {
        throw new RuntimeException('Begrenzung: Datei nicht beschreibbar');
    }
    try {
        if (!flock($fh, LOCK_EX)) {
            throw new RuntimeException('Begrenzung: Sperre nicht möglich');
        }
        @chmod($datei, 0600);
        $roh = stream_get_contents($fh);
        $daten = json_decode(is_string($roh) && $roh !== '' ? $roh : '[]', true);
        if (!is_array($daten)) {
            $daten = [];
        }
        $jetzt = time();
        $grenze = $jetzt - 3600;
        $neu = [];
        foreach ($daten as $hash => $zeiten) {
            if (!is_string($hash) || !is_array($zeiten)) {
                continue;
            }
            $zeiten = array_values(array_filter($zeiten, static fn($t): bool => is_int($t) && $t > $grenze));
            if ($zeiten) {
                $neu[$hash] = $zeiten;
            }
        }
        $schluessel = hash('sha256', $e['salz'] . '|' . $ip);
        $erlaubt = count($neu[$schluessel] ?? []) < $e['limit_pro_stunde'];
        if ($erlaubt) {
            $neu[$schluessel][] = $jetzt;
        }
        ftruncate($fh, 0);
        rewind($fh);
        fwrite($fh, (string) json_encode($neu));
        fflush($fh);
        flock($fh, LOCK_UN);
        return $erlaubt;
    } finally {
        fclose($fh);
    }
}

/** Haupteingang: eine Anfrage vollständig bearbeiten. */
function hb_anfrage_ausfuehren(): void
{
    ini_set('display_errors', '0');

    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        hb_fehler(405, 'methode', ['Allow: POST']);
    }
    $typ = strtolower(trim(explode(';', (string) ($_SERVER['CONTENT_TYPE'] ?? $_SERVER['HTTP_CONTENT_TYPE'] ?? ''))[0]));
    if ($typ !== 'application/json') {
        hb_fehler(415, 'inhaltstyp');
    }

    $e = hb_einstellungen_laden();
    if ($e === null) {
        hb_fehler(500, 'nicht_eingerichtet');
    }

    // Herkunft: Ist ein Origin-Header vorhanden, muss er in der Liste stehen. Fehlt er, wird erlaubt.
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        $herkunft = rtrim(strtolower(trim((string) $_SERVER['HTTP_ORIGIN'])), '/');
        $erlaubt = array_map(static fn($h): string => rtrim(strtolower(trim((string) $h)), '/'), $e['erlaubte_herkunft']);
        if (!in_array($herkunft, $erlaubt, true)) {
            hb_fehler(403, 'herkunft');
        }
    }

    $laenge = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
    if ($laenge > HB_MAX_BYTES) {
        hb_fehler(413, 'zu_gross');
    }
    $roh = file_get_contents('php://input', false, null, 0, HB_MAX_BYTES + 1);
    if ($roh === false) {
        hb_fehler(400, 'ungueltig');
    }
    if (strlen($roh) > HB_MAX_BYTES) {
        hb_fehler(413, 'zu_gross');
    }
    $in = json_decode($roh, true, 8);
    if (!is_array($in) || $in === [] || array_keys($in) === range(0, count($in) - 1)) { // Objekt erwartet, keine Liste
        hb_fehler(400, 'ungueltig');
    }

    // Honigtopf: Bots füllen das versteckte Feld. Still „Erfolg“ melden, nichts senden.
    $falle = $in['website'] ?? '';
    if ($falle !== '' && $falle !== null) {
        hb_antwort(200, ['ok' => true]);
    }

    $f = hb_felder_pruefen($in);

    try {
        $ip = (string) ($_SERVER['REMOTE_ADDR'] ?? '');
        if (!hb_limit_pruefen($e, $ip)) {
            hb_fehler(429, 'zu_viele_anfragen', ['Retry-After: 3600']);
        }
    } catch (RuntimeException $x) {
        hb_protokoll($x->getMessage());
        hb_fehler(500, 'intern');
    }

    $inhalt = hb_inhalt($f);

    // 1. Hauptmail an den festen Empfänger aus den Einstellungen (nie aus der Anfrage); Reply-To = Kundin
    try {
        $betreff = hb_texte($f['lang'])['betreff'];
        $nachricht = hb_nachricht_bauen($e, $e['empfaenger'], $betreff, $inhalt, $f['email'], false);
        hb_smtp_senden($e, $e['absender'], $e['empfaenger'], $nachricht);
    } catch (Throwable $x) {
        hb_protokoll('Hauptmail nicht gesendet: ' . $x->getMessage());
        hb_fehler(500, 'senden_fehlgeschlagen');
    }

    // 2. Kopie an die Kundin: Ein Fehler hier ändert nichts am Erfolg (die Anfrage ist angekommen).
    if ($e['kopie_an_kundin'] === true) {
        try {
            $text = HB_KOPIE_EINLEITUNG . "\n\n" . $inhalt;
            $kopie = hb_nachricht_bauen($e, $f['email'], HB_KOPIE_BETREFF, $text, null, true);
            hb_smtp_senden($e, $e['absender'], $f['email'], $kopie);
        } catch (Throwable $x) {
            hb_protokoll('Kopie an die Kundin nicht gesendet: ' . $x->getMessage());
        }
    }

    hb_antwort(200, ['ok' => true]);
}

// Nur für Skript-Tests der Hilfsfunktionen: HB_ANFRAGE_NUR_FUNKTIONEN vorher per define() setzen (nicht aus dem Web möglich).
if (!defined('HB_ANFRAGE_NUR_FUNKTIONEN')) {
    try {
        hb_anfrage_ausfuehren();
    } catch (Throwable $x) {
        hb_protokoll('Unerwarteter Fehler: ' . get_class($x));
        hb_fehler(500, 'intern');
    }
}
