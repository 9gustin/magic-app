import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { Button, Title } from "@mantine/core"
import { AuthForm } from "./AuthForm"
import Link from "next/link"
import { Routes } from "@blitzjs/next"

export const UserInfo = () => {
  const currentUser = useCurrentUser()

  if (currentUser) {
    return <Title>Welcome, {currentUser.username}!</Title>
  } else {
    return (
      <AuthForm title="Magic app">
        <Button component={Link} href={Routes.SignupPage()}>
          Sign Up
        </Button>
        <Button component={Link} href={Routes.LoginPage()}>
          Login
        </Button>
      </AuthForm>
    )
  }
}
