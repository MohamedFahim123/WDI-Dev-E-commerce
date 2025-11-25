"use client";

import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import { checkoutSchema } from "@/src/validation/CheckoutSchema";
import {
  ADDRESSES,
  CheckoutFormValues,
  PAYMENT_OPTIONS,
  SHIPPING_OPTIONS,
  Step,
} from "./Checkoutdata";
import CheckoutStepper from "./CheckoutStepper/CheckoutStepper";
import OrderSummary from "./OrderSummary/OrderSummary";

import AddressStep from "./Steps/AddressStep";
import ShippingStep from "./Steps/ShippingStep";
import PaymentStep from "./Steps/PaymentStep";
import ReviewStep from "./Steps/ReviewStep";
import { useRouter } from "next/navigation";
import { useRouteLang } from "@/src/hooks/useLang";

export default function CheckoutPage() {
  const [step, setStep] = React.useState<Step>(1);
  const lang = useRouteLang();
  const router = useRouter();

  const formMethods = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      addressId: ADDRESSES[0]?.id ?? "",
      shippingMethodId: SHIPPING_OPTIONS[0]?.id ?? "",
      paymentMethodId: PAYMENT_OPTIONS[0]?.id ?? "",
      notes: "",
    },
    mode: "onChange",
  });

  const { handleSubmit, trigger, watch, formState } = formMethods;

  const onSubmit = (data: CheckoutFormValues) => {
    console.log("Checkout submit", data);
    toast.success("Order placed successfully!");
    router.push(`/${lang}/successfull-order`);
  };

  const nextStep = async () => {
    let fields: (keyof CheckoutFormValues)[] = [];
    if (step === 1) fields = ["addressId"];
    if (step === 2) fields = ["shippingMethodId"];
    if (step === 3) fields = ["paymentMethodId"];

    if (fields.length) {
      const valid = await trigger(fields);
      if (!valid) return;
    }

    setStep((prev) => (prev < 4 ? ((prev + 1) as Step) : prev));
  };

  const previousStep = () => {
    if (step === 1) {
      router.push(`/${lang}/cart`);
    }
    setStep((prev) => (prev > 1 ? ((prev - 1) as Step) : prev));
  };

  const subtotal = 339.99;
  const shippingOption =
    SHIPPING_OPTIONS.find((s) => s.id === watch("shippingMethodId")) ??
    SHIPPING_OPTIONS[0];
  const shipping = shippingOption.price;
  const vat = 51.99;
  const discount = 20;
  const total = subtotal + shipping + vat - discount;

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold tracking-tight text-[#111827]">
            Checkout
          </h2>

          <CheckoutStepper step={step} />

          <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,2.1fr)_minmax(260px,0.9fr)]">
            <div className="flex flex-col gap-6">
              {step === 1 && <AddressStep />}
              {step === 2 && <ShippingStep />}
              {step === 3 && <PaymentStep />}
              {step === 4 && <ReviewStep />}

              <div className="flex flex-col-reverse gap-3 pt-1 md:flex-row md:items-center md:justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={previousStep}
                  className="w-full rounded-full border-[#d4d4d8] bg-white text-[13px] font-medium text-[#4b5563] md:w-[140px]"
                >
                  Back
                </Button>

                {step === 4 ? (
                  <Button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    disabled={formState.isSubmitting}
                    className="w-full rounded-full bg-[#7C3BED] text-[13px] font-medium text-white hover:bg-[#6d28d9] md:w-[260px]"
                  >
                    {formState.isSubmitting
                      ? "Placing order..."
                      : "Place order"}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="w-full rounded-full bg-[#7C3BED] text-[13px] font-medium text-white hover:bg-[#6d28d9] md:w-[260px]"
                  >
                    Continue
                  </Button>
                )}
              </div>
            </div>

            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              vat={vat}
              discount={discount}
              total={total}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
