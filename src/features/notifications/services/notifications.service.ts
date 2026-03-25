import "server-only";

import { getAuthTokenFromCookieServer } from "@/src/lib/authCookies";
import type {
  BackendApiResponse,
  MarkOkData,
  NotificationsListData,
  NotificationsQuery,
  UnreadCountData,
} from "@/src/types/notification.types";

function getBackendBaseUrl(): string {
  return (
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    ""
  );
}

function joinUrl(base: string, path: string) {
  const b = base.replace(/\/+$/, "");
  const p = path.replace(/^\/+/, "");
  return `${b}/${p}`;
}

function buildQs(q: NotificationsQuery) {
  const sp = new URLSearchParams();
  if (typeof q.unread_only === "boolean")
    sp.set("unread_only", String(q.unread_only));
  sp.set("limit", String(q.limit ?? 50));
  sp.set("offset", String(q.offset ?? 0));
  return sp.toString();
}

async function fetchBackend<T>(
  path: string,
  init?: RequestInit,
): Promise<BackendApiResponse<T>> {
  const base = getBackendBaseUrl();
  if (!base) {
    return { success: false, message: "Missing backend base url" };
  }

  const token = await getAuthTokenFromCookieServer();
  if (!token) {
    return { success: false, message: "Unauthorized" };
  }

  const url = joinUrl(base, path);

  const res = await fetch(url, {
    ...init,
    headers: {
      accept: "application/json",
      ...(init?.headers ?? {}),
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  if (!isJson) {
    const txt = await res.text();
    return { success: false, message: txt || `HTTP ${res.status}` };
  }

  const json = (await res.json()) as BackendApiResponse<T>;
  return json;
}

export async function getNotificationsServer(q: NotificationsQuery) {
  const qs = buildQs(q);
  return fetchBackend<NotificationsListData>(`api/notifications?${qs}`, {
    method: "GET",
  });
}

export async function getUnreadCountServer() {
  return fetchBackend<UnreadCountData>(`api/notifications/unread-count`, {
    method: "GET",
  });
}

export async function markReadServer(notification_ids: number[]) {
  return fetchBackend<MarkOkData>(`api/notifications/mark-read`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ notification_ids }),
  });
}

export async function markAllReadServer() {
  return fetchBackend<MarkOkData>(`api/notifications/mark-all-read`, {
    method: "POST",
  });
}
