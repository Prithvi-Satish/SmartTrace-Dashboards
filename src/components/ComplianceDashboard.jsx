import React, { useState } from 'react';
import {
  FileCheck,
  ShieldCheck,
  QrCode,
  Download,
  Search,
  CheckCircle2,
  FileText,
  Building2,
  Eye,
  X,
  Award,
  Sparkles,
  Cpu,
  Radio,
  Lock,
  ChevronRight,
  ShieldAlert,
  Calendar,
  Wrench,
  Gauge
} from 'lucide-react';
import {
  INITIAL_MACHINES,
  AUDIT_TRAIL_LOGS,
  COMPLIANCE_METRICS
} from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import MachineDetailModal from './MachineDetailModal';
import { generateAuditCertificatePDF } from '../utils/pdfGenerator';

export default function ComplianceDashboard({ isLight }) {
  const { currentUser, hasPermission } = useAuth();
  const [machines, setMachines] = useState(INITIAL_MACHINES);
  const [logs, setLogs] = useState(AUDIT_TRAIL_LOGS);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Modal States
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReportLog, setSelectedReportLog] = useState(null);

  // Filter logs logic
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.cycleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.barcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.operator.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === 'All' || log.bagCategory.includes(categoryFilter);

    const matchesStatus =
      statusFilter === 'All' || log.cpcbStatus === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const canDownload = hasPermission('download_reports');
  const canVerifyHashes = hasPermission('verify_hashes');

  const handleExportPDF = (log) => {
    if (!canDownload) {
      alert(`🔒 Access Restricted: ${currentUser?.name} (${currentUser?.roleLabel}) does not have permission to export official CPCB Audit Certificates. Requires Auditor or Admin privileges.`);
      return;
    }
    const targetLog = log || filteredLogs[0];
    generateAuditCertificatePDF(targetLog, COMPLIANCE_METRICS.hospitalName);
  };

  const handleOpenReportModal = (log) => {
    setSelectedReportLog(log || filteredLogs[0]);
    setShowReportModal(true);
  };

  return (
    <div className="space-y-5">
      {/* Sub-header matching Screenshot */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border shadow-xs ${
        isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              Dashboard 4: CPCB Regulatory & Audit Compliance
            </h2>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'} mt-0.5`}>
              Biomedical Waste Management Rules 2016 • Central Pollution Control Board (CPCB) Verification
            </p>
          </div>
        </div>

        <button
          onClick={() => handleExportPDF(null)}
          className="bg-[#00875a] hover:bg-[#00704a] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center space-x-2 transition-all shadow-xs self-start sm:self-center shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export CPCB Form IV Report</span>
        </button>
      </div>

      {/* Compliance Scorecard Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Compliance Index */}
        <div className={`p-4 rounded-2xl border flex flex-col justify-between shadow-xs ${
          isLight ? 'bg-emerald-50/70 border-emerald-200/90 text-slate-900' : 'glass-card border-emerald-500/30 bg-emerald-950/10 text-slate-100'
        }`}>
          <div className={`flex items-center justify-between text-xs ${isLight ? 'text-slate-600 font-semibold' : 'text-slate-400'}`}>
            <span>Compliance Index</span>
            <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="mt-2">
            <span className="text-3xl font-black text-emerald-700 dark:text-emerald-400">{COMPLIANCE_METRICS.overallScore}%</span>
            <p className="text-xs text-emerald-700 dark:text-emerald-300/80 font-bold mt-1">NABH & CPCB Grade A+</p>
          </div>
          <div className="w-full bg-emerald-200/70 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-600 dark:bg-emerald-400 h-full" style={{ width: `${COMPLIANCE_METRICS.overallScore}%` }} />
          </div>
        </div>

        {/* CPCB Cycle Pass Rate */}
        <div className={`p-4 rounded-2xl border flex flex-col justify-between shadow-xs ${
          isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'glass-card border-slate-800 text-slate-100'
        }`}>
          <div className={`flex items-center justify-between text-xs ${isLight ? 'text-slate-600 font-semibold' : 'text-slate-400'}`}>
            <span>Cycle Pass Rate</span>
            <CheckCircle2 className="w-4 h-4 text-[#0097a7] dark:text-cyan-400" />
          </div>
          <div className="mt-2">
            <span className="text-3xl font-black">{COMPLIANCE_METRICS.cpcbRulePassRate}%</span>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'} mt-1`}>Zero unhandled breaches</p>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-[#0097a7] dark:bg-cyan-400 h-full" style={{ width: `${COMPLIANCE_METRICS.cpcbRulePassRate}%` }} />
          </div>
        </div>

        {/* AI Bag Integrity Inspection Rate */}
        <div className={`p-4 rounded-2xl border flex flex-col justify-between shadow-xs ${
          isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'glass-card border-slate-800 text-slate-100'
        }`}>
          <div className={`flex items-center justify-between text-xs ${isLight ? 'text-slate-600 font-semibold' : 'text-slate-400'}`}>
            <span>AI Bag Integrity</span>
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="mt-2">
            <span className="text-3xl font-black">{COMPLIANCE_METRICS.aiBagIntegrityPct}%</span>
            <p className="text-xs text-purple-700 dark:text-purple-300 font-bold mt-1">Automated visual check</p>
          </div>
          <div className="w-full bg-purple-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-purple-600 dark:bg-purple-400 h-full" style={{ width: `${COMPLIANCE_METRICS.aiBagIntegrityPct}%` }} />
          </div>
        </div>

        {/* Monthly Waste Total */}
        <div className={`p-4 rounded-2xl border flex flex-col justify-between shadow-xs ${
          isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'glass-card border-slate-800 text-slate-100'
        }`}>
          <div className={`flex items-center justify-between text-xs ${isLight ? 'text-slate-600 font-semibold' : 'text-slate-400'}`}>
            <span>Monthly Treated</span>
            <Building2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="mt-2">
            <span className="text-3xl font-black">{COMPLIANCE_METRICS.totalWasteTreatedMonthKg.toLocaleString()} <span className={`text-xs font-normal ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>kg</span></span>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'} mt-1`}>Avg {COMPLIANCE_METRICS.dailyAverageKg} kg / day</p>
          </div>
          <div className="w-full bg-amber-100 dark:bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-amber-500 h-full w-[85%]" />
          </div>
        </div>
      </div>

      {/* Bag Traceability Pipeline */}
      <div className={`p-4 rounded-2xl border shadow-xs ${
        isLight ? 'bg-white border-slate-200/80' : 'glass-panel border-slate-800'
      }`}>
        <h3 className={`text-xs font-bold mb-3 flex items-center gap-2 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
          <QrCode className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          Barcoded Waste Bag Traceability Pipeline (CPCB Rule 5)
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
          <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50/70 border-slate-200/80' : 'bg-[#0b0f19] border-slate-800'}`}>
            <div className="w-6 h-6 rounded-full bg-[#cff4fc] text-[#00838f] dark:bg-cyan-500/20 dark:text-cyan-400 font-bold text-xs flex items-center justify-center mx-auto mb-1">1</div>
            <span className={`font-bold block text-xs ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>Barcode Scanned</span>
            <span className={`text-[11px] block ${isLight ? 'text-slate-400' : 'text-slate-400'} mt-0.5`}>GS1 Barcode</span>
          </div>

          <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50/70 border-slate-200/80' : 'bg-[#0b0f19] border-slate-800'}`}>
            <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400 font-bold text-xs flex items-center justify-center mx-auto mb-1">2</div>
            <span className={`font-bold block text-xs ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>AI Bag Validation</span>
            <span className={`text-[11px] block ${isLight ? 'text-slate-400' : 'text-slate-400'} mt-0.5`}>Color & Leak Check</span>
          </div>

          <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50/70 border-slate-200/80' : 'bg-[#0b0f19] border-slate-800'}`}>
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 font-bold text-xs flex items-center justify-center mx-auto mb-1">3</div>
            <span className={`font-bold block text-xs ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>VHP Cycle Record</span>
            <span className={`text-[11px] block ${isLight ? 'text-slate-400' : 'text-slate-400'} mt-0.5`}>Sensor Profiles</span>
          </div>

          <div className={`p-3 rounded-xl border ${isLight ? 'bg-slate-50/70 border-slate-200/80' : 'bg-[#0b0f19] border-slate-800'}`}>
            <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 font-bold text-xs flex items-center justify-center mx-auto mb-1">4</div>
            <span className={`font-bold block text-xs ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>CPCB Cloud Sync</span>
            <span className={`text-[11px] block ${isLight ? 'text-slate-400' : 'text-slate-400'} mt-0.5`}>Immutable Log</span>
          </div>
        </div>
      </div>

      {/* Filterable Audit Logs Table */}
      <div className={`p-4 rounded-2xl border shadow-xs ${
        isLight ? 'bg-white border-slate-200/80' : 'glass-panel border-slate-800'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <div className="flex items-center space-x-2.5">
            <FileCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div>
              <h3 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
                CPCB Bag Traceability & Audit Logs
              </h3>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'} mt-0.5`}>Tamper-proof digital records of waste sterilization cycles</p>
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className={`w-3.5 h-3.5 absolute left-3 top-2.5 ${isLight ? 'text-slate-400' : 'text-slate-400'}`} />
              <input
                type="text"
                placeholder="Search barcode, bag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`text-xs pl-8 pr-3 py-1.5 rounded-xl border focus:outline-none focus:border-teal-500 w-44 sm:w-56 ${
                  isLight ? 'bg-slate-50/70 text-slate-900 border-slate-200' : 'bg-[#090d16] text-slate-200 border-slate-700'
                }`}
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={`text-xs border rounded-xl px-3 py-1.5 focus:outline-none focus:border-teal-500 ${
                isLight ? 'bg-slate-50/70 text-slate-900 border-slate-200' : 'bg-[#090d16] text-slate-200 border-slate-700'
              }`}
            >
              <option value="All">All Bags</option>
              <option value="Yellow Bag">Yellow Bag</option>
              <option value="Red Bag">Red Bag</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`text-xs border rounded-xl px-3 py-1.5 focus:outline-none focus:border-teal-500 ${
                isLight ? 'bg-slate-50/70 text-slate-900 border-slate-200' : 'bg-[#090d16] text-slate-200 border-slate-700'
              }`}
            >
              <option value="All">All Statuses</option>
              <option value="PASSED">PASSED</option>
              <option value="FLAGGED">FLAGGED</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className={`border-b font-semibold ${
                isLight ? 'bg-slate-50 text-slate-600 border-slate-200' : 'bg-[#090d16] text-slate-400 border-slate-800'
              }`}>
                <th className="py-2.5 px-3">Cycle ID</th>
                <th className="py-2.5 px-3">Barcode / Bag</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Department</th>
                <th className="py-2.5 px-3">Operator</th>
                <th className="py-2.5 px-3">AI Vision Check</th>
                <th className="py-2.5 px-3">CPCB Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isLight ? 'divide-slate-200' : 'divide-slate-800/60'}`}>
              {filteredLogs.map((log) => (
                <tr key={log.cycleId} className={`transition-colors ${isLight ? 'hover:bg-slate-50' : 'hover:bg-slate-800/40'}`}>
                  <td className="py-3 px-3 font-mono font-bold text-cyan-700 dark:text-cyan-400">{log.cycleId}</td>
                  <td className="py-3 px-3">
                    <span className={`font-mono block font-bold text-xs ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>{log.barcode}</span>
                    <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{log.bagId}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.bagCategory.includes('Yellow')
                        ? 'bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30'
                        : 'bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/30'
                    }`}>
                      {log.bagCategory}
                    </span>
                  </td>
                  <td className={`py-3 px-3 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>{log.department}</td>
                  <td className={`py-3 px-3 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>{log.operator}</td>
                  <td className="py-3 px-3 font-bold text-xs">
                    {log.cpcbStatus === 'FLAGGED' ? (
                      <span className="text-purple-700 dark:text-purple-400 font-bold block">Overfill Flagged</span>
                    ) : (
                      <span className="text-purple-700 dark:text-purple-400 font-bold block">
                        Bag Intact ({log.aiConfidence || '99.2%'} Conf)
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold tracking-wide block w-max ${
                      log.cpcbStatus === 'PASSED'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30'
                        : 'bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/30'
                    }`}>
                      {log.cpcbStatus}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right flex items-center justify-end">
                    <button
                      onClick={() => handleOpenReportModal(log)}
                      className={`p-1.5 rounded-lg border transition-all ${
                        isLight
                          ? 'text-cyan-700 bg-cyan-50 border-cyan-200 hover:bg-cyan-100'
                          : 'text-cyan-400 bg-cyan-950/50 border-cyan-800/50 hover:bg-cyan-900/60'
                      }`}
                      title="Preview Audit Certificate"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Accessible Deployed Machine Fleet Grid (Digital Twin Inspector) */}
      <div className={`p-4 rounded-xl border shadow-sm ${
        isLight ? 'bg-white border-slate-200' : 'glass-panel border-slate-800'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h3 className={`text-xs font-bold flex items-center gap-1.5 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
              <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              Connected Sterilization Fleet (Click Machine to Inspect Details & Maintenance Records)
            </h3>
            <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Real-time Digital Twin status across ICU, Surgical Suite, Emergency, Oncology, and Sterilization hubs
            </p>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 w-max">
            5 Machines Live
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {machines.map((machine) => (
            <div
              key={machine.id}
              onClick={() => setSelectedMachine(machine)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all hover:scale-[1.01] hover:shadow-lg ${
                machine.status === 'Alarm'
                  ? isLight ? 'bg-rose-50/60 border-rose-300 hover:border-rose-400' : 'bg-rose-950/20 border-rose-800/60 hover:border-rose-500'
                  : isLight ? 'bg-slate-50 hover:bg-slate-100 border-slate-200' : 'bg-[#090d16] hover:bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400">{machine.id}</span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">{machine.name}</h4>
                  <p className="text-[10px] text-slate-500 truncate">{machine.department}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                  machine.status === 'Running' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300' :
                  machine.status === 'Alarm' ? 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300' :
                  'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}>
                  {machine.status}
                </span>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Current Phase:</span>
                  <span className="font-bold text-cyan-600 dark:text-cyan-400 truncate max-w-[140px]">{machine.phase}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Installed Date:</span>
                  <span className="font-mono">{machine.installationDate}</span>
                </div>
              </div>

              <div className="mt-2 text-right">
                <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 flex items-center justify-end gap-0.5 hover:underline">
                  <span>Inspect Device Details & IQ/OQ/PQ</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Machine Detail Modal (Digital Twin) */}
      {selectedMachine && (
        <MachineDetailModal
          machine={selectedMachine}
          onClose={() => setSelectedMachine(null)}
          isLight={isLight}
        />
      )}

      {/* Audit Report Preview Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`border rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] ${
            isLight ? 'bg-white border-slate-300' : 'bg-[#121824] border-slate-700'
          }`}>
            <div className={`px-5 py-3 border-b flex items-center justify-between ${
              isLight ? 'bg-slate-100 border-slate-200 text-slate-900' : 'bg-[#090d16] border-slate-800 text-slate-100'
            }`}>
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-sm font-bold">CPCB Form IV - Watermarked Audit Certificate</h3>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className={`p-1 rounded ${isLight ? 'text-slate-500 hover:text-slate-800' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs bg-white text-slate-900 font-sans">
              <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-base uppercase text-slate-900">Form IV Compliance Certificate</h4>
                  <p className="text-slate-600 text-[11px]">Central Pollution Control Board • Bio-Medical Waste Rules 2016</p>
                </div>
                <div className="text-right">
                  <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded border ${
                    selectedReportLog?.cpcbStatus === 'FLAGGED'
                      ? 'text-rose-700 bg-rose-100 border-rose-300'
                      : 'text-emerald-700 bg-emerald-100 border-emerald-300'
                  }`}>
                    {selectedReportLog?.cpcbStatus === 'FLAGGED' ? '🚨 FLAGGED BREACH' : '✓ VERIFIED COMPLIANT'}
                  </span>
                  <p className="text-[10px] text-slate-500 mt-1">License: {COMPLIANCE_METRICS.cpcbLicenseNo}</p>
                </div>
              </div>

              {/* FLAGGED BREACH DETAILS BANNER IF FLAGGED */}
              {selectedReportLog?.cpcbStatus === 'FLAGGED' && (
                <div className="p-3.5 rounded-lg border-2 border-rose-400 bg-rose-50 text-rose-900 space-y-1">
                  <div className="font-extrabold text-xs text-rose-700 uppercase tracking-wider flex items-center gap-1">
                    <ShieldAlert className="w-4 h-4 text-rose-600" />
                    <span>CPCB AUDIT FLAGGED BREACH DETAILS</span>
                  </div>
                  <p className="text-xs font-bold">
                    Reason / Cause: {selectedReportLog.flagReason || 'AI Camera Overfill Flagged (>85% Capacity)'}
                  </p>
                  <p className="text-[11px] text-rose-800">
                    <strong>Telemetry Breach:</strong> {selectedReportLog.telemetryBreach || 'Bag Fill Level: 94% (Max allowed threshold: 85%)'}
                  </p>
                  <p className="text-[11px] text-rose-800">
                    <strong>Corrective Action Taken:</strong> {selectedReportLog.correctiveAction || 'Safety lock engaged. Repacked by operator.'}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded border border-slate-200 text-[11px]">
                <div>
                  <span className="text-slate-500 block">Healthcare Facility:</span>
                  <strong className="text-slate-900">{COMPLIANCE_METRICS.hospitalName}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Cycle Record ID:</span>
                  <strong className="font-mono text-slate-900">{selectedReportLog?.cycleId}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Bag Barcode ID:</span>
                  <strong className="font-mono text-slate-900">{selectedReportLog?.barcode}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Waste Category:</span>
                  <strong className="text-slate-900">{selectedReportLog?.bagCategory}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Machine Unit:</span>
                  <strong className="text-slate-900">{selectedReportLog?.machineId}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Operator Name:</span>
                  <strong className="text-slate-900">{selectedReportLog?.operator}</strong>
                </div>
              </div>

              {canVerifyHashes ? (
                <div className="bg-slate-900 text-cyan-300 p-3 rounded font-mono text-[10px] space-y-1">
                  <div>SHA-256 HASH: {selectedReportLog?.hashChain}</div>
                  <div className="text-emerald-400">ATECC608A HARDWARE SIGNATURE: VERIFIED UNTAMPERED</div>
                </div>
              ) : (
                <div className="bg-slate-100 border border-slate-300 text-slate-700 p-3 rounded font-sans text-[11px] flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-amber-500 shrink-0" />
                  <span><strong>🔒 Restricted Data:</strong> SHA-256 Cryptographic Hash verification requires Auditor or Admin privileges (Logged in as {currentUser?.name} - {currentUser?.roleLabel}).</span>
                </div>
              )}
            </div>

            <div className={`px-5 py-3 border-t flex justify-end space-x-3 ${
              isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#090d16] border-slate-800'
            }`}>
              <button
                onClick={() => setShowReportModal(false)}
                className={`text-xs px-3 py-1.5 ${isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Close
              </button>
              {canDownload ? (
                <button
                  onClick={() => {
                    generateAuditCertificatePDF(selectedReportLog, COMPLIANCE_METRICS.hospitalName);
                    setShowReportModal(false);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-1.5 rounded-lg flex items-center space-x-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Generate Watermarked PDF</span>
                </button>
              ) : (
                <button
                  onClick={() => handleExportPDF(selectedReportLog)}
                  className="bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-semibold px-4 py-1.5 rounded-lg flex items-center space-x-1.5 border border-slate-300 dark:border-slate-700 cursor-not-allowed"
                  title="🔒 Access Restricted: Requires Auditor or Admin Privileges"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-500" />
                  <span>🔒 Download PDF (Auditor Only)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
