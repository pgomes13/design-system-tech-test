import type { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent, within } from "storybook/test";
import { TextFieldWithLabel } from "./TextFieldWithLabel";

const meta = {
  title: "Molecules/TextFieldWithLabel",
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
  args: { defaultValue: "user@company.com" },
};

export const WithHelperText: Story = {
  name: "Helper Text",
  args: { helperText: "We'll never share your email with anyone." },
};

export const Hovered: Story = {
  name: "Hover",
  args: { placeholder: "you@example.com" },
  parameters: { pseudo: { hover: true } },
};

export const Focused: Story = {
  name: "Focused",
  args: { placeholder: "you@example.com" },
  play: async ({ canvasElement }) => {
    within(canvasElement);
    await userEvent.tab();
  },
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

// ── Placeholder × all states ──────────────────────────────────────────────────

export const PlaceholderHovered: Story = {
  name: "Placeholder — Hover",
  args: { placeholder: "you@example.com" },
  parameters: { pseudo: { hover: true } },
};

export const PlaceholderFocused: Story = {
  name: "Placeholder — Focused",
  args: { placeholder: "you@example.com" },
  play: async ({ canvasElement }) => {
    within(canvasElement);
    await userEvent.tab();
  },
};

export const PlaceholderDisabled: Story = {
  name: "Placeholder — Disabled",
  args: { placeholder: "you@example.com", disabled: true },
};

export const PlaceholderError: Story = {
  name: "Placeholder — Error",
  args: {
    placeholder: "you@example.com",
    error: true,
    helperText: "Please enter a valid email address",
  },
};

// ── Filled × all states ───────────────────────────────────────────────────────

export const FilledHovered: Story = {
  name: "Filled — Hover",
  args: { defaultValue: "user@company.com" },
  parameters: { pseudo: { hover: true } },
};

export const FilledFocused: Story = {
  name: "Filled — Focused",
  args: { defaultValue: "user@company.com" },
  play: async ({ canvasElement }) => {
    within(canvasElement);
    await userEvent.tab();
  },
};

export const FilledDisabled: Story = {
  name: "Filled — Disabled",
  args: { defaultValue: "user@company.com", disabled: true },
};

export const FilledError: Story = {
  name: "Filled — Error",
  args: {
    defaultValue: "not-an-email",
    error: true,
    helperText: "Please enter a valid email address",
  },
};

// ── Grid overview (matches Figma layout) ──────────────────────────────────────

type OverviewState = "Default" | "Hover" | "Focus" | "Disabled" | "Critical";

const OVERVIEW_COLUMNS: Array<{ label: string; state: OverviewState }> = [
  { label: "Default", state: "Default" },
  { label: "Hover", state: "Hover" },
  { label: "Focus", state: "Focus" },
  { label: "Disabled", state: "Disabled" },
  { label: "Critical", state: "Critical" },
];

const OVERVIEW_ROWS: Array<{ label: string; placeholder?: string; defaultValue?: string }> = [
  { label: "Empty" },
  { label: "Placeholder", placeholder: "Update placeholder here" },
  { label: "Filled", defaultValue: "Update value here" },
];

const focusSx = {
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "primary.main",
    borderWidth: "2px",
  },
} as const;

export const Overview: Story = {
  name: "Overview — All Variants & States",
  parameters: {
    layout: "centered",
    controls: { disable: true },
    pseudo: { hover: [".is-hover .MuiOutlinedInput-root"] },
  },
  decorators: [],
  render: () => (
    <>
      <style>{`.tf-overview label { display: none; }`}</style>
      <div
        className="tf-overview"
        style={{ padding: 32, fontFamily: "Inter, sans-serif", minWidth: 900 }}
      >
        {/* Column headers */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "80px repeat(5, 1fr)",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <div />
          {OVERVIEW_COLUMNS.map((c) => (
            <div
              key={c.label}
              style={{ textAlign: "center", fontSize: 12, fontWeight: 600 }}
            >
              {c.label}
            </div>
          ))}
        </div>

        {/* Rows */}
        {OVERVIEW_ROWS.map((row) => (
          <div
            key={row.label}
            style={{
              display: "grid",
              gridTemplateColumns: "80px repeat(5, 1fr)",
              gap: 12,
              marginBottom: 20,
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 600 }}>{row.label}</div>
            {OVERVIEW_COLUMNS.map((col) => (
              <div
                key={col.state}
                className={col.state === "Hover" ? "is-hover" : undefined}
              >
                <TextFieldWithLabel
                  label={row.label}
                  placeholder={row.placeholder}
                  defaultValue={row.defaultValue}
                  disabled={col.state === "Disabled"}
                  error={col.state === "Critical"}
                  fullWidth
                  sx={col.state === "Focus" ? focusSx : undefined}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  ),
};
