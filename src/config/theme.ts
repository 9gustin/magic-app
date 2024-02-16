import type { MantineThemeOverride } from "@mantine/core"

export const defaultTheme: MantineThemeOverride = {
  activeStyles: { transform: "scale(0.95)" },
  defaultRadius: "md",
  components: {
    Button: {
      defaultProps: {
        color: "indigo",
      },
    },
    Loader: {
      defaultProps: {
        color: "indigo",
      },
    },
  },
}
