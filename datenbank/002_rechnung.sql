-- =====================================================================
--  Hierber Brennerei – Rechnungswesen (PostgreSQL 16)
--  Datei: datenbank/002_rechnung.sql   (setzt 001_schema.sql voraus)
--
--  Grundregeln, die die Datenbank selbst durchsetzt:
--   * Eine Rechnung ist Entwurf, solange sie bearbeitet wird. Sie hat keine Nummer.
--   * Beim Festschreiben bekommt sie eine lückenlose, fortlaufende Nummer je Jahr.
--   * Danach ist sie unveränderlich. Korrekturen laufen über eine Gutschrift.
--   * Jede festgeschriebene Rechnung bucht Lagerabgang und spiegelt sich im
--     Verkaufsbeleg, damit Umsatz- und Alkoholberichte stimmen.
-- =====================================================================

\set ON_ERROR_STOP on
SET search_path TO brennerei, public;

-- ---------------------------------------------------------------------
-- 1. Typen
-- ---------------------------------------------------------------------
DO $$ BEGIN CREATE TYPE belegart AS ENUM ('rechnung','gutschrift');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE belegstatus AS ENUM ('entwurf','festgeschrieben','storniert');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE zahlungsart AS ENUM ('ueberweisung','bar','karte','payconiq','verrechnung','sonstiges');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ---------------------------------------------------------------------
-- 2. Absender (genau eine Zeile)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS firma (
  id                 smallint PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  name               text NOT NULL,
  zusatz             text,
  strasse            text NOT NULL,
  plz                text NOT NULL,
  ort                text NOT NULL,
  land               char(2) NOT NULL DEFAULT 'LU',
  mwst_nr            text,                       -- LU12345678
  betriebsnummer     text,                       -- Zoll / Autorisation
  telefon            text, email text, web text,
  iban               text, bic text, bank text,
  zahlungsziel_tage  integer NOT NULL DEFAULT 30 CHECK (zahlungsziel_tage >= 0),
  fusszeile          text,
  geaendert_am       timestamptz NOT NULL DEFAULT now()
);
COMMENT ON TABLE firma IS 'Absenderdaten für Rechnungen. Genau eine Zeile (id = 1).';

-- ---------------------------------------------------------------------
-- 3. Kunden
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS kunde (
  id                 serial PRIMARY KEY,
  nummer             text NOT NULL UNIQUE,       -- K-0001
  typ                text NOT NULL DEFAULT 'privat' CHECK (typ IN ('privat','geschaeft')),
  name               text NOT NULL,
  zusatz             text,
  strasse            text, plz text, ort text,
  land               char(2) NOT NULL DEFAULT 'LU',
  mwst_nr            text,                       -- USt-IdNr, Voraussetzung für Reverse Charge
  email              text, telefon text,
  zahlungsziel_tage  integer CHECK (zahlungsziel_tage IS NULL OR zahlungsziel_tage >= 0),
  preis_kanal        text NOT NULL DEFAULT '*'
                     CHECK (preis_kanal IN ('*','hofladen','web','handel','markt','fuehrung','sonstiges')),
  notiz              text,
  aktiv              boolean NOT NULL DEFAULT true,
  erstellt_am        timestamptz NOT NULL DEFAULT now(),
  geaendert_am       timestamptz NOT NULL DEFAULT now(),
  CHECK (typ = 'privat' OR mwst_nr IS NOT NULL OR land = 'LU')
);
CREATE INDEX IF NOT EXISTS kunde_name_idx ON kunde (lower(name));
DROP TRIGGER IF EXISTS trg_kunde_geaendert ON kunde;
CREATE TRIGGER trg_kunde_geaendert BEFORE UPDATE ON kunde
  FOR EACH ROW EXECUTE FUNCTION set_geaendert_am();
COMMENT ON COLUMN kunde.preis_kanal IS 'Welche Preisliste gilt. "handel" für Wiederverkäufer und Gastronomie.';

CREATE SEQUENCE IF NOT EXISTS kunde_nummer_seq;
CREATE OR REPLACE FUNCTION kunde_nummer() RETURNS text LANGUAGE sql
SET search_path = brennerei, public
AS $$
  SELECT 'K-' || to_char(nextval('brennerei.kunde_nummer_seq'), 'FM0000')
$$;

-- ---------------------------------------------------------------------
-- 4. Nummernkreise: lückenlos und fortlaufend je Belegart und Jahr
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS nummernkreis (
  art            belegart NOT NULL,
  jahr           integer  NOT NULL CHECK (jahr BETWEEN 2000 AND 2100),
  praefix        text NOT NULL,
  letzte_nummer  integer NOT NULL DEFAULT 0 CHECK (letzte_nummer >= 0),
  PRIMARY KEY (art, jahr)
);
COMMENT ON TABLE nummernkreis IS 'Zähler je Belegart und Jahr. Nummern werden nur beim Festschreiben vergeben, daher ohne Lücken.';

CREATE OR REPLACE FUNCTION naechste_belegnummer(p_art belegart, p_jahr integer)
RETURNS text LANGUAGE plpgsql
SET search_path = brennerei, public
AS $$
DECLARE v_praefix text; v_nr integer;
BEGIN
  INSERT INTO nummernkreis (art, jahr, praefix)
  VALUES (p_art, p_jahr, CASE WHEN p_art = 'rechnung' THEN 'R' ELSE 'G' END)
  ON CONFLICT (art, jahr) DO NOTHING;

  UPDATE nummernkreis SET letzte_nummer = letzte_nummer + 1
   WHERE art = p_art AND jahr = p_jahr
   RETURNING praefix, letzte_nummer INTO v_praefix, v_nr;

  RETURN v_praefix || p_jahr::text || '-' || to_char(v_nr, 'FM0000');
END $$;
COMMENT ON FUNCTION naechste_belegnummer IS 'Sperrt die Zählerzeile, erhöht sie und liefert z. B. R2026-0001. Nur aus rechnung_festschreiben aufrufen.';

-- ---------------------------------------------------------------------
-- 5. Belege
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS rechnung (
  id                  serial PRIMARY KEY,
  art                 belegart NOT NULL DEFAULT 'rechnung',
  nummer              text UNIQUE,
  status              belegstatus NOT NULL DEFAULT 'entwurf',
  kunde_id            integer NOT NULL REFERENCES kunde(id),
  bezieht_auf_id      integer REFERENCES rechnung(id),   -- Gutschrift verweist auf Rechnung
  datum               date NOT NULL DEFAULT CURRENT_DATE,
  leistungsdatum      date,
  faellig_am          date,
  kanal               verkaufskanal NOT NULL DEFAULT 'hofladen',
  reverse_charge      boolean NOT NULL DEFAULT false,
  waehrung            char(3) NOT NULL DEFAULT 'EUR',
  -- Anschrift zum Zeitpunkt der Rechnung einfrieren (Kunde darf später umziehen)
  anschrift           text,
  kunde_mwst_nr       text,
  kopftext            text,
  fusstext            text,
  netto               numeric(12,2) NOT NULL DEFAULT 0,
  mwst                numeric(12,2) NOT NULL DEFAULT 0,
  brutto              numeric(12,2) NOT NULL DEFAULT 0,
  festgeschrieben_am  timestamptz,
  festgeschrieben_von smallint REFERENCES benutzer(id),
  storniert_am        timestamptz,
  storno_grund        text,
  erstellt_am         timestamptz NOT NULL DEFAULT now(),
  geaendert_am        timestamptz NOT NULL DEFAULT now(),
  CHECK (status = 'entwurf' OR nummer IS NOT NULL),
  CHECK (status <> 'entwurf' OR nummer IS NULL),
  CHECK (art = 'rechnung' OR bezieht_auf_id IS NOT NULL)
);
CREATE INDEX IF NOT EXISTS rechnung_kunde_idx ON rechnung (kunde_id, datum DESC);
CREATE INDEX IF NOT EXISTS rechnung_status_idx ON rechnung (status, datum DESC);

CREATE TABLE IF NOT EXISTS rechnungsposition (
  id                 serial PRIMARY KEY,
  rechnung_id        integer NOT NULL REFERENCES rechnung(id) ON DELETE CASCADE,
  pos                smallint NOT NULL CHECK (pos > 0),
  variante_id        integer REFERENCES variante(id),   -- NULL = freie Position (z. B. Führung, Versand)
  bezeichnung        text NOT NULL,
  zusatz             text,
  menge              numeric(12,3) NOT NULL CHECK (menge > 0),
  einheit            text NOT NULL DEFAULT 'Flasche',
  einzelpreis_netto  numeric(12,4) NOT NULL CHECK (einzelpreis_netto >= 0),
  rabatt_prozent     numeric(5,2) NOT NULL DEFAULT 0 CHECK (rabatt_prozent >= 0 AND rabatt_prozent <= 100),
  mwst_satz          numeric(5,4) NOT NULL CHECK (mwst_satz >= 0 AND mwst_satz < 1),
  losnummer          text,
  netto              numeric(12,2) GENERATED ALWAYS AS
                     (round(menge * einzelpreis_netto * (1 - rabatt_prozent / 100), 2)) STORED,
  UNIQUE (rechnung_id, pos)
);
CREATE INDEX IF NOT EXISTS rechnungsposition_rechnung_idx ON rechnungsposition (rechnung_id, pos);
COMMENT ON COLUMN rechnungsposition.variante_id IS 'Leer bei freien Positionen wie Führung oder Versand. Nur Positionen mit Variante buchen Lager.';

CREATE TABLE IF NOT EXISTS zahlung (
  id            serial PRIMARY KEY,
  rechnung_id   integer NOT NULL REFERENCES rechnung(id),
  datum         date NOT NULL DEFAULT CURRENT_DATE,
  betrag        numeric(12,2) NOT NULL CHECK (betrag <> 0),
  art           zahlungsart NOT NULL DEFAULT 'ueberweisung',
  referenz      text,
  erfasst_von   smallint REFERENCES benutzer(id),
  erfasst_am    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS zahlung_rechnung_idx ON zahlung (rechnung_id);

-- ---------------------------------------------------------------------
-- 6. Unveränderlichkeit festgeschriebener Belege
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION rechnung_schuetzen() RETURNS trigger
LANGUAGE plpgsql
SET search_path = brennerei, public
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    IF OLD.status <> 'entwurf' THEN
      RAISE EXCEPTION 'Beleg % ist festgeschrieben und darf nicht gelöscht werden. Bitte Gutschrift erstellen.', OLD.nummer;
    END IF;
    RETURN OLD;
  END IF;

  IF OLD.status = 'festgeschrieben' THEN
    -- erlaubt ist nur der Übergang nach storniert (mit Grund und Zeitpunkt)
    IF NEW.status = 'storniert' AND NEW.nummer IS NOT DISTINCT FROM OLD.nummer
       AND NEW.netto = OLD.netto AND NEW.mwst = OLD.mwst AND NEW.brutto = OLD.brutto
       AND NEW.kunde_id = OLD.kunde_id AND NEW.datum = OLD.datum THEN
      RETURN NEW;
    END IF;
    RAISE EXCEPTION 'Beleg % ist festgeschrieben und unveränderlich. Korrektur bitte über eine Gutschrift.', OLD.nummer;
  END IF;

  IF OLD.status = 'storniert' THEN
    RAISE EXCEPTION 'Beleg % ist storniert und unveränderlich.', OLD.nummer;
  END IF;

  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS trg_rechnung_schuetzen ON rechnung;
CREATE TRIGGER trg_rechnung_schuetzen BEFORE UPDATE OR DELETE ON rechnung
  FOR EACH ROW EXECUTE FUNCTION rechnung_schuetzen();

CREATE OR REPLACE FUNCTION position_schuetzen() RETURNS trigger
LANGUAGE plpgsql
SET search_path = brennerei, public
AS $$
DECLARE v_status belegstatus; v_nummer text; v_id integer;
BEGIN
  v_id := COALESCE(NEW.rechnung_id, OLD.rechnung_id);
  SELECT status, nummer INTO v_status, v_nummer FROM rechnung WHERE id = v_id;
  IF v_status IS DISTINCT FROM 'entwurf' THEN
    RAISE EXCEPTION 'Positionen von Beleg % können nicht mehr geändert werden (Status %).', COALESCE(v_nummer, v_id::text), v_status;
  END IF;
  RETURN COALESCE(NEW, OLD);
END $$;

DROP TRIGGER IF EXISTS trg_position_schuetzen ON rechnungsposition;
CREATE TRIGGER trg_position_schuetzen BEFORE INSERT OR UPDATE OR DELETE ON rechnungsposition
  FOR EACH ROW EXECUTE FUNCTION position_schuetzen();

-- Audit für Belege
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['kunde','rechnung','rechnungsposition','zahlung','nummernkreis'] LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS trg_audit_%1$s ON %1$s', t);
    EXECUTE format('CREATE TRIGGER trg_audit_%1$s AFTER INSERT OR UPDATE OR DELETE ON %1$s FOR EACH ROW EXECUTE FUNCTION audit_trigger()', t);
  END LOOP;
END $$;

-- ---------------------------------------------------------------------
-- 7. Rechnen: Summen und MwSt je Satz
-- ---------------------------------------------------------------------
DROP VIEW IF EXISTS v_journal, v_umsatz_kunde, v_mwst_meldung, v_offene_posten,
                    v_beleg, v_rechnung_mwst CASCADE;

CREATE OR REPLACE VIEW v_rechnung_mwst AS
SELECT p.rechnung_id,
       p.mwst_satz,
       SUM(p.netto)                                   AS netto,
       round(SUM(p.netto) * p.mwst_satz, 2)           AS mwst,
       SUM(p.netto) + round(SUM(p.netto) * p.mwst_satz, 2) AS brutto
FROM rechnungsposition p
GROUP BY p.rechnung_id, p.mwst_satz;
COMMENT ON VIEW v_rechnung_mwst IS 'MwSt je Steuersatz und Beleg. Gerundet wird je Satz, nicht je Position (Pflicht auf der Rechnung).';

CREATE OR REPLACE FUNCTION rechnung_summen_neu(p_rechnung_id integer)
RETURNS void LANGUAGE plpgsql
SET search_path = brennerei, public
AS $$
DECLARE v_netto numeric(12,2); v_mwst numeric(12,2); v_rc boolean;
BEGIN
  SELECT reverse_charge INTO v_rc FROM rechnung WHERE id = p_rechnung_id;
  SELECT COALESCE(SUM(netto), 0), COALESCE(SUM(mwst), 0)
    INTO v_netto, v_mwst FROM v_rechnung_mwst WHERE rechnung_id = p_rechnung_id;
  IF v_rc THEN v_mwst := 0; END IF;
  UPDATE rechnung
     SET netto = v_netto, mwst = v_mwst, brutto = v_netto + v_mwst, geaendert_am = now()
   WHERE id = p_rechnung_id;
END $$;
COMMENT ON FUNCTION rechnung_summen_neu IS 'Rechnet Netto, MwSt und Brutto aus den Positionen. Bei Reverse Charge bleibt die MwSt null.';

-- ---------------------------------------------------------------------
-- 8. Beleg anlegen, Position hinzufügen
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION rechnung_anlegen(
  p_kunde_id integer, p_kanal verkaufskanal DEFAULT 'hofladen',
  p_datum date DEFAULT CURRENT_DATE, p_kopftext text DEFAULT NULL)
RETURNS rechnung LANGUAGE plpgsql
SET search_path = brennerei, public
AS $$
DECLARE v_k kunde%ROWTYPE; v_f firma%ROWTYPE; v_row rechnung%ROWTYPE; v_rc boolean; v_ziel integer;
BEGIN
  SELECT * INTO v_k FROM kunde WHERE id = p_kunde_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'Kunde % existiert nicht', p_kunde_id; END IF;
  SELECT * INTO v_f FROM firma WHERE id = 1;

  -- Reverse Charge: Geschäftskunde im EU-Ausland mit MwSt-Nummer
  v_rc := (v_k.typ = 'geschaeft' AND v_k.land <> COALESCE(v_f.land, 'LU') AND COALESCE(v_k.mwst_nr, '') <> '');
  v_ziel := COALESCE(v_k.zahlungsziel_tage, v_f.zahlungsziel_tage, 30);

  INSERT INTO rechnung (kunde_id, kanal, datum, leistungsdatum, faellig_am, reverse_charge,
                        anschrift, kunde_mwst_nr, kopftext)
  VALUES (p_kunde_id, p_kanal, p_datum, p_datum, p_datum + v_ziel, v_rc,
          concat_ws(E'\n', v_k.name, v_k.zusatz, v_k.strasse,
                    NULLIF(trim(concat_ws(' ', v_k.plz, v_k.ort)), ''),
                    CASE WHEN v_k.land <> COALESCE(v_f.land,'LU') THEN v_k.land END),
          v_k.mwst_nr, p_kopftext)
  RETURNING * INTO v_row;
  RETURN v_row;
END $$;

CREATE OR REPLACE FUNCTION position_hinzufuegen(
  p_rechnung_id integer, p_variante_id integer, p_menge numeric,
  p_einzelpreis numeric DEFAULT NULL, p_rabatt numeric DEFAULT 0,
  p_bezeichnung text DEFAULT NULL, p_losnummer text DEFAULT NULL)
RETURNS rechnungsposition LANGUAGE plpgsql
SET search_path = brennerei, public
AS $$
DECLARE
  v_r rechnung%ROWTYPE; v_kanal text; v_preis numeric; v_satz numeric;
  v_bez text; v_pos smallint; v_row rechnungsposition%ROWTYPE; v_los text; v_einheit text;
BEGIN
  SELECT * INTO v_r FROM rechnung WHERE id = p_rechnung_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Beleg % existiert nicht', p_rechnung_id; END IF;

  SELECT COALESCE(k.preis_kanal, '*') INTO v_kanal FROM kunde k WHERE k.id = v_r.kunde_id;

  SELECT COALESCE(p_einzelpreis, preis_aktuell(p_variante_id, v_kanal, v_r.datum)),
         m.satz,
         COALESCE(p_bezeichnung, pr.name_de || ', ' || v.fuellmenge_ml || ' ' || v.grundeinheit
                  || COALESCE(' · ' || rtrim(rtrim(pr.alkohol_vol::text, '0'), '.') || ' % vol', '')),
         CASE v.grundeinheit WHEN 'ml' THEN 'Flasche' WHEN 'g' THEN 'Packung' ELSE 'Stück' END
    INTO v_preis, v_satz, v_bez, v_einheit
  FROM variante v
  JOIN produkt pr ON pr.id = v.produkt_id
  JOIN mwst_satz m ON m.id = v.mwst_satz_id
  WHERE v.id = p_variante_id;
  IF v_bez IS NULL THEN RAISE EXCEPTION 'Variante % existiert nicht', p_variante_id; END IF;
  IF v_preis IS NULL THEN RAISE EXCEPTION 'Für Variante % ist kein gültiger Preis hinterlegt', p_variante_id; END IF;

  -- Losnummer der jüngsten Abfüllung mitgeben, falls nicht angegeben
  v_los := COALESCE(p_losnummer,
    (SELECT a.losnummer FROM abfuellung a WHERE a.variante_id = p_variante_id
      ORDER BY a.abgefuellt_am DESC, a.id DESC LIMIT 1));

  SELECT COALESCE(MAX(pos), 0) + 1 INTO v_pos FROM rechnungsposition WHERE rechnung_id = p_rechnung_id;

  INSERT INTO rechnungsposition (rechnung_id, pos, variante_id, bezeichnung, menge, einheit,
                                 einzelpreis_netto, rabatt_prozent, mwst_satz, losnummer)
  VALUES (p_rechnung_id, v_pos, p_variante_id, v_bez, p_menge, v_einheit,
          v_preis, COALESCE(p_rabatt, 0), v_satz, v_los)
  RETURNING * INTO v_row;

  PERFORM rechnung_summen_neu(p_rechnung_id);
  RETURN v_row;
END $$;

CREATE OR REPLACE FUNCTION position_frei_hinzufuegen(
  p_rechnung_id integer, p_bezeichnung text, p_menge numeric, p_einzelpreis numeric,
  p_mwst_satz numeric DEFAULT 0.17, p_einheit text DEFAULT 'Stück')
RETURNS rechnungsposition LANGUAGE plpgsql
SET search_path = brennerei, public
AS $$
DECLARE v_pos smallint; v_row rechnungsposition%ROWTYPE;
BEGIN
  SELECT COALESCE(MAX(pos), 0) + 1 INTO v_pos FROM rechnungsposition WHERE rechnung_id = p_rechnung_id;
  INSERT INTO rechnungsposition (rechnung_id, pos, bezeichnung, menge, einheit, einzelpreis_netto, mwst_satz)
  VALUES (p_rechnung_id, v_pos, p_bezeichnung, p_menge, p_einheit, p_einzelpreis, p_mwst_satz)
  RETURNING * INTO v_row;
  PERFORM rechnung_summen_neu(p_rechnung_id);
  RETURN v_row;
END $$;
COMMENT ON FUNCTION position_frei_hinzufuegen IS 'Für Leistungen ohne Artikel: Führung, Versandkosten, Pfand.';

-- ---------------------------------------------------------------------
-- 9. Festschreiben: Nummer vergeben, Lager buchen, Beleg spiegeln
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION rechnung_festschreiben(p_rechnung_id integer, p_benutzer_id smallint DEFAULT NULL)
RETURNS rechnung LANGUAGE plpgsql
SET search_path = brennerei, public
AS $$
DECLARE
  v_r rechnung%ROWTYPE; v_nummer text; v_anz integer; v_grund bewegungsgrund;
  v_beleg_id integer; v_p rechnungsposition%ROWTYPE;
  v_lager integer;    -- Lager: Rechnung bucht ab, Gutschrift bucht zu
  v_umsatz integer;   -- Umsatz: Rechnung zählt positiv, Gutschrift negativ
BEGIN
  SELECT * INTO v_r FROM rechnung WHERE id = p_rechnung_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Beleg % existiert nicht', p_rechnung_id; END IF;
  IF v_r.status <> 'entwurf' THEN
    RAISE EXCEPTION 'Beleg % ist bereits festgeschrieben', COALESCE(v_r.nummer, p_rechnung_id::text);
  END IF;

  SELECT count(*) INTO v_anz FROM rechnungsposition WHERE rechnung_id = p_rechnung_id;
  IF v_anz = 0 THEN RAISE EXCEPTION 'Beleg ohne Positionen kann nicht festgeschrieben werden'; END IF;

  PERFORM rechnung_summen_neu(p_rechnung_id);
  SELECT * INTO v_r FROM rechnung WHERE id = p_rechnung_id;

  v_nummer := naechste_belegnummer(v_r.art, EXTRACT(YEAR FROM v_r.datum)::integer);

  UPDATE rechnung
     SET nummer = v_nummer, status = 'festgeschrieben',
         festgeschrieben_am = now(), festgeschrieben_von = p_benutzer_id,
         geaendert_am = now()
   WHERE id = p_rechnung_id;

  v_lager  := CASE WHEN v_r.art = 'rechnung' THEN -1 ELSE 1 END;
  v_umsatz := CASE WHEN v_r.art = 'gutschrift' THEN -1 ELSE 1 END;
  v_grund := CASE
    WHEN v_r.art = 'gutschrift'   THEN 'retoure'::bewegungsgrund
    WHEN v_r.kanal = 'web'        THEN 'verkauf_web'::bewegungsgrund
    WHEN v_r.kanal = 'handel'     THEN 'verkauf_handel'::bewegungsgrund
    WHEN v_r.kanal = 'markt'      THEN 'verkauf_markt'::bewegungsgrund
    ELSE 'verkauf_hofladen'::bewegungsgrund END;

  FOR v_p IN SELECT * FROM rechnungsposition WHERE rechnung_id = p_rechnung_id AND variante_id IS NOT NULL LOOP
    INSERT INTO lagerbewegung (variante_id, lagerort_id, menge, grund, losnummer, beleg_ref, benutzer_id)
    VALUES (v_p.variante_id,
            (SELECT id FROM lagerort WHERE code = CASE WHEN v_r.kanal = 'hofladen' THEN 'HOFLADEN' ELSE 'FLASCHENLAGER' END),
            v_lager * round(v_p.menge)::integer,
            v_grund, v_p.losnummer, v_nummer, p_benutzer_id);
  END LOOP;

  -- Spiegel für Umsatzberichte
  INSERT INTO verkaufsbeleg (kanal, extern_ref, datum, kunde_ref, land, netto_summe, mwst_summe, brutto_summe)
  SELECT v_r.kanal, v_nummer, v_r.datum, k.nummer, k.land,
         v_umsatz * v_r.netto, v_umsatz * v_r.mwst, v_umsatz * v_r.brutto
  FROM kunde k WHERE k.id = v_r.kunde_id
  RETURNING id INTO v_beleg_id;

  INSERT INTO verkaufsposition (beleg_id, variante_id, menge, preis_netto, mwst_satz, losnummer)
  SELECT v_beleg_id, p.variante_id, round(p.menge)::integer, p.einzelpreis_netto, p.mwst_satz, p.losnummer
  FROM rechnungsposition p WHERE p.rechnung_id = p_rechnung_id AND p.variante_id IS NOT NULL;

  SELECT * INTO v_r FROM rechnung WHERE id = p_rechnung_id;
  RETURN v_r;
END $$;
COMMENT ON FUNCTION rechnung_festschreiben IS 'Einziger Weg, einen Beleg gültig zu machen: Nummer, Lagerbuchung und Umsatzspiegel in einer Transaktion.';

-- ---------------------------------------------------------------------
-- 10. Gutschrift aus einer Rechnung erzeugen
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION gutschrift_erzeugen(p_rechnung_id integer, p_grund text DEFAULT NULL)
RETURNS rechnung LANGUAGE plpgsql
SET search_path = brennerei, public
AS $$
DECLARE v_r rechnung%ROWTYPE; v_neu rechnung%ROWTYPE;
BEGIN
  SELECT * INTO v_r FROM rechnung WHERE id = p_rechnung_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'Beleg % existiert nicht', p_rechnung_id; END IF;
  IF v_r.art <> 'rechnung' THEN RAISE EXCEPTION 'Nur zu einer Rechnung kann eine Gutschrift erstellt werden'; END IF;
  IF v_r.status <> 'festgeschrieben' THEN RAISE EXCEPTION 'Nur zu einer festgeschriebenen Rechnung kann eine Gutschrift erstellt werden'; END IF;

  INSERT INTO rechnung (art, kunde_id, bezieht_auf_id, datum, leistungsdatum, faellig_am, kanal,
                        reverse_charge, anschrift, kunde_mwst_nr, kopftext)
  VALUES ('gutschrift', v_r.kunde_id, v_r.id, CURRENT_DATE, v_r.leistungsdatum, CURRENT_DATE, v_r.kanal,
          v_r.reverse_charge, v_r.anschrift, v_r.kunde_mwst_nr,
          COALESCE(p_grund, 'Gutschrift zu Rechnung ' || v_r.nummer))
  RETURNING * INTO v_neu;

  INSERT INTO rechnungsposition (rechnung_id, pos, variante_id, bezeichnung, zusatz, menge, einheit,
                                 einzelpreis_netto, rabatt_prozent, mwst_satz, losnummer)
  SELECT v_neu.id, pos, variante_id, bezeichnung, zusatz, menge, einheit,
         einzelpreis_netto, rabatt_prozent, mwst_satz, losnummer
  FROM rechnungsposition WHERE rechnung_id = v_r.id ORDER BY pos;

  PERFORM rechnung_summen_neu(v_neu.id);
  SELECT * INTO v_neu FROM rechnung WHERE id = v_neu.id;
  RETURN v_neu;
END $$;
COMMENT ON FUNCTION gutschrift_erzeugen IS 'Legt eine Gutschrift als Entwurf an. Positionen können vor dem Festschreiben gekürzt werden (Teilgutschrift).';

-- ---------------------------------------------------------------------
-- 11. Sichten für Auswertung und Buchhaltung
-- ---------------------------------------------------------------------
CREATE OR REPLACE VIEW v_beleg AS
SELECT r.id, r.art, r.nummer, r.status, r.datum, r.leistungsdatum, r.faellig_am, r.kanal,
       r.reverse_charge, r.netto, r.mwst, r.brutto,
       CASE WHEN r.art = 'gutschrift' THEN -1 ELSE 1 END AS vorzeichen,
       k.id AS kunde_id, k.nummer AS kunde_nummer, k.name AS kunde, k.land, k.mwst_nr AS kunde_mwst,
       b.nummer AS bezieht_auf
FROM rechnung r
JOIN kunde k ON k.id = r.kunde_id
LEFT JOIN rechnung b ON b.id = r.bezieht_auf_id;

CREATE OR REPLACE VIEW v_offene_posten AS
WITH bezahlt AS (
  SELECT rechnung_id, SUM(betrag) AS summe FROM zahlung GROUP BY rechnung_id
), gutgeschrieben AS (
  SELECT bezieht_auf_id AS rechnung_id, SUM(brutto) AS summe
  FROM rechnung WHERE art = 'gutschrift' AND status = 'festgeschrieben' AND bezieht_auf_id IS NOT NULL
  GROUP BY bezieht_auf_id
)
SELECT r.id, r.nummer, r.datum, r.faellig_am, k.nummer AS kunde_nummer, k.name AS kunde, k.email,
       r.brutto,
       COALESCE(z.summe, 0)  AS bezahlt,
       COALESCE(g.summe, 0)  AS gutgeschrieben,
       round(r.brutto - COALESCE(z.summe, 0) - COALESCE(g.summe, 0), 2) AS offen,
       (CURRENT_DATE - r.faellig_am)                                     AS tage_ueberfaellig
FROM rechnung r
JOIN kunde k ON k.id = r.kunde_id
LEFT JOIN bezahlt z ON z.rechnung_id = r.id
LEFT JOIN gutgeschrieben g ON g.rechnung_id = r.id
WHERE r.art = 'rechnung' AND r.status = 'festgeschrieben'
  AND round(r.brutto - COALESCE(z.summe, 0) - COALESCE(g.summe, 0), 2) > 0;
COMMENT ON VIEW v_offene_posten IS 'Noch nicht ausgeglichene Rechnungen. Gutschriften und Zahlungen werden abgezogen.';

CREATE OR REPLACE VIEW v_mwst_meldung AS
SELECT date_trunc('month', r.datum)::date AS monat,
       m.mwst_satz,
       SUM(m.netto * CASE WHEN r.art = 'gutschrift' THEN -1 ELSE 1 END) AS netto,
       SUM(CASE WHEN r.reverse_charge THEN 0 ELSE m.mwst END
           * CASE WHEN r.art = 'gutschrift' THEN -1 ELSE 1 END)         AS mwst,
       bool_or(r.reverse_charge)                                        AS enthaelt_reverse_charge
FROM rechnung r
JOIN v_rechnung_mwst m ON m.rechnung_id = r.id
WHERE r.status = 'festgeschrieben'
GROUP BY 1, 2 ORDER BY 1, 2;
COMMENT ON VIEW v_mwst_meldung IS 'Bemessungsgrundlage und Steuer je Satz und Monat. Grundlage für die MwSt-Erklärung an die AED.';

CREATE OR REPLACE VIEW v_umsatz_kunde AS
SELECT k.nummer, k.name, k.land,
       date_trunc('year', r.datum)::date AS jahr,
       SUM(r.netto * CASE WHEN r.art = 'gutschrift' THEN -1 ELSE 1 END) AS netto
FROM rechnung r JOIN kunde k ON k.id = r.kunde_id
WHERE r.status = 'festgeschrieben'
GROUP BY 1, 2, 3, 4 ORDER BY jahr DESC, netto DESC;

CREATE OR REPLACE VIEW v_journal AS
SELECT r.nummer, r.art, r.datum, r.leistungsdatum, k.nummer AS kunde_nummer, k.name AS kunde,
       k.land, k.mwst_nr, p.mwst_satz, p.netto,
       CASE WHEN r.reverse_charge THEN 0::numeric(12,2) ELSE p.mwst END AS mwst,
       p.netto + CASE WHEN r.reverse_charge THEN 0::numeric(12,2) ELSE p.mwst END AS brutto,
       r.reverse_charge, r.kanal
FROM rechnung r
JOIN kunde k ON k.id = r.kunde_id
JOIN v_rechnung_mwst p ON p.rechnung_id = r.id
WHERE r.status = 'festgeschrieben'
ORDER BY r.datum, r.nummer;
COMMENT ON VIEW v_journal IS 'Zeile je Beleg und Steuersatz. Export für die Fiduciaire.';

-- ---------------------------------------------------------------------
-- 12. Rechte
-- ---------------------------------------------------------------------
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA brennerei TO brennerei_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA brennerei TO brennerei_app;
GRANT SELECT ON ALL TABLES IN SCHEMA brennerei TO brennerei_lesen;
GRANT SELECT ON ALL TABLES IN SCHEMA brennerei TO brennerei_etikett;

-- ---------------------------------------------------------------------
-- 13. Absender anlegen, falls noch nicht vorhanden
-- ---------------------------------------------------------------------
INSERT INTO firma (id, name, strasse, plz, ort, land, telefon, email, web, zahlungsziel_tage, fusszeile)
VALUES (1, 'Hierber Brennerei', '2, Millewee', 'L-6665', 'Herborn', 'LU',
        '+352 72 76 02', 'info@hierber-brennerei.lu', 'www.hierber-brennerei.lu', 30,
        'Vielen Dank für Ihren Einkauf.')
ON CONFLICT (id) DO NOTHING;
