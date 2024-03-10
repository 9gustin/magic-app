import { Suspense } from "react"
import Layout from "@/pages/components/Layout"
import { Routes, BlitzPage } from "@blitzjs/next"
import { UserInfo } from "./auth/components/UserInfo"
import { Loader } from "@mantine/core"

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <Suspense fallback={<Loader />}>
        <UserInfo />
      </Suspense>
    </Layout>
  )
}

export default Home
