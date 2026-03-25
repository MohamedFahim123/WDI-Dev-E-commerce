import React from "react";

function SalesPerformanceSkeleton() {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="h-5 w-40 skeleton-shimmer rounded" />
        <div className="h-7 w-24 skeleton-shimmer rounded" />
      </div>

      <div className="mt-4">
        <div className="w-full h-32 skeleton-shimmer rounded" />
        <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-2">
          {new Array(7).fill(0).map((_, i) => (
            <div key={i} className="min-w-[90px] text-center">
              <div className="inline-block px-2 py-1 bg-slate-100 rounded-full skeleton-shimmer h-6 w-24" />
              <div className="mt-2 h-3 w-10 skeleton-shimmer rounded mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default React.memo(SalesPerformanceSkeleton);
