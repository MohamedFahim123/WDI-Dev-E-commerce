"use client";

import type { Product } from "@/src/types/product.types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { ProductReviews } from "../ProductReviews/ProductReviews";

type Props = {
  product: Product;
  productId: string;
};

export function ProductTabs({ product, productId }: Props) {
  const features = product.features ?? [];
  const specs = product.specs ?? {};

  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="mb-4 px-0">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="specs">Specifications</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="space-y-4">
        <p className="text-sm leading-relaxed text-zinc-700">
          {product.description || "No description available."}
        </p>

        {features.length > 0 && (
          <ul className="list-disc space-y-1 pl-4 text-sm text-zinc-700">
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        )}
      </TabsContent>

      <TabsContent value="specs">
        {Object.keys(specs).length === 0 ? (
          <p className="text-sm text-zinc-500">No specifications available.</p>
        ) : (
          <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            {Object.entries(specs).map(([key, value]) => (
              <div
                key={key}
                className="rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2"
              >
                <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  {key}
                </dt>
                <dd className="mt-1 text-sm text-zinc-800">{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </TabsContent>

      <TabsContent value="reviews">
        <ProductReviews
          product={product}
          productId={productId}
          rating={product.rating ?? 0}
          reviewCount={product.reviewCount ?? 0}
        />
      </TabsContent>
    </Tabs>
  );
}

