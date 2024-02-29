import { Avatar, AvatarProps } from "@mantine/core"
import { FC } from "react"

type Props = {
  user: {
    username?: string
    name?: string | null
    avatarImageKey?: string | null
  }
} & Partial<AvatarProps>

export const getUploadthingUrl = (fileKey?: string | null) => {
  return fileKey ? `https://uploadthing.com/f/${fileKey}` : ""
}

export const getAvatarFallbackName = (name?: string | null) => {
  if (!name) return ""
  const [first, second] = name.split(" ")
  return `${first ? first[0] : ""}${second ? second[0] : ""}`.toLocaleUpperCase()
}

export const UserAvatar: FC<Props> = ({ user, ...rest }) => {
  return (
    <Avatar src={getUploadthingUrl(user.avatarImageKey)} radius="xl" {...rest}>
      {getAvatarFallbackName(user.name || user.username)}
    </Avatar>
  )
}
