import UAParser from 'ua-parser-js';
import { AuthenticationError, PromiseReturnType } from "blitz"
import Link from "next/link"
import login from "src/features/auth/mutations/login"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import { useForm, zodResolver } from "@mantine/form"
import { Button, Flex, PasswordInput, Text, TextInput } from "@mantine/core"
import { AuthForm } from "./AuthForm"
import { Login } from "@/features/auth/schemas"

const FORM_ERROR = "FORM_ERROR"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  const form = useForm({
    initialValues: { userkey: "", password: "" },
    validate: zodResolver(Login),
  })

  const handleSubmit = async (values: { userkey: string; password: string }) => {
    try {
      const parser = new UAParser();
      const result = parser.getResult();
      const deviceInfo = {
        browser: result.browser,
        os: result.os,
      };
      const user = await loginMutation({ ...values, deviceInfo })
      props.onSuccess?.(user)
    } catch (error: any) {
      if (error instanceof AuthenticationError) {
        return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
      } else {
        return {
          [FORM_ERROR]:
            "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
        }
      }
    }
  }

  return (
    <AuthForm title="Login">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex gap={16} direction="column">
          <TextInput label="Username or Email" {...form.getInputProps("userkey")} />
          <PasswordInput label="Password" {...form.getInputProps("password")} />

          <Button type="submit">Login</Button>
        </Flex>
      </form>
      <Flex gap={16} direction="column" align="center">
        <Button w="100%" component={Link} href={Routes.ForgotPasswordPage()} variant="subtle">
          Forgot your password?
        </Button>
        <Text>Or</Text>
        <Button w="100%" component={Link} href={Routes.SignupPage()} variant="light">
          Sign Up
        </Button>
      </Flex>
    </AuthForm>
  )
}

export default LoginForm
