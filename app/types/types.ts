import { z } from "zod";
import { RegisterSchema } from "./register-schema";
import { loginSchema } from "./login-schema";
export type TRegisterSchema = z.infer<typeof RegisterSchema>;
export type TLoginSchema = z.infer<typeof loginSchema>;
export type TLogInData = {
  data?:
    | {
        error: string;
        success?: undefined;
        email?: undefined;
      }
    | {
        success: string;
        error?: undefined;
        email?: undefined;
      }
    | {
        email: string;
        error?: undefined;
        success?: undefined;
      }
    | undefined;
};
