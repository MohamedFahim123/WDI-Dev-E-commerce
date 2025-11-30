import Panel from "@/src/components/CreaetStore/Common/Panel";
import React from "react";

function StoreInfoFormSkeleton() {
  return (
    <form aria-labelledby="store-info-heading" className="space-y-6">
      <Panel>
        <div className="flex items-start gap-3 p-5 border-b border-[#F1F1F2]">
          <div className="h-9 w-9 flex items-center justify-center">
            <div className="h-6 w-6 skeleton-shimmer rounded" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="h-5 w-48 skeleton-shimmer rounded mb-2" />
            <div className="h-3 w-64 skeleton-shimmer rounded" />
          </div>
        </div>

        <div className="p-5 space-y-5">
          <div>
            <div className="h-3 w-36 skeleton-shimmer rounded mb-2" />
            <div className="h-11 w-full rounded-lg skeleton-shimmer" />
          </div>

          <div>
            <div className="h-3 w-36 skeleton-shimmer rounded mb-2" />
            <div className="h-11 w-full rounded-lg skeleton-shimmer" />
          </div>

          <div>
            <div className="h-3 w-36 skeleton-shimmer rounded mb-2" />
            <div className="h-11 w-full rounded-lg skeleton-shimmer" />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-[#F1F1F2] flex items-center justify-end">
          <div className="h-11 w-40 rounded-md skeleton-shimmer" />
        </div>
      </Panel>
    </form>
  );
}
export default React.memo(StoreInfoFormSkeleton);
