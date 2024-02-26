import db from "db"
import { resolver } from "@blitzjs/rpc"

import { env } from "@/env.mjs"
import { TokenType } from "@prisma/client"
import { regenerateToken } from "@/features/token/utils/createToken"
import React from "react"
import EmailTemplateConfirmEmail from "@/templates/validate-email"
import { sendEmail } from "@/email/sendEmail"
import { SIMPLE_USER_FIELDS } from "@/features/auth/constants"

export const getEmailVerifyLink = async ({ userId, userEmail }): Promise<string> => {
  const token = await regenerateToken({
    userId,
    userEmail,
    tokenType: TokenType.VERIFY_EMAIL,
  })
  return `${env.WEBAPP_URL}/auth/verify-email?token=${token}`
}

const sendVerificationEmail = async ({
  userId,
  userEmail,
  name,
}: {
  userId: string
  userEmail: string
  name: string
}): Promise<void> => {
  const validateEmailUrl = await getEmailVerifyLink({
    userId,
    userEmail,
  })
  await sendEmail({
    to: userEmail,
    subject: "Verify your email address",
    react: React.createElement(EmailTemplateConfirmEmail, {
      validateEmailUrl,
      name,
    }),
  })
}

export default resolver.pipe(resolver.authorize(), async (_, { session: { userId } }) => {
  const user = await db.user.findFirst({
    where: { id: userId },
    select: SIMPLE_USER_FIELDS,
  })

  if (!user) throw new Error("User not found")

  await sendVerificationEmail({
    userId: user.id,
    name: user.name || user.username,
    userEmail: user.email,
  })

  return true
})
