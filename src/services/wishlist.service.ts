"use server";

import { fetchApi } from "@/src/lib/fetchApi";
import { getAuthTokenFromCookieServer } from "@/src/lib/authCookies";

const COMMERCE_BASE = process.env.COMMERCE_API_BASE_URL || "";

type ApiResponse<T> = {
  success: boolean;
  status: number;
  message: string;
  data: T;
  timestamp?: string;
};

function assertBase() {
  if (!COMMERCE_BASE) {
    throw new Error("COMMERCE_API_BASE_URL is missing");
  }
}

function authHeader(token: string | null): Record<string, string> {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export type WishlistResponse = unknown;

export async function getWishlistService(): Promise<
  ApiResponse<WishlistResponse>
> {
  assertBase();
  const token = await getAuthTokenFromCookieServer();

  return fetchApi<WishlistResponse>("wishlist", {
    method: "GET",
    cache: "no-store",
    headers: {
      ...authHeader(token),
    },
  });
}

export async function addWishlistService(product_id: number) {
  assertBase();
  const token = await getAuthTokenFromCookieServer();

  const res = await fetchApi<unknown>("wishlist/add", {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(token),
    },
    body: JSON.stringify({ product_id }),
  });

  if (!res.success) throw new Error(res.message || "Unable to add to wishlist");
  return res;
}

export async function removeWishlistService(product_id: number) {
  assertBase();
  const token = await getAuthTokenFromCookieServer();

  const res = await fetchApi<unknown>("wishlist/remove", {
    method: "DELETE",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(token),
    },
    body: JSON.stringify({ product_id }),
  });

  if (!res.success)
    throw new Error(res.message || "Unable to remove from wishlist");
  return res;
}

export async function moveWishlistToCartService(
  payload: Record<string, unknown>,
) {
  assertBase();
  const token = await getAuthTokenFromCookieServer();

  const res = await fetchApi<unknown>("wishlist/move-to-cart", {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(token),
    },
    body: JSON.stringify(payload),
  });

  if (!res.success) throw new Error(res.message || "Unable to move to cart");
  return res;
}
