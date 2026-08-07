import React, { useState, useEffect } from 'react';
import DeviceFrame from './components/DeviceFrame';
import HospitalDashboard from './components/HospitalDashboard';
import ComplianceDashboard from './components/ComplianceDashboard';
import { Activity, ShieldCheck, Cpu } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState('tablet'); // 'phone', 'tablet', 'desktop'
  const [activeDashboard, setActiveDashboard] = useState('hospital'); // 'hospital' (Dashboard 2), 'compliance' (Dashboard 4)
  const [theme, setTheme] = useState('light'); // Default to 'light' theme as requested by user

  const isLight = theme === 'light';

  useEffect(() => {
    if (isLight) {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    }
  }, [isLight]);

  return (
    <DeviceFrame
      activeView={activeView}
      setActiveView={setActiveView}
      theme={theme}
      setTheme={setTheme}
    >
      <div className="space-y-4">
        {/* Navigation Bar */}
        <div className={`p-1.5 rounded-xl border flex items-center justify-between gap-2 transition-colors ${
          isLight
            ? 'bg-white border-slate-200 shadow-sm'
            : 'bg-[#111723] border-slate-800 shadow-inner'
        }`}>
          <div className="flex items-center space-x-1.5 w-full sm:w-auto">
            <button
              onClick={() => setActiveDashboard('hospital')}
              className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeDashboard === 'hospital'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/20'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Dashboard 2: Hospital</span>
            </button>

            <button
              onClick={() => setActiveDashboard('compliance')}
              className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeDashboard === 'compliance'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Dashboard 4: Compliance</span>
            </button>
          </div>

          {/* Edge Mesh Status Ticker */}
          <div className={`hidden md:flex items-center space-x-2 text-[11px] px-3 py-1 rounded-md border ${
            isLight ? 'bg-slate-50 text-slate-600 border-slate-200' : 'bg-[#090d16] text-slate-400 border-slate-800'
          }`}>
            <Cpu className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Edge Mesh: <strong>5 Units Online</strong></span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        {/* Dashboard View */}
        {activeDashboard === 'hospital' ? (
          <HospitalDashboard isLight={isLight} />
        ) : (
          <ComplianceDashboard isLight={isLight} />
        )}
      </div>
    </DeviceFrame>
  );
}
