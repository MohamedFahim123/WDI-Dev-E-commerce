import ShopProducts from "@/src/components/ShopProducts/ShopProducts";
import { withBlockSeller } from "@/src/hoc/roleGuards";
import { parseShopSearchParams } from "@/src/lib/features/parseShopSearchParams";
import { getFilters } from "@/src/services/filter.service";
import { getProductsList } from "@/src/services/product.service";

type Props = {
  params: { lang: string };
  searchParams?: Record<string, string | string[] | undefined>;
};

async function ProductsPage({ params, searchParams }: Props) {
  const { lang } = params;
  const sp = searchParams ?? {};

  const { listParams, initialQuery } = parseShopSearchParams(sp);

  const list = await getProductsList(listParams, { revalidateSeconds: 300 });
  const filtersData = await getFilters();

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
