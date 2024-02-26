import { BlitzPage, Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import Link from "next/link"
import resetPassword from "@/features/auth/mutations/resetPassword"
import { AuthForm } from "./components/AuthForm"
import { useForm, zodResolver } from "@mantine/form"
import { Button, Flex, PasswordInput } from "@mantine/core"
import { ResetPassword, ResetPasswordType } from "@/features/auth/schemas"
import { useStringQueryParam } from "@/pages/hooks/useParam"

const FORM_ERROR = "FORM_ERROR"

const ResetPasswordPage: BlitzPage = () => {
  const token = useStringQueryParam("token")
  const [$resetPassword, { isSuccess }] = useMutation(resetPassword)

  const form = useForm<ResetPasswordType>({
    initialValues: { password: "", passwordConfirmation: "", token: "" },
    validate: zodResolver(ResetPassword),
    validateInputOnBlur: true,
  })

  if (!token) {
    return (
      <AuthForm title="Invalid Reset Password Link">
        <Button component={Link} href={Routes.Home()}>
          Go home
        </Button>
      </AuthForm>
    )
  }

  return (
    <AuthForm title="Set a New Password">
      {isSuccess ? (
        <div>
          <h2>Password Reset Successfully</h2>
          <p>
            Go to the <Link href={Routes.Home()}>homepage</Link>
          </p>
        </div>
      ) : (
        <form
          onSubmit={form.onSubmit(async (values) => {
            await $resetPassword({ ...values, token: token as string })
          })}
        >
          <Flex direction="column" gap="md">
            <PasswordInput {...form.getInputProps("password")} label="New Password" />
            <PasswordInput
              {...form.getInputProps("passwordConfirmation")}
              label="Repeat Password"
            />
            <Button type="submit">Reset Password</Button>
          </Flex>
        </form>
      )}
    </AuthForm>
  )
}

export default ResetPasswordPage
