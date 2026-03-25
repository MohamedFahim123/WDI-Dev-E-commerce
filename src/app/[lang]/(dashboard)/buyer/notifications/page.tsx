import type { Metadata } from "next";

import {
  notificationsListAction,
  notificationsUnreadCountAction,
} from "@/src/features/notifications/actions/notifications.actions";
import NotificationsDashboardClient from "@/src/features/notifications/components/Notifications/NotificationsDashboardClient";
import { mapBackendToUiItem } from "@/src/features/notifications/lib/mapToUi";

export const metadata: Metadata = {
  title: "WDI - Dashboard Notifications",
};

type UnknownRecord = Record<string, unknown>;
function asRecord(v: unknown): UnknownRecord | null {
  return v && typeof v === "object" ? (v as UnknownRecord) : null;
}
function asArray(v: unknown): unknown[] {
  return Array.isArray(v) ? v : [];
}
function toNumber(v: unknown, fallback: number): number {
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN;
  return Number.isFinite(n) ? n : fallback;
}

function extractList(data: unknown) {
  const d = asRecord(data);
  const raw =
    asArray(d?.notifications) || asArray(d?.items) || asArray(d?.results) || [];
  const total = toNumber(d?.total ?? d?.count ?? d?.records_total, raw.length);
  const limit = toNumber(d?.limit, raw.length);
  return { raw, total, limit };
}

export default async function NotificationsDashboardPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;

  const [listRes, countRes] = await Promise.all([
    notificationsListAction({ unread_only: false, limit: 20, offset: 0 }),
    notificationsUnreadCountAction(),
  ]);

  const { raw, total, limit } = extractList(listRes?.data);

  const items = raw
    .map((x) => {
      const rec = asRecord(x);
      return rec ? mapBackendToUiItem(rec, lang) : null;
    })
    .filter((x) => x !== null);

  const cd = asRecord(countRes?.data);
  const unreadCount = toNumber(cd?.unread_count ?? cd?.count, 0);

  return (
    <section className="p-4 bg-white">
      <NotificationsDashboardClient
        lang={lang}
        initial={{
          items: items,
          total,
          limit: limit || 20,
          unreadCount,
        }}
      />
    </section>
  );
}

