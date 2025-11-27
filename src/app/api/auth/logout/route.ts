import { NextResponse } from "next/server";
import { clearAuthCookieServer } from "@/src/lib/authCookies";

export async function POST() {
  clearAuthCookieServer();
  return NextResponse.json({ success: true });
}
