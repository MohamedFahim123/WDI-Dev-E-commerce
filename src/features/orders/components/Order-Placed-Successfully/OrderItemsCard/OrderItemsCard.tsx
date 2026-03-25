"use client";

import Image from "next/image";
import { OrderItem } from "../../Orders/OrderDetails/OrderDetails";

type Props = {
  items: OrderItem[];
  currency: string;
};

export default function OrderItemsCard({ items, currency }: Props) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Order Items</h2>
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between rounded-xl"
          >
            <div className="flex items-center gap-3">
              <Image
                src={item.image}
                alt={item.name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-xl bg-[#e5e7eb] object-cover"
              />
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>
            <p className="text-sm font-semibold">
              {currency} {item.price.toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
