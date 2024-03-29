import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
import { ColorScheme, ColorSchemeProvider, Loader, MantineProvider } from "@mantine/core"
import { useHotkeys, useLocalStorage } from "@mantine/hooks"
import { AuthenticationError, AuthorizationError } from "blitz"
import React, { Suspense } from "react"
import { withBlitz } from "src/blitz-client"

import { defaultTheme } from "@/config/theme"

import relativeTime from "dayjs/plugin/relativeTime"
import dayjs from "dayjs"
import "dayjs/locale/en"

import "@uploadthing/react/styles.css"
import "src/styles/globals.css"
import { ModalsProvider } from "@mantine/modals"
import { globalModals } from "./components/modals/config"

dayjs.locale("en")
dayjs.extend(relativeTime)

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <div>Error: You are not authenticated</div>
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))

  useHotkeys([["mod+J", () => toggleColorScheme()]])

  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            ...defaultTheme,
            colorScheme,
          }}
        >
          <ModalsProvider modals={globalModals}>
            <Suspense fallback={<Loader />}>
              <Component {...pageProps} />
            </Suspense>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </ErrorBoundary>
  )
}

export default withBlitz(MyApp)
