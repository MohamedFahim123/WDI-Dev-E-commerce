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

  return (await res.json()) as ResShape<TData>;
}

export type WishlistResponse = unknown;

export async function getWishlistService(): Promise<
  ResShape<WishlistResponse>
> {
  const token = await getTokenFromCookies();
  if (!token) throw new Error("UNAUTHENTICATED");

  return commerceFetch<WishlistResponse>("wishlist", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function addWishlistService(product_id: number) {
  const token = await getTokenFromCookies();
  if (!token) throw new Error("UNAUTHENTICATED");

  const res = await commerceFetch<unknown>("wishlist/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ product_id }),
  });

  if (!res.success) throw new Error(res.message || "Unable to add to wishlist");
  return res;
}

export async function removeWishlistService(product_id: number) {
  const token = await getTokenFromCookies();
  if (!token) throw new Error("UNAUTHENTICATED");

  const res = await commerceFetch<unknown>("wishlist/remove", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
  const token = await getTokenFromCookies();
  if (!token) throw new Error("UNAUTHENTICATED");

  const res = await commerceFetch<unknown>("wishlist/move-to-cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.success) throw new Error(res.message || "Unable to move to cart");
  return res;
}
