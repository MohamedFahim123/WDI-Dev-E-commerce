"use client";
import { useRouteLang } from "@/src/hooks/useLang";
import { StoreHeader } from "./StoreHeader/StoreHeader";
import Container from "../Container/Container";
import CategoriesFilter from "../CategoriesFilter/CategoriesFilter";
import ProductsGrid from "../ProductsGrid/ProductsGrid";

export default function StoreProfileView() {
  const lang = useRouteLang();
  const dummyStore = {
    name: "Store Name",
    logoUrl: "/assets/logos/companylogo.webp",
    rating: 4.8,
    reviewCount: 200,
  };

  return (
    <section className="py-6">
      <StoreHeader
        lang={lang}
        name={dummyStore.name}
        logoUrl={dummyStore.logoUrl}
        rating={dummyStore.rating}
        reviewCount={dummyStore.reviewCount}
      />

      <Container className="py-10 overflow-hidden">
        <CategoriesFilter notHome={true} />
        <ProductsGrid />
      </Container>
    </section>
  );
}
