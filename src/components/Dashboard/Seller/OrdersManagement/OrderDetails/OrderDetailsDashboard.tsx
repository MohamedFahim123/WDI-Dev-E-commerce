"use client";
import CustomerInfoCardSkeleton from "@/src/components/Dashboard/Seller/OrdersManagement/OrderDetails/CustomerInfoCard/CustomerInfoCardSkeleton";
import OrderActionsCardSkeleton from "@/src/components/Dashboard/Seller/OrdersManagement/OrderDetails/OrderActionsCard/OrderActionsCardSkeleton";
import OrderItemsDashboardSkeleton from "@/src/components/Dashboard/Seller/OrdersManagement/OrderDetails/OrderItemsDashboard/OrderItemsDashboardSkeleton";
import OrderSummaryDashboardSkeleton from "@/src/components/Dashboard/Seller/OrdersManagement/OrderDetails/OrderSummaryDashboard/OrderSummaryDashboardSkeleton";
import TrackingTimelineDashboardSkeleton from "@/src/components/Dashboard/Seller/OrdersManagement/OrderDetails/TrackingTimelineDashboard/TrackingTimelineDashboardSkeleton";
import PageHeaderSkeleton from "@/src/components/Dashboard/Seller/PageHeader/PageHeaderSkeleton";
import dynamic from "next/dynamic";

const PageHeader = dynamic(
  () =>
    import("@/src/components/Dashboard/Seller/PageHeader/PageHeader").then(
      (m) => m.default
    ),
  { ssr: false, loading: () => <PageHeaderSkeleton /> }
);

const CustomerInfoCard = dynamic(
  () =>
    import(
      "@/src/components/Dashboard/Seller/OrdersManagement/OrderDetails/CustomerInfoCard/CustomerInfoCard"
    ).then((m) => m.default),
  { ssr: false, loading: () => <CustomerInfoCardSkeleton /> }
);

const OrderSummaryDashboard = dynamic(
  () =>
    import(
      "@/src/components/Dashboard/Seller/OrdersManagement/OrderDetails/OrderSummaryDashboard/OrderSummaryDashboard"
    ).then((m) => m.default),
  { ssr: false, loading: () => <OrderSummaryDashboardSkeleton /> }
);

const OrderItemsDashboard = dynamic(
  () =>
    import(
      "@/src/components/Dashboard/Seller/OrdersManagement/OrderDetails/OrderItemsDashboard/OrderItemsDashboard"
    ).then((m) => m.default),
  { ssr: false, loading: () => <OrderItemsDashboardSkeleton /> }
);

const TrackingTimelineDashboard = dynamic(
  () =>
    import(
      "@/src/components/Dashboard/Seller/OrdersManagement/OrderDetails/TrackingTimelineDashboard/TrackingTimelineDashboard"
    ).then((m) => m.default),
  { ssr: false, loading: () => <TrackingTimelineDashboardSkeleton /> }
);

const OrderActionsCard = dynamic(
  () =>
    import(
      "@/src/components/Dashboard/Seller/OrdersManagement/OrderDetails/OrderActionsCard/OrderActionsCard"
    ).then((m) => m.default),
  { ssr: false, loading: () => <OrderActionsCardSkeleton /> }
);

export interface OrderTrackingStep {
  label: string;
  date?: string;
  status: "done" | "current" | "pending";
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
  image?: string;
}
export interface OrderShippingAddress {
  name: string;
  address: string;
  city?: string;
  phone?: string;
}
export interface OrderDetailsInterface {
  id: string;
  tracking: OrderTrackingStep[];
  courier?: string;
  trackingNumber?: string;
  summary: OrderSummary;
  items: OrderItem[];
  shipping: OrderShippingAddress;
}

export default function OrderDetailsDashboard({
  order,
}: {
  order: OrderDetailsInterface;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 box-border">
      <div className="flex flex-col gap-6">
        <PageHeader title={`Order #${order.id}`} />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <div className="space-y-6">
            <OrderSummaryDashboard summary={order.summary} />

            <div className="grid gap-6 md:grid-cols-2">
              <OrderItemsDashboard
                items={order.items}
                currency={order.summary.currency}
              />
              <TrackingTimelineDashboard tracking={order.tracking} />
            </div>

            <OrderActionsCard onUpdate={() => {}} onAddTracking={() => {}} />
          </div>

          <div className="space-y-4">
            <CustomerInfoCard shipping={order.shipping} />
            <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Shipping Info</p>
                  <p className="text-sm font-medium">
                    {order.courier ?? "Not Assigned"}
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  <p>Tracking</p>
                  <p className="font-medium">{order.trackingNumber ?? "—"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
