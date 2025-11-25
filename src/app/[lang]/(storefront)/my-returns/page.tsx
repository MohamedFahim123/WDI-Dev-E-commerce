import MyReturnsPage from "@/src/components/Request-Returns/MyReturnsPage/MyReturnsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - My Rerturns Orders",
};

export default function MyReturnsRoutePage() {
  return <MyReturnsPage />;
}
