import ShopProducts from "@/src/components/ShopProducts/ShopProducts";
import { withBlockSeller } from "@/src/hoc/roleGuards";
import { getFilters } from "@/src/services/filter.service";
import { getProductsList } from "@/src/services/product.service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - Shop",
  description: "Explore Our Products!",
};

async function ProductsPage() {
  const [filters, productList] = await Promise.all([
    getFilters(),
    getProductsList({ limit: 20, offset: 0 }, { revalidateSeconds: 300 }),
  ]);

  console.log(filters);

  return <ShopProducts initialProducts={productList.products} />;
}

export default withBlockSeller(ProductsPage, {
  redirectTo: (lang: string) => `/${lang}`,
});
