import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/server";
import google from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";
import CredentialProvider from "next-auth/providers/credentials";
import { loginSchema } from "./app/types/login-schema";

import { eq } from "drizzle-orm";

import { users } from "./server/schema";
import bcrypt from "bcrypt";
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db) as Adapter,
  secret: "B+ZSZwIkV9MDIfnW3InRSS0SWW8oLqQzmJHMeoEb2QCD",
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  providers: [
    google({
      clientId:
        "492216672486-eivpovusj4mnq0vkdo6ufmqpl8hsh338.apps.googleusercontent.com",
      clientSecret: "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",
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize (credentials)  {
        let user=null
          const { email, password } = await loginSchema.parseAsync(credentials);
           user = await db.query.users.findFirst({
            where: eq(users.email, email),
          });
          if (!user || !user.password) {
            //if the user is not found or the password is not set
            throw new Error("Invalid email or password");
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            // return JSON object with the user data
            return user;
          }
          // Return `null` to indicate that the credentials are invalid
          return null;
        }
      })]
 
});
