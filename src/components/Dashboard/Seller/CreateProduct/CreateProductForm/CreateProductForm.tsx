"use client";

import React, { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema, CreateProductFormValues } from "./schema";
import Link from "next/link";
import Image from "next/image";
import AuthSelect from "@/src/components/Auth/Fields/AuthSelect";
import AuthInput from "@/src/components/Auth/Fields/AuthInput";

export default function CreateProductForm() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      sku: "",
      title_en: "",
      title_ar: "",
      description_en: "",
      description_ar: "",
      brand: "",
      product_images: undefined,
    },
  });

  const images = watch("product_images") as unknown as FileList | undefined;

  const previews = useMemo(() => {
    if (!images || images.length === 0) return [];
    return Array.from(images).map((f) => ({
      name: f.name,
      url: URL.createObjectURL(f),
    }));
  }, [images]);

  const onSubmit = async (data: CreateProductFormValues) => {

    const form = new FormData();
    form.append("sku", data.sku);
    form.append("title_en", data.title_en);
    form.append("title_ar", data.title_ar);
    form.append("description_en", data.description_en);
    form.append("description_ar", data.description_ar);
    form.append("brand", data.brand);
    const files = data.product_images!;
    for (let i = 0; i < files.length; i++)
      form.append("product_images", files[i]);
    await new Promise((r) => setTimeout(r, 700));
    previews.forEach((p) => URL.revokeObjectURL(p.url));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <AuthInput
          label="SKU"
          required
          placeholder="E.G. SKU12345"
          {...register("sku")}
          error={errors.sku?.message as string | undefined}
          autoComplete="off"
          name="sku"
        />
        <p className="mt-2 text-xs text-[#6B7280]">
          Unique product identifier (alphanumeric only)
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AuthInput
          label="Product Title (English)"
          required
          placeholder="Enter product title in English"
          {...register("title_en")}
          error={errors.title_en?.message as string | undefined}
          autoComplete="name"
          name="title_en"
        />
        <AuthInput
          label="Product Title (Arabic)"
          required
          placeholder="ادخل عنوان المنتج بالعربية"
          {...register("title_ar")}
          error={errors.title_ar?.message as string | undefined}
          autoComplete="name"
          name="title_ar"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">
            Description (English) <span className="ml-1 text-red-500">*</span>
          </label>
          <Controller
            control={control}
            name="description_en"
            render={({ field }) => (
              <textarea
                {...field}
                placeholder="Enter detailed product description in English"
                autoComplete="off"
                className="min-h-[120px] w-full rounded-lg border border-[#E4E4E7] bg-[#F5F5F7] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-[#7C3BED]"
              />
            )}
          />
          {errors.description_en && (
            <p className="text-[11px] font-medium text-red-500 mt-1">
              {errors.description_en.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">
            Description (Arabic) <span className="ml-1 text-red-500">*</span>
          </label>
          <Controller
            control={control}
            name="description_ar"
            render={({ field }) => (
              <textarea
                {...field}
                placeholder="ادخل وصف المنتج بالتفصيل بالعربية"
                autoComplete="off"
                className="min-h-[120px] w-full rounded-lg border border-[#E4E4E7] bg-[#F5F5F7] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-[#7C3BED]"
              />
            )}
          />
          {errors.description_ar && (
            <p className="text-[11px] font-medium text-red-500 mt-1">
              {errors.description_ar.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AuthSelect
          label="Brand"
          required
          {...register("brand")}
          error={errors.brand?.message as string | undefined}
          name="brand"
        >
          <option value="">Select a brand</option>
          <option value="brand-1">Brand One</option>
          <option value="brand-2">Brand Two</option>
          <option value="create">Create new brand</option>
        </AuthSelect>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">
            Product Images *
          </label>

          <Controller
            control={control}
            name="product_images"
            render={({ field: { onChange, value } }) => (
              <div>
                <label className="rounded-lg border border-dashed border-[#E4E4E7] bg-[#F9FAFB] p-4 block">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#374151] hover:bg-[#F9FAFB] cursor-pointer">
                      Upload
                    </span>
                    <div className="text-xs text-[#6B7280]">
                      Upload 1-6 images (JPG/PNG, min 800x800px, white
                      background preferred)
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      onChange(e.target.files);
                    }}
                  />
                </label>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  {!value || (value && value.length === 0) ? (
                    <div className="col-span-3 text-sm text-red-500">
                      {errors.product_images
                        ? (errors.product_images.message as string)
                        : "At least 1 image is required"}
                    </div>
                  ) : (
                    Array.from(value as FileList).map((f, i) => (
                      <div
                        key={i}
                        className="h-20 w-full overflow-hidden rounded-md border bg-white flex items-center justify-center text-xs text-[#6B7280]"
                      >
                        <div className="max-h-full max-w-full">
                          <Image
                            src={URL.createObjectURL(f)}
                            alt={f.name}
                            width={120}
                            height={80}
                            className="object-contain"
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Link
          href={`/${""}/seller/catalog`}
          className="inline-flex items-center justify-center rounded-md border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#F9FAFB]"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-md bg-[#7C3BED] px-4 py-2 text-sm font-medium text-white hover:bg-[#6D28D9] disabled:opacity-60"
        >
          {isSubmitting ? "Creating..." : "Create Product"}
        </button>
      </div>
    </form>
  );
}
