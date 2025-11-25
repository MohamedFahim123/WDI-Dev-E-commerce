
import React from "react";

const AddressStepSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl border border-[#f1f1f3] bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 pb-4 pt-4">
        <div className="h-4 w-32 rounded skeleton-shimmer" />
        <div className="h-9 w-32 rounded-full skeleton-shimmer" />
      </div>

      <div className="space-y-3 px-4 pb-5">
        <div className="rounded-2xl border border-[#f3f4f6] bg-white p-4">
          <div className="flex gap-3">
            <div className="mt-1 h-4 w-4 rounded-full skeleton-shimmer" />
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-14 rounded skeleton-shimmer" />
                <div className="h-3 w-10 rounded-full skeleton-shimmer" />
              </div>
              <div className="h-3 w-24 rounded skeleton-shimmer" />
              <div className="h-3 w-32 rounded skeleton-shimmer" />
              <div className="h-3 w-40 rounded skeleton-shimmer" />
            </div>
            <div className="h-3 w-10 rounded skeleton-shimmer" />
          </div>
        </div>

        <div className="rounded-2xl border border-[#f3f4f6] bg-white p-4">
          <div className="flex gap-3">
            <div className="mt-1 h-4 w-4 rounded-full skeleton-shimmer" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-14 rounded skeleton-shimmer" />
              <div className="h-3 w-24 rounded skeleton-shimmer" />
              <div className="h-3 w-32 rounded skeleton-shimmer" />
            </div>
            <div className="h-3 w-10 rounded skeleton-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AddressStepSkeleton);
