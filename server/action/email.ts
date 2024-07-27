"use server";
import getBaseURL from "@/lib/base-url";
import { Resend } from "resend";
import { string } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = getBaseURL();
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verifcation?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [email],
    subject: "Hello World",
    html: `<p>Your Confirmation Code: ${token}</p>
    <a href='${confirmLink}'>Click to verfiy your account</a>
    `,
  });
  console.log(confirmLink);
  if (error) {
    return console.error("Error sending email", error);
  }
  if (data) return data;
};
