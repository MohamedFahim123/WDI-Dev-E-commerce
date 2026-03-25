"use client";
import HeroSection from "@/src/features/home/components/HeroSection/HeroSection";
import FeaturesSectionSkeleton from "@/src/components/Skeletons/FeaturesSectionSkeleton/FeaturesSectionSkeleton";
import FlashDealsSkeleton from "@/src/components/Skeletons/FlashDealsSkeleton/FlashDealsSkeleton";
import ImagesBannerSkeleton from "@/src/components/Skeletons/ImagesBannerSkeleton/ImagesBannerSkeleton";
import SuperOfferSkeleton from "@/src/components/Skeletons/SuperOfferSkeleton/SuperOfferSkeleton";
import { useRouteLang } from "@/src/hooks/useLang";
import { useAuthStore } from "@/src/features/auth/stores/authStore";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const FeaturesSection = dynamic(
  () => import("@/src/features/home/components/FeaturesSection/FeaturesSection"),
  {
    ssr: false,
    loading: () => <FeaturesSectionSkeleton />,
  }
);

const ImagesBanner = dynamic(
  () => import("@/src/features/home/components/ImagesBanner/ImagesBanner"),
  {
    ssr: false,
    loading: () => <ImagesBannerSkeleton />,
  }
);

const FlashDeals = dynamic(
  () => import("@/src/features/home/components/FlashDeals/FlashDeals"),
  {
    ssr: false,
    loading: () => <FlashDealsSkeleton />,
  }
);

const SuperOffer = dynamic(
  () => import("@/src/features/home/components/SuperOffer/SuperOffer"),

  {
    ssr: false,
    loading: () => <SuperOfferSkeleton />,
  }
);

export default function HomePage() {
  const role = useAuthStore((s) => s.role);

  return (
    <>
      <HeroSection />
      {role === "seller" ? (
        <></>
      ) : (
        <>
          <FeaturesSection />
          <ImagesBanner />
          <FlashDeals />
          <SuperOffer />
        </>
      )}
    </>
  );
}

