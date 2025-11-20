import FeaturesSection from "@/src/components/FeaturesSection/FeaturesSection";
import FlashDeals from "@/src/components/FlashDeals/FlashDeals";
import HeroSection from "@/src/components/HeroSection/HeroSection";
import ImagesBanner from "@/src/components/ImagesBanner/ImagesBanner";
import SuperOffer from "@/src/components/SuperOffer/SuperOffer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI Home",
  description: "",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ImagesBanner />
      <FlashDeals />
      <SuperOffer />
    </>
  );
}
