import updateUserProfile from "@/features/users/mutations/updateUserProfile"
import { UpdateUserProfile } from "@/features/users/schemas"
import { UpdateUserProfileInput } from "@/features/users/types"
import { useMutation } from "@blitzjs/rpc"
import { Button, Textarea, TextInput } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { IconExclamationCircle } from "@tabler/icons-react"
import { Vertical } from "mantine-layout-components"
import { UserImages } from "../u/components/UserImages"

export const EditUserForm = ({ user, onEdit }) => {
  const [$updateUserProfile] = useMutation(updateUserProfile, {
    onError: () => {
      notifications.show({
        title: "Error updating profile",
        message: "Please try again later",
        color: "red",
        icon: <IconExclamationCircle />,
      })
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
    <form
      onSubmit={form.onSubmit(async (values) => {
        await $updateUserProfile(values)
        onEdit?.(values)
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
  )
}
