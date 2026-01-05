import CartFullPage from "@/src/components/CartFullPage/CartFullPage";
import { CartPageSkeleton } from "@/src/components/Skeletons/Cart/CartPageSkeleton";
import { withBlockSeller } from "@/src/hoc/roleGuards";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "WDI - Cart",
  description: "Explore Your Cart And Checkout Now",
};

function CartPage() {
  return (
    <Suspense fallback={<CartPageSkeleton />}>
      <CartFullPage />
    </Suspense>
  );
}

export default withBlockSeller(CartPage, {
  redirectTo: (lang: string) => `/${lang}`,
});
