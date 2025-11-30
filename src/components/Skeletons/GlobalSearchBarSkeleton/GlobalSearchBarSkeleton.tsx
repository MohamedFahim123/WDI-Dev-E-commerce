import React from "react";

function GlobalSearchBarSkeleton({ isInSideBar }: { isInSideBar?: boolean }) {
  return (
    <div className="flex-1">
      <div className="relative h-10">
        <div
          className={`${
            isInSideBar ? "pl-8" : "pl-16"
          } w-full h-full py-2 rounded-3xl text-sm bg-[#F4F4F5] skeleton-shimmer`}
        />
        <div className="absolute left-0 top-0 h-full px-2 flex items-center justify-center">
          <div
            className={`h-4 ${
              isInSideBar ? "w-4" : "w-5"
            } skeleton-shimmer rounded-full`}
          />
        </div>
      </div>
    </div>
  );
}
export default React.memo(GlobalSearchBarSkeleton);
