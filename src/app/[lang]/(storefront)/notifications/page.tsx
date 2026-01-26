import Container from "@/src/components/Container/Container";
import { Notifications } from "@/src/components/Notifications/Notifications";
import type { NotificationItemProps } from "@/src/components/Notifications/NotificationItem/NotificationItem";
import { Metadata } from "next";

import {
  getNotificationsServer,
  getUnreadCountServer,
} from "@/src/services/notifications.service";
import { mapBackendToItem } from "@/src/lib/notifications/mapToUi";

export const metadata: Metadata = {
  title: "WDI - Notifications",
  description: "Access Your latest notifcations here!",
};

export default async function NotificationsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const LIMIT = 20;

  const [listRes, countRes] = await Promise.all([
    getNotificationsServer({ unread_only: false, limit: LIMIT, offset: 0 }),
    getUnreadCountServer(),
  ]);

  const raw = listRes.data?.notifications ?? listRes.data?.items ?? [];

  const mapped = raw
    .map((x) =>
      typeof x === "object" && x
        ? mapBackendToItem(x as Record<string, unknown>, lang)
        : null,
    )
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const initialNotifications: NotificationItemProps[] = mapped.map(
    ({ _idNum, _isRead, ...ui }) => ui,
  );

  const initialUnreadCount =
    countRes.data?.unread_count ?? countRes.data?.count ?? 0;

  const initialTotal = listRes.data?.total ?? listRes.data?.count ?? undefined;

  return (
    <section className="py-10">
      <Container>
        <Notifications
          initialNotifications={initialNotifications}
          initialUnreadCount={initialUnreadCount}
          initialOffset={0}
          limit={LIMIT}
          initialUnreadOnly={false}
          initialTotal={
            typeof initialTotal === "number" ? initialTotal : undefined
          }
        />
      </Container>
    </section>
  );
}
