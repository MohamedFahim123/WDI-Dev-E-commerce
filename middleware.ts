import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const TOKEN_COOKIE = "auth_token";
const ROLE_COOKIE = "role";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const match = pathname.match(/^\/([^/]+)\/(buyer|seller)(\/|$)/);
  if (!match) return NextResponse.next();

  const lang = match[1];
  const section = match[2];

  const token = req.cookies.get(TOKEN_COOKIE)?.value;
  const role = req.cookies.get(ROLE_COOKIE)?.value;

  if (!token) {
    return NextResponse.redirect(new URL(`/${lang}/auth/login`, req.url));
  }

  if (role !== section) {
    return NextResponse.redirect(new URL(`/${lang}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:lang/buyer/:path*", "/:lang/seller/:path*"],
};
