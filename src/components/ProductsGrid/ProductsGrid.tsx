import { products } from "@/src/stores/products";
import dynamic from "next/dynamic";
import ProductCardSkeleton from "../Skeletons/ProductCardSkeleton/ProductCardSkeleton";
const ProductCard = dynamic(() => import("../ProductCard/ProductCard"), {
  loading: () => <ProductCardSkeleton />,
});

export default function ProductsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.slice(0, 7).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
