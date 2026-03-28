import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material";
import { describe, it, expect } from "vitest";
import { lightTheme } from "../../theme";
import { TextFieldWithLabel } from "./TextFieldWithLabel";

const user = userEvent.setup();

const renderField = (props: { label?: string; [key: string]: unknown } = {}) =>
  render(
    <ThemeProvider theme={lightTheme}>
      <TextFieldWithLabel label="Email address" {...props} />
    </ThemeProvider>,
  );

describe("TextFieldWithLabel", () => {
  describe("rendering", () => {
    it("renders a visible label", () => {
      renderField();
      expect(screen.getByText("Email address")).toBeInTheDocument();
    });

    it("renders an input element", () => {
      renderField();
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("renders placeholder text", () => {
      renderField({ placeholder: "you@example.com" });
      expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
    });

    it("renders with a pre-filled value", () => {
      renderField({ value: "user@company.com", onChange: () => {} });
      expect(screen.getByRole("textbox")).toHaveValue("user@company.com");
    });

    it("renders helper text when provided", () => {
      renderField({ helperText: "We'll never share your email" });
      expect(screen.getByText("We'll never share your email")).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("associates label with input via htmlFor/id", () => {
      renderField();
      const input = screen.getByRole("textbox");
      const inputId = input.getAttribute("id");
      expect(inputId).toBeTruthy();
      expect(screen.getByText("Email address").closest("label")).toHaveAttribute(
        "for",
        inputId,
      );
    });

    it("does not set aria-invalid=true when no error", () => {
      renderField();
      // MUI sets aria-invalid="false" (not absent) — assert it is not "true"
      expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid", "true");
    });

    it("sets aria-invalid=true on the input when error is true", () => {
      renderField({ error: true });
      expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
    });

    it("sets aria-describedby linking to helper text when error and helperText", () => {
      renderField({ error: true, helperText: "Invalid email address" });
      const input = screen.getByRole("textbox");
      const describedById = input.getAttribute("aria-describedby");
      expect(describedById).toBeTruthy();
      expect(document.getElementById(describedById!)).toHaveTextContent(
        "Invalid email address",
      );
    });

    it("does not set aria-describedby when no helperText", () => {
      renderField({ error: true });
      expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-describedby");
    });

    it("sets aria-describedby even without error when helperText is present", () => {
      // Informational helper text (not an error) must still be announced by screen readers
      renderField({ helperText: "We'll never share your email" });
      const input = screen.getByRole("textbox");
      const describedById = input.getAttribute("aria-describedby");
      expect(describedById).toBeTruthy();
      expect(document.getElementById(describedById!)).toHaveTextContent(
        "We'll never share your email",
      );
    });
  });

  describe("disabled state", () => {
    it("is enabled by default", () => {
      renderField();
      expect(screen.getByRole("textbox")).toBeEnabled();
    });

    it("disables the input when disabled prop is true", () => {
      renderField({ disabled: true });
      expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("does not accept input when disabled", async () => {
      renderField({ disabled: true });
      await user.type(screen.getByRole("textbox"), "hello");
      expect(screen.getByRole("textbox")).toHaveValue("");
    });
  });

  describe("error state", () => {
    it("renders helper text in error state", () => {
      renderField({ error: true, helperText: "Required field" });
      expect(screen.getByText("Required field")).toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    it("accepts typed input", async () => {
      renderField();
      const input = screen.getByRole("textbox");
      await user.type(input, "test@example.com");
      expect(input).toHaveValue("test@example.com");
    });

    it("replaces value after clearing and retyping", async () => {
      renderField();
      const input = screen.getByRole("textbox");
      await user.type(input, "old value");
      await user.clear(input);
      await user.type(input, "new");
      expect(input).toHaveValue("new");
    });

    it("receives focus via Tab", async () => {
      renderField();
      await user.tab();
      expect(screen.getByRole("textbox")).toHaveFocus();
    });

    it("is skipped by Tab when disabled", async () => {
      renderField({ disabled: true });
      await user.tab();
      expect(screen.getByRole("textbox")).not.toHaveFocus();
    });
  });

  describe("reusability", () => {
    it("forwards ref to the underlying input element", () => {
      const ref = createRef<HTMLInputElement>();
      render(
        <ThemeProvider theme={lightTheme}>
          <TextFieldWithLabel label="Email" ref={ref} />
        </ThemeProvider>,
      );
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current).toBe(screen.getByRole("textbox"));
    });

    it("expands to full width when fullWidth is true", () => {
      const { container } = renderField({ fullWidth: true });
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveStyle({ width: "100%" });
    });
  });
});
