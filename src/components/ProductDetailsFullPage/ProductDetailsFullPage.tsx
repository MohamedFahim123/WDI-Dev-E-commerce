"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import {
  ProductGallerySkeleton,
  ProductInfoPanelSkeleton,
  ProductTabsSkeleton,
} from "../Skeletons/ProductDetailsSkeleton/ProductDetailsSkeleton";

import { RelatedProducts } from "./RelatedProducts/RelatedProducts";
import { useRouteLang } from "@/src/hooks/useLang";
import type { Product } from "@/src/types/product.types";

type Props = {
  product: Product;
};

const ProductGallery = dynamic<{ product: Product }>(
  () =>
    import("@/src/components/ProductDetailsFullPage/ProductGallery/ProductGallery").then(
      (m) => m.ProductGallery,
    ),
  { loading: () => <ProductGallerySkeleton /> },
);

const ProductTabs = dynamic<{ product: Product; productId: string }>(
  () =>
    import("@/src/components/ProductDetailsFullPage/ProductTabs/ProductTabs").then(
      (m) => m.ProductTabs,
    ),
  { loading: () => <ProductTabsSkeleton /> },
);

const ProductInfoPanel = dynamic<{ product: Product }>(
  () =>
    import("@/src/components/ProductDetailsFullPage/ProductInfoPanel/ProductInfoPanel").then(
      (m) => m.ProductInfoPanel,
    ),
  { loading: () => <ProductInfoPanelSkeleton /> },
);

export function ProductDetailsFullPage({ product }: Props) {
  const lang = useRouteLang();

  return (
    <>
      <Link
        href={`/${lang}`}
        className="mb-4 flex w-fit items-center transition-all duration-300 hover:text-[#7C3BED]"
      >
        {lang === "ar" ? (
          <ArrowRight size={20} className="me-2" />
        ) : (
          <ArrowLeft size={20} className="me-2" />
        )}
        Back to Home
      </Link>

      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <ProductGallery product={product} />
          <ProductTabs product={product} productId={String(product.id)} />
        </div>

        <ProductInfoPanel product={product} />
      </div>

      <RelatedProducts currentProductId={String(product.id)} lang={lang} />
    </>
  );
}
