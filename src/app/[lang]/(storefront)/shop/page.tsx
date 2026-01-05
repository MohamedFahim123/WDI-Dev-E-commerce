import ShopProducts from "@/src/components/ShopProducts/ShopProducts";
import { withBlockSeller } from "@/src/hoc/roleGuards";
import { products } from "@/src/stores/products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - Shop",
  description: "Explore Our Products!",
};

function ProductsPage() {
  return <ShopProducts products={products} />;
}

export default withBlockSeller(ProductsPage, {
  redirectTo: (lang: string) => `/${lang}`,
});
