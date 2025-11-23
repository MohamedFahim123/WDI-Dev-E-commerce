import { Tag } from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

type Props = {
  isEmpty: boolean;
};

export default function CouponCard({ isEmpty }: Props) {
  const couponId = "cart-coupon-code";

  return (
    <section
      aria-label="Apply coupon"
      className="space-y-3 rounded-2xl border border-[#E4E4E7] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
    >
      <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
        <Tag className="h-4 w-4 text-[#7C3BED]" />
        <span>Have a Coupon?</span>
      </div>

      <div className="mt-1 flex flex-col gap-2 sm:flex-row">
        <label htmlFor={couponId} className="sr-only">
          Coupon code
        </label>

        <Input
          id={couponId}
          type="text"
          placeholder="Enter coupon code"
          autoComplete="off"
          className="h-10 flex-1 rounded-xl border border-[#E4E4E7] bg-[#F9FAFB] px-3 text-xs sm:text-sm placeholder:text-zinc-400 focus-visible:ring-[#7C3BED]"
        />

        <Button
          type="button"
          size="sm"
          className="h-10 rounded-xl bg-[#7C3BED] px-5 text-xs font-semibold text-white shadow-sm hover:bg-[#6D28D9] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isEmpty}
        >
          Apply
        </Button>
      </div>
    </section>
  );
}
