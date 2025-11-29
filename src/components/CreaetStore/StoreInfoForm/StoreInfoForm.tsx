"use client";

import * as React from "react";
import { ShoppingBag } from "lucide-react";
import { useCreateStore } from "@/src/stores/StepsCreateStore";
import {
  storeInfoSchema,
  StoreInfoSchema,
} from "@/src/validation/CreateStoreSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Panel from "../Common/Panel";
import PanelHeader from "../Common/PanelHeader";
import PanelBody from "../Common/PanelBody";
import PanelFooter from "../Common/PanelFooter";
import AuthInput from "../../Auth/Fields/AuthInput";

type Props = { onNext: () => void };

export default function StoreInfoForm({ onNext }: Props) {
  const storeInfo = useCreateStore((s) => s.storeInfo);
  const update = useCreateStore((s) => s.updateStoreInfo);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StoreInfoSchema>({
    defaultValues: storeInfo,
    resolver: zodResolver(storeInfoSchema),
    mode: "onTouched",
  });

  function onSubmit(values: StoreInfoSchema) {
    update(values);
    onNext();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-labelledby="store-info-heading"
    >
      <Panel>
        <PanelHeader
          icon={
            <div className="h-9 w-9 flex items-center justify-center">
              <ShoppingBag className="h-4 w-4 text-[#7C3BED]" />
            </div>
          }
          title="Store Information"
          subtitle="Fill in the information below to create your store."
        />
        <PanelBody className="space-y-5">
          <div>
            <AuthInput
              label="Store Name (English)"
              placeholder="My Amazing Store"
              {...register("nameEn")}
              error={errors.nameEn?.message as string | undefined}
              required
            />
            <p className="mt-1 text-xs text-slate-400">
              3-60 characters. Letters, numbers, spaces, and {"-'"} allowed.
            </p>
          </div>

          <div>
            <AuthInput
              label="Store Name (Arabic)"
              placeholder="متجري الرائع"
              {...register("nameAr")}
              error={errors.nameAr?.message as string | undefined}
              required
            />
            <p className="mt-1 text-xs text-slate-400">
              3-60 characters. Arabic letters, spaces, and {"-'"} allowed.
            </p>
          </div>

          <div>
            <AuthInput
              label="Store Phone Number"
              placeholder="+971"
              autoComplete="phone"
              {...register("phone")}
              error={errors.phone?.message as string | undefined}
              required
            />
            <p className="mt-1 text-xs text-slate-400">
              E.164 format (e.g., +971501234567). Must be unique and reachable.
            </p>
          </div>
        </PanelBody>

        <PanelFooter className="flex items-center justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-11 rounded-md cursor-pointer bg-[#7C3BED] text-white px-5 font-semibold shadow-sm hover:bg-[#6d30d6] focus:outline-none focus:ring-2 focus:ring-[#7C3BED] disabled:opacity-70 transition"
          >
            Save & Continue
          </button>
        </PanelFooter>
      </Panel>
    </form>
  );
}
