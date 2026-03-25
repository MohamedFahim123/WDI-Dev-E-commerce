import React from "react";
import { Plus } from "lucide-react";

function PageHeaderSkeleton({ notButton }: { notButton?: boolean }) {
  return (
    <div className="mb-4 animate-pulse">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="h-5 w-40 rounded bg-gray-200 dark:bg-neutral-700" />
          <div className="mt-2 h-3 w-32 rounded bg-gray-200 dark:bg-neutral-700" />
        </div>
        {!notButton && (
          <div className="hidden sm:block">
            <div className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium border-[1px] border-[#7C3BED] bg-[#7C3BED] text-white">
              <Plus className="h-4 w-4 opacity-0" />
              <span className="h-4 w-20 rounded bg-gray-200 dark:bg-neutral-700" />
            </div>
          </div>
        )}
      </div>

      {!notButton && (
        <div className="mt-3 sm:hidden">
          <div className="w-full inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium border-[1px] border-[#7C3BED] bg-[#7C3BED] text-white">
            <Plus className="h-4 w-4 opacity-0" />
            <span className="h-4 w-full rounded bg-gray-200 dark:bg-neutral-700" />
          </div>
        </div>
      )}
    </div>
  );
}
export default React.memo(PageHeaderSkeleton);
