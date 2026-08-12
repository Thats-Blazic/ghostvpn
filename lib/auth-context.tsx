"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface AuthUser {
  name: string;
  email: string;
  plan: string | null;
}

interface StoredUser extends AuthUser {
  password: string;
  resetToken?: string;
  resetTokenExpiry?: number;
}

interface AuthResult {
  ok: boolean;
  error?: string;
}

interface ResetRequestResult extends AuthResult {
  token?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  register: (name: string, email: string, password: string) => AuthResult;
  login: (email: string, password: string) => AuthResult;
  logout: () => void;
  activatePlan: (planId: string) => void;
  cancelPlan: () => void;
  requestPasswordReset: (email: string) => ResetRequestResult;
  resetPassword: (email: string, token: string, newPassword: string) => AuthResult;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const USERS_KEY = "ghostvpn_users";
const SESSION_KEY = "ghostvpn_session";

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function toSession(u: StoredUser): AuthUser {
  return { name: u.name, email: u.email, plan: u.plan };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw));
    } finally {
      setLoading(false);
    }
  }, []);

  const persistSession = (u: AuthUser | null) => {
    if (u) window.localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    else window.localStorage.removeItem(SESSION_KEY);
    setUser(u);
  };

  const register = (name: string, email: string, password: string): AuthResult => {
    const users = readUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: "an account with this email already exists" };
    }
    const newUser: StoredUser = { name, email, password, plan: null };
    writeUsers([...users, newUser]);
    persistSession(toSession(newUser));
    return { ok: true };
  };

  const login = (email: string, password: string): AuthResult => {
    const users = readUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) return { ok: false, error: "invalid email or password" };
    persistSession(toSession(found));
    return { ok: true };
  };

  const logout = () => persistSession(null);

  const activatePlan = (planId: string) => {
    const users = readUsers();
    const idx = users.findIndex((u) => user && u.email.toLowerCase() === user.email.toLowerCase());
    if (idx !== -1) {
      users[idx] = { ...users[idx], plan: planId };
      writeUsers(users);
      persistSession(toSession(users[idx]));
    }
  };

  const cancelPlan = () => {
    const users = readUsers();
    const idx = users.findIndex((u) => user && u.email.toLowerCase() === user.email.toLowerCase());
    if (idx !== -1) {
      users[idx] = { ...users[idx], plan: null };
      writeUsers(users);
      persistSession(toSession(users[idx]));
    }
  };

  const requestPasswordReset = (email: string): ResetRequestResult => {
    const users = readUsers();
    const idx = users.findIndex((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (idx === -1) return { ok: false, error: "no account found with that email" };

    const token = Array.from({ length: 24 }, () => Math.floor(Math.random() * 36).toString(36)).join("");
    users[idx] = { ...users[idx], resetToken: token, resetTokenExpiry: Date.now() + 60 * 60 * 1000 };
    writeUsers(users);
    return { ok: true, token };
  };

  const resetPassword = (email: string, token: string, newPassword: string): AuthResult => {
    const users = readUsers();
    const idx = users.findIndex((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (idx === -1) return { ok: false, error: "invalid or expired reset link" };

    const u = users[idx];
    if (!u.resetToken || u.resetToken !== token) return { ok: false, error: "invalid or expired reset link" };
    if (!u.resetTokenExpiry || u.resetTokenExpiry < Date.now()) return { ok: false, error: "this reset link has expired — request a new one" };

    users[idx] = { ...u, password: newPassword, resetToken: undefined, resetTokenExpiry: undefined };
    writeUsers(users);
    return { ok: true };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        activatePlan,
        cancelPlan,
        requestPasswordReset,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
