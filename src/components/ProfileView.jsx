import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserCheck, ShieldCheck, Mail, Building2, Key, CheckCircle2, Lock, Smartphone } from 'lucide-react';

export default function ProfileView({ isLight }) {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Profile Card */}
      <div className={`p-6 border ${
        isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
      }`}>
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-5 text-center sm:text-left">
          <img
            src={currentUser?.avatar}
            alt={currentUser?.name}
            className="w-20 h-20 object-cover border-2 border-cyan-500 shrink-0"
          />
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">{currentUser?.name}</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{currentUser?.department}</p>
              </div>
              <span className="px-3 py-1  text-xs font-bold bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800 self-center sm:self-start">
                {currentUser?.roleLabel}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                <Mail className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>{currentUser?.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                <Building2 className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>{currentUser?.assignedRegion || 'Apollo Super Speciality Hospital'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Permissions & Security Credentials */}
      <div className={`p-6 border ${
        isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
      }`}>
        <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
          <Key className="w-4 h-4 text-emerald-600" />
          <span>Granted Role Permissions & Hardware Security Keys</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {currentUser?.permissions?.map((perm) => (
            <div key={perm} className="p-3 bg-slate-50 dark:bg-[#090d16] border border-slate-200 dark:border-slate-800 flex items-center space-x-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-mono text-slate-700 dark:text-slate-300">{perm}</span>
            </div>
          ))}
        </div>

        <div className="p-4 bg-slate-50 dark:bg-[#090d16] border border-slate-200 dark:border-slate-800 text-xs space-y-2">
          <div className="flex items-center justify-between font-mono">
            <span className="text-slate-400">mTLS Certificate Fingerprint:</span>
            <span className="font-bold text-cyan-600">ECDSA-P256-482190A</span>
          </div>
          <div className="flex items-center justify-between font-mono">
            <span className="text-slate-400">Hardware Security Key ID:</span>
            <span className="font-bold text-emerald-600">ATECC608A-KEY-0941</span>
          </div>
        </div>
      </div>
    </div>
  );
}
