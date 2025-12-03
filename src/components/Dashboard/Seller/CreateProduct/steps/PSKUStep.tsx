"use client";

import type { FormValues } from "@/src/validation/ProductSchema";
import { useFormContext } from "react-hook-form";

type Props = { next: () => void; prev?: () => void; go?: (n: number) => void };

export default function PSKUStep({}: Props) {
  const { register } = useFormContext<FormValues>();

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="h-6 w-6 rounded-full bg-[#F6F0FF] flex items-center justify-center text-[#7C3BED]">
          🔖
        </div>
        <h3 className="text-lg font-semibold">Product PSKU</h3>
      </div>

      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="p-3 rounded-lg border">
            <input {...register("pskuType")} value="Enter" type="radio" />
            <div className="font-medium">Enter PSKU</div>
            <div className="text-xs text-gray-500">For personal sellers</div>
          </label>

          <label className="p-3 rounded-lg border">
            <input {...register("pskuType")} value="Auto" type="radio" />
            <div className="font-medium">Auto-Generate</div>
            <div className="text-xs text-gray-500">
              For registered businesses
            </div>
          </label>
        </div>

        <select
          {...register("psku")}
          className="h-11 rounded-lg border px-3 bg-[#FAFAFA] w-full"
        >
          <option value="ABC">ABC</option>
          <option value="RED">RED</option>
          <option value="XL">XL</option>
        </select>
      </div>
    </div>
  );
}
