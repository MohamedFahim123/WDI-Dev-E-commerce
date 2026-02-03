"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  ApiProduct,
  ApiProductListData,
  ApiResponse,
  Product,
} from "@/src/types/product.types";

type ProductListQuery = {
  category_id?: string;
  company_id?: string;
  search?: string;
  min_price?: string;
  max_price?: string;
  limit?: string;
};

function toNum(v?: string) {
  if (!v) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

function requestedLimit(q?: ProductListQuery, fallback = 20) {
  const l = toNum(q?.limit) ?? fallback;
  return Math.max(20, Math.trunc(l));
}

function buildApiQuery(q: ProductListQuery | undefined, limit: number, offset: number) {
  const qs = new URLSearchParams();

  const category_id =
    q?.category_id && q.category_id !== "all" ? toNum(q.category_id) : undefined;
  const company_id =
    q?.company_id && q.company_id !== "all" ? toNum(q.company_id) : undefined;

  const min_price = toNum(q?.min_price);
  const max_price = toNum(q?.max_price);

  const search = q?.search?.trim() ? q.search.trim() : undefined;

  if (category_id != null) qs.set("category_id", String(category_id));
  if (company_id != null) qs.set("company_id", String(company_id));
  if (search) qs.set("search", search);
  if (min_price != null) qs.set("min_price", String(min_price));
  if (max_price != null) qs.set("max_price", String(max_price));

  qs.set("limit", String(limit));
  qs.set("offset", String(Math.max(0, Math.trunc(offset))));

  return qs.toString();
}

function mergeUnique(prev: Product[], next: Product[]) {
  const map = new Map<string, Product>();
  for (const p of prev) map.set(String(p.id), p);
  for (const p of next) map.set(String(p.id), p);
  return Array.from(map.values());
}

function normalizeApiProduct(p: ApiProduct): Product {
  const imageUrl = p.image_url ?? null;
  const name = p.name ?? "";

  return {
    id: String(p.id),

    name,
    nameAr: p.name_ar ?? undefined,

    description: p.description ?? "",
    descriptionAr: p.description_ar ?? undefined,

    featureBulletPointsHtml: p.feature_bullet_points ?? "",
    featureBulletPointsHtmlAr: p.feature_bullet_points_ar ?? undefined,

    price: Number(p.list_price ?? 0),
    currency: p.currency_name ?? "",

    imageUrl,
    images: imageUrl ? [{ id: "main", url: imageUrl, alt: name }] : [],

    colors: [],
    variants: [],

    features: [],
    specs: {},

    rating: undefined,
    reviewCount: undefined,

    badge: undefined,
    discountCount: null,
    originalPrice: null,

    categoryId: p.categ_id ?? null,
    categoryName: p.category_name ?? null,

    companyId: p.company_id ?? null,
    companyName: p.company_name ?? null,

    brandId: p.company_id ?? null,
    brandName: p.brand_name ?? p.company_name ?? null,
  };
}

type Args = {
  initialProducts: Product[];
  initialTotal?: number;
  initialLimit?: number;
  query?: ProductListQuery;
};

export function usePaginatedProducts({
  initialProducts,
  initialTotal,
  initialLimit,
  query,
}: Args) {
  const [items, setItems] = useState<Product[]>(() => initialProducts);
  const [total, setTotal] = useState<number | undefined>(() => initialTotal);

  const [limit, setLimit] = useState<number>(() =>
    requestedLimit(query, initialLimit ?? 20),
  );

  const [nextOffset, setNextOffset] = useState<number>(() => initialProducts.length);

  const [loading, setLoading] = useState(false);

  const [hasMoreRemote, setHasMoreRemote] = useState<boolean>(() => {
    const l = requestedLimit(query, initialLimit ?? 20);
    return initialProducts.length >= l;
  });

  const abortRef = useRef<AbortController | null>(null);

  const queryKey = useMemo(
    () =>
      JSON.stringify({
        category_id: query?.category_id ?? "",
        company_id: query?.company_id ?? "",
        search: query?.search ?? "",
        min_price: query?.min_price ?? "",
        max_price: query?.max_price ?? "",
        limit: query?.limit ?? "",
      }),
    [query],
  );

  useEffect(() => {
    abortRef.current?.abort();

    const l = requestedLimit(query, initialLimit ?? 20);

    setItems(initialProducts);
    setTotal(initialTotal);

    setLimit(l);
    setNextOffset(initialProducts.length);

    setHasMoreRemote(initialProducts.length >= l);
    setLoading(false);
  }, [queryKey, initialProducts, initialTotal, initialLimit, query]);

  const fetchNextPage = useCallback(async () => {
    if (loading) return;
    if (!hasMoreRemote) return;

    const controller = new AbortController();
    abortRef.current?.abort();
    abortRef.current = controller;

    setLoading(true);
    try {
      const l = limit;

      const qs = buildApiQuery(query, l, nextOffset);

      const url = `/api/shop/product/list?${qs}`;

      const res = await fetch(url, {
        method: "GET",
        signal: controller.signal,
        credentials: "include",
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = (await res.json()) as ApiResponse<ApiProductListData>;
      if (!json?.success) throw new Error(json?.message || "Failed to load products");

      const page = json.data.products ?? [];
      const pageSize = page.length;

      const next = page.map((p) => normalizeApiProduct(p));

      setItems((prev) => mergeUnique(prev, next));
      setTotal(json.data.total);

      setNextOffset((o) => o + pageSize);

      setHasMoreRemote(pageSize === l);
    } catch (e) {
      if ((e as { name?: string })?.name !== "AbortError") {
        console.error(e);
      }
    } finally {
      setLoading(false);
    }
  }, [loading, hasMoreRemote, query, limit, nextOffset]);

  return {
    items,
    total,
    limit,
    loading,
    hasMoreRemote,
    fetchNextPage,
  };
}
