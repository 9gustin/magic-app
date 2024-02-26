import { hash256 } from "@blitzjs/auth"
import db from "../../../../db"
import { TokenType } from "@prisma/client"

export const validateToken = async ({
  token,
  tokenType,
  userData,
}: {
  token: string
  tokenType: TokenType
  userData: any
}) => {
  let hashedToken = hash256(token)

  const possibleToken = await db.token.findFirst({
    where: { hashedToken, type: tokenType },
  })

  if (!possibleToken) throw new Error("Invalid token")

  await db.token.delete({ where: { id: possibleToken.id } })

  if (possibleToken.expiresAt < new Date()) throw new Error("Token expired")

  return db.user.update({
    where: { id: possibleToken.userId },
    data: userData,
  })
}
