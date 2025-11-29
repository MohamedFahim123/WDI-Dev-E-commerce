"use client";

import * as React from "react";
import StoreInfoForm from "./StoreInfoForm/StoreInfoForm";
import AddressForm from "./AddressForm/AddressForm";
import KycForm from "./KycForm/KycForm";
import PayoutForm from "./PayoutForm/PayoutForm";
import { Stepper } from "./Stepper/Stepper";
import { submitStore } from "@/src/services/createStoreService";
import { useCreateStore } from "@/src/stores/StepsCreateStore";

export default function CreateStoreFullPage() {
  const step = useCreateStore((s) => s.step);
  const setStep = useCreateStore((s) => s.setStep);
  const [submitting, setSubmitting] = React.useState(false);
  const storeInfo = useCreateStore((s) => s.storeInfo);
  const addressInfo = useCreateStore((s) => s.addressInfo);
  const kycInfo = useCreateStore((s) => s.kycInfo);
  const payoutInfo = useCreateStore((s) => s.payoutInfo);

  async function handleFinalSubmit() {
    setSubmitting(true);
    try {
      const res = await submitStore({
        storeInfo,
        addressInfo,
        kycInfo,
        payoutInfo,
      });
      if (res.success) {
        setStep(4);
        alert("Submitted! Store ID: " + res.id);
      } else {
        alert("Submission failed");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-semibold">Create Your Store</h1>
        <p className="text-sm text-gray-500 mt-1">
          Complete all steps to activate your store (Maximum 5 stores per
          seller)
        </p>

        <div className="mt-6">
          <Stepper current={step} />
        </div>

        <div className="mt-6 mx-auto max-w-4xl">
          {step === 1 && <StoreInfoForm onNext={() => setStep(2)} />}
          {step === 2 && (
            <AddressForm onBack={() => setStep(1)} onNext={() => setStep(3)} />
          )}
          {step === 3 && (
            <KycForm onBack={() => setStep(2)} onNext={() => setStep(4)} />
          )}
          {step === 4 && (
            <PayoutForm
              onBack={() => setStep(3)}
              onSubmit={handleFinalSubmit}
              submitting={submitting}
            />
          )}
        </div>
      </div>
    </section>
  );
}
