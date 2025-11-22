import { create } from "zustand";

export type FilterState = Record<string, string | undefined>;

type ShopStoreState = {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  resetFilters: () => void;

  visibleCount: number;
  setVisibleCount: (count: number) => void;
};

const defaultFilters: FilterState = {
  sort: "relevant",
};

export const useShopStore = create<ShopStoreState>((set) => ({
  filters: defaultFilters,
  setFilters: (filters) => set({ filters }),
  resetFilters: () => set({ filters: defaultFilters }),
  visibleCount: 0,
  setVisibleCount: (count) => set({ visibleCount: count }),
}));
