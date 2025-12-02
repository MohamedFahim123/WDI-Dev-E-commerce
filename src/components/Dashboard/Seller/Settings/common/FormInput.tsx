import { cn } from "@/src/lib/utils";
import React from "react";

export default function FormInput({
  label,
  error,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"input"> & {
  label: string;
  error?: string | boolean | null;
  className?: string;
}) {
  const hasError = !!error;

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-[#111827]">{label}</label>

      <input
        {...props}
        className={cn(
          "h-11 w-full rounded-lg border px-3 text-sm placeholder:text-[#9CA3AF] transition-all duration-200",
          hasError
            ? "border-red-500 bg-[#FEF2F2] focus:ring-red-500"
            : "bg-[#FAFAFA] border-[#E4E4E7] focus:ring-[#7C3BED]",
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
