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

const clearCookies = async () => {
  await clearAuthTokenCookieServer();
  await clearAuthCookieServer();
  await clearRoleCookieServer();
};

async function LoginAction(input: LoginInput) {
  const res = await fetchApi<AuthUser>(
    `auth/${input.role.toLowerCase()}/login`,
    {
      method: "POST",
      cache: "no-store",
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
  await clearCookies();

  return { success: true };
}

type RegisterData = {
  user_id: number;
  partner_id: number;
  token: string;
  name: string;
  email: string;
};

async function RegisterAction(data: RegisterFormValues) {
  const response = await fetchApi<RegisterData>(`auth/${data.role}/signup`, {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phone: data.phoneNumber,
      password: data.password,
      email: data.email,
      company_name: data.companyName,
      name: data.name,
    }),
  });

  if (!response.success) {
    throw new Error(response.message || "Unable to register");
  }

  return response;
}

export { LoginAction, RegisterAction, LogoutAction };
