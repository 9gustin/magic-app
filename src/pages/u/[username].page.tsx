import { Button, Flex, Loader, Text, Title } from "@mantine/core"
import { useParams } from "next/navigation"
import Layout from "../components/Layout"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { useQuery } from "@blitzjs/rpc"
import getUserProfile from "@/features/users/queries/getUserProfile"
import dayjs from "dayjs"
import { IconPencil } from "@tabler/icons-react"

export default function Profile() {
  const params = useParams()
  const user = useCurrentUser()
  const [profileUser] = useQuery(getUserProfile, { username: params?.username?.toString() || "" })

  if (!params || !profileUser) {
    return <Loader />
  }

  const isCurrentUser = user && user?.username === params?.username

  return (
    <Layout>
      <Flex align="center" gap="md">
        <Title>{profileUser.username}</Title>
        {isCurrentUser && (
          <Button h={32} w={32} p={0}>
            <IconPencil size="1.1rem" />
          </Button>
        )}
        {user && !isCurrentUser && <Button size="sm">Follow</Button>}
      </Flex>
      <Text>{profileUser.name}</Text>
      <Text>Joined {dayjs(profileUser.createdAt).fromNow()}</Text>
    </Layout>
  )
}
