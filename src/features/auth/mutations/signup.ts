import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Role } from "types"
import { Signup } from "../schemas"
import React from "react"
import { getEmailVerifyLink } from "@/features/auth/mutations/sendVerificationEmail"
import WelcomeUserEmail from "@/templates/welcome-user"
import { sendEmail } from "@/email/sendEmail"

export default resolver.pipe(
  resolver.zod(Signup),
  async ({ username, email, password, name }, ctx) => {
    const hashedPassword = await SecurePassword.hash(password.trim())
    const user = await db.user.create({
      data: {
        email: email.toLowerCase().trim(),
        hashedPassword,
        role: "USER",
        name,
        username,
      },
      select: { id: true, name: true, email: true, role: true },
    })

    const validateEmailUrl = await getEmailVerifyLink({
      userId: user.id,
      userEmail: user.email,
    })

    await sendEmail({
      subject: "Welcome to Magic App",
      to: email,
      react: React.createElement(WelcomeUserEmail, { name: name || username, validateEmailUrl }),
    })

    await ctx.session.$create({ userId: user.id, role: user.role as Role })
    return user
  }
)
