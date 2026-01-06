"use server";

import { fetchApi } from "@/src/lib/fetchApi";
import { AuthUser } from "@/src/types/auth";
import { LoginInput } from "@/src/validation/LoginSchema";
import { RegisterFormValues } from "../components/Auth/RegisterForm/RegisterForm";
import {
  clearAuthCookieServer,
  clearAuthTokenCookieServer,
  clearRoleCookieServer,
  getAuthTokenFromCookieServer,
  setAuthCookieServer,
  setAuthTokenCookieServer,
  setRoleCookieServer,
} from "../lib/authCookies";

export const clearAllCookies = async () => {
  await clearAuthTokenCookieServer();
  await clearAuthCookieServer();
  await clearRoleCookieServer();
};

async function LoginAction(input: LoginInput) {
  const res = await fetchApi<AuthUser>(
    `auth/${input.role.toLowerCase()}/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: input.identifier,
        password: input.password,
      }),
    }
  );

  if (!res.success) {
    throw new Error(res.message || "Unable to login");
  }

  await setAuthTokenCookieServer(res?.data.token);
  await setAuthCookieServer(true);
  await setRoleCookieServer(input.role);

  const { ...safeUser } = res.data;

  return {
    ...res,
    data: safeUser,
  };
}

async function LogoutAction() {
  const res = await fetchApi(`auth/logout`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await getAuthTokenFromCookieServer()}`,
    },
  });

  if (!res.success) {
    throw new Error(res.message || "Unable to Logout");
  }

  return { success: true };
}

type RegisterData = {
  user_id: number;
  partner_id: number;
  token: string;
  name: string;
  email: string;
};

/**
 * Step 1 (Details): Buyer Signup
 * POST auth/buyer/signup
 * body: { name, email, password, phone }
*/
async function RegisterBuyerAction(data: RegisterFormValues) {
  const response = await fetchApi<RegisterData>(`auth/buyer/signup`, {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phoneNumber,
    }),
  });

  if (!response.success)
    throw new Error(response.message || "Unable to register buyer");
  return response;
}

/**
 * Step 1 (Details): Seller Signup
 * POST auth/seller/signup
 * body: { name, email, password, company_name }
 */
async function RegisterSellerAction(data: RegisterFormValues) {
  const response = await fetchApi<RegisterData>(`auth/seller/signup`, {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
      company_name: data.companyName,
    }),
  });

  if (!response.success) {
    throw new Error(response.message || "Unable to register seller");
  }

  return response;
}

/**
 * Step 2 (OTP): Verify OTP
 * Change endpoint if your backend uses different route.
 */
type VerifyOtpInput = {
  role: "buyer" | "seller";
  email: string;
  otp: string;
};

async function VerifyOtpAction(input: VerifyOtpInput) {
  const response = await fetchApi<{ verified: boolean }>(`auth/otp/verify`, {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: input.email,
      otp: input.otp,
    }),
  });

  if (!response.success) {
    throw new Error(response.message || "Unable to verify OTP");
  }

  return response;
}

/**
 * Optional: Resend OTP
 * Change endpoint if your backend uses different route.
 */
type ResendOtpInput = {
  role: "buyer" | "seller";
  email: string;
};

async function ResendOtpAction(input: ResendOtpInput) {
  const response = await fetchApi<{ sent: boolean }>(
    `auth/${input.role}/resend-otp`,
    {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: input.email,
      }),
    }
  );

  if (!response.success) {
    throw new Error(response.message || "Unable to resend OTP");
  }

  return response;
}

export {
  LoginAction,
  LogoutAction,
  RegisterBuyerAction,
  RegisterSellerAction,
  VerifyOtpAction,
  ResendOtpAction,
};
