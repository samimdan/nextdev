//! -------------------------------------------------------------------------- //
//!                                SIGN UP FORM                                //
//! -------------------------------------------------------------------------- //

"use client";

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

import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";


import { useAction } from "next-safe-action/hooks";
import { cn } from "@/lib/utils";
import { RegisterSchema } from "@/app/types/register-schema";
import { emailRegister } from "@/server/action/email-register";
import React from "react";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";
import type { TRegisterSchema } from "@/app/types/types";
//INFO zod for validate client side
//INFO useAction used for get controll of execution
//INFO emailRegister for creating user and generate token get error of creating user and sending verification email 
/* ------------------------------ END OF IMPORT ----------------------------- */

export const RegisterForm = () => {
  const form = useForm<TRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const [error, setError] = React.useState("");
 
   const [success,setSuccess]=React.useState("");
  //Getting result of sending email and creating user
  const { execute, status, isExecuting} = useAction(emailRegister,{
    
    onSuccess({data }){
      if(data?.success){
        setSuccess(data?.success)
      }    
      if(data?.error) (data?.error)
    }})
    //value is a type of our form feild or type of our Register schema
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    //runs only when no error occure in our form
    execute(values);
  }
  return (
    <AuthCard
      cardTitle="Create an account 🎉"
      backButtonHref="/auth/login"
      backButtonLabel="Aleready have an account?"
      showSocials
    >
      <div>
        {/* form instance (useFrom) is props for Form (shadcn) component */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}//intellesence for our schema in the form
                name="name"
                render={({ field }) => (//render pass call back function and send this field to it
                  <FormItem>
                    <FormLabel className="font-bold">Name</FormLabel>
                    <FormControl> {/*use for controll a field */} 
                      <Input {...field} placeholder="Your name" type="text" />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
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
        
            </div>
            <Button
              type="submit"
              className={cn(
                "w-full",
                status === "executing" ? "animate-pulse" : ""
              )}
            >
              {isExecuting ? "Working on it..." : "Sign up"}
              
            </Button>
          </form>
        </Form>
      </div>
    </AuthCard>
  );
};
