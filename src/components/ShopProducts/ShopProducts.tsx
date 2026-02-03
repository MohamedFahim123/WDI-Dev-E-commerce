"use client";

import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import Container from "../Container/Container";
import FilterBarSkeleton from "../Skeletons/FilterBarSkeleton/FilterBarSkeleton";
import ProductCardSkeleton from "../Skeletons/ProductCardSkeleton/ProductCardSkeleton";

import { usePaginatedProducts } from "@/src/hooks/usePaginatedProducts";
import { useShopProducts } from "@/src/hooks/useShopProducts";
import { useCartStore } from "@/src/stores/cartStore";
import {
  DEFAULT_FILTERS,
  useShopStore,
  type SortValue,
} from "@/src/stores/shopStore";
import { useWishlistStore } from "@/src/stores/wishlistStore";

import type { FiltersData } from "@/src/services/filter.service";
import type { Product } from "@/src/types/product.types";

const FilterBar = dynamic(() => import("../Filters/FilterBar"), {
  ssr: false,
  loading: () => <FilterBarSkeleton />,
});

const ProductCard = dynamic(() => import("../ProductCard/ProductCard"), {
  loading: () => <ProductCardSkeleton />,
});

type Option = { value: string; label: string };
type ColorOption = Option & { hex?: string };

type Props = {
  products: Product[];
  lang: string;
  filtersData?: FiltersData;

  total?: number;
  limit?: number;

  initialCount?: number;
  step?: number;

  initialQuery?: {
    category_id?: string;
    company_id?: string;
    color_id?: string;
    size_id?: string;
    min_price?: string;
    max_price?: string;
    sort?: string;
    search?: string;
    limit?: string;
    offset?: string;
  };
};

function coerceSort(v?: string): SortValue {
  if (
    v === "relevance" ||
    v === "price_asc" ||
    v === "price_desc" ||
    v === "name_asc" ||
    v === "name_desc"
  )
    return v;
  return "relevance";
}

function formatMoney(n: number) {
  return Number.isInteger(n) ? String(n) : n.toFixed(2);
}

export default function ShopProducts({
  products,
  lang,
  filtersData,
  total,
  limit,
  initialCount = 9,
  step = 9,
  initialQuery,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const setAllFilters = useShopStore((s) => s.setAllFilters);
  const resetFilters = useShopStore((s) => s.resetFilters);

  // -------------------------
  // 1) Hydrate store filters from URL (initialQuery)
  // -------------------------
  useEffect(() => {
    if (!initialQuery) return;

    const min = initialQuery.min_price || "";
    const max = initialQuery.max_price || "";
    const price = min && max ? `${min}-${max}` : "all";

    setAllFilters({
      ...DEFAULT_FILTERS,
      sort: coerceSort(initialQuery.sort),
      categoryId: initialQuery.category_id || "all",
      price,
      brandId: initialQuery.company_id || "all",
      colorId: initialQuery.color_id || "all",
      sizeId: initialQuery.size_id || "all",
    });
  }, [initialQuery, setAllFilters]);

  const resetFiltersAndUrl = () => {
    resetFilters();
    router.replace(pathname, { scroll: false });
  };

  // -------------------------
  // 2) Hydrate wishlist/cart
  // -------------------------
  const hydrateWishlist = useWishlistStore((s) => s.hydrate);
  const hydrateCart = useCartStore((s) => s.hydrate);

  useEffect(() => {
    hydrateWishlist({ lang });
    hydrateCart({ lang });
  }, [hydrateWishlist, hydrateCart, lang]);

  // -------------------------
  // 3) Pagination hook (remote fetching)
  //    Only uses the API filters relevant to /product/list
  // -------------------------
  const paginationQuery = useMemo(
    () => ({
      category_id: initialQuery?.category_id,
      company_id: initialQuery?.company_id,
      search: initialQuery?.search,
      min_price: initialQuery?.min_price,
      max_price: initialQuery?.max_price,
      limit: initialQuery?.limit,
    }),
    [initialQuery],
  );

  const {
    items: loadedProductsRaw,
    loading: loadingMore,
    hasMoreRemote,
    fetchNextPage,
  } = usePaginatedProducts({
    initialProducts: products,
    initialTotal: total,
    initialLimit: limit,
    query: paginationQuery,
  });

  const loadedProducts: Product[] = useMemo(() => {
    if (lang !== "ar") return loadedProductsRaw;

    return loadedProductsRaw.map((p) => ({
      ...p,
      name: p.nameAr ?? p.name,
      description: p.descriptionAr ?? p.description,
      featureBulletPointsHtml:
        p.featureBulletPointsHtmlAr ?? p.featureBulletPointsHtml,
    }));
  }, [loadedProductsRaw, lang]);

  const firstProducts = useMemo(() => products, [products]);

  const categoriesFromFirstProducts: Option[] = useMemo(() => {
    const map = new Map<string, string>();

    for (const p of firstProducts) {
      if (p.categoryId == null) continue;
      const id = String(p.categoryId);

      const label =
        p.categoryName?.split("/").pop()?.trim() ||
        p.categoryName ||
        `Category ${id}`;

      map.set(id, label);
    }

    const list = Array.from(map.entries())
      .map(([value, label]) => ({ value, label }))
      .sort((a, b) => a.label.localeCompare(b.label));

    return [{ value: "all", label: "All" }, ...list];
  }, [firstProducts]);

  const currencyFromFirstProducts = useMemo(() => {
    return firstProducts.find((p) => p.currency)?.currency ?? "AED";
  }, [firstProducts]);

  const priceOptionsFromFirstProducts: Option[] = useMemo(() => {
    const prices = firstProducts
      .map((p) => p.price)
      .filter((v): v is number => typeof v === "number" && Number.isFinite(v))
      .sort((a, b) => a - b);

    const currency = currencyFromFirstProducts;

    if (prices.length === 0) return [{ value: "all", label: "All" }];

    const n = prices.length;
    const pick = (t: number) =>
      prices[Math.min(n - 1, Math.floor(t * (n - 1)))];

    const min = prices[0];
    const q1 = pick(0.25);
    const q2 = pick(0.5);
    const q3 = pick(0.75);
    const max = prices[n - 1];

    const pairs: Array<[number, number]> = [
      [min, q1],
      [q1, q2],
      [q2, q3],
      [q3, max],
    ];

    const ranges = pairs
      .map(([from, to]) => {
        const a = Number(from);
        const b = Number(to);
        if (!Number.isFinite(a) || !Number.isFinite(b)) return null;
        if (a === b) return null;

        const lo = Math.min(a, b);
        const hi = Math.max(a, b);

        return {
          value: `${lo}-${hi}`,
          label: `${currency} ${formatMoney(lo)} – ${currency} ${formatMoney(
            hi,
          )}`,
        } as Option;
      })
      .filter((x): x is Option => x !== null);

    const uniq = new Map<string, Option>();
    for (const r of ranges) uniq.set(r.value, r);

    return [{ value: "all", label: "All" }, ...Array.from(uniq.values())];
  }, [firstProducts, currencyFromFirstProducts]);

  const brands: Option[] = useMemo(() => {
    const rows = filtersData?.brands?.brands ?? [];
    const list = rows
      .map((b) => ({ value: String(b.id), label: b.name }))
      .sort((a, b) => a.label.localeCompare(b.label));

    return [{ value: "all", label: "All" }, ...list];
  }, [filtersData]);

  const colors: ColorOption[] = useMemo(() => {
    const values =
      filtersData?.attributes?.colors?.attributes?.[0]?.values ?? [];
    const list = values.map((v) => ({
      value: String(v.id),
      label: v.name,
      hex: typeof v.html_color === "string" ? v.html_color : undefined,
    }));

    return [{ value: "all", label: "All" }, ...list];
  }, [filtersData]);

  const sizes: Option[] = useMemo(() => {
    const values =
      filtersData?.attributes?.sizes?.attributes?.[0]?.values ?? [];
    const list = values.map((v) => ({ value: String(v.id), label: v.name }));
    return [{ value: "all", label: "All" }, ...list];
  }, [filtersData]);

  const { filteredProducts, visibleProducts, hasMore, handleViewMore } =
    useShopProducts({
      products: loadedProducts,
      initialCount,
      step,
      hasMoreRemote,
      onNeedMore: fetchNextPage,
    });
  const hasCatalogProducts = loadedProducts.length > 0;
  const noFilteredResults = hasCatalogProducts && filteredProducts.length === 0;

  return (
    <section className="py-10">
      <Container className="space-y-6">
        {hasCatalogProducts ? (
          <FilterBar
            categories={categoriesFromFirstProducts}
            priceOptions={priceOptionsFromFirstProducts}
            brands={brands}
            colors={colors}
            sizes={sizes}
            priceCurrency={currencyFromFirstProducts}
          />
        ) : null}

        {!hasCatalogProducts ? (
          <div className="rounded-2xl border border-dashed border-zinc-200 bg-white p-10 text-center">
            <p className="text-base font-semibold text-zinc-900">
              No products available
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              There are no products to show right now. Please check back later.
            </p>

            <button
              type="button"
              onClick={resetFiltersAndUrl}
              className="mt-6 cursor-pointer inline-flex items-center justify-center rounded-full border border-[#7C3BED] bg-white px-6 py-2 text-sm font-semibold text-[#7C3BED] hover:bg-violet-50"
            >
              Reset filters
            </button>
          </div>
        ) : noFilteredResults ? (
          <div className="rounded-2xl border border-dashed border-zinc-200 bg-white p-10 text-center">
            <p className="text-base font-semibold text-zinc-900">
              No results found
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              Try changing or clearing your filters to see more products.
            </p>

            <button
              type="button"
              onClick={resetFiltersAndUrl}
              className="mt-6 cursor-pointer inline-flex items-center justify-center rounded-full border border-[#7C3BED] bg-white px-6 py-2 text-sm font-semibold text-[#7C3BED] hover:bg-violet-50"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={String(product.id)}
                  product={product}
                  lang={lang}
                />
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center pt-4">
                <button
                  type="button"
                  onClick={handleViewMore}
                  disabled={loadingMore}
                  className="rounded-full bg-[#bf5910] px-6 py-2 text-sm font-semibold text-white shadow-md hover:bg-[#ffffff] hover:text-[#bf5910] border-1 border-[#bf5910] cursor-pointer outline-none transition-all duration-300 disabled:opacity-60"
                >
                  {loadingMore ? "Loading..." : "View more"}
                </button>
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
}
