import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { Button } from "@mantine/core"
import { AuthForm } from "./AuthForm"
import Link from "next/link"
import { Routes } from "@blitzjs/next"

export const UserInfo = () => {
  const currentUser = useCurrentUser()

  if (currentUser) {
    return (
      <>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
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
