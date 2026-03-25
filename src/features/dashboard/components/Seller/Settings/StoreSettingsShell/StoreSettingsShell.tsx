"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import IdentitySkeleton from "../skeletons/IdentitySkeleton";
import InformationSkeleton from "../skeletons/InformationSkeleton";
import PoliciesSkeleton from "../skeletons/PoliciesSkeleton";
import PreviewSkeleton from "../skeletons/PreviewSkeleton";
import ValidationSkeleton from "../skeletons/ValidationSkeleton";
import TabsSlider from "./TabsSlider";
import "./tabsSlider.css";

const InformationTab = dynamic(
  () =>
    import(
      "@/src/components/Dashboard/Seller/Settings/tabs/InformationTab"
    ).then((s) => s.default),
  {
    loading: () => <InformationSkeleton />,
    ssr: false,
  }
);
const PoliciesTab = dynamic(
  () =>
    import("@/src/components/Dashboard/Seller/Settings/tabs/PoliciesTab").then(
      (s) => s.default
    ),
  {
    loading: () => <PoliciesSkeleton />,
    ssr: false,
  }
);
const PreviewTab = dynamic(
  () =>
    import("@/src/components/Dashboard/Seller/Settings/tabs/PreviewTab").then(
      (s) => s.default
    ),
  {
    loading: () => <PreviewSkeleton />,
    ssr: false,
  }
);
const ValidationTab = dynamic(
  () =>
    import(
      "@/src/components/Dashboard/Seller/Settings/tabs/ValidationTab"
    ).then((s) => s.default),
  {
    loading: () => <ValidationSkeleton />,
    ssr: false,
  }
);
const IdentityTab = dynamic(
  () =>
    import("@/src/components/Dashboard/Seller/Settings/tabs/IdentityTab").then(
      (s) => s.default
    ),
  {
    loading: () => <IdentitySkeleton />,
    ssr: false,
  }
);

const tabs = [
  { id: "identity", label: "Identity" },
  { id: "information", label: "Information" },
  { id: "policies", label: "Policies" },
  { id: "preview", label: "Preview" },
  { id: "validation", label: "Validation & Limits" },
];

export default function StoreSettingsShell() {
  const [active, setActive] = useState<string>("identity");

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 sm:p-6 shadow-sm max-w-full">
      <div className="mb-4">
        <TabsSlider tabs={tabs} active={active} onChange={setActive} />
      </div>

      <div className="min-h-[320px]">
        <div key={active} className="transition-all duration-400 ease-in-out">
          <div
            className="animate-tab-in"
            style={{ willChange: "opacity, transform" }}
          >
            {active === "identity" ? (
              <IdentityTab />
            ) : active === "information" ? (
              <InformationTab />
            ) : active === "policies" ? (
              <PoliciesTab />
            ) : active === "preview" ? (
              <PreviewTab />
            ) : (
              <ValidationTab />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
