# Hierber Brennerei: Website hierber-brennerei.lu (Neubau)

Statische Seite, Vanilla HTML/CSS/JS. Quellen in `site/`, Ausgabe in `dist/` (darf committet werden). Die alte 3D-Version (`index.html`, `keller-v2.html`, `js/`, `css/`, `v2/`, `vendor/`) bleibt unangetastet.

## Bauen und ansehen

```sh
export PATH=/opt/node22/bin:$PATH   # Node 22
npm install                          # einmalig (sharp, lighthouse)
node build.mjs                       # site/ -> dist/ (Seiten de + fr, Bilder, sitemap.xml, robots.txt)
python3 -m http.server 8770 -d dist  # http://localhost:8770
```

Prüfungen (dist/ muss auf Port 8770 laufen, Playwright unter `/opt/node22/lib/node_modules/playwright`, Chromium unter `/opt/pw-browsers`):

```sh
node tools/pruefe_daten.mjs      # Preise, Alkohol, Größen, Namen, JSON-LD gegen site/data/produkte.js
node tools/pruefe_links.mjs      # tote Links/Bilder
node tools/pruefe_notizen.mjs    # keine internen Notizen sichtbar
node tools/pruefe_kontrast.mjs   # WCAG-Kontraste der Farbpaare
node tools/pruefe_browser.mjs    # Konsole, Tabs, Merkliste, Filter, ohne JS, Fassreihe
node tools/screenshots.mjs <Ordner>
sh tools/lighthouse.sh http://localhost:8770/ /tmp/lh.json
```

## Aufbau

| Pfad | Inhalt |
|---|---|
| `build.mjs` | Bauskript, Basis-URL-Konstante `BASIS_URL` |
| `site/data/produkte.js` | Sorten, Preise, Alkohol (Kopie von `v2/data/produkte.js`, nicht ändern) |
| `site/data/etiketten.js` | Sorte -> flaches Etikett in `Fertige Etiquetten/` |
| `site/data/fluessigkeit.js`, `flaschen.js` | Flüssigkeitsfarbe, Flaschenform, Kappe, Produktfoto-Sorten |
| `site/data/serviervorschlaege.js`, `texte.js`, `anlaesse.js`, `gruppen.js`, `verwandt.js` | Entwurfstexte und Zuordnungen |
| `site/lib/*.mjs` | Seitenbausteine (Start, Sorte, Anfrage, Pflichtseiten, Flasche, Bildpipeline, i18n) |
| `site/assets/` | CSS, JS, Favicon; Schriften kommen aus `assets/fonts/` |

## Fotos übernehmen
Neue Bilder des Nutzers: Flaschenbilder (1024 × 1536) nach `fotos-flaschen/` (`<sorten-id>.png` = Hauptbild 0,5 L, gleichwertig `<sorten-id>-0-5l.png`; weitere Größen `<sorten-id>-<0-1l|0-2l|0-7l|1-0l|1-5l>.png`), Serviervorschläge (1448 × 1086) nach `fotos-ki/` (`<sorten-id>-<n>.png`), Basisflaschen nach `fotos-basis/`. Danach ein Befehl:

```sh
node tools/fotos_uebernehmen.mjs   # --ohne-build überspringt den Build, --browser startet zusätzlich die Browserprüfung
```

Er prüft Namen und Bildformat (nur Meldung), führt die Foto-Generatoren aus, baut `dist/`, startet die Prüfskripte und schreibt `FOTO-STAND.md` (Sorte × Größe). Die Sortenseite zeigt im Kopf das Hauptbild und tauscht beim Wählen einer Größe das Bild dieser Größe ein. Einzelheiten und Ablauf des Chefs: `CLAUDE.md`, Abschnitt „Fotos übernehmen“.

## Bilder ergänzen
Foto in `fotos/` legen, in `site/lib/bilder.mjs` (`FOTOS`) eintragen und mit `bild(IMG, 'foto-<dateiname-ohne-endung>', {...})` einsetzen. Die Pipeline erzeugt AVIF, WebP und JPEG in 480/960/1600 Breite (nie über die Quellbreite hinaus). Neues Etikett: Datei in `Fertige Etiquetten/` ersetzen, Zuordnung in `site/data/etiketten.js`. Produktfoto statt Etikett: `FOTO_SORTEN` in `site/data/flaschen.js`.

## Texte ändern
Entwurfstexte stehen in `site/data/*.js` und `site/lib/*.mjs`; im HTML tragen sie `data-todo="bestaetigen"` (mit `?todo` in der URL rot umrandet). Bestätigte Texte: Markierung im Code entfernen und in `TODO-INHALTE.md` abhaken. UI-Texte de/fr: `site/lib/i18n.mjs`. Preise und Alkohol nur in `site/data/produkte.js`.
# Hierber Brennerei – Digitalisierung

Projekt zur Neustrukturierung der Hierber Brennerei (Herborn, Luxemburg):
zentrale Datenbank, Fass-/Etikettenverwaltung, ERP (Rechnungen, Kasse, Steuern)
und neue Website (WordPress + WooCommerce, interaktive „Obstwiese“).

- Masterplan: [docs/MASTERPLAN.md](docs/MASTERPLAN.md)
- Erfassungsvorlage Produkte & Fässer: [vorlagen/Erfassungsvorlage_Produkte_Faesser.xlsx](vorlagen/Erfassungsvorlage_Produkte_Faesser.xlsx)
- Datenbank-Schema (PostgreSQL): [datenbank/README.md](datenbank/README.md)
- Klick-Prototyp Obstwiese: [website/prototyp/obstwiese.html](website/prototyp/obstwiese.html)
- Rechnungsprogramm: [rechnungsprogramm/README.md](rechnungsprogramm/README.md)
- Etiketten drucken mit LabelForge: [docs/ETIKETTEN.md](docs/ETIKETTEN.md)
