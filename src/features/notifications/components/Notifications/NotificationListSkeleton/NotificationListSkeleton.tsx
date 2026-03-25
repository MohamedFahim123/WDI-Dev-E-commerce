import NotificationItemSkeleton from "@/src/components/Skeletons/NotificationItemSkeleton/NotificationItemSkeleton";

interface NotificationListSkeletonProps {
  length?: number;
}

export function NotificationListSkeleton({
  length = 4,
}: NotificationListSkeletonProps) {
  return (
    <ul
      className="space-y-2"
      role="list"
      aria-busy="true"
      aria-label="Loading notifications"
    >
      {Array.from({ length }).map((_, i) => (
        <NotificationItemSkeleton key={i} />
      ))}
    </ul>
  );
}

