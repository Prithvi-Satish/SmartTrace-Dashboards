import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  X,
  Cpu,
  Calendar,
  Wrench,
  ShieldCheck,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Download,
  FileText,
  MapPin,
  Clock,
  Zap,
  Gauge,
  Thermometer,
  Layers,
  Key,
  Radio,
  Lock
} from 'lucide-react';
import { CYCLE_PHASES, AUDIT_TRAIL_LOGS } from '../data/mockData';

export default function MachineDetailModal({ machine, onClose, isLight, isAuditorMode = false }) {
  const { hasPermission, currentUser } = useAuth();
  const canVerifyHashes = hasPermission('verify_hashes');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'phases', 'health', 'maintenance'
  const [utilizationRange, setUtilizationRange] = useState('7d');

  if (!machine) return null;

  const handleDownloadDoc = (docName) => {
    alert(`Downloading Official Certificate: ${docName}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <div className={`w-full max-w-4xl  border shadow-2xl overflow-hidden flex flex-col my-auto transition-colors ${
        isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#111723] border-slate-800 text-slate-100'
      }`}>
        
        {/* Modal Header */}
        <div className={`p-4 sm:p-5 border-b flex items-start justify-between gap-3 ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#090d16] border-slate-800'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-cyan-600 to-blue-600  text-white shadow-lg shadow-cyan-600/20">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 px-2 py-0.5  bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-300 dark:border-cyan-500/20">
                  {machine.id}
                </span>
                <span className={`text-xs font-bold px-2 py-0.5  ${
                  machine.status === 'Running' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300' :
                  machine.status === 'Alarm' ? 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300' :
                  'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}>
                  {machine.status}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black mt-0.5">{machine.name}</h3>
              <p className={`text-xs flex items-center gap-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                <span>{machine.location} ({machine.department})</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2  border transition-colors ${
              isLight ? 'hover:bg-slate-200 text-slate-500 border-slate-200' : 'hover:bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className={`px-4 pt-2 border-b flex space-x-2 overflow-x-auto text-xs font-bold ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#111723] border-slate-800'
        }`}>
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2.5 px-3 border-b-2 transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                : isLight ? 'border-transparent text-slate-500 hover:text-slate-800' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Machine Overview & Metadata</span>
          </button>

          <button
            onClick={() => setActiveTab('phases')}
            className={`py-2.5 px-3 border-b-2 transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'phases'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                : isLight ? 'border-transparent text-slate-500 hover:text-slate-800' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>20-Step Cycle Stepper</span>
          </button>

          <button
            onClick={() => setActiveTab('health')}
            className={`py-2.5 px-3 border-b-2 transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'health'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                : isLight ? 'border-transparent text-slate-500 hover:text-slate-800' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Gauge className="w-4 h-4" />
            <span>Component Health & Telemetry</span>
          </button>

          <button
            onClick={() => setActiveTab('maintenance')}
            className={`py-2.5 px-3 border-b-2 transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'maintenance'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                : isLight ? 'border-transparent text-slate-500 hover:text-slate-800' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Maintenance Logs (IQ/OQ/PQ)</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[65vh] overflow-y-auto">
          
          {/* Active Alarm or Maintenance Warning Banner */}
          {(machine.status === 'Alarm' || machine.status === 'Maintenance' || machine.alarmMessage) && (
            <div className={`p-4  border flex items-start space-x-3 shadow-sm ${
              machine.status === 'Alarm'
                ? 'bg-rose-50 border-rose-300 text-rose-900 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-200'
                : 'bg-amber-50 border-amber-300 text-amber-900 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-200'
            }`}>
              <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${
                machine.status === 'Alarm' ? 'text-rose-600 dark:text-rose-400 animate-bounce' : 'text-amber-600 dark:text-amber-400'
              }`} />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">
                  {machine.status === 'Alarm' ? '🚨 Active Safety Alarm Flagged' : '⚠️ Scheduled Maintenance & Calibration Warning'}
                </h4>
                <p className="text-xs font-bold mt-0.5">
                  Issue / Cause: {machine.alarmMessage || (machine.status === 'Alarm' ? 'Chamber Temperature Excursion Peak >62°C' : 'Annual Calibration Due')}
                </p>
                <p className="text-[11px] opacity-90 mt-1">
                  <strong>Basis for Flag:</strong> {
                    machine.status === 'Alarm'
                      ? 'The device sensor telemetry detected temperature crossing safety limits (64.2°C observed vs 60.0°C target). VHP cycle automatically paused for operator intervention.'
                      : 'CPCB Rule 4 requires annual re-calibration of pressure and temperature transducers every 12 months. This machine reached its calibration deadline on 2026-08-05.'
                  }
                </p>
              </div>
            </div>
          )}

          {/* TAB 1: OVERVIEW & METADATA */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Identity Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className={`p-3.5  border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#090d16] border-slate-800'}`}>
                  <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">Serial Number</span>
                  <span className="text-xs font-mono font-bold">{machine.serialNumber}</span>
                </div>

                <div className={`p-3.5  border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#090d16] border-slate-800'}`}>
                  <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">Procurement Date</span>
                  <span className="text-xs font-bold">{machine.procurementDate}</span>
                </div>

                <div className={`p-3.5  border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#090d16] border-slate-800'}`}>
                  <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">Installation Date</span>
                  <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">{machine.installationDate}</span>
                </div>

                <div className={`p-3.5  border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#090d16] border-slate-800'}`}>
                  <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">Firmware Version</span>
                  <span className="text-xs font-mono font-bold">{machine.firmwareVersion}</span>
                </div>

                <div className={`p-3.5  border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#090d16] border-slate-800'}`}>
                  <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">Calibration Status</span>
                  <span className={`text-xs font-bold ${
                    machine.calibrationStatus.includes('VALID') ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  }`}>
                    {machine.calibrationStatus}
                  </span>
                </div>

                <div className={`p-3.5  border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#090d16] border-slate-800'}`}>
                  <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">GPS Coordinates</span>
                  <span className="text-xs font-mono">{machine.gpsCoordinates}</span>
                </div>
              </div>

              {/* Machine Utilization Card */}
              {machine.utilizationByRange ? (() => {
                const rangeOptions = [
                  { value: '24h',  label: 'Last 24 Hours' },
                  { value: '7d',   label: 'Last 7 Days' },
                  { value: '1m',   label: 'Last Month' },
                  { value: '3m',   label: 'Last 3 Months' },
                  { value: '6m',   label: 'Last 6 Months' },
                  { value: '1y',   label: 'Last 1 Year' },
                  { value: 'all',  label: 'Since Installation' },
                ];
                const rd = machine.utilizationByRange[utilizationRange];
                const maxVal = Math.max(...rd.data.map(d => d.hoursActive), 1);
                const totalCycles = rd.data.reduce((s, d) => s + d.cyclesRun, 0);

                return (
                  <div className={`p-4  border shadow-sm ${
                    isLight ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200' : 'bg-gradient-to-r from-emerald-950/20 to-slate-900 border-emerald-800/40'
                  }`}>

                    {/* Card Header with Dropdown */}
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                      <div className="flex items-center space-x-2">
                        <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        <h4 className="text-xs font-bold">Machine Utilization</h4>
                      </div>
                      <select
                        id="utilization-range-select"
                        value={utilizationRange}
                        onChange={(e) => setUtilizationRange(e.target.value)}
                        className={`text-[11px] font-bold px-2.5 py-1  border cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                          isLight
                            ? 'bg-white border-emerald-300 text-emerald-800 hover:border-emerald-500'
                            : 'bg-[#090d16] border-emerald-700 text-emerald-300 hover:border-emerald-500'
                        }`}
                      >
                        {rangeOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Key Stats Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                      <div className={`p-2.5  border text-center ${
                        isLight ? 'bg-white border-emerald-200' : 'bg-[#090d16] border-slate-800'
                      }`}>
                        <span className="text-[10px] text-slate-500 block">Total Operating Hours</span>
                        <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">{machine.totalOperatingHours?.toLocaleString()}h</span>
                        <span className="text-[9px] text-slate-400">Since Installation</span>
                      </div>
                      <div className={`p-2.5  border text-center ${
                        isLight ? 'bg-white border-emerald-200' : 'bg-[#090d16] border-slate-800'
                      }`}>
                        <span className="text-[10px] text-slate-500 block">Active Hours</span>
                        <span className="text-sm font-black text-cyan-600 dark:text-cyan-400">{rd.activeHours.toLocaleString()}h</span>
                        <span className="text-[9px] text-slate-400">{rd.periodLabel}</span>
                      </div>
                      <div className={`p-2.5  border text-center ${
                        isLight ? 'bg-white border-emerald-200' : 'bg-[#090d16] border-slate-800'
                      }`}>
                        <span className="text-[10px] text-slate-500 block">Uptime Rate</span>
                        <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">{rd.uptimePct}%</span>
                        <span className="text-[9px] text-slate-400">{rd.label}</span>
                      </div>
                      <div className={`p-2.5  border text-center ${
                        isLight ? 'bg-white border-emerald-200' : 'bg-[#090d16] border-slate-800'
                      }`}>
                        <span className="text-[10px] text-slate-500 block">Cycles Completed</span>
                        <span className="text-sm font-black text-purple-600 dark:text-purple-400">{totalCycles.toLocaleString()}</span>
                        <span className="text-[9px] text-slate-400">@ {rd.uptimePct}% Uptime</span>
                      </div>
                    </div>

                    {/* Bar Chart — 3 separate rows to prevent text/bar overlap */}
                    <div>
                      <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mb-2">
                        Active Hours &amp; Cycles — {rd.chartSubLabel}
                      </span>

                      {/* Row 1: Value labels (aligned to bottom of row) */}
                      <div className="flex gap-1 mb-1">
                        {rd.data.map((d) => (
                          <div key={d.label} className="flex-1 min-w-0 text-center">
                            <span className="text-[9px] text-slate-500 font-mono truncate block leading-tight">
                              {d.hoursActive}h
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Row 2: Bars only — fixed height, items-end so bars grow upward */}
                      <div className="flex items-end gap-1" style={{ height: '56px' }}>
                        {rd.data.map((d) => (
                          <div
                            key={d.label}
                            className="flex-1 min-w-0 -t-sm bg-emerald-500/70 dark:bg-emerald-500/60 hover:bg-emerald-500 transition-all cursor-pointer"
                            style={{ height: `${(d.hoursActive / maxVal) * 56}px` }}
                            title={`${d.label}: ${d.hoursActive}h active, ${d.cyclesRun} cycles`}
                          />
                        ))}
                      </div>

                      {/* Row 3: Day labels + Cycle counts */}
                      <div className="flex gap-1 mt-1.5">
                        {rd.data.map((d) => (
                          <div key={d.label} className="flex-1 min-w-0 text-center">
                            <span className="text-[9px] text-slate-500 truncate block leading-tight">{d.label}</span>
                            <span className="text-[9px] font-bold text-purple-600 dark:text-purple-400 block leading-tight">{d.cyclesRun}c</span>
                          </div>
                        ))}
                      </div>

                      {/* Legend */}
                      <div className="flex items-center gap-3 mt-2.5">
                        <span className="flex items-center gap-1 text-[9px] text-slate-500">
                          <span className="inline-block w-2.5 h-2.5  bg-emerald-500/70"></span> Active Hours
                        </span>
                        <span className="flex items-center gap-1 text-[9px] text-slate-500">
                          <span className="inline-block w-2.5 h-2.5  bg-purple-500/80"></span> Cycles (c)
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })() : null}
              {(!isAuditorMode && !machine.utilizationByRange) && (
                <div className={`p-8 text-center border shadow-sm text-xs ${isLight ? 'bg-slate-50 border-slate-200 text-slate-500' : 'bg-[#090d16] border-slate-800 text-slate-400'}`}>
                  No utilization history available for this device yet.
                </div>
              )}

              {/* IoT Connectivity & Security Card */}
              <div className={`p-4  border shadow-sm ${
                isLight ? 'bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200' : 'bg-gradient-to-r from-cyan-950/20 to-slate-900 border-cyan-800/40'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Radio className="w-5 h-5 text-cyan-600 dark:text-cyan-400 animate-pulse" />
                    <h4 className="text-xs font-bold">IoT Connectivity & End-to-End Cryptography</h4>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5  bg-cyan-600 text-white shadow-sm">
                    {machine.connectivityMode}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Signal Strength</span>
                    <span className="font-semibold">{machine.signalStrength}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Hardware Key ID (ECDSA)</span>
                    <span className={`font-mono text-[11px] font-bold ${
                      canVerifyHashes ? 'text-purple-600 dark:text-purple-400' : 'text-slate-400 dark:text-slate-500'
                    }`}>
                      {canVerifyHashes ? machine.hardwareKeyId : 'ATECC608A-••••-RESTRICTED'}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-cyan-200 dark:border-cyan-900/60 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono truncate">
                    {canVerifyHashes ? `SHA-256 Hash: ${machine.latestHashSignature}` : 'SHA-256 Hash: 🔒 Auditor Verification Required'}
                  </span>
                  {canVerifyHashes ? (
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Hardware Signed</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1 shrink-0">
                      <Lock className="w-3 h-3 text-amber-500" />
                      <span>Staff View</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 20-STEP CYCLE STEPPER */}
          {!isAuditorMode && activeTab === 'phases' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h4 className="text-xs font-bold">Active Cycle 20-Step PRD Workflow</h4>
                  <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Current Phase: <strong className="text-cyan-600 dark:text-cyan-400">{machine.phase}</strong> ({machine.progressPct}% Complete)
                  </p>
                </div>
                {machine.status === 'Connection Lost' ? (
                  <span className="text-xs font-bold px-2.5 py-1 bg-amber-500 text-white animate-pulse">
                    Connection lost : reconnecting
                  </span>
                ) : (
                  <span className="text-xs font-bold px-2.5 py-1 bg-cyan-600 text-white">
                    Rem: {machine.cycleTimeRemaining}
                  </span>
                )}
              </div>

              {machine.status === 'Offline' ? (
                <div className={`p-10 border border-dashed flex flex-col items-center justify-center text-center ${isLight ? 'border-slate-300 text-slate-500' : 'border-slate-700 text-slate-400'}`}>
                  <Radio className="w-8 h-8 mb-3 opacity-50" />
                  <span className="text-sm font-bold block mb-1">Device Offline</span>
                  <span className="text-xs">Real-time telemetry unavailable. Last synced: {machine.lastPacketReceived || 'Unknown'}</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                {CYCLE_PHASES.map((phaseName, index) => {
                  const stepNum = index + 1;
                  const isCurrent = stepNum === machine.currentPhaseStep;
                  const isPredicted = machine.status === 'Connection Lost' && stepNum === machine.predictedPhaseStep;
                  const isCompleted = stepNum < (machine.predictedPhaseStep || machine.currentPhaseStep);

                  return (
                    <div
                      key={phaseName}
                      className={`p-2.5  border text-xs flex flex-col justify-center space-y-1 transition-all ${
                        isCurrent && machine.status !== 'Connection Lost'
                          ? 'bg-cyan-600 text-white border-cyan-500 font-bold shadow-md shadow-cyan-600/30 ring-2 ring-cyan-400/40'
                          : isPredicted
                          ? isLight ? 'bg-emerald-100 text-emerald-900 border-emerald-400 font-bold' : 'bg-emerald-900/40 text-emerald-300 border-emerald-500/50 font-bold'
                          : isCompleted
                          ? isLight ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-emerald-950/30 text-emerald-300 border-emerald-800/50'
                          : isLight ? 'bg-slate-50 text-slate-400 border-slate-200' : 'bg-[#090d16] text-slate-600 border-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <div className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold shrink-0 ${
                          (isCurrent && machine.status !== 'Connection Lost') ? 'bg-white text-cyan-700' :
                          isPredicted ? 'bg-emerald-600 text-white' :
                          isCompleted ? 'bg-emerald-500 text-white' :
                          'bg-slate-300 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}>
                          {isCompleted ? '✓' : stepNum}
                        </div>
                        <span className="truncate">{phaseName.split('. ')[1]}</span>
                      </div>
                      {isPredicted && (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                          Expected completed phase
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              )}
            </div>
          )}

          {/* TAB: MACHINE LOGS (Auditor Mode) */}
          {activeTab === 'logs' && isAuditorMode && (
            <div className="space-y-4">
              <div className={`p-4 border shadow-sm ${isLight ? 'bg-white border-slate-200' : 'bg-[#111723] border-slate-800'}`}>
                <h4 className="text-sm font-bold flex items-center space-x-2 mb-1">
                  <FileText className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>Cycle Immutable Audit Log</span>
                </h4>
                <p className="text-[11px] text-slate-500 mb-4">Historical record of all sterilization cycles completed by {machine.serialNumber}</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b bg-slate-50 dark:bg-[#090d16] text-slate-600 dark:text-slate-400 font-bold">
                        <th className="py-2.5 px-3">Date / Time</th>
                        <th className="py-2.5 px-3">Cycle ID</th>
                        <th className="py-2.5 px-3">Operator</th>
                        <th className="py-2.5 px-3">Parameters</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3">Hash Signature</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {(() => {
                        const machineLogs = AUDIT_TRAIL_LOGS.filter(l => l.machineId === machine.id);
                        if (machineLogs.length === 0) {
                          return (
                            <tr>
                              <td colSpan="6" className="py-8 text-center text-slate-500 font-bold">No historical cycles logged.</td>
                            </tr>
                          );
                        }
                        return machineLogs.map((log) => (
                          <tr key={log.cycleId} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="py-3 px-3 font-mono text-slate-800 dark:text-slate-200">{log.startTime}</td>
                            <td className="py-3 px-3 font-mono font-bold text-cyan-700 dark:text-cyan-400">{log.cycleId}</td>
                            <td className="py-3 px-3">{log.operator}</td>
                            <td className="py-3 px-3">
                              <div className="text-[10px] text-slate-500 flex flex-col gap-0.5">
                                <span>Bag: {log.bagCategory}</span>
                                <span>Dur: {log.duration}</span>
                              </div>
                            </td>
                            <td className="py-3 px-3">
                              {log.cpcbStatus === 'PASSED' ? (
                                <span className="flex items-center space-x-1 text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 w-max">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Passed</span>
                                </span>
                              ) : (
                                <span className="flex items-center space-x-1 text-rose-600 font-bold bg-rose-50 dark:bg-rose-900/30 px-2 py-0.5 w-max">
                                  <AlertTriangle className="w-3.5 h-3.5" />
                                  <span>Failed</span>
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-3">
                              <span className="font-mono text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-slate-500 rounded truncate block max-w-[120px]" title={log.hashChain}>
                                {log.hashChain}
                              </span>
                            </td>
                          </tr>
                        ));
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COMPONENT HEALTH */}
          {!isAuditorMode && activeTab === 'health' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="text-xs font-bold">Real-Time Component Health & Predictive Maintenance</h4>
                {machine.status === 'Offline' && (
                  <span className="text-[10px] bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400 px-2 py-0.5">
                    Last Known State
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {/* Vacuum Pump */}
                <div className={`p-4  border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#090d16] border-slate-800'}`}>
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="font-bold">Vacuum Pump Health</span>
                    <span className="font-bold text-cyan-600 dark:text-cyan-400">{machine.pumpHealth}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2  overflow-hidden">
                    <div className="bg-cyan-500 h-full" style={{ width: `${machine.pumpHealth}%` }} />
                  </div>
                </div>

                {/* Blower Fan */}
                <div className={`p-4  border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#090d16] border-slate-800'}`}>
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="font-bold">Blower Fan Health</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{machine.fanHealth}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2  overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: `${machine.fanHealth}%` }} />
                  </div>
                </div>

                {/* Evaporator Motor */}
                <div className={`p-4  border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#090d16] border-slate-800'}`}>
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="font-bold">Evaporator Motor Health</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">{machine.motorHealth}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2  overflow-hidden">
                    <div className="bg-purple-500 h-full" style={{ width: `${machine.motorHealth}%` }} />
                  </div>
                </div>

                {/* Filter Life */}
                <div className={`p-4  border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#090d16] border-slate-800'}`}>
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="font-bold">HEPA Filter Remaining</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">{machine.filterLife}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2  overflow-hidden">
                    <div className="bg-amber-500 h-full" style={{ width: `${machine.filterLife}%` }} />
                  </div>
                </div>

                {/* Catalyst Life */}
                <div className={`p-4  border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#090d16] border-slate-800'}`}>
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="font-bold">Catalyst Remaining</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{machine.catalystLife}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2  overflow-hidden">
                    <div className="bg-indigo-500 h-full" style={{ width: `${machine.catalystLife}%` }} />
                  </div>
                </div>

                {/* Door Cycles */}
                <div className={`p-4  border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#090d16] border-slate-800'}`}>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-bold">Total Door Actuations</span>
                    <span className="font-mono font-bold text-xs">{machine.doorCycles} cycles</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Service Threshold: 10,000</span>
                </div>
              </div>

              {!isAuditorMode && (
                <>
                  <div className={`p-4 border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#090d16] border-slate-800'}`}>
                    <h4 className="text-xs font-bold flex items-center space-x-2 mb-4">
                      <Thermometer className="w-4 h-4 text-rose-500" />
                      <span>Live Chamber Diagnostics</span>
                    </h4>
                    {/* Environment Rings Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex flex-col items-center">
                        <div className="relative w-16 h-16 rounded-full border-4 border-slate-200 dark:border-slate-800 flex items-center justify-center mb-2 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-rose-500/20 to-transparent"></div>
                          <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{machine.temperature || '--'}°C</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Chamber Temp</span>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="relative w-16 h-16 rounded-full border-4 border-slate-200 dark:border-slate-800 flex items-center justify-center mb-2 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent"></div>
                          <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{machine.pressure || '--'} bar</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Pressure</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="relative w-16 h-16 rounded-full border-4 border-slate-200 dark:border-slate-800 flex items-center justify-center mb-2 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent"></div>
                          <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{machine.h2o2 || '--'} ppm</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">H2O2 Injection</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="relative w-16 h-16 rounded-full border-4 border-slate-200 dark:border-slate-800 flex items-center justify-center mb-2 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-teal-500/20 to-transparent"></div>
                          <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{machine.residualH2o2 || '--'} ppm</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Residual Vent</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* TAB 4: MAINTENANCE LOGS */}
          {activeTab === 'maintenance' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold">Downloadable IQ/OQ/PQ & Maintenance Certificates</h4>
                <button
                  onClick={() => handleDownloadDoc(`Complete_Maintenance_History_${machine.id}.pdf`)}
                  className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white  text-xs font-bold flex items-center space-x-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download All Records (PDF)</span>
                </button>
              </div>

              <div className="space-y-2">
                {machine.maintenanceRecords && machine.maintenanceRecords.length > 0 ? (
                  machine.maintenanceRecords.map((record) => (
                    <div
                      key={record.id}
                      className={`p-3  border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs ${
                        isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#090d16] border-slate-800'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold">{record.type}</span>
                            <span className="text-[10px] font-mono text-slate-500">({record.id})</span>
                          </div>
                          <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                            Performed on {record.date} by {record.engineer}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <span className="text-[10px] font-bold px-2 py-0.5  bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300">
                          {record.status}
                        </span>
                        <button
                          onClick={() => handleDownloadDoc(record.docName)}
                          className={`p-1.5  border transition-colors ${
                            isLight ? 'hover:bg-slate-200 text-slate-700 border-slate-300' : 'hover:bg-slate-800 text-slate-300 border-slate-700'
                          }`}
                          title="Download Certificate PDF"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={`p-8 text-center border shadow-sm text-xs ${isLight ? 'bg-slate-50 border-slate-200 text-slate-500' : 'bg-[#090d16] border-slate-800 text-slate-400'}`}>
                    No maintenance records available for this device yet.
                  </div>
                )}
              </div>

              {/* Downtime Section */}
              {machine.downtimeRecords && machine.downtimeRecords.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <h4 className="text-xs font-bold">Downtime Log</h4>
                    <span className={`text-[10px] font-semibold px-2 py-0.5  ${
                      isLight ? 'bg-amber-100 text-amber-700' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {machine.downtimeRecords.length} Events Recorded
                    </span>
                  </div>

                  {/* Summary Strip */}
                  <div className={`p-3  border flex flex-wrap gap-4 text-xs ${
                    isLight ? 'bg-amber-50 border-amber-200' : 'bg-amber-950/20 border-amber-800/40'
                  }`}>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Planned Downtime</span>
                      <span className="font-bold text-amber-600 dark:text-amber-400">
                        {machine.downtimeRecords.filter(d => d.type === 'Planned').length} events
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Unplanned Downtime</span>
                      <span className="font-bold text-rose-600 dark:text-rose-400">
                        {machine.downtimeRecords.filter(d => d.type === 'Unplanned').length} events
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Longest Outage</span>
                      <span className="font-bold">
                        {machine.downtimeRecords.reduce((max, d) => {
                          const hrs = parseFloat(d.duration);
                          return hrs > parseFloat(max) ? d.duration : max;
                        }, '0h')}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {machine.downtimeRecords.map((record) => (
                      <div
                        key={record.id}
                        className={`p-3  border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs ${
                          isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#090d16] border-slate-800'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2  shrink-0 ${
                            record.type === 'Unplanned'
                              ? 'bg-rose-500/10 text-rose-500 dark:text-rose-400'
                              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          }`}>
                            <Clock className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                              <span className="font-bold">{record.reason}</span>
                              <span className="text-[10px] font-mono text-slate-500">({record.id})</span>
                            </div>
                            <p className={`text-[11px] mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                              Started: {record.startTime} &nbsp;•&nbsp; Resolved by: {record.resolvedBy}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 shrink-0">
                          <span className="text-xs font-black font-mono">{record.duration}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5  ${
                            record.type === 'Unplanned'
                              ? 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300'
                          }`}>
                            {record.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className={`p-4 border-t flex items-center justify-between ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#090d16] border-slate-800'
        }`}>
          <div className="flex items-center space-x-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Digital Twin Synced • Verified via SmartTrace™ Cloud</span>
          </div>

          <button
            onClick={onClose}
            className={`px-4 py-2  text-xs font-bold border ${
              isLight ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800' : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
            }`}
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
}
