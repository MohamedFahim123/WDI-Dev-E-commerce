"use client";

import { create } from "zustand";
import { toast } from "sonner";
import {
  addToCartService,
  getCartService,
  updateCartService,
} from "@/src/services/cart.service";

type CartItemKey = string;

export type CartItem = {
  key: CartItemKey;
  productId: string;
  variantId?: string;
  quantity: number;
  lineId?: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "key">, opts?: { lang?: string }) => void;
  updateQuantity: (
    key: CartItemKey,
    quantity: number,
    opts?: { lang?: string },
  ) => void;
  removeItem: (key: CartItemKey, opts?: { lang?: string }) => void;
  getQuantity: () => number;
  hydrate: (opts?: { lang?: string }) => void;
};

type OrderLineLike = {
  id?: number | string;
  line_id?: number | string;

  product_id?: number | string;
  productId?: number | string;

  variant_id?: number | string;
  variantId?: number | string;

  quantity?: number | string;
  product_uom_qty?: number | string;

  product?: { id?: number | string };
};

function redirectToLogin(lang?: string) {
  const l = lang || "en";
  window.location.href = `/${l}/auth/login`;
}

function handleAuthError(err: unknown, lang?: string) {
  const msg = err instanceof Error ? err.message : "";
  if (msg === "UNAUTHENTICATED") {
    toast.error("Please login first", {
      description: "Login to add items to cart.",
    });
    redirectToLogin(lang);
    return true;
  }
  return false;
}

function buildKeyFromLine(
  lineId?: number,
  productId?: string,
  variantId?: string,
) {
  if (lineId) return `line:${lineId}`;
  if (productId && variantId) return `${productId}:${variantId}`;
  return productId || `tmp:${Math.random().toString(36).slice(2)}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractCartItemsFromRes(res: any): CartItem[] {
  const lines: unknown =
    res?.data?.order_lines ??
    res?.data?.lines ??
    res?.data?.items ??
    res?.data ??
    res?.order_lines ??
    res?.lines ??
    res?.items ??
    [];

  if (!Array.isArray(lines)) return [];

  return (lines as OrderLineLike[])
    .map((l): CartItem | null => {
      const rawProductId = l.product_id ?? l.productId ?? l.product?.id ?? null;

      if (rawProductId == null) return null;

      const productId = String(rawProductId);

      const rawQty = l.quantity ?? l.product_uom_qty ?? 0;
      const quantity = Number(rawQty);

      const rawLineId = l.id ?? l.line_id ?? undefined;
      const lineId = rawLineId != null ? Number(rawLineId) : undefined;

      const rawVariantId = l.variant_id ?? l.variantId ?? undefined;
      const variantId = rawVariantId != null ? String(rawVariantId) : undefined;

      const safeLineId = Number.isFinite(lineId ?? NaN) ? lineId : undefined;
      const safeQty = Number.isFinite(quantity) ? quantity : 0;

      const key = buildKeyFromLine(safeLineId, productId, variantId);

      const item: CartItem = {
        key,
        productId,
        quantity: safeQty,
        lineId: safeLineId,
        ...(variantId ? { variantId } : {}),
      };

      return item;
    })
    .filter((x): x is CartItem => x !== null)
    .filter((x) => x.quantity > 0);
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (item, opts) => {
    const tid = toast.loading("Adding to cart...");

    void (async () => {
      try {
        await addToCartService({
          product_id: Number(item.productId),
          quantity: item.quantity,
        });

        toast.success("Added to cart", { id: tid });
        get().hydrate(opts);
      } catch (e) {
        if (handleAuthError(e, opts?.lang)) {
          toast.dismiss(tid);
          return;
        }

        toast.error("Add to cart failed", {
          id: tid,
          description: e instanceof Error ? e.message : "Try again",
        });
      }
    })();
  },

  updateQuantity: (key, quantity, opts) => {
    const tid = toast.loading("Updating cart...");

    void (async () => {
      try {
        const safeQty = Math.max(0, Math.floor(quantity));

        let item = get().items.find((i) => i.key === key);

        if (!item?.lineId) {
          await new Promise<void>((r) => {
            get().hydrate(opts);
            r();
          });
          item = get().items.find((i) => i.key === key);
        }

        if (!item?.lineId) {
          toast.error("Cart not synced yet", {
            id: tid,
            description: "Please refresh the cart page.",
          });
          return;
        }

        await updateCartService({ line_id: item.lineId, quantity: safeQty });

        toast.success("Cart updated", { id: tid });
        get().hydrate(opts);
      } catch (e) {
        if (handleAuthError(e, opts?.lang)) {
          toast.dismiss(tid);
          return;
        }

        toast.error("Cart update failed", {
          id: tid,
          description: e instanceof Error ? e.message : "Try again",
        });
      }
    })();
  },

  removeItem: (key, opts) => {
    get().updateQuantity(key, 0, opts);
  },

  getQuantity: () => get().items.reduce((acc, i) => acc + i.quantity, 0),

  hydrate: (opts) => {
    void (async () => {
      try {
        const res = await getCartService();
        console.log(res)
        set({ items: extractCartItemsFromRes(res) });
      } catch (e) {
        if (handleAuthError(e, opts?.lang)) return;
      }
    })();
  },
}));
