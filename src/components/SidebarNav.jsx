import React from 'react';
import {
  Activity,
  Building2,
  Globe,
  Wrench,
  FileCheck,
  Info,
  User,
  Settings,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Moon,
  Sun,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { APP_BUILD_NAME } from '../config/version';

export default function SidebarNav({
  activeNav,
  setActiveNav,
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
  isLight,
  setTheme,
  onOpenSettings
}) {
  const { currentUser, logout } = useAuth();

  const navItems = [
    {
      section: 'DASHBOARD SUITE',
      items: [
        {
          id: 'hospital_telemetry',
          label: '1. Hospital Telemetry',
          subtitle: 'Machine Digital Twin & Cycles',
          icon: Activity,
          color: 'text-cyan-600 dark:text-cyan-400',
          activeBg: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500',
          roles: ['hospital_supervisor', 'hospital_admin']
        },
        {
          id: 'regional_overview',
          label: '2. Regional Operations',
          subtitle: '50km Regional Client Network',
          icon: Building2,
          color: 'text-[#0097a7] dark:text-cyan-400',
          activeBg: 'bg-[#0097a7]/10 text-[#0097a7] dark:text-cyan-300 border-[#0097a7]',
          roles: ['company_admin', 'chain_admin', 'auditor']
        },
        {
          id: 'auditor_hierarchy',
          label: '3. CPCB Auditor View',
          subtitle: 'National Multi-Tier Hierarchy',
          icon: Globe,
          color: 'text-emerald-600 dark:text-emerald-400',
          activeBg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500',
          roles: ['company_admin', 'chain_admin', 'auditor', 'hospital_supervisor']
        },
        {
          id: 'maintenance_desk',
          label: '4. Maintenance Desk',
          subtitle: 'Device Diagnostics & Tickets',
          icon: Wrench,
          color: 'text-purple-600 dark:text-purple-400',
          activeBg: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500',
          roles: ['company_admin']
        },
        {
          id: 'statutory_forms',
          label: '5. Statutory Forms (KSPCB)',
          subtitle: 'BMWM 2016 Forms I–VI Vault',
          icon: FileCheck,
          color: 'text-[#00875a] dark:text-emerald-400',
          activeBg: 'bg-[#00875a]/10 text-[#00875a] dark:text-emerald-300 border-[#00875a]',
          roles: ['company_admin', 'chain_admin', 'auditor', 'hospital_supervisor']
        }
      ]
    },
    {
      section: 'SYSTEM & INFORMATION',
      items: [
        {
          id: 'about',
          label: 'About SmartTrace™',
          subtitle: 'Platform Architecture & PRD',
          icon: Info,
          color: 'text-blue-600 dark:text-blue-400',
          activeBg: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500'
        },
        {
          id: 'profile',
          label: 'User Profile & Key',
          subtitle: 'Role & mTLS Credentials',
          icon: User,
          color: 'text-indigo-600 dark:text-indigo-400',
          activeBg: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500'
        },
        {
          id: 'settings',
          label: 'System Settings',
          subtitle: 'Preferences & Thresholds',
          icon: Settings,
          color: 'text-slate-600 dark:text-slate-400',
          activeBg: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500',
          isAction: true,
          action: onOpenSettings
        },
        {
          id: 'docs',
          label: 'Documentation & SOPs',
          subtitle: 'BMWM Rules & Manuals',
          icon: BookOpen,
          color: 'text-amber-600 dark:text-amber-400',
          activeBg: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500'
        }
      ]
    }
  ];

  const handleSelectNav = (item) => {
    if (item.isAction && item.action) {
      item.action();
    } else {
      setActiveNav(item.id);
      setIsMobileOpen(false);
    }
  };

  const sidebarContent = (
    <div className={`flex flex-col h-full select-none ${
      isLight ? 'bg-white text-slate-900' : 'bg-[#0e1420] text-slate-100'
    }`}>
      {/* Brand Header */}
      <div className={`shrink-0 p-4 border-b flex items-center justify-between transition-colors ${
        isLight ? 'border-slate-200/80 bg-white' : 'border-slate-800 bg-[#0e1420]'
      }`}>
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="w-9 h-9 bg-gradient-to-tr from-[#00875a] to-cyan-500 text-white font-black text-xs flex items-center justify-center shrink-0 ">
            ST
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <h1 className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">SmartTrace™</h1>
              <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-mono font-bold block">
                {APP_BUILD_NAME}
              </span>
            </div>
          )}
        </div>

        {/* Universal Close Button */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className={`p-1.5 border text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all ${
            isLight ? 'bg-slate-100 hover:bg-slate-200 border-slate-300' : 'bg-slate-800 hover:bg-slate-700 border-slate-700'
          }`}
          title="Close Sidebar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation Items (Scrollable Middle Section) */}
      <div className={`flex-1 overflow-y-auto p-3 space-y-5 ${
        isLight ? 'bg-white' : 'bg-[#0e1420]'
      }`}>
        {navItems.map((group) => {
          // Filter items based on user role
          const filteredItems = group.items.filter(item => !item.roles || item.roles.includes(currentUser?.role));
          
          if (filteredItems.length === 0) return null;

          return (
            <div key={group.section} className="space-y-1">
              {!isCollapsed && (
                <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 px-3 block mb-1.5">
                  {group.section}
                </span>
              )}

              {filteredItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeNav === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectNav(item)}
                    className={`w-full p-2.5 border flex items-center transition-all ${
                      isCollapsed ? 'justify-center' : 'justify-start space-x-3'
                    } ${
                      isActive
                        ? `${item.activeBg} font-bold border-l-4`
                        : isLight
                        ? 'border-transparent text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                        : 'border-transparent text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
                    }`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <IconComponent className={`w-5 h-5 shrink-0 ${item.color}`} />
                    {!isCollapsed && (
                      <div className="text-left overflow-hidden">
                        <span className="text-xs block font-bold truncate leading-snug">{item.label}</span>
                        <span className={`text-[10px] block truncate ${isLight ? 'text-slate-400' : 'text-slate-400'}`}>
                          {item.subtitle}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Opaque Footer Control Box (Theme, Settings & User Profile) */}
      <div className={`shrink-0 p-3 border-t space-y-3 transition-colors ${
        isLight ? 'border-slate-200/80 bg-slate-50' : 'border-slate-800 bg-[#090d16]'
      }`}>
        {/* Quick Controls Bar: Dark Mode + System Settings */}
        {!isCollapsed && (
          <div className="flex items-center justify-between gap-2 text-xs">
            {setTheme && (
              <button
                onClick={() => setTheme(isLight ? 'dark' : 'light')}
                className={`flex-1 py-1.5 px-2.5 border flex items-center justify-center space-x-1.5 font-semibold transition-all ${
                  isLight ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                }`}
                title="Toggle Theme"
              >
                {isLight ? (
                  <>
                    <Moon className="w-3.5 h-3.5 text-slate-600" />
                    <span>Dark</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Light</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={onOpenSettings}
              className={`py-1.5 px-2.5 border flex items-center justify-center space-x-1.5 font-semibold transition-all ${
                isLight ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
              }`}
              title="Open System Settings"
            >
              <Settings className="w-3.5 h-3.5 text-cyan-500" />
              <span>Settings</span>
            </button>
          </div>
        )}

        {/* User Identity & Logout Button */}
        <div className={`flex items-center justify-between ${isCollapsed ? 'flex-col gap-2' : ''}`}>
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="w-8 h-8  object-cover border border-cyan-500 shrink-0"
            />
            {!isCollapsed && (
              <div className="overflow-hidden">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block truncate leading-tight">
                  {currentUser?.name}
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium block truncate">
                  {currentUser?.roleLabel}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={logout}
            className="p-1.5  border border-rose-300 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-all shrink-0"
            title="Switch Role / Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Drawer Navigation Overlay (All screen sizes) */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex">
          <div className={`w-72 h-[100dvh] max-h-screen transition-all ${
            isLight ? 'bg-white' : 'bg-[#0e1420]'
          }`}>
            {sidebarContent}
          </div>
          <div className="flex-1" onClick={() => setIsMobileOpen(false)} />
        </div>
      )}
    </>
  );
}
// force vite reload
