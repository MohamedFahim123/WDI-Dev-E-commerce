import SavedAddressesSection from "@/src/components/Dashboard/Buyer/Addresses/SavedAdressesSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - Saved Addresses",
  description: "Manage your saved delivery addresses.",
};

export default function BuyerAddressesPage() {
  return (
    <div className="space-y-4">
      <SavedAddressesSection />
    </div>
  );
}
