import Link from "next/link";
import { MessageCircle, Store, Star } from "lucide-react";

export function ProductSellerInfoCard({ lang }: { lang: string }) {
  return (
    <div className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm text-xs text-zinc-600">
      <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-50 text-violet-500">
          <Store className="h-4 w-4" />
        </div>
        <span>Seller Information</span>
      </div>

      <hr className="border-zinc-100" />

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-400">
          <Store className="h-5 w-5" />
        </div>

        <div className="flex-1">
          <div className="text-sm font-semibold text-zinc-900">
            Premium Audio Store
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-zinc-500">
            <span className="inline-flex items-center gap-1">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="font-medium text-zinc-900">4.9</span>
            </span>
            <span>1,543 Products</span>
          </div>

          <div className="mt-1 text-[11px]">
            Response Rate:{" "}
            <span className="font-semibold text-[#17171C]">98%</span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
        <Link
          href={`/${lang}/store/storedetails`}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 font-medium text-zinc-800 hover:border-violet-300 hover:bg-violet-50"
        >
          <Store className="h-4 w-4" />
          Visit Store
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 font-medium text-zinc-800 hover:border-violet-300 hover:bg-violet-50"
        >
          <MessageCircle className="h-4 w-4" />
          Chat
        </button>
      </div>
    </div>
  );
}
