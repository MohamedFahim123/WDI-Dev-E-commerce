import { Product } from "@/src/types/product.types";
import ProductCard from "../ProductCard/ProductCard";

export default function ProductsGrid() {
  const products: Product[] = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones with Noise Cancelling",
      img: "/assets/products/prod1.webp",
      rating: 4.8,
      reviewCount: 120,
      currentPrice: 79.0,
      originalPrice: 159.99,
      badge: "OFF",
      discountCount: 9,
    },
    {
      id: 2,
      name: "Smart Watch Series 8 - Fitness Tracker",
      img: "/assets/products/prod2.webp",
      rating: 4.9,
      reviewCount: 120,
      currentPrice: 299.0,
      originalPrice: null,
      badge: "NEW",
      discountCount: null,
    },
    {
      id: 3,
      name: "Premium Leather Backpack - Multiple Compartments",
      img: "/assets/products/prod3.webp",
      rating: 4.7,
      reviewCount: 120,
      currentPrice: 299.0,
      originalPrice: null,
      badge: "HOT",
      discountCount: null,
    },
    {
      id: 4,
      name: "Ultra HD 4K Action Camera with Accessories",
      img: "/assets/products/prod4.webp",
      rating: 4.6,
      reviewCount: 120,
      currentPrice: 299.0,
      originalPrice: null,
      badge: "NEW",
      discountCount: null,
    },
    {
      id: 5,
      name: "Minimalist Desk Lamp with USB Charging Port",
      img: "/assets/products/prod5.webp",
      rating: 4.5,
      reviewCount: 120,
      currentPrice: 299.0,
      originalPrice: null,
      badge: "HOT",
      discountCount: null,
    },
    {
      id: 6,
      name: "Stainless Steel Water Bottle - Insulated 32oz",
      img: "/assets/products/prod6.webp",
      rating: 4.8,
      reviewCount: 120,
      currentPrice: 299.0,
      originalPrice: null,
      badge: "OFF",
      discountCount: 15,
    },
    {
      id: 7,
      name: "Mechanical Gaming Keyboard - RGB Backlit",
      img: "/assets/products/prod7.webp",
      rating: 4.9,
      reviewCount: 120,
      currentPrice: 299.0,
      originalPrice: null,
      badge: "OFF",
      discountCount: 20,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
