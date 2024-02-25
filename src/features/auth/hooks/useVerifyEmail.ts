import { useMutation } from "@blitzjs/rpc"
import sendVerificationEmail from "@/features/auth/mutations/sendVerificationEmail"

export const useVerifyEmail = () => {
  const [$verifyUserEmail] = useMutation(sendVerificationEmail)

  return $verifyUserEmail
}
