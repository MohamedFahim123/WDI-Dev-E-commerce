import StoreSettings from "@/src/components/Dashboard/Seller/Settings/StoreSettings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - Store Settings",
};

export default function OurStoreSettingsPage() {
  return <StoreSettings />;
}
