"use client";

import { type Stat } from "@/src/components/Dashboard/Seller/MyDashboard/StatCard";
import dynamic from "next/dynamic";
import StatCardSkeleton from "../MyDashboard/Skeletons/StatCardSkeleton";
import OrdersSnapshotSkeleton from "./OrdersSnapshot/OrdersSnapshotSkeleton";

const StatCard = dynamic(
  () =>
    import("@/src/components/Dashboard/Seller/MyDashboard/StatCard").then(
      (m) => m.default
    ),
  {
    loading: () => <StatCardSkeleton />,
    ssr: false,
  }
);

const OrdersSnapshot = dynamic(
  () =>
    import(
      "@/src/components/Dashboard/Seller/OverviewMetrics/OrdersSnapshot/OrdersSnapshot"
    ).then((m) => m.default),
  {
    loading: () => <OrdersSnapshotSkeleton />,
    ssr: false,
  }
);

export default function OverviewMetrics() {
  const stats: Stat[] = [
    {
      title: "Total Sales",
      value: "AED 178,920",
      subtitle: "Today • Week: AED 87,360.00",
    },
    {
      title: "WCI Commission Deducted",
      value: "AED 12,530",
      subtitle: "- 4 from yesterday",
    },
    {
      title: "Net Earnings",
      value: "AED 163,210",
      subtitle: "Active listings",
    },
    {
      title: "Pending Payouts",
      value: "AED 31,250",
      subtitle: "Needs attention",
      accent: "warning",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <h2 className="text-2xl font-semibold">Overview Metrics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <StatCard key={i} stat={s} />
        ))}
      </div>

      <OrdersSnapshot />
    </div>
  );
}
