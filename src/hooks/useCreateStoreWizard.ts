"use client";

import * as React from "react";
import { useActionState } from "react";
import { toast } from "sonner";

import { createStoreAction } from "@/src/services/createStoreAction";
import { useCreateStore } from "@/src/stores/StepsCreateStore";
import {
    initialCreateStoreState,
    type CreateStoreActionState,
} from "@/src/types/createStore.types";

import {
    StepId,
    minStepFromErrors,
    pickErrorsForStep,
    replaceErrorsForStep,
    stableErrorsVersion,
} from "@/src/lib/createStoreWizard";

import {
    validateAllClient,
    validateStepClient,
} from "@/src/validation/createStoreWizardClientSchemas";

export function useCreateStoreWizard() {
  const step = useCreateStore((s) => s.step);
  const setStep = useCreateStore((s) => s.setStep);

  const [rawState, dispatch, pending] = useActionState<
    CreateStoreActionState,
    FormData
  >(createStoreAction, initialCreateStoreState);

  const state = rawState ?? initialCreateStoreState;
  const serverFieldErrors = state.fieldErrors ?? {};

  const [visibleServerErrors, setVisibleServerErrors] = React.useState<
    Record<string, string>
  >({});
  const [clientFieldErrors, setClientFieldErrors] = React.useState<
    Record<string, string>
  >({});

  const clearClientError = React.useCallback((key: string) => {
    setClientFieldErrors((prev) => {
      if (!prev?.[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const clearServerError = React.useCallback((key: string) => {
    setVisibleServerErrors((prev) => {
      if (!prev?.[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  React.useEffect(() => {
    if (state.ok) return;

    setVisibleServerErrors(serverFieldErrors);
    const min = minStepFromErrors(serverFieldErrors);
    if (min) setStep(min);
  }, [state.ok, serverFieldErrors, setStep]);

  React.useEffect(() => {
    if (!state.message) return;
    if (state.ok) toast.success(state.message);
    else toast.error(state.message);
  }, [state.ok, state.message]);

  React.useEffect(() => {
    if (!state.ok) return;

    useCreateStore.getState().reset();
    setClientFieldErrors({});
    setVisibleServerErrors({});
    setStep(1);
  }, [state.ok, setStep]);

  const getServerErrorsForStep = React.useCallback(
    (s: StepId) => pickErrorsForStep(visibleServerErrors, s),
    [visibleServerErrors]
  );

  const getServerErrorsVersionForStep = React.useCallback(
    (s: StepId) => stableErrorsVersion(getServerErrorsForStep(s)),
    [getServerErrorsForStep]
  );

  const guardStep = React.useCallback(
    (currentStep: StepId, onPass: () => void) => {
      const serverErrs = pickErrorsForStep(visibleServerErrors, currentStep);
      if (Object.keys(serverErrs).length > 0) {
        toast.error("Please fix the errors before continuing.");
        setStep(currentStep);
        return;
      }

      const errs = validateStepClient(currentStep);
      if (Object.keys(errs).length > 0) {
        setClientFieldErrors((prev) =>
          replaceErrorsForStep(prev, currentStep, errs)
        );
        setStep(currentStep);
        toast.error("Please fix the errors before continuing.");
        return;
      }

      setClientFieldErrors((prev) =>
        replaceErrorsForStep(prev, currentStep, {})
      );
      onPass();
    },
    [setStep, visibleServerErrors]
  );

  const handleFinalSubmit = React.useCallback(() => {
    if (pending) return;

    if (Object.keys(visibleServerErrors).length > 0) {
      const min = minStepFromErrors(visibleServerErrors);
      if (min) setStep(min);
      toast.error("Please fix the errors before submitting.");
      return;
    }

    const allErrs = validateAllClient();
    if (Object.keys(allErrs).length > 0) {
      setClientFieldErrors(allErrs);
      const min = minStepFromErrors(allErrs);
      if (min) setStep(min);
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setClientFieldErrors({});

    const { storeInfo, addressInfo, kycInfo, payoutInfo } =
      useCreateStore.getState();

    const fd = new FormData();
    fd.append("storeInfo", JSON.stringify(storeInfo));
    fd.append("addressInfo", JSON.stringify(addressInfo));
    fd.append("kycInfo", JSON.stringify(kycInfo));
    fd.append("payoutInfo", JSON.stringify(payoutInfo));

    if (kycInfo.idFront) fd.append("idFront", kycInfo.idFront);
    if (kycInfo.idBack) fd.append("idBack", kycInfo.idBack);
    if (kycInfo.selfie) fd.append("selfie", kycInfo.selfie);
    if (kycInfo.proofOfAddress)
      fd.append("proofOfAddress", kycInfo.proofOfAddress);

    React.startTransition(() => dispatch(fd));
  }, [dispatch, pending, setStep, visibleServerErrors]);

  return {
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

    clientFieldErrors,
    visibleServerErrors,
  };
}
