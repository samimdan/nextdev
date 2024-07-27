import * as z from "zod";
export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),

  password: z.string().min(1, {
    message: "Password must be at least 6 characters",
  }),
  code: z.optional(z.string()),
});
