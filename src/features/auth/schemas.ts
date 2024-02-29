import { z } from "zod"

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())

export const password = z
  .string()
  .min(10)
  .max(100)
  .transform((str) => str.trim())

export const Signup = z.object({
  name: z.string().optional(),
  username: z.string().min(3).max(30),
  email,
  password,
  terms: z.boolean().refine((value) => value, {
    message: "You must accept the terms and conditions",
  }),
})

export const Login = z.object({
  userkey: z.string(),
  password: z.string(),
  deviceInfo: z
    .object({
      browser: z.object({ name: z.string() }),
      os: z.object({ name: z.string() }),
    })
    .optional(),
})

export const ForgotPassword = z.object({
  email,
})

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export type ResetPasswordType = z.infer<typeof ResetPassword>

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})
