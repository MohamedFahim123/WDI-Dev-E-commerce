"use client";

import { useRouteLang } from "@/src/hooks/useLang";
import { useAuthStore } from "@/src/stores/authStore";
import { Check, ChevronDown, Eye, EyeOff, Globe2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { AuthInput } from "../Fields/AuthInput";

type RegisterStep = "details" | "email" | "phone";

export default function RegisterForm() {
  const lang = useRouteLang();
  const { error: globalError } = useAuthStore();

  const [step, setStep] = useState<RegisterStep>("details");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    emailOtp: "",
    countryCode: "+971 [UAE]",
    phoneNumber: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof typeof values, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    try {
      if (step === "details") {
        setStep("email");
      } else if (step === "email") {
        setStep("phone");
      } else {
      }
    } finally {
      setSubmitting(false);
    }
  }

  const progressWidth =
    step === "details" ? "w-1/3" : step === "email" ? "w-2/3" : "w-full";

  const stepLabelClass = (s: RegisterStep) =>
    `flex-1 text-center text-xs font-medium ${
      step === s ? "text-[#7C3AED]" : "text-muted-foreground"
    }`;

  const subtitle =
    step === "details"
      ? "Fill in your details to get started"
      : step === "email"
      ? "Verify your email address"
      : "Verify your phone number";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3"
      aria-describedby={globalError ? "register-global-error" : undefined}
    >
      <header className="space-y-1 text-center">
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
          Create Account
        </h1>
        <p className="text-xs text-muted-foreground sm:text-sm">{subtitle}</p>
      </header>

      {globalError && (
        <p
          id="register-global-error"
          className="rounded-md bg-red-50 px-3 py-2 text-[11px] font-medium text-red-600"
          role="alert"
          aria-live="polite"
        >
          {globalError}
        </p>
      )}

      <div className="mt-2">
        <div className="relative h-1 rounded-full bg-[#E4E4E7]">
          <div
            className={`absolute left-0 top-0 h-1 rounded-full bg-[#7C3AED] transition-all duration-300 ${progressWidth}`}
          />
        </div>
        <div className="mt-2 flex justify-between">
          <span title="Details" className={stepLabelClass("details")}>Details</span>
          <span title="Email" className={stepLabelClass("email")}>Email</span>
          <span title="Phone" className={stepLabelClass("phone")}>Phone</span>
        </div>
      </div>

      {step === "details" && (
        <div className="mt-4 space-y-4">
          <AuthInput
            label="Email Address"
            placeholder="you@example.com"
            autoComplete="email"
            required
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="register-password"
                className="text-xs font-medium text-foreground"
              >
                Password
              </label>
            </div>

            <div className="relative">
              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                placeholder="Min 8 characters"
                className="h-11 w-full rounded-lg border border-[#E4E4E7] bg-[#F5F5F7] px-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent"
                autoComplete="new-password"
                required
                value={values.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-2 flex items-center rounded-full p-1.5 text-muted-foreground hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8b5cf6]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>

            <p className="text-[11px] text-muted-foreground">
              Must include 1 uppercase, 1 lowercase, and 1 number
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="register-confirm-password"
                className="text-xs font-medium text-foreground"
              >
                Re-enter Password
              </label>
            </div>

            <div className="relative">
              <input
                id="register-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="h-11 w-full rounded-lg border border-[#E4E4E7] bg-[#F5F5F7] px-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent"
                autoComplete="new-password"
                required
                value={values.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute inset-y-0 right-2 flex items-center rounded-full p-1.5 text-muted-foreground hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8b5cf6]"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 h-11 w-full rounded-full bg-[#7C3AED] text-sm font-semibold text-white shadow-[0_6px_18px_rgba(124,58,237,0.45)] transition hover:bg-[#6D28D9] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Signing up…" : "Sign Up"}
          </button>
        </div>
      )}

      {step === "email" && (
        <div className="mt-4 space-y-5">
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F3FF]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7C3AED] text-white">
                <Check className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground sm:text-sm">
              We&apos;ve sent a 6-digit code to{" "}
              <span className="font-semibold text-foreground">
                {values.email || "your email"}
              </span>
            </p>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="register-email-otp"
              className="text-xs font-medium text-foreground"
            >
              Enter OTP
            </label>
            <input
              id="register-email-otp"
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="000000"
              className="h-11 w-full rounded-lg border border-[#E4E4E7] bg-[#F5F5F7] px-3 text-center text-sm tracking-[0.4em] text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent"
              value={values.emailOtp}
              onChange={(e) => handleChange("emailOtp", e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-1 h-11 w-full rounded-full bg-[#7C3AED] text-sm font-semibold text-white shadow-[0_6px_18px_rgba(124,58,237,0.45)] transition hover:bg-[#6D28D9] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Verifying…" : "Verify Email"}
          </button>

          <button
            type="button"
            className="mt-1 text-center text-xs font-semibold text-foreground hover:underline"
          >
            Resend OTP
          </button>
        </div>
      )}

      {step === "phone" && (
        <div className="mt-4 space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="register-country-code"
              className="text-xs font-medium text-foreground"
            >
              Country Code
            </label>
            <div className="relative">
              <select
                id="register-country-code"
                className="h-11 w-full appearance-none rounded-lg border border-[#E4E4E7] bg-[#F5F5F7] px-3 pr-9 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent"
                value={values.countryCode}
                onChange={(e) => handleChange("countryCode", e.target.value)}
              >
                <option value="+971 [UAE]">+971 [UAE]</option>
                <option value="+966 [KSA]">+966 [KSA]</option>
                <option value="+974 [Qatar]">+974 [Qatar]</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
          </div>

          <AuthInput
            label="Phone Number"
            placeholder="501234567"
            autoComplete="tel"
            required
            value={values.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
          />
        </div>
      )}

      <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
        <span className="h-px flex-1 bg-[#E4E4E7]" />
        <span className="font-semibold tracking-wide">
          ALREADY HAVE AN ACCOUNT?
        </span>
        <span className="h-px flex-1 bg-[#E4E4E7]" />
      </div>

      <Link
        href={`/${lang}/auth/login`}
        className="h-11 w-full rounded-full border border-[#E4E4E7] bg-white text-center text-sm font-semibold text-foreground hover:bg-[#F5F5F7] transition inline-flex items-center justify-center"
      >
        Login
      </Link>

      <div className="mt-2 flex items-center justify-center gap-1 text-xs text-muted-foreground">
        <Globe2 className="h-4 w-4" aria-hidden="true" />
        <button
          type="button"
          className="flex items-center gap-1 rounded-full px-1.5 py-0.5 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6]"
          aria-label="Change language"
        >
          <span>Language:</span>
          <span className="font-semibold text-foreground">
            {lang.toUpperCase()}
          </span>
        </button>
      </div>
    </form>
  );
}
