import { Product, ProductVariant } from "@/src/types/product.types";
import { Clock, Heart, Share2, ShoppingCart } from "lucide-react";
import { RatingStars } from "../RatingStars/RatingStars";
import { Button } from "../../ui/button";
import FullTimerBox from "../../FullTimerBox/FullTimerBox";

type Props = {
  product: Product;
  variant?: ProductVariant;
  selectedColorId?: string;
  onSelectColor?: (colorId: string) => void;
  quantity: number;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  wishlisted: boolean;
  onWishlistClick: () => void;
  onShareClick: () => void;
  onAddToCart: () => void;
  outOfStock: boolean;
};

export function ProductMainInfoCard({
  product,
  variant,
  selectedColorId,
  onSelectColor,
  quantity,
  onIncreaseQuantity,
  onDecreaseQuantity,
  wishlisted,
  onWishlistClick,
  onShareClick,
  onAddToCart,
  outOfStock,
}: Props) {
  const hasDiscount = typeof product.oldPrice === "number";
  const savings =
    hasDiscount && product.oldPrice ? product.oldPrice - product.price : 0;

  const currentColor =
    product.colors?.find((c) => c.id === selectedColorId)?.name ??
    product.colors?.[0]?.name;

  return (
    <div className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="space-y-2">
        <h1 className="text-lg font-bold text-zinc-900 lg:text-xl">
          {product.name}
        </h1>
        {product.subtitle && (
          <p className="text-sm text-zinc-600">{product.subtitle}</p>
        )}
        <div className="flex items-center justify-between gap-2">
          <RatingStars value={product.rating} count={product.reviewCount} />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-[#7C3BED]">
            ${product.price.toFixed(2)}
          </span>
          {hasDiscount && product.oldPrice && (
            <span className="text-sm text-zinc-500 line-through">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          {product.discountCount && product.badge === "OFF" && (
            <span className="rounded-full bg-orange-700 px-3 py-1 font-semibold text-white">
              {product.discountCount}% OFF
            </span>
          )}
          {product.badge === "HOT" && (
            <span className="rounded-full bg-red-600 px-3 py-1 font-semibold text-white">
              HOT
            </span>
          )}
          {product.badge === "NEW" && (
            <span className="rounded-full bg-emerald-800 px-3 py-1 font-semibold text-white">
              NEW
            </span>
          )}
          {hasDiscount && savings > 0 && (
            <span className="text-rose-600">Save ${savings.toFixed(2)}</span>
          )}
          {variant && (
            <span className="text-zinc-600">
              Stock: {variant.stock > 0 ? variant.stock : "Out of stock"}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-lg border border-orange-100 bg-orange-50 px-3 py-2 text-xs text-orange-700">
        <span className="flex items-center gap-1 text-sm font-medium">
          <Clock size={14} /> Ends in:
        </span>
        <FullTimerBox bg="bg-orange-700 text-white" />
      </div>

      <div className="space-y-1 text-xs text-zinc-600">
        <p>• Arrives within 4–6 business days or sooner</p>
        <p>
          • Sold &amp; shipped by seller:{" "}
          <span className="font-medium text-zinc-800">Store name</span>
        </p>
        <p>• In Stock – Ready to ship</p>
      </div>

      {product.colors && product.colors.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-zinc-500">
            <span>Color</span>
            {currentColor && (
              <span className="text-zinc-700">{currentColor}</span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => {
              const isActive = color.id === selectedColorId;
              return (
                <button
                  key={color.id}
                  name={color.name}
                  title={color.name}
                  type="button"
                  onClick={() => onSelectColor?.(color.id)}
                  className={`cursor-pointer flex h-9 w-9 items-center justify-center rounded-lg border transition ${
                    isActive
                      ? "border-violet-500 bg-violet-50"
                      : "border-zinc-200 hover:border-violet-300"
                  }`}
                >
                  <span
                    className="h-6 w-6 rounded-md"
                    style={{ backgroundColor: color.hex }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-xs font-medium text-zinc-500">Quantity</span>
            <div className="mt-1 flex items-center rounded-full border border-zinc-200">
              <button
                type="button"
                onClick={onDecreaseQuantity}
                className="cursor-pointer px-3 py-1 text-sm text-zinc-700 hover:bg-zinc-50"
              >
                -
              </button>
              <span className="px-4 text-sm font-medium text-zinc-900">
                {quantity}
              </span>
              <button
                type="button"
                onClick={onIncreaseQuantity}
                className="cursor-pointer px-3 py-1 text-sm text-zinc-700 hover:bg-zinc-50"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={onWishlistClick}
              className="cursor-pointer inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:border-violet-300"
            >
              <Heart
                className={`mr-1.5 h-4 w-4 ${
                  wishlisted ? "fill-rose-500 text-rose-500" : ""
                }`}
              />
              Wishlist
            </button>
            <button
              type="button"
              onClick={onShareClick}
              className="cursor-pointer inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:border-violet-300"
            >
              <Share2 className="mr-1.5 h-4 w-4" />
              Share
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            type="button"
            size="lg"
            disabled={outOfStock}
            className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-full border border-[#7C3BED] bg-[#7C3BED] text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#7C3BED]"
            onClick={onAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            {outOfStock ? "Out of stock" : "Add to Cart"}
          </Button>

          <Button
            type="button"
            variant="outline"
            size="lg"
            className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-full border-violet-500 text-sm text-[#7C3BED] hover:bg-violet-50"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}
