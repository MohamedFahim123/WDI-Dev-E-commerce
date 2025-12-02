"use client";
import { useRouteLang } from "@/src/hooks/useLang";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import PageHeaderSkeleton from "../PageHeader/PageHeaderSkeleton";
import CatalogCardsSkeleton from "./CatalogCards/CatalogCardsSkeleton";
import CatalogTableSkeleton from "./CatalogTable/CatalogTableSkeleton";
import CatalogToolbarSkeleton from "./CatalogToolbar/CatalogToolbarSkeleton";

const PageHeader = dynamic(() => import("../PageHeader/PageHeader"), {
  ssr: false,
  loading: () => <PageHeaderSkeleton />,
});

const CatalogToolbar = dynamic(
  () => import("./CatalogToolbar/CatalogToolbar"),
  { ssr: false, loading: () => <CatalogToolbarSkeleton /> }
);

const CatalogCards = dynamic(() => import("./CatalogCards/CatalogCards"), {
  ssr: false,
  loading: () => <CatalogCardsSkeleton />,
});

const CatalogTable = dynamic(() => import("./CatalogTable/CatalogTable"), {
  ssr: false,
  loading: () => <CatalogTableSkeleton />,
});

type SKU = {
  id: string;
  title: string;
  subtitle?: string;
  partnerSku?: string;
  price?: string;
  fees?: string;
  stock?: number;
  status?: "active" | "pending" | "out_of_stock";
};

const SAMPLE: SKU[] = [
  {
    id: "SKU12345",
    title: "Wireless Headphones",
    subtitle: "",
    partnerSku: "PARTNER-001",
    price: "AED 89.99",
    fees: "AED 8.99",
    stock: 45,
    status: "active",
  },
  {
    id: "SKU12346",
    title: "Smart Watch",
    subtitle: "",
    partnerSku: "PARTNER-002",
    price: "AED 199.99",
    fees: "AED 19.99",
    stock: 12,
    status: "pending",
  },
  {
    id: "SKU12347",
    title: "USB-C Cable",
    subtitle: "",
    partnerSku: "PARTNER-003",
    price: "AED 12.99",
    fees: "AED 1.29",
    stock: 0,
    status: "out_of_stock",
  },
];
export default function SellerCatalogPage() {
  const lang = useRouteLang();
  const addHref = `/${lang}/seller/add-product`;
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "pending" | "out_of_stock"
  >("all");
  const [stockFilter, setStockFilter] = useState<"all" | "in" | "out">("all");
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return SAMPLE.filter((s) => {
      if (q) {
        const hay = `${s.id} ${s.title} ${s.partnerSku}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (statusFilter !== "all" && s.status !== statusFilter) return false;
      if (stockFilter === "in" && (!s.stock || s.stock <= 0)) return false;
      if (stockFilter === "out" && s.stock && s.stock > 0) return false;
      return true;
    });
  }, [search, statusFilter, stockFilter]);
  return (
    <div className="max-w-full">
      <PageHeader addHref={addHref} />
      <section className="rounded-2xl border border-[#E5E7EB] bg-white p-4 sm:p-5 shadow-sm">
        <CatalogToolbar
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          stockFilter={stockFilter}
          setStockFilter={setStockFilter}
        />
        <CatalogCards items={filtered} />
        <div className="hidden sm:block mt-2">
          <CatalogTable items={filtered} />
        </div>
        {filtered.length === 0 && (
          <div className="mt-4 text-sm text-[#6B7280]">No products found.</div>
        )}
      </section>
    </div>
  );
}
