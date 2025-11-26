"use client";

import clsx from "clsx";
import { Check, Package2, Truck, MapPin, Home } from "lucide-react";
import { OrderTrackingStep } from "../../Orders/OrderDetails/OrderDetails";

type Props = {
  tracking: OrderTrackingStep[];
  courier: string;
  trackingNumber: string;
};

const STEP_ICONS = [Check, Package2, Truck, MapPin, Home];

export default function OrderTrackingCard({
  tracking,
  courier,
  trackingNumber,
}: Props) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-[#111827]">
        Order Tracking
      </h2>

      <ol className="relative mt-2 space-y-6">
        {tracking.map((step, index) => {
          const isCurrent = step.status === "current";
          const isDone = step.status === "done";
          const isActive = isDone || isCurrent;

          const Icon = STEP_ICONS[index] ?? Check;

          return (
            <li
              key={step.label}
              className="relative flex flex-col gap-1 pl-8 text-sm"
            >
              {index < tracking.length - 1 && (
                <span
                  className={clsx(
                    "absolute left-[11px] top-5 h-[calc(100%-12px)] w-[2px] rounded-full",
                    isActive ? "bg-[#7C3BED]" : "bg-[#E5E7EB]"
                  )}
                  aria-hidden="true"
                />
              )}

              <span
                className={clsx(
                  "absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border-2",
                  isDone
                    ? "border-[#7C3BED] bg-[#7C3BED]"
                    : isCurrent
                    ? "border-[#7C3BED] bg-white"
                    : "border-[#D4D4D8] bg-white"
                )}
              >
                <Icon
                  className={clsx(
                    "h-3.5 w-3.5",
                    isDone
                      ? "text-white"
                      : isCurrent
                      ? "text-[#7C3BED]"
                      : "text-[#9CA3AF]"
                  )}
                  aria-hidden="true"
                />
              </span>

              <div className="flex items-center justify-between gap-3">
                <p
                  className={clsx(
                    "text-sm font-medium",
                    isCurrent ? "text-[#7C3BED]" : "text-[#111827]"
                  )}
                >
                  {step.label}
                </p>

                {isCurrent && (
                  <span className="inline-flex items-center rounded-full border border-neutral-300 bg-white px-2 py-0.5 text-[10px] font-medium text-neutral-600">
                    Current Status
                  </span>
                )}
              </div>

              {step.date && (
                <p className="text-xs text-[#6B7280]">{step.date}</p>
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-6 flex items-center justify-between rounded-lg bg-[#F9FAFB] p-3 text-xs sm:text-sm">
        <div>
          <p className="text-[11px] text-[#6B7280]">Carrier</p>
          <p className="text-sm font-medium text-[#111827]">{courier}</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-[#6B7280]">Tracking Number</p>
          <button
            type="button"
            className="text-sm font-medium text-[#7C3BED] hover:underline"
          >
            {trackingNumber}
          </button>
        </div>
      </div>
    </section>
  );
}
