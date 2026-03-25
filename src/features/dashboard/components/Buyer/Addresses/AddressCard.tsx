import clsx from "clsx";
import { Pencil, Trash2 } from "lucide-react";

export interface Address {
  id: string;
  label: string;
  isDefault?: boolean;
  name: string;
  line1: string;
  line2: string;
  phone: string;
}

interface AddressCardProps {
  address: Address;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function AddressCard({
  address,
  onEdit,
  onDelete,
}: AddressCardProps) {
  const { id, label, isDefault, name, line1, line2, phone } = address;

  return (
    <article className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-[#111827]">{label}</h3>
          {isDefault && (
            <span className="inline-flex items-center rounded-full bg-[#F3F4F6] px-2 py-[2px] text-[10px] font-medium text-[#4B5563]">
              ● Default
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-[#6B7280]">
          <button
            type="button"
            onClick={() => onEdit?.(id)}
            className="rounded-full p-1 hover:bg-[#F3F4F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3BED] focus-visible:ring-offset-2"
            aria-label={`Edit ${label} address`}
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onDelete?.(id)}
            className={clsx(
              "rounded-full p-1 hover:bg-[#FEF2F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-2"
            )}
            aria-label={`Delete ${label} address`}
          >
            <Trash2 className="h-4 w-4 text-[#EF4444]" />
          </button>
        </div>
      </div>

      <div className="mt-2 text-xs leading-relaxed text-[#4B5563]">
        <p className="font-semibold text-[#111827]">{name}</p>
        <p>{line1}</p>
        <p>{line2}</p>
        <p className="mt-1">{phone}</p>
      </div>
    </article>
  );
}
