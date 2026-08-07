import React from 'react';
import { Smartphone, Tablet, Monitor, Wifi, Battery, Signal, Sun, Moon } from 'lucide-react';

export default function DeviceFrame({ activeView, setActiveView, theme, setTheme, children }) {
  const timeString = "15:56";
  const isLight = theme === 'light';

  return (
    <div className={`min-h-screen flex flex-col items-center transition-colors duration-300 ${
      isLight ? 'bg-slate-100 text-slate-900 light' : 'bg-[#070a10] text-slate-100 dark'
    }`}>
      {/* Top Viewport Selector & Theme Switcher Toolbar */}
      <header className={`w-full px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50 shadow-sm border-b transition-colors ${
        isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0e1420] border-slate-800 text-slate-100'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-600 text-white font-black text-xs flex items-center justify-center shadow-sm">
            ST
          </div>
          <div>
            <h1 className="font-bold text-sm flex items-center gap-1.5">
              SmartTrace™ Telemetry System
              <span className="bg-cyan-100 text-cyan-800 dark:bg-cyan-500/20 dark:text-cyan-400 text-[10px] px-2 py-0.5 rounded font-mono border border-cyan-300 dark:border-cyan-500/30">
                v1.0 PRD
              </span>
            </h1>
            <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Apollo Hospital • ABIOT-E-SAFE Platform
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(isLight ? 'dark' : 'light')}
            className={`p-2 rounded-lg border transition-all flex items-center space-x-1.5 text-xs font-semibold ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
            }`}
            title="Toggle Theme"
          >
            {isLight ? (
              <>
                <Moon className="w-4 h-4 text-slate-600" />
                <span className="hidden sm:inline">Dark Mode</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Light Mode</span>
              </>
            )}
          </button>

          {/* Viewport Modes */}
          <div className={`flex items-center p-1 rounded-lg border text-xs ${
            isLight ? 'bg-slate-100 border-slate-300' : 'bg-[#090d16] border-slate-800'
          }`}>
            <button
              onClick={() => setActiveView('phone')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition-all ${
                activeView === 'phone'
                  ? 'bg-cyan-600 text-white font-medium shadow-sm'
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android Phone (390px)</span>
            </button>

            <button
              onClick={() => setActiveView('tablet')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition-all ${
                activeView === 'tablet'
                  ? 'bg-cyan-600 text-white font-medium shadow-sm'
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Android Tablet (820px)</span>
            </button>

            <button
              onClick={() => setActiveView('desktop')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md transition-all ${
                activeView === 'desktop'
                  ? 'bg-cyan-600 text-white font-medium shadow-sm'
                  : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Fluid View</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main View Container */}
      <main className="w-full flex-1 flex justify-center items-start p-2 sm:p-4 md:p-6 overflow-x-auto">
        {activeView === 'phone' && (
          <div className={`w-[390px] min-h-[812px] rounded-[40px] border-[10px] shadow-2xl overflow-hidden flex flex-col relative my-2 transition-colors ${
            isLight
              ? 'bg-slate-50 border-slate-800 text-slate-900 shadow-slate-400/50'
              : 'bg-[#0c1019] border-[#1e2738] text-slate-100 shadow-[0_0_50px_rgba(0,0,0,0.8)]'
          }`}>
            {/* Android Status Bar */}
            <div className={`text-[11px] px-6 py-2 flex items-center justify-between border-b select-none ${
              isLight ? 'bg-slate-200 text-slate-700 border-slate-300' : 'bg-[#090d16] text-slate-300 border-slate-800'
            }`}>
              <span className="font-semibold">{timeString}</span>
              <div className={`w-3 h-3 rounded-full mx-auto ${isLight ? 'bg-slate-400' : 'bg-slate-800 border border-slate-700'}`} />
              <div className="flex items-center space-x-1.5">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>
            {/* Scrollable Phone Content */}
            <div className={`flex-1 overflow-y-auto overflow-x-hidden p-3 text-xs ${
              isLight ? 'bg-slate-50' : 'bg-[#0c1019]'
            }`}>
              {children}
            </div>
            {/* Navigation Bar */}
            <div className={`h-4 flex justify-center items-center py-1 ${isLight ? 'bg-slate-200' : 'bg-[#090d16]'}`}>
              <div className={`w-28 h-1 rounded-full ${isLight ? 'bg-slate-400' : 'bg-slate-600'}`} />
            </div>
          </div>
        )}

        {activeView === 'tablet' && (
          <div className={`w-[840px] min-h-[600px] rounded-[24px] border-[12px] shadow-2xl overflow-hidden flex flex-col relative my-2 transition-colors ${
            isLight
              ? 'bg-slate-50 border-slate-800 text-slate-900 shadow-slate-400/50'
              : 'bg-[#0c1019] border-[#1e2738] text-slate-100 shadow-[0_0_60px_rgba(0,0,0,0.85)]'
          }`}>
            {/* Tablet Status Bar */}
            <div className={`text-[11px] px-6 py-2 flex items-center justify-between border-b select-none ${
              isLight ? 'bg-slate-200 text-slate-700 border-slate-300' : 'bg-[#090d16] text-slate-300 border-slate-800'
            }`}>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{timeString}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${isLight ? 'bg-slate-300 text-slate-700' : 'bg-slate-800 text-slate-400'}`}>Tab Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>
            {/* Scrollable Tablet Content */}
            <div className={`flex-1 overflow-y-auto p-4 ${isLight ? 'bg-slate-50' : 'bg-[#0c1019]'}`}>
              {children}
            </div>
          </div>
        )}

        {activeView === 'desktop' && (
          <div className={`w-full max-w-7xl rounded-2xl border p-4 md:p-6 shadow-xl transition-colors ${
            isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-[#0c1019] border-slate-800 text-slate-100'
          }`}>
            {children}
          </div>
        )}
      </main>
    </div>
  );
}
