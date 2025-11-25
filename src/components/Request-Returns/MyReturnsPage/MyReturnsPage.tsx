"use client";

import { PageHeader } from "@/src/components/PageHeader/PageHeader";
import Container from "@/src/components/Container/Container";
import MyReturnedCard from "../MyReturnedCard/MyReturnedCard";
import { MY_RETURN_ORDERS } from "../MyReturnsData";
import { useRouteLang } from "@/src/hooks/useLang";

export default function MyReturnsPage() {
  const lang = useRouteLang();
  const breadcrumb = [
    { label: "Home", href: `/${lang}` },
    { label: "Request-Return", href: `/${lang}/request-return` },
    { label: "My Returns" },
  ];

  return (
    <div className="min-h-screen py-8 sm:py-10">
      <PageHeader title="My Returns" breadcrumb={breadcrumb} rightSlot={null} />

      <section className="py-4">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {MY_RETURN_ORDERS.map((order) => (
              <MyReturnedCard key={order.id} order={order} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
