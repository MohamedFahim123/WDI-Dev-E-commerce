"use client";

import { Mail, Phone, User as UserIcon, Shield } from "lucide-react";

type FieldProps = {
  label: string;
  icon: React.ElementType;
  value: string;
};

function InfoField({ label, icon: Icon, value }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-medium text-[#6B7280]">{label}</p>
      <div className="flex items-center gap-2 rounded-md border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2">
        <Icon className="h-4 w-4 text-[#9CA3AF]" />
        <span className="text-sm text-[#111827]">{value}</span>
      </div>
    </div>
  );
}

export default function ProfileInfoCard() {
  return (
    <section className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-[#000000]">
          Profile Information
        </h2>

        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-medium text-[#374151] hover:bg-[#F9FAFB]"
        >
          <Shield className="h-3.5 w-3.5" />
          Edit
        </button>
      </div>

      <div className="space-y-4">
        <InfoField
          label="Full Name"
          icon={UserIcon}
          value="Ahmed Al Mansoori"
        />
        <InfoField
          label="Email"
          icon={Mail}
          value="ahmed.almansoori@example.com"
        />
        <InfoField label="Phone Number" icon={Phone} value="+971 50 123 4567" />

        <div className="pt-2">
          <p className="mb-2 text-xs font-medium text-[#6B7280]">Security</p>
          <button
            type="button"
            className="rounded-md border border-[#D1D5DB] bg-white px-3 py-2 text-xs font-medium text-[#374151] hover:bg-[#F3F4F6]"
          >
            Change Password
          </button>
        </div>
      </div>
    </section>
  );
}
