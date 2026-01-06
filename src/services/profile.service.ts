"use server";

import {
  clearAuthCookieServer,
  clearAuthTokenCookieServer,
  clearRoleCookieServer,
  getAuthTokenFromCookieServer,
  getRoleFromCookieServer,
} from "@/src/lib/authCookies";
import { AuthUser } from "@/src/types/auth";
import { fetchApi } from "../lib/fetchApi";

export type ClientAuthUser = Omit<AuthUser, "token">;

export type SessionResult = {
  user: ClientAuthUser | null;
  role: "buyer" | "seller" | null;
  isAuthenticated: boolean;
};

export async function getMyProfileAction(): Promise<SessionResult> {
  const role = await getRoleFromCookieServer();
  const token = await getAuthTokenFromCookieServer();

  try {
    if (!role || !token) {
      return { user: null, role: role ?? null, isAuthenticated: false };
    }
    const res = await fetchApi<AuthUser>(`${role}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    ("first")

    if (!res?.success || !res?.data) {
      await clearAuthTokenCookieServer();
      await clearAuthCookieServer();
      await clearRoleCookieServer();
      return { user: null, role: null, isAuthenticated: false };
    }

    const { ...safeUser } = res.data;

    return {
      ...res,
      user: safeUser,
      role: role,
      isAuthenticated: true,
    };
  } catch {
    return { user: null, role, isAuthenticated: false };
  }
}
