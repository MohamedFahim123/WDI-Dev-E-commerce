"use client";

import dynamic from "next/dynamic";
import ProfileInfoCardSkeleton from "../../Buyer/ProfileInfoCard/ProfileInfoCardSkeleton";

const ProfileInfoCard = dynamic(
  () => import("../../Buyer/ProfileInfoCard/ProfileInfoCard").then((mod) => mod.default),
  {
    loading: () => <ProfileInfoCardSkeleton />,
    ssr: false,
  }
);

export default function ProfileSection() {
  return <ProfileInfoCard />;
}
