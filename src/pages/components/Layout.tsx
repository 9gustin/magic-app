import React from "react"
import Head from "next/head"

import { AppShell, Container } from "@mantine/core"
import { BlitzLayout } from "@blitzjs/next"

import { AppHeader } from "./AppHeader"
import { Notifications } from "@mantine/notifications"

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
      <AppShell
        padding="md"
        header={<AppHeader />}
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        })}
      >
        <Container h="100%">{children}</Container>
        <Notifications />
      </AppShell>
    </>
  )
}

export default Layout
