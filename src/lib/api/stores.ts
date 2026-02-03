import type { ApiStoresListResponse } from "@/src/types/api/store.api.types";
import { getAuthTokenFromCookieServer } from "../authCookies";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export async function fetchStoresList(
  endpoint: string,
  args?: {
    limit?: number;
    offset?: number;
  }
) {
  if (!API_BASE_URL) {
    throw new Error("Missing API_BASE_URL in environment variables");
  }

  const limit = args?.limit ?? 50;
  const offset = args?.offset ?? 0;

  const url = new URL(`${API_BASE_URL}/${endpoint}`);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("offset", String(offset));
  const token = await getAuthTokenFromCookieServer();

  const res = await fetch(url.toString(), {
    cache: "no-store",
    headers: {
      Accept: "application/json",
      Authorization: endpoint === "seller/stores" ? `Bearer ${token}` : "",
    },
  });


  if (!res.ok) {
    throw new Error(`Failed to fetch stores: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as ApiStoresListResponse;

  if (!json.success) {
    throw new Error(json.message || "Failed to fetch stores");
  }

  return json;
}
