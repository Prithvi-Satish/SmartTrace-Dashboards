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

// Helpers: write auth to both storages for maximum persistence
const writeAuth = (user) => {
  const data = JSON.stringify(user);
  try { localStorage.setItem('smarttrace_auth', 'true'); } catch (e) {}
  try { localStorage.setItem('smarttrace_user', data); } catch (e) {}
  try { sessionStorage.setItem('smarttrace_auth', 'true'); } catch (e) {}
  try { sessionStorage.setItem('smarttrace_user', data); } catch (e) {}
};

const clearAuth = () => {
  try { localStorage.removeItem('smarttrace_auth'); localStorage.removeItem('smarttrace_user'); } catch (e) {}
  try { sessionStorage.removeItem('smarttrace_auth'); sessionStorage.removeItem('smarttrace_user'); } catch (e) {}
};

const readAuth = () => {
  // Try localStorage first, fall back to sessionStorage
  const isAuth =
    localStorage.getItem('smarttrace_auth') === 'true' ||
    sessionStorage.getItem('smarttrace_auth') === 'true';
  const rawUser =
    localStorage.getItem('smarttrace_user') ||
    sessionStorage.getItem('smarttrace_user');
  let user = null;
  if (rawUser) { try { user = JSON.parse(rawUser); } catch (e) {} }
  return { isAuth, user };
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const { user } = readAuth();
    return user || DEMO_USERS[0];
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const { isAuth } = readAuth();
    return isAuth;
  });

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      writeAuth(currentUser);
    }
  }, [isAuthenticated, currentUser]);

  const loginAs = (userId) => {
    const found = DEMO_USERS.find(u => u.id === userId);
    if (found) {
      writeAuth(found);
      setCurrentUser(found);
      setIsAuthenticated(true);
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

    writeAuth(userToSave);
    setCurrentUser(userToSave);
    setIsAuthenticated(true);
    return { success: true, user: userToSave };
  };

  const logout = () => {
    clearAuth();
    setIsAuthenticated(false);
    setCurrentUser(DEMO_USERS[0]);
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
