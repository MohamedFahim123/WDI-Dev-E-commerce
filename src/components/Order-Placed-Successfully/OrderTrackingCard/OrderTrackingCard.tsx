"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { trackingSteps, TrackingStep } from "../OrderSuccessData";

function TrackingDot({ status }: { status: TrackingStep["status"] }) {
  const base = "flex items-center justify-center h-5 w-5 rounded-full border";
  if (status === "complete") {
    return (
      <div
        className={`${base} border-[#7C3BED] bg-[#7C3BED] text-white text-[10px]`}
      >
        ✓
      </div>
    );
  }
  if (status === "current") {
    return (
      <div className={`${base} bg-white border-[#7C3BED]`}>
        <div className="h-2.5 w-2.5 rounded-full border-[#7C3BED]" />
      </div>
    );
  }
  return <div className={`${base} border-[#e5e7eb] bg-white`} />;
}

export default function OrderTrackingCard() {
  return (
    <Card className="rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
      <CardHeader className="pb-3 pt-4">
        <CardTitle className="text-[14px] font-semibold text-[#111827]">
          Order Tracking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pb-4 pt-0">
        <div className="space-y-4">
          {trackingSteps.map((step, index) => {
            const isLast = index === trackingSteps.length - 1;
            const isCurrent = step.status === "current";
            const isComplete = step.status === "complete";

            const lineColor = isComplete || isCurrent ? "#7C3BED" : "#e5e7eb";

            return (
              <div key={step.id} className="flex items-start gap-3 text-xs">
                <div className="flex flex-col items-center">
                  <TrackingDot status={step.status} />
                  {!isLast && (
                    <div
                      className="mt-1 w-[2px] flex-1 rounded-full"
                      style={{ backgroundColor: lineColor }}
                    />
                  )}
                </div>

                <div className="flex flex-1 justify-between">
                  <div>
                    <p
                      className={`text-[12px] font-semibold ${
                        isCurrent || isComplete
                          ? "text-[#111827]"
                          : "text-[#9ca3af]"
                      }`}
                    >
                      {step.title}
                    </p>
                    {step.datetime && (
                      <p className="mt-0.5 text-[11px] text-[#6b7280]">
                        {step.datetime}
                      </p>
                    )}
                  </div>

                  {isCurrent && (
                    <span className="self-center rounded-full bg-[#f3f4f6] px-2 py-[3px] text-[10px] font-medium text-[#4b5563]">
                      Current Status
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 rounded-xl bg-[#f9fafb] px-4 py-3 text-[11px] text-[#4b5563]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-[#111827]">
                Carrier
              </p>
              <p className="text-[11px] text-[#6b7280]">Aramex</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-semibold text-[#111827]">
                Tracking Number
              </p>
              <button
                type="button"
                className="text-[11px] font-semibold text-[#7C3BED] underline-offset-2 hover:underline"
              >
                AK0123456789
              </button>
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-between">
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-full border-[#7C3BED] text-[11px] font-medium text-[#7C3BED] hover:bg-[#f5f3ff] sm:w-[160px]"
            >
              Re-order
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-full border-[#e5e7eb] bg-white text-[11px] font-medium text-[#4b5563] hover:bg-[#f3f4f6] sm:w-[160px]"
            >
              Request a return
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
