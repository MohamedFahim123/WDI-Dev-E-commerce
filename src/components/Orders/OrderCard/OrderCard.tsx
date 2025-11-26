import Link from "next/link";
import type { Order } from "../OrdersSection";
import Image from "next/image";

interface OrderCardProps {
  order: Order;
  lang: string;
}

export function OrderCard({ order, lang }: OrderCardProps) {
  return (
    <article
      className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm"
      aria-label={`Order #${order.id} placed on ${order.dateLabel}`}
    >
      <header className="mb-3 flex items-start justify-between text-xs sm:text-sm">
        <h3 className="font-semibold text-foreground">
          Order <span>#{order.id}</span>
        </h3>

        <time
          dateTime={order.dateISO}
          className="text-[10px] text-muted-foreground sm:text-xs"
        >
          {order.dateLabel}
        </time>
      </header>

      <div className="mb-4 flex gap-2">
        {order.items.slice(0, 3).map((item, index) => (
          <Image
            src={`/assets/products/prod${index + 1}.webp`}
            alt="Product image"
            width={100}
            height={100}
            key={item.id}
            aria-hidden="true"
            className="h-14 w-14 flex-shrink-0 rounded-xl bg-yellow-300"
          />
        ))}
      </div>

      <div className="mt-auto space-y-3 text-xs sm:text-sm">
        <p>
          <span className="text-muted-foreground">Total:&nbsp;</span>
          <span className="font-semibold text-[#7C3BED]">
            {order.currency} {order.total.toFixed(2)}
          </span>
        </p>

        <Link
          href={`/${lang}/my-orders/${order.id}`}
          className="inline-flex w-full items-center justify-center rounded-lg bg-[#7C3BED] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#6A2FDB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3BED] focus-visible:ring-offset-2"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
