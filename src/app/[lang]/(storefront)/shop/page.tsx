import ShopProducts from "@/src/features/shop/components/ShopProducts/ShopProducts";
import { parseShopSearchParams } from "@/src/features/shop/lib/parseShopSearchParams";
import { getFilters } from "@/src/features/shop/services/filter.service";
import { getProductsList } from "@/src/features/products/services/product.service";

type SearchParams = Record<string, string | string[] | undefined>;
type Awaitable<T> = T | Promise<T>;

type Props = {
  params: Awaitable<{ lang: string }>;
  searchParams?: Awaitable<SearchParams>;
};

function isThenable<T = unknown>(v: unknown): v is PromiseLike<T> {
  return (
    typeof v === "object" &&
    v !== null &&
    "then" in v &&
    typeof (v as PromiseLike<T>).then === "function"
  );
}

async function ProductsPage({ params, searchParams }: Props) {
  const resolvedParams = isThenable<{ lang: string }>(params)
    ? await params
    : params;
  const lang = resolvedParams.lang;

  const resolvedSearchParams = isThenable<SearchParams>(searchParams)
    ? await searchParams
    : searchParams;

  const sp: SearchParams = resolvedSearchParams ?? {};

  const { listParams, initialQuery } = parseShopSearchParams(sp);

  const [list, filtersData] = await Promise.all([
    getProductsList(listParams, { revalidateSeconds: 300 }),
    getFilters(),
  ]);

  const localizedProducts =
    lang === "ar"
      ? list.products.map((p) => ({
          ...p,
          name: p.nameAr ?? p.name,
          description: p.descriptionAr ?? p.description,
          featureBulletPointsHtml:
            p.featureBulletPointsHtmlAr ?? p.featureBulletPointsHtml,
        }))
      : list.products;

  return (
    <ShopProducts
      key={[
        lang,
        initialQuery?.category_id ?? "",
        initialQuery?.company_id ?? "",
        initialQuery?.color_id ?? "",
        initialQuery?.size_id ?? "",
        initialQuery?.min_price ?? "",
        initialQuery?.max_price ?? "",
        initialQuery?.search ?? "",
        initialQuery?.sort ?? "",
        initialQuery?.limit ?? "",
      ].join("|")}
      products={localizedProducts}
      total={list.total}
      limit={list.limit}
      lang={lang}
      filtersData={filtersData}
      initialQuery={initialQuery}
    />
  );
}

export default ProductsPage;

