"use client";
import { useState } from "react";
import IdentityTab from "../tabs/IdentityTab";
import InformationTab from "../tabs/InformationTab";
import PoliciesTab from "../tabs/PoliciesTab";
import PreviewTab from "../tabs/PreviewTab";
import ValidationTab from "../tabs/ValidationTab";
import TabsSlider from "./TabsSlider";

export default function StoreSettingsShell() {
  const tabs = [
    { id: "identity", label: "Identity" },
    { id: "information", label: "Information" },
    { id: "policies", label: "Policies" },
    { id: "preview", label: "Preview" },
    { id: "validation", label: "Validation & Limits" },
  ];

  const [active, setActive] = useState<string>("identity");

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 sm:p-5 shadow-sm">
      <div className="mb-4">
        <TabsSlider tabs={tabs} active={active} onChange={setActive} />
      </div>

      <div className="min-h-[320px]">
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
  );
}
