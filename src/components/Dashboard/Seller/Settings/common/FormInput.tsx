import { cn } from "@/src/lib/utils";
import React from "react";

export default function FormInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<"input"> & { label: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-[#111827]">{label}</label>
      <input
        {...props}
        className={cn(
          "h-11 w-full rounded-lg border border-[#E4E4E7] bg-[#F5F5F7] px-3 text-sm text-[#111827]",
          "focus:outline-none focus:ring-2 focus:ring-[#7C3BED]"
        )}
      />
    </div>
  );
}
