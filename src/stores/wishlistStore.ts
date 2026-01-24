"use client";

import { create } from "zustand";
import { toast } from "sonner";
import type { Product, ApiProduct } from "@/src/types/product.types";
import {
  addWishlistService,
  getWishlistService,
  removeWishlistService,
} from "@/src/services/wishlist.service";

type WishlistState = {
  productIds: string[];
  items: Product[];
  toggle: (
    productId: string | number,
    productName?: string,
    opts?: { lang?: string },
  ) => void;
  isWishlisted: (productId: string | number) => boolean;
  getQuantity: () => number;
  hydrate: (opts?: { lang?: string }) => void;
};

type WishlistApiRow = {
  product_template_id?: number | string;
  product_id?: number | string;
  product?: ApiProduct;
  current_price?: number;
  added_price?: number;
  currency?: string;
  wishlist_id?: number;
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
      description: "Login to manage wishlist.",
    });
    redirectToLogin(lang);
    return true;
  }
  return false;
}

function toProductFromWishlistRow(row: WishlistApiRow): Product | null {
  const p = row.product;
  if (!p) return null;

  const id = Number(p.id ?? row.product_template_id ?? row.product_id);
  if (!Number.isFinite(id)) return null;

  const name = p.name ?? "Product";

  const price =
    typeof row.current_price === "number"
      ? row.current_price
      : typeof p.list_price === "number"
        ? p.list_price
        : 0;

  const currency = row.currency ?? p.currency_name ?? "";

  const imageUrl = p.image_url ?? null;
  const images = imageUrl ? [{ id: "main", url: imageUrl, alt: name }] : [];

  const specs: Record<string, string> = {};
  if (p.category_name) specs["Category"] = String(p.category_name);

  return {
    id: `${id}`,
    name,

    description: p.description ?? "",
    featureBulletPointsHtml: p.feature_bullet_points ?? "",

    price,
    currency,

    imageUrl,
    images,

    colors: [],
    variants: [],

    features: [],
    specs,

    rating: 0,
    reviewCount: 0,

    badge: undefined,
    discountCount: null,
    originalPrice: null,

    categoryId: p.categ_id ?? null,
    categoryName: p.category_name ?? null,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractWishlist(res: any): { ids: string[]; items: Product[] } {
  const rows: unknown =
    res?.data?.products ??
    res?.data?.items ??
    res?.data ??
    res?.products ??
    res?.items ??
    [];

  if (!Array.isArray(rows)) return { ids: [], items: [] };

  const items = (rows as WishlistApiRow[])
    .map(toProductFromWishlistRow)
    .filter((x): x is Product => x !== null);

  const ids = Array.from(new Set(items.map((p) => String(p.id))));

  return { ids, items };
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  productIds: [],
  items: [],

  toggle: (productId, productName, opts) => {
    const pid = String(productId);
    const exists = get().productIds.includes(pid);

    const tid = toast.loading(
      exists ? "Removing from wishlist..." : "Adding to wishlist...",
    );

    void (async () => {
      try {
        if (exists) {
          await removeWishlistService(Number(pid));
          toast.success("Removed from Wishlist", {
            id: tid,
            description: productName ?? `Product ${pid} removed`,
          });
        } else {
          await addWishlistService(Number(pid));
          toast.success("Added to Wishlist ❤️", {
            id: tid,
            description: productName ?? `Product ${pid} added`,
          });
        }

        get().hydrate(opts);
      } catch (e) {
        if (handleAuthError(e, opts?.lang)) {
          toast.dismiss(tid);
          return;
        }
        toast.error("Wishlist failed", {
          id: tid,
          description: e instanceof Error ? e.message : "Try again",
        });
      }
    })();
  },

  isWishlisted: (productId) => get().productIds.includes(String(productId)),
  getQuantity: () => get().productIds.length,

  hydrate: (opts) => {
    void (async () => {
      try {
        const res = await getWishlistService();
        const { ids, items } = extractWishlist(res);
        set({ productIds: ids, items });
      } catch (e) {
        if (handleAuthError(e, opts?.lang)) return;
      }
    })();
  },
}));
