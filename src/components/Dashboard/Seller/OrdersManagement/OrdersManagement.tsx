// "use client"
"use client";

import dynamic from "next/dynamic";
import { Search, Sliders } from "lucide-react";
import { useState } from "react";
import FilterPills from "./FilterPills/FilterPills";
import OrdersSkeleton from "./OrdersSkeleton";

const OrdersTable = dynamic(
  () => import("./OrdersTable/OrdersTable").then((m) => m.default),
  {
    loading: () => <OrdersSkeleton />,
    ssr: false,
  }
);

export default function OrdersManagement() {
  const [filter, setFilter] = useState<string>("ALL");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 box-border">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold">Orders Management</h1>
          <div className="mt-3">
            <FilterPills selected={filter} onChange={(f) => setFilter(f)} />
          </div>
        </div>
      </div>



      <div>
        <OrdersTable />
      </div>
    </div>
  );
}
