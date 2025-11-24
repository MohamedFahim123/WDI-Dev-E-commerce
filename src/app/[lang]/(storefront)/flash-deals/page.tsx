import FlashDealsFullContent from "@/src/components/FlashDealsFullContent/FlashDealsFullContent";
import { Metadata } from "next";

export const metadata: Metadata ={
  title: "WDI - Flash Deals",
  description: "Create Your Best Purchase through us!"
}

export default function FlashDealsPage() {
  return <FlashDealsFullContent />;
}
