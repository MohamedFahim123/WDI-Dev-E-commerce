import Image from "next/image";

type Item = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

export default function OrderItemsDashboard({
  items,
  currency,
}: {
  items: Item[];
  currency: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold">Order Items</h2>

      <ul className="space-y-4">
        {items.map((it) => (
          <li key={it.id} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              {it.image && (
                <Image
                  src={it.image}
                  alt={it.name}
                  width={64}
                  height={64}
                  className="h-14 w-14 rounded-xl bg-[#e5e7eb] object-cover"
                />
              )}
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{it.name}</p>
                <p className="text-xs text-gray-500">Quantity: {it.quantity}</p>
              </div>
            </div>
            <div className="text-sm font-semibold">
              {currency} {it.price.toFixed(2)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
