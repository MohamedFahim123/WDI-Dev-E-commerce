"use client";

import * as React from "react";
import { useCreateStore } from "@/src/stores/StepsCreateStore";
import {
  addressSchema,
  AddressSchema,
} from "@/src/validation/CreateStoreSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { LocateIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import AuthInput from "@/src/features/auth/components/Fields/AuthInput";
import FieldRow from "../Common/FieldRow";
import Panel from "../Common/Panel";
import PanelBody from "../Common/PanelBody";
import PanelFooter from "../Common/PanelFooter";
import PanelHeader from "../Common/PanelHeader";

type Props = {
  onBack: () => void;
  onNext: () => void;
  serverErrors?: Record<string, string>;
  serverErrorsVersion: string;
  clearClientError: (key: string) => void;
  clearServerError: (key: string) => void;
};

export default function AddressForm({
  onBack,
  onNext,
  serverErrors,
  serverErrorsVersion,
  clearClientError,
  clearServerError,
}: Props) {
  const addressInfo = useCreateStore((s) => s.addressInfo);
  const update = useCreateStore((s) => s.updateAddressInfo);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<AddressSchema>({
    defaultValues: addressInfo,
    resolver: zodResolver(addressSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  React.useEffect(() => {
    if (!serverErrors) return;
    const keys: Array<keyof AddressSchema> = [
      "city",
      "region",
      "street",
      "unit",
      "postal",
    ];
    keys.forEach((k) => {
      const msg = serverErrors[k as string];
      if (msg) setError(k, { type: "server", message: msg });
    });
  }, [serverErrorsVersion, serverErrors, setError]);

  const reg = <T extends keyof AddressSchema>(name: T) =>
    register(name, {
      onChange: () => {
        clearErrors(name);
        clearClientError(String(name));
        clearServerError(String(name));
      },
    });

  function onSubmit(values: AddressSchema) {
    update(values);
    onNext();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Panel>
        <PanelHeader
          icon={
            <div className="h-9 w-9 flex items-center justify-center">
              <LocateIcon className="h-4 w-4 text-[#7C3BED]" />
            </div>
          }
          title="Business Address"
          subtitle="Provide the address where your business operates."
        />

        <PanelBody className="space-y-6">
          <FieldRow>
            <AuthInput
              label="City"
              {...reg("city")}
              required
              error={errors.city?.message}
              placeholder="Dubai"
              autoComplete="address-level2"
            />
            <AuthInput
              label="Region/State"
              {...reg("region")}
              required
              error={errors.region?.message}
              placeholder="Dubai"
              autoComplete="address-level1"
            />
          </FieldRow>

          <div>
            <AuthInput
              label="Street Address"
              {...reg("street")}
              required
              error={errors.street?.message}
              placeholder="123 Main Street"
              autoComplete="street-address"
            />
            <p className="mt-1 text-xs text-slate-400">
              Include building name, landmark or PO box if applicable.
            </p>
          </div>

          <FieldRow>
            <AuthInput
              label="Unit/Apartment (optional)"
              {...reg("unit")}
              error={errors.unit?.message}
              placeholder="Apt 4B"
              autoComplete="address-line2"
            />
            <AuthInput
              label="Postal/ZIP Code"
              {...reg("postal")}
              required
              error={errors.postal?.message}
              placeholder="000000"
              autoComplete="postal-code"
            />
          </FieldRow>
        </PanelBody>

        <PanelFooter>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onBack}
              className="h-10 rounded-md border px-4 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#7C3BED]"
            >
              ← Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-10 rounded-md bg-[#7C3BED] text-white px-5 text-sm font-semibold hover:bg-[#6d30d6] disabled:opacity-70"
            >
              Continue
            </button>
          </div>
        </PanelFooter>
      </Panel>
    </form>
  );
}

