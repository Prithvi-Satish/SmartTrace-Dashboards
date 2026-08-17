import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import DeviceFrame from './components/DeviceFrame';
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
import { ArrowLeft, Cpu } from 'lucide-react';

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

  // Sync default activeNav based on currentUser role on login
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

  useEffect(() => {
    if (isLight) {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    }
  }, [isLight]);

  const handleSelectHospitalForAdmin = (hosp) => {
    setSelectedHospitalForAdmin(hosp);
    setActiveNav('hospital_telemetry');
  };

  const handleBackToRegionalList = () => {
    setSelectedHospitalForAdmin(null);
    setActiveNav('regional_overview');
  };

  // Show login screen if not authenticated
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

  // Full authenticated layout: DeviceFrame (top header) + Sidebar + Content
  return (
    <DeviceFrame
      activeView={activeView}
      setActiveView={setActiveView}
      theme={theme}
      setTheme={setTheme}
      onToggleSidebar={() => setIsMobileOpen(true)}
    >
      <div className={`flex min-h-screen transition-colors duration-300 ${
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

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
          <main className="flex-1 p-3 sm:p-6 overflow-x-hidden">
            {/* Drilldown Breadcrumb */}
            {selectedHospitalForAdmin && activeNav === 'hospital_telemetry' && (
              <div className="mb-4 p-3  bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-800 dark:text-cyan-300">
                  Drilled into: <strong>{selectedHospitalForAdmin.name}</strong> ({selectedHospitalForAdmin.cpcbLicenseNo})
                </span>
                <button
                  onClick={handleBackToRegionalList}
                  className="px-3 py-1  text-xs font-bold bg-cyan-600 text-white flex items-center space-x-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Regional</span>
                </button>
              </div>
            )}

            {/* View Router */}
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
    </DeviceFrame>
  );
}

export default function App() {
  const [activeView, setActiveView] = useState('desktop');
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
