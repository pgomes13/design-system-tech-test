import { createRef } from "react";
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

    it("does not set aria-busy when not loading", () => {
      renderButton({ label: "Button" });
      // aria-busy must be absent (not "false") so screen readers don't announce a busy state
      expect(screen.getByRole("button")).not.toHaveAttribute("aria-busy");
    });

    it("does not fire onClick while loading", async () => {
      const onClick = vi.fn();
      renderButton({ label: "Saving…", loading: true, onClick });
      await user.click(screen.getByRole("button"));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe("reusability", () => {
    it("forwards ref to the underlying button element", () => {
      const ref = createRef<HTMLButtonElement>();
      render(
        <ThemeProvider theme={lightTheme}>
          <PrimaryButton ref={ref} label="Button" />
        </ThemeProvider>,
      );
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current).toBe(screen.getByRole("button"));
    });

    it("passes startIcon through when not loading", () => {
      const icon = <span data-testid="icon">★</span>;
      renderButton({ label: "Button", startIcon: icon });
      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("overrides startIcon with spinner when loading", () => {
      const icon = <span data-testid="icon">★</span>;
      renderButton({ label: "Saving…", loading: true, startIcon: icon });
      expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
      expect(screen.getByRole("progressbar", { hidden: true })).toBeInTheDocument();
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

    it("receives focus via Tab", async () => {
      renderButton({ label: "Button" });
      await user.tab();
      expect(screen.getByRole("button")).toHaveFocus();
    });

    it("is skipped by Tab when disabled", async () => {
      renderButton({ label: "Button", disabled: true });
      await user.tab();
      expect(screen.getByRole("button")).not.toHaveFocus();
    });
  });
});
