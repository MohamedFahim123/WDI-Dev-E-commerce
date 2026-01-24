"use server";

import { getAuthTokenFromCookieServer } from "@/src/lib/authCookies";
import { fetchApi } from "@/src/lib/fetchApi";

type ApiResponse<T> = {
  success: boolean;
  status: number;
  message: string;
  data: T;
  timestamp?: string;
};

function authHeader(token: string | null): Record<string, string> {
  return token ? { Authorization: `Bearer ${token}` } : {};
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

export async function getCartService(): Promise<ApiResponse<CartResponse>> {
  const token = await getAuthTokenFromCookieServer();

  return fetchApi<CartResponse>("cart", {
    method: "GET",
    cache: "no-store",
    headers: {
      ...authHeader(token),
    },
  });
}

export async function addToCartService(
  input: AddToCartInput,
): Promise<ApiResponse<unknown>> {
  const token = await getAuthTokenFromCookieServer();

  const res = await fetchApi<unknown>("cart/add", {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(token),
    },
    body: JSON.stringify(input),
  });

  if (!res.success) throw new Error(res.message || "Unable to add to cart");
  return res;
}

export async function updateCartService(
  input: UpdateCartInput,
): Promise<ApiResponse<unknown>> {
  const token = await getAuthTokenFromCookieServer();

  const res = await fetchApi<unknown>("cart/update", {
    method: "PUT",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(token),
    },
    body: JSON.stringify(input),
  });

  if (!res.success) throw new Error(res.message || "Unable to update cart");
  return res;
}

export async function validateCartStockService(): Promise<
  ApiResponse<unknown>
> {
  const token = await getAuthTokenFromCookieServer();

  return fetchApi<unknown>("cart/validate-stock", {
    method: "GET",
    cache: "no-store",

    headers: {
      ...authHeader(token),
    },
  });
}

export async function getAvailableRewardsService(): Promise<
  ApiResponse<unknown>
> {
  const token = await getAuthTokenFromCookieServer();

  return fetchApi<unknown>("cart/available-rewards", {
    method: "GET",
    cache: "no-store",

    headers: {
      ...authHeader(token),
    },
  });
}

export async function getBuyerCouponsService(
  include_public = true,
): Promise<ApiResponse<unknown>> {
  const token = await getAuthTokenFromCookieServer();

  return fetchApi<unknown>(`buyer/coupons?include_public=${include_public}`, {
    method: "GET",
    cache: "no-store",

    headers: {
      ...authHeader(token),
    },
  });
}

export async function applyCouponService(payload: Record<string, unknown>) {
  const token = await getAuthTokenFromCookieServer();

  const res = await fetchApi<unknown>("cart/apply-coupon", {
    method: "POST",
    cache: "no-store",

    headers: {
      "Content-Type": "application/json",
      ...authHeader(token),
    },
    body: JSON.stringify(payload),
  });

  if (!res.success) throw new Error(res.message || "Unable to apply coupon");
  return res;
}

export async function removeCouponService(
  payload: Record<string, unknown> = {},
) {
  const token = await getAuthTokenFromCookieServer();

  const res = await fetchApi<unknown>("cart/remove-coupon", {
    method: "POST",
    cache: "no-store",

    headers: {
      "Content-Type": "application/json",
      ...authHeader(token),
    },
    body: JSON.stringify(payload),
  });

  if (!res.success) throw new Error(res.message || "Unable to remove coupon");
  return res;
}

export async function claimRewardService(payload: Record<string, unknown>) {
  const token = await getAuthTokenFromCookieServer();

  const res = await fetchApi<unknown>("cart/claim-reward", {
    method: "POST",
    cache: "no-store",

    headers: {
      "Content-Type": "application/json",
      ...authHeader(token),
    },
    body: JSON.stringify(payload),
  });

  if (!res.success) throw new Error(res.message || "Unable to claim reward");
  return res;
}
