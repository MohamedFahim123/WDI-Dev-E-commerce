import { OrderDetailsInterface } from "../Orders/OrderDetails/OrderDetails";
import OrderItemsCard from "./OrderItemsCard/OrderItemsCard";
import OrderSuccessHeader from "./OrderSuccessHeader/OrderSuccessHeader";
import OrderSummaryCard from "./OrderSummaryCard/OrderSummaryCard";
import OrderTrackingCard from "./OrderTrackingCard/OrderTrackingCard";
import ShippingAddressCard from "./ShippingAddressCard/ShippingAddressCard";

type Props = {
  order: OrderDetailsInterface;
};

export default function OrderPlacedSuccessfully({ order }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <OrderSuccessHeader />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2.1fr)_minmax(260px,0.9fr)]">
        <OrderTrackingCard
          tracking={order.tracking}
          courier={order.courier}
          trackingNumber={order.trackingNumber}
        />
        <OrderSummaryCard summary={order.summary} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <OrderItemsCard items={order.items} currency={order.summary.currency} />
        <ShippingAddressCard shipping={order.shipping} />
      </div>
    </div>
  );
}
