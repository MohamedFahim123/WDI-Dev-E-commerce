"use client";
import dynamic from "next/dynamic";
import CheckoutPageSkeleton from "./CheckoutPageSkeleton";

const CheckoutPage = dynamic(
  () => import("@/src/components/Checkout/CheckoutPage"),
  {
    loading: () => <CheckoutPageSkeleton />,
    ssr: false,
  }
);

export default function Checkout() {
  return <CheckoutPage />;
}
