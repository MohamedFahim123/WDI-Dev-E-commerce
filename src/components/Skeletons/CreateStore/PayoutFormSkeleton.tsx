import React from "react";

function PayoutFormSkeleton() {
  return (
    <form className="space-y-6">
      <div className="space-y-4">
        <div className="h-6 w-56 skeleton-shimmer rounded" />
        <div className="h-3 w-96 skeleton-shimmer rounded" />
      </div>

      <div className="space-y-4">
        <div>
          <div className="h-3 w-48 skeleton-shimmer rounded mb-2" />
          <div className="h-11 w-full rounded-lg skeleton-shimmer" />
          <p className="h-3 w-60 mt-2 skeleton-shimmer rounded" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="h-3 w-32 skeleton-shimmer rounded mb-2" />
            <div className="h-11 w-full rounded-lg skeleton-shimmer" />
          </div>
          <div>
            <div className="h-3 w-32 skeleton-shimmer rounded mb-2" />
            <div className="h-11 w-full rounded-lg skeleton-shimmer" />
          </div>
        </div>

        <div>
          <div className="h-3 w-48 skeleton-shimmer rounded mb-2" />
          <div className="h-11 w-full rounded-lg skeleton-shimmer" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="h-3 w-36 skeleton-shimmer rounded mb-2" />
            <div className="h-11 w-full rounded-lg skeleton-shimmer" />
          </div>
          <div>
            <div className="h-3 w-36 skeleton-shimmer rounded mb-2" />
            <div className="h-11 w-full rounded-lg skeleton-shimmer" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="h-10 w-24 rounded-md skeleton-shimmer" />
        <div className="h-11 w-32 rounded-md skeleton-shimmer" />
      </div>
    </form>
  );
}
export default React.memo(PayoutFormSkeleton);
