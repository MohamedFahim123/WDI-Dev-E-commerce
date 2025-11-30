"use client";

import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import * as React from "react";

import { useRouteLang } from "@/src/hooks/useLang";
import { submitStore } from "@/src/services/createStoreService";
import { useCreateStore } from "@/src/stores/StepsCreateStore";
import { useAuthStore } from "@/src/stores/authStore";
import AddressFormSkeleton from "../Skeletons/CreateStore/AddressFormSkeleton";
import KycFormSkeleton from "../Skeletons/CreateStore/KycFormSkeleton";
import PayoutFormSkeleton from "../Skeletons/CreateStore/PayoutFormSkeleton";
import StepperSkeleton from "../Skeletons/CreateStore/StepperSkeleton";
import StoreInfoFormSkeleton from "../Skeletons/CreateStore/StoreInfoFormSkeleton";

const Stepper = dynamic(
  () => import("./Stepper/Stepper").then((m) => m.Stepper),
  { loading: () => <StepperSkeleton />, ssr: false }
);

const StoreInfoForm = dynamic(
  () => import("./StoreInfoForm/StoreInfoForm").then((m) => m.default),
  { loading: () => <StoreInfoFormSkeleton />, ssr: false }
);

const AddressForm = dynamic(
  () => import("./AddressForm/AddressForm").then((m) => m.default),
  { loading: () => <AddressFormSkeleton />, ssr: false }
);

const KycForm = dynamic(
  () => import("./KycForm/KycForm").then((m) => m.default),
  { loading: () => <KycFormSkeleton />, ssr: false }
);

const PayoutForm = dynamic(
  () => import("./PayoutForm/PayoutForm").then((m) => m.default),
  { loading: () => <PayoutFormSkeleton />, ssr: false }
);

export default function CreateStoreFullPage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const step = useCreateStore((s) => s.step);
  const setStep = useCreateStore((s) => s.setStep);
  const [submitting, setSubmitting] = React.useState(false);
  const storeInfo = useCreateStore((s) => s.storeInfo);
  const addressInfo = useCreateStore((s) => s.addressInfo);
  const kycInfo = useCreateStore((s) => s.kycInfo);
  const payoutInfo = useCreateStore((s) => s.payoutInfo);
  const lang = useRouteLang();

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

  if (isAuthenticated) {
    redirect(`/${lang}`);
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
