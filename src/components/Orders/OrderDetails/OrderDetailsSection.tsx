"use client";

import dynamic from "next/dynamic";
import OrderDetailsSkeleton from "./OrderDetailsSkeleton";
import { OrderDetailsInterface } from "./OrderDetails";

const OrderDetails = dynamic(
  () => import("./OrderDetails").then((mod) => mod.OrderDetails),
  {
    loading: () => <OrderDetailsSkeleton />,
    ssr: false,
  }
);

export default function OrderDetailsSection({
  order,
}: {
  order: OrderDetailsInterface;
}) {
  return <OrderDetails order={order} />;
}
