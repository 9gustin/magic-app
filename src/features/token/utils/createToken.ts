import { generateToken, hash256 } from "@blitzjs/auth"
import db from "../../../../db"
import { TokenType } from "@prisma/client"
import { addHours } from "date-fns"

const DEFAULT_EXPIRATION_HOURS = 4

const createToken = async ({ userId, userEmail, tokenType, expiresAt }) => {
  const token = generateToken()
  const hashedToken = hash256(token)
  const expires = expiresAt ?? addHours(new Date(), DEFAULT_EXPIRATION_HOURS)

  await db.token.create({
    data: {
      user: { connect: { id: userId } },
      type: tokenType,
      expiresAt: expires,
      hashedToken,
      sentTo: userEmail,
    },
  })

  return token
}

export const regenerateToken = async ({
  userId,
  userEmail,
  tokenType,
  expiresAt,
}: {
  userId: string
  userEmail: string
  tokenType: TokenType
  expiresAt?: Date
}): Promise<string> => {
  await db.token.deleteMany({ where: { type: tokenType, userId } })
  return createToken({ userId, userEmail, tokenType, expiresAt })
}
