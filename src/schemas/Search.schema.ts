import z from "zod";

export const searchSchema = z.object({
  query: z.string().min(2, "Please enter at least 2 characters"),
});

export type SearchFormValues = z.infer<typeof searchSchema>;
