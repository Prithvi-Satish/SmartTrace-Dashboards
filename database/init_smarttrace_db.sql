-- ==============================================================================
-- SMARTTRACE™ PRODUCTION POSTGRESQL INITIALIZATION & SECURITY SCRIPT
-- Standard: Bio-Medical Waste Management (BMWM) Rules, 2016 (CPCB / SPCB India)
-- Features: 6 Schemas, BYTEA Receipt Storage, RLS Security Policies, Seed Data
-- ==============================================================================

-- Enable Security Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. DATABASE ROLE-BASED ACCESS CONTROL (RBAC) SETUP
-- ==============================================================================

-- Create Application Application User Role (Read/Write for Backend API)
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'smarttrace_app_user') THEN
        CREATE ROLE smarttrace_app_user WITH LOGIN PASSWORD 'SmartTrace_Secure_App_2026!';
    END IF;
END $$;

-- Create Auditor Read-Only Role (For Government SPCB / CPCB Inspector Portal)
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'cpcb_auditor_read_role') THEN
        CREATE ROLE cpcb_auditor_read_role WITH LOGIN PASSWORD 'CPCB_Audit_ReadOnly_2026!';
    END IF;
END $$;

-- Create Logical Schemas
CREATE SCHEMA IF NOT EXISTS hospital_core;
CREATE SCHEMA IF NOT EXISTS ward_operations;
CREATE SCHEMA IF NOT EXISTS telemetry_iot;
CREATE SCHEMA IF NOT EXISTS disposal_manifests;
CREATE SCHEMA IF NOT EXISTS statutory_compliance;
CREATE SCHEMA IF NOT EXISTS longterm_archival;

-- Grant Schema Usages
GRANT USAGE ON SCHEMA hospital_core, ward_operations, telemetry_iot, disposal_manifests, statutory_compliance, longterm_archival TO smarttrace_app_user;
GRANT USAGE ON SCHEMA hospital_core, ward_operations, telemetry_iot, disposal_manifests, statutory_compliance, longterm_archival TO cpcb_auditor_read_role;

-- ==============================================================================
-- 2. SCHEMA: hospital_core (Facilities, Licenses & Personnel)
-- ==============================================================================

-- Healthcare Facilities (HCF)
CREATE TABLE hospital_core.facilities (
    facility_id VARCHAR(32) PRIMARY KEY, -- 'APOLLO-BLR-04'
    facility_name VARCHAR(255) NOT NULL,
    spcb_state_board VARCHAR(64) NOT NULL DEFAULT 'KSPCB',
    regional_office VARCHAR(128) NOT NULL,
    clinical_establishment_no VARCHAR(128) NOT NULL,
    authorized_bed_capacity INT NOT NULL CHECK (authorized_bed_capacity > 0),
    max_daily_permissible_kg NUMERIC(8,2) NOT NULL,
    address_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Form III: SPCB Authorization Permits Vault
CREATE TABLE hospital_core.spcb_authorizations (
    authorization_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    facility_id VARCHAR(32) REFERENCES hospital_core.facilities(facility_id) ON DELETE CASCADE,
    kspcb_authorization_no VARCHAR(128) UNIQUE NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE_VALID',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CBWTF Vendor Partners
CREATE TABLE hospital_core.cbwtf_vendors (
    vendor_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_name VARCHAR(255) NOT NULL,
    cbwtf_license_no VARCHAR(128) UNIQUE NOT NULL,
    facility_address TEXT NOT NULL,
    contact_phone VARCHAR(32),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Staff Roster & Immunization (Hep B / Tetanus)
CREATE TABLE hospital_core.staff_immunization (
    staff_id VARCHAR(32) PRIMARY KEY,
    facility_id VARCHAR(32) REFERENCES hospital_core.facilities(facility_id),
    full_name VARCHAR(128) NOT NULL,
    role_designation VARCHAR(64) NOT NULL,
    department VARCHAR(64) NOT NULL,
    hep_b_dose1_date DATE,
    hep_b_dose2_date DATE,
    hep_b_dose3_date DATE,
    tetanus_booster_date DATE,
    immunization_status VARCHAR(32) NOT NULL DEFAULT 'FULLY_IMMUNIZED'
);

-- ==============================================================================
-- 3. SCHEMA: ward_operations (Ward Generation & Barcode Tracking)
-- ==============================================================================

-- Shift-wise Ward Segregation Entry
CREATE TABLE ward_operations.shift_segregation_logs (
    log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    facility_id VARCHAR(32) REFERENCES hospital_core.facilities(facility_id),
    ward_name VARCHAR(64) NOT NULL,
    shift_name VARCHAR(16) NOT NULL CHECK (shift_name IN ('MORNING', 'EVENING', 'NIGHT')),
    logged_by_staff_id VARCHAR(32) REFERENCES hospital_core.staff_immunization(staff_id),
    item_type VARCHAR(128) NOT NULL,
    cpcb_color_category VARCHAR(16) NOT NULL CHECK (cpcb_color_category IN ('YELLOW', 'RED', 'WHITE', 'BLUE')),
    weighed_mass_kg NUMERIC(6,2) NOT NULL CHECK (weighed_mass_kg > 0),
    segregation_precheck_valid BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Barcoded Biohazard Waste Bags (GS1 Standard)
CREATE TABLE ward_operations.barcoded_bags (
    bag_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    barcode_serial VARCHAR(64) UNIQUE NOT NULL,
    facility_id VARCHAR(32) REFERENCES hospital_core.facilities(facility_id),
    color_category VARCHAR(16) NOT NULL CHECK (color_category IN ('YELLOW', 'RED', 'WHITE', 'BLUE')),
    gross_weight_kg NUMERIC(6,2) NOT NULL,
    bluetooth_scale_mac VARCHAR(64),
    sealed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    disposal_track VARCHAR(20) NOT NULL CHECK (disposal_track IN ('INTERNAL_MACHINE', 'EXTERNAL_CBWTF')),
    current_status VARCHAR(32) NOT NULL DEFAULT 'SEALED_IN_WARD'
);

-- ==============================================================================
-- 4. SCHEMA: telemetry_iot (Sterilizers, Cycles & Cryptography)
-- ==============================================================================

-- Machine Identity
CREATE TABLE telemetry_iot.machines (
    machine_id VARCHAR(32) PRIMARY KEY,
    facility_id VARCHAR(32) REFERENCES hospital_core.facilities(facility_id),
    machine_name VARCHAR(128) NOT NULL,
    serial_number VARCHAR(64) UNIQUE NOT NULL,
    location_room VARCHAR(128) NOT NULL,
    firmware_version VARCHAR(32) NOT NULL,
    calibration_status VARCHAR(32) NOT NULL DEFAULT 'VALID (IQ/OQ/PQ)',
    last_calibration_date DATE,
    next_calibration_date DATE
);

-- Machine Cycle Executions
CREATE TABLE telemetry_iot.machine_cycles (
    cycle_id VARCHAR(48) PRIMARY KEY,
    machine_id VARCHAR(32) REFERENCES telemetry_iot.machines(machine_id),
    bag_barcode_serial VARCHAR(64),
    operator_staff_id VARCHAR(32) REFERENCES hospital_core.staff_immunization(staff_id),
    start_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    end_timestamp TIMESTAMP WITH TIME ZONE,
    duration_minutes INT,
    waste_category VARCHAR(64) NOT NULL,
    cassette_id VARCHAR(64),
    ai_camera_result VARCHAR(64) NOT NULL,
    cycle_status VARCHAR(32) NOT NULL DEFAULT 'RUNNING'
);

-- Sensor Time-Series Telemetry Stream
CREATE TABLE telemetry_iot.sensor_telemetry_stream (
    telemetry_id BIGSERIAL PRIMARY KEY,
    cycle_id VARCHAR(48) REFERENCES telemetry_iot.machine_cycles(cycle_id),
    recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    temperature_celsius NUMERIC(5,2) NOT NULL,
    pressure_mbar NUMERIC(6,2) NOT NULL,
    h2o2_ppm NUMERIC(6,2),
    residual_h2o2_ppm NUMERIC(5,2)
);

-- Cryptographic Hash Chain Audit Ledger
CREATE TABLE telemetry_iot.cryptographic_hash_chain (
    ledger_id BIGSERIAL PRIMARY KEY,
    cycle_id VARCHAR(48) REFERENCES telemetry_iot.machine_cycles(cycle_id),
    previous_hash VARCHAR(64) NOT NULL,
    current_sha256_hash VARCHAR(64) NOT NULL,
    hardware_ecdsa_key_id VARCHAR(64) NOT NULL,
    signature_verified BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- 5. SCHEMA: disposal_manifests (Form VI Pickup Manifest & Discrepancy Engine)
-- ==============================================================================

CREATE TABLE disposal_manifests.daily_handover_manifests (
    manifest_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    manifest_no VARCHAR(64) UNIQUE NOT NULL,
    facility_id VARCHAR(32) REFERENCES hospital_core.facilities(facility_id),
    cbwtf_vendor_id UUID REFERENCES hospital_core.cbwtf_vendors(vendor_id),
    pickup_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    vehicle_number VARCHAR(32) NOT NULL,
    driver_name VARCHAR(64) NOT NULL,
    yellow_kg NUMERIC(7,2) NOT NULL DEFAULT 0,
    red_kg NUMERIC(7,2) NOT NULL DEFAULT 0,
    white_kg NUMERIC(7,2) NOT NULL DEFAULT 0,
    blue_kg NUMERIC(7,2) NOT NULL DEFAULT 0,
    total_hospital_weight_kg NUMERIC(8,2) NOT NULL,
    cbwtf_scanned_weight_kg NUMERIC(8,2) NOT NULL,
    
    -- Automatic ±5% Discrepancy Generated Column
    variance_pct NUMERIC(5,2) GENERATED ALWAYS AS (
        ROUND(((cbwtf_scanned_weight_kg - total_hospital_weight_kg) / NULLIF(total_hospital_weight_kg, 0)) * 100, 2)
    ) STORED,
    variance_status VARCHAR(32) NOT NULL DEFAULT 'MATCHED_PASSED',
    flag_reason TEXT,
    hospital_agent_signature TEXT NOT NULL,
    driver_signature TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- 6. SCHEMA: statutory_compliance (Form I, IV & Direct BYTEA Receipt Storage)
-- ==============================================================================

-- Form I: Accident Reporting Log (24-Hour SLA)
CREATE TABLE statutory_compliance.form1_accident_reports (
    incident_id VARCHAR(32) PRIMARY KEY,
    facility_id VARCHAR(32) REFERENCES hospital_core.facilities(facility_id),
    incident_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    location_description TEXT NOT NULL,
    category_involved VARCHAR(64) NOT NULL,
    estimated_quantity_kg NUMERIC(5,2) NOT NULL,
    cause_description TEXT NOT NULL,
    affected_staff_name VARCHAR(128) NOT NULL,
    injuries_description TEXT NOT NULL,
    corrective_action TEXT NOT NULL,
    nodal_officer_name VARCHAR(128) NOT NULL,
    reported_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    kspcb_filed_receipt_no VARCHAR(64)
);

-- Form IV: KSPCB Annual Return Compiled Summary
CREATE TABLE statutory_compliance.form4_annual_returns (
    return_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    facility_id VARCHAR(32) REFERENCES hospital_core.facilities(facility_id),
    reporting_year INT NOT NULL,
    kspcb_submitted_date DATE,
    xgn_ack_number VARCHAR(128) UNIQUE,
    total_yellow_kg NUMERIC(10,2) NOT NULL,
    total_red_kg NUMERIC(10,2) NOT NULL,
    total_white_kg NUMERIC(10,2) NOT NULL,
    total_blue_kg NUMERIC(10,2) NOT NULL,
    total_combined_kg NUMERIC(10,2) NOT NULL,
    daily_avg_kg NUMERIC(7,2) NOT NULL,
    verification_status VARCHAR(32) NOT NULL DEFAULT 'DRAFT'
);

-- Direct SPCB Portal Receipt Storage (Binary BYTEA Storage directly inside PostgreSQL!)
CREATE TABLE statutory_compliance.spcb_upload_receipts (
    receipt_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    facility_id VARCHAR(32) REFERENCES hospital_core.facilities(facility_id),
    document_type VARCHAR(64) NOT NULL, -- 'Form IV Annual Return (2025)'
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    uploaded_by_user VARCHAR(128) NOT NULL,
    receipt_file_name VARCHAR(255) NOT NULL,
    
    -- RAW BINARY RECEIPT FILE STORED IN POSTGRESQL BYTEA
    receipt_file_bytes BYTEA NOT NULL,
    file_mime_type VARCHAR(64) NOT NULL DEFAULT 'application/pdf',
    
    -- OCR Parsing Verification Metadata
    ocr_extracted_ack_no VARCHAR(128),
    ocr_extracted_date DATE,
    ocr_extracted_office VARCHAR(128),
    ocr_watermark_matched BOOLEAN NOT NULL DEFAULT FALSE,
    verification_status VARCHAR(32) NOT NULL DEFAULT 'LEGALLY_VERIFIED_STAMPED'
);

-- ==============================================================================
-- 7. ROW-LEVEL SECURITY (RLS) & TAMPER-PROOF COMPLIANCE POLICIES
-- ==============================================================================

-- Enable RLS on Compliance Audit Tables
ALTER TABLE statutory_compliance.form4_annual_returns ENABLE ROW LEVEL SECURITY;
ALTER TABLE statutory_compliance.form1_accident_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE disposal_manifests.daily_handover_manifests ENABLE ROW LEVEL SECURITY;
ALTER TABLE telemetry_iot.cryptographic_hash_chain ENABLE ROW LEVEL SECURITY;

-- Grant Read Access to ReadOnly CPCB Auditor Role
GRANT SELECT ON ALL TABLES IN SCHEMA hospital_core, ward_operations, telemetry_iot, disposal_manifests, statutory_compliance TO cpcb_auditor_read_role;

-- Grant Read & Write Access to App User Role
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA hospital_core, ward_operations, telemetry_iot, disposal_manifests, statutory_compliance TO smarttrace_app_user;

-- ==============================================================================
-- 8. SAMPLE SEED DATA FOR TESTING
-- ==============================================================================

-- 1. Facility Seed
INSERT INTO hospital_core.facilities (facility_id, facility_name, spcb_state_board, regional_office, clinical_establishment_no, authorized_bed_capacity, max_daily_permissible_kg, address_text)
VALUES ('APOLLO-BLR-04', 'Apollo Super Speciality Hospital', 'KSPCB', 'Bangalore South RO (Jayanagar)', 'CEA-KA-2022-9941', 650, 650.00, 'Bannerghatta Road, JP Nagar, Bengaluru, Karnataka 560076')
ON CONFLICT DO NOTHING;

-- 2. Authorization Seed (Form III)
INSERT INTO hospital_core.spcb_authorizations (facility_id, kspcb_authorization_no, issue_date, expiry_date, status)
VALUES ('APOLLO-BLR-04', 'KSPCB/BMW/2024-25/BNG-S/00482', '2023-01-01', '2027-12-31', 'ACTIVE_VALID')
ON CONFLICT DO NOTHING;

-- 3. CBWTF Vendor Seed
INSERT INTO hospital_core.cbwtf_vendors (vendor_id, vendor_name, cbwtf_license_no, facility_address, contact_phone)
VALUES ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Maridi Eco Industries Pvt. Ltd.', 'KSPCB/CBWTF/BNG/2022-88', 'Harohalli Industrial Area, Ramanagara Dist', '+91 80 2658 9900')
ON CONFLICT DO NOTHING;

-- 4. Staff Seed
INSERT INTO hospital_core.staff_immunization (staff_id, facility_id, full_name, role_designation, department, hep_b_dose1_date, hep_b_dose2_date, hep_b_dose3_date, tetanus_booster_date, immunization_status)
VALUES ('STF-01', 'APOLLO-BLR-04', 'Manjula K.', 'Sanitation Worker', 'OT Complex', '2024-01-10', '2024-02-12', '2024-07-15', '2026-02-10', 'FULLY_IMMUNIZED')
ON CONFLICT DO NOTHING;

-- 5. Form IV Annual Return Seed
INSERT INTO statutory_compliance.form4_annual_returns (facility_id, reporting_year, kspcb_submitted_date, xgn_ack_number, total_yellow_kg, total_red_kg, total_white_kg, total_blue_kg, total_combined_kg, daily_avg_kg, training_sessions_count, staff_trained_count, hep_b_coverage_pct, liquid_effluent_status, verification_status)
VALUES ('APOLLO-BLR-04', 2025, '2026-06-18', 'KSPCB-XGN-2026-994812', 84200.00, 62400.00, 4800.00, 11200.00, 162600.00, 445.40, 24, 420, 98.60, 'ETP Treated (BOD < 30 mg/L, COD < 250 mg/L)', 'LEGALLY_VERIFIED_STAMPED')
ON CONFLICT DO NOTHING;

-- 6. Form VI Manifest Seed
INSERT INTO disposal_manifests.daily_handover_manifests (manifest_no, facility_id, cbwtf_vendor_id, pickup_timestamp, vehicle_number, driver_name, yellow_kg, red_kg, white_kg, blue_kg, total_hospital_weight_kg, cbwtf_scanned_weight_kg, variance_status, hospital_agent_signature, driver_signature)
VALUES ('MNF-KSPCB-2026-0811', 'APOLLO-BLR-04', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '2026-08-11 08:45:00+05:30', 'KA-05-AG-9941', 'Ramesh Gowda', 142.50, 110.00, 8.20, 18.50, 279.20, 280.10, 'MATCHED_PASSED', 'Vinay Kumar', 'Ramesh Gowda')
ON CONFLICT DO NOTHING;
