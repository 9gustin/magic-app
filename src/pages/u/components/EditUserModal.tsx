import { Button, Drawer, Textarea, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { Vertical } from "mantine-layout-components"
import { UserImages } from "./UserImages"

export const EditUserModal = ({ opened, close, user }) => {
  const form = useForm({
    initialValues: {
      name: user.name,
      username: user.username,
      bio: user.bio,
    },
  })

  return (
    <Drawer opened={opened} onClose={close} title="Edit profile" position="right">
      <Vertical fullW center>
        <UserImages user={user} editable />
        <TextInput label="Name" w="100%" {...form.getInputProps("name")} />
        <TextInput label="Username" w="100%" {...form.getInputProps("username")} />
        <Textarea label="Bio" w="100%" {...form.getInputProps("bio")} />
        <Button type="submit">Save changes</Button>
      </Vertical>
    </Drawer>
  )
}
