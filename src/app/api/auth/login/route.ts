import { NextResponse } from "next/server";
import { setAuthCookieServer } from "@/src/lib/authCookies";
import type { LoginInput } from "@/src/validation/LoginSchema";
import type { AuthResponse } from "@/src/types/auth";

export async function POST(req: Request) {
  const body = (await req.json()) as LoginInput;
  const { identifier, password } = body;

  if (password !== "12345678") {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const user = {
    id: "1",
    name: "John Doe",
    email: identifier,
  };

  setAuthCookieServer(true);

  return NextResponse.json<AuthResponse>({ user });
}
