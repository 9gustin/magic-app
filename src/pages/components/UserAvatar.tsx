import { getUploadthingUrl } from "@/features/uploadthing/utils"
import { Avatar, AvatarProps } from "@mantine/core"
import { FC } from "react"

type Props = {
  user: {
    avatarFileKey?: string | null
    name?: string | null
    username: string
  }
} & Partial<AvatarProps>

export const getAvatarFallbackName = (name?: string | null) => {
  if (!name) return ""
  const [first, second] = name.split(" ")
  return `${first ? first[0] : ""}${second ? second[0] : ""}`.toLocaleUpperCase()
}

export const UserAvatar: FC<Props> = ({ user, ...rest }) => {
  if (!user) return null

  return (
    <Avatar src={getUploadthingUrl(user.avatarFileKey)} radius="xl" {...rest}>
      {getAvatarFallbackName(user.name || user.username)}
    </Avatar>
  )
}
