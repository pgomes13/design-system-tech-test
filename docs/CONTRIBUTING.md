# Contributing

## Setup

```bash
make install   # Install all dependencies
make dev       # Start Storybook at localhost:3000
```

## Commands

| Command | Description |
|---------|-------------|
| `make install` | Install all dependencies |
| `make dev` | Start Storybook at localhost:3000 |
| `make build` | Compile library to `dist/` (ESM + `.d.ts`) |
| `make build-storybook` | Build static Storybook to `storybook-static/` |
| `make lint` | Run ESLint |
| `make format` | Format all files with Prettier |
| `make typecheck` | Type-check the library build |
| `make test` | Run Vitest unit tests |
| `make test-watch` | Run Vitest in watch mode |
| `make test-coverage` | Run unit tests with coverage report |
| `make test-e2e` | Run Playwright e2e tests (requires dev server running) |
| `make test-e2e-ci` | Run Playwright e2e tests with GitHub Actions reporter |
| `make check` | Run lint + typecheck + unit tests + build (mirrors CI) |

Run `make help` to see all commands with descriptions.

## Adding a new component

Use the `/add-component` slash command in Claude Code:

```
/add-component Badge
```

This scaffolds the full component structure following project conventions:
- `src/components/<Name>/<Name>.tsx` — component with TSDoc
- `src/components/<Name>/index.ts` — barrel export
- `src/components/<Name>/<Name>.stories.tsx` — Storybook stories
- Updates `src/index.ts` with the new export

## Component conventions

- All components live in `src/components/<Name>/`
- Named exports only — no default exports
- All colors and spacing via MUI theme tokens — no hardcoded hex values
- Import `@fontsource/inter` at the top of every component file
- TSDoc block required on every exported component and props interface
- Focus rings via `.Mui-focusVisible` only (keyboard-only, not mouse)
- Form inputs must use `htmlFor`/`id` label association
- Error states must set `aria-invalid` and `aria-describedby`

See [`CLAUDE.md`](../CLAUDE.md) for the full conventions reference used by Claude Code.

## CI

Every push and pull request to `main` runs:

1. **ESLint** — `make lint`
2. **TypeScript** — `make typecheck`
3. **Library build** — `make build`

Storybook is automatically deployed to GitHub Pages on every merge to `main`.

## AI tools

This project uses [Claude Code](https://claude.ai/code) for development assistance. The project conventions are captured in [`CLAUDE.md`](../CLAUDE.md) so every Claude Code session has full context.

Available slash commands:
- `/add-component [Name]` — scaffold a new component
- `/update-tokens [token] [value]` — update a design token across the system
- `/check-a11y [Name]` — audit a component for accessibility issues
