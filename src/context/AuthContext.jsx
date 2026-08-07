import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const DEMO_USERS = [
  {
    id: 'usr-admin',
    name: 'Dr. Rajesh Varma',
    email: 'admin@smarttrace.med',
    role: 'admin',
    roleLabel: 'System Administrator',
    department: 'Hospital IT & Compliance',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    permissions: ['all']
  },
  {
    id: 'usr-auditor',
    name: 'Priya Sharma',
    email: 'auditor@cpcb.gov.in',
    role: 'auditor',
    roleLabel: 'Compliance Auditor',
    department: 'State Pollution Control Board',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    permissions: ['view_compliance', 'verify_hashes', 'download_reports', 'export_certificates']
  },
  {
    id: 'usr-inspector',
    name: 'Dr. Anand Kumar',
    email: 'inspector@medicalboard.gov.in',
    role: 'inspector',
    roleLabel: 'Govt Medical Board Inspector',
    department: 'Directorate of Medical Services',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
    permissions: ['view_compliance', 'verify_hashes', 'download_reports', 'audit_signoff']
  },
  {
    id: 'usr-staff',
    name: 'Suresh Menon',
    email: 'suresh@apollohospital.com',
    role: 'staff',
    roleLabel: 'Hospital Operator',
    department: 'Intensive Care Unit (ICU)',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80',
    permissions: ['view_machines', 'log_cycles', 'view_compliance_summary']
  }
];

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('smarttrace_user');
    return saved ? JSON.parse(saved) : DEMO_USERS[0]; // Default to Admin for smooth demo
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('smarttrace_auth') === 'true' || true;
  });

  useEffect(() => {
    localStorage.setItem('smarttrace_user', JSON.stringify(currentUser));
    localStorage.setItem('smarttrace_auth', isAuthenticated ? 'true' : 'false');
  }, [currentUser, isAuthenticated]);

  const loginAs = (userId) => {
    const found = DEMO_USERS.find(u => u.id === userId);
    if (found) {
      setCurrentUser(found);
      setIsAuthenticated(true);
    }
  };

  const loginWithCredentials = (email, password) => {
    const matched = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      setCurrentUser(matched);
      setIsAuthenticated(true);
      return { success: true };
    }
    // Fallback login creation
    const newUser = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0],
      email: email,
      role: 'staff',
      roleLabel: 'Hospital Operator',
      department: 'General Operations',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      permissions: ['view_machines', 'view_compliance_summary']
    };
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
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
