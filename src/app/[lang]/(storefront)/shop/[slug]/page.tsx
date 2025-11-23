import type { Metadata } from "next";
import { getProductBySlug } from "@/src/services/productService";
import { ProductDetailsFullPage } from "@/src/components/ProductDetailsFullPage/ProductDetailsFullPage";
import Container from "@/src/components/Container/Container";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product not found",
      description: "The requested product could not be found.",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${product.name} | Product Details`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  return (
    <section>
      <Container className="py-4">
        <ProductDetailsFullPage slug={slug} />
      </Container>
    </section>
  );
}
