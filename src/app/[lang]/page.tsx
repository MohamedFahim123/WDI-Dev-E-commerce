import { Metadata } from "next";
import HomePage from "./(storefront)/page";
export const metadata: Metadata = {
  title: "WDI Home",
  description: "Explore Our Offers And Trending Products",
};
export default async function LangHomePage() {
  return <HomePage />;
}
