import React from "react";

function CouponsSkeleton() {
  const cards = Array.from({ length: 3 });

  return (
    <section className="space-y-4 animate-pulse">
      <div className="flex items-center justify-between gap-3">
        <div className="h-5 w-32 rounded skeleton-shimmer" />
        <div className="h-3 w-16 rounded skeleton-shimmer" />
      </div>

      <div className="space-y-3">
        {cards.map((_, idx) => (
          <article
            key={idx}
            className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="h-5 w-20 rounded skeleton-shimmer" />
              <div className="h-3 w-28 rounded skeleton-shimmer" />
            </div>

            <div className="mt-2 space-y-1">
              <div className="h-3 w-48 rounded skeleton-shimmer" />
              <div className="h-3 w-64 rounded skeleton-shimmer" />
            </div>

            <div className="mt-3 flex items-center gap-2">
              <div className="h-7 w-24 rounded-md skeleton-shimmer" />
              <div className="h-7 w-20 rounded-md skeleton-shimmer" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default React.memo(CouponsSkeleton);
