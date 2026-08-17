import React, { useState } from 'react';
import { REGIONAL_HOSPITALS, REGIONS } from '../data/mockData';
import { Building2, Cpu, ShieldAlert, ArrowRight, MapPin, Search, CheckCircle2, Phone, Calendar, Award } from 'lucide-react';

export default function RegionalClientOverview({ onSelectHospital, isLight }) {
  const [searchTerm, setSearchTerm] = useState('');
  const currentRegion = REGIONS[0]; // Assigned region: Bangalore South Zone (50km)

  const filteredHospitals = REGIONAL_HOSPITALS.filter(h =>
    h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.locality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className={`p-5 border ${
        isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 mb-1.5">
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 border border-cyan-300 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3 h-3 text-cyan-600" />
                {currentRegion.name}
              </span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
                Company Admin Full Access
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold">Regional Client Hospitals & IoT Fleet Overview</h2>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'} mt-0.5`}>
              Client healthcare facilities utilizing ABIOT-Esafe sterilization devices within your assigned 50 km operational radius.
            </p>
          </div>

          <div className="relative">
            <Search className={`w-3.5 h-3.5 absolute left-3 top-2.5 ${isLight ? 'text-slate-400' : 'text-slate-400'}`} />
            <input
              type="text"
              placeholder="Search hospital or locality..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`text-xs pl-8 pr-3 py-2 border focus:outline-none focus:border-cyan-500 w-full sm:w-64 ${
                isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-[#090d16] border-slate-700 text-slate-100'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Regional Aggregate Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-4 border ${
          isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
        }`}>
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Client Hospitals</span>
            <Building2 className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="mt-2">
            <span className="text-3xl font-black text-slate-900 dark:text-slate-100">{REGIONAL_HOSPITALS.length}</span>
            <p className="text-xs text-slate-500 mt-1">In 50 km assigned zone</p>
          </div>
        </div>

        <div className={`p-4 border ${
          isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
        }`}>
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>ABIOT-Esafe Deployed</span>
            <Cpu className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2">
            <span className="text-3xl font-black text-emerald-600">22 Units</span>
            <p className="text-xs text-slate-500 mt-1">16 Running • 5 Idle • 1 Alarm</p>
          </div>
        </div>

        <div className={`p-4 border ${
          isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#111622] border-slate-800 text-slate-100'
        }`}>
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Active Alarms</span>
            <ShieldAlert className="w-4 h-4 text-rose-600" />
          </div>
          <div className="mt-2">
            <span className="text-3xl font-black text-rose-600">1 Unit</span>
            <p className="text-xs text-rose-700 dark:text-rose-400 font-bold mt-1">Apollo Hospital (Sterilizer 02)</p>
          </div>
        </div>

        <div className={`p-4 border ${
          isLight ? 'bg-emerald-50/70 border-emerald-200/90 text-slate-900' : 'bg-emerald-950/20 border-emerald-800/60 text-slate-100'
        }`}>
          <div className="flex items-center justify-between text-xs text-slate-600 font-semibold">
            <span>Regional Pass Rate</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2">
            <span className="text-3xl font-black text-emerald-700 dark:text-emerald-400">98.5%</span>
            <p className="text-xs text-emerald-800 dark:text-emerald-300 font-bold mt-1">CPCB Compliance Certified</p>
          </div>
        </div>
      </div>

      {/* Hospital List Cards */}
      <div className="space-y-3">
        <h3 className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
          Select a Client Hospital to Access Hospital Dashboard ({filteredHospitals.length})
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredHospitals.map((hosp) => (
            <div
              key={hosp.id}
              onClick={() => onSelectHospital(hosp)}
              className={`p-5 border cursor-pointer transition-all hover:${
                hosp.alarmCount > 0
                  ? isLight ? 'bg-rose-50/50 border-rose-200 hover:border-rose-300' : 'bg-rose-950/20 border-rose-800/60 hover:border-rose-700'
                  : isLight ? 'bg-white border-slate-200/80 hover:border-cyan-300' : 'bg-[#111622] border-slate-800 hover:border-cyan-800'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-200 dark:border-cyan-800">
                      {hosp.id}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {hosp.locality}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">{hosp.name}</h4>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">CPCB License: {hosp.cpcbLicenseNo}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{hosp.complianceScore}%</span>
                  <span className="text-[10px] font-bold text-slate-400 block">Compliance</span>
                </div>
              </div>

              {/* Specs & Hardware Fleet Breakdown */}
              <div className="grid grid-cols-3 gap-2 my-3.5 p-3 bg-slate-50 dark:bg-[#090d16] border border-slate-200/60 dark:border-slate-800 text-center text-xs">
                <div>
                  <span className="text-slate-500 text-[10px] block">ABIOT Devices</span>
                  <strong className="text-slate-800 dark:text-slate-200 font-bold">{hosp.deviceCount} Installed</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Live Status</span>
                  <strong className={hosp.alarmCount > 0 ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}>
                    {hosp.runningCount} Running {hosp.alarmCount > 0 ? `• ${hosp.alarmCount} Alarm` : ''}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Monthly Waste</span>
                  <strong className="text-slate-800 dark:text-slate-200 font-bold">{hosp.monthlyWasteKg.toLocaleString()} kg</strong>
                </div>
              </div>

              {/* Footer Bar */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex items-center space-x-3 text-slate-500 text-[11px]">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" />
                    {hosp.contactPerson} ({hosp.phone})
                  </span>
                </div>

                <button className="flex items-center space-x-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700">
                  <span>Inspect Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
