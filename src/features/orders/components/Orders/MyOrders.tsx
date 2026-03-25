"use client";
import dynamic from "next/dynamic";
import MyOrdersSkeleton from "./MyOrdersSkeleton";
import { Order } from "./OrdersSection";

const OrdersSection = dynamic(
  () => import("./OrdersSection").then((mod) => mod.OrdersSection),
  {
    loading: () => <MyOrdersSkeleton />,
    ssr: false,
  }
);
export default function MyOrders({ orders }: { orders: Order[] }) {
  return <OrdersSection orders={orders} />;
}
