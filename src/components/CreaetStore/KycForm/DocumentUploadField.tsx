"use client";
import Image from "next/image";
import { UploadCloud } from "lucide-react";
import * as React from "react";

type Preview = { url?: string; name?: string; size?: number } | null;

export default function DocumentUploadField({
  label,
  preview,
  onChange,
  onRemove,
  dropHandlers,
  accept = "image/*,application/pdf",
  helper,
}: {
  label: string;
  preview: Preview;
  onChange: (file?: File | null) => void;
  onRemove: () => void;
  dropHandlers?: {
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
  };
  accept?: string;
  helper?: string;
}) {
  const inputId = React.useId();

  return (
    <div>
      <label htmlFor={inputId} className="block text-xs font-medium mb-2">
        {label}
      </label>

      <div
        {...(dropHandlers ?? {})}
        className="relative group rounded-lg border-2 border-dashed border-[#E9E9EB] bg-[#FBFBFC] p-6 flex items-center justify-center text-center cursor-pointer hover:bg-[#FEFEFF] focus-within:ring-2 focus-within:ring-[#7C3BED]"
      >
        <input
          id={inputId}
          type="file"
          accept={accept}
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label={label}
        />
        <div className="pointer-events-none">
          {!preview?.name ? (
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                <UploadCloud className="h-5 w-5 text-[#7C3BED]" />
              </div>
              <div className="text-sm text-slate-500">Click to upload</div>
              <div className="text-xs text-slate-400">
                {helper ?? "PNG, JPG or PDF — max 10MB"}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {preview.url ? (
                <Image
                  width={200}
                  height={200}
                  src={preview.url}
                  alt={preview.name}
                  className="h-12 w-12 rounded-md object-cover"
                />
              ) : (
                <div className="h-12 w-12 rounded-md bg-white flex items-center justify-center text-xs text-slate-600">
                  PDF
                </div>
              )}

              <div className="text-left">
                <div className="text-sm font-medium">{preview.name}</div>
                <div className="text-xs text-slate-400">
                  {preview.size ? `${(preview.size / 1024).toFixed(1)} KB` : ""}
                </div>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={onRemove}
                    className="text-xs px-2 py-1 rounded bg-white border"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
