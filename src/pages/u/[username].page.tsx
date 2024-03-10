import { Loader } from "@mantine/core"
import Layout from "../components/Layout"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { useQuery } from "@blitzjs/rpc"
import getUserProfile from "@/features/users/queries/getUserProfile"
import { BlitzPage, Routes, useParam } from "@blitzjs/next"
import { UserHeader } from "./components/UserHeader"
import { EditUserModal } from "./components/EditUserModal"
import { useDisclosure } from "@mantine/hooks"
import { useRouter } from "next/router"
import { NotFound } from "../components/NotFound"

const Profile: BlitzPage = () => {
  const username = useParam("username")
  const router = useRouter()
  const [opened, { open, close }] = useDisclosure(false)

  const user = useCurrentUser()
  const [profileUser, { isFetching }] = useQuery(getUserProfile, { username: username?.toString() })

  if (isFetching) {
    return <Loader />
  }

  if (!profileUser) {
    return (
      <Layout>
        <NotFound title="User not found" subtitle="" />
      </Layout>
    )
  }

  return (
    <Layout>
      <UserHeader
        isCurrentUser={user && user.id === profileUser.id}
        isVerified={!!user?.verifiedAt}
        user={profileUser}
        editUser={open}
      />
      <EditUserModal user={profileUser} opened={opened} close={close} />
    </Layout>
  )
}

export default Profile
