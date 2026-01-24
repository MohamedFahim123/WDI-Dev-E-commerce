"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import { useRouteLang } from "@/src/hooks/useLang";
import { useProductsStore } from "@/src/stores/productsStore";
import type { Product } from "@/src/types/product.types";

import ProductCardSkeleton from "../Skeletons/ProductCardSkeleton/ProductCardSkeleton";

const ProductCard = dynamic(() => import("../ProductCard/ProductCard"), {
  loading: () => <ProductCardSkeleton />,
});

export default function ProductsGrid() {
  const lang = useRouteLang();
  const byId = useProductsStore((s) => s.byId);

  const items: Product[] = useMemo(() => {
    // convert Record<string, Product> -> Product[]
    return Object.values(byId).slice(0, 7);
  }, [byId]);

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} lang={lang} />
      ))}
    </div>
  );
}
