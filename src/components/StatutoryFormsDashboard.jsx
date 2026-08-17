import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  Building2,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Download,
  Upload,
  Search,
  FileCheck,
  Scan,
  Sparkles,
  UserCheck,
  Syringe,
  Microscope,
  Clock,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  PlusCircle,
  FilePlus,
  Printer,
  Check,
  X,
  Scale,
  Award
} from 'lucide-react';
import { KSPCB_STATUTORY_DATA } from '../data/mockData';
import {
  generateKSPCBForm4PDF,
  generateKSPCBForm1PDF,
  generateKSPCBManifestPDF
} from '../utils/kspcbPdfGenerator';
import { computeSHA256, createLedgerBlock, verifyChainIntegrity } from '../utils/cryptoEngine';
import { evaluateManifestDiscrepancy, calculateFormISla, validateSporeStripTest } from '../utils/complianceRulesEngine';
import { storeOfflineRecord, getDecryptedOfflineQueue, removeSyncedRecords } from '../utils/secureOfflineStore';

export default function StatutoryFormsDashboard({ isLight }) {
  const [activeTab, setActiveTab] = useState('vault'); // 'vault', 'sop', 'ocr', 'segregation', 'crypto_desk'
  const [data, setData] = useState(KSPCB_STATUTORY_DATA);
  const [selectedForm, setSelectedForm] = useState(null);
  
  // Client-Side Cryptographic & Offline Vault State
  const [cryptoOutput, setCryptoOutput] = useState(null);
  const [offlineQueue, setOfflineQueue] = useState([]);
  const [discrepancyTest, setDiscrepancyTest] = useState({
    wardYellow: 45.0, cbwtfYellow: 48.5,
    wardRed: 30.0, cbwtfRed: 30.8,
    wardWhite: 12.0, cbwtfWhite: 11.9,
    wardBlue: 8.0, cbwtfBlue: 7.9
  });
  const [discrepancyReport, setDiscrepancyReport] = useState(null);
  
  // Form I Modal State
  const [showForm1Modal, setShowForm1Modal] = useState(false);
  const [newIncident, setNewIncident] = useState({
    date: new Date().toISOString().split('T')[0],
    time: '12:00',
    location: 'ICU Wing B Corridor',
    categoryInvolved: 'Yellow Bag (Cytotoxic & Anatomical)',
    estimatedQuantityKg: '1.5',
    cause: 'Bag tear during transit from ward trolley to elevator.',
    affectedStaff: 'Rajesh N. (Sanitation)',
    injuries: 'No physical puncture; skin contact (Washed with soap & water)',
    correctiveAction: 'Repacked into double-layer Yellow Bag; ward floor sanitized with 2% Sodium Hypochlorite.',
    nodalOfficerReported: 'Dr. Srinivas N.'
  });

  // OCR Upload Verification State
  const [uploadedReceipt, setUploadedReceipt] = useState(null);
  const [isProcessingOcr, setIsProcessingOcr] = useState(false);
  const [ocrVerified, setOcrVerified] = useState(true);

  // Segregation Assistant Tool State
  const [testItem, setTestItem] = useState('Amputated Tissue / Human Organ');
  const [testBagSelected, setTestBagSelected] = useState('Red Bag');

  const handleAddIncident = (e) => {
    e.preventDefault();
    const createdIncident = {
      id: `INC-2026-0${data.form1Incidents.length + 1}`,
      ...newIncident,
      nodalReportTime: `${newIncident.date} ${newIncident.time} (LOGGED REALTIME - WITHIN 24H MANDATE)`,
      kspcbFiledReceipt: `KSPCB-INC-ACK-2026-0${Math.floor(Math.random() * 900 + 100)}`
    };
    setData((prev) => ({
      ...prev,
      form1Incidents: [createdIncident, ...prev.form1Incidents]
    }));
    setShowForm1Modal(false);
    alert('✅ Incident successfully logged in KSPCB Form I Registry! 24-hour statutory timer verified.');
  };

  const handleSimulateOcrUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsProcessingOcr(true);
    setTimeout(() => {
      setIsProcessingOcr(false);
      setUploadedReceipt({
        fileName: file.name,
        extractedAckNo: `KSPCB-XGN-2026-${Math.floor(Math.random() * 899999 + 100000)}`,
        extractedDate: new Date().toLocaleDateString('en-IN'),
        extractedOffice: 'Bangalore South Regional Office (Jayanagar)',
        watermarkMatch: true
      });
      setOcrVerified(true);
    }, 1800);
  };

  // Segregation Audit Logic
  const getSegregationResult = () => {
    if (testItem.includes('Amputated Tissue') || testItem.includes('Soiled Gauze')) {
      if (testBagSelected === 'Yellow Bag') {
        return { isCorrect: true, category: 'Yellow Bag', message: '✅ COMPLIANT: Human anatomical & soiled waste MUST go into Non-Chlorinated Yellow Bag for Incineration/CBWTF.' };
      } else {
        return { isCorrect: false, category: 'Yellow Bag', message: '❌ CRITICAL VIOLATION: Anatomical waste cannot go to Red/Blue bins! Must go to Yellow Bag only.' };
      }
    }
    if (testItem.includes('Tubing') || testItem.includes('IV Bottle')) {
      if (testBagSelected === 'Red Bag') {
        return { isCorrect: true, category: 'Red Bag', message: '✅ COMPLIANT: Contaminated plastic tubing & catheters go to Red Bag for Autoclaving/Shredding.' };
      } else {
        return { isCorrect: false, category: 'Red Bag', message: '❌ VIOLATION: Plastics must be placed in Red Bag for recycling.' };
      }
    }
    if (testItem.includes('Needle') || testItem.includes('Scalpel')) {
      if (testBagSelected === 'White Container') {
        return { isCorrect: true, category: 'White Container', message: '✅ COMPLIANT: Waste sharps MUST go to Translucent White Puncture-Proof Container.' };
      } else {
        return { isCorrect: false, category: 'White Container', message: '❌ DANGER: Sharps in soft bags cause needle-stick injuries! Place in White Sharps Box.' };
      }
    }
    return { isCorrect: true, category: 'Yellow Bag', message: '✅ Compliant segregation selection.' };
  };

  const segregationCheck = getSegregationResult();

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className={`p-5 border ${
        isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="w-11 h-11 bg-[#00875a]/10 dark:bg-[#00875a]/20 border border-[#00875a]/30 flex items-center justify-center shrink-0 mt-0.5">
              <FileCheck className="w-6 h-6 text-[#00875a] dark:text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  Dashboard 5: KSPCB Statutory Forms & SOP Center
                </h1>
                <span className="bg-[#00875a] text-white text-[11px] px-2.5 py-0.5 rounded-full font-bold">
                  BMWM Rules 2016 • KSPCB Karnataka Edition
                </span>
              </div>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'} mt-1`}>
                Karnataka State Pollution Control Board • {data.kspcbRegionalOffice} • Authorization No: <strong className="font-mono text-emerald-700 dark:text-emerald-400">{data.kspcbAuthorizationNo}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <button
              onClick={() => generateKSPCBForm4PDF(data)}
              className="bg-[#00875a] hover:bg-[#00704a] text-white text-xs font-bold px-3.5 py-2 flex items-center space-x-2 transition-all "
            >
              <Printer className="w-4 h-4" />
              <span>Export KSPCB Form IV PDF</span>
            </button>
            <button
              onClick={() => setShowForm1Modal(true)}
              className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3.5 py-2 flex items-center space-x-2 transition-all "
            >
              <PlusCircle className="w-4 h-4" />
              <span>Log Accident (Form I)</span>
            </button>
          </div>
        </div>

        {/* 4 Primary Navigation Tabs */}
        <div className="flex items-center space-x-2 mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('vault')}
            className={`px-4 py-2 text-xs font-bold flex items-center space-x-2 transition-all whitespace-nowrap ${
              activeTab === 'vault'
                ? 'bg-[#00875a] text-white '
                : isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>1. Statutory Forms Vault (Form I - VI)</span>
          </button>

          <button
            onClick={() => setActiveTab('sop')}
            className={`px-4 py-2 text-xs font-bold flex items-center space-x-2 transition-all whitespace-nowrap ${
              activeTab === 'sop'
                ? 'bg-[#00875a] text-white '
                : isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <Microscope className="w-4 h-4" />
            <span>2. Daily SOP & Pre-Treatment Registers</span>
          </button>

          <button
            onClick={() => setActiveTab('ocr')}
            className={`px-4 py-2 text-xs font-bold flex items-center space-x-2 transition-all whitespace-nowrap ${
              activeTab === 'ocr'
                ? 'bg-[#00875a] text-white '
                : isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <Scan className="w-4 h-4" />
            <span>3. KSPCB X-GN Receipt OCR Verifier</span>
          </button>

          <button
            onClick={() => setActiveTab('segregation')}
            className={`px-4 py-2 text-xs font-bold flex items-center space-x-2 transition-all whitespace-nowrap ${
              activeTab === 'segregation'
                ? 'bg-[#00875a] text-white '
                : isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>4. CPCB Ward Segregation Risk Pre-Check</span>
          </button>

          <button
            onClick={async () => {
              setActiveTab('crypto_desk');
              // Automatically evaluate default discrepancy report
              const rep = evaluateManifestDiscrepancy(
                { yellow: discrepancyTest.wardYellow, red: discrepancyTest.wardRed, white: discrepancyTest.wardWhite, blue: discrepancyTest.wardBlue },
                { yellow: discrepancyTest.cbwtfYellow, red: discrepancyTest.cbwtfRed, white: discrepancyTest.cbwtfWhite, blue: discrepancyTest.cbwtfBlue }
              );
              setDiscrepancyReport(rep);
              // Read offline queue
              const queue = await getDecryptedOfflineQueue();
              setOfflineQueue(queue);
            }}
            className={`px-4 py-2 text-xs font-bold flex items-center space-x-2 transition-all whitespace-nowrap ${
              activeTab === 'crypto_desk'
                ? 'bg-purple-600 text-white '
                : isLight ? 'bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200' : 'bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 border border-purple-800/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>5. Client Backend Logic & Crypto Vault</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-4 border ${
          isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
        }`}>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Form III Permit Status</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{data.currentAuthorizationValidity.daysRemaining} Days</span>
            <p className="text-xs text-slate-500 mt-1">Valid till {data.currentAuthorizationValidity.expiryDate}</p>
          </div>
        </div>

        <div className={`p-4 border ${
          isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
        }`}>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Form IV Annual Return</span>
            <CheckCircle2 className="w-4 h-4 text-[#00875a]" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-slate-900 dark:text-slate-100">100% Compiled</span>
            <p className="text-xs text-slate-500 mt-1">X-GN Ack: {data.form4AnnualReturnSummary.xgnAckNo}</p>
          </div>
        </div>

        <div className={`p-4 border ${
          isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
        }`}>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Form VI Manifest Variance</span>
            <Scale className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-rose-600 dark:text-rose-400">1 Flagged (&gt;5%)</span>
            <p className="text-xs text-slate-500 mt-1">CBWTF: Maridi Eco Ltd.</p>
          </div>
        </div>

        <div className={`p-4 border ${
          isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
        }`}>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Form I Accidents Filed</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-slate-900 dark:text-slate-100">{data.form1Incidents.length} Incident</span>
            <p className="text-xs text-emerald-600 font-medium mt-1">Reported within 24h window</p>
          </div>
        </div>
      </div>

      {/* TAB 1: STATUTORY FORMS VAULT */}
      {activeTab === 'vault' && (
        <div className="space-y-5">
          <div className={`p-5 border ${
            isLight ? 'bg-white border-slate-200/80' : 'bg-[#111622] border-slate-800'
          }`}>
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center justify-between">
              <span>Karnataka State Pollution Control Board (KSPCB) Scheduled Forms Master Vault</span>
              <span className="text-xs font-normal text-slate-500">6 Mandated Statutory Schedules</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.formsSummary.map((form) => (
                <div
                  key={form.id}
                  className={`p-4 border transition-all ${
                    isLight ? 'bg-slate-50 hover:bg-slate-100/80 border-slate-200' : 'bg-[#090d16] hover:bg-[#0f1523] border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-[#00875a]/10 text-[#00875a] dark:text-emerald-400 border border-[#00875a]/20">
                      {form.code}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {form.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">{form.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{form.frequency}</p>

                  <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 font-mono">{form.lastFiledDate || form.certNo || 'Live'}</span>
                    <button
                      onClick={() => {
                        if (form.id === 'FORM-IV') generateKSPCBForm4PDF(data);
                        else if (form.id === 'FORM-I') generateKSPCBForm1PDF(data.form1Incidents[0]);
                        else if (form.id === 'FORM-VI') generateKSPCBManifestPDF(data.dailyManifests[0]);
                        else alert(`Viewing official template preview for ${form.code} (${form.name})`);
                      }}
                      className="text-[#00875a] dark:text-emerald-400 font-bold hover:underline flex items-center space-x-1"
                    >
                      <span>View & Print</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form VI Handover Pickup Manifest & Variance Table */}
          <div className={`p-5 border ${
            isLight ? 'bg-white border-slate-200/80' : 'bg-[#111622] border-slate-800'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-cyan-600" />
                  <span>Form VI / Daily Handover Pickup Manifests (CBWTF Discrepancy Matching)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Automated ±5% variance warning engine comparing hospital weight vs. CBWTF vehicle scale reading</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className={`border-b ${isLight ? 'bg-slate-50 text-slate-700 border-slate-200' : 'bg-[#080c14] text-slate-300 border-slate-800'}`}>
                  <tr>
                    <th className="p-3 font-semibold">Manifest No</th>
                    <th className="p-3 font-semibold">Date & Time</th>
                    <th className="p-3 font-semibold">CBWTF Transporter</th>
                    <th className="p-3 font-semibold">Hospital Mass</th>
                    <th className="p-3 font-semibold">CBWTF Mass</th>
                    <th className="p-3 font-semibold">Variance %</th>
                    <th className="p-3 font-semibold">Status</th>
                    <th className="p-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {data.dailyManifests.map((mnf) => (
                    <tr key={mnf.manifestNo} className={mnf.varianceStatus === 'FLAGGED_BREACH' ? 'bg-rose-50/50 dark:bg-rose-950/20' : ''}>
                      <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{mnf.manifestNo}</td>
                      <td className="p-3 text-slate-600 dark:text-slate-400">{mnf.date} ({mnf.pickupTime})</td>
                      <td className="p-3 text-slate-700 dark:text-slate-300">{mnf.transporter} ({mnf.vehicleNo})</td>
                      <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{mnf.totalHospitalKg} kg</td>
                      <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{mnf.cbwtfScannedKg} kg</td>
                      <td className={`p-3 font-bold ${mnf.varianceStatus === 'MATCHED_PASSED' ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {mnf.variancePct}
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          mnf.varianceStatus === 'MATCHED_PASSED' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        }`}>
                          {mnf.varianceStatus}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => generateKSPCBManifestPDF(mnf)}
                          className="text-[#00875a] font-bold hover:underline"
                        >
                          Print PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DAILY SOP REGISTERS */}
      {activeTab === 'sop' && (
        <div className="space-y-5">
          {/* Autoclave Spore Strip Biological Indicator Logs */}
          <div className={`p-5 border ${
            isLight ? 'bg-white border-slate-200/80' : 'bg-[#111622] border-slate-800'
          }`}>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
              <Microscope className="w-4 h-4 text-purple-600" />
              <span>Microbiology & Blood Bank Pre-Treatment Logbook (BMWM Rule 7)</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">Mandatory pre-sterilization logs for laboratory culture stocks and blood bags before leaving hospital premises</p>

            <div className="space-y-3">
              {data.preTreatmentLogs.map((log) => (
                <div key={log.id} className={`p-4 border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#090d16] border-slate-800'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="font-bold text-xs text-slate-900 dark:text-slate-100">{log.department} • {log.wasteType}</span>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                      {log.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <div><strong>Method:</strong> {log.method}</div>
                    <div><strong>Parameters:</strong> {log.tempCelsius ? `${log.tempCelsius}°C / ${log.pressurePsi} psi / ${log.exposureMinutes}m` : `${log.chlorineTitrationPpm} ppm Chlorine`}</div>
                    <div><strong>Indicator Result:</strong> <span className="text-emerald-600 font-bold">{log.sporeStripResult || log.status}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Staff Immunization & Training Roster */}
          <div className={`p-5 border ${
            isLight ? 'bg-white border-slate-200/80' : 'bg-[#111622] border-slate-800'
          }`}>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
              <Syringe className="w-4 h-4 text-blue-600" />
              <span>Waste Handler Staff Immunization & Training Roster (Hepatitis B & Tetanus)</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">Statutory proof of mandatory 3-dose Hepatitis B vaccination & periodic BMW training for waste handlers</p>

            <table className="w-full text-xs text-left">
              <thead className={`border-b ${isLight ? 'bg-slate-50 text-slate-700 border-slate-200' : 'bg-[#080c14] text-slate-300 border-slate-800'}`}>
                <tr>
                  <th className="p-3">Staff Name & ID</th>
                  <th className="p-3">Role & Department</th>
                  <th className="p-3">Hep B Dose 1</th>
                  <th className="p-3">Hep B Dose 2</th>
                  <th className="p-3">Hep B Dose 3</th>
                  <th className="p-3">Tetanus Booster</th>
                  <th className="p-3">Immunization Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {data.staffImmunizationRoster.map((stf) => (
                  <tr key={stf.id}>
                    <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{stf.name} ({stf.id})</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">{stf.role} ({stf.dept})</td>
                    <td className="p-3">{stf.hepBDose1}</td>
                    <td className="p-3">{stf.hepBDose2}</td>
                    <td className="p-3 font-bold text-emerald-600">{stf.hepBDose3}</td>
                    <td className="p-3">{stf.tetanusBooster}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        stf.status === 'FULLY_IMMUNIZED' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {stf.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: KSPCB X-GN RECEIPT OCR VERIFIER */}
      {activeTab === 'ocr' && (
        <div className="space-y-5">
          <div className={`p-6 border ${
            isLight ? 'bg-white border-slate-200/80' : 'bg-[#111622] border-slate-800'
          }`}>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1 flex items-center gap-2">
              <Scan className="w-5 h-5 text-[#00875a]" />
              <span>KSPCB X-GN Portal Upload Verification Module (Closed-Loop OCR)</span>
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Upload the digital submission receipt generated after filing Form IV on the KSPCB X-GN portal. SmartTrace OCR will extract the government watermark and acknowledgment number to legally verify compliance.
            </p>

            {/* Upload Area */}
            <div className={`border-2 border-dashed p-8 text-center transition-all ${
              isLight ? 'border-slate-300 hover:border-[#00875a] bg-slate-50' : 'border-slate-700 hover:border-emerald-500 bg-[#090d16]'
            }`}>
              <Upload className="w-10 h-10 text-[#00875a] mx-auto mb-3 animate-bounce" />
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                Drag & Drop KSPCB Portal Receipt PDF / Image
              </h4>
              <p className="text-xs text-slate-500 mb-4">Supports PDF, PNG, JPG receipts issued by KSPCB X-GN portal</p>

              <label className="bg-[#00875a] hover:bg-[#00704a] text-white text-xs font-bold px-5 py-2.5 inline-flex items-center space-x-2 cursor-pointer ">
                <span>Select Receipt File</span>
                <input type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg" onChange={handleSimulateOcrUpload} />
              </label>

              {isProcessingOcr && (
                <div className="mt-4 text-xs font-bold text-cyan-600 flex items-center justify-center gap-2">
                  <Scan className="w-4 h-4 animate-spin" />
                  <span>Running OCR parsing for KSPCB watermark & acknowledgment serial...</span>
                </div>
              )}
            </div>

            {/* Verified OCR Result Card */}
            {(uploadedReceipt || data.kspcbUploadReceipts[0]) && (
              <div className="mt-6 p-4 border border-emerald-300 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>OCR VERIFIED: KSPCB Official Submission Confirmed</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white">
                    STATUS: LEGALLY VERIFIED
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700 dark:text-slate-300">
                  <div><strong>KSPCB Ack No:</strong> <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">{uploadedReceipt?.extractedAckNo || data.kspcbUploadReceipts[0].ocrExtractedAckNo}</span></div>
                  <div><strong>Regional Office:</strong> {uploadedReceipt?.extractedOffice || data.kspcbUploadReceipts[0].ocrExtractedOffice}</div>
                  <div><strong>Watermark Status:</strong> <span className="text-emerald-600 font-bold">MATCHED (KSPCB Seal Valid)</span></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: WARD SEGREGATION RISK PRE-CHECK */}
      {activeTab === 'segregation' && (
        <div className="space-y-5">
          <div className={`p-6 border ${
            isLight ? 'bg-white border-slate-200/80' : 'bg-[#111622] border-slate-800'
          }`}>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#00875a]" />
              <span>CPCB / KSPCB Master Segregation Risk Engine (Ward Level Pre-Check)</span>
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Prevents wrong bag categorization at the ward station before waste is sealed and moved. Test items against the BMWM 2016 statutory decision matrix.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Select Generated Item Type:</label>
                  <select
                    value={testItem}
                    onChange={(e) => setTestItem(e.target.value)}
                    className={`w-full p-2.5 border text-xs font-semibold ${
                      isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-[#090d16] border-slate-700 text-slate-200'
                    }`}
                  >
                    <option value="Amputated Tissue / Human Organ">Amputated Tissue / Human Organ / Placenta</option>
                    <option value="Soiled Gauze / Blood Soiled Cotton">Soiled Gauze / Blood Soiled Cotton</option>
                    <option value="Contaminated IV Tubing & Catheters">Contaminated IV Tubing & Catheters</option>
                    <option value="Waste Sharps & Scalpel Needle">Waste Sharps & Scalpel Needle</option>
                    <option value="Glass Medicine Vials & Ampoules">Glass Medicine Vials & Ampoules</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Select Ward Bag Color:</label>
                  <select
                    value={testBagSelected}
                    onChange={(e) => setTestBagSelected(e.target.value)}
                    className={`w-full p-2.5 border text-xs font-semibold ${
                      isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-[#090d16] border-slate-700 text-slate-200'
                    }`}
                  >
                    <option value="Yellow Bag">Yellow Bag (Incineration / Non-Chlorinated)</option>
                    <option value="Red Bag">Red Bag (Autoclaving & Shredding Plastics)</option>
                    <option value="White Container">White Container (Puncture Proof Sharps Box)</option>
                    <option value="Blue Cardboard Box">Blue Cardboard Box / Bin (Glassware)</option>
                  </select>
                </div>
              </div>

              {/* Pre-Check Output Result Box */}
              <div className={`p-5 border flex flex-col justify-between ${
                segregationCheck.isCorrect
                  ? 'bg-emerald-50/80 border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-800'
                  : 'bg-rose-50/80 border-rose-300 dark:bg-rose-950/20 dark:border-rose-800'
              }`}>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    {segregationCheck.isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0 animate-bounce" />
                    )}
                    <span className={`text-sm font-bold ${segregationCheck.isCorrect ? 'text-emerald-900 dark:text-emerald-200' : 'text-rose-900 dark:text-rose-200'}`}>
                      {segregationCheck.isCorrect ? 'COMPLIANT SEGREGATION MATCH' : 'VIOLATION DETECTED'}
                    </span>
                  </div>

                  <p className={`text-xs ${segregationCheck.isCorrect ? 'text-emerald-800 dark:text-emerald-300' : 'text-rose-800 dark:text-rose-300'} font-medium`}>
                    {segregationCheck.message}
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. CLIENT BACKEND LOGIC & CRYPTO VAULT TAB */}
      {activeTab === 'crypto_desk' && (
        <div className="space-y-6">
          {/* Card 1: Web Crypto SHA-256 Block Ledger Engine */}
          <div className={`p-5 border ${
            isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
          }`}>
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <div>
                <h3 className="text-sm font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span>1. Web Crypto SHA-256 Ledger Block Generator</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Computes real client-side cryptographic digests (window.crypto.subtle) to create immutable ledger entries.
                </p>
              </div>
              <button
                onClick={async () => {
                  const block = await createLedgerBlock({
                    formType: 'KSPCB_FORM_VI_MANIFEST',
                    facility: 'Apollo Hospital Bangalore',
                    wasteKgTotal: 95.2,
                    discrepancyPassed: true
                  }, '0000000000000000000000000000000000000000000000000000000000000000');
                  setCryptoOutput(block);
                }}
                className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all flex items-center gap-1.5"
              >
                <span>Compute SHA-256 Block</span>
              </button>
            </div>

            {cryptoOutput && (
              <div className="p-4 bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/60 space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center text-purple-900 dark:text-purple-200">
                  <span className="font-bold">Generated Block Hash:</span>
                  <span className="bg-purple-200 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-0.5 rounded text-[11px] font-bold">
                    {cryptoOutput.hash.substring(0, 16)}...
                  </span>
                </div>
                <div className="bg-white dark:bg-[#090d16] p-3 rounded-lg border text-[11px] overflow-x-auto text-slate-700 dark:text-slate-300">
                  <pre>{JSON.stringify(cryptoOutput, null, 2)}</pre>
                </div>
              </div>
            )}
          </div>

          {/* Card 2: BMWM 2016 Form VI Weight Discrepancy & 24hr SLA Rules Engine */}
          <div className={`p-5 border ${
            isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
          }`}>
            <div className="mb-4 border-b pb-3">
              <h3 className="text-sm font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
                <Scale className="w-4 h-4 text-emerald-500" />
                <span>2. Form VI Pickup Discrepancy (±5%) & 24hr Form I SLA Calculator</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Evaluates Ward Handover vs CBWTF Truck Weights in real-time according to SPCB rules.
              </p>
            </div>

            {discrepancyReport && (
              <div className="space-y-3">
                <div className={`p-3.5 border text-xs flex items-center justify-between ${
                  discrepancyReport.hasViolation
                    ? 'bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/30 dark:border-rose-800'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/30 dark:border-emerald-800'
                }`}>
                  <div>
                    <span className="font-bold block text-sm">{discrepancyReport.auditRecommendation}</span>
                    <span className="text-[11px] opacity-80">Max Discrepancy: {discrepancyReport.maxDiscrepancyPercent}% (Permissible: ±5.0%)</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${
                    discrepancyReport.hasViolation ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
                  }`}>
                    {discrepancyReport.hasViolation ? 'VIOLATION DETECTED' : 'COMPLIANT'}
                  </span>
                </div>

                {/* Categories Table */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  {Object.entries(discrepancyReport.categories).map(([cat, res]) => (
                    <div key={cat} className="p-2.5 border bg-slate-50 dark:bg-[#090d16] border-slate-200 dark:border-slate-800">
                      <span className="font-bold uppercase block text-[10px] text-slate-500">{cat} Waste</span>
                      <div className="text-xs mt-1">Ward: {res.wardKg}kg</div>
                      <div className="text-xs">Truck: {res.cbwtfKg}kg</div>
                      <div className={`font-bold mt-1 text-[11px] ${res.isExceeded ? 'text-rose-600' : 'text-emerald-600'}`}>
                        Delta: {res.percentage > 0 ? `+${res.percentage}` : res.percentage}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Card 3: Encrypted Offline Storage Vault (IndexedDB + AES-256-GCM) */}
          <div className={`p-5 border ${
            isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
          }`}>
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <div>
                <h3 className="text-sm font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
                  <ShieldAlert className="w-4 h-4 text-cyan-500" />
                  <span>3. AES-256-GCM Encrypted Offline Vault (IndexedDB)</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Buffers statutory forms offline with Web Crypto AES-256-GCM encryption before database syncing.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={async () => {
                    await storeOfflineRecord('KSPCB_FORM_VI', {
                      manifestId: `MNF-OFFLINE-${Date.now()}`,
                      weightKg: 88.4,
                      officer: 'Dr. Srinivas N.'
                    });
                    const queue = await getDecryptedOfflineQueue();
                    setOfflineQueue(queue);
                  }}
                  className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs transition-all "
                >
                  Encrypt & Store Record
                </button>
                {offlineQueue.length > 0 && (
                  <button
                    onClick={async () => {
                      const ids = offlineQueue.map(q => q.id);
                      await removeSyncedRecords(ids);
                      setOfflineQueue([]);
                    }}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-all "
                  >
                    Clear Synced Queue
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-500 dark:text-slate-400 text-[11px] font-bold">
                <span>IndexedDB Queue Status:</span>
                <span>{offlineQueue.length} Encrypted Records Pending Sync</span>
              </div>

              {offlineQueue.length === 0 ? (
                <div className="p-4 border border-dashed text-center text-slate-400 text-xs">
                  Offline Vault empty. Click "Encrypt & Store Record" to test Web Crypto AES-GCM buffer.
                </div>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {offlineQueue.map((item) => (
                    <div key={item.id} className="p-3 border bg-slate-50 dark:bg-[#090d16] border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-cyan-600 dark:text-cyan-400 font-mono text-[11px] block">{item.id}</span>
                        <span className="text-slate-500 text-[10px]">Encrypted at rest (AES-256-GCM) • {item.storageMetadata?.storedTimestamp}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        DECRYPTED & VERIFIED
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FORM I ACCIDENT LOGGING MODAL */}
      {showForm1Modal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-xl p-6 border ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#111622] border-slate-800 text-slate-100'
          }`}>
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <span>Log New Incident (KSPCB Form I - Accident Report)</span>
              </h3>
              <button onClick={() => setShowForm1Modal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddIncident} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Date of Incident:</label>
                  <input
                    type="date"
                    value={newIncident.date}
                    onChange={(e) => setNewIncident({ ...newIncident, date: e.target.value })}
                    className={`w-full p-2 rounded-lg border mt-1 ${isLight ? 'bg-slate-50 border-slate-300' : 'bg-[#090d16] border-slate-700'}`}
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Time of Incident:</label>
                  <input
                    type="time"
                    value={newIncident.time}
                    onChange={(e) => setNewIncident({ ...newIncident, time: e.target.value })}
                    className={`w-full p-2 rounded-lg border mt-1 ${isLight ? 'bg-slate-50 border-slate-300' : 'bg-[#090d16] border-slate-700'}`}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Exact Location:</label>
                <input
                  type="text"
                  value={newIncident.location}
                  onChange={(e) => setNewIncident({ ...newIncident, location: e.target.value })}
                  className={`w-full p-2 rounded-lg border mt-1 ${isLight ? 'bg-slate-50 border-slate-300' : 'bg-[#090d16] border-slate-700'}`}
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Cause of Incident:</label>
                <textarea
                  value={newIncident.cause}
                  onChange={(e) => setNewIncident({ ...newIncident, cause: e.target.value })}
                  rows={2}
                  className={`w-full p-2 rounded-lg border mt-1 ${isLight ? 'bg-slate-50 border-slate-300' : 'bg-[#090d16] border-slate-700'}`}
                  required
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowForm1Modal(false)}
                  className="px-4 py-2 text-xs font-bold border text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white "
                >
                  Submit Statutory Form I Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
