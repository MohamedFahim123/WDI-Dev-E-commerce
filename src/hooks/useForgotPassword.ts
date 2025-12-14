"use client";

import { authService } from "@/src/services/authService";
import { useState } from "react";
import {
  ForgotPasswordStep1Input,
  forgotPasswordStep1Schema,
  ForgotPasswordStep2Input,
  forgotPasswordStep2Schema,
} from "../validation/ForgotPasswordSchemas";

type Step = 1 | 2;

type Step1Errors = Partial<Record<keyof ForgotPasswordStep1Input, string>> & {
  _form?: string;
};
type Step2Errors = Partial<Record<keyof ForgotPasswordStep2Input, string>> & {
  _form?: string;
};

export function useForgotPassword() {
  const [step, setStep] = useState<Step>(1);
  const [step1Values, setStep1Values] = useState<ForgotPasswordStep1Input>({
    email: "",
  });
  const [step2Values, setStep2Values] = useState<ForgotPasswordStep2Input>({
    email: "",
    otp: "",
  });

  const [step1Errors, setStep1Errors] = useState<Step1Errors>({});
  const [step2Errors, setStep2Errors] = useState<Step2Errors>({});
  const [submitting, setSubmitting] = useState(false);

  function updateStep1<K extends keyof ForgotPasswordStep1Input>(
    key: K,
    value: ForgotPasswordStep1Input[K]
  ) {
    setStep1Values((prev) => ({ ...prev, [key]: value }));
    setStep1Errors((prev) => ({ ...prev, [key]: undefined }));
  }

  function updateStep2<K extends keyof ForgotPasswordStep2Input>(
    key: K,
    value: ForgotPasswordStep2Input[K]
  ) {
    setStep2Values((prev) => ({ ...prev, [key]: value }));
    setStep2Errors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function submitStep1() {
    setSubmitting(true);
    setStep1Errors({});

    const parsed = forgotPasswordStep1Schema.safeParse(step1Values);
    if (!parsed.success) {
      const fieldErrors: Step1Errors = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as
          | keyof ForgotPasswordStep1Input
          | undefined;
        if (field) fieldErrors[field] = issue.message;
        else fieldErrors._form = issue.message;
      });
      setStep1Errors(fieldErrors);
      setSubmitting(false);
      return;
    }

    try {
      const { email } = await authService.forgotPasswordStep1(parsed.data);
      setStep2Values((prev) => ({ ...prev, email }));
      setStep(2);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to start reset flow";
      setStep1Errors((prev) => ({ ...prev, _form: message }));
    } finally {
      setSubmitting(false);
    }
  }

  async function submitStep2() {
    setSubmitting(true);
    setStep2Errors({});

    const parsed = forgotPasswordStep2Schema.safeParse(step2Values);
    if (!parsed.success) {
      const fieldErrors: Step2Errors = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as
          | keyof ForgotPasswordStep2Input
          | undefined;
        if (field) fieldErrors[field] = issue.message;
        else fieldErrors._form = issue.message;
      });
      setStep2Errors(fieldErrors);
      setSubmitting(false);
      return;
    }

    try {
      await authService.forgotPasswordStep2(parsed.data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to verify OTP";
      setStep2Errors((prev) => ({ ...prev, _form: message }));
    } finally {
      setSubmitting(false);
    }
  }

  return {
    step,
    submitting,
    step1Values,
    step1Errors,
    step2Values,
    step2Errors,
    updateStep1,
    updateStep2,
    submitStep1,
    submitStep2,
    setStep,
  };
}
