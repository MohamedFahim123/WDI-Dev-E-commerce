import { z } from "zod";

const roles = ["buyer", "seller"] as const;

export const loginSchema = z.object({
  identifier: z.string().min(1, "Email or phone is required").trim(),
  password: z.string().min(8, "Minimum 8 characters"),
  role: z.enum(roles, {
    message: "Please select a role",
  }),
});

export type LoginInput = z.infer<typeof loginSchema>;
