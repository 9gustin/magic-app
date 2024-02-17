import db from "db"
import { z } from "zod"
import { resolver } from "@blitzjs/rpc"

export default resolver.pipe(
  resolver.zod(
    z.object({
      username: z.string().optional(),
    })
  ),
  resolver.authorize(),
  async ({ username }) => {
    if (!username?.trim()) {
      throw new Error("Username is required")
    }
    const user = await db.user.findFirst({
      where: { username },
      select: { id: true, name: true, createdAt: true, username: true },
    })

    return user
  }
)
