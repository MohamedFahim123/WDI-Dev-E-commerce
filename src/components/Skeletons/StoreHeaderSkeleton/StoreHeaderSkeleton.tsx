import { cn } from "@/src/lib/utils";
import { Skeleton } from "../../ui/skeleton";
import React from "react";

function StoreHeaderSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading store information"
      className="w-full"
    >
      <div className="mb-2 h-3 w-24 rounded bg-muted" />
      <div className="mb-4 h-7 w-32 rounded bg-muted" />

      <div className="relative overflow-hidden rounded-md border bg-card">
        <div className="h-28 w-full bg-muted" />

        <div className="px-4 pb-4 pt-3 sm:px-6 sm:pt-4">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="-mt-12 h-20 w-20 rounded-full border-4 border-background" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>

            <Skeleton className="h-9 w-32 rounded-full" />
          </div>
        </div>

        <div className="border-t bg-background px-4 py-3 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-3",
                  i !== 0 && "sm:border-l sm:border-border sm:pl-6"
                )}
              >
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(StoreHeaderSkeleton);
