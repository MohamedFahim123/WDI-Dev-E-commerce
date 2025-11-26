"use client";

import dynamic from "next/dynamic";
import MyWishlistSkeleton from "./MyWishlistSkeleton";

const MyWishlistFullSection = dynamic(() => import("./MyWishlistFullSection"), {
  loading: () => <MyWishlistSkeleton />,
  ssr: false,
});

export default function MyWishlistLayout({ lang }: { lang: string }) {
  return <MyWishlistFullSection lang={lang} />;
}
