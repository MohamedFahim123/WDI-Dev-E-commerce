
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
