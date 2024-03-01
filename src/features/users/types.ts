import { PromiseReturnType } from "blitz"
import { z } from "zod"
import getUserProfile from "./queries/getUserProfile"
import { UpdateUserProfile } from "./schemas"

export type UpdateUserProfileInput = z.infer<typeof UpdateUserProfile>

export type UserProfile = PromiseReturnType<typeof getUserProfile>
