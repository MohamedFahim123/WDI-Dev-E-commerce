"use client";

import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

import { useCreateStoreWizard } from "@/src/hooks/useCreateStoreWizard";
import { useRouteLang } from "@/src/hooks/useLang";
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
  const lang = useRouteLang();

  const {
    state,
    step,
    setStep,
    pending,
    clearClientError,
    clearServerError,
    getServerErrorsForStep,
    getServerErrorsVersionForStep,
    guardStep,
    handleFinalSubmit,
  } = useCreateStoreWizard();

  if (isAuthenticated) redirect(`/${lang}`);

  const storeServerErrors = getServerErrorsForStep(1);
  const addressServerErrors = getServerErrorsForStep(2);
  const kycServerErrors = getServerErrorsForStep(3);
  const payoutServerErrors = getServerErrorsForStep(4);

  return (
    <section className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4">
        {!state.ok && state.message ? (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {state.message}
          </div>
        ) : null}

        <div className="mt-6">
          <Stepper current={step} />
        </div>

        <div className="mt-6 mx-auto max-w-4xl">
          {step === 1 && (
            <StoreInfoForm
              onNext={() => guardStep(1, () => setStep(2))}
              serverErrors={storeServerErrors}
              serverErrorsVersion={getServerErrorsVersionForStep(1)}
              clearClientError={clearClientError}
              clearServerError={clearServerError}
            />
          )}

          {step === 2 && (
            <AddressForm
              onBack={() => setStep(1)}
              onNext={() => guardStep(2, () => setStep(3))}
              serverErrors={addressServerErrors}
              serverErrorsVersion={getServerErrorsVersionForStep(2)}
              clearClientError={clearClientError}
              clearServerError={clearServerError}
            />
          )}

          {step === 3 && (
            <KycForm
              onBack={() => setStep(2)}
              onNext={() => guardStep(3, () => setStep(4))}
              serverErrors={kycServerErrors}
              serverErrorsVersion={getServerErrorsVersionForStep(3)}
              clearClientError={clearClientError}
              clearServerError={clearServerError}
            />
          )}

          {step === 4 && (
            <PayoutForm
              onBack={() => setStep(3)}
              onSubmit={handleFinalSubmit}
              submitting={pending}
              serverErrors={payoutServerErrors}
              serverErrorsVersion={getServerErrorsVersionForStep(4)}
              clearClientError={clearClientError}
              clearServerError={clearServerError}
            />
          )}
        </div>
      </div>
    </section>
  );
}
