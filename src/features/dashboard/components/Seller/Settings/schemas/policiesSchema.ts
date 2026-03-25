import { z } from "zod";

export const policiesSchema = z.object({
  shippingEn: z.string().max(2000).optional().or(z.literal("")),
  shippingAr: z.string().max(2000).optional().or(z.literal("")),
  returnEn: z.string().max(2000).optional().or(z.literal("")),
  returnAr: z.string().max(2000).optional().or(z.literal("")),
  warrantyEn: z.string().max(2000).optional().or(z.literal("")),
  warrantyAr: z.string().max(2000).optional().or(z.literal("")),
});

export type PoliciesFormValues = z.infer<typeof policiesSchema>;
