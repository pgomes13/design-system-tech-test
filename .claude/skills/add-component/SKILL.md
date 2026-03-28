---
name: add-component
description: Scaffold a new design system component. Use when the user asks to create or add a new component to the design system.
argument-hint: [ComponentName]
allowed-tools: Read, Grep, Glob, Edit, Write, Bash
---

Add a new design system component named $ARGUMENTS.

Follow these steps exactly:

1. Create `src/components/$ARGUMENTS/$ARGUMENTS.tsx` with:
   - `import "@fontsource/inter"` at the top
   - A TSDoc block: description, `@remarks` covering theme/accessibility notes, at least one `@example`
   - A props interface `$ARGUMENTSProps` extending relevant MUI props (Omit any MUI props you want to narrow)
   - Named export `export const $ARGUMENTS = ...` (no default export)
   - All styles via MUI theme tokens — no hardcoded hex values

2. Create `src/components/$ARGUMENTS/index.ts`:
   ```ts
   export { $ARGUMENTS } from "./$ARGUMENTS";
   export type { ${ARGUMENTS}Props } from "./$ARGUMENTS";
   ```

3. Create `src/components/$ARGUMENTS/$ARGUMENTS.stories.tsx` with:
   - `title: "Components/$ARGUMENTS"`
   - `tags: ["autodocs"]`
   - Stories for each documented state (default, hover, focus, disabled at minimum)
   - Pseudo-state stories using `parameters: { pseudo: { hover: true } }` etc.

4. Add to `src/index.ts`:
   ```ts
   export { $ARGUMENTS } from "./components/$ARGUMENTS";
   export type { ${ARGUMENTS}Props } from "./components/$ARGUMENTS";
   ```

5. Run `npm run lint` and fix any issues found.

6. Run `npm run build` to confirm the new component is included in the bundle.

Report what was created and any design decisions made.
