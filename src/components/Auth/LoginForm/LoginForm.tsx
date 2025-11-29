"use client";

import { useRouteLang } from "@/src/hooks/useLang";
import { useAuthStore } from "@/src/stores/authStore";
import { Eye, EyeOff, Globe2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthInput } from "../Fields/AuthInput";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInput, loginSchema } from "@/src/validation/LoginSchema";

export default function LoginForm() {
  const lang = useRouteLang();
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const isLoading = useAuthStore((s) => s.isInitializing);
  const authError = useAuthStore((s) => s.error);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
      role: "buyer",
    },
  });

  async function onSubmit(values: LoginInput) {
    await login(values);

    const err = useAuthStore.getState().error;
    if (!err) {
      router.push(`/${lang}/${values.role}/profile`);
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
        {...register("identifier")}
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
            {...register("password")}
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
      <div className="space-y-1.5">
        <span className="text-xs font-medium">Login as</span>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <input
              type="radio"
              id="login-role-buyer"
              value="buyer"
              className="peer hidden"
              {...register("role")}
            />
            <label
              htmlFor="login-role-buyer"
              className="flex h-11 w-full cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-gray-50 text-xs sm:text-sm font-medium text-gray-700 transition
                   hover:bg-gray-100
                   peer-checked:border-[#8b5cf6] peer-checked:bg-[#ede9fe] peer-checked:text-[#4c1d95] peer-checked:shadow-sm"
            >
              Buyer
            </label>
          </div>

          <div>
            <input
              type="radio"
              id="login-role-seller"
              value="seller"
              className="peer hidden"
              {...register("role")}
            />
            <label
              htmlFor="login-role-seller"
              className="flex h-11 w-full cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-gray-50 text-xs sm:text-sm font-medium text-gray-700 transition
                   hover:bg-gray-100
                   peer-checked:border-[#8b5cf6] peer-checked:bg-[#ede9fe] peer-checked:text-[#4c1d95] peer-checked:shadow-sm"
            >
              Seller
            </label>
          </div>
        </div>

        {errors.role && (
          <p className="text-[11px] text-red-500">{errors.role.message}</p>
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

      {authError && (
        <p className="text-[11px] text-red-500 text-center">{authError}</p>
      )}

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
