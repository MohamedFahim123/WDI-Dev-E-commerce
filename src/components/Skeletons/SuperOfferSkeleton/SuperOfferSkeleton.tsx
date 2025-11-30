import React from "react";
import Container from "../../Container/Container";
import CategoriesFilterSkeleton from "../CategoriesFilterSkeleton/CategoriesFilterSkeleton";
import ProductsGridSkeleton from "../ProductsGridSkeleton/ProductsGridSkeleton";

function SuperOfferSkeleton() {
  return (
    <section className="w-full">
      <div
        className="
          bg-[#BF5910] text-white 
          px-4 sm:px-6 py-10
          flex flex-col items-center justify-center text-center
        "
      >
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="h-8 w-48 skeleton-shimmer rounded mx-auto" />
          <p className="h-4 w-3/4 skeleton-shimmer rounded mx-auto" />
        </div>
      </div>

      <Container className="py-10 overflow-hidden">
        <CategoriesFilterSkeleton />
        <ProductsGridSkeleton />
      </Container>
    </section>
  );
}
export default React.memo(SuperOfferSkeleton);
