export const getUploadthingUrl = (fileKey?: string | null) => {
  return fileKey ? `https://utfs.io/f/${fileKey}` : ""
}
