-- ============================================================
-- SmartTrace™ — Demo User Seed Script
-- Run this AFTER supabase_migration.sql
-- Run in: Supabase Dashboard → SQL Editor
-- ============================================================
-- NOTE: This script uses Supabase's internal auth schema to
-- create users. The trigger will auto-create their profile rows.
-- ============================================================

-- Demo User 1: System Administrator
INSERT INTO auth.users (
  id, email, encrypted_password, email_confirmed_at,
  raw_user_meta_data, created_at, updated_at,
  aud, role
) VALUES (
  '00000000-0000-0000-0001-000000000001',
  'admin@smarttrace.med',
  crypt('SmartTrace@Admin1', gen_salt('bf')),
  NOW(),
  '{"name":"Dr. Rajesh Varma","role":"admin","role_label":"System Administrator","department":"Hospital IT & Compliance","permissions":["all"]}'::jsonb,
  NOW(), NOW(), 'authenticated', 'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- Demo User 2: Compliance Auditor
INSERT INTO auth.users (
  id, email, encrypted_password, email_confirmed_at,
  raw_user_meta_data, created_at, updated_at,
  aud, role
) VALUES (
  '00000000-0000-0000-0001-000000000002',
  'auditor@cpcb.gov.in',
  crypt('SmartTrace@Audit1', gen_salt('bf')),
  NOW(),
  '{"name":"Priya Sharma","role":"auditor","role_label":"Compliance Auditor","department":"State Pollution Control Board","permissions":["view_compliance","verify_hashes","download_reports","export_certificates"]}'::jsonb,
  NOW(), NOW(), 'authenticated', 'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- Demo User 3: Govt Medical Board Inspector
INSERT INTO auth.users (
  id, email, encrypted_password, email_confirmed_at,
  raw_user_meta_data, created_at, updated_at,
  aud, role
) VALUES (
  '00000000-0000-0000-0001-000000000003',
  'inspector@medicalboard.gov.in',
  crypt('SmartTrace@Inspect1', gen_salt('bf')),
  NOW(),
  '{"name":"Dr. Anand Kumar","role":"inspector","role_label":"Govt Medical Board Inspector","department":"Directorate of Medical Services","permissions":["view_compliance","verify_hashes","download_reports","audit_signoff"]}'::jsonb,
  NOW(), NOW(), 'authenticated', 'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- Demo User 4: Hospital Operator
INSERT INTO auth.users (
  id, email, encrypted_password, email_confirmed_at,
  raw_user_meta_data, created_at, updated_at,
  aud, role
) VALUES (
  '00000000-0000-0000-0001-000000000004',
  'suresh@apollohospital.com',
  crypt('SmartTrace@Staff1', gen_salt('bf')),
  NOW(),
  '{"name":"Suresh Menon","role":"staff","role_label":"Hospital Operator","department":"Intensive Care Unit (ICU)","permissions":["view_machines","log_cycles","view_compliance_summary"]}'::jsonb,
  NOW(), NOW(), 'authenticated', 'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- DEMO CREDENTIALS REFERENCE
-- ============================================================
-- Role: System Administrator
--   Email:    admin@smarttrace.med
--   Password: SmartTrace@Admin1
--
-- Role: Compliance Auditor
--   Email:    auditor@cpcb.gov.in
--   Password: SmartTrace@Audit1
--
-- Role: Govt Medical Board Inspector
--   Email:    inspector@medicalboard.gov.in
--   Password: SmartTrace@Inspect1
--
-- Role: Hospital Operator
--   Email:    suresh@apollohospital.com
--   Password: SmartTrace@Staff1
-- ============================================================
