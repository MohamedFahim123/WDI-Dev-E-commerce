import ProductCardSkeleton from "@/src/components/Skeletons/ProductCardSkeleton/ProductCardSkeleton";

export default function MyWishlistSkeleton() {
  const cards = Array.from({ length: 3 });
  return (
    <section className="space-y-4 animate-pulse">
      <div className="flex items-center justify-between gap-3">
        <div className="h-5 w-36 rounded skeleton-shimmer" />
        <div className="h-9 w-40 rounded-full skeleton-shimmer" />
      </div>
      <div className="space-y-3">
        {cards.map((_, idx) => (
          <ProductCardSkeleton key={idx} />
        ))}
      </div>
    </section>
  );
}
