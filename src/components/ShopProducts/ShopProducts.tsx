"use client";

import dynamic from "next/dynamic";
import { Product } from "@/src/types/product.types";
import Container from "../Container/Container";
import { useShopProducts } from "@/src/hooks/useShopProducts";
import ProductCardSkeleton from "../Skeletons/ProductCardSkeleton/ProductCardSkeleton";
import FilterBarSkeleton from "../Skeletons/FilterBarSkeleton/FilterBarSkeleton";
import { useRouteLang } from "@/src/hooks/useLang";

const FilterBar = dynamic(() => import("../Filters/FilterBar"), {
  ssr: false,
  loading: () => <FilterBarSkeleton />,
});

const ProductCard = dynamic(() => import("../ProductCard/ProductCard"), {
  loading: () => <ProductCardSkeleton />,
});

type ProductsSectionProps = {
  products: Product[];
  initialCount?: number;
  step?: number;
};

export default function ShopProducts({
  products,
  initialCount = 9,
  step = 9,
}: ProductsSectionProps) {
  const { visibleProducts, hasMore, handleViewMore } = useShopProducts({
    products,
    initialCount,
    step,
  });

  const lang: string = useRouteLang();

  const showSkeletonGrid = visibleProducts.length === 0;

  return (
    <section className="py-10">
      <Container className="space-y-6">
        <FilterBar />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {showSkeletonGrid
            ? Array.from({ length: initialCount }).map((_, idx) => (
                <ProductCardSkeleton key={idx} />
              ))
            : visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} lang={lang} />
              ))}
        </div>

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
