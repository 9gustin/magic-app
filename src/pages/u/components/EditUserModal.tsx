import { EditUserForm } from "@/pages/components/EditUserForm"
import { Routes } from "@blitzjs/next"
import { Drawer } from "@mantine/core"
import { useRouter } from "next/router"

export const EditUserModal = ({ opened, close, user }) => {
  const router = useRouter()

  return (
    <Drawer opened={opened} onClose={close} title="Edit profile" position="right">
      <EditUserForm
        user={user}
        onEdit={(values) => {
          close()

          if (user.username !== values.username) {
            router.push(Routes.Profile({ username: values.username }))
          }
        }}
      />
    </Drawer>
  )
}
