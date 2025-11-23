import type { Metadata } from "next";
import WishlistFullPage from "@/src/components/WishlistFullPage/WishlistFullPage";

export const metadata: Metadata = {
  title: "WDI - Wishlist",
  description: "View and manage your saved products.",
};

export default function WishlistPage() {
  return <WishlistFullPage />;
}
