import React from "react";
import OrderItemsCardSkeleton from "./OrderItemsCard/OrderItemsCardSkeleton";
import OrderSuccessHeaderSkeleton from "./OrderSuccessHeader/OrderSuccessHeaderSkeleton";
import OrderSummaryCardSkeleton from "./OrderSummaryCard/OrderSummaryCardSkeleton";
import OrderTrackingCardSkeleton from "./OrderTrackingCard/OrderTrackingCardSkeleton";
import ShippingAddressCardSkeleton from "./ShippingAddressCard/ShippingAddressCardSkeleton";

function OrderPlacedSuccessfullySkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <OrderSuccessHeaderSkeleton />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2.1fr)_minmax(260px,0.9fr)]">
        <OrderTrackingCardSkeleton />
        <OrderSummaryCardSkeleton />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <OrderItemsCardSkeleton />
        <ShippingAddressCardSkeleton />
      </div>
    </div>
  );
}
export default React.memo(OrderPlacedSuccessfullySkeleton);
