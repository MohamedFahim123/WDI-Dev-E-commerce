import React from "react";
import { Skeleton } from "@/src/components/ui/skeleton";

type Props = {
  variant?: "guest" | "auth";
  showMenu?: boolean;
};

function AuthMenuSkeleton({ variant = "guest", showMenu = true }: Props) {
  return (
    <div className="relative" aria-busy="true" aria-label="Loading auth menu">
      {variant === "auth" ? (
        <div className="flex items-center justify-center rounded-full border border-[#E4E4E7] bg-white p-1.5 sm:px-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="ml-2 hidden h-3 w-16 sm:block" />
        </div>
      ) : (
        <div className="relative flex items-center justify-center rounded-sm border border-[#7C3BED] bg-[#7C3BED] px-1.5 py-1 sm:px-3">
          <Skeleton className="h-4 w-4 rounded-sm bg-white/40" />
          {/* label */}
          <Skeleton className="ml-2 hidden h-3 w-20 rounded-sm bg-white/40 sm:block" />
        </div>
      )}

      {showMenu && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border border-[#ddd] rounded z-50 py-1">
          <div className="px-3 py-2">
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="px-3 py-2">
            <Skeleton className="h-3 w-24" />
          </div>
          <div className="px-3 py-2">
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(AuthMenuSkeleton);
