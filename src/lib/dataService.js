/**
 * SmartTrace™ Data Service Layer
 * Tries Supabase first, falls back to mockData if tables are empty or unavailable.
 */

import { supabase, isSupabaseAvailable } from './supabaseClient';
import {
  INITIAL_MACHINES,
  AUDIT_TRAIL_LOGS,
  COMPLIANCE_METRICS,
  HOURLY_WASTE_DATA,
} from '../data/mockData';

// ── Machines ─────────────────────────────────────────────────────────────────

export async function getMachines() {
  if (!isSupabaseAvailable) return INITIAL_MACHINES;

  const { data, error } = await supabase
    .from('machines')
    .select('*')
    .order('machine_id');

  if (error || !data || data.length === 0) {
    console.warn('[dataService] machines: using mock fallback', error?.message);
    return INITIAL_MACHINES;
  }

  // Map DB snake_case → app camelCase shape
  return data.map(m => ({
    id: m.machine_id,
    name: m.name,
    location: m.location,
    department: m.department,
    status: m.status,
    firmwareVersion: m.firmware_version,
    softwareVersion: m.software_version,
    hospitalId: m.hospital_id,
    serialNumber: m.serial_number,
    installationDate: m.installation_date,
    procurementDate: m.procurement_date,
    lastCalibrationDate: m.last_calibration_date,
    nextCalibrationDate: m.next_calibration_date,
    calibrationStatus: m.calibration_status,
    connectivityMode: m.connectivity_mode,
    hardwareKeyId: m.hardware_ecdsa_key_id,
    // Live telemetry fields not in DB yet — filled from mock until edge integration
    temperature: null,
    pressure: null,
    h2o2: null,
    progressPct: 0,
    phase: 'Awaiting Telemetry',
    cycleTimeRemaining: '—',
    activeAlarmsCount: 0,
  }));
}

// ── Audit Trail Logs ─────────────────────────────────────────────────────────

export async function getAuditTrailLogs(limit = 50) {
  if (!isSupabaseAvailable) return AUDIT_TRAIL_LOGS;

  const { data, error } = await supabase
    .from('cycles')
    .select(`
      cycle_id,
      machine_id,
      bag_id,
      waste_category,
      department,
      operator_name,
      start_time,
      end_time,
      duration_minutes,
      cycle_result,
      sha256_hash,
      signature_verified,
      camera_inspections ( decision, bag_integrity_status, color_match, integrity_confidence_pct )
    `)
    .order('start_time', { ascending: false })
    .limit(limit);

  if (error || !data || data.length === 0) {
    console.warn('[dataService] audit_trail_logs: using mock fallback', error?.message);
    return AUDIT_TRAIL_LOGS;
  }

  return data.map(row => {
    const cam = row.camera_inspections?.[0];
    return {
      cycleId: row.cycle_id,
      machineId: row.machine_id,
      bagId: row.bag_id,
      bagCategory: row.waste_category,
      department: row.department,
      operator: row.operator_name,
      startTime: row.start_time,
      endTime: row.end_time,
      duration: row.duration_minutes ? `${row.duration_minutes} min` : '—',
      aiResult: cam
        ? `${cam.bag_integrity_status} (${cam.integrity_confidence_pct}% Conf)`
        : 'No inspection data',
      cpcbStatus: row.cycle_result,
      hashChain: row.sha256_hash,
      signatureVerified: row.signature_verified,
      downloadable: row.cycle_result === 'PASSED',
    };
  });
}

// ── Compliance Metrics ───────────────────────────────────────────────────────

export async function getComplianceMetrics() {
  if (!isSupabaseAvailable) return COMPLIANCE_METRICS;

  // Compute live from cycles table
  const { data, error } = await supabase
    .from('cycles')
    .select('cycle_result, machine_id');

  if (error || !data || data.length === 0) {
    console.warn('[dataService] compliance_metrics: using mock fallback', error?.message);
    return COMPLIANCE_METRICS;
  }

  const total = data.length;
  const passed = data.filter(c => c.cycle_result === 'PASSED').length;
  const passRate = total > 0 ? Math.round((passed / total) * 1000) / 10 : 0;
  const uniqueMachines = new Set(data.map(c => c.machine_id)).size;

  return {
    ...COMPLIANCE_METRICS,
    cpcbRulePassRate: passRate,
    activeUnitsCount: uniqueMachines || COMPLIANCE_METRICS.activeUnitsCount,
  };
}

// ── Statutory Forms ───────────────────────────────────────────────────────────

export async function getStatutoryForms(facilityId = 'APOLLO-BLR-04') {
  if (!isSupabaseAvailable) return [];

  const { data, error } = await supabase
    .from('statutory_forms')
    .select('*')
    .eq('facility_id', facilityId)
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('[dataService] statutory_forms error:', error.message);
    return [];
  }
  return data || [];
}

// ── Form VI Manifests ─────────────────────────────────────────────────────────

export async function getFormVIManifests(facilityId = 'APOLLO-BLR-04') {
  if (!isSupabaseAvailable) return [];

  const { data, error } = await supabase
    .from('form_vi_manifests')
    .select('*')
    .eq('facility_id', facilityId)
    .order('pickup_timestamp', { ascending: false });

  if (error) {
    console.warn('[dataService] form_vi_manifests error:', error.message);
    return [];
  }
  return data || [];
}

// ── Safety Events ─────────────────────────────────────────────────────────────

export async function getSafetyEvents(machineId = null, limit = 20) {
  if (!isSupabaseAvailable) return [];

  let query = supabase
    .from('safety_events')
    .select('*')
    .order('triggered_at', { ascending: false })
    .limit(limit);

  if (machineId) query = query.eq('machine_id', machineId);

  const { data, error } = await query;
  if (error) {
    console.warn('[dataService] safety_events error:', error.message);
    return [];
  }
  return data || [];
}

// ── Hourly Waste Data (mock only until telemetry integration) ─────────────────

export async function getHourlyWasteData() {
  return HOURLY_WASTE_DATA;
}
