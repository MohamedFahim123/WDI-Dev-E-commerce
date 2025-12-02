import { ImagePlus } from "lucide-react";

export default function UploadBox({
  onChange,
  accept = "image/*",
  multiple = false,
  placeholder = "Drop or Upload PNG/SVG",
}: {
  onChange?: (f: FileList | null) => void;
  accept?: string;
  multiple?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block w-full cursor-pointer rounded-md border border-dashed border-[#E4E4E7] bg-[#FAFBFC] p-4 text-center">
      <div className="mx-auto inline-flex flex-col items-center justify-center gap-2">
        <ImagePlus className="h-6 w-6 text-[#9CA3AF]" />
        <div className="text-sm text-[#6B7280]">{placeholder}</div>
      </div>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => onChange?.(e.target.files)}
        className="hidden"
      />
    </label>
  );
}
