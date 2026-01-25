"use client";

import { create } from "zustand";
import type { Product } from "@/src/types/product.types";

type ProductsState = {
  byId: Record<string, Product>;
  list: Product[];

  hydrated: boolean;

  // sets only once (first app load)
  hydrateOnce: (products: Product[]) => void;

  // replace list intentionally (if you ever need it)
  setProducts: (products: Product[]) => void;

  // merge/update
  upsertMany: (products: Product[]) => void;

  getById: (id: string) => Product | undefined;
};

function indexById(products: Product[]) {
  const byId: Record<string, Product> = {};
  for (const p of products) byId[String(p.id)] = p;
  return byId;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  byId: {},
  list: [],
  hydrated: false,

  hydrateOnce: (products) => {
    if (get().hydrated) return;

    const byId = indexById(products);
    set({
      byId,
      list: Object.values(byId),
      hydrated: true,
    });
  },

  setProducts: (products) => {
    const byId = indexById(products);
    set({ byId, list: products });
  },

  upsertMany: (products) => {
    const next = { ...get().byId };
    for (const p of products) next[String(p.id)] = p;

    set({
      byId: next,
      list: Object.values(next),
    });
  },

  getById: (id) => get().byId[String(id)],
}));
