import { BellDot } from "lucide-react";
import React from "react";

function NotificationsEmptyState() {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E4E4E7]">
        <BellDot className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
      </div>

      <p className="text-base font-semibold text-foreground">
        No new notifications.
      </p>
      <p className="mt-1 max-w-md text-xs text-muted-foreground">
        Stay tuned for updates on your orders, offers, and account activity.
      </p>
    </div>
  );
}
export default React.memo(NotificationsEmptyState);
