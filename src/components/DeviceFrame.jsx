import React, { useState } from 'react';
import { Smartphone, Tablet, Monitor, Sun, Moon, Signal, Wifi, Battery, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SettingsModal from './SettingsModal';

export default function DeviceFrame({ activeView, setActiveView, theme, setTheme, children }) {
  const isLight = theme === 'light';
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col items-center transition-colors duration-300 ${
      isLight ? 'bg-slate-100 text-slate-900 light' : 'bg-[#070a10] text-slate-100 dark'
    }`}>
      {/* Top Header Bar matching reference image */}
      <header className={`w-full px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40 border-b shadow-xs transition-colors ${
        isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#0e1420] border-slate-800 text-slate-100'
      }`}>
        {/* Left Branding */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-[#00a896] text-white font-bold text-xs sm:text-sm flex items-center justify-center shadow-sm">
            ST
          </div>
          <div>
            <h1 className="font-bold text-sm sm:text-base flex items-center gap-2 text-slate-800 dark:text-slate-100">
              <span>SmartTrace™ Telemetry System</span>
              <span className="bg-[#cff4fc] text-[#00838f] dark:bg-cyan-950 dark:text-cyan-300 text-[10px] px-2 py-0.5 rounded font-mono font-bold border border-cyan-200 dark:border-cyan-800">
                v1.0 PRD
              </span>
            </h1>
            <p className={`text-[11px] ${isLight ? 'text-slate-400 font-medium' : 'text-slate-400'}`}>
              Apollo Hospital • ABIOT-E-SAFE Platform
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-3">
          {/* Dark Mode Toggle Button */}
          <button
            onClick={() => setTheme(isLight ? 'dark' : 'light')}
            className={`px-3.5 py-1.5 rounded-xl border transition-all flex items-center space-x-2 text-xs font-semibold shadow-xs ${
              isLight
                ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
            }`}
            title="Toggle Theme"
          >
            {isLight ? (
              <>
                <Moon className="w-4 h-4 text-slate-600" />
                <span>Dark Mode</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Light Mode</span>
              </>
            )}
          </button>



          {/* Settings & Logout */}
          {isAuthenticated && (
            <div className="flex items-center space-x-1.5 pl-2 border-l border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setShowSettings(true)}
                className={`p-1.5 rounded-lg border transition-all text-xs ${
                  isLight ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                }`}
                title="Settings"
              >
                <Settings className="w-4 h-4 text-cyan-500" />
              </button>
              <button
                onClick={logout}
                className="px-3 py-1.5 rounded-xl border border-rose-300 dark:border-rose-800/60 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-all text-xs font-bold flex items-center space-x-1.5"
                title="Sign Out / Switch Role"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Switch Role</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full flex-1 flex flex-col items-center p-2 sm:p-6 transition-all duration-300 overflow-x-hidden">
        <div className={`w-full transition-all duration-300 overflow-x-hidden ${
          activeView === 'phone'
            ? 'w-full md:max-w-[410px] rounded-none md:rounded-[32px] border-0 md:border-[12px] border-[#131c2e] shadow-none md:shadow-2xl bg-white dark:bg-[#0b0f19] my-0 md:my-2'
            : activeView === 'tablet'
            ? 'w-full md:max-w-[850px] rounded-none md:rounded-[32px] border-0 md:border-[12px] border-[#131c2e] shadow-none md:shadow-2xl bg-white dark:bg-[#0b0f19] my-0 md:my-2'
            : 'max-w-7xl'
        }`}>
          {/* Simulated Device Status Bar - Only on larger desktop testing screens */}
          {activeView !== 'desktop' && (
            <div className="hidden md:flex bg-[#131c2e] text-slate-300 px-6 py-2 items-center justify-between text-xs font-mono select-none">
              <div className="flex items-center space-x-2">
                <span className="font-sans font-bold text-xs text-slate-200">15:56</span>
                <span className="bg-slate-700/50 text-slate-300 text-[10px] px-2 py-0.5 rounded font-sans font-semibold font-mono">Tab Active</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Signal className="w-3.5 h-3.5" />
                <Wifi className="w-3.5 h-3.5" />
                <Battery className="w-4 h-4" />
              </div>
            </div>
          )}

          <div className="p-3 sm:p-6 bg-slate-50/60 dark:bg-[#0b0f19] overflow-x-hidden">
            {children}
          </div>
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


