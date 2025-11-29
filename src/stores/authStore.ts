import {
  clearUserFromLocalStorage,
  loadUserFromLocalStorage,
  saveUserToLocalStorage,
} from "@/src/lib/authClient";
import { authService } from "@/src/services/authService";
import { AuthUser } from "@/src/types/auth";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { LoginInput } from "./../validation/LoginSchema";

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

  login: (input: LoginInput) => Promise<void>;
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

    async login(input) {
      const { identifier, password, role } = input;
      set({ isInitializing: true, error: null });

      try {
        // 👇 include role in the request payload
        const res = await authService.login({ identifier, password, role });
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
