import { z } from "zod"
import { RegisterSchema } from "./register-schema"
import { loginSchema } from "./login-schema"
import { Session } from "next-auth"
import { settingSchema } from "./settings-schema"
export type TRegisterSchema = z.infer<typeof RegisterSchema>
export type TLoginSchema = z.infer<typeof loginSchema>

export type TSettingsForm = z.infer<typeof settingSchema>
