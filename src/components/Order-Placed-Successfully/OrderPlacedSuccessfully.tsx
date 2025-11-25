import OrderItemsCard from "./OrderItemsCard/OrderItemsCard";
import OrderSuccessHeader from "./OrderSuccessHeader/OrderSuccessHeader";
import OrderSummaryCard from "./OrderSummaryCard/OrderSummaryCard";
import OrderTrackingCard from "./OrderTrackingCard/OrderTrackingCard";
import ShippingAddressCard from "./ShippingAddressCard/ShippingAddressCard";

export default function OrderPlacedSuccessfully() {
  return (
    <div className="flex flex-col gap-6">
      <OrderSuccessHeader />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2.1fr)_minmax(260px,0.9fr)]">
        <OrderTrackingCard />
        <OrderSummaryCard />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <OrderItemsCard />
        <ShippingAddressCard />
      </div>
    </div>
  );
}
