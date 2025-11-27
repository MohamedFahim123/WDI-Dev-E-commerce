"use client";

import React from "react";

function LoyaltyProgramSkeleton() {
  const earnCards = Array.from({ length: 4 });
  const rewardCards = Array.from({ length: 4 });

  return (
    <section className="space-y-4 animate-pulse">
      <div className="h-6 w-40 rounded skeleton-shimmer" />

      <article className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-4 shadow-sm space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full skeleton-shimmer" />
            <div className="space-y-2">
              <div className="h-4 w-28 rounded skeleton-shimmer" />
              <div className="h-3 w-44 rounded skeleton-shimmer" />
            </div>
          </div>
          <div className="space-y-1 text-right">
            <div className="h-6 w-16 rounded skeleton-shimmer" />
            <div className="h-3 w-20 rounded skeleton-shimmer" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="h-3 w-32 rounded skeleton-shimmer" />
          <div className="h-2.5 w-full rounded-full skeleton-shimmer" />
        </div>
      </article>

      <article className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-4 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-full skeleton-shimmer" />
          <div className="h-4 w-32 rounded skeleton-shimmer" />
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {earnCards.map((_, idx) => (
            <div key={idx} className="flex gap-3">
              <div className="h-7 w-7 rounded-full skeleton-shimmer" />
              <div className="space-y-1 flex-1">
                <div className="h-3 w-28 rounded skeleton-shimmer" />
                <div className="h-3 w-40 rounded skeleton-shimmer" />
              </div>
            </div>
          ))}
        </div>
      </article>

      <section className="space-y-3">
        <div className="h-4 w-40 rounded skeleton-shimmer" />
        <div className="grid gap-3 md:grid-cols-2">
          {rewardCards.map((_, idx) => (
            <article
              key={idx}
              className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 shadow-sm space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="h-4 w-32 rounded skeleton-shimmer" />
                  <div className="h-3 w-40 rounded skeleton-shimmer" />
                </div>
                <div className="h-6 w-6 rounded-full skeleton-shimmer" />
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="h-3 w-24 rounded skeleton-shimmer" />
                <div className="h-9 w-28 rounded-full skeleton-shimmer" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

export default React.memo(LoyaltyProgramSkeleton);
