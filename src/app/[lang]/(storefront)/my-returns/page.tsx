import MyReturnsSection from "@/src/components/Request-Returns/MyReturnsPage/MyReturnsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - My Rerturns Orders",
};

export default function MyReturnsRoutePage() {
  return <MyReturnsSection />;
}
