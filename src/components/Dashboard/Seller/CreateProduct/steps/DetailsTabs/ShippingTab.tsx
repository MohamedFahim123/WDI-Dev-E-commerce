"use client";

import type { FormValues } from "@/src/validation/ProductSchema";
import { useFormContext } from "react-hook-form";
import FormInput from "../../../Settings/common/FormInput";

export default function ShippingTab() {
  const { register } = useFormContext<FormValues>();

  return (
    <section>
      <h4 className="text-sm font-medium mb-2">Shipping</h4>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <FormInput label="Length (cm)" {...register("shipLength")} />
        <FormInput label="Width (cm)" {...register("shipWidth")} />
        <FormInput label="Height (cm)" {...register("shipHeight")} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 mt-3">
        <FormInput label="Ship Weight (kg)" {...register("shipWeight")} />
      </div>
    </section>
  );
}
