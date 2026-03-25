"use client";

import type { FormValues } from "@/src/validation/ProductSchema";
import { useMemo, useState } from "react";
import type { Path } from "react-hook-form";
import { useFormContext } from "react-hook-form";

import ContentTab from "./DetailsTabs/ContentTab";
import InsightsTab from "./DetailsTabs/InsightsTab";
import OfferTab from "./DetailsTabs/OfferTab";
import ShippingTab from "./DetailsTabs/ShippingTab";
import TabsNav from "./DetailsTabs/TabsNav";
import VariantsTab from "./DetailsTabs/VariantsTab";

const TAB_NAMES = [
  "Offer",
  "Content",
  "Variants",
  "Insights",
  "Shipping",
] as const;
type TabName = (typeof TAB_NAMES)[number];

type Props = { next?: () => void; prev?: () => void; go?: (n: number) => void };

export default function DetailsStep({}: Props) {
  const { trigger } = useFormContext<FormValues>();
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabFields = useMemo<Record<TabName, Path<FormValues>[]>>(() => {
    return {
      Offer: [
        "basePrice",
        "discountedPrice",
        "vatRate",
        "stockQty",
        "skuBarcode",
      ],
      Content: [
        "titleEN",
        "titleAR",
        "longDescriptionEN",
        "longDescriptionAR",
        "images",
      ],
      Variants: ["variants"],
      Insights: ["tags", "bundleId", "crossSellIds"],
      Shipping: ["shipLength", "shipWidth", "shipHeight", "shipWeight"],
    };
  }, []);

  const goToTab = async (index: number) => {
    if (index === activeTab) return;
    const currentTabName = TAB_NAMES[activeTab];
    const fields = tabFields[currentTabName] ?? [];
    const ok = await trigger(fields as Path<FormValues>[]);
    if (!ok) return;
    setActiveTab(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="h-6 w-6 rounded-full bg-[#F6F0FF] flex items-center justify-center text-[#7C3BED]">
          📝
        </div>
        <h3 className="text-lg font-semibold">Product Details</h3>
      </div>

      <TabsNav active={activeTab} onTabClick={goToTab} />

      <div className="space-y-4">
        {activeTab === 0 && <OfferTab />}
        {activeTab === 1 && <ContentTab />}
        {activeTab === 2 && <VariantsTab />}
        {activeTab === 3 && <InsightsTab />}
        {activeTab === 4 && <ShippingTab />}
      </div>
    </div>
  );
}
