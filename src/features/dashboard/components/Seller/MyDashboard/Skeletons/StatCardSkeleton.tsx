import React from "react";

function StatCardSkeleton() {
  return (
    <div className="rounded-xl border p-4 bg-white shadow-sm flex flex-col justify-between">
      <div className="h-3 w-24 skeleton-shimmer rounded" />
      <div className="mt-4 flex items-end justify-between gap-4">
        <div className="h-6 w-32 skeleton-shimmer rounded" />
        <div className="h-4 w-20 skeleton-shimmer rounded" />
      </div>
    </div>
  );
}
export default React.memo(StatCardSkeleton);
