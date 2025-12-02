import Container from "@/src/components/Container/Container";
import {
  NotificationItem,
  NotificationItemProps,
} from "@/src/components/Notifications/NotificationItem/NotificationItem";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - Dashboard Notifications",
};

export default async function NotificationsDashboardPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const MOCK_NOTIFICATIONS: NotificationItemProps[] = [
    {
      id: "1",
      title: "Your order #1234 has been shipped",
      timeLabel: "10m ago",
      iconSrc: "/assets/products/prod7.webp",
      iconAlt: "Headphones order",
      ctaLabel: "View Order",
      ctaHref: `/${lang}/my-orders/1234`,
    },
    {
      id: "2",
      title: "Your order #1234 has been shipped",
      timeLabel: "11m ago",
      iconSrc: "/assets/products/prod7.webp",
      iconAlt: "Headphones order",
      ctaLabel: "View Order",
      ctaHref: `/${lang}/my-orders/1234`,
    },
    {
      id: "3",
      title: "Your order #1234 has been shipped",
      timeLabel: "12m ago",
      iconSrc: "/assets/products/prod7.webp",
      iconAlt: "Headphones order",
      ctaLabel: "View Order",
      ctaHref: `/${lang}/my-orders/1234`,
    },
  ];

  return (
    <section className="p-4 bg-white">
      <h1>Notifications</h1>
      <div className="pt-4 ">
        <ul className="space-y-2" role="list">
          {MOCK_NOTIFICATIONS.map((notification) => (
            <NotificationItem key={notification.id} {...notification} />
          ))}
        </ul>
      </div>
    </section>
  );
}
