"use client";

import { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { authService } from "../services/authService";
import { LoginInput, loginSchema } from "../validation/LoginSchema";

type LoginErrors = Partial<Record<keyof LoginInput, string>> & {
  _form?: string;
};

export function useLogin() {
  const [values, setValues] = useState<LoginInput>({
    identifier: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const { setUser, setAuthenticated, setError } = useAuthStore();

  function handleChange<K extends keyof LoginInput>(
    key: K,
    value: LoginInput[K]
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    setErrors({});

    const parsed = loginSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: LoginErrors = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof LoginInput | undefined;
        if (field) {
          fieldErrors[field] = issue.message;
        } else {
          fieldErrors._form = issue.message;
        }
      });
      setErrors(fieldErrors);
      setSubmitting(false);
      return;
    }

    try {
      const res = await authService.login(parsed.data);
      setUser(res.user);
      setAuthenticated(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to login";
      setError(message);
      setErrors((prev) => ({ ...prev, _form: message }));
    } finally {
      setSubmitting(false);
    }
  }

  return {
    values,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  };
}
