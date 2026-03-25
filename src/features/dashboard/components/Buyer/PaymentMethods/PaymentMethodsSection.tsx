// PaymentMethodsSection.tsx
import { CreditCard, Pencil, Trash2, Plus } from "lucide-react";
import clsx from "clsx";

export interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expiry: string;
  isDefault?: boolean;
}

interface PaymentMethodsSectionProps {
  methods: PaymentMethod[];
  onAddNew: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function PaymentMethodsSection({
  methods,
  onAddNew,
  onEdit,
  onDelete,
}: PaymentMethodsSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-[#000000]">
          Payment Methods
        </h2>

        <button
          type="button"
          onClick={onAddNew}
          className="inline-flex items-center gap-2 rounded-full bg-[#7C3BED] px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-[#6D28D9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3BED] focus-visible:ring-offset-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Card</span>
        </button>
      </div>

      <div className="space-y-3">
        {methods.map((method) => (
          <article
            key={method.id}
            className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-1 items-center gap-3">
                <div className="flex items-center gap-2 rounded-md border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2">
                  <CreditCard className="h-4 w-4 text-[#6B7280]" />
                  <span className="text-sm font-medium text-[#111827]">
                    {method.brand}
                  </span>
                  {method.isDefault && (
                    <span className="ml-2 inline-flex items-center rounded-full bg-[#F3F4F6] px-2 py-[2px] text-[10px] font-medium text-[#4B5563]">
                      ● Default
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-[#6B7280]">
                <button
                  type="button"
                  onClick={() => onEdit(method.id)}
                  className="rounded-full p-1 hover:bg-[#F3F4F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3BED] focus-visible:ring-offset-2"
                  aria-label={`Edit ${method.brand} card ending in ${method.last4}`}
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(method.id)}
                  className={clsx(
                    "rounded-full p-1 hover:bg-[#FEF2F2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-2"
                  )}
                  aria-label={`Delete ${method.brand} card ending in ${method.last4}`}
                >
                  <Trash2 className="h-4 w-4 text-[#EF4444]" />
                </button>
              </div>
            </div>

            <div className="mt-2 text-xs text-[#4B5563]">
              <p>•••• •••• •••• {method.last4}</p>
              <p className="mt-0.5">Expires {method.expiry}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
