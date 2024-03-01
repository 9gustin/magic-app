import { z } from "zod"
import { username } from "../auth/schemas"

export const UpdateUserProfile = z.object({
  username,
  bio: z.string().optional(),
  name: z.string().optional(),
  avatarFileKey: z.string().optional(),
  coverFileKey: z.string().optional(),
})
