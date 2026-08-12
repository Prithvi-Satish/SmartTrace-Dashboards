// SmartTrace™ Mock Dataset for Compliance & Digital Twin Machine Management

export const CYCLE_PHASES = [
  "1. Cycle Created",
  "2. Operator Login",
  "3. Door Open",
  "4. Camera Inspection",
  "5. Bag Validation",
  "6. Door Closed",
  "7. Door Lock",
  "8. Negative Pressure",
  "9. Environmental Stabilization",
  "10. Flash Evaporator Warm-up",
  "11. VHP Injection",
  "12. Diffusion",
  "13. CT Monitoring",
  "14. Hold",
  "15. Aeration",
  "16. Residual H₂O₂ Verification",
  "17. Unlock",
  "18. Transfer",
  "19. Cycle Complete",
  "20. Logs Archived"
];

export const INITIAL_MACHINES = [
  {
    id: "ABIOT-SAFE-01",
    name: "Sterilizer 01 (Central Sterilization)",
    location: "Main Waste Processing Room - Basement 1",
    department: "Central Sterilization",
    status: "Running", // Running, Idle, Alarm, Maintenance
    currentPhaseStep: 11, // VHP Injection
    phase: "11. VHP Injection",
    temperature: 58.4, // °C
    targetTemp: 60.0,
    humidity: 42.1, // % RH
    pressure: -12.5, // mbar (Negative pressure)
    h2o2: 450, // ppm
    residualH2o2: 0.8, // ppm
    cycleTimeRemaining: "14 min",
    progressPct: 68,
    operator: "Rajesh Kumar (OP-402)",
    wasteCategory: "Yellow Bag (Infectious)",
    currentBagId: "BAG-2026-8841",
    cassetteId: "CASS-H2O2-09",
    activeAlarmsCount: 0,
    
    // Detailed Machine Identity & Metadata
    serialNumber: "SN-E-SAFE-2025-0019A",
    procurementDate: "2025-03-15",
    installationDate: "2025-04-02",
    firmwareVersion: "v3.4.12-secure",
    softwareVersion: "SmartTrace-Edge-v2.8",
    hospitalId: "APOLLO-BLR-04",
    gpsCoordinates: "12.9716° N, 77.5946° E",

    // Component Health (Digital Twin)
    pumpHealth: 94,
    fanHealth: 98,
    motorHealth: 91,
    doorCycles: 1420,
    filterLife: 88,
    catalystLife: 82,
    calibrationStatus: "VALID (IQ/OQ/PQ)",
    lastCalibrationDate: "2026-05-10",
    nextCalibrationDate: "2026-11-10",

    // IoT Connectivity & Cryptographic Security
    connectivityMode: "eSIM Cellular (LTE-M)",
    signalStrength: "-74 dBm (Excellent)",
    hardwareKeyId: "ATECC608A-ECDSA-KEY-0941",
    latestHashSignature: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",

    // Machine Utilization Data (by time range)
    totalOperatingHours: 4218,
    utilizationByRange: {
      '24h': {
        label: 'Last 24 Hours', periodLabel: 'Today', chartSubLabel: 'Hourly (2-hr slots)',
        activeHours: 14.3, uptimePct: 88,
        data: [
          { label: '02:00', hoursActive: 0.8, cyclesRun: 1 },
          { label: '04:00', hoursActive: 0.6, cyclesRun: 1 },
          { label: '06:00', hoursActive: 1.2, cyclesRun: 2 },
          { label: '08:00', hoursActive: 1.8, cyclesRun: 3 },
          { label: '10:00', hoursActive: 1.9, cyclesRun: 3 },
          { label: '12:00', hoursActive: 1.5, cyclesRun: 2 },
          { label: '14:00', hoursActive: 1.8, cyclesRun: 3 },
          { label: '16:00', hoursActive: 1.7, cyclesRun: 3 },
          { label: '18:00', hoursActive: 1.2, cyclesRun: 2 },
          { label: '20:00', hoursActive: 0.9, cyclesRun: 1 },
          { label: '22:00', hoursActive: 0.5, cyclesRun: 1 },
          { label: '00:00', hoursActive: 0.4, cyclesRun: 0 },
        ]
      },
      '7d': {
        label: 'Last 7 Days', periodLabel: 'This Week', chartSubLabel: 'Daily',
        activeHours: 103.5, uptimePct: 86,
        data: [
          { label: 'Mon', hoursActive: 16.5, cyclesRun: 22 },
          { label: 'Tue', hoursActive: 18.0, cyclesRun: 24 },
          { label: 'Wed', hoursActive: 14.0, cyclesRun: 18 },
          { label: 'Thu', hoursActive: 17.5, cyclesRun: 23 },
          { label: 'Fri', hoursActive: 19.0, cyclesRun: 26 },
          { label: 'Sat', hoursActive: 11.0, cyclesRun: 14 },
          { label: 'Sun', hoursActive: 7.5,  cyclesRun: 10 },
        ]
      },
      '1m': {
        label: 'Last Month', periodLabel: 'This Month', chartSubLabel: 'Weekly',
        activeHours: 433, uptimePct: 85,
        data: [
          { label: 'Wk 1', hoursActive: 108, cyclesRun: 142 },
          { label: 'Wk 2', hoursActive: 115, cyclesRun: 155 },
          { label: 'Wk 3', hoursActive: 98,  cyclesRun: 128 },
          { label: 'Wk 4', hoursActive: 112, cyclesRun: 148 },
        ]
      },
      '3m': {
        label: 'Last 3 Months', periodLabel: '3 Months', chartSubLabel: 'Monthly',
        activeHours: 1190, uptimePct: 84,
        data: [
          { label: 'Jun', hoursActive: 498, cyclesRun: 665 },
          { label: 'Jul', hoursActive: 512, cyclesRun: 680 },
          { label: 'Aug', hoursActive: 180, cyclesRun: 137 },
        ]
      },
      '6m': {
        label: 'Last 6 Months', periodLabel: '6 Months', chartSubLabel: 'Monthly',
        activeHours: 2650, uptimePct: 85,
        data: [
          { label: 'Mar', hoursActive: 470, cyclesRun: 620 },
          { label: 'Apr', hoursActive: 488, cyclesRun: 645 },
          { label: 'May', hoursActive: 502, cyclesRun: 668 },
          { label: 'Jun', hoursActive: 498, cyclesRun: 665 },
          { label: 'Jul', hoursActive: 512, cyclesRun: 680 },
          { label: 'Aug', hoursActive: 180, cyclesRun: 137 },
        ]
      },
      '1y': {
        label: 'Last 1 Year', periodLabel: '1 Year', chartSubLabel: 'Monthly',
        activeHours: 5380, uptimePct: 83,
        data: [
          { label: 'Sep', hoursActive: 440, cyclesRun: 580 },
          { label: 'Oct', hoursActive: 460, cyclesRun: 608 },
          { label: 'Nov', hoursActive: 475, cyclesRun: 630 },
          { label: 'Dec', hoursActive: 420, cyclesRun: 555 },
          { label: 'Jan', hoursActive: 480, cyclesRun: 640 },
          { label: 'Feb', hoursActive: 455, cyclesRun: 605 },
          { label: 'Mar', hoursActive: 470, cyclesRun: 620 },
          { label: 'Apr', hoursActive: 488, cyclesRun: 645 },
          { label: 'May', hoursActive: 502, cyclesRun: 668 },
          { label: 'Jun', hoursActive: 498, cyclesRun: 665 },
          { label: 'Jul', hoursActive: 512, cyclesRun: 680 },
          { label: 'Aug', hoursActive: 180, cyclesRun: 137 },
        ]
      },
      'all': {
        label: 'Since Installation', periodLabel: 'Since Install', chartSubLabel: 'Quarterly',
        activeHours: 4218, uptimePct: 81,
        data: [
          { label: "Q2 '25", hoursActive: 1250, cyclesRun: 1640 },
          { label: "Q3 '25", hoursActive: 1380, cyclesRun: 1820 },
          { label: "Q4 '25", hoursActive: 1290, cyclesRun: 1700 },
          { label: "Q1 '26", hoursActive: 1410, cyclesRun: 1860 },
          { label: "Q2 '26", hoursActive: 1480, cyclesRun: 1950 },
          { label: "Q3 '26", hoursActive: 408,  cyclesRun: 537  },
        ]
      },
    },

    // Downtime Records
    downtimeRecords: [
      { id: "DT-2026-08", startTime: "2026-08-05 09:15", duration: "3h 40m", reason: "Scheduled Sensor Calibration", resolvedBy: "S. Patel (ENG-08)", type: "Planned" },
      { id: "DT-2026-07", startTime: "2026-07-22 14:00", duration: "1h 15m", reason: "VHP Cassette Replacement", resolvedBy: "R. Sharma (ENG-02)", type: "Planned" },
      { id: "DT-2026-06", startTime: "2026-06-10 11:30", duration: "5h 20m", reason: "Temperature Sensor Fault – Auto Shutdown", resolvedBy: "S. Patel (ENG-08)", type: "Unplanned" },
      { id: "DT-2026-05", startTime: "2026-05-09 08:00", duration: "8h 00m", reason: "Annual IQ/OQ/PQ Validation Maintenance Window", resolvedBy: "S. Patel (ENG-08)", type: "Planned" },
      { id: "DT-2026-02", startTime: "2026-02-14 07:30", duration: "2h 30m", reason: "Nozzle Cleaning & Filter Replacement Downtime", resolvedBy: "R. Sharma (ENG-02)", type: "Planned" }
    ],

    // Maintenance Records
    maintenanceRecords: [
      { id: "MNT-2026-05", date: "2026-05-10", type: "Annual Calibration & IQ/OQ/PQ", engineer: "S. Patel (ENG-08)", status: "PASSED", docName: "IQ_OQ_PQ_Certificate_Unit01.pdf" },
      { id: "MNT-2026-02", date: "2026-02-14", type: "Vaporizer Nozzle Cleaning & Filter Replacement", engineer: "R. Sharma (ENG-02)", status: "PASSED", docName: "Maintenance_Log_2026_02.pdf" },
      { id: "MNT-2025-11", date: "2025-11-05", type: "Sensor Calibration (Pressure & Temp)", engineer: "S. Patel (ENG-08)", status: "PASSED", docName: "Calibration_Report_Nov2025.pdf" }
    ]
  },
  {
    id: "ABIOT-SAFE-02",
    name: "Sterilizer 02 (ICU Wing)",
    location: "Block B - Level 2 (Intensive Care Unit)",
    department: "Intensive Care Unit",
    status: "Alarm",
    currentPhaseStep: 13, // CT Monitoring
    phase: "13. CT Monitoring",
    temperature: 64.2,
    targetTemp: 60.0,
    humidity: 38.5,
    pressure: -8.1,
    h2o2: 410,
    residualH2o2: 1.4,
    cycleTimeRemaining: "08 min",
    progressPct: 82,
    operator: "Ananya Sharma (OP-115)",
    wasteCategory: "Red Bag (Contaminated Plastic)",
    currentBagId: "BAG-2026-8842",
    cassetteId: "CASS-H2O2-04",
    activeAlarmsCount: 1,
    alarmMessage: "Temp Over-range (>62°C Warning)",

    serialNumber: "SN-E-SAFE-2025-0044B",
    procurementDate: "2025-06-20",
    installationDate: "2025-07-01",
    firmwareVersion: "v3.4.12-secure",
    softwareVersion: "SmartTrace-Edge-v2.8",
    hospitalId: "APOLLO-BLR-04",
    gpsCoordinates: "12.9718° N, 77.5948° E",

    pumpHealth: 82,
    fanHealth: 89,
    motorHealth: 84,
    doorCycles: 2150,
    filterLife: 62,
    catalystLife: 70,
    calibrationStatus: "VALID (IQ/OQ/PQ)",
    lastCalibrationDate: "2026-04-18",
    nextCalibrationDate: "2026-10-18",

    connectivityMode: "eSIM Cellular (NB-IoT)",
    signalStrength: "-82 dBm (Good)",
    hardwareKeyId: "ATECC608A-ECDSA-KEY-1120",
    latestHashSignature: "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",

    maintenanceRecords: [
      { id: "MNT-2026-04", date: "2026-04-18", type: "Biannual Sensor & Pump Servicing", engineer: "M. Verma (ENG-14)", status: "PASSED", docName: "IQ_OQ_PQ_Certificate_Unit02.pdf" },
      { id: "MNT-2025-10", date: "2025-10-22", type: "Catalyst Filter Replacement", engineer: "R. Sharma (ENG-02)", status: "PASSED", docName: "Filter_Replacement_Oct2025.pdf" }
    ]
  },
  {
    id: "ABIOT-SAFE-03",
    name: "Sterilizer 03 (OT Complex)",
    location: "Operation Theatre Complex - Wing A",
    department: "Surgical Suite",
    status: "Running",
    currentPhaseStep: 15, // Aeration
    phase: "15. Aeration",
    temperature: 45.0,
    targetTemp: 45.0,
    humidity: 50.0,
    pressure: -15.0,
    h2o2: 45,
    residualH2o2: 0.2,
    cycleTimeRemaining: "04 min",
    progressPct: 92,
    operator: "Vikram Singh (OP-209)",
    wasteCategory: "Yellow Bag (Infectious)",
    currentBagId: "BAG-2026-8843",
    cassetteId: "CASS-H2O2-11",
    activeAlarmsCount: 0,

    serialNumber: "SN-E-SAFE-2025-0089C",
    procurementDate: "2025-08-10",
    installationDate: "2025-08-25",
    firmwareVersion: "v3.4.15-secure",
    softwareVersion: "SmartTrace-Edge-v2.8",
    hospitalId: "APOLLO-BLR-04",
    gpsCoordinates: "12.9720° N, 77.5950° E",

    pumpHealth: 96,
    fanHealth: 95,
    motorHealth: 97,
    doorCycles: 980,
    filterLife: 91,
    catalystLife: 93,
    calibrationStatus: "VALID (IQ/OQ/PQ)",
    lastCalibrationDate: "2026-06-01",
    nextCalibrationDate: "2026-12-01",

    connectivityMode: "eSIM Cellular (LTE-M)",
    signalStrength: "-68 dBm (Excellent)",
    hardwareKeyId: "ATECC608A-ECDSA-KEY-0892",
    latestHashSignature: "185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969",

    maintenanceRecords: [
      { id: "MNT-2026-06", date: "2026-06-01", type: "Commissioning & IQ/OQ/PQ Validation", engineer: "S. Patel (ENG-08)", status: "PASSED", docName: "Validation_Certificate_OT3.pdf" }
    ]
  },
  {
    id: "ABIOT-SAFE-04",
    name: "Sterilizer 04 (Oncology Unit)",
    location: "Block C - Level 1 (Oncology)",
    department: "Oncology & Chemo Unit",
    status: "Idle",
    currentPhaseStep: 1, // Cycle Created / Ready
    phase: "1. Ready for Load",
    temperature: 28.5,
    targetTemp: 0.0,
    humidity: 55.0,
    pressure: 0.0,
    h2o2: 0,
    residualH2o2: 0.0,
    cycleTimeRemaining: "0 min",
    progressPct: 0,
    operator: "Standby",
    wasteCategory: "None",
    currentBagId: "N/A",
    cassetteId: "CASS-H2O2-09",
    activeAlarmsCount: 0,

    serialNumber: "SN-E-SAFE-2025-0102D",
    procurementDate: "2025-09-05",
    installationDate: "2025-09-20",
    firmwareVersion: "v3.4.12-secure",
    softwareVersion: "SmartTrace-Edge-v2.8",
    hospitalId: "APOLLO-BLR-04",
    gpsCoordinates: "12.9715° N, 77.5942° E",

    pumpHealth: 90,
    fanHealth: 92,
    motorHealth: 88,
    doorCycles: 1100,
    filterLife: 78,
    catalystLife: 85,
    calibrationStatus: "VALID (IQ/OQ/PQ)",
    lastCalibrationDate: "2026-03-12",
    nextCalibrationDate: "2026-09-12",

    connectivityMode: "Fallback WPA3 Enterprise Wi-Fi",
    signalStrength: "-70 dBm (Good)",
    hardwareKeyId: "ATECC608A-ECDSA-KEY-0711",
    latestHashSignature: "cb5d7711f77b4f7a080dabe7498e7c8ec251441ea6fd7861925d6b9d77d86355",

    maintenanceRecords: [
      { id: "MNT-2026-03", date: "2026-03-12", type: "Door Seal & Gasket Inspection", engineer: "R. Sharma (ENG-02)", status: "PASSED", docName: "Seal_Inspection_Log.pdf" }
    ]
  },
  {
    id: "ABIOT-SAFE-05",
    name: "Sterilizer 05 (Emergency Ward)",
    location: "Emergency Response Ward - Ground Floor",
    department: "Trauma & Emergency",
    status: "Maintenance",
    currentPhaseStep: 1, // Standby / Calibration Due
    phase: "Calibration Scheduled",
    temperature: 24.1,
    targetTemp: 0.0,
    humidity: 58.0,
    pressure: 0.0,
    h2o2: 0,
    residualH2o2: 0.0,
    cycleTimeRemaining: "0 min",
    progressPct: 0,
    operator: "Eng. S. Patel (ENG-08)",
    wasteCategory: "None",
    currentBagId: "N/A",
    cassetteId: "N/A",
    activeAlarmsCount: 1,
    alarmMessage: "Annual Sensor Calibration Overdue (2 days)",

    serialNumber: "SN-E-SAFE-2024-0012Z",
    procurementDate: "2024-11-01",
    installationDate: "2024-11-15",
    firmwareVersion: "v3.2.0-secure",
    softwareVersion: "SmartTrace-Edge-v2.5",
    hospitalId: "APOLLO-BLR-04",
    gpsCoordinates: "12.9712° N, 77.5940° E",

    pumpHealth: 74,
    fanHealth: 81,
    motorHealth: 76,
    doorCycles: 3410,
    filterLife: 45,
    catalystLife: 52,
    calibrationStatus: "OVERDUE (Recalibration Required)",
    lastCalibrationDate: "2025-08-05",
    nextCalibrationDate: "2026-08-05",

    connectivityMode: "eSIM Cellular (NB-IoT)",
    signalStrength: "-79 dBm (Good)",
    hardwareKeyId: "ATECC608A-ECDSA-KEY-0012",
    latestHashSignature: "d41d8cd98f00b204e9800998ecf8427e997528e5352c8031d279d479e00eb2d8",

    maintenanceRecords: [
      { id: "MNT-2025-08", date: "2025-08-05", type: "Annual Calibration & IQ/OQ/PQ", engineer: "S. Patel (ENG-08)", status: "PASSED", docName: "Calibration_Cert_2025.pdf" },
      { id: "MNT-2025-02", date: "2025-02-19", type: "Vacuum Pump Replacement", engineer: "M. Verma (ENG-14)", status: "PASSED", docName: "Pump_Replacement_Report.pdf" }
    ]
  }
];

export const HOURLY_WASTE_DATA = [
  { time: "06:00", wasteKg: 45, cycles: 3, passRate: 100 },
  { time: "08:00", wasteKg: 120, cycles: 8, passRate: 100 },
  { time: "10:00", wasteKg: 185, cycles: 12, passRate: 98 },
  { time: "12:00", wasteKg: 240, cycles: 16, passRate: 97 },
  { time: "14:00", wasteKg: 210, cycles: 14, passRate: 99 },
  { time: "16:00", wasteKg: 160, cycles: 11, passRate: 100 },
  { time: "18:00", wasteKg: 95, cycles: 6, passRate: 98 },
  { time: "20:00", wasteKg: 50, cycles: 4, passRate: 100 },
];

export const AUDIT_TRAIL_LOGS = [
  {
    cycleId: "CYC-2026-09411",
    machineId: "ABIOT-SAFE-01",
    barcode: "BMW-98124501",
    bagId: "BAG-2026-8841",
    bagCategory: "Yellow Bag (Infectious)",
    cassetteId: "CASS-H2O2-09",
    department: "Central Sterilization",
    operator: "Rajesh Kumar",
    startTime: "2026-08-06 14:45",
    endTime: "2026-08-06 15:30",
    duration: "45 min",
    aiResult: "Bag Intact (99.2% Conf)",
    cpcbStatus: "PASSED",
    hashChain: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    signatureVerified: true,
    downloadable: true
  },
  {
    cycleId: "CYC-2026-09410",
    machineId: "ABIOT-SAFE-03",
    barcode: "BMW-98124498",
    bagId: "BAG-2026-8839",
    bagCategory: "Red Bag (Contaminated Plastic)",
    cassetteId: "CASS-H2O2-11",
    department: "Surgical Suite",
    operator: "Vikram Singh",
    startTime: "2026-08-06 13:50",
    endTime: "2026-08-06 14:35",
    duration: "45 min",
    aiResult: "Bag Intact (98.7% Conf)",
    cpcbStatus: "PASSED",
    hashChain: "185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969",
    signatureVerified: true,
    downloadable: true
  },
  {
    cycleId: "CYC-2026-09409",
    machineId: "ABIOT-SAFE-02",
    barcode: "BMW-98124477",
    bagId: "BAG-2026-8830",
    bagCategory: "Yellow Bag (Infectious)",
    cassetteId: "CASS-H2O2-04",
    department: "Intensive Care Unit",
    operator: "Ananya Sharma",
    startTime: "2026-08-06 12:10",
    endTime: "2026-08-06 12:55",
    duration: "45 min",
    aiResult: "Bag Intact (97.4% Conf)",
    cpcbStatus: "PASSED",
    hashChain: "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    signatureVerified: true,
    downloadable: true
  },
  {
    cycleId: "CYC-2026-09408",
    machineId: "ABIOT-SAFE-02",
    barcode: "BMW-98124412",
    bagId: "BAG-2026-8815",
    bagCategory: "Yellow Bag (Infectious)",
    cassetteId: "CASS-H2O2-04",
    department: "Intensive Care Unit",
    operator: "Ananya Sharma",
    startTime: "2026-08-06 10:30",
    endTime: "2026-08-06 11:10",
    duration: "40 min (Aborted)",
    aiResult: "Overfill Flagged (94% Fill)",
    cpcbStatus: "FLAGGED",
    flagReason: "AI Camera detected waste bag exceeded maximum 85% volumetric safety threshold (Actual Fill: 94%). Cycle aborted automatically to prevent bag rupture.",
    telemetryBreach: "Bag Fill Level: 94% (Threshold: <85%) • Temp Excursion: 64.2°C Peak",
    correctiveAction: "Safety lock engaged. Waste repacked into 2 CPCB-compliant bags by Operator Ananya Sharma.",
    hashChain: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
    signatureVerified: true,
    downloadable: true
  },
  {
    cycleId: "CYC-2026-09407",
    machineId: "ABIOT-SAFE-04",
    barcode: "BMW-98124390",
    bagId: "BAG-2026-8802",
    bagCategory: "Red Bag (Contaminated Plastic)",
    cassetteId: "CASS-H2O2-09",
    department: "Oncology & Chemo Unit",
    operator: "Rajesh Kumar",
    startTime: "2026-08-06 09:15",
    endTime: "2026-08-06 10:00",
    duration: "45 min",
    aiResult: "Bag Intact (99.5% Conf)",
    cpcbStatus: "PASSED",
    hashChain: "cb5d7711f77b4f7a080dabe7498e7c8ec251441ea6fd7861925d6b9d77d86355",
    signatureVerified: true,
    downloadable: true
  }
];

export const COMPLIANCE_METRICS = {
  hospitalName: "Apollo Super Speciality Hospital",
  cpcbLicenseNo: "CPCB-BMW-2024-ND-9941",
  overallScore: 98.4,
  cpcbRulePassRate: 99.1,
  totalWasteTreatedMonthKg: 14280,
  dailyAverageKg: 476,
  barcodeScanCompliancePct: 100,
  aiBagIntegrityPct: 97.8,
  activeUnitsCount: 5,
  lastAuditDate: "2026-08-01",
  nextAuditDate: "2026-09-01",
};
