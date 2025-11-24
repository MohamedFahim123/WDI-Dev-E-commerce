import React from "react";

function NotificationItemSkeleton() {
  return (
    <li>
      <article className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#E4E4E7]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg skeleton-shimmer" />

          <div className="space-y-2">
            <div className="h-4 w-56 rounded skeleton-shimmer" />
            <div className="h-3 w-24 rounded skeleton-shimmer" />
          </div>
        </div>

        <div className="ml-4 h-3 w-12 rounded skeleton-shimmer" />
      </article>
    </li>
  );
}

export default React.memo(NotificationItemSkeleton);
