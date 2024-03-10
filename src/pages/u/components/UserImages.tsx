import { getUploadthingUrl } from "@/features/uploadthing/utils"
import { UpdateUserProfileInput, UserProfile } from "@/features/users/types"
import { ImageEditable } from "@/pages/components/ImageEditable"
import { UserAvatar } from "@/pages/components/UserAvatar"
import { Image } from "@mantine/core"
import { UseFormReturnType } from "@mantine/form"
import { Horizontal, Vertical } from "mantine-layout-components"

export const UserImages = ({
  editable,
  form,
  user,
}: {
  user: UserProfile
  editable?: boolean
  form?: UseFormReturnType<UpdateUserProfileInput>
}) => {
  if (!user) return null
  const cover = form ? form.values.coverFileKey : user.coverFileKey
  const avatar = form ? form.values.avatarFileKey : user.avatarFileKey

  return (
    <Vertical
      fullW
      sx={{
        paddingBottom: "42px",
        position: "relative",
      }}
    >
      <ImageEditable editable={editable} form={form} fieldName="coverFileKey">
        {cover && (
          <Image
            src={getUploadthingUrl(cover)}
            fit="cover"
            h="300px"
            styles={{
              figure: {
                width: "100%",
              },
            }}
            sx={(theme) => ({
              overflow: "hidden",
              borderRadius: "1rem",
              display: "flex",
              alignItems: "center",
              background: theme.colors[theme.primaryColor]?.[1] || theme.colors.gray[0],
            })}
          />
        )}
        {!cover && (
          <Horizontal
            fullW
            h="300px"
            sx={{
              backgroundColor: "gray",
              borderRadius: "1rem",
            }}
          />
        )}
      </ImageEditable>
      <Horizontal
        sx={{
          position: "absolute",
          left: "50%",
          bottom: "0",
          border: "none",
          transform: "translate(-50%)",
        }}
      >
        <ImageEditable editable={editable} form={form} fieldName="avatarFileKey">
          <UserAvatar
            user={{ ...user, avatarFileKey: avatar }}
            size="xl"
            radius="xl"
            sx={{
              borderRadius: "100%",
              background: "black",
            }}
          />
        </ImageEditable>
      </Horizontal>
    </Vertical>
  )
}
