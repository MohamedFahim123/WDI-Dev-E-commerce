"use client";

import OrderPlacedSuccessfullySkeleton from "@/src/components/Order-Placed-Successfully/OrderPlacedSuccessfullySkeleton";
import dynamic from "next/dynamic";

const OrderPlacedSuccessfully = dynamic(
  () =>
    import(
      "@/src/components/Order-Placed-Successfully/OrderPlacedSuccessfully"
    ),
  {
    loading: () => <OrderPlacedSuccessfullySkeleton />,
    ssr: false,
  }
);
export default function SuccessOrder() {
  return <OrderPlacedSuccessfully />;
}
