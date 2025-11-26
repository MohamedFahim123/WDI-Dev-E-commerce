"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { AuthUser } from "@/src/types/auth";
import { getAuthFromCookie } from "@/src/lib/authCookies";

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  error: string | null;

  setUser: (user: AuthUser | null) => void;
  setAuthenticated: (value: boolean) => void;
  setError: (message: string | null) => void;
  finishInitializing: () => void;
  reset: () => void;

  login: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    user: null,
    isAuthenticated:
      typeof window !== "undefined" ? !!getAuthFromCookie() : false,
    isInitializing: false,
    error: null,

    setUser: (user) => set({ user }),
    setAuthenticated: (value) => set({ isAuthenticated: value }),
    setError: (message) => set({ error: message }),
    finishInitializing: () => set({ isInitializing: false }),
    reset: () =>
      set({
        user: null,
        isAuthenticated: false,
        error: null,
      }),

    async login(identifier, password) {
      set({ isInitializing: true, error: null });
      await new Promise((r) => setTimeout(r, 800));

      if (password === "12345678") {
        set({
          user: { id: "1", name: "John Doe", email: identifier },
          isAuthenticated: true,
          isInitializing: false,
          error: null,
        });
      } else {
        set({
          error: "Invalid credentials. Try using password 12345678.",
          isInitializing: false,
        });
      }
    },

    /** Dummy logout */
    logout() {
      set({
        user: null,
        isAuthenticated: false,
        error: null,
      });
    },
  }))
);
