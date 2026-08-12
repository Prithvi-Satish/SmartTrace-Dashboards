-- ============================================================
-- SmartTrace™ — Full Database Migration
-- All 17 tables across 7 domains
-- Run this entire script in: Supabase Dashboard → SQL Editor
-- ============================================================

-- Enable UUID extension (already enabled on Supabase by default)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- DOMAIN 7: REFERENCE TABLES (must be created first — no deps)
-- ============================================================

-- 1. facilities
CREATE TABLE IF NOT EXISTS public.facilities (
  facility_id       VARCHAR(32) PRIMARY KEY,
  name              TEXT NOT NULL,
  address           TEXT,
  city              TEXT,
  state             TEXT,
  pincode           VARCHAR(10),
  cpcb_license_no   VARCHAR(64) UNIQUE,
  spcb_zone         VARCHAR(32),
  nodal_officer     TEXT,
  contact_email     TEXT,
  contact_phone     VARCHAR(20),
  license_valid_from DATE,
  license_valid_until DATE,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- 2. cbwtf_vendors
CREATE TABLE IF NOT EXISTS public.cbwtf_vendors (
  vendor_id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_name       TEXT NOT NULL,
  license_no        VARCHAR(64) UNIQUE,
  region            TEXT,
  contact_name      TEXT,
  contact_phone     VARCHAR(20),
  contact_email     TEXT,
  vehicle_count     SMALLINT DEFAULT 0,
  active            BOOLEAN DEFAULT TRUE,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- 3. profiles (extends Supabase auth.users — one row per user)
CREATE TABLE IF NOT EXISTS public.profiles (
  id                UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name              TEXT NOT NULL,
  role              TEXT NOT NULL DEFAULT 'staff',
  role_label        TEXT,
  department        TEXT,
  facility_id       VARCHAR(32) REFERENCES public.facilities(facility_id),
  avatar_url        TEXT,
  permissions       JSONB DEFAULT '["view_machines"]'::jsonb,
  active            BOOLEAN DEFAULT TRUE,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- 4. facility_documents (Form II/III static permit PDFs — idle until wired up)
CREATE TABLE IF NOT EXISTS public.facility_documents (
  doc_id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id       VARCHAR(32) REFERENCES public.facilities(facility_id),
  doc_type          VARCHAR(16) NOT NULL, -- 'FORM_II', 'FORM_III', 'LICENSE', 'CONSENT'
  title             TEXT,
  valid_from        DATE,
  valid_until       DATE,
  document_path     TEXT,  -- Supabase Storage path
  uploaded_by       UUID REFERENCES public.profiles(id),
  uploaded_at       TIMESTAMPTZ DEFAULT NOW(),
  notes             TEXT
);

-- ============================================================
-- DOMAIN 1: MACHINE REGISTRY
-- ============================================================

-- 5. machines
CREATE TABLE IF NOT EXISTS public.machines (
  machine_id              VARCHAR(32) PRIMARY KEY,
  serial_number           VARCHAR(64) UNIQUE NOT NULL,
  hospital_id             VARCHAR(32) REFERENCES public.facilities(facility_id),
  name                    TEXT NOT NULL,
  location                TEXT,
  department              TEXT,
  firmware_version        VARCHAR(32),
  software_version        VARCHAR(32),
  installation_date       DATE,
  procurement_date        DATE,
  last_calibration_date   DATE,
  next_calibration_date   DATE,
  calibration_status      VARCHAR(32) DEFAULT 'VALID', -- VALID, OVERDUE, DUE_SOON
  connectivity_mode       VARCHAR(64),
  hardware_ecdsa_key_id   VARCHAR(64), -- Registered public key ID of edge crypto chip
  status                  VARCHAR(16) DEFAULT 'Idle', -- Running, Idle, Alarm, Maintenance
  created_at              TIMESTAMPTZ DEFAULT NOW(),
  updated_at              TIMESTAMPTZ DEFAULT NOW()
);

-- 6. machine_health_snapshots (idle until edge integration — schema complete)
CREATE TABLE IF NOT EXISTS public.machine_health_snapshots (
  snapshot_id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  machine_id          VARCHAR(32) REFERENCES public.machines(machine_id),
  recorded_at         TIMESTAMPTZ DEFAULT NOW(),
  pump_health_pct     NUMERIC(5,2),
  fan_health_pct      NUMERIC(5,2),
  motor_health_pct    NUMERIC(5,2),
  filter_life_pct     NUMERIC(5,2),
  catalyst_life_pct   NUMERIC(5,2),
  door_cycle_count    INTEGER,
  fan_rpm             NUMERIC(7,2),
  notes               TEXT
);

-- ============================================================
-- DOMAIN 2: CYCLE DATA
-- ============================================================

-- 7. cycles
CREATE TABLE IF NOT EXISTS public.cycles (
  cycle_id            VARCHAR(48) PRIMARY KEY,
  machine_id          VARCHAR(32) REFERENCES public.machines(machine_id),
  operator_id         UUID REFERENCES public.profiles(id),
  operator_name       TEXT,  -- Denormalized for audit display
  department          TEXT,  -- Denormalized at cycle time
  bag_id              VARCHAR(48),
  waste_category      VARCHAR(64), -- Yellow Bag, Red Bag, White Sharps, Blue Glassware
  cassette_id         VARCHAR(48),
  start_time          TIMESTAMPTZ,
  end_time            TIMESTAMPTZ,
  duration_minutes    NUMERIC(6,2),
  current_phase_step  SMALLINT,  -- 1-20
  cycle_result        VARCHAR(16), -- PASSED, FAILED, ABORTED, FLAGGED
  abort_reason        TEXT,
  sha256_hash         VARCHAR(64),  -- Hash of this cycle's canonical payload
  previous_hash       VARCHAR(64),  -- Hash of prior cycle on same machine (chain integrity)
  signature_verified  BOOLEAN DEFAULT FALSE,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- DOMAIN 3: AI CAMERA VISION
-- ============================================================

-- 8. camera_inspections
CREATE TABLE IF NOT EXISTS public.camera_inspections (
  inspection_id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cycle_id                  VARCHAR(48) REFERENCES public.cycles(cycle_id),
  machine_id                VARCHAR(32) REFERENCES public.machines(machine_id),
  captured_at               TIMESTAMPTZ DEFAULT NOW(),
  image_path                TEXT,  -- Supabase Storage: camera-inspections/
  bag_detected              BOOLEAN,
  operator_declared_color   VARCHAR(16), -- Yellow, Red, White, Blue
  ai_detected_color         VARCHAR(16),
  color_match               BOOLEAN,
  color_confidence_pct      NUMERIC(5,2),
  bag_integrity_status      VARCHAR(16), -- INTACT, TORN, LEAKING, UNCLEAR
  integrity_confidence_pct  NUMERIC(5,2),
  leak_detected             BOOLEAN,
  leak_confidence_pct       NUMERIC(5,2),
  decision                  VARCHAR(8),  -- GO, NO_GO
  no_go_reason              TEXT,
  model_version             VARCHAR(32)
);

-- ============================================================
-- DOMAIN 4: SAFETY EVENTS
-- ============================================================

-- 9. safety_events
CREATE TABLE IF NOT EXISTS public.safety_events (
  event_id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  machine_id              VARCHAR(32) REFERENCES public.machines(machine_id),
  cycle_id                VARCHAR(48) REFERENCES public.cycles(cycle_id),
  event_type              VARCHAR(32) NOT NULL,
  -- event_type enum: emergency_stop, door_forced_open, power_failure,
  -- pump_failure, sensor_failure, pressure_alarm, h2o2_alarm,
  -- communication_failure, calibration_overdue, temperature_excursion
  triggered_at            TIMESTAMPTZ DEFAULT NOW(),
  resolved_at             TIMESTAMPTZ,
  is_resolved             BOOLEAN DEFAULT FALSE,
  triggered_metrics       JSONB,  -- Full sensor snapshot at trigger moment
  failed_checks           TEXT[], -- e.g. {"pressure_alarm","h2o2_alarm"}
  passing_checks          TEXT[], -- All checks passing at trigger time
  cycle_aborted           BOOLEAN DEFAULT FALSE,
  abort_phase_step        SMALLINT,
  operator_acknowledged   BOOLEAN DEFAULT FALSE,
  acknowledged_by         UUID REFERENCES public.profiles(id),
  acknowledged_at         TIMESTAMPTZ,
  notes                   TEXT
);

-- ============================================================
-- DOMAIN 5: ENVIRONMENT / TELEMETRY
-- ============================================================

-- 10. telemetry_cycle_summary (one row per completed cycle)
CREATE TABLE IF NOT EXISTS public.telemetry_cycle_summary (
  summary_id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cycle_id                VARCHAR(48) REFERENCES public.cycles(cycle_id),
  machine_id              VARCHAR(32) REFERENCES public.machines(machine_id),
  min_temp_c              NUMERIC(6,2),
  max_temp_c              NUMERIC(6,2),
  avg_temp_c              NUMERIC(6,2),
  target_temp_c           NUMERIC(6,2),
  min_pressure_mbar       NUMERIC(7,2),
  max_pressure_mbar       NUMERIC(7,2),
  min_h2o2_ppm            NUMERIC(7,2),
  max_h2o2_ppm            NUMERIC(7,2),
  peak_residual_h2o2_ppm  NUMERIC(7,2),  -- Critical: confirms safe aeration
  min_vaporizer_temp_c    NUMERIC(6,2),
  max_vaporizer_temp_c    NUMERIC(6,2),
  door_opened_count       SMALLINT DEFAULT 0,  -- Unauthorized openings = red flag
  heater_fault_detected   BOOLEAN DEFAULT FALSE,
  pump_fault_detected     BOOLEAN DEFAULT FALSE,
  fan_fault_detected      BOOLEAN DEFAULT FALSE,
  sample_count            INTEGER,  -- Total raw readings collected this cycle
  recorded_at             TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- DOMAIN 6: STATUTORY COMPLIANCE (CPCB/SPCB)
-- ============================================================

-- 11. statutory_forms (master registry for all form submissions)
CREATE TABLE IF NOT EXISTS public.statutory_forms (
  form_id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id         VARCHAR(32) REFERENCES public.facilities(facility_id),
  form_type           VARCHAR(8) NOT NULL, -- FORM_I, FORM_II, FORM_III, FORM_IV, FORM_VI
  period_start        DATE,
  period_end          DATE,
  submitted_at        TIMESTAMPTZ,
  submitted_by        UUID REFERENCES public.profiles(id),
  submission_status   VARCHAR(16) DEFAULT 'DRAFT', -- DRAFT, SUBMITTED, ACKNOWLEDGED, REJECTED
  spcb_reference_no   TEXT,
  pdf_path            TEXT,  -- Supabase Storage: statutory-forms/
  payload_json        JSONB, -- Full structured form data at submission time
  sha256_hash         VARCHAR(64), -- Hash of payload_json for tamper detection
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- 12. form_i_accident_reports (major accidents — 24-hour SLA)
CREATE TABLE IF NOT EXISTS public.form_i_accident_reports (
  report_id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_id                     UUID REFERENCES public.statutory_forms(form_id),
  accident_occurred_at        TIMESTAMPTZ NOT NULL,
  sla_deadline_at             TIMESTAMPTZ NOT NULL, -- accident_occurred_at + 24h
  submitted_at                TIMESTAMPTZ,
  sla_breached                BOOLEAN GENERATED ALWAYS AS (
                                submitted_at IS NOT NULL AND submitted_at > sla_deadline_at
                              ) STORED,
  accident_description        TEXT,
  corrective_actions_taken    TEXT,
  linked_safety_event_id      UUID REFERENCES public.safety_events(event_id)
);

-- 13. form_vi_manifests (waste transfer manifests per CBWTF pickup)
CREATE TABLE IF NOT EXISTS public.form_vi_manifests (
  manifest_id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  manifest_no               VARCHAR(64) UNIQUE NOT NULL,
  facility_id               VARCHAR(32) REFERENCES public.facilities(facility_id),
  cbwtf_vendor_id           UUID REFERENCES public.cbwtf_vendors(vendor_id),
  pickup_timestamp          TIMESTAMPTZ NOT NULL,
  vehicle_registration      VARCHAR(32),
  driver_name               VARCHAR(64),
  yellow_kg                 NUMERIC(7,2) DEFAULT 0,
  red_kg                    NUMERIC(7,2) DEFAULT 0,
  white_sharps_kg           NUMERIC(7,2) DEFAULT 0,
  blue_glassware_kg         NUMERIC(7,2) DEFAULT 0,
  total_hospital_weight_kg  NUMERIC(8,2) NOT NULL,
  cbwtf_scanned_weight_kg   NUMERIC(8,2) NOT NULL,
  weight_discrepancy_pct    NUMERIC(5,2) GENERATED ALWAYS AS (
                              ROUND(ABS(total_hospital_weight_kg - cbwtf_scanned_weight_kg)
                              / NULLIF(total_hospital_weight_kg, 0) * 100, 2)
                            ) STORED,
  discrepancy_flag          BOOLEAN GENERATED ALWAYS AS (
                              ABS(total_hospital_weight_kg - cbwtf_scanned_weight_kg)
                              / NULLIF(total_hospital_weight_kg, 0) * 100 > 5.0
                            ) STORED,
  manifest_pdf_path         TEXT,  -- Supabase Storage: statutory-forms/
  signed_copy_image_path    TEXT,
  created_at                TIMESTAMPTZ DEFAULT NOW()
);

-- 14. spcb_receipts (KSPCB X-GN fee payment receipts)
CREATE TABLE IF NOT EXISTS public.spcb_receipts (
  receipt_id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id           VARCHAR(32) REFERENCES public.facilities(facility_id),
  form_id               UUID REFERENCES public.statutory_forms(form_id),
  uploaded_at           TIMESTAMPTZ DEFAULT NOW(),
  uploaded_by           UUID REFERENCES public.profiles(id),
  ocr_reference_no      TEXT,
  ocr_payment_amount    NUMERIC(10,2),
  ocr_payment_date      DATE,
  ocr_payee_name        TEXT,
  ocr_confidence_pct    NUMERIC(5,2),
  receipt_image_path    TEXT,  -- Supabase Storage: receipts/
  receipt_pdf_path      TEXT,
  verification_status   VARCHAR(16) DEFAULT 'PENDING', -- PENDING, VERIFIED, REJECTED
  verified_by           UUID REFERENCES public.profiles(id),
  verified_at           TIMESTAMPTZ
);

-- 15. spore_strip_logs (biological sterilization validation — G. stearothermophilus)
CREATE TABLE IF NOT EXISTS public.spore_strip_logs (
  log_id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  machine_id          VARCHAR(32) REFERENCES public.machines(machine_id),
  cycle_id            VARCHAR(48) REFERENCES public.cycles(cycle_id),
  test_conducted_at   DATE NOT NULL,
  organism            TEXT DEFAULT 'Geobacillus stearothermophilus',
  incubation_hours    INTEGER DEFAULT 48,
  result              VARCHAR(8) NOT NULL, -- PASS or FAIL
  conducted_by        UUID REFERENCES public.profiles(id),
  lab_reference_no    TEXT,
  certificate_path    TEXT,  -- Supabase Storage: spore-certificates/
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- 16. audit_trail_logs (SHA-256 block ledger chain — crypto integrity)
CREATE TABLE IF NOT EXISTS public.audit_trail_logs (
  log_id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cycle_id            VARCHAR(48) REFERENCES public.cycles(cycle_id),
  machine_id          VARCHAR(32) REFERENCES public.machines(machine_id),
  previous_hash       VARCHAR(64) NOT NULL,
  current_sha256_hash VARCHAR(64) NOT NULL,
  hardware_ecdsa_key_id VARCHAR(64),
  signature_verified  BOOLEAN NOT NULL DEFAULT TRUE,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- 17. staff_immunization_records (Hepatitis-B/Tetanus roster — idle, schema complete)
CREATE TABLE IF NOT EXISTS public.staff_immunization_records (
  record_id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id         VARCHAR(32) REFERENCES public.facilities(facility_id),
  staff_name          TEXT NOT NULL,
  staff_id            VARCHAR(32),
  designation         TEXT,
  vaccine_type        VARCHAR(32), -- Hepatitis-B, Tetanus, Typhoid
  dose_number         SMALLINT,   -- 1, 2, 3
  administered_at     DATE,
  next_due_at         DATE,
  administered_by     TEXT,
  certificate_path    TEXT,  -- Supabase Storage: immunization-records/
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cbwtf_vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facility_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.machines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.machine_health_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.camera_inspections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.safety_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.telemetry_cycle_summary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.statutory_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_i_accident_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_vi_manifests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spcb_receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spore_strip_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_trail_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff_immunization_records ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read their own profile; admins can read all
CREATE POLICY "Users read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins read all profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- All authenticated users can read reference tables
CREATE POLICY "Authenticated read facilities"
  ON public.facilities FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated read cbwtf_vendors"
  ON public.cbwtf_vendors FOR SELECT
  USING (auth.role() = 'authenticated');

-- All authenticated users can read operational data
CREATE POLICY "Authenticated read machines"
  ON public.machines FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated read cycles"
  ON public.cycles FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated read camera_inspections"
  ON public.camera_inspections FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated read safety_events"
  ON public.safety_events FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated read telemetry_cycle_summary"
  ON public.telemetry_cycle_summary FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated read statutory_forms"
  ON public.statutory_forms FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated read form_i_accident_reports"
  ON public.form_i_accident_reports FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated read form_vi_manifests"
  ON public.form_vi_manifests FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated read spcb_receipts"
  ON public.spcb_receipts FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated read spore_strip_logs"
  ON public.spore_strip_logs FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated read audit_trail_logs"
  ON public.audit_trail_logs FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated read machine_health_snapshots"
  ON public.machine_health_snapshots FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated read facility_documents"
  ON public.facility_documents FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated read staff_immunization_records"
  ON public.staff_immunization_records FOR SELECT
  USING (auth.role() = 'authenticated');

-- Admins and staff can insert operational records
CREATE POLICY "Staff insert cycles"
  ON public.cycles FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Staff insert camera_inspections"
  ON public.camera_inspections FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Staff insert safety_events"
  ON public.safety_events FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Staff insert telemetry_cycle_summary"
  ON public.telemetry_cycle_summary FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Staff insert statutory_forms"
  ON public.statutory_forms FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Staff insert form_vi_manifests"
  ON public.form_vi_manifests FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Staff insert form_i_accident_reports"
  ON public.form_i_accident_reports FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Staff insert spcb_receipts"
  ON public.spcb_receipts FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Staff insert spore_strip_logs"
  ON public.spore_strip_logs FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Profile auto-create trigger: creates profile row when a new auth user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, role, role_label, department, permissions)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'staff'),
    COALESCE(NEW.raw_user_meta_data->>'role_label', 'Hospital Operator'),
    COALESCE(NEW.raw_user_meta_data->>'department', 'General Operations'),
    COALESCE(
      (NEW.raw_user_meta_data->>'permissions')::jsonb,
      '["view_machines", "view_compliance_summary"]'::jsonb
    )
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ============================================================
-- SEED: Apollo Hospital Facility (demo)
-- ============================================================
INSERT INTO public.facilities (
  facility_id, name, address, city, state, pincode,
  cpcb_license_no, spcb_zone, nodal_officer, contact_email
) VALUES (
  'APOLLO-BLR-04',
  'Apollo Super Speciality Hospital',
  '154/11, Bannerghatta Road, Opposite IIM Bangalore',
  'Bengaluru', 'Karnataka', '560076',
  'CPCB-BMW-2024-ND-9941',
  'KSPCB South Zone',
  'Dr. Rajesh Varma',
  'compliance@apolloblr04.med'
) ON CONFLICT (facility_id) DO NOTHING;

-- SEED: CBWTF Vendor (demo)
INSERT INTO public.cbwtf_vendors (vendor_id, vendor_name, license_no, region, contact_name) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'BioClean Waste Solutions Pvt. Ltd.',
  'KSPCB-CBWTF-2024-BLR-07',
  'Bengaluru South',
  'Mohan Reddy'
) ON CONFLICT (vendor_id) DO NOTHING;

-- SEED: 5 Demo Machines
INSERT INTO public.machines (
  machine_id, serial_number, hospital_id, name, location, department,
  firmware_version, software_version, installation_date, procurement_date,
  last_calibration_date, next_calibration_date, calibration_status,
  connectivity_mode, hardware_ecdsa_key_id, status
) VALUES
  ('ABIOT-SAFE-01', 'SN-E-SAFE-2025-0019A', 'APOLLO-BLR-04',
   'Sterilizer 01 (Central Sterilization)', 'Main Waste Processing Room - Basement 1',
   'Central Sterilization', 'v3.4.12-secure', 'SmartTrace-Edge-v2.8',
   '2025-04-02', '2025-03-15', '2026-05-10', '2026-11-10', 'VALID',
   'eSIM Cellular (LTE-M)', 'ATECC608A-ECDSA-KEY-0941', 'Running'),

  ('ABIOT-SAFE-02', 'SN-E-SAFE-2025-0044B', 'APOLLO-BLR-04',
   'Sterilizer 02 (ICU Wing)', 'Block B - Level 2 (Intensive Care Unit)',
   'Intensive Care Unit', 'v3.4.12-secure', 'SmartTrace-Edge-v2.8',
   '2025-07-01', '2025-06-20', '2026-04-18', '2026-10-18', 'VALID',
   'eSIM Cellular (NB-IoT)', 'ATECC608A-ECDSA-KEY-1120', 'Alarm'),

  ('ABIOT-SAFE-03', 'SN-E-SAFE-2025-0089C', 'APOLLO-BLR-04',
   'Sterilizer 03 (OT Complex)', 'Operation Theatre Complex - Wing A',
   'Surgical Suite', 'v3.4.15-secure', 'SmartTrace-Edge-v2.8',
   '2025-08-25', '2025-08-10', '2026-06-01', '2026-12-01', 'VALID',
   'eSIM Cellular (LTE-M)', 'ATECC608A-ECDSA-KEY-0892', 'Running'),

  ('ABIOT-SAFE-04', 'SN-E-SAFE-2025-0102D', 'APOLLO-BLR-04',
   'Sterilizer 04 (Oncology Unit)', 'Block C - Level 1 (Oncology)',
   'Oncology & Chemo Unit', 'v3.4.12-secure', 'SmartTrace-Edge-v2.8',
   '2025-09-20', '2025-09-05', '2026-03-12', '2026-09-12', 'VALID',
   'Fallback WPA3 Enterprise Wi-Fi', 'ATECC608A-ECDSA-KEY-0711', 'Idle'),

  ('ABIOT-SAFE-05', 'SN-E-SAFE-2024-0012Z', 'APOLLO-BLR-04',
   'Sterilizer 05 (Emergency Ward)', 'Emergency Response Ward - Ground Floor',
   'Trauma & Emergency', 'v3.2.0-secure', 'SmartTrace-Edge-v2.5',
   '2024-11-15', '2024-11-01', '2025-08-05', '2026-08-05', 'OVERDUE',
   'eSIM Cellular (NB-IoT)', 'ATECC608A-ECDSA-KEY-0012', 'Maintenance')

ON CONFLICT (machine_id) DO NOTHING;
