import { ReturnItem } from "./ReturnRequestData";

export type ReturnStatusId =
  | "requested"
  | "approved"
  | "picked-up"
  | "inspected"
  | "refunded";

export type ReturnOrder = {
  id: string; 
  item: ReturnItem;
  status: ReturnStatusId;
};

export const RETURN_STATUS_STEPS: { id: ReturnStatusId; label: string }[] = [
  { id: "requested", label: "Requested" },
  { id: "approved", label: "Approved" },
  { id: "picked-up", label: "Picked Up" },
  { id: "inspected", label: "Inspected" },
  { id: "refunded", label: "Refunded" },
];

export const MY_RETURN_ORDERS: ReturnOrder[] = [
  {
    id: "12345",
    item: {
      id: "1",
      name: "Wireless Bluetooth Headphones with Noise Cancelling",
      price: 79,
      imageSrc: "/assets/products/prod7.webp",
      quantity: 1,
      deliveredOn: "Delivered: Oct 2",
    },
    status: "requested",
  },
  {
    id: "12346",
    item: {
      id: "2",
      name: "Wireless Bluetooth Headphones with Noise Cancelling",
      price: 79,
      imageSrc: "/assets/products/prod6.webp",
      quantity: 1,
      deliveredOn: "Delivered: Oct 2",
    },
    status: "approved",
  },
  {
    id: "12347",
    item: {
      id: "3",
      name: "Wireless Bluetooth Headphones with Noise Cancelling",
      price: 79,
      imageSrc: "/assets/products/prod5.webp",
      quantity: 1,
      deliveredOn: "Delivered: Oct 2",
    },
    status: "picked-up",
  },
];
