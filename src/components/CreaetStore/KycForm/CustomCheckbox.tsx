"use client";

import * as React from "react";

export default function CustomCheckbox({
  checked,
  onChange,
  label,
  id,
  required = false,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  id?: string;
  required?: boolean;
}) {
  const reactId = React.useId();
  const inputId = id ?? `custom-checkbox-${reactId}`;

  return (
    <label className="flex items-start gap-3 cursor-pointer" htmlFor={inputId}>
      <input
        id={inputId}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
        aria-required={required}
      />
      <span
        aria-hidden
        className={`mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border transition-all ${
          checked ? "bg-[#7C3BED] border-[#7C3BED]" : "bg-white border-gray-300"
        }`}
      >
        <svg
          className={`h-3 w-3 transform transition-opacity ${
            checked ? "opacity-100" : "opacity-0"
          }`}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <path
            d="M5 13l4 4L19 7"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-sm mt-1">{label}</span>
    </label>
  );
}
