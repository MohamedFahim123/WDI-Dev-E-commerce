import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AuthInput } from "../Fields/AuthInput";
import { RegisterFormValues } from "./RegisterForm";

export interface StepBaseProps {
  register: UseFormRegister<RegisterFormValues>;
  errors: FieldErrors<RegisterFormValues>;
  isSubmitting: boolean;
}

function RegisterDetailsStep({
  register,
  errors,
  isSubmitting,
  passwordValue,
  roleValue,
}: StepBaseProps & { passwordValue: string; roleValue: "buyer" | "seller" }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="mt-4 space-y-4">
      <AuthInput
        label="User Name"
        placeholder="User Name"
        required
        error={errors.name?.message}
        {...register("name", { required: "User Name is required" })}
      />

      <AuthInput
        label="Phone Number"
        placeholder="501234567"
        autoComplete="tel"
        required
        error={errors.phoneNumber?.message}
        {...register("phoneNumber", { required: "Phone number is required" })}
      />
      <AuthInput
        label="Email Address"
        placeholder="you@example.com"
        autoComplete="email"
        required
        error={errors.email?.message}
        {...register("email", { required: "Email is required" })}
      />

      <div className="space-y-1.5">
        <label
          htmlFor="register-password"
          className="text-xs font-medium text-foreground"
        >
          Password
        </label>

        <div className="relative">
          <input
            id="register-password"
            type={showPassword ? "text" : "password"}
            placeholder="Min 8 characters"
            className="h-11 w-full rounded-lg border border-[#E4E4E7] bg-[#F5F5F7] px-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent"
            autoComplete="new-password"
            aria-invalid={!!errors.password || undefined}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute cursor-pointer inset-y-0 right-2 flex items-center rounded-full p-1.5 text-muted-foreground hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8b5cf6]"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="text-[11px] font-medium text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="register-confirm-password"
          className="text-xs font-medium text-foreground"
        >
          Re-enter Password
        </label>

        <div className="relative">
          <input
            id="register-confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            className="h-11 w-full rounded-lg border border-[#E4E4E7] bg-[#F5F5F7] px-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent"
            autoComplete="new-password"
            aria-invalid={!!errors.confirmPassword || undefined}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === passwordValue || "Passwords do not match",
            })}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((p) => !p)}
            className="absolute cursor-pointer inset-y-0 right-2 flex items-center rounded-full p-1.5 text-muted-foreground hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8b5cf6]"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {errors.confirmPassword && (
          <p className="text-[11px] font-medium text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <span className="text-xs font-medium">Register as</span>

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
              className="flex h-11 w-full cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-gray-50 text-xs sm:text-sm font-medium text-gray-700 transition hover:bg-gray-100
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
              className="flex h-11 w-full cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-gray-50 text-xs sm:text-sm font-medium text-gray-700 transition hover:bg-gray-100
              peer-checked:border-[#8b5cf6] peer-checked:bg-[#ede9fe] peer-checked:text-[#4c1d95] peer-checked:shadow-sm"
            >
              Seller
            </label>
          </div>
        </div>
      </div>

      {roleValue === "seller" && (
        <AuthInput
          label="Company Name"
          placeholder="Company Name"
          required
          error={errors.companyName?.message}
          {...register("companyName", {
            required: "Company Name is required",
          })}
        />
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 cursor-pointer h-11 w-full rounded-full bg-[#7C3AED] text-sm font-semibold text-white shadow-[0_6px_18px_rgba(124,58,237,0.45)] transition hover:bg-[#6D28D9] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Sending OTP…" : "Continue"}
      </button>
    </div>
  );
}

export default RegisterDetailsStep;
