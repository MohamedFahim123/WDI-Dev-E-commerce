import { Product } from "@/src/types/product.types";
import type { CartItem } from "@/src/stores/cartStore";
import CartCardItem from "../CartItem/CartItem";

export type CartProductItem = CartItem & {
  product: Product;
};

export type StoreGroup = {
  id: string;
  name: string;
  items: CartProductItem[];
};

type CartStoreCardProps = {
  group: StoreGroup;
  isWishlisted: (productId: string) => boolean;
  onIncreaseQuantity: (key: CartItem["key"], quantity: number) => void;
  onDecreaseQuantity: (key: CartItem["key"], quantity: number) => void;
  onRemoveItem: (key: CartItem["key"]) => void;
  onSaveForLater: (item: CartProductItem) => void;
};

export default function CartStoreCard({
  group,
  isWishlisted,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
  onSaveForLater,
}: CartStoreCardProps) {
  return (
    <section
      aria-label={`Items from ${group.name}`}
      className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-3">
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-50 text-[11px] font-semibold text-[#7C3BED]"
          >
            {group.name.charAt(0)}
          </div>
          <span className="text-sm font-semibold text-zinc-900">
            {group.name}
          </span>
        </div>
      </div>

      <div className="divide-y divide-zinc-100">
        {group.items.map((item) => (
          <CartCardItem
            key={item.key}
            item={item}
            isWishlisted={isWishlisted(item.product.id)}
            onIncrease={() => onIncreaseQuantity(item.key, item.quantity)}
            onDecrease={() => onDecreaseQuantity(item.key, item.quantity)}
            onRemove={() => onRemoveItem(item.key)}
            onSaveForLater={() => onSaveForLater(item)}
          />
        ))}
      </div>
    </section>
  );
}
