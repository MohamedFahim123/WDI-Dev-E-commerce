"use client";

import { ProfileDraft, useAuthStore } from "@/src/stores/authStore";
import {
  Building2,
  Flag,
  Hash,
  Home,
  Mail,
  MapPin,
  Phone,
  Shield,
  User as UserIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import ProfileInfoCardSkeleton from "./ProfileInfoCardSkeleton";

type InfoFieldProps = {
  label: string;
  icon: React.ElementType;
  value: string;
};

function InfoField({ label, icon: Icon, value }: InfoFieldProps) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-medium text-[#6B7280]">{label}</p>
      <div className="flex items-center gap-2 rounded-md border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2">
        <Icon className="h-4 w-4 text-[#9CA3AF]" />
        <span className="text-sm text-[#111827]">{value || "-"}</span>
      </div>
    </div>
  );
}

type EditableFieldProps = {
  label: string;
  icon: React.ElementType;
  disabeled?: boolean;
  value: string;
  onChange: (val: string) => void;
};

function EditableField({
  label,
  icon: Icon,
  value,
  onChange,
  disabeled = false,
}: EditableFieldProps) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-medium text-[#6B7280]">{label}</p>
      <div className="flex items-center gap-2 rounded-md border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2">
        <Icon className="h-4 w-4 text-[#9CA3AF]" />
        <input
          className={`w-full border-none bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF] ${disabeled ? "cursor-not-allowed" : ""}`}
          value={value}
          disabled={disabeled}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

type NumberEditableFieldProps = {
  label: string;
  icon: React.ElementType;
  value: number | null;
  onChange: (val: number | null) => void;
  placeholder?: string;
};

function NumberEditableField({
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
}: NumberEditableFieldProps) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-medium text-[#6B7280]">{label}</p>
      <div className="flex items-center gap-2 rounded-md border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2">
        <Icon className="h-4 w-4 text-[#9CA3AF]" />
        <input
          type="number"
          className="w-full border-none bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF]"
          value={value ?? ""}
          placeholder={placeholder}
          onChange={(e) => {
            const v = e.target.value;
            onChange(v === "" ? null : Number(v));
          }}
        />
      </div>
    </div>
  );
}

type ProfileInfoViewProps = {
  profile: ProfileDraft;
  onEdit: () => void;
};

function ProfileInfoView({ profile, onEdit }: ProfileInfoViewProps) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-[#000000]">
          Profile Information
        </h2>

        <button
          type="button"
          onClick={onEdit}
          className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-[#E5E7EB] bg-white hover:bg-[#eee] transition-all duration-300 px-3 py-1.5 text-xs font-medium text-[#374151]"
        >
          <Shield className="h-3.5 w-3.5" />
          Edit
        </button>
      </div>

      <div className="space-y-4">
        <InfoField label="Full Name" icon={UserIcon} value={profile.name} />
        <InfoField label="Email" icon={Mail} value={profile.email} />
        <InfoField label="Phone Number" icon={Phone} value={profile.phone} />

        <InfoField label="Street" icon={Home} value={profile.street} />
        <InfoField label="Street 2" icon={Building2} value={profile.street2} />
        <InfoField label="City" icon={MapPin} value={profile.city} />

        <InfoField
          label="State ID"
          icon={Flag}
          value={profile.state_id === null ? "" : String(profile.state_id)}
        />
        <InfoField label="ZIP" icon={Hash} value={profile.zip} />
        <InfoField
          label="Country ID"
          icon={Flag}
          value={profile.country_id === null ? "" : String(profile.country_id)}
        />
      </div>

      <div className="pt-4">
        <p className="mb-2 text-xs font-medium text-[#6B7280]">Security</p>
        <button
          type="button"
          className="rounded-md border border-[#D1D5DB] bg-white px-3 py-2 text-xs font-medium text-[#374151] hover:bg-[#F3F4F6]"
        >
          Change Password
        </button>
      </div>
    </>
  );
}

type ProfileInfoEditFormProps = {
  draft: ProfileDraft;
  setDraft: (p: ProfileDraft) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
};

function ProfileInfoEditForm({
  draft,
  setDraft,
  onSave,
  onCancel,
  isSaving,
}: ProfileInfoEditFormProps) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-[#000000]">Edit Profile</h2>
      </div>

      <div className="space-y-4">
        <EditableField
          label="Full Name"
          icon={UserIcon}
          value={draft.name}
          onChange={(val) => setDraft({ ...draft, name: val })}
        />
        <EditableField
          label="Email"
          icon={Mail}
          value={draft.email}
          disabeled={true}
          onChange={() => {}}
        />
        <EditableField
          label="Phone Number"
          icon={Phone}
          value={draft.phone}
          onChange={(val) => setDraft({ ...draft, phone: val })}
        />

        <EditableField
          label="Street"
          icon={Home}
          value={draft.street}
          onChange={(val) => setDraft({ ...draft, street: val })}
        />
        <EditableField
          label="Street 2"
          icon={Building2}
          value={draft.street2}
          onChange={(val) => setDraft({ ...draft, street2: val })}
        />
        <EditableField
          label="City"
          icon={MapPin}
          value={draft.city}
          onChange={(val) => setDraft({ ...draft, city: val })}
        />

        <NumberEditableField
          label="State ID"
          icon={Flag}
          value={draft.state_id}
          onChange={(val) => setDraft({ ...draft, state_id: val })}
          placeholder="e.g. 5"
        />
        <EditableField
          label="ZIP"
          icon={Hash}
          value={draft.zip}
          onChange={(val) => setDraft({ ...draft, zip: val })}
        />
        <NumberEditableField
          label="Country ID"
          icon={Flag}
          value={draft.country_id}
          onChange={(val) => setDraft({ ...draft, country_id: val })}
          placeholder="e.g. 233"
        />

        <div className="flex items-center justify-end gap-2 pt-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-medium text-[#374151] hover:bg-[#F9FAFB]"
            disabled={isSaving}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSave}
            className="rounded-md bg-[#7C3BED] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#6D28D9] disabled:opacity-60"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </>
  );
}

export default function ProfileInfoCard() {
  const loading = useAuthStore((s) => s.loading);
  const user = useAuthStore((s) => s.user);
  const updateProfile = useAuthStore((s) => s.updateProfile);

  const [draft, setDraft] = useState<ProfileDraft>({
    name: "",
    email: "",
    phone: "",
    street: "",
    street2: "",
    city: "",
    state_id: null,
    zip: "",
    country_id: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    setDraft({
      name: user.name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      street: user.street ?? "",
      street2: user.street2 ?? "",
      city: user.city ?? "",
      state_id: user.state_id ?? null,
      zip: user.zip ?? "",
      country_id: user.country_id ?? null,
    });
  }, [user]);

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    if (user) {
      setDraft({
        name: user.name ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        street: user.street ?? "",
        street2: user.street2 ?? "",
        city: user.city ?? "",
        state_id: user.state_id ?? null,
        zip: user.zip ?? "",
        country_id: user.country_id ?? null,
      });
    }
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateProfile(draft);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <ProfileInfoCardSkeleton />;

  const viewProfile: ProfileDraft = {
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    street: user?.street ?? "",
    street2: user?.street2 ?? "",
    city: user?.city ?? "",
    state_id: user?.state_id ?? null,
    zip: user?.zip ?? "",
    country_id: user?.country_id ?? null,
  };

  return (
    <section className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
      {isEditing ? (
        <ProfileInfoEditForm
          draft={draft}
          setDraft={setDraft}
          onSave={handleSave}
          onCancel={handleCancel}
          isSaving={isSaving}
        />
      ) : (
        <ProfileInfoView profile={viewProfile} onEdit={handleEdit} />
      )}
    </section>
  );
}
