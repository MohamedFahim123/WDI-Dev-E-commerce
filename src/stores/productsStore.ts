import { create } from "zustand";
import type { Product } from "@/src/types/product.types";

type ProductsStoreState = {
  list: Product[];
  byId: Record<number, Product>;

  setList: (products: Product[]) => void;
  upsertMany: (products: Product[]) => void;

  getById: (id: number) => Product | undefined;
};

function indexById(products: Product[]) {
  const byId: Record<number, Product> = {};
  for (const p of products) byId[p.id] = p;
  return byId;
}

export const useProductsStore = create<ProductsStoreState>((set, get) => ({
  list: [],
  byId: {},

  setList: (products) =>
    set((state) => ({
      list: products,
      byId: { ...state.byId, ...indexById(products) },
    })),

  upsertMany: (products) =>
    set((state) => ({
      byId: { ...state.byId, ...indexById(products) },
    })),

  getById: (id) => get().byId[id],
}));
