"use client";

import { useCartStore } from "@/src/stores/cartStore";
import { useWishlistStore } from "@/src/stores/wishlistStore";
import { useEffect } from "react";

export function StoresHydrator() {
  const hydrateCart = useCartStore((s) => s.hydrate);
  const hydrateWishlist = useWishlistStore((s) => s.hydrate);

  useEffect(() => {
    hydrateCart();
    hydrateWishlist();
  }, [hydrateCart, hydrateWishlist]);

  return null;
}
