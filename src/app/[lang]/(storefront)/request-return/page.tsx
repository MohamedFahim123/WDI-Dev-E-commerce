import ReturnRequestPage from "@/src/components/Request-Returns/ReturnRequestPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WDI - Request Return / Exchange Request",
};

export default function RequestReturnsPage() {
  return <ReturnRequestPage />;
}
