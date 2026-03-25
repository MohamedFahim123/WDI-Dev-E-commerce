"use client";

import { OrderShippingAddress } from "../../Orders/OrderDetails/OrderDetails";


type Props = {
  shipping: OrderShippingAddress;
};

export default function ShippingAddressCard({ shipping }: Props) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Shipping Address</h2>
      <p className="font-medium">{shipping.name}</p>
      <p className="text-sm text-muted-foreground">{shipping.address}</p>
      <p className="text-sm text-muted-foreground">{shipping.city}</p>
      <p className="text-sm text-muted-foreground">{shipping.phone}</p>
    </section>
  );
}
