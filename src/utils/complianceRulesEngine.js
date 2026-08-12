/**
 * SmartTrace™ BMWM 2016 Compliance Rules Engine
 * Evaluates waste weight discrepancies (±5% limit), 24-hour statutory SLA countdowns,
 * and autoclave bio-indicator pass/fail criteria according to SPCB/CPCB regulations.
 */

/**
 * Evaluates Form VI Manifest pickup waste weights between Hospital Ward Handover and CBWTF Truck Receipt.
 * BMWM 2016 Mandate: Discrepancy > 5% requires immediate SPCB reporting and exception log creation.
 * 
 * @param {Object} wardWeights - { yellow: kg, red: kg, white: kg, blue: kg }
 * @param {Object} cbwtfWeights - { yellow: kg, red: kg, white: kg, blue: kg }
 * @returns {Object} Evaluation report with Category Deltas, Warning Status, and Flagged Violations
 */
export function evaluateManifestDiscrepancy(wardWeights = {}, cbwtfWeights = {}) {
  const categories = ['yellow', 'red', 'white', 'blue'];
  const categoryResults = {};
  let hasViolation = false;
  let maxDiscrepancyPercent = 0;

  categories.forEach((cat) => {
    const ward = parseFloat(wardWeights[cat] || 0);
    const cbwtf = parseFloat(cbwtfWeights[cat] || 0);

    let deltaKg = cbwtf - ward;
    let percentage = ward > 0 ? (deltaKg / ward) * 100 : 0;
    const absPercentage = Math.abs(percentage);

    if (absPercentage > maxDiscrepancyPercent) {
      maxDiscrepancyPercent = absPercentage;
    }

    const isExceeded = absPercentage > 5.0;
    if (isExceeded) {
      hasViolation = true;
    }

    categoryResults[cat] = {
      wardKg: ward,
      cbwtfKg: cbwtf,
      deltaKg: parseFloat(deltaKg.toFixed(2)),
      percentage: parseFloat(percentage.toFixed(1)),
      isExceeded,
      status: isExceeded ? 'EXCEEDED' : 'COMPLIANT'
    };
  });

  return {
    compliant: !hasViolation,
    maxDiscrepancyPercent: parseFloat(maxDiscrepancyPercent.toFixed(1)),
    thresholdPercent: 5.0,
    hasViolation,
    requiresSpcbAuditNote: hasViolation,
    categories: categoryResults,
    auditRecommendation: hasViolation
      ? 'CRITICAL: Discrepancy exceeds ±5% BMWM statutory limit. Form VI Manifest flagged for SPCB review.'
      : 'COMPLIANT: Pickup weight within permissible ±5% tolerance zone.'
  };
}

/**
 * Calculates remaining statutory SLA time for Form I Major Accident Reporting.
 * BMWM 2016 Rule 15 Mandate: Form I must be filed with SPCB within 24 hours of accident occurrence.
 * 
 * @param {string|Date} incidentTime - ISO Timestamp of the accident
 * @returns {Object} SLA status report with remaining hours/minutes, progress percentage, and urgency state
 */
export function calculateFormISla(incidentTime) {
  const startMs = new Date(incidentTime).getTime();
  const nowMs = Date.now();
  const deadlineMs = startMs + (24 * 60 * 60 * 1000); // 24 hours
  const elapsedMs = nowMs - startMs;
  const remainingMs = deadlineMs - nowMs;

  const remainingHours = Math.max(0, Math.floor(remainingMs / (1000 * 60 * 60)));
  const remainingMinutes = Math.max(0, Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60)));
  const elapsedHours = Math.min(24, Math.floor(elapsedMs / (1000 * 60 * 60)));

  const percentUsed = Math.min(100, Math.max(0, (elapsedMs / (24 * 60 * 60 * 1000)) * 100));
  const isBreached = remainingMs <= 0;
  const isUrgent = remainingHours < 4 && !isBreached;

  return {
    incidentTime: new Date(startMs).toISOString(),
    deadlineTime: new Date(deadlineMs).toISOString(),
    remainingHours,
    remainingMinutes,
    elapsedHours,
    percentUsed: parseFloat(percentUsed.toFixed(1)),
    isBreached,
    isUrgent,
    urgencyLevel: isBreached ? 'BREACHED' : isUrgent ? 'HIGH_URGENCY' : 'NORMAL',
    formattedRemaining: isBreached ? 'SLA BREACHED' : `${remainingHours}h ${remainingMinutes}m remaining`
  };
}

/**
 * Validates Autoclave Geobacillus Stearothermophilus spore strip micro-biology tests.
 * @param {string} resultState - 'PASS' (No growth / killed) or 'FAIL' (Growth detected)
 * @returns {Object} Validation status
 */
export function validateSporeStripTest(resultState) {
  const isPass = resultState === 'PASS';
  return {
    valid: isPass,
    actionRequired: isPass ? 'None - Machine cleared for waste batch processing.' : 'CRITICAL: Halt autoclave operations immediately! Perform bio-remediation & quarantine waste.',
    status: isPass ? 'CLEARED' : 'QUARANTINE_REQUIRED'
  };
}
