"use client";

import type { FormValues } from "@/src/validation/ProductSchema";
import { useFormContext } from "react-hook-form";

type Props = { next: () => void; prev?: () => void; go?: (n: number) => void };

export default function BrandStep({  }: Props) {
  const { register, watch } = useFormContext<FormValues>();
  const brandType = watch("brandType");

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="h-6 w-6 rounded-full bg-[#F6F0FF] flex items-center justify-center text-[#7C3BED]">
          🏷️
        </div>
        <h3 className="text-lg font-semibold">Product Brand</h3>
      </div>

      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <label
            className={`p-3 rounded-lg border ${
              brandType === "Brand"
                ? "border-[#7C3BED] bg-[#F6F0FF]"
                : "border-gray-200 bg-white"
            }`}
          >
            <input
              {...register("brandType")}
              value="Brand"
              type="radio"
              className="mr-2"
            />
            <div className="font-medium">Brand</div>
            <div className="text-xs text-gray-500">For personal sellers</div>
          </label>

          <label
            className={`p-3 rounded-lg border ${
              brandType === "Unbranded"
                ? "border-[#7C3BED] bg-[#F6F0FF]"
                : "border-gray-200 bg-white"
            }`}
          >
            <input
              {...register("brandType")}
              value="Unbranded"
              type="radio"
              className="mr-2"
            />
            <div className="font-medium">Unbranded</div>
            <div className="text-xs text-gray-500">
              For registered businesses
            </div>
          </label>
        </div>

        <div>
          <select
            {...register("brand")}
            className="h-11 rounded-lg border px-3 bg-[#FAFAFA] w-full"
          >
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Puma">Puma</option>
            <option value="Unbranded">Unbranded</option>
          </select>

          <div className="mt-4 rounded-lg border bg-white p-3 min-h-[80px]">
            <div className="text-xs text-gray-500">Selected Brand</div>
            <div className="text-sm font-medium">
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
