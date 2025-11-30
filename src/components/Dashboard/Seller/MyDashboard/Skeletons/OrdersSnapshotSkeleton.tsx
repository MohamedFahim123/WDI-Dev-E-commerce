import React from "react";

function OrdersSnapshotSkeleton() {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="h-5 w-48 skeleton-shimmer rounded mb-4" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {new Array(4).fill(0).map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-lg border p-4 skeleton-shimmer"
          />
        ))}
      </div>
    </div>
  );
}
export default React.memo(OrdersSnapshotSkeleton);
