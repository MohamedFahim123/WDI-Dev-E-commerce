
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { AuthUser } from "@/src/types/auth";
import { authService } from "@/src/services/authService";
import {
  loadUserFromLocalStorage,
  saveUserToLocalStorage,
  clearUserFromLocalStorage,
} from "@/src/lib/authClient";

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
  hydrateFromStorage: () => void;

  login: (identifier: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    user: null,
    isAuthenticated: false,
    isInitializing: false,
    error: null,

    setUser: (user) => {
      if (user) {
        saveUserToLocalStorage(user);
      } else {
        clearUserFromLocalStorage();
      }
      set({ user, isAuthenticated: !!user });
    },

    setAuthenticated: (value) => set({ isAuthenticated: value }),
    setError: (message) => set({ error: message }),
    finishInitializing: () => set({ isInitializing: false }),

    reset: () => {
      clearUserFromLocalStorage();
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isInitializing: false,
      });
    },

    hydrateFromStorage: () => {
      if (typeof window === "undefined") return;
      const user = loadUserFromLocalStorage();
      set({ user, isAuthenticated: !!user });
    },

    async login(identifier, password) {
      set({ isInitializing: true, error: null });

      try {
        const res = await authService.login({ identifier, password });
        set({
          user: res.user,
          isAuthenticated: true,
          isInitializing: false,
          error: null,
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unable to login";
        set({
          error: message,
          isInitializing: false,
        });
      }
    },

    async logout() {
      set({ isInitializing: true, error: null });

      try {
        await authService.logout();
      } finally {
        clearUserFromLocalStorage();
        set({
          user: null,
          isAuthenticated: false,
          isInitializing: false,
          error: null,
        });
      }
    },
  }))
);
