import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material";
import { describe, it, expect, vi } from "vitest";
import { lightTheme } from "../../theme";
import { PrimaryButton } from "./PrimaryButton";

// Disabled/loading MUI buttons have pointer-events:none — skip pointer checks
const user = userEvent.setup({ pointerEventsCheck: 0 });

const renderButton = (props = {}) =>
  render(
    <ThemeProvider theme={lightTheme}>
      <PrimaryButton {...props} />
    </ThemeProvider>,
  );

describe("PrimaryButton", () => {
  describe("rendering", () => {
    it("renders with children", () => {
      renderButton({ children: "Save changes" });
      expect(screen.getByRole("button", { name: "Save changes" })).toBeInTheDocument();
    });

    it("renders with label prop", () => {
      renderButton({ label: "Submit" });
      expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
    });

    it("label takes precedence over children when both provided", () => {
      renderButton({ label: "Label wins", children: "Children lose" });
      expect(screen.getByRole("button", { name: "Label wins" })).toBeInTheDocument();
    });
  });

  describe("variants", () => {
    it("renders contained variant by default", () => {
      renderButton({ label: "Button" });
      expect(screen.getByRole("button")).toHaveClass("MuiButton-contained");
    });

    it("renders outlined variant", () => {
      renderButton({ label: "Button", variant: "outlined" });
      expect(screen.getByRole("button")).toHaveClass("MuiButton-outlined");
    });
  });

  describe("disabled state", () => {
    it("is enabled by default", () => {
      renderButton({ label: "Button" });
      expect(screen.getByRole("button")).toBeEnabled();
    });

    it("is disabled when disabled prop is true", () => {
      renderButton({ label: "Button", disabled: true });
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("does not fire onClick when disabled", async () => {
      const onClick = vi.fn();
      renderButton({ label: "Button", disabled: true, onClick });
      await user.click(screen.getByRole("button"));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe("loading state", () => {
    it("shows a spinner when loading", () => {
      renderButton({ label: "Saving…", loading: true });
      // Spinner is aria-hidden (decorative) — query with hidden:true
      expect(screen.getByRole("progressbar", { hidden: true })).toBeInTheDocument();
    });

    it("is disabled when loading", () => {
      renderButton({ label: "Saving…", loading: true });
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("sets aria-busy when loading", () => {
      renderButton({ label: "Saving…", loading: true });
      expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
    });

    it("does not fire onClick while loading", async () => {
      const onClick = vi.fn();
      renderButton({ label: "Saving…", loading: true, onClick });
      await user.click(screen.getByRole("button"));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe("interactions", () => {
    it("calls onClick when clicked", async () => {
      const onClick = vi.fn();
      renderButton({ label: "Button", onClick });
      await user.click(screen.getByRole("button"));
      expect(onClick).toHaveBeenCalledOnce();
    });

    it("is keyboard accessible via Enter", async () => {
      const onClick = vi.fn();
      renderButton({ label: "Button", onClick });
      screen.getByRole("button").focus();
      await user.keyboard("{Enter}");
      expect(onClick).toHaveBeenCalledOnce();
    });

    it("is keyboard accessible via Space", async () => {
      const onClick = vi.fn();
      renderButton({ label: "Button", onClick });
      screen.getByRole("button").focus();
      await user.keyboard(" ");
      expect(onClick).toHaveBeenCalledOnce();
    });
  });
});
