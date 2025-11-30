import React from "react";
import Container from "../../Container/Container";
function DealsHeroSkeleton() {
  return (
    <section
      className="w-full bg-white"
      aria-busy="true"
      aria-label="Loading deals and coupons"
    >
      <Container>
        <div className="py-2">
          <div className="mb-4 space-y-2">
            <div className="h-3 w-24 rounded skeleton-shimmer" />
            <div className="h-6 w-48 rounded skeleton-shimmer" />
          </div>
        </div>
      </Container>

      <div className="w-full bg-black">
        <div className="overflow-hidden">
          <div className="skeleton-shimmer h-14 w-full sm:h-30 md:h-30" />
        </div>
      </div>
    </section>
  );
}

export default React.memo(DealsHeroSkeleton);
