"use client"
import { useEffect, useState } from "react";
import type { Product } from "../types/product.types";
import { fetchProductBySlug } from "../services/productService";

export function useProductDetails(slug: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setProduct(null);
      setError("Missing product slug");
      setLoading(false);
      return;
    }

    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const p = await fetchProductBySlug(slug);

        if (cancelled) return;

        if (!p) {
          setProduct(null);
          setError("Product not found");
        } else {
          setProduct(p);
          setError(null);
        }
      } catch (err) {
        if (cancelled) return;

        const message =
          err instanceof Error ? err.message : "Failed to load product";
        setError(message);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { product, loading, error };
}
