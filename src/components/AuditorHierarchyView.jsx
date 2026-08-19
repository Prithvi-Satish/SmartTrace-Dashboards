import React, { useState, useEffect } from 'react';
import { UMBRELLA_GROUPS, REGIONAL_HOSPITALS, ARCHIVE_5YEAR_LOGS, AUDIT_TRAIL_LOGS, INITIAL_MACHINES } from '../data/mockData';
import { Globe, Building2, Layers, Calendar, FileText, Download, ShieldCheck, ChevronRight, ArrowLeft, Eye, Award, CheckCircle2, Lock, Home, Network, ShieldAlert, Cpu } from 'lucide-react';
import { generateAuditCertificatePDF } from '../utils/pdfGenerator';
import MachineDetailModal from './MachineDetailModal';

export default function AuditorHierarchyView({ isLight }) {
  // Navigation Levels: 'global' -> 'umbrella' -> 'hospital'
  const [level, setLevel] = useState('global');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedAuditorMachine, setSelectedAuditorMachine] = useState(null);
  const [timePeriod, setTimePeriod] = useState('monthly'); // 'daily', 'weekly', 'monthly', 'yearly', 'machine'

  // Sync browser back/forward history buttons (popstate)
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.level) {
        setLevel(event.state.level);
        setSelectedGroup(event.state.group || null);
        setSelectedHospital(event.state.hospital || null);
      } else {
        setLevel('global');
        setSelectedGroup(null);
        setSelectedHospital(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
    setLevel('umbrella');
    window.history.pushState({ level: 'umbrella', group }, '', `#umbrella-${group.id}`);
  };

  const handleSelectHospital = (hosp) => {
    setSelectedHospital(hosp);
    setLevel('hospital');
    window.history.pushState({ level: 'hospital', group: selectedGroup, hospital: hosp }, '', `#hospital-${hosp.id}`);
  };

  const goToGlobal = () => {
    setLevel('global');
    setSelectedGroup(null);
    setSelectedHospital(null);
    window.history.pushState({ level: 'global' }, '', '#global-audit');
  };

  const goToUmbrella = () => {
    setLevel('umbrella');
    setSelectedHospital(null);
    window.history.pushState({ level: 'umbrella', group: selectedGroup }, '', `#umbrella-${selectedGroup?.id || ''}`);
  };

  const handleExport5YearArchive = () => {
    alert(`📦 5-Year Data Archival Export Triggered!\n\nExtracting complete multi-year telemetry database records (2022-2026) for ${selectedHospital ? selectedHospital.name : 'All Facilities'}.\n\nFormat: Encrypted Structured JSON & Cryptographic SHA-256 Hash Chain Proof.`);
  };

  return (
    <div className="space-y-5">
      {/* Header & Global Breadcrumbs */}
      <div className="sticky top-0 z-10 -mx-3 px-3 py-3 sm:-mx-6 sm:px-6 bg-slate-100/90 dark:bg-[#070a10]/90 backdrop-blur-md mb-2">
        <div className={`p-4 border mb-5 flex flex-col md:flex-row md:items-center gap-3 ${
          isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
        }`}>
          {/* Quick Jump & Level Back Buttons */}
          {level !== 'global' && (
            <div className="flex items-center space-x-2 shrink-0 md:mr-2">
              <button
                onClick={() => {
                  if (level === 'hospital') goToUmbrella();
                  else if (level === 'umbrella') goToGlobal();
                }}
                className={`p-2 border transition-colors ${
                  isLight ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                }`}
                title="Back One Level"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              
              <button
                onClick={goToGlobal}
                className="p-2 border border-teal-300 dark:border-teal-800/80 bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 hover:bg-teal-100 transition-all"
                title="Jump to Global National Level"
              >
                <Home className="w-4 h-4" />
              </button>
            </div>
          )}

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-[10px] font-extrabold px-3 py-0.5  bg-emerald-600 text-white uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                CPCB Official Medical Board Auditor Portal
              </span>
              <span className="text-[10px] font-bold px-2.5 py-0.5  bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 font-mono">
                Browser Back/Forward Enabled
              </span>
            </div>

            <h2 className="text-lg font-bold flex items-center space-x-2">
              <Network className="w-5 h-5 text-teal-600" />
              <span>Hierarchical Audit Explorer</span>
            </h2>
            <div className="text-xs text-slate-500 mt-1 flex items-center space-x-1.5 font-mono">
              <span className={level === 'global' ? 'text-teal-600 font-bold' : ''}>Global Data Trust</span>
              
              {selectedGroup && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  <span className={level === 'umbrella' ? 'text-teal-600 font-bold' : ''}>{selectedGroup.name}</span>
                </>
              )}
              
              {selectedHospital && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-teal-600 font-bold">{selectedHospital.name}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* LEVEL 1: GLOBAL / NATIONAL OVERVIEW */}
      {level === 'global' && (
        <div className="space-y-5">
          {/* National Aggregate Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`p-4 border ${
              isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
            }`}>
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>National Umbrella Chains</span>
                <Building2 className="w-4 h-4 text-teal-600" />
              </div>
              <div className="mt-2">
                <span className="text-3xl font-black">{UMBRELLA_GROUPS.length} Groups</span>
                <p className="text-xs text-slate-500 mt-1">129 Healthcare Facilities</p>
              </div>
            </div>

            <div className={`p-4 border ${
              isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
            }`}>
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Active ABIOT Devices</span>
                <Layers className="w-4 h-4 text-cyan-600" />
              </div>
              <div className="mt-2">
                <span className="text-3xl font-black text-cyan-700 dark:text-cyan-400">532 Units</span>
                <p className="text-xs text-slate-500 mt-1">Cellular eSIM Mesh Online</p>
              </div>
            </div>

            <div className={`p-4 border ${
              isLight ? 'bg-emerald-50/70 border-emerald-200/90 text-slate-900' : 'bg-emerald-950/20 border-emerald-800/60 text-slate-100'
            }`}>
              <div className="flex items-center justify-between text-xs text-slate-600 font-semibold">
                <span>National Compliance Score</span>
                <Award className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="mt-2">
                <span className="text-3xl font-black text-emerald-700 dark:text-emerald-400">98.6%</span>
                <p className="text-xs text-emerald-800 dark:text-emerald-300 font-bold mt-1">CPCB Verified Grade A</p>
              </div>
            </div>

            <div className={`p-4 border ${
              isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
            }`}>
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Monthly Waste Treated</span>
                <FileText className="w-4 h-4 text-amber-600" />
              </div>
              <div className="mt-2">
                <span className="text-3xl font-black">1,450 Tons</span>
                <p className="text-xs text-slate-500 mt-1">100% SHA-256 Hash Signed</p>
              </div>
            </div>
          </div>

          {/* Level 1 Group List */}
          <div className="space-y-3">
            <h3 className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Select Umbrella Vendor / Hospital Network to Inspect Regional Data
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {UMBRELLA_GROUPS.map((grp) => (
                <div
                  key={grp.id}
                  onClick={() => handleSelectGroup(grp)}
                  className={`p-5 border cursor-pointer transition-all hover:${
                    isLight ? 'bg-white border-slate-200/80 hover:border-teal-400' : 'bg-[#111622] border-slate-800 hover:border-teal-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-2 py-0.5  border border-teal-200 dark:border-teal-800">
                        {grp.id}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1.5">{grp.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Network Chain • CPCB Registered</p>
                    </div>

                    <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{grp.overallCompliance}%</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 my-4 p-3 bg-slate-50 dark:bg-[#090d16] border border-slate-200/60 dark:border-slate-800 text-center text-xs">
                    <div>
                      <span className="text-slate-500 text-[10px] block">Hospitals</span>
                      <strong className="text-slate-800 dark:text-slate-200 font-bold">{grp.totalHospitals} Units</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">ABIOT Devices</span>
                      <strong className="text-slate-800 dark:text-slate-200 font-bold">{grp.totalDevices} Devices</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Monthly Waste</span>
                      <strong className="text-slate-800 dark:text-slate-200 font-bold">{grp.monthlyTreatedTons} Tons</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {grp.cpcbAuditorSigned ? 'CPCB Audit Signoff Complete' : 'Pending Quarterly Verification'}
                    </span>
                    <button className="text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1">
                      <span>Drill into Network</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* LEVEL 2: UMBRELLA VENDOR / REGIONAL GROUP VIEW */}
      {level === 'umbrella' && selectedGroup && (
        <div className="space-y-4">
          <div className={`p-4 border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#090d16] border-slate-800'}`}>
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Building2 className="w-4 h-4 text-teal-600" />
              <span>Hospitals Operating Under {selectedGroup.name}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Select an individual healthcare facility to audit device log aggregations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {REGIONAL_HOSPITALS.filter(h => h.groupId === selectedGroup.id).map((hosp) => (
              <div
                key={hosp.id}
                onClick={() => handleSelectHospital(hosp)}
                className={`p-4 border cursor-pointer transition-all hover:border-teal-500 ${
                  isLight ? 'bg-white border-slate-200/80' : 'bg-[#111622] border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{hosp.name}</h4>
                    <p className="text-xs text-slate-500">{hosp.locality}</p>
                  </div>
                  <span className="text-lg font-black text-emerald-600">{hosp.complianceScore}%</span>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">{hosp.deviceCount} Sterilization Devices</span>
                  <span className="text-teal-600 font-bold flex items-center gap-1">
                    <span>Inspect Hospital Logs</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LEVEL 3: HOSPITAL VIEW & 5-YEAR TIME HORIZONS (DAILY, WEEKLY, MONTHLY, YEARLY) */}
      {level === 'hospital' && selectedHospital && (
        <div className="space-y-5">
          {/* Hospital Header & 5-Year Backup Export Button */}
          <div className={`p-5 border ${
            isLight ? 'bg-white border-slate-200/80' : 'bg-[#111622] border-slate-800'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-2 py-0.5  border border-teal-200">
                  {selectedHospital.id}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">{selectedHospital.name}</h3>
                <p className="text-xs text-slate-500">CPCB License: {selectedHospital.cpcbLicenseNo} • {selectedHospital.locality}</p>
              </div>

              {/* 5-Year Data Archival Export Button */}
              <button
                onClick={handleExport5YearArchive}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 flex items-center space-x-2 transition-all self-start md:self-center shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Export 5-Year Archival Backup Data</span>
              </button>
            </div>
          </div>

          {/* Timeframe Filter Selector Tabs */}
          <div className={`p-1.5 border flex items-center gap-1.5 text-xs font-bold ${
            isLight ? 'bg-white border-slate-200/80' : 'bg-[#111622] border-slate-800'
          }`}>
            <button
              onClick={() => setTimePeriod('machine')}
              className={`flex-1 py-2 transition-all ${
                timePeriod === 'machine' ? 'bg-teal-600 text-white ' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400'
              }`}
            >
              ⚙️ Machine Cycle Logs
            </button>

            <button
              onClick={() => setTimePeriod('daily')}
              className={`flex-1 py-2 transition-all ${
                timePeriod === 'daily' ? 'bg-teal-600 text-white ' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400'
              }`}
            >
              📅 Daily Logs
            </button>

            <button
              onClick={() => setTimePeriod('weekly')}
              className={`flex-1 py-2 transition-all ${
                timePeriod === 'weekly' ? 'bg-teal-600 text-white ' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400'
              }`}
            >
              📅 Weekly Logs
            </button>

            <button
              onClick={() => setTimePeriod('monthly')}
              className={`flex-1 py-2 transition-all ${
                timePeriod === 'monthly' ? 'bg-teal-600 text-white ' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400'
              }`}
            >
              📅 Monthly Logs
            </button>

            <button
              onClick={() => setTimePeriod('yearly')}
              className={`flex-1 py-2 transition-all ${
                timePeriod === 'yearly' ? 'bg-teal-600 text-white ' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400'
              }`}
            >
              📅 5-Year Archival Backups (2022-2026)
            </button>
          </div>

          {/* Time Horizon Data Display */}
          <div className={`p-5 border ${
            isLight ? 'bg-white border-slate-200/80' : 'bg-[#111622] border-slate-800'
          }`}>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              {timePeriod.toUpperCase()} CPCB AUDIT LOG AGGREGATION & HASH INTEGRITY
            </h4>

            {timePeriod === 'daily' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b bg-slate-50 dark:bg-[#090d16] text-slate-600 dark:text-slate-400 font-bold">
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Sterilization Cycles</th>
                      <th className="py-2.5 px-3">Total Waste Treated</th>
                      <th className="py-2.5 px-3">CPCB Pass Rate</th>
                      <th className="py-2.5 px-3">Flagged Breaches</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {ARCHIVE_5YEAR_LOGS.daily.map((row) => (
                      <tr key={row.date}>
                        <td className="py-3 px-3 font-mono font-bold text-slate-800 dark:text-slate-200">{row.date}</td>
                        <td className="py-3 px-3">{row.totalCycles} Cycles</td>
                        <td className="py-3 px-3 font-bold">{row.totalKg} kg</td>
                        <td className="py-3 px-3 text-emerald-600 font-bold">{row.passedPct}%</td>
                        <td className="py-3 px-3">{row.flaggedCount > 0 ? <span className="text-rose-600 font-bold">{row.flaggedCount} Flagged</span> : <span className="text-slate-400">0</span>}</td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => generateAuditCertificatePDF(AUDIT_TRAIL_LOGS[0], selectedHospital.name)}
                            className="p-1.5 bg-teal-50 border border-teal-200 text-teal-700  hover:bg-teal-100 text-xs font-bold inline-flex items-center gap-1"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>PDF</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {timePeriod === 'machine' && (() => {
              const hospitalMachines = INITIAL_MACHINES.filter(m => m.hospitalId === selectedHospital.id);
              return (
                <div className="space-y-4">
                  <div className={`p-4 border shadow-sm ${isLight ? 'bg-white border-slate-200' : 'bg-[#111723] border-slate-800'}`}>
                    <h3 className={`text-xs font-bold flex items-center gap-1.5 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                      <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      Facility Sterilization Fleet (Click Machine to Inspect Immutable Logs)
                    </h3>
                    <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'} mt-1`}>
                      Detailed audit trail logs and historical maintenance records.
                    </p>
                  </div>

                  {hospitalMachines.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-xs">
                      No telemetry data connected for {selectedHospital.name} yet.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {hospitalMachines.map((machine) => (
                        <div
                          key={machine.id}
                          onClick={() => setSelectedAuditorMachine(machine)}
                          className={`p-3.5 border cursor-pointer transition-all hover:scale-[1.01] hover:shadow-lg ${
                            isLight ? 'bg-slate-50 hover:bg-slate-100 border-slate-200' : 'bg-[#090d16] hover:bg-slate-900 border-slate-800'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className={`w-2 h-2 rounded-full ${
                                  machine.status === 'Running' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' :
                                  machine.status === 'Alarm' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)] animate-pulse' :
                                  'bg-slate-400'
                                }`} />
                                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{machine.name}</h4>
                              </div>
                              <p className="text-[10px] font-mono text-cyan-700 dark:text-cyan-500 mt-0.5">{machine.id} • {machine.department}</p>
                            </div>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 ${
                              machine.status === 'Running' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300' :
                              machine.status === 'Alarm' ? 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300' :
                              'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                            }`}>
                              {machine.status}
                            </span>
                          </div>
                          
                          <div className="mt-3 grid grid-cols-2 gap-2 text-[10px]">
                            <div className={`p-1.5 border ${isLight ? 'bg-white border-slate-200 text-slate-600' : 'bg-[#111622] border-slate-800 text-slate-400'}`}>
                              <span className="block opacity-70">Cycles Completed</span>
                              <strong className="text-slate-900 dark:text-slate-100">{machine.doorCycles.toLocaleString()}</strong>
                            </div>
                            <div className={`p-1.5 border ${isLight ? 'bg-white border-slate-200 text-slate-600' : 'bg-[#111622] border-slate-800 text-slate-400'}`}>
                              <span className="block opacity-70">Op Hours</span>
                              <strong className="text-slate-900 dark:text-slate-100">{machine.totalOperatingHours.toLocaleString()}</strong>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}

            {timePeriod === 'weekly' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b bg-slate-50 dark:bg-[#090d16] text-slate-600 dark:text-slate-400 font-bold">
                      <th className="py-2.5 px-3">Week Period</th>
                      <th className="py-2.5 px-3">Total Cycles</th>
                      <th className="py-2.5 px-3">Weekly Waste Total</th>
                      <th className="py-2.5 px-3">Pass Rate</th>
                      <th className="py-2.5 px-3">SHA-256 Hash Verification</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {ARCHIVE_5YEAR_LOGS.weekly.map((row) => (
                      <tr key={row.period}>
                        <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-200">{row.period}</td>
                        <td className="py-3 px-3">{row.totalCycles} Cycles</td>
                        <td className="py-3 px-3 font-bold">{row.totalKg.toLocaleString()} kg</td>
                        <td className="py-3 px-3 text-emerald-600 font-bold">{row.passedPct}%</td>
                        <td className="py-3 px-3 text-emerald-600 font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>100% UNTAMPERED</span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => generateAuditCertificatePDF(AUDIT_TRAIL_LOGS[0], selectedHospital.name)}
                            className="p-1.5 bg-teal-50 border border-teal-200 text-teal-700  hover:bg-teal-100 text-xs font-bold inline-flex items-center gap-1"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>PDF</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {timePeriod === 'monthly' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b bg-slate-50 dark:bg-[#090d16] text-slate-600 dark:text-slate-400 font-bold">
                      <th className="py-2.5 px-3">Month</th>
                      <th className="py-2.5 px-3">Total Cycles</th>
                      <th className="py-2.5 px-3">Monthly Waste Volume</th>
                      <th className="py-2.5 px-3">Compliance Score</th>
                      <th className="py-2.5 px-3">CPCB Officer Signoff</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {ARCHIVE_5YEAR_LOGS.monthly.map((row) => (
                      <tr key={row.period}>
                        <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-200">{row.period}</td>
                        <td className="py-3 px-3">{row.totalCycles} Cycles</td>
                        <td className="py-3 px-3 font-bold">{row.totalKg.toLocaleString()} kg</td>
                        <td className="py-3 px-3 text-emerald-600 font-bold">{row.passedPct}%</td>
                        <td className="py-3 px-3">
                          <span className="text-[10px] font-bold px-2 py-0.5  bg-emerald-100 text-emerald-800 border border-emerald-300">
                            {row.cpcbStatus}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => generateAuditCertificatePDF(AUDIT_TRAIL_LOGS[0], selectedHospital.name)}
                            className="p-1.5 bg-teal-50 border border-teal-200 text-teal-700  hover:bg-teal-100 text-xs font-bold inline-flex items-center gap-1"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>PDF Report</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {timePeriod === 'yearly' && (
              <div className="space-y-4">
                <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span><strong>5-Year Immutable Backup Vault (2022 - 2026):</strong> All cryptographic hash chain logs are securely preserved and verified.</span>
                  </div>
                  <button
                    onClick={handleExport5YearArchive}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-1.5  shrink-0"
                  >
                    Download Full 5-Year Package
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b bg-slate-50 dark:bg-[#090d16] text-slate-600 dark:text-slate-400 font-bold">
                        <th className="py-2.5 px-3">Year</th>
                        <th className="py-2.5 px-3">Annual Cycles</th>
                        <th className="py-2.5 px-3">Annual Waste Volume</th>
                        <th className="py-2.5 px-3">CPCB Pass Rate</th>
                        <th className="py-2.5 px-3">SHA-256 Hash Chain Integrity</th>
                        <th className="py-2.5 px-3 text-right">Archival Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {ARCHIVE_5YEAR_LOGS.yearly.map((row) => (
                        <tr key={row.year}>
                          <td className="py-3 px-3 font-black text-sm text-slate-900 dark:text-slate-100">{row.year}</td>
                          <td className="py-3 px-3">{row.totalCycles.toLocaleString()} Cycles</td>
                          <td className="py-3 px-3 font-bold">{row.totalKg.toLocaleString()} kg</td>
                          <td className="py-3 px-3 text-emerald-600 font-bold">{row.passRate}%</td>
                          <td className="py-3 px-3 text-emerald-600 font-bold">{row.SHA256Status}</td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => generateAuditCertificatePDF(AUDIT_TRAIL_LOGS[0], selectedHospital.name)}
                              className="p-1.5 bg-slate-100 border border-slate-300 text-slate-700  hover:bg-slate-200 text-xs font-bold inline-flex items-center gap-1"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Export Year {row.year}</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedAuditorMachine && (
        <MachineDetailModal 
          machine={selectedAuditorMachine} 
          onClose={() => setSelectedAuditorMachine(null)} 
          isLight={isLight} 
          isAuditorMode={true} 
        />
      )}
    </div>
  );
}
