import { BlitzPage } from "@blitzjs/next"
import Layout from "@/pages/components/Layout"
import { useRouter } from "next/router"
import LoginForm from "./components/LoginForm"
import { useMutation } from "@blitzjs/rpc"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Layout title="Log In">
      <LoginForm
        onSuccess={(_user) => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
          return router.push(next)
        }}
      />
    </Layout>
  )
}

export default LoginPage
