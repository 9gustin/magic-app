import { Loader } from "@mantine/core"
import { useParams } from "next/navigation"
import Layout from "../components/Layout"

export default function Profile() {
  const params = useParams()

  if (!params) {
    return <Loader />
  }

  return (
    <Layout>
      <h1>{params?.username}</h1>
    </Layout>
  )
}
