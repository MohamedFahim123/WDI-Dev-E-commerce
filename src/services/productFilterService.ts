import type { Product } from "@/src/types/product.types";
import type { ShopFilters } from "@/src/stores/shopStore";

export function parseRange(value: string): { min: number; max: number } | null {
  const parts = value.split("-");
  if (parts.length !== 2) return null;

  const min = Number(parts[0]);
  const max = Number(parts[1]);

  if (!Number.isFinite(min) || !Number.isFinite(max)) return null;
  return { min, max };
}


export function applyFiltersAndSort(products: Product[], filters: ShopFilters) {
  let out = products;

  if (filters.categoryId !== "all") {
    out = out.filter((p) => String(p.categoryId ?? "") === filters.categoryId);
  }

  if (filters.price !== "all") {
    const r = parseRange(filters.price);
    if (r) {
      out = out.filter(
        (p) =>
          typeof p.price === "number" &&
          Number.isFinite(p.price) &&
          p.price >= r.min &&
          p.price <= r.max,
      );
    }
  }

  // sort
  const sort = filters.sort;
  if (sort === "price_asc") out = [...out].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
  if (sort === "price_desc") out = [...out].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
  if (sort === "name_asc") out = [...out].sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "name_desc") out = [...out].sort((a, b) => b.name.localeCompare(a.name));

  return out;
}
