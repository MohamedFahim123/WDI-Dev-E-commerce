import React from "react";

function SavedAddressesSkeleton() {
  const cards = Array.from({ length: 2 });

  return (
    <section className="space-y-4 animate-pulse">
      <div className="flex items-center justify-between gap-3">
        <div className="h-5 w-32 rounded skeleton-shimmer" />
        <div className="h-9 w-36 rounded-full skeleton-shimmer" />
      </div>

      <div className="space-y-3">
        {cards.map((_, idx) => (
          <article
            key={idx}
            className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-16 rounded skeleton-shimmer" />
                <div className="h-4 w-14 rounded-full skeleton-shimmer" />
              </div>

              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full skeleton-shimmer" />
                <div className="h-7 w-7 rounded-full skeleton-shimmer" />
              </div>
            </div>

            <div className="mt-3 space-y-1.5 text-xs">
              <div className="h-3 w-32 rounded skeleton-shimmer" />
              <div className="h-3 w-56 rounded skeleton-shimmer" />
              <div className="h-3 w-40 rounded skeleton-shimmer" />
              <div className="mt-1 h-3 w-28 rounded skeleton-shimmer" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default React.memo(SavedAddressesSkeleton);
