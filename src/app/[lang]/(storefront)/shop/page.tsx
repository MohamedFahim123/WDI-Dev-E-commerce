import ShopProducts from "@/src/components/ShopProducts/ShopProducts";
import { products } from "@/src/stores/products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - Shop",
  description: "Explore Our Products!",
};

export default function ProductsPage() {
  return <ShopProducts products={products} />;
}
