"use client";

import * as React from "react";
import { cn } from "@/src/lib/utils";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  autoComplete?: string;
  containerClassName?: string;
}

export const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  (
    {
      id,
      autoComplete,
      label,
      error,
      containerClassName,
      className,
      required,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className={cn("space-y-1.5", containerClassName)}>
        <label
          htmlFor={inputId}
          className="text-xs font-medium text-foreground"
        >
          {label}
          {required ? (
            <span aria-hidden className="ml-1 text-red-500">
              *
            </span>
          ) : null}
        </label>

        <input
          id={inputId}
          ref={ref}
          className={cn(
            "h-11 w-full rounded-lg border border-[#E4E4E7] bg-[#F5F5F7] px-3 text-sm text-foreground",
            "placeholder:text-muted-foreground/70",
            "focus:outline-none focus:ring-2 focus:ring-[#7C3BED] focus:border-transparent",
            "transition-shadow",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          autoComplete={"on"}
          aria-invalid={!!error || undefined}
          aria-describedby={error ? errorId : undefined}
          aria-required={required || undefined}
          {...props}
        />

        {error && (
          <p
            id={errorId}
            className="text-[11px] font-medium text-red-500"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";
export default AuthInput;
