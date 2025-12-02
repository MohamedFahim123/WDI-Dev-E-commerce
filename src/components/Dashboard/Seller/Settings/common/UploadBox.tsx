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
    <label
      className="block w-full cursor-pointer rounded-lg border border-dashed p-4 text-center transition-colors duration-150
                bg-[color:color-mix(in srgb,var(--card) 98%, white)] border-[color:var(--border)]"
    >
      <div className="mx-auto inline-flex flex-col items-center justify-center gap-2">
        <div className="h-10 w-10 flex items-center justify-center rounded-md bg-[color:color-mix(in srgb,var(--card) 92%, white)] border border-[color:var(--border)]">
          <ImagePlus className="h-5 w-5 text-[color:var(--muted-foreground)]" />
        </div>
        <div className="text-sm text-[color:var(--muted-foreground)]">
          {placeholder}
        </div>
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
