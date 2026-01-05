import {
  getAuthTokenFromCookieServer,
  getRoleFromCookieServer,
} from "@/src/lib/authCookies";
import { redirect } from "next/navigation";

type Role = "buyer" | "seller";

type GuardArgs = {
  lang: string;

  requireAuth?: boolean;

  allowRoles?: Role[];
  denyRoles?: Role[];

  redirectTo?: string;
  loginRedirectTo?: string;
};

export async function guardRole({
  lang,
  requireAuth = true,
  allowRoles,
  denyRoles,
  redirectTo = `/${lang}`,
  loginRedirectTo = `/${lang}/auth/login`,
}: GuardArgs) {
  const token = await getAuthTokenFromCookieServer();
  const role = await getRoleFromCookieServer();

  if (requireAuth) {
    if (!token) redirect(loginRedirectTo);
    if (!role) redirect(loginRedirectTo);
  }

  if (allowRoles?.length) {
    if (!role || !allowRoles.includes(role)) redirect(redirectTo);
  }

  if (denyRoles?.length) {
    if (role && denyRoles.includes(role)) redirect(redirectTo);
  }
}

export async function requireRole(args: {
  lang: string;
  role: Role;
  redirectTo?: string;
  loginRedirectTo?: string;
}) {
  return guardRole({
    lang: args.lang,
    allowRoles: [args.role],
    redirectTo: args.redirectTo,
    loginRedirectTo: args.loginRedirectTo,
    requireAuth: true,
  });
}

export async function blockRole(args: {
  lang: string;
  role: Role;
  redirectTo?: string;
  requireAuth?: boolean;
  loginRedirectTo?: string;
}) {
  return guardRole({
    lang: args.lang,
    denyRoles: [args.role],
    redirectTo: args.redirectTo,
    loginRedirectTo: args.loginRedirectTo,
    requireAuth: args.requireAuth ?? true,
  });
}

export async function requireGuest(args: {
  lang: string;
  redirectTo?: string | ((lang: string, role: Role) => string);
}) {
  const token = await getAuthTokenFromCookieServer();
  const role = (await getRoleFromCookieServer()) as Role | null;

  if (token && role) {
    const target =
      typeof args.redirectTo === "function"
        ? args.redirectTo(args.lang, role)
        : args.redirectTo ?? `/${args.lang}/${role}/profile`;

    redirect(target);
  }
}
