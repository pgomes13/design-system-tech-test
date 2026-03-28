import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.build.json",

      outDir: "dist",
      include: ["src/index.ts", "src/components/**/*.{ts,tsx}", "src/theme.ts"],
      exclude: ["**/*.stories.{ts,tsx}"],
    }),
  ],
  publicDir: false,
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@mui/material",
        "@emotion/react",
        "@emotion/styled",
        "@fontsource/inter",
      ],
    },
    outDir: "dist",
    sourcemap: true,
  },
});
