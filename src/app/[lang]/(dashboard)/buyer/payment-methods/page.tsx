import PaymentMethods from "@/src/components/Dashboard/Buyer/PaymentMethods/PaymentMethods";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - Payment Methods",
  description: "Manage your saved payment cards.",
};

export default function BuyerPaymentMethodsPage() {
  return (
    <div className="space-y-4">
      <PaymentMethods />
    </div>
  );
}
