export type ReturnItem = {
  id: string;
  name: string;
  price: number;
  imageSrc: string;
  quantity: number;
  deliveredOn: string;
};

export const RETURN_ITEMS: ReturnItem[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones with Noise Cancelling",
    price: 79,
    imageSrc: "/assets/products/prod7.webp",
    quantity: 1,
    deliveredOn: "Delivered Oct 2",
  },
  {
    id: "2",
    name: "Wireless Bluetooth Headphones with Noise Cancelling",
    price: 79,
    imageSrc: "/assets/products/prod6.webp",
    quantity: 1,
    deliveredOn: "Delivered Oct 2",
  },
  {
    id: "3",
    name: "Wireless Bluetooth Headphones with Noise Cancelling",
    price: 79,
    imageSrc: "/assets/products/prod5.webp",
    quantity: 1,
    deliveredOn: "Delivered Oct 2",
  },
  {
    id: "4",
    name: "Wireless Bluetooth Headphones with Noise Cancelling",
    price: 79,
    imageSrc: "/assets/products/prod4.webp",
    quantity: 1,
    deliveredOn: "Delivered Oct 2",
  },
  {
    id: "5",
    name: "Wireless Bluetooth Headphones with Noise Cancelling",
    price: 79,
    imageSrc: "/assets/products/prod3.webp",
    quantity: 1,
    deliveredOn: "Delivered Oct 2",
  },
  {
    id: "6",
    name: "Wireless Bluetooth Headphones with Noise Cancelling",
    price: 79,
    imageSrc: "/assets/products/prod2.webp",
    quantity: 1,
    deliveredOn: "Delivered Oct 2",
  },
];

export const PRIMARY_COLOR = "#7C3BED";

export const AED = (value: number) => `${value.toFixed(2)} AED`;
