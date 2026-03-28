---
name: update-tokens
description: Update a design token value across the design system. Use when changing a color, spacing, border radius, or other token in src/theme.ts.
argument-hint: [token-name] [new-value]
allowed-tools: Read, Grep, Glob, Edit, Bash
---

Update the design token "$0" to "$1".

Steps:

1. Read `src/theme.ts` to locate the current value of the token.

2. Search `src/components/` for any hardcoded usages of the old value:
   - Grep for the old hex/value in all `.tsx` and `.ts` files
   - Report any files that bypass the theme (this is a violation of our conventions)

3. Update `src/theme.ts` with the new token value.

4. Verify no component files hardcode the old value after the change.

5. Run `npm run build` to confirm no TypeScript errors.

6. Summarise:
   - Which token was changed
   - The old vs new value
   - Which components are visually affected (inherited from theme)
   - Any violations found (hardcoded values that should use theme tokens)
