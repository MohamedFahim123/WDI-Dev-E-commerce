"use client";
import HeroSection from "@/src/components/HeroSection/HeroSection";
import FeaturesSectionSkeleton from "@/src/components/Skeletons/FeaturesSectionSkeleton/FeaturesSectionSkeleton";
import FlashDealsSkeleton from "@/src/components/Skeletons/FlashDealsSkeleton/FlashDealsSkeleton";
import ImagesBannerSkeleton from "@/src/components/Skeletons/ImagesBannerSkeleton/ImagesBannerSkeleton";
import SuperOfferSkeleton from "@/src/components/Skeletons/SuperOfferSkeleton/SuperOfferSkeleton";
import dynamic from "next/dynamic";

const FeaturesSection = dynamic(
  () => import("@/src/components/FeaturesSection/FeaturesSection"),
  {
    ssr: false,
    loading: () => <FeaturesSectionSkeleton />,
  }
);

const ImagesBanner = dynamic(
  () => import("@/src/components/ImagesBanner/ImagesBanner"),
  {
    ssr: false,
    loading: () => <ImagesBannerSkeleton />,
  }
);

const FlashDeals = dynamic(
  () => import("@/src/components/FlashDeals/FlashDeals"),
  {
    ssr: false,
    loading: () => <FlashDealsSkeleton />,
  }
);

const SuperOffer = dynamic(
  () => import("@/src/components/SuperOffer/SuperOffer"),

  {
    ssr: false,
    loading: () => <SuperOfferSkeleton />,
  }
);

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
