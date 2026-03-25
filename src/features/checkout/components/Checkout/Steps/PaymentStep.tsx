"use client";

import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { cn } from "@/src/lib/utils";

import { CheckoutFormValues, PAYMENT_OPTIONS } from "../Checkoutdata";

const PaymentStep: React.FC = () => {
  const { control } = useFormContext<CheckoutFormValues>();

  return (
    <Card className="rounded-2xl border border-[#f1f1f3] bg-white shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-[14px] font-semibold text-[#111827]">
          Payment Method
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pb-5">
        <Controller
          name="paymentMethodId"
          control={control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              className="flex flex-col gap-3"
              onValueChange={(val) => field.onChange(val)}
            >
              {PAYMENT_OPTIONS.map((option) => {
                const selected = field.value === option.id;

                return (
                  <label
                    key={option.id}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-4 text-xs transition-colors",
                      selected
                        ? "border-[#7C3BED] bg-[#FFEFE4]"
                        : "border-[#f3f4f6] bg-white hover:border-[#e5e7eb]"
                    )}
                  >
                    <RadioGroupItem
                      value={option.id}
                      className="mt-1 h-4 w-4 border-[#7C3BED] data-[state=checked]:bg-[#7C3BED]"
                    />

                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-semibold text-[#111827]">
                          {option.title}
                        </span>
                        {option.badge && (
                          <span className="rounded-full bg-[#22C55E] px-2 py-[2px] text-[10px] font-semibold text-white">
                            {option.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#6b7280]">
                        {option.description}
                      </p>
                    </div>
                  </label>
                );
              })}
            </RadioGroup>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default PaymentStep;
