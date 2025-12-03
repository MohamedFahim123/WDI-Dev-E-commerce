"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import type { FormValues } from "@/src/validation/ProductSchema";
import FormInput from "../../../Settings/common/FormInput";

export default function InsightsTab() {
  const { register } = useFormContext<FormValues>();

  return (
    <section>
      <h4 className="text-sm font-medium mb-2">Insights</h4>

      <div>
        <div className="text-sm mb-2">Tags</div>
        <div className="rounded-lg border bg-white p-3 min-h-[80px]">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              value="flash_sale"
              {...register("tags", { value: [] })}
            />{" "}
            flash_sale
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              value="summer_sale"
              {...register("tags", { value: [] })}
            />{" "}
            summer_sale
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
        <FormInput label="Bundle_id" {...register("bundleId")} />
        <FormInput label="Cross_sell_ids" {...register("crossSellIds")} />
      </div>
    </section>
  );
}
