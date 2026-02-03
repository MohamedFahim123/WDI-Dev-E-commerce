"use client";

import { applyFiltersAndSort } from "@/src/services/productFilterService";
import { useShopStore } from "@/src/stores/shopStore";
import type { Product } from "@/src/types/product.types";
import { useEffect, useMemo, useRef } from "react";

type UseShopProductsArgs = {
  products: Product[];
  initialCount: number;
  step: number;

  hasMoreRemote?: boolean;

  onNeedMore?: () => void;
};

export const useShopProducts = ({
  products,
  initialCount,
  step,
  hasMoreRemote = false,
  onNeedMore,
}: UseShopProductsArgs) => {
  const filters = useShopStore((s) => s.filters);
  const visibleCount = useShopStore((s) => s.visibleCount);
  const setVisibleCount = useShopStore((s) => s.setVisibleCount);

  const filteredProducts = useMemo(
    () => applyFiltersAndSort(products, filters),
    [products, filters],
  );

  const filtersKey = useMemo(() => JSON.stringify(filters), [filters]);
  const prevFiltersKey = useRef(filtersKey);

  useEffect(() => {
    const changed = prevFiltersKey.current !== filtersKey;
    if (changed) {
      prevFiltersKey.current = filtersKey;
      setVisibleCount(Math.min(initialCount, filteredProducts.length));
      return;
    }

    if (visibleCount === 0) {
      setVisibleCount(Math.min(initialCount, filteredProducts.length));
      return;
    }

    if (visibleCount > filteredProducts.length && !hasMoreRemote) {
      setVisibleCount(filteredProducts.length);
    }
  }, [
    filtersKey,
    initialCount,
    filteredProducts.length,
    visibleCount,
    setVisibleCount,
    hasMoreRemote,
  ]);

  const visibleProducts = useMemo(() => {
    const cap = Math.min(visibleCount, filteredProducts.length);
    return filteredProducts.slice(0, cap);
  }, [filteredProducts, visibleCount]);

  const hasMore = visibleCount < filteredProducts.length || hasMoreRemote;

  const handleViewMore = () => {
    const next = visibleCount + step;
    setVisibleCount(next);

    if (next > filteredProducts.length && hasMoreRemote) {
      onNeedMore?.();
    }
  };

  return {
    filters,
    filteredProducts,
    visibleProducts,
    hasMore,
    handleViewMore,
  };
};
