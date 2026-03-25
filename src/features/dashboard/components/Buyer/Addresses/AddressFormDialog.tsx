"use client";

import { X } from "lucide-react";
import type { Address } from "./AddressCard";
import { useState } from "react";

type AddressFormValues = Omit<Address, "id">;

interface AddressFormDialogProps {
  open: boolean;
  mode: "create" | "edit";
  initialValues: AddressFormValues;
  onClose: () => void;
  onSubmit: (values: AddressFormValues) => void;
}

export default function AddressFormDialog({
  open,
  mode,
  initialValues,
  onClose,
  onSubmit,
}: AddressFormDialogProps) {
  const [form, setForm] = useState<AddressFormValues>(initialValues);
  const [prevInitialValues, setPrevInitialValues] =
    useState<AddressFormValues>(initialValues);

  if (initialValues !== prevInitialValues && open) {
    setPrevInitialValues(initialValues);
    setForm(initialValues);
  }

  const handleChange =
    (field: keyof AddressFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
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
            {mode === "create" ? "Add New Address" : "Edit Address"}
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
            label="Label"
            placeholder="Home, Office..."
            value={form.label}
            onChange={handleChange("label")}
          />
          <Field
            label="Full Name"
            value={form.name}
            onChange={handleChange("name")}
          />
          <Field
            label="Address Line 1"
            value={form.line1}
            onChange={handleChange("line1")}
          />
          <Field
            label="Address Line 2"
            value={form.line2}
            onChange={handleChange("line2")}
          />
          <Field
            label="Phone Number"
            value={form.phone}
            onChange={handleChange("phone")}
          />

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
              {mode === "create" ? "Save Address" : "Save Changes"}
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
