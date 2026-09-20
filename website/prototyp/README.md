# Klick-Prototyp „Obstwiese“

Eine einzelne HTML-Datei ohne Abhängigkeiten (außer Google Fonts). Zum Testen
`obstwiese.html` in einen Browser ziehen oder als Artifact öffnen.

Was der Prototyp zeigt:

- Kopfzeile mit drei großen Knöpfen (Shop, So brennen wir, Besuch & Kontakt) und Warenkorb, immer sichtbar.
- Altersprüfung 18+ beim ersten Aufruf (pro Browser-Sitzung gemerkt).
- Obstwiese als SVG: Apfel, Birne, Zwetschge, Mirabelle, Kirsche, Quitte als Bäume, Wacholderhecke für Gin, Fass-Stapel für Whisky und Rum, Kräutergarten. Auf dem Handy seitlich wischbar.
- Klick oder Tastatur (Tab + Enter) auf einen Baum öffnet ein Panel mit den Produkten dieser Obstart, inklusive Grundpreis je Liter.
- „In den Korb“ zählt hoch und zeigt eine Bestätigung. Der echte Warenkorb kommt von WooCommerce.
- Abschnitt „So brennen wir“ mit sechs Schritten, Abschnitt Besuch und Kontakt, Fußzeile mit Rechtstexten.
- Hell- und Dunkelmodus, reduzierte Bewegung wird respektiert, Schrift mindestens 18 px.

Die Produktdaten stehen oben im Skript als `KATEGORIEN`. In der echten Website
kommen sie aus der Sicht `v_woo_sync` der Datenbank über WooCommerce.
Die Zeichnung ist ein Platzhalter für die spätere Illustration.
