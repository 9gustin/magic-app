import { Suspense } from "react"
import Layout from "@/pages/components/Layout"
import { BlitzPage } from "@blitzjs/next"
import { Loader } from "@mantine/core"

const Settings: BlitzPage = () => {
  return (
    <Layout title="Settings">
      <Suspense fallback={<Loader />}>settings</Suspense>
    </Layout>
  )
}

export default Settings
