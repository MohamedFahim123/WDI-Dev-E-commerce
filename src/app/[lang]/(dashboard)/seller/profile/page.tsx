import ProfileSection from "@/src/components/Dashboard/Seller/ProfileSection/ProfileSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - Your Profile",
  description: "Here You can update your deta, which shows for all users.",
};

export default function SellerProfilePage() {
  return (
    <div className="space-y-6">
      <ProfileSection />
    </div>
  );
}
