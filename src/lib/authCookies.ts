"use server";

import { cookies } from "next/headers";

const AUTH_COOKIE_NAME = "isLoggedIn";
const ROLE_COOKIE_NAME = "role";
const TOKEN_COOKIE_NAME = "authToken";

const isProd = process.env.NODE_ENV === "production";

export async function getAuthFromCookieServer(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE_NAME)?.value === "true";
}

export async function setAuthCookieServer(loggedIn: boolean, days = 7) {
  const cookieStore = await cookies();
  const maxAge = days * 24 * 60 * 60;

  cookieStore.set(AUTH_COOKIE_NAME, loggedIn ? "true" : "false", {
    path: "/",
    maxAge,
    sameSite: "lax",
    httpOnly: true,
    secure: isProd,
  });
}

export async function clearAuthCookieServer() {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, "false", {
    path: "/",
    maxAge: 0,
    sameSite: "lax",
    httpOnly: true,
    secure: isProd,
  });
}

export async function getRoleFromCookieServer(): Promise<
  "buyer" | "seller" | null
> {
  const cookieStore = await cookies();
  const value = cookieStore.get(ROLE_COOKIE_NAME)?.value;
  if (!value) return null;
  return value === "buyer" || value === "seller" ? value : null;
}

export async function setRoleCookieServer(role: "buyer" | "seller", days = 7) {
  const cookieStore = await cookies();
  const maxAge = days * 24 * 60 * 60;

  cookieStore.set(ROLE_COOKIE_NAME, role, {
    path: "/",
    maxAge,
    sameSite: "lax",
    httpOnly: true,
    secure: isProd,
  });
}

export async function clearRoleCookieServer() {
  const cookieStore = await cookies();
  cookieStore.set(ROLE_COOKIE_NAME, "", {
    path: "/",
    maxAge: 0,
    sameSite: "lax",
    httpOnly: true,
    secure: isProd,
  });
}

export async function getAuthTokenFromCookieServer(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_COOKIE_NAME)?.value ?? null;
}

export async function setAuthTokenCookieServer(token: string, days = 7) {
  const cookieStore = await cookies();
  const maxAge = days * 24 * 60 * 60;

  cookieStore.set(TOKEN_COOKIE_NAME, token, {
    path: "/",
    maxAge,
    sameSite: "lax",
    httpOnly: true,
    secure: isProd,
  });
}

export async function clearAuthTokenCookieServer() {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_COOKIE_NAME, "", {
    path: "/",
    maxAge: 0,
    sameSite: "lax",
    httpOnly: true,
    secure: isProd,
  });
}
