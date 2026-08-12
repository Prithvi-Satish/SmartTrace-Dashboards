import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Lock, Mail, ArrowRight, CheckCircle2, Smartphone, Tablet, Monitor, Sun, Moon } from 'lucide-react';

export default function AuthScreen({ isLight, activeView, setActiveView, theme, setTheme }) {
  const { loginWithCredentials } = useAuth();
  const [email, setEmail] = useState('admin@smarttrace.med');
  const [password, setPassword] = useState('admin');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
    loginWithCredentials(email, password);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors ${
      isLight ? 'bg-slate-100 text-slate-900' : 'bg-[#090d16] text-slate-100'
    }`}>

      {/* Ultra-Minimal Clean Login Container */}
      <div className={`w-full max-w-md p-8 rounded-3xl shadow-2xl border ${
        isLight ? 'bg-white border-slate-200/90' : 'bg-[#111723] border-slate-800 text-slate-100'
      }`}>
        {/* Brand Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00875a] to-cyan-500 text-white font-black text-lg flex items-center justify-center shadow-md shrink-0">
            ST
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">SmartTrace™</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Statutory Compliance & Telemetry Gateway</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Sign In to Your Account</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Enter your credentials to access your organization dashboard.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {errorMessage}
          </div>
        )}

        {/* Minimal Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold block mb-1.5 text-slate-700 dark:text-slate-300">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 dark:text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@smarttrace.med"
                className={`w-full pl-10 pr-4 py-3 text-xs rounded-xl border font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-[#00875a] ${
                  isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-[#090d16] border-slate-800 text-slate-100'
                }`}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold block mb-1.5 text-slate-700 dark:text-slate-300">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 dark:text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className={`w-full pl-10 pr-4 py-3 text-xs rounded-xl border font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-[#00875a] ${
                  isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-[#090d16] border-slate-800 text-slate-100'
                }`}
                required
              />
            </div>
          </div>

          {/* Prominent Clean Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-[#00875a] hover:bg-[#00704a] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-600/20 flex items-center justify-center space-x-2 transition-all cursor-pointer mt-2"
          >
            <span>Sign In to Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-[11px] text-slate-400">
            BMWM Rules 2016 • KSPCB & CPCB Security Gateway
          </p>
        </div>
      </div>
    </div>
  );
}
