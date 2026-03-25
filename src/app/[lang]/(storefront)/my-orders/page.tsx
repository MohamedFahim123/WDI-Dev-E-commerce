import Container from "@/src/components/Container/Container";
import MyOrders from "@/src/features/orders/components/Orders/MyOrders";
import { type Order } from "@/src/features/orders/components/Orders/OrdersSection";

import { PageHeader } from "@/src/components/PageHeader/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders",
  description: "View and manage all your orders.",
};

interface MyOrdersPageProps {
  params: Promise<{ lang: string }>;
}

export default async function MyOrdersPage({ params }: MyOrdersPageProps) {
  const { lang } = (await params) ?? { lang: "en" };

  const orders: Order[] = [
    {
      id: "124589",
      dateLabel: "31 Oct 2025",
      dateISO: "2025-10-31",
      total: 99.99,
      currency: "AED",
      status: "completed",
      items: [{ id: "1" }, { id: "2" }, { id: "3" }],
    },
    {
      id: "124590",
      dateLabel: "31 Oct 2025",
      dateISO: "2025-10-31",
      total: 99.99,
      currency: "AED",
      status: "active",
      items: [{ id: "1" }, { id: "2" }, { id: "3" }],
    },
    {
      id: "124591",
      dateLabel: "31 Oct 2025",
      dateISO: "2025-10-31",
      total: 99.99,
      currency: "AED",
      status: "completed",
      items: [{ id: "1" }, { id: "2" }, { id: "3" }],
    },
    {
      id: "124592",
      dateLabel: "31 Oct 2025",
      dateISO: "2025-10-31",
      total: 99.99,
      currency: "AED",
      status: "returned",
      items: [{ id: "1" }, { id: "2" }, { id: "3" }],
    },
  ];

  return (
    <section className="py-8 sm:py-10">
      <PageHeader
        title="My Orders"
        breadcrumb={[
          { label: "Home", href: `/${lang}` },
          { label: "My Orders" },
        ]}
      />
      <Container>
        <MyOrders orders={orders} />
      </Container>
    </section>
  );
}

