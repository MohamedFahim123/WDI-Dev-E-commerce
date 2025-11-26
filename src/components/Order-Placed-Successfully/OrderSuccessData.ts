import { OrderSummary } from "../Orders/OrderDetails/OrderDetails";

export type TrackingStatus = "complete" | "current" | "upcoming";

export type TrackingStep = {
  id: string;
  title: string;
  datetime: string;
  status: TrackingStatus;
};

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  imageSrc: string;
};

export type Address = {
  name: string;
  line1: string;
  city: string;
  country: string;
  phone: string;
};



export const trackingSteps: TrackingStep[] = [
  {
    id: "confirmed",
    title: "Order Confirmed",
    datetime: "Mar 15, 10:30 AM",
    status: "complete",
  },
  {
    id: "packed",
    title: "Packed",
    datetime: "Mar 15, 2:15 PM",
    status: "complete",
  },
  {
    id: "shipped",
    title: "Shipped",
    datetime: "Mar 15, 2:15 PM",
    status: "complete",
  },
  {
    id: "out-for-delivery",
    title: "Out for Delivery",
    datetime: "Mar 15, 2:15 PM",
    status: "complete",
  },
  {
    id: "delivered",
    title: "Delivered",
    datetime: "Mar 15, 2:15 PM",
    status: "current",
  },
];

export const orderItems: OrderItem[] = [
  {
    id: "item-1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    imageSrc: "/assets/products/prod7.webp",
  },
  {
    id: "item-2",
    name: "Smart Watch Series 7",
    price: 899.99,
    imageSrc: "/assets/products/prod6.webp",
  },
];

export const shippingAddress: Address = {
  name: "Ahmed Al Mansoori",
  line1: "Sheikh Zayed Road, Building 42",
  city: "Dubai, UAE",
  country: "",
  phone: "+971 58 123 4567",
};

export const orderSummary: OrderSummary = {
  subtotal: 1199.99,
  shipping: 0,
  vat: 179.99,
  discount: 50,
  total: 1329.96,
  currency: "$",
  payment: "Visa",
};

export const orderMeta = {
  orderId: "sdonr34",
  placedAt: "March 15, 2025, 10:20 AM",
  estimate: "March 18–19, 2025",
};
