import Container from "@/src/components/Container/Container";
import { ProductDetailsFullPage } from "@/src/components/ProductDetailsFullPage/ProductDetailsFullPage";
import { withBlockSeller } from "@/src/hoc/roleGuards";
import {
  getProductDetailsService,
  normalizeProductDetails,
} from "@/src/services/product.service";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;

  if (!slug || isNaN(Number(slug))) {
    return {
      title: "Product not found",
      description: "The requested product could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const res = await getProductDetailsService(Number(slug));

  if (!res.success) {
    return {
      title: "Product not found",
      description: res.message || "The requested product could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const product = normalizeProductDetails(res.data);

  return {
    title: `${product.name} | Product Details`,
    description: product.description || "Product details",
  };
}

async function ProductPage({ params }: Props) {
  const { slug } = await params;

  if (!slug || isNaN(Number(slug))) {
    return (
      <section>
        <Container className="py-4">Product not found</Container>
      </section>
    );
  }

  const res = await getProductDetailsService(Number(slug));

  if (!res.success) {
    return (
      <section>
        <Container className="py-4">
          {res.message || "Product not found"}
        </Container>
      </section>
    );
  }

  const product = normalizeProductDetails(res.data);

  return (
    <section>
      <Container className="py-4">
        <ProductDetailsFullPage product={product} />
      </Container>
    </section>
  );
}

export default withBlockSeller(ProductPage, {
  redirectTo: (lang: string) => `/${lang}`,
});
