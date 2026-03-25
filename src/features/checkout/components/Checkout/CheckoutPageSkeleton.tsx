
import React from "react";
import CheckoutStepperSkeleton from "./CheckoutStepper/CheckoutStepperSkeleton";
import OrderSummarySkeleton from "./OrderSummary/OrderSummarySkeleton";
import AddressStepSkeleton from "./Steps/AddressStepSkeleton";
import ShippingStepSkeleton from "./Steps/ShippingStepSkeleton";
import PaymentStepSkeleton from "./Steps/PaymentStepSkeleton";
import ReviewStepSkeleton from "./Steps/ReviewStepSkeleton";

type CheckoutPageSkeletonProps = {
  step?: 1 | 2 | 3 | 4;
};

const CheckoutPageSkeleton: React.FC<CheckoutPageSkeletonProps> = ({
  step = 1,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="h-7 w-32 rounded skeleton-shimmer" />

      <CheckoutStepperSkeleton />

      <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,2.1fr)_minmax(260px,0.9fr)]">
        <div className="flex flex-col gap-6">
          {step === 1 && <AddressStepSkeleton />}
          {step === 2 && <ShippingStepSkeleton />}
          {step === 3 && <PaymentStepSkeleton />}
          {step === 4 && <ReviewStepSkeleton />}

          <div className="flex flex-col-reverse gap-3 pt-1 md:flex-row md:items-center md:justify-between">
            <div className="h-10 w-full rounded-full skeleton-shimmer md:w-[140px]" />
            <div className="h-10 w-full rounded-full skeleton-shimmer md:w-[260px]" />
          </div>
        </div>

        <OrderSummarySkeleton />
      </div>
    </div>
  );
};

export default React.memo(CheckoutPageSkeleton);
