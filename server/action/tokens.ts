"use server";

import { eq } from "drizzle-orm";
import { db } from "..";
import { emailToken, users } from "../schema";
export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.query.emailToken.findFirst({
      where: eq(emailToken.token, email),
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};
export const generateEmailVerificationToken = async (email: string) => {
  

  const token = crypto.randomUUID();
  const expires = new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await db.delete(emailToken).where(eq(emailToken.id, existingToken.id));
  }
  const verificationToken = await db
    .insert(emailToken)
    .values({
      email,
      token,
      expires,
    })
    .returning();
  return verificationToken;
};
export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByEmail(token);
  if (!existingToken) return { error: "Token not found" };
  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) return { error: "Token has expired" };

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, existingToken.email),
  });
  if (!existingUser) return { error: "Email does not exist" };

  await db
    .update(users)
    .set({
      emailVerified: new Date(),
      email: existingToken.email,
    })
    .where(eq(users.id, existingUser.id));

  await db.delete(emailToken).where(eq(emailToken.id, existingToken.id));
  return { success: "Email Verified" };
};
