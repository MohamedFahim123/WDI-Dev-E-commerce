"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormInput from "../common/FormInput";
import {
  InformationFormValues,
  informationSchema,
} from "../schemas/informationSchema";

export default function InformationTab() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InformationFormValues>({
    resolver: zodResolver(informationSchema),
    defaultValues: {
      storeName: "",
      street: "",
      city: "",
      region: "",
      country: "",
      zip: "",
      phone: "",
      email: "",
      website: "",
      instagram: "",
      tiktok: "",
    },
  });

  const onSubmit = async (data: InformationFormValues) => {
    await new Promise((r) => setTimeout(r, 600));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h3 className="text-sm font-semibold text-[#111827]">Information</h3>

      <div className="grid grid-cols-1 gap-3">
        <FormInput
          label="Store Name"
          placeholder="Enter Store name here"
          {...register("storeName")}
          error={errors.storeName?.message}
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <FormInput
            label="Street"
            placeholder="Enter Street here"
            {...register("street")}
            error={errors.street?.message}
          />
          <FormInput
            label="City"
            placeholder="Enter City here"
            {...register("city")}
            error={errors.city?.message}
          />
          <FormInput
            label="Region/State"
            placeholder="Enter Region/State here"
            {...register("region")}
            error={errors.region?.message}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <FormInput
            label="Country"
            placeholder="Select Country"
            {...register("country")}
            error={errors.country?.message}
          />
          <FormInput
            label="ZIP/Postal"
            placeholder="Enter ZIP/Postal here"
            {...register("zip")}
            error={errors.zip?.message}
          />
          <FormInput
            label="Region/State (extra)"
            placeholder="Enter Region/State here"
            {...register("region")}
            error={errors.region?.message}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <FormInput
            label="Contact Phone"
            placeholder="+971"
            {...register("phone")}
            error={errors.phone?.message}
          />
          <FormInput
            label="Contact Email"
            placeholder="Enter Email here"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>

        <h4 className="text-sm font-medium text-[#111827]">Social Links</h4>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <FormInput
            label="Website"
            placeholder="Enter Website link here"
            {...register("website")}
            error={errors.website?.message}
          />
          <FormInput
            label="Instagram"
            placeholder="Enter Instagram link here"
            {...register("instagram")}
            error={errors.instagram?.message}
          />
          <FormInput
            label="TikTok"
            placeholder="Enter TikTok link here"
            {...register("tiktok")}
            error={errors.tiktok?.message}
          />
        </div>
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
