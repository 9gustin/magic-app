import { Suspense } from "react"
import Layout from "@/pages/components/Layout"
import { Routes, BlitzPage } from "@blitzjs/next"
import { UserInfo } from "./auth/components/UserInfo"

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
    </Layout>
  )
}

export default Home
