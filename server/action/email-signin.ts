"use server";
import { loginSchema } from "@/app/types/login-schema";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { ConsoleLogWriter, eq } from "drizzle-orm";
import { users } from "../schema";
import { generateEmailVerificationToken } from "./tokens";
import { sendVerificationEmail } from "./email";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import { error } from "console";
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
    //if existing use not have verification token
    if (!existingUser.emailVerified) {
      const verificationToken = await generateEmailVerificationToken(
        existingUser.email
      );
      await sendVerificationEmail(
        verificationToken[0].email,
        verificationToken[0].token
      );

      return { success: "Verification Email Send" };
    }
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
    //check if the email and password are already registered

    return { email };
  });
