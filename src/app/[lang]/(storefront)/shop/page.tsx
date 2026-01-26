import ShopProducts from "@/src/components/ShopProducts/ShopProducts";
import { withBlockSeller } from "@/src/hoc/roleGuards";
import { parseShopSearchParams } from "@/src/lib/features/parseShopSearchParams";
import { getFilters } from "@/src/services/filter.service";
import { getProductsList } from "@/src/services/product.service";

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

  return (
    <ShopProducts
      products={list.products}
      lang={lang}
      filtersData={filtersData}
      initialQuery={initialQuery}
    />
  );
}

export default withBlockSeller(ProductsPage, {
  redirectTo: (lang: string) => `/${lang}`,
});
