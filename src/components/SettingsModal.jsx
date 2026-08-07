import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  X,
  User,
  Shield,
  Radio,
  CheckCircle2,
  Lock,
  Cpu,
  Save,
  Key,
  ShieldCheck
} from 'lucide-react';

export default function SettingsModal({ onClose, isLight }) {
  const { currentUser, setCurrentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'rbac', 'iot'
  const [name, setName] = useState(currentUser?.name || '');
  const [department, setDepartment] = useState(currentUser?.department || '');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setCurrentUser(prev => ({ ...prev, name, department }));
    alert('Profile updated successfully!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <div className={`w-full max-w-3xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col my-auto transition-colors ${
        isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#111723] border-slate-800 text-slate-100'
      }`}>
        
        {/* Modal Header */}
        <div className={`p-4 sm:p-5 border-b flex items-center justify-between ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#090d16] border-slate-800'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl text-white shadow-md">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">System Settings & Governance</h3>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                User Profile, Role-Based Access Controls (RBAC), and IoT Cellular Edge Gateways
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl border transition-colors ${
              isLight ? 'hover:bg-slate-200 text-slate-500 border-slate-200' : 'hover:bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className={`px-4 pt-2 border-b flex space-x-2 text-xs font-bold ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#111723] border-slate-800'
        }`}>
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-2.5 px-3 border-b-2 transition-all flex items-center space-x-1.5 ${
              activeTab === 'profile'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                : isLight ? 'border-transparent text-slate-500' : 'border-transparent text-slate-400'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Account</span>
          </button>

          <button
            onClick={() => setActiveTab('rbac')}
            className={`py-2.5 px-3 border-b-2 transition-all flex items-center space-x-1.5 ${
              activeTab === 'rbac'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                : isLight ? 'border-transparent text-slate-500' : 'border-transparent text-slate-400'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>RBAC Permission Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('iot')}
            className={`py-2.5 px-3 border-b-2 transition-all flex items-center space-x-1.5 ${
              activeTab === 'iot'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                : isLight ? 'border-transparent text-slate-500' : 'border-transparent text-slate-400'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>Cellular IoT Gateway Manager</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 max-h-[60vh] overflow-y-auto">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="flex items-center space-x-4 p-3.5 rounded-xl border bg-slate-50 dark:bg-[#090d16] border-slate-200 dark:border-slate-800">
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-cyan-500"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-bold">{currentUser?.name}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-600 text-white uppercase">
                      {currentUser?.roleLabel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{currentUser?.email}</p>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:border-cyan-500 ${
                    isLight ? 'bg-slate-50 border-slate-300' : 'bg-[#090d16] border-slate-800'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-1">Department / Office</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:border-cyan-500 ${
                    isLight ? 'bg-slate-50 border-slate-300' : 'bg-[#090d16] border-slate-800'
                  }`}
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl shadow-md flex items-center space-x-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          )}

          {/* RBAC MATRIX TAB */}
          {activeTab === 'rbac' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold">Role-Based Access Control (RBAC) Governance Matrix</h4>
              
              <div className="overflow-x-auto border rounded-xl border-slate-200 dark:border-slate-800">
                <table className="w-full text-xs text-left">
                  <thead className={`text-[10px] uppercase font-bold border-b ${
                    isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#090d16] border-slate-800'
                  }`}>
                    <tr>
                      <th className="p-3">Permission / Capability</th>
                      <th className="p-3 text-center">Admin</th>
                      <th className="p-3 text-center">Staff</th>
                      <th className="p-3 text-center">Auditor</th>
                      <th className="p-3 text-center">Govt Inspector</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    <tr>
                      <td className="p-3 font-semibold">View Real-Time Machine Telemetry</td>
                      <td className="p-3 text-center text-emerald-500 font-bold">✓</td>
                      <td className="p-3 text-center text-emerald-500 font-bold">✓</td>
                      <td className="p-3 text-center text-emerald-500 font-bold">✓</td>
                      <td className="p-3 text-center text-emerald-500 font-bold">✓</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">View Compliance Dashboard 4</td>
                      <td className="p-3 text-center text-emerald-500 font-bold">✓</td>
                      <td className="p-3 text-center text-emerald-500 font-bold">✓</td>
                      <td className="p-3 text-center text-emerald-500 font-bold">✓</td>
                      <td className="p-3 text-center text-emerald-500 font-bold">✓</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Verify Cryptographic SHA-256 Hashes</td>
                      <td className="p-3 text-center text-emerald-500 font-bold">✓</td>
                      <td className="p-3 text-center text-slate-400">❌</td>
                      <td className="p-3 text-center text-emerald-500 font-bold">✓</td>
                      <td className="p-3 text-center text-emerald-500 font-bold">✓</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Download Watermarked PDF Audit Certificates</td>
                      <td className="p-3 text-center text-emerald-500 font-bold">✓</td>
                      <td className="p-3 text-center text-slate-400">❌</td>
                      <td className="p-3 text-center text-emerald-500 font-bold">✓</td>
                      <td className="p-3 text-center text-emerald-500 font-bold">✓</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Configure eSIM & Cellular Hardware Keys</td>
                      <td className="p-3 text-center text-emerald-500 font-bold">✓</td>
                      <td className="p-3 text-center text-slate-400">❌</td>
                      <td className="p-3 text-center text-slate-400">❌</td>
                      <td className="p-3 text-center text-slate-400">❌</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CELLULAR IOT TAB */}
          {activeTab === 'iot' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold">Active eSIM Cellular IoT Mesh Status</h4>
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  5/5 Edge Units Connected
                </span>
              </div>

              <div className="space-y-2">
                {[
                  { unit: 'ABIOT-SAFE-01', type: 'eSIM Cellular (LTE-M)', key: 'ATECC608A-ECDSA-KEY-0941', rssi: '-74 dBm' },
                  { unit: 'ABIOT-SAFE-02', type: 'eSIM Cellular (NB-IoT)', key: 'ATECC608A-ECDSA-KEY-1120', rssi: '-82 dBm' },
                  { unit: 'ABIOT-SAFE-03', type: 'eSIM Cellular (LTE-M)', key: 'ATECC608A-ECDSA-KEY-0892', rssi: '-68 dBm' },
                  { unit: 'ABIOT-SAFE-04', type: 'Fallback WPA3 Wi-Fi', key: 'ATECC608A-ECDSA-KEY-0711', rssi: '-70 dBm' },
                  { unit: 'ABIOT-SAFE-05', type: 'eSIM Cellular (NB-IoT)', key: 'ATECC608A-ECDSA-KEY-0012', rssi: '-79 dBm' }
                ].map((iot) => (
                  <div
                    key={iot.unit}
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#090d16] border-slate-800'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Radio className="w-4 h-4 text-cyan-500 animate-pulse" />
                      <div>
                        <span className="font-bold">{iot.unit}</span>
                        <span className="text-[10px] text-slate-500 block">{iot.type}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-[10px] text-purple-400 font-bold block">{iot.key}</span>
                      <span className="text-[10px] text-emerald-500 font-semibold">{iot.rssi}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
