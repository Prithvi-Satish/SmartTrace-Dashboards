import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Gauge,
  Layers,
  Flame,
  RefreshCw,
  Zap,
  Bell,
  Thermometer
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  INITIAL_MACHINES,
  HOURLY_WASTE_DATA,
  MACHINE_UTILIZATION_DATA,
  ALARMS_FEED
} from '../data/mockData';

export default function HospitalDashboard({ isLight }) {
  const [machines, setMachines] = useState(INITIAL_MACHINES);
  const [alarms, setAlarms] = useState(ALARMS_FEED);
  const [filterDepartment, setFilterDepartment] = useState('All');

  // Department list
  const departments = ['All', 'Central Sterilization', 'Intensive Care Unit', 'Surgical Suite', 'Oncology & Chemo Unit', 'Trauma & Emergency'];

  const filteredMachines = filterDepartment === 'All'
    ? machines
    : machines.filter(m => m.department === filterDepartment);

  const runningCount = machines.filter(m => m.status === 'Running').length;
  const alarmCount = machines.filter(m => m.status === 'Alarm').length;
  const idleCount = machines.filter(m => m.status === 'Idle').length;

  const handleAcknowledgeAlarm = (id) => {
    setAlarms(prev => prev.map(a => a.id === id ? { ...a, status: 'Acknowledged' } : a));
  };

  return (
    <div className="space-y-5">
      {/* Sub-header & Quick Filters */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border shadow-sm ${
        isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
      }`}>
        <div>
          <h2 className="text-base font-bold flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            Dashboard 2: Hospital Fleet Operations
          </h2>
          <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Live operational telemetry across deployed ABIOT-E-SAFE units
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <label className={`text-xs ${isLight ? 'text-slate-600 font-medium' : 'text-slate-400'}`}>Dept Filter:</label>
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className={`text-xs rounded-lg px-2.5 py-1.5 border focus:outline-none focus:border-cyan-500 ${
              isLight ? 'bg-slate-50 text-slate-900 border-slate-300' : 'bg-[#090d16] text-slate-200 border-slate-700'
            }`}
          >
            {departments.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Today's Cycles */}
        <div className={`p-4 rounded-xl border flex flex-col justify-between shadow-sm transition-all ${
          isLight ? 'bg-white border-slate-200 text-slate-900' : 'glass-card border-slate-800 text-slate-100'
        }`}>
          <div className={`flex items-center justify-between text-xs ${isLight ? 'text-slate-500 font-medium' : 'text-slate-400'}`}>
            <span>Today's Cycles</span>
            <RefreshCw className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
          </div>
          <div className="mt-2 flex items-baseline justify-between gap-1 flex-wrap">
            <span className="text-2xl font-black">82</span>
            <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-300 dark:border-emerald-500/20">
              +14% vs yesterday
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-cyan-600 dark:bg-cyan-500 h-full w-[82%]" />
          </div>
        </div>

        {/* Total Waste Processed */}
        <div className={`p-4 rounded-xl border flex flex-col justify-between shadow-sm transition-all ${
          isLight ? 'bg-white border-slate-200 text-slate-900' : 'glass-card border-slate-800 text-slate-100'
        }`}>
          <div className={`flex items-center justify-between text-xs ${isLight ? 'text-slate-500 font-medium' : 'text-slate-400'}`}>
            <span>Waste Processed</span>
            <Flame className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          </div>
          <div className="mt-2 flex items-baseline justify-between gap-1 flex-wrap">
            <span className="text-2xl font-black">1,105 <span className={`text-xs font-normal ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>kg</span></span>
            <span className="text-[10px] font-semibold text-cyan-700 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-300 dark:border-cyan-500/20">
              Target: 1.2T
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-amber-500 h-full w-[92%]" />
          </div>
        </div>

        {/* Fleet Status */}
        <div className={`p-4 rounded-xl border flex flex-col justify-between shadow-sm transition-all ${
          isLight ? 'bg-white border-slate-200 text-slate-900' : 'glass-card border-slate-800 text-slate-100'
        }`}>
          <div className={`flex items-center justify-between text-xs ${isLight ? 'text-slate-500 font-medium' : 'text-slate-400'}`}>
            <span>Active Machines</span>
            <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          </div>
          <div className="mt-2 flex items-center space-x-2">
            <span className="text-2xl font-black">{runningCount}/{machines.length}</span>
            <div className="flex flex-col text-[10px]">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{runningCount} Running</span>
              <span className="text-rose-600 dark:text-rose-400 font-bold">{alarmCount} Alarm</span>
            </div>
          </div>
          <div className="flex h-1.5 rounded-full overflow-hidden mt-3 bg-slate-200 dark:bg-slate-800">
            <div className="bg-emerald-500" style={{ width: `${(runningCount/machines.length)*100}%` }} />
            <div className="bg-rose-500" style={{ width: `${(alarmCount/machines.length)*100}%` }} />
            <div className="bg-slate-400 dark:bg-slate-600" style={{ width: `${(idleCount/machines.length)*100}%` }} />
          </div>
        </div>

        {/* Consumable Levels */}
        <div className={`p-4 rounded-xl border flex flex-col justify-between shadow-sm transition-all ${
          isLight ? 'bg-white border-slate-200 text-slate-900' : 'glass-card border-slate-800 text-slate-100'
        }`}>
          <div className={`flex items-center justify-between text-xs ${isLight ? 'text-slate-500 font-medium' : 'text-slate-400'}`}>
            <span>H₂O₂ Consumables</span>
            <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black">74%</span>
            <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Avg Cassette Life</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-purple-600 dark:bg-purple-500 h-full w-[74%]" />
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Hourly Treatment Volume */}
        <div className={`p-4 rounded-xl border shadow-sm ${
          isLight ? 'bg-white border-slate-200' : 'glass-panel border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-xs font-bold flex items-center gap-1.5 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
              <Activity className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              Hourly Waste Processing (kg)
            </h3>
            <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${isLight ? 'bg-slate-100 text-slate-600' : 'bg-slate-800 text-slate-400'}`}>Today</span>
          </div>
          <div className="h-48 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={HOURLY_WASTE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="wasteGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isLight ? "#0284c7" : "#06b6d4"} stopOpacity={0.4}/>
                    <stop offset="95%" stopColor={isLight ? "#0284c7" : "#06b6d4"} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isLight ? "#e2e8f0" : "#1e293b"} />
                <XAxis dataKey="time" stroke={isLight ? "#64748b" : "#64748b"} tick={{ fontSize: 10 }} />
                <YAxis stroke={isLight ? "#64748b" : "#64748b"} tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: isLight ? '#ffffff' : '#0f172a', borderColor: isLight ? '#cbd5e1' : '#334155', color: isLight ? '#0f172a' : '#f8fafc', borderRadius: '8px', fontSize: '11px' }} />
                <Area type="monotone" dataKey="wasteKg" stroke={isLight ? "#0284c7" : "#06b6d4"} strokeWidth={2} fillOpacity={1} fill="url(#wasteGrad)" name="Waste (kg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Machine Utilization & Downtime */}
        <div className={`p-4 rounded-xl border shadow-sm ${
          isLight ? 'bg-white border-slate-200' : 'glass-panel border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-xs font-bold flex items-center gap-1.5 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
              <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              Machine Utilization vs Downtime (%)
            </h3>
            <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${isLight ? 'bg-slate-100 text-slate-600' : 'bg-slate-800 text-slate-400'}`}>Shift 1</span>
          </div>
          <div className="h-48 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MACHINE_UTILIZATION_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isLight ? "#e2e8f0" : "#1e293b"} />
                <XAxis dataKey="machine" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: isLight ? '#ffffff' : '#0f172a', borderColor: isLight ? '#cbd5e1' : '#334155', color: isLight ? '#0f172a' : '#f8fafc', borderRadius: '8px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="running" name="Running %" stackId="a" fill="#10b981" />
                <Bar dataKey="idle" name="Idle %" stackId="a" fill="#94a3b8" />
                <Bar dataKey="downtime" name="Downtime %" stackId="a" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Machine Fleet Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-sm font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>
            <Gauge className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            Machine Telemetry & Real-Time State ({filteredMachines.length})
          </h3>
          <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Live sensor telemetry</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {filteredMachines.map((machine) => (
            <div
              key={machine.id}
              className={`p-4 rounded-xl border shadow-sm relative transition-all ${
                machine.status === 'Alarm'
                  ? isLight ? 'border-rose-300 bg-rose-50/50' : 'border-rose-500/50 bg-rose-950/10'
                  : machine.status === 'Running'
                  ? isLight ? 'border-emerald-300 bg-emerald-50/20' : 'border-emerald-500/30'
                  : isLight ? 'bg-white border-slate-200' : 'glass-card border-slate-800'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-cyan-700 dark:text-cyan-400">{machine.id}</span>
                  <h4 className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>{machine.name}</h4>
                  <p className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{machine.location}</p>
                </div>

                {/* Status Badge */}
                <div className="flex items-center space-x-1.5">
                  <span className={`w-2 h-2 rounded-full ${
                    machine.status === 'Running' ? 'bg-emerald-500 animate-pulse-glow' :
                    machine.status === 'Alarm' ? 'bg-rose-500 animate-pulse' :
                    machine.status === 'Idle' ? 'bg-slate-400' : 'bg-amber-500'
                  }`} />
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    machine.status === 'Running' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30' :
                    machine.status === 'Alarm' ? 'bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/30' :
                    machine.status === 'Idle' ? 'bg-slate-100 text-slate-700 border border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700' :
                    'bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30'
                  }`}>
                    {machine.status}
                  </span>
                </div>
              </div>

              {/* Progress Bar for Running Cycle */}
              {machine.status === 'Running' && (
                <div className={`mt-3 p-2 rounded-lg border ${
                  isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-900/80 border-slate-800'
                }`}>
                  <div className="flex justify-between text-[10px] font-medium mb-1">
                    <span className="font-bold text-cyan-700 dark:text-cyan-400">{machine.phase}</span>
                    <span className={isLight ? 'text-slate-600' : 'text-slate-300'}>Rem: {machine.cycleTimeRemaining} ({machine.progressPct}%)</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-600 dark:bg-cyan-400 h-full transition-all duration-500" style={{ width: `${machine.progressPct}%` }} />
                  </div>
                </div>
              )}

              {/* Telemetry Sensor Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mt-3 pt-3 border-t border-slate-200 dark:border-slate-800/80 text-center">
                <div className={`p-1.5 rounded border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#0a0e17] border-slate-800/60'}`}>
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 block font-semibold">TEMP</span>
                  <span className={`text-xs font-bold ${machine.temperature > 62 ? 'text-rose-600 dark:text-rose-400' : isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                    {machine.temperature > 0 ? `${machine.temperature}°C` : 'N/A'}
                  </span>
                </div>

                <div className={`p-1.5 rounded border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#0a0e17] border-slate-800/60'}`}>
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 block font-semibold">PRESS</span>
                  <span className={`text-xs font-bold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                    {machine.pressure !== 0 ? `${machine.pressure}kPa` : '0'}
                  </span>
                </div>

                <div className={`p-1.5 rounded border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#0a0e17] border-slate-800/60'}`}>
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 block font-semibold">H₂O₂</span>
                  <span className="text-xs font-bold text-purple-700 dark:text-purple-300">
                    {machine.h2o2 > 0 ? `${machine.h2o2}ppm` : '0'}
                  </span>
                </div>

                <div className={`p-1.5 rounded border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#0a0e17] border-slate-800/60'}`}>
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 block font-semibold">BAG ID</span>
                  <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-300 font-bold truncate block">
                    {machine.currentBagId !== 'N/A' ? machine.currentBagId.split('-')[2] : 'None'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Alarm Feed */}
      <div className={`p-4 rounded-xl border shadow-sm ${
        isLight ? 'bg-white border-rose-200' : 'glass-panel border-rose-900/40'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4 text-rose-600 dark:text-rose-400 animate-bounce" />
            <h3 className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
              Live Machine Alarms & Safety Feed
            </h3>
          </div>
          <span className="text-[10px] bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300 px-2 py-0.5 rounded font-bold border border-rose-300 dark:border-rose-500/30">
            {alarms.filter(a => a.status !== 'Resolved').length} Active Alerts
          </span>
        </div>

        <div className="space-y-2">
          {alarms.map((alarm) => (
            <div
              key={alarm.id}
              className={`p-3 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs ${
                alarm.severity === 'Critical'
                  ? isLight ? 'bg-rose-50 border-rose-300 text-rose-900' : 'bg-rose-950/30 border-rose-700/50 text-rose-200'
                  : alarm.severity === 'Warning'
                  ? isLight ? 'bg-amber-50 border-amber-300 text-amber-900' : 'bg-amber-950/30 border-amber-700/50 text-amber-200'
                  : isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-start space-x-2.5">
                <AlertTriangle className={`w-4 h-4 shrink-0 mt-0.5 ${
                  alarm.severity === 'Critical' ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600 dark:text-amber-400'
                }`} />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">{alarm.machineId}</span>
                    <span className={`text-[10px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>({alarm.location})</span>
                    <span className={`text-[10px] font-mono ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>{alarm.timestamp}</span>
                  </div>
                  <p className="text-xs mt-0.5">{alarm.message}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                {alarm.status === 'Unacknowledged' ? (
                  <button
                    onClick={() => handleAcknowledgeAlarm(alarm.id)}
                    className="bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors shadow-sm"
                  >
                    Acknowledge
                  </button>
                ) : (
                  <span className={`text-[10px] px-2 py-1 rounded border font-medium ${
                    isLight ? 'bg-slate-200 text-slate-700 border-slate-300' : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {alarm.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
