import React, { useState } from 'react';
import { Smartphone, Tablet, Monitor, Wifi, Battery, Signal, Sun, Moon, Settings, LogOut, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SettingsModal from './SettingsModal';

export default function DeviceFrame({ activeView, setActiveView, theme, setTheme, children }) {
  const timeString = "16:15";
  const isLight = theme === 'light';
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col items-center transition-colors duration-300 ${
      isLight ? 'bg-slate-100 text-slate-900 light' : 'bg-[#070a10] text-slate-100 dark'
    }`}>
      {/* Top Viewport Selector & User Bar */}
      <header className={`w-full px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-40 shadow-sm border-b transition-colors ${
        isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0e1420] border-slate-800 text-slate-100'
      }`}>
        {/* Branding */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white font-black text-xs flex items-center justify-center shadow-md shadow-cyan-600/20">
            ST
          </div>
          <div>
            <h1 className="font-bold text-sm flex items-center gap-1.5">
              SmartTrace™ Web Platform
              <span className="bg-cyan-100 text-cyan-800 dark:bg-cyan-500/20 dark:text-cyan-400 text-[10px] px-2 py-0.5 rounded font-mono border border-cyan-300 dark:border-cyan-500/30">
                v2.8 Mobile Web
              </span>
            </h1>
            <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Apollo Hospital • Government Audit Portal
            </p>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center space-x-2">
          {/* User Profile Badge */}
          {isAuthenticated && currentUser && (
            <div className={`hidden sm:flex items-center space-x-2.5 px-3 py-1 rounded-xl border ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#090d16] border-slate-800'
            }`}>
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover border border-slate-300 dark:border-slate-700"
              />
              <div className="text-left leading-none">
                <div className="flex items-center space-x-1">
                  <span className="text-xs font-bold">{currentUser.name}</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-cyan-600 text-white uppercase">
                    {currentUser.role}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500">{currentUser.department}</span>
              </div>
            </div>
          )}

          {/* Settings Button */}
          {isAuthenticated && (
            <button
              onClick={() => setShowSettings(true)}
              className={`p-2 rounded-xl border transition-all flex items-center text-xs font-semibold ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
              }`}
              title="Open Settings"
            >
              <Settings className="w-4 h-4 text-cyan-500" />
            </button>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(isLight ? 'dark' : 'light')}
            className={`p-2 rounded-xl border transition-all flex items-center space-x-1.5 text-xs font-semibold ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
            }`}
            title="Toggle Theme"
          >
            {isLight ? (
              <Moon className="w-4 h-4 text-slate-600" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Logout Button */}
          {isAuthenticated && (
            <button
              onClick={logout}
              className="p-2 rounded-xl border border-rose-300 dark:border-rose-800/60 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-all text-xs font-semibold"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}

          {/* Viewport Modes */}
          <div className={`hidden md:flex items-center p-1 rounded-xl border text-xs ${
            isLight ? 'bg-slate-100 border-slate-300' : 'bg-[#090d16] border-slate-800'
          }`}>
            <button
              onClick={() => setActiveView('phone')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg transition-all ${
                activeView === 'phone'
                  ? 'bg-cyan-600 text-white font-medium shadow-sm'
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>

            <button
              onClick={() => setActiveView('tablet')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg transition-all ${
                activeView === 'tablet'
                  ? 'bg-cyan-600 text-white font-medium shadow-sm'
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Tablet</span>
            </button>

            <button
              onClick={() => setActiveView('desktop')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg transition-all ${
                activeView === 'desktop'
                  ? 'bg-cyan-600 text-white font-medium shadow-sm'
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Fluid</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main View Container */}
      <main className="w-full flex-1 flex flex-col items-center p-3 sm:p-6 transition-all duration-300">
        <div className={`w-full transition-all duration-300 ${
          activeView === 'phone'
            ? 'max-w-[410px] rounded-[36px] border-[8px] border-slate-800 dark:border-slate-700 shadow-2xl p-4 min-h-[780px] bg-slate-50 dark:bg-[#0b0f19] my-2'
            : activeView === 'tablet'
            ? 'max-w-[860px] rounded-[24px] border-[6px] border-slate-800 dark:border-slate-700 shadow-2xl p-5 min-h-[820px] bg-slate-50 dark:bg-[#0b0f19] my-2'
            : 'max-w-7xl'
        }`}>
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
