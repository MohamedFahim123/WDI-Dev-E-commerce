"use client";

import { useRouteLang } from "@/src/hooks/useLang";
import dynamic from "next/dynamic";
import CategoriesFilter from "../CategoriesFilter/CategoriesFilter";
import Container from "../Container/Container";
import FlashDeals from "../FlashDeals/FlashDeals";
import ProductsGrid from "../ProductsGrid/ProductsGrid";
import DealsHeroSkeleton from "../Skeletons/DealsHeroSkeleton/DealsHeroSkeleton";
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
