"use client";

import { useEffect, useMemo } from "react";
import { Product } from "@/src/types/product.types";
import { applyFiltersAndSort } from "@/src/services/productFilterService";
import { useShopStore } from "@/src/stores/shopStore";

type UseShopProductsArgs = {
  products: Product[];
  initialCount: number;
  step: number;
};

export const useShopProducts = ({
  products,
  initialCount,
  step,
}: UseShopProductsArgs) => {
  const filters = useShopStore((s) => s.filters);
  const visibleCount = useShopStore((s) => s.visibleCount);
  const setVisibleCount = useShopStore((s) => s.setVisibleCount);

  const filteredProducts = useMemo(
    () => applyFiltersAndSort(products, filters),
    [products, filters]
  );

  useEffect(() => {
    setVisibleCount(Math.min(initialCount, filteredProducts.length));
  }, [initialCount, filteredProducts, setVisibleCount]);

  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, visibleCount),
    [filteredProducts, visibleCount]
  );

  const hasMore = visibleCount < filteredProducts.length;

  const handleViewMore = () => {
    setVisibleCount(Math.min(visibleCount + step, filteredProducts.length));
  };

  return {
    filters,
    filteredProducts,
    visibleProducts,
    hasMore,
    handleViewMore,
  };
};
