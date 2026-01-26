type NextSearchParams = Record<string, string | string[] | undefined>;

function first(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

function toNum(v: string | undefined) {
  if (v == null) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

export function parseShopSearchParams(sp: NextSearchParams) {
  const category_id = toNum(first(sp.category_id));
  const company_id = toNum(first(sp.company_id));

  const min_price = toNum(first(sp.min_price));
  const max_price = toNum(first(sp.max_price));

  const color_id = toNum(first(sp.color_id));
  const size_id = toNum(first(sp.size_id));

  const limitRaw = toNum(first(sp.limit));
  const offsetRaw = toNum(first(sp.offset));

  const search = first(sp.search) || undefined;
  const sort = first(sp.sort) || "relevance";

  return {
    listParams: {
      category_id: category_id != null ? Math.trunc(category_id) : undefined,
      company_id: company_id != null ? Math.trunc(company_id) : undefined,
      search,

      min_price,
      max_price,

      limit: limitRaw != null ? clamp(Math.trunc(limitRaw), 1, 100) : 20,
      offset: offsetRaw != null ? Math.max(0, Math.trunc(offsetRaw)) : 0,
    },

    initialQuery: {
      category_id:
        category_id != null ? String(Math.trunc(category_id)) : "all",

      company_id: company_id != null ? String(Math.trunc(company_id)) : "all",

      color_id: color_id != null ? String(Math.trunc(color_id)) : "all",
      size_id: size_id != null ? String(Math.trunc(size_id)) : "all",

      min_price: min_price != null ? String(min_price) : "",
      max_price: max_price != null ? String(max_price) : "",

      search: search || "",
      sort,

      limit:
        limitRaw != null ? String(clamp(Math.trunc(limitRaw), 1, 100)) : "20",
      offset:
        offsetRaw != null ? String(Math.max(0, Math.trunc(offsetRaw))) : "0",
    },
  };
}
