"use client";

import dynamic from "next/dynamic";
import { ReturnOrder } from "../MyReturnsData";
import ReturnStatusDetailsSkeleton from "./ReturnStatusDetailsSkeleton";

const ReturnStatusDetailsPage = dynamic(
  () => import("./ReturnStatusDetailsPage"),
  {
    loading: () => <ReturnStatusDetailsSkeleton />,
    ssr: false,
  }
);
export default function MySingleReturnDetails({
  order,
}: {
  order: ReturnOrder;
}) {
  return <ReturnStatusDetailsPage order={order} />;
}
