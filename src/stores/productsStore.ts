"use client";

import { create } from "zustand";
import type { Product } from "@/src/types/product.types";

type ProductsState = {
  byId: Record<string, Product>;
  list: Product[];
  setProducts: (products: Product[]) => void;
  upsertMany: (products: Product[]) => void;
  getById: (id: string) => Product | undefined;
};

export const useProductsStore = create<ProductsState>((set, get) => ({
  byId: {},
  list: [],

  setProducts: (products) => {
    const byId: Record<string, Product> = {};
    for (const p of products) byId[p.id] = p;
    set({ list: products, byId });
  },

  upsertMany: (products) => {
    const next = { ...get().byId };
    for (const p of products) next[p.id] = p;
    set({ byId: next, list: Object.values(next) });
  },

  getById: (id) => get().byId[id],
}));
