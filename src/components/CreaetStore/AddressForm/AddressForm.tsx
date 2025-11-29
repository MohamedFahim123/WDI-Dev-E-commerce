"use client";

import { useCreateStore } from "@/src/stores/StepsCreateStore";
import {
  addressSchema,
  AddressSchema,
} from "@/src/validation/CreateStoreSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { LocateIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import AuthInput from "../../Auth/Fields/AuthInput";

import FieldRow from "../Common/FieldRow";
import Panel from "../Common/Panel";
import PanelBody from "../Common/PanelBody";
import PanelFooter from "../Common/PanelFooter";
import PanelHeader from "../Common/PanelHeader";

type Props = { onBack: () => void; onNext: () => void };

export default function AddressForm({ onBack, onNext }: Props) {
  const addressInfo = useCreateStore((s) => s.addressInfo);
  const update = useCreateStore((s) => s.updateAddressInfo);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddressSchema>({
    defaultValues: addressInfo,
    resolver: zodResolver(addressSchema),
    mode: "onTouched",
  });

  function onSubmit(values: AddressSchema) {
    update(values);
    onNext();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-labelledby="business-address-heading"
    >
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
              {...register("city")}
              required
              error={errors.city?.message as string | undefined}
              placeholder="Dubai"
              autoComplete="address-level2"
            />
            <AuthInput
              label="Region/State"
              {...register("region")}
              required
              error={errors.region?.message as string | undefined}
              placeholder="Dubai"
              autoComplete="address-level1"
            />
          </FieldRow>

          <div>
            <AuthInput
              label="Street Address"
              {...register("street")}
              required
              error={errors.street?.message as string | undefined}
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
              {...register("unit")}
              error={errors.unit?.message as string | undefined}
              placeholder="Apt 4B"
              autoComplete="address-line2"
            />
            <AuthInput
              label="Postal/ZIP Code"
              {...register("postal")}
              required
              error={errors.postal?.message as string | undefined}
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
              className="h-10 cursor-pointer rounded-md border px-4 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#7C3BED] transition"
            >
              ← Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-10 rounded-md cursor-pointer bg-[#7C3BED] text-white px-4 sm:px-5 text-sm font-semibold shadow hover:bg-[#6d30d6] focus:outline-none focus:ring-2 focus:ring-[#7C3BED] disabled:opacity-70 transition"
            >
              Continue
            </button>
          </div>
        </PanelFooter>
      </Panel>
    </form>
  );
}
