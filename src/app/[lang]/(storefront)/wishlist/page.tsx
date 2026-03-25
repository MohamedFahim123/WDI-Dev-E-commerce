import WishlistFullPage from "@/src/features/wishlist/components/WishlistFullPage/WishlistFullPage";
import { withBlockSeller } from "@/src/hoc/roleGuards";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - Wishlist",
  description: "View and manage your saved products.",
};

function WishlistPage() {
  return <WishlistFullPage />;
}

export default withBlockSeller(WishlistPage, {
  redirectTo: (lang: string) => `/${lang}`,
});

