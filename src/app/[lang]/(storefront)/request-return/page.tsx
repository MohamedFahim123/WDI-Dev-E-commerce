import MyRequestReturnsSection from "@/src/components/Request-Returns/MyRequestReturnsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - Request Return / Exchange Request",
};

export default function RequestReturnsPage() {
  return <MyRequestReturnsSection />;
}
