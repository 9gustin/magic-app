import logout from "@/features/auth/mutations/logout"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import {
  Button,
  Flex,
  Header,
  MediaQuery,
  Switch,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core"
import { IconCrystalBall, IconLogout, IconMoonStars, IconSun } from "@tabler/icons-react"
import { Horizontal } from "mantine-layout-components"
import Link from "next/link"
import { useRouter } from "next/router"
import { BecomeProChip } from "./BecomeProChip"
import { UserAvatar } from "./UserAvatar"

export const AppHeader = () => {
  const user = useCurrentUser()
  const theme = useMantineTheme()
  const router = useRouter()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  const [$logoutMutation] = useMutation(logout)

  const handleLogout = async () => {
    await $logoutMutation()
    router.push(Routes.Home())
  }

  return (
    <Header
      height={60}
      p="xs"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Link href={Routes.Home()}>
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Flex align="center" gap="sm">
            <IconCrystalBall />
            <Title size="sm">Magic app</Title>
          </Flex>
        </MediaQuery>
      </Link>
      <Flex align="center" gap="lg">
        {user && (
          <Link
            href={Routes.Profile({
              username: user.username,
            })}
          >
            <Horizontal center>
              <UserAvatar user={user} />
              <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                <Title size="sm">{user.username}</Title>
              </MediaQuery>
            </Horizontal>
          </Link>
        )}
        <BecomeProChip />
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
        {user && (
          <Button
            size="xs"
            variant="light"
            onClick={handleLogout}
            leftIcon={<IconLogout size="1.2rem" />}
          >
            Logout
          </Button>
        )}
      </Flex>
    </Header>
  )
}
