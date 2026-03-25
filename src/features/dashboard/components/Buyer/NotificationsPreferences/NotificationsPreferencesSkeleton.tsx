"use client";

import React from "react";

function NotificationsPreferencesSkeleton() {
  const toggleRows = Array.from({ length: 4 });

  return (
    <section className="space-y-6 animate-pulse">
      <div className="h-5 w-48 rounded skeleton-shimmer" />

      <article className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full skeleton-shimmer" />
          <div className="h-4 w-32 rounded skeleton-shimmer" />
        </div>

        <div className="space-y-3 pt-1">
          {toggleRows.map((_, idx) => (
            <div key={idx} className="flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="h-3 w-28 rounded skeleton-shimmer" />
                <div className="h-3 w-44 rounded skeleton-shimmer" />
              </div>
              <div className="h-5 w-9 rounded-full skeleton-shimmer" />
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full skeleton-shimmer" />
          <div className="h-4 w-32 rounded skeleton-shimmer" />
        </div>

        <div className="space-y-3 pt-1">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="h-3 w-32 rounded skeleton-shimmer" />
                <div className="h-3 w-48 rounded skeleton-shimmer" />
              </div>
              <div className="h-5 w-9 rounded-full skeleton-shimmer" />
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full skeleton-shimmer" />
          <div className="h-4 w-40 rounded skeleton-shimmer" />
        </div>

        <div className="space-y-3 pt-1">
          <div className="space-y-1">
            <div className="h-3 w-28 rounded skeleton-shimmer" />
            <div className="h-9 w-full rounded-lg skeleton-shimmer" />
          </div>
          <div className="space-y-1">
            <div className="h-3 w-20 rounded skeleton-shimmer" />
            <div className="h-9 w-full rounded-lg skeleton-shimmer" />
          </div>
        </div>
      </article>
    </section>
  );
}

export default React.memo(NotificationsPreferencesSkeleton);
