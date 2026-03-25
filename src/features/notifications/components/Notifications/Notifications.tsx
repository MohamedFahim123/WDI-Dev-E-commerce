"use client";

import { useRouteLang } from "@/src/hooks/useLang";
import { useEffect, useMemo, useState, useTransition } from "react";
import Container from "@/src/components/Container/Container";
import { PageHeader } from "@/src/components/PageHeader/PageHeader";
import {
  NotificationItem,
  NotificationItemProps,
} from "./NotificationItem/NotificationItem";
import { NotificationListSkeleton } from "./NotificationListSkeleton/NotificationListSkeleton";
import NotificationsEmptyState from "./NotificationsEmptyState/NotificationsEmptyState";
import { NotificationsSearchInput } from "./NotificationsSearchInput/NotificationsSearchInput";

import {
  notificationsListAction,
  notificationsMarkAllReadAction,
  notificationsMarkReadAction,
  notificationsUnreadCountAction,
} from "@/src/actions/notifications.actions";

import { mapBackendToItem } from "@/src/lib/notifications/mapToUi";

interface NotificationsContentProps {
  initialNotifications: NotificationItemProps[];
  initialUnreadCount: number;

  initialOffset?: number;
  limit?: number;
  initialUnreadOnly?: boolean;
  initialTotal?: number;
}

function uniqById(list: NotificationItemProps[]) {
  const map = new Map<string, NotificationItemProps>();
  for (const x of list) map.set(x.id, x);
  return Array.from(map.values());
}

export function Notifications({
  initialNotifications,
  initialUnreadCount,
  initialOffset = 0,
  limit = 20,
  initialUnreadOnly = false,
  initialTotal,
}: NotificationsContentProps) {
  const lang = useRouteLang();

  const [query, setQuery] = useState("");
  const [unreadOnly, setUnreadOnly] = useState(initialUnreadOnly);

  const [items, setItems] =
    useState<NotificationItemProps[]>(initialNotifications);
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);

  const [offset, setOffset] = useState(initialOffset);
  const [total, setTotal] = useState<number | undefined>(initialTotal);

  const [isPending, startTransition] = useTransition();

  const filteredNotifications = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((n) => n.title.toLowerCase().includes(q));
  }, [items, query]);

  const hasNotifications = filteredNotifications.length > 0;

  const canLoadMore = useMemo(() => {
    if (typeof total === "number") return items.length < total;
    return true;
  }, [items.length, total]);

  const refreshUnreadCount = () => {
    startTransition(async () => {
      const res = await notificationsUnreadCountAction();
      const c = res.data?.unread_count ?? res.data?.count ?? 0;
      setUnreadCount(c);
    });
  };

  const fetchPage = (nextOffset: number, mode: "replace" | "append") => {
    startTransition(async () => {
      const res = await notificationsListAction({
        unread_only: unreadOnly,
        limit,
        offset: nextOffset,
      });

      const raw = res.data?.notifications ?? res.data?.items ?? [];
      const mapped = raw
        .map((x) =>
          typeof x === "object" && x
            ? mapBackendToItem(x as Record<string, unknown>, lang)
            : null,
        )
        .filter((x): x is NonNullable<typeof x> => x !== null);

      const uiOnly = mapped.map(({ _idNum, _isRead, ...ui }) => ui);

      const nextTotal = res.data?.total ?? res.data?.count ?? total;

      setTotal(typeof nextTotal === "number" ? nextTotal : total);

      if (mode === "replace") {
        setItems(uiOnly);
      } else {
        setItems((prev) => uniqById([...prev, ...uiOnly]));
      }

      setOffset(nextOffset);
      refreshUnreadCount();
    });
  };

  useEffect(() => {
    fetchPage(0, "replace");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unreadOnly]);

  const handleLoadMore = () => {
    const nextOffset = offset + limit;
    fetchPage(nextOffset, "append");
  };

  const handleMarkAllRead = () => {
    startTransition(async () => {
      await notificationsMarkAllReadAction();
      fetchPage(0, "replace");
    });
  };

  const handleMarkReadOne = (id: string) => {
    const idNum = Number(id);
    if (!Number.isFinite(idNum)) return;

    startTransition(async () => {
      await notificationsMarkReadAction([idNum]);
      fetchPage(0, "replace");
    });
  };

  return (
    <section className="w-full bg-white">
      <PageHeader
        title="Notifications"
        breadcrumb={[
          { label: "Home", href: `/${lang}` },
          { label: "Notifications" },
        ]}
        rightSlot={
          <NotificationsSearchInput value={query} onChange={setQuery} />
        }
      />

      <Container className="pb-10 pt-4">
        <div className="mb-4 flex flex-wrap itemsgap-2 items-center justify-between">
          <div className="text-xs text-gray-500">
            Unread: <span className="font-semibold">{unreadCount}</span>
            {isPending ? " • Updating..." : ""}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setUnreadOnly((p) => !p)}
              className="rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
              disabled={isPending}
            >
              {unreadOnly ? "Show all" : "Show unread"}
            </button>

            <button
              type="button"
              onClick={handleMarkAllRead}
              className="rounded-full bg-[#7C3BED] px-4 py-2 text-xs font-semibold text-white hover:bg-[#6d28d9] disabled:opacity-60"
              disabled={isPending}
            >
              Mark all read
            </button>
          </div>
        </div>

        {isPending && items.length === 0 ? (
          <NotificationListSkeleton length={4} />
        ) : hasNotifications ? (
          <>
            <ul className="space-y-2" role="list">
              {filteredNotifications.map((notification) => (
                <div key={notification.id} className="relative">
                  <NotificationItem {...notification} />

                  <button
                    type="button"
                    onClick={() => handleMarkReadOne(notification.id)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-[11px] font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
                    disabled={isPending}
                  >
                    Mark read
                  </button>
                </div>
              ))}
            </ul>

            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={handleLoadMore}
                className="rounded-full border border-[#E5E7EB] bg-white px-6 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 disabled:opacity-60"
                disabled={isPending || !canLoadMore}
              >
                {isPending ? "Loading..." : "Load more"}
              </button>
            </div>
          </>
        ) : (
          <NotificationsEmptyState />
        )}
      </Container>
    </section>
  );
}

