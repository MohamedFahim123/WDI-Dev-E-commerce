"use client";

import { AuthResponse } from "@/src/types/auth";
import { clearAuthCookie, setAuthCookie } from "@/src/lib/authCookies";
import { LoginInput } from "../validation/LoginSchema";
import { RegisterStep1Input, RegisterStep2Input, RegisterStep3Input } from "../validation/RegisterSchemas";
import { ForgotPasswordStep1Input, ForgotPasswordStep2Input } from "../validation/ForgotPasswordSchemas";

const API_BASE = "/api/auth"; 

async function handleJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = "Something went wrong";
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
    } catch {
      message = res.statusText || message;
    }
    throw new Error(message);
  }

  return res.json() as Promise<T>;
}

export const authService = {
  async login(payload: LoginInput): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await handleJson<AuthResponse>(res);

    setAuthCookie(true);

    return data;
  },

  async logout(): Promise<void> {
    clearAuthCookie();
    try {
      await fetch(`${API_BASE}/logout`, { method: "POST" });
    } catch {
    }
  },


  async registerStep1(payload: RegisterStep1Input): Promise<{ email: string }> {
    const res = await fetch(`${API_BASE}/register/step1`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return handleJson(res);
  },

  async registerStep2(payload: RegisterStep2Input): Promise<{ email: string }> {
    const res = await fetch(`${API_BASE}/register/step2-verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return handleJson(res);
  },

  async registerStep3(payload: RegisterStep3Input): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE}/register/step3-complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await handleJson<AuthResponse>(res);
    setAuthCookie(true);
    return data;
  },


  async forgotPasswordStep1(
    payload: ForgotPasswordStep1Input
  ): Promise<{ email: string }> {
    const res = await fetch(`${API_BASE}/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return handleJson(res);
  },

  async forgotPasswordStep2(
    payload: ForgotPasswordStep2Input
  ): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/forgot-password/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return handleJson(res);
  },
};
