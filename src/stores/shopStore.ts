"use client";

import { create } from "zustand";

export type SortValue =
  | "relevance"
  | "price_asc"
  | "price_desc"
  | "name_asc"
  | "name_desc";

export type ShopFilters = {
  sort: SortValue;

  categoryId: string;
  price: string;
  brandId: string;
  colorId: string;
  sizeId: string;
};

export const DEFAULT_FILTERS: ShopFilters = {
  sort: "relevance",
  categoryId: "all",
  price: "all",
  brandId: "all",
  colorId: "all",
  sizeId: "all",
};

type ShopState = {
  filters: ShopFilters;
  setFilters: (patch: Partial<ShopFilters>) => void;
  setAllFilters: (next: ShopFilters) => void;
  resetFilters: () => void;

  visibleCount: number;
  setVisibleCount: (n: number) => void;
};

export const useShopStore = create<ShopState>((set) => ({
  filters: DEFAULT_FILTERS,

  setFilters: (patch) =>
    set((state) => ({
      filters: { ...state.filters, ...patch },
    })),

  setAllFilters: (next) => set({ filters: next }),

  resetFilters: () => set({ filters: DEFAULT_FILTERS }),

  visibleCount: 0,
  setVisibleCount: (n) => set({ visibleCount: n }),
}));
