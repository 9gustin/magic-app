import logout from "@/features/auth/mutations/logout"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { Button, Menu } from "@mantine/core"
import { openContextModal } from "@mantine/modals"
import { IconBolt, IconLogout, IconSettings, IconUser } from "@tabler/icons-react"
import { useRouter } from "next/router"
import { GlobalModal } from "../../modals/config"
import { UserAvatar } from "../../UserAvatar"
import { MenuItemIcon, MenuItemLink } from "./MenuHelpers"

export const HeaderMenu = () => {
  const user = useCurrentUser()
  const router = useRouter()
  const [$logoutMutation] = useMutation(logout)

  if (!user) return null

  const handleLogout = async () => {
    await $logoutMutation()
    router.push(Routes.Home())
  }

  return (
    <Menu position="bottom-end">
      <Menu.Target>
        <Button variant="light" radius="100%" h="40px" w="40px" p="0">
          <UserAvatar user={user} />
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <MenuItemLink Icon={IconSettings} href={Routes.Settings()}>
          Settings
        </MenuItemLink>
        <MenuItemLink Icon={IconUser} href={Routes.Profile({ username: user.username })}>
          Go to profile
        </MenuItemLink>
        <MenuItemIcon
          Icon={IconBolt}
          color="yellow.3"
          onClick={() =>
            openContextModal({
              modal: GlobalModal.becomePro,
              title: "Get PRO Plan",
              innerProps: {},
            })
          }
        >
          Become Pro
        </MenuItemIcon>

        <MenuItemIcon color="red.3" Icon={IconLogout} onClick={handleLogout}>
          Logout
        </MenuItemIcon>

        {/* <Flex align="center" gap="lg">
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
      </Flex> */}
      </Menu.Dropdown>
    </Menu>
  )
}
