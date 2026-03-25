"use client";

import type { Product } from "@/src/types/product.types";
import { create } from "zustand";

type CatalogSeedState = {
  seed: Product[];
  hydrated: boolean;
  hydrateSeed: (products: Product[]) => void;
};

export const useCatalogSeedStore = create<CatalogSeedState>((set, get) => ({
  seed: [],
  hydrated: false,
  hydrateSeed: (products) => {
    if (get().hydrated) return;
    set({ seed: products, hydrated: true });
  },
}));
