
import CouponCard from "./CouponCard";

export type CouponVariant = "purple" | "blue" | "pink";

export interface Coupon {
  id: string;
  badge: string;
  variant: CouponVariant;
  title: string;
  description?: string;
  code: string;
  expiresOn: string;
}

interface CouponsSectionProps {
  coupons: Coupon[];
}

export default function CouponsSection({ coupons }: CouponsSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-[#000000]">My Coupons</h2>
        <span className="text-xs font-bold text-[#000000]">
          {coupons.length} Available
        </span>
      </div>

      <div className="space-y-3">
        {coupons.map((coupon) => (
          <CouponCard key={coupon.id} coupon={coupon} />
        ))}
      </div>
    </section>
  );
}
