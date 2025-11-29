"use client";

import { useCreateStore } from "@/src/stores/StepsCreateStore";
import {
  payoutSchema,
  PayoutSchema,
} from "@/src/validation/CreateStoreSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthInput } from "../../Auth/Fields/AuthInput";
import AuthSelect from "../../Auth/Fields/AuthSelect";
import Header from "./Header";
import InfoNote from "./InfoNote";
import FieldRow from "./FieldRow";
import ActionRow from "./ActionRow";

type Props = { onBack: () => void; onSubmit: () => void; submitting?: boolean };

export default function PayoutForm({ onBack, onSubmit, submitting }: Props) {
  const payout = useCreateStore((s) => s.payoutInfo);
  const update = useCreateStore((s) => s.updatePayoutInfo);

  const { register, handleSubmit, formState } = useForm<PayoutSchema>({
    defaultValues: payout as PayoutSchema,
    resolver: zodResolver(payoutSchema),
    mode: "onTouched",
  });

  function onFormSubmit(values: PayoutSchema) {
    update(values);
    onSubmit();
  }

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="space-y-6"
      noValidate
    >
      <Header title="Configure Payout Method" />

      <InfoNote>
        Bank details are required for settlements. Account holder name must
        match your KYC information.
      </InfoNote>

      <div>
        <AuthInput
          label="Account Holder Name *"
          placeholder="John Doe"
          autoComplete="name"
          {...register("holderName")}
          error={formState.errors.holderName?.message as string | undefined}
        />
        <p className="text-xs text-slate-400 mt-1">
          Must match KYC name/entity exactly
        </p>
      </div>

      <FieldRow>
        <div>
          <AuthInput
            label="Bank Name *"
            placeholder="Emirates NBD"
            autoComplete="organization"
            {...register("bankName")}
            error={formState.errors.bankName?.message as string | undefined}
          />
        </div>
        <div>
          <AuthSelect
            label="Bank Country *"
            {...register("bankCountry")}
            error={formState.errors.bankCountry?.message as string | undefined}
     
          >
            <option value="">Select Country</option>
            <option>United Arab Emirates</option>
            <option>United States</option>
            <option>United Kingdom</option>
          </AuthSelect>
        </div>
      </FieldRow>

      <div>
        <AuthSelect
          label="Settlement Currency *"
          {...register("currency")}
          error={formState.errors.currency?.message as string | undefined}
        >
          <option value="">Select Currency</option>
          <option value="AED">AED - UAE Dirham</option>
          <option value="USD">USD - US Dollar</option>
          <option value="EUR">EUR - Euro</option>
        </AuthSelect>
        <p className="text-xs text-slate-400 mt-1">
          Currency must be supported by your bank and country
        </p>
      </div>

      <FieldRow>
        <div>
          <AuthInput
            label="IBAN"
            placeholder="AE070331234567890123456"
            autoComplete="off"
            {...register("iban")}
            error={formState.errors.iban?.message as string | undefined}
          />
        </div>
        <div>
          <AuthInput
            label="Account Number"
            placeholder="1234567890"
            autoComplete="off"
            {...register("accountNumber")}
            error={
              formState.errors.accountNumber?.message as string | undefined
            }
          />
        </div>
      </FieldRow>

      <FieldRow>
        <div>
          <AuthInput
            label="SWIFT/BIC Code"
            placeholder="EBILAEAD"
            autoComplete="off"
            {...register("swift")}
            error={formState.errors.swift?.message as string | undefined}
          />
          <p className="text-xs text-slate-400 mt-1">8 or 11 characters</p>
        </div>
        <div>
          <AuthInput
            label="Branch Name / Code"
            placeholder="Dubai Main Branch"
            autoComplete="off"
            {...register("branch")}
            error={formState.errors.branch?.message as string | undefined}
          />
          <p className="text-xs text-slate-400 mt-1">
            Optional, if required by country
          </p>
        </div>
      </FieldRow>

      <div>
        <AuthInput
          label="Bank Address (Optional)"
          placeholder="123 Financial District, Dubai, UAE"
          autoComplete="street-address" 
          {...register("address")}
          error={formState.errors.address?.message as string | undefined}
        />
      </div>

      <ActionRow onBack={onBack} submitting={!!submitting} />
    </form>
  );
}
