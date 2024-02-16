import Layout from "@/pages/components/Layout"
import { ForgotPassword } from "src/features/auth/schemas"
import forgotPassword from "src/features/auth/mutations/forgotPassword"
import { useMutation } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"
import { AuthForm } from "./components/AuthForm"
import { useForm } from "@mantine/form"
import { Button, Flex, TextInput } from "@mantine/core"
import { IconMail } from "@tabler/icons-react"

const FORM_ERROR = "FORM_ERROR"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  const form = useForm({
    initialValues: { email: "" },
  })

  const handleSubmit = async (values) => {
    try {
      await forgotPasswordMutation(values)
    } catch (error: any) {
      return {
        [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
      }
    }
  }

  return (
    <Layout title="Forgot Your Password?">
      <AuthForm title="Forgot your password?">
        {isSuccess ? (
          <div>
            <h2>Request Submitted</h2>
            <p>
              If your email is in our system, you will receive instructions to reset your password
              shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Flex direction="column" gap="md">
              <TextInput {...form.getInputProps("email")} label="Email" placeholder="Email" />
              <Button type="submit" leftIcon={<IconMail />}>
                Forgot password
              </Button>
            </Flex>
          </form>
        )}
      </AuthForm>
    </Layout>
  )
}

export default ForgotPasswordPage
