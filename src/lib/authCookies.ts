import { cookies } from "next/headers";

const AUTH_COOKIE_NAME = "isLoggedIn";

export async function getAuthFromCookieServer(): Promise<boolean> {
  const cookieStore = await cookies();
  const value = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  return value === "true";
}

export async function setAuthCookieServer(loggedIn: boolean, days = 7) {
  const cookieStore = await cookies();
  const maxAge = days * 24 * 60 * 60;

  cookieStore.set(AUTH_COOKIE_NAME, loggedIn ? "true" : "false", {
    path: "/",
    maxAge,
    sameSite: "lax",
  });
}

export async function clearAuthCookieServer() {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, "false", {
    path: "/",
    maxAge: 0,
    sameSite: "lax",
    secure: true,
  });
}

const ROLE_COOKIE_NAME = "role";

export async function getRoleFromCookieServer(): Promise<
  "buyer" | "seller" | null
> {
  const cookieStore = await cookies();
  const value = cookieStore.get(ROLE_COOKIE_NAME)?.value;
  if (!value) return null;
  return value === "buyer" || value === "seller" ? value : null;
}
