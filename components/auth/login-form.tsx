//!-------------------------------------------------------------------------- */
//!                                LOGIN FORM                                 */
//!-------------------------------------------------------------------------- */

"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { AuthCard } from "./auth-card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/app/types/login-schema";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { emailSignIn } from "@/server/action/email-signin";
import { useAction } from "next-safe-action/hooks";
import { cn } from "@/lib/utils";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";
import type { TLoginSchema } from "@/app/types/types";
import type { TLogInData } from "@/app/types/types";
import { auth,signIn } from "@/auth"
/* ------------------------------ END OF IMPORT ----------------------------- */

export const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [success,setSuccess]=React.useState("");
const [error, setError] = React.useState("");
  const { execute, status,result } = useAction(emailSignIn, {
    onSuccess(result) {
    if (result.data?.success){
      setSuccess(result.data.success);
    }
    if(result.data?.error){
      
      setError(result.data.error)
    }
    },
    onError(error) {
      console.log(error)
    }
    }
  );
  const onSubmit = (values: TLoginSchema) => {
    execute(values);
  };
  return (
    <AuthCard
      cardTitle="Welcome Back"
      backButtonHref="/auth/register"
      backButtonLabel="Create a new account"
      showSocials
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Email address"
                        type="email"
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="***********"
                        type="password"
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
                 <FormSuccess message={success} />
                 <FormError message={error} />
              <Button size={"sm"} asChild variant={"link"}>
                <Link href="/auth/reset">Forgot password?</Link>
              </Button>
            </div>
         
            <Button
              type="submit"
              className={cn(
                "w-full",
                status === "executing" ? "animate-pulse" : ""
              )}
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </AuthCard>
  );
};
