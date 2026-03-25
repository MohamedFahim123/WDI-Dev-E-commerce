"use client";

import dynamic from "next/dynamic";
import { ReturnItem } from "../ReturnRequestData";
import ReturnItemRequestSkeleton from "./ReturnItemRequestSkeleton";

const ReturnItemRequestPage = dynamic(() => import("./ReturnItemRequestPage"), {
  loading: () => <ReturnItemRequestSkeleton />,
  ssr: false,
});
export default function ReturnedItemRequestSection({
  item,
}: {
  item: ReturnItem;
}) {
  return <ReturnItemRequestPage item={item} />;
}
