import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/server";
import google from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db) as Adapter,
  secret: "B+ZSZwIkV9MDIfnW3InRSS0SWW8oLqQzmJHMeoEb2QCD",
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  providers: [
    google({
      clientId:
        "492216672486-eivpovusj4mnq0vkdo6ufmqpl8hsh338.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
});
