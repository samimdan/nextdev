"use server";
import { RegisterSchema } from "@/app/types/register-schema";
import { createSafeActionClient } from "next-safe-action";
import bcrypt from "bcrypt";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { generateEmailVerificationToken } from "./tokens";
import { sendVerificationEmail } from "./email";
//* ----------------------------- End of Imports ----------------------------- */
const action = createSafeActionClient();
export const emailRegister = action
  .schema(RegisterSchema)
  .action(async ({ parsedInput: { name, password, email } }) => {
    //* --------------- * Hash the password --------------- */
    const hashedPassword = await bcrypt.hash(password, 10);

    //* --------------- * Check if the email is already registered --------------- */
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (existingUser) {
      if (!existingUser.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(email);

        await sendVerificationEmail(
          verificationToken[0].email,
          verificationToken[0].token
        );
        return {
          success: `Successfully send email 📤`,
        };
      }
      return { error: "Email already registered" };
    }
    //* --------------- * Insert the user into the database --------------- */
    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });
    const verificationToken = await generateEmailVerificationToken(email);

    await sendVerificationEmail(
      verificationToken[0].token,
      verificationToken[0].email
    );
    return { success: "email confirm sent" };
  });
