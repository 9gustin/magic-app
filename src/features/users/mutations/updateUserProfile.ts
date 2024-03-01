import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateUserProfile } from "../schemas"

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(UpdateUserProfile),
  async ({ name, username, bio, coverFileKey, avatarFileKey }, { session: { userId } }) => {
    await db.user.update({
      where: { id: userId },
      data: { name, username, bio, coverFileKey, avatarFileKey },
    })

    return true
  }
)
