import React from "react";

function StepperSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="mt-6">
        <div className="h-2 w-full bg-[#F3F3F4] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#e6e6e6] skeleton-shimmer"
            style={{ width: "20%" }}
          />
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          {new Array(4).fill(null).map((_, i) => (
            <div key={i} className="flex-1 min-w-0 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold skeleton-shimmer" />
              <div className="hidden sm:block h-3 w-24 skeleton-shimmer rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default React.memo(StepperSkeleton);
