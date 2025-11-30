import React from "react";
import Container from "../../Container/Container";
import FullTimerBoxSkeleton from "../FullTimerBoxSkeleton/FullTimerBoxSkeleton";
import ProductsGridSkeleton from "../ProductsGridSkeleton/ProductsGridSkeleton";

function FlashDealsSkeleton() {
  return (
    <section className="w-full">
      <div className="bg-[#BF5910] px-4 sm:px-6 py-10 flex flex-col items-center justify-center text-center">
        <Container
          className="
            flex flex-col items-center justify-center gap-4
            text-center
            sm:gap-5
            md:flex-row md:justify-between md:text-left
          "
        >
          <h2 className="text-white font-bold text-2xl sm:text-3xl flex items-center gap-2">
            <span className="text-yellow-300 text-2xl sm:text-3xl">⚡</span>
            <div className="h-6 w-28 skeleton-shimmer rounded" />
          </h2>

          <div className="w-full max-w-[260px]">
            <div className="flex items-center gap-3 border border-white/40 py-1 rounded-lg text-white min-w-64 justify-center">
              <div className="flex items-center gap-1 text-sm">
                <div className="h-4 w-20 skeleton-shimmer rounded" />
              </div>
              <FullTimerBoxSkeleton />
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-10">
        <ProductsGridSkeleton />
      </Container>
    </section>
  );
}
export default React.memo(FlashDealsSkeleton);
