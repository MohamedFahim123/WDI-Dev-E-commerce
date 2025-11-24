"use client";

const AUTH_COOKIE_NAME = "isLoggedIn";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

export function setAuthCookie(loggedIn: boolean, days = 7) {
  if (typeof document === "undefined") return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${AUTH_COOKIE_NAME}=${
    loggedIn ? "true" : "false"
  }; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function clearAuthCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_COOKIE_NAME}=false; path=/; max-age=0; SameSite=Lax`;
}

export function getAuthFromCookie(): boolean {
  const value = getCookie(AUTH_COOKIE_NAME);
  return value === "true";
}
