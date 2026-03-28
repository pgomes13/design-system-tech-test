import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn, userEvent, within } from "storybook/test";
import { PrimaryButton } from "./PrimaryButton";

const meta = {
  title: "Atoms/PrimaryButton",
  component: PrimaryButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { onClick: fn(), label: "Button" },
} satisfies Meta<typeof PrimaryButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ContainedDefault: Story = {
  name: "Contained — Default",
  args: { variant: "contained" },
};

export const ContainedHover: Story = {
  name: "Contained — Hover",
  args: { variant: "contained" },
  parameters: { pseudo: { hover: true } },
};

export const ContainedFocus: Story = {
  name: "Contained — Focus (keyboard)",
  args: { variant: "contained" },
  play: async ({ canvasElement }) => {
    within(canvasElement);
    await userEvent.tab();
  },
};

export const ContainedDisabled: Story = {
  name: "Contained — Disabled",
  args: { variant: "contained", disabled: true },
};

export const OutlinedDefault: Story = {
  name: "Outlined — Default",
  args: { variant: "outlined" },
};

export const OutlinedHover: Story = {
  name: "Outlined — Hover",
  args: { variant: "outlined" },
  parameters: { pseudo: { hover: true } },
};

export const OutlinedFocus: Story = {
  name: "Outlined — Focus (keyboard)",
  args: { variant: "outlined" },
  play: async ({ canvasElement }) => {
    within(canvasElement);
    await userEvent.tab();
  },
};

export const OutlinedDisabled: Story = {
  name: "Outlined — Disabled",
  args: { variant: "outlined", disabled: true },
};

export const ContainedLoading: Story = {
  name: "Contained — Loading",
  args: { variant: "contained", loading: true, label: "Saving…" },
};

export const OutlinedLoading: Story = {
  name: "Outlined — Loading",
  args: { variant: "outlined", loading: true, label: "Saving…" },
};

// ── Secondary colour ──────────────────────────────────────────────────────────

export const SecondaryContainedDefault: Story = {
  name: "Secondary Contained — Default",
  args: { variant: "contained", color: "secondary" },
};

export const SecondaryContainedHover: Story = {
  name: "Secondary Contained — Hover",
  args: { variant: "contained", color: "secondary" },
  parameters: { pseudo: { hover: true } },
};

export const SecondaryContainedFocus: Story = {
  name: "Secondary Contained — Focus (keyboard)",
  args: { variant: "contained", color: "secondary" },
  play: async ({ canvasElement }) => {
    within(canvasElement);
    await userEvent.tab();
  },
};

export const SecondaryContainedDisabled: Story = {
  name: "Secondary Contained — Disabled",
  args: { variant: "contained", color: "secondary", disabled: true },
};

export const SecondaryOutlinedDefault: Story = {
  name: "Secondary Outlined — Default",
  args: { variant: "outlined", color: "secondary" },
};

export const SecondaryOutlinedHover: Story = {
  name: "Secondary Outlined — Hover",
  args: { variant: "outlined", color: "secondary" },
  parameters: { pseudo: { hover: true } },
};

export const SecondaryOutlinedFocus: Story = {
  name: "Secondary Outlined — Focus (keyboard)",
  args: { variant: "outlined", color: "secondary" },
  play: async ({ canvasElement }) => {
    within(canvasElement);
    await userEvent.tab();
  },
};

export const SecondaryOutlinedDisabled: Story = {
  name: "Secondary Outlined — Disabled",
  args: { variant: "outlined", color: "secondary", disabled: true },
};

// ── Error colour ──────────────────────────────────────────────────────────────

export const ErrorContainedDefault: Story = {
  name: "Error Contained — Default",
  args: { variant: "contained", color: "error" },
};

export const ErrorContainedHover: Story = {
  name: "Error Contained — Hover",
  args: { variant: "contained", color: "error" },
  parameters: { pseudo: { hover: true } },
};

export const ErrorContainedFocus: Story = {
  name: "Error Contained — Focus (keyboard)",
  args: { variant: "contained", color: "error" },
  play: async ({ canvasElement }) => {
    within(canvasElement);
    await userEvent.tab();
  },
};

export const ErrorContainedDisabled: Story = {
  name: "Error Contained — Disabled",
  args: { variant: "contained", color: "error", disabled: true },
};

export const ErrorOutlinedDefault: Story = {
  name: "Error Outlined — Default",
  args: { variant: "outlined", color: "error" },
};

export const ErrorOutlinedHover: Story = {
  name: "Error Outlined — Hover",
  args: { variant: "outlined", color: "error" },
  parameters: { pseudo: { hover: true } },
};

export const ErrorOutlinedFocus: Story = {
  name: "Error Outlined — Focus (keyboard)",
  args: { variant: "outlined", color: "error" },
  play: async ({ canvasElement }) => {
    within(canvasElement);
    await userEvent.tab();
  },
};

export const ErrorOutlinedDisabled: Story = {
  name: "Error Outlined — Disabled",
  args: { variant: "outlined", color: "error", disabled: true },
};
