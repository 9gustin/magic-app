import { Routes } from "@blitzjs/next"
import styled from "@emotion/styled"
import { Flex, Header, Title, useMantineTheme } from "@mantine/core"
import { IconCrystalBall } from "@tabler/icons-react"
import Link from "next/link"
import { HeaderMenu } from "./components/Menu"

const SXHeader = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const AppHeader = () => {
  const theme = useMantineTheme()

  return (
    <SXHeader height={60} p="xs">
      <Link href={Routes.Home()}>
        <Flex align="center" gap="sm">
          <IconCrystalBall color={theme.colors[theme.primaryColor]?.[4]} />
          <Title size="sm">Magic app</Title>
        </Flex>
      </Link>
      <HeaderMenu />
    </SXHeader>
  )
}
