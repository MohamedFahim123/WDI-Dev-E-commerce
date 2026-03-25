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

function toIdString(v: unknown): string | null {
  if (typeof v === "string" && v.trim()) return v;
  if (typeof v === "number" && Number.isFinite(v)) return String(v);
  return null;
}

type ProductCompanyShape = {
  brandId?: string | number | null;
  companyId?: string | number | null;
  company_id?: string | number | null;
  company?: {
    id?: string | number | null;
    company_id?: string | number | null;
  } | null;

  attribute_values?: Array<{
    attribute_name?: string | null;
    value_id?: string | number | null;
    value_name?: string | null;
    name?: string | null;
    id?: string | number | null;
  }> | null;
};

function getBrandId(p: Product): string | null {
  const x = p as Product & Partial<ProductCompanyShape>;

  const v =
    x.brandId ??
    x.companyId ??
    x.company_id ??
    x.company?.id ??
    x.company?.company_id;

  return toIdString(v);
}

function collectColorIds(p: Product): string[] {
  const fromColors: string[] = Array.isArray(p.colors)
    ? p.colors
        .map((c) => toIdString(c?.id))
        .filter((v): v is string => v !== null)
    : [];

  type VariantColorShape = { color_id?: string | number | null };
  const fromVariants: string[] = Array.isArray(p.variants)
    ? p.variants
        .map((v) => {
          const ext = v as typeof v & Partial<VariantColorShape>;
          return toIdString(v.colorId ?? ext.color_id);
        })
        .filter((v): v is string => v !== null)
    : [];

  return Array.from(new Set([...fromColors, ...fromVariants]));
}

function collectSizeIdsOrNames(p: Product): string[] {
  const fromVariants: string[] = Array.isArray(p.variants)
    ? p.variants
        .map((v) => (typeof v.size === "string" ? v.size.trim() : ""))
        .filter((s) => !!s)
    : [];

  const ext = p as Product & Partial<ProductCompanyShape>;
  const attrs = Array.isArray(ext.attribute_values) ? ext.attribute_values : [];

  const fromAttributes: string[] = attrs
    .filter((av) => String(av?.attribute_name ?? "").toLowerCase() === "size")
    .map((av) => {
      return (
        toIdString(av?.value_id ?? av?.id) ??
        (typeof av?.value_name === "string" && av.value_name.trim()
          ? av.value_name.trim()
          : typeof av?.name === "string" && av.name.trim()
            ? av.name.trim()
            : null)
      );
    })
    .filter((v): v is string => v !== null);

  return Array.from(new Set([...fromVariants, ...fromAttributes]));
}

export function applyFiltersAndSort(products: Product[], filters: ShopFilters) {
  let out = products;

  if (filters.categoryId !== "all") {
    out = out.filter((p) => String(p.categoryId ?? "") === filters.categoryId);
  }

  if (filters.price !== "all") {
    const r = parseRange(filters.price);
    if (r) {
      out = out.filter((p) => {
        const price = p.price;
        return (
          typeof price === "number" &&
          Number.isFinite(price) &&
          price >= r.min &&
          price <= r.max
        );
      });
    }
  }

  if (filters.brandId !== "all") {
    out = out.filter((p) => getBrandId(p) === String(filters.brandId));
  }

  if (filters.colorId !== "all") {
    const hasAnyColorData = out.some((p) => collectColorIds(p).length > 0);
    if (hasAnyColorData) {
      out = out.filter((p) => collectColorIds(p).includes(filters.colorId));
    }
  }

  if (filters.sizeId !== "all") {
    const hasAnySizeData = out.some((p) => collectSizeIdsOrNames(p).length > 0);
    if (hasAnySizeData) {
      const wanted = String(filters.sizeId).toLowerCase();
      out = out.filter((p) =>
        collectSizeIdsOrNames(p).some((s) => s.toLowerCase() === wanted),
      );
    }
  }

  const sort = filters.sort;
  if (sort === "price_asc")
    out = [...out].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
  if (sort === "price_desc")
    out = [...out].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
  if (sort === "name_asc")
    out = [...out].sort((a, b) =>
      String(a.name ?? "").localeCompare(String(b.name ?? "")),
    );
  if (sort === "name_desc")
    out = [...out].sort((a, b) =>
      String(b.name ?? "").localeCompare(String(a.name ?? "")),
    );

  return out;
}
