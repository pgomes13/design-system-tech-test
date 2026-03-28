# Installation & Usage

## Install

Once published to an NPM registry, install the package and its peer dependencies:

```bash
npm install design-system-tech-test
npm install @mui/material @emotion/react @emotion/styled
```

## Setup

Wrap your app with MUI's `ThemeProvider` using the exported themes:

```tsx
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme } from "design-system-tech-test";

export default function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      {/* your app */}
    </ThemeProvider>
  );
}
```

For dark mode, swap in `darkTheme`:

```tsx
import { darkTheme } from "design-system-tech-test";
```

## Components

### PrimaryButton

```tsx
import { PrimaryButton } from "design-system-tech-test";

// Contained (default) — primary action
<PrimaryButton variant="contained" onClick={handleSubmit}>
  Save changes
</PrimaryButton>

// Outlined — secondary action
<PrimaryButton variant="outlined" onClick={handleCancel}>
  Cancel
</PrimaryButton>

// Loading — prevents double-submission during async operations
<PrimaryButton variant="contained" loading onClick={handleSubmit}>
  Saving…
</PrimaryButton>

// Disabled
<PrimaryButton variant="contained" disabled>
  Unavailable
</PrimaryButton>
```

### TextFieldWithLabel

```tsx
import { TextFieldWithLabel } from "design-system-tech-test";

// Basic
<TextFieldWithLabel label="Email address" placeholder="you@example.com" />

// Error state
<TextFieldWithLabel
  label="Password"
  error
  helperText="Must be at least 8 characters"
/>

// Disabled
<TextFieldWithLabel label="Username" value="jsmith" disabled />
```

## Local development with npm link

To test against a local build before publishing:

```bash
# In this repo
npm run build
npm link

# In your test app
npm link design-system-tech-test
```
