"use client";

import ProductCard from "@/src/components/ProductCard/ProductCard";
import { products } from "@/src/stores/products";
import { useWishlistStore } from "@/src/stores/wishlistStore";
import { useMemo } from "react";

type MyWishlistFullSectionProps = {
  lang: string;
};

export default function MyWishlistFullSection({
  lang,
}: MyWishlistFullSectionProps) {
  const productIds = useWishlistStore((state) => state.productIds);
  const getQuantity = useWishlistStore((state) => state.getQuantity);

  const count = getQuantity();

  const wishlistProducts = useMemo(
    () => products.filter((p) => productIds.includes(p.id)),
    [productIds]
  );

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
          Your wishlist is empty. Add products to your wishlist to see them
          here.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} lang={lang} />
          ))}
        </div>
      )}
    </section>
  );
}
