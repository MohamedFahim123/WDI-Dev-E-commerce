"use client";

import dynamic from "next/dynamic";
import type { Product } from "@/src/types/product.types";
import Container from "../Container/Container";
import { useShopProducts } from "@/src/hooks/useShopProducts";
import ProductCardSkeleton from "../Skeletons/ProductCardSkeleton/ProductCardSkeleton";
import FilterBarSkeleton from "../Skeletons/FilterBarSkeleton/FilterBarSkeleton";
import { useRouteLang } from "@/src/hooks/useLang";
import { useEffect, useMemo } from "react";
import { useProductsStore } from "@/src/stores/productsStore";

const FilterBar = dynamic(() => import("../Filters/FilterBar"), {
  ssr: false,
  loading: () => <FilterBarSkeleton />,
});

const ProductCard = dynamic(() => import("../ProductCard/ProductCard"), {
  loading: () => <ProductCardSkeleton />,
});

type ProductsSectionProps = {
  initialProducts?: Product[];
  initialCount?: number;
  step?: number;
};

export default function ShopProducts({
  initialProducts = [],
  initialCount = 9,
  step = 9,
}: ProductsSectionProps) {
  const lang: string = useRouteLang();

  const storeList = useProductsStore((s) => s.list);
  const setList = useProductsStore((s) => s.setList);

  useEffect(() => {
    if (initialProducts.length > 0 && storeList.length === 0) {
      setList(initialProducts);
    }
  }, [initialProducts, setList, storeList.length]);

  const baseProducts = useMemo(
    () => (storeList.length > 0 ? storeList : initialProducts),
    [storeList, initialProducts],
  );

  const { visibleProducts, hasMore, handleViewMore } = useShopProducts({
    products: baseProducts,
    initialCount,
    step,
  });

  const showSkeletonGrid = baseProducts.length === 0;

  return (
    <section className="py-10">
      <Container className="space-y-6">
        <FilterBar />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {showSkeletonGrid
            ? Array.from({ length: initialCount }).map((_, idx) => (
                <ProductCardSkeleton key={idx} />
              ))
            : visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} lang={lang} />
              ))}
        </div>

        {!showSkeletonGrid && visibleProducts.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500">
            No products found.
          </div>
        )}

        {!showSkeletonGrid && hasMore && (
          <div className="flex justify-center pt-4">
            <button
              type="button"
              onClick={handleViewMore}
              className="rounded-full bg-[#bf5910] px-6 py-2 text-sm font-semibold text-white shadow-md hover:bg-[#ffffff] hover:text-[#bf5910] border-1 border-[#bf5910] cursor-pointer outline-none transition-all duration-300"
            >
              View more
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
