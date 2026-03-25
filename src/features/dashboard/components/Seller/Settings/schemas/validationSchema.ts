import { z } from "zod";

export const validationSchema = z.object({
  banner: z
    .any()
    .optional()
    .refine(
      (v) => !v || (v instanceof FileList && v.length <= 1),
      "Only one banner allowed"
    ),
  title: z.string().max(150).optional().or(z.literal("")),
  tagline: z.string().max(500).optional().or(z.literal("")),
  policyText: z.string().max(2000).optional().or(z.literal("")),
});

export type ValidationFormValues = z.infer<typeof validationSchema>;
