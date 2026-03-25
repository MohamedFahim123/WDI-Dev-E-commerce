import ProfileSection from "@/src/features/dashboard/components/Buyer/ProfileSection/ProfileSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - Your Profile",
  description: "Here You can update your deta, which shows for all users.",
};

export default function BuyerProfilePage() {
  return (
    <div className="space-y-6">
      <ProfileSection />
    </div>
  );
}

