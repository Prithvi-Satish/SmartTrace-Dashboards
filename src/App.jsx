import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import SidebarNav from './components/SidebarNav';
import ComplianceDashboard from './components/ComplianceDashboard';
import RegionalClientOverview from './components/RegionalClientOverview';
import AuditorHierarchyView from './components/AuditorHierarchyView';
import SoftwareAdminDashboard from './components/SoftwareAdminDashboard';
import StatutoryFormsDashboard from './components/StatutoryFormsDashboard';
import AboutView from './components/AboutView';
import ProfileView from './components/ProfileView';
import DocsView from './components/DocsView';
import SettingsModal from './components/SettingsModal';
import AuthScreen from './components/AuthScreen';
import { ShieldCheck, Cpu, ArrowLeft, Building2, Menu, Moon, Sun, Settings, LogOut, Smartphone, Tablet, Monitor } from 'lucide-react';

function DashboardContent({ activeView, setActiveView, theme, setTheme }) {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const isLight = theme === 'light';

  // Navigation & Sidebar States
  const [activeNav, setActiveNav] = useState('hospital_telemetry');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Internal state for Company Admin drilldown
  const [selectedHospitalForAdmin, setSelectedHospitalForAdmin] = useState(null);

  // Sync default activeNav based on currentUser role on initial login
  useEffect(() => {
    if (currentUser?.role === 'company_admin') {
      setActiveNav('regional_overview');
    } else if (currentUser?.role === 'cpcb_auditor') {
      setActiveNav('auditor_hierarchy');
    } else if (currentUser?.role === 'statutory_officer') {
      setActiveNav('statutory_forms');
    } else if (currentUser?.role === 'software_admin') {
      setActiveNav('maintenance_desk');
    } else {
      setActiveNav('hospital_telemetry');
    }
  }, [currentUser]);

  // History popstate listener for mobile browser back button
  useEffect(() => {
    const handlePopStateAdmin = (e) => {
      if (e.state && e.state.appPage === 'login') {
        logout();
      } else if (e.state && e.state.hospital) {
        setSelectedHospitalForAdmin(e.state.hospital);
      } else {
        setSelectedHospitalForAdmin(null);
      }
    };
    window.addEventListener('popstate', handlePopStateAdmin);
    return () => window.removeEventListener('popstate', handlePopStateAdmin);
  }, [logout]);

  const handleSelectHospitalForAdmin = (hosp) => {
    setSelectedHospitalForAdmin(hosp);
    setActiveNav('hospital_telemetry');
    window.history.pushState({ hospital: hosp }, '', `#hospital-${hosp.id}`);
  };

  const handleBackToRegionalList = () => {
    setSelectedHospitalForAdmin(null);
    setActiveNav('regional_overview');
    window.history.pushState({ hospital: null }, '', '#regional-overview');
  };

  useEffect(() => {
    if (isLight) {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    }
  }, [isLight]);

  if (!isAuthenticated) {
    return (
      <AuthScreen
        isLight={isLight}
        activeView={activeView}
        setActiveView={setActiveView}
        theme={theme}
        setTheme={setTheme}
      />
    );
  }

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${
      isLight ? 'bg-slate-100 text-slate-900 light' : 'bg-[#070a10] text-slate-100 dark'
    }`}>
      {/* Sidebar Navigation */}
      <SidebarNav
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        isLight={isLight}
        setTheme={setTheme}
        onOpenSettings={() => setShowSettingsModal(true)}
      />

      {/* Main Content Body */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Top Header Bar (Clean & Uncluttered) */}
        <header className={`w-full px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 sticky top-0 z-20 border-b shadow-xs transition-colors ${
          isLight ? 'bg-white border-slate-200/80 text-slate-900' : 'bg-[#0e1420] border-slate-800 text-slate-100'
        }`}>
          <div className="flex items-center space-x-3">
            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100">
                SmartTrace™ Telemetry System
              </h1>
            </div>
          </div>

          {/* Clean Right Ticker (No clutter!) */}
          <div className={`flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-xl border shrink-0 ${
            isLight ? 'bg-slate-50 text-slate-700 border-slate-200 shadow-xs' : 'bg-[#090d16] text-slate-300 border-slate-800'
          }`}>
            <Cpu className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span className="hidden sm:inline">Edge Mesh: <strong>22 Active</strong></span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </header>

        {/* Viewport Frame Container */}
        <main className="flex-1 p-2 sm:p-4 overflow-x-hidden">
          <div className="w-full max-w-md mx-auto transition-all duration-300">
            {/* Breadcrumb Info Bar if in Drilldown */}
            {selectedHospitalForAdmin && activeNav === 'hospital_telemetry' && (
              <div className="mb-4 p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-800 dark:text-cyan-300">
                  Drilled down into: <strong>{selectedHospitalForAdmin.name}</strong> ({selectedHospitalForAdmin.cpcbLicenseNo})
                </span>
                <button
                  onClick={handleBackToRegionalList}
                  className="px-3 py-1 rounded-xl text-xs font-bold bg-cyan-600 text-white flex items-center space-x-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Regional Overview</span>
                </button>
              </div>
            )}

            {/* SIDEBAR ACTIVE VIEW ROUTER */}
            {activeNav === 'hospital_telemetry' && (
              <ComplianceDashboard isLight={isLight} hospital={selectedHospitalForAdmin} />
            )}

            {activeNav === 'regional_overview' && (
              <RegionalClientOverview onSelectHospital={handleSelectHospitalForAdmin} isLight={isLight} />
            )}

            {activeNav === 'auditor_hierarchy' && (
              <AuditorHierarchyView isLight={isLight} />
            )}

            {activeNav === 'maintenance_desk' && (
              <SoftwareAdminDashboard isLight={isLight} />
            )}

            {activeNav === 'statutory_forms' && (
              <StatutoryFormsDashboard isLight={isLight} />
            )}

            {activeNav === 'about' && (
              <AboutView isLight={isLight} />
            )}

            {activeNav === 'profile' && (
              <ProfileView isLight={isLight} />
            )}

            {activeNav === 'docs' && (
              <DocsView isLight={isLight} />
            )}
          </div>
        </main>
      </div>

      {/* Settings Modal */}
      {showSettingsModal && (
        <SettingsModal
          onClose={() => setShowSettingsModal(false)}
          isLight={isLight}
        />
      )}
    </div>
  );
}

export default function App() {
  const [activeView, setActiveView] = useState('phone'); // Fixed Mobile View
  const [theme, setTheme] = useState('light');

  return (
    <AuthProvider>
      <DashboardContent
        activeView={activeView}
        setActiveView={setActiveView}
        theme={theme}
        setTheme={setTheme}
      />
    </AuthProvider>
  );
}


