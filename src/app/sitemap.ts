import { MetadataRoute } from "next";
import { products } from "@/src/stores/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://wdi-dev-e-commerce.vercel.app";

  const languages = ["en", "ar"];

  const productUrls = products.flatMap((product) =>
    languages.map((lang) => ({
      url: `${baseUrl}/${lang}/shop/${product.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  );

  const staticPages = [
    { url: `${baseUrl}/en`, priority: 1.0 },
    { url: `${baseUrl}/ar`, priority: 1.0 },
    { url: `${baseUrl}/en/shop`, priority: 0.9 },
    { url: `${baseUrl}/ar/shop`, priority: 0.9 },
    { url: `${baseUrl}/en/categories`, priority: 0.8 },
    { url: `${baseUrl}/ar/categories`, priority: 0.8 },
  ];

  return [
    ...staticPages.map((p) => ({
      ...p,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
    })),
    ...productUrls,
  ];
}
