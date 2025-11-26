import React from "react";
import OrderTrackingCardSkeleton from "../../Order-Placed-Successfully/OrderTrackingCard/OrderTrackingCardSkeleton";
import OrderSummaryCardSkeleton from "../../Order-Placed-Successfully/OrderSummaryCard/OrderSummaryCardSkeleton";
import OrderItemsCardSkeleton from "../../Order-Placed-Successfully/OrderItemsCard/OrderItemsCardSkeleton";
import ShippingAddressCardSkeleton from "../../Order-Placed-Successfully/ShippingAddressCard/ShippingAddressCardSkeleton";

function OrderDetailsSkeleton() {
  return (
    <div className="flex flex-col gap-6">
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
export default React.memo(OrderDetailsSkeleton);
