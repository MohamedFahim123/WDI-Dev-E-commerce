import Container from "@/src/components/Container/Container";
import { OrderDetailsInterface } from "@/src/components/Orders/OrderDetails/OrderDetails";
import OrderDetailsSection from "@/src/components/Orders/OrderDetails/OrderDetailsSection";
import { PageHeader } from "@/src/components/PageHeader/PageHeader";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ lang: string; orderId: string }>;
};

export default async function OrderDetailsPage({ params }: Props) {
  const { lang, orderId } = await params;

  const order: OrderDetailsInterface = {
    id: orderId,
    tracking: [
      { label: "Order Confirmed", date: "Mar 15, 10:30 AM", status: "done" },
      { label: "Packed", date: "Mar 15, 2:15 PM", status: "done" },
      { label: "Shipped", date: "Mar 16, 9:00 AM", status: "current" },
      { label: "Out For Delivery", status: "pending" },
      { label: "Delivered", status: "pending" },
    ],
    courier: "Aramex",
    trackingNumber: "ARX123456789",
    summary: {
      subtotal: 1199.97,
      shipping: 0,
      vat: 129.99,
      discount: 0,
      total: 1329.96,
      currency: "AED",
      payment: "Visa •••• 4242",
    },
    items: [
      {
        id: "1",
        name: "Premium Wireless Headphones",
        price: 290.99,
        quantity: 1,
        image: "/assets/products/prod6.webp",
      },
      {
        id: "2",
        name: "Smart Watch Series 7",
        price: 899.03,
        quantity: 2,
        image: "/assets/products/prod7.webp",
      },
    ],
    shipping: {
      name: "Ahmed Al Mansoori",
      address: "Sheikh Zayed Road, Building 42",
      city: "Dubai, UAE",
      phone: "+971 50 123 4567",
    },
  };

  return (
    <section className="py-8 sm:py-10">
      <PageHeader
        title={`Order #${order.id}`}
        breadcrumb={[
          { label: "Home", href: `/${lang}` },
          { label: "Order Details" },
        ]}
      />
      <Container>
        <OrderDetailsSection order={order} />
      </Container>
    </section>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { orderId } = await params;

  return {
    title: `Order #${orderId} - Order Details`,
    description: `View tracking, items, summary and shipping details for order #${orderId}.`,
  };
}
