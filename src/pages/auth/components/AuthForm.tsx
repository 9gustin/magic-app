import { FC } from "react"
import { Center, Flex } from "@mantine/core"

export const AuthForm: FC<{
  title: string
  children: React.ReactNode
}> = ({ children, title }) => {
  return (
    <Center h="100%">
      <Flex gap={16} direction="column" w={400} mx="auto">
        <h1>{title}</h1>
        {children}
      </Flex>
    </Center>
  )
}
