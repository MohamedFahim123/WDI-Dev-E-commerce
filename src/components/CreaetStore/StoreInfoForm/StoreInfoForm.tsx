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

type Props = {
  onNext: () => void;
  serverErrors?: Record<string, string>;
  serverErrorsVersion: string;
  clearClientError: (key: string) => void;
  clearServerError: (key: string) => void;
};

export default function StoreInfoForm({
  onNext,
  serverErrors,
  serverErrorsVersion,
  clearClientError,
  clearServerError,
}: Props) {
  const storeInfo = useCreateStore((s) => s.storeInfo);
  const update = useCreateStore((s) => s.updateStoreInfo);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<StoreInfoSchema>({
    defaultValues: storeInfo,
    resolver: zodResolver(storeInfoSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  React.useEffect(() => {
    if (!serverErrors) return;

    const keys: Array<keyof StoreInfoSchema> = [
      "nameEn",
      "nameAr",
      "phone",
      "email",
      "description",
    ];

    keys.forEach((k) => {
      const msg = serverErrors[k as string];
      if (msg) setError(k, { type: "server", message: msg });
    });
  }, [serverErrorsVersion, serverErrors, setError]);

  const reg = <T extends keyof StoreInfoSchema>(name: T) =>
    register(name, {
      onChange: () => {
        clearErrors(name);
        clearClientError(String(name));
        clearServerError(String(name));
      },
    });

  function onSubmit(values: StoreInfoSchema) {
    update(values);
    onNext();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
          <AuthInput
            label="Store Name (English)"
            placeholder="My Amazing Store"
            {...reg("nameEn")}
            error={errors.nameEn?.message}
            required
          />

          <AuthInput
            label="Store Name (Arabic)"
            placeholder="متجري الرائع"
            {...reg("nameAr")}
            error={errors.nameAr?.message}
            required
          />

          <AuthInput
            label="Store Phone Number"
            placeholder="+971501234567"
            autoComplete="tel"
            {...reg("phone")}
            error={errors.phone?.message}
            required
          />

          <AuthInput
            label="Store Email"
            placeholder="support@store.com"
            autoComplete="email"
            {...reg("email")}
            error={errors.email?.message}
            required
          />

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">
              Store Description <span className="ml-1 text-red-500">*</span>
            </label>

            <textarea
              className={`w-full min-h-[96px] rounded-lg border border-[#E4E4E7] bg-[#F5F5F7] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3BED] ${
                errors.description ? "border-red-500 focus:ring-red-500" : ""
              }`}
              placeholder="Your one-stop shop for electronics..."
              {...reg("description")}
            />

            {errors.description?.message ? (
              <p className="text-[11px] font-medium text-red-500" role="alert">
                {errors.description.message}
              </p>
            ) : null}
          </div>
        </PanelBody>

        <PanelFooter className="flex items-center justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-11 rounded-md bg-[#7C3BED] text-white px-5 font-semibold shadow-sm hover:bg-[#6d30d6] disabled:opacity-70 transition"
          >
            Save & Continue
          </button>
        </PanelFooter>
      </Panel>
    </form>
  );
}
