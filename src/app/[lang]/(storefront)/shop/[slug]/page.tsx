import Container from "@/src/components/Container/Container";
import { ProductDetailsFullPage } from "@/src/features/products/components/ProductDetailsFullPage/ProductDetailsFullPage";
import { withBlockSeller } from "@/src/hoc/roleGuards";
import { getProductDetails } from "@/src/features/products/services/product.service";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  if (!slug || Number.isNaN(Number(slug))) {
    return {
      title: "Product not found",
      description: "The requested product could not be found.",
      robots: { index: false, follow: false },
    };
  }

  try {
    const product = await getProductDetails(Number(slug));
    return {
      title: `${product.name} | Product Details`,
      description: product.description || "Product details",
    };
  } catch {
    return {
      title: "Product not found",
      description: "The requested product could not be found.",
      robots: { index: false, follow: false },
    };
  }
}

async function ProductPage({ params }: Props) {
  const { slug, lang } = await params;

  const product = await getProductDetails(Number(slug));

  return (
    <section>
      <Container className="py-4">
        <ProductDetailsFullPage product={product} lang={lang} />
      </Container>
    </section>
  );
}

export default withBlockSeller(ProductPage, {
  redirectTo: (lang: string) => `/${lang}`,
});

