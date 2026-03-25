"use server";

import { cookies } from "next/headers";

const COMMERCE_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const TOKEN_COOKIE_NAME = "authToken";

export type ResShape<TData = unknown> = {
  message: string;
  status: number;
  success: boolean;
  timestamp: string;
  data: TData;
  error_code: string;
};

function assertBase() {
  if (!COMMERCE_BASE) throw new Error("API_BASE_URL is missing");
}

async function getTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_COOKIE_NAME)?.value ?? null;
}

function buildUrl(endpoint: string) {
  return `${COMMERCE_BASE.replace(/\/+$/, "")}/${endpoint.replace(/^\/+/, "")}`;
}

async function commerceFetch<TData>(
  endpoint: string,
  init: RequestInit,
): Promise<ResShape<TData>> {
  assertBase();
  const url = buildUrl(endpoint);

  const res = await fetch(url, {
    ...init,
    cache: "no-store",
  });

  const json = (await res.json()) as ResShape<TData>;
  return json;
}

export type CartResponse = unknown;

export type AddToCartInput = {
  product_id: number;
  quantity: number;
};

export type UpdateCartInput = {
  line_id: number;
  quantity: number;
};

export async function getCartService(): Promise<ResShape<CartResponse>> {
  const token = await getTokenFromCookies();
  if (!token) throw new Error("UNAUTHENTICATED");

  return commerceFetch<CartResponse>("cart", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function addToCartService(
  input: AddToCartInput,
): Promise<ResShape<unknown>> {
  const token = await getTokenFromCookies();
  if (!token) throw new Error("UNAUTHENTICATED");

  const res = await commerceFetch<unknown>("cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });

  if (!res.success) throw new Error(res.message || "Unable to add to cart");
  return res;
}

export async function updateCartService(
  input: UpdateCartInput,
): Promise<ResShape<unknown>> {
  const token = await getTokenFromCookies();
  if (!token) throw new Error("UNAUTHENTICATED");

  const res = await commerceFetch<unknown>("cart/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });

  if (!res.success) throw new Error(res.message || "Unable to update cart");
  return res;
}

export async function validateCartStockService(): Promise<ResShape<unknown>> {
  const token = await getTokenFromCookies();
  if (!token) throw new Error("UNAUTHENTICATED");

  return commerceFetch<unknown>("cart/validate-stock", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getAvailableRewardsService(): Promise<ResShape<unknown>> {
  const token = await getTokenFromCookies();
  if (!token) throw new Error("UNAUTHENTICATED");

  return commerceFetch<unknown>("cart/available-rewards", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getBuyerCouponsService(
  include_public = true,
): Promise<ResShape<unknown>> {
  const token = await getTokenFromCookies();
  if (!token) throw new Error("UNAUTHENTICATED");

  return commerceFetch<unknown>(
    `buyer/coupons?include_public=${include_public}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

export async function applyCouponService(payload: Record<string, unknown>) {
  const token = await getTokenFromCookies();
  if (!token) throw new Error("UNAUTHENTICATED");

  const res = await commerceFetch<unknown>("cart/apply-coupon", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.success) throw new Error(res.message || "Unable to apply coupon");
  return res;
}

export async function removeCouponService(
  payload: Record<string, unknown> = {},
) {
  const token = await getTokenFromCookies();
  if (!token) throw new Error("UNAUTHENTICATED");

  const res = await commerceFetch<unknown>("cart/remove-coupon", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.success) throw new Error(res.message || "Unable to remove coupon");
  return res;
}

export async function claimRewardService(payload: Record<string, unknown>) {
  const token = await getTokenFromCookies();
  if (!token) throw new Error("UNAUTHENTICATED");

  const res = await commerceFetch<unknown>("cart/claim-reward", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.success) throw new Error(res.message || "Unable to claim reward");
  return res;
}
