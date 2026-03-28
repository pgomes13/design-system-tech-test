import { alpha, createTheme, type Theme } from "@mui/material/styles";
import { sharedTokens } from "./tokens";
import { buildPalette } from "./palette";
import { shape } from "./shape";
import { typography } from "./typography";

export { sharedTokens } from "./tokens";

const buildTheme = (mode: "light" | "dark"): Theme =>
  createTheme({
    palette: buildPalette(mode),
    shape,
    typography,
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
                outline: "none",
                boxShadow: `0 0 0 2px ${theme.palette.background.default}, 0 0 0 ${2 + sharedTokens.focusRingWidth}px ${palette.main}`,
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
