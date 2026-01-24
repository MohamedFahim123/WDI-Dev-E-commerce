import { create } from "zustand";
import { toast } from "sonner";
import {
  addWishlistService,
  getWishlistService,
  removeWishlistService,
} from "@/src/services/wishlist.service";

type WishlistState = {
  productIds: string[];
  toggle: (productId: string, productName?: string) => void;
  isWishlisted: (productId: string) => boolean;
  getQuantity: () => number;
  hydrate: () => void;
};

type WishlistItemLike = { product_id?: number | string; id?: number | string };

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

function extractWishlistIds(payload: unknown): string[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = payload as any;

  const items: unknown = p?.wishlist ?? p?.items ?? p ?? [];

  if (!Array.isArray(items)) return [];

  const ids = (items as WishlistItemLike[])
    .map((x) => x.product_id ?? x.id)
    .filter((v) => v != null)
    .map((v) => String(v));

  return Array.from(new Set(ids));
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  productIds: [],

  toggle: (productId, productName) => {
    const pid = String(productId);

    void (async () => {
      const exists = get().productIds.includes(pid);

      try {
        const res = exists
          ? await removeWishlistService(Number(pid))
          : await addWishlistService(Number(pid));

        if (!res.success) {
          if (isUnauth(res)) {
            toast.error("Login required", {
              description: "Please login first to add items to wishlist.",
            });
            redirectToLogin();
            return;
          }

          toast.error("Wishlist failed", {
            description: res.message || "Something went wrong.",
          });
          return;
        }

        get().hydrate();

        toast.success(
          exists ? "Removed from Wishlist" : "Added to Wishlist ❤️",
          {
            description: productName ?? `Product ${pid}`,
          },
        );
      } catch (e) {
        toast.error("Wishlist failed", {
          description: e instanceof Error ? e.message : "Something went wrong.",
        });
      }
    })();
  },

  isWishlisted: (productId) => get().productIds.includes(String(productId)),

  getQuantity: () => get().productIds.length,

  hydrate: () => {
    void (async () => {
      try {
        const res = await getWishlistService();

        if (!res.success) {
          if (isUnauth(res)) {
            set({ productIds: [] });
          }
          return;
        }

        const ids = extractWishlistIds(res.data);
        set({ productIds: ids });
      } catch {
      }
    })();
  },
}));
