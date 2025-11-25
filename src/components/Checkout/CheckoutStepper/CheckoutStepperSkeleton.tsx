
import React from "react";

const CheckoutStepperSkeleton: React.FC = () => {
  return (
    <div className="flex items-center gap-4 text-sm">
      {[1, 2, 3, 4].map((id, index) => (
        <React.Fragment key={id}>
          {index > 0 && (
            <div className="h-[2px] flex-1 rounded-full skeleton-shimmer" />
          )}
          <div className="flex flex-col items-start gap-1">
            <div className="h-7 w-7 rounded-full skeleton-shimmer" />
            <div className="h-3 w-12 rounded skeleton-shimmer" />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default React.memo(CheckoutStepperSkeleton);
