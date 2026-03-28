import "@fontsource/inter";
import { useId } from "react";
import {
  TextField as MuiTextField,
  type TextFieldProps as MuiTextFieldProps,
  FormHelperText,
  Box,
  Typography,
} from "@mui/material";

/**
 * TextFieldWithLabel — a labelled text input for forms.
 *
 * @remarks
 * Renders a visible label above the input (not a floating MUI label inside the
 * border), matching the design spec. The label is linked to the input via a
 * stable React `useId`-generated id, so associations work correctly in SSR and
 * concurrent mode.
 *
 * Accessibility:
 * - Label is associated with the input via `htmlFor`/`id`.
 * - Error state sets `aria-invalid="true"` and `aria-describedby` on the input,
 *   pointing to the helper text element.
 * - Disabled state is forwarded to the underlying input as `disabled`.
 * - All colors come from MUI theme tokens — no hardcoded values.
 *
 * @example Basic usage
 * ```tsx
 * <TextFieldWithLabel label="Email address" placeholder="you@example.com" />
 * ```
 *
 * @example Error state
 * ```tsx
 * <TextFieldWithLabel
 *   label="Password"
 *   error
 *   helperText="Must be at least 8 characters"
 * />
 * ```
 *
 * @example Disabled
 * ```tsx
 * <TextFieldWithLabel label="Username" value="jsmith" disabled />
 * ```
 */
export interface TextFieldWithLabelProps
  extends Omit<MuiTextFieldProps, "label" | "variant" | "id"> {
  /**
   * Visible label rendered above the input field.
   * Also used as the accessible name for the input element.
   */
  label: string;
  /**
   * Optional helper text rendered below the input.
   * When `error` is `true`, this text is styled in the error colour and
   * announced by screen readers via `aria-describedby`.
   */
  helperText?: string;
  /**
   * Puts the field into an error state: red border, red helper text,
   * and `aria-invalid="true"` on the underlying `<input>`.
   * @defaultValue false
   */
  error?: boolean;
  /**
   * Placeholder text shown inside the input when it has no value.
   * Represents the "placeholder" variant from the design spec.
   */
  placeholder?: string;
  /**
   * Disables all interactions. The input is visually muted and not focusable.
   * @defaultValue false
   */
  disabled?: boolean;
}

export const TextFieldWithLabel = ({
  label,
  helperText,
  error = false,
  disabled = false,
  placeholder,
  ...rest
}: TextFieldWithLabelProps) => {
  const inputId = useId();
  const helperId = useId();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
      <Typography
        component="label"
        htmlFor={inputId}
        variant="body2"
        sx={{
          fontWeight: 500,
          color: disabled ? "text.disabled" : "text.primary",
        }}
      >
        {label}
      </Typography>
      <MuiTextField
        id={inputId}
        variant="outlined"
        size="small"
        error={error}
        disabled={disabled}
        placeholder={placeholder}
        slotProps={{
          input: {
            "aria-invalid": error ? true : undefined,
            "aria-describedby": helperText ? helperId : undefined,
          },
          formHelperText: {
            component: "span",
          },
        }}
        helperText={
          helperText ? (
            <FormHelperText
              id={helperId}
              error={error}
              disabled={disabled}
              component="span"
            >
              {helperText}
            </FormHelperText>
          ) : undefined
        }
        {...rest}
      />
    </Box>
  );
};
