import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextFieldWithLabel } from "./TextFieldWithLabel";

const meta = {
  title: "Components/TextFieldWithLabel",
  component: TextFieldWithLabel,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { label: "Email address" },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextFieldWithLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  name: "Empty — Default",
  args: {},
};

export const WithPlaceholder: Story = {
  name: "Placeholder",
  args: { placeholder: "you@example.com" },
};

export const Filled: Story = {
  name: "Filled",
  args: { value: "user@company.com" },
};

export const Hovered: Story = {
  name: "Hover",
  args: { placeholder: "you@example.com" },
  parameters: { pseudo: { hover: true } },
};

export const Focused: Story = {
  name: "Focused",
  args: { placeholder: "you@example.com" },
  parameters: { pseudo: { focus: true, focusVisible: true } },
};

export const ErrorState: Story = {
  name: "Error",
  args: {
    error: true,
    value: "not-an-email",
    helperText: "Please enter a valid email address",
  },
};

export const Disabled: Story = {
  name: "Disabled",
  args: { disabled: true, value: "readonly@example.com" },
};
