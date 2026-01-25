import { fetchApi } from "@/src/lib/fetchApi";
import type {
  ApiAttributeValue,
  ApiProduct,
  ApiProductDetails,
  ApiProductListData,
  ApiResponse,
  Product,
  ProductColor,
  ProductImage,
  ProductListParams,
  ProductListResult,
  ProductVariant,
} from "@/src/types/product.types";

function getBackendBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    ""
  );
}

function toAbsoluteUrl(maybeRelative: string | null): string | null {
  if (!maybeRelative) return null;
  if (
    maybeRelative.startsWith("http://") ||
    maybeRelative.startsWith("https://")
  )
    return maybeRelative;

  const base = getBackendBaseUrl();
  if (!base) return maybeRelative;

  try {
    return new URL(maybeRelative, base).toString();
  } catch {
    return maybeRelative;
  }
}

function stripHtml(input: string): string {
  return input
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractFeatures(details: ApiProductDetails): string[] {
  const a = stripHtml(details.feature_bullet_points ?? "");
  const b = stripHtml(details.prod_features ?? "");
  const combined = `${a}\n${b}`.trim();
  if (!combined) return [];
  return combined
    .split(/[\n•\-]+/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

function buildSpecs(details: ApiProductDetails): Record<string, string> {
  const specs: Record<string, string> = {};
  const put = (k: string, v: unknown) => {
    if (v == null) return;
    if (typeof v === "string" && !v.trim()) return;
    if (typeof v === "number" && (!Number.isFinite(v) || v === 0)) return;
    specs[k] = String(v);
  };

  put("Category", details.category_name);
  put("Condition", details.item_condition);
  put("Warranty", details.warranty);
  put("Country of Origin", details.country_of_origin_name);
  put("Model Number", details.model_number);
  put("Model Name", details.model_name);
  put("Barcode", details.barcode);
  put("Default Code", details.default_code);
  put("UOM", details.uom_name);
  put("Weight", details.weight);
  put("Volume", details.volume);

  return specs;
}

function extractColors(details: ApiProductDetails): ProductColor[] {
  const lines = details.attribute_lines ?? [];
  const colorLine = lines.find(
    (l) => (l.attribute_name ?? "").toLowerCase() === "color",
  );
  const vals = colorLine?.values ?? [];
  return vals.map((v) => ({
    id: String(v.id),
    name: v.name,
    hex: v.html_color,
  }));
}

function findColorSize(attributeValues: ApiAttributeValue[] = []) {
  let colorId: string | undefined;
  let size: string | undefined;

  for (const av of attributeValues) {
    const attrName = (av.attribute_name ?? "").toLowerCase();
    if (attrName === "color") {
      const id = av.value_id ?? av.id;
      if (id != null) colorId = String(id);
    }
    if (attrName === "size") {
      const label = av.value_name ?? av.name;
      if (label) size = String(label);
    }
  }
  return { colorId, size };
}

function extractVariants(details: ApiProductDetails): ProductVariant[] {
  const vars = details.variants ?? [];
  if (vars.length === 0) {
    return [
      {
        id: String(details.id),
        stock: Number(details.qty_available ?? 0),
      },
    ];
  }

  return vars.map((v) => {
    const { colorId, size } = findColorSize(v.attribute_values ?? []);
    return {
      id: String(v.id),
      colorId,
      size,
      stock: Number(v.qty_available ?? 0),
    };
  });
}

function buildImages(details: ApiProductDetails): ProductImage[] {
  const url = toAbsoluteUrl(details.image_url ?? null);
  if (!url) return [];
  return [{ id: "main", url, alt: details.name ?? "Product image" }];
}

/** list -> UI Product */
export function normalizeProduct(p: ApiProduct): Product {
  const imageUrl = toAbsoluteUrl(p.image_url ?? null);
  const images: ProductImage[] = imageUrl
    ? [{ id: "main", url: imageUrl, alt: p.name ?? "Product image" }]
    : [];

  return {
    id: String(p.id),
    name: p.name ?? "",

    description: p.description ?? "",
    featureBulletPointsHtml: p.feature_bullet_points ?? "",

    price: Number(p.list_price ?? 0),
    currency: p.currency_name ?? "",

    imageUrl,
    images,

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
  };
}

export function normalizeProductDetails(details: ApiProductDetails): Product {
  const base = normalizeProduct(details);
  return {
    ...base,
    images: buildImages(details),
    colors: extractColors(details),
    variants: extractVariants(details),
    features: extractFeatures(details),
    specs: buildSpecs(details),
  };
}

export async function getProductsList(
  params: ProductListParams = {},
  opts?: { revalidateSeconds?: number },
): Promise<ProductListResult> {
  const qs = new URLSearchParams();
  if (params.category_id != null)
    qs.set("category_id", String(params.category_id));
  if (params.company_id != null)
    qs.set("company_id", String(params.company_id));
  if (params.search) qs.set("search", params.search);
  if (params.min_price != null) qs.set("min_price", String(params.min_price));
  if (params.max_price != null) qs.set("max_price", String(params.max_price));
  qs.set("limit", String(params.limit ?? 20));
  qs.set("offset", String(params.offset ?? 0));

  const res = await fetchApi(`product/list?${qs.toString()}`, {
    cache: "force-cache",
    next: { revalidate: opts?.revalidateSeconds ?? 300 },
  });

  const typed = res as unknown as ApiResponse<ApiProductListData>;
  if (!typed.success)
    throw new Error(typed.message || "Failed to load products");

  return {
    products: typed.data.products.map(normalizeProduct),
    total: typed.data.total,
    limit: typed.data.limit,
    offset: typed.data.offset,
    filters: typed.data.filters ?? {},
  };
}

export async function getProductDetails(productId: number): Promise<Product> {
  const res = await fetchApi<ApiProductDetails>(
    `product/details?product_id=${productId}`,
    { cache: "force-cache", next: { revalidate: 3600 } },
  );

  const typed = res as unknown as ApiResponse<ApiProductDetails>;
  if (!typed.success)
    throw new Error(typed.message || "Failed to load product");

  return normalizeProductDetails(typed.data);
}
export async function getProductsSeed(opts?: {
  limit?: number;
  offset?: number;
  revalidateSeconds?: number;
  noStore?: boolean;
}): Promise<ProductListResult> {
  const qs = new URLSearchParams();

  qs.set("limit", String(opts?.limit ?? 20));
  qs.set("offset", String(opts?.offset ?? 0));

  const res = await fetchApi(`product/list?${qs.toString()}`, {
    cache: opts?.noStore ? "no-store" : "force-cache",
    next: opts?.noStore
      ? undefined
      : { revalidate: opts?.revalidateSeconds ?? 300 },
  });

  const typed = res as unknown as ApiResponse<ApiProductListData>;

  if (!typed.success) {
    throw new Error(typed.message || "Failed to load products");
  }

  return {
    products: typed.data.products.map(normalizeProduct),
    total: typed.data.total,
    limit: typed.data.limit,
    offset: typed.data.offset,
    filters: {},
  };
}
