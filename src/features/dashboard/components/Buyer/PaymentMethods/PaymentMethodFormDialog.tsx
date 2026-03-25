"use client";

import { X } from "lucide-react";
import React, { useState } from "react";

export type PaymentMethodFormValues = {
  brand: string;
  cardNumber: string;
  expiry: string;
  isDefault: boolean;
};

interface PaymentMethodFormDialogProps {
  open: boolean;
  mode: "create" | "edit";
  initialValues: PaymentMethodFormValues;
  onClose: () => void;
  onSubmit: (values: PaymentMethodFormValues) => void;
}

export default function PaymentMethodFormDialog({
  open,
  mode,
  initialValues,
  onClose,
  onSubmit,
}: PaymentMethodFormDialogProps) {
  const [form, setForm] = useState<PaymentMethodFormValues>(initialValues);
  const [prevInitialValues, setPrevInitialValues] =
    useState<PaymentMethodFormValues>(initialValues);

  if (initialValues !== prevInitialValues && open) {
    setPrevInitialValues(initialValues);
    setForm(initialValues);
  }

  const handleChange =
    (field: Exclude<keyof PaymentMethodFormValues, "isDefault">) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleDefaultChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, isDefault: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/30 transition-opacity duration-200 ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-2xl bg-white p-5 shadow-lg transform transition-transform duration-200 ${
          open ? "scale-100 translate-y-0" : "scale-95 -translate-y-2"
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[#111827]">
            {mode === "create" ? "Add New Card" : "Edit Card"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 hover:bg-[#F3F4F6]"
            aria-label="Close"
          >
            <X className="h-4 w-4 text-[#6B7280]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Field
            label="Card Brand"
            placeholder="Visa, Mastercard..."
            value={form.brand}
            onChange={handleChange("brand")}
          />
          <Field
            label="Card Number"
            placeholder="1234 5678 9012 3456"
            value={form.cardNumber}
            onChange={handleChange("cardNumber")}
          />
          <Field
            label="Expiry"
            placeholder="MM/YY"
            value={form.expiry}
            onChange={handleChange("expiry")}
          />

          <div className="pt-1">
            <label className="flex items-center gap-2 text-xs text-[#374151]">
              <input
                type="checkbox"
                checked={form.isDefault}
                onChange={handleDefaultChange}
                className="h-4 w-4 rounded border-[#D1D5DB] text-[#7C3BED] focus:ring-[#7C3BED]"
              />
              <span>Set as default payment method</span>
            </label>
          </div>

          <div className="mt-4 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-medium text-[#374151] hover:bg-[#F9FAFB]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-[#7C3BED] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#6D28D9]"
            >
              {mode === "create" ? "Save Card" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

function Field({ label, value, onChange, placeholder }: FieldProps) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-[#6B7280]">{label}</label>
      <input
        className="w-full rounded-md border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2 text-sm text-[#111827] outline-none focus:border-[#7C3BED] focus:ring-2 focus:ring-[#7C3BED]/40"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
