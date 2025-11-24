import { products } from "@/src/stores/products";
import dynamic from "next/dynamic";
import ProductCardSkeleton from "../../Skeletons/ProductCardSkeleton/ProductCardSkeleton";
const ProductCard = dynamic(
  () => import("@/src/components/ProductCard/ProductCard"),
  {
    loading: () => <ProductCardSkeleton />,
  }
);

type Props = {
  currentProductId: string;
  lang: string;
};

export function RelatedProducts({ currentProductId, lang }: Props) {
  const related = products.filter((p) => p.id !== currentProductId).slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-10 space-y-4">
      <h2 className="text-base font-semibold text-zinc-900">
        Related products
      </h2>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {related.map((item) => (
          <ProductCard key={item.id} product={item} lang={lang} />
        ))}
      </div>
    </section>
  );
}
