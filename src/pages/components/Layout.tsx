import Head from "next/head"
import React from "react"
import { BlitzLayout } from "@blitzjs/next"

export const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title || "magic-app"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  )
}

export default Layout
