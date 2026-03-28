import { createTheme, type Theme } from "@mui/material/styles";

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
        main: mode === "light" ? "#1A56DB" : "#5C93FF",
        contrastText: "#FFFFFF",
      },
      error: {
        main: mode === "light" ? "#E02424" : "#F87171",
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
          root: ({ theme }) => ({
            borderRadius: sharedTokens.borderRadius.button,
            "&.Mui-focusVisible": {
              outline: `${sharedTokens.focusRingWidth}px solid ${theme.palette.primary.main}`,
              outlineOffset: sharedTokens.focusRingOffset,
            },
          }),
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
          }),
        },
      },
    },
  });

export const lightTheme = buildTheme("light");
export const darkTheme = buildTheme("dark");
