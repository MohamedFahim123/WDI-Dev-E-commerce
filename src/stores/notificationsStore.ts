import type { NotificationItemProps } from "@/src/components/Notifications/NotificationItem/NotificationItem";
import { create } from "zustand";

type MergeMode = "replace" | "prepend" | "append";

function uniqById<T extends { id: string }>(list: T[]): T[] {
  const m = new Map<string, T>();
  for (const x of list) m.set(x.id, x);
  return Array.from(m.values());
}

type State = {
  items: NotificationItemProps[];
  unreadCount: number;

  total: number;
  limit: number;
  lastFetchedAt: number | null;

  loading: boolean;
  error: string | null;

  setLoading: (v: boolean) => void;
  setError: (msg: string | null) => void;

  setData: (payload: {
    items: NotificationItemProps[];
    unreadCount: number;
    total: number;
    limit: number;
    fetchedAt: number;
    mode: MergeMode;
  }) => void;

  reset: () => void;
};

export const useNotificationsStore = create<State>((set) => ({
  items: [],
  unreadCount: 0,

  total: 0,
  limit: 20,
  lastFetchedAt: null,

  loading: false,
  error: null,

  setLoading: (v) => set({ loading: v }),
  setError: (msg) => set({ error: msg }),

  setData: ({ items, unreadCount, total, limit, fetchedAt, mode }) =>
    set((prev) => {
      const nextItems =
        mode === "replace"
          ? uniqById(items)
          : mode === "prepend"
            ? uniqById([...items, ...prev.items])
            : uniqById([...prev.items, ...items]);

      return {
        items: nextItems,
        unreadCount,
        total,
        limit,
        lastFetchedAt: fetchedAt,
        loading: false,
        error: null,
      };
    }),

  reset: () =>
    set({
      items: [],
      unreadCount: 0,
      total: 0,
      limit: 20,
      lastFetchedAt: null,
      loading: false,
      error: null,
    }),
}));
