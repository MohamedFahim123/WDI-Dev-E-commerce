"use client";

import { useRouteLang } from "@/src/hooks/useLang";
import {
  RegisterBuyerAction,
  RegisterSellerAction,
  VerifyOtpAction,
  ResendOtpAction,
} from "@/src/services/auth.service";
import { Globe2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import RegisterDetailsStep from "./RegisterDetailsStep";
import RegisterEmailStep from "./RegisterEmailStep";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type RegisterStep = "details" | "otp";

export interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;

  emailOtp: string;

  role: "buyer" | "seller";
  name: string;
  companyName: string;

  phoneNumber: string;
}

export default function RegisterForm() {
  const lang = useRouteLang();
  const [step, setStep] = useState<RegisterStep>("details");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      emailOtp: "",
      role: "buyer",
      name: "",
      companyName: "",
      phoneNumber: "",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const passwordValue = watch("password");
  const emailValue = watch("email");
  const roleValue = watch("role");

  async function onSubmit(values: RegisterFormValues) {
    try {
      if (step === "details") {
        if (values.role === "buyer") {
          const res = await RegisterBuyerAction(values);
          toast.success(res.message || "OTP sent to your email", {
            duration: 1500,
          });
          setValue("phoneNumber", "");
          setValue("companyName", "");
          setValue("password", "");
          setValue("confirmPassword", "");
          setValue("name","")
          setStep("otp");
        } else {
          const res = await RegisterSellerAction(values);
          toast.success(res.message || "OTP sent to your email", {
            duration: 1500,
          });
        }

        setStep("otp");
        return;
      }

      const res = await VerifyOtpAction({
        role: values.role,
        email: values.email,
        otp: values.emailOtp,
      });

      toast.success(res.message || "Verified successfully", { duration: 1500 });
      router.push(`/${lang}/auth/login`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Request failed";
      toast.error(msg, { duration: 3000 });
    }
  }

  const progressWidth = step === "details" ? "w-1/2" : "w-full";

  const stepLabelClass = (s: RegisterStep) =>
    `flex-1 text-center text-xs font-medium ${
      step === s ? "text-[#7C3AED]" : "text-muted-foreground"
    }`;

  const subtitle =
    step === "details" ? "Fill in your details to get started" : "Verify OTP";

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <header className="space-y-1 text-center">
          <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
            Create Account
          </h1>
          <p className="text-xs text-muted-foreground sm:text-sm">{subtitle}</p>
        </header>

        <div className="mt-2">
          <div className="relative h-1 rounded-full bg-[#E4E4E7]">
            <div
              className={`absolute left-0 top-0 h-1 rounded-full bg-[#7C3AED] transition-all duration-300 ${progressWidth}`}
            />
          </div>
          <div className="mt-2 flex justify-between">
            <span title="Details" className={stepLabelClass("details")}>
              Details
            </span>
            <span title="OTP" className={stepLabelClass("otp")}>
              OTP
            </span>
          </div>
        </div>

        {step === "details" && (
          <RegisterDetailsStep
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            passwordValue={passwordValue}
            roleValue={roleValue}
          />
        )}

        {step === "otp" && (
          <RegisterEmailStep
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            emailValue={emailValue}
            onResend={async () => {
              try {
                const res = await ResendOtpAction({
                  role: roleValue,
                  email: emailValue,
                });
                toast.success(res.message || "OTP resent", { duration: 1500 });
              } catch (e) {
                const msg = e instanceof Error ? e.message : "Resend failed";
                toast.error(msg, { duration: 3000 });
              }
            }}
          />
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
    </>
  );
}
