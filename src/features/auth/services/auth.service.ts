"use server";

import { fetchApi } from "@/src/lib/fetchApi";
import { AuthUser } from "@/src/types/auth";
import { LoginInput } from "@/src/validation/LoginSchema";
import { RegisterFormValues } from "../components/Auth/RegisterForm/RegisterForm";

import {
  clearAuthCookieServer,
  setResetEmailCookieServer,
  clearAuthTokenCookieServer,
  clearRoleCookieServer,
  getAuthTokenFromCookieServer,
  setAuthCookieServer,
  setAuthTokenCookieServer,
  setRoleCookieServer,
  getResetEmailFromCookieServer,
  clearResetEmailCookieServer,
} from "@/src/lib/authCookies";

export const clearAllCookies = async () => {
  await clearAuthTokenCookieServer();
  await clearAuthCookieServer();
  await clearRoleCookieServer();
};

async function LoginAction(input: LoginInput) {
  const res = await fetchApi<AuthUser>(
    `auth/${input.role.toLowerCase()}/login?t=${Date.now()}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: input.identifier,
        password: input.password,
      }),
    },
  );

  if (!res.success) {
    throw new Error(res.message || "Unable to login");
  }

  await setAuthTokenCookieServer(res?.data);
  await setAuthCookieServer(true);
  await setRoleCookieServer(input?.role);

  const { ...safeUser } = res.data;

  return {
    ...res,
    data: safeUser,
  };
}

async function LogoutAction() {
  try {
    const token = await getAuthTokenFromCookieServer();
    const res = await fetchApi(`auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.success) {
      throw new Error(res.message || "Unable to Logout");
    }

    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false, error: "Logout failed" };
  }
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
    },
  );

  if (!response.success) {
    throw new Error(response.message || "Unable to resend OTP");
  }

  return response;
}

type ResetPasswordRequestResponse = {
  sent: boolean;
};

async function RequestPasswordResetAction(email: string) {
  const res = await fetchApi<ResetPasswordRequestResponse>(
    "auth/password/reset/request",
    {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    },
  );

  if (!res.success) {
    throw new Error(res.message || "Unable to request password reset");
  }

  await setResetEmailCookieServer(email);

  return res;
}

type VerifyResetOtpResponse = {
  verified: boolean;
};

async function VerifyResetPasswordOtpAction(otp: string) {
  const email = await getResetEmailFromCookieServer();

  if (!email) {
    throw new Error(
      "Reset email is missing. Please restart the password reset flow.",
    );
  }

  const res = await fetchApi<VerifyResetOtpResponse>(
    "auth/password/reset/verify",
    {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    },
  );

  if (!res.success) {
    throw new Error(res.message || "Unable to verify OTP");
  }

  return res;
}

async function ClearResetPasswordFlowAction() {
  await clearResetEmailCookieServer();
  return { success: true };
}

async function ResendResetOtpAction() {
  const email = await getResetEmailFromCookieServer();
  if (!email) throw new Error("Reset email is missing.");

  const res = await fetchApi<{ sent: boolean }>("auth/password/reset/request", {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.success) throw new Error(res.message || "Unable to resend code");
  return res;
}

type ResetUpdateResponse = {
  success: boolean;
  message?: string;
};

export async function ResetPasswordUpdateAction(newPassword: string) {
  const email = await getResetEmailFromCookieServer();

  if (!email) {
    throw new Error("Reset email is missing. Please restart the reset flow.");
  }

  const res = await fetchApi<ResetUpdateResponse>(
    "auth/password/reset/update",
    {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        new_password: newPassword,
      }),
    },
  );

  if (!res.success) {
    throw new Error(res.message || "Unable to update password");
  }

  await clearResetEmailCookieServer();

  return res;
}

export {
  LoginAction,
  LogoutAction,
  RegisterBuyerAction,
  RegisterSellerAction,
  VerifyOtpAction,
  ResendOtpAction,
  RequestPasswordResetAction,
  VerifyResetPasswordOtpAction,
  ClearResetPasswordFlowAction,
  ResendResetOtpAction,
};

