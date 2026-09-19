# Hierber Brennerei – Masterplan Digitalisierung & Neustrukturierung

Stand: 19.09.2026 · Status: Entwurf zur gemeinsamen Abstimmung

Dieses Dokument ist der Arbeitsplan für die komplette Neuorganisation der
wirtschaftlichen Abläufe der Hierber Brennerei (2, Millewee, L‑6665 Herborn).
Es wird Schritt für Schritt abgearbeitet und laufend ergänzt.
Offene Fragen stehen in Kapitel 10 – sie müssen beantwortet sein, bevor die
jeweilige Phase startet.

---

## 0. Kurzfassung (das Ziel in fünf Sätzen)

1. **Eine zentrale Datenbank** auf dem Netzwerkspeicher (NAS) ist die einzige
   Wahrheit für Produkte, Preise, Fässer/Chargen, Kunden, Lager und Rechnungen.
2. **Ein Wirtschaftsprogramm (ERP)** greift auf diese Datenbank zu: Rechnungen,
   Lieferscheine, Kasse im Hofladen, Lager, Steuerberichte, Akzisen‑Buch.
3. **Die Etiketten‑App** zieht Produktdaten und die *aktuell aktive Fassnummer*
   aus derselben Datenbank – keine handschriftlichen oder fix gedruckten Nummern mehr.
4. **Die neue Website (WordPress + WooCommerce)** wird automatisch aus der
   Datenbank mit Produkten und Preisen versorgt; Bestellungen fließen zurück ins ERP.
5. Alles ist **gesichert** (Backups, VPN, 2‑Faktor), **DSGVO‑konform** und
   liefert **Steuer‑ und Akzisenberichte** auf Knopfdruck (inkl. FAIA‑Export für Luxemburg).

---

## 1. Ist‑Analyse (Stand heute)

### 1.1 Bestehende Website hierber-brennerei.lu
Ermittelt über Suchmaschinen‑Index (direkter Abruf war aus der Arbeitsumgebung nicht möglich – bitte Screenshots nachliefern, siehe Frage F‑01).

| Merkmal | Befund |
|---|---|
| Technik | Statische HTML‑Seiten (`/brennerei.html`, `/produkte.html`, `/produkte/likor.html`, `/kontakt.html`) – kein CMS, kein Shop |
| Navigation | Start · Brennerei · Produkte (Unterseiten je Kategorie, z. B. Likör) · Kontakt |
| Inhalte | Betriebsbeschreibung (Umzug 2013 auf neuen Hof, Milchviehbetrieb mit Melkroboter, Heizung mit Abwärme der Brennerei), Herstellung (Waschen, Entsteinen, Entstielen, überwachte Gärung), Führungen mit Verkostung (ca. 2 Std., barrierefrei, Parkplätze) |
| Sortiment laut Text | >50 Sorten: ca. 40 Obstbrände (Apfel, Birne, Zwetschge, Mirabelle, Kirsche, …), Liköre, Gin, Rum, Whisky, Vodka, Korn, Marc, Sambuca, Kräuterbrand, „Vizdrëpp“ (Calvados‑Art); Zusatzsortiment: Honig (Sumsi.lu), Holzspielzeug, Keramik |
| Online‑Verkauf | **Nein** – nur Hofladen und Anfrage per Telefon/E‑Mail |
| Sprachen | Deutsch (Einträge bei Partnern auch FR/EN/LB) |
| Kontakt | Tel. +352 72 76 02 · Mobil +352 691 72 80 62 · info@hierber-brennerei.lu |
| Social | Facebook & Instagram „hierberbrennerei“ |

**Fazit:** Die Seite informiert, verkauft aber nicht, ist nicht interaktiv und
muss bei jeder Preisänderung von Hand gepflegt werden.

### 1.2 Interne Abläufe (laut deiner Beschreibung)
- Etiketten tragen eine **fix eingedruckte Fassnummer** → schwer nachvollziehbar, welches Fass gerade abgefüllt wird.
- Es existiert bereits eine **selbst gebaute App** zur Anzeige der aktuellen Fassnummer (Technik unbekannt – Frage F‑10).
- Preise, Rechnungen, Lager und Steuerunterlagen sind (vermutlich) auf mehrere Werkzeuge/Papier verteilt.
- Datenhaltung soll künftig auf einem **Netzwerkspeicher (NAS)** liegen.

---

## 2. Zielarchitektur

```
                       ┌─────────────────────────────────────────┐
                       │   NAS im Betrieb (z. B. Synology/QNAP)  │
                       │   Docker:                               │
                       │   ├─ PostgreSQL  ← zentrale Datenbank   │
                       │   ├─ ERP (Odoo Community)               │
                       │   ├─ Etiketten-Service (deine App)      │
                       │   ├─ Sync-Dienst  → WooCommerce         │
                       │   └─ Backup-Job (täglich, verschlüsselt)│
                       └───────────┬────────────┬────────────────┘
                                   │ LAN/VPN    │ HTTPS (nur ausgehend)
          ┌────────────────────────┤            │
          │                        │            ▼
   ┌──────┴──────┐        ┌────────┴──────┐  ┌──────────────────────────┐
   │ Büro-PC     │        │ Hofladen      │  │ Webhoster (EU)           │
   │ ERP-Web-UI  │        │ Kasse/Tablet  │  │ WordPress + WooCommerce  │
   │ Rechnungen  │        │ Etikettendruck│  │ „Obstwiese“-Frontend     │
   └─────────────┘        └───────────────┘  │ Zahlungen, Bestellungen  │
                                             └──────────┬───────────────┘
                                                        │ Webhook/REST
                                                        ▼
                                             Bestellungen → ERP (Rechnung, Lager)
```

### 2.1 Grundprinzipien
1. **Single Source of Truth**: Produkt, Preis, Fass, Bestand – jedes Datum existiert genau einmal (in PostgreSQL). Website, Etikett, Rechnung *lesen* daraus.
2. **Echte Datenbank statt Datei auf Netzlaufwerk**: Eine Access‑/SQLite‑Datei auf einer Freigabe geht bei gleichzeitigem Zugriff (Büro + Hofladen + Etikettendrucker) kaputt. Darum ein Datenbank‑*Server* (PostgreSQL) im Docker‑Container auf dem NAS.
3. **NAS niemals direkt im Internet**: Die Website liegt beim Hoster. Der Sync‑Dienst auf dem NAS *schiebt* Daten per HTTPS nach außen (WooCommerce‑REST‑API) und *holt* Bestellungen ab. Eingehende Verbindungen zum NAS nur über VPN (Tailscale/WireGuard).
4. **Offen & austauschbar**: Nur Open‑Source‑ oder Standard‑Komponenten, damit kein Anbieter‑Lock‑in entsteht und alles über Jahre wartbar bleibt.

### 2.2 Empfohlener Technologie‑Stack

| Baustein | Empfehlung | Warum |
|---|---|---|
| Datenbank | **PostgreSQL 16** (Docker auf NAS) | Robust, mehrbenutzerfähig, Standard bei Odoo |
| ERP / Wirtschaftsprogramm | **Odoo Community 17/18** (self‑hosted, kostenlos) – Alternative: Dolibarr | Rechnungen, Angebote, Kunden, Lager mit **Los‑/Chargennummern** (= Fassnummer), Kasse (POS), Berichte, **Luxemburg‑Lokalisierung inkl. FAIA‑Export** für die Steuerverwaltung, fertiger WooCommerce‑Connector |
| Etiketten | Eigene App (bestehend) → als kleiner Web‑Service angebunden an PostgreSQL; Druck via Etikettendrucker (Brother QL / Zebra) mit Vorlagen (ZPL/PDF) | Aktive Fassnummer, EAN‑Barcode, Loskennzeichnung, Alkoholgehalt, Füllmenge, Allergene automatisch |
| Website | **WordPress + WooCommerce**, Theme auf Block‑Basis (z. B. GeneratePress/Kadence) + eigener „Obstwiese“‑Block | Größtes Ökosystem, du kannst Inhalte selbst pflegen |
| Mehrsprachigkeit | Polylang oder WPML (DE / FR / LB / EN) | Luxemburgische Kundschaft ist mehrsprachig |
| Zahlung | **Payconiq** (Standard in LU), Stripe (Karte/Apple Pay/Google Pay), PayPal, Vorkasse | Payconiq ist in Luxemburg quasi Pflicht |
| Hosting | EU‑Hoster mit WordPress‑Erfahrung (z. B. Hostinger LU/DE, IONOS, oder luxemburgischer Anbieter wie LuxHosting/RootDC) | DSGVO, Nähe, Support |
| Backups | NAS‑Snapshots + verschlüsseltes Offsite‑Backup (Hetzner Storage Box / Backblaze B2) nach 3‑2‑1‑Regel | Ausfallsicherheit |
| Zugriff von unterwegs | Tailscale (WireGuard‑VPN) | Kostenlos, einfach, sicher |
| Monitoring | Uptime‑Kuma (Docker) für Website + Dienste | Du merkst Ausfälle vor den Kunden |

**Warum nicht alles selbst programmieren?** Rechnungswesen, Steuerregeln, Lager
und Kassenbuch sind juristisch heikel (Unveränderbarkeit von Rechnungen, FAIA,
Akzisen). Odoo bringt das fertig und geprüft mit. Deine Eigenentwicklung
konzentriert sich auf das, was es nirgends fertig gibt: **Fassverwaltung +
Etikettendruck + Obstwiese‑Website**.

---

## 3. Datenmodell (zentrale Datenbank)

Kern‑Tabellen (werden in Phase 1 finalisiert):

| Tabelle | Wichtige Felder |
|---|---|
| `obstart` (Kategorie) | id, name_de/fr/lb/en, symbol (Baum‑Grafik), reihenfolge |
| `produkt` | id, sku/artikelnummer, name, obstart_id, typ (Brand/Likör/Gin/Chips/…), alkohol_vol, beschreibung, allergene, aktiv, ean |
| `variante` | produkt_id, flaschengröße_ml (z. B. 50/200/350/500/700/1000), ean, gewicht, preis_netto, mwst_satz, preis_brutto, akzise_betrag |
| `fass` | id, fassnummer, produkt_id, holzart/Material, volumen_l, alkohol_vol, befüllt_am, herkunft_charge, status (lagernd/aktiv/leer) |
| `fass_aktiv` | produkt_id, fass_id, aktiv_seit, aktiv_bis, gesetzt_von → **das ist die Nummer, die aufs Etikett kommt** |
| `abfuellung` | fass_id, variante_id, datum, anzahl_flaschen, losnummer (z. B. `F<fassnr>-<JJMMTT>`), gedruckte_etiketten |
| `brennprotokoll` | datum, maische_charge, rohstoff_kg, ausbeute_l, alkohol_vol, brennerin/Brenner – Grundlage für das **Brennbuch** (Zoll) |
| `lagerbewegung` | variante_id, menge, grund (Abfüllung, Verkauf Hofladen, Verkauf Web, Bruch, Probe, Führung), beleg_ref |
| `kunde`, `rechnung`, `rechnungsposition`, `zahlung` | → in Odoo verwaltet, DB‑seitig gespiegelt/ausgelesen |
| `preisliste` | gültig_ab, variante_id, preis – **Preishistorie** für Nachvollziehbarkeit |

Regeln:
- Pro Produkt ist zu jedem Zeitpunkt **genau ein Fass aktiv**. Wechsel wird protokolliert (wer, wann).
- Etikett = Produkt + Variante + `fass_aktiv` zum Druckzeitpunkt + Losnummer.
- Preisänderung nur über `preisliste` → Website und Kasse übernehmen automatisch.

---

## 4. Website „Obstwiese“ – Konzept

### 4.1 Zielgruppe & 5‑Sekunden‑Regel
Besucher von 18 bis 80 Jahren. Innerhalb von 5 Sekunden muss klar sein:
**Wer** (Hierber Brennerei, Herborn), **Was** (Obstbrände & Liköre vom eigenen Hof),
**Wie weiter** (drei große Knöpfe: *Shop* · *So brennen wir* · *Besuch & Kontakt*).

Konkrete Regeln:
- Schriftgröße mindestens 18 px, hoher Kontrast, große Klickflächen (≥ 48 px).
- Klassisches Menü oben **immer** sichtbar – die spielerische Obstwiese ist ein *Zusatzweg*, nie der einzige.
- Ein Klick von jeder Seite zum Warenkorb; Kauf in maximal 3 Schritten.
- Barrierefrei (Tastatur, Screenreader, Alt‑Texte) – gesetzlich seit 2025 in der EU für viele Shops relevant.

### 4.2 Die Obstwiese (Startseite)
- **Hero**: Illustrierte/fotografische Obstwiese mit Hof im Hintergrund. Scrollen = „Spaziergang“ durch die Wiese (leichter Parallax‑Effekt, abschaltbar für „Bewegung reduzieren“).
- **Bäume = Kategorien**: Apfelbaum, Birnbaum, Zwetschgenbaum, Mirabellenbaum, Kirschbaum, Quitte …; daneben eine **Wacholderhecke** (Gin), ein **Fass‑Stapel** (Whisky/Rum/Vizdrëpp), ein **Kräutergarten** (Kräuterlikör), ein **Bienenstock** (Honig/Partnerprodukte).
- **Klick/Tipp auf einen Baum** → sanft aufklappendes Panel: alle Produkte dieser Obstart (Brand, Likör, Chips, Geschenkset) mit Bild, Preis, „In den Korb“. Daten kommen live aus WooCommerce (Kategorie = Obstart).
- **Hover/Fokus**: Baum wackelt leicht, Früchte leuchten – dezent, kein Kitsch.
- **Mobil**: Wiese wird zu horizontal wischbaren Baum‑Kacheln.
- **Mini‑Spiel (optional, Phase 5)**: „Ernte‑Quiz“ oder Gutschein‑Code hinter einem versteckten Baum – Kundenbindung.

### 4.3 Seitenstruktur
```
Start (Obstwiese)
├─ Shop
│  ├─ nach Obstart (Apfel, Birne, Zwetschge, Mirabelle, Kirsche, …)
│  ├─ nach Art (Brand, Likör, Gin, Whisky, Rum, Vodka, Chips, Geschenke)
│  └─ Geschenksets & Gutscheine
├─ So brennen wir  (Scroll-Story: Ernte → Maische → Gärung → Brennen → Fass → Flasche;
│                    animierte Schritte mit kurzen Texten + Video)
├─ Unser Hof        (Familie, Milchvieh, Melkroboter, Energie aus der Brennerei, Geschichte)
├─ Besuch & Führungen (Online-Anfrage/Buchung, Kalender, Gruppengröße, Preis)
├─ Aktuelles / Veranstaltungen (Märkte, Hofladen-Zeiten)
├─ Kontakt & Anfahrt (Karte, Öffnungszeiten Hofladen)
└─ Rechtliches: Impressum, Datenschutz, AGB, Widerruf, Versand, Altersnachweis
```

### 4.4 Shop‑Regeln für Alkohol (Luxemburg / EU)
- **Altersprüfung 18+** beim Betreten (Overlay) *und* beim Checkout (Pflicht‑Häkchen, Geburtsdatum); Versand nur mit Alterssichtprüfung (z. B. Post „Remise en main propre“ / DHL Ident).
- **Versandgebiet**: Start mit Luxemburg + Abholung im Hofladen. Versand nach DE/FR/BE ist **akzisenpflichtig im Zielland** (Verbrauchsteuer‑Fernverkauf, Steuervertreter nötig) → erst in Phase 6 nach Klärung mit Zoll/Fiduciaire.
- **Pflichtangaben je Produkt**: Alkoholgehalt (% vol), Füllmenge, Grundpreis (€/l), Loskennzeichnung, Allergene, Herkunft, Zutaten bei Likör (ab Dez. 2023 Zutaten/Nährwerte für Wein; für Spirituosen freiwillig, aber empfehlenswert via QR).
- **Keine Werbung an Minderjährige**, kein „Spiel“ das zum Trinken animiert – die Obstwiese bleibt Produkt‑Navigation, nicht Trink‑Spiel.

### 4.5 Sync Datenbank → WooCommerce
- Sync‑Dienst (Python, läuft im Docker auf dem NAS) alle 15 Min. bzw. bei Änderung:
  - Produkt/Variante/Preis/Bestand → WooCommerce REST API (`/wp-json/wc/v3/products`).
  - Bilder, Beschreibungen (mehrsprachig) → aus DB.
  - Bestellungen ← Woo‑Webhook „order.created“ → Odoo (Kunde, Rechnung, Lagerabgang).
- Nur **ausgehende** Verbindungen vom NAS; API‑Schlüssel mit minimalen Rechten; Protokoll jeder Änderung.

---

## 5. Fassverwaltung & Etikettendruck

### 5.1 Ablauf „Fasswechsel“
1. Brenner/in öffnet Etiketten‑App (Tablet im Abfüllraum, im LAN).
2. Wählt Produkt → sieht aktives Fass + Restmenge.
3. „Fass wechseln“ → wählt neues Fass aus Liste (nur Fässer mit Status *lagernd* und passendem Produkt) → Bestätigung mit Namen.
4. DB schreibt `fass_aktiv` (alt: `aktiv_bis`, neu: `aktiv_seit`), Restmenge alt = 0 → Status *leer*.
5. Ab jetzt drucken alle Etiketten dieses Produkts die neue Nummer.

### 5.2 Etikett
- Vorlage pro Flaschengröße (Vorder‑/Rückseite), Felder: Produktname, Obstart, % vol, ml, Fassnummer, Losnummer, EAN‑13, Abfülldatum, Pflichthinweise, QR‑Code zur Produktseite (Rückverfolgung + Marketing).
- Druck: Etikettendrucker im Netzwerk; Druckauftrag wird in `abfuellung` protokolliert (Anzahl, Datum) → automatische **Lagerzubuchung**.
- **Nachverfolgbarkeit**: Über Losnummer kann jede Flasche bis zum Fass und zur Maische‑Charge zurückverfolgt werden (Lebensmittelrecht Art. 18 VO 178/2002).

### 5.3 Bestehende App
Wird nach Sichtung (Frage F‑10) entweder direkt an PostgreSQL angebunden oder als Web‑App neu gebaut (Vorschlag: FastAPI‑Backend + einfache Weboberfläche, läuft überall im Browser, auch auf dem Tablet).

---

## 6. Wirtschaftsprogramm (ERP) – Odoo Community

Module & Konfiguration:
| Bereich | Odoo‑Modul | Einstellung für die Brennerei |
|---|---|---|
| Kunden/Lieferanten | Kontakte | Privat‑/Geschäftskunden, MwSt‑Nr. (Reverse‑Charge B2B EU) |
| Angebote & Rechnungen | Verkauf, Rechnungsstellung | Luxemburg‑Kontenplan (PCN), MwSt 17 % (Standard), 14 %, 8 %, 3 %; fortlaufende, unveränderbare Nummern; PDF mit Logo; **Peppol/e‑Rechnung** (Pflicht bei öffentlichen Auftraggebern in LU seit 2023, B2B‑Pflicht EU ab 2030 geplant) |
| Lager | Lager (Inventory) | Lose/Chargen = Fassnummer/Losnummer, Lagerorte: Fasslager, Flaschenlager, Hofladen; Mindestbestände |
| Kasse Hofladen | Point of Sale | Tablet + Bondrucker + Scanner, Payconiq/Karte/Bar, Tagesabschluss |
| Webshop | WooCommerce‑Connector | Bestellungen, Kunden, Bestände synchron |
| Einkauf | Einkauf | Flaschen, Korken, Etiketten, Zucker, Obst‑Zukauf |
| Buchhaltung | Rechnungswesen | Bank‑Import (CAMT/CSV von Spuerkeess/BGL/…), offene Posten, Mahnwesen |
| Berichte | Standard + eigene | siehe Kapitel 7 |

Rollen & Rechte: Inhaber (alles), Büro (Rechnungen/Buchhaltung), Hofladen (nur Kasse), Brennerei (nur Fass/Etiketten), Steuerberater (Lesezugriff Buchhaltung).

---

## 7. Steuern, Zoll & Berichte (Luxemburg)

Pflichten, die das System abdecken muss (Details mit Fiduciaire/Steuerberater bestätigen – Frage F‑20):

| Pflicht | Behörde | Lösung im System |
|---|---|---|
| MwSt‑Erklärung (monatlich/vierteljährlich/jährlich je Umsatz) | AED (Administration de l'enregistrement, des domaines et de la TVA) | Odoo‑Bericht nach Steuersatz, Export für eCDF |
| **FAIA** (Fichier d'Audit Informatisé AED) bei Prüfung | AED | Odoo‑LU‑Lokalisierung exportiert FAIA‑XML |
| **Akzisen / Verbrauchsteuer auf Alkohol** (Brennbuch, Lagerbuch, Monatsmeldung, Steuerlager‑Status) | Administration des douanes et accises | Tabellen `brennprotokoll`, `fass`, `abfuellung`, `lagerbewegung` → Bericht „Alkoholbilanz“ (Liter reiner Alkohol ein/aus/bestand) |
| Jahresabschluss / Einkommenssteuer (Landwirtschaft + Gewerbe) | ACD | Kontenplan PCN, Export an Fiduciaire (SIE/CSV) |
| Kassenbuch Hofladen | AED | POS‑Tagesabschlüsse, unveränderbar |
| Aufbewahrung 10 Jahre | – | Backup‑Konzept, unveränderbare PDF‑Archivierung |
| DSGVO | CNPD | Verarbeitungsverzeichnis, Datenschutzerklärung, Löschfristen, Auftragsverarbeitung mit Hoster |

Standardberichte (Knopfdruck):
1. Umsatz nach Monat / Kanal (Hofladen, Web, Gastronomie, Märkte) / Produkt / Obstart
2. MwSt‑Übersicht nach Satz
3. Alkoholbilanz (l.A. = Liter reiner Alkohol) pro Monat für den Zoll
4. Fass‑Historie & Losrückverfolgung
5. Lagerbewertung Stichtag (Fässer + Flaschen)
6. Offene Posten / Mahnliste
7. Deckungsbeitrag pro Produkt (Rohstoff, Flasche, Etikett, Akzise, Arbeit)

---

## 8. Sicherheit & Betrieb

- NAS: RAID, Snapshots täglich, Offsite‑Backup verschlüsselt, Wiederherstellungstest vierteljährlich.
- Zugänge: Passwort‑Manager (Bitwarden), 2‑Faktor überall (NAS, WordPress, Odoo, Hoster, Bank), eigene Benutzerkonten pro Person, keine geteilten Logins.
- WordPress: automatische Updates, Wordfence/Solid Security, tägliches Hoster‑Backup, Staging‑Kopie zum Testen, Let's Encrypt HTTPS, HSTS.
- Netzwerk: NAS nur im LAN + Tailscale; Gäste‑WLAN getrennt; Firewall am Router.
- Notfallplan (1 Seite): Was tun bei Ausfall NAS / Website / Kasse – Offline‑Kasse‑Modus in Odoo POS.

---

## 9. Phasenplan

| Phase | Inhalt | Ergebnis | Dauer (Schätzung) |
|---|---|---|---|
| **0 – Bestandsaufnahme** | Fragen in Kap. 10 beantworten, Produktliste/Preise/Fässer erfassen (Excel‑Vorlage kommt von mir), Screenshots alte Website, Sichtung Etiketten‑App | Vollständige Datengrundlage | 1–2 Wochen |
| **1 – Fundament** | NAS einrichten (Docker, PostgreSQL, Backups, Tailscale), Datenmodell anlegen, Import der Produkt‑/Fassdaten | Zentrale Datenbank läuft | 1–2 Wochen |
| **2 – Fass & Etikett** | Etiketten‑App an DB anbinden, Fasswechsel‑Ablauf, Vorlagen, Drucker | Etiketten mit richtiger Fassnummer | 2–3 Wochen |
| **3 – ERP** | Odoo installieren, LU‑Lokalisierung, Produkte/Preise aus DB, Rechnungen, Hofladen‑Kasse, Bank‑Import | Rechnungen & Kasse produktiv | 3–4 Wochen |
| **4 – Website Basis** | Hosting, WordPress + WooCommerce, Theme, Seiten, Sprachen, Zahlung (Payconiq/Stripe), Rechtstexte, Altersprüfung, Sync DB→Woo | Shop online (klassische Navigation) | 3–4 Wochen |
| **5 – Obstwiese** | Interaktive Startseite (SVG‑Illustration, Bäume, Panels, Mobil‑Variante), „So brennen wir“‑Story | Spielerische Website live | 2–3 Wochen |
| **6 – Berichte & Steuern** | Steuer‑/Akzisenberichte, FAIA‑Test, Abstimmung mit Fiduciaire, Jahresabschluss‑Export | Steuererklärung per Knopfdruck | 2 Wochen |
| **7 – Feinschliff** | Schulung, Notfallplan, Monitoring, Versand ins Ausland prüfen, Mini‑Spiel, Newsletter | Stabiler Dauerbetrieb | laufend |

Reihenfolge ist bewusst: **erst Daten, dann Werkzeuge, dann Schaufenster.**
Phasen 2, 3 und 4 können teilweise parallel laufen.

---

## 10. Offene Fragen (bitte beantworten – so ausführlich wie möglich)

### A. Betrieb & Rechtliches
- **F‑01** Kannst du Screenshots oder einen Export der aktuellen Website hierber-brennerei.lu liefern (alle Seiten, Produktliste, Bilder)? Wer hat die Domain/den Hoster (Zugangsdaten vorhanden)?
- **F‑02** Rechtsform des Betriebs (Landwirtschaftlicher Betrieb, Einzelunternehmen, S.à r.l.)? MwSt‑Nummer vorhanden? Wie oft wird die MwSt‑Erklärung abgegeben (monatlich/vierteljährlich/jährlich)?
- **F‑03** Gibt es eine Fiduciaire / Steuerberater? Welche Software nutzt sie (BOB, Sage, Winbooks, Odoo …)? Welches Format möchte sie von uns bekommen?
- **F‑04** Status beim Zoll: Steuerlager (entrepôt fiscal) oder versteuerte Ware? Wie wird das Brennbuch heute geführt (Papier/Excel)? Welche Meldungen gehen wie oft an die Douanes?
- **F‑05** Verkaufskanäle heute: Hofladen, Märkte, Gastronomie/Wiederverkäufer, Führungen, Online‑Anfragen? Ungefährer Anteil je Kanal?
- **F‑06** Soll versendet werden? Nur Luxemburg oder auch DE/FR/BE? Wer versendet heute (Post Luxembourg, DHL)?
- **F‑07** Wie viele Personen arbeiten mit dem System (Büro, Hofladen, Brennerei)? Wer soll was dürfen?

### B. Produkte & Fässer
- **F‑08** Gibt es bereits eine Produktliste mit Preisen (Excel, Word, Kassenausdruck)? Bitte schicken – auch wenn unvollständig.
- **F‑09** Welche Flaschengrößen gibt es? Gibt es EAN‑Barcodes (GS1‑Mitglied)? Wer macht Produktfotos?
- **F‑10** Die Fassnummer‑App: In welcher Sprache/Technik ist sie gebaut (Excel‑Makro, Python, Web, Android)? Wo laufen die Daten? Kannst du den Code oder Screenshots ins Repository legen?
- **F‑11** Wie viele Fässer gibt es ungefähr? Wie ist die Nummerierung heute aufgebaut? Kann ein Fass mehrere Produkte enthalten (z. B. Verschnitt)? Wie werden Fässer nachgefüllt?
- **F‑12** Wie werden Etiketten heute gedruckt (Drucker‑Modell, Software, Etikettenformat, Rolle/Bogen)? Gibt es Design‑Dateien (AI/PDF)?
- **F‑13** Welche Produkte gehören zu welchem „Baum“? Gibt es Produkte ohne Obst (Gin, Vodka, Whisky, Rum, Korn) – wie sollen die in der Obstwiese dargestellt werden (Fass‑Stapel, Wacholderhecke, Getreidefeld)?
- **F‑14** Apfelchips & Zusatzsortiment (Honig, Holzspielzeug, Keramik): eigene Herstellung oder Handelsware? Sollen sie online verkauft werden?

### C. Website
- **F‑15** Sprachen für die Website: Deutsch + Französisch + Luxemburgisch + Englisch? Welche zuerst?
- **F‑16** Stil der Obstwiese: gezeichnete Illustration (freundlich, zeitlos) oder Fotos vom echten Hof? Gibt es Logo/Farben/Schriften (Corporate Design)?
- **F‑17** Sollen Führungen online buchbar sein (Kalender, Bezahlung) oder nur anfragbar?
- **F‑18** Zahlungsarten: Payconiq‑Konto vorhanden? Bank (für Stripe/Payconiq‑Anbindung)?
- **F‑19** Newsletter / Kundenkonto / Gutscheine / Geschenkkarten gewünscht?

### D. Technik & Infrastruktur
- **F‑20** Welches NAS ist vorhanden oder geplant (Hersteller/Modell, Docker‑fähig, RAM)? Gibt es schon Backups?
- **F‑21** Internetanschluss im Betrieb (Anbieter, Geschwindigkeit, feste IP)? Router‑Modell?
- **F‑22** Welche Geräte gibt es: Büro‑PC (Windows/Mac), Tablet im Hofladen, Kassenhardware (Bondrucker, Scanner, Kassenschublade)?
- **F‑23** Bevorzugst du, dass Odoo/Datenbank auf dem NAS laufen oder auf einem kleinen Mini‑PC/Server neben dem NAS (leistungsfähiger, NAS bleibt reiner Speicher)?
- **F‑24** Budget‑Rahmen (Hosting ca. 10–30 €/Monat, Etikettendrucker 200–600 €, Kassenhardware 300–800 €, evtl. Illustrator für die Obstwiese 500–2 000 €)?

---

## 11. Nächste Schritte (sofort)

1. Du beantwortest die Fragen aus Kapitel 10 (gern in Stichworten, direkt hier im Chat oder als Datei im Repo).
2. Ich erstelle daraufhin: Excel‑Erfassungsvorlage für Produkte/Preise/Fässer, das finale Datenmodell (SQL), die Docker‑Konfiguration fürs NAS und einen Klick‑Prototyp der Obstwiese.
3. Wir starten Phase 1.

---

*Quellen der Ist‑Analyse:* Suchmaschinen‑Snippets von hierber-brennerei.lu, spiritsofluxembourg.lu, sou-schmaacht-letzebuerg.lu, editus.lu, naturpark-mellerdall.lu, whiskybase.com (Stand 19.09.2026).
