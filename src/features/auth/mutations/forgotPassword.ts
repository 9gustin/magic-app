import { resolver } from "@blitzjs/rpc"
import db from "db"
import { ForgotPassword } from "../schemas"
import { regenerateToken } from "@/features/token/utils/createToken"
import { TokenType } from "@prisma/client"
import { env } from "@/env.mjs"
import { sendEmail } from "@/email/sendEmail"
import React from "react"
import { SIMPLE_USER_FIELDS } from "@/features/auth/constants"
import ResetPasswordEmail from "@/templates/reset-password"

export const getResetPasswordLink = async ({ userId, userEmail }): Promise<string> => {
  const token = await regenerateToken({
    userId,
    userEmail,
    tokenType: TokenType.RESET_PASSWORD,
  })
  return `${env.WEBAPP_URL}/auth/reset-password?token=${token}`
}

const sendResetPasswordEmail = async ({
  userId,
  userEmail,
  name,
}: {
  userId: string
  userEmail: string
  name: string
}): Promise<void> => {
  const resetPasswordUrl = await getResetPasswordLink({
    userId,
    userEmail,
  })
  await sendEmail({
    to: userEmail,
    subject: "Reset your password",
    react: React.createElement(ResetPasswordEmail, {
      resetPasswordUrl,
      name,
    }),
  })
}

export default resolver.pipe(resolver.zod(ForgotPassword), async ({ email }) => {
  const user = await db.user.findFirst({
    where: { email: email.toLowerCase() },
    select: SIMPLE_USER_FIELDS,
  })

  if (!user) throw new Error("User not found")

  await sendResetPasswordEmail({
    userId: user.id,
    name: user.name || user.username,
    userEmail: user.email,
  })

  return true
})
