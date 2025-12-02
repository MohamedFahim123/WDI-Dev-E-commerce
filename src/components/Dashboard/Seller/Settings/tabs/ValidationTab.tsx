"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import FormInput from "../common/FormInput";
import FormTextArea from "../common/FormTextArea";
import UploadBox from "../common/UploadBox";
import {
  ValidationFormValues,
  validationSchema,
} from "../schemas/validationSchema";

export default function ValidationTab() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ValidationFormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      banner: undefined,
      title: "",
      tagline: "",
      policyText: "",
    },
  });

  const onSubmit = async (data: ValidationFormValues) => {
    const fd = new FormData();
    if (data.banner instanceof FileList && data.banner.length)
      fd.append("banner", data.banner[0]);
    fd.append("title", data.title ?? "");
    fd.append("tagline", data.tagline ?? "");
    fd.append("policyText", data.policyText ?? "");
    await new Promise((r) => setTimeout(r, 600));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h3 className="text-sm font-semibold text-[#111827]">
        Validation & Limits
      </h3>

      <div>
        <div className="text-xs text-[#6B7280] mb-2">BANNER (RED BAR)</div>
        <Controller
          control={control}
          name="banner"
          render={({ field: { onChange } }) => (
            <UploadBox
              onChange={(f) => onChange(f)}
              accept="image/*"
              multiple={false}
            />
          )}
        />
        {errors.banner && (
          <p className="text-xs text-red-500 mt-1">
            {errors.banner.message as string}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        <FormInput
          label="Title"
          placeholder="Enter Title here"
          {...register("title")}
          error={errors.title?.message}
        />
        <FormTextArea
          label="Tagline"
          placeholder="type here"
          {...register("tagline")}
          error={errors.tagline?.message}
        />
        <FormTextArea
          label="Policy text"
          placeholder="type here"
          {...register("policyText")}
          error={errors.policyText?.message}
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
