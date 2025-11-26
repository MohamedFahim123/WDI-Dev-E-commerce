"use client";

import dynamic from "next/dynamic";
import PaymentMethodsSkeleton from "./PaymentMethodsSkeleton";
import { PaymentMethod } from "./PaymentMethodsSection";

const PaymentMethodsSection = dynamic(() => import("./PaymentMethodsSection"), {
  loading: () => <PaymentMethodsSkeleton />,
  ssr: false,
});

export default function PaymentMethods() {
  const methods: PaymentMethod[] = [
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
  ];
  return <PaymentMethodsSection methods={methods} />;
}
