"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  clearAllCookies,
  LoginAction,
  LogoutAction,
} from "../services/auth.service";

import {
  ClientAuthUser,
  getMyProfileAction,
} from "../services/profile.service";
import { LoginInput } from "../validation/LoginSchema";

interface AuthState {
  user: ClientAuthUser | null;
  role: "buyer" | "seller" | null;

  loading: boolean;
  isAuthenticated: boolean;
  isInitializing: boolean;
  error: string | null;

  setUser: (user: ClientAuthUser | null) => void;
  setRole: (role: "buyer" | "seller" | null) => void;

  hydrateFromServer: () => Promise<void>;
  reset: () => void;

  login: (input: LoginInput) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools((set, get) => ({
    user: null,
    role: null,
    loading: true,

    isAuthenticated: false,
    isInitializing: false,
    error: null,

    setUser: (user) => set({ user, isAuthenticated: !!user }),
    setRole: (role) => set({ role }),

    reset: () =>
      set({
        user: null,
        role: null,
        isAuthenticated: false,
        isInitializing: false,
        error: null,
        loading: false,
      }),

    hydrateFromServer: async () => {
      set({ loading: true, error: null });

      try {
        const session = await getMyProfileAction();
        set({
          user: session.user,
          role: session.role,
          isAuthenticated: session.isAuthenticated,
          loading: false,
        });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unable to hydrate";
        set({ error: message, loading: false });
      }
    },

    login: async (input) => {
      set({ isInitializing: true, loading: true, error: null });

      try {
        const res = await LoginAction(input);

        const user = res.data as unknown as ClientAuthUser;
        if (!user) throw new Error("Login succeeded but user is missing");

        get().setUser(user);
        get().setRole(input.role);

        set({
          isAuthenticated: true,
          isInitializing: false,
          loading: false,
          error: null,
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unable to login";
        set({ error: message, isInitializing: false, loading: false });
      }
    },

    logout: async () => {
      set({ isInitializing: true, loading: true, error: null });

      try {
        await LogoutAction();
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unable to logout";
        set({ error: message });
      } finally {
        await clearAllCookies();
        set({
          user: null,
          role: null,
          isAuthenticated: false,
          isInitializing: false,
          error: null,
          loading: false,
        });
      }
    },
  }))
);
