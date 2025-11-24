"use client";

import { useState } from "react";
import {
  registerStep1Schema,
  registerStep2Schema,
  registerStep3Schema,
  RegisterStep1Input,
  RegisterStep2Input,
  RegisterStep3Input,
} from "../validation/RegisterSchemas";
import { authService } from "@/src/services/authService";
import { useAuthStore } from "@/src/stores/authStore";

type Step = 1 | 2 | 3;

type Step1Errors = Partial<Record<keyof RegisterStep1Input, string>> & {
  _form?: string;
};
type Step2Errors = Partial<Record<keyof RegisterStep2Input, string>> & {
  _form?: string;
};
type Step3Errors = Partial<Record<keyof RegisterStep3Input, string>> & {
  _form?: string;
};

export function useRegister() {
  const [step, setStep] = useState<Step>(1);

  const [step1Values, setStep1Values] = useState<RegisterStep1Input>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [step2Values, setStep2Values] = useState<RegisterStep2Input>({
    email: "",
    otp: "",
  });
  const [step3Values, setStep3Values] = useState<RegisterStep3Input>({
    email: "",
    countryCode: "",
    phone: "",
  });

  const [step1Errors, setStep1Errors] = useState<Step1Errors>({});
  const [step2Errors, setStep2Errors] = useState<Step2Errors>({});
  const [step3Errors, setStep3Errors] = useState<Step3Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const { setUser, setAuthenticated, setError } = useAuthStore();

  // generic change helpers
  function updateStep1<K extends keyof RegisterStep1Input>(
    key: K,
    value: RegisterStep1Input[K]
  ) {
    setStep1Values((prev) => ({ ...prev, [key]: value }));
    setStep1Errors((prev) => ({ ...prev, [key]: undefined }));
  }

  function updateStep2<K extends keyof RegisterStep2Input>(
    key: K,
    value: RegisterStep2Input[K]
  ) {
    setStep2Values((prev) => ({ ...prev, [key]: value }));
    setStep2Errors((prev) => ({ ...prev, [key]: undefined }));
  }

  function updateStep3<K extends keyof RegisterStep3Input>(
    key: K,
    value: RegisterStep3Input[K]
  ) {
    setStep3Values((prev) => ({ ...prev, [key]: value }));
    setStep3Errors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function submitStep1() {
    setSubmitting(true);
    setError(null);
    setStep1Errors({});

    const parsed = registerStep1Schema.safeParse(step1Values);
    if (!parsed.success) {
      const fieldErrors: Step1Errors = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof RegisterStep1Input | undefined;
        if (field) fieldErrors[field] = issue.message;
        else fieldErrors._form = issue.message;
      });
      setStep1Errors(fieldErrors);
      setSubmitting(false);
      return;
    }

    try {
      const { email } = await authService.registerStep1(parsed.data);
      setStep2Values((prev) => ({ ...prev, email }));
      setStep3Values((prev) => ({ ...prev, email }));
      setStep(2);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to start registration";
      setError(message);
      setStep1Errors((prev) => ({ ...prev, _form: message }));
    } finally {
      setSubmitting(false);
    }
  }

  async function submitStep2() {
    setSubmitting(true);
    setError(null);
    setStep2Errors({});

    const parsed = registerStep2Schema.safeParse(step2Values);
    if (!parsed.success) {
      const fieldErrors: Step2Errors = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof RegisterStep2Input | undefined;
        if (field) fieldErrors[field] = issue.message;
        else fieldErrors._form = issue.message;
      });
      setStep2Errors(fieldErrors);
      setSubmitting(false);
      return;
    }

    try {
      await authService.registerStep2(parsed.data);
      setStep(3);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to verify OTP";
      setError(message);
      setStep2Errors((prev) => ({ ...prev, _form: message }));
    } finally {
      setSubmitting(false);
    }
  }

  async function submitStep3() {
    setSubmitting(true);
    setError(null);
    setStep3Errors({});

    const parsed = registerStep3Schema.safeParse(step3Values);
    if (!parsed.success) {
      const fieldErrors: Step3Errors = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof RegisterStep3Input | undefined;
        if (field) fieldErrors[field] = issue.message;
        else fieldErrors._form = issue.message;
      });
      setStep3Errors(fieldErrors);
      setSubmitting(false);
      return;
    }

    try {
      const res = await authService.registerStep3(parsed.data);
      setUser(res.user);
      setAuthenticated(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to complete registration";
      setError(message);
      setStep3Errors((prev) => ({ ...prev, _form: message }));
    } finally {
      setSubmitting(false);
    }
  }

  return {
    step,
    submitting,
    step1Values,
    step2Values,
    step3Values,
    step1Errors,
    step2Errors,
    step3Errors,
    updateStep1,
    updateStep2,
    updateStep3,
    submitStep1,
    submitStep2,
    submitStep3,
    setStep,
  };
}
