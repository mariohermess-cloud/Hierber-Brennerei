-- =====================================================================
--  Hierber Brennerei – zentrales Datenmodell (PostgreSQL 16)
--  Datei: datenbank/001_schema.sql
--
--  Zweck: Einzige Wahrheit für Produkte, Preise, Fässer, Chargen,
--         Abfüllungen, Lager, Etiketten und Verkaufskanäle.
--         ERP (Odoo), Etiketten-App und Website-Sync lesen/schreiben hier.
--
--  Anwenden:   psql -U postgres -d brennerei -f datenbank/001_schema.sql
--  Idempotent: kann mehrfach ausgeführt werden (IF NOT EXISTS / OR REPLACE).
-- =====================================================================

\set ON_ERROR_STOP on

CREATE EXTENSION IF NOT EXISTS btree_gist;   -- für Exklusions-Constraints (nur ein aktives Fass)
CREATE EXTENSION IF NOT EXISTS pgcrypto;     -- gen_random_uuid()

CREATE SCHEMA IF NOT EXISTS brennerei;
SET search_path TO brennerei, public;

-- ---------------------------------------------------------------------
-- 0. Hilfsfunktionen & Typen
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION set_geaendert_am() RETURNS trigger
LANGUAGE plpgsql
SET search_path = brennerei, public
AS $$
BEGIN
  NEW.geaendert_am := now();
  RETURN NEW;
END $$;

DO $$ BEGIN
  CREATE TYPE fass_status AS ENUM ('lagernd', 'aktiv', 'leer', 'gesperrt');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE bewegungsgrund AS ENUM (
    'abfuellung',        -- Zugang Flaschen aus Fass
    'verkauf_hofladen',  -- Abgang Kasse
    'verkauf_web',       -- Abgang Webshop
    'verkauf_handel',    -- Abgang Gastronomie/Wiederverkäufer
    'verkauf_markt',     -- Abgang Markt/Veranstaltung
    'probe',             -- Verkostung/Führung
    'bruch',             -- Bruch/Verlust
    'eigenverbrauch',
    'inventur',          -- Korrektur nach Zählung
    'retoure',           -- Zugang Rücknahme
    'umlagerung'         -- Lagerort A -> B (zwei Buchungen)
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE verkaufskanal AS ENUM ('hofladen', 'web', 'handel', 'markt', 'fuehrung', 'sonstiges');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ---------------------------------------------------------------------
-- 1. Benutzer (wer hat was gemacht) – bewusst simpel, Login macht die App
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS benutzer (
  id            smallserial PRIMARY KEY,
  kuerzel       text NOT NULL UNIQUE,                 -- z. B. 'MH'
  name          text NOT NULL,
  rolle         text NOT NULL DEFAULT 'brennerei'
                CHECK (rolle IN ('inhaber','buero','hofladen','brennerei','lesen')),
  aktiv         boolean NOT NULL DEFAULT true,
  erstellt_am   timestamptz NOT NULL DEFAULT now()
);
COMMENT ON TABLE benutzer IS 'Personen, die Buchungen auslösen (Fasswechsel, Abfüllung, Lager). Authentifizierung erfolgt in der App.';

-- ---------------------------------------------------------------------
-- 2. Stammdaten-Listen
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS obstart (
  id            smallserial PRIMARY KEY,
  code          text NOT NULL UNIQUE,                 -- 'APF', 'BIR', 'ZWE' …
  name_de       text NOT NULL,
  name_fr       text,
  name_lb       text,
  name_en       text,
  wiese_symbol  text NOT NULL DEFAULT 'baum'
                CHECK (wiese_symbol IN ('baum','hecke','fass','feld','garten','bienenstock','sonstiges')),
  reihenfolge   smallint NOT NULL DEFAULT 100,
  aktiv         boolean NOT NULL DEFAULT true
);
COMMENT ON TABLE obstart IS 'Kategorie = "Baum" auf der Obstwiese der Website. wiese_symbol steuert die Grafik (Baum, Wacholderhecke, Fass-Stapel, Getreidefeld …).';

CREATE TABLE IF NOT EXISTS produkttyp (
  id            smallserial PRIMARY KEY,
  code          text NOT NULL UNIQUE,                 -- 'BRD','LIK','GIN','CHIPS' …
  name_de       text NOT NULL,
  alkoholisch   boolean NOT NULL DEFAULT true,        -- Apfelchips = false
  reihenfolge   smallint NOT NULL DEFAULT 100
);

CREATE TABLE IF NOT EXISTS mwst_satz (
  id            smallserial PRIMARY KEY,
  code          text NOT NULL UNIQUE,                 -- 'NORMAL','ZWISCHEN','ERMAESSIGT','STARK_ERM','NULL'
  satz          numeric(5,4) NOT NULL CHECK (satz >= 0 AND satz < 1),  -- 0.1700
  bezeichnung   text NOT NULL,
  gueltig_ab    date NOT NULL DEFAULT '2000-01-01',
  gueltig_bis   date
);
COMMENT ON TABLE mwst_satz IS 'Luxemburg: 17 % normal, 14 % Zwischensatz, 8 % ermäßigt, 3 % stark ermäßigt. Spirituosen = normal.';

CREATE TABLE IF NOT EXISTS lagerort (
  id            smallserial PRIMARY KEY,
  code          text NOT NULL UNIQUE,                 -- 'FASSLAGER','FLASCHENLAGER','HOFLADEN'
  name          text NOT NULL,
  typ           text NOT NULL CHECK (typ IN ('fass','flasche','verkauf')),
  aktiv         boolean NOT NULL DEFAULT true
);

-- ---------------------------------------------------------------------
-- 3. Produkte & Varianten & Preise
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS produkt (
  id                serial PRIMARY KEY,
  sku               text NOT NULL UNIQUE,             -- 'APF-BRD-001' – nie ändern
  name_de           text NOT NULL,
  name_fr           text,
  name_lb           text,
  name_en           text,
  obstart_id        smallint NOT NULL REFERENCES obstart(id),
  produkttyp_id     smallint NOT NULL REFERENCES produkttyp(id),
  alkohol_vol       numeric(4,1) CHECK (alkohol_vol IS NULL OR (alkohol_vol >= 0 AND alkohol_vol <= 96)),
  beschreibung_de   text,
  beschreibung_fr   text,
  beschreibung_lb   text,
  beschreibung_en   text,
  zutaten           text,                             -- Pflicht bei Likör/Chips (LMIV)
  allergene         text,
  herkunft_obst     text CHECK (herkunft_obst IN ('eigen','zugekauft','gemischt')),
  aktiv             boolean NOT NULL DEFAULT true,
  online_sichtbar   boolean NOT NULL DEFAULT false,   -- Steuerung Website-Sync
  bild_pfad         text,
  woo_product_id    integer,                          -- ID in WooCommerce (vom Sync gesetzt)
  odoo_product_id   integer,                          -- ID in Odoo (vom Sync gesetzt)
  erstellt_am       timestamptz NOT NULL DEFAULT now(),
  geaendert_am      timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS produkt_obstart_idx ON produkt(obstart_id);
DROP TRIGGER IF EXISTS trg_produkt_geaendert ON produkt;
CREATE TRIGGER trg_produkt_geaendert BEFORE UPDATE ON produkt
  FOR EACH ROW EXECUTE FUNCTION set_geaendert_am();
COMMENT ON COLUMN produkt.sku IS 'Artikelnummer, eindeutig, unveränderlich. Vorschlag OBST-TYP-NNN.';

CREATE TABLE IF NOT EXISTS variante (
  id                serial PRIMARY KEY,
  produkt_id        integer NOT NULL REFERENCES produkt(id),
  fuellmenge_ml     integer NOT NULL CHECK (fuellmenge_ml > 0),   -- Zahlenwert der Füllmenge
  grundeinheit      text NOT NULL DEFAULT 'ml' CHECK (grundeinheit IN ('ml','g','Stück')),
  ean               text UNIQUE CHECK (ean IS NULL OR ean ~ '^[0-9]{8}$|^[0-9]{13}$'),
  sku               text NOT NULL UNIQUE,             -- 'APF-BRD-001-500'
  gewicht_g         integer,                          -- Versandgewicht voll
  mindestbestand    integer NOT NULL DEFAULT 0,
  mwst_satz_id      smallint NOT NULL REFERENCES mwst_satz(id),
  akzise_eur        numeric(10,4) NOT NULL DEFAULT 0, -- Verbrauchsteuer je Flasche (Info/Kalkulation)
  aktiv             boolean NOT NULL DEFAULT true,
  online_verkauf    boolean NOT NULL DEFAULT false,
  woo_variation_id  integer,
  odoo_variant_id   integer,
  erstellt_am       timestamptz NOT NULL DEFAULT now(),
  geaendert_am      timestamptz NOT NULL DEFAULT now(),
  UNIQUE (produkt_id, fuellmenge_ml)
);
-- Nachrüsten für bestehende Datenbanken
ALTER TABLE variante ADD COLUMN IF NOT EXISTS grundeinheit text NOT NULL DEFAULT 'ml';
DO $$ BEGIN
  ALTER TABLE variante ADD CONSTRAINT variante_grundeinheit_check
    CHECK (grundeinheit IN ('ml','g','Stück'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DROP TRIGGER IF EXISTS trg_variante_geaendert ON variante;
CREATE TRIGGER trg_variante_geaendert BEFORE UPDATE ON variante
  FOR EACH ROW EXECUTE FUNCTION set_geaendert_am();
COMMENT ON TABLE variante IS 'Verkaufbare Einheit = Produkt × Füllmenge. Trägt EAN, MwSt und Preis (über preisliste).';
COMMENT ON COLUMN variante.grundeinheit IS 'ml für Flüssiges, g für Chips und Honig, Stück für Sets. Bestimmt Grundpreis und Rechnungstext.';

CREATE TABLE IF NOT EXISTS preisliste (
  id            serial PRIMARY KEY,
  variante_id   integer NOT NULL REFERENCES variante(id),
  kanal         text NOT NULL DEFAULT '*'             -- '*' = Standardpreis für alle Kanäle
                CHECK (kanal IN ('*','hofladen','web','handel','markt','fuehrung','sonstiges')),
  preis_netto   numeric(10,2) NOT NULL CHECK (preis_netto >= 0),
  gueltig_ab    date NOT NULL DEFAULT CURRENT_DATE,
  gueltig_bis   date,
  bemerkung     text,
  erstellt_von  smallint REFERENCES benutzer(id),
  erstellt_am   timestamptz NOT NULL DEFAULT now(),
  CHECK (gueltig_bis IS NULL OR gueltig_bis >= gueltig_ab),
  -- keine überlappenden Gültigkeiten je Variante+Kanal
  EXCLUDE USING gist (
    variante_id WITH =,
    kanal WITH =,
    daterange(gueltig_ab, COALESCE(gueltig_bis, 'infinity'::date), '[]') WITH &&
  )
);
CREATE INDEX IF NOT EXISTS preisliste_variante_idx ON preisliste(variante_id, gueltig_ab DESC);
COMMENT ON TABLE preisliste IS 'Preishistorie. Preise NIE in variante ändern, sondern neue Zeile mit gueltig_ab. Website und Kasse lesen v_preis_aktuell.';

-- ---------------------------------------------------------------------
-- 4. Produktion: Maische/Brennprotokoll, Fässer, aktives Fass
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS maische_charge (
  id              serial PRIMARY KEY,
  chargennummer   text NOT NULL UNIQUE,               -- 'M-2025-08'
  obstart_id      smallint NOT NULL REFERENCES obstart(id),
  rohstoff_kg     numeric(10,1) CHECK (rohstoff_kg IS NULL OR rohstoff_kg >= 0),
  herkunft        text,
  eingemaischt_am date NOT NULL,
  bemerkung       text,
  erstellt_am     timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS brennprotokoll (
  id                  serial PRIMARY KEY,
  maische_charge_id   integer NOT NULL REFERENCES maische_charge(id),
  gebrannt_am         date NOT NULL,
  brenner_id          smallint REFERENCES benutzer(id),
  vorlauf_l           numeric(8,2) DEFAULT 0,
  mittellauf_l        numeric(8,2) NOT NULL CHECK (mittellauf_l >= 0),
  nachlauf_l          numeric(8,2) DEFAULT 0,
  alkohol_vol         numeric(4,1) NOT NULL CHECK (alkohol_vol > 0 AND alkohol_vol <= 96),
  liter_reiner_alkohol numeric(10,3) GENERATED ALWAYS AS (round(mittellauf_l * alkohol_vol / 100, 3)) STORED,
  bemerkung           text,
  erstellt_am         timestamptz NOT NULL DEFAULT now()
);
COMMENT ON TABLE brennprotokoll IS 'Brennbuch für den Zoll (Douanes et Accises). Ein Eintrag je Brenndurchgang. liter_reiner_alkohol = Mittellauf × %vol / 100.';

CREATE TABLE IF NOT EXISTS fass (
  id              serial PRIMARY KEY,
  fassnummer      text NOT NULL UNIQUE,               -- exakt wie auf dem Fass
  produkt_id      integer REFERENCES produkt(id),     -- NULL = leer/neutral
  material        text NOT NULL DEFAULT 'edelstahl'
                  CHECK (material IN ('edelstahl','eiche','kastanie','akazie','glasballon','kunststoff','sonstiges')),
  volumen_l       numeric(8,1) NOT NULL CHECK (volumen_l > 0),
  fuellstand_l    numeric(8,1) NOT NULL DEFAULT 0 CHECK (fuellstand_l >= 0),
  alkohol_vol     numeric(4,1) CHECK (alkohol_vol IS NULL OR (alkohol_vol >= 0 AND alkohol_vol <= 96)),
  befuellt_am     date,
  lagerort_id     smallint REFERENCES lagerort(id),
  status          fass_status NOT NULL DEFAULT 'lagernd',
  bemerkung       text,
  erstellt_am     timestamptz NOT NULL DEFAULT now(),
  geaendert_am    timestamptz NOT NULL DEFAULT now(),
  CHECK (fuellstand_l <= volumen_l)
);
DROP TRIGGER IF EXISTS trg_fass_geaendert ON fass;
CREATE TRIGGER trg_fass_geaendert BEFORE UPDATE ON fass
  FOR EACH ROW EXECUTE FUNCTION set_geaendert_am();

-- Herkunft des Fassinhalts (ein Fass kann aus mehreren Brenndurchgängen befüllt sein)
CREATE TABLE IF NOT EXISTS fass_befuellung (
  id                  serial PRIMARY KEY,
  fass_id             integer NOT NULL REFERENCES fass(id),
  brennprotokoll_id   integer REFERENCES brennprotokoll(id),
  menge_l             numeric(8,1) NOT NULL CHECK (menge_l > 0),
  alkohol_vol         numeric(4,1),
  befuellt_am         date NOT NULL DEFAULT CURRENT_DATE,
  benutzer_id         smallint REFERENCES benutzer(id),
  bemerkung           text
);

-- Historie: welches Fass ist/war für welches Produkt aktiv (kommt aufs Etikett)
CREATE TABLE IF NOT EXISTS fass_aktiv (
  id            serial PRIMARY KEY,
  produkt_id    integer NOT NULL REFERENCES produkt(id),
  fass_id       integer NOT NULL REFERENCES fass(id),
  aktiv_seit    timestamptz NOT NULL DEFAULT clock_timestamp(),
  aktiv_bis     timestamptz,
  gesetzt_von   smallint REFERENCES benutzer(id),
  bemerkung     text,
  CHECK (aktiv_bis IS NULL OR aktiv_bis > aktiv_seit),
  -- Pro Produkt darf zu jedem Zeitpunkt nur EIN Fass aktiv sein
  EXCLUDE USING gist (
    produkt_id WITH =,
    tstzrange(aktiv_seit, COALESCE(aktiv_bis, 'infinity'::timestamptz), '[)') WITH &&
  ),
  -- Ein Fass darf zu jedem Zeitpunkt nur für EIN Produkt aktiv sein
  EXCLUDE USING gist (
    fass_id WITH =,
    tstzrange(aktiv_seit, COALESCE(aktiv_bis, 'infinity'::timestamptz), '[)') WITH &&
  )
);
CREATE INDEX IF NOT EXISTS fass_aktiv_produkt_idx ON fass_aktiv(produkt_id) WHERE aktiv_bis IS NULL;
COMMENT ON TABLE fass_aktiv IS 'Zeitliche Historie der aktiven Fässer. Nur über Funktion fass_wechseln() ändern.';

-- ---------------------------------------------------------------------
-- 5. Abfüllung, Etiketten, Lager
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS abfuellung (
  id                serial PRIMARY KEY,
  losnummer         text NOT NULL UNIQUE,             -- 'F017-251202' (+ Suffix bei Mehrfachabfüllung am Tag)
  fass_id           integer NOT NULL REFERENCES fass(id),
  variante_id       integer NOT NULL REFERENCES variante(id),
  anzahl_flaschen   integer NOT NULL CHECK (anzahl_flaschen > 0),
  liter_abgefuellt  numeric(10,3) NOT NULL,
  alkohol_vol       numeric(4,1),                     -- Trinkstärke in der Flasche
  abgefuellt_am     date NOT NULL DEFAULT CURRENT_DATE,
  lagerort_id       smallint REFERENCES lagerort(id),
  benutzer_id       smallint REFERENCES benutzer(id),
  bemerkung         text,
  erstellt_am       timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS abfuellung_variante_idx ON abfuellung(variante_id, abgefuellt_am DESC);
COMMENT ON TABLE abfuellung IS 'Jede Abfüllung erzeugt eine Losnummer (Loskennzeichnung) und bucht Lagerzugang. Nur über Funktion abfuellung_buchen().';

CREATE TABLE IF NOT EXISTS etikettendruck (
  id              serial PRIMARY KEY,
  abfuellung_id   integer REFERENCES abfuellung(id),
  variante_id     integer NOT NULL REFERENCES variante(id),
  fass_id         integer REFERENCES fass(id),
  losnummer       text,
  anzahl          integer NOT NULL CHECK (anzahl > 0),
  vorlage         text,                               -- Name der Etikettenvorlage
  drucker         text,
  gedruckt_am     timestamptz NOT NULL DEFAULT now(),
  benutzer_id     smallint REFERENCES benutzer(id)
);
COMMENT ON TABLE etikettendruck IS 'Protokoll jedes Druckauftrags: welche Fassnummer/Losnummer wann auf wie viele Etiketten gedruckt wurde.';

CREATE TABLE IF NOT EXISTS lagerbewegung (
  id              bigserial PRIMARY KEY,
  variante_id     integer NOT NULL REFERENCES variante(id),
  lagerort_id     smallint NOT NULL REFERENCES lagerort(id),
  menge           integer NOT NULL CHECK (menge <> 0), -- + Zugang / − Abgang
  grund           bewegungsgrund NOT NULL,
  losnummer       text,                               -- Rückverfolgung
  beleg_ref       text,                               -- Odoo-Rechnung, Woo-Bestellnr., Kassenbon
  gebucht_am      timestamptz NOT NULL DEFAULT now(),
  benutzer_id     smallint REFERENCES benutzer(id),
  bemerkung       text
);
CREATE INDEX IF NOT EXISTS lagerbewegung_variante_idx ON lagerbewegung(variante_id, gebucht_am DESC);
CREATE INDEX IF NOT EXISTS lagerbewegung_los_idx ON lagerbewegung(losnummer);

-- ---------------------------------------------------------------------
-- 6. Verkauf (Spiegel für Berichte – Rechnungen selbst liegen in Odoo)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS verkaufsbeleg (
  id                serial PRIMARY KEY,
  kanal             verkaufskanal NOT NULL,
  extern_ref        text,                             -- Odoo-Rechnungsnr. / Woo order id / Kassenbon
  datum             date NOT NULL DEFAULT CURRENT_DATE,
  kunde_ref         text,                             -- Odoo partner id (keine Personendaten hier!)
  land              char(2) NOT NULL DEFAULT 'LU',
  netto_summe       numeric(12,2) NOT NULL DEFAULT 0,
  mwst_summe        numeric(12,2) NOT NULL DEFAULT 0,
  brutto_summe      numeric(12,2) NOT NULL DEFAULT 0,
  erstellt_am       timestamptz NOT NULL DEFAULT now(),
  UNIQUE (kanal, extern_ref)
);
COMMENT ON TABLE verkaufsbeleg IS 'Nur Summen und Referenz für Umsatzberichte nach Kanal. Personendaten bleiben in Odoo (DSGVO-Datensparsamkeit).';

CREATE TABLE IF NOT EXISTS verkaufsposition (
  id                serial PRIMARY KEY,
  beleg_id          integer NOT NULL REFERENCES verkaufsbeleg(id) ON DELETE CASCADE,
  variante_id       integer NOT NULL REFERENCES variante(id),
  menge             integer NOT NULL CHECK (menge > 0),
  preis_netto       numeric(10,2) NOT NULL,
  mwst_satz         numeric(5,4) NOT NULL,
  losnummer         text
);

-- ---------------------------------------------------------------------
-- 7. Audit-Log (wer hat wann was geändert) – für Nachvollziehbarkeit
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS audit_log (
  id          bigserial PRIMARY KEY,
  tabelle     text NOT NULL,
  aktion      text NOT NULL,
  zeile_id    text,
  alt         jsonb,
  neu         jsonb,
  db_user     text NOT NULL DEFAULT current_user,
  zeitpunkt   timestamptz NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION audit_trigger() RETURNS trigger
LANGUAGE plpgsql
SET search_path = brennerei, public
AS $$
DECLARE
  v_alt jsonb := CASE WHEN TG_OP = 'INSERT' THEN NULL ELSE to_jsonb(OLD) END;
  v_neu jsonb := CASE WHEN TG_OP = 'DELETE' THEN NULL ELSE to_jsonb(NEW) END;
  v_id  text;
BEGIN
  -- Schlüssel der Zeile: id, sonst Nummer, sonst zusammengesetzt. Nicht jede Tabelle hat eine id.
  v_id := COALESCE(v_neu, v_alt) ->> 'id';
  IF v_id IS NULL THEN v_id := COALESCE(v_neu, v_alt) ->> 'nummer'; END IF;
  IF v_id IS NULL THEN
    v_id := concat_ws('/', COALESCE(v_neu, v_alt) ->> 'art', COALESCE(v_neu, v_alt) ->> 'jahr');
  END IF;

  INSERT INTO audit_log (tabelle, aktion, zeile_id, alt, neu)
  VALUES (TG_TABLE_NAME, TG_OP, NULLIF(v_id, ''), v_alt, v_neu);

  RETURN CASE WHEN TG_OP = 'DELETE' THEN OLD ELSE NEW END;
END $$;

DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['produkt','variante','preisliste','fass','fass_aktiv','abfuellung','lagerbewegung','brennprotokoll'] LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS trg_audit_%1$s ON %1$s', t);
    EXECUTE format('CREATE TRIGGER trg_audit_%1$s AFTER INSERT OR UPDATE OR DELETE ON %1$s FOR EACH ROW EXECUTE FUNCTION audit_trigger()', t);
  END LOOP;
END $$;

-- ---------------------------------------------------------------------
-- 8. Geschäftslogik als Funktionen
-- ---------------------------------------------------------------------

-- Aktueller Preis einer Variante (Kanal-Preis vor Standardpreis)
CREATE OR REPLACE FUNCTION preis_aktuell(p_variante_id integer, p_kanal text DEFAULT '*', p_datum date DEFAULT CURRENT_DATE)
RETURNS numeric LANGUAGE sql STABLE
SET search_path = brennerei, public
AS $$
  SELECT preis_netto FROM preisliste
  WHERE variante_id = p_variante_id
    AND kanal IN (p_kanal, '*')
    AND gueltig_ab <= p_datum AND (gueltig_bis IS NULL OR gueltig_bis >= p_datum)
  ORDER BY (kanal <> '*') DESC, gueltig_ab DESC
  LIMIT 1
$$;

-- Fasswechsel: schließt das bisher aktive Fass des Produkts und aktiviert das neue
CREATE OR REPLACE FUNCTION fass_wechseln(p_produkt_id integer, p_fass_id integer, p_benutzer_id smallint, p_bemerkung text DEFAULT NULL)
RETURNS integer LANGUAGE plpgsql
SET search_path = brennerei, public
AS $$
DECLARE
  v_alt_fass integer;
  v_neu_id   integer;
  v_fass     fass%ROWTYPE;
  v_jetzt    timestamptz := clock_timestamp();
BEGIN
  SELECT * INTO v_fass FROM fass WHERE id = p_fass_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Fass % existiert nicht', p_fass_id; END IF;
  IF v_fass.status IN ('leer','gesperrt') THEN RAISE EXCEPTION 'Fass % ist % und kann nicht aktiviert werden', v_fass.fassnummer, v_fass.status; END IF;
  IF v_fass.produkt_id IS NOT NULL AND v_fass.produkt_id <> p_produkt_id THEN
    RAISE EXCEPTION 'Fass % enthält ein anderes Produkt (produkt_id %)', v_fass.fassnummer, v_fass.produkt_id;
  END IF;

  -- bisher aktives Fass des Produkts schließen
  UPDATE fass_aktiv SET aktiv_bis = GREATEST(v_jetzt, aktiv_seit + interval '1 microsecond')
   WHERE produkt_id = p_produkt_id AND aktiv_bis IS NULL
   RETURNING fass_id, aktiv_bis INTO v_alt_fass, v_jetzt;
  v_jetzt := COALESCE(v_jetzt, clock_timestamp());
  IF v_alt_fass IS NOT NULL AND v_alt_fass <> p_fass_id THEN
    UPDATE fass SET status = CASE WHEN fuellstand_l <= 0 THEN 'leer'::fass_status ELSE 'lagernd'::fass_status END
     WHERE id = v_alt_fass;
  END IF;

  INSERT INTO fass_aktiv(produkt_id, fass_id, aktiv_seit, gesetzt_von, bemerkung)
  VALUES (p_produkt_id, p_fass_id, v_jetzt, p_benutzer_id, p_bemerkung)
  RETURNING id INTO v_neu_id;

  UPDATE fass SET status = 'aktiv', produkt_id = p_produkt_id WHERE id = p_fass_id;
  RETURN v_neu_id;
END $$;
COMMENT ON FUNCTION fass_wechseln IS 'Einziger erlaubter Weg, ein aktives Fass zu setzen. Prüft Status und Produkt, schreibt Historie, aktualisiert Fassstatus.';

-- Losnummer-Basis: Fassnummer ohne Sonderzeichen (mit F-Präfix, falls sie mit Ziffer beginnt) + JJMMTT
CREATE OR REPLACE FUNCTION losnummer_basis(p_fassnummer text, p_datum date)
RETURNS text LANGUAGE sql IMMUTABLE
SET search_path = brennerei, public
AS $$
  SELECT CASE WHEN regexp_replace(upper(p_fassnummer), '[^A-Z0-9]', '', 'g') ~ '^[0-9]' THEN 'F' ELSE '' END
         || regexp_replace(upper(p_fassnummer), '[^A-Z0-9]', '', 'g')
         || '-' || to_char(p_datum, 'YYMMDD')
$$;

-- Losnummer erzeugen: <Basis>[-n] bei mehreren Abfüllungen am selben Tag
CREATE OR REPLACE FUNCTION losnummer_erzeugen(p_fass_id integer, p_datum date)
RETURNS text LANGUAGE plpgsql
SET search_path = brennerei, public
AS $$
DECLARE
  v_basis text;
  v_los   text;
  v_n     integer := 1;
BEGIN
  SELECT losnummer_basis(fassnummer, p_datum) INTO v_basis FROM fass WHERE id = p_fass_id;
  v_los := v_basis;
  WHILE EXISTS (SELECT 1 FROM abfuellung WHERE losnummer = v_los) LOOP
    v_n := v_n + 1;
    v_los := v_basis || '-' || v_n;
  END LOOP;
  RETURN v_los;
END $$;

-- Abfüllung buchen: Losnummer, Fass-Füllstand, Lagerzugang – alles in einer Transaktion
CREATE OR REPLACE FUNCTION abfuellung_buchen(
  p_variante_id integer, p_anzahl integer, p_benutzer_id smallint,
  p_datum date DEFAULT CURRENT_DATE, p_lagerort_code text DEFAULT 'FLASCHENLAGER',
  p_alkohol_vol numeric DEFAULT NULL, p_bemerkung text DEFAULT NULL)
RETURNS abfuellung LANGUAGE plpgsql
SET search_path = brennerei, public
AS $$
DECLARE
  v_produkt_id  integer;
  v_ml          integer;
  v_fass_id     integer;
  v_liter       numeric(10,3);
  v_lagerort_id smallint;
  v_los         text;
  v_row         abfuellung%ROWTYPE;
BEGIN
  SELECT v.produkt_id, v.fuellmenge_ml INTO v_produkt_id, v_ml FROM variante v WHERE v.id = p_variante_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'Variante % existiert nicht', p_variante_id; END IF;

  SELECT fass_id INTO v_fass_id FROM fass_aktiv WHERE produkt_id = v_produkt_id AND aktiv_bis IS NULL;
  IF v_fass_id IS NULL THEN RAISE EXCEPTION 'Kein aktives Fass für Produkt % – zuerst fass_wechseln() aufrufen', v_produkt_id; END IF;

  SELECT id INTO v_lagerort_id FROM lagerort WHERE code = p_lagerort_code;
  IF v_lagerort_id IS NULL THEN RAISE EXCEPTION 'Lagerort % unbekannt', p_lagerort_code; END IF;

  v_liter := round(p_anzahl * v_ml / 1000.0, 3);
  v_los   := losnummer_erzeugen(v_fass_id, p_datum);

  INSERT INTO abfuellung(losnummer, fass_id, variante_id, anzahl_flaschen, liter_abgefuellt, alkohol_vol, abgefuellt_am, lagerort_id, benutzer_id, bemerkung)
  VALUES (v_los, v_fass_id, p_variante_id, p_anzahl, v_liter, COALESCE(p_alkohol_vol, (SELECT alkohol_vol FROM produkt WHERE id = v_produkt_id)), p_datum, v_lagerort_id, p_benutzer_id, p_bemerkung)
  RETURNING * INTO v_row;

  -- Fass-Füllstand reduzieren (nie unter 0)
  UPDATE fass SET fuellstand_l = GREATEST(fuellstand_l - v_liter, 0),
                  status = CASE WHEN fuellstand_l - v_liter <= 0 THEN 'leer'::fass_status ELSE status END
   WHERE id = v_fass_id;

  -- Lagerzugang
  INSERT INTO lagerbewegung(variante_id, lagerort_id, menge, grund, losnummer, beleg_ref, benutzer_id)
  VALUES (p_variante_id, v_lagerort_id, p_anzahl, 'abfuellung', v_los, 'ABF-' || v_row.id, p_benutzer_id);

  RETURN v_row;
END $$;
COMMENT ON FUNCTION abfuellung_buchen IS 'Bucht eine Abfüllung aus dem aktiven Fass: Losnummer, Füllstand, Lagerzugang in einer Transaktion.';

-- Lagerabgang (Verkauf, Bruch, Probe …)
CREATE OR REPLACE FUNCTION lager_abgang(
  p_variante_id integer, p_menge integer, p_grund bewegungsgrund,
  p_lagerort_code text, p_benutzer_id smallint, p_beleg_ref text DEFAULT NULL, p_losnummer text DEFAULT NULL)
RETURNS bigint LANGUAGE plpgsql
SET search_path = brennerei, public
AS $$
DECLARE v_lagerort_id smallint; v_id bigint;
BEGIN
  IF p_menge <= 0 THEN RAISE EXCEPTION 'Menge muss positiv sein'; END IF;
  SELECT id INTO v_lagerort_id FROM lagerort WHERE code = p_lagerort_code;
  IF v_lagerort_id IS NULL THEN RAISE EXCEPTION 'Lagerort % unbekannt', p_lagerort_code; END IF;
  INSERT INTO lagerbewegung(variante_id, lagerort_id, menge, grund, losnummer, beleg_ref, benutzer_id)
  VALUES (p_variante_id, v_lagerort_id, -p_menge, p_grund, p_losnummer, p_beleg_ref, p_benutzer_id)
  RETURNING id INTO v_id;
  RETURN v_id;
END $$;

-- ---------------------------------------------------------------------
-- 9. Sichten (Views) für App, Etikett, Website-Sync und Berichte
-- ---------------------------------------------------------------------

-- Sichten zuerst fallen lassen: CREATE OR REPLACE kann Spalten weder umbenennen
-- noch umsortieren. Alle werden weiter unten in dieser Datei neu angelegt.
DROP VIEW IF EXISTS v_woo_sync, v_etikett, v_lagerbestand_gesamt, v_lagerbestand,
                    v_produkt_aktives_fass, v_fassbestand, v_alkoholbilanz_monat,
                    v_umsatz_monat_kanal, v_rueckverfolgung, v_preis_aktuell CASCADE;

CREATE OR REPLACE VIEW v_preis_aktuell AS
SELECT v.id AS variante_id, v.sku, p.sku AS produkt_sku, p.name_de AS produkt,
       v.fuellmenge_ml, v.ean,
       preis_aktuell(v.id) AS preis_netto,
       m.satz AS mwst_satz,
       round(preis_aktuell(v.id) * (1 + m.satz), 2) AS preis_brutto,
       CASE WHEN v.grundeinheit = 'Stück' THEN NULL
            ELSE round(round(preis_aktuell(v.id) * (1 + m.satz), 2) / (v.fuellmenge_ml / 1000.0), 2)
       END AS grundpreis_brutto_je_l,
       CASE v.grundeinheit WHEN 'ml' THEN '€/l' WHEN 'g' THEN '€/kg' ELSE NULL END AS grundpreis_einheit,
       v.grundeinheit, v.online_verkauf, v.aktiv
FROM variante v
JOIN produkt p ON p.id = v.produkt_id
JOIN mwst_satz m ON m.id = v.mwst_satz_id;
COMMENT ON VIEW v_preis_aktuell IS 'Aktueller Standardpreis je Variante netto/brutto + Grundpreis je Liter oder Kilo (Pflichtangabe im Shop).';

CREATE OR REPLACE VIEW v_produkt_aktives_fass AS
SELECT p.id AS produkt_id, p.sku, p.name_de AS produkt,
       f.id AS fass_id, f.fassnummer, f.fuellstand_l, f.volumen_l, f.alkohol_vol AS fass_alkohol_vol,
       fa.aktiv_seit, b.name AS gesetzt_von
FROM produkt p
LEFT JOIN fass_aktiv fa ON fa.produkt_id = p.id AND fa.aktiv_bis IS NULL
LEFT JOIN fass f ON f.id = fa.fass_id
LEFT JOIN benutzer b ON b.id = fa.gesetzt_von
WHERE p.aktiv;

CREATE OR REPLACE VIEW v_etikett AS
SELECT v.id AS variante_id, v.sku AS variante_sku, v.ean,
       p.id AS produkt_id, p.sku AS produkt_sku,
       p.name_de, p.name_fr, p.name_lb, p.name_en,
       o.name_de AS obstart, t.name_de AS produkttyp,
       p.alkohol_vol, v.fuellmenge_ml, v.grundeinheit,
       p.zutaten, p.allergene,
       f.fassnummer AS aktive_fassnummer,
       losnummer_basis(f.fassnummer, CURRENT_DATE) AS losnummer_vorschau,
       pa.preis_brutto, pa.grundpreis_brutto_je_l
FROM variante v
JOIN produkt p ON p.id = v.produkt_id
JOIN obstart o ON o.id = p.obstart_id
JOIN produkttyp t ON t.id = p.produkttyp_id
LEFT JOIN fass_aktiv fa ON fa.produkt_id = p.id AND fa.aktiv_bis IS NULL
LEFT JOIN fass f ON f.id = fa.fass_id
LEFT JOIN v_preis_aktuell pa ON pa.variante_id = v.id
WHERE v.aktiv AND p.aktiv;
COMMENT ON VIEW v_etikett IS 'Alle Felder, die die Etiketten-App zum Drucken braucht, inkl. aktueller Fassnummer.';

CREATE OR REPLACE VIEW v_lagerbestand AS
SELECT v.id AS variante_id, v.sku, p.name_de AS produkt, v.fuellmenge_ml,
       l.code AS lagerort, COALESCE(SUM(lb.menge), 0) AS bestand,
       v.mindestbestand,
       (COALESCE(SUM(lb.menge), 0) < v.mindestbestand) AS unter_mindestbestand
FROM variante v
JOIN produkt p ON p.id = v.produkt_id
CROSS JOIN lagerort l
LEFT JOIN lagerbewegung lb ON lb.variante_id = v.id AND lb.lagerort_id = l.id
WHERE l.typ IN ('flasche','verkauf') AND v.aktiv
GROUP BY v.id, v.sku, p.name_de, v.fuellmenge_ml, l.code, v.mindestbestand;

CREATE OR REPLACE VIEW v_lagerbestand_gesamt AS
SELECT variante_id, sku, produkt, fuellmenge_ml, SUM(bestand) AS bestand, mindestbestand,
       (SUM(bestand) < mindestbestand) AS unter_mindestbestand
FROM v_lagerbestand GROUP BY variante_id, sku, produkt, fuellmenge_ml, mindestbestand;

-- Website-Sync: alles, was WooCommerce braucht, in einer Zeile je Variante
CREATE OR REPLACE VIEW v_woo_sync AS
SELECT p.id AS produkt_id, p.sku AS produkt_sku, p.woo_product_id,
       v.id AS variante_id, v.sku AS variante_sku, v.woo_variation_id, v.ean,
       p.name_de, p.name_fr, p.name_lb, p.name_en,
       p.beschreibung_de, p.beschreibung_fr, p.beschreibung_lb, p.beschreibung_en,
       o.code AS obstart_code, o.name_de AS obstart, o.wiese_symbol,
       t.code AS typ_code, t.name_de AS produkttyp, t.alkoholisch,
       p.alkohol_vol, v.fuellmenge_ml, v.grundeinheit, v.gewicht_g, p.bild_pfad,
       pa.preis_netto, pa.preis_brutto, pa.mwst_satz, pa.grundpreis_brutto_je_l,
       lg.bestand AS bestand_gesamt,
       GREATEST(p.geaendert_am, v.geaendert_am) AS geaendert_am
FROM variante v
JOIN produkt p ON p.id = v.produkt_id
JOIN obstart o ON o.id = p.obstart_id
JOIN produkttyp t ON t.id = p.produkttyp_id
LEFT JOIN v_preis_aktuell pa ON pa.variante_id = v.id
LEFT JOIN v_lagerbestand_gesamt lg ON lg.variante_id = v.id
WHERE p.aktiv AND v.aktiv AND p.online_sichtbar AND v.online_verkauf;

-- Alkoholbilanz je Monat (Liter reiner Alkohol) – Grundlage für den Zoll
CREATE OR REPLACE VIEW v_alkoholbilanz_monat AS
WITH erzeugt AS (
  SELECT date_trunc('month', gebrannt_am)::date AS monat, SUM(liter_reiner_alkohol) AS la_erzeugt
  FROM brennprotokoll GROUP BY 1
), abgefuellt AS (
  SELECT date_trunc('month', abgefuellt_am)::date AS monat,
         SUM(liter_abgefuellt * COALESCE(alkohol_vol, 0) / 100) AS la_abgefuellt
  FROM abfuellung GROUP BY 1
), verkauft AS (
  SELECT date_trunc('month', lb.gebucht_am)::date AS monat,
         SUM(-lb.menge * v.fuellmenge_ml / 1000.0 * COALESCE(p.alkohol_vol, 0) / 100) AS la_abgang
  FROM lagerbewegung lb
  JOIN variante v ON v.id = lb.variante_id
  JOIN produkt p ON p.id = v.produkt_id
  WHERE lb.menge < 0 AND lb.grund <> 'umlagerung'
  GROUP BY 1
)
SELECT m.monat,
       round(COALESCE(e.la_erzeugt, 0), 3)     AS la_erzeugt,
       round(COALESCE(a.la_abgefuellt, 0), 3)  AS la_abgefuellt,
       round(COALESCE(vk.la_abgang, 0), 3)     AS la_abgang_flaschen
FROM (SELECT monat FROM erzeugt UNION SELECT monat FROM abgefuellt UNION SELECT monat FROM verkauft) m
LEFT JOIN erzeugt e USING (monat)
LEFT JOIN abgefuellt a USING (monat)
LEFT JOIN verkauft vk USING (monat)
ORDER BY m.monat;

-- Bestand reiner Alkohol in Fässern (Stichtag jetzt)
CREATE OR REPLACE VIEW v_fassbestand AS
SELECT f.id, f.fassnummer, f.status, f.material, f.volumen_l, f.fuellstand_l, f.alkohol_vol,
       round(f.fuellstand_l * COALESCE(f.alkohol_vol, 0) / 100, 2) AS liter_reiner_alkohol,
       p.sku AS produkt_sku, p.name_de AS produkt, l.code AS lagerort,
       floor(f.fuellstand_l / 0.5) AS ca_flaschen_500ml
FROM fass f
LEFT JOIN produkt p ON p.id = f.produkt_id
LEFT JOIN lagerort l ON l.id = f.lagerort_id;

-- Umsatz je Monat und Kanal
CREATE OR REPLACE VIEW v_umsatz_monat_kanal AS
SELECT date_trunc('month', datum)::date AS monat, kanal,
       COUNT(*) AS belege, SUM(netto_summe) AS netto, SUM(mwst_summe) AS mwst, SUM(brutto_summe) AS brutto
FROM verkaufsbeleg GROUP BY 1, 2 ORDER BY 1, 2;

-- Rückverfolgung: Losnummer -> Fass -> Brennprotokoll -> Maische
CREATE OR REPLACE VIEW v_rueckverfolgung AS
SELECT a.losnummer, a.abgefuellt_am, a.anzahl_flaschen, v.sku AS variante_sku, p.name_de AS produkt,
       f.fassnummer, fb.befuellt_am AS fass_befuellt_am,
       bp.gebrannt_am, bp.alkohol_vol AS brand_alkohol_vol,
       mc.chargennummer AS maische, mc.eingemaischt_am, mc.herkunft
FROM abfuellung a
JOIN variante v ON v.id = a.variante_id
JOIN produkt p ON p.id = v.produkt_id
JOIN fass f ON f.id = a.fass_id
LEFT JOIN fass_befuellung fb ON fb.fass_id = f.id
LEFT JOIN brennprotokoll bp ON bp.id = fb.brennprotokoll_id
LEFT JOIN maische_charge mc ON mc.id = bp.maische_charge_id;

-- ---------------------------------------------------------------------
-- 10. Rollen & Rechte (Passwörter werden beim Einrichten gesetzt)
-- ---------------------------------------------------------------------
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'brennerei_app') THEN
    CREATE ROLE brennerei_app LOGIN PASSWORD 'BITTE_AENDERN';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'brennerei_etikett') THEN
    CREATE ROLE brennerei_etikett LOGIN PASSWORD 'BITTE_AENDERN';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'brennerei_lesen') THEN
    CREATE ROLE brennerei_lesen LOGIN PASSWORD 'BITTE_AENDERN';
  END IF;
END $$;

GRANT USAGE ON SCHEMA brennerei TO brennerei_app, brennerei_etikett, brennerei_lesen;
-- App (ERP-Sync, Büro): alles
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA brennerei TO brennerei_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA brennerei TO brennerei_app;
-- Etiketten-App: lesen + Fasswechsel/Abfüllung/Druck über Funktionen
GRANT SELECT ON ALL TABLES IN SCHEMA brennerei TO brennerei_etikett;
GRANT INSERT ON etikettendruck TO brennerei_etikett;
GRANT INSERT, UPDATE ON fass_aktiv, abfuellung, lagerbewegung, fass, audit_log TO brennerei_etikett;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA brennerei TO brennerei_etikett;
-- Berichte/Steuerberater: nur lesen
GRANT SELECT ON ALL TABLES IN SCHEMA brennerei TO brennerei_lesen;
ALTER DEFAULT PRIVILEGES IN SCHEMA brennerei GRANT SELECT ON TABLES TO brennerei_lesen, brennerei_etikett;
ALTER DEFAULT PRIVILEGES IN SCHEMA brennerei GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO brennerei_app;

-- ---------------------------------------------------------------------
-- 11. Stammdaten (Seed) – idempotent
-- ---------------------------------------------------------------------
INSERT INTO mwst_satz (code, satz, bezeichnung) VALUES
  ('NORMAL',    0.17, 'Normalsatz 17 % (Spirituosen, Liköre)'),
  ('ZWISCHEN',  0.14, 'Zwischensatz 14 %'),
  ('ERMAESSIGT',0.08, 'Ermäßigter Satz 8 %'),
  ('STARK_ERM', 0.03, 'Stark ermäßigter Satz 3 % (Lebensmittel, z. B. Apfelchips)'),
  ('NULL',      0.00, 'Steuerfrei / Reverse Charge')
ON CONFLICT (code) DO NOTHING;

INSERT INTO obstart (code, name_de, name_fr, name_lb, name_en, wiese_symbol, reihenfolge) VALUES
  ('APF', 'Apfel',      'Pomme',        'Apel',        'Apple',       'baum', 10),
  ('BIR', 'Birne',      'Poire',        'Bir',         'Pear',        'baum', 20),
  ('ZWE', 'Zwetschge',  'Quetsche',     'Quetsch',     'Plum',        'baum', 30),
  ('MIR', 'Mirabelle',  'Mirabelle',    'Mirabell',    'Mirabelle',   'baum', 40),
  ('KIR', 'Kirsche',    'Cerise',       'Kiischt',     'Cherry',      'baum', 50),
  ('QUI', 'Quitte',     'Coing',        'Quitt',       'Quince',      'baum', 60),
  ('HIM', 'Himbeere',   'Framboise',    'Hambier',     'Raspberry',   'hecke', 70),
  ('TRA', 'Traube',     'Raisin',       'Drauf',       'Grape',       'hecke', 80),
  ('WAC', 'Wacholder',  'Genièvre',     'Wacholder',   'Juniper',     'hecke', 90),
  ('GET', 'Getreide',   'Céréales',     'Getreide',    'Grain',       'feld', 100),
  ('ZUC', 'Zuckerrohr', 'Canne à sucre','Zockerrouer', 'Sugar cane',  'fass', 110),
  ('KRA', 'Kräuter',    'Herbes',       'Kraider',     'Herbs',       'garten', 120),
  ('SON', 'Sonstiges',  'Autres',       'Soss',        'Other',       'sonstiges', 999)
ON CONFLICT (code) DO NOTHING;

INSERT INTO produkttyp (code, name_de, alkoholisch, reihenfolge) VALUES
  ('BRD',  'Brand',        true, 10),
  ('LIK',  'Likör',        true, 20),
  ('GIN',  'Gin',          true, 30),
  ('WHI',  'Whisky',       true, 40),
  ('RUM',  'Rum',          true, 50),
  ('VOD',  'Vodka',        true, 60),
  ('KOR',  'Korn',         true, 70),
  ('MAR',  'Marc',         true, 80),
  ('SAM',  'Sambuca',      true, 90),
  ('VIZ',  'Vizdrëpp',     true, 100),
  ('KRB',  'Kräuterbrand', true, 110),
  ('CHP',  'Apfelchips',   false, 200),
  ('SET',  'Geschenkset',  true, 300),
  ('HDL',  'Handelsware',  false, 400)
ON CONFLICT (code) DO NOTHING;

INSERT INTO lagerort (code, name, typ) VALUES
  ('FASSLAGER',     'Fasslager',      'fass'),
  ('FLASCHENLAGER', 'Flaschenlager',  'flasche'),
  ('HOFLADEN',      'Hofladen',       'verkauf')
ON CONFLICT (code) DO NOTHING;
