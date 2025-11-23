import { create } from "zustand";
import { toast } from "sonner";

type WishlistState = {
  productIds: string[];
  toggle: (productId: string, productName?: string) => void;
  isWishlisted: (productId: string) => boolean;
  getQuantity: () => number;
};

export const useWishlistStore = create<WishlistState>((set, get) => ({
  productIds: [],

  toggle: (productId, productName) =>
    set((state) => {
      const exists = state.productIds.includes(productId);

      if (exists) {
        toast.info("Removed from Wishlist", {
          description: productName ?? `Product ${productId} removed`,
        });
        return {
          productIds: state.productIds.filter((id) => id !== productId),
        };
      } else {
        toast.success("Added to Wishlist ❤️", {
          description: productName ?? `Product ${productId} added`,
        });
        return { productIds: [...state.productIds, productId] };
      }
    }),

  isWishlisted: (productId) => get().productIds.includes(productId),

  getQuantity: () => get().productIds.length,
}));
