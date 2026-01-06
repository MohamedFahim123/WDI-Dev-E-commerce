"use client";

import { useCreateStore } from "@/src/stores/StepsCreateStore";
import {
  payoutSchema,
  type PayoutSchema,
} from "@/src/validation/CreateStoreSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { Path, useForm } from "react-hook-form";

import { AuthInput } from "../../Auth/Fields/AuthInput";
import AuthSelect from "../../Auth/Fields/AuthSelect";

import ActionRow from "./ActionRow";
import FieldRow from "./FieldRow";
import Header from "./Header";
import InfoNote from "./InfoNote";

type Props = {
  onBack: () => void;
  onSubmit: () => void;
  submitting?: boolean;
  serverErrors?: Record<string, string>;
  serverErrorsVersion: string;
  clearClientError: (key: string) => void;
  clearServerError: (key: string) => void;
};

export default function PayoutForm({
  onBack,
  onSubmit,
  submitting,
  serverErrors,
  serverErrorsVersion,
  clearServerError,
  clearClientError,
}: Props) {
  const payout = useCreateStore((s) => s.payoutInfo);
  const update = useCreateStore((s) => s.updatePayoutInfo);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<PayoutSchema>({
    defaultValues: payout,
    resolver: zodResolver(payoutSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  React.useEffect(() => {
    if (!serverErrors) return;

    const payoutKeys = new Set([
      "holderName",
      "bankName",
      "bankCountry",
      "currency",
      "iban",
      "accountNumber",
      "swift",
      "branch",
      "branchCode",
      "address",
    ]);

    for (const [k, msg] of Object.entries(serverErrors)) {
      if (!msg) continue;
      if (!payoutKeys.has(k)) continue;
      setError(k as Path<PayoutSchema>, { type: "server", message: msg });
    }
  }, [serverErrorsVersion, serverErrors, setError]);

  const reg = <T extends Path<PayoutSchema>>(name: T) =>
    register(name, {
      onChange: () => {
        clearErrors(name);
        clearClientError(String(name));
        clearServerError(String(name));
      },
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
          {...reg("holderName")}
          error={errors.holderName?.message}
        />
      </div>

      <FieldRow>
        <div>
          <AuthInput
            label="Bank Name *"
            placeholder="National Bank"
            autoComplete="organization"
            {...reg("bankName")}
            error={errors.bankName?.message}
          />
        </div>

        <div>
          <AuthSelect
            label="Bank Country *"
            {...reg("bankCountry")}
            error={errors.bankCountry?.message}
          >
            <option value="">Select Country</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
          </AuthSelect>
        </div>
      </FieldRow>

      <div>
        <AuthSelect
          label="Settlement Currency *"
          {...reg("currency")}
          error={errors.currency?.message}
        >
          <option value="">Select Currency</option>
          <option value="AED">AED - UAE Dirham</option>
          <option value="USD">USD - US Dollar</option>
          <option value="EUR">EUR - Euro</option>
        </AuthSelect>
      </div>

      <FieldRow>
        <div>
          <AuthInput
            label="IBAN"
            placeholder="AE070331234567890123456"
            autoComplete="off"
            {...reg("iban")}
            error={errors.iban?.message}
          />
        </div>
        <div>
          <AuthInput
            label="Account Number"
            placeholder="1234567890"
            autoComplete="off"
            {...reg("accountNumber")}
            error={errors.accountNumber?.message}
          />
        </div>
      </FieldRow>

      <FieldRow>
        <div>
          <AuthInput
            label="SWIFT/BIC Code"
            placeholder="NBICUS33"
            autoComplete="off"
            {...reg("swift")}
            error={errors.swift?.message}
          />
        </div>
        <div>
          <AuthInput
            label="Branch Name"
            placeholder="Main Branch"
            autoComplete="off"
            {...reg("branch")}
            error={errors.branch?.message}
          />
        </div>
      </FieldRow>

      <FieldRow>
        <div>
          <AuthInput
            label="Branch Code"
            placeholder="001"
            autoComplete="off"
            {...reg("branchCode")}
            error={errors.branchCode?.message}
          />
        </div>
        <div>
          <AuthInput
            label="Bank Address"
            placeholder="456 Bank Street, City"
            autoComplete="street-address"
            {...reg("address")}
            error={errors.address?.message}
          />
        </div>
      </FieldRow>

      <ActionRow onBack={onBack} submitting={!!submitting || isSubmitting} />
    </form>
  );
}
