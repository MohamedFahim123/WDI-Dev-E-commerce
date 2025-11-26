"use client";
import dynamic from "next/dynamic";
import ReturnRequestSkeleton from "./ReturnRequestSkeleton";
const ReturnRequestPage = dynamic(() => import("./ReturnRequestPage"), {
  loading: () => <ReturnRequestSkeleton />,
  ssr: false,
});

export default function MyRequestReturnsSection() {
  return <ReturnRequestPage />;
}
