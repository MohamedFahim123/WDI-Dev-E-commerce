import { checkoutSchema } from "@/src/validation/CheckoutSchema";
import z from "zod";

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export type Step = 1 | 2 | 3 | 4;

export const ADDRESSES = [
  {
    id: "home",
    label: "Home",
    isDefault: true,
    name: "Mohamed Zain",
    phone: "+971 123 456 789",
    line1: "123 Main Street, Build A4",
    city: "Dubai, Burj Khalifa",
  },
  {
    id: "office",
    label: "Office",
    isDefault: false,
    name: "Mohamed Zain",
    phone: "+971 123 456 789",
    line1: "30 Main Street, Build B2",
    city: "Dubai, Burj Khalifa",
  },
];

export const SHIPPING_OPTIONS = [
  {
    id: "standard",
    title: "Standard Delivery",
    description: "5–7 business days\nRegular delivery with tracking",
    price: 5.99,
  },
  {
    id: "express",
    title: "Express Delivery",
    description: "2–3 business days\nFaster delivery with priority handling",
    price: 15.99,
  },
  {
    id: "overnight",
    title: "Overnight Express",
    description: "Next business day\nFastest option available",
    price: 20.99,
    badge: "Popular",
  },
];

export const PAYMENT_OPTIONS = [
  {
    id: "card",
    title: "Credit/Debit Card",
    description: "Pay securely with your card",
  },
  {
    id: "applepay",
    title: "Apple Pay",
    description: "Fast and secure payment with Apple Pay",
    badge: "Quick",
  },
  {
    id: "bnpl",
    title: "Buy Now, Pay Later",
    description: "Split your payment with Tabby or Tamara",
    badge: "0% interest",
  },
  {
    id: "cod",
    title: "Cash on Delivery",
    description: "Pay when you receive your order",
  },
];

export const AED = (value: number) => `AED ${value.toFixed(2)}`;
