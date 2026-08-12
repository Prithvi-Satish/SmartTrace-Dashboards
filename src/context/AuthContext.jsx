import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseAvailable } from '../lib/supabaseClient';

const AuthContext = createContext();

// ── Offline mock users (used when Supabase is unavailable) ──────────────────
export const DEMO_USERS = [
  {
    id: 'usr-admin',
    name: 'Dr. Rajesh Varma',
    email: 'admin@smarttrace.med',
    role: 'admin',
    roleLabel: 'System Administrator',
    department: 'Hospital IT & Compliance',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    permissions: ['all'],
  },
  {
    id: 'usr-auditor',
    name: 'Priya Sharma',
    email: 'auditor@cpcb.gov.in',
    role: 'auditor',
    roleLabel: 'Compliance Auditor',
    department: 'State Pollution Control Board',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    permissions: ['view_compliance', 'verify_hashes', 'download_reports', 'export_certificates'],
  },
  {
    id: 'usr-inspector',
    name: 'Dr. Anand Kumar',
    email: 'inspector@medicalboard.gov.in',
    role: 'inspector',
    roleLabel: 'Govt Medical Board Inspector',
    department: 'Directorate of Medical Services',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
    permissions: ['view_compliance', 'verify_hashes', 'download_reports', 'audit_signoff'],
  },
  {
    id: 'usr-staff',
    name: 'Suresh Menon',
    email: 'suresh@apollohospital.com',
    role: 'staff',
    roleLabel: 'Hospital Operator',
    department: 'Intensive Care Unit (ICU)',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80',
    permissions: ['view_machines', 'log_cycles', 'view_compliance_summary'],
  },
];

// ── Map Supabase profile row → app user shape ────────────────────────────────
function profileToUser(supabaseUser, profile) {
  return {
    id: supabaseUser.id,
    name: profile?.name || supabaseUser.email.split('@')[0],
    email: supabaseUser.email,
    role: profile?.role || 'staff',
    roleLabel: profile?.role_label || 'Hospital Operator',
    department: profile?.department || 'General Operations',
    avatar: profile?.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    permissions: profile?.permissions || ['view_machines'],
  };
}

// ── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [mode, setMode] = useState(isSupabaseAvailable ? 'supabase' : 'mock');

  // ── On mount: restore session from Supabase or localStorage ───────────────
  useEffect(() => {
    if (!isSupabaseAvailable) {
      // Offline mock mode — restore from localStorage
      const saved = localStorage.getItem('smarttrace_user');
      const auth = localStorage.getItem('smarttrace_auth');
      if (saved && auth === 'true') {
        setCurrentUser(JSON.parse(saved));
        setIsAuthenticated(true);
      }
      setIsLoading(false);
      return;
    }

    // Supabase mode — restore session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        await loadProfile(session.user);
      }
      setIsLoading(false);
    });

    // Listen for auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await loadProfile(session.user);
        } else {
          setCurrentUser(null);
          setIsAuthenticated(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // ── Fetch profile from public.profiles table ───────────────────────────────
  async function loadProfile(supabaseUser) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', supabaseUser.id)
      .single();

    const user = profileToUser(supabaseUser, profile);
    setCurrentUser(user);
    setIsAuthenticated(true);
  }

  // ── Login with email + password (Supabase or mock fallback) ───────────────
  const loginWithCredentials = async (email, password) => {
    setAuthError(null);

    if (!isSupabaseAvailable) {
      // Offline mock mode
      const matched = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (matched) {
        setCurrentUser(matched);
        setIsAuthenticated(true);
        localStorage.setItem('smarttrace_user', JSON.stringify(matched));
        localStorage.setItem('smarttrace_auth', 'true');
        return { success: true };
      }
      return { success: false, error: 'Invalid credentials. Check email and password.' };
    }

    // Supabase Auth
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      const message =
        error.message === 'Invalid login credentials'
          ? 'Incorrect email or password.'
          : error.message;
      setAuthError(message);
      return { success: false, error: message };
    }
    return { success: true };
  };

  // ── Quick demo login (mock mode only — no password check) ─────────────────
  const loginAs = async (userId) => {
    const found = DEMO_USERS.find(u => u.id === userId);
    if (!found) return;

    if (isSupabaseAvailable) {
      // Use real credentials for demo shortcut
      const credMap = {
        'usr-admin':     { email: 'admin@smarttrace.med',               password: 'SmartTrace@Admin1' },
        'usr-auditor':   { email: 'auditor@cpcb.gov.in',                password: 'SmartTrace@Audit1' },
        'usr-inspector': { email: 'inspector@medicalboard.gov.in',       password: 'SmartTrace@Inspect1' },
        'usr-staff':     { email: 'suresh@apollohospital.com',           password: 'SmartTrace@Staff1' },
      };
      const creds = credMap[userId];
      if (creds) await loginWithCredentials(creds.email, creds.password);
    } else {
      setCurrentUser(found);
      setIsAuthenticated(true);
      localStorage.setItem('smarttrace_user', JSON.stringify(found));
      localStorage.setItem('smarttrace_auth', 'true');
    }
  };

  // ── Logout ─────────────────────────────────────────────────────────────────
  const logout = async () => {
    if (isSupabaseAvailable) {
      await supabase.auth.signOut();
    }
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('smarttrace_user');
    localStorage.removeItem('smarttrace_auth');
  };

  // ── Permission check ───────────────────────────────────────────────────────
  const hasPermission = (perm) => {
    if (!currentUser) return false;
    if (currentUser.permissions.includes('all')) return true;
    return currentUser.permissions.includes(perm);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated,
      isLoading,
      authError,
      mode,
      loginAs,
      loginWithCredentials,
      logout,
      hasPermission,
      setCurrentUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
