import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { EditUserForm } from "@/pages/components/EditUserForm"
import { Title } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { Vertical } from "mantine-layout-components"

export const UpdateProfile = () => {
  const user = useCurrentUser()

  return (
    <Vertical>
      <Title order={2}>Update profile</Title>
      <EditUserForm
        user={user}
        onEdit={() =>
          notifications.show({
            title: "Profile updated",
            message: "Your profile has been updated",
            color: "green",
          })
        }
      />
    </Vertical>
  )
}
