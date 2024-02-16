import Layout from "@/pages/components/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Link from "next/link"
import { assert } from "blitz"
import resetPassword from "@/features/auth/mutations/resetPassword"
import { AuthForm } from "./components/AuthForm"
import { useForm } from "@mantine/form"
import { Button, Flex, PasswordInput } from "@mantine/core"

const FORM_ERROR = "FORM_ERROR"

const ResetPasswordPage: BlitzPage = () => {
  const router = useRouter()
  const token = router.query.token?.toString()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  const form = useForm({
    initialValues: { password: "", passwordConfirmation: "", token },
  })

  const handleSubmit = (values) => {
    try {
      assert(token, "token is required.")
      resetPasswordMutation({ ...values, token })
    } catch (error: any) {
      if (error.name === "ResetPasswordError") {
        return {
          [FORM_ERROR]: error.message,
        }
      } else {
        return {
          [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
        }
      }
    }
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
        <form onSubmit={form.onSubmit(handleSubmit)}>
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

ResetPasswordPage.redirectAuthenticatedTo = "/"
ResetPasswordPage.getLayout = (page) => <Layout title="Reset Your Password">{page}</Layout>

export default ResetPasswordPage
