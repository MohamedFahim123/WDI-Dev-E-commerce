import React from "react";
import { cn } from "@/src/lib/utils";
import { Step } from "../Checkoutdata";

const stepsMeta: { id: Step; label: string }[] = [
  { id: 1, label: "Address" },
  { id: 2, label: "Shipping" },
  { id: 3, label: "Payment" },
  { id: 4, label: "Review" },
];

function CheckoutStepper({ step }: { step: Step }) {
  return (
    <div className="flex items-center gap-4 text-sm">
      {stepsMeta.map((s, index) => {
        const isActive = s.id === step;
        const isCompleted = s.id < step;

        return (
          <React.Fragment key={s.id}>
            {index > 0 && (
              <div
                aria-hidden="true"
                className={cn(
                  "h-[2px] flex-1 rounded-full",
                  s.id <= step ? "bg-[#7C3BED]" : "bg-[#E5E7EB]"
                )}
              />
            )}

            <div className="flex flex-col items-start gap-1">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold",
                  isCompleted && "border-[#7C3BED] bg-[#7C3BED] text-white",
                  isActive &&
                    !isCompleted &&
                    "border-[2px] border-[#7C3BED] bg-white text-[#7C3BED]",
                  !isActive &&
                    !isCompleted &&
                    "border-[#D4D4D8] bg-white text-[#9CA3AF]"
                )}
              >
                {isCompleted ? "✓" : s.id}
              </div>

              <span
                className={cn(
                  "text-[11px] text-[#9CA3AF]",
                  isCompleted && "text-[#4B5563] font-normal",
                  isActive && "text-[#111827] font-semibold"
                )}
              >
                {s.label}
              </span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default CheckoutStepper;
