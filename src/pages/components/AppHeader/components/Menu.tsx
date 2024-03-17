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
          color="yellow.4"
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

        <MenuItemIcon color="red.4" Icon={IconLogout} onClick={handleLogout}>
          Logout
        </MenuItemIcon>
      </Menu.Dropdown>
    </Menu>
  )
}
