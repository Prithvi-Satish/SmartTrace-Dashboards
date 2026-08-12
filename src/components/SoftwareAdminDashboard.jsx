import React, { useState } from 'react';
import { SOFTWARE_SYSTEM_HEALTH } from '../data/mockData';
import { Wrench, Activity, Database, Server, CheckCircle2, MessageSquare, RefreshCw, Terminal, Shield, Wifi } from 'lucide-react';

export default function SoftwareAdminDashboard({ isLight }) {
  const [tickets, setTickets] = useState(SOFTWARE_SYSTEM_HEALTH.systemTickets);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleResolveTicket = (ticketId) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: 'RESOLVED' } : t));
    setSelectedTicket(null);
  };

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className={`p-5 rounded-2xl border shadow-xs ${
        isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 mb-1.5">
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border border-purple-300 uppercase tracking-wider flex items-center gap-1">
                <Wrench className="w-3 h-3 text-purple-600" />
                Website Platform & Infrastructure Maintenance Hub
              </span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 font-mono">
                {SOFTWARE_SYSTEM_HEALTH.webAppVersion}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold">Software Diagnostics & Client Query Desk</h2>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'} mt-0.5`}>
              Isolated platform maintenance, API health metrics, PWA service worker status, and software customization tickets.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-xs transition-all">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Diagnostics</span>
            </button>
          </div>
        </div>
      </div>

      {/* Platform Diagnostics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-4 rounded-2xl border shadow-xs ${
          isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
        }`}>
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Platform Uptime</span>
            <Activity className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2">
            <span className="text-3xl font-black text-emerald-600">{SOFTWARE_SYSTEM_HEALTH.uptimePct}%</span>
            <p className="text-xs text-slate-500 mt-1">Last 30 Days SLA</p>
          </div>
        </div>

        <div className={`p-4 rounded-2xl border shadow-xs ${
          isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
        }`}>
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>API Latency</span>
            <Server className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="mt-2">
            <span className="text-3xl font-black text-cyan-600">{SOFTWARE_SYSTEM_HEALTH.apiLatencyMs} ms</span>
            <p className="text-xs text-slate-500 mt-1">Average Response Time</p>
          </div>
        </div>

        <div className={`p-4 rounded-2xl border shadow-xs ${
          isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
        }`}>
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>SSE Telemetry Streams</span>
            <Wifi className="w-4 h-4 text-purple-600" />
          </div>
          <div className="mt-2">
            <span className="text-3xl font-black text-purple-600">{SOFTWARE_SYSTEM_HEALTH.sseConnectionCount} Live</span>
            <p className="text-xs text-slate-500 mt-1">Active Machine Feeds</p>
          </div>
        </div>

        <div className={`p-4 rounded-2xl border shadow-xs ${
          isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
        }`}>
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Database Status</span>
            <Database className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2">
            <span className="text-xs font-bold text-emerald-600 block truncate">{SOFTWARE_SYSTEM_HEALTH.databaseStatus}</span>
            <p className="text-xs text-slate-500 mt-1">PWA Sync: {SOFTWARE_SYSTEM_HEALTH.pwaServiceWorker}</p>
          </div>
        </div>
      </div>

      {/* Software Customization & Client Support Tickets */}
      <div className={`p-5 rounded-2xl border shadow-xs ${
        isLight ? 'bg-white border-slate-200/80' : 'bg-[#111622] border-slate-800'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <MessageSquare className="w-4 h-4 text-purple-600" />
              Software Customization & Support Inquiries Desk
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Queries from client hospital admins, auditors, and operators regarding UI customizations or dashboard guidance.</p>
          </div>

          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
            {tickets.filter(t => t.status === 'IN_PROGRESS').length} Open Inquiry
          </span>
        </div>

        <div className="space-y-3">
          {tickets.map((t) => (
            <div
              key={t.id}
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-all ${
                isLight ? 'bg-slate-50/80 border-slate-200/80' : 'bg-[#090d16] border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-mono font-bold text-purple-600 dark:text-purple-400">{t.id}</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{t.hospital}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                    {t.category}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100">{t.subject}</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Received: {t.date}</p>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold ${
                  t.status === 'RESOLVED'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}>
                  {t.status}
                </span>

                {t.status !== 'RESOLVED' && (
                  <button
                    onClick={() => handleResolveTicket(t.id)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg flex items-center space-x-1 shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Resolved</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
