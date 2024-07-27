"use server";
import { loginSchema } from "@/app/types/login-schema";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";

/* ------------------------------ END OF IMPORT ----------------------------- */
const acion = createSafeActionClient();
export const emailSignIn = acion
  .schema(loginSchema)
  .action(async ({ parsedInput: { email, password, code } }) => {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (existingUser?.email !== email) {
      return { error: "Email not found" };
    }
    if (!existingUser.emailVerified) {
    }
    //check if the email and password are already registered

    return { email };
  });
