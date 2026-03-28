import { alpha, createTheme, type Theme } from "@mui/material/styles";

/**
 * Shared design tokens used by both light and dark themes.
 * Reference these values in component overrides to maintain a single source of truth.
 */
export const sharedTokens = {
  borderRadius: {
    button: 8,
    input: 6,
  },
  focusRingWidth: 3,
  focusRingOffset: 2,
} as const;

const buildTheme = (mode: "light" | "dark"): Theme =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#078480" : "#70D2C8",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: mode === "light" ? "#505558" : "#EDEEFC",
        contrastText: "#FFFFFF",
      },
      error: {
        main: mode === "light" ? "#D63443" : "#F28F99",
      },
      text: {
        primary: mode === "light" ? "#111928" : "#F9FAFB",
        secondary: mode === "light" ? "#6B7280" : "#9CA3AF",
        disabled: mode === "light" ? "#9CA3AF" : "#4B5563",
      },
      background: {
        default: mode === "light" ? "#FFFFFF" : "#1F2937",
        paper: mode === "light" ? "#F9FAFB" : "#111827",
      },
    },
    shape: {
      borderRadius: sharedTokens.borderRadius.button,
    },
    typography: {
      fontFamily: '"Inter", sans-serif',
      button: {
        textTransform: "none",
        fontWeight: 600,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: ({ theme, ownerState }) => {
            const colorKey = (ownerState.color ?? "primary") as
              | "primary"
              | "secondary"
              | "error";
            const palette =
              theme.palette[colorKey] ?? theme.palette.primary;
            return {
              borderRadius: sharedTokens.borderRadius.button,
              "&.Mui-focusVisible": {
                outline: `${sharedTokens.focusRingWidth}px solid ${palette.main}`,
                outlineOffset: sharedTokens.focusRingOffset,
              },
            };
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: sharedTokens.borderRadius.input,
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
              borderWidth: 2,
            },
            "&.Mui-focused": {
              outline: `${sharedTokens.focusRingWidth}px solid ${theme.palette.primary.main}`,
              outlineOffset: sharedTokens.focusRingOffset,
            },
            "&.Mui-error": {
              backgroundColor: alpha(theme.palette.error.main, 0.05),
            },
          }),
          inputSizeSmall: {
            paddingTop: 7,
            paddingBottom: 7,
          },
        },
      },
    },
  });

export const lightTheme = buildTheme("light");
export const darkTheme = buildTheme("dark");
