import z from "zod";

export const checkoutSchema = z.object({
  addressId: z.string({
    message: "Please select a delivery address.",
  }),
  shippingMethodId: z.string({
    message: "Please select a shipping method.",
  }),
  paymentMethodId: z.string({
    message: "Please select a payment method.",
  }),
  notes: z.string().optional(),
});
