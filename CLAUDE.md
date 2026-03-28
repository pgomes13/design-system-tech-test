# Design System Tech Test — Claude Context

## Project Purpose
A reusable React component library built on MUI 7, exported as an ESM NPM package.
Consumed by other apps via:
```ts
import { PrimaryButton, TextFieldWithLabel } from "design-system-tech-test";
```

## Tech Stack
- React 19, MUI 7, TypeScript strict, Vite 7, Storybook 9
- `@fontsource/inter` for typography
- `vite-plugin-dts` for TypeScript declaration file generation

## Key Conventions

### Component Structure
Every component lives in `src/components/<ComponentName>/`:
```
src/components/
  <ComponentName>/
    <ComponentName>.tsx     — component implementation
    <ComponentName>.stories.tsx — Storybook stories
    index.ts                — re-exports (barrel)
```

### Exports
All public API flows through `src/index.ts`.
**Named exports only** — no default exports on components.

### Theme Tokens
All colors, spacing, border-radius, and typography reference tokens from `src/theme.ts`.
**No hardcoded hex values** anywhere in component files.
Use MUI CSS variables (`var(--mui-palette-text-primary)`) for native HTML elements.

### TSDoc
Every exported component and props interface must have a TSDoc block.
Use `@param`, `@example`, `@remarks` as appropriate.

### Accessibility
- Focus rings must use `.Mui-focusVisible` / `:focus-visible` only (not `:focus`)
- All form inputs must have associated `<label>` elements via `htmlFor`/`id`
- Error states must set `aria-invalid="true"` and `aria-describedby` pointing to helper text
- Disabled state must use the `disabled` prop, not just visual styling

## Scripts
| Script | Purpose |
|--------|---------|
| `npm run dev` | Start Storybook at localhost:3000 |
| `npm run build` | Compile library to `dist/` (ESM + .d.ts) |
| `npm run build-storybook` | Build static Storybook to `storybook-static/` |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Type-check the build (tsc --noEmit) |
| `npm run format` | Run Prettier |
| `npm run test:e2e` | Run Playwright e2e tests (requires dev server on :3000) |

## Critical Files
- Theme tokens: `src/theme.ts`
- Public barrel: `src/index.ts`
- Storybook config: `.storybook/main.ts`, `.storybook/preview.ts`
- Vite config: `vite.config.ts`
- Build tsconfig: `tsconfig.build.json` (separate from app tsconfig — no `noEmit`)
- MCP config: `.mcp.json`

## What NOT to Do
- Do not hardcode colors in component `sx` props or `styled()`
- Do not use `any` type
- Do not export default from component files
- Do not add `noEmit: true` to `tsconfig.build.json`
- Do not import stories files into the library bundle
- Do not nest `<p>` inside `<p>` — use `component="span"` on `FormHelperText`

## Common Pitfalls
- `@fontsource/inter` must be imported inside `.tsx` component files (not in `theme.ts`) so Vite processes the CSS side-effect import
- `tsconfig.app.json` has `allowImportingTsExtensions: true` which breaks emit — always use `tsconfig.build.json` for the library build
- Storybook `decorators` must live inside the `preview` object in `preview.ts`, not as a separate named export

## AI Tools Used
- **Claude Code**: Used for planning, scaffolding all components, build pipeline configuration, GitHub Actions workflows, and Playwright e2e tests. Followed the "Claude Code in Action" course structure.
