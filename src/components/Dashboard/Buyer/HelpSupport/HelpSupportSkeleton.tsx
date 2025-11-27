"use client";

import React from "react";

function HelpSupportSkeleton() {
  return (
    <section className="space-y-6 animate-pulse">
      <div className="h-5 w-40 rounded skeleton-shimmer" />

      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, idx) => (
          <article
            key={idx}
            className="flex flex-col items-center rounded-2xl border border-[#E5E7EB] bg-white px-4 py-5 text-center shadow-sm space-y-3"
          >
            <div className="h-10 w-10 rounded-full skeleton-shimmer" />
            <div className="h-4 w-24 rounded skeleton-shimmer" />
            <div className="h-3 w-32 rounded skeleton-shimmer" />
            <div className="mt-2 h-8 w-24 rounded-full skeleton-shimmer" />
          </article>
        ))}
      </div>

      <article className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 shadow-sm space-y-3">
        <div className="h-4 w-28 rounded skeleton-shimmer" />
        <div className="grid gap-x-10 gap-y-2 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="h-4 w-4 rounded skeleton-shimmer" />
              <div className="h-3 w-40 rounded skeleton-shimmer" />
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full skeleton-shimmer" />
          <div className="h-4 w-48 rounded skeleton-shimmer" />
        </div>

        <div className="space-y-2 pt-1">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-4 py-2 border-b border-[#F3F4F6] last:border-b-0"
            >
              <div className="h-3 w-48 rounded skeleton-shimmer" />
              <div className="h-4 w-4 rounded-full skeleton-shimmer" />
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

export default React.memo(HelpSupportSkeleton);
