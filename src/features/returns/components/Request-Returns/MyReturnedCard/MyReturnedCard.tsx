"use client";

import { Button } from "@/src/components/ui/button";
import { useRouteLang } from "@/src/hooks/useLang";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RETURN_STATUS_STEPS, ReturnOrder } from "../MyReturnsData";
import { AED, PRIMARY_COLOR } from "../ReturnRequestData";

type Props = {
  order: ReturnOrder;
};

const STATUS_COLORS: Record<
  ReturnOrder["status"],
  { bg: string; text: string }
> = {
  requested: { bg: "#FEF3C7", text: "#92400E" },
  approved: { bg: "#DCFCE7", text: "#166534" },
  "picked-up": { bg: "#EEF2FF", text: "#7C3BED" },
  inspected: { bg: "#E5E7EB", text: "#4B5563" },
  refunded: { bg: "#E5E7EB", text: "#4B5563" },
};

export default function MyReturnedCard({ order }: Props) {
  const router = useRouter();
  const lang = useRouteLang();
  const { item } = order;

  const goToDetails = () => {
    router.push(`/${lang}/my-returns/${order.id}`);
  };

  const statusMeta = RETURN_STATUS_STEPS.find((s) => s.id === order.status)!;
  const colors = STATUS_COLORS[order.status];

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-[#E4E4E7] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <button
        type="button"
        onClick={goToDetails}
        className="flex w-full cursor-pointer flex-col gap-1 rounded-t-2xl px-4 pt-4 pb-3 text-left hover:bg-[#F9FAFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3BED] focus-visible:ring-offset-2"
      >
        <div className="flex gap-3">
          <Image
            src={item.imageSrc}
            alt={item.name}
            width={64}
            height={64}
            className="h-14 w-14 rounded-md bg-[#e5e7eb] object-cover"
          />

          <div className="flex-1">
            <h2 className="line-clamp-2 cursor-pointer hover:text-[#7C3BED] transition-all duration-200 text-[13px] font-semibold text-[#111827]">
              {item.name}
            </h2>

            <div className="mt-2 flex flex-wrap gap-2 text-[10px]">
              <span className="rounded-full bg-[#F3F4F6] px-2 py-[2px] text-[#4B5563]">
                Qty: {item.quantity}
              </span>
              <span className="rounded-full bg-[#F3F4F6] px-2 py-[2px] text-[#4B5563]">
                {item.deliveredOn}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <span
            className="inline-flex rounded-full px-3 py-[3px] text-[11px] font-medium"
            style={{
              backgroundColor: colors.bg,
              color: colors.text,
            }}
          >
            {statusMeta.label}
          </span>
        </div>

        <h3
          className="mt-2 text-[13px] font-semibold"
          style={{ color: PRIMARY_COLOR }}
        >
          {AED(item.price)}
        </h3>
      </button>

      <div className="px-4 pb-4 pt-1">
        <Button
          type="button"
          onClick={goToDetails}
          className="w-full cursor-pointer rounded-full border border-[#7C3BED] bg-[#7C3BED] text-[12px] font-medium text-white transition-colors hover:bg-white hover:text-[#7C3BED]"
        >
          More Details
        </Button>
      </div>
    </div>
  );
}
