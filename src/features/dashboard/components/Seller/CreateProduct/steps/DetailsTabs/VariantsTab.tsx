"use client";

import type { FormValues } from "@/src/validation/ProductSchema";
import { useFormContext } from "react-hook-form";

export default function VariantsTab() {
  const { register } = useFormContext<FormValues>();

  return (
    <section>
      <h4 className="text-sm font-medium mb-2">Variants</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <div className="text-sm mb-2">Size</div>
          <div className="rounded-lg border bg-white p-3 min-h-[100px]">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("variants.sizes", { value: [] })}
                value="S"
              />{" "}
              S
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("variants.sizes", { value: [] })}
                value="M"
              />{" "}
              M
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("variants.sizes", { value: [] })}
                value="L"
              />{" "}
              L
            </label>
          </div>
        </div>

        <div>
          <div className="text-sm mb-2">Colour</div>
          <div className="rounded-lg border bg-white p-3 min-h-[100px]">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("variants.colours", { value: [] })}
                value="Black"
              />{" "}
              Black
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("variants.colours", { value: [] })}
                value="Blue"
              />{" "}
              Blue
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("variants.colours", { value: [] })}
                value="Red"
              />{" "}
              Red
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
