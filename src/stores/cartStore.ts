import { create } from "zustand";
import { toast } from "sonner"; 

type CartItemKey = string;

export type CartItem = {
  key: CartItemKey;
  productId: string;
  variantId?: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "key">) => void;
  updateQuantity: (key: CartItemKey, quantity: number) => void;
  removeItem: (key: CartItemKey) => void;
  getQuantity: () => number;
};

const buildKey = (productId: string, variantId?: string) =>
  variantId ? `${productId}:${variantId}` : productId;

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (item) =>
    set((state) => {
      const key = buildKey(item.productId, item.variantId);
      const existing = state.items.find((i) => i.key === key);
      let updatedItems;

      if (existing) {
        updatedItems = state.items.map((i) =>
          i.key === key ? { ...i, quantity: i.quantity + item.quantity } : i
        );

        toast.info("Updated cart quantity", {
          description: `Increased quantity for product ${item.productId}`,
        });
      } else {
        updatedItems = [...state.items, { ...item, key }];
        toast.success("Added to cart", {
          description: `Product ${item.productId} added successfully`,
        });
      }

      return { items: updatedItems };
    }),

  updateQuantity: (key, quantity) =>
    set((state) => {
      const item = state.items.find((i) => i.key === key);
      if (!item) return state;

      const updatedItems = state.items.map((i) =>
        i.key === key ? { ...i, quantity } : i
      );

      toast.info("Cart updated", {
        description: `Updated quantity to ${quantity} for product ${item.productId}`,
      });

      return { items: updatedItems };
    }),

  removeItem: (key) =>
    set((state) => {
      const item = state.items.find((i) => i.key === key);
      const updatedItems = state.items.filter((i) => i.key !== key);

      toast.error("Removed from cart", {
        description: item
          ? `Product ${item.productId} removed`
          : "Item removed from cart",
      });

      return { items: updatedItems };
    }),

  getQuantity: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
}));
