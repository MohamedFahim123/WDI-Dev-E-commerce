"use client";
import dynamic from "next/dynamic";
import { type Coupon } from "./CouponsSection";
import CouponsSkeleton from "./CouponsSkeleton";

const CouponsSection = dynamic(() => import("./CouponsSection"), {
  loading: () => <CouponsSkeleton />,
  ssr: false,
});

export default function CouponsContainer() {
  const coupons: Coupon[] = [
    {
      id: "c1",
      badge: "20% OFF",
      variant: "purple",
      title: "20% off on orders above AED 200",
      description:
        "Valid on all categories. Cannot be combined with other offers.",
      code: "SAVE20",
      expiresOn: "Dec 31, 2025",
    },
    {
      id: "c2",
      badge: "FREE SHIPPING",
      variant: "blue",
      title: "Free shipping on all orders",
      description: "No minimum purchase required.",
      code: "FREESHIP",
      expiresOn: "Jan 15, 2026",
    },
    {
      id: "c3",
      badge: "AED 50 OFF",
      variant: "pink",
      title: "AED 50 off your first order",
      description: "Valid for new customers only. Minimum purchase AED 150.",
      code: "FIRST50",
      expiresOn: "Mar 31, 2025",
    },
  ];

  return (
    <div className="space-y-4">
      <CouponsSection coupons={coupons} />
    </div>
  );
}
