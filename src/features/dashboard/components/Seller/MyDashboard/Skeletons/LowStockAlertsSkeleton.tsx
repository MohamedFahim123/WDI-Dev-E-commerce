import React from "react";

function LowStockAlertsSkeleton() {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="h-5 w-40 skeleton-shimmer rounded mb-3" />
      <div className="space-y-3">
        {new Array(2).fill(0).map((_, i) => (
          <div
            key={i}
            className="h-16 rounded-md border bg-amber-50 p-3 skeleton-shimmer"
          />
        ))}
      </div>
    </div>
  );
}
export default React.memo(LowStockAlertsSkeleton);
