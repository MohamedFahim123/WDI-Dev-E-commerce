"use client";

import type { NotificationItemProps } from "@/src/components/Notifications/NotificationItem/NotificationItem";
import { NotificationItem } from "@/src/components/Notifications/NotificationItem/NotificationItem";
import { useNotificationsData } from "@/src/hooks/useNotificationsMenuData";
import { useMemo, useState } from "react";

export default function NotificationsDashboardClient({
  lang,
  initial,
}: {
  lang: string;
  initial: {
    items: NotificationItemProps[];
    total: number;
    limit: number;
    unreadCount: number;
  };
}) {
  const [q, setQ] = useState("");

  const { items, loading, hasMore, loadMore, markReadOne, markAllRead } =
    useNotificationsData(lang, {
      enabled: true,
      staleMs: 60_000,
      limit: initial.limit,
      initial,
    });

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((n) => n.title.toLowerCase().includes(s));
  }, [items, q]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-lg font-semibold">Notifications</h1>

        <div className="flex gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search..."
            className="h-9 w-full sm:w-64 rounded-full bg-[#e5e5ea] px-4 text-xs outline-none border border-transparent focus:border-[#d0d0d5]"
          />

          <button
            type="button"
            onClick={markAllRead}
            className="h-9 rounded-full border border-[#E5E7EB] bg-white px-4 text-xs font-semibold hover:bg-gray-50"
          >
            Mark all read
          </button>
        </div>
      </div>

      <ul className="space-y-2" role="list">
        {filtered.map((n) => (
          <div key={n.id} onClick={() => markReadOne(n.id)}>
            <NotificationItem {...n} />
          </div>
        ))}
      </ul>

      {filtered.length === 0 && !loading ? (
        <div className="py-10 text-center text-sm text-gray-500">
          No notifications
        </div>
      ) : null}

      {hasMore ? (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            className="rounded-full bg-[#7C3BED] px-6 py-2 text-sm font-semibold text-white hover:bg-[#6d28d9] disabled:opacity-60"
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
