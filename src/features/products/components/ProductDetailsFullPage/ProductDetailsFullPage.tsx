import { ArrowLeft, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

import {
  ProductGallerySkeleton,
  ProductInfoPanelSkeleton,
  ProductTabsSkeleton,
} from "@/src/components/Skeletons/ProductDetailsSkeleton/ProductDetailsSkeleton";

import type { Product } from "@/src/types/product.types";
import { RelatedProducts } from "./RelatedProducts/RelatedProducts";

type Props = {
  product: Product;
  lang: string;
};

const ProductGallery = dynamic(
  () =>
    import("@/src/components/ProductDetailsFullPage/ProductGallery/ProductGallery").then(
      (m) => m.ProductGallery,
    ),
  { loading: () => <ProductGallerySkeleton /> },
);

const ProductTabs = dynamic(
  () =>
    import("@/src/components/ProductDetailsFullPage/ProductTabs/ProductTabs").then(
      (m) => m.ProductTabs,
    ),
  { loading: () => <ProductTabsSkeleton /> },
);

const ProductInfoPanel = dynamic(
  () =>
    import("@/src/components/ProductDetailsFullPage/ProductInfoPanel/ProductInfoPanel").then(
      (m) => m.ProductInfoPanel,
    ),
  { loading: () => <ProductInfoPanelSkeleton /> },
);

export function ProductDetailsFullPage({ product, lang }: Props) {
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
          <ProductTabs product={product} productId={product.id} />
        </div>

        <ProductInfoPanel product={product} />
      </div>

      <RelatedProducts currentProductId={product.id} lang={lang} />
    </>
  );
}

