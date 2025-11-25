import Link from "next/link";
import { Button } from "../../ui/button";
import CouponCard from "../CouponCard/CouponCard";
import OrderSummaryCard from "../OrderSummaryCard/OrderSummaryCard";

type CartSummarySidebarProps = {
  subtotal: number;
  shipping: number;
  vat: number;
  total: number;
  isEmpty: boolean;
  lang: string;
};

export default function CartSummarySidebar({
  subtotal,
  shipping,
  vat,
  total,
  isEmpty,
  lang,
}: CartSummarySidebarProps) {
  return (
    <aside className="space-y-4">
      <CouponCard isEmpty={isEmpty} />

      <OrderSummaryCard
        subtotal={subtotal}
        shipping={shipping}
        vat={vat}
        total={total}
      />

      <Link href={`/${lang}/checkout`}>
        <Button
          type="button"
          size="lg"
          disabled={isEmpty}
          className="mt-1 w-full cursor-pointer rounded-full bg-[#7C3BED] text-sm font-semibold text-white hover:bg-[#6d28d9]"
          aria-disabled={isEmpty}
        >
          Proceed to Checkout
        </Button>
      </Link>
    </aside>
  );
}
