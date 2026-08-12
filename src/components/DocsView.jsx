import React from 'react';
import { BookOpen, FileText, Download, ExternalLink, ShieldCheck, Microscope, Scale } from 'lucide-react';
import { generateKSPCBForm4PDF } from '../utils/kspcbPdfGenerator';
import { KSPCB_STATUTORY_DATA } from '../data/mockData';

export default function DocsView({ isLight }) {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className={`p-5 rounded-2xl border ${
        isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold">Documentation & Statutory SOP Guidelines Hub</h1>
            <p className="text-xs text-slate-500">Official reference manuals, BMWM Rules 2016 schedules, and KSPCB inspection compliance procedures</p>
          </div>
        </div>
      </div>

      {/* Docs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`p-5 rounded-2xl border ${
          isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
        }`}>
          <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>Bio-Medical Waste Management Rules, 2016</span>
          </h3>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            Gazette notification issued by the Ministry of Environment, Forest and Climate Change (MoEFCC) mandating color-coded segregation, barcoding, and annual return filing.
          </p>
          <button
            onClick={() => generateKSPCBForm4PDF(KSPCB_STATUTORY_DATA)}
            className="text-xs font-bold text-[#00875a] hover:underline flex items-center space-x-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Form IV Sample Template</span>
          </button>
        </div>

        <div className={`p-5 rounded-2xl border ${
          isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
        }`}>
          <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
            <Microscope className="w-4 h-4 text-purple-600" />
            <span>Microbiology Pre-Treatment & Autoclave SOP</span>
          </h3>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            Protocol requiring 121°C/15psi sterilization for lab cultures before leaving premises, including Geobacillus stearothermophilus biological spore strip test procedures.
          </p>
          <span className="text-xs text-slate-400 font-mono">SOP Ref: SOP-MICRO-2026-V3</span>
        </div>

        <div className={`p-5 rounded-2xl border ${
          isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
        }`}>
          <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
            <Scale className="w-4 h-4 text-cyan-600" />
            <span>Form VI Handover Manifest & ±5% Threshold SOP</span>
          </h3>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            Daily waste handover verification protocol between hospital BMW representative and CBWTF vehicle driver. Enforces automatic flagging for weight variances exceeding ±5%.
          </p>
          <span className="text-xs text-slate-400 font-mono">SOP Ref: SOP-MANIFEST-KSPCB-V1</span>
        </div>

        <div className={`p-5 rounded-2xl border ${
          isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
        }`}>
          <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>KSPCB X-GN Portal Upload Verification Manual</span>
          </h3>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            Instructions for uploading digital submission receipts to SmartTrace OCR engine to legally close the statutory compliance audit loop.
          </p>
          <span className="text-xs text-slate-400 font-mono">SOP Ref: SOP-KSPCB-OCR-V2</span>
        </div>
      </div>
    </div>
  );
}
