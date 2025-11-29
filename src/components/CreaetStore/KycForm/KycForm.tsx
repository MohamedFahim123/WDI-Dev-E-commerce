"use client";

import * as React from "react";
import { Shield } from "lucide-react";
import { useCreateStore } from "@/src/stores/StepsCreateStore";
import { kycSchema, KycSchema } from "@/src/validation/CreateStoreSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AuthInput from "../../Auth/Fields/AuthInput";
import AuthSelect from "../../Auth/Fields/AuthSelect";

import Panel from "../Common/Panel";
import PanelHeader from "../Common/PanelHeader";
import PanelBody from "../Common/PanelBody";
import PanelFooter from "../Common/PanelFooter";
import FieldRow from "../Common/FieldRow";

import SellerTypeToggle from "./SellerTypeToggle";
import DocumentUploads from "./DocumentUploads";
import DeclarationsConsents from "./DeclarationsConsents";

type Props = { onBack: () => void; onNext: () => void };

type FileKey = "idFront" | "idBack" | "selfie" | "proofOfAddress";
type Preview = { url?: string; name?: string; size?: number } | null;

function filesizeToString(bytes: number) {
  if (!bytes) return "";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

export default function KycForm({ onBack, onNext }: Props) {
  const kyc = useCreateStore((s) => s.kycInfo);
  const update = useCreateStore((s) => s.updateKycInfo);

  const {
    register,
    handleSubmit,
    setValue,
    register: rhfRegister,
    formState: { errors, isSubmitting },
  } = useForm<KycSchema>({
    defaultValues: kyc as KycSchema,
    resolver: zodResolver(kycSchema),
    mode: "onTouched",
  });

  React.useEffect(() => {
    rhfRegister("consents.infoCorrect");
    rhfRegister("consents.identityScreening");
    rhfRegister("consents.terms");
  }, []);

  const createdUrlsRef = React.useRef<string[]>([]);
  const initialPreviewState: Record<FileKey, Preview> = {
    idFront: null,
    idBack: null,
    selfie: null,
    proofOfAddress: null,
  };
  const [previews, setPreviews] = React.useState<Record<FileKey, Preview>>(
    () => ({ ...initialPreviewState })
  );

  React.useEffect(() => {
    const keys: FileKey[] = ["idFront", "idBack", "selfie", "proofOfAddress"];
    const next: Record<FileKey, Preview> = { ...initialPreviewState };
    let didCreate = false;

    keys.forEach((key) => {
      const file = kyc[key] as File | undefined | null;
      if (file instanceof File) {
        const url = file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined;
        if (url) createdUrlsRef.current.push(url);
        next[key] = { url, name: file.name, size: file.size };
        didCreate = true;
      } else next[key] = null;
    });

    if (didCreate) setPreviews(next);

    return () => {
      createdUrlsRef.current.forEach((u) => {
        try {
          URL.revokeObjectURL(u);
        } catch {}
      });
      createdUrlsRef.current = [];
    };
  }, []);

  function revokePreviewUrl(url?: string) {
    if (!url) return;
    try {
      URL.revokeObjectURL(url);
    } catch {}
    createdUrlsRef.current = createdUrlsRef.current.filter((u) => u !== url);
  }

  function updatePreview(name: FileKey, file?: File | null) {
    const old = previews[name];
    if (old?.url) revokePreviewUrl(old.url);
    if (!file) {
      setPreviews((s) => ({ ...s, [name]: null }));
      return;
    }
    let url: string | undefined;
    if (file.type.startsWith("image/")) {
      url = URL.createObjectURL(file);
      createdUrlsRef.current.push(url);
    }
    setPreviews((s) => ({
      ...s,
      [name]: { url, name: file.name, size: file.size },
    }));
  }

  function handleFileChangeForFileKey(name: FileKey, file?: File | null) {
    setValue(name, file ?? undefined, { shouldDirty: true, shouldTouch: true });
    update({ [name]: file } as Partial<KycSchema>);
    updatePreview(name, file ?? null);
  }

  function makeDropHandlersFor(name: FileKey) {
    return {
      onDragOver: (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
      },
      onDrop: (e: React.DragEvent) => {
        e.preventDefault();
        const f = e.dataTransfer.files?.[0];
        if (f) handleFileChangeForFileKey(name, f);
      },
    };
  }

  function removeFile(name: FileKey) {
    handleFileChangeForFileKey(name, null);
  }

  const fileKeys: FileKey[] = ["idFront", "idBack", "selfie", "proofOfAddress"];
  const [sellerType, setSellerType] = React.useState<"individual" | "business">(
    "individual"
  );

  function onSubmit(values: KycSchema) {
    update(values);
    onNext();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      noValidate
      aria-labelledby="kyc-heading"
    >
      <Panel>
        <PanelHeader
          icon={
            <div className="h-9 w-9 flex items-center justify-center">
              <Shield className="h-4 w-4 text-[#7C3BED]" />
            </div>
          }
          title="KYC Verification"
        />
        <PanelBody className="space-y-6">
          <SellerTypeToggle
            sellerType={sellerType}
            setSellerType={setSellerType}
          />

          <FieldRow>
            <AuthInput
              label="First Name *"
              {...register("firstName")}
              required
              error={errors.firstName?.message as string | undefined}
              placeholder="Mohamed"
              autoComplete="given-name"
            />
            <AuthInput
              label="Last Name *"
              {...register("lastName")}
              required
              error={errors.lastName?.message as string | undefined}
              placeholder="Ahmed"
              autoComplete="family-name"
            />
            <AuthInput
              label="Date of Birth *"
              {...register("dob")}
              required
              error={errors.dob?.message as string | undefined}
              placeholder="dd/mm/yyyy"
              autoComplete="bday"
            />
            <AuthInput
              label="Nationality *"
              {...register("nationality")}
              required
              error={errors.nationality?.message as string | undefined}
              placeholder="United Arab Emirates"
              autoComplete="country-name"
            />
          </FieldRow>

          <FieldRow>
            <AuthSelect
              label="ID Type *"
              {...register("idType")}
              required
              aria-label="ID Type"
            >
              <option value="">Select ID type</option>
              <option>National ID</option>
              <option>Passport</option>
              <option>Driving License</option>
            </AuthSelect>

            <AuthInput
              label="ID Number *"
              {...register("idNumber")}
              required
              error={errors.idNumber?.message as string | undefined}
              placeholder="784-1234-5678901-2"
              autoComplete="off"
            />
            <AuthInput
              label="ID Issue Date *"
              {...register("idIssueDate")}
              required
              error={errors.idIssueDate?.message as string | undefined}
              placeholder="dd/mm/yyyy"
              autoComplete="off"
            />
            <AuthInput
              label="ID Expiry Date *"
              {...register("idExpiryDate")}
              required
              error={errors.idExpiryDate?.message as string | undefined}
              placeholder="dd/mm/yyyy"
              autoComplete="off"
            />
          </FieldRow>

          <div>
            <div className="text-sm font-medium mb-3">Document Uploads</div>

            <DocumentUploads
              fileKeys={fileKeys}
              previews={previews}
              handleFileChangeForFileKey={handleFileChangeForFileKey}
              removeFile={removeFile}
              makeDropHandlersFor={makeDropHandlersFor}
              errors={errors}
              filesizeToString={filesizeToString}
            />
          </div>

          <DeclarationsConsents
            setValue={setValue}
            errors={errors}
            consents={kyc.consents}
            updateConsents={(c) => update({ consents: c })}
          />
        </PanelBody>

        <PanelFooter>
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              type="button"
              className="h-10 cursor-pointer rounded-md border px-4 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3BED]"
            >
              ← Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-11 rounded-md cursor-pointer bg-[#7C3BED] text-white px-5 font-semibold shadow-sm hover:bg-[#6d30d6] focus:outline-none focus:ring-2 focus:ring-[#7C3BED] disabled:opacity-70"
            >
              Continue
            </button>
          </div>
        </PanelFooter>
      </Panel>
    </form>
  );
}
