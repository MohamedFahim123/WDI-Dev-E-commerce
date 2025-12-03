"use client";

import type { FormValues } from "@/src/validation/ProductSchema";
import { useFormContext } from "react-hook-form";
import FormInput from "../../../Settings/common/FormInput";

export default function OfferTab() {
  const { register, formState } = useFormContext<FormValues>();
  const { errors } = formState;

  return (
    <section>
      <h4 className="text-sm font-medium mb-2">Pricing</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FormInput
          label="Base Price"
          {...register("basePrice")}
          error={errors.basePrice?.message as string | undefined}
        />
        <FormInput
          label="Discounted Price"
          {...register("discountedPrice")}
          error={errors.discountedPrice?.message as string | undefined}
        />
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FormInput label="VAT Rate" {...register("vatRate")} />
        <div className="flex flex-col gap-2">
          <div className="text-xs text-gray-500">Inventory</div>
          <FormInput label="Stock Qty" {...register("stockQty")} />
        </div>
      </div>
    </section>
  );
}
