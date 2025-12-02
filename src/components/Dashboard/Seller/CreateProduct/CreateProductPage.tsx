"use client";

import PageHeaderSkeleton from "@/src/components/Dashboard/Seller/PageHeader/PageHeaderSkeleton";
import dynamic from "next/dynamic";

const PageHeader = dynamic(
  () => import("@/src/components/Dashboard/Seller/PageHeader/PageHeader"),
  { ssr: false, loading: () => <PageHeaderSkeleton notButton={true} /> }
);

const CreateProductForm = dynamic(
  () =>
    import(
      "@/src/components/Dashboard/Seller/CreateProduct/CreateProductForm/CreateProductForm"
    ),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
        <div className="space-y-4">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="grid grid-cols-1 gap-3">
            <div className="h-11 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-11 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-24 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-11 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-32 w-full bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
      </div>
    ),
  }
);

export default function CreateProductPage() {
  return (
    <div className="max-w-full">
      <PageHeader
        title="Create New Product"
        subtitle="Fill in the required information to list your product"
      />
      <section className="rounded-2xl border border-[#E5E7EB] bg-white p-4 sm:p-5 shadow-sm">
        <CreateProductForm />
      </section>
    </div>
  );
}
