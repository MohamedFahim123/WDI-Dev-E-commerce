"use client";

import * as React from "react";
import { Shield } from "lucide-react";
import { useCreateStore } from "@/src/stores/StepsCreateStore";
import { kycSchema, type KycSchema } from "@/src/validation/CreateStoreSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Path, SubmitHandler, useForm } from "react-hook-form";
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

type Props = {
  onBack: () => void;
  onNext: () => void;
  serverErrors?: Record<string, string>;
  serverErrorsVersion: string;
  clearClientError: (key: string) => void;
  clearServerError: (key: string) => void;
};

type FileKey = "idFront" | "idBack" | "selfie" | "proofOfAddress";
type Preview = { url?: string; name?: string; size?: number } | null;

function filesizeToString(bytes: number) {
  if (!bytes) return "";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

export default function KycForm({
  onBack,
  onNext,
  serverErrors,
  serverErrorsVersion,
  clearClientError,
  clearServerError,
}: Props) {
  const kyc = useCreateStore((s) => s.kycInfo);
  const update = useCreateStore((s) => s.updateKycInfo);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    register: rhfRegister,
    formState: { errors, isSubmitting },
  } = useForm<KycSchema>({
    defaultValues: kyc,
    resolver: zodResolver(kycSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  React.useEffect(() => {
    rhfRegister("kycType");
    rhfRegister("consents.infoCorrect");
    rhfRegister("consents.identityScreening");
    rhfRegister("consents.terms");
  }, [rhfRegister]);

  React.useEffect(() => {
    if (!serverErrors) return;

    const allowed = new Set([
      "kycType",
      "firstName",
      "lastName",
      "dob",
      "nationality",
      "idType",
      "idNumber",
      "idIssueDate",
      "idExpiryDate",
      "idIssuingCountry",
      "idFront",
      "idBack",
      "selfie",
      "proofOfAddress",
      "consents.infoCorrect",
      "consents.identityScreening",
      "consents.terms",
    ]);

    for (const [k, msg] of Object.entries(serverErrors)) {
      if (!msg) continue;
      if (!allowed.has(k)) continue;
      setError(k as Path<KycSchema>, { type: "server", message: msg });
    }
  }, [serverErrorsVersion, serverErrors, setError]);

  const reg = <T extends Path<KycSchema>>(name: T) =>
    register(name, {
      onChange: () => {
        clearErrors(name);
        clearClientError(String(name));
        clearServerError(String(name));
      },
    });

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

    keys.forEach((key) => {
      const file = kyc[key];
      if (file instanceof File) {
        const url = file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined;
        if (url) createdUrlsRef.current.push(url);
        next[key] = { url, name: file.name, size: file.size };
      } else {
        next[key] = null;
      }
    });

    setPreviews(next);

    return () => {
      createdUrlsRef.current.forEach((u) => {
        try {
          URL.revokeObjectURL(u);
        } catch {}
      });
      createdUrlsRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    clearErrors(name);
    clearClientError(name);

    setValue(name, file ?? null, {
      shouldDirty: true,
      shouldTouch: true,
    });
    update({ [name]: file ?? null });
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

  const onSubmit: SubmitHandler<KycSchema> = (values) => {
    update(values);
    onNext();
  };

  function handleSellerTypeChange(v: "individual" | "business") {
    clearErrors("kycType");
    clearClientError("kycType");

    setValue("kycType", v, { shouldDirty: true, shouldTouch: true });
    update({ kycType: v });
  }

  function handleConsentsChange(c: KycSchema["consents"]) {
    clearErrors("consents.infoCorrect");
    clearErrors("consents.identityScreening");
    clearErrors("consents.terms");
    clearClientError("consents.infoCorrect");
    clearClientError("consents.identityScreening");
    clearClientError("consents.terms");

    setValue("consents.infoCorrect", c.infoCorrect, {
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue("consents.identityScreening", c.identityScreening, {
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue("consents.terms", c.terms, {
      shouldDirty: true,
      shouldTouch: true,
    });

    update({ consents: c });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
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
            sellerType={kyc.kycType}
            setSellerType={handleSellerTypeChange}
          />

          <FieldRow>
            <AuthInput
              label="First Name *"
              {...reg("firstName")}
              required
              error={errors.firstName?.message}
              placeholder="Mohamed"
              autoComplete="given-name"
            />
            <AuthInput
              label="Last Name *"
              {...reg("lastName")}
              required
              error={errors.lastName?.message}
              placeholder="Ahmed"
              autoComplete="family-name"
            />
            <AuthInput
              label="Date of Birth *"
              {...reg("dob")}
              required
              error={errors.dob?.message}
              placeholder="1990-01-15"
              autoComplete="bday"
            />
            <AuthInput
              label="Nationality *"
              {...reg("nationality")}
              required
              error={errors.nationality?.message}
              placeholder="United Arab Emirates"
              autoComplete="country-name"
            />
          </FieldRow>

          <FieldRow>
            <AuthSelect label="ID Type *" {...reg("idType")} required>
              <option value="">Select ID type</option>
              <option value="national_id">National ID</option>
              <option value="passport">Passport</option>
              <option value="driving_license">Driving License</option>
            </AuthSelect>

            <AuthInput
              label="ID Number *"
              {...reg("idNumber")}
              required
              error={errors.idNumber?.message}
              placeholder="784-1234-5678901-2"
              autoComplete="off"
            />
            <AuthInput
              label="ID Issue Date *"
              {...reg("idIssueDate")}
              required
              error={errors.idIssueDate?.message}
              placeholder="2020-01-01"
              autoComplete="off"
            />
            <AuthInput
              label="ID Expiry Date *"
              {...reg("idExpiryDate")}
              required
              error={errors.idExpiryDate?.message}
              placeholder="2030-01-01"
              autoComplete="off"
            />
          </FieldRow>

          <AuthInput
            label="ID Issuing Country *"
            {...reg("idIssuingCountry")}
            required
            error={errors.idIssuingCountry?.message}
            placeholder="US"
            autoComplete="country-name"
          />

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
            updateConsents={handleConsentsChange}
          />
        </PanelBody>

        <PanelFooter>
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              type="button"
              className="h-10 rounded-md border px-4 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3BED]"
            >
              ← Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-11 rounded-md bg-[#7C3BED] text-white px-5 font-semibold shadow-sm hover:bg-[#6d30d6] disabled:opacity-70"
            >
              Continue
            </button>
          </div>
        </PanelFooter>
      </Panel>
    </form>
  );
}
