import { UserAvatar } from "@/pages/components/UserAvatar"
import { ActionIcon, Image, Indicator, Overlay, Tooltip } from "@mantine/core"
import { IconPencil, IconX } from "@tabler/icons-react"
import Conditional from "conditional-wrap"
import { Horizontal, Vertical } from "mantine-layout-components"

const Editable = ({ children, editable }) => {
  return (
    <Conditional
      condition={editable}
      wrap={(c) => {
        return (
          <Indicator
            color="none"
            position="bottom-end"
            label={
              <Tooltip color="dark" label="Clear image">
                <ActionIcon
                  onClick={() => {
                    console.log("Clear image")
                  }}
                  size="xs"
                  variant="filled"
                >
                  <IconX size={13} />
                </ActionIcon>
              </Tooltip>
            }
          >
            <Horizontal
              fullW
              center
              sx={{
                opacity: editable ? 0.3 : 1,
              }}
            >
              {c}
            </Horizontal>
            {editable && (
              <Horizontal
                fullW
                center
                sx={{
                  position: "absolute",
                  bottom: "50%",
                  right: "50%",
                  transform: "translate(50%, 50%)",
                }}
              >
                <ActionIcon
                  onClick={() => {
                    console.log("Clear image")
                  }}
                  size="64px"
                  p="sm"
                  radius="100%"
                  variant="subtle"
                >
                  <IconPencil size={32} />
                </ActionIcon>
              </Horizontal>
            )}
          </Indicator>
        )
      }}
    >
      {children}
    </Conditional>
  )
}

export const UserImages = ({ user, editable = false }) => {
  return (
    <Vertical
      fullW
      sx={{
        paddingBottom: "42px",
        position: "relative",
      }}
    >
      <Editable editable={editable}>
        <Image
          src="https://picsum.photos/900/700"
          radius="md"
          fit="cover"
          h="300px"
          sx={{
            overflow: "hidden",
            borderRadius: "1rem",
            background: "violet",
          }}
        />
      </Editable>
      <Horizontal
        sx={{
          position: "absolute",
          left: "50%",
          bottom: "0",
          border: "none",
          transform: "translate(-50%)",
        }}
      >
        <Editable editable={editable}>
          <UserAvatar
            user={user}
            size="xl"
            radius="xl"
            sx={{
              borderRadius: "100%",
              background: "black",
            }}
          />
        </Editable>
      </Horizontal>
    </Vertical>
  )
}
