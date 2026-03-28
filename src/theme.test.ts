import { render } from "@testing-library/react";
import { createElement } from "react";
import { ThemeProvider } from "@mui/material";
import { describe, it, expect } from "vitest";
import { lightTheme, darkTheme, sharedTokens } from "./theme";

describe("sharedTokens", () => {
  it("has borderRadius.button = 8", () => {
    expect(sharedTokens.borderRadius.button).toBe(8);
  });

  it("has borderRadius.input = 6", () => {
    expect(sharedTokens.borderRadius.input).toBe(6);
  });

  it("has focusRingWidth = 3", () => {
    expect(sharedTokens.focusRingWidth).toBe(3);
  });

  it("has focusRingOffset = 2", () => {
    expect(sharedTokens.focusRingOffset).toBe(2);
  });
});

describe("lightTheme", () => {
  it("has mode = light", () => {
    expect(lightTheme.palette.mode).toBe("light");
  });

  it("has primary.main = #1A56DB", () => {
    expect(lightTheme.palette.primary.main).toBe("#1A56DB");
  });

  it("has error.main = #E02424", () => {
    expect(lightTheme.palette.error.main).toBe("#E02424");
  });

  it("has background.default = #FFFFFF", () => {
    expect(lightTheme.palette.background.default).toBe("#FFFFFF");
  });

  it("has text.primary = #111928", () => {
    expect(lightTheme.palette.text.primary).toBe("#111928");
  });
});

describe("darkTheme", () => {
  it("has mode = dark", () => {
    expect(darkTheme.palette.mode).toBe("dark");
  });

  it("has primary.main = #5C93FF", () => {
    expect(darkTheme.palette.primary.main).toBe("#5C93FF");
  });

  it("has error.main = #F87171", () => {
    expect(darkTheme.palette.error.main).toBe("#F87171");
  });

  it("has background.default = #1F2937", () => {
    expect(darkTheme.palette.background.default).toBe("#1F2937");
  });

  it("has text.primary = #F9FAFB", () => {
    expect(darkTheme.palette.text.primary).toBe("#F9FAFB");
  });
});

describe("light vs dark differences", () => {
  it("primary.main differs between light and dark", () => {
    expect(lightTheme.palette.primary.main).not.toBe(darkTheme.palette.primary.main);
  });

  it("error.main differs between light and dark", () => {
    expect(lightTheme.palette.error.main).not.toBe(darkTheme.palette.error.main);
  });

  it("background.default differs between light and dark", () => {
    expect(lightTheme.palette.background.default).not.toBe(
      darkTheme.palette.background.default,
    );
  });
});

describe("typography", () => {
  it("fontFamily contains Inter", () => {
    expect(lightTheme.typography.fontFamily).toContain("Inter");
  });

  it("button textTransform is none", () => {
    expect(lightTheme.typography.button?.textTransform).toBe("none");
  });

  it("button fontWeight is 600", () => {
    expect(lightTheme.typography.button?.fontWeight).toBe(600);
  });
});

describe("component overrides", () => {
  it("MuiButton override is defined", () => {
    expect(lightTheme.components?.MuiButton?.styleOverrides?.root).toBeDefined();
  });

  it("MuiOutlinedInput override is defined", () => {
    expect(lightTheme.components?.MuiOutlinedInput?.styleOverrides?.root).toBeDefined();
  });

  it("shape.borderRadius matches sharedTokens.borderRadius.button", () => {
    expect(lightTheme.shape.borderRadius).toBe(sharedTokens.borderRadius.button);
  });
});

describe("theme renders without errors", () => {
  it("lightTheme renders a ThemeProvider without throwing", () => {
    expect(() =>
      render(createElement(ThemeProvider, { theme: lightTheme }, null)),
    ).not.toThrow();
  });

  it("darkTheme renders a ThemeProvider without throwing", () => {
    expect(() =>
      render(createElement(ThemeProvider, { theme: darkTheme }, null)),
    ).not.toThrow();
  });
});
