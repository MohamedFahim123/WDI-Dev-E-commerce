"use client";

import { useCallback, useEffect, useMemo, useTransition } from "react";

import {
  notificationsListAction,
  notificationsMarkAllReadAction,
  notificationsMarkReadAction,
  notificationsUnreadCountAction,
} from "@/src/actions/notifications.actions";

import type { NotificationItemProps } from "@/src/components/Notifications/NotificationItem/NotificationItem";
import { mapBackendToUiItem } from "@/src/lib/notifications/mapToUi";
import { useNotificationsStore } from "@/src/stores/notificationsStore";

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

function extractListPayload(data: unknown): {
  raw: unknown[];
  total: number;
  limit: number;
  offset: number;
} {
  const d = asRecord(data);

  const raw =
    asArray(d?.notifications) || asArray(d?.items) || asArray(d?.results) || [];

  const total = toNumber(d?.total ?? d?.count ?? d?.records_total, raw.length);
  const limit = toNumber(d?.limit, raw.length);
  const offset = toNumber(d?.offset, 0);

  return { raw, total, limit, offset };
}

type Opts = {
  enabled?: boolean;
  limit?: number;
  staleMs?: number;
  initial?: {
    items: NotificationItemProps[];
    unreadCount: number;
    total: number;
    limit: number;
  };
};

export function useNotificationsData(lang: string, opts?: Opts) {
  const enabled = opts?.enabled ?? true;
  const limit = opts?.limit ?? 20;

  const staleMs = opts?.staleMs ?? 60_000;

  const items = useNotificationsStore((s) => s.items);
  const unreadCount = useNotificationsStore((s) => s.unreadCount);
  const total = useNotificationsStore((s) => s.total);
  const storeLimit = useNotificationsStore((s) => s.limit);

  const loading = useNotificationsStore((s) => s.loading);
  const error = useNotificationsStore((s) => s.error);
  const lastFetchedAt = useNotificationsStore((s) => s.lastFetchedAt);

  const setLoading = useNotificationsStore((s) => s.setLoading);
  const setData = useNotificationsStore((s) => s.setData);
  const setError = useNotificationsStore((s) => s.setError);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!opts?.initial) return;
    if (items.length > 0) return;

    setData({
      items: opts.initial.items,
      unreadCount: opts.initial.unreadCount,
      total: opts.initial.total,
      limit: opts.initial.limit,
      fetchedAt: Date.now(),
      mode: "replace",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refresh = useCallback(
    (mode: "replace" | "prepend" = "prepend") => {
      if (!enabled) return;

      startTransition(async () => {
        try {
          setLoading(true);

          const [listRes, countRes] = await Promise.all([
            notificationsListAction({ unread_only: false, limit, offset: 0 }),
            notificationsUnreadCountAction(),
          ]);

          const {
            raw,
            total: newTotal,
            limit: newLimit,
          } = extractListPayload(listRes?.data);

          const mapped: NotificationItemProps[] = raw
            .map((x) => {
              const rec = asRecord(x);
              return rec ? mapBackendToUiItem(rec, lang) : null;
            })
            .filter((x): x is NotificationItemProps => x !== null);

          const cd = asRecord(countRes?.data);
          const newUnread = toNumber(cd?.unread_count ?? cd?.count, 0);

          setData({
            items: mapped,
            unreadCount: newUnread,
            total: newTotal,
            limit: newLimit || limit,
            fetchedAt: Date.now(),
            mode,
          });
        } catch (e) {
          setError(
            e instanceof Error ? e.message : "Failed to fetch notifications",
          );
        }
      });
    },
    [enabled, lang, limit, setLoading, setData, setError],
  );

  const loadMore = useCallback(() => {
    if (!enabled) return;

    const effectiveLimit = storeLimit || limit;
    const nextOffset = items.length;

    if (total > 0 && nextOffset >= total) return;

    startTransition(async () => {
      try {
        setLoading(true);

        const listRes = await notificationsListAction({
          unread_only: false,
          limit: effectiveLimit,
          offset: nextOffset,
        });

        const {
          raw,
          total: newTotal,
          limit: newLimit,
        } = extractListPayload(listRes?.data);

        const mapped: NotificationItemProps[] = raw
          .map((x) => {
            const rec = asRecord(x);
            return rec ? mapBackendToUiItem(rec, lang) : null;
          })
          .filter((x): x is NotificationItemProps => x !== null);

        setData({
          items: mapped,
          unreadCount,
          total: newTotal,
          limit: newLimit || effectiveLimit,
          fetchedAt: Date.now(),
          mode: "append",
        });
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "Failed to load more notifications",
        );
      }
    });
  }, [
    enabled,
    items.length,
    lang,
    limit,
    storeLimit,
    total,
    unreadCount,
    setLoading,
    setData,
    setError,
  ]);

  const markReadOne = useCallback(
    (id: string) => {
      const idNum = Number(id);
      if (!Number.isFinite(idNum)) return;

      startTransition(async () => {
        try {
          await notificationsMarkReadAction([idNum]);
          refresh("prepend");
        } catch (e) {
          setError(
            e instanceof Error
              ? e.message
              : "Failed to mark notification as read",
          );
        }
      });
    },
    [refresh, setError],
  );

  const markAllRead = useCallback(() => {
    startTransition(async () => {
      try {
        await notificationsMarkAllReadAction();
        refresh("replace");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to mark all as read");
      }
    });
  }, [refresh, setError]);

  useEffect(() => {
    if (!enabled) return;

    const now = Date.now();
    const stale = lastFetchedAt == null ? true : now - lastFetchedAt > staleMs;

    if (stale && !loading) refresh("replace");
  }, [enabled, lastFetchedAt, staleMs, loading, refresh]);

  useEffect(() => {
    if (!enabled) return;

    const t = window.setInterval(() => {
      refresh("prepend");
    }, staleMs);

    return () => window.clearInterval(t);
  }, [enabled, staleMs, refresh]);

  const top3 = useMemo(() => items.slice(0, 3), [items]);
  const hasMore = total === 0 ? false : items.length < total;

  return {
    items,
    top3,
    unreadCount,
    total,
    hasMore,
    loading: loading || isPending,
    error,
    refresh,
    loadMore,
    markReadOne,
    markAllRead,
  };
}
