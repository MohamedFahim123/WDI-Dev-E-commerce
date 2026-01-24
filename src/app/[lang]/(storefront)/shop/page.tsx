import { withBlockSeller } from "@/src/hoc/roleGuards";
import ShopProducts from "@/src/components/ShopProducts/ShopProducts";
import { getProductsList } from "@/src/services/product.service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - Shop",
  description: "Explore Our Products!",
};

type Props = {
  params: Promise<{ lang: string }>;
};

async function ProductsPage({ params }: Props) {
  const { lang } = await params;

  const { products } = await getProductsList({}, { revalidateSeconds: 300 });

  return <ShopProducts products={products} lang={lang} />;
}

export default withBlockSeller(ProductsPage, {
  redirectTo: (lang: string) => `/${lang}`,
});
