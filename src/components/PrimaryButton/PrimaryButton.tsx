import "@fontsource/inter";
import {
  Button as MuiButton,
  type ButtonProps as MuiButtonProps,
} from "@mui/material";

/**
 * PrimaryButton — the design system's primary call-to-action button.
 *
 * @remarks
 * Built on top of MUI's `Button` component. All visual tokens (color, border
 * radius, focus ring) are driven by the active MUI theme — no hardcoded values.
 *
 * Use `variant="contained"` for the primary action and `variant="outlined"` for
 * secondary actions. The focus ring is keyboard-only (`:focus-visible`), meeting
 * WCAG 2.4.11 Focus Appearance.
 *
 * @example Contained (default)
 * ```tsx
 * <PrimaryButton variant="contained" onClick={() => console.log("clicked")}>
 *   Save changes
 * </PrimaryButton>
 * ```
 *
 * @example Outlined with label prop
 * ```tsx
 * <PrimaryButton variant="outlined" label="Cancel" onClick={handleCancel} />
 * ```
 *
 * @example Disabled state
 * ```tsx
 * <PrimaryButton variant="contained" disabled>
 *   Unavailable
 * </PrimaryButton>
 * ```
 */
export interface PrimaryButtonProps extends Omit<MuiButtonProps, "variant"> {
  /**
   * Visual style of the button.
   * - `"contained"` — filled background, highest visual weight (default)
   * - `"outlined"` — transparent background with a border, lower visual weight
   * @defaultValue "contained"
   */
  variant?: "contained" | "outlined";
  /**
   * Convenience prop for simple text labels.
   * When provided, renders as the button's text content.
   * If both `label` and `children` are supplied, `label` takes precedence.
   */
  label?: string;
}

export const PrimaryButton = ({
  variant = "contained",
  label,
  children,
  ...rest
}: PrimaryButtonProps) => (
  <MuiButton variant={variant} color="primary" disableElevation {...rest}>
    {label ?? children}
  </MuiButton>
);
