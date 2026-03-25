import { cn } from "@/src/lib/utils";
import React from "react";

export default function FormTextArea({
  label,
  error,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"textarea"> & {
  label: string;
  error?: string | boolean | null;
  className?: string;
}) {
  const hasError = !!error;

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-[#111827]">{label}</label>

      <textarea
        {...props}
        className={cn(
          "min-h-[80px] w-full rounded-lg border px-3 py-2 text-sm placeholder:text-[#9CA3AF] transition-all duration-200",
          hasError
            ? "border-red-500 bg-[#FEF2F2] ring-red-500"
            : "bg-[#F5F5F7] border-[#E4E4E7] focus:ring-[#7C3BED]",
          "text-[#111827] focus:outline-none focus:ring-2",
          className
        )}
      />

      {hasError && (
        <p className="text-xs text-red-500 mt-1" role="alert">
          {typeof error === "string" ? error : "This field is required"}
        </p>
      )}
    </div>
  );
}
