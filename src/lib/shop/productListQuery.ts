export type ProductListQuery = {
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

function clampInt(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, Math.trunc(n)));
}

export function buildProductListApiParams(
  q?: ProductListQuery,
  offset = 0,
  fallbackLimit = 20,
) {
  const category_id =
    q?.category_id && q.category_id !== "all"
      ? toNum(q.category_id)
      : undefined;

  const company_id =
    q?.company_id && q.company_id !== "all" ? toNum(q.company_id) : undefined;

  const min_price = toNum(q?.min_price);
  const max_price = toNum(q?.max_price);

  const limitRaw = toNum(q?.limit) ?? fallbackLimit;
  const limit = clampInt(limitRaw, 1, 100);

  const search = q?.search?.trim() ? q.search.trim() : undefined;

  return {
    category_id: category_id != null ? Math.trunc(category_id) : undefined,
    company_id: company_id != null ? Math.trunc(company_id) : undefined,
    search,
    min_price,
    max_price,
    limit,
    offset: Math.max(0, Math.trunc(offset)),
  };
}

export function toQueryString(params: Record<string, unknown>) {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === "") continue;
    qs.set(k, String(v));
  }
  return qs.toString();
}
