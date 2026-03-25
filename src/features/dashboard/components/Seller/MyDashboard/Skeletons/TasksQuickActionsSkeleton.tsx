import React from "react";

function TasksQuickActionsSkeleton() {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="h-5 w-48 skeleton-shimmer rounded" />
        <div className="h-9 w-28 skeleton-shimmer rounded" />
      </div>

      <div className="mt-4 space-y-3">
        {new Array(3).fill(0).map((_, i) => (
          <div key={i} className="h-12 rounded-md skeleton-shimmer" />
        ))}
      </div>
    </div>
  );
}
export default React.memo(TasksQuickActionsSkeleton);
