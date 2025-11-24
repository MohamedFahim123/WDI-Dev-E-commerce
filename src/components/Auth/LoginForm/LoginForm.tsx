"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Globe2 } from "lucide-react";
import { useAuthStore } from "@/src/stores/authStore";
import { useLogin } from "@/src/hooks/useLogin";
import { AuthInput } from "../Fields/AuthInput";
import { useRouteLang } from "@/src/hooks/useLang";

export default function LoginForm() {
  const lang = useRouteLang();
  const { values, errors, submitting, handleChange, handleSubmit } = useLogin();
  const { error: globalError } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await handleSubmit();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-3"
      aria-describedby={globalError ? "login-global-error" : undefined}
    >
      <header className="space-y-1 text-center">
        <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
          Welcome Back
        </h1>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Sign in to your account
        </p>
      </header>

      {globalError && (
        <p
          id="login-global-error"
          className="rounded-md bg-red-50 px-3 py-2 text-[11px] font-medium text-red-600"
          role="alert"
          aria-live="polite"
        >
          {globalError}
        </p>
      )}

      <AuthInput
        label="Phone / Email"
        placeholder="Enter phone or email"
        autoComplete="email"
        required
        value={values.identifier}
        onChange={(e) => handleChange("identifier", e.target.value)}
        error={errors.identifier}
      />

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="login-password"
            className="text-xs font-medium text-foreground"
          >
            Password
          </label>
        </div>

        <div className="relative">
          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="h-11 w-full rounded-lg border border-[#E4E4E7] bg-[#F5F5F7] px-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent"
            autoComplete="current-password"
            required
            aria-invalid={!!errors.password || undefined}
            aria-describedby={
              errors.password ? "login-password-error" : undefined
            }
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

        {errors.password && (
          <p
            id="login-password-error"
            className="text-[11px] font-medium text-red-500"
            role="alert"
          >
            {errors.password}
          </p>
        )}
      </div>

      <div className="-mt-2 text-right">
        <Link
          href="/auth/forgot-password"
          className="text-[11px] font-semibold text-primary hover:underline"
        >
          Forget Password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-1 cursor-pointer h-11 w-full rounded-full bg-[#7C3AED] text-sm font-semibold text-white shadow-[0_6px_18px_rgba(124,58,237,0.45)] transition hover:bg-[#6D28D9] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? "Logging in…" : "Login"}
      </button>

      <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
        <span className="h-px flex-1 bg-[#E4E4E7]" />
        <span className="font-semibold tracking-wide">
          DON&apos;T HAVE AN ACCOUNT?
        </span>
        <span className="h-px flex-1 bg-[#E4E4E7]" />
      </div>

      <Link
        href={`/${lang}/auth/register`}
        className="h-11 w-full rounded-full border border-[#E4E4E7] bg-white text-center text-sm font-semibold text-foreground hover:bg-[#F5F5F7] transition inline-flex items-center justify-center"
      >
        Sign Up
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
