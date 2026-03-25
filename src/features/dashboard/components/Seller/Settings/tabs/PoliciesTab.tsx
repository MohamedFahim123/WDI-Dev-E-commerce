"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormInput from "../common/FormInput";
import { PoliciesFormValues, policiesSchema } from "../schemas/policiesSchema";

export default function PoliciesTab() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PoliciesFormValues>({
    resolver: zodResolver(policiesSchema),
    defaultValues: {
      shippingEn: "",
      shippingAr: "",
      returnEn: "",
      returnAr: "",
      warrantyEn: "",
      warrantyAr: "",
    },
  });

  const onSubmit = async (data: PoliciesFormValues) => {
    await new Promise((r) => setTimeout(r, 600));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h3 className="text-sm font-semibold text-[#111827]">Policies</h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormInput
          label="Shipping Policy EN"
          placeholder="Enter policy here"
          {...register("shippingEn")}
          error={errors.shippingEn?.message}
        />
        <FormInput
          label="Shipping Policy AR"
          placeholder="اكتب هنا"
          {...register("shippingAr")}
          error={errors.shippingAr?.message}
        />
        <FormInput
          label="Return Policy EN"
          placeholder="Enter policy here"
          {...register("returnEn")}
          error={errors.returnEn?.message}
        />
        <FormInput
          label="Return Policy AR"
          placeholder="اكتب هنا"
          {...register("returnAr")}
          error={errors.returnAr?.message}
        />
        <FormInput
          label="Warranty Policy EN"
          placeholder="Enter policy here"
          {...register("warrantyEn")}
          error={errors.warrantyEn?.message}
        />
        <FormInput
          label="Warranty Policy AR"
          placeholder="اكتب هنا"
          {...register("warrantyAr")}
          error={errors.warrantyAr?.message}
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex transition-all duration-200 cursor-pointer items-center justify-center rounded-md bg-[#7C3BED] px-4 py-2 text-sm font-medium text-white hover:bg-[#6D28D9]"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
