import { Alert, Button } from "@mantine/core"
import { IconAlertSquareRounded } from "@tabler/icons-react"
import { Vertical } from "mantine-layout-components"
import { useVerifyEmail } from "@/features/auth/hooks/useVerifyEmail"

export function VerifiedUserAlert() {
  const sendVerificationEmail = useVerifyEmail()

  return (
    <Alert color="red" icon={<IconAlertSquareRounded />} title={"Warning!"} w="100%">
      <Vertical fullW>
        Your email is not verified. Please check your email for a verification link or{" "}
        <Button variant="light" color={"red"} onClick={() => sendVerificationEmail()}>
          Send verification email
        </Button>
      </Vertical>
    </Alert>
  )
}
