"use client";

import { create } from "zustand";
import { toast } from "sonner";
import {
  addToCartService,
  getCartService,
  updateCartService,
} from "@/src/services/cart.service";
import type { Product } from "@/src/types/product.types";

type CartItemKey = string;

export type CartItem = {
  key: CartItemKey;
  productId: string;
  variantId?: string;
  quantity: number;
  lineId: number;
  product: Product;
};

export type CartMeta = {
  id: number;
  name: string;
  state?: string;
  companyName?: string;
  currency?: string;

  amountUntaxed?: number;
  amountTax?: number;
  amountTotal?: number;
};

type CartState = {
  items: CartItem[];
  meta: CartMeta | null;

  loading: boolean;
  error: string | null;

  addItem: (
    item: { productId: string | number; quantity: number },
    opts?: { lang?: string },
  ) => void;

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

  product_id?: number | string;
  product_name?: string;

  product_uom_qty?: number | string; 
  price_unit?: number | string;

  image_url?: string | null; 
  currency?: string;
};

function redirectToLogin(lang?: string) {
  const l = lang || "en";
  window.location.href = `/${l}/auth/login`;
}

function isUnauthError(err: unknown) {
  const msg = err instanceof Error ? err.message : "";
  return msg === "UNAUTHENTICATED";
}

function handleAuthError(err: unknown, lang?: string) {
  if (isUnauthError(err)) {
    toast.error("Please login first", {
      description: "Login to manage your cart.",
    });
    redirectToLogin(lang);
    return true;
  }
  return false;
}

function buildKeyFromLineId(lineId: number) {
  return `line:${lineId}`;
}

function safeNum(v: unknown, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function lineToProduct(line: OrderLineLike, currency: string): Product {
  const id = safeNum(line.product_id);
  const name = line.product_name ?? "Product";

  const unitPrice = safeNum(line.price_unit);

  const imageUrl = line.image_url ?? null;
  const images = imageUrl ? [{ id: "main", url: imageUrl, alt: name }] : [];

  return {
    id:`${id}`,
    name,

    description: "",
    featureBulletPointsHtml: "",

    price: unitPrice,
    currency,

    imageUrl,
    images,

    colors: [],
    variants: [],

    features: [],
    specs: {},

    rating: undefined,
    reviewCount: undefined,

    badge: undefined,
    discountCount: null,
    originalPrice: null,

    categoryId: null,
    categoryName: null,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractCartFromRes(res: any): {
  items: CartItem[];
  meta: CartMeta | null;
} {
  const data = res?.data ?? null;
  if (!data) return { items: [], meta: null };

  const currency = String(data.currency_name ?? "AED");

  const meta: CartMeta = {
    id: safeNum(data.id),
    name: String(data.name ?? ""),
    state: data.state ? String(data.state) : undefined,
    companyName: data.company_name ? String(data.company_name) : undefined,
    currency,

    amountUntaxed:
      data.amount_untaxed != null ? safeNum(data.amount_untaxed) : undefined,
    amountTax: data.amount_tax != null ? safeNum(data.amount_tax) : undefined,
    amountTotal:
      data.amount_total != null ? safeNum(data.amount_total) : undefined,
  };

  const lines: unknown = data.order_lines ?? [];
  if (!Array.isArray(lines)) return { items: [], meta };

  const items: CartItem[] = (lines as OrderLineLike[])
    .map((l): CartItem | null => {
      const lineId = safeNum(l.id, NaN);
      const productIdNum =
        l.product_id != null ? safeNum(l.product_id, NaN) : NaN;

      if (!Number.isFinite(lineId) || !Number.isFinite(productIdNum))
        return null;

      const productId = String(productIdNum);
      const quantity = safeNum(l.product_uom_qty, 0);

      if (quantity <= 0) return null;

      const product = lineToProduct(l, currency);

      return {
        key: buildKeyFromLineId(lineId),
        lineId,
        productId,
        quantity,
        product,
      };
    })
    .filter((x): x is CartItem => x !== null);

  return { items, meta };
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  meta: null,

  loading: false,
  error: null,

  addItem: (item, opts) => {
    const tid = toast.loading("Adding to cart...");
  console.log(item)

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
        const item = get().items.find((i) => i.key === key);

        if (!item?.lineId) {
          toast.error("Cart line missing", {
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
      set({ loading: true, error: null });

      try {
        const res = await getCartService();
        console.log(res)
        const { items, meta } = extractCartFromRes(res);

        set({ items, meta, loading: false, error: null });
      } catch (e) {
        if (handleAuthError(e, opts?.lang)) {
          set({ loading: false });
          return;
        }

        set({
          loading: false,
          error: e instanceof Error ? e.message : "Failed to load cart",
        });
      }
    })();
  },
}));
