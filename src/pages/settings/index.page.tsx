import { Suspense } from "react"
import Layout from "@/pages/components/Layout"
import { BlitzPage } from "@blitzjs/next"
import { Loader, Tabs } from "@mantine/core"
import { IconPassword, IconPencil, IconSettings } from "@tabler/icons-react"
import { UpdateProfile } from "./components/UpdateProfile"
import { ChangePassword } from "./components/ChangePassword"

const Settings: BlitzPage = () => {
  return (
    <Layout title="Settings">
      <Suspense fallback={<Loader />}>
        <Tabs defaultValue="profile" orientation="vertical">
          <Tabs.List>
            <Tabs.Tab value="profile" icon={<IconPencil size={14} />}>
              Update profile
            </Tabs.Tab>
            <Tabs.Tab value="changePassword" icon={<IconPassword size={14} />}>
              Change password
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="profile" px="md">
            <UpdateProfile />
          </Tabs.Panel>
          <Tabs.Panel value="changePassword" px="md">
            <ChangePassword />
          </Tabs.Panel>
        </Tabs>
      </Suspense>
    </Layout>
  )
}

export default Settings
