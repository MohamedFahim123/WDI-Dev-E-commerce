import { Tag } from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

export default function CouponCard({ isEmpty }: { isEmpty: boolean }) {
  const couponId = "cart-coupon-code";

  return (
    <section
      aria-label="Apply coupon"
      className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
    >
      <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
        <Tag className="h-4 w-4 text-[#7C3BED]" />
        <span>Have a Coupon?</span>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={couponId} className="sr-only">
          Coupon code
        </label>
        <Input
          id={couponId}
          type="text"
          placeholder="Enter coupon code"
          className="h-9 flex-1 rounded-full bg-zinc-50 text-sm"
          autoComplete="off"
        />
        <Button
          type="button"
          size="sm"
          className="h-9 rounded-full bg-[#7C3BED] px-4 text-xs font-semibold text-white hover:bg-[#6d28d9]"
          disabled={isEmpty}
        >
          Apply
        </Button>
      </div>
    </section>
  );
}
