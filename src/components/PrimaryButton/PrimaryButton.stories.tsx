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

// ── Grid overview (matches Figma layout) ──────────────────────────────────────

const COLUMNS = [
  { label: "Primary Color", color: "primary" as const },
  { label: "Secondary Color", color: "secondary" as const },
  { label: "Error Color", color: "error" as const },
];

const STATES = ["Default", "Hover", "Focus", "Disabled"] as const;
const VARIANTS = ["contained", "outlined"] as const;

export const Overview: Story = {
  name: "Overview — All Variants & States",
  parameters: {
    layout: "centered",
    controls: { disable: true },
    pseudo: { hover: [".is-hover"] },
  },
  render: () => (
    <div style={{ padding: 32, fontFamily: "Inter, sans-serif" }}>
      <p style={{ textAlign: "center", fontWeight: 600, fontSize: 16, margin: "0 0 24px" }}>
        Medium size
      </p>

      {/* Column headers */}
      <div style={{ display: "grid", gridTemplateColumns: "110px 100px repeat(3, 120px)", gap: 8, marginBottom: 8 }}>
        <div />
        <div />
        {COLUMNS.map((c) => (
          <div key={c.label} style={{ textAlign: "center", fontSize: 12, fontWeight: 600 }}>
            {c.label}
          </div>
        ))}
      </div>

      {VARIANTS.map((variant) => (
        <div key={variant} style={{ display: "flex", marginBottom: 16 }}>
          {/* Variant label */}
          <div style={{ width: 110, display: "flex", alignItems: "center", fontWeight: 700, fontSize: 14 }}>
            {variant === "contained" ? "Contained" : "Outlined"}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {STATES.map((state) => (
              <div key={state} style={{ display: "grid", gridTemplateColumns: "100px repeat(3, 120px)", gap: 8, alignItems: "center" }}>
                <div style={{ fontSize: 13 }}>{state}</div>
                {COLUMNS.map((col) => (
                  <div key={col.color} style={{ display: "flex", justifyContent: "center" }}>
                    <PrimaryButton
                      variant={variant}
                      color={col.color}
                      label="Label"
                      disabled={state === "Disabled"}
                      className={
                        state === "Hover"
                          ? "is-hover"
                          : state === "Focus"
                            ? "Mui-focusVisible"
                            : undefined
                      }
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
