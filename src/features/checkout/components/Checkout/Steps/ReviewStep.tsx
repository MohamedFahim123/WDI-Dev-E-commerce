"use client";

import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";

import { CheckoutFormValues } from "../Checkoutdata";

const ReviewStep: React.FC = () => {
  const { control } = useFormContext<CheckoutFormValues>();

  return (
    <Card className="rounded-2xl border border-[#f1f1f3] bg-white shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-[14px] font-semibold text-[#111827]">
          Order Notes (Optional)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pb-5">
        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <Label
                htmlFor="notes"
                className="text-[12px] font-medium text-[#4b5563]"
              >
                Special delivery instructions...
              </Label>
              <Textarea
                id="notes"
                className="min-h-[110px] rounded-2xl border-[#e5e7eb] text-[12px]"
                placeholder="Special delivery instructions..."
                {...field}
              />
            </div>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default ReviewStep;
