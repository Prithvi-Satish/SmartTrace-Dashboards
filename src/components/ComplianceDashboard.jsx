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
  Sparkles
} from 'lucide-react';
import {
  AUDIT_TRAIL_LOGS,
  COMPLIANCE_METRICS
} from '../data/mockData';

export default function ComplianceDashboard({ isLight }) {
  const [logs, setLogs] = useState(AUDIT_TRAIL_LOGS);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
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

  const handleExportPDF = (log) => {
    setSelectedReportLog(log || filteredLogs[0]);
    setShowReportModal(true);
  };

  return (
    <div className="space-y-5">
      {/* Sub-header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border shadow-sm ${
        isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
      }`}>
        <div>
          <h2 className="text-base font-bold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Dashboard 4: CPCB Regulatory & Audit Compliance
          </h2>
          <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Biomedical Waste Management Rules 2016 • Central Pollution Control Board (CPCB) Verification
          </p>
        </div>

        <button
          onClick={() => handleExportPDF(null)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3.5 py-2 rounded-lg flex items-center space-x-2 transition-all shadow-md self-start sm:self-center shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export CPCB Form IV Report</span>
        </button>
      </div>

      {/* Compliance Scorecard Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Hospital Compliance Score */}
        <div className={`p-4 rounded-xl border flex flex-col justify-between shadow-sm ${
          isLight ? 'bg-emerald-50/60 border-emerald-200 text-slate-900' : 'glass-card border-emerald-500/30 bg-emerald-950/10 text-slate-100'
        }`}>
          <div className={`flex items-center justify-between text-xs ${isLight ? 'text-slate-600 font-medium' : 'text-slate-400'}`}>
            <span>Compliance Index</span>
            <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="mt-2">
            <span className="text-3xl font-black text-emerald-700 dark:text-emerald-400">{COMPLIANCE_METRICS.overallScore}%</span>
            <p className="text-[10px] text-emerald-800 dark:text-emerald-300/80 font-medium mt-0.5">NABH & CPCB Grade A+</p>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-600 dark:bg-emerald-400 h-full" style={{ width: `${COMPLIANCE_METRICS.overallScore}%` }} />
          </div>
        </div>

        {/* CPCB Cycle Pass Rate */}
        <div className={`p-4 rounded-xl border flex flex-col justify-between shadow-sm ${
          isLight ? 'bg-white border-slate-200 text-slate-900' : 'glass-card border-slate-800 text-slate-100'
        }`}>
          <div className={`flex items-center justify-between text-xs ${isLight ? 'text-slate-600 font-medium' : 'text-slate-400'}`}>
            <span>Cycle Pass Rate</span>
            <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          </div>
          <div className="mt-2">
            <span className="text-3xl font-black">{COMPLIANCE_METRICS.cpcbRulePassRate}%</span>
            <p className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'} mt-0.5`}>Zero unhandled breaches</p>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-cyan-600 dark:bg-cyan-400 h-full" style={{ width: `${COMPLIANCE_METRICS.cpcbRulePassRate}%` }} />
          </div>
        </div>

        {/* AI Bag Integrity Inspection Rate */}
        <div className={`p-4 rounded-xl border flex flex-col justify-between shadow-sm ${
          isLight ? 'bg-white border-slate-200 text-slate-900' : 'glass-card border-slate-800 text-slate-100'
        }`}>
          <div className={`flex items-center justify-between text-xs ${isLight ? 'text-slate-600 font-medium' : 'text-slate-400'}`}>
            <span>AI Bag Integrity</span>
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="mt-2">
            <span className="text-3xl font-black">{COMPLIANCE_METRICS.aiBagIntegrityPct}%</span>
            <p className="text-[10px] text-purple-700 dark:text-purple-300 font-medium mt-0.5">Automated visual check</p>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-purple-600 dark:bg-purple-400 h-full" style={{ width: `${COMPLIANCE_METRICS.aiBagIntegrityPct}%` }} />
          </div>
        </div>

        {/* Monthly Waste Total */}
        <div className={`p-4 rounded-xl border flex flex-col justify-between shadow-sm ${
          isLight ? 'bg-white border-slate-200 text-slate-900' : 'glass-card border-slate-800 text-slate-100'
        }`}>
          <div className={`flex items-center justify-between text-xs ${isLight ? 'text-slate-600 font-medium' : 'text-slate-400'}`}>
            <span>Monthly Treated</span>
            <Building2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black">{COMPLIANCE_METRICS.totalWasteTreatedMonthKg.toLocaleString()} <span className={`text-xs font-normal ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>kg</span></span>
            <p className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'} mt-0.5`}>Avg {COMPLIANCE_METRICS.dailyAverageKg} kg / day</p>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-amber-500 h-full w-[85%]" />
          </div>
        </div>
      </div>

      {/* Bag Traceability Pipeline */}
      <div className={`p-4 rounded-xl border shadow-sm ${
        isLight ? 'bg-white border-slate-200' : 'glass-panel border-slate-800'
      }`}>
        <h3 className={`text-xs font-bold mb-3 flex items-center gap-1.5 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
          <QrCode className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          Barcoded Waste Bag Traceability Pipeline (CPCB Rule 5)
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
          <div className={`p-2.5 rounded-lg border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#0b0f19] border-slate-800'}`}>
            <div className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-400 font-bold text-xs flex items-center justify-center mx-auto mb-1">1</div>
            <span className={`font-bold block text-[11px] ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>Barcode Scanned</span>
            <span className={`text-[10px] block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>GS1 Barcode</span>
          </div>

          <div className={`p-2.5 rounded-lg border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#0b0f19] border-slate-800'}`}>
            <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400 font-bold text-xs flex items-center justify-center mx-auto mb-1">2</div>
            <span className={`font-bold block text-[11px] ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>AI Bag Validation</span>
            <span className={`text-[10px] block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Color & Leak Check</span>
          </div>

          <div className={`p-2.5 rounded-lg border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#0b0f19] border-slate-800'}`}>
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 font-bold text-xs flex items-center justify-center mx-auto mb-1">3</div>
            <span className={`font-bold block text-[11px] ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>VHP Cycle Record</span>
            <span className={`text-[10px] block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Sensor Profiles</span>
          </div>

          <div className={`p-2.5 rounded-lg border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#0b0f19] border-slate-800'}`}>
            <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 font-bold text-xs flex items-center justify-center mx-auto mb-1">4</div>
            <span className={`font-bold block text-[11px] ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>CPCB Cloud Sync</span>
            <span className={`text-[10px] block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Immutable Log</span>
          </div>
        </div>
      </div>

      {/* Filterable Audit Logs Table */}
      <div className={`p-4 rounded-xl border shadow-sm ${
        isLight ? 'bg-white border-slate-200' : 'glass-panel border-slate-800'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className={`text-sm font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
              <FileCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              CPCB Bag Traceability & Audit Logs
            </h3>
            <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Tamper-proof digital records of waste sterilization cycles</p>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className={`w-3.5 h-3.5 absolute left-2.5 top-2.5 ${isLight ? 'text-slate-400' : 'text-slate-400'}`} />
              <input
                type="text"
                placeholder="Search barcode, bag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`text-xs pl-8 pr-3 py-1.5 rounded-lg border focus:outline-none focus:border-cyan-500 w-44 sm:w-56 ${
                  isLight ? 'bg-slate-50 text-slate-900 border-slate-300' : 'bg-[#090d16] text-slate-200 border-slate-700'
                }`}
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={`text-xs border rounded-lg px-2 py-1.5 focus:outline-none focus:border-cyan-500 ${
                isLight ? 'bg-slate-50 text-slate-900 border-slate-300' : 'bg-[#090d16] text-slate-200 border-slate-700'
              }`}
            >
              <option value="All">All Bags</option>
              <option value="Yellow Bag">Yellow Bag</option>
              <option value="Red Bag">Red Bag</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`text-xs border rounded-lg px-2 py-1.5 focus:outline-none focus:border-cyan-500 ${
                isLight ? 'bg-slate-50 text-slate-900 border-slate-300' : 'bg-[#090d16] text-slate-200 border-slate-700'
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
                    <span className={`font-mono block font-medium ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>{log.barcode}</span>
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
                  <td className="py-3 px-3 text-purple-700 dark:text-purple-300 font-semibold">{log.aiResult}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.cpcbStatus === 'PASSED'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30'
                        : 'bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/30 animate-pulse'
                    }`}>
                      {log.cpcbStatus}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => handleExportPDF(log)}
                      className={`p-1.5 rounded border transition-colors ${
                        isLight
                          ? 'text-cyan-700 hover:text-cyan-900 bg-cyan-50 border-cyan-200 hover:bg-cyan-100'
                          : 'text-cyan-400 hover:text-cyan-300 bg-cyan-950/50 border-cyan-800/50 hover:bg-cyan-900/60'
                      }`}
                      title="View CPCB Report"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Certificate Modal */}
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
                <h3 className="text-sm font-bold">CPCB Form IV - Digital Audit Certificate</h3>
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
                  <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                    VERIFIED COMPLIANT
                  </span>
                  <p className="text-[10px] text-slate-500 mt-1">License: {COMPLIANCE_METRICS.cpcbLicenseNo}</p>
                </div>
              </div>

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

              <div>
                <h5 className="font-bold text-slate-900 mb-1">Process Validation Telemetry:</h5>
                <ul className="list-disc pl-4 space-y-1 text-slate-700">
                  <li>VHP Concentration Peak: 450 ppm (Threshold: &gt;400 ppm) - <strong>PASS</strong></li>
                  <li>Chamber Pressure: -12.5 kPa (Negative Pressure Lock) - <strong>PASS</strong></li>
                  <li>Holding Time: 45 minutes at target temperature (60.0°C) - <strong>PASS</strong></li>
                  <li>Residual H₂O₂ Level Post-Aeration: 0.8 ppm (Safe for disposal) - <strong>PASS</strong></li>
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-300 flex justify-between items-center text-[10px] text-slate-500">
                <span>Digitally Signed by SmartTrace™ ABIOT-E-SAFE Cloud System</span>
                <span>Timestamp: 2026-08-06 15:56:16 IST</span>
              </div>
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
              <button
                onClick={() => {
                  alert(`Downloading CPCB Certificate PDF for ${selectedReportLog?.cycleId}...`);
                  setShowReportModal(false);
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-1.5 rounded-lg flex items-center space-x-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
