import type { AuthUser } from "@/src/types/auth";

const USER_STORAGE_KEY = "currentUser";

export function saveUserToLocalStorage(user: AuthUser) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } catch (err) {
    console.error("Failed to save user to localStorage", err);
  }
}

export function loadUserFromLocalStorage(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch (err) {
    console.error("Failed to parse user from localStorage", err);
    return null;
  }
}

export function clearUserFromLocalStorage() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(USER_STORAGE_KEY);
  } catch (err) {
    console.error("Failed to clear user from localStorage", err);
  }
}

const ROLE_COOKIE_KEY = "role";

export function setRoleCookie(role: "buyer" | "seller", days = 7) {
  if (typeof document === "undefined") return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${encodeURIComponent(
    ROLE_COOKIE_KEY
  )}=${encodeURIComponent(role)}; path=/; max-age=${maxAge}; samesite=lax${
    location.protocol === "https:" ? "; secure" : ""
  }`;
}

export function getRoleFromCookie(): "buyer" | "seller" | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${encodeURIComponent(ROLE_COOKIE_KEY)}=`));
  if (!match) return null;
  const value = decodeURIComponent(match.split("=")[1] || "");
  return value === "buyer" || value === "seller" ? value : null;
}

export function clearRoleCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${encodeURIComponent(
    ROLE_COOKIE_KEY
  )}=; path=/; max-age=0; samesite=lax`;
}
