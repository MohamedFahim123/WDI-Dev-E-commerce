import React from "react";

const ReviewStepSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl border border-[#f1f1f3] bg-white shadow-sm">
      <div className="px-4 pb-4 pt-4">
        <div className="h-4 w-40 rounded skeleton-shimmer" />
      </div>

      <div className="px-4 pb-5">
        <div className="space-y-2">
          <div className="h-3 w-40 rounded skeleton-shimmer" />
          <div className="h-24 w-full rounded-2xl skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
};

export default React.memo(ReviewStepSkeleton);
