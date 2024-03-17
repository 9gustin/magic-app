import { Routes } from "@blitzjs/next"
import styled from "@emotion/styled"
import {
  Flex,
  Header,
  Switch,
  Title,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core"
import { IconCommand, IconCrystalBall, IconMoonStars, IconSun } from "@tabler/icons-react"
import { Horizontal } from "mantine-layout-components"
import Link from "next/link"
import { HeaderMenu } from "./components/Menu"

const SXHeader = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const AppHeader = () => {
  const theme = useMantineTheme()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <SXHeader height={60} p="xs">
      <Link href={Routes.Home()}>
        <Flex align="center" gap="sm">
          <IconCrystalBall color={theme.colors[theme.primaryColor]?.[4]} />
          <Title size="sm">Magic app</Title>
        </Flex>
      </Link>
      <Horizontal>
        <Tooltip
          label={
            <Horizontal spacing={4}>
              <IconCommand size={12} /> + J
            </Horizontal>
          }
        >
          <div>
            <Switch
              size="md"
              checked={colorScheme === "dark"}
              color={colorScheme === "dark" ? "gray" : "dark"}
              onChange={() => toggleColorScheme()}
              onLabel={
                <IconSun
                  size="1rem"
                  stroke={2.5}
                  color={theme.colors[theme.primaryColor]?.[2] ?? theme.colors.yellow[2]}
                />
              }
              offLabel={
                <IconMoonStars
                  size="1rem"
                  stroke={2.5}
                  color={theme.colors[theme.primaryColor]?.[9] ?? theme.colors.gray[9]}
                />
              }
            />
          </div>
        </Tooltip>
        <HeaderMenu />
      </Horizontal>
    </SXHeader>
  )
}
