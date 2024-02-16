import logout from "@/features/auth/mutations/logout"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { useMutation } from "@blitzjs/rpc"
import {
  Button,
  Flex,
  Header,
  Switch,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core"
import { IconCrystalBall, IconLogout, IconMoonStars, IconSun } from "@tabler/icons-react"

export const AppHeader = () => {
  const user = useCurrentUser()
  const theme = useMantineTheme()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  const [$logoutMutation] = useMutation(logout)

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
      <Flex align="center" gap="sm">
        <IconCrystalBall />
        <Title size="sm">{user?.username || "Magic app"}</Title>
      </Flex>
      <Flex align="center" gap="lg">
        <Switch
          size="md"
          checked={colorScheme === "dark"}
          color={colorScheme === "dark" ? "gray" : "dark"}
          onChange={() => toggleColorScheme()}
          onLabel={<IconSun size="1rem" stroke={2.5} color={theme.colors.yellow[4]} />}
          offLabel={<IconMoonStars size="1rem" stroke={2.5} color={theme.colors.blue[6]} />}
        />
        {user && (
          <Button
            size="xs"
            variant="light"
            onClick={async () => {
              await $logoutMutation()
            }}
            leftIcon={<IconLogout size="1.2rem" />}
          >
            Logout
          </Button>
        )}
      </Flex>
    </Header>
  )
}
