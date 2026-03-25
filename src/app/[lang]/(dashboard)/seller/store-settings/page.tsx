import StoreSettings from "@/src/features/dashboard/components/Seller/Settings/StoreSettings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - Store Settings",
};

export default function OurStoreSettingsPage() {
  return <StoreSettings />;
}

