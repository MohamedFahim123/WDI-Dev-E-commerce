"use client";

import { useRouteLang } from "@/src/hooks/useLang";
import { useMemo, useState } from "react";
import Container from "../Container/Container";
import { PageHeader } from "../PageHeader/PageHeader";
import {
  NotificationItem,
  NotificationItemProps,
} from "./NotificationItem/NotificationItem";
import { NotificationListSkeleton } from "./NotificationListSkeleton/NotificationListSkeleton";
import NotificationsEmptyState from "./NotificationsEmptyState/NotificationsEmptyState";
import { NotificationsSearchInput } from "./NotificationsSearchInput/NotificationsSearchInput";

interface NotificationsContentProps {
  notifications: NotificationItemProps[];
  isLoading?: boolean;
}

export function Notifications({
  notifications,
  isLoading = false,
}: NotificationsContentProps) {
  const lang = useRouteLang();
  const [query, setQuery] = useState("");

  const filteredNotifications = useMemo(
    () =>
      notifications.filter((n) =>
        n.title.toLowerCase().includes(query.toLowerCase())
      ),
    [notifications, query]
  );

  const hasNotifications = filteredNotifications.length > 0;

  return (
    <section className="w-full bg-white">
      <PageHeader
        title="Notifications"
        breadcrumb={[
          { label: "Home", href: `/${lang}` },
          { label: "Notifications" },
        ]}
        rightSlot={
          <NotificationsSearchInput value={query} onChange={setQuery} />
        }
      />

      <Container className="pb-10 pt-4">
        {isLoading ? (
          <NotificationListSkeleton length={4} />
        ) : hasNotifications ? (
          <ul className="space-y-2" role="list">
            {filteredNotifications.map((notification) => (
              <NotificationItem key={notification.id} {...notification} />
            ))}
          </ul>
        ) : (
          <NotificationsEmptyState />
        )}
      </Container>
    </section>
  );
}
