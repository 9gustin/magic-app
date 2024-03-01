import updateUserProfile from "@/features/users/mutations/updateUserProfile"
import { UpdateUserProfile } from "@/features/users/schemas"
import { UpdateUserProfileInput } from "@/features/users/types"
import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { Button, Drawer, Textarea, TextInput } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { IconExclamationCircle } from "@tabler/icons-react"
import { Vertical } from "mantine-layout-components"
import { useRouter } from "next/router"
import { UserImages } from "./UserImages"

export const EditUserModal = ({ opened, close, user }) => {
  const router = useRouter()
  const [$updateUserProfile] = useMutation(updateUserProfile, {
    onError: () => {
      notifications.show({
        title: "Error updating profile",
        message: "Please try again later",
        color: "red",
        icon: <IconExclamationCircle />,
      })
    },
    onSuccess: () => {
      notifications.show({
        title: "Profile updated",
        message: "Your profile has been updated",
        color: "green",
      })
      close()
    },
  })

  const form = useForm<UpdateUserProfileInput>({
    initialValues: {
      name: user.name || "",
      username: user.username,
      bio: user.bio || "",
      avatarFileKey: user.avatarFileKey || "",
      coverFileKey: user.coverFileKey || "",
    },
    validate: zodResolver(UpdateUserProfile),
    validateInputOnBlur: true,
  })

  return (
    <Drawer opened={opened} onClose={close} title="Edit profile" position="right">
      <form
        onSubmit={form.onSubmit(async (values) => {
          await $updateUserProfile(values)
          router.push(Routes.Profile({ username: values.username }))
        })}
        style={{ width: "100%" }}
      >
        <Vertical fullW center>
          <UserImages editable form={form} user={user} />
          <TextInput label="Name" w="100%" {...form.getInputProps("name")} />
          <TextInput label="Username" w="100%" {...form.getInputProps("username")} />
          <Textarea label="Bio" w="100%" {...form.getInputProps("bio")} />
          <Button type="submit" disabled={!form.isValid()}>
            Save changes
          </Button>
        </Vertical>
      </form>
    </Drawer>
  )
}
