import React from "react";
import GlobalSearchBarSkeleton from "../GlobalSearchBarSkeleton/GlobalSearchBarSkeleton";

function HeroSectionSkeleton() {
  return (
    <section className="w-full">
      <div className="relative w-full h-[320px] sm:h-[380px] md:h-[430px] lg:h-[460px] xl:h-[450px]">
        <div className="absolute inset-0 skeleton-shimmer" />

        <div className="absolute inset-0 flex items-center justify-center px-4 md:px-6 lg:hidden">
          <div className="w-full max-w-md">
            <GlobalSearchBarSkeleton />
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(HeroSectionSkeleton);
