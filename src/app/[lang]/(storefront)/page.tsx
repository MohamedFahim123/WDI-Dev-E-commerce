import HeroSection from "@/src/components/HeroSection/HeroSection";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const FeaturesSection = dynamic(
  () => import("@/src/components/FeaturesSection/FeaturesSection"),
  {
    loading: () => <div className="h-30" />,
  }
);

const ImagesBanner = dynamic(
  () => import("@/src/components/ImagesBanner/ImagesBanner"),
  {
    loading: () => <div className="h-60" />,
  }
);

const FlashDeals = dynamic(
  () => import("@/src/components/FlashDeals/FlashDeals"),
  {
    loading: () => <div className="h-[400px]" />,
  }
);

const SuperOffer = dynamic(
  () => import("@/src/components/SuperOffer/SuperOffer"),
  {
    loading: () => <div className="h-[400px]" />,
  }
);

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
