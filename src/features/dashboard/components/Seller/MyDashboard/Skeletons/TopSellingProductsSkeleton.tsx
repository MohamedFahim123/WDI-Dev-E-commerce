import React from "react";

function TopSellingProductsSkeleton() {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="h-5 w-48 skeleton-shimmer rounded mb-4" />
      <div className="space-y-4">
        {new Array(3).fill(0).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="h-4 w-36 skeleton-shimmer rounded" />
              <div className="h-3 w-20 skeleton-shimmer rounded" />
            </div>
            <div className="h-4 w-20 skeleton-shimmer rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
export default React.memo(TopSellingProductsSkeleton);
