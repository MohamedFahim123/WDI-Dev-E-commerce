"use client";

import PageHeader from "@/src/components/Dashboard/Seller/Settings/PageHeader/PageHeader";
import dynamic from "next/dynamic";
const StoreSettingsShell = dynamic(
  () =>
    import(
      "@/src/components/Dashboard/Seller/Settings/StoreSettingsShell/StoreSettingsShell"
    ),
  { ssr: false }
);

export default function StoreSettings() {
  return (
    <div className="max-w-full">
      <PageHeader title="Store Settings" />
      <div className="px-0 sm:px-0">
        <StoreSettingsShell />
      </div>
    </div>
  );
}
