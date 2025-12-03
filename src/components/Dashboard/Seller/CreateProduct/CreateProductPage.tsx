"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useState } from "react";
import type { Path, Resolver } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";

import { FormValues, productSchema } from "@/src/validation/ProductSchema";

import StepperHeader from "./StepperHeader/StepperHeader";
import BrandStepSkeleton from "./steps/skeletons/BrandStepSkeleton";
import CategoryStepSkeleton from "./steps/skeletons/CategoryStepSkeleton";
import DetailsStepSkeleton from "./steps/skeletons/DetailsStepSkeleton";
import PSKUStepSkeleton from "./steps/skeletons/PSKUStepSkeleton";

const CategoryStep = dynamic(
  () => import("./steps/CategoryStep").then((m) => m.default),
  { ssr: false, loading: () => <CategoryStepSkeleton /> }
);
const BrandStep = dynamic(
  () => import("./steps/BrandStep").then((m) => m.default),
  { ssr: false, loading: () => <BrandStepSkeleton /> }
);
const PSKUStep = dynamic(
  () => import("./steps/PSKUStep").then((m) => m.default),
  { ssr: false, loading: () => <PSKUStepSkeleton /> }
);
const DetailsStep = dynamic(
  () => import("./steps/DetailsStep").then((m) => m.default),
  { ssr: false, loading: () => <DetailsStepSkeleton /> }
);

export default function CreateProductPage() {
  const [step, setStep] = useState<number>(1);
  const totalSteps = 4;

  const resolver = zodResolver(
    productSchema
  ) as unknown as Resolver<FormValues>;

  const methods = useForm<FormValues>({
    resolver,
    defaultValues: {
      category: { main: "Apparel", sub: "T-Shirts" },
      electronics: { main: "Mobiles", sub: "Smartphones" },
      brandType: "Brand",
      brand: "Nike",
      pskuType: "Enter",
      psku: "ABC",
      titleEN: "",
      titleAR: "",
      basePrice: undefined,
      discountedPrice: undefined,
      vatRate: undefined,
      stockQty: undefined,
      skuBarcode: undefined,
      variants: { sizes: [], colours: [] },
      tags: [],
      images: [],
      bundleId: undefined,
      crossSellIds: undefined,
      longDescriptionEN: undefined,
      longDescriptionAR: undefined,
      shipLength: undefined,
      shipWidth: undefined,
      shipHeight: undefined,
      shipWeight: undefined,
    } as Partial<FormValues>,
    mode: "onTouched",
  });

  const stepFields: Record<number, string[]> = {
    1: ["category.main", "category.sub", "electronics.main", "electronics.sub"],
    2: ["brandType", "brand"],
    3: ["pskuType", "psku"],
    4: [
      "titleEN",
      "titleAR",
      "longDescriptionEN",
      "longDescriptionAR",
      "basePrice",
      "discountedPrice",
      "vatRate",
      "stockQty",
      "skuBarcode",
      "variants",
      "tags",
      "bundleId",
      "crossSellIds",
      "shipLength",
      "shipWidth",
      "shipHeight",
      "shipWeight",
      "images",
    ],
  };

  const go = (to: number) => {
    const next = Math.max(1, Math.min(totalSteps, to));
    setStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onNext = async () => {
    const fields = stepFields[step] ?? [];
    const valid = await methods.trigger(fields as Path<FormValues>[]);
    if (!valid) return;
    if (step < totalSteps) setStep((s) => s + 1);
  };

  const onPrev = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const onSubmit = methods.handleSubmit((values) => {
    console.log("Final payload:", values);
    alert("Product payload printed to console");
  });

  const submitDisabled = !methods.formState.isValid;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10">
      <h2 className="text-2xl font-semibold mb-1">Add Product</h2>
      <div className="text-sm text-gray-500 mb-6">Seller name</div>

      <StepperHeader step={step} total={totalSteps} />

      <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <FormProvider {...methods}>
          <form onSubmit={onSubmit} className="space-y-6">
            {step === 1 && <CategoryStep next={onNext} prev={onPrev} go={go} />}
            {step === 2 && <BrandStep next={onNext} prev={onPrev} go={go} />}
            {step === 3 && <PSKUStep next={onNext} prev={onPrev} go={go} />}
            {step === 4 && <DetailsStep next={onNext} prev={onPrev} go={go} />}

            <div className="mt-6 flex items-center justify-end gap-3">
              {step > 1 && (
                <button
                  type="button"
                  onClick={onPrev}
                  className="rounded-full border px-4 py-2 bg-white text-sm"
                >
                  Back
                </button>
              )}

              {step < totalSteps ? (
                <button
                  onClick={onNext}
                  type="button"
                  className="rounded-full bg-[#7C3BED] px-5 py-2 text-sm text-white"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitDisabled}
                  className={`rounded-full px-5 py-2 text-sm text-white ${
                    submitDisabled
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-[#7C3BED]"
                  }`}
                >
                  Save & Submit
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
