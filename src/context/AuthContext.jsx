import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const DEMO_USERS = [
  {
    id: 'usr-company-admin',
    name: 'Dr. Rajesh Varma',
    email: 'admin@smarttrace.med',
    role: 'company_admin',
    roleLabel: 'Company Admin',
    department: 'Global Operations',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    permissions: ['all_global_access']
  },
  {
    id: 'usr-chain-admin',
    name: 'Sarah Jenkins',
    email: 'chain@apollo.med',
    role: 'chain_admin',
    roleLabel: 'Hospital Chain Supervisor',
    assignedRegion: 'Apollo Hospitals Group',
    department: 'Regional Operations',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
    permissions: ['chain_regional_access']
  },
  {
    id: 'usr-cpcb-auditor',
    name: 'Priya Sharma',
    email: 'auditor@cpcb.gov.in',
    role: 'auditor',
    roleLabel: 'CPCB Government Auditor',
    assignedRegion: 'National / All Umbrella Vendors',
    department: 'Central Pollution Control Board',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    permissions: ['global_audit_hierarchy', 'view_logs', 'verify_hashes', 'export_5yr_backup']
  },
  {
    id: 'usr-hosp-supervisor',
    name: 'Dr. Srinivas N.',
    email: 'supervisor@apollo.med',
    role: 'hospital_supervisor',
    roleLabel: 'Hospital Supervisor',
    assignedRegion: 'Apollo Hospital (Bangalore South)',
    department: 'Facility Management',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80',
    permissions: ['manage_statutory_forms', 'hospital_telemetry_config']
  },
  {
    id: 'usr-hosp-admin',
    name: 'Arjun Mehta',
    email: 'hospadmin@apollo.med',
    role: 'hospital_admin',
    roleLabel: 'Hospital Admin',
    department: 'Machine Operations',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    permissions: ['view_hospital_telemetry']
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
      role: 'hospital_admin',
      roleLabel: 'Hospital Admin',
      department: 'Machine Operations',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      permissions: ['view_hospital_telemetry']
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
