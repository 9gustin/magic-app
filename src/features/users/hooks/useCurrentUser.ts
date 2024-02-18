import { useQuery } from "@blitzjs/rpc"
import type { PromiseReturnType } from "blitz"
import getCurrentUser from "src/features/users/queries/getCurrentUser"

export type UserType = PromiseReturnType<typeof getCurrentUser>

export const useCurrentUser = (): UserType => {
  const [user] = useQuery(getCurrentUser, null)
  return user
}
