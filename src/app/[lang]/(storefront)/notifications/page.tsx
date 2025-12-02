import Container from "@/src/components/Container/Container";
import { NotificationItemProps } from "@/src/components/Notifications/NotificationItem/NotificationItem";
import { Notifications } from "@/src/components/Notifications/Notifications";
import { Metadata } from "next";

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
    <section className="py-10">
      <Container>
        <Notifications notifications={MOCK_NOTIFICATIONS || []} />
      </Container>
    </section>
  );
}
