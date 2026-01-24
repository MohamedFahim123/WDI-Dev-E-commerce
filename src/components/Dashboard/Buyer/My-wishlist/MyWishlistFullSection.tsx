"use client";

import ProductCard from "@/src/components/ProductCard/ProductCard";
import { useProductsStore } from "@/src/stores/productsStore";
import { useWishlistStore } from "@/src/stores/wishlistStore";
import type { Product } from "@/src/types/product.types";
import { useEffect, useMemo } from "react";

type MyWishlistFullSectionProps = {
  lang: string;
};

export default function MyWishlistFullSection({ lang }: MyWishlistFullSectionProps) {
  const productIds = useWishlistStore((s) => s.productIds);
  const hydrateWishlist = useWishlistStore((s) => s.hydrate);

  const byId = useProductsStore((s) => s.byId);

  useEffect(() => {
    hydrateWishlist({ lang });
  }, [hydrateWishlist, lang]);

  const wishlistProducts: Product[] = useMemo(() => {
    return productIds
      .map((id) => byId[id])
      .filter((p): p is Product => Boolean(p));
  }, [productIds, byId]);

  const count = productIds.length;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-[#111827]">My Wishlist</h2>
        <span className="text-xs font-medium text-[#6B7280]">
          {count} item{count === 1 ? "" : "s"}
        </span>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#E5E7EB] bg-white px-4 py-6 text-center text-sm text-[#6B7280]">
          Your wishlist is empty. Add products to your wishlist to see them here.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} lang={lang} />
          ))}
        </div>
      )}
    </section>
  );
}
