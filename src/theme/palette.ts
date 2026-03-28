import type { PaletteOptions } from "@mui/material/styles";

export const buildPalette = (mode: "light" | "dark"): PaletteOptions => ({
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
});
