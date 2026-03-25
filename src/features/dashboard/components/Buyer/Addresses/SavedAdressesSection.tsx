"use client";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import SavedAddressesSkeleton from "./SavedAddressesSkeleton";
import { Address } from "./AddressCard";
import { useState } from "react";
import AddressFormDialog from "./AddressFormDialog";

const SavedAddresses = dynamic(() => import("./SavedAddresses"), {
  loading: () => <SavedAddressesSkeleton />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Saved Addresses",
  description: "Manage your saved delivery addresses.",
};

const initialAddresses: Address[] = [
  {
    id: "home",
    label: "Home",
    isDefault: true,
    name: "Ahmed Al Mansoori",
    line1: "Sheikh Zayed Road, Building 42",
    line2: "Dubai, UAE",
    phone: "+971 50 123 4567",
  },
  {
    id: "office",
    label: "Office",
    isDefault: false,
    name: "Ahmed Al Mansoori",
    line1: "Business Bay, Tower 15, Floor 8",
    line2: "Dubai, UAE",
    phone: "+971 50 123 4567",
  },
];

export default function SavedAddressesSection() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const handleAddNew = () => {
    setEditingAddress(null);
    setIsFormOpen(true);
  };

  const handleEdit = (id: string) => {
    const addr = addresses.find((a) => a.id === id) || null;
    setEditingAddress(addr);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSubmit = (data: Omit<Address, "id">) => {
    if (editingAddress) {
      setAddresses((prev) =>
        prev.map((a) => (a.id === editingAddress.id ? { ...a, ...data } : a))
      );
    } else {
      const id = crypto.randomUUID ? crypto.randomUUID() : `addr-${Date.now()}`;

      setAddresses((prev) => [...prev, { ...data, id }]);
    }
    setIsFormOpen(false);
    setEditingAddress(null);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setEditingAddress(null);
  };

  return (
    <>
      <SavedAddresses
        addresses={addresses}
        onAddNew={handleAddNew}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AddressFormDialog
        open={isFormOpen}
        mode={editingAddress ? "edit" : "create"}
        initialValues={
          editingAddress ?? {
            label: "",
            isDefault: false,
            name: "",
            line1: "",
            line2: "",
            phone: "",
          }
        }
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </>
  );
}
