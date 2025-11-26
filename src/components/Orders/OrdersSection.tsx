"use client";

import { useRouteLang } from "@/src/hooks/useLang";
import { useMemo, useState } from "react";
import { OrderCard } from "./OrderCard/OrderCard";
import {
  OrderStatusFilter,
  FilterOption,
} from "./OrderStatusFilter/OrderStatusFilter";

export type OrderStatus = "active" | "completed" | "cancelled" | "returned";

export interface Order {
  id: string;
  dateLabel: string;
  dateISO: string;
  total: number;
  currency: string;
  status: OrderStatus;
  items: { id: string }[];
}

const ORDER_FILTERS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "returned", label: "Returned" },
] satisfies FilterOption[];

type OrderFilter = (typeof ORDER_FILTERS)[number]["value"];

interface OrdersSectionProps {
  orders: Order[];
}

export function OrdersSection({ orders }: OrdersSectionProps) {
  const lang = useRouteLang();
  const [filter, setFilter] = useState<OrderFilter>("all");

  const filteredOrders = useMemo(
    () =>
      filter === "all"
        ? orders
        : orders.filter((order) => order.status === filter),
    [orders, filter]
  );

  return (
    <div aria-labelledby="my-orders-section-heading" className="pt-4">
      <OrderStatusFilter
        options={ORDER_FILTERS}
        value={filter}
        onChange={(val) => setFilter(val as OrderFilter)}
      />

      <h2
        id="my-orders-section-heading"
        className="mb-4 text-base font-semibold text-foreground sm:text-lg"
      >
        My Orders
      </h2>

      {filteredOrders.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          You don&apos;t have any orders in this state.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} lang={lang} />
          ))}
        </div>
      )}
    </div>
  );
}
