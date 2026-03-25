"use client";

import dynamic from "next/dynamic";
import type { Stat } from "./StatCard";
import TasksQuickActionsSkeleton from "./Skeletons/TasksQuickActionsSkeleton";
import OrdersSnapshotSkeleton from "./Skeletons/OrdersSnapshotSkeleton";
import LowStockAlertsSkeleton from "./Skeletons/LowStockAlertsSkeleton";
import TopSellingProductsSkeleton from "./Skeletons/TopSellingProductsSkeleton";
import SalesPerformanceSkeleton from "./Skeletons/SalesPerformanceSkeleton";
import StatCardSkeleton from "./Skeletons/StatCardSkeleton";

const StatCard = dynamic(() => import("./StatCard").then((m) => m.default), {
  loading: () => <StatCardSkeleton />,
  ssr: false,
});

const SalesPerformance = dynamic(
  () => import("./SalesPerformance").then((m) => m.default),
  { loading: () => <SalesPerformanceSkeleton />, ssr: false }
);

const TopSellingProducts = dynamic(
  () => import("./TopSellingProducts").then((m) => m.default),
  { loading: () => <TopSellingProductsSkeleton />, ssr: false }
);

const LowStockAlerts = dynamic(
  () => import("./LowStockAlerts").then((m) => m.default),
  {
    loading: () => <LowStockAlertsSkeleton />,
    ssr: false,
  }
);

const OrdersSnapshot = dynamic(
  () => import("./OrdersSnapshot").then((m) => m.default),
  {
    loading: () => <OrdersSnapshotSkeleton />,
    ssr: false,
  }
);

const TasksQuickActions = dynamic(
  () => import("./TasksQuickActions").then((m) => m.default),
  { loading: () => <TasksQuickActionsSkeleton />, ssr: false }
);

export default function SellerDashboardPage() {
  const stats: Stat[] = [
    {
      title: "Total Sales",
      value: "AED 12500.00",
      subtitle: "Today • Week: AED 87300.00",
    },
    { title: "New Orders", value: "24", subtitle: "+4 from yesterday" },
    { title: "Live Products", value: "156", subtitle: "Active listings" },
    {
      title: "Pending Review",
      value: "3",
      subtitle: "Needs attention",
      accent: "warning",
    },
  ];

  return (
    <div className="mx-auto py-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <StatCard key={i} stat={s} />
        ))}
      </div>

      <SalesPerformance />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TopSellingProducts />
        <LowStockAlerts />
      </div>

      <OrdersSnapshot />

      <TasksQuickActions />
    </div>
  );
}
