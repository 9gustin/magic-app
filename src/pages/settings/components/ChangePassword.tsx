import changePasswordFromOld from "@/features/auth/mutations/changePasswordFromOld"
import { ChangePasswordInput, ChangePasswordInputType } from "@/features/auth/schemas"
import { useMutation } from "@blitzjs/rpc"
import { Button, PasswordInput, Title } from "@mantine/core"
import { Form, useForm, zodResolver } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { Vertical } from "mantine-layout-components"

export const ChangePassword = () => {
  const [$changePasswordFromOld] = useMutation(changePasswordFromOld, {
    onSuccess: () => {
      form.reset()
      notifications.show({
        title: "Password changed",
        message: "Your password has been successfully changed",
        color: "green",
      })
    },
    onError: (error: any) => {
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
      })
    },
  })
  const form = useForm<ChangePasswordInputType>({
    initialValues: {
      newPassword: "",
      newPasswordConfirmation: "",
      currentPassword: "",
    },
    validate: zodResolver(ChangePasswordInput),
  })

  return (
    <Vertical w={400}>
      <Title order={2}>Change password</Title>
      <Form form={form} onSubmit={(values) => $changePasswordFromOld(values)}>
        <Vertical w={400}>
          <PasswordInput
            w="100%"
            label="Old password"
            withAsterisk
            {...form.getInputProps("currentPassword")}
          />
          <PasswordInput
            w="100%"
            label="New password"
            withAsterisk
            {...form.getInputProps("newPassword")}
          />
          <PasswordInput
            w="100%"
            label="Repeat new password"
            withAsterisk
            {...form.getInputProps("newPasswordConfirmation")}
          />
          <Button type="submit">Change password</Button>
        </Vertical>
      </Form>
    </Vertical>
  )
}
