-- =====================================================================
--  Funktionstest mit Beispieldaten – NUR auf einer Testdatenbank ausführen!
--  psql -U postgres -d brennerei_test -f datenbank/001_schema.sql -f datenbank/900_test.sql
-- =====================================================================
\set ON_ERROR_STOP on
SET search_path TO brennerei, public;
BEGIN;

INSERT INTO benutzer (kuerzel, name, rolle) VALUES ('MH', 'Mario', 'inhaber') ON CONFLICT (kuerzel) DO NOTHING;

-- Produkt + Varianten
INSERT INTO produkt (sku, name_de, name_fr, obstart_id, produkttyp_id, alkohol_vol, beschreibung_de, herkunft_obst, online_sichtbar)
VALUES ('APF-BRD-001', 'Apfelbrand', 'Eau-de-vie de pomme',
        (SELECT id FROM obstart WHERE code='APF'), (SELECT id FROM produkttyp WHERE code='BRD'),
        40.0, 'Klarer Brand aus eigenen Streuobst-Äpfeln.', 'eigen', true);
INSERT INTO variante (produkt_id, fuellmenge_ml, ean, sku, gewicht_g, mindestbestand, mwst_satz_id, online_verkauf) VALUES
  ((SELECT id FROM produkt WHERE sku='APF-BRD-001'), 500, '5411234567890', 'APF-BRD-001-500', 950, 12, (SELECT id FROM mwst_satz WHERE code='NORMAL'), true),
  ((SELECT id FROM produkt WHERE sku='APF-BRD-001'), 200, NULL,            'APF-BRD-001-200', 420, 6,  (SELECT id FROM mwst_satz WHERE code='NORMAL'), true);

-- Preise: Standard + Handelspreis, mit Historie
INSERT INTO preisliste (variante_id, preis_netto, gueltig_ab, gueltig_bis) VALUES
  ((SELECT id FROM variante WHERE sku='APF-BRD-001-500'), 17.00, '2024-01-01', '2025-06-30'),
  ((SELECT id FROM variante WHERE sku='APF-BRD-001-500'), 18.50, '2025-07-01', NULL),
  ((SELECT id FROM variante WHERE sku='APF-BRD-001-200'),  9.50, '2025-07-01', NULL);
INSERT INTO preisliste (variante_id, kanal, preis_netto, gueltig_ab) VALUES
  ((SELECT id FROM variante WHERE sku='APF-BRD-001-500'), 'handel', 14.80, '2025-07-01');

-- Produktion: Maische -> Brennprotokoll -> Fass -> Befüllung
INSERT INTO maische_charge (chargennummer, obstart_id, rohstoff_kg, herkunft, eingemaischt_am)
VALUES ('M-2025-08', (SELECT id FROM obstart WHERE code='APF'), 1200, 'eigene Streuobstwiese', '2025-10-05');
INSERT INTO brennprotokoll (maische_charge_id, gebrannt_am, brenner_id, mittellauf_l, alkohol_vol)
VALUES ((SELECT id FROM maische_charge WHERE chargennummer='M-2025-08'), '2025-11-14', 1, 310, 68.0);

INSERT INTO fass (fassnummer, produkt_id, material, volumen_l, fuellstand_l, alkohol_vol, befuellt_am, lagerort_id) VALUES
  ('F-017', (SELECT id FROM produkt WHERE sku='APF-BRD-001'), 'edelstahl', 300, 300, 41.5, '2025-11-15', (SELECT id FROM lagerort WHERE code='FASSLAGER')),
  ('F-018', (SELECT id FROM produkt WHERE sku='APF-BRD-001'), 'edelstahl', 300, 300, 41.5, '2025-11-15', (SELECT id FROM lagerort WHERE code='FASSLAGER')),
  ('F-099', NULL, 'eiche', 225, 0, NULL, NULL, (SELECT id FROM lagerort WHERE code='FASSLAGER'));
UPDATE fass SET status='leer' WHERE fassnummer='F-099';
INSERT INTO fass_befuellung (fass_id, brennprotokoll_id, menge_l, alkohol_vol, befuellt_am, benutzer_id)
VALUES ((SELECT id FROM fass WHERE fassnummer='F-017'), 1, 300, 41.5, '2025-11-15', 1);

-- Fasswechsel: F-017 aktiv setzen
SELECT fass_wechseln((SELECT id FROM produkt WHERE sku='APF-BRD-001'), (SELECT id FROM fass WHERE fassnummer='F-017'), 1::smallint, 'Erstbefüllung');

-- Abfüllung: 60 × 500 ml und 40 × 200 ml am selben Tag -> zwei Losnummern
SELECT losnummer, anzahl_flaschen, liter_abgefuellt FROM abfuellung_buchen((SELECT id FROM variante WHERE sku='APF-BRD-001-500'), 60, 1::smallint, '2025-12-02');
SELECT losnummer, anzahl_flaschen, liter_abgefuellt FROM abfuellung_buchen((SELECT id FROM variante WHERE sku='APF-BRD-001-200'), 40, 1::smallint, '2025-12-02');

-- Verkauf: 12 Flaschen Hofladen, 3 Flaschen Bruch
SELECT lager_abgang((SELECT id FROM variante WHERE sku='APF-BRD-001-500'), 12, 'verkauf_hofladen', 'FLASCHENLAGER', 1::smallint, 'BON-0001', 'F017-251202');
SELECT lager_abgang((SELECT id FROM variante WHERE sku='APF-BRD-001-500'), 3, 'bruch', 'FLASCHENLAGER', 1::smallint);

-- Verkaufsbeleg (Spiegel)
INSERT INTO verkaufsbeleg (kanal, extern_ref, datum, netto_summe, mwst_summe, brutto_summe)
VALUES ('hofladen', 'BON-0001', '2025-12-03', 222.00, 37.74, 259.74);

\echo '=== Prüfungen ==='
\echo '--- aktueller Preis (erwartet 18.50 / Handel 14.80 / historisch 17.00)'
SELECT preis_aktuell((SELECT id FROM variante WHERE sku='APF-BRD-001-500')) AS standard,
       preis_aktuell((SELECT id FROM variante WHERE sku='APF-BRD-001-500'), 'handel') AS handel,
       preis_aktuell((SELECT id FROM variante WHERE sku='APF-BRD-001-500'), '*', '2025-03-01') AS historisch;
\echo '--- v_preis_aktuell (brutto 21.65, Grundpreis 43.30 €/l)'
SELECT sku, preis_netto, preis_brutto, grundpreis_brutto_je_l FROM v_preis_aktuell ORDER BY sku;
\echo '--- aktives Fass (F-017, Füllstand 300-30-8 = 262 l)'
SELECT sku, fassnummer, fuellstand_l FROM v_produkt_aktives_fass;
\echo '--- Losnummern (F017-251202 und F017-251202-2, kein doppeltes F)'
SELECT losnummer, anzahl_flaschen, liter_abgefuellt FROM abfuellung ORDER BY id;
\echo '--- Lagerbestand (500 ml: 60-12-3 = 45, 200 ml: 40)'
SELECT sku, bestand, mindestbestand, unter_mindestbestand FROM v_lagerbestand_gesamt ORDER BY sku;
\echo '--- Etikett-Sicht'
SELECT variante_sku, name_de, alkohol_vol, fuellmenge_ml, aktive_fassnummer, losnummer_vorschau, preis_brutto FROM v_etikett ORDER BY variante_sku;
\echo '--- Woo-Sync-Sicht'
SELECT variante_sku, obstart, wiese_symbol, preis_brutto, bestand_gesamt FROM v_woo_sync ORDER BY variante_sku;
\echo '--- Alkoholbilanz (Nov: 210.8 l.A. erzeugt; Dez: 38 l × 40 % = 15.2 abgefüllt, 15 Fl × 0.5 × 40 % = 3.0 Abgang)'
SELECT * FROM v_alkoholbilanz_monat;
\echo '--- Rückverfolgung'
SELECT losnummer, fassnummer, maische, gebrannt_am FROM v_rueckverfolgung ORDER BY losnummer;
\echo '--- Fasswechsel auf F-018, F-017 wird lagernd'
SELECT fass_wechseln((SELECT id FROM produkt WHERE sku='APF-BRD-001'), (SELECT id FROM fass WHERE fassnummer='F-018'), 1::smallint);
SELECT fassnummer, status, fuellstand_l FROM fass ORDER BY fassnummer;
SELECT f.fassnummer, fa.aktiv_seit IS NOT NULL AS seit, fa.aktiv_bis IS NOT NULL AS beendet FROM fass_aktiv fa JOIN fass f ON f.id=fa.fass_id ORDER BY fa.id;
\echo '--- Audit-Log Einträge je Tabelle'
SELECT tabelle, aktion, count(*) FROM audit_log GROUP BY 1,2 ORDER BY 1,2;

\echo '=== Schutzregeln (müssen fehlschlagen) ==='
SAVEPOINT s1;
DO $$ BEGIN
  PERFORM fass_wechseln((SELECT id FROM produkt WHERE sku='APF-BRD-001'), (SELECT id FROM fass WHERE fassnummer='F-099'), 1::smallint);
  RAISE EXCEPTION 'FEHLER: leeres Fass wurde aktiviert';
EXCEPTION WHEN OTHERS THEN
  IF SQLERRM LIKE 'FEHLER%' THEN RAISE; END IF;
  RAISE NOTICE 'OK abgewiesen: %', SQLERRM;
END $$;
ROLLBACK TO s1;
DO $$ BEGIN
  INSERT INTO preisliste (variante_id, preis_netto, gueltig_ab) VALUES ((SELECT id FROM variante WHERE sku='APF-BRD-001-500'), 19.00, '2025-09-01');
  RAISE EXCEPTION 'FEHLER: überlappender Preis akzeptiert';
EXCEPTION WHEN OTHERS THEN
  IF SQLERRM LIKE 'FEHLER%' THEN RAISE; END IF;
  RAISE NOTICE 'OK abgewiesen: %', SQLERRM;
END $$;
ROLLBACK TO s1;
DO $$ BEGIN
  INSERT INTO fass_aktiv (produkt_id, fass_id) VALUES ((SELECT id FROM produkt WHERE sku='APF-BRD-001'), (SELECT id FROM fass WHERE fassnummer='F-017'));
  RAISE EXCEPTION 'FEHLER: zweites aktives Fass akzeptiert';
EXCEPTION WHEN OTHERS THEN
  IF SQLERRM LIKE 'FEHLER%' THEN RAISE; END IF;
  RAISE NOTICE 'OK abgewiesen: %', SQLERRM;
END $$;
ROLLBACK TO s1;

ROLLBACK;  -- Testdaten verwerfen
\echo '=== Test beendet, alle Testdaten zurückgerollt ==='
