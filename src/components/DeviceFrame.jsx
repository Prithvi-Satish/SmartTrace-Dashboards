import React, { useState } from 'react';
import { Smartphone, Tablet, Monitor, Sun, Moon, Signal, Wifi, Battery, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SettingsModal from './SettingsModal';
import { APP_VERSION } from '../config/version';

export default function DeviceFrame({ activeView, setActiveView, theme, setTheme, onToggleSidebar, children }) {
  const isLight = theme === 'light';
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col items-center transition-colors duration-300 ${isLight ? 'bg-slate-100 text-slate-900 light' : 'bg-[#070a10] text-slate-100 dark'
      }`}>
      {/* Top Header Bar matching reference image */}
      <header className={`w-full px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40 border-b transition-colors ${isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#0e1420] border-slate-800 text-slate-100'
        }`}>
        {/* Left Branding */}
        <div className="flex items-center space-x-3">
          {/* Hamburger Menu Toggle */}
          <button
            onClick={onToggleSidebar}
            className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            title="Open Navigation Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="w-9 h-9  bg-[#00a896] text-white font-bold text-xs sm:text-sm flex items-center justify-center ">
            ST
          </div>
          <div>
            <h1 className="font-bold text-sm sm:text-base flex items-center gap-2 text-slate-800 dark:text-slate-100">
              <span>SmartTrace™ Telemetry System</span>
              <span className="bg-cyan-100 text-cyan-800 text-[10px] px-1.5 py-0.5 rounded font-mono ml-2 dark:bg-cyan-900/30 dark:text-cyan-300">
                v{APP_VERSION}
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">ABIOT-E-SAFE Platform</p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-3">
          {/* Optionally kept a CPU status indicator if needed, else left empty since user asked to remove settings/theme/role toggles */}
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full flex-1 flex flex-col transition-all duration-300 overflow-x-hidden">
        <div className="w-full h-full flex-1 flex flex-col bg-slate-50/60 dark:bg-[#0b0f19]">
          {children}
        </div>
      </main>

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
          isLight={isLight}
        />
      )}
    </div>
  );
}


