import { UpdateUserProfileInput } from "@/features/users/types"
import { ActionIcon, FileButton, Indicator, Tooltip, Image, Loader } from "@mantine/core"
import { UseFormReturnType } from "@mantine/form"
import { showNotification } from "@mantine/notifications"
import { IconPencil, IconPhoto, IconX } from "@tabler/icons-react"
import Conditional from "conditional-wrap"
import { Horizontal } from "mantine-layout-components"
import { useState } from "react"
import { useUploadThing } from "./uploadthing"

export const ImageEditable = ({
  children,
  form,
  fieldName,
  editable = false,
}: {
  form?: UseFormReturnType<UpdateUserProfileInput>
  editable?: boolean
  fieldName?: string
  children: React.ReactNode
}) => {
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (files) => {
      console.log("files", files)
      const fileKey = files?.[0]?.key
      if (form && fieldName && fileKey) {
        form.setFieldValue(fieldName, fileKey)
      }
    },
    onUploadError: () => {
      showNotification({
        message: "Image upload failed",
        color: "red",
        icon: <IconPhoto size={16} />,
      })
    },
  })

  const hasForm = form && fieldName
  const hasValue = hasForm && !!form.values[fieldName]

  return (
    <Conditional
      condition={editable}
      wrap={(c) => {
        return (
          <Indicator
            w="100%"
            color="none"
            position="bottom-end"
            label={
              hasValue && hasForm && !isUploading ? (
                <Tooltip color="dark" label="Clear image">
                  <ActionIcon
                    onClick={() => form.setFieldValue(fieldName, "")}
                    size="xs"
                    variant="filled"
                  >
                    <IconX size={13} />
                  </ActionIcon>
                </Tooltip>
              ) : null
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
                {isUploading && <Loader />}
                {!isUploading && (
                  <FileButton
                    onChange={(file) => {
                      if (file) startUpload([file])
                    }}
                    accept="image/png,image/jpeg"
                  >
                    {(props) => (
                      <ActionIcon size="64px" p="sm" radius="100%" variant="subtle" {...props}>
                        {hasValue ? <IconPencil size={32} /> : <IconPhoto size={32} />}
                      </ActionIcon>
                    )}
                  </FileButton>
                )}
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
