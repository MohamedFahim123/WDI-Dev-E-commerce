"use client";

import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { cn } from "@/src/lib/utils";

import { ADDRESSES, CheckoutFormValues } from "../Checkoutdata";

const AddressStep: React.FC = () => {
  const { control } = useFormContext<CheckoutFormValues>();

  return (
    <Card className="rounded-2xl border border-[#f1f1f3] bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-[14px] font-semibold text-[#111827]">
          Delivery Address
        </CardTitle>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-9 rounded-full border-[#e5e7eb] bg-white px-4 text-xs font-medium text-[#111827] hover:bg-[#f3f4f6]"
        >
          <span className="mr-1 text-base leading-none">＋</span>
          Add New Address
        </Button>
      </CardHeader>

      <CardContent className="space-y-3 pb-5">
        <Controller
          name="addressId"
          control={control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              className="flex flex-col gap-3"
              onValueChange={(val) => field.onChange(val)}
            >
              {ADDRESSES.map((address) => {
                const selected = field.value === address.id;

                return (
                  <label
                    key={address.id}
                    className={cn(
                      "flex cursor-pointer gap-3 rounded-2xl border px-4 py-4 text-xs transition-colors",
                      selected
                        ? "border-[#7C3BED] bg-[#FFF5EB]"
                        : "border-[#f3f4f6] bg-white hover:border-[#e5e7eb]"
                    )}
                  >
                    <RadioGroupItem
                      value={address.id}
                      className="mt-1 h-4 w-4 border-[#7C3BED] data-[state=checked]:bg-[#7C3BED]"
                    />

                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex items-center gap-2 text-[11px] font-medium text-[#111827]">
                        {address.label}
                        {address.isDefault && (
                          <span className="rounded-full bg-[#F3E8FF] px-2 py-[2px] text-[10px] font-semibold text-[#7C3BED]">
                            Default
                          </span>
                        )}
                      </div>

                      <p className="text-[12px] font-semibold text-[#111827]">
                        {address.name}
                      </p>
                      <p className="text-[11px] text-[#6b7280]">
                        {address.phone}
                      </p>
                      <p className="text-[11px] text-[#6b7280]">
                        {address.line1}
                      </p>
                      <p className="text-[11px] text-[#6b7280]">
                        {address.city}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="self-start text-[11px] font-medium text-[#7C3BED] underline-offset-2 hover:underline"
                    >
                      Edit
                    </button>
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

export default AddressStep;
