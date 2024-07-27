import * as z from "zod";
export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Please enter vaild email address",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
});
