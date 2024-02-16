import signup from "src/features/auth/mutations/signup"
import { useMutation } from "@blitzjs/rpc"
import { AuthForm } from "./AuthForm"
import { useForm } from "@mantine/form"
import { Button, Flex, PasswordInput, TextInput } from "@mantine/core"
import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { Signup } from "@/features/auth/schemas"

type SignupFormProps = {
  onSuccess?: () => void
}

const FORM_ERROR = "FORM_ERROR"

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  const form = useForm({
    initialValues: { username: "", name: "", email: "", password: "", repeatPassword: "" },
  })

  const handleSubmit = async (values) => {
    try {
      await signupMutation(values)
      props.onSuccess?.()
    } catch (error: any) {
      if (error.code === "P2002" && error.meta?.target?.includes("email")) {
        // This error comes from Prisma
        return { email: "This email is already being used" }
      } else {
        return { [FORM_ERROR]: error.toString() }
      }
    }
  }

  return (
    <AuthForm title="Create an Account">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex gap={16} direction="column">
          <TextInput label="Name" {...form.getInputProps("name")} />
          <TextInput withAsterisk label="Email" {...form.getInputProps("email")} />
          <TextInput withAsterisk label="Username" {...form.getInputProps("username")} />
          <PasswordInput withAsterisk label="Password" {...form.getInputProps("password")} />
          <PasswordInput
            withAsterisk
            label="Repeat password"
            {...form.getInputProps("repeatPassword")}
          />

          <Button type="submit">Create account</Button>
        </Flex>
      </form>
      <Flex gap={16} direction="column" align="center">
        <Button w="100%" component={Link} href={Routes.LoginPage()} variant="subtle">
          Login
        </Button>
      </Flex>
    </AuthForm>
  )
}

export default SignupForm
