import React from 'react';
import { ShieldCheck, Cpu, Lock, Globe, FileCheck, CheckCircle2, Award, Zap, Server, Activity, ArrowUpRight } from 'lucide-react';
import { APP_VERSION } from '../config/version';

export default function AboutView({ isLight }) {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className={`p-6 border ${
        isLight ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 text-white' : 'bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 text-white border-slate-800'
      }`}>
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-white/10 backdrop-blur-md border border-white/20 shrink-0">
            <ShieldCheck className="w-8 h-8 text-cyan-300" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">SmartTrace™ Telemetry System</h1>
              <span className="bg-cyan-400/20 text-cyan-200 text-xs px-2.5 py-0.5 rounded-full font-mono font-bold border border-cyan-300/30">
                {APP_VERSION} Production Architecture
              </span>
            </div>
            <p className="text-xs text-cyan-100/90 leading-relaxed max-w-3xl">
              Next-Generation Internet of Things (IoT) Sterilization Engine & Statutory Bio-Medical Waste Compliance Platform. Purpose-built to replace legacy manual compliance consultants across Indian healthcare facilities under BMWM Rules, 2016.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-white/10 text-xs">
          <div>
            <span className="text-cyan-200 block text-[10px] font-bold uppercase">IoT Edge Network</span>
            <span className="font-bold text-sm">eSIM LTE-M / NB-IoT</span>
          </div>
          <div>
            <span className="text-cyan-200 block text-[10px] font-bold uppercase">Security Protocol</span>
            <span className="font-bold text-sm">SHA-256 Hash Chain</span>
          </div>
          <div>
            <span className="text-cyan-200 block text-[10px] font-bold uppercase">Statutory Board</span>
            <span className="font-bold text-sm">KSPCB / CPCB Verified</span>
          </div>
          <div>
            <span className="text-cyan-200 block text-[10px] font-bold uppercase">Discrepancy Engine</span>
            <span className="font-bold text-sm">±5% Weight Threshold</span>
          </div>
        </div>
      </div>

      {/* Core Architectural Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-5 border ${
          isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
        }`}>
          <div className="w-9 h-9 bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-400 flex items-center justify-center mb-3">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold mb-1">1. IoT Machine Digital Twin</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Real-time telemetry tracking temperature, negative vacuum pressure, vaporized H₂O₂ ppm, and AI camera bag integrity validation every 5 seconds.
          </p>
        </div>

        <div className={`p-5 border ${
          isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
        }`}>
          <div className="w-9 h-9 bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center mb-3">
            <FileCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold mb-1">2. Statutory KSPCB Forms Center</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Auto-compiles 365 days of waste logs into Form IV Annual Returns, manages Form I 24-hour accident SLAs, and verifies Form VI pickup manifests.
          </p>
        </div>

        <div className={`p-5 border ${
          isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
        }`}>
          <div className="w-9 h-9 bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400 flex items-center justify-center mb-3">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold mb-1">3. Cryptographic Chain of Custody</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Tamper-proof ledger chaining machine cycles with hardware ECDSA cryptographic signatures for legal auditor proof.
          </p>
        </div>
      </div>

      {/* System Specifications Sheet */}
      <div className={`p-5 border ${
        isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
      }`}>
        <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
          <Server className="w-4 h-4 text-cyan-600" />
          <span>Platform Operational Specifications</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-[#090d16] border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400 block font-semibold mb-1">REGULATORY COMPLIANCE</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">BMWM Rules 2016 • KSPCB Guidelines</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-[#090d16] border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400 block font-semibold mb-1">WEIGHT MATCHING ENGINE</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">±5% Threshold Variance Warning</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-[#090d16] border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400 block font-semibold mb-1">HARDWARE INTEGRATION</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">Bluetooth Scale & GS1 2D Barcodes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
