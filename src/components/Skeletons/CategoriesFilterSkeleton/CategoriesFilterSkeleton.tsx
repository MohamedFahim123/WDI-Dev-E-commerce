import React from "react";

function CategoriesFilterSkeleton({ notHome }: { notHome?: boolean }) {
  const categories = new Array(8).fill(null);

  return (
    <div className="w-full mb-10">
      <div
        className={`
          embla
          border border-black
          rounded-[50px]
          px-4 py-3
          ${notHome ? "" : "mx-auto max-w-fit"}
          cursor-grab
          active:cursor-grabbing
          overFlowHidden
        `}
      >
        <div className="flex xl:gap-4 md:gap-3">
          {categories.map((_, index) => (
            <div
              key={index}
              className="flex-shrink-0 xl:px-4 md:px-2 py-1 rounded-full transition cursor-pointer text-[#707070] bg-white border border-white hover:text-[#BF5910]"
              style={{ minWidth: 100 }}
            >
              <div className="h-4 w-20 skeleton-shimmer rounded mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default React.memo(CategoriesFilterSkeleton);
