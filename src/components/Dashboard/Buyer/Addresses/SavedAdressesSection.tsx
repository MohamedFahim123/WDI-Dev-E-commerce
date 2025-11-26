"use client";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import SavedAddressesSkeleton from "./SavedAddressesSkeleton";

const SavedAddresses = dynamic(() => import("./SavedAddresses"), {
  loading: () => <SavedAddressesSkeleton />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Saved Addresses",
  description: "Manage your saved delivery addresses.",
};

export default function SavedAddressesSection() {
  const addresses = [
    {
      id: "home",
      label: "Home",
      isDefault: true,
      name: "Ahmed Al Mansoori",
      line1: "Sheikh Zayed Road, Building 42",
      line2: "Dubai, UAE",
      phone: "+971 50 123 4567",
    },
    {
      id: "office",
      label: "Office",
      isDefault: false,
      name: "Ahmed Al Mansoori",
      line1: "Business Bay, Tower 15, Floor 8",
      line2: "Dubai, UAE",
      phone: "+971 50 123 4567",
    },
  ];

  return (
    <div className="space-y-4">
      <SavedAddresses addresses={addresses} />
    </div>
  );
}
