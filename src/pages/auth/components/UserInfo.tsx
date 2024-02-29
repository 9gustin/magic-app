import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { Button, Title } from "@mantine/core"
import { AuthForm } from "./AuthForm"
import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { Vertical } from "mantine-layout-components"
import { VerifiedUserAlert } from "@/pages/components/VerifiedUserAlert"

export const UserInfo = () => {
  const currentUser = useCurrentUser()

  if (currentUser) {
    return (
      <Vertical fullW fullH>
        <Title>Welcome, {currentUser.username}!</Title>
        {!currentUser.verifiedAt && <VerifiedUserAlert />}
      </Vertical>
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
