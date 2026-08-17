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

    // Maintenance Records
    
    // Machine Utilization Data (by time range)
    totalOperatingHours: 3840,
    utilizationByRange: {
      '24h': {
        label: 'Last 24 Hours', periodLabel: 'Today', chartSubLabel: 'Hourly (2-hr slots)',
        activeHours: 12.5, uptimePct: 85,
        data: [
          { label: '02:00', hoursActive: 0.5, cyclesRun: 1 },
          { label: '04:00', hoursActive: 0.8, cyclesRun: 1 },
          { label: '06:00', hoursActive: 1.0, cyclesRun: 2 },
          { label: '08:00', hoursActive: 1.5, cyclesRun: 2 },
          { label: '10:00', hoursActive: 2.0, cyclesRun: 3 },
          { label: '12:00', hoursActive: 1.2, cyclesRun: 2 },
          { label: '14:00', hoursActive: 1.6, cyclesRun: 2 },
          { label: '16:00', hoursActive: 1.5, cyclesRun: 2 },
          { label: '18:00', hoursActive: 1.0, cyclesRun: 1 },
          { label: '20:00', hoursActive: 0.8, cyclesRun: 1 },
          { label: '22:00', hoursActive: 0.4, cyclesRun: 1 },
          { label: '00:00', hoursActive: 0.2, cyclesRun: 0 },
        ]
      },
      '7d': {
        label: 'Last 7 Days', periodLabel: 'This Week', chartSubLabel: 'Daily',
        activeHours: 98.2, uptimePct: 84,
        data: [
          { label: 'Mon', hoursActive: 15.0, cyclesRun: 20 },
          { label: 'Tue', hoursActive: 16.5, cyclesRun: 22 },
          { label: 'Wed', hoursActive: 13.0, cyclesRun: 17 },
          { label: 'Thu', hoursActive: 16.0, cyclesRun: 21 },
          { label: 'Fri', hoursActive: 18.0, cyclesRun: 24 },
          { label: 'Sat', hoursActive: 10.5, cyclesRun: 13 },
          { label: 'Sun', hoursActive: 9.2,  cyclesRun: 11 },
        ]
      },
      '1m': {
        label: 'Last Month', periodLabel: 'This Month', chartSubLabel: 'Weekly',
        activeHours: 415, uptimePct: 83,
        data: [
          { label: 'Wk 1', hoursActive: 102, cyclesRun: 135 },
          { label: 'Wk 2', hoursActive: 110, cyclesRun: 148 },
          { label: 'Wk 3', hoursActive: 95,  cyclesRun: 122 },
          { label: 'Wk 4', hoursActive: 108, cyclesRun: 141 },
        ]
      },
      '3m': {
        label: 'Last 3 Months', periodLabel: '3 Months', chartSubLabel: 'Monthly',
        activeHours: 1150, uptimePct: 82,
        data: [
          { label: 'Jun', hoursActive: 480, cyclesRun: 640 },
          { label: 'Jul', hoursActive: 495, cyclesRun: 660 },
          { label: 'Aug', hoursActive: 175, cyclesRun: 130 },
        ]
      },
      '6m': {
        label: 'Last 6 Months', periodLabel: '6 Months', chartSubLabel: 'Monthly',
        activeHours: 2580, uptimePct: 84,
        data: [
          { label: 'Mar', hoursActive: 460, cyclesRun: 610 },
          { label: 'Apr', hoursActive: 475, cyclesRun: 630 },
          { label: 'May', hoursActive: 490, cyclesRun: 650 },
          { label: 'Jun', hoursActive: 480, cyclesRun: 640 },
          { label: 'Jul', hoursActive: 495, cyclesRun: 660 },
          { label: 'Aug', hoursActive: 175, cyclesRun: 130 },
        ]
      },
      '1y': {
        label: 'Last 1 Year', periodLabel: '1 Year', chartSubLabel: 'Monthly',
        activeHours: 5240, uptimePct: 82,
        data: [
          { label: 'Sep', hoursActive: 430, cyclesRun: 570 },
          { label: 'Oct', hoursActive: 450, cyclesRun: 595 },
          { label: 'Nov', hoursActive: 465, cyclesRun: 615 },
          { label: 'Dec', hoursActive: 410, cyclesRun: 540 },
          { label: 'Jan', hoursActive: 470, cyclesRun: 625 },
          { label: 'Feb', hoursActive: 445, cyclesRun: 590 },
          { label: 'Mar', hoursActive: 460, cyclesRun: 610 },
          { label: 'Apr', hoursActive: 475, cyclesRun: 630 },
          { label: 'May', hoursActive: 490, cyclesRun: 650 },
          { label: 'Jun', hoursActive: 480, cyclesRun: 640 },
          { label: 'Jul', hoursActive: 495, cyclesRun: 660 },
          { label: 'Aug', hoursActive: 175, cyclesRun: 130 },
        ]
      },
      'all': {
        label: 'Since Installation', periodLabel: 'Since Install', chartSubLabel: 'Quarterly',
        activeHours: 3840, uptimePct: 80,
        data: [
          { label: "Q2 '25", hoursActive: 1200, cyclesRun: 1580 },
          { label: "Q3 '25", hoursActive: 1350, cyclesRun: 1780 },
          { label: "Q4 '25", hoursActive: 1250, cyclesRun: 1650 },
          { label: "Q1 '26", hoursActive: 1380, cyclesRun: 1820 },
          { label: "Q2 '26", hoursActive: 1450, cyclesRun: 1910 },
          { label: "Q3 '26", hoursActive: 395,  cyclesRun: 510  },
        ]
      },
    },

    // Downtime Records
    downtimeRecords: [
      { id: 'DT-2026-08', startTime: '2026-08-01 10:00', duration: '2h 15m', reason: 'Routine Maintenance', resolvedBy: 'M. Verma (ENG-14)', type: 'Planned' },
      { id: 'DT-2026-07', startTime: '2026-07-15 14:30', duration: '4h 45m', reason: 'Unexpected Pressure Drop', resolvedBy: 'S. Patel (ENG-08)', type: 'Unplanned' },
      { id: 'DT-2026-06', startTime: '2026-06-22 09:00', duration: '1h 30m', reason: 'Software Update', resolvedBy: 'R. Sharma (ENG-02)', type: 'Planned' }
    ],
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

    
    // Machine Utilization Data (by time range)
    totalOperatingHours: 3840,
    utilizationByRange: {
      '24h': {
        label: 'Last 24 Hours', periodLabel: 'Today', chartSubLabel: 'Hourly (2-hr slots)',
        activeHours: 12.5, uptimePct: 85,
        data: [
          { label: '02:00', hoursActive: 0.5, cyclesRun: 1 },
          { label: '04:00', hoursActive: 0.8, cyclesRun: 1 },
          { label: '06:00', hoursActive: 1.0, cyclesRun: 2 },
          { label: '08:00', hoursActive: 1.5, cyclesRun: 2 },
          { label: '10:00', hoursActive: 2.0, cyclesRun: 3 },
          { label: '12:00', hoursActive: 1.2, cyclesRun: 2 },
          { label: '14:00', hoursActive: 1.6, cyclesRun: 2 },
          { label: '16:00', hoursActive: 1.5, cyclesRun: 2 },
          { label: '18:00', hoursActive: 1.0, cyclesRun: 1 },
          { label: '20:00', hoursActive: 0.8, cyclesRun: 1 },
          { label: '22:00', hoursActive: 0.4, cyclesRun: 1 },
          { label: '00:00', hoursActive: 0.2, cyclesRun: 0 },
        ]
      },
      '7d': {
        label: 'Last 7 Days', periodLabel: 'This Week', chartSubLabel: 'Daily',
        activeHours: 98.2, uptimePct: 84,
        data: [
          { label: 'Mon', hoursActive: 15.0, cyclesRun: 20 },
          { label: 'Tue', hoursActive: 16.5, cyclesRun: 22 },
          { label: 'Wed', hoursActive: 13.0, cyclesRun: 17 },
          { label: 'Thu', hoursActive: 16.0, cyclesRun: 21 },
          { label: 'Fri', hoursActive: 18.0, cyclesRun: 24 },
          { label: 'Sat', hoursActive: 10.5, cyclesRun: 13 },
          { label: 'Sun', hoursActive: 9.2,  cyclesRun: 11 },
        ]
      },
      '1m': {
        label: 'Last Month', periodLabel: 'This Month', chartSubLabel: 'Weekly',
        activeHours: 415, uptimePct: 83,
        data: [
          { label: 'Wk 1', hoursActive: 102, cyclesRun: 135 },
          { label: 'Wk 2', hoursActive: 110, cyclesRun: 148 },
          { label: 'Wk 3', hoursActive: 95,  cyclesRun: 122 },
          { label: 'Wk 4', hoursActive: 108, cyclesRun: 141 },
        ]
      },
      '3m': {
        label: 'Last 3 Months', periodLabel: '3 Months', chartSubLabel: 'Monthly',
        activeHours: 1150, uptimePct: 82,
        data: [
          { label: 'Jun', hoursActive: 480, cyclesRun: 640 },
          { label: 'Jul', hoursActive: 495, cyclesRun: 660 },
          { label: 'Aug', hoursActive: 175, cyclesRun: 130 },
        ]
      },
      '6m': {
        label: 'Last 6 Months', periodLabel: '6 Months', chartSubLabel: 'Monthly',
        activeHours: 2580, uptimePct: 84,
        data: [
          { label: 'Mar', hoursActive: 460, cyclesRun: 610 },
          { label: 'Apr', hoursActive: 475, cyclesRun: 630 },
          { label: 'May', hoursActive: 490, cyclesRun: 650 },
          { label: 'Jun', hoursActive: 480, cyclesRun: 640 },
          { label: 'Jul', hoursActive: 495, cyclesRun: 660 },
          { label: 'Aug', hoursActive: 175, cyclesRun: 130 },
        ]
      },
      '1y': {
        label: 'Last 1 Year', periodLabel: '1 Year', chartSubLabel: 'Monthly',
        activeHours: 5240, uptimePct: 82,
        data: [
          { label: 'Sep', hoursActive: 430, cyclesRun: 570 },
          { label: 'Oct', hoursActive: 450, cyclesRun: 595 },
          { label: 'Nov', hoursActive: 465, cyclesRun: 615 },
          { label: 'Dec', hoursActive: 410, cyclesRun: 540 },
          { label: 'Jan', hoursActive: 470, cyclesRun: 625 },
          { label: 'Feb', hoursActive: 445, cyclesRun: 590 },
          { label: 'Mar', hoursActive: 460, cyclesRun: 610 },
          { label: 'Apr', hoursActive: 475, cyclesRun: 630 },
          { label: 'May', hoursActive: 490, cyclesRun: 650 },
          { label: 'Jun', hoursActive: 480, cyclesRun: 640 },
          { label: 'Jul', hoursActive: 495, cyclesRun: 660 },
          { label: 'Aug', hoursActive: 175, cyclesRun: 130 },
        ]
      },
      'all': {
        label: 'Since Installation', periodLabel: 'Since Install', chartSubLabel: 'Quarterly',
        activeHours: 3840, uptimePct: 80,
        data: [
          { label: "Q2 '25", hoursActive: 1200, cyclesRun: 1580 },
          { label: "Q3 '25", hoursActive: 1350, cyclesRun: 1780 },
          { label: "Q4 '25", hoursActive: 1250, cyclesRun: 1650 },
          { label: "Q1 '26", hoursActive: 1380, cyclesRun: 1820 },
          { label: "Q2 '26", hoursActive: 1450, cyclesRun: 1910 },
          { label: "Q3 '26", hoursActive: 395,  cyclesRun: 510  },
        ]
      },
    },

    // Downtime Records
    downtimeRecords: [
      { id: 'DT-2026-08', startTime: '2026-08-01 10:00', duration: '2h 15m', reason: 'Routine Maintenance', resolvedBy: 'M. Verma (ENG-14)', type: 'Planned' },
      { id: 'DT-2026-07', startTime: '2026-07-15 14:30', duration: '4h 45m', reason: 'Unexpected Pressure Drop', resolvedBy: 'S. Patel (ENG-08)', type: 'Unplanned' },
      { id: 'DT-2026-06', startTime: '2026-06-22 09:00', duration: '1h 30m', reason: 'Software Update', resolvedBy: 'R. Sharma (ENG-02)', type: 'Planned' }
    ],
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

    
    // Machine Utilization Data (by time range)
    totalOperatingHours: 3840,
    utilizationByRange: {
      '24h': {
        label: 'Last 24 Hours', periodLabel: 'Today', chartSubLabel: 'Hourly (2-hr slots)',
        activeHours: 12.5, uptimePct: 85,
        data: [
          { label: '02:00', hoursActive: 0.5, cyclesRun: 1 },
          { label: '04:00', hoursActive: 0.8, cyclesRun: 1 },
          { label: '06:00', hoursActive: 1.0, cyclesRun: 2 },
          { label: '08:00', hoursActive: 1.5, cyclesRun: 2 },
          { label: '10:00', hoursActive: 2.0, cyclesRun: 3 },
          { label: '12:00', hoursActive: 1.2, cyclesRun: 2 },
          { label: '14:00', hoursActive: 1.6, cyclesRun: 2 },
          { label: '16:00', hoursActive: 1.5, cyclesRun: 2 },
          { label: '18:00', hoursActive: 1.0, cyclesRun: 1 },
          { label: '20:00', hoursActive: 0.8, cyclesRun: 1 },
          { label: '22:00', hoursActive: 0.4, cyclesRun: 1 },
          { label: '00:00', hoursActive: 0.2, cyclesRun: 0 },
        ]
      },
      '7d': {
        label: 'Last 7 Days', periodLabel: 'This Week', chartSubLabel: 'Daily',
        activeHours: 98.2, uptimePct: 84,
        data: [
          { label: 'Mon', hoursActive: 15.0, cyclesRun: 20 },
          { label: 'Tue', hoursActive: 16.5, cyclesRun: 22 },
          { label: 'Wed', hoursActive: 13.0, cyclesRun: 17 },
          { label: 'Thu', hoursActive: 16.0, cyclesRun: 21 },
          { label: 'Fri', hoursActive: 18.0, cyclesRun: 24 },
          { label: 'Sat', hoursActive: 10.5, cyclesRun: 13 },
          { label: 'Sun', hoursActive: 9.2,  cyclesRun: 11 },
        ]
      },
      '1m': {
        label: 'Last Month', periodLabel: 'This Month', chartSubLabel: 'Weekly',
        activeHours: 415, uptimePct: 83,
        data: [
          { label: 'Wk 1', hoursActive: 102, cyclesRun: 135 },
          { label: 'Wk 2', hoursActive: 110, cyclesRun: 148 },
          { label: 'Wk 3', hoursActive: 95,  cyclesRun: 122 },
          { label: 'Wk 4', hoursActive: 108, cyclesRun: 141 },
        ]
      },
      '3m': {
        label: 'Last 3 Months', periodLabel: '3 Months', chartSubLabel: 'Monthly',
        activeHours: 1150, uptimePct: 82,
        data: [
          { label: 'Jun', hoursActive: 480, cyclesRun: 640 },
          { label: 'Jul', hoursActive: 495, cyclesRun: 660 },
          { label: 'Aug', hoursActive: 175, cyclesRun: 130 },
        ]
      },
      '6m': {
        label: 'Last 6 Months', periodLabel: '6 Months', chartSubLabel: 'Monthly',
        activeHours: 2580, uptimePct: 84,
        data: [
          { label: 'Mar', hoursActive: 460, cyclesRun: 610 },
          { label: 'Apr', hoursActive: 475, cyclesRun: 630 },
          { label: 'May', hoursActive: 490, cyclesRun: 650 },
          { label: 'Jun', hoursActive: 480, cyclesRun: 640 },
          { label: 'Jul', hoursActive: 495, cyclesRun: 660 },
          { label: 'Aug', hoursActive: 175, cyclesRun: 130 },
        ]
      },
      '1y': {
        label: 'Last 1 Year', periodLabel: '1 Year', chartSubLabel: 'Monthly',
        activeHours: 5240, uptimePct: 82,
        data: [
          { label: 'Sep', hoursActive: 430, cyclesRun: 570 },
          { label: 'Oct', hoursActive: 450, cyclesRun: 595 },
          { label: 'Nov', hoursActive: 465, cyclesRun: 615 },
          { label: 'Dec', hoursActive: 410, cyclesRun: 540 },
          { label: 'Jan', hoursActive: 470, cyclesRun: 625 },
          { label: 'Feb', hoursActive: 445, cyclesRun: 590 },
          { label: 'Mar', hoursActive: 460, cyclesRun: 610 },
          { label: 'Apr', hoursActive: 475, cyclesRun: 630 },
          { label: 'May', hoursActive: 490, cyclesRun: 650 },
          { label: 'Jun', hoursActive: 480, cyclesRun: 640 },
          { label: 'Jul', hoursActive: 495, cyclesRun: 660 },
          { label: 'Aug', hoursActive: 175, cyclesRun: 130 },
        ]
      },
      'all': {
        label: 'Since Installation', periodLabel: 'Since Install', chartSubLabel: 'Quarterly',
        activeHours: 3840, uptimePct: 80,
        data: [
          { label: "Q2 '25", hoursActive: 1200, cyclesRun: 1580 },
          { label: "Q3 '25", hoursActive: 1350, cyclesRun: 1780 },
          { label: "Q4 '25", hoursActive: 1250, cyclesRun: 1650 },
          { label: "Q1 '26", hoursActive: 1380, cyclesRun: 1820 },
          { label: "Q2 '26", hoursActive: 1450, cyclesRun: 1910 },
          { label: "Q3 '26", hoursActive: 395,  cyclesRun: 510  },
        ]
      },
    },

    // Downtime Records
    downtimeRecords: [
      { id: 'DT-2026-08', startTime: '2026-08-01 10:00', duration: '2h 15m', reason: 'Routine Maintenance', resolvedBy: 'M. Verma (ENG-14)', type: 'Planned' },
      { id: 'DT-2026-07', startTime: '2026-07-15 14:30', duration: '4h 45m', reason: 'Unexpected Pressure Drop', resolvedBy: 'S. Patel (ENG-08)', type: 'Unplanned' },
      { id: 'DT-2026-06', startTime: '2026-06-22 09:00', duration: '1h 30m', reason: 'Software Update', resolvedBy: 'R. Sharma (ENG-02)', type: 'Planned' }
    ],
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

    
    // Machine Utilization Data (by time range)
    totalOperatingHours: 3840,
    utilizationByRange: {
      '24h': {
        label: 'Last 24 Hours', periodLabel: 'Today', chartSubLabel: 'Hourly (2-hr slots)',
        activeHours: 12.5, uptimePct: 85,
        data: [
          { label: '02:00', hoursActive: 0.5, cyclesRun: 1 },
          { label: '04:00', hoursActive: 0.8, cyclesRun: 1 },
          { label: '06:00', hoursActive: 1.0, cyclesRun: 2 },
          { label: '08:00', hoursActive: 1.5, cyclesRun: 2 },
          { label: '10:00', hoursActive: 2.0, cyclesRun: 3 },
          { label: '12:00', hoursActive: 1.2, cyclesRun: 2 },
          { label: '14:00', hoursActive: 1.6, cyclesRun: 2 },
          { label: '16:00', hoursActive: 1.5, cyclesRun: 2 },
          { label: '18:00', hoursActive: 1.0, cyclesRun: 1 },
          { label: '20:00', hoursActive: 0.8, cyclesRun: 1 },
          { label: '22:00', hoursActive: 0.4, cyclesRun: 1 },
          { label: '00:00', hoursActive: 0.2, cyclesRun: 0 },
        ]
      },
      '7d': {
        label: 'Last 7 Days', periodLabel: 'This Week', chartSubLabel: 'Daily',
        activeHours: 98.2, uptimePct: 84,
        data: [
          { label: 'Mon', hoursActive: 15.0, cyclesRun: 20 },
          { label: 'Tue', hoursActive: 16.5, cyclesRun: 22 },
          { label: 'Wed', hoursActive: 13.0, cyclesRun: 17 },
          { label: 'Thu', hoursActive: 16.0, cyclesRun: 21 },
          { label: 'Fri', hoursActive: 18.0, cyclesRun: 24 },
          { label: 'Sat', hoursActive: 10.5, cyclesRun: 13 },
          { label: 'Sun', hoursActive: 9.2,  cyclesRun: 11 },
        ]
      },
      '1m': {
        label: 'Last Month', periodLabel: 'This Month', chartSubLabel: 'Weekly',
        activeHours: 415, uptimePct: 83,
        data: [
          { label: 'Wk 1', hoursActive: 102, cyclesRun: 135 },
          { label: 'Wk 2', hoursActive: 110, cyclesRun: 148 },
          { label: 'Wk 3', hoursActive: 95,  cyclesRun: 122 },
          { label: 'Wk 4', hoursActive: 108, cyclesRun: 141 },
        ]
      },
      '3m': {
        label: 'Last 3 Months', periodLabel: '3 Months', chartSubLabel: 'Monthly',
        activeHours: 1150, uptimePct: 82,
        data: [
          { label: 'Jun', hoursActive: 480, cyclesRun: 640 },
          { label: 'Jul', hoursActive: 495, cyclesRun: 660 },
          { label: 'Aug', hoursActive: 175, cyclesRun: 130 },
        ]
      },
      '6m': {
        label: 'Last 6 Months', periodLabel: '6 Months', chartSubLabel: 'Monthly',
        activeHours: 2580, uptimePct: 84,
        data: [
          { label: 'Mar', hoursActive: 460, cyclesRun: 610 },
          { label: 'Apr', hoursActive: 475, cyclesRun: 630 },
          { label: 'May', hoursActive: 490, cyclesRun: 650 },
          { label: 'Jun', hoursActive: 480, cyclesRun: 640 },
          { label: 'Jul', hoursActive: 495, cyclesRun: 660 },
          { label: 'Aug', hoursActive: 175, cyclesRun: 130 },
        ]
      },
      '1y': {
        label: 'Last 1 Year', periodLabel: '1 Year', chartSubLabel: 'Monthly',
        activeHours: 5240, uptimePct: 82,
        data: [
          { label: 'Sep', hoursActive: 430, cyclesRun: 570 },
          { label: 'Oct', hoursActive: 450, cyclesRun: 595 },
          { label: 'Nov', hoursActive: 465, cyclesRun: 615 },
          { label: 'Dec', hoursActive: 410, cyclesRun: 540 },
          { label: 'Jan', hoursActive: 470, cyclesRun: 625 },
          { label: 'Feb', hoursActive: 445, cyclesRun: 590 },
          { label: 'Mar', hoursActive: 460, cyclesRun: 610 },
          { label: 'Apr', hoursActive: 475, cyclesRun: 630 },
          { label: 'May', hoursActive: 490, cyclesRun: 650 },
          { label: 'Jun', hoursActive: 480, cyclesRun: 640 },
          { label: 'Jul', hoursActive: 495, cyclesRun: 660 },
          { label: 'Aug', hoursActive: 175, cyclesRun: 130 },
        ]
      },
      'all': {
        label: 'Since Installation', periodLabel: 'Since Install', chartSubLabel: 'Quarterly',
        activeHours: 3840, uptimePct: 80,
        data: [
          { label: "Q2 '25", hoursActive: 1200, cyclesRun: 1580 },
          { label: "Q3 '25", hoursActive: 1350, cyclesRun: 1780 },
          { label: "Q4 '25", hoursActive: 1250, cyclesRun: 1650 },
          { label: "Q1 '26", hoursActive: 1380, cyclesRun: 1820 },
          { label: "Q2 '26", hoursActive: 1450, cyclesRun: 1910 },
          { label: "Q3 '26", hoursActive: 395,  cyclesRun: 510  },
        ]
      },
    },

    // Downtime Records
    downtimeRecords: [
      { id: 'DT-2026-08', startTime: '2026-08-01 10:00', duration: '2h 15m', reason: 'Routine Maintenance', resolvedBy: 'M. Verma (ENG-14)', type: 'Planned' },
      { id: 'DT-2026-07', startTime: '2026-07-15 14:30', duration: '4h 45m', reason: 'Unexpected Pressure Drop', resolvedBy: 'S. Patel (ENG-08)', type: 'Unplanned' },
      { id: 'DT-2026-06', startTime: '2026-06-22 09:00', duration: '1h 30m', reason: 'Software Update', resolvedBy: 'R. Sharma (ENG-02)', type: 'Planned' }
    ],
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

    
    // Machine Utilization Data (by time range)
    totalOperatingHours: 3840,
    utilizationByRange: {
      '24h': {
        label: 'Last 24 Hours', periodLabel: 'Today', chartSubLabel: 'Hourly (2-hr slots)',
        activeHours: 12.5, uptimePct: 85,
        data: [
          { label: '02:00', hoursActive: 0.5, cyclesRun: 1 },
          { label: '04:00', hoursActive: 0.8, cyclesRun: 1 },
          { label: '06:00', hoursActive: 1.0, cyclesRun: 2 },
          { label: '08:00', hoursActive: 1.5, cyclesRun: 2 },
          { label: '10:00', hoursActive: 2.0, cyclesRun: 3 },
          { label: '12:00', hoursActive: 1.2, cyclesRun: 2 },
          { label: '14:00', hoursActive: 1.6, cyclesRun: 2 },
          { label: '16:00', hoursActive: 1.5, cyclesRun: 2 },
          { label: '18:00', hoursActive: 1.0, cyclesRun: 1 },
          { label: '20:00', hoursActive: 0.8, cyclesRun: 1 },
          { label: '22:00', hoursActive: 0.4, cyclesRun: 1 },
          { label: '00:00', hoursActive: 0.2, cyclesRun: 0 },
        ]
      },
      '7d': {
        label: 'Last 7 Days', periodLabel: 'This Week', chartSubLabel: 'Daily',
        activeHours: 98.2, uptimePct: 84,
        data: [
          { label: 'Mon', hoursActive: 15.0, cyclesRun: 20 },
          { label: 'Tue', hoursActive: 16.5, cyclesRun: 22 },
          { label: 'Wed', hoursActive: 13.0, cyclesRun: 17 },
          { label: 'Thu', hoursActive: 16.0, cyclesRun: 21 },
          { label: 'Fri', hoursActive: 18.0, cyclesRun: 24 },
          { label: 'Sat', hoursActive: 10.5, cyclesRun: 13 },
          { label: 'Sun', hoursActive: 9.2,  cyclesRun: 11 },
        ]
      },
      '1m': {
        label: 'Last Month', periodLabel: 'This Month', chartSubLabel: 'Weekly',
        activeHours: 415, uptimePct: 83,
        data: [
          { label: 'Wk 1', hoursActive: 102, cyclesRun: 135 },
          { label: 'Wk 2', hoursActive: 110, cyclesRun: 148 },
          { label: 'Wk 3', hoursActive: 95,  cyclesRun: 122 },
          { label: 'Wk 4', hoursActive: 108, cyclesRun: 141 },
        ]
      },
      '3m': {
        label: 'Last 3 Months', periodLabel: '3 Months', chartSubLabel: 'Monthly',
        activeHours: 1150, uptimePct: 82,
        data: [
          { label: 'Jun', hoursActive: 480, cyclesRun: 640 },
          { label: 'Jul', hoursActive: 495, cyclesRun: 660 },
          { label: 'Aug', hoursActive: 175, cyclesRun: 130 },
        ]
      },
      '6m': {
        label: 'Last 6 Months', periodLabel: '6 Months', chartSubLabel: 'Monthly',
        activeHours: 2580, uptimePct: 84,
        data: [
          { label: 'Mar', hoursActive: 460, cyclesRun: 610 },
          { label: 'Apr', hoursActive: 475, cyclesRun: 630 },
          { label: 'May', hoursActive: 490, cyclesRun: 650 },
          { label: 'Jun', hoursActive: 480, cyclesRun: 640 },
          { label: 'Jul', hoursActive: 495, cyclesRun: 660 },
          { label: 'Aug', hoursActive: 175, cyclesRun: 130 },
        ]
      },
      '1y': {
        label: 'Last 1 Year', periodLabel: '1 Year', chartSubLabel: 'Monthly',
        activeHours: 5240, uptimePct: 82,
        data: [
          { label: 'Sep', hoursActive: 430, cyclesRun: 570 },
          { label: 'Oct', hoursActive: 450, cyclesRun: 595 },
          { label: 'Nov', hoursActive: 465, cyclesRun: 615 },
          { label: 'Dec', hoursActive: 410, cyclesRun: 540 },
          { label: 'Jan', hoursActive: 470, cyclesRun: 625 },
          { label: 'Feb', hoursActive: 445, cyclesRun: 590 },
          { label: 'Mar', hoursActive: 460, cyclesRun: 610 },
          { label: 'Apr', hoursActive: 475, cyclesRun: 630 },
          { label: 'May', hoursActive: 490, cyclesRun: 650 },
          { label: 'Jun', hoursActive: 480, cyclesRun: 640 },
          { label: 'Jul', hoursActive: 495, cyclesRun: 660 },
          { label: 'Aug', hoursActive: 175, cyclesRun: 130 },
        ]
      },
      'all': {
        label: 'Since Installation', periodLabel: 'Since Install', chartSubLabel: 'Quarterly',
        activeHours: 3840, uptimePct: 80,
        data: [
          { label: "Q2 '25", hoursActive: 1200, cyclesRun: 1580 },
          { label: "Q3 '25", hoursActive: 1350, cyclesRun: 1780 },
          { label: "Q4 '25", hoursActive: 1250, cyclesRun: 1650 },
          { label: "Q1 '26", hoursActive: 1380, cyclesRun: 1820 },
          { label: "Q2 '26", hoursActive: 1450, cyclesRun: 1910 },
          { label: "Q3 '26", hoursActive: 395,  cyclesRun: 510  },
        ]
      },
    },

    // Downtime Records
    downtimeRecords: [
      { id: 'DT-2026-08', startTime: '2026-08-01 10:00', duration: '2h 15m', reason: 'Routine Maintenance', resolvedBy: 'M. Verma (ENG-14)', type: 'Planned' },
      { id: 'DT-2026-07', startTime: '2026-07-15 14:30', duration: '4h 45m', reason: 'Unexpected Pressure Drop', resolvedBy: 'S. Patel (ENG-08)', type: 'Unplanned' },
      { id: 'DT-2026-06', startTime: '2026-06-22 09:00', duration: '1h 30m', reason: 'Software Update', resolvedBy: 'R. Sharma (ENG-02)', type: 'Planned' }
    ],
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

// Regional Client Management Data (Company Admin 50km Zone)
export const REGIONS = [
  { id: 'REG-BLR-SOUTH', name: 'Bangalore South Zone (50km Radius)', city: 'Bengaluru', activeHospitals: 5, totalDevices: 22, alertCount: 1, adminInCharge: 'Dr. Rajesh Varma' },
  { id: 'REG-BLR-NORTH', name: 'Bangalore North & Yelahanka', city: 'Bengaluru', activeHospitals: 4, totalDevices: 18, alertCount: 0, adminInCharge: 'K. R. Rao' },
  { id: 'REG-MUM-WEST', name: 'Mumbai Western Suburbs', city: 'Mumbai', activeHospitals: 8, totalDevices: 34, alertCount: 2, adminInCharge: 'S. Kulkarni' },
  { id: 'REG-DEL-NCR', name: 'Delhi NCR Zone 1', city: 'New Delhi', activeHospitals: 6, totalDevices: 28, alertCount: 0, adminInCharge: 'P. Gupta' }
];

export const REGIONAL_HOSPITALS = [
  {
    id: 'HOSP-APOLLO-BG',
    name: 'Apollo Super Speciality Hospital',
    locality: 'Bannerghatta Road, JP Nagar (12 km)',
    cpcbLicenseNo: 'CPCB-BMW-2024-ND-9941',
    deviceCount: 5,
    runningCount: 3,
    alarmCount: 1,
    idleCount: 1,
    complianceScore: 98.4,
    monthlyWasteKg: 14280,
    contactPerson: 'Dr. R. Varma',
    phone: '+91 80 2630 4000',
    lastServiced: '2026-07-28',
    status: 'Operational'
  },
  {
    id: 'HOSP-FORTIS-BG',
    name: 'Fortis Hospital BG Road',
    locality: 'Arekere, Bannerghatta Main Rd (14 km)',
    cpcbLicenseNo: 'CPCB-BMW-2024-KA-8812',
    deviceCount: 4,
    runningCount: 4,
    alarmCount: 0,
    idleCount: 0,
    complianceScore: 99.2,
    monthlyWasteKg: 11450,
    contactPerson: 'S. Nambiar',
    phone: '+91 80 6621 4444',
    lastServiced: '2026-08-01',
    status: 'Operational'
  },
  {
    id: 'HOSP-MANIPAL-JYN',
    name: 'Manipal Hospital Jayanagar',
    locality: '9th Block, Jayanagar (8 km)',
    cpcbLicenseNo: 'CPCB-BMW-2024-KA-7740',
    deviceCount: 4,
    runningCount: 3,
    alarmCount: 0,
    idleCount: 1,
    complianceScore: 97.6,
    monthlyWasteKg: 9820,
    contactPerson: 'M. Deshmukh',
    phone: '+91 80 4342 0000',
    lastServiced: '2026-07-15',
    status: 'Operational'
  },
  {
    id: 'HOSP-STJOHNS-KOR',
    name: 'St. John’s Medical College Hospital',
    locality: 'Koramangala 4th Block (16 km)',
    cpcbLicenseNo: 'CPCB-BMW-2023-KA-1029',
    deviceCount: 6,
    runningCount: 4,
    alarmCount: 0,
    idleCount: 2,
    complianceScore: 99.5,
    monthlyWasteKg: 18900,
    contactPerson: 'Fr. Joseph',
    phone: '+91 80 2206 5000',
    lastServiced: '2026-08-03',
    status: 'Operational'
  },
  {
    id: 'HOSP-ASTER-RV',
    name: 'Aster RV Hospital',
    locality: 'CA 37, 24th Main, JP Nagar 1st Phase (6 km)',
    cpcbLicenseNo: 'CPCB-BMW-2025-KA-4410',
    deviceCount: 3,
    runningCount: 2,
    alarmCount: 0,
    idleCount: 1,
    complianceScore: 96.8,
    monthlyWasteKg: 7410,
    contactPerson: 'Dr. V. Hegde',
    phone: '+91 80 6604 0400',
    lastServiced: '2026-06-20',
    status: 'Operational'
  }
];

// CPCB National & Umbrella Group Hierarchy
export const UMBRELLA_GROUPS = [
  { id: 'GRP-APOLLO', name: 'Apollo Hospitals Group (National Chain)', totalHospitals: 42, totalDevices: 184, overallCompliance: 98.9, monthlyTreatedTons: 485, cpcbAuditorSigned: true },
  { id: 'GRP-FORTIS', name: 'Fortis Healthcare Network', totalHospitals: 28, totalDevices: 112, overallCompliance: 98.2, monthlyTreatedTons: 310, cpcbAuditorSigned: true },
  { id: 'GRP-MANIPAL', name: 'Manipal Hospitals Division', totalHospitals: 24, totalDevices: 96, overallCompliance: 97.8, monthlyTreatedTons: 265, cpcbAuditorSigned: true },
  { id: 'GRP-GOVT-KA', name: 'Karnataka Govt District Medical Centres', totalHospitals: 35, totalDevices: 140, overallCompliance: 96.4, monthlyTreatedTons: 390, cpcbAuditorSigned: false }
];

// CPCB 5-Year Archival Data (Daily, Weekly, Monthly, Yearly Backups)
export const ARCHIVE_5YEAR_LOGS = {
  daily: [
    { date: '2026-08-10', totalCycles: 48, totalKg: 1420, passedPct: 100, flaggedCount: 0 },
    { date: '2026-08-09', totalCycles: 52, totalKg: 1580, passedPct: 98.1, flaggedCount: 1 },
    { date: '2026-08-08', totalCycles: 44, totalKg: 1310, passedPct: 100, flaggedCount: 0 },
    { date: '2026-08-07', totalCycles: 50, totalKg: 1490, passedPct: 98.0, flaggedCount: 1 },
    { date: '2026-08-06', totalCycles: 46, totalKg: 1390, passedPct: 97.8, flaggedCount: 1 }
  ],
  weekly: [
    { period: '2026-W32 (Aug 03 - Aug 09)', totalCycles: 342, totalKg: 10240, passedPct: 99.1, hashVerifiedPct: 100 },
    { period: '2026-W31 (Jul 27 - Aug 02)', totalCycles: 350, totalKg: 10510, passedPct: 98.8, hashVerifiedPct: 100 },
    { period: '2026-W30 (Jul 20 - Jul 26)', totalCycles: 338, totalKg: 10120, passedPct: 99.4, hashVerifiedPct: 100 },
    { period: '2026-W29 (Jul 13 - Jul 19)', totalCycles: 345, totalKg: 10380, passedPct: 98.5, hashVerifiedPct: 100 }
  ],
  monthly: [
    { period: '2026-07 (July)', totalCycles: 1480, totalKg: 44400, passedPct: 99.0, cpcbStatus: 'AUDITED & APPROVED' },
    { period: '2026-06 (June)', totalCycles: 1420, totalKg: 42600, passedPct: 98.7, cpcbStatus: 'AUDITED & APPROVED' },
    { period: '2026-05 (May)', totalCycles: 1510, totalKg: 45300, passedPct: 99.2, cpcbStatus: 'AUDITED & APPROVED' },
    { period: '2026-04 (April)', totalCycles: 1390, totalKg: 41700, passedPct: 98.4, cpcbStatus: 'AUDITED & APPROVED' }
  ],
  yearly: [
    { year: 2026, totalCycles: 10840, totalKg: 325200, passRate: 98.9, SHA256Status: '100% UNBROKEN CHAIN' },
    { year: 2025, totalCycles: 17200, totalKg: 516000, passRate: 98.6, SHA256Status: '100% UNBROKEN CHAIN' },
    { year: 2024, totalCycles: 16500, totalKg: 495000, passRate: 98.2, SHA256Status: '100% UNBROKEN CHAIN' },
    { year: 2023, totalCycles: 14200, totalKg: 426000, passRate: 97.9, SHA256Status: '100% UNBROKEN CHAIN' },
    { year: 2022, totalCycles: 11800, totalKg: 354000, passRate: 97.5, SHA256Status: '100% UNBROKEN CHAIN' }
  ]
};

// Website & Platform Maintenance Diagnostics Data (Software Admin Role)
export const SOFTWARE_SYSTEM_HEALTH = {
  webAppVersion: 'v2.8.4-production',
  uptimePct: 99.98,
  apiLatencyMs: 42,
  sseConnectionCount: 312,
  activeWebSessions: 84,
  pwaServiceWorker: 'ACTIVE (IndexedDB Sync Ready)',
  databaseStatus: 'HEALTHY (Supabase Managed Postgres)',
  systemTickets: [
    { id: 'TKT-1084', hospital: 'Apollo Super Speciality', category: 'Dashboard Customization', subject: 'Request for custom Department filter dropdown in Audit Log table', status: 'IN_PROGRESS', date: '2026-08-09' },
    { id: 'TKT-1082', hospital: 'Fortis Hospital BG Road', category: 'UI Guidance', subject: 'How to view weekly aggregated report for CPCB inspector visit', status: 'RESOLVED', date: '2026-08-07' },
    { id: 'TKT-1079', hospital: 'Manipal Hospital Jayanagar', category: 'PWA Offline Sync', subject: 'Inquiry regarding offline data recording in Basement 2 dead zone', status: 'RESOLVED', date: '2026-08-04' }
  ]
};

// KSPCB (Karnataka State Pollution Control Board) Statutory Compliance & Forms Dataset
export const KSPCB_STATUTORY_DATA = {
  facilityName: "Apollo Super Speciality Hospital, Bannerghatta Road",
  kspcbAuthorizationNo: "KSPCB/BMW/2024-25/BNG-S/00482",
  kspcbRegionalOffice: "Bangalore South Regional Office (Jayanagar)",
  authorizedBeds: 650,
  maxDailyPermissibleKg: 650,
  currentAuthorizationValidity: {
    issueDate: "2023-01-01",
    expiryDate: "2027-12-31",
    daysRemaining: 507,
    status: "ACTIVE_VALID"
  },
  cbwtfPartner: {
    name: "Maridi Eco Industries Pvt. Ltd.",
    cbwtfLicenseNo: "KSPCB/CBWTF/BNG/2022-88",
    facilityLocation: "Harohalli Industrial Area, Ramanagara Dist",
    vehicleNumber: "KA-05-AG-9941",
    driverName: "Ramesh Gowda (DRV-08)"
  },
  formsSummary: [
    { id: 'FORM-I', code: 'Form I', name: 'Accident Reporting Log', frequency: 'Within 24 hours of occurrence', status: 'COMPLIANT', totalFiledThisYear: 1, lastFiledDate: '2026-06-12' },
    { id: 'FORM-II', code: 'Form II', name: 'Application for Authorization / Renewal', frequency: 'Every 5 Years (Bedded)', status: 'VALID', lastFiledDate: '2022-11-20', nextRenewalDue: '2027-10-01' },
    { id: 'FORM-III', code: 'Form III', name: 'KSPCB Authorization Certificate Vault', frequency: 'Permanent Storage & Parsing', status: 'ACTIVE', certNo: 'KSPCB/BMW/2024-25/BNG-S/00482' },
    { id: 'FORM-IV', code: 'Form IV', name: 'KSPCB Annual Return Report', frequency: 'Annually before 30th June', status: 'SUBMITTED_KSPCB', submittedDate: '2026-06-18', ackNumber: 'KSPCB-XGN-2026-994812' },
    { id: 'FORM-V', code: 'Form V', name: 'Application for Appeal', frequency: 'As needed (Within 30 Days)', status: 'NO_ACTIVE_APPEALS', totalAppealsFiled: 0 },
    { id: 'FORM-VI', code: 'Form VI / Daily Manifest', name: 'Waste Transfer Pickup Manifest', frequency: 'Daily per Handover', status: 'LIVE_TRACKING', varianceFlaggedCount: 1 }
  ],
  form1Incidents: [
    {
      id: 'INC-2026-01',
      date: '2026-06-12',
      time: '14:20',
      location: 'Operation Theatre Complex - Hall 3 Corridor',
      categoryInvolved: 'Yellow Bag (Cytotoxic & Anatomical)',
      estimatedQuantityKg: 2.4,
      cause: 'Needle puncture on outer polythene wall during transfer from OT bin to trolley.',
      affectedStaff: 'Manjula K. (Sanitation Worker #SW-42)',
      injuries: 'Superficial skin puncture on thumb (First Aid given, PEP initiated)',
      correctiveAction: 'Shifted to puncture-proof biohazard containers; staff retrained on safe lifting SOP.',
      nodalOfficerReported: 'Dr. Srinivas N. (Infection Control Officer)',
      nodalReportTime: '2026-06-12 18:45 (4h 25m after incident - WITHIN 24H MANDATE)',
      kspcbFiledReceipt: 'KSPCB-INC-ACK-2026-041'
    }
  ],
  form4AnnualReturnSummary: {
    year: 2025,
    reportingPeriod: '01-Jan-2025 to 31-Dec-2025',
    kspcbSubmittedDate: '2026-06-18',
    xgnAckNo: 'KSPCB-XGN-2026-994812',
    totalYellowKg: 84200,
    totalRedKg: 62400,
    totalWhiteKg: 4800,
    totalBlueKg: 11200,
    totalCombinedKg: 162600,
    dailyAvgKg: 445.4,
    trainingSessionsCount: 24,
    staffTrainedCount: 420,
    hepBCoveragePct: 98.6,
    tetanusCoveragePct: 99.2,
    stackEmissionStatus: 'COMPLIANT (KSPCB Standard Met)',
    liquidEffluentStatus: 'ETP Treated (BOD < 30 mg/L, COD < 250 mg/L)'
  },
  dailyManifests: [
    {
      manifestNo: 'MNF-KSPCB-2026-0811',
      date: '2026-08-11',
      pickupTime: '08:45 AM',
      transporter: 'Maridi Eco Industries Pvt. Ltd.',
      vehicleNo: 'KA-05-AG-9941',
      driver: 'Ramesh Gowda',
      yellowKg: 142.5,
      redKg: 110.0,
      whiteKg: 8.2,
      blueKg: 18.5,
      totalHospitalKg: 279.2,
      cbwtfScannedKg: 280.1,
      variancePct: '+0.32%',
      varianceStatus: 'MATCHED_PASSED', // MATCHED_PASSED (<±5%), FLAGGED_BREACH (>±5%)
      barcodesScannedCount: 14,
      hospitalAgentSig: 'Vinay Kumar (BMW Incharge)',
      driverSig: 'Ramesh Gowda',
      kspcbBwmAppSynced: true
    },
    {
      manifestNo: 'MNF-KSPCB-2026-0810',
      date: '2026-08-10',
      pickupTime: '09:10 AM',
      transporter: 'Maridi Eco Industries Pvt. Ltd.',
      vehicleNo: 'KA-05-AG-9941',
      driver: 'Ramesh Gowda',
      yellowKg: 155.0,
      redKg: 122.0,
      whiteKg: 12.0,
      blueKg: 24.0,
      totalHospitalKg: 313.0,
      cbwtfScannedKg: 334.5,
      variancePct: '+6.87%',
      varianceStatus: 'FLAGGED_BREACH',
      flagReason: 'CBWTF scanned weight (334.5 kg) exceeds hospital registered weight (313.0 kg) by +6.87%, exceeding the legal ±5% threshold.',
      barcodesScannedCount: 18,
      hospitalAgentSig: 'Vinay Kumar (BMW Incharge)',
      driverSig: 'Ramesh Gowda',
      kspcbBwmAppSynced: true
    }
  ],
  preTreatmentLogs: [
    {
      id: 'PT-2026-0811-01',
      date: '2026-08-11',
      department: 'Microbiology & Clinical Pathology Lab',
      wasteType: 'Lab Cultures & Micro Stocks (Yellow-h)',
      method: 'Autoclaving (Pre-Disposal Sterilization)',
      tempCelsius: 121.5,
      pressurePsi: 15.2,
      exposureMinutes: 45,
      biologicalIndicatorTest: 'Geobacillus stearothermophilus spore strip',
      sporeStripResult: 'NEGATIVE (No growth after 48h incubation - STERILIZED)',
      operator: 'Dr. Kavitha Rao (Microbiologist)',
      status: 'VERIFIED_STERILE'
    },
    {
      id: 'PT-2026-0811-02',
      date: '2026-08-11',
      department: 'Blood Bank & Transfusion Unit',
      wasteType: 'Expired Blood Bags & Components',
      method: 'Sodium Hypochlorite Chemical Disinfection (2% Concentration)',
      soakDurationMinutes: 60,
      chlorineTitrationPpm: 20000,
      operator: 'Nataraj S.',
      status: 'VERIFIED_DISINFECTED'
    }
  ],
  staffImmunizationRoster: [
    { id: 'STF-01', name: 'Manjula K.', role: 'Sanitation Worker', dept: 'OT Complex', hepBDose1: '2024-01-10', hepBDose2: '2024-02-12', hepBDose3: '2024-07-15', tetanusBooster: '2026-02-10', status: 'FULLY_IMMUNIZED' },
    { id: 'STF-02', name: 'Ramesh Naidu', role: 'Waste Transport Agent', dept: 'Central Storage', hepBDose1: '2024-03-01', hepBDose2: '2024-04-05', hepBDose3: '2024-09-10', tetanusBooster: '2025-11-20', status: 'FULLY_IMMUNIZED' },
    { id: 'STF-03', name: 'Sunitha M.', role: 'Ward Nurse', dept: 'ICU Block B', hepBDose1: '2025-05-10', hepBDose2: '2025-06-12', hepBDose3: 'DUE NOW', tetanusBooster: '2026-01-15', status: 'DOSE3_PENDING' }
  ],
  kspcbUploadReceipts: [
    {
      id: 'RCP-2026-01',
      documentType: 'Form IV Annual Return (2025)',
      uploadedDate: '2026-06-18 16:30',
      uploadedBy: 'Dr. Srinivas N. (Compliance Officer)',
      receiptFileName: 'KSPCB_XGN_Form4_Ack_2026.pdf',
      ocrExtractedAckNo: 'KSPCB-XGN-2026-994812',
      ocrExtractedDate: '18/06/2026',
      ocrExtractedOffice: 'Bangalore South RO',
      ocrWatermarkMatch: true,
      verificationStatus: 'LEGALLY_VERIFIED_STAMPED'
    }
  ]
};


