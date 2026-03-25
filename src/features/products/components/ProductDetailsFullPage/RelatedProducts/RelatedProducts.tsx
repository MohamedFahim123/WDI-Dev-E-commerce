"use client";

import { useProductsStore } from "@/src/stores/productsStore";
import type { Product } from "@/src/types/product.types";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import ProductCardSkeleton from "@/src/components/Skeletons/ProductCardSkeleton/ProductCardSkeleton";

const ProductCard = dynamic(
  () => import("@/src/components/ProductCard/ProductCard"),
  { loading: () => <ProductCardSkeleton /> },
);

type Props = {
  currentProductId: string;
  lang: string;
};

export function RelatedProducts({ currentProductId, lang }: Props) {
  const byId = useProductsStore((s) => s.byId);

  const related: Product[] = useMemo(() => {
    const currentId = String(currentProductId);

    const all = Object.values(byId);

    return all
      .filter((p) => String(p.id) !== currentId)
      .slice(0, 4);
  }, [byId, currentProductId]);

  if (related.length === 0) return null;

  return (
    <section className="mt-10 space-y-4">
      <h2 className="text-base font-semibold text-zinc-900">Related products</h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {related.map((item) => (
          <ProductCard key={item.id} product={item} lang={lang} />
        ))}
      </div>
    </section>
  );
}

