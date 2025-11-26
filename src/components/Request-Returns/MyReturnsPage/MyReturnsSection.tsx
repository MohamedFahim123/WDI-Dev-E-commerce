"use client";
import dynamic from "next/dynamic";
import MyReturnsSkeleton from "./MyReturnsSkeleton";

const MyReturnsPage = dynamic(() => import("./MyReturnsPage"), {
  loading: () => <MyReturnsSkeleton />,
  ssr: false,
});

export default function MyReturnsSection() {
  return <MyReturnsPage />;
}
