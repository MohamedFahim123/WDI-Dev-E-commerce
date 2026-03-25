"use client";

import { useRouteLang } from "@/src/hooks/useLang";
import dynamic from "next/dynamic";
import Container from "@/src/components/Container/Container";

import CategoriesFilterSkeleton from "@/src/components/Skeletons/CategoriesFilterSkeleton/CategoriesFilterSkeleton";
import DealsHeroSkeleton from "@/src/components/Skeletons/DealsHeroSkeleton/DealsHeroSkeleton";
import FlashDealsSkeleton from "@/src/components/Skeletons/FlashDealsSkeleton/FlashDealsSkeleton";
import ProductsGridSkeleton from "@/src/components/Skeletons/ProductsGridSkeleton/ProductsGridSkeleton";

const CategoriesFilter = dynamic(
  () =>
    import("@/src/components/CategoriesFilter/CategoriesFilter").then(
      (m) => m.default
    ),
  {
    loading: () => <CategoriesFilterSkeleton />,
  }
);
const ProductsGrid = dynamic(
  () =>
    import("@/src/components/ProductsGrid/ProductsGrid").then((m) => m.default),
  {
    loading: () => <ProductsGridSkeleton />,
  }
);

const FlashDeals = dynamic(
  () => import("@/src/components/FlashDeals/FlashDeals").then((m) => m.default),
  {
    loading: () => <FlashDealsSkeleton />,
  }
);

const DealsHero = dynamic(
  () =>
    import("@/src/components/FlashDealsFullContent/DealsHero/DealsHero").then(
      (m) => m.DealsHero
    ),
  {
    loading: () => <DealsHeroSkeleton />,
  }
);

export default function FlashDealsFullContent() {
  const lang = useRouteLang();

  return (
    <>
      <section className="py-6">
        <DealsHero lang={lang} />
        <FlashDeals />
        <Container className="py-10 overflow-hidden">
          <CategoriesFilter notHome={true} />
          <ProductsGrid />
        </Container>
      </section>
    </>
  );
}

