import { z } from "zod";

export const productSchema = z.object({
  category: z.object({
    main: z.string().min(1, "Select main category"),
    sub: z.string().optional(),
  }),
  electronics: z
    .object({
      main: z.string().optional(),
      sub: z.string().optional(),
    })
    .optional(),

  brandType: z.enum(["Brand", "Unbranded"]).default("Brand"),
  brand: z.string().min(1, "Select a brand"),

  pskuType: z.enum(["Enter", "Auto"]).default("Enter"),
  psku: z.string().min(1, "Provide PSKU").optional(),

  titleEN: z.string().min(1, "Enter product title (EN)"),
  titleAR: z.string().optional(),
  longDescriptionEN: z.string().optional(),
  longDescriptionAR: z.string().optional(),

  basePrice: z.preprocess(
    (v) => (v === "" ? undefined : Number(v)),
    z.number().nonnegative().optional()
  ),
  discountedPrice: z.preprocess(
    (v) => (v === "" ? undefined : Number(v)),
    z.number().nonnegative().optional()
  ),
  vatRate: z.string().optional(),
  stockQty: z.preprocess(
    (v) => (v === "" ? undefined : Number(v)),
    z.number().nonnegative().optional()
  ),
  skuBarcode: z.string().optional(),

  variants: z
    .object({
      sizes: z.array(z.string()).optional(),
      colours: z.array(z.string()).optional(),
    })
    .optional(),

  tags: z.array(z.string()).optional(),
  bundleId: z.string().optional(),
  crossSellIds: z.string().optional(),

  shipLength: z.preprocess(
    (v) => (v === "" ? undefined : Number(v)),
    z.number().nonnegative().optional()
  ),
  shipWidth: z.preprocess(
    (v) => (v === "" ? undefined : Number(v)),
    z.number().nonnegative().optional()
  ),
  shipHeight: z.preprocess(
    (v) => (v === "" ? undefined : Number(v)),
    z.number().nonnegative().optional()
  ),
  shipWeight: z.preprocess(
    (v) => (v === "" ? undefined : Number(v)),
    z.number().nonnegative().optional()
  ),

  images: z.array(z.any()).optional(),
});

export type FormValues = z.infer<typeof productSchema>;
