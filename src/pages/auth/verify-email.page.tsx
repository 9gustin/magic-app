import { useStringQueryParam } from "@/pages/hooks/useParam"
import { AuthForm } from "@/pages/auth/components/AuthForm"
import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { Button, Loader } from "@mantine/core"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { useQuery } from "@blitzjs/rpc"
import verifyEmailToken from "@/features/auth/queries/verifyEmailToken"
import { useVerifyEmail } from "@/features/auth/hooks/useVerifyEmail"

export default function VerifyEmailPage() {
  const token = useStringQueryParam("token")
  const currentUser = useCurrentUser()
  const $sendVerificationEmail = useVerifyEmail()

  const [isTokenValid, { isLoading }] = useQuery(
    verifyEmailToken,
    {
      token: token as string,
    },
    {
      enabled: !!token,
    }
  )

  if (isLoading) {
    return (
      <AuthForm title="Verifying your email...">
        <Loader />
      </AuthForm>
    )
  }

  if (!token || !isTokenValid) {
    return (
      <AuthForm title="Bad URL">
        <p>Sorry, the URL is invalid or expired. Please request a new verification email.</p>
        {currentUser && (
          <Button onClick={() => $sendVerificationEmail()}>Send verification email</Button>
        )}
        {!currentUser && (
          <Button component={Link} href={Routes.Home()}>
            Go home
          </Button>
        )}
      </AuthForm>
    )
  }

  return (
    <AuthForm title="Your email has been verified">
      <Button component={Link} href={Routes.Home()}>
        Go home
      </Button>
    </AuthForm>
  )
}
