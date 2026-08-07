import React, { useState } from 'react';
import { useAuth, DEMO_USERS } from '../context/AuthContext';
import { ShieldCheck, Lock, Mail, ArrowRight, Activity, CheckCircle2, UserCheck } from 'lucide-react';

export default function AuthScreen({ isLight }) {
  const { loginAs, loginWithCredentials } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedDemoRole, setSelectedDemoRole] = useState(DEMO_USERS[0].id);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    loginWithCredentials(email, password);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors ${
      isLight
        ? 'bg-slate-100 text-slate-900'
        : 'bg-[#090d16] text-slate-100'
    }`}>
      {/* Container */}
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
        
        {/* Left Panel - Branding & Security Statement */}
        <div className={`lg:col-span-5 p-8 flex flex-col justify-between relative overflow-hidden ${
          isLight
            ? 'bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700 text-white'
            : 'bg-gradient-to-br from-cyan-950 via-slate-900 to-indigo-950 text-white border-r border-slate-800'
        }`}>
          {/* Decorative background glow */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center space-x-2.5 mb-6">
              <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                <ShieldCheck className="w-7 h-7 text-cyan-300" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight">SmartTrace™</h1>
                <p className="text-[11px] text-cyan-100 font-medium">Compliance & Audit Portal</p>
              </div>
            </div>

            <h2 className="text-2xl font-black leading-tight mb-3">
              Tamper-Proof Medical Waste Audit System
            </h2>
            <p className="text-xs text-cyan-100/90 leading-relaxed mb-6">
              End-to-End Cryptographic SHA-256 Hash Chain verification ensuring uncompromised data integrity from hospital machine generation to government medical board audit.
            </p>
          </div>

          <div className="relative z-10 space-y-2.5 pt-6 border-t border-white/10">
            <div className="flex items-center space-x-2 text-xs text-cyan-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Cellular eSIM IoT Direct Cloud Telemetry</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-cyan-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>CPCB BMW 2016 & NABH Compliance Verified</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-cyan-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Watermarked PDF Audit Certificates</span>
            </div>
          </div>
        </div>

        {/* Right Panel - Login & Quick Demo Account Selection */}
        <div className={`lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between ${
          isLight ? 'bg-white' : 'bg-[#111723]'
        }`}>
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-bold">Sign In to Dashboard</h3>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Select a pre-configured role account below or enter credentials.
              </p>
            </div>

            {/* Quick Demo Role Cards */}
            <div className="mb-6">
              <label className={`text-xs font-bold block mb-2 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                Quick Demo Role Login:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {DEMO_USERS.map((user) => {
                  const isSelected = selectedDemoRole === user.id;
                  return (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => {
                        setSelectedDemoRole(user.id);
                        setEmail(user.email);
                      }}
                      className={`p-3 rounded-xl border text-left flex items-start space-x-3 transition-all ${
                        isSelected
                          ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/30 ring-2 ring-cyan-500/20'
                          : isLight
                          ? 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                          : 'border-slate-800 bg-[#090d16] hover:bg-slate-900'
                      }`}
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-9 h-9 rounded-full object-cover shrink-0 border border-slate-300 dark:border-slate-700"
                      />
                      <div className="overflow-hidden">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider block w-max mb-0.5 ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300' :
                          user.role === 'inspector' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' :
                          user.role === 'auditor' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' :
                          'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300'
                        }`}>
                          {user.roleLabel}
                        </span>
                        <h4 className="text-xs font-bold truncate">{user.name}</h4>
                        <p className={`text-[10px] truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                          {user.department}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className={`text-xs font-semibold block mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail className={`w-4 h-4 absolute left-3 top-3 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@smarttrace.med"
                    className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border focus:outline-none focus:border-cyan-500 ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-[#090d16] border-slate-800 text-slate-100'
                    }`}
                    required
                  />
                </div>
              </div>

              <div>
                <label className={`text-xs font-semibold block mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Password
                </label>
                <div className="relative">
                  <Lock className={`w-4 h-4 absolute left-3 top-3 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border focus:outline-none focus:border-cyan-500 ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-[#090d16] border-slate-800 text-slate-100'
                    }`}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => loginAs(selectedDemoRole)}
                  className="flex-1 py-2.5 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-600/20 flex items-center justify-center space-x-2 transition-all"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Login with Selected Role</span>
                </button>

                <button
                  type="submit"
                  className={`py-2.5 px-4 font-bold text-xs rounded-xl border flex items-center justify-center transition-all ${
                    isLight ? 'border-slate-300 hover:bg-slate-100 text-slate-800' : 'border-slate-700 hover:bg-slate-800 text-slate-200'
                  }`}
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
            <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              SmartTrace™ Security Gateway v2.4 • Secured via mTLS & Hardware ECDSA Keys
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
