"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { ReturnItem, AED, PRIMARY_COLOR } from "../ReturnRequestData";
import { useRouteLang } from "@/src/hooks/useLang";

type Props = {
  item: ReturnItem;
  onReturn?: (item: ReturnItem) => void;
};

export default function ReturnItemCard({ item, onReturn }: Props) {
  const router = useRouter();
  const lang = useRouteLang();

  const goToReturnRequest = () => {
    router.push(`/${lang}/request-return/${item.id}`);
  };

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-[#E4E4E7] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <button
        type="button"
        className="flex w-full flex-col cursor-pointer transition-all duration-200 gap-1 rounded-t-2xl px-4 pt-4 pb-3 text-left hover:bg-[#F9FAFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3BED] focus-visible:ring-offset-2"
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
            <h2
              onClick={goToReturnRequest}
              className="line-clamp-2 cursor-pointer hover:text-[#7C3BED] transition-all duration-200 text-[13px] font-semibold text-[#111827]"
            >
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
          onClick={goToReturnRequest}
          className="w-full cursor-pointer rounded-full border border-[#7C3BED] bg-[#7C3BED] text-[12px] font-medium text-white transition-colors hover:bg-white hover:text-[#7C3BED]"
        >
          Return
        </Button>
      </div>
    </div>
  );
}
