"use client";

import { Plus } from "lucide-react";
import AddressCard, { type Address } from "./AddressCard";

interface SavedAddressesProps {
  addresses: Address[];
  onAddNew: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function SavedAddresses({
  addresses,
  onAddNew,
  onEdit,
  onDelete,
}: SavedAddressesProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-[#000000]">
          Saved Addresses
        </h2>

        <button
          type="button"
          onClick={onAddNew}
          className="inline-flex items-center gap-2 rounded-full bg-[#7C3BED] px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-[#6D28D9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3BED] focus-visible:ring-offset-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Address</span>
        </button>
      </div>

      <div className="space-y-3">
        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}
