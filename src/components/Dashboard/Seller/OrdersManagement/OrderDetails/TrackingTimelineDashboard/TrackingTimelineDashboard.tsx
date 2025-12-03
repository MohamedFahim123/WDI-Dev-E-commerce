import clsx from "clsx";
import { Check, Package2, Truck, MapPin, Home } from "lucide-react";

type Step = {
  label: string;
  date?: string;
  status: "done" | "current" | "pending";
};

const ICONS = [Check, Package2, Truck, MapPin, Home];

export default function TrackingTimelineDashboard({
  tracking,
}: {
  tracking: Step[];
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <h3 className="mb-3 text-lg font-semibold">Timeline</h3>

      <ol className="relative space-y-6">
        {tracking.map((step, idx) => {
          const isDone = step.status === "done";
          const isCurrent = step.status === "current";
          const Icon = ICONS[idx] ?? Check;

          return (
            <li key={step.label} className="relative pl-8">
              {idx < tracking.length - 1 && (
                <span
                  className={clsx(
                    "absolute left-[11px] top-6 h-[calc(100%-22px)] w-[2px] rounded-full",
                    isDone || isCurrent ? "bg-[#7C3BED]" : "bg-[#E5E7EB]"
                  )}
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
                />
              </span>

              <div className="flex items-center justify-between">
                <div
                  className={clsx(
                    "text-sm font-medium",
                    isCurrent ? "text-[#7C3BED]" : "text-[#111827]"
                  )}
                >
                  {step.label}
                </div>
                {step.date && (
                  <div className="text-xs text-gray-400">{step.date}</div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
