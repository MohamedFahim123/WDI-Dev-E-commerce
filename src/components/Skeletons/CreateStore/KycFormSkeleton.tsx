import React from "react";
import Panel from "@/src/features/store-creation/components/CreaetStore/Common/Panel";

function KycFormSkeleton() {
  return (
    <form aria-labelledby="kyc-heading" className="space-y-6">
      <Panel>
        <div className="flex items-start gap-3 p-5 border-b border-[#F1F1F2]">
          <div className="h-9 w-9 flex items-center justify-center">
            <div className="h-6 w-6 skeleton-shimmer rounded" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="h-5 w-40 skeleton-shimmer rounded mb-2" />
          </div>
        </div>

        <div className="p-5 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-44 skeleton-shimmer rounded" />
            <div className="h-9 w-36 skeleton-shimmer rounded" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="h-3 w-28 skeleton-shimmer rounded mb-2" />
              <div className="h-11 w-full rounded-lg skeleton-shimmer" />
            </div>
            <div>
              <div className="h-3 w-28 skeleton-shimmer rounded mb-2" />
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="h-3 w-24 skeleton-shimmer rounded mb-2" />
              <div className="h-11 w-full rounded-lg skeleton-shimmer" />
            </div>
            <div>
              <div className="h-3 w-24 skeleton-shimmer rounded mb-2" />
              <div className="h-11 w-full rounded-lg skeleton-shimmer" />
            </div>
          </div>

          <div>
            <div className="text-sm font-medium mb-3">Document Uploads</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {new Array(4).fill(null).map((_, i) => (
                <div
                  key={i}
                  className="h-28 rounded-md border border-[#E4E4E7] skeleton-shimmer"
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="h-4 w-3/4 skeleton-shimmer rounded" />
            <div className="h-4 w-2/3 skeleton-shimmer rounded" />
            <div className="h-4 w-1/2 skeleton-shimmer rounded" />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-[#F1F1F2]">
          <div className="flex items-center justify-between">
            <div className="h-10 w-24 rounded-md skeleton-shimmer" />
            <div className="h-11 w-32 rounded-md skeleton-shimmer" />
          </div>
        </div>
      </Panel>
    </form>
  );
}
export default React.memo(KycFormSkeleton);

