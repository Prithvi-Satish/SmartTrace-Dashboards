import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import DeviceFrame from './components/DeviceFrame';
import ComplianceDashboard from './components/ComplianceDashboard';
import AuthScreen from './components/AuthScreen';
import { ShieldCheck, Cpu, Lock, UserCheck } from 'lucide-react';

function DashboardContent({ activeView, setActiveView, theme, setTheme }) {
  const { isAuthenticated, currentUser } = useAuth();
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

  if (!isAuthenticated) {
    return <AuthScreen isLight={isLight} />;
  }

  return (
    <DeviceFrame
      activeView={activeView}
      setActiveView={setActiveView}
      theme={theme}
      setTheme={setTheme}
    >
      <div className="space-y-4">
        {/* Navigation Bar - Focused on Dashboard 4 & eSIM Mesh Ticker */}
        <div className={`p-2 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-2 transition-colors ${
          isLight
            ? 'bg-white border-slate-200 shadow-sm'
            : 'bg-[#111723] border-slate-800 shadow-inner'
        }`}>
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <div className="flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20">
              <ShieldCheck className="w-4 h-4" />
              <span>Dashboard 4: Government Compliance & Audit Portal</span>
            </div>
          </div>

          {/* Edge Mesh Status Ticker */}
          <div className={`flex items-center space-x-2 text-[11px] px-3 py-1.5 rounded-lg border ${
            isLight ? 'bg-slate-50 text-slate-700 border-slate-200' : 'bg-[#090d16] text-slate-300 border-slate-800'
          }`}>
            <Cpu className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Cellular eSIM Mesh: <strong className="text-emerald-600 dark:text-emerald-400">5 Units Connected & Signed</strong></span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        {/* Dashboard 4 View */}
        <ComplianceDashboard isLight={isLight} />
      </div>
    </DeviceFrame>
  );
}

export default function App() {
  const [activeView, setActiveView] = useState('tablet'); // 'phone', 'tablet', 'desktop'
  const [theme, setTheme] = useState('light');

  return (
    <AuthProvider>
      <DashboardContent
        activeView={activeView}
        setActiveView={setActiveView}
        theme={theme}
        setTheme={setTheme}
      />
    </AuthProvider>
  );
}
