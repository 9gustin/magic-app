import { z } from "zod"
import { resolver } from "@blitzjs/rpc"
import { TokenType } from "@prisma/client"
import { validateToken } from "@/features/token/utils/validateToken"

const Input = z.object({
  token: z.string(),
})

export default resolver.pipe(resolver.zod(Input), async ({ token }) => {
  const user = await validateToken({
    token,
    tokenType: TokenType.VERIFY_EMAIL,
    userData: { verifiedAt: new Date() },
  })

  return Boolean(user)
})
