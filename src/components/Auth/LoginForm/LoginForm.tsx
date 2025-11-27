"use client";

import { useRouteLang } from "@/src/hooks/useLang";
import { useAuthStore } from "@/src/stores/authStore";
import { Eye, EyeOff, Globe2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthInput } from "../Fields/AuthInput";
import { useRouter } from "next/navigation";
import { setAuthCookieServer } from "@/src/lib/authCookies";

interface LoginFormValues {
  identifier: string;
  password: string;
}

export default function LoginForm() {
  const lang = useRouteLang();
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const isLoading = useAuthStore((s) => s.isInitializing);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    await login(values.identifier, values.password);

    const err = useAuthStore.getState().error;
    if (!err) {
      router.push(`/${lang}/buyer/profile`);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <header className="space-y-1 text-center">
        <h1 className="text-xl font-semibold sm:text-2xl">Welcome Back</h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Sign in to your account
        </p>
      </header>

      <AuthInput
        label="Phone / Email"
        placeholder="Enter phone or email"
        autoComplete="email"
        required
        error={errors.identifier?.message}
        {...register("identifier", {
          required: "Please enter your email or phone number",
        })}
      />

      <div className="space-y-1.5">
        <label htmlFor="login-password" className="text-xs font-medium">
          Password
        </label>

        <div className="relative">
          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="h-11 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 pr-10 text-sm focus:ring-2 focus:ring-[#8b5cf6]"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Minimum 8 characters" },
            })}
          />
          <button
            type="button"
            title={showPassword ? "Hide" : "Show"}
            name={showPassword ? "Hide" : "Show"}
            onClick={() => setShowPassword((p) => !p)}
            className="absolute cursor-pointer p-1 inset-y-0 right-2 flex items-center text-gray-500"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="text-[11px] text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="-mt-2 text-right">
        <Link
          href={`/${lang}/auth/forgot-password`}
          className="text-[11px] font-semibold text-primary hover:underline"
        >
          Forget Password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-1 h-11 w-full rounded-full bg-[#7C3AED] text-sm font-semibold text-white shadow-lg transition hover:bg-[#6D28D9] disabled:opacity-70"
      >
        {isLoading ? "Logging in…" : "Login"}
      </button>

      <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500">
        <span className="h-px flex-1 bg-gray-300" />
        <span className="font-semibold">DON{"'"}T HAVE AN ACCOUNT?</span>
        <span className="h-px flex-1 bg-gray-300" />
      </div>

      <Link
        href={`/${lang}/auth/register`}
        className="h-11 w-full rounded-full border border-gray-300 bg-white text-sm font-semibold hover:bg-gray-50 flex items-center justify-center"
      >
        Sign Up
      </Link>

      <div className="mt-2 flex items-center justify-center gap-1 text-xs text-gray-500">
        <Globe2 className="h-4 w-4" />
        <button
          type="button"
          className="flex items-center gap-1 rounded-full px-1.5 py-0.5 hover:bg-black/5"
        >
          <span>Language:</span>
          <span className="font-semibold text-black">{lang.toUpperCase()}</span>
        </button>
      </div>
    </form>
  );
}
