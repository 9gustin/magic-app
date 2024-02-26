import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import { ResetPassword } from "../schemas"
import { validateToken } from "@/features/token/utils/validateToken"
import { TokenType } from "@prisma/client"
import db from "../../../../db"
import login from "@/features/auth/mutations/login"

export default resolver.pipe(resolver.zod(ResetPassword), async ({ password, token }, ctx) => {
  const user = await validateToken({
    token,
    tokenType: TokenType.RESET_PASSWORD,
    userData: { hashedPassword: await SecurePassword.hash(password.trim()) },
  })

  if (user) {
    await db.session.deleteMany({ where: { userId: user.id } })

    await login({ userkey: user.email, password }, ctx)

    return true
  }

  return false
})
