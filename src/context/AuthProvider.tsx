"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { AuthAPI } from "@/api/auth";
import { User, LoginData, RegisterData } from "@/types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🧠 Load current user when app mounts
  useEffect(() => {
    (async () => {
      try {
        const me = await AuthAPI.getCurrentUser();
        setUser(me);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 🔐 Login
  async function login(data: LoginData): Promise<void> {
    const res = await AuthAPI.login(data);
    setUser(res.user);
  }

  // 🧾 Register
  async function register(data: RegisterData): Promise<void> {
    const res = await AuthAPI.register(data);
    setUser(res.user);
  }

  // 🚪 Logout
  async function logout(): Promise<void> {
    await AuthAPI.logout();
    setUser(null);
  }

  // 🔄 Refresh current user manually
  async function refreshUser(): Promise<void> {
    try {
      const me = await AuthAPI.getCurrentUser();
      setUser(me);
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes("Session expired")) {
        await AuthAPI.logout();
        setUser(null);
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Custom hook
export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
