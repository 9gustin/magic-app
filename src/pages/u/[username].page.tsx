import { Loader } from "@mantine/core"
import Layout from "../components/Layout"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { useQuery } from "@blitzjs/rpc"
import getUserProfile from "@/features/users/queries/getUserProfile"
import { BlitzPage, useParam } from "@blitzjs/next"
import { UserHeader } from "./components/UserHeader"
import { EditUserModal } from "./components/EditUserModal"
import { useDisclosure } from "@mantine/hooks"

const Profile: BlitzPage = () => {
  const username = useParam("username")
  const [opened, { open, close }] = useDisclosure(false)

  const user = useCurrentUser()
  const [profileUser] = useQuery(getUserProfile, { username: username?.toString() })

  if (!username || !profileUser) {
    return <Loader />
  }

  return (
    <Layout>
      <UserHeader
        isCurrentUser={user && user.username === username}
        user={profileUser}
        editUser={open}
      />
      <EditUserModal user={profileUser} opened={opened} close={close} />
    </Layout>
  )
}

export default Profile
