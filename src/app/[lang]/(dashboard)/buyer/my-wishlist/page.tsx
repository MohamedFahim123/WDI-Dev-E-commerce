import MyWishlistLayout from "@/src/components/Dashboard/Buyer/My-wishlist/MyWishlistLayout";
import { Metadata } from "next";

export const metdata: Metadata = {
  title: "WDI - My Wishlist",
};

export default async function MyWishlistPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <div className="space-y-4">
      <MyWishlistLayout lang={lang} />
    </div>
  );
}
