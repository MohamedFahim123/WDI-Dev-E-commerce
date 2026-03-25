import clsx from "clsx";
import { Check } from "lucide-react";

type Step = { id: number; label: string };

export function Stepper({ current }: { current: number }) {
  const steps: Step[] = [
    { id: 1, label: "Store Information" },
    { id: 2, label: "Business Address" },
    { id: 3, label: "KYC Verification" },
    { id: 4, label: "Payout Method" },
  ];

  const percent = ((current - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="mt-6">
        <div className="h-2 w-full bg-[#F3F3F4] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#7C3AED] transition-[width] duration-300"
            style={{ width: `${percent}%` }}
            aria-hidden
          />
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          {steps.map((s) => {
            const active = s.id === current;
            const done = s.id < current;
            return (
              <div
                key={s.id}
                className="flex-1 min-w-0 flex items-center gap-3"
                aria-current={active ? "step" : undefined}
              >
                <div
                  className={clsx(
                    "h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold",
                    done
                      ? "bg-[#ede9fe] text-[#4c1d95] border border-transparent"
                      : active
                      ? "bg-[#7C3AED] text-white"
                      : "bg-white border border-[#E4E4E7] text-gray-600"
                  )}
                  aria-hidden
                >
                  {done ? <Check className="h-4 w-4" /> : s.id}
                </div>
                <div className="hidden sm:block text-xs text-gray-600">
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
