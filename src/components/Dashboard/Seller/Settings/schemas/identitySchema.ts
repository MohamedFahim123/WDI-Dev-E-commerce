import { z } from "zod";

export const identitySchema = z.object({
  logo: z
    .any()
    .optional()
    .refine(
      (v) => !v || (v instanceof FileList && v.length <= 1),
      "Only one file allowed"
    ),
  cover: z
    .any()
    .optional()
    .refine(
      (v) => !v || (v instanceof FileList && v.length <= 1),
      "Only one file allowed"
    ),
  storeName: z.string().min(2, "Store name is required").max(100),
  taglineEn: z.string().max(240).optional().or(z.literal("")),
  taglineAr: z.string().max(240).optional().or(z.literal("")),
});

export type IdentityFormValues = z.infer<typeof identitySchema>;
