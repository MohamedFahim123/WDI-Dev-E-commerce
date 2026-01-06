import * as React from "react";
import { FieldErrors } from "react-hook-form";
import DocumentUploadField from "./DocumentUploadField";

type FileKey = "idFront" | "idBack" | "selfie" | "proofOfAddress";
type Preview = { url?: string; name?: string; size?: number } | null;

export default function DocumentUploads({
  fileKeys,
  previews,
  handleFileChangeForFileKey,
  removeFile,
  makeDropHandlersFor,
  errors,
  filesizeToString,
}: {
  fileKeys: FileKey[];
  previews: Record<FileKey, Preview>;
  handleFileChangeForFileKey: (name: FileKey, file?: File | null) => void;
  removeFile: (name: FileKey) => void;
  makeDropHandlersFor: (name: FileKey) => {
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
  };
  errors: FieldErrors;
  filesizeToString: (b: number) => string;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {fileKeys.map((key) => {
        const p = previews[key];

        const labelText =
          key === "idFront"
            ? "ID Document (Front) *"
            : key === "idBack"
            ? "ID Document (Back) *"
            : key === "selfie"
            ? "Selfie / Liveness Check *"
            : "Proof of Address *";

        const helper =
          p?.name && p?.size
            ? `${p.name} • ${filesizeToString(p.size)}`
            : "PNG, JPG or PDF — max 10MB";

        return (
          <div key={key}>
            <DocumentUploadField
              label={labelText}
              preview={p}
              helper={helper}
              onChange={(f) => handleFileChangeForFileKey(key, f)}
              onRemove={() => removeFile(key)}
              dropHandlers={makeDropHandlersFor(key)}
            />

            {errors && errors[key] && (
              <p className="text-[11px] text-red-500 mt-1" role="alert">
                {String(errors[key]?.message)}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
