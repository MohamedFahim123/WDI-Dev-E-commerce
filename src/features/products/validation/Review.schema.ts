import { z } from "zod";

export const ReviewSchema = z.object({
  userName: z.string().min(1, { message: "Name is required" }),

  rating: z
    .number({ message: "Rating Should be Number" })
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating must be at most 5" }),

  comment: z
    .string()
    .min(10, { message: "Review must be at least 10 characters" }),
});

export type ReviewSchemaType = z.infer<typeof ReviewSchema>;
