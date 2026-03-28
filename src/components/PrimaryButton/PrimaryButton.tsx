import "@fontsource/inter";
import { forwardRef } from "react";
import {
  Button as MuiButton,
  CircularProgress,
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
 * When `loading` is `true` the button is automatically disabled and shows a
 * spinner in place of any `startIcon`, preventing double-submission while
 * communicating progress to the user.
 *
 * Supports `ref` forwarding for programmatic focus management (e.g. returning
 * focus to a trigger after closing a dialog).
 *
 * All other MUI `Button` props (`size`, `startIcon`, `endIcon`, `sx`, `href`,
 * etc.) are forwarded to the underlying element.
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
 * @example Loading state
 * ```tsx
 * <PrimaryButton variant="contained" loading>
 *   Saving…
 * </PrimaryButton>
 * ```
 *
 * @example Programmatic focus via ref
 * ```tsx
 * const ref = useRef<HTMLButtonElement>(null);
 * useEffect(() => { ref.current?.focus(); }, []);
 * <PrimaryButton ref={ref}>Focus me</PrimaryButton>
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
  /**
   * When `true`, displays a spinner and disables the button to prevent
   * double-submission. Overrides `startIcon` while active.
   * Use during async operations (form submit, API calls).
   * @defaultValue false
   */
  loading?: boolean;
}

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  (
    {
      variant = "contained",
      label,
      children,
      loading = false,
      disabled,
      startIcon,
      ...rest
    },
    ref,
  ) => (
    <MuiButton
      ref={ref}
      variant={variant}
      disableElevation
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      startIcon={
        loading ? (
          <CircularProgress size={16} color="inherit" aria-hidden="true" />
        ) : (
          startIcon
        )
      }
      {...rest}
    >
      {label ?? children}
    </MuiButton>
  ),
);

PrimaryButton.displayName = "PrimaryButton";
