import React from "react";

function BuyerSidebarSkeleton() {
  const navItems = Array.from({ length: 8 });

  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm animate-pulse">
      <div className="flex flex-col items-center gap-2 pb-4">
        <div className="h-16 w-16 rounded-full skeleton-shimmer" />
        <div className="space-y-1 text-center">
          <div className="mx-auto h-3 w-28 rounded skeleton-shimmer" />
          <div className="mx-auto h-3 w-40 rounded skeleton-shimmer" />
          <div className="mx-auto mt-1 h-3 w-32 rounded skeleton-shimmer" />
        </div>
      </div>

      <div className="my-3 h-px w-full bg-[#E5E7EB]" />

      <nav className="flex-1 space-y-1">
        {navItems.map((_, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 rounded-lg px-3 py-2"
          >
            <div className="h-4 w-4 rounded-full skeleton-shimmer" />
            <div className="h-3 w-32 rounded skeleton-shimmer" />
          </div>
        ))}
      </nav>

      <div className="my-3 h-px w-full bg-[#E5E7EB]" />

      <div className="flex items-center gap-2 rounded-lg px-3 py-2">
        <div className="h-4 w-4 rounded-full skeleton-shimmer" />
        <div className="h-3 w-20 rounded skeleton-shimmer" />
      </div>
    </div>
  );
}

export default React.memo(BuyerSidebarSkeleton);
