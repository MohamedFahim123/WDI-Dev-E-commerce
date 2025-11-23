import CartFullPage from "@/src/components/CartFullPage/CartFullPage";
import { CartPageSkeleton } from "@/src/components/Skeletons/Cart/CartPageSkeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "WDI - Cart",
  description: "Explore Your Cart And Checkout Now",
};

export default function CartPage() {
  return (
    <Suspense fallback={<CartPageSkeleton />}>
      <CartFullPage />
    </Suspense>
  );
}
