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
  addItem: (item: Omit<CartItem, "key">) => void;
  updateQuantity: (key: CartItemKey, quantity: number) => void;
  removeItem: (key: CartItemKey) => void;
  getQuantity: () => number;
  hydrate: () => void;
};

type CartLineLike = {
  product_id?: number | string;
  quantity?: number | string;
  line_id?: number | string;
  variant_id?: number | string;
};

const buildKey = (productId: string, variantId?: string) =>
  variantId ? `${productId}:${variantId}` : productId;

function getLangFromPath(): string {
  if (typeof window === "undefined") return "en";
  const seg = window.location.pathname.split("/").filter(Boolean)[0];
  return seg || "en";
}

function redirectToLogin() {
  if (typeof window === "undefined") return;
  const lang = getLangFromPath();
  window.location.assign(`/${lang}/auth/login`);
}

function isUnauth(res: {
  status?: number;
  error_code?: string;
  message?: string;
}) {
  return (
    res?.status === 401 ||
    res?.status === 403 ||
    res?.error_code === "UNAUTH" ||
    (typeof res?.message === "string" &&
      res.message.toLowerCase().includes("unauthor"))
  );
}

function extractCartItems(payload: unknown): CartItem[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = payload as any;

  const lines: unknown = p?.lines ?? p?.items ?? p ?? [];
  if (!Array.isArray(lines)) return [];

  return (lines as CartLineLike[])
    .map((l) => {
      const pid = l.product_id != null ? String(l.product_id) : null;
      if (!pid) return null;

      const vid = l.variant_id != null ? String(l.variant_id) : undefined;

      const qty =
        typeof l.quantity === "number" ? l.quantity : Number(l.quantity ?? 0);
      const lineId =
        typeof l.line_id === "number" ? l.line_id : Number(l.line_id ?? NaN);

      return {
        key: buildKey(pid, vid),
        productId: pid,
        variantId: vid,
        quantity: Number.isFinite(qty) ? qty : 0,
        lineId: Number.isFinite(lineId) ? lineId : undefined,
      } satisfies CartItem;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (item) => {
    const pid = String(item.productId);

    void (async () => {
      try {
        const res = await addToCartService({
          product_id: Number(pid),
          quantity: item.quantity,
        });

        if (!res.success) {
          if (isUnauth(res)) {
            toast.error("Login required", {
              description: "Please login first to add items to cart.",
            });
            redirectToLogin();
            return;
          }

          toast.error("Add to cart failed", {
            description: res.message || "Something went wrong.",
          });
          return;
        }

        get().hydrate();

        toast.success("Added to cart", {
          description: `Product ${pid} added successfully`,
        });
      } catch (e) {
        toast.error("Add to cart failed", {
          description: e instanceof Error ? e.message : "Something went wrong.",
        });
      }
    })();
  },

  updateQuantity: (key, quantity) => {
    const safeQty = Math.max(0, Math.floor(quantity));

    void (async () => {
      try {
        const cartRes = await getCartService();

        if (!cartRes.success) {
          if (isUnauth(cartRes)) {
            toast.error("Login required", {
              description: "Please login first to update cart.",
            });
            redirectToLogin();
          }
          return;
        }

        const items = extractCartItems(cartRes.data);
        const line = items.find((i) => i.key === key);

        if (!line?.lineId) {
          toast.warning("Unable to update cart", {
            description: "Missing line_id. Refresh cart page.",
          });
          return;
        }

        const res = await updateCartService({
          line_id: line.lineId,
          quantity: safeQty,
        });

        if (!res.success) {
          if (isUnauth(res)) {
            toast.error("Login required", {
              description: "Please login first to update cart.",
            });
            redirectToLogin();
            return;
          }

          toast.error("Cart update failed", {
            description: res.message || "Something went wrong.",
          });
          return;
        }

        get().hydrate();

        toast.info("Cart updated", {
          description: `Updated quantity to ${safeQty}`,
        });
      } catch (e) {
        toast.error("Cart update failed", {
          description: e instanceof Error ? e.message : "Something went wrong.",
        });
      }
    })();
  },

  removeItem: (key) => {
    void (async () => {
      try {
        const cartRes = await getCartService();

        if (!cartRes.success) {
          if (isUnauth(cartRes)) {
            toast.error("Login required", {
              description: "Please login first to update cart.",
            });
            redirectToLogin();
          }
          return;
        }

        const items = extractCartItems(cartRes.data);
        const line = items.find((i) => i.key === key);

        if (!line?.lineId) {
          toast.warning("Unable to remove item", {
            description: "Missing line_id. Refresh cart page.",
          });
          return;
        }

        const res = await updateCartService({
          line_id: line.lineId,
          quantity: 0,
        });

        if (!res.success) {
          if (isUnauth(res)) {
            toast.error("Login required", {
              description: "Please login first to update cart.",
            });
            redirectToLogin();
            return;
          }

          toast.error("Remove from cart failed", {
            description: res.message || "Something went wrong.",
          });
          return;
        }

        get().hydrate();

        toast.success("Removed from cart", {
          description: `Product ${line.productId} removed`,
        });
      } catch (e) {
        toast.error("Remove from cart failed", {
          description: e instanceof Error ? e.message : "Something went wrong.",
        });
      }
    })();
  },

  getQuantity: () => get().items.reduce((acc, i) => acc + i.quantity, 0),

  hydrate: () => {
    void (async () => {
      try {
        const res = await getCartService();

        if (!res.success) {
          if (isUnauth(res)) {
            set({ items: [] });
          }
          return;
        }

        const items = extractCartItems(res.data);
        set({ items });
      } catch {
      }
    })();
  },
}));
