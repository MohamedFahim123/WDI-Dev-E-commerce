import { z } from "zod";

export const createProductSchema = z.object({
  sku: z
    .string()
    .min(2, "SKU is required")
    .regex(/^[a-zA-Z0-9-_]+$/, "Only alphanumeric, - and _ allowed")
    .max(64),
  title_en: z.string().min(2, "English title is required").max(150),
  title_ar: z.string().min(2, "Arabic title is required").max(150),
  description_en: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  description_ar: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  brand: z.string().min(1, "Brand is required"),
  product_images: z
    .custom<FileList>((v) => v instanceof FileList)
    .refine(
      (files) => files && files.length >= 1,
      "At least 1 image is required"
    )
    .refine((files) => files && files.length <= 6, "Maximum 6 images allowed"),
});

export type CreateProductFormValues = z.infer<typeof createProductSchema>;
