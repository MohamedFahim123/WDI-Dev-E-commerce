"use client";

import type { FormValues } from "@/src/validation/ProductSchema";
import { useFormContext } from "react-hook-form";

type Props = {
  next: () => void;
  prev?: () => void;
  go?: (n: number) => void;
};

export default function CategoryStep({  }: Props) {
  const { register } = useFormContext<FormValues>();

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="h-6 w-6 rounded-full bg-[#F6F0FF] flex items-center justify-center text-[#7C3BED]">
          📦
        </div>
        <h3 className="text-lg font-semibold">Product Category</h3>
      </div>

      <div className="space-y-6">
        <div>
          <div className="text-sm text-gray-600 mb-2">Apparel</div>
          <div className="grid gap-3 sm:grid-cols-2">
            <select
              {...register("category.main")}
              className="h-11 rounded-lg border px-3 bg-[#FAFAFA]"
            >
              <option value="Apparel">Apparel</option>
              <option value="Electronics">Electronics</option>
              <option value="Home">Home</option>
            </select>
            <select
              {...register("category.sub")}
              className="h-11 rounded-lg border px-3 bg-[#FAFAFA]"
            >
              <option value="T-Shirts">T-Shirts</option>
              <option value="Jeans">Jeans</option>
              <option value="Shoes">Shoes</option>
            </select>
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-600 mb-2">Electronics</div>
          <div className="grid gap-3 sm:grid-cols-2">
            <select
              {...register("electronics.main")}
              className="h-11 rounded-lg border px-3 bg-[#FAFAFA]"
            >
              <option value="Mobiles">Mobiles</option>
              <option value="Laptops">Laptops</option>
              <option value="Audio">Audio</option>
            </select>
            <select
              {...register("electronics.sub")}
              className="h-11 rounded-lg border px-3 bg-[#FAFAFA]"
            >
              <option value="Smartphones">Smartphones</option>
              <option value="Feature Phones">Feature Phones</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
