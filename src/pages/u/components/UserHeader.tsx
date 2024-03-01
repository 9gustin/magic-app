import { Button, Text, Title, Image } from "@mantine/core"
import dayjs from "dayjs"
import { IconPencil } from "@tabler/icons-react"
import { VerifiedUserAlert } from "@/pages/components/VerifiedUserAlert"
import { Horizontal, Vertical } from "mantine-layout-components"
import { UserImages } from "./UserImages"

export const UserHeader = ({ isCurrentUser, user, editUser, isVerified }) => {
  return (
    <Vertical>
      {isCurrentUser && !isVerified && <VerifiedUserAlert />}
      <UserImages user={user} />
      <Vertical fullW center>
        <Horizontal center>
          <Title>{user.name || user.username}</Title>
        </Horizontal>
        <Horizontal center>
          <Text italic color="dimmed">
            @{user.username}
          </Text>
          {user && !isCurrentUser && <Button size="xs">Follow</Button>}
          {isCurrentUser && (
            <Button size="xs" leftIcon={<IconPencil />} onClick={editUser}>
              Edit Profile
            </Button>
          )}
          |
          <Text italic color="dimmed">
            Joined {dayjs(user.createdAt).fromNow()}
          </Text>
        </Horizontal>
        {user.bio && <Text>{user.bio}</Text>}
      </Vertical>
    </Vertical>
  )
}
