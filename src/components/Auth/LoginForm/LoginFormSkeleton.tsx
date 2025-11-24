import React from "react";

function LoginFormSkeleton() {
  return (
    <div
      className="flex flex-col gap-5"
      aria-busy="true"
      aria-label="Loading sign-in form"
    >
      <div className="space-y-2 text-center">
        <div className="mx-auto h-5 w-40 rounded skeleton-shimmer" />
        <div className="mx-auto h-3 w-52 rounded skeleton-shimmer" />
      </div>

      <div className="space-y-1.5">
        <div className="h-3 w-24 rounded skeleton-shimmer" />
        <div className="h-11 w-full rounded-lg skeleton-shimmer" />
      </div>

      <div className="space-y-1.5">
        <div className="h-3 w-24 rounded skeleton-shimmer" />
        <div className="h-11 w-full rounded-lg skeleton-shimmer" />
      </div>

      <div className="space-y-1.5">
        <div className="h-3 w-20 rounded skeleton-shimmer" />
        <div className="h-11 w-full rounded-lg skeleton-shimmer" />
      </div>

      <div className="ml-auto h-3 w-24 rounded skeleton-shimmer" />

      <div className="h-11 w-full rounded-full skeleton-shimmer" />

      <div className="flex items-center justify-center gap-2">
        <div className="h-px flex-1 rounded-full skeleton-shimmer" />
        <div className="h-3 w-40 rounded skeleton-shimmer" />
        <div className="h-px flex-1 rounded-full skeleton-shimmer" />
      </div>

      <div className="h-11 w-full rounded-full skeleton-shimmer" />

      <div className="mx-auto mt-2 flex items-center gap-2">
        <div className="h-4 w-4 rounded-full skeleton-shimmer" />
        <div className="h-3 w-24 rounded skeleton-shimmer" />
      </div>
    </div>
  );
}

export default React.memo(LoginFormSkeleton);
