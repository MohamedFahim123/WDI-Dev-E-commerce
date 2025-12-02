import { cn } from "@/src/lib/utils";
import React from "react";

export default function FormTextArea({
  label,
  ...props
}: React.ComponentPropsWithoutRef<"textarea"> & { label: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-[#111827]">{label}</label>
      <textarea
        {...props}
        className={cn(
          "min-h-[80px] w-full rounded-lg border border-[#E4E4E7] bg-[#F5F5F7] px-3 py-2 text-sm text-[#111827]",
          "focus:outline-none focus:ring-2 focus:ring-[#7C3BED]"
        )}
      />
    </div>
  );
}
