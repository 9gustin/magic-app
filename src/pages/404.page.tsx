import Head from "next/head"
import Layout from "./components/Layout"
import { NotFound } from "./components/NotFound"

export default function Page404() {
  const statusCode = 404
  const title = "This page could not be found"
  return (
    <>
      <Head>
        <title>
          {statusCode}: {title}
        </title>
      </Head>
      <Layout>
        <NotFound />
      </Layout>
    </>
  )
}
