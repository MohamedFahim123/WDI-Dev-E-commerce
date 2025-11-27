"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import PaymentMethodFormDialog, {
  PaymentMethodFormValues,
} from "./PaymentMethodFormDialog";
import type { PaymentMethod } from "./PaymentMethodsSection";
import PaymentMethodsSkeleton from "./PaymentMethodsSkeleton";

const PaymentMethodsSection = dynamic(() => import("./PaymentMethodsSection"), {
  loading: () => <PaymentMethodsSkeleton />,
  ssr: false,
});

export default function PaymentMethods() {
  const [methods, setMethods] = useState<PaymentMethod[]>([
    {
      id: "card_1",
      brand: "Visa",
      last4: "4242",
      expiry: "12/25",
      isDefault: true,
    },
    {
      id: "card_2",
      brand: "Mastercard",
      last4: "8888",
      expiry: "06/26",
      isDefault: false,
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [dialogInitialValues, setDialogInitialValues] =
    useState<PaymentMethodFormValues>({
      brand: "",
      cardNumber: "",
      expiry: "",
      isDefault: methods.length === 0,
    });

  const openCreateDialog = () => {
    setDialogMode("create");
    setEditingId(null);
    setDialogInitialValues({
      brand: "",
      cardNumber: "",
      expiry: "",
      isDefault: methods.length === 0,
    });
    setDialogOpen(true);
  };

  const openEditDialog = (id: string) => {
    const method = methods.find((m) => m.id === id);
    if (!method) return;

    setDialogMode("edit");
    setEditingId(id);
    setDialogInitialValues({
      brand: method.brand,
      cardNumber: "",
      expiry: method.expiry,
      isDefault: !!method.isDefault,
    });
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setMethods((prev) => {
      const filtered = prev.filter((m) => m.id !== id);

      if (filtered.length > 0 && !filtered.some((m) => m.isDefault)) {
        filtered[0] = { ...filtered[0], isDefault: true };
      }

      return filtered;
    });
  };

  const handleSubmit = (values: PaymentMethodFormValues) => {
    if (dialogMode === "create") {
      setMethods((prev) => {
        const newId = `card_${Date.now()}`;
        const base = {
          id: newId,
          brand: values.brand.trim(),
          last4: values.cardNumber.slice(-4),
          expiry: values.expiry.trim(),
          isDefault: values.isDefault || prev.length === 0,
        } as PaymentMethod;

        if (base.isDefault) {
          const cleared = prev.map((m) => ({ ...m, isDefault: false }));
          return [...cleared, base];
        }

        return [...prev, base];
      });
    } else if (dialogMode === "edit" && editingId) {
      setMethods((prev) => {
        let updated = prev.map((m) => {
          if (m.id !== editingId) return m;

          const last4 =
            values.cardNumber.trim() !== ""
              ? values.cardNumber.slice(-4)
              : m.last4;

          return {
            ...m,
            brand: values.brand.trim(),
            expiry: values.expiry.trim(),
            last4,
            isDefault: values.isDefault,
          };
        });

        if (values.isDefault) {
          updated = updated.map((m) =>
            m.id === editingId ? m : { ...m, isDefault: false }
          );
        }

        return updated;
      });
    }

    setDialogOpen(false);
  };

  return (
    <>
      <PaymentMethodsSection
        methods={methods}
        onAddNew={openCreateDialog}
        onEdit={openEditDialog}
        onDelete={handleDelete}
      />

      <PaymentMethodFormDialog
        open={dialogOpen}
        mode={dialogMode}
        initialValues={dialogInitialValues}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}
