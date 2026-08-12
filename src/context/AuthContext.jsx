import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const DEMO_USERS = [
  {
    id: 'usr-company-admin',
    name: 'Dr. Rajesh Varma',
    email: 'admin@smarttrace.med',
    role: 'company_admin',
    roleLabel: 'Company Regional Admin',
    assignedRegion: 'Bangalore South (50km Zone)',
    department: 'SmartTrace Regional Operations',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    permissions: ['all_regional_hospitals', 'view_telemetry', 'manage_client_configs', 'assign_devices']
  },
  {
    id: 'usr-cpcb-auditor',
    name: 'Priya Sharma',
    email: 'auditor@cpcb.gov.in',
    role: 'cpcb_auditor',
    roleLabel: 'CPCB Government Auditor',
    assignedRegion: 'National / All Umbrella Vendors',
    department: 'Central Pollution Control Board',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    permissions: ['global_audit_hierarchy', 'view_logs', 'verify_hashes', 'export_5yr_backup']
  },
  {
    id: 'usr-statutory-officer',
    name: 'Dr. Srinivas N.',
    email: 'compliance@apollo.med',
    role: 'statutory_officer',
    roleLabel: 'KSPCB Nodal Compliance Officer',
    assignedRegion: 'Bangalore South (Apollo Hospital)',
    department: 'Hospital Infection Control & Statutory Compliance',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80',
    permissions: ['manage_statutory_forms', 'sign_manifests', 'file_form1', 'kspcb_xgn_upload']
  },
  {
    id: 'usr-software-admin',
    name: 'Arjun Mehta',
    email: 'webadmin@smarttrace.med',
    role: 'software_admin',
    roleLabel: 'Platform Maintenance Admin',
    department: 'Web Infrastructure & Support',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    permissions: ['view_diagnostics', 'system_health', 'manage_support_tickets', 'release_logs']
  }
];

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('smarttrace_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return DEMO_USERS[0];
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('smarttrace_auth') === 'true';
  });

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('smarttrace_auth', 'true');
      localStorage.setItem('smarttrace_user', JSON.stringify(currentUser));
      if (window.location.hash !== '#portal') {
        window.history.replaceState({ appPage: 'portal' }, '', '#portal');
      }
    } else {
      localStorage.removeItem('smarttrace_auth');
      localStorage.removeItem('smarttrace_user');
      if (window.location.hash !== '#login') {
        window.history.replaceState({ appPage: 'login' }, '', '#login');
      }
    }
  }, [isAuthenticated, currentUser]);

  const loginAs = (userId) => {
    const found = DEMO_USERS.find(u => u.id === userId);
    if (found) {
      setCurrentUser(found);
      setIsAuthenticated(true);
      localStorage.setItem('smarttrace_auth', 'true');
      localStorage.setItem('smarttrace_user', JSON.stringify(found));
      window.history.pushState({ appPage: 'portal', userId: found.id }, '', '#portal');
    }
  };

  const loginWithCredentials = (email, password) => {
    const matched = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    const userToSave = matched || {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0],
      email: email,
      role: 'company_admin',
      roleLabel: 'Company Regional Admin',
      department: 'Regional Operations',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      permissions: ['all_regional_hospitals']
    };

    setCurrentUser(userToSave);
    setIsAuthenticated(true);
    localStorage.setItem('smarttrace_auth', 'true');
    localStorage.setItem('smarttrace_user', JSON.stringify(userToSave));
    window.history.pushState({ appPage: 'portal', userId: userToSave.id }, '', '#portal');
    return { success: true, user: userToSave };
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('smarttrace_auth');
    localStorage.removeItem('smarttrace_user');
    if (window.location.hash !== '#login') {
      window.history.pushState({ appPage: 'login' }, '', '#login');
    }
  };

  const hasPermission = (perm) => {
    if (!currentUser) return false;
    if (currentUser.permissions.includes('all')) return true;
    return currentUser.permissions.includes(perm);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated,
      loginAs,
      loginWithCredentials,
      logout,
      hasPermission,
      setCurrentUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
