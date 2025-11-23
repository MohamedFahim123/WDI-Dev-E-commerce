import { products } from "../stores/products";
import type { Product } from "../types/product.types";

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.id === slug);
}

export async function fetchProductBySlug(
  slug: string
): Promise<Product | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return getProductBySlug(slug);
}
