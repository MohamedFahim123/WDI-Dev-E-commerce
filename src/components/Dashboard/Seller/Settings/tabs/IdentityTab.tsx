"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import FormInput from "../common/FormInput";
import FormTextArea from "../common/FormTextArea";
import UploadBox from "../common/UploadBox";
import { IdentityFormValues, identitySchema } from "../schemas/identitySchema";

export default function IdentityTab() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IdentityFormValues>({
    resolver: zodResolver(identitySchema),
    defaultValues: {
      logo: undefined,
      cover: undefined,
      storeName: "",
      taglineEn: "",
      taglineAr: "",
    },
  });

  const onSubmit = async (data: IdentityFormValues) => {
    const fd = new FormData();
    if (data.logo instanceof FileList && data.logo.length)
      fd.append("logo", data.logo[0]);
    if (data.cover instanceof FileList && data.cover.length)
      fd.append("cover", data.cover[0]);
    fd.append("storeName", data.storeName);
    fd.append("taglineEn", data.taglineEn ?? "");
    fd.append("taglineAr", data.taglineAr ?? "");
    await new Promise((r) => setTimeout(r, 600));
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h3 className="text-sm font-semibold text-[#111827]">Identity</h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <div className="text-xs text-[#6B7280] mb-2">Logo (optional)</div>
          <Controller
            control={control}
            name="logo"
            render={({ field: { onChange } }) => (
              <UploadBox
                onChange={(f) => onChange(f)}
                accept="image/*"
                multiple={false}
              />
            )}
          />
          {errors.logo && (
            <p className="text-xs text-red-500 mt-1">
              {errors.logo.message as string}
            </p>
          )}
        </div>

        <div>
          <div className="text-xs text-[#6B7280] mb-2">
            Cover / Banner (optional)
          </div>
          <Controller
            control={control}
            name="cover"
            render={({ field: { onChange } }) => (
              <UploadBox
                onChange={(f) => onChange(f)}
                accept="image/*"
                multiple={false}
              />
            )}
          />
          {errors.cover && (
            <p className="text-xs text-red-500 mt-1">
              {errors.cover.message as string}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormInput
          label="Store Name"
          placeholder="Enter Store name here"
          {...register("storeName")}
          error={errors.storeName?.message}
        />
        <div />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormTextArea
          label="Short Tagline / Description (EN)"
          placeholder="type here"
          {...register("taglineEn")}
          error={errors.taglineEn?.message}
        />
        <FormTextArea
          label="Short Tagline / Description (AR)"
          placeholder="اكتب هنا"
          {...register("taglineAr")}
          error={errors.taglineAr?.message}
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex cursor-pointer transition-all duration-200 items-center justify-center rounded-md bg-[#7C3BED] px-4 py-2 text-sm font-medium text-white hover:bg-[#6D28D9]"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
