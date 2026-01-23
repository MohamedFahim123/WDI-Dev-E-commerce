"use server";

import { fetchApi } from "@/src/lib/fetchApi";
import {
  getAuthTokenFromCookieServer,
  getRoleFromCookieServer,
} from "@/src/lib/authCookies";

export type Role = "buyer" | "seller";

export type ClientAuthUser = {
  id: number;
  name: string;
  email: string;
  phone: string;

  street: string;
  street2: string;
  city: string;

  state_id: number | null;
  zip: string;

  country_id: number | null;
  country_name: string;
  state_name: string;
};

export type BuyerProfileResponse = {
  id: number;
  name: string;
  email: string;
  phone: string;

  street: string;
  street2: string;
  city: string;

  state_id: number | null;
  state_name: string;

  zip: string;

  country_id: number | null;
  country_name: string;
};

export type SellerProfileResponse = BuyerProfileResponse;

export type UpdateBuyerProfileInput = {
  name: string;
  phone: string;
  street: string;
  city: string;
  state_id: number | null;
  zip: string;
  country_id: number | null;
};

export type UpdateSellerProfileInput = {
  name: string;
  email: string;
  phone: string;
  street: string;
  street2: string;
  city: string;
  state_id: number | null;
  zip: string;
  country_id: number | null;
};

export type GetProfileResult = {
  user: ClientAuthUser;
  role: Role;
  isAuthenticated: boolean;
};

function normalizeProfile(
  raw: BuyerProfileResponse | SellerProfileResponse,
): ClientAuthUser {
  return {
    id: raw.id,
    name: raw.name ?? "",
    email: raw.email ?? "",
    phone: raw.phone ?? "",

    street: raw.street ?? "",
    street2: raw.street2 ?? "",
    city: raw.city ?? "",

    state_id: raw.state_id ?? null,
    state_name: raw.state_name ?? "",

    zip: raw.zip ?? "",

    country_id: raw.country_id ?? null,
    country_name: raw.country_name ?? "",
  };
}

export async function getMyProfileAction(): Promise<GetProfileResult> {
  const token = await getAuthTokenFromCookieServer();
  const role = await getRoleFromCookieServer();

  if (!token || !role) throw new Error("Not authenticated");

  const endpoint = role === "seller" ? "seller/profile" : "buyer/get-profile";

  const res = await fetchApi<BuyerProfileResponse | SellerProfileResponse>(
    endpoint,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  console.log(res)

  if (!res.success) throw new Error(res.message || "Unable to fetch profile");

  return {
    user: normalizeProfile(res.data),
    role,
    isAuthenticated: true,
  };
}

/**
 * Role-aware update:
 * - buyer: no email, no street2
 * - seller: includes email + street2
 */
export async function updateMyProfileAction(
  input: UpdateBuyerProfileInput | UpdateSellerProfileInput,
) {
  const token = await getAuthTokenFromCookieServer();
  const role = await getRoleFromCookieServer();

  if (!token || !role) throw new Error("Not authenticated");

  const endpoint =
    role === "seller" ? "seller/profile" : "buyer/update-profile";

  if (role === "buyer") {
    if ("email" in input || "street2" in input) {
      throw new Error(
        "Invalid payload: buyer update must not include email/street2",
      );
    }
  } else {
    if (!("email" in input)) {
      throw new Error("Invalid payload: seller update must include email");
    }
  }

  const res = await fetchApi<BuyerProfileResponse | SellerProfileResponse>(
    endpoint,
    {
      method: "PUT",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    },
  );

  if (!res.success) throw new Error(res.message || "Unable to update profile");

  return {
    ...res,
    data: res.data ? normalizeProfile(res.data) : null,
  };
}
