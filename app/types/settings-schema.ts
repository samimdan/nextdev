import { z } from "zod"
/**
 * Represents the schema for settings.
 *
 * @remarks
 * This schema defines the structure and validation rules for settings data.
 * name: the name of signin user
 * image: image url of user
 * isTwoFactorEnabled: boolean
 * email: optional string with email pattern
 * password: string with minium of 6 charachter
 * new password :string with minimum og
 *
 * @public
 */
export const SettingSchema = z
	.object({
		name: z.optional(z.string()),
		image: z.optional(z.string()),
		isTwoFactorEnabled: z.optional(z.boolean()),
		email: z.optional(z.string().email()),
		password: z.optional(z.string().min(8)),
		newPassword: z.optional(z.string().min(8)),
	})
	.refine(
		(data) => {
			if (data.password && !data.newPassword) {
				return false
			}
			return true
		},
		{
			message: "New password is required when changing password",
			path: ["newPassword"],
		},
	)
//info refine can check the value of data and return error if the value is not correct
//info path is the path that the error will be return
