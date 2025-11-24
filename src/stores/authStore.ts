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
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    user: null,
    isAuthenticated:
      typeof window !== "undefined" ? getAuthFromCookie() : false,
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
  }))
);
