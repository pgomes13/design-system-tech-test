import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { PrimaryButton } from "./PrimaryButton";

const meta = {
  title: "Components/PrimaryButton",
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
  parameters: { pseudo: { focusVisible: true } },
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
  parameters: { pseudo: { focusVisible: true } },
};

export const OutlinedDisabled: Story = {
  name: "Outlined — Disabled",
  args: { variant: "outlined", disabled: true },
};
