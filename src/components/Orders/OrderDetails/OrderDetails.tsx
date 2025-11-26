"use client";

import OrderItemsCard from "../../Order-Placed-Successfully/OrderItemsCard/OrderItemsCard";
import OrderSummaryCard from "../../Order-Placed-Successfully/OrderSummaryCard/OrderSummaryCard";
import OrderTrackingCard from "../../Order-Placed-Successfully/OrderTrackingCard/OrderTrackingCard";
import ShippingAddressCard from "../../Order-Placed-Successfully/ShippingAddressCard/ShippingAddressCard";

export type OrderTrackingStatus = "done" | "current" | "pending";

export interface OrderTrackingStep {
  label: string;
  date?: string;
  status: OrderTrackingStatus;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  vat: number;
  discount: number;
  total: number;
  currency: string;
  payment: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderShippingAddress {
  name: string;
  address: string;
  city: string;
  phone: string;
}

export interface OrderDetailsInterface {
  id: string;
  tracking: OrderTrackingStep[];
  courier: string;
  trackingNumber: string;
  summary: OrderSummary;
  items: OrderItem[];
  shipping: OrderShippingAddress;
}

export interface OrderDetailsProps {
  order: OrderDetailsInterface;
}
export function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2.1fr)_minmax(260px,0.9fr)]">
        <OrderTrackingCard
          tracking={order.tracking}
          courier={order.courier}
          trackingNumber={order.trackingNumber}
        />
        <OrderSummaryCard summary={order.summary} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <OrderItemsCard items={order.items} currency={order.summary.currency} />
        <ShippingAddressCard shipping={order.shipping} />
      </div>
    </div>
  );
}
